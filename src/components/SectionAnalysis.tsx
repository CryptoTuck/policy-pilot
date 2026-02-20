'use client';

import { useState } from 'react';
import { trackCtaClicked } from '@/lib/analytics';
import { fbTrackContact } from '@/lib/facebook-pixel';

interface SectionAnalysisProps {
  title: string;
  score: number;
  maxScore: number;
  analysis: string;
}

function getScoreGradient(score: number, maxScore: number): string {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  if (pct >= 90) return 'from-emerald-500 to-green-500';
  if (pct >= 80) return 'from-blue-400 to-blue-500';
  if (pct >= 70) return 'from-yellow-400 to-amber-400';
  if (pct >= 60) return 'from-orange-500 to-red-400';
  return 'from-red-700 to-red-800';
}

function getScoreTone(score: number, maxScore: number): string {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  if (pct >= 80) return 'stroke-emerald-400';
  if (pct >= 60) return 'stroke-amber-400';
  return 'stroke-red-400';
}

function getCtaText(score: number, maxScore: number, title: string): string {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const type = title.toLowerCase();

  if (pct < 40) {
    if (type.includes('auto')) return 'Talk to an Agent About Your Auto Coverage';
    if (type.includes('home')) return 'Talk to an Agent About Your Home Coverage';
    if (type.includes('renter')) return 'Talk to an Agent About Your Renters Coverage';
    return 'Talk to an Agent About Your Coverage';
  }
  if (pct < 60) {
    if (type.includes('auto')) return 'Discuss Your Auto Options With an Agent';
    if (type.includes('home')) return 'Discuss Your Home Options With an Agent';
    if (type.includes('renter')) return 'Discuss Your Renters Options With an Agent';
    return 'Discuss Your Options With an Agent';
  }
  if (pct < 80) {
    if (type.includes('auto')) return 'Talk to an Agent to Improve Your Auto Coverage';
    if (type.includes('home')) return 'Talk to an Agent to Improve Your Home Coverage';
    if (type.includes('renter')) return 'Talk to an Agent to Improve Your Renters Coverage';
    return 'Talk to an Agent to Improve Your Coverage';
  }
  return 'Talk to an Agent to Review Your Coverage';
}

export function SectionAnalysis({ title, score, maxScore, analysis }: SectionAnalysisProps) {
  const gradient = getScoreGradient(score, maxScore);
  const ringTone = getScoreTone(score, maxScore);
  const ctaText = getCtaText(score, maxScore, title);
  const [showModal, setShowModal] = useState(false);
  const progress = maxScore > 0 ? Math.min(100, Math.round((score / maxScore) * 100)) : 0;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-5 sm:p-6 my-4 sm:my-6`}>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <svg width={56} height={56} className="rotate-[-90deg]">
              <circle cx={28} cy={28} r={24} stroke="rgba(255,255,255,0.25)" strokeWidth={5} fill="none" />
              <circle
                cx={28}
                cy={28}
                r={24}
                className={ringTone}
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={(2 * Math.PI * 24) - ((progress / 100) * (2 * Math.PI * 24))}
                fill="none"
              />
            </svg>
            <span className="absolute text-sm font-semibold text-white">{score}</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base">Section Analysis</h3>
            <h4 className="text-white font-semibold text-sm sm:text-base mt-1">
              {title} · {score}/{maxScore}
            </h4>
          </div>
        </div>
        <p className="text-white/90 text-sm mt-3 leading-relaxed">{analysis}</p>
        <div className="mt-4 h-2 rounded-full bg-white/20">
          <div
            className="h-2 rounded-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex mt-3 mb-2">
        <button
          onClick={() => {
            setShowModal(true);
            trackCtaClicked('section_analysis');
            fbTrackContact();
          }}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-2.5 px-4 sm:px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {ctaText}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re All Set!</h3>
              <p className="text-gray-600 mb-6">
                A licensed insurance agent will be in contact with you shortly to discuss better coverage options.
              </p>

              <button
                onClick={handleCloseModal}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
