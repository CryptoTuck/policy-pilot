'use client';

import { useState } from 'react';
import { CoverageTable } from '@/components/CoverageTable';
import { AdditionalCoverageTable } from '@/components/AdditionalCoverageTable';
import { SectionAnalysis } from '@/components/SectionAnalysis';
import { CarrierAnalysis } from '@/components/CarrierAnalysis';
import { CoverageDescriptionProvider } from '@/components/CoverageDescriptionModal';
import type { PolicyReport, AutoPolicyGrade, AdditionalCoverageAssessment, CoverageGrade } from '@/types/grading';

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

function calculateSectionScore(coverages: { score: number | 'bonus'; maxScore: number }[]): { score: number; maxScore: number } {
  const score = coverages.reduce((sum, c) => sum + (typeof c.score === 'number' ? c.score : 0), 0);
  const maxScore = coverages.reduce((sum, c) => sum + (typeof c.score === 'number' ? c.maxScore : 0), 0);
  return { score, maxScore };
}

function gradeToScore(grade?: string): number | undefined {
  switch (grade) {
    case 'A': return 95;
    case 'B': return 85;
    case 'C': return 75;
    case 'D': return 65;
    case 'F': return 45;
    default: return undefined;
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

function weightedOverallScore(
  homeScore?: number,
  autoScore?: number,
  rentersScore?: number,
): number | undefined {
  const hasHome = typeof homeScore === 'number';
  const hasAuto = typeof autoScore === 'number';
  const hasRenters = typeof rentersScore === 'number';

  if (!hasHome && !hasAuto && !hasRenters) return undefined;

  // Single policy → 100%
  if (hasHome && !hasAuto && !hasRenters) return homeScore;
  if (!hasHome && hasAuto && !hasRenters) return autoScore;
  if (!hasHome && !hasAuto && hasRenters) return rentersScore;

  // Home + Auto → 45/55
  if (hasHome && hasAuto && !hasRenters) {
    return Math.round(homeScore! * 0.45 + autoScore! * 0.55);
  }

  // Renters + Auto → 30/70
  if (!hasHome && hasAuto && hasRenters) {
    return Math.round(rentersScore! * 0.30 + autoScore! * 0.70);
  }

  // Fallback (e.g. Home + Renters, or all three) → simple average
  return averageScores([homeScore, autoScore, rentersScore]);
}

function mergeHomeLikeScore(homeScore?: number, condoScore?: number): number | undefined {
  const hasHome = typeof homeScore === 'number';
  const hasCondo = typeof condoScore === 'number';
  if (hasHome && hasCondo) {
    return Math.round((homeScore! + condoScore!) / 2);
  }
  return hasHome ? homeScore : condoScore;
}

function getScoreGradient(score?: number): string {
  if (score === undefined) return 'from-slate-500 via-slate-600 to-slate-700';
  if (score >= 90) return 'from-emerald-500 via-green-500 to-green-600';
  if (score >= 80) return 'from-blue-400 via-blue-500 to-blue-600';
  if (score >= 70) return 'from-yellow-400 via-amber-400 to-amber-500';
  if (score >= 60) return 'from-orange-500 via-orange-600 to-red-400';
  return 'from-red-700 via-red-800 to-red-900';
}

const AUTO_OPTIONAL_COVERAGE_KEYS = [
  'roadside',
  'rental',
  'loan',
  'lease',
  'gap',
  'glass',
  'pip',
  'personal injury protection',
  'new car replacement',
  'oem',
];

function isOptionalAutoCoverage(name: string): boolean {
  const normalized = name.toLowerCase();
  return AUTO_OPTIONAL_COVERAGE_KEYS.some((key) => normalized.includes(key));
}

function isCoverageMissing(limit?: string): boolean {
  if (!limit) return false;
  const normalized = limit.toLowerCase();
  return normalized.includes('not included') || normalized.includes('declined');
}

function autoCoverageRelevance(name: string): AdditionalCoverageAssessment['relevance'] {
  const normalized = name.toLowerCase();
  if (normalized.includes('roadside') || normalized.includes('rental')) {
    return 'low';
  }
  return 'often_worth_reviewing';
}

function splitAutoCoverages(coverages: CoverageGrade[]): {
  includedCoverages: CoverageGrade[];
  missingCoverages: AdditionalCoverageAssessment[];
} {
  const includedCoverages: CoverageGrade[] = [];
  const missingCoverages: AdditionalCoverageAssessment[] = [];

  coverages.forEach((coverage) => {
    if (isOptionalAutoCoverage(coverage.name) && isCoverageMissing(coverage.limit)) {
      missingCoverages.push({
        name: coverage.name,
        limit: coverage.limit,
        present: false,
        relevance: autoCoverageRelevance(coverage.name),
        note: coverage.explanation,
      });
      return;
    }
    includedCoverages.push(coverage);
  });

  return { includedCoverages, missingCoverages };
}

type FilterType = 'all' | 'home' | 'condo' | 'auto' | 'renters';

const AUTO_SECTION_COVERAGES = [
  'bodily injury liability',
  'property damage liability',
  'uninsured/underinsured motorist',
  'uninsured motorist/underinsured motorist',
  'medical payments',
  'collision deductible',
  'collision',
  'comprehensive deductible',
  'comprehensive',
];

const HOME_SECTION_COVERAGES = [
  'dwelling',
  'other structures',
  'personal property',
  'loss of use',
  'personal liability',
  'medical payments',
  'all perils deductible',
  'wind or hail deductible',
  'windstorm or hail deductible',
  'wind hail deductible',
  'windstorm hail deductible',
];

function normalizeCoverageName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function isCoreCoverage(name: string, coreNames: string[]): boolean {
  const normalized = normalizeCoverageName(name);
  return coreNames.some((core) => normalized.includes(normalizeCoverageName(core)));
}


function PolicyTabs({
  hasHome,
  hasCondo,
  hasAuto,
  hasRenters,
  activeFilter,
  onFilterChange,
}: {
  hasHome: boolean;
  hasCondo: boolean;
  hasAuto: boolean;
  hasRenters: boolean;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}) {
  const tabs: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Overall' },
    ...[
      hasHome && { id: 'home' as const, label: 'Home' },
      hasCondo && { id: 'condo' as const, label: 'Condo' },
      hasAuto && { id: 'auto' as const, label: 'Auto' },
      hasRenters && { id: 'renters' as const, label: 'Renters' },
    ].filter(Boolean) as { id: 'home' | 'condo' | 'auto' | 'renters'; label: string }[],
  ];

  // Hide tabs if there's only Overall + one policy type
  if (tabs.length <= 2) return null;

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-full bg-white p-1">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
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

export function ReportContent({ report }: { report: PolicyReport }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const {
    homeGrade,
    condoGrade,
    autoGrade,
    autoGrades,
    rentersGrade,
    combinedGrade,
    carrierAnalysis,
    carriers,
  } = report;
  const displayGrade = combinedGrade
    || homeGrade?.overallGrade
    || condoGrade?.overallGrade
    || autoGrade?.overallGrade
    || rentersGrade?.overallGrade
    || 'N/A';

  const autoPolicies: AutoPolicyGrade[] = autoGrades && autoGrades.length > 0 ? autoGrades : (autoGrade ? [autoGrade] : []);
  const hasHome = !!homeGrade;
  const hasCondo = !!condoGrade;
  const hasAuto = autoPolicies.length > 0;
  const hasRenters = !!rentersGrade;

  const homeScore = getPolicyScore(homeGrade?.overallGrade, homeGrade?.overallScore);
  const condoScore = getPolicyScore(condoGrade?.overallGrade, condoGrade?.overallScore);
  const autoScore = hasAuto
    ? averageScores(autoPolicies.map(policy => getPolicyScore(policy.overallGrade, policy.overallScore)))
    : undefined;
  const rentersScore = getPolicyScore(rentersGrade?.overallGrade, rentersGrade?.overallScore);
  const homeLikeScore = mergeHomeLikeScore(homeScore, condoScore);
  const overallScore = getPolicyScore(combinedGrade, report.combinedScore)
    ?? weightedOverallScore(homeLikeScore, autoScore, rentersScore);
  const overallGradient = getScoreGradient(overallScore);
  const formatPercent = (score?: number): string => (typeof score === 'number' ? `${score}%` : '--');

  const showHome = hasHome && (activeFilter === 'all' || activeFilter === 'home');
  const showCondo = hasCondo && (activeFilter === 'all' || activeFilter === 'condo');
  const showAuto = hasAuto && (activeFilter === 'all' || activeFilter === 'auto');
  const showRenters = hasRenters && (activeFilter === 'all' || activeFilter === 'renters');

  // Build areas to review based on active filter, prefixed with policy type
  const areasToReview = [
    ...(showHome ? (homeGrade?.areasToReview || []).map(a => activeFilter === 'all' ? `Home: ${a}` : a) : []),
    ...(showCondo ? (condoGrade?.areasToReview || []).map(a => activeFilter === 'all' ? `Condo: ${a}` : a) : []),
    ...(showAuto ? autoPolicies.flatMap(a => (a.areasToReview || []).map(area => activeFilter === 'all' ? `Auto: ${area}` : area)) : []),
    ...(showRenters ? (rentersGrade?.areasToReview || []).map(a => activeFilter === 'all' ? `Renters: ${a}` : a) : []),
  ];

  // Determine displayed score based on filter
  let displayedScore: number | undefined;
  let displayedGradient: string;
  if (activeFilter === 'all') {
    displayedScore = overallScore;
    displayedGradient = overallGradient;
  } else if (activeFilter === 'home') {
    displayedScore = homeScore;
    displayedGradient = getScoreGradient(homeScore);
  } else if (activeFilter === 'condo') {
    displayedScore = condoScore;
    displayedGradient = getScoreGradient(condoScore);
  } else if (activeFilter === 'auto') {
    displayedScore = autoScore;
    displayedGradient = getScoreGradient(autoScore);
  } else {
    displayedScore = rentersScore;
    displayedGradient = getScoreGradient(rentersScore);
  }

  const policyCards = [
    { label: hasCondo ? 'Condo' : 'Home', score: hasCondo ? condoScore : homeScore, exists: hasHome || hasCondo },
    { label: 'Auto', score: autoScore, exists: hasAuto },
    { label: 'Renters', score: rentersScore, exists: hasRenters },
  ];

  return (
    <CoverageDescriptionProvider>
      {/* Policy Type Tabs */}
      <PolicyTabs
        hasHome={hasHome}
        hasCondo={hasCondo}
        hasAuto={hasAuto}
        hasRenters={hasRenters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Overall Grade Header */}
      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {activeFilter === 'all' ? 'Overall Policy Grade' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Policy Grade`}
        </h1>
        <p className="text-gray-500 mt-1">{getGradeDescription(displayGrade)}</p>
      </div>

      {/* Score Overview Card */}
      <div className={`mb-6 rounded-2xl p-6 sm:p-8 text-white shadow-lg bg-gradient-to-r transition-all duration-300 ${displayedGradient}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/90">
              {activeFilter === 'all' ? 'Overall Score' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Score`}
            </p>
            <p className="text-4xl sm:text-5xl font-bold mt-2">{formatPercent(displayedScore)}</p>
          </div>
          {/* Desktop: small cards to the right */}
          {activeFilter === 'all' && (
            <div className="hidden sm:flex flex-wrap justify-end gap-3">
              {policyCards.map(({ label, score, exists }) => (
                <div
                  key={label}
                  className={`rounded-xl w-24 py-3 text-center ${
                    exists
                      ? 'bg-white/20 backdrop-blur-sm border border-white/20'
                      : 'border-2 border-dashed border-white/30'
                  }`}
                >
                  <div className={`text-xl font-bold ${exists ? 'text-white' : 'text-white/30'}`}>
                    {exists ? formatPercent(score) : '--'}
                  </div>
                  <div className={`text-[10px] uppercase tracking-wide mt-1 ${exists ? 'text-white/90' : 'text-white/30'}`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Mobile: full-width grid below the score */}
        {activeFilter === 'all' && (
          <div className="sm:hidden grid grid-cols-3 gap-2 mt-5">
            {policyCards.map(({ label, score, exists }) => (
              <div
                key={label}
                className={`rounded-xl py-3 text-center ${
                  exists
                    ? 'bg-white/20 backdrop-blur-sm border border-white/20'
                    : 'border-2 border-dashed border-white/30'
                }`}
              >
                <div className={`text-lg font-bold ${exists ? 'text-white' : 'text-white/30'}`}>
                  {exists ? formatPercent(score) : '--'}
                </div>
                <div className={`text-[10px] uppercase tracking-wide mt-1 ${exists ? 'text-white/90' : 'text-white/30'}`}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Areas to Review Alert */}
      <AreasToReviewAlert areas={areasToReview} />

      {/* Carrier-Aligned Analysis */}
      {activeFilter === 'all' && carrierAnalysis && <CarrierAnalysis analysis={carrierAnalysis} />}

      {/* Home Policy Section */}
      {showHome && homeGrade && (() => {
        const scoredCoverages = [
          ...homeGrade.standardCoverages,
          homeGrade.deductibleGrade,
        ];
        const coveragesWithBonus = scoredCoverages.map((coverage) => (
          isCoreCoverage(coverage.name, HOME_SECTION_COVERAGES)
            ? coverage
            : { ...coverage, score: 'bonus' as const }
        ));
        const sectionScores = calculateSectionScore(coveragesWithBonus);
        const presentAdditional = homeGrade.additionalCoverages.filter(c => c.present);
        const missingAdditional = homeGrade.additionalCoverages.filter(c => !c.present);

        return (
          <div id="home">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Home Policy Analysis{carriers?.home ? ` (${carriers.home})` : ''}
            </h2>

            <section className="mb-6 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Your Home Coverages
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Standard coverages and deductibles
              </p>
              <CoverageTable coverages={coveragesWithBonus} />

              {presentAdditional.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Additional Coverages</h4>
                  <p className="text-sm text-gray-500 mb-3">Bonus coverages included on your policy</p>
                  <AdditionalCoverageTable coverages={presentAdditional} />
                </div>
              )}

              {missingAdditional.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Coverages to Consider</h4>
                  <p className="text-sm text-gray-500 mb-3">Common add-ons not included in your current policy</p>
                  <AdditionalCoverageTable coverages={missingAdditional} variant="consider" />
                </div>
              )}

              <SectionAnalysis
                title="Home Coverage"
                score={sectionScores.score}
                maxScore={sectionScores.maxScore}
                analysis={homeGrade.summary}
              />
            </section>
          </div>
        );
      })()}

      {/* Condo Policy Section */}
      {showCondo && condoGrade && (() => {
        const scoredCoverages = [
          ...condoGrade.standardCoverages,
          condoGrade.deductibleGrade,
        ];
        const sectionScores = calculateSectionScore(scoredCoverages);
        const presentAdditional = condoGrade.additionalCoverages.filter(c => c.present);
        const missingAdditional = condoGrade.additionalCoverages.filter(c => !c.present);

        return (
          <div id="condo" className={showHome ? 'mt-8' : ''}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Condo Policy Analysis
            </h2>

            <section className="mb-6 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Your Condo Coverages
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Standard coverages and deductibles
              </p>
              <CoverageTable coverages={scoredCoverages} />

              {presentAdditional.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Additional Coverages</h4>
                  <p className="text-sm text-gray-500 mb-3">Bonus coverages included on your policy</p>
                  <AdditionalCoverageTable coverages={presentAdditional} />
                </div>
              )}

              {missingAdditional.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Coverages to Consider</h4>
                  <p className="text-sm text-gray-500 mb-3">Common add-ons not included in your current policy</p>
                  <AdditionalCoverageTable coverages={missingAdditional} variant="consider" />
                </div>
              )}

              <SectionAnalysis
                title="Condo Coverage"
                score={sectionScores.score}
                maxScore={sectionScores.maxScore}
                analysis={condoGrade.summary}
              />
            </section>
          </div>
        );
      })()}

      {/* Auto Policy Section(s) */}
      {showAuto && (
        <div id="auto" className={(showHome || showCondo) ? 'mt-8' : ''}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Auto Policy Analysis{carriers?.auto ? ` (${carriers.auto})` : ''}
          </h2>

          {autoPolicies.map((autoPolicy, idx) => {
            const hasAdditional = (autoPolicy.additionalCoverages || []).length > 0;
            const { includedCoverages, missingCoverages } = hasAdditional
              ? { includedCoverages: autoPolicy.standardCoverages, missingCoverages: [] as AdditionalCoverageAssessment[] }
              : splitAutoCoverages(autoPolicy.standardCoverages);
            const presentAdditional = hasAdditional
              ? (autoPolicy.additionalCoverages || []).filter(c => c.present)
              : [];
            const missingAdditional = hasAdditional
              ? (autoPolicy.additionalCoverages || []).filter(c => !c.present)
              : missingCoverages;

            return (
              <section key={idx} className="mb-6 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
                {(autoPolicies.length > 1 || autoPolicy.vehicleInfo) && (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">Vehicle</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {autoPolicy.vehicleInfo || `Auto Policy ${idx + 1}`}
                    </h3>
                    {autoPolicy.policyNumber && autoPolicy.policyNumber !== 'N/A' && (
                      <p className="text-gray-500 text-sm mt-1">Policy #{autoPolicy.policyNumber}</p>
                    )}
                  </div>
                )}

                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {autoPolicies.length > 1 ? 'Your Coverages' : 'Your Auto Coverages'}
                </h4>
                <CoverageTable coverages={includedCoverages} />

                {presentAdditional.length > 0 && (
                  <div className="mt-6">
                    <h5 className="text-lg font-bold text-gray-900 mb-1">Additional Coverages</h5>
                    <p className="text-sm text-gray-500 mb-3">Bonus coverages included on this policy</p>
                    <AdditionalCoverageTable coverages={presentAdditional} />
                  </div>
                )}

                {missingAdditional.length > 0 && (
                  <div className="mt-6">
                    <h5 className="text-lg font-bold text-gray-900 mb-1">Coverages to Consider</h5>
                    <p className="text-sm text-gray-500 mb-3">Common add-ons not included in this policy</p>
                    <AdditionalCoverageTable coverages={missingAdditional} variant="consider" />
                  </div>
                )}

                <SectionAnalysis
                  title={autoPolicies.length > 1 ? `${autoPolicy.vehicleInfo || `Policy ${idx + 1}`} Coverage` : 'Auto Coverage'}
                  score={calculateSectionScore(autoPolicy.standardCoverages).score}
                  maxScore={calculateSectionScore(autoPolicy.standardCoverages).maxScore}
                  analysis={autoPolicy.summary}
                />
              </section>
            );
          })}
        </div>
      )}

      {/* Renters Policy Section */}
      {showRenters && rentersGrade && (() => {
        const scoredCoverages = [
          ...rentersGrade.standardCoverages,
          ...(rentersGrade.deductibleGrade ? [rentersGrade.deductibleGrade] : []),
        ];
        const sectionScores = calculateSectionScore(scoredCoverages);
        const presentAdditional = (rentersGrade.additionalCoverages || []).filter(c => c.present);
        const missingAdditional = (rentersGrade.additionalCoverages || []).filter(c => !c.present);

        return (
          <div id="renters" className={(showHome || showCondo || showAuto) ? 'mt-8' : ''}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Renters Policy Analysis{carriers?.renters ? ` (${carriers.renters})` : ''}
            </h2>

            <section className="mb-6 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Renters Coverages
              </h3>
              <CoverageTable coverages={scoredCoverages} />

              {presentAdditional.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Additional Coverages</h4>
                  <p className="text-sm text-gray-500 mb-3">Bonus coverages included on your policy</p>
                  <AdditionalCoverageTable coverages={presentAdditional} />
                </div>
              )}

              {missingAdditional.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Coverages to Consider</h4>
                  <p className="text-sm text-gray-500 mb-3">Common add-ons not included in your current policy</p>
                  <AdditionalCoverageTable coverages={missingAdditional} variant="consider" />
                </div>
              )}

              <SectionAnalysis
                title="Renters Coverage"
                score={sectionScores.score}
                maxScore={sectionScores.maxScore}
                analysis={rentersGrade.summary}
              />
            </section>
          </div>
        );
      })()}

      {/* Footer Disclaimer */}
      <div className="text-center text-xs sm:text-sm text-gray-500 mt-8 p-4 bg-gray-50 rounded-lg mb-24">
        <p>
          This report is for educational purposes only and does not constitute professional insurance advice.
          Consult with a licensed insurance agent for personalized recommendations.
        </p>
      </div>
    </CoverageDescriptionProvider>
  );
}
