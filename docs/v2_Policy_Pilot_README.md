# Policy Pilot

> "The Lending Tree for Insurance" — An AI-powered lead generation platform for insurance companies.

---

## Table of Contents

1. [Team & Ownership](#team--ownership)
2. [Origin Story & Why This Exists](#origin-story--why-this-exists)
3. [Core Thesis (3 Pillars)](#core-thesis-3-pillars)
4. [Product Overview](#product-overview)
   - [How It Works (Consumer Flow)](#how-it-works-consumer-flow)
   - [Key Technology](#key-technology)
   - [Insurance Lines (Launch)](#insurance-lines-launch)
5. [Funnel Architecture](#funnel-architecture-built--in-refinement)
6. [Business Model](#business-model)
7. [Revenue Streams](#revenue-streams)
8. [Unit Economics (Phase 1 Test)](#unit-economics-phase-1-test)
9. [Meta Advertising: Deep Dive](#meta-advertising-deep-dive)
   - [Special Ad Category Verdict](#special-ad-category-verdict-likely-required)
   - [Workaround Strategies Within SAC](#workaround-strategies-within-sac-constraints)
10. [Licensing & Regulatory Analysis](#licensing--regulatory-analysis)
    - [Tom's Licensed States — Risk Assessment](#toms-licensed-states--risk-assessment)
    - [Recommended Launch Strategy by State](#recommended-launch-strategy-by-state)
11. [Competitive Landscape](#competitive-landscape)
12. [Moat Strategy: How Policy Pilot Becomes Defensible](#moat-strategy-how-policy-pilot-becomes-defensible)
    - [Moat 1: Brand Ownership — "The Policy Pilot Score"](#moat-1-brand-ownership--the-policy-pilot-score-highest-priority)
    - [Moat 2: Data Flywheel](#moat-2-data-flywheel-medium-term)
    - [Moat 3: Annual Review Habit / Retention Loop](#moat-3-annual-review-habit--retention-loop)
    - [Moat 4: Two-Sided Marketplace Network Effects](#moat-4-two-sided-marketplace-network-effects-phase-2)
    - [Moat 5: Distribution Partnerships](#moat-5-distribution-partnerships-phase-2-3)
    - [Moat 6: Content/SEO Authority](#moat-6-contentseo-authority)
    - [Moat 7: Execution Speed](#moat-7-execution-speed--the-startups-only-unfair-advantage)
13. [Trust & Conversion Strategy](#trust--conversion-strategy)
14. [Marketing & Lead Generation Strategy (4 Priority Channels)](#marketing--lead-generation-strategy-4-priority-channels)
    - [Channel 1: Meta Ads](#channel-1-meta-ads--execution-playbook)
      - [Campaign Architecture](#step-2-campaign-architecture)
      - [Core Creative Strategy (5 Angles × 3 Formats = 36 Scripts)](#step-3-core-creative-strategy)
      - [Metrics Dashboard](#step-4-metrics-dashboard-track-these-daily)
    - [Channel 2: Organic Content Distribution](#channel-2-organic-content-distribution--execution-playbook)
    - [Channel 3: Referral / Viral Loops](#channel-3-referral--viral-loops--execution-playbook)
      - [Results Page UX Flow](#part-1-results-page-ux-flow--where-everything-lives)
      - [Policy Pilot Score Card](#part-2-the-policy-pilot-score-card)
      - [Share Block — Copy & Persuasion](#part-3-the-share-block--copy--persuasion-framework)
      - [Referral Messages](#part-4-referral-messages--what-the-friend-receives)
      - [PDF Report Sharing](#part-5-pdf-report--built-in-sharing)
      - [Post-Agent-Call Share Trigger](#part-8-post-agent-call-share-trigger-highest-intent-share-moment)
      - [User Referral Dashboard](#part-9-user-referral-dashboard)
      - [Score Context — Averages](#part-10-score-context--state--national-averages-unlocks-with-scale)
      - [Re-Share Triggers](#part-11-re-share-triggers-ongoing-viral-touchpoints)
    - [Channel 4: Email / SMS Nurture](#channel-4-email--sms-nurture--execution-playbook)
      - [Flow 1: Incomplete Policy Recovery](#flow-1-incomplete-policy-recovery)
      - [Flow 2: Review Request](#flow-2-review-request)
      - [Flow 3: Referral / Scorecard Share](#flow-3-referral--scorecard-share)
      - [Agent Handoff Sequence](#agent-handoff-sequence-unchanged--still-active)
    - [Future Channels](#future-channels-not-priority-for-launch)
15. [Key Risks & Mitigations](#key-risks--mitigations)
16. [Responsibilities](#responsibilities)
17. [Decisions Made](#decisions-made)
18. [Session Notes](#session-notes)

---

## Team & Ownership

| Name | Role | Policy Pilot Equity | Insurance Book Ownership |
|------|------|---------------------|--------------------------|
| **Brandon Priest** | Marketing & Growth (Facebook Ads, Lead Gen) | 40% | 50% (shared w/ Tucker) |
| **Tucker** | CTO / Product & Development | 40% | 50% (shared w/ Brandon) |
| **Tom** | Insurance Industry Expert / Agent | 20% | 0% (from PP-generated leads) |

**Key Deal Points:**
- Brandon & Tucker collectively own 80% of Policy Pilot
- Brandon & Tucker collectively own 50% of the entire insurance book of business generated through Policy Pilot leads
- Tom owns 20% of Policy Pilot and retains his agency's standard commission/book from servicing the leads

---

## Origin Story & Why This Exists

Tom runs an insurance company alongside his friend Amir, whose primary business is a mortgage company (similar to LoanDepot, smaller scale). They created a sister insurance company tied to the mortgage business as a **revenue expansion play** — every mortgage borrower (new purchase or refinance) needs insurance (home, auto, life, etc.).

Tom realized that if he could **generate his own leads independently** (outside of the mortgage pipeline), he could capture a bigger cut of the insurance book and scale the business further. He brought the idea to Brandon and Tucker because he needs their marketing and development expertise to execute.

---

## Core Thesis (3 Pillars)

### 1. Insurance Software is Stuck in the Stone Age
- No advanced or high-quality B2B software tools exist in insurance
- Almost zero utilization of AI/modern technology
- Massive whitespace to build a full suite of advanced tools long-term
- Insurance B2B customers are high-quality: better retention, higher willingness to pay, real budgets

### 2. Insurance Lead Generation is Uncreative & Broken
- Insurance companies rely on traditional lead gen methods (referrals, cold calls, mailers)
- Many just buy bulk lead data (low quality, high cost)
- Huge market opportunity for a smarter, tech-driven lead generation system

### 3. 99% of People Don't Understand Their Insurance
- Most consumers are either **overpaying/over-insured** or **under-insured** without knowing it
- Insurance agents often over-insure clients to inflate commissions
- DIY consumers focus too much on price and end up dangerously under-insured
- There is no consumer-friendly tool that objectively grades and explains insurance coverage

---

## Product Overview

### How It Works (Consumer Flow)

```
[Consumer] → Lands on Policy Pilot (via Facebook ads)
     ↓
[Lead Capture] → User inputs phone number and/or email
     ↓
[Sign In] → Connects to their insurance carrier via Canopy Connect (or InsurGrid backup)
     ↓
[Data Extraction] → Policy Pilot pulls their current insurance policy data
     ↓
[AI Analysis] → LLM (Claude Opus 4.6 or GPT 5.2) analyzes the policy IN REAL-TIME and generates:
     • Overall Policy Grade
     • Over-Insured vs. Under-Insured assessment
     • Red Flag identification
     • Plain-English policy explanation
     • Actionable advice & recommendations
     ↓
[Report Delivery] → User sees results on page + can download as PDF
     ↓
[Conversion Path] → Two options:
     • Consumer opts in to connect with an agent (data shared ONLY with consent)
     • Tom's agents reach out with personalized insights (consent-based)
```

**Additional touchpoints:** SMS and email capture BEFORE Canopy Connect integration — this means even users who drop off before completing the analysis are still captured as leads (phone/email).

**Important positioning:** Policy Pilot provides AI-generated perspective and analysis ONLY. It does not sell insurance, recommend specific products, or make decisions for the user. It advises them to seek professional guidance and offers a connection to a licensed agent if they choose.

### Key Technology

| Component | Tool | Details |
|-----------|------|---------|
| Policy Data Extraction (Primary) | **Canopy Connect** | Tom already pays; 500+ pulls/month; 300+ carrier integrations |
| Policy Data Extraction (Backup) | **InsurGrid** | $99/mo flat rate; unlimited pulls; 250+ carrier integrations |
| AI Analysis Engine | **Claude Opus 4.6 or GPT 5.2** | LLM with semantic search memory, custom system prompts, user-context-aware; real-time on-page processing |
| Ad Platform | **Meta (Facebook/Instagram)** | Primary acquisition channel |

### Insurance Lines (Launch)

| Line | Phase 1 (Launch) | Notes |
|------|-------------------|-------|
| Home Insurance | ✅ | Core offering |
| Renters Insurance | ✅ | Core offering |
| Auto Insurance | ✅ | Core offering |
| Life Insurance | ⏸️ | May hold off during testing phase |

---

## Funnel Architecture (Built & In Refinement)

```
FACEBOOK AD (UGC Creative)
     ↓
LANDING PAGE
  • Trust signals: UGC testimonials, security badges, Canopy Connect branding
  • Value prop: "Get your free AI insurance policy analysis"
     ↓
LEAD CAPTURE FORM
  • Phone number and/or email (captured BEFORE Canopy step)
  • This creates a partial lead even if user drops off here
     ↓
CANOPY CONNECT INTEGRATION
  • User authenticates with their insurance carrier
  • Policy data extracted automatically
     ↓
AI ANALYSIS PAGE (Real-Time)
  • LLM processes policy data and displays results live on page
  • User sees: Grade, Over/Under-Insured assessment, Red Flags, Plain-English Summary
  • Option to download report as PDF
     ↓
CTA: "Want to talk to an expert?"
  • Opt-in to connect with a licensed agent
  • Data shared ONLY upon explicit user consent
```

**Status:** Funnel is completely built. Currently refining AI response quality and prompt engineering.

---

## Business Model

### Phase 1: Internal Lead Generation (Launch)
- Generate leads via Facebook ads → funnel through Policy Pilot AI tool
- Tom's insurance agents service all leads
- Revenue from insurance policy sales (commissions + book of business)
- Consumer data shared with agents ONLY upon user consent (opt-in model)

### Phase 2: Lead Monetization (Scale)
- Sell qualified leads to external insurance companies
- Live transfer service — transfer lead calls in real-time to companies that buy them
- Partner with multiple insurance companies (not just Tom's agency)
- Potential subscription/SaaS model for agents wanting access to the platform

### Phase 3: Insurance B2B Software Suite (Long-term Vision)
- Expand beyond lead gen into a full suite of AI-powered insurance tools
- Target insurance agencies and carriers directly
- Leverage data moat from consumer interactions to build better products

---

## Revenue Streams

| Stream | Phase | Description |
|--------|-------|-------------|
| Insurance commissions | 1 | Revenue from policies sold to generated leads |
| Book of business value | 1+ | Ongoing residual value of insurance book (renewals) |
| Lead sales | 2 | Selling qualified leads to external insurance companies |
| Live transfers | 2 | Real-time call transfers to lead buyers |
| SaaS subscriptions | 3 | B2B software tools for insurance agencies |

---

## Unit Economics (Phase 1 Test)

### Ad Spend & Lead Targets
| Metric | Target |
|--------|--------|
| Daily ad spend | $200/day |
| Test duration | 3 days |
| Total test budget | $600 |
| Target CPL | $5–$10 |
| Benchmark CPL (life insurance, bad creatives, same SAC constraints) | $7–$15 |
| Expected leads at $5 CPL | 120 total (40/day) |
| Expected leads at $10 CPL | 60 total (20/day) |

**Benchmark context:** A known insurance company running life insurance ads (smaller market pool than home/renters/auto) with poor creatives is achieving $7–$15 CPL under the same Special Ad Category constraints. Policy Pilot targets a broader market with better creatives, supporting the $5–$10 CPL target.

### Revenue Side (Needs Validation)
| Metric | Estimate | Notes |
|--------|----------|-------|
| Conversion rate (lead → sold policy) | TBD | Need Tom's data from mortgage pipeline |
| Avg commission per home policy | ~$100–$200 | Industry average |
| Avg commission per auto policy | ~$100–$150 | Industry average |
| Avg commission per renters policy | ~$30–$50 | Industry average |
| Book of business multiplier | 1–2x annual commission | Long-term asset value |

### Existing Proof Point
- Tom currently generates ~10 qualified leads/day from the mortgage business pipeline

---

## Meta Advertising: Deep Dive

### Special Ad Category Verdict: LIKELY REQUIRED

**The question:** Does Policy Pilot need the "Financial Products & Services" Special Ad Category even though it's an educational tool, not selling insurance directly?

**The answer: Almost certainly yes.** Here's why:

1. **Meta scans landing pages, not just ad copy.** Even if the ad itself promotes a "free AI policy analysis," Meta's automated systems scan the full funnel — including the landing page, forms, and downstream pages.

2. **Meta enforces at the domain level.** As of January 2025, domains associated with financial services data have pixels and Conversions API integrations restricted at the domain level. If your domain is associated with insurance content, Meta flags it.

3. **The funnel connects users to insurance services.** The CTA at the end of the funnel offers to connect users with a licensed agent. Even though it's opt-in and the primary experience is educational, the downstream connection to insurance services triggers the category.

4. **Meta's own guidance:** "If you're advertising any financial tool, product, or guidance, you likely fall under this category — and that includes nonprofits offering financial education."

5. **Risk of non-compliance:** Ads that should be in the Special Ad Category but aren't get rejected and unpublished until corrected. Running without the category risks account-level enforcement actions.

### The Silver Lining

- The benchmark insurance company getting $7–$15 CPL with bad creatives IS operating under these same SAC constraints
- Life insurance (their vertical) is a SMALLER market pool than home/renters/auto
- Better creatives + broader market = plausible $5–$10 CPL even within SAC constraints
- UGC ad creatives tend to outperform polished ads in regulated categories because they feel organic

### Workaround Strategies Within SAC Constraints

| Strategy | Details |
|----------|---------|
| First-party data / Custom Audiences | Upload email lists, website visitor retargeting — these STILL work under SAC |
| Broad targeting with strong creative | Let Meta's algorithm optimize within SAC constraints; creative does the targeting |
| Lead magnet framing | "Free AI policy analysis" is a strong value exchange that drives clicks even with limited targeting |
| SMS/Email capture before Canopy | Captures partial leads even if users don't complete the full funnel |
| Advantage+ campaigns | Meta's AI-driven campaign type works within SAC and can optimize effectively |

### Possible Exception (Low Probability)

Meta does exempt ads that "only mention a financial service or product without the ability to obtain or connect with that product/service." If Policy Pilot's ad AND landing page were purely educational with NO agent connection CTA, it might qualify for an exemption. However, since the funnel includes an opt-in to connect with an agent, this exemption likely does not apply.

**Recommendation:** Run under the Special Ad Category from day one. Don't risk account penalties trying to game the exemption. Instead, focus creative energy on making the ads perform within the constraints.

---

## Licensing & Regulatory Analysis

### The Core Question
Policy Pilot positions itself as an **AI-powered educational/analytical tool** — NOT as an insurance seller, broker, or advisor. Does it still need insurance licenses?

### Key Findings

**The majority of states follow the NAIC Model Producer Licensing Act (PLMA Section 13D)**, which permits sharing commissions or paying fees to unlicensed individuals as long as they do not "sell, solicit, or negotiate" insurance.

### States That Explicitly Allow Referral Fees to Unlicensed Persons (PLMA Section 13D Adopters)

Alabama, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, District of Columbia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Maine, Maryland, Michigan, Minnesota, Missouri, Nebraska, Nevada, New Hampshire, New Jersey, Oklahoma, Oregon, Rhode Island, Vermont, Washington, Wyoming

### Notable State-Specific Rules

| State | Rule | Risk for Policy Pilot |
|-------|------|-----------------------|
| **Texas** | Unlicensed person CAN receive referral fees IF they don't discuss specific policy terms/conditions and fee isn't based on purchase | Low — PP doesn't discuss specific terms |
| **New York** | Referral fees allowed to non-licensees IF they don't discuss specific policy terms and fee isn't based on purchase | Low — same reasoning |
| **Connecticut** | Agent can pay referral fee to any non-licensed individual; no amount limit; can pay on renewal | Very favorable for PP |
| **Washington** | Referral fee allowed; no amount limit; must not sell/solicit/negotiate | Low risk |
| **Florida** | Commission sharing ONLY between licensed individuals | Higher risk — need to structure PP's compensation carefully |
| **Pennsylvania** | Referral fees must be one-time and "nominal" in nature | Medium risk — limits PP's revenue per lead |
| **Alaska** | Nominal one-time fee only; cannot depend on whether insurance was purchased | Medium risk |
| **North Carolina** | NEW 2025 LAW: Caps referral fees at $50 per referral for personal lines (effective Oct 1, 2025) | Limits revenue per lead to $50 |
| **Michigan** | Broader definition of "solicit" — includes "asking or urging a person to apply for insurance" | Higher risk — AI analysis could be construed as urging |
| **Wisconsin** | Defines intermediary requiring licensure as anyone who "advises other persons about insurance needs and coverages" | HIGHEST RISK — AI "advice" could trigger licensing |

### Policy Pilot's Specific Positioning

**Critical question from Brandon:** "If we aren't directly selling leads, just providing information and someone to contact — would we need licensing even in strict states?"

**Answer:** In most states, NO — as long as Policy Pilot:
1. Does NOT discuss specific policy terms or conditions (the AI should frame analysis as general education, not specific product recommendations)
2. Does NOT receive compensation tied to whether the user actually purchases a policy
3. Does NOT "solicit" or "negotiate" insurance on behalf of any carrier
4. DOES include clear disclaimers that this is AI-generated perspective, not professional insurance advice

**However**, states like Wisconsin and Michigan have broader definitions of "solicitation" and "advising." In Wisconsin, if the AI is interpreted as "advising persons about insurance needs and coverages," it could theoretically trigger licensing requirements.

### Recommended Disclaimer Language
> "Policy Pilot provides AI-generated analysis for informational and educational purposes only. This is not insurance advice, and Policy Pilot is not a licensed insurance agent, broker, or advisor. The information provided should not be relied upon as a substitute for professional insurance guidance. We recommend consulting with a licensed insurance professional before making any changes to your coverage. Policy Pilot does not sell, negotiate, or bind insurance policies."

### Tom's Licensed States — Risk Assessment

Tom is currently licensed in 14 states. Here's how each maps to Policy Pilot's regulatory risk:

| State | PLMA 13D? | Referral Fee Rules | Risk Level | Notes |
|-------|-----------|-------------------|------------|-------|
| **Arizona** | ✅ Yes | Standard PLMA rules | 🟢 Low | Clean — launch candidate |
| **New Mexico** | Follows PLMA principles | Standard rules | 🟢 Low | Launch candidate |
| **Georgia** | Follows PLMA principles | Standard rules | 🟢 Low | Launch candidate |
| **Ohio** | Follows PLMA principles | Standard rules | 🟢 Low | Launch candidate |
| **Indiana** | ✅ Yes | Standard PLMA rules | 🟢 Low | Launch candidate |
| **North Carolina** | Has own rules | **$50 cap per referral** (eff. Oct 2025) | 🟡 Medium | Revenue per lead capped at $50 |
| **South Carolina** | Follows PLMA principles | Standard rules | 🟢 Low | Launch candidate |
| **New Jersey** | ✅ Yes | Standard PLMA rules | 🟢 Low | Launch candidate |
| **Utah** | Follows PLMA principles | Standard rules | 🟢 Low | Launch candidate |
| **Oregon** | ✅ Yes | Standard PLMA rules | 🟢 Low | Launch candidate |
| **Wyoming** | ✅ Yes | Standard PLMA rules | 🟢 Low | Launch candidate |
| **Wisconsin** | ✅ Yes (but broad definitions) | Standard PLMA rules | 🔴 HIGH | "Advises persons about insurance needs and coverages" = licensable. AI analysis could trigger this. |
| **Illinois** | ✅ Yes | Standard PLMA rules | 🟢 Low | Launch candidate |
| **Kansas** | ✅ Yes | Standard PLMA rules | 🟢 Low | Launch candidate |

### Recommended Launch Strategy by State

**Tier 1 — Launch immediately (lowest risk):** Arizona, Indiana, New Jersey, Oregon, Wyoming, Illinois, Kansas, Georgia, Ohio, South Carolina, Utah, New Mexico

**Tier 2 — Launch with revenue constraints:** North Carolina ($50/referral cap — still viable but lower margin)

**Tier 3 — Launch ONLY after attorney consultation:** Wisconsin (broad "advising" definition is a direct conflict with AI analysis tool)

### Action Item
**Consult an insurance attorney** before launching in Wisconsin. For all other Tom-licensed states, the educational/informational positioning is strong. Consider launching in Tier 1 states first and adding Wisconsin after legal clarity.

---

## Competitive Landscape

### Direct Competitors

| Company | Model | How They Make Money | Key Differentiator | Weakness vs. Policy Pilot |
|---------|-------|---------------------|--------------------|----|
| **Jerry** | Licensed AI broker (auto-focused) | Commissions from 55+ carriers | "Super app" for car ownership; 5M users; profitable 2024; $213M raised | Auto-only focus; doesn't deeply analyze YOUR existing policy |
| **Policygenius** | Licensed online brokerage | Commissions from carriers | Strong brand; $250M+ raised; 30M shoppers served | Comparison play; doesn't grade your CURRENT policy |
| **Gabi (Experian)** | Licensed broker (auto/home) | Commissions from ~40 carriers | Experian backing; upload policy for comparison | Degraded since Experian acquisition; bad reviews |
| **Insurify** | Licensed comparison platform | Commissions from 500+ partners | Largest carrier network; 4.8/5 Trustpilot | Pure quote comparison; no policy analysis |
| **The Zebra** | Comparison marketplace | Commissions + advertising | Strong SEO; broad coverage types | Quote aggregator; no AI analysis |

### Policy Pilot's Differentiation

**None of these competitors do what Policy Pilot is proposing to do.** The key differentiator:

- Competitors help you **compare quotes** — they show you cheaper options
- Policy Pilot **analyzes your CURRENT policy** and tells you if it's actually protecting you correctly
- The angle isn't "save money" — it's "are you actually covered properly?"
- This is a fundamentally different value proposition: education-first, trust-building, then conversion

### Tom's Take on Competitors

**Tom's position (corrected):** Tom's point is that the mortgage pipeline conversion rate is irrelevant to Policy Pilot's expected performance because those are fundamentally different leads. Mortgage leads need insurance as a transaction requirement. Policy Pilot leads are people actively investigating whether their current coverage is adequate — a different psychological profile entirely.

**Assessment:** Tom is right. These conversion rates won't translate. Policy Pilot will need to establish its own baseline during the 3-day test. The unknown conversion rate is the single biggest risk in the business model.

### Where Policy Pilot is Weaker
- Zero brand recognition (all competitors have years of trust built)
- Significantly less funding (bootstrapped vs. $100M+ raises)
- Smaller carrier/agent network (just Tom's agency at launch)
- Not a licensed broker — limits direct monetization paths
- Consumer willingness to connect insurance accounts to an unknown startup is a major friction point
- No defensible technology moat (any competitor could replicate the AI grading feature)

---

## Moat Strategy: How Policy Pilot Becomes Defensible

The core problem: AI-powered policy grading is a feature, not a moat. Any well-funded competitor (Jerry, Policygenius, Insurify) could bolt this onto their existing platform in weeks. Policy Pilot needs to build defensibility BEFORE competitors notice and react. The window is 6–18 months from proving product-market fit. Policy Pilot's 7-layer moat stack is designed to make the business progressively harder to replicate over time.

### The Credit Karma Playbook

Credit Karma is the closest analog to what Policy Pilot is building. They gave away something incumbents charged for (credit scores), built a brand around transparency, and monetized through a marketplace. Key lesson: Credit Karma's moat was NOT the free credit score — anyone could offer that. Their moat was built across multiple layers simultaneously.

### Policy Pilot's Moat Stack (Ordered by Priority)

#### Moat 1: Brand Ownership — "The Policy Pilot Score" (Highest Priority)

**What:** Create and trademark a proprietary "Policy Pilot Score" — a recognizable, branded metric for insurance coverage quality (like a FICO score for insurance). Make it the standard reference point.

**Why it works:** Credit Karma didn't invent credit scores. But they became the brand people associate with free credit monitoring. If Policy Pilot becomes synonymous with "insurance policy grading," the brand IS the moat. Even if Jerry adds policy grading tomorrow, consumers will think "that's what Policy Pilot does."

**How to build it:**
- Trademark "Policy Pilot Score" or "PP Score" or a catchier name
- Make the score shareable on social media ("My Policy Pilot Score is 84 — what's yours?")
- Create PR around the score methodology
- Publish annual reports: "The Average American's Policy Pilot Score by State"
- Get media coverage around insurance coverage gaps using your data

**Timeline:** Start immediately. Name and trademark the score before launch.

#### Moat 2: Data Flywheel (Medium-Term)

**What:** Every policy analyzed builds a proprietary dataset. Over time, Policy Pilot's AI learns patterns that a competitor starting from scratch can't match:
- Which carriers consistently over-insure in specific regions
- What coverage gaps are most common by demographic
- Which policy structures correlate with claim denials
- Regional pricing anomalies and red flags

**Why it works:** A competitor can copy the feature. They can't copy 100,000 analyzed policies worth of pattern data. The AI gets measurably better with scale, and users can see the difference.

**How to build it:**
- Log every analysis (anonymized) as training data
- Build feedback loops: when users connect with agents, track whether the AI's assessment was confirmed by the professional
- Publish insights from the data (content marketing + brand authority)

**Timeline:** Starts accumulating from day one. Becomes meaningful moat at 50K+ analyses.

#### Moat 3: Annual Review Habit / Retention Loop

**What:** Turn Policy Pilot from a one-time tool into an annual ritual. "Your insurance policy changes. Your life changes. Re-analyze annually."

**Why it works:** Credit Karma's biggest moat is that users CHECK their credit score regularly. If Policy Pilot users re-analyze annually, you own the longitudinal data. You can show: "Last year your score was 67, this year it's 74." No competitor can replicate a user's HISTORY with your platform.

**How to build it:**
- Annual re-analysis reminders via SMS/email
- Score history dashboard: "Your Policy Pilot Score over time"
- Life event triggers: "Just bought a house? Re-analyze your policy."
- Renewal date tracking: remind users to re-check before their policy renews

**Timeline:** First retention loops should be built by month 6.

#### Moat 4: Two-Sided Marketplace Network Effects (Phase 2)

**What:** Build a marketplace where multiple insurance agencies compete for Policy Pilot leads. More agents wanting leads → better agent matching for consumers → better consumer experience → more consumers → more data → more agents.

**Why it works:** A single-vendor relationship (Tom's agency) is not a moat. A marketplace with 50+ agencies is. Network effects create exponential value that linear products can't match.

**How to build it:**
- Phase 1: Tom's agency services all leads (proof of concept)
- Phase 2: Onboard 5-10 additional agencies in different states
- Phase 3: Build self-serve agent portal where agencies can bid on/buy leads
- Key: Quality scoring for agents (consumer reviews, conversion rates) creates trust

**Timeline:** Phase 2 starts after proving unit economics work (month 3-6).

#### Moat 5: Distribution Partnerships (Phase 2-3)

**What:** Embed Policy Pilot into existing workflows where insurance decisions happen:
- Mortgage companies (natural fit — Tom/Amir's existing business proves this)
- Real estate agents / closing attorneys
- HR departments (employee benefits education)
- Financial advisors
- Car dealerships

**Why it works:** Once Policy Pilot is the "recommended insurance analysis tool" embedded in a mortgage company's closing process, that's a distribution channel a competitor can't easily displace.

**How to build it:**
- Use Tom/Amir's mortgage business as the template for mortgage company partnerships
- Build a white-label or co-branded version for partners
- Create an affiliate/referral program for financial professionals

**Timeline:** Start exploring partnerships by month 6.

#### Moat 6: Content/SEO Authority

**What:** Own the search results for "am I over-insured," "insurance policy review," "is my coverage enough," "what does my insurance cover."

**Why it works:** Organic acquisition that doesn't require ad spend. Establishes Policy Pilot as the authority in the insurance education space. Compounds over time.

**How to build it:**
- Publish data-driven content from analysis results
- "The Most Common Insurance Gaps in [State]" articles
- Insurance education hub on the Policy Pilot website
- YouTube / TikTok content explaining insurance concepts

**Timeline:** Start publishing content within the first month. SEO compounds over 6-12 months.

#### Moat 7: Execution Speed — The Startup's Only Unfair Advantage

**What:** Policy Pilot's team can go from idea to shipped product faster than any competitor can go from idea to internal meeting about the idea. The entire MVP was built in less than two weeks. That speed IS the moat in the early stages — it means Policy Pilot can iterate, test, learn, and ship faster than anyone in the market.

**Why it works:** Jerry has 200+ employees. Policygenius has 300+. Insurify, The Zebra — all of them have product managers, engineering leads, sprint planning, design reviews, QA cycles, and compliance sign-offs. Adding a "policy grading" feature to any of these platforms is a 3-6 month project minimum. For Policy Pilot, it's two people in a room for two weeks.

This isn't just a speed advantage — it's a compounding advantage:
- Policy Pilot can test a new feature, see if it works, and kill it or scale it in the time it takes a competitor to schedule the kickoff meeting
- Every week of shipping is a week of data, user feedback, and product learning that competitors don't have
- By the time a competitor decides to copy the policy grading feature, Policy Pilot has already iterated through 10 versions of it and built adjacent features they haven't even considered
- The small team means zero bureaucracy, zero politics, zero "let's get alignment from stakeholders" — just build and ship

**How to protect it:**
- Keep the team lean as long as possible — adding headcount slows you down before it speeds you up
- Maintain direct access between the people who build (Tucker), the people who market (Brandon), and the people who know the industry (Tom) — no layers in between
- Set a cultural standard: if something can be shipped this week, it ships this week. Not next sprint. Not after review. This week.
- Document every iteration and what you learned from it — this knowledge base becomes irreplaceable
- Use the speed to build features that deepen the moat layers above (score improvements, data flywheel features, retention loops) before competitors even start copying version 1

**The math:** If Policy Pilot ships 2 meaningful updates per week and a competitor ships 1 update per month, Policy Pilot is 8x faster. Over 6 months, that's 48 iterations vs. 6. That gap is nearly impossible to close once it opens.

**Timeline:** This moat exists NOW. It's the one advantage that doesn't need to be built — it just needs to be protected. The biggest threat to this moat is Policy Pilot itself: hiring too fast, adding process too early, or slowing down once things start working.

### The Uncomfortable Truth About Moats

Most of these moats don't exist yet. Right now, Policy Pilot is a feature with a landing page. That's not a criticism — every company starts here. But you need to be building moat layers FROM DAY ONE, not after you've proven the model. The window between "this works" and "Jerry adds it to their app" is measured in months, not years. The one moat that already exists is Moat 7 — execution speed. Use it to build all the others before competitors wake up.

**The single most important thing:** Own the brand. Make "Policy Pilot Score" (or whatever you name it) the thing people talk about. Credit Karma didn't win because of technology. They won because they made "What's your credit score?" a mainstream question and positioned themselves as the free answer.

---

## Trust & Conversion Strategy

### Trust Barrier Approach
| Element | Details |
|---------|---------|
| UGC Ad Creatives | Real-person style video ads that feel authentic and build immediate trust |
| Website Testimonials | Social proof from early users / beta testers |
| Security Badges | SSL, data encryption, privacy-focused messaging |
| Canopy Connect Branding | Leveraging Canopy's established brand trust for the data connection step |
| Disclaimer Language | Clear, transparent about AI limitations and educational nature |

### Lead Capture Strategy
| Stage | Data Captured | Lead Type |
|-------|---------------|-----------|
| Landing page form | Phone + Email | Partial lead (even if user drops off) |
| Canopy Connect completion | Full policy data | Full lead |
| CTA opt-in | Consent to agent contact | Qualified lead |

**Key insight:** The SMS/email capture BEFORE Canopy Connect means even users who bail on the insurance carrier login step are still contactable leads. This creates two tiers of lead quality.

---

## Marketing & Lead Generation Strategy (4 Priority Channels)

### Priority Channels

| # | Channel | Cost | When | Owner |
|---|---------|------|------|-------|
| 1 | **Meta Ads** | $200/day | Launch now | Brandon |
| 2 | **Organic Content Distribution** | Free | Start week 1 | Brandon |
| 3 | **Referral / Viral Loops** | Free | Build into product before launch | Tucker |
| 4 | **Email / SMS Nurture** | Low | Build before launch | Brandon + Tucker |

**Future Channels (Month 2+):** SEO/Content Marketing, Strategic Partnerships (mortgage companies, real estate agents, financial advisors, HR departments, car dealerships, CPAs), Google Ads (high-intent search), YouTube long-form

---

### CHANNEL 1: META ADS — Execution Playbook

#### Step 1: Account & Campaign Setup (Pre-Launch — Day 0)

**Action items (Brandon):**

| # | Task | Details | Status |
|---|------|---------|--------|
| 1 | Create/verify Business Manager | Ensure policypilot.com domain is verified in Meta Business Manager | [ ] |
| 2 | Install Meta Pixel | Place pixel on ALL funnel pages: landing page, lead form, Canopy step, AI analysis page, CTA page | [ ] |
| 3 | Set up Conversions API (CAPI) | Server-side tracking alongside pixel — critical for accurate attribution under SAC restrictions | [ ] |
| 4 | Select Special Ad Category | Choose "Financial Products & Services" at campaign level — non-negotiable | [ ] |
| 5 | Configure Custom Conversions | Create events for: LeadCapture (phone/email), CanopyComplete, AnalysisComplete, AgentOptIn | [ ] |
| 6 | Set up geo-targeting | Target Tom's 12 Tier 1 states: AZ, NM, GA, OH, IN, SC, NJ, UT, OR, WY, IL, KS | [ ] |
| 7 | Build Custom Audience: Website visitors | All site visitors, 30-day window (for retargeting) | [ ] |
| 8 | Build Custom Audience: Partial leads | People who hit lead capture but didn't complete Canopy | [ ] |

#### Step 2: Campaign Architecture

**Single Campaign, Consolidated Structure (Brandon's Strategy):**

The most effective Meta ad structure in 2025-2026 is maximum consolidation — one campaign, one ad set, broad targeting, and let the Andromeda algorithm optimize across all creatives. Creative acts as the targeting mechanism.

```
CAMPAIGN: POLICY PILOT — LEAD GEN
├── Ad Set 1: Broad Targeting (All Tier 1 states, 18+, SAC enabled)
│   ├── Creative 1
│   ├── Creative 2
│   ├── ...
│   └── Creative N (up to 50 per ad set)
│
│   WHEN AD SET 1 HITS 50 CREATIVES:
│
├── Ad Set 2: Broad Targeting (same settings)
│   ├── Creative 51
│   ├── Creative 52
│   └── ...
│
└── Continue adding ad sets as creative volume grows
```

**Rules:**
- One campaign. One ad set until you hit 50 creatives.
- Broad targeting ONLY — no interest stacking, no demographic narrowing beyond SAC requirements
- Continuously add new creatives to the active ad set
- When you hit 50 ads per ad set (Meta's threshold), create a new ad set within the same campaign and repeat
- Let Meta's algorithm decide which creatives win — don't interfere with manual optimizations early
- Kill underperformers based on Brandon's own scaling/kill criteria

#### Step 3: Core Creative Strategy

##### Philosophy

Every creative follows the same conversion architecture: emotional hook → real story → Policy Pilot as the solution → score reveal → CTA. The goal is to make the viewer feel something (fear, anger, curiosity) and then give them a specific action: "Find out your Policy Pilot Score."

**Primary format:** AI-generated UGC characters (until revenue supports hiring real UGC creators at $150-300/video). Supplement with faceless formats (screen recordings with voiceover, text-on-screen story format, b-roll with narration) to diversify and hedge against Meta's AI content detection in SAC ads.

**Source material:** Real stories sourced from Reddit (r/insurance, r/homeowners, r/personalfinance), Facebook groups, Quora, news articles about claim denials, and social media. Build a story bank of 20-30+ real stories tagged by insurance type (home, auto, renters), emotional angle (financial ruin, claim denial, overpaying), and severity.

##### Priority Creative Angles & Full Examples

**4 priority angles at launch:** Fear/Urgency, Anger/Overpaying, Curiosity/Discovery, Life Event Triggers
**3 priority formats:** Real UGC (when available), AI UGC, Faceless
**Future angle (unlocks with scale):** Social Proof / Community

---

##### ANGLE 1: FEAR / URGENCY (Primary — Brandon's Bet)

**Premise:** Scare people into immediate action using real, painful stories of claim denials, coverage gaps, and financial devastation. Real stories hit harder than hypotheticals because the specific details make them undeniable. The viewer should feel "this could happen to me" and take action NOW.

**SAC compliance note:** Frame as awareness/education, not panic. "Most people don't realize..." is safer than "Your insurance company is screwing you." Stay factual about what happened in the story — don't make blanket accusations against carriers.

**FEAR × REAL UGC FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| F1 | "A tree fell on my neighbor's house last month. Insurance denied the entire claim. Here's the one thing they missed..." | (To camera, emotional) "They had homeowners insurance for 12 years. Paid every month on time. A massive oak fell through their roof during a storm — $140K in damage. Filed the claim. Denied. Turns out their policy excluded 'earth movement' — the tree fell because the roots shifted in wet soil. They didn't even know that clause existed. Nobody told them. That's when someone showed me this tool called Policy Pilot — I ran my own policy and it flagged the SAME gap in mine." | (Show phone/screen with Policy Pilot Score) "My Policy Pilot Score was a 54. I had no idea. Find out yours before something like this happens to you — it's completely free. Link below." |
| F2 | "My cousin's apartment flooded. She lost everything. Renter's insurance paid her $0." | (To camera, genuine frustration) "She had renter's insurance. She thought she was covered. The pipe burst from the unit above her — destroyed her furniture, her laptop, all her clothes. Filed the claim. They said water damage from 'external sources' wasn't covered under her plan. $15,000 in stuff — gone. She had no idea her policy had that exclusion. I immediately ran my renter's policy through Policy Pilot because I needed to know if I had the same problem." | (Show screen with score + red flags highlighted) "Turns out I had two gaps I didn't know about. My Policy Pilot Score told me everything in plain English. Check yours — it takes 2 minutes and it's free." |
| F3 | "A family in Ohio had their car totaled. Insurance gave them $4,000. The car was worth $22,000. Here's why..." | (To camera, storytelling) "They had what they THOUGHT was full coverage. But their policy had a depreciation clause that calculated the car's value based on age and mileage, not replacement cost. So their 3-year-old SUV that would cost $22K to replace? Insurance said it was worth $4,000. They still owed $16K on the loan. They were underwater on a car that didn't exist anymore. This is exactly the kind of thing Policy Pilot catches." | (Show screen — Policy Pilot score with auto coverage section highlighted) "When I checked my Policy Pilot Score, it flagged my depreciation coverage immediately. Don't wait until you're stuck with a bill you can't pay. Find out your Policy Pilot Score — it's free." |

**FEAR × AI UGC FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| F4 | "Nobody told me my home insurance doesn't cover floods. I found out the hard way..." | (AI character, direct to camera, emotional delivery) "I live in Georgia. It rained for 3 days straight. Water came in through the foundation — destroyed my basement, my furnace, my water heater. $60,000 in damage. I called my insurance thinking I was covered. They said 'flood damage requires a separate policy.' I'd been paying $180 a month for 6 years for a policy that didn't cover the one thing that actually happened to me. I wish I had known about Policy Pilot before this happened." | (Cut to screen recording — Policy Pilot Score being generated, red flag on flood coverage) "Policy Pilot would have caught this. It shows you exactly what's covered and what's not — in plain English. Find out your Policy Pilot Score before it's too late. It's free." |
| F5 | "My friend died in a car accident. His wife found out his life insurance was worthless. Here's why..." | (AI character, somber tone) "He had a life insurance policy through work. Thought his family was set. When he passed, his wife filed the claim. Turns out the policy had a 2-year contestability clause AND he'd switched jobs 18 months ago — the new employer's policy hadn't fully vested. She got $0. Two kids, a mortgage, and nothing. He never checked what his policy actually covered. Most people don't." | (Screen recording of Policy Pilot analyzing a policy, score appears) "Policy Pilot breaks down your policy so you actually understand what you're paying for. It takes 2 minutes. Find out your Policy Pilot Score — do it for the people who depend on you." |
| F6 | "A house fire destroyed everything they owned. Insurance covered 40% of it. Here's the clause that killed them..." | (AI character, serious) "They had homeowners insurance for 8 years. House caught fire from an electrical issue. Total loss — $380K to rebuild. Insurance said their policy had an 'actual cash value' clause instead of 'replacement cost.' That means insurance pays what the house was worth AFTER depreciation, not what it costs to rebuild. They got $160K. It costs $380K to rebuild. That $220K gap? That's on them. And they had no idea." | (Screen shows Policy Pilot flagging the ACV vs replacement cost issue) "This is exactly what your Policy Pilot Score catches. Stop guessing whether you're protected. Find out in 2 minutes — completely free." |

**FEAR × FACELESS FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| F7 | TEXT ON SCREEN: "Her insurance denied a $90,000 claim. The reason will make you sick." | (Emotional music, slow text reveals over b-roll of damaged home/flooding) Text sequence: "She paid insurance for 11 years." → "Never missed a payment." → "Her roof collapsed during a storm." → "$90,000 in damage." → "She filed the claim." → "DENIED." → "Her policy excluded 'acts of God' for wind damage over 60mph." → "She never knew that clause existed." → "Nobody told her." | (Screen recording: Policy Pilot analyzing a policy, score appearing, red flags highlighted) Text: "Policy Pilot catches this in 2 minutes." → "It reads your policy so you don't have to." → "Find out your Policy Pilot Score — free." |
| F8 | VOICEOVER: "This couple lost their life savings because of one sentence in their insurance policy." | (Voiceover over b-roll — suburban home, family photos, then water damage footage) "Mark and Lisa had homeowners insurance for 9 years. Their basement flooded during a storm. $75,000 in damage — their entire savings wiped out trying to fix it. Their insurance denied the claim because of six words buried on page 14 of their policy: 'excludes damage from ground water.' They never read page 14. Nobody does. That's why a team of developers built an AI tool that reads it for you — and tells you in plain English exactly where you're exposed." | (Screen recording — Policy Pilot running an analysis, score reveal, specific clause flagged) "It's called Policy Pilot. It takes 2 minutes. It's free. Find out your Policy Pilot Score before six words cost you everything." |
| F9 | TEXT ON SCREEN: "$22,000 car. $4,000 payout. Here's the clause nobody reads." | (Text overlays with tense music, car crash b-roll) "He had 'full coverage' auto insurance." → "His car was totaled." → "Worth: $22,000." → "Insurance payout: $4,000." → "Why?" → "His policy used 'actual cash value' — not replacement cost." → "After depreciation, insurance said his car was worth $4K." → "He still owed $16,000 on the loan." → "For a car that no longer exists." | (Screen recording — Policy Pilot flagging auto depreciation gap) "Policy Pilot reads your policy and flags exactly this. Find out your Policy Pilot Score. 2 minutes. Free. Link below." |

---

##### ANGLE 2: ANGER / OVERPAYING

**Premise:** You've been paying for coverage you don't need, and nobody told you. Your insurance company has been quietly taking your money for years for things that don't apply to you. This triggers anger and the feeling of being taken advantage of — then channels that anger into checking their own policy.

**Language guardrail:** Say "overpaying" or "paying for coverage you may not need" — NOT "stealing" or "scamming." Keep it factual, not accusatory toward specific carriers.

**ANGER × REAL UGC FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| A1 | "I just found out I've been overpaying on insurance by $2,400 a year. For 5 years." | (To camera, visibly frustrated) "That's $12,000. Gone. I ran my policy through this free AI tool — Policy Pilot — and it told me I was paying for earthquake coverage. I live in North Carolina. We don't get earthquakes. I was also paying for a $500 deductible rider I didn't need because I already had it through my umbrella policy. Nobody — not my agent, not the insurance company — ever said 'hey, you're paying for stuff that makes no sense.' I had to find out from an AI." | (Show phone with Policy Pilot Score — over-insured flags highlighted) "My Policy Pilot Score showed me exactly where I was overpaying. Find out yours. It's free and it takes 2 minutes." |
| A2 | "Raise your hand if you actually know what you're paying for on your insurance policy. Yeah. Nobody does." | (To camera, conversational/heated) "I've been paying $210 a month for renter's insurance. I thought that was normal. Ran it through Policy Pilot and found out I was paying for $100K in personal property coverage. I'm a 26-year-old renter. I don't OWN $100K in stuff. Not even close. My agent set me up with this plan and never asked what I actually own. I was paying for coverage on things that don't exist." | (Show screen — Policy Pilot over-insured findings) "Find out your Policy Pilot Score. See if you're paying for things you don't need. It's free — takes 2 minutes. Link below." |
| A3 | "My insurance agent had me paying for flood insurance. I live on top of a hill. In Arizona." | (To camera, half-laughing, half-angry) "I'm not kidding. I've been paying an extra $87 a month — for 3 years — for flood coverage on a property that is literally on a hill in one of the driest states in America. That's over $3,100 I just threw away. The agent who sold me this policy knew where I lived. They bundled it in and never mentioned it. I found out because I ran my policy through Policy Pilot and it flagged it immediately." | (Show screen — flood coverage flagged as unnecessary) "Don't let this happen to you. Check your Policy Pilot Score. It takes 2 minutes and it's completely free." |

**ANGER × AI UGC FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| A4 | "I just did the math on how much my insurance company overcharged me. I feel sick." | (AI character, frustration building) "I ran my homeowners policy through Policy Pilot — this free AI tool that grades your insurance. It told me I was paying for three things I don't need: earthquake coverage in Florida, scheduled jewelry coverage when I don't own any jewelry worth insuring, and a liability limit that's double what's recommended for my property. Total? $3,200 a year in unnecessary coverage. I've had this policy for 4 years. That's almost $13,000 I've overpaid and I can never get it back." | (Screen recording — Policy Pilot over-insured section highlighted with dollar amounts) "Your Policy Pilot Score shows you exactly what you're overpaying for. It's free. Find out yours." |
| A5 | "Your insurance company will never tell you that you're overpaying. Here's why..." | (AI character, matter-of-fact tone) "Think about it. Every dollar you overpay is a dollar they keep. They have zero incentive to tell you that you're paying for coverage you don't need. Your agent gets a commission based on your premium — higher premium, higher commission. Nobody in the entire chain benefits from you paying less. That's why we built Policy Pilot. An AI that reads your actual policy and tells you — in plain English — where you're over-covered, under-covered, and what it's costing you." | (Screen shows Policy Pilot Score + breakdown) "No commission. No upsell. Just the truth about your policy. Find out your Policy Pilot Score — it's free." |
| A6 | "I've been paying $340 a month on auto insurance. For a 2018 Honda Civic." | (AI character, exasperated) "I thought that was just what insurance costs. Then I ran it through Policy Pilot. Turns out I was paying for rental car reimbursement when I have two cars. I had gap coverage on a car I own outright — no loan. And my comprehensive deductible was set at $250 when it should have been $1,000 given my savings. That's $1,800 a year in coverage I didn't need. My Policy Pilot Score was a 41 — mostly because I was massively over-insured." | (Screen — score of 41, over-insured flags listed) "Don't keep throwing money away. Check your Policy Pilot Score. 2 minutes. Free. Link below." |

**ANGER × FACELESS FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| A7 | TEXT ON SCREEN: "The average American overpays $1,200/year on insurance. Here's how they get away with it." | (Text reveals with frustrated/tense music) "Your insurance company will never call you and say: 'Hey, you're paying too much.'" → "Your agent gets paid more when your premium is higher." → "Nobody in the system benefits from you paying less." → "So who's looking out for you?" → "That's why Policy Pilot exists." → "A free AI tool that reads your actual policy and tells you exactly where you're overpaying." | (Screen recording — Policy Pilot analyzing policy, flagging over-insured areas with dollar amounts) "Find out your Policy Pilot Score. See what you've been overpaying. 2 minutes. Free." |
| A8 | VOICEOVER: "What if I told you that you've been paying for insurance coverage that doesn't even apply to your life?" | (Voiceover over b-roll — insurance bills, calculator, frustrated person at desk) "Most insurance policies are built from templates. Your agent picks a package, maybe adjusts one or two things, and sends you a bill. But those packages include coverage for things that might not apply to you at all. Earthquake coverage in a state with no earthquake risk. Flood coverage on a property that's never flooded. Jewelry riders when you don't own jewelry. It adds up to hundreds — sometimes thousands — per year. And you'd never know unless you read every page of your policy. Or unless you run it through Policy Pilot." | (Screen recording — Policy Pilot score reveal, over-insured section) "Policy Pilot reads your policy in 2 minutes and tells you exactly what you're overpaying for. Find out your Policy Pilot Score. It's free." |
| A9 | TEXT ON SCREEN: "$87/month for flood insurance. She lives on a hill. In Arizona." | (Text reveals, sarcastic tone) "Her agent set it up 3 years ago." → "Never mentioned where she lives." → "Never asked if it was relevant." → "$87/month × 36 months = $3,132." → "Gone." → "She found out from an AI tool that took 2 minutes." → "Her agent never told her in 3 years." | (Screen — Policy Pilot flagging flood coverage as unnecessary) "Stop overpaying for things you don't need. Find out your Policy Pilot Score. Free. Link below." |

---

##### ANGLE 3: CURIOSITY / DISCOVERY

**Premise:** Pure intrigue — "I checked my score and I did NOT expect this." No fear, no anger, just a mystery that demands resolution. Works especially well for younger renters who don't think emotionally about insurance yet. The hook creates an open loop that can only be closed by checking their own score.

**CURIOSITY × REAL UGC FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| C1 | "I just ran my insurance through an AI and I was NOT ready for what it found..." | (To camera, genuine surprise) "So there's this free tool called Policy Pilot — it connects to your insurance carrier, pulls your actual policy, and an AI grades it. Like a report card for your insurance. I figured mine would be fine — I've had the same policy for 4 years, never had an issue. My score? 51 out of 100. It flagged 3 things I had no idea about. I won't bore you with the details but one of them could have cost me $40,000 if something went wrong." | (Show phone — score of 51, red flags visible) "What's your Policy Pilot Score? I bet it's not what you think. It's free — takes 2 minutes. Link below." |
| C2 | "There's a free AI tool that grades your insurance policy. I finally tried it." | (To camera, casual) "I keep seeing people talk about this tool called Policy Pilot. You connect your insurance and an AI tells you if your coverage is actually good or if you have gaps. Took me like 2 minutes. I got a 73 — which sounds okay but it flagged something with my liability coverage that I genuinely didn't understand until it explained it to me in plain English. Like... I've been paying for this policy for 3 years and I learned more about it in 2 minutes from an AI than my agent ever told me." | (Show screen — score of 73 with explanation section) "What's YOUR Policy Pilot Score? Try it — it's free. Honestly curious what other people are getting." |
| C3 | "Can you tell me what your insurance deductible is right now? Without looking? Exactly." | (To camera, challenging but friendly) "Nobody knows. I didn't know mine either. I ran my policy through this AI tool called Policy Pilot and it broke everything down — my deductible, my coverage limits, what's actually covered, what's not. And it scored my policy. Turns out mine was... not great. I won't say the number because it's embarrassing but let's just say I have some phone calls to make." | (Show screen — score partially visible, curious angle) "Find out your Policy Pilot Score. I'm actually curious — are most people's scores as bad as mine? It's free, link below." |

**CURIOSITY × AI UGC FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| C4 | "I asked an AI to read my insurance policy. It found something on page 9 that my agent never mentioned..." | (AI character, intrigued) "I've been hearing about this tool called Policy Pilot. It uses AI to read your actual insurance policy and grade it. I figured why not — it's free. So I connected my insurance and let it run. Two minutes later I had a score and a full breakdown. And on page 9 of my policy, it found a clause that basically means if my house is vacant for more than 30 days, I lose all coverage. I travel for work. I'm gone for 6 weeks at a time sometimes. Nobody ever told me this." | (Screen recording — Policy Pilot showing the specific clause flagged) "What's hiding in YOUR policy? Find out your Policy Pilot Score. It's free and it takes 2 minutes." |
| C5 | "Okay so there's a free tool that gives your insurance a score out of 100. What do you think the average American gets?" | (AI character, engaging) "The answer might surprise you. It's called Policy Pilot — it's an AI that reads your actual policy and tells you if you're protected or not. I ran mine thinking I'd be an 80 or 90 — I pay good money for this policy. I got a 58. A 58! I wasn't even passing. It found two coverage gaps I had no idea about and one area where I was overpaying. It explained everything in normal language — not insurance jargon. Took 2 minutes." | (Screen — score of 58 with breakdown) "What's your Policy Pilot Score? I'm betting most people are going to be surprised. It's free — link below." |
| C6 | "Okay be honest — when's the last time you actually READ your insurance policy? I'll go first: never." | (AI character, relatable) "That's the problem right? We all pay for insurance but nobody actually reads the 40-page document that tells you what it covers. So I used this free AI tool called Policy Pilot that reads it for you. You connect your insurance, the AI pulls your policy, and 2 minutes later you get a score and a plain-English breakdown. It's like getting a report card for something you've been paying for blindly. Mine had some surprises — both good and bad." | (Screen — Policy Pilot analysis page) "Find out your Policy Pilot Score. I promise you'll learn something you didn't know. It's free." |

**CURIOSITY × FACELESS FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| C7 | TEXT ON SCREEN: "I asked an AI to grade my insurance. I scored a 51 out of 100." | (Text reveals with curiosity-building music) "I've been paying $180/month for 4 years." → "I thought I was fully covered." → "Ran my policy through a free AI tool called Policy Pilot." → "It reads your entire policy in 2 minutes." → "Then gives you a score." → "Mine? 51." → "It found 3 gaps I didn't know existed." → "Including one that could have cost me $40,000." | (Screen recording — Policy Pilot generating a score in real time) "What's your Policy Pilot Score? Find out in 2 minutes. It's free. Link below." |
| C8 | VOICEOVER: "There's a free AI tool that grades your insurance policy out of 100. The average score might shock you." | (Voiceover over b-roll — person on phone, insurance documents, laptop) "Most Americans pay hundreds of dollars a month for insurance they've never actually read. Policy Pilot is a free AI tool that connects to your insurance carrier, reads your actual policy, and gives you a score out of 100. It tells you where you're covered, where you're not, and where you might be overpaying — all in plain English. No insurance jargon. No sales pitch. Just your score and what it means." | (Screen recording — live demo of Policy Pilot running analysis, score appearing) "What's your Policy Pilot Score? Find out in 2 minutes. Completely free. Link below." |
| C9 | TEXT ON SCREEN: "'Full coverage' doesn't mean what you think it means." | (Text reveals, educational tone) "Most people think 'full coverage' = everything is covered." → "It's not." → "Full coverage just means liability + collision + comprehensive." → "It says NOTHING about:" → "• Whether your payout matches replacement cost" → "• Whether you have gap coverage if you're upside down on a loan" → "• Whether rental car or roadside is included" → "An AI can read your policy and tell you exactly what's covered in 2 minutes." | (Screen — Policy Pilot auto analysis breakdown) "Find out your Policy Pilot Score. See what 'full coverage' actually means for YOUR policy. Free." |

---

##### ANGLE 4: LIFE EVENT TRIGGERS

**Premise:** Target people at the exact moment insurance matters most — just bought a house, just got married, just had a baby, just bought a car, just moved to a new state. The hook self-selects the audience even with broad targeting. These people already have insurance on their mind; Policy Pilot gives them a reason to act NOW.

**LIFE EVENTS × REAL UGC FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| L1 | "We just closed on our first house. The first thing I did was NOT unpack — it was this." | (To camera, in new empty house) "Everyone told us 'make sure you get homeowners insurance' — so we did. But nobody told us to actually CHECK what that insurance covers. My friend told me about this free tool called Policy Pilot. You connect your insurance and an AI reads your entire policy and grades it. We got a 62. It flagged that our coverage limit was $50K below what it would actually cost to rebuild our house. We've been homeowners for 2 weeks and we were already under-insured." | (Show phone — score of 62, rebuilding cost gap flagged) "If you just bought a home, check your Policy Pilot Score before you unpack. 2 minutes. Free. It could save you everything." |
| L2 | "I just got married. Nobody told me my insurance was wrong now." | (To camera, casual) "When you get married, everything changes — your taxes, your beneficiaries, your health insurance. But nobody talks about your home and auto policies. I ran mine through Policy Pilot after the wedding and it flagged that my auto policy still only covered one driver, my beneficiary on my renters policy was still my mom, and my liability limits didn't account for shared assets. My Policy Pilot Score was a 48 — because literally nothing had been updated for my new life." | (Show screen — score of 48, outdated beneficiary flagged) "Just got married? Just moved in together? Check your Policy Pilot Score. Seriously. It's free." |
| L3 | "We just had a baby. First thing the nurse said: 'Did you update your insurance?' I had no idea what she meant." | (To camera, new parent energy) "Turns out when you have a kid, your insurance needs change a LOT. Life insurance beneficiaries, liability coverage, property coverage for baby equipment — it adds up fast. I had no clue where to start so I ran our policies through Policy Pilot. It flagged 4 things we needed to update. One of them was that our life insurance payout wouldn't even cover 2 years of childcare if something happened. That was a wake-up call." | (Show screen — Policy Pilot flagging life insurance and liability gaps) "New parent? Check your Policy Pilot Score. It tells you exactly what needs to change. Free. Link below." |

**LIFE EVENTS × AI UGC FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| L4 | "I just moved to a new state. Turns out my insurance doesn't work the way I thought it did here." | (AI character, confused/concerned) "I moved from Texas to Ohio for work. I figured my auto and renters insurance would just... transfer. Wrong. Different states have different minimum requirements, different coverage rules, different costs. My Texas policy had gaps that didn't matter in Texas but absolutely mattered in Ohio. I ran my policy through Policy Pilot and it flagged 3 things that were specific to my new state. My score was a 44 — and it would have been fine if I'd stayed in Texas." | (Screen — Policy Pilot showing state-specific flags) "Just moved? Your insurance probably needs updating. Find out your Policy Pilot Score — it's free and takes 2 minutes." |
| L5 | "Just bought a new car. Thought my insurance was good. It's not." | (AI character, just-discovered tone) "I bought a 2025 SUV. My auto insurance auto-updated the vehicle but that's it. The coverage limits? Same as what I had on my 2017 sedan. The loan on the new car is $45K. My policy payout maxes at $28K after depreciation. If I total this car tomorrow, I owe $17,000 on a car that doesn't exist. I found this out from Policy Pilot in 2 minutes. My agent never called to say 'hey, your coverage doesn't match your new car.'" | (Screen — Policy Pilot flagging gap between loan and payout) "Just got a new car? Check your Policy Pilot Score. You might have a gap you don't know about. Free." |
| L6 | "Just turned 26 and got kicked off my parents' insurance. Here's what nobody tells you." | (AI character, relatable young adult) "Everyone talks about health insurance when you turn 26. Nobody talks about everything else. My parents had me covered under their auto policy, their umbrella liability, their homeowners for my stuff in their house. Now I'm on my own and I have no idea if my new renter's policy actually covers my stuff, if my auto limits are high enough, or if I even have the right type of coverage. I ran everything through Policy Pilot and my score was a 39. Apparently I'm barely insured." | (Screen — score of 39) "Just got your own insurance for the first time? Find out your Policy Pilot Score before you find out the hard way. Free." |

**LIFE EVENTS × FACELESS FORMAT**

| # | Hook (0-3 sec) | Body (3-22 sec) | Score Reveal + CTA (22-30 sec) |
|---|---------------|-----------------|-------------------------------|
| L7 | TEXT ON SCREEN: "You just bought a house. Your insurance is probably already wrong." | (Text reveals with music) "Your lender required homeowners insurance." → "So you got a policy." → "But did anyone check if:" → "• Your coverage limit matches actual rebuilding costs?" → "• You have replacement cost vs. actual cash value?" → "• Your deductible makes sense for your savings?" → "• Flood and earthquake are covered (they usually aren't)?" → "Probably not." → "That's what Policy Pilot does." | (Screen recording — Policy Pilot analyzing homeowners policy) "Just bought a home? Find out your Policy Pilot Score before it's too late. 2 minutes. Free." |
| L8 | VOICEOVER: "3 insurance changes you NEED to make after getting married. Most people miss all of them." | (Voiceover over b-roll — wedding, moving boxes, couple at home) "Number one: your beneficiaries. If your life insurance still lists your parents or an ex, that's who gets the money — not your spouse. Number two: your auto policy. If you're sharing cars, both drivers need to be listed or claims get denied. Number three: your liability limits. You now have shared assets — your coverage should reflect that. Policy Pilot checks all of this in 2 minutes and tells you exactly what to fix." | (Screen recording — Policy Pilot showing beneficiary and liability flags) "Just got married? Check your Policy Pilot Score. See what needs to change. Free." |
| L9 | TEXT ON SCREEN: "New car. Same old insurance. Here's the $17,000 problem nobody warns you about." | (Text reveals, building tension) "You buy a $45,000 car." → "Your old insurance policy auto-updates the vehicle." → "But NOT the coverage limits." → "Your policy pays out based on depreciation." → "Day 1: your car is worth $45K." → "Insurance payout? $28K." → "You owe the bank $17,000 for a car that doesn't exist." → "This is called a 'gap coverage' problem." → "Policy Pilot flags it in 2 minutes." | (Screen — Policy Pilot auto analysis with gap coverage flag) "Just got a new car? Find out your Policy Pilot Score. Don't learn about gaps the hard way. Free." |

---

##### FUTURE ANGLE: Social Proof / Community (Unlocks With Scale)

Premise: Once Policy Pilot has volume, leverage social proof. "50,000 people have checked their Policy Pilot Score. The average American scores a 62. What will you get?"

Also includes the altruistic share angle: "Share this with someone you love. Make sure the people you care about are actually protected." This taps into the protective instinct and drives organic sharing alongside paid reach. Build these creatives once you have real data to reference.

##### Universal Creative Framework (Every Ad Follows This)

```
[0-3 sec]  HOOK — Pattern interrupt. Real story opener, shocking stat, or direct challenge.
[3-15 sec] STORY/PAIN — The real story. Specific details. Make the viewer FEEL it.
[15-22 sec] PIVOT — "That's exactly why we built Policy Pilot" / "This is what Policy Pilot catches"
[22-27 sec] SCORE REVEAL — Screen share showing the Policy Pilot Score + report highlights.
                           This is the money shot. The branded moment.
[27-30 sec] CTA — "Find out your Policy Pilot Score" / "See if you're actually protected"
                   ALWAYS use "Policy Pilot Score" language. Engrain the brand.
```

##### Branded Language Rules

ALWAYS say "Policy Pilot Score" — never just "score," "grade," or "result." Every ad, every touchpoint, every screen share should reinforce this exact phrase. The goal is to make "What's your Policy Pilot Score?" as instinctive as "What's your credit score?"

CTA variations (all use branded language):
- "Find out your Policy Pilot Score — it's free"
- "What's your Policy Pilot Score? Check in 2 minutes"
- "See if you're actually protected — get your Policy Pilot Score"
- "Your Policy Pilot Score could save you thousands"

##### Production Formats (Diversify — Don't Rely Solely on AI UGC)

| Format | Description | When to Use | Risk Level |
|--------|-------------|-------------|------------|
| **AI UGC (talking head)** | AI-generated character telling story, direct to camera | Primary format for story-based ads | Medium — Meta AI detection + uncanny valley risk in SAC |
| **Screen recording + voiceover** | Recording of Policy Pilot in action with narrated story | Score reveal ads, demo-style | Low — no face needed, high authenticity |
| **Text-on-screen story** | Text overlays telling the story with emotional music/b-roll | Fear/urgency angle, silent autoplay | Low — easy to produce at volume |
| **Faceless storytime** | Voiceover narration over relevant b-roll footage | Longer story ads (45-60 sec) | Low — feels like a mini-documentary |
| **Real UGC (Phase 2)** | Hire real creators at $150-300/video once revenue supports it | All angles — this is the endgame format | Lowest — maximum authenticity |

**Production specs for ALL formats:**
- 4:5 vertical (1080x1350px) for feed, 9:16 (1080x1920px) for Stories/Reels
- Bold white captions with dark background bar (for silent autoplay — 85% of feed views are muted)
- 15-30 seconds for cold traffic, up to 60 seconds for retargeting
- One CTA only — don't confuse with multiple asks
- Policy Pilot branding: lower third or end card with score visual
- Every ad ends with the Policy Pilot Score on screen — this is non-negotiable

##### AI UGC Risk Mitigation

Meta is tightening enforcement on AI-generated content, especially in regulated ad categories. Mitigation:
- Always have faceless backup creatives running alongside AI UGC
- Monitor ad rejection rates — if AI UGC starts getting flagged, shift budget to faceless formats immediately
- Test AI UGC quality rigorously before spending — if it looks even slightly off, it destroys trust for an unknown brand asking people to connect insurance accounts
- Plan to transition to real UGC creators once monthly ad spend supports $150-300/video production costs
- Keep AI UGC to no more than 50% of total creative volume at launch

#### Step 4: Metrics Dashboard (Track These Daily)

| Metric | How to Calculate | Target | Reality Check |
|--------|-----------------|--------|---------------|
| **CPM** | (Spend / Impressions) × 1,000 | Track only | SAC insurance typically $15-$40 CPM |
| **CTR** | Clicks / Impressions | >1% | Below 0.8% = creative problem |
| **CPC** | Spend / Clicks | Track only | Derived from CPM ÷ CTR |
| **CPL (Partial)** | Spend / Phone+Email captures | $5-$10 | This is your primary KPI |
| **Canopy Rate** | Canopy completions / Lead captures | TBD (establish baseline) | If <15%, funnel trust problem |
| **Analysis Rate** | AI analyses completed / Canopy completions | >80% | If low, product/UX problem |
| **Opt-in Rate** | Agent opt-ins / Analyses completed | TBD | This determines revenue |
| **CPQL** | Spend / Agent opt-ins | TBD | Cost Per Qualified Lead = what actually matters |
| **Frequency** | Avg times each person saw your ad | <2.0 in test phase | Above 3.0 = creative fatigue |

#### Step 5: Speed-to-Lead Protocol (Tom's Team)

| Response Time | Conversion Impact |
|---------------|-------------------|
| Under 5 minutes | 21x more likely to qualify |
| 5-30 minutes | Declining rapidly |
| Over 1 hour | Lead is essentially cold |

**Automated SMS (fires INSTANTLY on agent opt-in):**
> "Hey [Name], this is [Agent] from Policy Pilot. I just reviewed your policy analysis — I noticed a few things I'd love to walk you through. When's a good time to chat?"

**Tom's SOP:** Every opt-in gets a call within 5 minutes during business hours. After hours, automated SMS fires immediately and agent calls at 9AM next day. No exceptions.

---

### CHANNEL 2: ORGANIC CONTENT DISTRIBUTION — Execution Playbook

**Platforms:** TikTok, Instagram Reels, YouTube Shorts, Facebook Reels (same content, all platforms)

**Content Flywheel:** Organic content follows the same format styles and angles as Meta ad creatives (Fear, Anger, Curiosity, Life Events). What works as ads gets repurposed as organic content. What goes viral organically gets fast-tracked into the ad set as paid creative. Same hooks, same storytelling framework, same "Policy Pilot Score" branded language. The two channels feed each other.

**Reference creators to study:**

| Creator | Handle | Why Study Them |
|---------|--------|----------------|
| Robin Kiera | @robin_kiera | Insurance-specific; 150K followers; proved insurance content works on TikTok; built "CEO of Diggi" brand from insurance niche |
| Humphrey Yang | @humphreytalks | 2.3M+ followers; personal finance education including insurance; master of simple explainers |
| Vivian Tu | @your.richbff | 2.7M TikTok followers; covers insurance/mortgages; great hook writing and personality-driven content |
| Erika Kullberg | @erikakullberg | 9M+ followers; financial/legal tips; king of the fear/curiosity hook format |
| @jluisworld | @jluisworld | 300K followers; insurance agent in Tucson AZ; proves insurance agents CAN build TikTok audiences |

#### Step 1: Account Setup (Day 0)

| # | Task | Platform | Status |
|---|------|----------|--------|
| 1 | Create TikTok Business account | TikTok | [ ] |
| 2 | Create Instagram account (or optimize existing) | Instagram | [ ] |
| 3 | Create YouTube channel | YouTube | [ ] |
| 4 | Set bio link on all platforms → Policy Pilot landing page | All | [ ] |
| 5 | Write bio: "[Name] | Helping you understand your insurance policy | Free AI policy grade ↓" | All | [ ] |
| 6 | Set up Linktree or similar (optional) with Policy Pilot CTA | All | [ ] |

#### Step 2: Content Pillars & Calendar

**5 Content Pillars — rotate through these:**

| Pillar | Post Frequency | Example Videos |
|--------|---------------|----------------|
| **"Did You Know?" (Shock Facts)** | 2x/week | "Your landlord's insurance doesn't cover YOUR stuff," "Most auto policies have a $1,000 gap," "Home insurance doesn't cover floods in most states" |
| **Red Flag Series** | 2x/week | "3 red flags in your home insurance," "If your policy says THIS you're under-insured," "The one clause that lets your insurer deny everything" |
| **Myth Busting** | 1x/week | "No, bundling doesn't always save money," "Full coverage doesn't mean what you think," "Your insurance agent might be over-insuring you on purpose" |
| **Real Stories** | 1x/week | "My friend's claim was denied — here's the clause that killed it," "This family lost everything because of one missing coverage" |
| **Policy Pilot Demos** | 1x/week | Screen recording of AI analysis in action, showing a real grade, real red flags, real explanations |

#### Step 3: Weekly Production Schedule

| Day | Task | Time Required |
|-----|------|---------------|
| **Sunday** | Batch script 5-7 video scripts for the week (hooks + talking points) | 1 hour |
| **Monday** | Film 5-7 videos back-to-back (change shirts between takes for variety) | 1-2 hours |
| **Tuesday** | Edit + add captions. Schedule posts for Tue-Sat. | 1-2 hours |
| **Wed-Sat** | Posts go live (1/day minimum). Engage with every comment. Mine comments for content ideas. | 15 min/day |

**Total weekly time commitment: ~5-7 hours**

#### Step 4: Video Production Template

```
EVERY VIDEO FOLLOWS THIS STRUCTURE:

[0-3 sec] HOOK — pattern interrupt, question, shocking statement
[3-15 sec] CONTEXT — why this matters, who this affects
[15-25 sec] VALUE — the insight, the red flag, the tip
[25-30 sec] CTA — "Get your free policy grade — link in bio"

OPTIONAL LONGER FORMAT (45-60 sec):
[0-3 sec] HOOK
[3-20 sec] STORY — set the scene, create tension
[20-40 sec] REVEAL — what went wrong / what people don't know
[40-50 sec] SOLUTION — how to check / what to look for
[50-60 sec] CTA — "Want to know your score? Link in bio"
```

#### Step 5: Posting & Engagement Protocol

| Action | Frequency | Details |
|--------|-----------|---------|
| Post to TikTok | 1-2x daily (min 5x/week) | Prime posting times: 7AM, 12PM, 7PM (test and adjust) |
| Cross-post to Instagram Reels | Same day as TikTok | Repost identical video; adjust caption for IG |
| Cross-post to YouTube Shorts | Same day as TikTok | Repost identical video; add to "Insurance Tips" playlist |
| Cross-post to Facebook Reels | Same day as TikTok | Repost to Policy Pilot Facebook page |
| Reply to comments | Within 2 hours of posting | Reply to EVERY comment in first 24 hours. Ask questions back. This signals engagement to the algorithm. |
| Comment mining | Daily | Screenshot interesting comments. Turn them into future video topics: "Someone asked me [comment] — here's the answer" |
| Duet/Stitch trending content | 1-2x/week | React to viral insurance/finance clips with Policy Pilot perspective |

#### Step 6: Content Repurposing for Meta Ads

**Key play:** Your best-performing organic content becomes paid ad creative.

| Organic Metric | Threshold | Action |
|----------------|-----------|--------|
| Video gets >10K views organically | Strong signal | Repurpose as Meta ad creative — add to active ad set |
| Video gets >50K views organically | Very strong | Fast-track into ad set with ad spend — proven hook |
| Video gets high save/share rate | Strongest signal | This content resonates deeply — create 3 variations for paid |

This creates a flywheel: Organic content tests hooks for free → Winners become paid ads → Paid ads drive leads → Lead data informs new organic content ideas.

#### Step 7: Growth Milestones

| Timeline | Milestone | Action |
|----------|-----------|--------|
| Week 1-2 | 0-500 followers | Post consistently. Don't judge results yet. Test different hooks. |
| Week 3-4 | 500-2,000 followers | Identify which content pillars get most engagement. Double down. |
| Month 2 | 2,000-10,000 followers | Start seeing organic traffic to Policy Pilot. Cross-reference with analytics. |
| Month 3 | 10,000-25,000 followers | Organic leads are measurable. Begin monetizing top content as paid ads. |
| Month 6 | 25,000-100,000 followers | Organic channel is generating meaningful, FREE leads alongside paid. |

---

### CHANNEL 3: REFERRAL / VIRAL LOOPS — Execution Playbook

**Owner: Tucker (product build) + Brandon (copy/design)**

---

#### Part 1: Results Page UX Flow — Where Everything Lives

The results page is the most important page in the entire product. It's where the score is revealed, where sharing happens, where the agent opt-in lives, and where the PDF is downloaded. The ORDER of these elements matters — get it wrong and you either kill agent conversions or kill sharing. Here's the flow:

```
RESULTS PAGE — FULL UX FLOW (Top to Bottom)

┌─────────────────────────────────────────────────┐
│  SECTION 1: SCORE REVEAL (Hero — Above the Fold)│
│                                                   │
│  ┌───────────────────────────────────┐           │
│  │        YOUR POLICY PILOT SCORE     │           │
│  │                                     │           │
│  │            ┌─────┐                  │           │
│  │            │ 54  │  ← Big number,   │           │
│  │            │/100 │     animated      │           │
│  │            └─────┘     count-up      │           │
│  │           Grade: D                   │           │
│  │   ● 3 Coverage Gaps Found           │           │
│  │   ● 1 Area of Overpayment           │           │
│  │   "Your policy has significant gaps" │           │
│  └───────────────────────────────────┘           │
│                                                   │
│  ┌─ MICRO-SHARE OVERLAY (3-4 sec) ──────────┐    │
│  │  Score card image + single "Share" button  │    │
│  │  Captures impulse share at emotional peak   │    │
│  │  If tapped → opens share drawer             │    │
│  │  If ignored → fades away, user scrolls      │    │
│  └────────────────────────────────────────────┘    │
│  ↑ Does NOT block the page. Auto-dismisses.       │
├─────────────────────────────────────────────────┤
│  SECTION 2: AI ANALYSIS BREAKDOWN                 │
│                                                   │
│  Full detailed analysis. Section by section:      │
│  • Coverage Gaps (red flags, plain English)        │
│  • Over-Insured Areas (what you're overpaying for)│
│  • What Looks Good (positive reinforcement)        │
│  • Plain-English Policy Summary                    │
│                                                   │
│  [Download PDF Report]                             │
├─────────────────────────────────────────────────┤
│  SECTION 3: AGENT CTA (Primary Conversion)        │
│                                                   │
│  "Want an expert to walk you through this?"        │
│  "A licensed agent can help you fix these gaps     │
│   — for free. No obligation."                      │
│                                                   │
│  [ Talk to an Expert — It's Free ]  ← BIG button  │
│                                                   │
│  "No thanks, I'm good for now"  ← text link       │
├─────────────────────────────────────────────────┤
│  SECTION 4: SHARE BLOCK (Post-Decision)           │
│  ↑ This appears AFTER they click agent CTA        │
│    OR click "No thanks"                            │
│                                                   │
│  "Before you go — the people you care about        │
│   deserve to know if they're protected too."        │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │  SHARE OPTIONS (see details below)   │          │
│  │  • Share with my score               │          │
│  │  • Share without my score             │          │
│  │  • Send to a specific person (SMS)    │          │
│  └─────────────────────────────────────┘          │
└─────────────────────────────────────────────────┘
```

**Why this order:**
- **Score at top** = emotional peak. This is the moment they feel something.
- **Micro-share overlay at score reveal** = captures the impulse "holy shit" share. It's a 3-4 second non-blocking overlay with the score card image and a single Share button. If they tap it, share drawer opens. If they ignore it, it fades and they keep scrolling. This does NOT compete with the agent CTA because it's above it — and it auto-dismisses. You get two bites at the share apple: impulse (here) and considered (Section 4).
- **Analysis second** = builds understanding. Now they KNOW their gaps. This makes the agent CTA more compelling ("I have real problems to fix") AND makes the share more meaningful ("I need to warn people").
- **Agent CTA third** = the money shot. Nothing interrupts the path to conversion. No share block competing for attention before this.
- **Share block LAST** = appears after they've made their agent decision (yes or no). This is intentional. People who opt in for an agent are your MOST engaged users — they're the most likely to share. People who decline the agent still get one more low-friction action before they leave. Either way, the share prompt is the last thing they see.

---

#### Part 2: The Policy Pilot Score Card

**Score Display (On-Page)**

The score is the centerpiece of the results page. It should feel like a moment — not just a number on a screen.

**Design specs:**

| Element | Spec |
|---------|------|
| Score number | Large font (72px+), bold, centered. Animated count-up from 0 to actual score (1.5 second animation). |
| Score circle/gauge | Circular progress indicator around the number. Fills as the count-up animates. |
| Color coding | Red (0-49), Orange (50-64), Yellow (65-79), Green (80-100) |
| Letter grade | Displayed below or beside score: F (0-49), D (50-64), C (65-79), B (80-89), A (90-100) |
| Summary line | 1 sentence below score: "Your policy has significant gaps" / "Your policy has room for improvement" / "Your policy looks solid" |
| Key findings pills | 2-3 short pills below summary: "● 3 Coverage Gaps" "● 1 Overpayment" "● Flood not covered" |

**Shareable Score Card (Auto-Generated Image)**

When the user decides to share, Policy Pilot auto-generates a branded image they can send or post. Two versions:

**Version A: Score Card WITH Score (Default)**

```
┌──────────────────────────────────┐
│       ★ POLICY PILOT SCORE ★      │
│                                    │
│              54/100                 │
│             Grade: D                │
│                                    │
│    "3 coverage gaps found"          │
│                                    │
│  ─────────────────────────────     │
│  Do you know YOUR score?            │
│  Get your free Policy Pilot Score   │
│  → PolicyPilot.com                  │
└──────────────────────────────────┘
```

- 1080x1080 (feed) and 1080x1920 (stories) versions
- Color-coded background matches score color
- Clean, bold, screenshot-friendly
- PolicyPilot.com URL always visible
- QR code in bottom corner (links to PolicyPilot.com with referral tracking)

**Version B: Score Card WITHOUT Score (Privacy Option)**

```
┌──────────────────────────────────┐
│       ★ POLICY PILOT ★            │
│                                    │
│   I just checked my insurance      │
│   with Policy Pilot.               │
│                                    │
│   What I found surprised me.       │
│                                    │
│  ─────────────────────────────     │
│  Do you know YOUR score?            │
│  Get your free Policy Pilot Score   │
│  → PolicyPilot.com                  │
└──────────────────────────────────┘
```

- Same dimensions and branding
- No score displayed — just the teaser
- For users who don't want to share their actual number but still want to refer

---

#### Part 3: The Share Block — Copy & Persuasion Framework

**Core framing: "Protect the people you care about."**

This is NOT a typical "refer a friend, get a reward" play. The emotional angle is: you just learned something important about your own coverage — the people you love might be at risk too, and they don't know it. Sharing isn't a favor to Policy Pilot. It's a favor to the people in your life. If you care about them, you'll make sure they know.

**Share Block — On-Page Copy (Section 4 of results page)**

The share block appears immediately after the user either clicks the agent CTA or declines it. Here's the copy:

**Headline:**
> "The people you care about deserve to know if they're protected."

**Body:**
> "You just found out things about your insurance that you didn't know before. Your family, your friends, the people you love — they probably don't know either. It takes 2 minutes. Share Policy Pilot with someone who matters to you."

**Alternate headlines to A/B test:**
- "Don't let someone you love find out the hard way."
- "You checked yours. Now help someone you care about check theirs."
- "If you care about someone, make sure they're protected."
- "Most people don't know what their insurance actually covers. Now you do. Share it."

**Share Options (3 paths):**

| Option | Button Label | What Happens |
|--------|-------------|--------------|
| **1. Share with score** | "Share My Policy Pilot Score" | Opens share drawer with pre-generated score card image (Version A) + pre-written message. User picks: SMS, email, Facebook, Instagram Stories, Twitter/X, Copy Link. |
| **2. Share without score** | "Share Policy Pilot (without my score)" | Opens share drawer with score-free card (Version B) + pre-written message. Same channel options. |
| **3. Send to someone specific** | "Send to Someone I Care About" | **SMS path:** Opens user's native text app with pre-filled message (Policy Pilot NEVER sends the SMS directly — TCPA compliance). **Email path:** User enters friend's email, Policy Pilot sends branded email on user's behalf (CAN-SPAM compliant with unsubscribe). |

---

#### Part 4: Referral Messages — What the Friend Receives

Every referral message must feel personal, not corporate. It should read like a real text from someone who cares, not a marketing blast. All messages include a unique referral tracking link.

##### SMS Referral Messages (Pre-Written — User Chooses or Edits)

**Option 1: Score included, caring tone (Default)**
> "Hey — I just ran my insurance through this free AI tool called Policy Pilot. My score was a [Score] out of 100... it found gaps I had no idea about. I want to make sure you're actually covered too. It takes 2 minutes and it's free: [link]"

**Option 2: No score, protective tone**
> "Hey, I just found out some things about my insurance policy that kind of scared me. There's a free tool that checks if you're actually protected — I'd feel terrible if something happened and I didn't tell you about it. Takes 2 minutes: [link]"

**Option 3: No score, casual/light tone**
> "Have you ever actually checked what your insurance covers? I just ran mine through this AI tool and learned more in 2 minutes than my agent told me in 3 years. You should try it — it's free: [link]"

**Option 4: Direct and simple**
> "Check your insurance — seriously. This free tool tells you if you have gaps or if you're overpaying. I just did mine and I'm glad I did: [link]"

##### Email Referral Message (Auto-Sent When User Enters Friend's Email)

**Subject line:** "[First Name] wants you to check your insurance policy"

**Body:**
> Hi [Friend Name],
>
> [First Name] used Policy Pilot — a free AI tool that analyzes your insurance policy and gives you a score out of 100. They thought you should check yours too.
>
> Most people don't realize they have coverage gaps or that they're overpaying until it's too late. Policy Pilot reads your actual policy in 2 minutes and tells you — in plain English — exactly where you stand.
>
> It's completely free. No sales pitch. No obligation.
>
> **[Check Your Policy Pilot Score →]** (button linking to PolicyPilot.com with referral code)
>
> — The Policy Pilot Team
>
> *[First Name] shared this with you because they care about you being protected.*

##### Social Media Share (Pre-Written Caption + Score Card Image)

**With score:**
> "Just found out my Policy Pilot Score is [Score] out of 100. Didn't realize my insurance had [X] gaps. If you haven't checked yours, you should — it's free and takes 2 minutes. PolicyPilot.com"

**Without score:**
> "I just ran my insurance through Policy Pilot. What it found surprised me. If you pay for insurance but have never actually checked what it covers, try this — it's free: PolicyPilot.com"

##### "Send to Someone I Care About" — Direct Send Flow

**CRITICAL — TCPA COMPLIANCE:**
The SMS path must NEVER have Policy Pilot send the text directly to the friend. The friend hasn't opted in — that's a TCPA violation. Instead, the SMS path opens the user's native text app with the message pre-filled. The user physically hits send from their own phone. The email path is fine — CAN-SPAM allows transactional/relationship emails from a third party with an unsubscribe link.

When user clicks "Send to Someone I Care About":

```
STEP 1: Choose how to send
┌──────────────────────────────────────────────┐
│  Who do you want to protect?                  │
│                                                │
│  Name: [_____________]                         │
│                                                │
│  How do you want to reach them?                │
│  ○ Text message (opens your texting app)       │
│  ○ Email (we'll send on your behalf)           │
│  ○ WhatsApp (opens WhatsApp)                   │
│                                                │
│  [If Email selected]: Their email: [________]  │
│                                                │
│  Message style:                                │
│  ○ "I care about you" (protective)             │
│  ○ "You should see this" (casual)              │
│  ○ "I found something" (curiosity)             │
│  ○ Write my own                                │
│                                                │
│  ☐ Include my score                            │
│                                                │
│  [ Send It ]                                   │
└──────────────────────────────────────────────┘
```

**What happens when they hit "Send It":**
- **Text message:** Opens native SMS app with pre-filled message + referral link. User hits send themselves.
- **Email:** Policy Pilot sends the email directly from Policy Pilot's system on the user's behalf. Includes unsubscribe link (CAN-SPAM). User sees confirmation screen.
- **WhatsApp:** Opens WhatsApp with pre-filled message + referral link. User hits send themselves.

**STEP 2: Confirmation**
> "Done! You might have just saved [Name] from a disaster they didn't see coming."

**Message templates for each style:**

| Style | Message Sent |
|-------|-------------|
| **Protective** | "Hey [Friend Name] — I just used this free tool to check my insurance and it found some things I had no idea about. I want to make sure you're covered too. It takes 2 minutes: [link]" |
| **Casual** | "Hey [Friend Name] — have you ever checked what your insurance actually covers? I just ran mine through this AI tool and it was eye-opening. You should try it — it's free: [link]" |
| **Curiosity** | "Hey [Friend Name] — I found something interesting about my insurance and I think you should check yours too. Takes 2 minutes: [link]" |

##### Family Check — Group Share

**The "protect your family" play.** Instead of sharing with one person, give users the option to send to multiple people at once.

**Prompt (appears as option in the share block):**
> "Want to make sure your whole family is protected? Send Policy Pilot to the people who matter most."

```
┌──────────────────────────────────────────────┐
│  Protect Your Family                          │
│                                                │
│  Person 1: [Name] [Phone or Email]             │
│  Person 2: [Name] [Phone or Email]  + Add more │
│  Person 3: [Name] [Phone or Email]             │
│                                                │
│  Message style: (same options as above)         │
│  ☐ Include my score                            │
│                                                │
│  [ Send to All ]                               │
└──────────────────────────────────────────────┘
```

- Supports 2-5 people per batch
- Same TCPA rules: SMS opens native app per person, email sends from Policy Pilot
- Each person gets a unique referral link tied to the original user
- Confirmation: "Sent to [X] people. You're looking out for the people who matter."
- This dramatically increases invites-per-user, which is the first variable in the K-factor equation

---

#### Part 5: PDF Report — Built-In Sharing

The downloadable PDF report is a referral vehicle itself. Every PDF should plant the seed to share.

**On EVERY page of the PDF:**
- Policy Pilot logo + URL in header/footer
- QR code in bottom corner (links to PolicyPilot.com with user's referral code)

**After the analysis section, a dedicated share page:**

> **Know someone who needs this?**
>
> Most people don't know what their insurance actually covers until something goes wrong. If you care about someone — a family member, a friend, a roommate — share this tool with them.
>
> **PolicyPilot.com** — Free AI insurance policy analysis
>
> [QR CODE]
>
> *"The people you care about deserve to know if they're protected."*

**Last page of PDF:**
> Your Policy Pilot Score: [Score]/100
>
> Want to discuss your results with a licensed expert?
> Visit PolicyPilot.com or call [phone number]
>
> Know someone who should check their policy?
> Share PolicyPilot.com — it's free and takes 2 minutes.

---

#### Part 6: Referral Tracking & Metrics

**Every share link includes a unique referral code** tied to the original user. Track the full chain:

| Metric | How to Calculate | Target |
|--------|-----------------|--------|
| **Share rate** | Users who share / Total users who complete analysis | >15% |
| **K-factor** | (Shares per user) × (conversion rate of shared links) | >0.2 (1 in 5 shared links converts) |
| **Viral CPL** | $0 — these are free leads | $0 |
| **Referral conversion rate** | Referred users who complete analysis / Total referred clicks | Track and optimize |
| **Share method breakdown** | Which channels drive the most referrals: SMS vs email vs social vs direct send | Track — optimize copy for top channel |
| **Score-shared vs. no-score** | Conversion rate of referred links from score cards vs. no-score cards | Track — determine which drives more referrals |

**If K-factor reaches 1.0 or above, the product grows virally without any ad spend.** That's the dream state. Realistic target: K-factor of 0.15-0.3, meaning every 5-7 users brings in one new user.

#### Part 7: Referral Incentives (Phase 2 — Build After Proving Model)

Once the base sharing mechanics are working, add incentive layers:

| Referral Count | Reward |
|----------------|--------|
| 1 friend completes analysis | Unlock expanded insights in your report |
| 3 friends complete analysis | Free annual re-analysis reminder (auto-check yearly) |
| 5 friends complete analysis | Priority agent consultation (skip the queue) |
| 10 friends complete analysis | "Policy Pilot Advocate" badge + early access to new features |

**Important:** The altruistic framing ("protect someone you love") should ALWAYS be the primary motivator. Incentives are secondary accelerants, not the core reason to share. If the sharing copy is working without incentives, don't muddy it by leading with rewards.

#### Part 8: Post-Agent-Call Share Trigger (Highest-Intent Share Moment)

There's a second emotional peak that most referral systems miss entirely: the moment AFTER the agent call. If Tom's agent calls the user, walks them through their policy, and they feel genuinely helped — that's when they're most likely to share. They've experienced the full value chain: ad → analysis → score → real human help.

**Trigger:** Automated SMS sent 30-60 minutes after the agent call ends.

**Copy options (A/B test):**

> **Option A (Protective):**
> "Hey [Name], we're glad we could help you understand your policy. The people you care about might have the same gaps and not know it. Share Policy Pilot with them — it could make all the difference: [referral link]"

> **Option B (Simple):**
> "Hey [Name], glad we could help today. Know someone who should check their policy too? Share Policy Pilot with them — it's free: [referral link]"

> **Option C (Emotional):**
> "Hey [Name], now that you know where you stand, make sure the people you love aren't at risk either. Share Policy Pilot: [referral link]"

**Why this works:** Pre-agent-call users are curious. Post-agent-call users are GRATEFUL. Gratitude is the strongest sharing motivator. This single SMS could have a higher share-through rate than everything on the results page combined.

**Add to Sequence C (Agent Handoff Nurture):** This becomes touchpoint C6 in the existing nurture sequence.

#### Part 9: User Referral Dashboard

If someone shares with 5 friends, they currently have no idea if any of them checked their score. That's a missed feedback loop.

**Build a simple "Your Shares" section** accessible from the user's results page (or via a link in their email/SMS):

```
┌──────────────────────────────────────────────┐
│  YOUR SHARES                                  │
│                                                │
│  You've shared Policy Pilot with 3 people.     │
│  1 has checked their Policy Pilot Score. ✓      │
│  2 haven't checked yet.                        │
│                                                │
│  ┌────────────────────────────────────┐       │
│  │ Sarah M.    ✓ Checked (Score: 71)  │       │
│  │ Jake T.     ✗ Hasn't checked yet   │       │
│  │ Mom         ✗ Hasn't checked yet   │       │
│  └────────────────────────────────────┘       │
│                                                │
│  [ Remind Jake & Mom → ]                       │
│  [ Share with someone else → ]                 │
└──────────────────────────────────────────────┘
```

**Why this matters:**
- Seeing that a share WORKED (Sarah checked) is positive reinforcement — encourages more sharing
- Seeing that Jake and Mom HAVEN'T checked creates a nudge: "Remind them" button re-sends the message
- The reminder capability turns a single share into a recurring re-engagement loop
- Tracking friend-of-friend conversions lets you measure true viral chains

#### Part 10: Score Context — State & National Averages (Unlocks With Scale)

Right now the Policy Pilot Score exists in a vacuum. A "54" means nothing without context. Once you have sufficient data (1,000+ analyses minimum), display averages:

**On the results page, below the score:**
> "Your score: 54 | Average in Georgia: 61 | National average: 58"

**On the shareable score card:**
> "54/100 — Below average in your state"

**Why this matters:**
- Transforms an abstract number into a meaningful comparison
- "Below average" is a powerful emotional trigger — nobody wants to be below average
- Makes the score card dramatically more shareable (people share comparisons, not standalone numbers)
- Creates content marketing opportunities: "The Most Under-Insured States in America" → publish annual data reports
- Feeds the brand moat: Policy Pilot becomes the SOURCE of insurance coverage data

**Plan for this in the UI now** (placeholder text: "Average scores coming soon") even though the data won't be ready until you have volume.

#### Part 11: Re-Share Triggers (Ongoing Viral Touchpoints)

The results page share prompt fires once. But there are natural moments throughout the customer lifecycle to re-trigger sharing:

| Trigger | Timing | Message |
|---------|--------|---------|
| **Annual re-analysis** | 12 months after first score | "Your Policy Pilot Score changed from 54 to 71! Share your progress — and remind the people you care about to check theirs: [link]" |
| **Life event prompts** | Detected via nurture sequences or user input | "Just got married? Make sure your partner checks their Policy Pilot Score too: [link]" |
| **Seasonal/weather events** | Hurricane season, wildfire season, major storms in user's state | "With [event] in [State], now's the time to make sure the people you care about are protected. Share Policy Pilot: [link]" |
| **Score improvement** | When user re-analyzes and score goes up | "Your Policy Pilot Score went up! You're more protected now. Help someone you love do the same: [link]" |
| **Holiday nudges** | Key gifting/family moments (Thanksgiving, New Year's) | "This holiday season, give the people you love something that actually matters — peace of mind. Share Policy Pilot: [link]" |

**Why this matters:** Every re-share trigger is a free lead opportunity at a moment when the user already has a reason to care. These aren't cold prompts — they're contextually relevant. The weather event trigger is especially powerful because it's tied to real urgency: "Your friend's house could be at risk RIGHT NOW."

---

### CHANNEL 4: EMAIL / SMS NURTURE — Execution Playbook

**Owner: Brandon (copy) + Tucker (automation setup)**

**Tool recommendations:** Twilio (SMS), SendGrid or Mailchimp (Email), or all-in-one like GoHighLevel

#### Automation Architecture

```
USER ENTERS FUNNEL
     ↓
[Lead captures phone + email]
     ↓
     ├── DOES NOT complete analysis ──→ FLOW 1: RECOVERY (3 SMS + 3 Email)
     │                                        ↓
     │                                  [If they come back and complete] → enters post-analysis flows
     │
     └── COMPLETES analysis ──→ Score revealed on results page
                                     ↓
                               OPTS IN for agent? ──YES──→ AGENT HANDOFF SEQUENCE
                                     │                          ↓
                                     │                    (After agent call)
                                     │                          ↓
                                     NO                    FLOW 2: REVIEW REQUEST
                                     │                          ↓
                                     │                    FLOW 3: REFERRAL / SHARE
                                     │
                                     └──→ FLOW 2: REVIEW REQUEST (delayed)
                                               ↓
                                          FLOW 3: REFERRAL / SHARE
```

**Timing logic:**
- Flow 1 fires for anyone who enters lead info but doesn't complete the analysis
- Agent Handoff fires immediately for anyone who opts in for an agent
- Flow 2 (Review) fires 3-5 days after analysis completion (or 1-2 days after agent call if they opted in — give them time to have the conversation first)
- Flow 3 (Referral) fires after Flow 2 completes (or 7+ days after analysis)
- If someone in Flow 1 comes back and completes their analysis, they EXIT Flow 1 and enter the post-analysis path

---

#### FLOW 1: INCOMPLETE POLICY RECOVERY

**Who gets this:** Anyone who entered their phone/email but did NOT complete the analysis (dropped off before or during Canopy Connect, or before AI analysis finished).

**Goal:** Get them back. NOW. These people showed intent — they clicked an ad, they gave you their contact info. Something stopped them. Every hour that passes, the urgency fades. These messages need to hit hard.

**Strategy:** Message 1 is the hot lead — sent within 1 hour while it's still top of mind. Messages 2 and 3 escalate the urgency and fear. The tone isn't gentle reminders. It's "you started this for a reason, and that reason hasn't gone away."

##### Flow 1 — SMS Messages

**SMS 1 — Sent within 1 hour of drop-off**

> "Hey [Name] — you were about to find out if your insurance actually protects you. You're 2 minutes away from your Policy Pilot Score. Most people who finish find at least one gap they didn't know about. Don't leave that unanswered: [link]"

**Why this works:** It's immediate, references what they started, introduces the branded "Policy Pilot Score" term, and drops a stat that creates curiosity ("at least one gap"). The link takes them back to exactly where they left off.

**SMS 2 — Sent 24 hours after drop-off**

> "[Name] — quick question. If something happened to your home, car, or apartment tomorrow, do you know for sure your insurance would cover it? That's what your Policy Pilot Score tells you. You were 2 minutes away from knowing. Finish it: [link]"

**Why this works:** It paints a scenario. "If something happened tomorrow" — now they're visualizing the disaster. The question is rhetorical because nobody can answer it confidently. The uncertainty IS the urgency.

**SMS 3 — Sent 72 hours after drop-off**

> "[Name] — 3 out of 4 people who check their Policy Pilot Score find something their insurance doesn't cover. You started checking yours but didn't finish. Whatever stopped you, this takes 2 minutes and it's free. You owe it to yourself to know: [link]. Reply STOP to opt out."

**Why this works:** Hard stat (even if approximate — refine with real data later). "You owe it to yourself" is a guilt trigger that isn't aggressive — it's self-directed. The "whatever stopped you" acknowledges friction without excusing it. This is the last push before they go cold.

**SMS 4 (Alt for slot 1) — Within 1 hour**

> "Hey [Name] — you started your free Policy Pilot analysis but didn't finish. It takes 2 minutes and it could change the way you look at your insurance. Your session is still open: [link]"

**SMS 5 (Alt for slot 2) — 24 hours**

> "[Name] — most people assume their insurance covers everything. It usually doesn't. You were about to find out where yours falls short. Your Policy Pilot Score is waiting: [link]"

##### Flow 1 — Email Messages

**Email 1 — Sent within 1 hour of drop-off**

> **Subject:** You were 2 minutes away from your Policy Pilot Score
>
> [Name],
>
> You started something important — finding out whether your insurance actually protects you the way you think it does.
>
> You didn't finish. And I get it — connecting your insurance account feels like a big step. But here's what you need to know: Policy Pilot doesn't sell your data. We don't share anything without your permission. We just read your policy and tell you what it actually says — in plain English.
>
> Most people who finish their analysis find at least one coverage gap they had no idea about. Some find out they've been overpaying for years.
>
> Your session is still open. It takes 2 minutes.
>
> **[Find Out Your Policy Pilot Score →]** (button)
>
> You clicked that ad for a reason. That reason hasn't gone away.
>
> — The Policy Pilot Team

**Why this works:** Addresses the most likely friction point head-on (trust/data fears). Reframes the value. "You clicked that ad for a reason" is a powerful callback — they DID take action, and this reminds them of the original intent.

**Email 2 — Sent 48 hours after drop-off**

> **Subject:** What you don't know about your insurance could cost you everything
>
> [Name],
>
> Here's something most people don't realize until it's too late:
>
> Your insurance policy is a contract. Buried inside that contract are clauses that determine whether you get paid or denied when something goes wrong. Most people have never read those clauses. Most insurance agents don't explain them.
>
> That's why we built Policy Pilot. An AI reads your actual policy — every page, every clause — and tells you in plain English:
>
> - Where you have coverage gaps that could cost you thousands
> - Where you might be overpaying for things you don't need
> - What your policy ACTUALLY covers vs. what you think it covers
>
> Your score is waiting. It takes 2 minutes. And it's completely free.
>
> **[Get Your Policy Pilot Score →]** (button)
>
> A family in Ohio found out their "full coverage" auto insurance only paid $4,000 on a $22,000 car. They didn't know about the depreciation clause on page 11.
>
> Do you know what's on page 11 of YOUR policy?
>
> — The Policy Pilot Team

**Why this works:** Opens with fear ("cost you everything"), educates on WHY this matters, then drops a real story at the end that lands like a punch. The "page 11" line is specific enough to feel real and vague enough to create paranoia. Nobody has read page 11.

**Email 3 — Sent 72 hours after drop-off (same day as SMS 3)**

> **Subject:** Last call, [Name]. Your free insurance analysis is expiring.
>
> [Name],
>
> We keep your session open for a limited time. Yours is about to close.
>
> I don't know why you didn't finish — maybe you got busy, maybe you weren't sure if it was worth it. But I'll tell you what I tell everyone:
>
> If you pay for insurance and you've never had someone (or something) actually read your policy and explain it to you, you're guessing. And guessing is fine — until it isn't.
>
> The people who finish their Policy Pilot analysis say the same thing: "I had no idea."
>
> 2 minutes. Free. No sales pitch.
>
> **[Complete Your Analysis Before It Expires →]** (button)
>
> After this, your session closes and you'd need to start over.
>
> — The Policy Pilot Team

**Why this works:** Manufactured scarcity (session expiring) combined with FOMO ("the people who finish say the same thing"). The conversational tone ("I don't know why you didn't finish") makes it feel like a real person, not a marketing automation. The "you're guessing" line is simple, true, and uncomfortable.

**Email 4 (Alt for slot 1) — Within 1 hour**

> **Subject:** Your Policy Pilot Score is almost ready, [Name]
>
> [Name],
>
> You were about to find out something most people never learn about their insurance — whether it actually protects you.
>
> You stopped before finishing, and that's okay. But your session is still open and it only takes 2 minutes to complete.
>
> Here's what you'll get: a Policy Pilot Score out of 100, a plain-English breakdown of your coverage, and a clear picture of any gaps or overpayments hiding in your policy.
>
> No cost. No sales pitch. Just clarity.
>
> **[Get Your Policy Pilot Score →]** (button)
>
> — The Policy Pilot Team

**Email 5 (Alt for slot 2) — 48 hours**

> **Subject:** [Name], are you sure you're actually covered?
>
> [Name],
>
> That's not a rhetorical question. Most people think their insurance covers everything. Then something happens — a fire, a flood, a car accident — and they find out it doesn't.
>
> The difference between "covered" and "not covered" is usually one clause buried somewhere in your policy. A clause you've never read. A clause nobody explained to you.
>
> Policy Pilot reads every clause. In 2 minutes. And tells you — in plain English — exactly where you stand.
>
> You started this. Finish it.
>
> **[Find Out Your Policy Pilot Score →]** (button)
>
> — The Policy Pilot Team

---

#### FLOW 2: REVIEW REQUEST

**Who gets this:** Anyone who completed their Policy Pilot analysis. Fires 3-5 days after analysis (or 1-2 days after agent call if they opted in).

**Goal:** Get them to leave a review/testimonial. These reviews become UGC fuel for ads and social proof for the landing page.

**Strategy:** 3 messages. Start with a simple ask, then make it easy, then tie it to the altruistic mission. Don't be aggressive — they already got value from the tool. The ask is a favor, not a demand.

##### Flow 2 — SMS Messages

**SMS 1 — Sent 3 days after analysis (or 1 day after agent call)**

> "Hey [Name] — you checked your Policy Pilot Score a few days ago. We'd love to hear what you thought. Good, bad, surprising — your honest feedback helps us make this better for everyone. Takes 30 seconds: [review link]"

**SMS 2 — Sent 48 hours after SMS 1 (if no review submitted)**

> "[Name] — real quick: did Policy Pilot help you understand your insurance better? A short review from you helps other people decide to check theirs too. 30 seconds: [review link]"

**SMS 3 — Sent 48 hours after SMS 2 (if still no review)**

> "Last ask, [Name]. Your review on Policy Pilot could be the reason someone else checks their policy and avoids a disaster they didn't see coming. If it helped you, pay it forward: [review link]. Reply STOP to opt out."

**SMS 4 (Alt for slot 1) — 3 days after analysis**

> "Hey [Name] — we built Policy Pilot to help people like you understand their insurance. Did it work? A 30-second review helps us know: [review link]"

**SMS 5 (Alt for slot 2) — 48 hours after SMS 1**

> "[Name] — were you surprised by your Policy Pilot Score? A quick review helps other people decide if it's worth checking theirs. Takes 30 seconds: [review link]"

##### Flow 2 — Email Messages

**Email 1 — Sent 3 days after analysis (or 1 day after agent call)**

> **Subject:** How was your Policy Pilot experience, [Name]?
>
> [Name],
>
> You checked your Policy Pilot Score a few days ago. We'd love to hear what you thought.
>
> Your honest feedback — whether it was helpful, confusing, eye-opening, or just okay — helps us improve the tool for everyone who comes after you.
>
> It takes about 30 seconds:
>
> **[Leave Your Review →]** (button)
>
> No pressure. We just genuinely want to know.
>
> — The Policy Pilot Team

**Email 2 — Sent 48 hours after Email 1 (if no review)**

> **Subject:** Your opinion matters (and it might help someone)
>
> [Name],
>
> We're building Policy Pilot to help people understand their insurance before it's too late. But we can only do that if people trust us enough to try it.
>
> That's where you come in. A quick review from you helps the next person decide whether Policy Pilot is worth 2 minutes of their time.
>
> If it helped you see something you didn't know about your policy — say that. If it could be better — say that too. We read every review.
>
> **[Leave a Quick Review →]** (button)
>
> — The Policy Pilot Team

**Email 3 — Sent 48 hours after Email 2 (if still no review)**

> **Subject:** One last ask, [Name]
>
> [Name],
>
> We won't ask again after this. But here's why this matters:
>
> Most people don't check their insurance until something goes wrong. The biggest reason? They don't know tools like Policy Pilot exist. Your review — even a single sentence — helps change that.
>
> If Policy Pilot showed you something about your policy that you didn't know before, that's worth sharing. Not for us. For the next person.
>
> **[Share Your Experience →]** (button)
>
> Thanks for using Policy Pilot. We hope it gave you clarity.
>
> — The Policy Pilot Team

**Email 4 (Alt for slot 1) — 3 days after analysis**

> **Subject:** Did Policy Pilot show you something you didn't expect?
>
> [Name],
>
> When you checked your Policy Pilot Score, did anything surprise you? A coverage gap you didn't know about? An area where you were overpaying?
>
> We'd love to hear about it. Your feedback — even just a sentence or two — helps us improve the tool and helps other people decide if it's worth trying.
>
> **[Tell Us What You Found →]** (button)
>
> — The Policy Pilot Team

**Email 5 (Alt for slot 3) — 48 hours after Email 2**

> **Subject:** 30 seconds, [Name]. That's all we're asking.
>
> [Name],
>
> We're not going to keep asking after this. But here's why a quick review matters:
>
> Right now, someone is staring at a Policy Pilot ad wondering if it's legit. They're on the fence. A real review from a real person — you — could be what pushes them to check their policy before something goes wrong.
>
> That's it. That's the ask. 30 seconds.
>
> **[Leave a Review →]** (button)
>
> — The Policy Pilot Team

**Where reviews go:** Decide platform priority — Google Reviews, Trustpilot, or on-site testimonial form. Recommendation: start with on-site testimonial form (easiest for user, gives you content control for UGC ads), then expand to Google/Trustpilot once volume supports it.

---

#### FLOW 3: REFERRAL / SCORECARD SHARE

**Who gets this:** Anyone who completed their analysis. Fires after Flow 2 completes (approximately 7-10 days after analysis), OR immediately after they submit a review (strike while the iron is hot — someone who just left a positive review is primed to share).

**Goal:** Get them to share their scorecard or Policy Pilot link with someone they care about. ONE message per channel. This is the "be a good person" play — not a hard sell, not a rewards pitch. Just: "You learned something important. Make sure the people you love aren't in the dark."

**Strategy:** Single touchpoint. Make it emotional, make it easy, and frame sharing as an act of caring — not marketing.

##### Flow 3 — SMS (choose 1)

**SMS Option A (Protective — Default)**

> "Hey [Name] — when you checked your Policy Pilot Score, you found out things about your insurance that most people never learn until it's too late. The people you care about — your family, your friends — probably have the same gaps and don't know it either. Share your scorecard with them. It could be the most important text they get this month: [scorecard share link]"

**SMS Option B (Direct)**

> "[Name] — you know things about your insurance now that you didn't know before. The people closest to you deserve to know too. Share your Policy Pilot Score with someone you care about — it takes them 2 minutes and it's free: [scorecard share link]"

**SMS Option C (Guilt/Urgency)**

> "Hey [Name] — imagine someone you love gets hit with a claim denial because of a gap they didn't know about. You could have told them about Policy Pilot. Don't let that happen. Share it now: [scorecard share link]"

##### Flow 3 — Email (choose 1)

> **Subject:** The people you care about deserve to know if they're protected
>
> [Name],
>
> When you ran your policy through Policy Pilot, you learned things about your insurance that you didn't know before. Maybe it was a coverage gap. Maybe you were overpaying. Either way — you know now.
>
> But the people you care about? They probably don't.
>
> Most people never check their insurance. They assume it covers everything. They find out it doesn't when it's already too late — when the claim is denied, when the check comes up short, when the damage is done.
>
> You can change that for someone. Share your Policy Pilot Score with the people who matter to you. It takes them 2 minutes. And it could save them from a disaster they don't see coming.
>
> **[Share Your Scorecard →]** (links to shareable scorecard — user chooses: with score or without)
>
> **[Send Policy Pilot to Someone You Care About →]** (opens direct send flow)
>
> You don't have to share your score. You can just send them the link. But if you care about someone, make sure they're not guessing about their insurance. Because guessing is fine — until it isn't.
>
> — The Policy Pilot Team
>
> *P.S. — This isn't about us getting more users. It's about making sure the people you love aren't one bad day away from finding out their insurance doesn't work the way they think it does.*

**Email Option B (Shorter/Direct)**

> **Subject:** Share this with someone you care about, [Name]
>
> [Name],
>
> You checked your Policy Pilot Score. You found out where you stand.
>
> Now think about the people closest to you — your partner, your parents, your best friend. Do THEY know if their insurance actually protects them?
>
> Probably not. Most people don't.
>
> You can change that in 10 seconds. Send them your scorecard or just share the link. It's free and takes them 2 minutes.
>
> **[Share Your Scorecard →]** (scorecard with or without score)
>
> **[Send Policy Pilot to Someone →]** (direct send)
>
> If it helped you, it'll help them.
>
> — The Policy Pilot Team

**Email Option C (Guilt/Scenario)**

> **Subject:** What if someone you love gets denied a claim — and you could have warned them?
>
> [Name],
>
> This isn't a scare tactic. It's a question worth asking.
>
> You ran your policy through Policy Pilot. You saw your score. You know what your insurance does and doesn't cover. That knowledge could have saved you from a very bad day.
>
> But the people you care about? They're still guessing. And if something happens — a flood, a fire, a car accident — they're going to find out the hard way what their policy doesn't cover.
>
> You have the ability to stop that. One text. One share. Two minutes of their time.
>
> **[Share Your Scorecard →]**
>
> **[Send Policy Pilot to Someone You Love →]**
>
> — The Policy Pilot Team
>
> *You'd want someone to tell you. Be that person for someone else.*

---

#### AGENT HANDOFF SEQUENCE (Unchanged — Still Active)

**Who gets this:** Anyone who opts in for an agent on the results page.

**Goal:** Warm transfer to Tom's agents. These people ASKED to talk to someone.

| Touchpoint | Timing | Channel | Message |
|------------|--------|---------|---------|
| H1 | INSTANTLY | SMS (automated) | "Hey [Name]! Your agent [Agent Name] will be reaching out in the next few minutes to discuss your Policy Pilot analysis. Keep an eye out for their call!" |
| H2 | Within 5 min | Phone call (agent) | Agent calls with full context: score, red flags, specific findings. Personalized conversation, NOT a cold pitch. |
| H3 | If no answer | SMS (agent) | "Hi [Name], this is [Agent] from Policy Pilot. I just reviewed your analysis and noticed a few things worth discussing. When's a good time to connect? I'm free [times]." |
| H4 | Day 1 (if no response) | Email | Send a "next steps" email with agent's contact info + summary of what was found in their analysis |
| H5 | Day 3 (if still no response) | SMS | "Hey [Name], [Agent] here. No pressure — just want to make sure you have the option. Reply anytime if you'd like to chat about your policy." |
| H6 | 30-60 min after agent call | SMS (automated) | Post-agent-call share trigger: "Hey [Name], we're glad we could help you understand your policy. The people you care about might have the same gaps and not know it. Share Policy Pilot with them: [referral link]" |

**Tom's SOP:** Every opt-in gets a call within 5 minutes during business hours. After hours, automated SMS fires immediately and agent calls at 9AM next day. No exceptions.

---

#### TCPA Compliance (Critical for SMS)

- Users MUST explicitly consent to receive SMS messages (checkbox or clear language at lead capture)
- Every SMS must include opt-out language: "Reply STOP to unsubscribe" (at minimum on the last message of each flow)
- Log all consent records — you need proof of opt-in if challenged
- Do NOT send SMS before 8AM or after 9PM local time
- Do NOT send more than 1 SMS per day to any single user
- Policy Pilot NEVER sends SMS to non-opted-in recipients (referral shares open native text app — see Channel 3 TCPA notes)

---

### Future Channels (Not Priority for Launch)

| Channel | When to Start | Notes |
|---------|---------------|-------|
| **SEO & Content Marketing** | Month 1 | Publish 2-4 articles/month targeting "am I over insured," "insurance policy review," etc. Create state-specific landing pages for Tom's 14 states. |
| **Strategic Partnerships** | Month 2-3 | Mortgage companies, real estate agents, financial advisors, car dealerships. Use Tom/Amir's model as template. |
| **Google Ads** | Month 2 | High-intent search traffic. Target keywords like "review my insurance policy," "is my coverage enough." |
| **YouTube Long-Form** | Month 2 | Deep-dive insurance education. Repurpose best-performing short-form into longer explainers. |

---

## Key Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| Meta Special Ad Category limits targeting | Medium | SAC is required; focus on creative quality, first-party data, broad targeting |
| Consumer trust barrier (connecting accounts) | High | UGC creatives, testimonials, security badges, Canopy Connect branding |
| AI "advice" triggering licensing (WI, MI) | Medium | Consult insurance attorney; use "informational/educational" framing; clear disclaimers |
| Canopy Connect dependency | Low (mitigated) | InsurGrid backup ($99/mo unlimited); Tom already has Canopy account |
| Tom leaving the partnership | Medium | Consent-based model; leads are PP's asset; can partner with other agencies |
| Competitors adding policy grading | High | Speed advantage; build brand loyalty before incumbents react |
| Low conversion rate (lead → policy sold) | High | Validate in 3-day test; two-tier lead capture helps (partial + full) |
| Regulatory changes (NAIC 2026) | Medium | Monitor; consult attorney; build compliance in early |

---

## Responsibilities

| Area | Owner | Details |
|------|-------|---------|
| Product & Development | Tucker | Build the platform, AI model, Canopy/InsurGrid integrations |
| Marketing & Lead Gen | Brandon | Facebook ads, landing pages, conversion optimization |
| Insurance Operations | Tom | Agent management, policy servicing, industry expertise |

---

## Decisions Made

- [x] Company name: **Policy Pilot**
- [x] Equity split: 40/40/20 (Brandon/Tucker/Tom)
- [x] Book of business split: 50% to Brandon+Tucker / 50% to Tom's agency
- [x] Primary acquisition channel: Facebook Ads (Meta) — under Special Ad Category
- [x] Data extraction: Canopy Connect (primary) + InsurGrid (backup)
- [x] AI model: Claude Opus 4.6 or GPT 5.2 with semantic search + custom prompts
- [x] Launch insurance lines: Home, Renters, Auto (Life on hold)
- [x] Pricing for consumers: Free (lead gen model)
- [x] Data sharing model: Consent-based (opt-in only)
- [x] Test budget: $600 ($200/day × 3 days)
- [x] Funnel: Built and in refinement (Ad → Landing → Lead Capture → Canopy → AI Analysis → CTA)
- [x] Trust strategy: UGC creatives, testimonials, security badges, Canopy Connect branding
- [x] Lead capture: Two-tier (phone/email before Canopy, full data after)
- [x] AI delivery: Real-time on-page + downloadable PDF report
- [x] Contact channels: SMS + Email available
- [x] Tom's licensed states: AZ, NM, GA, OH, IN, NC, SC, NJ, UT, OR, WY, WI, IL, KS
- [x] Launch states (Tier 1): AZ, NM, GA, OH, IN, SC, NJ, UT, OR, WY, IL, KS (12 states, all low risk)
- [x] Launch states (Tier 2): NC (viable but $50/referral cap)
- [ ] Launch state (Tier 3 — needs attorney): WI (broad "advising" definition)
- [ ] Insurance attorney consultation: TBD (critical for Wisconsin)
- [ ] AI prompt engineering & system prompt: In refinement
- [ ] Conversion rate data: TBD (will be established during 3-day test)
- [ ] Moat strategy execution: Score branding, data flywheel, retention loops
- [ ] Trademark "Policy Pilot Score" (or chosen name): TBD
- [ ] Meta account setup: Business Manager, Pixel, CAPI, Custom Conversions, geo-targeting
- [ ] Build story bank: Source 20-30 real stories from Reddit, Facebook groups, news articles (tag by insurance type + emotional angle)
- [ ] Produce first batch of creatives across all 5 angles (fear, overpaying, curiosity, life events, social proof)
- [ ] Test AI UGC quality — vet before spending; have faceless backups ready
- [ ] Plan transition to real UGC creators ($150-300/video) once revenue supports it
- [ ] Speed-to-lead SOP: Tom's agents must respond within 5 minutes
- [ ] Organic content: Set up TikTok, IG, YouTube accounts with bio links
- [ ] Organic content: Batch produce first week of videos (5-7 videos)
- [ ] Build results page UX: Score reveal → Analysis → Agent CTA → Share block (per spec)
- [ ] Design score card images: Version A (with score) + Version B (without score) — 1080x1080 + 1080x1920
- [ ] Build share drawer: SMS, email, social, copy link, direct send flow
- [ ] Write + implement all referral message templates (SMS, email, social, direct send)
- [ ] PDF report: Add QR codes, share page, referral CTAs to every generated PDF
- [ ] Implement referral tracking: unique codes per user, track full share→click→complete chain
- [ ] Build micro-share overlay at score reveal (auto-dismiss, non-blocking)
- [ ] Build Family Check / Group Share flow (2-5 recipients)
- [ ] Build user referral dashboard ("Your Shares" — who checked, who hasn't, remind button)
- [ ] Add post-agent-call share SMS to Sequence C (touchpoint C6)
- [ ] Plan score context UI: placeholder for state/national averages (populate when data sufficient)
- [ ] Build re-share trigger automations: annual re-analysis, life events, weather/seasonal, score improvement
- [ ] Flow 1 — Incomplete Policy Recovery: Finalize 3 SMS + 3 Email copy, build automation with 1hr/24hr/72hr timing
- [ ] Flow 2 — Review Request: Finalize 3 SMS + 3 Email copy, build review collection page (on-site first, then Google/Trustpilot)
- [ ] Flow 3 — Referral/Share: Finalize 1 SMS + 1 Email, integrate scorecard share link generation
- [ ] Agent Handoff Sequence: Finalize 6 touchpoints including post-agent-call share trigger (H6)
- [ ] Build automation triggers: Drop-off → Flow 1, Completion → Flow 2 (delayed) → Flow 3, Opt-in → Agent Handoff
- [ ] Build exit logic: Flow 1 auto-exits when user completes analysis
- [ ] SMS/Email platform selection: Twilio + SendGrid, or GoHighLevel, or similar
- [ ] TCPA compliance: Consent language, opt-out handling, time restrictions
- [ ] Test all flows end-to-end before launch

---

## Session Notes

### Brainstorm Session 1 — Feb 10, 2026
- Initial business context captured
- Core thesis and product flow documented
- Key risks identified for further discussion
- Meta Special Ad Category research: REQUIRED even for educational tools (Meta scans landing pages + enforces at domain level)
- Licensing research: Majority of states allow referral fees to unlicensed persons under PLMA Section 13D; Wisconsin is highest-risk state among Tom's licensed states
- Competitive landscape: Jerry ($213M), Policygenius ($250M+), Gabi, Insurify, The Zebra — all do quote comparison, NONE do current policy analysis/grading
- Key differentiator confirmed: Education-first policy grading vs. quote comparison
- Funnel is BUILT — currently refining AI prompts and response quality
- Two-tier lead capture system: phone/email before Canopy (partial lead) + full data after (qualified lead)
- Benchmark: Life insurance company with bad creatives gets $7–15 CPL under same SAC constraints; Policy Pilot targeting $5–10 CPL with broader market + better creatives
- Trust strategy: UGC creatives, testimonials, security badges, Canopy Connect branding
- Tom's 14 licensed states mapped: 12 low-risk (Tier 1), 1 medium-risk (NC — $50 cap), 1 high-risk (WI — broad "advising" definition)
- Moat strategy developed: 6-layer approach — Brand/Score ownership, Data flywheel, Annual review habit, Marketplace network effects, Distribution partnerships, Content/SEO authority
- Credit Karma identified as closest business model analog — free tool, brand moat, marketplace monetization
- Partial leads (phone/email only, no policy data) will be nurtured via SMS/email sequences to complete the analysis
- Marketing strategy narrowed to 4 priority channels: Meta Ads, Organic Content Distribution, Referral/Viral Loops, Email/SMS Nurture
- Meta Ads: Full execution playbook built — account setup checklist, 2-campaign architecture, 5 UGC ad scripts, 3-day test plan with hourly actions, metrics dashboard, scaling rules
- Organic Content Distribution: TikTok/IG Reels/YouTube Shorts/FB Reels execution playbook — 5 content pillars, weekly production schedule (~5-7 hrs/week), video template structure, posting protocol, content-to-paid-ads flywheel
- Reference TikTok creators identified: @robin_kiera (150K, insurance), @humphreytalks (2.3M, finance), @your.richbff (2.7M, finance), @erikakullberg (9M, legal/finance), @jluisworld (300K, insurance agent)
- Referral/Viral Loops: 5 mechanics specced — shareable score card, challenge-a-friend SMS, one-tap share, PDF branding, referral incentives (Phase 2)
- Email/SMS Nurture: Full 3-sequence automation architecture — Sequence A (partial lead recovery, 6 touchpoints), Sequence B (full lead nurture, 7 touchpoints), Sequence C (qualified lead agent handoff, 5 touchpoints)
- TCPA SMS compliance requirements documented
- Speed-to-lead SOP: 5-minute max response time, automated SMS on opt-in, agent call protocol
- Future channels deprioritized but documented: SEO (month 1), Partnerships (month 2-3), Google Ads (month 2), YouTube long-form (month 2)
- Campaign architecture updated: Single campaign, single ad set, broad targeting, add creatives continuously, new ad set at 50-creative threshold (Brandon's strategy)
- Removed 3-day test execution plan and scaling rules — Brandon has his own strategies for both
- Core creative strategy defined: 5 angles — Fear/Urgency (primary bet), Overpaying/Betrayal, Curiosity/Discovery, Life Event Triggers, Social Proof/Community
- Story sourcing approach: Real stories from Reddit, Facebook groups, Quora, news articles → story bank → AI UGC scripts
- AI UGC as primary format with faceless backups (screen recordings, text-on-screen, voiceover + b-roll) to hedge Meta AI detection risk
- Branded language mandate: ALWAYS say "Policy Pilot Score" — engrain the brand into every touchpoint
- Universal creative framework: Hook (0-3s) → Story/Pain (3-15s) → Pivot to PP (15-22s) → Score Reveal on screen (22-27s) → CTA with "Policy Pilot Score" (27-30s)
- Altruistic framing: "We built this to help people" — tool exists out of the goodness of our heart, promoting awareness and education
- Share CTA: Encourage sharing with loved ones to make sure they're protected
- Full creative examples built: 36 total scripts (9 per angle × 4 angles) across Real UGC, AI UGC, and Faceless formats
- Priority angles confirmed: Fear/Urgency, Anger/Overpaying, Curiosity/Discovery, Life Event Triggers
- Social Proof / Community deferred until volume supports it
- Organic content repurposing updated to match new single-campaign architecture (no more Campaign 1/2 references)
- Content flywheel documented: organic and paid share same formats, angles, hooks — what works in one feeds the other
- Referral/Viral Loops fully redesigned with 7-part spec: Results page UX flow, Score Card design (with/without score versions), Share Block copy + persuasion framework, Referral message templates (SMS, email, social, direct send), PDF built-in sharing, Referral tracking metrics, Phase 2 incentives
- Results page UX order: Score Reveal → AI Analysis → Agent CTA (money shot, uninterrupted) → Share Block (post-decision)
- Share framing: "Protect the people you care about" — altruistic, not transactional. Sharing is presented as caring, not marketing.
- 3 share options: Share with score (default), Share without score (privacy), Send to someone specific (direct input)
- 4 SMS referral message options (caring, protective, casual, direct), 1 email template, social media captions, direct send flow with 3 message styles
- PDF report designed as referral vehicle: QR code on every page, dedicated share page, branded CTA on last page
- TCPA compliance fix: SMS shares must open user's native text app (Policy Pilot NEVER sends SMS to non-opted-in recipients). Email sends are fine under CAN-SPAM with unsubscribe.
- WhatsApp added as share channel alongside SMS and email
- Family Check / Group Share mechanic added: send to 2-5 people at once ("Protect Your Family")
- Micro-share overlay added at score reveal: 3-4 sec non-blocking overlay with score card + single Share button (captures impulse share at emotional peak without interrupting funnel)
- Post-agent-call share trigger added (Part 8): Automated SMS 30-60 min after agent call — highest-intent share moment because user has experienced full value chain
- User Referral Dashboard added (Part 9): "Your Shares" section shows who checked, who hasn't, with reminder capability
- Score Context (Part 10): State + national average display alongside user's score (unlocks with scale, placeholder in UI now)
- Re-Share Triggers (Part 11): Annual re-analysis, life events, seasonal/weather, score improvement, holiday nudges — ongoing viral touchpoints throughout customer lifecycle
- Email/SMS nurture completely restructured into 3 flows + Agent Handoff:
  - Flow 1: Incomplete Policy Recovery — 3 SMS + 3 Email, aggressive/persuasive, first message within 1 hour, escalating urgency at 24hr and 72hr. Addresses trust friction head-on in email copy.
  - Flow 2: Review Request — 3 SMS + 3 Email, starts 3-5 days after analysis. Escalates from simple ask → social proof framing → altruistic mission. Reviews feed UGC ad content.
  - Flow 3: Referral/Share — 1 SMS + 1 Email, fires after Flow 2 or immediately after review submission. "Be a good person" framing. Includes scorecard share link.
  - Agent Handoff Sequence: 6 touchpoints including new H6 post-agent-call share trigger (30-60 min after call)
- Old Sequence A/B/C replaced with new flow architecture
- Flow timing: Flow 1 within 1hr of drop-off → Flow 2 at day 3-5 → Flow 3 at day 7-10
- Exit logic: Flow 1 auto-exits when user completes analysis
- Review collection: Start with on-site testimonial form, expand to Google/Trustpilot later
- Added 2 additional SMS + 2 additional Email options to each flow for A/B testing flexibility
- Removed infrastructure checklist from Channel 4 (README is business context doc, not task management)
- Moat 7 added: Execution Speed — MVP built in <2 weeks, 8x faster iteration vs. competitors with 200+ employees, compounding learning advantage. Only moat that exists today. Biggest threat is self-inflicted: hiring too fast, adding process too early.

---

*Last updated: February 10, 2026*
