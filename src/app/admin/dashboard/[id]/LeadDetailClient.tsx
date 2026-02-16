'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Coverage { id: string; name: string; friendly_name: string | null; per_incident_limit_cents: number | null; per_person_limit_cents: number | null; deductible_cents: number | null; is_declined: boolean; }
interface Vehicle { id: string; year: number | null; make: string | null; model: string | null; vin: string | null; }
interface Policy { id: string; policy_type: string; carrier: string | null; policy_number: string | null; status: string | null; effective_date: string | null; expiration_date: string | null; premium_cents: number | null; coverages: Coverage[]; vehicles: Vehicle[]; }
interface GradingResult { id: string; overall_score: number | null; home_score: number | null; auto_score: number | null; renters_score: number | null; openai_response: Record<string, unknown>; }
interface Submission { id: string; created_at: string; status: string; customer_email: string | null; customer_first_name: string | null; customer_last_name: string | null; customer_phone: string | null; insurance_provider: string | null; insurance_provider_friendly: string | null; }
interface Driver { id: string; first_name: string | null; last_name: string | null; age: number | null; gender: string | null; }
interface Address { id: string; full_address: string | null; city: string | null; state: string | null; zip: string | null; }
interface LeadData { submission: Submission; policies: Policy[]; gradingResults: GradingResult[]; drivers: Driver[]; addresses: Address[]; }

const c = {
  base: '#0a0a0b', panel: '#0f0f12', card: '#14141a', border: '#1e1e28',
  text: '#e8e8ed', muted: '#8a8a9a', accent1: '#0ea5e9', accent2: '#06b6d4',
  gradient: 'linear-gradient(90deg, #0ea5e9, #06b6d4)',
  glow: '0 0 0 1px rgba(14,165,233,0.35), 0 0 18px rgba(6,182,212,0.2)',
};

