'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = useMemo(
    () => [
      {
        q: 'Is PolicyPilot really free?',
        a: 'Yes. Your score and analysis are always free. Optional partner quotes only if you want them.',
      },
      {
        q: 'How do you access my insurance info?',
        a: 'We use Canopy Connect, a secure platform connecting to 300+ carriers. We never see your login.',
      },
      {
        q: 'What types of policies do you analyze?',
        a: 'Home, auto, and renters at the moment. Coming soon: life, umbrella, and commercial policies.',
      },
      {
        q: 'Will I get spam calls?',
        a: 'Absolutely not. We will never call you or share your information with agents unless you explicitly request a licensed agent to help you find a new policy. Your data stays private.',
      },
      {
        q: 'How accurate is the AI analysis?',
        a: 'Our AI has been trained by licensed agents using thousands of policies and uses carrier-standard coverage benchmarks. While no automated analysis replaces professional advice, our scores consistently identify real coverage gaps and savings opportunities.',
      },
      {
        q: 'Can I share my report with my agent?',
        a: 'Yes. Download a PDF and share it with anyone—current agent, new agent, or yourself.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 pt-4 sm:pt-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="PolicyPilot" className="h-9 w-9 rounded-xl" />
            <span className="text-lg font-semibold tracking-tight text-white">PolicyPilot</span>
          </div>
          <div className="hidden items-center gap-8 text-[15px] font-semibold text-slate-100 md:flex">
            <a href="#how" className="transition-colors hover:text-white">
              How it works
            </a>
            <a href="#score" className="transition-colors hover:text-white">
              The score
            </a>
            <a href="#security" className="transition-colors hover:text-white">
              Security
            </a>
            <a href="#faq" className="transition-colors hover:text-white">
              FAQ
            </a>
          </div>
          <Link
            href="/get-policy"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get My Free Score
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 pt-36 sm:pt-40" style={{ backgroundImage: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 30%, #475569 60%, #94a3b8 80%, #f8fafc 100%)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
          <div className="absolute -right-24 top-24 h-[320px] w-[320px] rounded-full bg-cyan-500/15 blur-[120px]" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Free • 2 minutes • No credit card
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white leading-[1.1] sm:text-5xl lg:text-6xl">
              Know your insurance.{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Finally.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8.5C50 2 150 2 198 8.5" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#3B82F6"/>
                      <stop offset="1" stopColor="#06B6D4"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300 sm:text-xl">
              Connect your policy to see your current coverage and get a clear, unbiased score. Understand
              your existing coverage, what&apos;s missing, and whether you&apos;re overpaying&mdash;instantly.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/get-policy"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                See My PolicyPilot Score &rarr;
              </Link>
              <div className="text-sm text-slate-400">
                Free &bull; 2 minutes &bull; No credit card
              </div>
            </div>

            <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-sm text-slate-300 shadow-lg backdrop-blur sm:grid-cols-3">
              <div>
                <div className="text-lg font-semibold text-white">10,000+</div>
                Policies analyzed
              </div>
              <div>
                <div className="text-lg font-semibold text-white">4.9★</div>
                Average user rating
              </div>
              <div>
                <div className="text-lg font-semibold text-white">300+</div>
                Carriers supported via Canopy
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-lg">
              {/* Glow behind image */}
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-3xl" />
              <img
                src="/hero-image.png"
                alt="PolicyPilot Score card showing an 82 out of 100 score with coverage grade, gaps detected, and price check"
                className="relative w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

      </section>

      {/* How It Works */}
      <section id="how" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">How It Works</h2>
            <p className="mt-2 text-lg text-slate-600">Three Simple Steps. Two Minutes. Total Clarity.</p>
          </div>

          <div className="relative mt-16">
            {/* Connecting line - desktop only */}
            <div className="absolute top-10 left-0 right-0 hidden lg:block">
              <div className="mx-auto max-w-3xl px-24">
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200" />
              </div>
            </div>

            <div className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  title: 'Connect Your Insurance',
                  desc: 'Securely link your existing policy through Canopy Connect. We never see your login credentials.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  ),
                },
                {
                  title: 'Let AI Analyze It',
                  desc: 'Our AI checks every line against industry benchmarks to find gaps, overlaps, and pricing issues.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                },
                {
                  title: 'Get Your PolicyPilot Score',
                  desc: 'Receive a clear grade, actionable insights, and a shareable PDF report in minutes.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((step, index) => (
                <div key={step.title} className="flex flex-col items-center text-center">
                  {/* Step number circle */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-blue-500/10 ring-4 ring-slate-50">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Report Comparison */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Before & After
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">See what PolicyPilot reveals.</h2>
            <p className="mt-2 text-lg text-slate-600">
              Most people think their coverage is fine — until they see the gaps.
            </p>
          </div>

          <div className="relative mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-2">
            {/* BEFORE Report */}
            <div>
              <div className="mb-4 text-center">
                <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                  Before PolicyPilot
                  <svg className="h-3.5 w-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </p>
                <p className="text-xs text-slate-500">Hidden gaps, unknown risks</p>
              </div>
            <div className="rounded-2xl bg-[#F6F6FA] p-4 shadow-lg">
              {/* Score Header - Red */}
              <div className="rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 p-5 sm:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/80">Overall Score</p>
                    <p className="text-3xl sm:text-4xl font-bold mt-1">54%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Home', score: '61%' },
                      { label: 'Auto', score: '47%' },
                    ].map(({ label, score }) => (
                      <div key={label} className="rounded-lg bg-white/20 border border-white/20 px-3 py-1.5 text-center">
                        <div className="text-base font-bold">{score}</div>
                        <div className="text-[10px] uppercase tracking-wide text-white/80">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coverage Table - Desktop */}
              <div className="mt-3 hidden sm:block rounded-xl bg-white shadow-sm overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#1e293b] text-white text-[11px] font-medium uppercase tracking-wide">
                      <th className="text-left py-2 px-3">Coverage</th>
                      <th className="text-left py-2 px-3">Limit</th>
                      <th className="text-left py-2 px-3">Score</th>
                      <th className="text-left py-2 px-3">What It Means</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Bodily Injury', limit: '$25k/$50k', score: '1/5', severity: 'red' as const, explanation: 'State minimum only. Won\'t cover most serious injuries.' },
                      { name: 'Property Damage', limit: '$15,000', score: '1/5', severity: 'red' as const, explanation: 'Below recommended levels for modern vehicle damage.' },
                      { name: 'Personal Liability', limit: '$100,000', score: '2/5', severity: 'red' as const, explanation: 'May not fully cover a serious lawsuit against you.' },
                      { name: 'Collision Deductible', limit: '$1,000', score: '3/5', severity: 'amber' as const, explanation: 'Higher than ideal for your vehicle\'s current value.' },
                      { name: 'Water Backup', limit: 'None', score: '--', severity: 'red' as const, explanation: 'Not included. Leaves you exposed to drain backups.' },
                    ].map((row, i) => (
                      <tr
                        key={row.name}
                        className={`border-b border-gray-100 ${
                          row.severity === 'red' ? 'bg-red-50 border-l-4 border-l-red-300' :
                          row.severity === 'amber' ? 'bg-amber-50 border-l-4 border-l-amber-300' :
                          i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="py-3 px-3 text-xs whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {row.severity === 'red' && (
                              <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className={`font-medium ${row.severity === 'red' ? 'text-red-700' : row.severity === 'amber' ? 'text-amber-700' : 'text-gray-900'}`}>{row.name}</span>
                          </div>
                        </td>
                        <td className={`py-3 px-3 text-xs ${row.severity === 'red' ? 'text-red-600' : row.severity === 'amber' ? 'text-amber-600' : 'text-gray-600'}`}>{row.limit}</td>
                        <td className="py-3 px-3">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            row.score === '--' ? 'bg-gray-100 text-gray-500' :
                            row.severity === 'red' ? 'bg-red-100 text-red-800' :
                            row.severity === 'amber' ? 'bg-amber-100 text-amber-800' :
                            'bg-green-100 text-green-800'
                          }`}>{row.score}</span>
                        </td>
                        <td className={`py-3 px-3 text-xs ${row.severity === 'red' ? 'text-red-700' : row.severity === 'amber' ? 'text-amber-700' : 'text-gray-600'}`}>
                          {row.explanation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coverage Cards - Mobile */}
              <div className="mt-3 sm:hidden space-y-3">
                {[
                  { name: 'Bodily Injury', limit: '$25k/$50k', score: '1/5', severity: 'red' as const, explanation: 'State minimum only. Won\'t cover most serious injuries.' },
                  { name: 'Property Damage', limit: '$15,000', score: '1/5', severity: 'red' as const, explanation: 'Below recommended levels for modern vehicle damage.' },
                  { name: 'Personal Liability', limit: '$100,000', score: '2/5', severity: 'red' as const, explanation: 'May not fully cover a serious lawsuit against you.' },
                  { name: 'Collision Deductible', limit: '$1,000', score: '3/5', severity: 'amber' as const, explanation: 'Higher than ideal for your vehicle\'s current value.' },
                  { name: 'Water Backup', limit: 'None', score: '--', severity: 'red' as const, explanation: 'Not included. Leaves you exposed to drain backups.' },
                ].map((row) => (
                  <div
                    key={row.name}
                    className={`rounded-lg p-4 ${
                      row.severity === 'red' ? 'bg-red-50 border-2 border-red-200' :
                      row.severity === 'amber' ? 'bg-amber-50 border-2 border-amber-200' :
                      'bg-white border border-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {row.severity === 'red' && (
                          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                        <h4 className={`font-semibold text-sm ${row.severity === 'red' ? 'text-red-700' : row.severity === 'amber' ? 'text-amber-700' : 'text-gray-900'}`}>
                          {row.name}
                        </h4>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${
                        row.score === '--' ? 'bg-gray-400' :
                        row.severity === 'red' ? 'bg-red-500' :
                        row.severity === 'amber' ? 'bg-amber-500' :
                        'bg-gradient-to-r from-blue-500 to-cyan-400'
                      }`}>{row.score}</span>
                    </div>
                    <div className={`font-medium text-sm mb-2 ${row.severity === 'red' ? 'text-red-600' : row.severity === 'amber' ? 'text-amber-600' : 'text-blue-600'}`}>
                      {row.limit}
                    </div>
                    <p className={`text-sm leading-relaxed ${row.severity === 'red' ? 'text-red-700' : row.severity === 'amber' ? 'text-amber-700' : 'text-gray-600'}`}>
                      {row.explanation}
                    </p>
                  </div>
                ))}
              </div>

              {/* Section Analysis */}
              <div className="mt-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wide">Section Analysis</p>
                <p className="mt-1 text-sm font-bold">4 critical gaps found</p>
                <p className="mt-1 text-xs text-white/90">Liability below carrier minimums, missing endorsements, and UM/UIM mismatch.</p>
              </div>
            </div>
            </div>

            {/* AFTER Report */}
            <div>
              <div className="mb-4 text-center">
                <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                  After PolicyPilot
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </p>
                <p className="text-xs text-slate-500">Gaps fixed, fully protected</p>
              </div>
            <div className="rounded-2xl bg-[#F6F6FA] p-4 shadow-lg">
              {/* Score Header - Green */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-green-600 p-5 sm:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/80">Overall Score</p>
                    <p className="text-3xl sm:text-4xl font-bold mt-1">91%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Home', score: '93%' },
                      { label: 'Auto', score: '89%' },
                    ].map(({ label, score }) => (
                      <div key={label} className="rounded-lg bg-white/20 border border-white/20 px-3 py-1.5 text-center">
                        <div className="text-base font-bold">{score}</div>
                        <div className="text-[10px] uppercase tracking-wide text-white/80">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coverage Table - Desktop */}
              <div className="mt-3 hidden sm:block rounded-xl bg-white shadow-sm overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#1e293b] text-white text-[11px] font-medium uppercase tracking-wide">
                      <th className="text-left py-2 px-3">Coverage</th>
                      <th className="text-left py-2 px-3">Limit</th>
                      <th className="text-left py-2 px-3">Score</th>
                      <th className="text-left py-2 px-3">What It Means</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Bodily Injury', limit: '$250k/$500k', score: '5/5', explanation: 'Well above state minimums. Strong injury protection.' },
                      { name: 'Property Damage', limit: '$100,000', score: '5/5', explanation: 'Covers most accident damage scenarios comfortably.' },
                      { name: 'Personal Liability', limit: '$300,000', score: '5/5', explanation: 'Good protection for your assets in a lawsuit.' },
                      { name: 'Collision Deductible', limit: '$500', score: '5/5', explanation: 'Appropriate and affordable for your vehicle value.' },
                      { name: 'Water Backup', limit: '$10,000', score: '5/5', explanation: 'Covers sewer and drain backup water damage.' },
                    ].map((row, i) => (
                      <tr
                        key={row.name}
                        className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="py-3 px-3 text-xs font-medium text-gray-900 whitespace-nowrap">{row.name}</td>
                        <td className="py-3 px-3 text-xs text-gray-600">{row.limit}</td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-800">{row.score}</span>
                        </td>
                        <td className="py-3 px-3 text-xs text-gray-600">{row.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coverage Cards - Mobile */}
              <div className="mt-3 sm:hidden space-y-3">
                {[
                  { name: 'Bodily Injury', limit: '$250k/$500k', score: '5/5', explanation: 'Well above state minimums. Strong injury protection.' },
                  { name: 'Property Damage', limit: '$100,000', score: '5/5', explanation: 'Covers most accident damage scenarios comfortably.' },
                  { name: 'Personal Liability', limit: '$300,000', score: '5/5', explanation: 'Good protection for your assets in a lawsuit.' },
                  { name: 'Collision Deductible', limit: '$500', score: '5/5', explanation: 'Appropriate and affordable for your vehicle value.' },
                  { name: 'Water Backup', limit: '$10,000', score: '5/5', explanation: 'Covers sewer and drain backup water damage.' },
                ].map((row, i) => (
                  <div
                    key={row.name}
                    className={`rounded-lg p-4 ${i % 2 === 0 ? 'bg-white' : 'bg-white'} border border-gray-100`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm text-gray-900">{row.name}</h4>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full text-white bg-gradient-to-r from-blue-500 to-cyan-400">{row.score}</span>
                    </div>
                    <div className="font-medium text-sm mb-2 text-blue-600">{row.limit}</div>
                    <p className="text-sm leading-relaxed text-gray-600">{row.explanation}</p>
                  </div>
                ))}
              </div>

              {/* Section Analysis */}
              <div className="mt-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wide">Section Analysis</p>
                <p className="mt-1 text-sm font-bold">All gaps resolved</p>
                <p className="mt-1 text-xs text-white/90">Coverage aligned with carrier standards. Liability, UM/UIM, and endorsements optimized.</p>
              </div>
            </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/get-policy"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              See Your Score
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-4 text-sm text-slate-500">Free forever. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* What You Get / Score */}
      <section id="score" className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="relative">
            {/* TODO: Replace with custom score/report mockup */}
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-blue-600/10 to-cyan-400/10 blur-2xl" />
            <div className="relative rounded-[28px] border border-slate-200/80 bg-slate-900 p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Sample Policy Report</div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">PDF ready</span>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Coverage Grade</div>
                  <div className="mt-2 text-3xl font-semibold">A-</div>
                  <p className="mt-2 text-sm text-slate-300">Solid protection with two moderate gaps.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Gaps Found</div>
                    <div className="mt-2 text-xl font-semibold">Flood • Sewer</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Price Check</div>
                    <div className="mt-2 text-xl font-semibold">$420/yr high</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/40 to-cyan-500/40 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-100">Recommendations</div>
                  <p className="mt-2 text-sm text-slate-100">
                    Increase deductible to $1,500 and add flood rider. Estimated savings: $310/year.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              The PolicyPilot Score
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              A single score that explains your entire policy.
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              We distill complex coverage into a clear grade and practical guidance you can act on today.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                {
                  title: 'Coverage grade (A–F)',
                  desc: 'A simple, objective rating of how protected you really are.',
                },
                {
                  title: 'Gap analysis',
                  desc: 'Flagged exposures that could lead to uncovered losses.',
                },
                {
                  title: 'Price comparison',
                  desc: 'Benchmarks your premium against similar homes and policies.',
                },
                {
                  title: 'Personalized recommendations',
                  desc: 'Actionable steps to improve protection or reduce cost.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section id="security" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Bank-level security, built in.</h2>
            <p className="mt-2 text-lg text-slate-600">
              PolicyPilot is powered by Canopy Connect and designed to meet the highest data privacy standards.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Canopy Connect partnership',
                desc: 'Securely connects to 300+ carriers with industry-leading infrastructure.',
              },
              {
                title: 'We never see your login credentials',
                desc: 'You authenticate directly with your carrier through Canopy Connect.',
              },
              {
                title: 'Your data is never sold',
                desc: 'We only use your information to generate your PolicyPilot Score.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Security</div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {/* TODO: Replace with real security badges */}
            {['SOC 2', '256-bit SSL', 'Data Encryption', 'GDPR Ready'].map((badge) => (
              <span key={badge} className="rounded-full border border-slate-200 bg-white px-4 py-2">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Trusted by homeowners and renters nationwide.</h2>
              <p className="mt-2 max-w-xl text-lg text-slate-600">
                Clear, unbiased insurance insights designed for real people — not policy experts.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm text-slate-600">
              <div className="text-2xl font-semibold text-slate-900">4.9/5</div>
              <div className="mt-1 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg key={index} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Verified users</div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "PolicyPilot made our coverage crystal clear. We dropped overlaps and saved hundreds without losing protection.",
                name: 'Sarah M.',
                title: 'Homeowner, Austin, TX',
              },
              {
                quote:
                  "I finally understand what my renters policy does — and what it doesn’t. The score was spot on.",
                name: 'James K.',
                title: 'Renter, Miami, FL',
              },
              {
                quote:
                  'Our agent appreciated the report and used it immediately. The recommendations were the exact changes we needed.',
                name: 'Michelle R.',
                title: 'Homeowner, Seattle, WA',
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-600">“{testimonial.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    {testimonial.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Questions, answered.</h2>
            <p className="mt-2 text-lg text-slate-600">Everything you need to know before you start.</p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="rounded-2xl border border-slate-100 bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <span className="text-base font-semibold text-slate-900">{faq.q}</span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform ${
                      openFaq === index ? 'rotate-180 bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="px-6 pb-6 text-sm text-slate-600">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + Footer */}
      <section className="relative overflow-hidden bg-slate-900 pt-20 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-16 h-[280px] w-[280px] rounded-full bg-blue-600/30 blur-[120px]" />
          <div className="absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-cyan-500/20 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
            Free analysis in 2 minutes
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Get clarity on your insurance — instantly.
          </h2>
          <p className="mt-3 text-lg text-slate-300">
            Join thousands of homeowners and renters using PolicyPilot to uncover coverage gaps and savings.
          </p>
          <div className="mt-10">
            <Link
              href="/get-policy"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Get My Free Score
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
            <span>Free forever</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
            <span>No credit card</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
            <span>Private & secure</span>
          </div>
        </div>

        {/* Footer */}
        <div className="relative mt-20">
          <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-3 sm:items-center">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="PolicyPilot" className="h-9 w-9 rounded-xl" />
                <span className="text-sm font-semibold text-white">PolicyPilot</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms
                </Link>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </div>
              <div className="flex items-center justify-end gap-3 text-slate-500">
                {['X', 'LinkedIn', 'Facebook'].map((social) => (
                  <a key={social} href="#" className="text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-white">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        section {
          animation: fade-up 0.8s ease both;
        }
        @media (prefers-reduced-motion: reduce) {
          section {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
