'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0a0a0b' }}>
      <div className="w-full max-w-md rounded-2xl p-8 relative overflow-hidden" style={{ background: '#14141a', border: '1px solid #1e1e28' }}>
        {/* Top accent border */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)' }} />
        {/* Left accent border */}
        <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: 'linear-gradient(180deg, #0ea5e9, #06b6d4)' }} />

        <div className="text-center mb-8">
          <img src="/logo.png" alt="Policy Pilot" className="w-16 h-16 rounded-2xl mx-auto mb-4 shadow-lg" style={{ boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' }} />
          <h1 className="text-2xl font-bold" style={{ background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Admin Dashboard</h1>
          <p className="mt-1" style={{ color: '#8a8a9a' }}>Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#8a8a9a' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-all"
              style={{ background: '#0a0a0b', border: '1px solid #1e1e28', color: '#e8e8ed' }}
              onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 1px rgba(14,165,233,0.35), 0 0 18px rgba(6,182,212,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#1e1e28'; e.target.style.boxShadow = 'none'; }}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#8a8a9a' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg outline-none transition-all"
              style={{ background: '#0a0a0b', border: '1px solid #1e1e28', color: '#e8e8ed' }}
              onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 1px rgba(14,165,233,0.35), 0 0 18px rgba(6,182,212,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#1e1e28'; e.target.style.boxShadow = 'none'; }}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 text-white font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50"
            style={{ background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', boxShadow: '0 0 18px rgba(6,182,212,0.25)' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.boxShadow = '0 0 0 1px rgba(14,165,233,0.5), 0 0 30px rgba(6,182,212,0.4)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.boxShadow = '0 0 18px rgba(6,182,212,0.25)'; }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
