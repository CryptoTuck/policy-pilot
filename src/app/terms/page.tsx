import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Policy Pilot',
  description: 'Terms of Service for Policy Pilot. Read the terms governing your use of our insurance grading platform.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-100 text-slate-900">
      {/* Top navigation */}
      <nav className="bg-slate-900 pt-4 sm:pt-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="PolicyPilot" className="h-9 w-9 rounded-xl" />
            <span className="text-lg font-semibold tracking-tight text-white">PolicyPilot</span>
          </Link>
          <div className="hidden items-center gap-8 text-[15px] font-semibold text-slate-100 md:flex">
            <Link href="/#how" className="transition-colors hover:text-white">
              How it works
            </Link>
            <Link href="/#score" className="transition-colors hover:text-white">
              The score
            </Link>
            <Link href="/#security" className="transition-colors hover:text-white">
              Security
            </Link>
            <Link href="/#faq" className="transition-colors hover:text-white">
              FAQ
            </Link>
          </div>
          <Link
            href="/report/demo-home"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            See Example Report
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">
          Effective Date: February 14, 2026
        </p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-slate-700">
          {/* Intro */}
          <section>
            <p>
              Welcome to PolicyPilot. These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the PolicyPilot website, platform, and related services (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p className="mt-3">
              By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, do not use PolicyPilot.
            </p>
          </section>

          {/* About PolicyPilot */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">About PolicyPilot</h2>
            <p className="mt-2">
              PolicyPilot is a technology platform that provides educational insights and analysis related to insurance policies based on user-provided information.
            </p>
            <p className="mt-3">PolicyPilot:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Is not an insurance carrier</li>
              <li>Is not a licensed insurance agency</li>
              <li>Does not sell, quote, underwrite, or bind insurance</li>
              <li>Does not provide insurance advice</li>
            </ul>
            <p className="mt-3">
              Any insurance transaction occurs only between you and a licensed insurance professional.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Eligibility</h2>
            <p className="mt-2">
              You must be at least 18 years old and legally capable of entering into a binding agreement to use the Services.
            </p>
            <p className="mt-2">
              By using PolicyPilot, you represent that you meet these requirements.
            </p>
          </section>

          {/* Scope of Services */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Scope of Services</h2>
            <p className="mt-2">PolicyPilot may provide:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Policy summaries and coverage comparisons</li>
              <li>Educational insights about coverage structure</li>
              <li>A PolicyPilot Score or similar analytical output</li>
              <li>General information designed to help users better understand insurance concepts</li>
            </ul>
            <p className="mt-3">
              All outputs are provided for informational purposes only and should not be relied upon as insurance advice or recommendations.
            </p>
          </section>

          {/* No Insurance Advice or Recommendations */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">No Insurance Advice or Recommendations</h2>
            <p className="mt-2">
              PolicyPilot does not recommend specific carriers, policies, or coverage limits, determine the suitability of coverage, or replace consultation with a licensed insurance professional.
            </p>
            <p className="mt-2">
              Any decisions you make based on information provided by PolicyPilot are made at your own discretion and risk.
            </p>
          </section>

          {/* Not Insurance Advice Disclaimer */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Not Insurance Advice Disclaimer</h2>
            <p className="mt-2 text-sm text-slate-500">Effective Date: February 14, 2026</p>
            <p className="mt-2">
              PolicyPilot provides educational information and general insights related to insurance coverage based on the information you provide.
            </p>
            <p className="mt-3">PolicyPilot does not:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Provide insurance advice</li>
              <li>Recommend specific policies, carriers, or coverage limits</li>
              <li>Quote, sell, underwrite, or bind insurance</li>
              <li>Act as a licensed insurance agent or carrier</li>
            </ul>
            <p className="mt-3">
              All content, scores, summaries, and insights provided by PolicyPilot are for informational and educational purposes only.
            </p>
            <p className="mt-2">
              Insurance needs vary by individual, property, and circumstance. Coverage decisions should always be made in consultation with a licensed insurance professional.
            </p>
            <p className="mt-2">
              Any decisions you make based on information from PolicyPilot are made at your own discretion and risk.
            </p>
          </section>

          {/* Consent & Authorization Disclosure */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Consent &amp; Authorization Disclosure</h2>
            <p className="mt-2 text-sm text-slate-500">Effective Date: February 14, 2026</p>
            <p className="mt-2">
              PolicyPilot retrieves insurance policy information only with your explicit authorization.
            </p>
            <p className="mt-2">
              By choosing to connect your insurance account or upload policy information, you authorize PolicyPilot to access and retrieve your insurance data through secure third-party services, including Canopy Connect, for the purpose of providing educational analysis and insights.
            </p>
            <p className="mt-3">This authorization allows PolicyPilot to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Retrieve your existing insurance policy information</li>
              <li>Analyze coverage details and structure</li>
              <li>Generate summaries, scores, or educational insights</li>
            </ul>
            <p className="mt-3">Your data access is:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Permission-based</li>
              <li>Limited in scope</li>
              <li>Revocable at any time</li>
            </ul>
            <p className="mt-3">
              PolicyPilot does not access your insurance information without your consent and does not store login credentials used to retrieve policy data.
            </p>
            <p className="mt-2">
              You may revoke authorization at any time through the third-party connection provider or by contacting PolicyPilot.
            </p>
          </section>

          {/* Third-Party Data Access */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Third-Party Data Access</h2>
            <p className="mt-2">
              With your explicit authorization, PolicyPilot may retrieve insurance policy data through third-party services such as Canopy Connect.
            </p>
            <p className="mt-3">By connecting your account, you authorize PolicyPilot to access your insurance data solely for analysis purposes. You acknowledge that:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Data is provided &ldquo;as is&rdquo; from third-party sources and may be incomplete or inaccurate</li>
              <li>You may revoke access at any time</li>
            </ul>
            <p className="mt-3">
              PolicyPilot is not responsible for errors or omissions in third-party data.
            </p>
          </section>

          {/* Referral to Licensed Insurance Agency */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Referral to Licensed Insurance Agency</h2>
            <p className="mt-2">
              If you choose, PolicyPilot may facilitate a connection to Atlantis Insurance Corp, a licensed insurance agency.
            </p>
            <p className="mt-3">You acknowledge and agree that:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Atlantis Insurance Corp operates independently of PolicyPilot</li>
              <li>You are not required to work with Atlantis Insurance Corp</li>
              <li>Any insurance advice, quotes, or policies are provided solely by Atlantis Insurance Corp</li>
              <li>PolicyPilot is not responsible for insurance products, pricing, coverage decisions, or outcomes</li>
            </ul>
            <p className="mt-3">
              PolicyPilot may receive compensation for referrals where permitted by law.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">User Responsibilities</h2>
            <p className="mt-2">
              You agree to provide accurate and complete information, use the Services only for lawful purposes, and not attempt to reverse engineer, copy, or misuse any part of the platform.
            </p>
            <p className="mt-2">
              You acknowledge that PolicyPilot is not a substitute for professional insurance advice and that you are responsible for decisions made based on the Services.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Intellectual Property</h2>
            <p className="mt-2">
              All content, software, algorithms, scoring models, trademarks, and materials provided by PolicyPilot are owned by or licensed to PolicyPilot.
            </p>
            <p className="mt-2">
              You may not copy, modify, distribute, reproduce, or use any part of the Services for commercial purposes without prior written permission.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Disclaimers</h2>
            <p className="mt-2">
              The Services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
            </p>
            <p className="mt-2">
              PolicyPilot makes no warranties regarding accuracy, completeness, availability, or outcomes, including potential savings or coverage results. All warranties, express or implied, are disclaimed to the fullest extent permitted by law.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Limitation of Liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, PolicyPilot shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the Services.
            </p>
            <p className="mt-2">
              PolicyPilot&rsquo;s total liability for any claim shall not exceed the amount you paid, if any, to use the Services.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Indemnification</h2>
            <p className="mt-2">
              You agree to indemnify and hold harmless PolicyPilot, its affiliates, officers, employees, and partners from any claims, losses, or damages arising out of your use of the Services, your reliance on the information provided, or your violation of these Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Termination</h2>
            <p className="mt-2">
              PolicyPilot may suspend or terminate access to the Services at any time for violation of these Terms, misuse of the platform, or legal or compliance concerns.
            </p>
            <p className="mt-2">
              You may discontinue use of the Services at any time.
            </p>
          </section>

          {/* Governing Law and Dispute Resolution */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Governing Law and Dispute Resolution</h2>
            <p className="mt-2">
              These Terms are governed by the laws of the State of Arizona, without regard to conflict-of-law principles.
            </p>
            <p className="mt-2">
              Any disputes arising from these Terms or the Services shall be resolved exclusively in the state or federal courts located in Maricopa County, Arizona, unless otherwise required by law.
            </p>
          </section>

          {/* Changes to These Terms */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Changes to These Terms</h2>
            <p className="mt-2">
              PolicyPilot may update these Terms periodically. Continued use of the Services after changes are posted constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
            <p className="mt-2">
              If you have questions about these Terms, please contact:
            </p>
            <p className="mt-3 font-medium text-slate-900">
              PolicyPilot
              <br />
              Email:{' '}
              <a href="mailto:admin@mypolicypilot.ai" className="text-blue-600 hover:underline">
                admin@mypolicypilot.ai
              </a>
              <br />
              Website:{' '}
              <a href="https://www.mypolicypilot.ai" className="text-blue-600 hover:underline">
                mypolicypilot.ai
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Final CTA + Footer */}
      <section className="relative overflow-hidden bg-slate-900 pt-20 pb-12">
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
          <p className="mt-3 text-lg text-slate-300">
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
            <span>Completely free</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
            <span>No credit card</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
            <span>Private & secure</span>
          </div>
        </div>

        {/* Footer */}
        <div className="relative mt-20">
          <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-3 sm:items-center">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="PolicyPilot" className="h-9 w-9 rounded-xl" />
                <span className="text-sm font-semibold text-white">PolicyPilot</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms
                </Link>
                <a href="mailto:admin@mypolicypilot.ai" className="transition-colors hover:text-white">
                  Contact
                </a>
              </div>
              {/* <div className="flex items-center justify-end gap-3 text-slate-500">
                {['X', 'LinkedIn', 'Facebook'].map((social) => (
                  <a key={social} href="#" className="text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-white">
                    {social}
                  </a>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
