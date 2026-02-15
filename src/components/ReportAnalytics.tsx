'use client';

import { useEffect } from 'react';
import { trackReportPageView } from '@/lib/analytics';

interface ReportAnalyticsProps {
  reportId: string;
  overallGrade?: string;
  hasHomePolicy: boolean;
  hasAutoPolicy: boolean;
}

/**
 * Fires report page view event on mount.
 * Placed as a client component inside the server-rendered report page.
 */
export function ReportAnalytics({
  reportId,
  overallGrade,
  hasHomePolicy,
  hasAutoPolicy,
}: ReportAnalyticsProps) {
  useEffect(() => {
    trackReportPageView({
      reportId,
      overallGrade,
      hasHomePolicy,
      hasAutoPolicy,
    });
  }, [reportId, overallGrade, hasHomePolicy, hasAutoPolicy]);

  return null;
}
