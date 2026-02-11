'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { DevButton } from '@/components/DevButton';

type CanopyHandler = {
  open: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    CanopyConnect: {
      create: (options: {
        publicAlias: string;
        pullMetaData?: Record<string, string>;
        onSuccess?: () => void;
        onExit?: () => void;
      }) => CanopyHandler;
    };
  }
}

type PollingStatus = 'idle' | 'waiting' | 'error' | 'timeout';

export default function GetPolicyPage() {
  const [sdkReady, setSdkReady] = useState(false);
  const [pollingStatus, setPollingStatus] = useState<PollingStatus>('idle');
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [pollingError, setPollingError] = useState<string | null>(null);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [exitTriggered, setExitTriggered] = useState(false);
  const router = useRouter();
  const handlerRef = useRef<CanopyHandler | null>(null);
  const completedRef = useRef(false);

  const publicAlias = process.env.NEXT_PUBLIC_CANOPY_PUBLIC_ALIAS || 'your-public-alias';
  const isWaiting = pollingStatus === 'waiting';
  const isBlocked = isWaiting || pollingStatus === 'timeout' || pollingStatus === 'error';
  const showOverlay = pollingStatus !== 'idle' && !widgetOpen;

  const loadingMessage = useMemo(() => {
    if (pollingStatus === 'timeout') {
      return "We couldn't retrieve your policy data in time. Try again.";
    }
    if (pollingStatus === 'error') {
      return pollingError || 'Something went wrong. Try again.';
    }
    return 'Gathering your policy data...';
  }, [pollingError, pollingStatus]);

  useEffect(() => {
    return () => {
      handlerRef.current?.destroy();
      handlerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (pollingStatus !== 'waiting' || !sessionToken) {
      return;
    }

    let isActive = true;
    const startMs = Date.now();
    const timeoutMs = 10 * 60 * 1000;

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/webhook/latest?token=${encodeURIComponent(sessionToken)}`
        );

        if (!response.ok) {
          throw new Error('Failed to check report status');
        }

        const payload: { status: 'pending' | 'complete'; reportId?: string } =
          await response.json();

        if (!isActive) {
          return;
        }

        if (payload.status === 'complete' && payload.reportId) {
          router.push(`/report/${payload.reportId}`);
          return;
        }

        if (Date.now() - startMs >= timeoutMs) {
          setPollingStatus('timeout');
        }
      } catch (error) {
        if (!isActive) {
          return;
        }
        setPollingStatus('error');
        setPollingError(error instanceof Error ? error.message : 'Unexpected error');
      }
    };

    poll();

    const intervalId = window.setInterval(poll, 3000);
    const timeoutId = window.setTimeout(() => {
      if (isActive) {
        setPollingStatus('timeout');
      }
    }, timeoutMs);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [exitTriggered, sessionToken, pollingStatus, router]);

  const handleGetPolicy = () => {
    if (!sdkReady || !window.CanopyConnect || !publicAlias) {
      setPollingStatus('error');
      setPollingError('Canopy Connect is still loading. Please try again.');
      return;
    }

    // Generate a unique session token to correlate this user with their webhook report
    const token = crypto.randomUUID();
    setSessionToken(token);
    setPollingError(null);
    setPollingStatus('waiting');
    setExitTriggered(false);
    setWidgetOpen(true);

    if (handlerRef.current) {
      handlerRef.current.destroy();
      handlerRef.current = null;
    }

    completedRef.current = false;

    const canopyHandler = window.CanopyConnect.create({
      publicAlias,
      pullMetaData: { sessionToken: token },
      onSuccess: () => {
        completedRef.current = true;
        setExitTriggered(false);
        setPollingStatus('waiting');
        setPollingError(null);
      },
      onExit: () => {
        setWidgetOpen(false);
        if (completedRef.current) {
          return;
        }
        // User closed without completing. Keep polling briefly in case a webhook still arrives.
        setExitTriggered(true);
        setPollingStatus('waiting');
        setPollingError(null);
      },
    });

    handlerRef.current = canopyHandler;
    canopyHandler.open();
  };

  return (
    <>
      <Script
        src="https://cdn.usecanopy.com/v2/canopy-connect.js"
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
      />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
        {showOverlay && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-sm text-center">
              {pollingStatus === 'waiting' && (
                <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-6" viewBox="0 0 24 24">
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
              )}
              <p className="text-gray-700 text-base sm:text-lg mb-6">{loadingMessage}</p>
              <button
                onClick={() => {
                  setPollingStatus('idle');
                  setPollingError(null);
                  setSessionToken(null);
                  setExitTriggered(false);
                  setWidgetOpen(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4"
              >
                Didn't complete the form? Close and start over
              </button>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] max-w-md w-full p-6 sm:p-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-12"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          {/* Logo and Content */}
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
              POLICY PILOT
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-lg mb-8">
              Let's get your policy
            </p>

            {/* CTA Button */}
            <button
              onClick={handleGetPolicy}
              disabled={!sdkReady || isBlocked}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:from-blue-300 disabled:to-cyan-200 text-white font-semibold rounded-full text-lg transition-all shadow-lg hover:shadow-xl cursor-pointer disabled:cursor-not-allowed"
            >
              {!sdkReady ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                'Get my policy'
              )}
            </button>

            {/* Instructions */}
            <div className="mt-8 text-left w-full space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-gray-700 font-medium">1.</span>
                <span className="text-gray-600">Select "Get my policy"</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-700 font-medium">2.</span>
                <span className="text-gray-600">Select your insurance carrier</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-700 font-medium">3.</span>
                <span className="text-gray-600">Login to your carrier</span>
              </div>
            </div>

            {/* Dev mode test button */}
            <DevButton />
          </div>
        </div>
      </div>
    </>
  );
}
