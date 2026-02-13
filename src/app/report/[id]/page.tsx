import { notFound } from 'next/navigation';
import { getReport } from '@/lib/storage';
import { StickyCtaButton } from '@/components/StickyCtaButton';
import { ReportContent } from '@/components/ReportContent';
import Link from 'next/link';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const report = await getReport(id);

  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Policy Pilot</span>
          </Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <ReportContent report={report} />
      </main>

      {/* Sticky CTA Button */}
      <StickyCtaButton />
    </div>
  );
}
