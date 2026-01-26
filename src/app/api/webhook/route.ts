import { NextRequest, NextResponse } from 'next/server';
import { policySubmissionSchema } from '@/lib/validation';
import { gradePolicy } from '@/lib/grader';
import { generateId, storeSubmission, storeReport } from '@/lib/storage';
import type { PolicySubmission } from '@/types/policy';

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

    // Parse and validate the incoming data
    const rawData = await request.json();
    const validationResult = policySubmissionSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid policy data',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    // Create submission with generated ID
    const submission: PolicySubmission = {
      id: generateId(),
      submittedAt: new Date().toISOString(),
      ...validationResult.data,
    };

    // Store the submission
    await storeSubmission(submission);

    // Grade the policy
    const report = await gradePolicy(submission);

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
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Allow GET for Zapier webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' });
}
