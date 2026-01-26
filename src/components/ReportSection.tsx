import { ReactNode } from 'react';

interface ReportSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ReportSection({ title, children, className = '' }: ReportSectionProps) {
  return (
    <section className={`mb-6 sm:mb-8 ${className}`}>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b border-gray-200">
        {title}
      </h3>
      {children}
    </section>
  );
}

interface StrengthsWeaknessesProps {
  strengths: string[];
  areasToReview: string[];
}

export function StrengthsWeaknesses({ strengths, areasToReview }: StrengthsWeaknessesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-medium text-green-800 mb-2 text-sm sm:text-base">Key Strengths</h4>
        <ul className="space-y-1.5 sm:space-y-2">
          {strengths.map((strength, i) => (
            <li key={i} className="text-xs sm:text-sm text-green-700 flex items-start gap-2">
              <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="font-medium text-amber-800 mb-2 text-sm sm:text-base">Areas to Review</h4>
        <ul className="space-y-1.5 sm:space-y-2">
          {areasToReview.map((area, i) => (
            <li key={i} className="text-xs sm:text-sm text-amber-700 flex items-start gap-2">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">→</span>
              <span>{area}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
