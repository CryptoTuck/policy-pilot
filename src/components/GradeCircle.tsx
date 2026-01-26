interface GradeCircleProps {
  grade: string;
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeClasses = {
  sm: 'w-14 h-14 text-xl sm:w-16 sm:h-16 sm:text-2xl',
  md: 'w-20 h-20 text-3xl sm:w-24 sm:h-24 sm:text-4xl',
  lg: 'w-24 h-24 text-4xl sm:w-32 sm:h-32 sm:text-5xl',
};

const gradeColors: Record<string, string> = {
  A: 'from-green-400 to-green-600 text-green-50',
  B: 'from-blue-400 to-blue-600 text-blue-50',
  C: 'from-yellow-400 to-yellow-600 text-yellow-50',
  D: 'from-orange-400 to-orange-600 text-orange-50',
  F: 'from-red-400 to-red-600 text-red-50',
};

export function GradeCircle({ grade, score, size = 'md', label }: GradeCircleProps) {
  const colorClass = gradeColors[grade] || gradeColors.C;

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div
        className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center font-bold bg-gradient-to-br shadow-lg`}
      >
        {grade}
      </div>
      <div className="text-xs sm:text-sm text-gray-600">{score}/100</div>
      {label && <div className="text-xs sm:text-sm font-medium text-gray-800">{label}</div>}
    </div>
  );
}
