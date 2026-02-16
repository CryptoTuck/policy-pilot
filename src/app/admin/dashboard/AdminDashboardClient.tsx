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

// Obsidian color tokens
const c = {
  base: '#0a0a0b',
  panel: '#0f0f12',
  card: '#14141a',
  border: '#1e1e28',
  text: '#e8e8ed',
  muted: '#8a8a9a',
  accent1: '#0ea5e9',
  accent2: '#06b6d4',
  gradient: 'linear-gradient(90deg, #0ea5e9, #06b6d4)',
  glow: '0 0 0 1px rgba(14,165,233,0.35), 0 0 18px rgba(6,182,212,0.2)',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

function getGradeColor(grade: string | null): { bg: string; text: string } {
  switch (grade) {
    case 'A': return { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' };
    case 'B': return { bg: 'rgba(14,165,233,0.15)', text: '#0ea5e9' };
    case 'C': return { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' };
    case 'D': return { bg: 'rgba(249,115,22,0.15)', text: '#f97316' };
    case 'F': return { bg: 'rgba(239,68,68,0.15)', text: '#ef4444' };
    default: return { bg: 'rgba(138,138,154,0.1)', text: '#8a8a9a' };
  }
}

function getStatusStyle(status: string): { bg: string; text: string } {
  switch (status) {
    case 'completed': return { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' };
    case 'processing': return { bg: 'rgba(14,165,233,0.15)', text: '#0ea5e9' };
    case 'pending': return { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' };
    case 'failed': return { bg: 'rgba(239,68,68,0.15)', text: '#ef4444' };
    default: return { bg: 'rgba(138,138,154,0.1)', text: '#8a8a9a' };
  }
}

export function AdminDashboardClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    total: 0, completed: 0, pending: 0, failed: 0,
    gradeA: 0, gradeB: 0, gradeC: 0, gradeDF: 0,
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

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

  const getCustomerName = (sub: Submission) => {
    if (sub.customer_first_name || sub.customer_last_name)
      return `${sub.customer_first_name || ''} ${sub.customer_last_name || ''}`.trim();
    return sub.customer_email?.split('@')[0] || 'Unknown';
  };

  const StatCard = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="rounded-xl p-4 relative overflow-hidden transition-all" style={{ background: c.card, border: `1px solid ${c.border}` }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = c.glow; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.gradient, opacity: 0.6 }} />
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: c.muted }}>{label}</p>
    </div>
  );

  const gradeBarData = [
    { grade: 'A', count: stats.gradeA, color: '#22c55e' },
    { grade: 'B', count: stats.gradeB, color: '#0ea5e9' },
    { grade: 'C', count: stats.gradeC, color: '#f59e0b' },
    { grade: 'D/F', count: stats.gradeDF, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen" style={{ background: c.base, color: c.text }}>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-lg" style={{ background: 'rgba(15,15,18,0.85)', borderBottom: `1px solid ${c.border}` }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Policy Pilot" className="w-10 h-10 rounded-xl" style={{ boxShadow: '0 0 15px rgba(14,165,233,0.3)' }} />
            <div>
              <h1 className="text-lg font-bold" style={{ background: c.gradient, WebkitBackgroundClip: 'text', color: 'transparent' }}>Policy Pilot</h1>
              <p className="text-xs" style={{ color: c.muted }}>Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => { document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; window.location.href = '/admin'; }}
            className="text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer"
            style={{ color: c.muted }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = c.text; (e.target as HTMLElement).style.background = 'rgba(138,138,154,0.1)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = c.muted; (e.target as HTMLElement).style.background = 'transparent'; }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total Leads" value={stats.total} color={c.accent1} />
          <StatCard label="Completed" value={stats.completed} color={c.success} />
          <StatCard label="Pending" value={stats.pending} color={c.warning} />
          <StatCard label="Failed" value={stats.failed} color={c.error} />
        </div>

        {/* Grade Distribution */}
        <div className="rounded-xl p-5 mb-6 relative overflow-hidden" style={{ background: c.card, border: `1px solid ${c.border}` }}>
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.gradient, opacity: 0.6 }} />
          <h2 className="text-sm font-semibold mb-4" style={{ color: c.text }}>Grade Distribution</h2>
          <div className="flex gap-3">
            {gradeBarData.map(({ grade, count, color }) => (
              <div key={grade} className="flex-1 text-center">
                <div className="h-20 rounded-xl flex items-end justify-center pb-2 relative overflow-hidden" style={{ background: 'rgba(138,138,154,0.05)' }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-500 rounded-b-xl"
                    style={{ height: `${stats.total ? Math.max((count / stats.total) * 100, count > 0 ? 10 : 0) : 0}%`, background: color, opacity: 0.7 }}
                  />
                  <span className="relative z-10 font-bold text-lg" style={{ color }}>{count}</span>
                </div>
                <p className="mt-2 font-semibold text-sm" style={{ color: c.muted }}>{grade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="rounded-xl overflow-hidden relative" style={{ background: c.card, border: `1px solid ${c.border}` }}>
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.gradient, opacity: 0.6 }} />
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${c.border}` }}>
            <h2 className="text-sm font-semibold" style={{ color: c.text }}>All Leads</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-3" style={{ borderColor: c.accent1, borderTopColor: 'transparent' }} />
              <p className="text-sm" style={{ color: c.muted }}>Loading...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center">
              <p style={{ color: c.muted }}>No leads yet</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: c.panel }}>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase" style={{ color: c.muted }}>Lead</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase" style={{ color: c.muted }}>Carrier</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase" style={{ color: c.muted }}>Status</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase" style={{ color: c.muted }}>Grade</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase" style={{ color: c.muted }}>Date</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => {
                      const gradeStyle = getGradeColor(sub.overallGrade);
                      const statusStyle = getStatusStyle(sub.status);
                      return (
                        <tr key={sub.id} className="transition-colors" style={{ borderBottom: `1px solid ${c.border}` }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(138,138,154,0.04)'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                        >
                          <td className="px-5 py-4">
                            <p className="font-medium" style={{ color: c.text }}>{getCustomerName(sub)}</p>
                            {sub.customer_email && <p className="text-xs mt-0.5" style={{ color: c.muted }}>{sub.customer_email}</p>}
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm" style={{ color: c.muted }}>{sub.insurance_provider_friendly || sub.insurance_provider || '—'}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: statusStyle.bg, color: statusStyle.text }}>{sub.status}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="w-8 h-8 rounded-full text-sm font-bold inline-flex items-center justify-center" style={{ background: gradeStyle.bg, color: gradeStyle.text }}>
                              {sub.overallGrade || '—'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm" style={{ color: c.muted }}>{formatDate(sub.created_at)}</td>
                          <td className="px-5 py-4">
                            <Link href={`/admin/dashboard/${sub.id}`} className="font-medium text-sm inline-flex items-center gap-1 transition-colors" style={{ color: c.accent1 }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = c.accent2; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = c.accent1; }}
                            >
                              View
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden">
                {submissions.map((sub) => {
                  const gradeStyle = getGradeColor(sub.overallGrade);
                  const statusStyle = getStatusStyle(sub.status);
                  return (
                    <Link key={sub.id} href={`/admin/dashboard/${sub.id}`} className="block p-4 transition-colors" style={{ borderBottom: `1px solid ${c.border}` }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(138,138,154,0.04)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold truncate" style={{ color: c.text }}>{getCustomerName(sub)}</p>
                            <span className="w-7 h-7 rounded-full text-xs font-bold inline-flex items-center justify-center flex-shrink-0" style={{ background: gradeStyle.bg, color: gradeStyle.text }}>
                              {sub.overallGrade || '—'}
                            </span>
                          </div>
                          <p className="text-sm truncate" style={{ color: c.muted }}>{sub.insurance_provider_friendly || sub.insurance_provider || 'Unknown carrier'}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: statusStyle.bg, color: statusStyle.text }}>{sub.status}</span>
                            <span className="text-xs" style={{ color: c.muted }}>{formatDate(sub.created_at)}</span>
                          </div>
                        </div>
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: c.muted }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
