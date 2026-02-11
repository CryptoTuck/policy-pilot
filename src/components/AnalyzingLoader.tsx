'use client';

import { useEffect, useState } from 'react';

interface AnalyzingLoaderProps {
  onCancel: () => void;
}

const ANALYSIS_STEPS = [
  'Securely retrieving your policy data',
  'Reading your coverage details',
  'Analyzing your insurance limits',
  'Checking coverage alignment',
  'Identifying potential gaps',
  'Generating your personalized report',
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

  // Cycle through steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 4000);

    return () => clearInterval(stepInterval);
  }, []);

  // Cycle through tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length);
    }, 8000);

    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-md w-full mx-4">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Analyzing Your Policies
          </h2>
          <p className="text-gray-500 text-sm">
            This usually takes less than a minute
          </p>
        </div>

        {/* Current Step */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-gray-700 text-center font-medium">
            {ANALYSIS_STEPS[currentStep]}...
          </p>
        </div>

        {/* Tip Card */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 flex-shrink-0">💡</span>
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
