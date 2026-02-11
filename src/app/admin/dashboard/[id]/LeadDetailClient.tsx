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
  formatted_home_coverage: string | null;
  formatted_auto_coverage: string | null;
  formatted_renters_coverage: string | null;
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
  raw_data: Record<string, unknown>;
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

function getGradeColor(grade: string) {
  switch (grade) {
    case 'A': return 'bg-green-100 text-green-700 border-green-200';
    case 'B': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'C': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'D': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'F': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-500 border-gray-200';
  }
}

export function LeadDetailClient({ id }: { id: string }) {
  const [data, setData] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error || 'Not found'}</div>
      </div>
    );
  }

  const { submission, policies, gradingResults, drivers, addresses } = data;
  const grading = gradingResults[0];
  const overallGrade = scoreToGrade(grading?.overall_score);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Lead Details</h1>
            </div>
            {submission.status === 'completed' && (
              <Link
                href={`/report/${submission.id}`}
                target="_blank"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-lg text-sm hover:from-blue-600 hover:to-cyan-500"
              >
                View Report →
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Customer Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Customer</h2>
            <div className="space-y-3">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {submission.customer_first_name || submission.customer_last_name
                    ? `${submission.customer_first_name || ''} ${submission.customer_last_name || ''}`.trim()
                    : 'Unknown'}
                </p>
              </div>
              {submission.customer_email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{submission.customer_email}</span>
                </div>
              )}
              {submission.customer_phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{submission.customer_phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submission Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Submission</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  submission.status === 'completed' ? 'bg-green-100 text-green-700' :
                  submission.status === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {submission.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Carrier</span>
                <span className="text-gray-900 font-medium">
                  {submission.insurance_provider_friendly || submission.insurance_provider || '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Submitted</span>
                <span className="text-gray-900">{formatDate(submission.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Grade Card */}
          <div className={`rounded-xl p-6 shadow-sm border ${getGradeColor(overallGrade)}`}>
            <h2 className="text-sm font-medium uppercase tracking-wider mb-4 opacity-75">Overall Grade</h2>
            <div className="text-center">
              <span className="text-6xl font-bold">{overallGrade}</span>
              {grading?.overall_score && (
                <p className="text-sm mt-2 opacity-75">{grading.overall_score}/100</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-current/20">
              <div className="text-center">
                <p className="text-xs opacity-75">Home</p>
                <p className="font-bold">{scoreToGrade(grading?.home_score)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs opacity-75">Auto</p>
                <p className="font-bold">{scoreToGrade(grading?.auto_score)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs opacity-75">Renters</p>
                <p className="font-bold">{scoreToGrade(grading?.renters_score)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Drivers */}
        {drivers && drivers.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Drivers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drivers.map((driver) => (
                <div key={driver.id} className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">
                    {driver.first_name} {driver.last_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {driver.age ? `${driver.age} years old` : ''} {driver.gender ? `• ${driver.gender}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Addresses */}
        {addresses && addresses.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Addresses</h2>
            <div className="space-y-2">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900">
                    {addr.full_address || `${addr.city}, ${addr.state} ${addr.zip}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Policies */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Policies ({policies.length})</h2>
          </div>
          {policies.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No policies found</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {policies.map((policy) => (
                <div key={policy.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase ${
                        policy.policy_type === 'home' ? 'bg-purple-100 text-purple-700' :
                        policy.policy_type === 'auto' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {policy.policy_type}
                      </span>
                      <span className="ml-3 text-gray-500 text-sm">
                        {policy.carrier || 'Unknown Carrier'}
                      </span>
                    </div>
                    {policy.premium_cents && (
                      <span className="text-gray-900 font-medium">
                        {formatCents(policy.premium_cents)}/yr
                      </span>
                    )}
                  </div>

                  {/* Vehicles */}
                  {policy.vehicles && policy.vehicles.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Vehicles</p>
                      <div className="flex flex-wrap gap-2">
                        {policy.vehicles.map((v) => (
                          <span key={v.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                            {v.year} {v.make} {v.model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coverages */}
                  {policy.coverages && policy.coverages.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Coverages</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-gray-500 border-b border-gray-100">
                              <th className="pb-2 font-medium">Coverage</th>
                              <th className="pb-2 font-medium">Limit</th>
                              <th className="pb-2 font-medium">Deductible</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {policy.coverages.map((cov) => (
                              <tr key={cov.id} className={cov.is_declined ? 'opacity-50' : ''}>
                                <td className="py-2 text-gray-900">
                                  {cov.friendly_name || cov.name}
                                  {cov.is_declined && <span className="text-red-500 ml-2">(Declined)</span>}
                                </td>
                                <td className="py-2 text-gray-700">
                                  {cov.per_person_limit_cents && cov.per_incident_limit_cents
                                    ? `${formatCents(cov.per_person_limit_cents)}/${formatCents(cov.per_incident_limit_cents)}`
                                    : formatCents(cov.per_incident_limit_cents)}
                                </td>
                                <td className="py-2 text-gray-700">{formatCents(cov.deductible_cents)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
