interface SectionAnalysisProps {
  title: string;
  score: number;
  maxScore: number;
  analysis: string;
}

export function SectionAnalysis({ title, score, maxScore, analysis }: SectionAnalysisProps) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 sm:p-5 my-4 sm:my-6">
      <h3 className="text-amber-900 font-semibold text-sm sm:text-base">Section Analysis</h3>
      <h4 className="text-amber-800 font-medium text-sm sm:text-base mt-1">
        {title} - Total Score: {score}/{maxScore}
      </h4>
      <p className="text-amber-800 text-sm mt-2 leading-relaxed">{analysis}</p>
    </div>
  );
}
