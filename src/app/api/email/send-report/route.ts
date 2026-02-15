import { NextRequest, NextResponse } from 'next/server';
import { sendReportEmail, isResendConfigured } from '@/lib/resend';
import { getReport } from '@/lib/storage';
import { generateReportPdf } from '@/lib/pdf-report';

/**
 * POST /api/email/send-report
 *
 * User-initiated: sends the grading report to the provided email.
 * Called from the report page when the user opts in via the CTA modal.
 *
 * Body: { reportId: string, email: string, name?: string }
 */
export async function POST(request: NextRequest) {
  try {
    if (!isResendConfigured()) {
      return NextResponse.json(
        { error: 'Email service not configured' },
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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Fetch the report
    const report = await getReport(reportId);
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const reportUrl = `${baseUrl}/report/${report.id}`;

    // Generate PDF attachment
    let attachments: { filename: string; content: Buffer }[] | undefined;
    try {
      const pdfBuffer = await generateReportPdf(report);
      attachments = [{ filename: 'PolicyPilot-Report.pdf', content: pdfBuffer }];
    } catch (pdfError) {
      console.error('[Email API] PDF generation failed, sending without attachment:', pdfError);
    }

    const result = await sendReportEmail({
      to: email,
      customerName: name,
      reportUrl,
      attachments,
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
    });
  } catch (error) {
    console.error('[Email API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
