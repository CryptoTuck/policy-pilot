'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  overallGrade: string | null;
  homeGrade: string | null;
  autoGrade: string | null;
  rentersGrade: string | null;
}

interface Stats {
  total: number;
  completed: number;
  pending: number;
  failed: number;
  gradeA: number;
  gradeB: number;
  gradeC: number;
  gradeDF: number;
}

function getGradeColor(grade: string | null) {
  switch (grade) {
    case 'A': return 'bg-green-100 text-green-700';
    case 'B': return 'bg-blue-100 text-blue-700';
    case 'C': return 'bg-amber-100 text-amber-700';
    case 'D': return 'bg-orange-100 text-orange-700';
    case 'F': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-500';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-700';
    case 'processing': return 'bg-blue-100 text-blue-700';
    case 'pending': return 'bg-amber-100 text-amber-700';
    case 'failed': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-500';
  }
}

export function AdminDashboardClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    gradeA: 0,
    gradeB: 0,
    gradeC: 0,
    gradeDF: 0,
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions?limit=100');
      const data = await res.json();
      
      if (res.ok) {
        setSubmissions(data.submissions || []);
        
        const subs = data.submissions || [];
        setStats({
          total: subs.length,
          completed: subs.filter((s: Submission) => s.status === 'completed').length,
          pending: subs.filter((s: Submission) => s.status === 'pending' || s.status === 'processing').length,
          failed: subs.filter((s: Submission) => s.status === 'failed').length,
          gradeA: subs.filter((s: Submission) => s.overallGrade === 'A').length,
          gradeB: subs.filter((s: Submission) => s.overallGrade === 'B').length,
          gradeC: subs.filter((s: Submission) => s.overallGrade === 'C').length,
          gradeDF: subs.filter((s: Submission) => s.overallGrade === 'D' || s.overallGrade === 'F').length,
        });
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getCustomerName = (sub: Submission) => {
    if (sub.customer_first_name || sub.customer_last_name) {
      return `${sub.customer_first_name || ''} ${sub.customer_last_name || ''}`.trim();
    }
    return sub.customer_email?.split('@')[0] || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Policy Pilot" className="w-10 h-10 rounded-xl shadow-lg shadow-blue-500/20" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Policy Pilot</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => {
                document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                window.location.href = '/admin';
              }}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Leads</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                <p className="text-xs text-gray-500">Failed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Grade Distribution</h2>
          <div className="flex gap-3">
            {[
              { grade: 'A', count: stats.gradeA, color: 'green' },
              { grade: 'B', count: stats.gradeB, color: 'blue' },
              { grade: 'C', count: stats.gradeC, color: 'amber' },
              { grade: 'D/F', count: stats.gradeDF, color: 'red' },
            ].map(({ grade, count, color }) => (
              <div key={grade} className="flex-1 text-center">
                <div className={`h-20 bg-${color}-50 rounded-xl flex items-end justify-center pb-2 relative overflow-hidden`}>
                  <div 
                    className={`absolute bottom-0 left-0 right-0 bg-${color}-500 transition-all duration-500`}
                    style={{ height: `${stats.total ? Math.max((count / stats.total) * 100, count > 0 ? 10 : 0) : 0}%` }}
                  />
                  <span className={`relative z-10 font-bold text-${color}-700 text-lg`}>{count}</span>
                </div>
                <p className="mt-2 font-semibold text-gray-700 text-sm">{grade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">All Leads</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-500 text-sm">Loading...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500">No leads yet</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Lead</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Carrier</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Grade</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-900">{getCustomerName(sub)}</p>
                          {sub.customer_email && (
                            <p className="text-xs text-gray-500 mt-0.5">{sub.customer_email}</p>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-gray-700">
                            {sub.insurance_provider_friendly || sub.insurance_provider || '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`w-8 h-8 rounded-full text-sm font-bold inline-flex items-center justify-center ${getGradeColor(sub.overallGrade)}`}>
                            {sub.overallGrade || '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-500">
                          {formatDate(sub.created_at)}
                        </td>
                        <td className="px-5 py-4">
                          <Link
                            href={`/admin/dashboard/${sub.id}`}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                          >
                            View
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {submissions.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/admin/dashboard/${sub.id}`}
                    className="block p-4 hover:bg-gray-50/50 active:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900 truncate">{getCustomerName(sub)}</p>
                          <span className={`w-7 h-7 rounded-full text-xs font-bold inline-flex items-center justify-center flex-shrink-0 ${getGradeColor(sub.overallGrade)}`}>
                            {sub.overallGrade || '—'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {sub.insurance_provider_friendly || sub.insurance_provider || 'Unknown carrier'}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                            {sub.status}
                          </span>
                          <span className="text-xs text-gray-400">{formatDate(sub.created_at)}</span>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
