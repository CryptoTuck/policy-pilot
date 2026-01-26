import type { CoverageGrade } from '@/types/grading';

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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1e293b] text-white text-xs sm:text-sm">
            <th className="text-left py-3 px-3 sm:px-4 font-medium uppercase tracking-wide">{columns.name}</th>
            <th className="text-left py-3 px-3 sm:px-4 font-medium uppercase tracking-wide">{columns.limit}</th>
            {showScore && columns.score && (
              <th className="text-left py-3 px-3 sm:px-4 font-medium uppercase tracking-wide">{columns.score}</th>
            )}
            <th className="text-left py-3 px-3 sm:px-4 font-medium uppercase tracking-wide">{columns.explanation}</th>
          </tr>
        </thead>
        <tbody>
          {coverages.map((coverage, index) => (
            <tr
              key={coverage.name}
              className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-900 font-medium text-sm">
                {coverage.name}
              </td>
              <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-700 text-sm">
                {coverage.limit || '—'}
              </td>
              {showScore && (
                <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-700 text-sm">
                  {coverage.score}/{coverage.maxScore}
                </td>
              )}
              <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-600 text-sm">
                {coverage.explanation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
