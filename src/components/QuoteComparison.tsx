import Link from 'next/link';
import type { EzlynxQuote } from '@/lib/supabase';
import { QuoteCard } from '@/components/QuoteCard';

function formatCurrency(amountCents: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return formatter.format(amountCents / 100);
}

export function QuoteComparison({
  quotes,
  currentAnnualPremiumCents,
}: {
  quotes: EzlynxQuote[];
  currentAnnualPremiumCents?: number | null;
}) {
  if (!quotes || quotes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
        <p className="text-lg font-semibold text-gray-900 mb-2">Quotes coming soon</p>
        <p className="text-sm text-gray-600 mb-4">
          We&apos;re working on competitive quotes from EZLynx carriers. Check back shortly or request new quotes now.
        </p>
        <Link
          href="/get-policy"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          Get Quotes
        </Link>
      </div>
    );
  }

  const sorted = [...quotes].sort((a, b) => a.annual_premium_cents - b.annual_premium_cents);

  return (
    <div className="space-y-4">
      {typeof currentAnnualPremiumCents === 'number' && (
        <div className="rounded-lg bg-white border border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm text-gray-500">Current premium</p>
            <p className="text-base font-semibold text-gray-900">{formatCurrency(currentAnnualPremiumCents)} / yr</p>
          </div>
          <p className="text-sm text-gray-600">
            Compare below to see potential savings across carriers.
          </p>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {sorted.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} currentAnnualPremiumCents={currentAnnualPremiumCents} />
        ))}
      </div>
    </div>
  );
}
