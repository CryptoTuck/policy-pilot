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
        
        // Calculate stats
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
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getCustomerName = (sub: Submission) => {
    if (sub.customer_first_name || sub.customer_last_name) {
      return `${sub.customer_first_name || ''} ${sub.customer_last_name || ''}`.trim();
    }
    return sub.customer_email || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Policy Pilot</h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => {
                document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                window.location.href = '/admin';
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Leads</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Failed</p>
            <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h2>
          <div className="flex gap-4">
            <div className="flex-1 text-center">
              <div className="h-24 bg-green-100 rounded-lg flex items-end justify-center pb-2 relative">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-b-lg transition-all"
                  style={{ height: `${stats.total ? (stats.gradeA / stats.total) * 100 : 0}%` }}
                />
                <span className="relative z-10 font-bold text-green-700">{stats.gradeA}</span>
              </div>
              <p className="mt-2 font-medium text-gray-700">A</p>
            </div>
            <div className="flex-1 text-center">
              <div className="h-24 bg-blue-100 rounded-lg flex items-end justify-center pb-2 relative">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-b-lg transition-all"
                  style={{ height: `${stats.total ? (stats.gradeB / stats.total) * 100 : 0}%` }}
                />
                <span className="relative z-10 font-bold text-blue-700">{stats.gradeB}</span>
              </div>
              <p className="mt-2 font-medium text-gray-700">B</p>
            </div>
            <div className="flex-1 text-center">
              <div className="h-24 bg-amber-100 rounded-lg flex items-end justify-center pb-2 relative">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-amber-500 rounded-b-lg transition-all"
                  style={{ height: `${stats.total ? (stats.gradeC / stats.total) * 100 : 0}%` }}
                />
                <span className="relative z-10 font-bold text-amber-700">{stats.gradeC}</span>
              </div>
              <p className="mt-2 font-medium text-gray-700">C</p>
            </div>
            <div className="flex-1 text-center">
              <div className="h-24 bg-red-100 rounded-lg flex items-end justify-center pb-2 relative">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-red-500 rounded-b-lg transition-all"
                  style={{ height: `${stats.total ? (stats.gradeDF / stats.total) * 100 : 0}%` }}
                />
                <span className="relative z-10 font-bold text-red-700">{stats.gradeDF}</span>
              </div>
              <p className="mt-2 font-medium text-gray-700">D/F</p>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">All Leads</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No leads yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Carrier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{getCustomerName(sub)}</p>
                          {sub.customer_email && (
                            <p className="text-sm text-gray-500">{sub.customer_email}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {sub.insurance_provider_friendly || sub.insurance_provider || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getGradeColor(sub.overallGrade)}`}>
                          {sub.overallGrade || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(sub.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/dashboard/${sub.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
