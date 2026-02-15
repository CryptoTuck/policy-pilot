import { NextRequest, NextResponse } from 'next/server';
import { sendReportEmail, isResendConfigured } from '@/lib/resend';
import { getReport } from '@/lib/storage';

/**
 * POST /api/email/send-report
 *
 * Manually send (or resend) a report email.
 * Body: { reportId: string, email: string, name?: string }
 *
 * Useful for:
 * - Resending reports to customers
 * - Admin dashboard "send report" button
 * - Testing email delivery
 */
export async function POST(request: NextRequest) {
  try {
    // Simple auth — require webhook secret for manual sends
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.WEBHOOK_SECRET;

    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isResendConfigured()) {
      return NextResponse.json(
        { error: 'Resend not configured. Set RESEND_API_KEY in environment.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { reportId, email, name } = body as {
      reportId?: string;
      email?: string;
      name?: string;
    };

    if (!reportId || !email) {
      return NextResponse.json(
        { error: 'reportId and email are required' },
        { status: 400 }
      );
    }

    // Fetch the report
    const report = await getReport(reportId);
    if (!report) {
      return NextResponse.json(
        { error: `Report ${reportId} not found` },
        { status: 404 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const reportUrl = `${baseUrl}/report/${report.id}`;

    const overallGrade =
      report.combinedGrade ||
      report.homeGrade?.overallGrade ||
      report.autoGrade?.overallGrade;

    const summary = report.homeGrade?.summary || report.autoGrade?.summary;

    const result = await sendReportEmail({
      to: email,
      customerName: name,
      reportUrl,
      overallGrade,
      overallScore: report.combinedScore,
      homeGrade: report.homeGrade?.overallGrade,
      autoGrade: report.autoGrade?.overallGrade,
      summary,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emailId: result.emailId,
      sentTo: email,
    });
  } catch (error) {
    console.error('[Email API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
