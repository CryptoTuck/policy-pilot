import { notFound } from 'next/navigation';
import { getReport } from '@/lib/storage';
import { CoverageTable } from '@/components/CoverageTable';
import { AdditionalCoverageTable } from '@/components/AdditionalCoverageTable';
import { SectionAnalysis } from '@/components/SectionAnalysis';
import { StickyCtaButton } from '@/components/StickyCtaButton';
import { CarrierAnalysis } from '@/components/CarrierAnalysis';
import Link from 'next/link';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

function PolicyTabs({ hasHome, hasAuto, hasRenters }: { hasHome: boolean; hasAuto: boolean; hasRenters: boolean }) {
  const tabs = [
    hasHome && { id: 'home', label: 'Home' },
    hasAuto && { id: 'auto', label: 'Auto' },
    hasRenters && { id: 'renters', label: 'Renters' },
  ].filter(Boolean) as { id: string; label: string }[];

  if (tabs.length <= 1) return null;

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-full bg-gray-100 p-1">
        {tabs.map((tab, idx) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={`px-6 py-2 text-sm font-medium rounded-full ${
              idx === 0
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </a>
        ))}
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

function AreasToReviewAlert({ areas }: { areas: string[] }) {
  if (areas.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-red-800 font-semibold text-base mb-2">Areas That Need Your Attention</h3>
          <ul className="space-y-1">
            {areas.map((area, index) => (
              <li key={index} className="text-red-700 text-sm flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function calculateSectionScore(coverages: { score: number; maxScore: number }[]): { score: number; maxScore: number } {
  const score = coverages.reduce((sum, c) => sum + c.score, 0);
  const maxScore = coverages.reduce((sum, c) => sum + c.maxScore, 0);
  return { score, maxScore };
}

function gradeToScore(grade?: string): number | undefined {
  switch (grade) {
    case 'A':
      return 95;
    case 'B':
      return 85;
    case 'C':
      return 75;
    case 'D':
      return 65;
    case 'F':
      return 45;
    default:
      return undefined;
  }
}

function getPolicyScore(grade?: string, score?: number): number | undefined {
  if (typeof score === 'number' && !Number.isNaN(score)) {
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  const gradeScore = gradeToScore(grade);
  return gradeScore === undefined ? undefined : Math.max(0, Math.min(100, gradeScore));
}

function averageScores(scores: Array<number | undefined>): number | undefined {
  const validScores = scores.filter((score): score is number => typeof score === 'number');
  if (validScores.length === 0) return undefined;
  return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
}

function getScoreGradient(score?: number): string {
  if (score === undefined) {
    return 'from-slate-500 via-slate-600 to-slate-700';
  }
  if (score >= 90) return 'from-emerald-500 via-green-500 to-green-600';
  if (score >= 70) return 'from-yellow-400 via-amber-400 to-orange-400';
  if (score >= 50) return 'from-orange-400 via-orange-500 to-red-400';
  return 'from-red-500 via-red-600 to-red-700';
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const report = await getReport(id);

  if (!report) {
    notFound();
  }

  const { homeGrade, autoGrade, autoGrades, rentersGrade, combinedGrade, carrierAnalysis } = report;
  const displayGrade = combinedGrade || homeGrade?.overallGrade || autoGrade?.overallGrade || rentersGrade?.overallGrade || 'N/A';
  
  // Handle multiple auto policies
  const autoPolicies = autoGrades && autoGrades.length > 0 ? autoGrades : (autoGrade ? [autoGrade] : []);
  const homeScore = getPolicyScore(homeGrade?.overallGrade, homeGrade?.overallScore);
  const autoScore = autoPolicies.length > 0
    ? averageScores(autoPolicies.map(policy => getPolicyScore(policy.overallGrade, policy.overallScore)))
    : undefined;
  const rentersScore = getPolicyScore(rentersGrade?.overallGrade, rentersGrade?.overallScore);
  const overallScore = getPolicyScore(combinedGrade, report.combinedScore)
    ?? averageScores([homeScore, autoScore, rentersScore]);
  const overallGradient = getScoreGradient(overallScore);
  const formatPercent = (score?: number): string => (typeof score === 'number' ? `${score}%` : '--');

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
        <PolicyTabs hasHome={!!homeGrade} hasAuto={autoPolicies.length > 0} hasRenters={!!rentersGrade} />

        {/* Overall Grade Header */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Policy Holder</p>
          <p className="text-blue-500 text-sm font-medium">Policy Pilot Report</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Overall Policy Grade
          </h1>
          <p className="text-gray-500 mt-1">{getGradeDescription(displayGrade)}</p>
        </div>

        {/* Score Overview Card */}
        <div className={`mb-6 rounded-2xl p-6 sm:p-8 text-white shadow-lg bg-gradient-to-r ${overallGradient}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/80">Overall Score</p>
              <p className="text-4xl sm:text-5xl font-bold mt-2">{formatPercent(overallScore)}</p>
            </div>
            <div className="w-full sm:w-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Home', score: homeScore },
                  { label: 'Auto', score: autoScore },
                  { label: 'Renters', score: rentersScore },
                ].map(({ label, score }) => (
                  <div key={label} className="rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-3 text-center">
                    <div className="text-xl font-bold">{formatPercent(score)}</div>
                    <div className="text-xs uppercase tracking-wide text-white/80 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Areas to Review Alert */}
        <AreasToReviewAlert
          areas={[
            ...(homeGrade?.areasToReview || []),
            ...autoPolicies.flatMap(a => a.areasToReview || []),
            ...(rentersGrade?.areasToReview || [])
          ]}
        />

        {/* Carrier-Aligned Analysis */}
        {carrierAnalysis && <CarrierAnalysis analysis={carrierAnalysis} />}

        {/* Home Policy Section */}
        {homeGrade && (
          <div id="home">
            {/* Standard Coverages */}
            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Standard Coverages
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Coverages that come with standard HOI policy
              </p>
              <CoverageTable coverages={homeGrade.standardCoverages} />

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
                Additional Coverages
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Optional endorsements
              </p>
              <AdditionalCoverageTable coverages={homeGrade.additionalCoverages} />

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

        {/* Auto Policy Section(s) */}
        {autoPolicies.length > 0 && (
          <div id="auto" className={homeGrade ? 'mt-12 pt-8 border-t border-gray-200' : ''}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Auto Policy Analysis
            </h2>

            {autoPolicies.map((autoPolicy, idx) => (
              <section key={idx} className={`mb-8 ${idx > 0 ? 'pt-6 border-t border-gray-100' : ''}`}>
                {/* Vehicle/Policy Header */}
                {(autoPolicies.length > 1 || autoPolicy.vehicleInfo) && (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">Vehicle</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {autoPolicy.vehicleInfo || `Auto Policy ${idx + 1}`}: <span className="text-blue-600">{autoPolicy.overallGrade}</span>
                    </h3>
                    {autoPolicy.policyNumber && autoPolicy.policyNumber !== 'N/A' && (
                      <p className="text-gray-500 text-sm mt-1">Policy #{autoPolicy.policyNumber}</p>
                    )}
                  </div>
                )}

                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {autoPolicies.length > 1 ? 'Coverages' : 'Auto Coverages'}
                </h4>
                <CoverageTable coverages={autoPolicy.standardCoverages} />

                <SectionAnalysis
                  title={autoPolicies.length > 1 ? `${autoPolicy.vehicleInfo || `Policy ${idx + 1}`} Coverage` : 'Auto Coverage'}
                  score={calculateSectionScore(autoPolicy.standardCoverages).score}
                  maxScore={calculateSectionScore(autoPolicy.standardCoverages).maxScore}
                  analysis={autoPolicy.summary}
                />
              </section>
            ))}
          </div>
        )}

        {/* Renters Policy Section */}
        {rentersGrade && (
          <div id="renters" className={(homeGrade || autoPolicies.length > 0) ? 'mt-12 pt-8 border-t border-gray-200' : ''}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Renters Policy Analysis
            </h2>

            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Renters Coverages
              </h3>
              <CoverageTable coverages={rentersGrade.standardCoverages} />

              <SectionAnalysis
                title="Renters Coverage"
                score={calculateSectionScore(rentersGrade.standardCoverages).score}
                maxScore={calculateSectionScore(rentersGrade.standardCoverages).maxScore}
                analysis={rentersGrade.summary}
              />
            </section>
          </div>
        )}

        {/* Footer Disclaimer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 mt-8 p-4 bg-gray-50 rounded-lg mb-24">
          <p>
            This report is for educational purposes only and does not constitute professional insurance advice.
            Consult with a licensed insurance agent for personalized recommendations.
          </p>
        </div>
      </main>

      {/* Sticky CTA Button */}
      <StickyCtaButton />
    </div>
  );
}
