import { NextRequest, NextResponse } from 'next/server';
import { gradeCanopyPolicy } from '@/lib/canopy-grader';
import { generateId, storeReport } from '@/lib/storage';

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
