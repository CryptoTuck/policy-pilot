'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
        consentToken?: string;
        pullMetaData?: Record<string, string>;
        onSuccess?: (data: unknown) => void;
        onExit?: () => void;
      }) => CanopyHandler;
    };
  }
}

export default function GetPolicyPage() {
  const [handler, setHandler] = useState<CanopyHandler | null>(null);
  const [sdkReady, setSdkReady] = useState(false);

  const publicAlias = process.env.NEXT_PUBLIC_CANOPY_PUBLIC_ALIAS || 'your-public-alias';

  useEffect(() => {
    if (!sdkReady || !publicAlias) {
      return;
    }

    const canopyHandler = window.CanopyConnect.create({
      publicAlias,
      pullMetaData: {
        source: 'policy-pilot',
      },
    });

    setHandler(canopyHandler);

    return () => {
      setHandler(null);
      canopyHandler.destroy();
    };
  }, [sdkReady, publicAlias]);

  const handleGetPolicy = () => {
    if (handler) {
      handler.open();
    }
  };

  return (
    <>
      <Script
        src="https://cdn.usecanopy.com/v2/canopy-connect.js"
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
      />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
              disabled={!handler}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:from-blue-300 disabled:to-cyan-200 text-white font-semibold rounded-full text-lg transition-all shadow-lg hover:shadow-xl cursor-pointer disabled:cursor-not-allowed"
            >
              {!handler ? (
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
