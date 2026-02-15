'use client';

import { useState, useEffect } from 'react';
import {
  trackCtaClicked,
  trackEmailReportRequested,
  trackEmailReportSent,
  trackEmailReportFailed,
} from '@/lib/analytics';

interface StickyCtaButtonProps {
  reportId?: string;
  customerEmail?: string | null;
}

export function StickyCtaButton({ reportId, customerEmail }: StickyCtaButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendEmail = async () => {
    if (!customerEmail || !reportId) return;

    trackEmailReportRequested('sticky_modal');
    setEmailStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/email/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, email: customerEmail }),
      });

      if (res.ok) {
        setEmailStatus('sent');
        trackEmailReportSent('sticky_modal');
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to send email');
        setEmailStatus('error');
        trackEmailReportFailed('sticky_modal', data.error);
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setEmailStatus('error');
      trackEmailReportFailed('sticky_modal', 'network_error');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmailStatus('idle');
    setErrorMessage('');
  };

  return (
    <>
      {/* Sticky CTA Button */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 bg-white ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => {
                setShowModal(true);
                trackCtaClicked('sticky_bar');
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Find Me a Better Policy
            </button>
          </div>
        </div>
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
              {/* Agent confirmation */}
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re All Set!</h3>
              <p className="text-gray-600 mb-6">
                A licensed insurance agent will be in contact with you shortly to discuss better coverage options.
              </p>

              {/* Divider */}
              <div className="border-t border-gray-200 my-5" />

              {/* Email report button - only show if we have the customer's email */}
              {customerEmail && reportId && emailStatus === 'idle' && (
                <button
                  onClick={handleSendEmail}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me My Report
                </button>
              )}

              {/* Sending state */}
              {emailStatus === 'sending' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin text-blue-600" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-blue-700 text-sm font-medium">Sending report...</p>
                </div>
              )}

              {/* Email sent confirmation */}
              {emailStatus === 'sent' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700 text-sm font-medium">Report sent to {customerEmail}!</p>
                </div>
              )}

              {/* Error state */}
              {emailStatus === 'error' && (
                <div className="mb-3">
                  <p className="text-red-500 text-xs mb-2">{errorMessage}</p>
                  <button
                    onClick={handleSendEmail}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Try Again
                  </button>
                </div>
              )}

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
