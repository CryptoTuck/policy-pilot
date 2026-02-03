import { NextRequest, NextResponse } from 'next/server';
import { gradeCanopyPolicy } from '@/lib/canopy-grader';
import { generateId, storeReport, storeReportByToken } from '@/lib/storage';

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
    console.log('[Webhook] payload received', {
      keys: Object.keys(rawData ?? {}),
      metaDataKeys: Object.keys(rawData?.MetaData ?? {}),
      metadataKeys: Object.keys(rawData?.metadata ?? {}),
      pullMetaDataKeys: Object.keys(rawData?.pullMetaData ?? {}),
      pullMetadataKeys: Object.keys(rawData?.pullMetadata ?? {}),
    });

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
    const sessionToken = rawData.MetaData?.sessionToken
      || rawData.metadata?.sessionToken
      || rawData.pullMetaData?.sessionToken
      || rawData.pullMetadata?.sessionToken;

    if (sessionToken) {
      console.log('[Webhook] session token linked', { sessionToken, reportId: report.id });
      await storeReportByToken(sessionToken, report.id);
    } else {
      console.warn('[Webhook] session token missing');
    }

    // Return the report URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const reportUrl = `${baseUrl}/report/${report.id}`;

    return NextResponse.json({
      success: true,
      reportId: report.id,
      reportUrl,
      grade: report.combinedGrade || report.homeGrade?.overallGrade || report.autoGrade?.overallGrade,
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
