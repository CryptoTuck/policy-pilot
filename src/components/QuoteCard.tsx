import type { EzlynxQuote } from '@/lib/supabase';

function formatCurrency(amountCents: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return formatter.format(amountCents / 100);
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'number' && Number.isFinite(value)) {
    if (Math.abs(value) >= 1000) {
      return formatCurrency(Math.round(value * 100));
    }
    return value.toString();
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}

function formatCoverageEntries(record?: Record<string, unknown> | null, maxItems = 3) {
  if (!record) return [] as Array<[string, string]>;
  return Object.entries(record)
    .slice(0, maxItems)
    .map(([key, value]) => [key, formatValue(value)] as [string, string]);
}

export function QuoteCard({
  quote,
  currentAnnualPremiumCents,
}: {
  quote: EzlynxQuote;
  currentAnnualPremiumCents?: number | null;
}) {
  const coverageEntries = formatCoverageEntries(quote.coverage_summary, 4);
  const deductibleEntries = formatCoverageEntries(quote.deductibles, 2);
  const hasSavings =
    typeof currentAnnualPremiumCents === 'number' &&
    currentAnnualPremiumCents > quote.annual_premium_cents;
  const savingsCents = hasSavings ? currentAnnualPremiumCents! - quote.annual_premium_cents : 0;

  return (
    <div
      className={`bg-white rounded-xl border p-4 sm:p-5 shadow-sm flex flex-col gap-4 ${
        quote.is_recommended ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {quote.carrier_logo_url ? (
            <img
              src={quote.carrier_logo_url}
              alt={`${quote.carrier_name} logo`}
              className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
              {quote.carrier_name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">{quote.policy_type} quote</p>
            <h4 className="text-lg font-semibold text-gray-900">{quote.carrier_name}</h4>
          </div>
        </div>
        {quote.is_recommended && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
            Recommended
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <div>
          <p className="text-sm text-gray-500">Annual premium</p>
          <p className="text-2xl font-semibold text-gray-900">{formatCurrency(quote.annual_premium_cents)}</p>
        </div>
        {quote.monthly_premium_cents !== null && (
          <div>
            <p className="text-sm text-gray-500">Monthly</p>
            <p className="text-base font-semibold text-gray-700">{formatCurrency(quote.monthly_premium_cents)}</p>
          </div>
        )}
        {hasSavings && (
          <div className="ml-auto">
            <p className="text-sm text-emerald-600">Estimated savings</p>
            <p className="text-base font-semibold text-emerald-700">Save {formatCurrency(savingsCents)} / yr</p>
          </div>
        )}
      </div>

      {(coverageEntries.length > 0 || deductibleEntries.length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {coverageEntries.length > 0 && (
            <div className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key coverages</p>
              <div className="space-y-1.5 text-sm text-gray-700">
                {coverageEntries.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between gap-3">
                    <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {deductibleEntries.length > 0 && (
            <div className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Deductibles</p>
              <div className="space-y-1.5 text-sm text-gray-700">
                {deductibleEntries.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between gap-3">
                    <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {quote.recommendation_reason && (
        <div className="rounded-lg bg-emerald-50 text-emerald-700 text-sm p-3">
          {quote.recommendation_reason}
        </div>
      )}

      <div className="mt-auto">
        {quote.bind_url ? (
          <a
            href={quote.bind_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Bind this policy
          </a>
        ) : (
          <button
            type="button"
            className="inline-flex items-center justify-center w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Learn more
          </button>
        )}
      </div>
    </div>
  );
}