function formatCents(cents: number | null): string { return cents === null ? '—' : `$${(cents / 100).toLocaleString()}`; }
function formatDate(d: string | null): string { return d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'; }
function scoreToGrade(s: number | null): string { if (s === null) return '—'; if (s >= 90) return 'A'; if (s >= 80) return 'B'; if (s >= 70) return 'C'; if (s >= 60) return 'D'; return 'F'; }

function getGradeGradient(grade: string): string {
  switch (grade) {
    case 'A': return 'from-green-500 to-emerald-400';
    case 'B': return 'from-blue-500 to-cyan-400';
    case 'C': return 'from-amber-600 to-yellow-500';
    case 'D': return 'from-orange-600 to-amber-500';
    case 'F': return 'from-red-500 to-rose-400';
    default: return 'from-gray-500 to-gray-400';
  }
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl relative overflow-hidden ${className}`} style={{ background: c.card, border: `1px solid ${c.border}` }}>
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.gradient, opacity: 0.6 }} />
      <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: c.gradient, opacity: 0.6 }} />
      {children}
    </div>
  );
}

export function LeadDetailClient({ id }: { id: string }) {
  const [data, setData] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/submissions/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        setData(await res.json());
      } catch (err) { setError(err instanceof Error ? err.message : 'Failed to load'); }
      finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: c.base }}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: c.accent1, borderTopColor: 'transparent' }} />
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: c.base }}>
      <Card className="p-6 text-center">
        <p style={{ color: '#ef4444' }}>{error || 'Not found'}</p>
        <Link href="/admin/dashboard" className="text-sm mt-2 inline-block" style={{ color: c.accent1 }}>← Back to dashboard</Link>
      </Card>
    </div>
  );

  const { submission, policies, gradingResults, drivers, addresses } = data;
  const grading = gradingResults[0];
  const overallGrade = scoreToGrade(grading?.overall_score);
  const gradeGradient = getGradeGradient(overallGrade);

  return (
    <div className="min-h-screen" style={{ background: c.base, color: c.text }}>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-lg" style={{ background: 'rgba(15,15,18,0.85)', borderBottom: `1px solid ${c.border}` }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2 transition-colors" style={{ color: c.muted }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = c.text; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = c.muted; }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span className="text-sm font-medium">Back</span>
          </Link>
          {submission.status === 'completed' && (
            <Link href={`/report/${submission.id}`} target="_blank"
              className="px-4 py-2 text-white font-medium rounded-xl text-sm transition-all"
              style={{ background: c.gradient, boxShadow: '0 0 15px rgba(6,182,212,0.2)' }}
            >View Report</Link>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Grade Hero — full-color gradient card */}
        <div className={`bg-gradient-to-br ${gradeGradient} rounded-3xl p-8 mb-6 shadow-xl`}>
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-sm opacity-80 mb-1">Overall Grade</p>
              <p className="text-7xl font-bold">{overallGrade}</p>
              {grading?.overall_score && (
                <p className="text-sm opacity-80 mt-2">{grading.overall_score} out of 100</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-6 text-white">
              {[
                { label: 'Home', grade: scoreToGrade(grading?.home_score) },
                { label: 'Auto', grade: scoreToGrade(grading?.auto_score) },
                { label: 'Renters', grade: scoreToGrade(grading?.renters_score) },
              ].map(({ label, grade }) => (
                <div key={label} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-1.5">
                    <span className="text-2xl font-bold">{grade}</span>
                  </div>
                  <p className="text-xs opacity-80">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer & Submission — 3-column layout on wide screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="p-5">
            <h2 className="font-semibold mb-3 flex items-center gap-2" style={{ color: c.accent1 }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Customer
            </h2>
            <p className="text-lg font-semibold">{submission.customer_first_name || submission.customer_last_name ? `${submission.customer_first_name || ''} ${submission.customer_last_name || ''}`.trim() : 'Unknown'}</p>
            {submission.customer_email && <p className="text-sm mt-1" style={{ color: c.muted }}>{submission.customer_email}</p>}
            {submission.customer_phone && <p className="text-sm mt-1" style={{ color: c.muted }}>{submission.customer_phone}</p>}
          </Card>
          <Card className="p-5">
            <h2 className="font-semibold mb-3 flex items-center gap-2" style={{ color: c.accent1 }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Submission
            </h2>
            <div className="space-y-2">
              {[
                { label: 'Status', value: <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: submission.status === 'completed' ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)', color: submission.status === 'completed' ? '#22c55e' : '#f59e0b' }}>{submission.status}</span> },
                { label: 'Carrier', value: <span style={{ color: c.text }}>{submission.insurance_provider_friendly || submission.insurance_provider || '—'}</span> },
                { label: 'Date', value: <span style={{ color: c.text }}>{formatDate(submission.created_at)}</span> },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: c.muted }}>{label}</span>
                  {value}
                </div>
              ))}
            </div>
          </Card>

          {/* Drivers & Addresses — third column on lg */}
          <Card className="p-5 lg:row-span-1">
            {drivers && drivers.length > 0 && (
              <div className="mb-4">
                <h2 className="font-semibold mb-3 flex items-center gap-2" style={{ color: c.accent1 }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Drivers ({drivers.length})
                </h2>
                <div className="space-y-2">
                  {drivers.map((d) => (
                    <div key={d.id} className="rounded-xl px-4 py-2.5" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
                      <p className="font-medium">{d.first_name} {d.last_name}</p>
                      {(d.age || d.gender) && <p className="text-xs" style={{ color: c.muted }}>{d.age && `${d.age} yrs`} {d.gender && `• ${d.gender}`}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {addresses && addresses.length > 0 && (
              <div>
                <h2 className="font-semibold mb-3 flex items-center gap-2" style={{ color: c.accent1 }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Addresses
                </h2>
                <div className="space-y-2">
                  {addresses.map((a) => (
                    <p key={a.id} className="rounded-xl px-4 py-3 text-sm" style={{ background: c.panel, border: `1px solid ${c.border}`, color: c.muted }}>
                      {a.full_address || `${a.city}, ${a.state} ${a.zip}`}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {(!drivers || drivers.length === 0) && (!addresses || addresses.length === 0) && (
              <p className="text-sm" style={{ color: c.muted }}>No driver or address data</p>
            )}
          </Card>
        </div>

        {/* Policies — full width, 2-column grid on wide screens */}
        <h2 className="font-semibold mb-3 px-1" style={{ color: c.text }}>Policies ({policies.length})</h2>
        {policies.length === 0 ? (
          <Card className="p-8 text-center"><p style={{ color: c.muted }}>No policies found</p></Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {policies.map((policy) => (
              <Card key={policy.id}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${c.border}` }}>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase" style={{
                      background: policy.policy_type === 'home' ? 'rgba(168,85,247,0.15)' : policy.policy_type === 'auto' ? 'rgba(14,165,233,0.15)' : 'rgba(34,197,94,0.15)',
                      color: policy.policy_type === 'home' ? '#a855f7' : policy.policy_type === 'auto' ? '#0ea5e9' : '#22c55e',
                    }}>{policy.policy_type}</span>
                    <span className="font-medium" style={{ color: c.text }}>{policy.carrier || 'Unknown Carrier'}</span>
                  </div>
                  {policy.premium_cents && (
                    <span className="font-semibold" style={{ color: c.text }}>
                      {formatCents(policy.premium_cents)}<span style={{ color: c.muted, fontWeight: 400 }}>/yr</span>
                    </span>
                  )}
                </div>
                <div className="p-5">
                  {policy.vehicles && policy.vehicles.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs uppercase font-semibold mb-2" style={{ color: c.muted }}>Vehicles</p>
                      <div className="flex flex-wrap gap-2">
                        {policy.vehicles.map((v) => (
                          <span key={v.id} className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: 'rgba(14,165,233,0.1)', color: c.accent1 }}>
                            {v.year} {v.make} {v.model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {policy.coverages && policy.coverages.length > 0 && (
                    <div>
                      <p className="text-xs uppercase font-semibold mb-2" style={{ color: c.muted }}>Coverages</p>
                      <div className="space-y-2">
                        {policy.coverages.map((cov) => (
                          <div key={cov.id} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: cov.is_declined ? 'rgba(239,68,68,0.08)' : c.panel }}>
                            <span className="text-sm" style={{ color: cov.is_declined ? '#ef4444' : c.muted }}>
                              {cov.friendly_name || cov.name}{cov.is_declined && <span className="ml-2 text-xs">(Declined)</span>}
                            </span>
                            <div className="text-right">
                              <span className="text-sm font-medium" style={{ color: c.text }}>
                                {cov.per_person_limit_cents && cov.per_incident_limit_cents ? `${formatCents(cov.per_person_limit_cents)} / ${formatCents(cov.per_incident_limit_cents)}` : formatCents(cov.per_incident_limit_cents)}
                              </span>
                              {cov.deductible_cents && <span className="text-xs ml-2" style={{ color: c.muted }}>({formatCents(cov.deductible_cents)} ded.)</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
