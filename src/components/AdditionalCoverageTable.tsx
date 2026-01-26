import type { AdditionalCoverageAssessment } from '@/types/grading';

interface AdditionalCoverageTableProps {
  coverages: AdditionalCoverageAssessment[];
}

export function AdditionalCoverageTable({ coverages }: AdditionalCoverageTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1e3a5f] text-white text-xs sm:text-sm">
            <th className="text-left py-3 px-3 sm:px-4 font-medium uppercase tracking-wide">Coverage</th>
            <th className="text-left py-3 px-3 sm:px-4 font-medium uppercase tracking-wide">Limit</th>
            <th className="text-left py-3 px-3 sm:px-4 font-medium uppercase tracking-wide">What It Means</th>
          </tr>
        </thead>
        <tbody>
          {coverages.map((coverage, index) => (
            <tr
              key={coverage.name}
              className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-900 font-medium text-sm">
                {coverage.name}
              </td>
              <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-700 text-sm">
                {coverage.limit || (coverage.present ? 'Included' : 'None')}
              </td>
              <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-600 text-sm">
                {coverage.note || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
