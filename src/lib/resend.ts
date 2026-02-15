/**
 * Resend Email Service
 *
 * Handles sending transactional emails via Resend.
 * Used for delivering policy grading reports to users.
 *
 * Setup: https://resend.com — 3,000 emails/month free tier
 */

import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        'RESEND_API_KEY not configured. Get one at https://resend.com/api-keys'
      );
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * Check if Resend is configured
 */
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

/**
 * Get the "from" address — uses verified domain or Resend's onboarding address
 */
function getFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL || 'Policy Pilot <admin@mypolicypilot.ai>';
}

interface SendReportEmailParams {
  to: string;
  customerName?: string;
  reportUrl: string;
  attachments?: { filename: string; content: Buffer }[];
}

/**
 * Send the policy grading report email to a customer
 */
export async function sendReportEmail(
  params: SendReportEmailParams
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  if (!isResendConfigured()) {
    console.warn('[Resend] Not configured, skipping email');
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const resend = getResendClient();
    const { to, customerName, reportUrl, attachments } = params;

    const subject = 'Your Policy Pilot Report is Ready!';

    const html = buildReportEmailHtml({
      customerName,
      reportUrl,
    });

    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [to],
      subject,
      html,
      ...(attachments && attachments.length > 0 ? { attachments } : {}),
    });

    if (error) {
      console.error('[Resend] API error:', error);
      return { success: false, error: error.message };
    }

    console.log('[Resend] Email sent:', data?.id);
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('[Resend] Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send a simple notification email (for admin alerts, etc.)
 */
export async function sendNotificationEmail(
  to: string,
  subject: string,
  body: string
): Promise<{ success: boolean; error?: string }> {
  if (!isResendConfigured()) {
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: [to],
      subject,
      html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">${body}</div>`,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ─── Email HTML Template ────────────────────────────────────────────────────

interface EmailTemplateParams {
  customerName?: string;
  reportUrl: string;
}

function buildReportEmailHtml(params: EmailTemplateParams): string {
  const { customerName, reportUrl } = params;
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Policy Pilot Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #06b6d4); border-radius: 10px; line-height: 40px; margin-bottom: 8px;">
        <span style="color: white; font-size: 20px;">✈</span>
      </div>
      <h1 style="margin: 8px 0 0; font-size: 24px; font-weight: 700; color: #111827;">Policy Pilot</h1>
    </div>

    <!-- Main Card -->
    <div style="background-color: #ffffff; border-radius: 12px; padding: 40px 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

      <p style="margin: 0 0 16px; font-size: 16px; color: #374151; line-height: 1.6;">${greeting}</p>
      <p style="margin: 0 0 16px; font-size: 16px; color: #374151; line-height: 1.6;">Thank you for using Policy Pilot!</p>
      <p style="margin: 0 0 32px; font-size: 16px; color: #374151; line-height: 1.6;">Your Report &amp; Policy Pilot Score are ready and attached for your reference. Take a look to see how your current policy stacks up and where improvements might be possible.</p>

      <!-- CTA Button -->
      <div style="text-align: center; margin-top: 8px;">
        <a href="${reportUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3b82f6, #06b6d4); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.02em;">View Full Report →</a>
      </div>

      <p style="margin: 32px 0 0; font-size: 14px; color: #6b7280; text-align: center; line-height: 1.6;">— The Policy Pilot Team</p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 24px;">
      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
        This report is for informational purposes only and does not constitute insurance advice.
        Consult a licensed insurance professional for personalized recommendations.
      </p>
      <p style="margin: 12px 0 0; font-size: 12px; color: #9ca3af;">
        © ${new Date().getFullYear()} Policy Pilot. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
}
