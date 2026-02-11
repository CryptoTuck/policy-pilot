'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is Policy Pilot really free?",
      a: "Yes, 100% free. We make money when you choose to compare quotes through our partner carriers — but that's completely optional. Your Policy Pilot Score and analysis are always free."
    },
    {
      q: "How do you access my insurance information?",
      a: "We use Canopy Connect, a bank-level secure platform that connects to 300+ insurance carriers. You simply log in to your insurance account through their secure portal — we never see your login credentials."
    },
    {
      q: "What types of insurance do you analyze?",
      a: "Currently we analyze home, auto, and renters insurance policies. We're adding more coverage types soon, including life, umbrella, and business insurance."
    },
    {
      q: "Will I get spam calls after using this?",
      a: "Absolutely not. We will never call you or share your information with agents unless you explicitly request quotes. Your data stays private."
    },
    {
      q: "How accurate is the AI analysis?",
      a: "Our AI has been trained on thousands of policies and uses industry-standard coverage benchmarks. While no automated analysis replaces professional advice, our scores consistently identify real coverage gaps and savings opportunities."
    },
    {
      q: "Can I share my report with my insurance agent?",
      a: "Yes! Your Policy Pilot Score report includes a downloadable PDF that you can share with your current agent, a new agent, or anyone you'd like."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="font-bold text-xl text-slate-900">Policy Pilot</span>
            </div>
            <Link
              href="/get-policy"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Get My Free Score
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/15 to-blue-300/15 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-blue-700">Free • No credit card • 2 minutes</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
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
              
              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0">
                Get your <strong className="text-slate-900">Policy Pilot Score</strong> — an AI-powered grade that shows exactly what your insurance covers, what it doesn't, and if you're paying too much.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/get-policy"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-lg rounded-full hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get My Free Score
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <div className="flex items-center justify-center gap-2 text-slate-500">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">No spam, ever</span>
                </div>
              </div>
            </div>
            
            {/* Right - Score card mockup */}
            <div className="relative lg:pl-8">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 sm:-left-8 w-20 h-20 bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center animate-float">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">✓</div>
                    <div className="text-[10px] font-medium text-slate-500">Covered</div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-right-8 w-24 h-24 bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center animate-float-delayed">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-500">3</div>
                    <div className="text-[10px] font-medium text-slate-500">Gaps Found</div>
                  </div>
                </div>
                
                {/* Main card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-6 sm:p-8 border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Your Policy Pilot Score</p>
                      <p className="text-xs text-slate-400">Home Insurance • State Farm</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Score circle */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="8"/>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#score-gradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="53"/>
                        <defs>
                          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6"/>
                            <stop offset="100%" stopColor="#06B6D4"/>
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-slate-900">78</span>
                        <span className="text-sm font-medium text-slate-500">out of 100</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-green-600">Good</div>
                      <div className="text-[10px] text-green-600/70">Liability</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-amber-600">Check</div>
                      <div className="text-[10px] text-amber-600/70">Deductible</div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-red-600">Gap</div>
                      <div className="text-[10px] text-red-600/70">Flood</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Diagonal */}
      <section className="relative py-20 sm:py-28 bg-slate-900 overflow-hidden">
        {/* Diagonal top */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-slate-50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 100%)' }} />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              <span className="text-red-400">99%</span> of people don't know what their insurance actually covers
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-slate-400">
              And it costs them — one way or another.
            </p>
          </div>
          
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Over-insured */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Over-Insured</h3>
                <p className="text-slate-400 mb-4">
                  Paying for coverage you don't need. Duplicate policies. Unnecessarily low deductibles eating your premium.
                </p>
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <span className="text-2xl">$500+</span>
                  <span className="text-sm text-slate-500">/year wasted on average</span>
                </div>
              </div>
            </div>
            
            {/* Under-insured */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Under-Insured</h3>
                <p className="text-slate-400 mb-4">
                  One claim away from financial disaster. Coverage gaps you didn't know existed. A false sense of security.
                </p>
                <div className="flex items-center gap-2 text-red-400 font-semibold">
                  <span className="text-2xl">$50K+</span>
                  <span className="text-sm text-slate-500">average uncovered loss</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-lg">
              Your policy is 20+ pages of legal jargon. <span className="text-white font-medium">We translate it in 2 minutes.</span>
            </p>
          </div>
        </div>
        
        {/* Diagonal bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 0%, 100% 100%, 0 100%)' }} />
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Three steps. Two minutes. <span className="text-blue-500">Zero confusion.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              No uploads. No forms. No phone calls.
            </p>
          </div>
          
          <div className="relative">
            {/* Connection line - desktop */}
            <div className="hidden lg:block absolute top-1/2 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 -translate-y-1/2" />
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-4">
                    <span className="w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">1</span>
                    <span className="text-sm font-medium text-blue-700">Connect</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Link your insurance</h3>
                  <p className="text-slate-600">
                    Securely connect to your insurance account through Canopy Connect. Works with 300+ carriers. Takes 30 seconds.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative md:mt-8">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 rounded-full mb-4">
                    <span className="w-6 h-6 bg-cyan-500 text-white text-sm font-bold rounded-full flex items-center justify-center">2</span>
                    <span className="text-sm font-medium text-cyan-700">Analyze</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">AI reviews your policy</h3>
                  <p className="text-slate-600">
                    Our AI reads every line of your coverage, compares it to industry benchmarks, and identifies gaps and waste.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-4">
                    <span className="w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">3</span>
                    <span className="text-sm font-medium text-blue-700">Understand</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Get your score + report</h3>
                  <p className="text-slate-600">
                    Receive your Policy Pilot Score, a plain-English breakdown of your coverage, and actionable recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - visual */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-amber-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">78</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Policy Pilot Score</div>
                      <div className="text-slate-400 text-sm">Good, but room for improvement</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-amber-400 font-semibold">Slightly Over-Insured</div>
                      <div className="text-slate-400 text-sm">~$340/year in potential savings</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-red-400 font-semibold">2 Coverage Gaps Found</div>
                      <div className="text-slate-400 text-sm">Flood, Equipment Breakdown</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">PDF Report Ready</div>
                      <div className="text-slate-400 text-sm">Download & share with anyone</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right - content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Everything you need to <span className="text-blue-500">understand your insurance</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                No insurance degree required. We translate the jargon so you can make informed decisions.
              </p>
              
              <div className="mt-8 space-y-6">
                {[
                  { icon: "📊", title: "Policy Pilot Score (0-100)", desc: "One number that tells you how well-protected you are" },
                  { icon: "⚖️", title: "Over/Under Assessment", desc: "Know if you're paying too much — or risking too much" },
                  { icon: "🚨", title: "Coverage Gaps Flagged", desc: "Specific risks you're exposed to that you didn't know about" },
                  { icon: "📝", title: "Plain English Explanations", desc: "Every finding explained like you're talking to a friend" },
                  { icon: "📄", title: "Downloadable PDF Report", desc: "Share with your agent, spouse, or financial advisor" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Your data is <span className="text-blue-500">sacred</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We built Policy Pilot on a foundation of trust — because that's what insurance should be about.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Bank-Level Encryption",
                desc: "256-bit SSL encryption protects your data in transit and at rest"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ),
                title: "We Never Sell Your Data",
                desc: "Your information is never sold to third parties. Period."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Powered by Canopy",
                desc: "Secure connections to 300+ carriers via industry-leading Canopy Connect"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: "No Spam, No Calls",
                desc: "We'll never call you or share your info — unless you ask us to"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center text-blue-500 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              People are finally <span className="text-blue-500">understanding</span> their insurance
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I had no idea I was paying for coverage I didn't need. Policy Pilot found $420/year in savings in literally 2 minutes.",
                name: "Sarah M.",
                title: "Homeowner, Austin TX",
                avatar: "SM"
              },
              {
                quote: "Turns out I had zero flood coverage and I'm in a flood zone. Policy Pilot probably saved me from financial ruin.",
                name: "James K.",
                title: "First-time buyer, Miami FL",
                avatar: "JK"
              },
              {
                quote: "Finally, insurance explained in normal words. I shared the PDF with my agent and he was impressed.",
                name: "Michelle R.",
                title: "Renter, Seattle WA",
                avatar: "MR"
              }
            ].map((testimonial, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="relative bg-slate-50 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-700 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-slate-500 text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Questions? <span className="text-blue-500">Answers.</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-slate-300 text-sm font-medium">Takes less than 2 minutes</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Get your Policy Pilot Score
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              — it's free
            </span>
          </h2>
          
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Know what your insurance covers. Know what it doesn't. Stop overpaying or underprotecting. Get clarity in 2 minutes.
          </p>
          
          <div className="mt-10">
            <Link
              href="/get-policy"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-300"
            >
              Get My Free Score
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No spam, ever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="font-semibold text-white">Policy Pilot</span>
            </div>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Policy Pilot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
