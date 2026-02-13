# PolicyPilot Landing Page Redesign Brief

## Overview
PolicyPilot is an AI-powered insurance policy grading tool. Users connect their existing insurance policies via Canopy Connect, and we analyze them to provide a "Policy Pilot Score" showing coverage gaps, overpriced premiums, and recommendations.

## Target Audience
- Homeowners and renters who want to understand their insurance
- People who suspect they're overpaying for insurance
- Anyone who finds insurance confusing and wants clarity

## Design Goals
1. **Super professional** — This needs to look like a fintech/insurtech company worth trusting with sensitive data
2. **Clean and minimal** — Lots of white space, clear hierarchy, no clutter
3. **Trust signals** — Security badges, testimonials, partner logos
4. **Modern SaaS aesthetic** — Think Stripe, Linear, Vercel quality

## Brand Guidelines
- **Primary colors**: Deep blue (#1e40af), Cyan accent (#06b6d4)
- **Secondary**: Slate grays for text
- **Typography**: Clean sans-serif (Inter or similar)
- **Tone**: Professional, reassuring, clear

## Required Sections

### 1. Hero Section
- Strong headline about understanding your insurance
- Clear value prop: Free AI-powered insurance analysis
- Primary CTA: "Get My Free Score"
- Trust badges: "Free • 2 minutes • No credit card"
- Hero image/graphic: Abstract insurance/protection visual

### 2. How It Works
- 3 simple steps with icons:
  1. Connect your insurance (via Canopy Connect)
  2. AI analyzes your coverage
  3. Get your Policy Pilot Score + recommendations
- Make it feel effortless and quick

### 3. What You Get (The Score)
- Show a sample score/report visual
- Explain what the Policy Pilot Score includes:
  - Coverage grade (0-100%)
  - Gap analysis
  - Price comparison
  - Personalized recommendations

### 4. Trust & Security Section
- Canopy Connect partnership (bank-level security)
- "We never see your login credentials"
- "Your data is never sold"
- Security certifications/badges if available

### 5. Social Proof
- Testimonials from users (can be placeholder for now)
- Stats: "10,000+ policies analyzed" (placeholder)
- Rating stars

### 6. FAQ Section
- Keep existing FAQs but style them better
- Accordion style, clean spacing

### 7. Final CTA Section
- Strong closing headline
- Repeat the "Get My Free Score" CTA
- Reinforce it's free and takes 2 minutes

### 8. Footer
- Logo
- Links: Privacy Policy, Terms, Contact
- Social links (placeholder)

## Technical Requirements
- Next.js 16 with App Router
- Tailwind CSS (already installed)
- Fully responsive (mobile-first)
- Smooth scroll animations (subtle)
- Fast loading (optimize images)
- Accessibility compliant

## Image Assets
- Use placeholder images initially
- Note where custom graphics are needed:
  - Hero illustration
  - How it works icons
  - Sample score/report mockup
  - Trust/security badges

## Reference Sites (for quality bar)
- stripe.com
- linear.app
- vercel.com
- mercury.com

## Files to Update
- src/app/page.tsx (main landing page)
- src/app/globals.css (if needed)
- public/ (for any new assets)

## DO NOT
- Remove the existing Canopy Connect integration
- Change the /get-policy flow
- Break existing functionality
