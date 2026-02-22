import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEzlynxQuotes, getEzlynxQuotes, EzlynxQuoteInput } from '@/lib/supabase';

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

const quoteSchemaWithSubmission = quoteInputSchema.extend({
  submission_id: z.string().uuid(),
});

const bulkSchema = z.object({
  submission_id: z.string().uuid(),
  quotes: z.array(quoteInputSchema).min(1),
});

function normalizeBulkQuotes(input: unknown): Array<{ submissionId: string; quotes: EzlynxQuoteInput[] }> {
  if (Array.isArray(input)) {
    const parsed = z.array(quoteSchemaWithSubmission).parse(input);
    const grouped = new Map<string, EzlynxQuoteInput[]>();
    parsed.forEach((quote) => {
      const { submission_id, ...rest } = quote;
      const existing = grouped.get(submission_id) ?? [];
      existing.push(rest);
      grouped.set(submission_id, existing);
    });
    return Array.from(grouped.entries()).map(([submissionId, quotes]) => ({ submissionId, quotes }));
  }

  const parsed = bulkSchema.parse(input);
  return [{ submissionId: parsed.submission_id, quotes: parsed.quotes }];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const groupedQuotes = normalizeBulkQuotes(body);

    const insertedIds: string[] = [];
    for (const group of groupedQuotes) {
      const inserted = await createEzlynxQuotes(group.submissionId, group.quotes);
      insertedIds.push(...inserted.map((quote) => quote.id));
    }

    return NextResponse.json({ success: true, ids: insertedIds });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const submissionId = searchParams.get('submissionId');

  if (!submissionId) {
    return NextResponse.json({ error: 'Missing submissionId query param' }, { status: 400 });
  }

  try {
    const quotes = await getEzlynxQuotes(submissionId);
    return NextResponse.json({ success: true, quotes });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch quotes';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
