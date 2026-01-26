import { notFound } from 'next/navigation';
import { getReport } from '@/lib/storage';
import { GradeCircle } from '@/components/GradeCircle';
import { CoverageCard } from '@/components/CoverageCard';
import { AdditionalCoverageList } from '@/components/AdditionalCoverageList';
import { ReportSection, StrengthsWeaknesses } from '@/components/ReportSection';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const report = getReport(id);

  if (!report) {
    notFound();
  }

  const { homeGrade, autoGrade, combinedGrade, combinedScore } = report;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Policy Pilot Report</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Generated on {new Date(report.generatedAt).toLocaleDateString()}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Overall Grade Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {combinedGrade && combinedScore && (
              <GradeCircle
                grade={combinedGrade}
                score={combinedScore}
                size="lg"
                label="Overall Grade"
              />
            )}
            {homeGrade && (
              <GradeCircle
                grade={homeGrade.overallGrade}
                score={homeGrade.overallScore}
                size={combinedGrade ? 'md' : 'lg'}
                label="Home Policy"
              />
            )}
            {autoGrade && (
              <GradeCircle
                grade={autoGrade.overallGrade}
                score={autoGrade.overallScore}
                size={combinedGrade ? 'md' : 'lg'}
                label="Auto Policy"
              />
            )}
          </div>
        </div>

        {/* Home Policy Section */}
        {homeGrade && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Home Policy Analysis</h2>

            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{homeGrade.summary}</p>
            </div>

            <StrengthsWeaknesses
              strengths={homeGrade.keyStrengths}
              areasToReview={homeGrade.areasToReview}
            />

            <ReportSection title="Standard Coverages" className="mt-6 sm:mt-8">
              <div className="grid gap-3 sm:gap-4">
                {homeGrade.standardCoverages.map((coverage) => (
                  <CoverageCard key={coverage.name} coverage={coverage} />
                ))}
                <CoverageCard coverage={homeGrade.deductibleGrade} />
              </div>
            </ReportSection>

            <ReportSection title="Additional Coverages">
              <AdditionalCoverageList coverages={homeGrade.additionalCoverages} />
            </ReportSection>
          </div>
        )}

        {/* Auto Policy Section */}
        {autoGrade && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Auto Policy Analysis</h2>

            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{autoGrade.summary}</p>
            </div>

            <StrengthsWeaknesses
              strengths={autoGrade.keyStrengths}
              areasToReview={autoGrade.areasToReview}
            />

            <ReportSection title="Coverages" className="mt-6 sm:mt-8">
              <div className="grid gap-3 sm:gap-4">
                {autoGrade.standardCoverages.map((coverage) => (
                  <CoverageCard key={coverage.name} coverage={coverage} />
                ))}
              </div>
            </ReportSection>
          </div>
        )}

        {/* Footer Disclaimer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-100 rounded-lg">
          <p>
            This report is for educational purposes only and does not constitute professional insurance advice.
            Consult with a licensed insurance agent for personalized recommendations.
          </p>
        </div>
      </main>
    </div>
  );
}
