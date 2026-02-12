'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Coverage {
  id: string;
  name: string;
  friendly_name: string | null;
  per_incident_limit_cents: number | null;
  per_person_limit_cents: number | null;
  deductible_cents: number | null;
  is_declined: boolean;
}

interface Vehicle {
  id: string;
  year: number | null;
  make: string | null;
  model: string | null;
  vin: string | null;
}

interface Policy {
  id: string;
  policy_type: string;
  carrier: string | null;
  policy_number: string | null;
  status: string | null;
  effective_date: string | null;
  expiration_date: string | null;
  premium_cents: number | null;
  coverages: Coverage[];
  vehicles: Vehicle[];
}

interface GradingResult {
  id: string;
  overall_score: number | null;
  home_score: number | null;
  auto_score: number | null;
  renters_score: number | null;
  openai_response: Record<string, unknown>;
}

interface Submission {
  id: string;
  created_at: string;
  status: string;
  customer_email: string | null;
  customer_first_name: string | null;
  customer_last_name: string | null;
  customer_phone: string | null;
  insurance_provider: string | null;
  insurance_provider_friendly: string | null;
}

interface Driver {
  id: string;
  first_name: string | null;
  last_name: string | null;
  age: number | null;
  gender: string | null;
}

interface Address {
  id: string;
  full_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
}

interface LeadData {
  submission: Submission;
  policies: Policy[];
  gradingResults: GradingResult[];
  drivers: Driver[];
  addresses: Address[];
}

