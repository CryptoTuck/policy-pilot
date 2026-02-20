'use client';

import type { CoverageGrade } from '@/types/grading';
import { CoverageNameButton } from '@/components/CoverageNameButton';

interface CoverageTableProps {
  coverages: CoverageGrade[];
  showScore?: boolean;
  columns?: {
    name: string;
    limit: string;
    score?: string;
    explanation: string;
  };
}

function getScoreTone(score: number): { ring: string; text: string; border: string } {
  if (score <= 2) {
    return { ring: 'stroke-red-500', text: 'text-red-700', border: 'border-red-200' };
  }
  if (score <= 3) {
    return { ring: 'stroke-amber-500', text: 'text-amber-700', border: 'border-amber-200' };
  }
  return { ring: 'stroke-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200' };
}

function ScoreRing({ score, maxScore }: { score: number; maxScore: number }) {
  const size = 42;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const offset = circumference - (percent / 100) * circumference;
  const tone = getScoreTone(score);

  return (
    <div className="relative flex items-center justify-center">
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
          className={tone.ring}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className={`absolute flex items-baseline leading-none ${tone.text}`}>
        <span className="text-sm font-bold">{score}</span>
        <span className="text-[9px] font-medium">/{maxScore}</span>
      </div>
    </div>
  );
}

export function CoverageTable({
  coverages,
  showScore = true,
  columns = {
    name: 'Coverage',
    limit: 'Limit',
    score: 'Score',
    explanation: 'What It Means'
  }
}: CoverageTableProps) {
  return (
    <div className="grid gap-3 sm:gap-5 sm:grid-cols-2">
      {coverages.map((coverage) => {
        const isBonus = coverage.score === 'bonus';
        const numericScore = typeof coverage.score === 'number' ? coverage.score : undefined;
        const hasRecommendation = !!coverage.recommendation;
        const hasIssue = !isBonus && ((numericScore ?? 0) <= 2 || hasRecommendation);
        const isAmber = !isBonus && (numericScore ?? 0) === 3;
        const tone = !isBonus && numericScore !== undefined ? getScoreTone(numericScore) : undefined;
        const buttonVariant = isBonus
          ? ('default' as const)
          : (numericScore ?? 0) <= 2 || hasRecommendation
          ? ('red' as const)
          : (numericScore ?? 0) <= 3
          ? ('amber' as const)
          : ('default' as const);

        return (
          <div
            key={coverage.name}
            className={`rounded-2xl border bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md ${
              hasIssue
                ? 'border-red-200 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]'
                : isAmber
                ? 'border-amber-200'
                : 'border-gray-100'
            } ${hasIssue ? 'border-l-4 border-l-red-400' : isAmber ? 'border-l-4 border-l-amber-400' : ''}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{columns.name}</p>
                <h4 className="mt-1 text-base font-semibold text-gray-900">
                  <CoverageNameButton name={coverage.name} variant={buttonVariant} />
                </h4>
              </div>
              {showScore && (
                <div className="flex-shrink-0 flex items-center gap-2">
                  {isBonus ? (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      Bonus
                    </span>
                  ) : (
                    numericScore !== undefined && (
                      <ScoreRing score={numericScore} maxScore={coverage.maxScore} />
                    )
                  )}
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{columns.limit}</p>
              <p className={`mt-1 text-lg font-semibold ${tone ? tone.text : 'text-gray-900'}`}>
                {coverage.limit || '—'}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{columns.explanation}</p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{coverage.explanation}</p>
            </div>

            {coverage.recommendation && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                <span className="mr-1">→</span>
                {coverage.recommendation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
