import { notFound } from 'next/navigation';
import { getReport } from '@/lib/storage';
import { CoverageTable } from '@/components/CoverageTable';
import { AdditionalCoverageTable } from '@/components/AdditionalCoverageTable';
import { SectionAnalysis } from '@/components/SectionAnalysis';
import Link from 'next/link';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

function PolicyTabs({ activeTab, homeGrade, autoGrade }: {
  activeTab: 'home' | 'auto';
  homeGrade: boolean;
  autoGrade: boolean;
}) {
  if (!homeGrade || !autoGrade) return null;

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1">
        <a
          href="#home"
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'home'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Home
        </a>
        <a
          href="#auto"
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'auto'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
        <PolicyTabs
          activeTab="home"
          homeGrade={!!homeGrade}
          autoGrade={!!autoGrade}
        />

        {/* Overall Grade Header */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm">Policy Analysis</p>
          <p className="text-blue-600 text-sm font-medium">Policy Pilot Report</p>
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
              <CoverageTable coverages={[homeGrade.deductibleGrade]} />

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
        <div className="text-center text-xs sm:text-sm text-gray-500 mt-8 p-4 bg-gray-100 rounded-lg">
          <p>
            This report is for educational purposes only and does not constitute professional insurance advice.
            Consult with a licensed insurance agent for personalized recommendations.
          </p>
        </div>
      </main>
    </div>
  );
}