function formatCents(cents: number | null): string {
  if (cents === null) return '—';
  return `$${(cents / 100).toLocaleString()}`;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function scoreToGrade(score: number | null): string {
  if (score === null) return '—';
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function getGradeStyles(grade: string) {
  switch (grade) {
    case 'A': return { bg: 'from-green-500 to-emerald-400', text: 'text-white' };
    case 'B': return { bg: 'from-blue-500 to-cyan-400', text: 'text-white' };
    case 'C': return { bg: 'from-amber-500 to-yellow-400', text: 'text-white' };
    case 'D': return { bg: 'from-orange-500 to-amber-400', text: 'text-white' };
    case 'F': return { bg: 'from-red-500 to-rose-400', text: 'text-white' };
    default: return { bg: 'from-gray-400 to-gray-300', text: 'text-white' };
  }
}

export function LeadDetailClient({ id }: { id: string }) {
  const [data, setData] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/submissions/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium">{error || 'Not found'}</p>
          <Link href="/admin/dashboard" className="text-blue-600 text-sm mt-2 inline-block">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { submission, policies, gradingResults, drivers, addresses } = data;
  const grading = gradingResults[0];
  const overallGrade = scoreToGrade(grading?.overall_score);
  const gradeStyles = getGradeStyles(overallGrade);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </Link>
            {submission.status === 'completed' && (
              <Link
                href={`/report/${submission.id}`}
                target="_blank"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-xl text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                View Report
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Grade Hero */}
        <div className={`bg-gradient-to-br ${gradeStyles.bg} rounded-3xl p-6 mb-6 shadow-xl`}>
          <div className="flex items-center justify-between">
            <div className={gradeStyles.text}>
              <p className="text-sm opacity-80 mb-1">Overall Grade</p>
              <p className="text-6xl font-bold">{overallGrade}</p>
              {grading?.overall_score && (
                <p className="text-sm opacity-80 mt-1">{grading.overall_score} out of 100</p>
              )}
            </div>
            <div className={`grid grid-cols-3 gap-4 ${gradeStyles.text}`}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-1">
                  <span className="text-xl font-bold">{scoreToGrade(grading?.home_score)}</span>
                </div>
                <p className="text-xs opacity-80">Home</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-1">
                  <span className="text-xl font-bold">{scoreToGrade(grading?.auto_score)}</span>
                </div>
                <p className="text-xs opacity-80">Auto</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-1">
                  <span className="text-xl font-bold">{scoreToGrade(grading?.renters_score)}</span>
                </div>
                <p className="text-xs opacity-80">Renters</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Customer Info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900">Customer</h2>
            </div>
            <div className="space-y-3">
              <p className="text-lg font-semibold text-gray-900">
                {submission.customer_first_name || submission.customer_last_name
                  ? `${submission.customer_first_name || ''} ${submission.customer_last_name || ''}`.trim()
                  : 'Unknown'}
              </p>
              {submission.customer_email && (
                <p className="text-sm text-gray-600">{submission.customer_email}</p>
              )}
              {submission.customer_phone && (
                <p className="text-sm text-gray-600">{submission.customer_phone}</p>
              )}
            </div>
          </div>

          {/* Submission Info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900">Submission</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  submission.status === 'completed' ? 'bg-green-100 text-green-700' :
                  submission.status === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {submission.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Carrier</span>
                <span className="text-sm font-medium text-gray-900">
                  {submission.insurance_provider_friendly || submission.insurance_provider || '—'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Date</span>
                <span className="text-sm text-gray-900">{formatDate(submission.created_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drivers */}
        {drivers && drivers.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900">Drivers ({drivers.length})</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {drivers.map((driver) => (
                <div key={driver.id} className="bg-gray-50 rounded-xl px-4 py-2">
                  <p className="font-medium text-gray-900">{driver.first_name} {driver.last_name}</p>
                  {(driver.age || driver.gender) && (
                    <p className="text-xs text-gray-500">
                      {driver.age && `${driver.age} yrs`} {driver.gender && `• ${driver.gender}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Addresses */}
        {addresses && addresses.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900">Addresses</h2>
            </div>
            <div className="space-y-2">
              {addresses.map((addr) => (
                <p key={addr.id} className="text-gray-700 bg-gray-50 rounded-xl px-4 py-3">
                  {addr.full_address || `${addr.city}, ${addr.state} ${addr.zip}`}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Policies */}
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900 px-1">Policies ({policies.length})</h2>
          
          {policies.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100/50">
              <p className="text-gray-500">No policies found</p>
            </div>
          ) : (
            policies.map((policy) => (
              <div key={policy.id} className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
                {/* Policy Header */}
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      policy.policy_type === 'home' ? 'bg-purple-100 text-purple-700' :
                      policy.policy_type === 'auto' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {policy.policy_type}
                    </span>
                    <span className="text-gray-700 font-medium">
                      {policy.carrier || 'Unknown Carrier'}
                    </span>
                  </div>
                  {policy.premium_cents && (
                    <span className="text-gray-900 font-semibold">
                      {formatCents(policy.premium_cents)}<span className="text-gray-400 font-normal">/yr</span>
                    </span>
                  )}
                </div>

                <div className="p-5">
                  {/* Vehicles */}
                  {policy.vehicles && policy.vehicles.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Vehicles</p>
                      <div className="flex flex-wrap gap-2">
                        {policy.vehicles.map((v) => (
                          <span key={v.id} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                            {v.year} {v.make} {v.model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coverages */}
                  {policy.coverages && policy.coverages.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Coverages</p>
                      <div className="space-y-2">
                        {policy.coverages.map((cov) => (
                          <div 
                            key={cov.id} 
                            className={`flex items-center justify-between py-2 px-3 rounded-lg ${cov.is_declined ? 'bg-red-50' : 'bg-gray-50'}`}
                          >
                            <span className={`text-sm ${cov.is_declined ? 'text-red-600' : 'text-gray-700'}`}>
                              {cov.friendly_name || cov.name}
                              {cov.is_declined && <span className="ml-2 text-xs">(Declined)</span>}
                            </span>
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-900">
                                {cov.per_person_limit_cents && cov.per_incident_limit_cents
                                  ? `${formatCents(cov.per_person_limit_cents)} / ${formatCents(cov.per_incident_limit_cents)}`
                                  : formatCents(cov.per_incident_limit_cents)}
                              </span>
                              {cov.deductible_cents && (
                                <span className="text-xs text-gray-500 ml-2">
                                  ({formatCents(cov.deductible_cents)} ded.)
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
