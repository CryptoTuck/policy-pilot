/**
 * Amplitude Analytics for PolicyPilot
 *
 * Tracks user journey: get-policy page → report page → CTA actions → email
 *
 * Setup: Set NEXT_PUBLIC_AMPLITUDE_API_KEY in .env.local
 * Free tier: 50K MTUs, 1K session replays/month
 */

import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

let initialized = false;

/**
 * Initialize Amplitude — call once on app load.
 * Safe to call multiple times (no-ops after first init).
 */
export function initAnalytics() {
  if (initialized) return;

  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) {
    console.warn('[Analytics] NEXT_PUBLIC_AMPLITUDE_API_KEY not set, skipping init');
    return;
  }

  // Add session replay plugin (free tier: 1K replays/month)
  const sessionReplay = sessionReplayPlugin({
    sampleRate: 1,
  });
  amplitude.add(sessionReplay);

  amplitude.init(apiKey, {
    // Automatically track page views on route changes
    autocapture: {
      pageViews: true,
      sessions: true,
      formInteractions: true,
      elementInteractions: true,
    },
    // Default to US server
    serverZone: 'US',
    // Respect user privacy
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: true,
    },
  });

  initialized = true;
}

// ─── User Identification ─────────────────────────────────────────────────────

/**
 * Identify a user by email and set profile traits.
 * Call once when customer data becomes available (e.g. report page).
 */
export function identifyUser(params: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}) {
  amplitude.setUserId(params.email);

  const identify = new amplitude.Identify();
  identify.set('email', params.email);
  if (params.firstName) identify.set('first_name', params.firstName);
  if (params.lastName) identify.set('last_name', params.lastName);

  amplitude.identify(identify);
}

// ─── Event Tracking ──────────────────────────────────────────────────────────

/**
 * Track when a user lands on the get-policy page
 */
export function trackGetPolicyPageView() {
  amplitude.track('Get Policy Page Viewed');
}

/**
 * Track when user clicks "Get my policy" to open Canopy widget
 */
export function trackGetPolicyStarted() {
  amplitude.track('Get Policy Started');
}

/**
 * Track when user lands on their report page
 */
export function trackReportPageView(properties?: {
  reportId?: string;
  overallGrade?: string;
  hasHomePolicy?: boolean;
  hasAutoPolicy?: boolean;
}) {
  amplitude.track('Report Page Viewed', properties);
}

/**
 * Track when user clicks "Find Me a Better Policy" CTA
 */
export function trackCtaClicked(source: 'sticky_bar' | 'section_analysis') {
  amplitude.track('CTA Clicked - Find Better Policy', { source });
}

/**
 * Track when user clicks "Email Me My Report"
 */
export function trackEmailReportRequested(source: 'sticky_modal' | 'section_modal') {
  amplitude.track('Email Report Requested', { source });
}

/**
 * Track when report email is successfully sent
 */
export function trackEmailReportSent(source: 'sticky_modal' | 'section_modal') {
  amplitude.track('Email Report Sent', { source });
}

/**
 * Track when report email fails
 */
export function trackEmailReportFailed(source: 'sticky_modal' | 'section_modal', error?: string) {
  amplitude.track('Email Report Failed', { source, error });
}

// ─── Server-Side Tracking ───────────────────────────────────────────────────

/**
 * Track an event server-side via Amplitude's HTTP API.
 * Use this for events that originate on the server (e.g. webhook handlers).
 */
export async function trackServerEvent(
  eventType: string,
  properties?: Record<string, unknown>,
  userId?: string,
) {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) return;

  try {
    await fetch('https://api2.amplitude.com/2/httpapi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        events: [{
          event_type: eventType,
          ...(userId ? { user_id: userId } : { device_id: 'server' }),
          event_properties: properties,
          time: Date.now(),
        }],
      }),
    });
  } catch (error) {
    console.error('[Analytics] Server-side track failed:', error);
  }
}
