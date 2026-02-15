'use client';

import { useState, useEffect } from 'react';

interface StickyCtaButtonProps {
  reportId?: string;
}

export function StickyCtaButton({ reportId }: StickyCtaButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
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
    if (!email || !reportId) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setEmailStatus('error');
      return;
    }

    setEmailStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/email/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, email }),
      });

      if (res.ok) {
        setEmailStatus('sent');
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to send email');
        setEmailStatus('error');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setEmailStatus('error');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEmailForm(false);
    setEmail('');
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
              onClick={() => setShowModal(true)}
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

              {/* Email report section */}
              {!showEmailForm && emailStatus !== 'sent' && reportId && (
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me My Report
                </button>
              )}

              {/* Email form */}
              {showEmailForm && emailStatus !== 'sent' && (
                <div className="text-left mb-3">
                  <label htmlFor="report-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your email address
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="report-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailStatus === 'error') {
                          setEmailStatus('idle');
                          setErrorMessage('');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendEmail();
                      }}
                      placeholder="you@example.com"
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={emailStatus === 'sending'}
                      autoFocus
                    />
                    <button
                      onClick={handleSendEmail}
                      disabled={emailStatus === 'sending' || !email}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap"
                    >
                      {emailStatus === 'sending' ? (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending
                        </span>
                      ) : 'Send'}
                    </button>
                  </div>
                  {emailStatus === 'error' && (
                    <p className="text-red-500 text-xs mt-1.5">{errorMessage}</p>
                  )}
                </div>
              )}

              {/* Email sent confirmation */}
              {emailStatus === 'sent' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700 text-sm font-medium">Report sent to {email}!</p>
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
