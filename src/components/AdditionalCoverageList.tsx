import type { AdditionalCoverageAssessment } from '@/types/grading';

interface AdditionalCoverageListProps {
  coverages: AdditionalCoverageAssessment[];
}

const relevanceLabels: Record<string, { text: string; className: string }> = {
  low: { text: 'Low Priority', className: 'bg-gray-100 text-gray-600' },
  situational: { text: 'Situational', className: 'bg-yellow-100 text-yellow-700' },
  often_worth_reviewing: { text: 'Worth Reviewing', className: 'bg-blue-100 text-blue-700' },
};

export function AdditionalCoverageList({ coverages }: AdditionalCoverageListProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      {coverages.map((coverage) => {
        const relevance = relevanceLabels[coverage.relevance] || relevanceLabels.low;

        return (
          <div
            key={coverage.name}
            className="p-3 sm:p-4 bg-gray-50 rounded-lg"
          >
            {/* Mobile: stacked layout, Desktop: flex row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 sm:mt-0 ${coverage.present ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className="min-w-0">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{coverage.name}</span>
                  {coverage.note && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{coverage.note}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 pl-5.5 sm:pl-0">
                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${relevance.className}`}>
                  {relevance.text}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {coverage.present ? 'Included' : 'Optional'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
