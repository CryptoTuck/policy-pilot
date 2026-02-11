import type { CarrierAlignmentAnalysis, CarrierAlignmentFinding } from '@/types/grading';

interface CarrierAnalysisProps {
  analysis: CarrierAlignmentAnalysis;
}

function getTypeIcon(type: CarrierAlignmentFinding['type']) {
  switch (type) {
    case 'gap':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case 'alignment':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      );
    case 'value':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

function getTypeLabel(type: CarrierAlignmentFinding['type']) {
  switch (type) {
    case 'gap':
      return 'Coverage Gap';
    case 'alignment':
      return 'Alignment Issue';
    case 'value':
      return 'Value Opportunity';
  }
}

function getSeverityStyles(severity: CarrierAlignmentFinding['severity']) {
  switch (severity) {
    case 'high':
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-500',
        badge: 'bg-red-100 text-red-700',
      };
    case 'medium':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: 'text-amber-500',
        badge: 'bg-amber-100 text-amber-700',
      };
    case 'low':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-500',
        badge: 'bg-blue-100 text-blue-700',
      };
  }
}

function FindingCard({ finding }: { finding: CarrierAlignmentFinding }) {
  const styles = getSeverityStyles(finding.severity);

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${styles.icon}`}>
          {getTypeIcon(finding.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-semibold text-gray-900">{finding.title}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badge}`}>
              {getTypeLabel(finding.type)}
            </span>
          </div>
          <p className="text-sm text-gray-600">{finding.description}</p>
          {finding.affectedPolicies.length > 0 && (
            <div className="mt-2 flex gap-1">
              {finding.affectedPolicies.map((policy) => (
                <span
                  key={policy}
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                >
                  {policy}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CarrierAnalysis({ analysis }: CarrierAnalysisProps) {
  const { findings, isBundled, liabilityAligned, summary } = analysis;

  // Sort findings by severity (high first)
  const sortedFindings = [...findings].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  const highCount = findings.filter((f) => f.severity === 'high').length;
  const mediumCount = findings.filter((f) => f.severity === 'medium').length;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Carrier-Aligned Analysis
        </h2>
        <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full">
          Portfolio View
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        How insurance carriers would evaluate your coverage portfolio
      </p>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
            isBundled
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          <span>{isBundled ? '✓' : '!'}</span>
          <span>{isBundled ? 'Bundled' : 'Not Bundled'}</span>
        </div>
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
            liabilityAligned
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          <span>{liabilityAligned ? '✓' : '!'}</span>
          <span>{liabilityAligned ? 'Liability Aligned' : 'Liability Mismatch'}</span>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <p className="text-gray-700 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
          {summary}
        </p>
      )}

      {/* Findings */}
      {sortedFindings.length > 0 ? (
        <>
          {(highCount > 0 || mediumCount > 0) && (
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
              {highCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {highCount} high priority
                </span>
              )}
              {mediumCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {mediumCount} medium
                </span>
              )}
            </div>
          )}
          <div className="space-y-3">
            {sortedFindings.map((finding, idx) => (
              <FindingCard key={idx} finding={finding} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
          <div className="text-green-500 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-medium text-green-700">No carrier concerns identified</p>
          <p className="text-sm text-green-600">Your coverage portfolio is well-aligned</p>
        </div>
      )}
    </section>
  );
}
