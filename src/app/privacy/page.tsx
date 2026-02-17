import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Policy Pilot',
  description: 'Privacy Policy for Policy Pilot. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 text-slate-900">
      {/* Top navigation */}
      <nav className="bg-slate-900 pt-4 sm:pt-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="PolicyPilot" className="h-9 w-9 rounded-xl" />
            <span className="text-lg font-semibold tracking-tight text-white">PolicyPilot</span>
          </div>
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
            href="/get-policy"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get My Free Score
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: February 16, 2026
        </p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-slate-700">
          {/* Intro */}
          <section>
            <p>
              Policy Pilot LLC (&ldquo;Policy Pilot,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website{' '}
              <a href="https://www.mypolicypilot.ai" className="text-blue-600 hover:underline">
                www.mypolicypilot.ai
              </a>{' '}
              (the &ldquo;Service&rdquo;). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our Service.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">1. Information We Collect</h2>

            <h3 className="mt-4 font-semibold text-slate-800">a. Information You Provide</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Contact information:</strong> Name, email address, and phone number when you request a report, email delivery, or agent callback.
              </li>
              <li>
                <strong>Address:</strong> Your primary address as provided through the policy connection process.
              </li>
            </ul>

            <h3 className="mt-4 font-semibold text-slate-800">b. Insurance Policy Data</h3>
            <p className="mt-2">
              When you connect your insurance account through our third-party partner, Canopy Connect, we receive structured policy data including coverage types, limits, deductibles, vehicle details, and carrier information. <strong>We never see, receive, or store your insurance carrier login credentials.</strong> You authenticate directly with your carrier through Canopy Connect&rsquo;s secure widget.
            </p>

            <h3 className="mt-4 font-semibold text-slate-800">c. Automatically Collected Information</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Usage data:</strong> Pages visited, actions taken (e.g., clicking buttons, viewing reports), session duration, and browser/device information collected via Amplitude Analytics.
              </li>
              <li>
                <strong>Session replays:</strong> We use Amplitude Session Replay to record anonymized browsing sessions for product improvement purposes.
              </li>
              <li>
                <strong>Cookies and tracking pixels:</strong> We use the Facebook Pixel and similar technologies to measure advertising effectiveness and deliver relevant ads. See Section 5 for details.
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">2. How We Use Your Information</h2>
            <p className="mt-2">We use the information we collect to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Generate your personalized insurance policy report and grade.</li>
              <li>Deliver your report via email when requested.</li>
              <li>Connect you with an insurance agent when you explicitly request it.</li>
              <li>Improve, personalize, and optimize our Service.</li>
              <li>Measure the effectiveness of our marketing efforts.</li>
              <li>Communicate with you about your report or our Service.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">3. How We Share Your Information</h2>
            <p className="mt-2">
              <strong>We will never sell your personal information.</strong> We do not share your information with insurance agents or third parties unless you explicitly request it (e.g., by clicking &ldquo;Contact Agent&rdquo;). We share data with the following service providers who assist in operating our Service:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Canopy Connect</strong> — Secure policy data retrieval from your insurance carrier. Canopy acts as a data intermediary and is subject to its own privacy policy.
              </li>
              <li>
                <strong>OpenAI</strong> — Your policy coverage data (not personal contact information) is processed by OpenAI&rsquo;s API to generate your coverage analysis and grade.
              </li>
              <li>
                <strong>Supabase</strong> — Cloud database hosting for storing submissions and report data.
              </li>
              <li>
                <strong>Resend</strong> — Email delivery service used to send your report when you provide your email address.
              </li>
              <li>
                <strong>Amplitude</strong> — Analytics platform for understanding how users interact with our Service.
              </li>
              <li>
                <strong>Meta (Facebook)</strong> — Advertising measurement via the Facebook Pixel and Conversions API. Personal data sent to Meta is hashed (SHA-256) before transmission.
              </li>
              <li>
                <strong>Vercel</strong> — Cloud hosting and infrastructure provider.
              </li>
            </ul>
            <p className="mt-3">
              We may also disclose your information if required by law, regulation, legal process, or governmental request.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">4. Data Security</h2>
            <p className="mt-2">
              We take reasonable measures to protect your information, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>TLS encryption for all data in transit.</li>
              <li>Encryption at rest for stored data.</li>
              <li>Carrier credentials are never transmitted to or stored by Policy Pilot — authentication occurs directly between you and your carrier via Canopy Connect.</li>
              <li>Admin access is restricted and authenticated.</li>
            </ul>
            <p className="mt-3">
              No method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">5. Cookies and Tracking Technologies</h2>
            <p className="mt-2">We use the following tracking technologies:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <strong>Facebook Pixel:</strong> Tracks page views and conversion events (e.g., viewing a report) to measure ad performance. You can opt out via{' '}
                <a
                  href="https://www.facebook.com/settings/?tab=ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Facebook Ad Settings
                </a>.
              </li>
              <li>
                <strong>Amplitude:</strong> Collects usage analytics and session replay data to help us understand user behavior and improve the Service.
              </li>
              <li>
                <strong>Essential cookies:</strong> Used for admin authentication sessions. These are strictly necessary for the Service to function.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">6. Data Retention</h2>
            <p className="mt-2">
              We retain your report data and associated personal information for as long as necessary to provide the Service and fulfill the purposes described in this policy. Cached session data is automatically deleted after 7 days. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">7. Your Rights</h2>
            <p className="mt-2">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt out of marketing communications.</li>
              <li>Opt out of the sale or sharing of personal information (we do not sell your data).</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at the address below.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">8. Children&rsquo;s Privacy</h2>
            <p className="mt-2">
              Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us and we will promptly delete it.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">9. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">10. Contact Us</h2>
            <p className="mt-2">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </p>
            <p className="mt-3 font-medium text-slate-900">
              Policy Pilot LLC
              <br />
              <a href="mailto:support@mypolicypilot.ai" className="text-blue-600 hover:underline">
                support@mypolicypilot.ai
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
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
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
