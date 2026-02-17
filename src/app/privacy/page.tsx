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
          Effective Date: February 14, 2026
        </p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-slate-700">
          {/* Intro */}
          <section>
            <p>
              PolicyPilot (&ldquo;PolicyPilot,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our website, platform, and related services (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p className="mt-3">
              By using PolicyPilot, you consent to the practices described in this Privacy Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Information We Collect</h2>

            <h3 className="mt-4 font-semibold text-slate-800">A. Information You Provide Directly</h3>
            <p className="mt-2">We may collect personal information that you voluntarily provide, including but not limited to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Property and/or vehicle information</li>
              <li>Insurance-related preferences or questions</li>
            </ul>

            <h3 className="mt-4 font-semibold text-slate-800">B. Insurance Policy Data via Third-Party Connection</h3>
            <p className="mt-2">
              With your explicit consent, PolicyPilot may retrieve your existing insurance policy information through secure third-party integrations, including Canopy Connect.
            </p>
            <p className="mt-2">This information may include:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Carrier name</li>
              <li>Policy details and deductibles</li>
              <li>Effective and expiration dates</li>
              <li>Premium amounts</li>
            </ul>
            <p className="mt-3">
              PolicyPilot does not access this information without your authorization, and you may revoke access at any time.
            </p>

            <h3 className="mt-4 font-semibold text-slate-800">C. Automatically Collected Information</h3>
            <p className="mt-2">When you use our Services, we may automatically collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>IP address</li>
              <li>Device and browser information</li>
              <li>Usage data and interaction logs</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            <p className="mt-2">This data is used for security, analytics, and platform improvement.</p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">How We Use Your Information</h2>
            <p className="mt-2">We use your information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Analyze and summarize your current insurance coverage</li>
              <li>Generate educational insights and policy comparisons</li>
              <li>Provide a PolicyPilot Score or coverage overview</li>
              <li>Improve our platform, tools, and user experience</li>
              <li>Respond to inquiries or support requests</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
            <p className="mt-3 font-medium text-slate-800">
              PolicyPilot does not provide insurance quotes or bind coverage.
            </p>
          </section>

          {/* Connecting You With a Licensed Insurance Agency */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Connecting You With a Licensed Insurance Agency</h2>
            <p className="mt-2">
              If you choose, PolicyPilot may facilitate an introduction to Atlantis Insurance Corp, a licensed insurance agency, to help you explore alternative insurance options.
            </p>
            <p className="mt-3 font-medium text-slate-800">Important notes:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Your information is only shared with Atlantis Insurance Corp after your affirmative consent</li>
              <li>PolicyPilot does not sell consumer data</li>
              <li>
                Atlantis Insurance Corp operates independently and is responsible for:
                <ul className="mt-1 list-disc space-y-1 pl-6">
                  <li>Quoting</li>
                  <li>Advising</li>
                  <li>Binding coverage</li>
                  <li>Regulatory compliance</li>
                </ul>
              </li>
            </ul>
            <p className="mt-3">
              Any insurance transaction occurs directly between you and Atlantis Insurance Corp.
            </p>
          </section>

          {/* How We Share Information */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">How We Share Information</h2>
            <p className="mt-2">We may share your information only in the following circumstances:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>With your consent, to connect you with Atlantis Insurance Corp</li>
              <li>With service providers who help operate our platform (e.g., hosting, analytics), under strict confidentiality agreements</li>
              <li>To comply with legal obligations, subpoenas, or regulatory requests</li>
              <li>To protect the rights, security, or integrity of PolicyPilot and its users</li>
            </ul>
            <p className="mt-3">
              We do not share your data with unrelated third parties for marketing purposes.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Data Security</h2>
            <p className="mt-2">
              We implement commercially reasonable measures to protect your information, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Encrypted data transmission</li>
              <li>Secure access controls</li>
              <li>Limited internal access on a need-to-know basis</li>
            </ul>
            <p className="mt-3">
              However, no system is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights and Choices */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Your Rights and Choices</h2>
            <p className="mt-2">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access your personal information</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent for third-party data connections</li>
              <li>Opt out of certain communications</li>
            </ul>
            <p className="mt-3">
              You can revoke Canopy Connect access at any time through their platform or by contacting us.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Data Retention</h2>
            <p className="mt-2">We retain personal information only as long as reasonably necessary to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Provide our Services</li>
              <li>Meet legal and compliance requirements</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
            <p className="mt-3">
              When information is no longer needed, it is securely deleted or anonymized.
            </p>
          </section>

          {/* Cookies & Tracking Technologies */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Cookies &amp; Tracking Technologies</h2>
            <p className="mt-2">PolicyPilot may use cookies or similar technologies to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Maintain platform functionality</li>
              <li>Analyze usage trends</li>
              <li>Improve performance</li>
            </ul>
            <p className="mt-2">You may control cookies through your browser settings.</p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Children&rsquo;s Privacy</h2>
            <p className="mt-2">
              PolicyPilot is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Third-Party Links</h2>
            <p className="mt-2">
              Our Services may include links to third-party websites or services. We are not responsible for their privacy practices or content.
            </p>
          </section>

          {/* Third-Party Relationship Disclosure */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Third-Party Relationship Disclosure</h2>
            <p className="mt-2 text-sm text-slate-500">Effective Date: February 14, 2026</p>
            <p className="mt-2">
              PolicyPilot is an independent technology platform and is not affiliated with any insurance carrier.
            </p>
            <p className="mt-2">
              If you choose, PolicyPilot may facilitate a connection to Atlantis Insurance Corp, a licensed insurance agency, to assist you in exploring insurance options.
            </p>
            <p className="mt-3">You acknowledge and understand that:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>PolicyPilot and Atlantis Insurance Corp are separate and independent entities</li>
              <li>You are not required to work with Atlantis Insurance Corp</li>
              <li>Any insurance advice, quotes, or policies are provided solely by Atlantis Insurance Corp</li>
              <li>All insurance transactions occur directly between you and the licensed agency</li>
            </ul>
            <p className="mt-3">
              PolicyPilot does not control insurance pricing, underwriting decisions, or policy terms.
            </p>
            <p className="mt-2">
              PolicyPilot may receive compensation for referrals where permitted by applicable law.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Changes to This Privacy Policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy periodically. Any changes will be posted with an updated effective date. Continued use of the Services constitutes acceptance of the revised policy.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Contact Us</h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy or our data practices, contact us at:
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
