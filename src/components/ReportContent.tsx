'use client';

import { useState, type CSSProperties } from 'react';
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

function getScoreTone(score?: number): { ring: string; text: string; glow: string } {
  if (score === undefined) return { ring: 'stroke-slate-400', text: 'text-slate-600', glow: 'shadow-slate-200/60' };
  if (score >= 85) return { ring: 'stroke-emerald-500', text: 'text-emerald-600', glow: 'shadow-emerald-200/60' };
  if (score >= 70) return { ring: 'stroke-amber-500', text: 'text-amber-600', glow: 'shadow-amber-200/60' };
  return { ring: 'stroke-red-500', text: 'text-red-600', glow: 'shadow-red-200/60' };
}

function getPopulationPercentile(score?: number): number | undefined {
  if (score === undefined) return undefined;
  const clamped = Math.max(0, Math.min(100, score));
  const percentile = 1 / (1 + Math.exp(-0.02 * (clamped - 50)));
  return Math.round(percentile * 100);
}

function ScoreRing({
  score,
  size = 180,
  strokeWidth = 14,
  label,
}: {
  score?: number;
  size?: number;
  strokeWidth?: number;
  label: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = typeof score === 'number' ? Math.max(0, Math.min(100, score)) : 0;
  const offset = circumference - (percent / 100) * circumference;
  const ringStyle = {
    '--ring-circ': circumference,
    '--ring-offset': offset,
  } as CSSProperties;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="score-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#score-ring-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          className="score-ring"
          style={ringStyle}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl sm:text-5xl font-bold text-gray-900">
          {typeof score === 'number' ? `${score}%` : '--'}
        </div>
        <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-[0.2em] mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}

function MiniScoreRing({ score, label }: { score?: number; label: string }) {
  const size = 64;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = typeof score === 'number' ? Math.max(0, Math.min(100, score)) : 0;
  const offset = circumference - (percent / 100) * circumference;
  const tone = getScoreTone(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative flex items-center justify-center rounded-full shadow-lg ${tone.glow}`}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`${tone.ring}`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="none"
          />
        </svg>
        <span className={`absolute text-sm font-semibold ${tone.text}`}>
          {typeof score === 'number' ? `${score}%` : '--'}
        </span>
      </div>
      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
    </div>
  );
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

  const keyStrengths = [
    ...(showHome ? (homeGrade?.keyStrengths || []).map(s => activeFilter === 'all' ? `Home: ${s}` : s) : []),
    ...(showCondo ? (condoGrade?.keyStrengths || []).map(s => activeFilter === 'all' ? `Condo: ${s}` : s) : []),
    ...(showAuto ? autoPolicies.flatMap(a => (a.keyStrengths || []).map(s => activeFilter === 'all' ? `Auto: ${s}` : s)) : []),
    ...(showRenters ? (rentersGrade?.keyStrengths || []).map(s => activeFilter === 'all' ? `Renters: ${s}` : s) : []),
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

  const scoreCards = [
    ...(hasHome ? [{ label: 'Home', score: homeScore }] : []),
    ...(hasCondo ? [{ label: 'Condo', score: condoScore }] : []),
    ...(hasAuto ? [{ label: 'Auto', score: autoScore }] : []),
    ...(hasRenters ? [{ label: 'Renters', score: rentersScore }] : []),
  ];

  const insightScores: number[] = [
    ...(showHome && homeGrade ? [
      ...homeGrade.standardCoverages,
      homeGrade.deductibleGrade,
    ] : []),
    ...(showCondo && condoGrade ? [
      ...condoGrade.standardCoverages,
      condoGrade.deductibleGrade,
    ] : []),
    ...(showAuto ? autoPolicies.flatMap((policy) => policy.standardCoverages) : []),
    ...(showRenters && rentersGrade ? [
      ...rentersGrade.standardCoverages,
      ...(rentersGrade.deductibleGrade ? [rentersGrade.deductibleGrade] : []),
    ] : []),
  ]
    .filter((coverage): coverage is CoverageGrade => !!coverage)
    .map((coverage) => (typeof coverage.score === 'number' ? coverage.score : undefined))
    .filter((score): score is number => typeof score === 'number');

  const gapsCount = insightScores.filter((score) => score <= 2).length;
  const strongCount = insightScores.filter((score) => score >= 4).length;
  const populationPercentile = getPopulationPercentile(displayedScore);
  const populationLabel = populationPercentile !== undefined
    ? (populationPercentile >= 50
      ? `Your score is higher than ${populationPercentile}% of policyholders`
      : `Your score is lower than ${100 - populationPercentile}% of policyholders`)
    : 'Population comparison unavailable';

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
      <div className="mb-6 animate-fade-up">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {activeFilter === 'all' ? 'Overall Policy Grade' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Policy Grade`}
        </h1>
        <p className="text-gray-500 mt-1">{getGradeDescription(displayGrade)}</p>
      </div>

      {/* Score Overview Card */}
      <div className="mb-8 rounded-3xl bg-white shadow-xl border border-white/70 p-4 sm:p-8 relative overflow-hidden animate-fade-up">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-400/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(220px,260px)_1fr] items-center">
          <div className="flex flex-col items-center gap-6">
            <ScoreRing
              score={displayedScore}
              label={activeFilter === 'all' ? 'Overall' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
            />
            {activeFilter === 'all' && scoreCards.length > 1 && (
              <div className="flex justify-center gap-4">
                {scoreCards.map(({ label, score }) => (
                  <MiniScoreRing key={label} score={score} label={label} />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm bg-gradient-to-r ${displayedGradient}`}>
                {activeFilter === 'all' ? 'Overall Score' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Score`}
              </span>
              <p className="mt-3 text-lg font-semibold text-gray-900">
                {formatPercent(displayedScore)} coverage strength
              </p>
              <p className="text-sm text-gray-500">A clear snapshot of how well your coverage protects you today.</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600">{populationLabel}</p>
              <div className="relative pt-6 pb-5">
                {/* Score tooltip — above the bar */}
                <div
                  className="absolute top-0 flex flex-col items-center"
                  style={{ left: `clamp(12px, ${Math.max(0, Math.min(100, displayedScore ?? 0))}%, calc(100% - 12px))`, transform: 'translateX(-50%)' }}
                >
                  <div className="px-1.5 py-0.5 rounded bg-gray-900 text-[9px] font-bold text-white leading-none shadow">
                    {typeof displayedScore === 'number' ? `${displayedScore}%` : '--'}
                  </div>
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-gray-900" />
                </div>

                {/* Bar */}
                <div className="relative h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500 shadow-inner">
                  {/* Avg dashed line */}
                  <div
                    className="absolute top-0 bottom-0 border-l-2 border-dashed border-white/80"
                    style={{ left: '68%' }}
                  />
                </div>

                {/* Avg label — below the bar */}
                <div
                  className="absolute bottom-0 text-[10px] font-semibold text-gray-500"
                  style={{ left: '68%', transform: 'translateX(-50%)' }}
                >
                  Avg: 68%
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 uppercase tracking-wide">
                {['Poor', 'Below Avg', 'Average', 'Good', 'Excellent'].map((label) => (
                  <span key={label} className="flex-1 text-center">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                {gapsCount} Gaps Found
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                {strongCount} Strong Areas
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Key Findings Summary */}
      <div className="mb-8 grid gap-4 lg:grid-cols-2 animate-fade-up" style={{ animationDelay: '80ms' }}>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-6 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">Strengths</h3>
          <ul className="space-y-2 text-sm text-emerald-900">
            {keyStrengths.length === 0 && (
              <li className="text-emerald-700">No standout strengths were identified yet.</li>
            )}
            {keyStrengths.map((strength, index) => (
              <li key={`${strength}-${index}`} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 sm:p-6 shadow-sm">
          <h3 className="text-lg font-bold text-amber-900 mb-4">Areas to Improve</h3>
          <ul className="space-y-2 text-sm text-amber-900">
            {areasToReview.length === 0 && (
              <li className="text-amber-700">No immediate gaps detected in this view.</li>
            )}
            {areasToReview.map((area, index) => (
              <li key={`${area}-${index}`} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z" />
                  </svg>
                </span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Home Policy Analysis{carriers?.home ? ` (${carriers.home})` : ''}
            </h2>

            <section className="mb-10 bg-white rounded-2xl shadow-sm p-4 sm:p-6 animate-fade-up">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Condo Policy Analysis
            </h2>

            <section className="mb-10 bg-white rounded-2xl shadow-sm p-4 sm:p-6 animate-fade-up">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
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
              <section key={idx} className="mb-10 bg-white rounded-2xl shadow-sm p-4 sm:p-6 animate-fade-up">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Renters Policy Analysis{carriers?.renters ? ` (${carriers.renters})` : ''}
            </h2>

            <section className="mb-10 bg-white rounded-2xl shadow-sm p-4 sm:p-6 animate-fade-up">
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
      <div className="text-center text-xs sm:text-sm text-gray-500 mt-12 p-5 bg-gray-50 rounded-lg mb-24">
        <p>
          This report is for educational purposes only and does not constitute professional insurance advice.
          Consult with a licensed insurance agent for personalized recommendations.
        </p>
      </div>
    </CoverageDescriptionProvider>
  );
}
