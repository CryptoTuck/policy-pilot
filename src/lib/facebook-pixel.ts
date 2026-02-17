/**
 * Facebook Pixel Tracking for PolicyPilot
 *
 * Events:
 * - PageView: fires on every page (handled by pixel init)
 * - ViewContent: landing page load
 * - StartRegistration (custom): user clicks any CTA to /get-policy on the landing page
 * - OpenedCanopyConnect (custom): user clicks "Get my policy" on the get-policy page
 * - Lead: AI report page loads
 * - Contact: user clicks any "Contact Agent" CTA button
 *
 * Pixel ID: 930447229423663
 */

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    };
    _fbq: typeof window.fbq;
  }
}

export const FB_PIXEL_ID = '930447229423663';

let initialized = false;

/**
 * Initialize the Facebook Pixel. Call once on app load.
 * Loads the fbevents.js script and fires the initial PageView.
 */
export function initFacebookPixel() {
  if (initialized || typeof window === 'undefined') return;

  // Load fbevents.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  // Initialize fbq queue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fbq: any = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');

  initialized = true;
}

/**
 * Fire a PageView event. Call on every client-side route change
 * so Meta sees a PageView for each page in the SPA.
 */
export function fbTrackPageView() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

/**
 * Fire a standard Facebook Pixel event.
 */
function trackFbEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

/**
 * Fire a custom Facebook Pixel event.
 */
function trackFbCustomEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
}

/**
 * Set Advanced Matching user data on the pixel.
 * Re-initializes the pixel with PII so Meta can improve match rates.
 * Call when user data becomes available (e.g. report page).
 */
export function fbSetUserData(params: {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
}) {
  if (typeof window === 'undefined' || !window.fbq) return;

  const userData: Record<string, string> = {};
  if (params.email) userData.em = params.email.trim().toLowerCase();
  if (params.firstName) userData.fn = params.firstName.trim().toLowerCase();
  if (params.lastName) userData.ln = params.lastName.trim().toLowerCase();
  if (params.phone) {
    const digits = params.phone.replace(/\D/g, '');
    userData.ph = digits.length === 10 ? `1${digits}` : digits;
  }

  if (Object.keys(userData).length > 0) {
    window.fbq('init', FB_PIXEL_ID, userData);
  }
}

// ─── Event helpers ──────────────────────────────────────────────────────────

/** Landing page load */
export function fbTrackViewContent() {
  trackFbEvent('ViewContent');
}

/** User clicks "See My Policy Pilot Score" */
export function fbTrackStartRegistration() {
  trackFbCustomEvent('StartRegistration');
}

/** AI report page loads */
export function fbTrackLead(eventId?: string) {
  if (typeof window !== 'undefined' && window.fbq) {
    if (eventId) {
      window.fbq('track', 'Lead', {}, { eventID: eventId });
    } else {
      window.fbq('track', 'Lead');
    }
  }
}

/** User clicks "Get my policy" and opens Canopy Connect */
export function fbTrackOpenedCanopyConnect() {
  trackFbCustomEvent('OpenedCanopyConnect');
}

/** User clicks any "Contact Agent" CTA */
export function fbTrackContact() {
  trackFbEvent('Contact');
}
