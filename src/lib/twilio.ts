/**
 * Twilio SMS Service
 * 
 * Handles sending SMS messages via Twilio API
 */

import twilio from 'twilio';

// Initialize Twilio client
let twilioClient: ReturnType<typeof twilio> | null = null;

function getTwilioClient() {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.');
    }

    twilioClient = twilio(accountSid, authToken);
  }
  return twilioClient;
}

/**
 * Check if Twilio is configured
 */
export function isTwilioConfigured(): boolean {
  return !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_MESSAGING_SERVICE_SID
  );
}

/**
 * Send an SMS message
 */
export async function sendSMS(to: string, body: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!isTwilioConfigured()) {
      console.warn('[Twilio] Not configured, skipping SMS');
      return { success: false, error: 'Twilio not configured' };
    }

    const client = getTwilioClient();
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

    // Normalize phone number (ensure it has country code)
    const normalizedTo = normalizePhoneNumber(to);

    const message = await client.messages.create({
      body,
      messagingServiceSid,
      to: normalizedTo,
    });

    console.log('[Twilio] SMS sent:', message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('[Twilio] Error sending SMS:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send agent callback confirmation SMS
 */
export async function sendAgentCallbackSMS(to: string, customerName?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const greeting = customerName ? `Hi ${customerName}!` : 'Hi!';
  const body = `${greeting} Thanks for your interest in improving your coverage. A licensed insurance agent will reach out to you shortly to discuss your options. - Policy Pilot`;
  
  return sendSMS(to, body);
}

/**
 * Normalize phone number to E.164 format
 */
function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If it's a 10-digit US number, add +1
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // If it's 11 digits starting with 1 (US with country code), add +
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  // If it already has a +, return as-is
  if (phone.startsWith('+')) {
    return phone;
  }
  
  // Otherwise, assume US and add +1
  return `+1${digits}`;
}
