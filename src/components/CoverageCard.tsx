import type { CoverageGrade } from '@/types/grading';

interface CoverageCardProps {
  coverage: CoverageGrade;
}

function ScoreBar({ score, maxScore }: { score: number; maxScore: number }) {
  const percentage = (score / maxScore) * 100;
  const colorClass =
    score >= 4 ? 'bg-green-500' :
    score >= 3 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex-1 h-2.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 w-10 sm:w-12 text-right">
        {score}/{maxScore}
      </span>
    </div>
  );
}

export function CoverageCard({ coverage }: CoverageCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <h4 className="font-medium text-gray-900 text-sm sm:text-base">{coverage.name}</h4>
      </div>
      <ScoreBar score={coverage.score} maxScore={coverage.maxScore} />
      <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
        {coverage.explanation}
      </p>
      {coverage.recommendation && (
        <div className="mt-2 sm:mt-3 p-2 sm:p-2.5 bg-blue-50 rounded text-xs sm:text-sm text-blue-800">
          <span className="font-medium">Consider:</span> {coverage.recommendation}
        </div>
      )}
    </div>
  );
}
