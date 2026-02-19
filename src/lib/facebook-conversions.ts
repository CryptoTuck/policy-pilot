/**
 * Facebook Conversions API (Server-Side) for PolicyPilot
 *
 * Sends server-side events to Meta for better ad attribution.
 * Pairs with the client-side pixel to give Meta "Browser and Server" coverage.
 *
 * Uses Node.js crypto for SHA-256 hashing — no external deps.
 */

import { createHash } from 'crypto';

const GRAPH_API_VERSION = 'v21.0';

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * SHA-256 hash a value after lowercasing and trimming.
 * Meta requires all PII to be hashed before sending.
 * Returns undefined if value is falsy.
 */
function hashForMeta(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  return createHash('sha256')
    .update(value.trim().toLowerCase())
    .digest('hex');
}

/**
 * Normalize a US phone number to E.164 format (digits only, with country code).
 * E.g. "(555) 123-4567" → "15551234567"
 */
function normalizePhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return digits;
  return digits || undefined;
}

// ─── Core ───────────────────────────────────────────────────────────────────

interface FacebookUserData {
  em?: string;  // hashed email
  ph?: string;  // hashed phone
  fn?: string;  // hashed first name
  ln?: string;  // hashed last name
  ct?: string;  // hashed city
  st?: string;  // hashed state (2-letter code)
  zp?: string;  // hashed zip
  country?: string; // hashed country code
  fbc?: string; // Facebook click ID cookie (_fbc) — NOT hashed
  fbp?: string; // Facebook browser ID cookie (_fbp) — NOT hashed
  external_id?: string; // hashed external ID
  client_ip_address?: string; // user's IP — NOT hashed
  client_user_agent?: string; // user's browser UA — NOT hashed
}

interface FacebookConversionParams {
  eventName: string;
  eventId?: string;
  userData: FacebookUserData;
  customData?: Record<string, unknown>;
  eventSourceUrl?: string;
  testEventCode?: string;
}

/**
 * Send a single event to the Facebook Conversions API.
 * Fire-and-forget — errors are logged but never thrown.
 */
export async function trackFacebookConversion(params: FacebookConversionParams) {
  const pixelId = process.env.FB_PIXEL_ID;
  const accessToken = process.env.FB_CONVERSIONS_API_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('[FB CAPI] FB_PIXEL_ID or FB_CONVERSIONS_API_TOKEN not set, skipping');
    return;
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: params.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        ...(params.eventId && { event_id: params.eventId }),
        ...(params.eventSourceUrl && { event_source_url: params.eventSourceUrl }),
        user_data: params.userData,
        ...(params.customData && { custom_data: params.customData }),
      },
    ],
    access_token: accessToken,
  };

  if (params.testEventCode) {
    payload.test_event_code = params.testEventCode;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      console.error('[FB CAPI] API error:', res.status, body);
    }
  } catch (error) {
    console.error('[FB CAPI] Network error:', error);
  }
}

// ─── Convenience Wrappers ───────────────────────────────────────────────────

interface TrackFacebookLeadParams {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  submissionId: string;
  insuranceProvider?: string | null;
  overallGrade?: string;
  overallScore?: number;
  fbc?: string;
  fbp?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
}

/**
 * Send a Lead event to Meta Conversions API.
 * Call this from the webhook after a report is generated.
 */
export function trackFacebookLead(params: TrackFacebookLeadParams) {
  const userData: FacebookUserData = {};

  if (params.email) userData.em = hashForMeta(params.email);
  if (params.phone) userData.ph = hashForMeta(normalizePhone(params.phone));
  if (params.firstName) userData.fn = hashForMeta(params.firstName);
  if (params.lastName) userData.ln = hashForMeta(params.lastName);
  if (params.city) userData.ct = hashForMeta(params.city);
  if (params.state) userData.st = hashForMeta(params.state);
  if (params.zip) userData.zp = hashForMeta(params.zip);
  userData.country = hashForMeta('us');
  userData.external_id = hashForMeta(params.submissionId);
  if (params.fbc) userData.fbc = params.fbc;
  if (params.fbp) userData.fbp = params.fbp;
  if (params.clientIpAddress) userData.client_ip_address = params.clientIpAddress;
  if (params.clientUserAgent) userData.client_user_agent = params.clientUserAgent;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  trackFacebookConversion({
    eventName: 'Lead',
    eventId: `lead_${params.submissionId}`,
    userData,
    customData: {
      submission_id: params.submissionId,
      ...(params.insuranceProvider && { insurance_provider: params.insuranceProvider }),
      ...(params.overallGrade && { overall_grade: params.overallGrade }),
      ...(params.overallScore !== undefined && { overall_score: params.overallScore }),
    },
    eventSourceUrl: `${baseUrl}/report/${params.submissionId}`,
  });
}
