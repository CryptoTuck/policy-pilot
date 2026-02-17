'use client';

import { useEffect } from 'react';
import { trackReportPageView, identifyUser } from '@/lib/analytics';
import { fbTrackLead, fbSetUserData } from '@/lib/facebook-pixel';

interface ReportAnalyticsProps {
  reportId: string;
  overallGrade?: string;
  hasHomePolicy: boolean;
  hasAutoPolicy: boolean;
  customerEmail?: string | null;
  customerFirstName?: string | null;
  customerLastName?: string | null;
  customerPhone?: string | null;
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
  customerPhone,
}: ReportAnalyticsProps) {
  useEffect(() => {
    if (customerEmail) {
      identifyUser({
        email: customerEmail,
        firstName: customerFirstName,
        lastName: customerLastName,
      });
    }

    // Set Advanced Matching data on the pixel before firing Lead
    fbSetUserData({
      email: customerEmail,
      firstName: customerFirstName,
      lastName: customerLastName,
      phone: customerPhone,
    });

    trackReportPageView({
      reportId,
      overallGrade,
      hasHomePolicy,
      hasAutoPolicy,
    });
    fbTrackLead(`lead_${reportId}`);
  }, [reportId, overallGrade, hasHomePolicy, hasAutoPolicy, customerEmail, customerFirstName, customerLastName, customerPhone]);

  return null;
}
