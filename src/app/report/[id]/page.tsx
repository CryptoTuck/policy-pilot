import { notFound } from 'next/navigation';
import { getReport } from '@/lib/storage';
import { CoverageTable } from '@/components/CoverageTable';
import { AdditionalCoverageTable } from '@/components/AdditionalCoverageTable';
import { SectionAnalysis } from '@/components/SectionAnalysis';
import Link from 'next/link';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

function PolicyTabs({ hasHome, hasAuto }: { hasHome: boolean; hasAuto: boolean }) {
  if (!hasHome || !hasAuto) return null;

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-full bg-gray-100 p-1">
        <a
          href="#home"
          className="px-6 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm"
        >
          Home
        </a>
        <a
          href="#auto"
          className="px-6 py-2 text-sm font-medium rounded-full text-gray-600 hover:text-gray-900"
        >
          Auto
        </a>
      </div>
    </div>
  );
}

function getGradeDescription(grade: string): string {
  switch (grade) {
    case 'A':
      return 'Excellent coverage with strong protection across all areas';
    case 'B':
      return 'Good coverage with some areas for improvement';
    case 'C':
      return 'Adequate coverage with notable gaps to address';
    case 'D':
      return 'Below average coverage with significant gaps';
    case 'F':
      return 'Poor coverage with critical gaps that need immediate attention';
    default:
      return 'Coverage assessment complete';
  }
}

function calculateSectionScore(coverages: { score: number; maxScore: number }[]): { score: number; maxScore: number } {
  const score = coverages.reduce((sum, c) => sum + c.score, 0);
  const maxScore = coverages.reduce((sum, c) => sum + c.maxScore, 0);
  return { score, maxScore };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const report = getReport(id);

  if (!report) {
    notFound();
  }

  const { homeGrade, autoGrade, combinedGrade } = report;
  const displayGrade = combinedGrade || homeGrade?.overallGrade || autoGrade?.overallGrade || 'N/A';

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
        {/* Demo Banner */}
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
            Policy Report - Generated {new Date(report.generatedAt).toLocaleDateString()}
          </div>
        </div>

        {/* Policy Type Tabs */}
        <PolicyTabs hasHome={!!homeGrade} hasAuto={!!autoGrade} />

        {/* Overall Grade Header */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm">Policy Holder</p>
          <p className="text-blue-500 text-sm font-medium">Policy Pilot Report</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Overall Policy Grade: {displayGrade}
          </h1>
          <p className="text-gray-500 mt-1">{getGradeDescription(displayGrade)}</p>
        </div>

        {/* Home Policy Section */}
        {homeGrade && (
          <div id="home">
            {/* Standard Coverages */}
            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Standard Coverages{' '}
                <span className="text-base font-normal text-gray-500">
                  (Coverages that come with standard HOI policy)
                </span>
              </h2>
              <div className="mt-4">
                <CoverageTable coverages={homeGrade.standardCoverages} />
              </div>

              <SectionAnalysis
                title="Standard Coverage"
                score={calculateSectionScore(homeGrade.standardCoverages).score}
                maxScore={calculateSectionScore(homeGrade.standardCoverages).maxScore}
                analysis={homeGrade.summary}
              />
            </section>

            {/* Deductible */}
            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Deductible</h2>
              <CoverageTable
                coverages={[homeGrade.deductibleGrade]}
                columns={{
                  name: 'Type',
                  limit: 'Amount',
                  score: 'Score',
                  explanation: 'What It Means'
                }}
              />

              <SectionAnalysis
                title="Deductibles"
                score={homeGrade.deductibleGrade.score}
                maxScore={homeGrade.deductibleGrade.maxScore}
                analysis={homeGrade.deductibleGrade.explanation}
              />
            </section>

            {/* Additional Coverages */}
            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Additional Coverages{' '}
                <span className="text-base font-normal text-gray-500">
                  (Optional endorsements)
                </span>
              </h2>
              <div className="mt-4">
                <AdditionalCoverageTable coverages={homeGrade.additionalCoverages} />
              </div>

              <SectionAnalysis
                title="Additional Coverage"
                score={homeGrade.additionalCoverages.filter(c => c.present).length}
                maxScore={homeGrade.additionalCoverages.length}
                analysis={
                  homeGrade.additionalCoverages.filter(c => !c.present && c.relevance === 'often_worth_reviewing').length > 0
                    ? `You're missing some valuable endorsements that are often worth reviewing: ${homeGrade.additionalCoverages.filter(c => !c.present && c.relevance === 'often_worth_reviewing').map(c => c.name).join(', ')}.`
                    : 'Your additional coverages look appropriate for your situation.'
                }
              />
            </section>
          </div>
        )}

        {/* Auto Policy Section */}
        {autoGrade && (
          <div id="auto" className={homeGrade ? 'mt-12 pt-8 border-t border-gray-200' : ''}>
            {homeGrade && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Auto Policy Analysis
              </h2>
            )}

            {/* Auto Coverages */}
            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Auto Coverages
              </h2>
              <CoverageTable coverages={autoGrade.standardCoverages} />

              <SectionAnalysis
                title="Auto Coverage"
                score={calculateSectionScore(autoGrade.standardCoverages).score}
                maxScore={calculateSectionScore(autoGrade.standardCoverages).maxScore}
                analysis={autoGrade.summary}
              />
            </section>
          </div>
        )}

        {/* Footer Disclaimer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 mt-8 p-4 bg-gray-50 rounded-lg">
          <p>
            This report is for educational purposes only and does not constitute professional insurance advice.
            Consult with a licensed insurance agent for personalized recommendations.
          </p>
        </div>
      </main>
    </div>
  );
}
