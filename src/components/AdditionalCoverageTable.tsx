import type { AdditionalCoverageAssessment } from '@/types/grading';

interface AdditionalCoverageTableProps {
  coverages: AdditionalCoverageAssessment[];
}

export function AdditionalCoverageTable({ coverages }: AdditionalCoverageTableProps) {
  return (
    <>
      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1e293b] text-white text-sm">
              <th className="text-left py-3 px-4 font-medium uppercase tracking-wide">Coverage</th>
              <th className="text-left py-3 px-4 font-medium uppercase tracking-wide">Limit</th>
              <th className="text-left py-3 px-4 font-medium uppercase tracking-wide">What It Means</th>
            </tr>
          </thead>
          <tbody>
            {coverages.map((coverage, index) => (
              <tr
                key={coverage.name}
                className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <td className="py-4 px-4 text-gray-900 font-medium text-sm">
                  {coverage.name}
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  {coverage.limit || (coverage.present ? 'Included' : 'None')}
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm">
                  {coverage.note || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Shown only on mobile */}
      <div className="sm:hidden space-y-3">
        {coverages.map((coverage, index) => (
          <div
            key={coverage.name}
            className={`rounded-lg p-4 ${index % 2 === 0 ? 'bg-white border border-gray-100' : 'bg-gray-50'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">{coverage.name}</h4>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                coverage.present
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {coverage.present ? 'Included' : 'Not Included'}
              </span>
            </div>
            <div className="text-blue-600 font-medium text-sm mb-2">
              {coverage.limit || (coverage.present ? 'Included' : '—')}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {coverage.note || '—'}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
