'use client';

import { useEffect } from 'react';
import { initAnalytics } from '@/lib/analytics';
import { initFacebookPixel } from '@/lib/facebook-pixel';

/**
 * Initializes Amplitude analytics and Facebook Pixel on mount.
 * Drop this into the root layout to start tracking.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics();
    initFacebookPixel();
  }, []);

  return <>{children}</>;
}
