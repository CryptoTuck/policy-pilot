'use client';

import { useEffect, useState } from 'react';

interface AnalyzingLoaderProps {
  onCancel: () => void;
}

const ANALYSIS_STEPS = [
  { icon: '🔐', text: 'Securely retrieving your policy data...' },
  { icon: '📋', text: 'Reading your coverage details...' },
  { icon: '🏠', text: 'Analyzing home insurance limits...' },
  { icon: '🚗', text: 'Analyzing auto insurance limits...' },
  { icon: '⚖️', text: 'Checking liability alignment...' },
  { icon: '📊', text: 'Calculating portfolio efficiency...' },
  { icon: '🔍', text: 'Identifying coverage gaps...' },
  { icon: '✨', text: 'Generating your personalized report...' },
];

const TIPS = [
  'Did you know? Bundling home and auto can save 10-25% on premiums.',
  'Tip: UM/UIM coverage should match your liability limits for best protection.',
  'Fun fact: Most carriers consider $100k liability outdated by modern standards.',
  'Pro tip: A deductible over 2% of your home value may strain finances in a claim.',
];

export function AnalyzingLoader({ onCancel }: AnalyzingLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [dots, setDots] = useState('');

  // Cycle through steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 3000);

    return () => clearInterval(stepInterval);
  }, []);

  // Cycle through tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length);
    }, 8000);

    return () => clearInterval(tipInterval);
  }, []);

  // Animate dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  const progress = ((currentStep + 1) / ANALYSIS_STEPS.length) * 100;

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center z-10">
      <div className="bg-white shadow-2xl rounded-3xl px-8 py-10 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4 shadow-lg">
            <span className="text-4xl animate-pulse">{ANALYSIS_STEPS[currentStep].icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing Your Policies
          </h2>
          <p className="text-gray-500 text-sm">
            This typically takes 30-60 seconds
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Analyzing</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 min-h-[72px] flex items-center">
          <div className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0">
              <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">
              {ANALYSIS_STEPS[currentStep].text.replace('...', dots.padEnd(3, ' '))}
            </p>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-center gap-1.5 mb-6">
          {ANALYSIS_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-6 bg-blue-500'
                  : idx < currentStep
                  ? 'w-1.5 bg-blue-300'
                  : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Tip Card */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 border border-blue-100">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 text-lg">💡</span>
            <p className="text-sm text-gray-600 leading-relaxed">
              {TIPS[currentTip]}
            </p>
          </div>
        </div>

        {/* Cancel Link */}
        <div className="text-center">
          <button
            onClick={onCancel}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel and start over
          </button>
        </div>
      </div>
    </div>
  );
}
