interface SectionAnalysisProps {
  title: string;
  score: number;
  maxScore: number;
  analysis: string;
}

function getScoreGradient(score: number, maxScore: number): string {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  if (pct >= 80) return 'from-emerald-500 to-green-500';
  if (pct >= 60) return 'from-yellow-400 to-amber-400';
  if (pct >= 40) return 'from-orange-400 to-orange-500';
  return 'from-red-500 to-red-600';
}

function getCtaText(score: number, maxScore: number, title: string): string {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const type = title.toLowerCase();

  if (pct < 40) {
    if (type.includes('auto')) return 'Find Better Auto Coverage Now';
    if (type.includes('home')) return 'Find Better Home Coverage Now';
    if (type.includes('renter')) return 'Find Better Renters Coverage Now';
    return 'Find Better Coverage Now';
  }
  if (pct < 60) {
    if (type.includes('auto')) return 'See Stronger Auto Options';
    if (type.includes('home')) return 'See Stronger Home Options';
    if (type.includes('renter')) return 'See Stronger Renters Options';
    return 'See Stronger Coverage Options';
  }
  if (pct < 80) {
    if (type.includes('auto')) return 'Compare Auto Policies';
    if (type.includes('home')) return 'Compare Home Policies';
    if (type.includes('renter')) return 'Compare Renters Policies';
    return 'Compare Policy Options';
  }
  return 'See If You Can Save More';
}

export function SectionAnalysis({ title, score, maxScore, analysis }: SectionAnalysisProps) {
  const gradient = getScoreGradient(score, maxScore);
  const ctaText = getCtaText(score, maxScore, title);

  return (
    <>
      <div className={`bg-gradient-to-r ${gradient} rounded-lg p-4 sm:p-5 my-4 sm:my-6`}>
        <h3 className="text-white font-semibold text-sm sm:text-base">Section Analysis</h3>
        <h4 className="text-white font-semibold text-sm sm:text-base mt-1">
          {title} - Total Score: {score}/{maxScore}
        </h4>
        <p className="text-white/90 text-sm mt-2 leading-relaxed">{analysis}</p>
      </div>
      <div className="flex mt-3 mb-2">
        <button
          className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {ctaText}
        </button>
      </div>
    </>
  );
}
