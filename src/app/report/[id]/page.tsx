import { notFound } from 'next/navigation';
import { getReport } from '@/lib/storage';
import { getDemoReport } from '@/lib/demo-reports';
import { getSubmissionWithDetails } from '@/lib/supabase';
import { StickyCtaButton } from '@/components/StickyCtaButton';
import { ReportContent } from '@/components/ReportContent';
import { ReportAnalytics } from '@/components/ReportAnalytics';
import Link from 'next/link';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const isDemo = id.startsWith('demo-');
  const report = isDemo ? getDemoReport(id) : await getReport(id);

  if (!report) {
    notFound();
  }

  // Fetch customer info for email + analytics (skip for demo reports)
  let customerEmail: string | null = null;
  let customerFirstName: string | null = null;
  let customerLastName: string | null = null;
  let customerPhone: string | null = null;
  if (!isDemo) {
    try {
      const { submission } = await getSubmissionWithDetails(id);
      if (submission) {
        customerEmail = submission.customer_email;
        customerFirstName = submission.customer_first_name;
        customerLastName = submission.customer_last_name;
        customerPhone = submission.customer_phone;
      }
    } catch {
      // Continue without customer data
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F6FA]">
      {/* Header */}
      <header>
        <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Policy Pilot" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-gray-900">Policy Pilot</span>
          </Link>
        </nav>
      </header>

      <ReportAnalytics
        reportId={id}
        overallGrade={report.combinedGrade || report.homeGrade?.overallGrade || report.autoGrade?.overallGrade}
        hasHomePolicy={!!report.homeGrade}
        hasAutoPolicy={!!report.autoGrade}
        customerEmail={customerEmail}
        customerFirstName={customerFirstName}
        customerLastName={customerLastName}
        customerPhone={customerPhone}
      />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <ReportContent report={report} />
      </main>

      {/* Sticky CTA Button */}
      <StickyCtaButton />
    </div>
  );
}
