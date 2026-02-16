'use client';

import { useEffect } from 'react';
import { trackReportPageView, identifyUser } from '@/lib/analytics';
import { fbTrackLead } from '@/lib/facebook-pixel';

interface ReportAnalyticsProps {
  reportId: string;
  overallGrade?: string;
  hasHomePolicy: boolean;
  hasAutoPolicy: boolean;
  customerEmail?: string | null;
  customerFirstName?: string | null;
  customerLastName?: string | null;
}

/**
 * Identifies the user and fires report page view event on mount.
 * Placed as a client component inside the server-rendered report page.
 */
export function ReportAnalytics({
  reportId,
  overallGrade,
  hasHomePolicy,
  hasAutoPolicy,
  customerEmail,
  customerFirstName,
  customerLastName,
}: ReportAnalyticsProps) {
  useEffect(() => {
    if (customerEmail) {
      identifyUser({
        email: customerEmail,
        firstName: customerFirstName,
        lastName: customerLastName,
      });
    }

    trackReportPageView({
      reportId,
      overallGrade,
      hasHomePolicy,
      hasAutoPolicy,
    });
    fbTrackLead(`lead_${reportId}`);
  }, [reportId, overallGrade, hasHomePolicy, hasAutoPolicy, customerEmail, customerFirstName, customerLastName]);

  return null;
}
