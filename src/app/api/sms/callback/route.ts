import { NextRequest, NextResponse } from 'next/server';
import { sendAgentCallbackSMS, isTwilioConfigured } from '@/lib/twilio';
import { getSupabaseClient } from '@/lib/supabase';

/**
 * POST /api/sms/callback
 * 
 * Send SMS confirmation that an agent will reach out.
 * Also stores the callback request in Supabase.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, name, reportId } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format (basic check)
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }

    // Store callback request in Supabase
    try {
      const supabase = getSupabaseClient();
      await supabase.from('callback_requests').insert({
        phone_number: phone,
        customer_name: name || null,
        submission_id: reportId || null,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
    } catch (dbError) {
      // Log but don't fail if DB insert fails
      console.error('[SMS Callback] DB insert error:', dbError);
    }

    // Send SMS
    if (!isTwilioConfigured()) {
      console.log('[SMS Callback] Twilio not configured, skipping SMS');
      return NextResponse.json({
        success: true,
        message: 'Callback request received (SMS disabled)',
        smsSent: false,
      });
    }

    const result = await sendAgentCallbackSMS(phone, name);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'SMS sent successfully',
        messageId: result.messageId,
        smsSent: true,
      });
    } else {
      // Still return success for the callback request, but note SMS failed
      return NextResponse.json({
        success: true,
        message: 'Callback request received, but SMS failed to send',
        error: result.error,
        smsSent: false,
      });
    }
  } catch (error) {
    console.error('[SMS Callback] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process callback request' },
      { status: 500 }
    );
  }
}
