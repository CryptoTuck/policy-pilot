'use client';

import type { AdditionalCoverageAssessment } from '@/types/grading';
import { CoverageNameButton } from '@/components/CoverageNameButton';
import { getCoverageBenefitExplanation } from '@/lib/coverage-descriptions';

interface AdditionalCoverageTableProps {
  coverages: AdditionalCoverageAssessment[];
  variant?: 'bonus' | 'consider';
}

export function AdditionalCoverageTable({ coverages, variant = 'bonus' }: AdditionalCoverageTableProps) {
  const isConsider = variant === 'consider';

  return (
    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
      {coverages.map((coverage) => {
        const benefitExplanation = isConsider
          ? getCoverageBenefitExplanation(coverage.name)
          : undefined;
        const noteText = isConsider
          ? (benefitExplanation || coverage.note || '—')
          : (coverage.note || '—');

        return (
          <div
            key={coverage.name}
            className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Coverage</p>
                <h4 className="mt-1 text-base font-semibold text-gray-900">
                  <CoverageNameButton name={coverage.name} />
                </h4>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  isConsider
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {!isConsider && (
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isConsider ? 'Consider' : 'Included'}
              </span>
            </div>

            {!isConsider && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Your Coverage</p>
                <p className="mt-1 text-lg font-semibold text-emerald-700">
                  {coverage.limit || (coverage.present ? 'Included' : '—')}
                </p>
              </div>
            )}

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {isConsider ? 'Why It Might Be Beneficial' : 'What It Means'}
              </p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{noteText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
