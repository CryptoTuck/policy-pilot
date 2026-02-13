'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { getCoverageDescription } from '@/lib/coverage-descriptions';

interface CoverageDescriptionContextValue {
  showDescription: (name: string) => void;
}

export const CoverageDescriptionContext = createContext<CoverageDescriptionContextValue | null>(null);

export function CoverageDescriptionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coverageName, setCoverageName] = useState('');

  const showDescription = useCallback((name: string) => {
    setCoverageName(name);
    setIsOpen(true);
  }, []);

  const description = getCoverageDescription(coverageName);

  return (
    <CoverageDescriptionContext.Provider value={{ showDescription }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-3 pr-8">{coverageName}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description || 'No description available for this coverage.'}
            </p>
          </div>
        </div>
      )}
    </CoverageDescriptionContext.Provider>
  );
}

export function useCoverageDescription() {
  const context = useContext(CoverageDescriptionContext);
  if (!context) {
    throw new Error('useCoverageDescription must be used within a CoverageDescriptionProvider');
  }
  return context;
}
