/**
 * Amplitude Analytics for PolicyPilot
 *
 * Tracks user journey: get-policy page → report page → CTA actions → email
 *
 * Setup: Set NEXT_PUBLIC_AMPLITUDE_API_KEY in .env.local
 * Free tier: 50K MTUs, 1K session replays/month
 */

import * as amplitude from '@amplitude/analytics-browser';

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
 * Track when Canopy widget completes successfully
 */
export function trackCanopyCompleted() {
  amplitude.track('Canopy Completed');
}

/**
 * Track when user closes Canopy widget without completing
 */
export function trackCanopyExited() {
  amplitude.track('Canopy Exited');
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
