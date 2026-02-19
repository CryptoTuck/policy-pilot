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

function getScoreColor(score: number, hasRecommendation: boolean): { bg: string; text: string; border: string } {
  if (score <= 2 || hasRecommendation) {
    return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  }
  if (score <= 3) {
    return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
  }
  return { bg: '', text: '', border: '' };
}

function getScoreBadgeColor(score: number, hasRecommendation: boolean): string {
  if (score <= 2 || hasRecommendation) {
    return 'bg-red-500';
  }
  if (score <= 3) {
    return 'bg-amber-500';
  }
  return 'bg-gradient-to-r from-blue-500 to-cyan-400';
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
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
    <>
      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800/80 text-white text-sm">
              <th className="text-left py-3 px-4 font-medium uppercase tracking-wide first:rounded-tl-2xl">{columns.name}</th>
              <th className="text-left py-3 px-4 font-medium uppercase tracking-wide">{columns.limit}</th>
              {showScore && columns.score && (
                <th className="text-left py-3 px-4 font-medium uppercase tracking-wide">{columns.score}</th>
              )}
              <th className="text-left py-3 px-4 font-medium uppercase tracking-wide last:rounded-tr-2xl">{columns.explanation}</th>
            </tr>
          </thead>
          <tbody>
            {coverages.map((coverage, index) => {
              const isBonus = coverage.score === 'bonus';
              const numericScore = typeof coverage.score === 'number' ? coverage.score : undefined;
              const hasIssue = !isBonus && ((numericScore ?? 0) <= 3 || !!coverage.recommendation);
              const colors = isBonus ? { bg: '', text: '', border: '' } : getScoreColor(numericScore ?? 0, !!coverage.recommendation);
              const buttonVariant = isBonus ? 'default' as const : (numericScore ?? 0) <= 2 || !!coverage.recommendation ? 'red' as const : (numericScore ?? 0) <= 3 ? 'amber' as const : 'default' as const;

              return (
                <tr
                  key={coverage.name}
                  className={`border-b ${hasIssue ? `${colors.bg} ${colors.border} border-l-4` : 'border-gray-100'} ${!hasIssue && index % 2 === 0 ? 'bg-white' : !hasIssue ? 'bg-gray-50/50' : ''}`}
                >
                  <td className="py-4 px-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {hasIssue && <WarningIcon className={`w-4 h-4 flex-shrink-0 ${colors.text}`} />}
                      <span className={`font-medium ${hasIssue ? colors.text : 'text-gray-900'}`}>
                        <CoverageNameButton name={coverage.name} variant={buttonVariant} />
                      </span>
                    </div>
                  </td>
                  <td className={`py-4 px-4 text-sm ${hasIssue ? colors.text : 'text-gray-700'}`}>
                    {coverage.limit || '—'}
                  </td>
                  {showScore && (
                    <td className="py-4 px-4 text-sm">
                      {isBonus ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">
                          Bonus
                        </span>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          (numericScore ?? 0) <= 2 || coverage.recommendation
                            ? 'bg-red-100 text-red-800'
                            : (numericScore ?? 0) <= 3
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {numericScore}/{coverage.maxScore}
                        </span>
                      )}
                    </td>
                  )}
                  <td className={`py-4 px-4 text-sm ${hasIssue ? colors.text : 'text-gray-600'}`}>
                    <div>
                      {coverage.explanation}
                      {coverage.recommendation && (
                        <p className="mt-2 font-semibold text-red-700 flex items-start gap-1">
                          <span className="flex-shrink-0">→</span>
                          {coverage.recommendation}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Shown only on mobile */}
      <div className="sm:hidden space-y-3">
        {coverages.map((coverage) => {
          const isBonus = coverage.score === 'bonus';
          const numericScore = typeof coverage.score === 'number' ? coverage.score : undefined;
          const hasIssue = !isBonus && ((numericScore ?? 0) <= 3 || !!coverage.recommendation);
          const colors = isBonus ? { bg: '', text: '', border: '' } : getScoreColor(numericScore ?? 0, !!coverage.recommendation);
          const badgeColor = isBonus ? 'bg-slate-500' : getScoreBadgeColor(numericScore ?? 0, !!coverage.recommendation);
          const buttonVariant = isBonus ? 'default' as const : (numericScore ?? 0) <= 2 || !!coverage.recommendation ? 'red' as const : (numericScore ?? 0) <= 3 ? 'amber' as const : 'default' as const;

          return (
            <div
              key={coverage.name}
              className={`rounded-lg p-4 ${
                hasIssue
                  ? `${colors.bg} border-2 ${colors.border}`
                  : 'bg-white border border-gray-100'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {hasIssue && <WarningIcon className={`w-4 h-4 flex-shrink-0 ${colors.text}`} />}
                  <h4 className={`font-semibold text-sm ${hasIssue ? colors.text : 'text-gray-900'}`}>
                    <CoverageNameButton name={coverage.name} variant={buttonVariant} />
                  </h4>
                </div>
                {showScore && (
                  <span className={`${badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                    {isBonus ? 'Bonus' : `${numericScore}/${coverage.maxScore}`}
                  </span>
                )}
              </div>
              <div className={`font-medium text-sm mb-2 ${hasIssue ? colors.text : 'text-blue-600'}`}>
                {coverage.limit || '—'}
              </div>
              <p className={`text-sm leading-relaxed ${hasIssue ? colors.text : 'text-gray-600'}`}>
                {coverage.explanation}
              </p>
              {coverage.recommendation && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-sm font-semibold text-red-700 flex items-start gap-1">
                    <span className="flex-shrink-0">→</span>
                    {coverage.recommendation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
