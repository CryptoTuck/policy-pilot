'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics } from '@/lib/analytics';
import { initFacebookPixel, fbTrackPageView } from '@/lib/facebook-pixel';

/**
 * Initializes Amplitude analytics and Facebook Pixel on mount.
 * Fires a Facebook PageView on every client-side route change.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Initialize once
  useEffect(() => {
    initAnalytics();
    initFacebookPixel(); // fires initial PageView
  }, []);

  // Fire PageView on subsequent route changes (init handles the first one)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      fbTrackPageView();
    }
  }, [pathname]);

  return <>{children}</>;
}
