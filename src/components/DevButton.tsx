'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DevButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/test-grade');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      // Navigate to the report page
      router.push(`/report/${data.reportId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">DEV MODE</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-4 text-center">
        Generate a sample report with mock policy data for testing.
      </p>
      <button
        onClick={handleGenerateReport}
        disabled={loading}
        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:from-blue-300 disabled:to-cyan-200 text-white font-semibold rounded-full text-base transition-all shadow-lg hover:shadow-xl disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Test Report'
        )}
      </button>
      {error && (
        <p className="mt-3 text-xs sm:text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
