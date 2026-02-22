import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEzlynxQuotes, EzlynxQuoteInput } from '@/lib/supabase';

const quoteInputSchema = z.object({
  carrier_name: z.string().min(1),
  carrier_logo_url: z.string().url().optional().nullable(),
  policy_type: z.enum(['home', 'auto', 'bundle']),
  monthly_premium_cents: z.number().min(0).optional().nullable(),
  annual_premium_cents: z.number().min(0),
  coverage_summary: z.record(z.string(), z.unknown()).optional().nullable(),
  deductibles: z.record(z.string(), z.unknown()).optional().nullable(),
  is_recommended: z.boolean().optional(),
  recommendation_reason: z.string().optional().nullable(),
  bind_url: z.string().url().optional().nullable(),
  ezlynx_quote_id: z.string().optional().nullable(),
  source: z.string().optional(),
  expires_at: z.string().optional().nullable(),
});

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function normalizePolicyType(raw?: string): 'home' | 'auto' | 'bundle' | undefined {
  if (!raw) return undefined;
  const value = raw.toLowerCase();
  if (value.includes('auto')) return 'auto';
  if (value.includes('home') || value.includes('homeowners') || value.includes('property')) return 'home';
  if (value.includes('bundle') || value.includes('package')) return 'bundle';
  if (value === 'home' || value === 'auto' || value === 'bundle') return value as 'home' | 'auto' | 'bundle';
  return undefined;
}

function normalizeCents(raw: unknown, fallback?: unknown): number | undefined {
  const direct = typeof raw === 'number' ? raw : undefined;
  if (typeof direct === 'number' && Number.isFinite(direct)) return Math.round(direct);
  const fallbackNumber = typeof fallback === 'number' ? fallback : undefined;
  if (typeof fallbackNumber === 'number' && Number.isFinite(fallbackNumber)) {
    return Math.round(fallbackNumber * 100);
  }
  return undefined;
}

function mapWebhookQuote(payload: UnknownRecord, fallbackSubmissionId?: string): { submissionId: string; quote: EzlynxQuoteInput } | null {
  const submissionId =
    (typeof payload.submission_id === 'string' && payload.submission_id) ||
    (typeof payload.submissionId === 'string' && payload.submissionId) ||
    fallbackSubmissionId;

  if (!submissionId) return null;

  const carrierName =
    (typeof payload.carrier_name === 'string' && payload.carrier_name) ||
    (typeof payload.carrierName === 'string' && payload.carrierName) ||
    (typeof payload.carrier === 'string' && payload.carrier) ||
    '';

  const policyTypeRaw =
    (typeof payload.policy_type === 'string' && payload.policy_type) ||
    (typeof payload.policyType === 'string' && payload.policyType) ||
    (typeof payload.lineOfBusiness === 'string' && payload.lineOfBusiness) ||
    (typeof payload.lob === 'string' && payload.lob) ||
    undefined;

  const policyType = normalizePolicyType(policyTypeRaw);

  const annualPremiumCents = normalizeCents(payload.annual_premium_cents, payload.annual_premium ?? payload.annualPremium);
  const monthlyPremiumCents = normalizeCents(payload.monthly_premium_cents, payload.monthly_premium ?? payload.monthlyPremium);

  if (!carrierName || !policyType || annualPremiumCents === undefined) {
    return null;
  }

  const quote: EzlynxQuoteInput = {
    carrier_name: carrierName,
    carrier_logo_url:
      (typeof payload.carrier_logo_url === 'string' && payload.carrier_logo_url) ||
      (typeof payload.carrierLogoUrl === 'string' && payload.carrierLogoUrl) ||
      null,
    policy_type: policyType,
    monthly_premium_cents: monthlyPremiumCents ?? null,
    annual_premium_cents: annualPremiumCents,
    coverage_summary: (isRecord(payload.coverage_summary) && payload.coverage_summary) ||
      (isRecord(payload.coverageSummary) && payload.coverageSummary) ||
      (isRecord(payload.coverages) && payload.coverages) ||
      null,
    deductibles: (isRecord(payload.deductibles) && payload.deductibles) || null,
    is_recommended:
      (typeof payload.is_recommended === 'boolean' && payload.is_recommended) ||
      (typeof payload.recommended === 'boolean' && payload.recommended) ||
      false,
    recommendation_reason:
      (typeof payload.recommendation_reason === 'string' && payload.recommendation_reason) ||
      (typeof payload.recommendationReason === 'string' && payload.recommendationReason) ||
      null,
    bind_url:
      (typeof payload.bind_url === 'string' && payload.bind_url) ||
      (typeof payload.bindUrl === 'string' && payload.bindUrl) ||
      (typeof payload.quoteUrl === 'string' && payload.quoteUrl) ||
      null,
    ezlynx_quote_id:
      (typeof payload.ezlynx_quote_id === 'string' && payload.ezlynx_quote_id) ||
      (typeof payload.quoteId === 'string' && payload.quoteId) ||
      null,
    source: 'ezlynx_webhook',
    expires_at:
      (typeof payload.expires_at === 'string' && payload.expires_at) ||
      (typeof payload.expiresAt === 'string' && payload.expiresAt) ||
      null,
  };

  const parsed = quoteInputSchema.safeParse(quote);
  if (!parsed.success) {
    return null;
  }

  return { submissionId, quote: parsed.data };
}

export async function POST(request: NextRequest) {
  try {
    const expectedSecret = process.env.EZLYNX_WEBHOOK_SECRET;
    if (expectedSecret) {
      const providedSecret = request.headers.get('x-webhook-secret');
      if (providedSecret !== expectedSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await request.json();
    const quotesPayload: unknown[] = [];

    if (Array.isArray(body)) {
      quotesPayload.push(...body);
    } else if (isRecord(body)) {
      if (Array.isArray(body.quotes)) {
        quotesPayload.push(...body.quotes);
      } else if (isRecord(body.quote)) {
        quotesPayload.push(body.quote);
      } else {
        quotesPayload.push(body);
      }
    }

    const fallbackSubmissionId =
      isRecord(body) && typeof body.submission_id === 'string'
        ? body.submission_id
        : isRecord(body) && typeof body.submissionId === 'string'
          ? body.submissionId
          : undefined;

    const grouped = new Map<string, EzlynxQuoteInput[]>();
    quotesPayload.forEach((payload) => {
      if (!isRecord(payload)) return;
      const mapped = mapWebhookQuote(payload, fallbackSubmissionId);
      if (!mapped) return;
      const existing = grouped.get(mapped.submissionId) ?? [];
      existing.push(mapped.quote);
      grouped.set(mapped.submissionId, existing);
    });

    if (grouped.size === 0) {
      return NextResponse.json({ error: 'No valid quotes found in payload' }, { status: 400 });
    }

    const insertedIds: string[] = [];
    for (const [submissionId, quotes] of grouped.entries()) {
      const inserted = await createEzlynxQuotes(submissionId, quotes);
      insertedIds.push(...inserted.map((quote) => quote.id));
    }

    return NextResponse.json({ success: true, ids: insertedIds });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook processing failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
