import { NextRequest, NextResponse } from 'next/server';
import { gradeCanopyPolicy } from '@/lib/canopy-grader';
import { generateId, storeReport, storeReportByToken } from '@/lib/storage';
import { sendReportEmail, isResendConfigured } from '@/lib/resend';

type UnknownRecord = Record<string, unknown>;

function tryParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function extractTokenFromObject(candidate: unknown): string | undefined {
  if (!candidate) return undefined;

  if (typeof candidate === 'string') {
    const parsed = tryParseJson(candidate);
    if (parsed && typeof parsed === 'object') {
      return extractTokenFromObject(parsed);
    }
    return undefined;
  }

  if (typeof candidate === 'object') {
    const record = candidate as UnknownRecord;
    const token =
      (typeof record.sessionToken === 'string' && record.sessionToken) ||
      (typeof record.session_token === 'string' && record.session_token);
    return token || undefined;
  }

  return undefined;
}

function findSessionToken(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined;

  const record = payload as UnknownRecord;
  const possibleRoots: unknown[] = [
    record,
    record.data,
    record.payload,
  ];

  const metadataKeys = [
    'pullMetaData',
    'pullMetadata',
    'pull_meta_data',
    'metadata',
    'metaData',
    'MetaData',
  ];

  for (const root of possibleRoots) {
    if (!root || typeof root !== 'object') continue;
    const rootRecord = root as UnknownRecord;

    for (const key of metadataKeys) {
      const token = extractTokenFromObject(rootRecord[key]);
      if (token) return token;
    }

    const directToken = extractTokenFromObject(rootRecord);
    if (directToken) return directToken;
  }

  return undefined;
}

/**
 * Extract customer email from Canopy webhook payload.
 * Canopy can nest this under various keys depending on the integration.
 */
function findCustomerEmail(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined;
  const record = payload as UnknownRecord;

  // Direct fields
  const directKeys = ['email', 'customerEmail', 'customer_email', 'userEmail', 'user_email'];
  for (const key of directKeys) {
    if (typeof record[key] === 'string' && record[key]) {
      return record[key] as string;
    }
  }

  // Nested under common containers
  const containers = ['customer', 'user', 'contact', 'data', 'payload', 'pullMetaData', 'pullMetadata', 'metadata'];
  for (const containerKey of containers) {
    const container = record[containerKey];
    if (container && typeof container === 'object') {
      const nested = container as UnknownRecord;
      for (const key of directKeys) {
        if (typeof nested[key] === 'string' && nested[key]) {
          return nested[key] as string;
        }
      }
    }
    // Also try parsing string containers (Zapier sometimes sends JSON strings)
    if (typeof container === 'string') {
      try {
        const parsed = JSON.parse(container) as UnknownRecord;
        for (const key of directKeys) {
          if (typeof parsed[key] === 'string' && parsed[key]) {
            return parsed[key] as string;
          }
        }
      } catch { /* not JSON, skip */ }
    }
  }

  return undefined;
}

/**
 * Extract customer name from Canopy webhook payload.
 */
function findCustomerName(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined;
  const record = payload as UnknownRecord;

  const nameKeys = ['name', 'customerName', 'customer_name', 'fullName', 'full_name', 'firstName', 'first_name'];
  for (const key of nameKeys) {
    if (typeof record[key] === 'string' && record[key]) {
      return record[key] as string;
    }
  }

  const containers = ['customer', 'user', 'contact', 'data', 'payload', 'pullMetaData', 'pullMetadata', 'metadata'];
  for (const containerKey of containers) {
    const container = record[containerKey];
    if (container && typeof container === 'object') {
      const nested = container as UnknownRecord;
      for (const key of nameKeys) {
        if (typeof nested[key] === 'string' && nested[key]) {
          return nested[key] as string;
        }
      }
    }
  }

  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const webhookSecret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.WEBHOOK_SECRET;

    if (expectedSecret && webhookSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the incoming data
    const rawData = await request.json();

    // Validate we have at least some coverage data
    if (!rawData.autoCoverage && !rawData.homeCoverage) {
      return NextResponse.json(
        { error: 'At least one coverage type (autoCoverage or homeCoverage) must be provided' },
        { status: 400 }
      );
    }

    const id = generateId();

    // Grade the policy using OpenAI (pass data directly)
    const report = await gradeCanopyPolicy(id, rawData);

    // Store the report
    await storeReport(report);

    // If a session token was passed via Canopy pullMetaData, link it to this report
    const sessionToken = findSessionToken(rawData);

    if (sessionToken) {
      await storeReportByToken(sessionToken, report.id);
    } else {
      console.warn('Webhook payload missing session token; report not linked to polling.');
    }

    // Build the report URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const reportUrl = `${baseUrl}/report/${report.id}`;

    // Send report email if Resend is configured and we have a customer email
    const customerEmail = findCustomerEmail(rawData);
    const customerName = findCustomerName(rawData);
    let emailSent = false;

    if (customerEmail && isResendConfigured()) {
      const overallGrade = report.combinedGrade
        || report.homeGrade?.overallGrade
        || report.autoGrade?.overallGrade;
      const summary = report.homeGrade?.summary || report.autoGrade?.summary;

      const emailResult = await sendReportEmail({
        to: customerEmail,
        customerName,
        reportUrl,
        overallGrade,
        overallScore: report.combinedScore,
        homeGrade: report.homeGrade?.overallGrade,
        autoGrade: report.autoGrade?.overallGrade,
        summary,
      });

      emailSent = emailResult.success;
      if (!emailResult.success) {
        console.warn('[Webhook] Failed to send report email:', emailResult.error);
      }
    } else if (!customerEmail) {
      console.warn('[Webhook] No customer email found in payload, skipping email delivery');
    }

    return NextResponse.json({
      success: true,
      reportId: report.id,
      reportUrl,
      grade: report.combinedGrade || report.homeGrade?.overallGrade || report.autoGrade?.overallGrade,
      emailSent,
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Allow GET for Zapier webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' });
}
