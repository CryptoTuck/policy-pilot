'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = useMemo(
    () => [
      {
        q: 'Is Policy Pilot really free?',
        a: "Yes, 100% free. We make money when you choose to compare quotes through our partner carriers — but that's completely optional. Your Policy Pilot Score and analysis are always free.",
      },
      {
        q: 'How do you access my insurance information?',
        a: 'We use Canopy Connect, a bank-level secure platform that connects to 300+ insurance carriers. You simply log in to your insurance account through their secure portal — we never see your login credentials.',
      },
      {
        q: 'What types of insurance do you analyze?',
        a: "Currently we analyze home, auto, and renters insurance policies. We're adding more coverage types soon, including life, umbrella, and business insurance.",
      },
      {
        q: 'Will I get spam calls after using this?',
        a: 'Absolutely not. We will never call you or share your information with agents unless you explicitly request quotes. Your data stays private.',
      },
      {
        q: 'How accurate is the AI analysis?',
        a: 'Our AI has been trained on thousands of policies and uses industry-standard coverage benchmarks. While no automated analysis replaces professional advice, our scores consistently identify real coverage gaps and savings opportunities.',
      },
      {
        q: 'Can I share my report with my insurance agent?',
        a: "Yes! Your Policy Pilot Score report includes a downloadable PDF that you can share with your current agent, a new agent, or anyone you'd like.",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-600/20">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">PolicyPilot</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#how" className="transition-colors hover:text-slate-900">
              How it works
            </a>
            <a href="#score" className="transition-colors hover:text-slate-900">
              The score
            </a>
            <a href="#security" className="transition-colors hover:text-slate-900">
              Security
            </a>
            <a href="#faq" className="transition-colors hover:text-slate-900">
              FAQ
            </a>
          </div>
          <Link
            href="/get-policy"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Get My Free Score
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-blue-200/40 blur-[140px]" />
          <div className="absolute -right-24 top-24 h-[320px] w-[320px] rounded-full bg-cyan-200/50 blur-[120px]" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Free • 2 minutes • No credit card
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1] sm:text-5xl lg:text-6xl">
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
            <p className="mt-6 max-w-xl text-lg text-slate-600 sm:text-xl">
              PolicyPilot connects to your existing policy and delivers a clear, unbiased score so you know
              exactly what you&apos;re covered for, what you&apos;re missing, and whether you&apos;re overpaying.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/get-policy"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get My Free Score
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                No spam. Your data stays private.
              </div>
            </div>

            <div className="mt-10 grid gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm text-slate-600 shadow-sm backdrop-blur sm:grid-cols-3">
              <div>
                <div className="text-lg font-semibold text-slate-900">10,000+</div>
                Policies analyzed
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">4.9★</div>
                Average user rating
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">300+</div>
                Carriers supported via Canopy
              </div>
            </div>
          </div>

          <div className="relative">
            {/* TODO: Replace with custom hero illustration showing insurance/protection */}
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-blue-600/20 to-cyan-400/20 blur-2xl" />
              <div className="relative rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">PolicyPilot Score</p>
                    <p className="text-sm font-medium text-slate-600">Homeowners • State Farm</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <div className="relative">
                    <svg className="h-36 w-36 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="url(#score-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="264"
                        strokeDashoffset="62"
                      />
                      <defs>
                        <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2563EB" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-semibold text-slate-900">82</span>
                      <span className="text-xs font-medium text-slate-500">out of 100</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="font-medium text-slate-700">Coverage grade</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">B+</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="font-medium text-slate-700">Gaps detected</span>
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">2 items</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="font-medium text-slate-700">Price check</span>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">$310 / yr high</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-6 right-6 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-lg lg:block">
              AI-powered in under 2 minutes
            </div>

            <div className="pointer-events-none absolute -bottom-8 left-6 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-lg lg:block">
              Bank-level security via Canopy Connect
            </div>
          </div>
        </div>

      </section>

      {/* How It Works */}
      <section id="how" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Three steps. Two minutes. Full clarity.</h2>
            <p className="mt-4 text-lg text-slate-600">Connect once and let PolicyPilot do the rest.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Connect your insurance',
                desc: 'Link your existing policy through Canopy Connect. We never see your login credentials.',
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                ),
              },
              {
                title: 'AI reviews your coverage',
                desc: 'We analyze every line against industry benchmarks to find gaps, overlaps, and pricing issues.',
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Get your PolicyPilot Score',
                desc: 'Receive a clear grade, savings insights, and a shareable PDF report in minutes.',
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4.354a4 4 0 110 5.292M15 21H9a2 2 0 01-2-2v-6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {step.icon}
                </div>
                <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step {index + 1}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
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
            <p className="mt-4 text-lg text-slate-600">
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
            <p className="mt-4 text-lg text-slate-600">
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
              <p className="mt-4 max-w-xl text-lg text-slate-600">
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
            <p className="mt-4 text-lg text-slate-600">Everything you need to know before you start.</p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="rounded-2xl border border-slate-100 bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
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

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
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
          <p className="mt-6 text-lg text-slate-300">
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
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold">PolicyPilot</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <Link href="/privacy" className="transition-colors hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-slate-900">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-slate-900">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            {/* TODO: Replace with real social links/icons */}
            {['X', 'LinkedIn', 'Facebook'].map((social) => (
              <a key={social} href="#" className="text-xs font-semibold uppercase tracking-[0.2em]">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

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
