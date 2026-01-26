# Policy Pilot MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Next.js application that receives insurance policy data via Zapier webhook, grades it using AI based on coverage appropriateness criteria, and displays a professional report card.

**Architecture:**
- Next.js 14 App Router with TypeScript
- Zapier webhook endpoint receives policy data from Canopy Connect
- Server-side AI grading via OpenAI API (or Gemini as fallback)
- Report page displays grades with educational explanations
- Data stored temporarily in memory/session (no database for MVP)

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, OpenAI API, Zod (validation)

---

## Data Flow Overview

```
┌─────────────────┐     ┌─────────┐     ┌──────────────────┐     ┌─────────┐     ┌────────────┐
│ Canopy Connect  │────▶│  Zapier │────▶│ /api/webhook     │────▶│ OpenAI  │────▶│ Report Page│
│ (User's Policy) │     │         │     │ (Next.js API)    │     │ (Grade) │     │ /report/id │
└─────────────────┘     └─────────┘     └──────────────────┘     └─────────┘     └────────────┘
```

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `next.config.js`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `.env.example`
- Create: `.gitignore`

**Step 1: Initialize Next.js project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Expected: Project scaffolded with Next.js 14, TypeScript, Tailwind CSS

**Step 2: Create environment file template**

Create `.env.example`:
```
# OpenAI API Key (get from https://platform.openai.com)
OPENAI_API_KEY=sk-your-key-here

# Webhook secret for Zapier verification (generate a random string)
WEBHOOK_SECRET=your-webhook-secret-here

# Base URL for the app
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Step 3: Update .gitignore**

Append to `.gitignore`:
```
.env
.env.local
```

**Step 4: Commit**

```bash
git init && git add -A && git commit -m "feat: initialize Next.js project with TypeScript and Tailwind

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Define TypeScript Types for Policy Data

**Files:**
- Create: `src/types/policy.ts`
- Create: `src/types/grading.ts`

**Step 1: Create policy data types**

Create `src/types/policy.ts`:
```typescript
// Home Policy Types
export interface HomeCoverage {
  dwelling: number;
  dwellingType: 'replacement_cost' | 'actual_cash_value' | 'unknown';
  otherStructures: number;
  otherStructuresPercent: number; // calculated as % of dwelling
  personalProperty: number;
  personalPropertyPercent: number; // calculated as % of dwelling
  personalPropertyType: 'replacement_cost' | 'actual_cash_value' | 'unknown';
  lossOfUse: number | string; // can be months or flat dollar
  lossOfUseType: 'months' | 'flat_dollar' | 'percent_of_dwelling';
  personalLiability: number;
  medicalPayments: number;
  deductible: number;
  deductiblePercent: number; // calculated as % of dwelling
}

export interface HomeAdditionalCoverages {
  waterBackup: boolean | number;
  equipmentBreakdown: boolean;
  serviceLine: boolean | number;
  ordinanceLaw: boolean | number;
  identityTheft: boolean | number;
  scheduledProperty: boolean | number;
}

export interface HomePolicy {
  type: 'home';
  policyType: 'HO3' | 'HO5' | 'HO6' | 'HO4' | 'other';
  state: string;
  coverage: HomeCoverage;
  additionalCoverages: HomeAdditionalCoverages;
  priorClaims: number;
  hasDetachedStructures: boolean;
  hasPool: boolean;
  hasDog: boolean;
  hasTrampoline: boolean;
}

// Auto Policy Types
export interface AutoCoverage {
  bodilyInjuryPerPerson: number;
  bodilyInjuryPerAccident: number;
  propertyDamage: number;
  uninsuredMotoristPerPerson: number;
  uninsuredMotoristPerAccident: number;
  underinsuredMotoristPerPerson: number;
  underinsuredMotoristPerAccident: number;
  medicalPayments: number;
  collision: number | null; // null = declined
  collisionDeductible: number | null;
  comprehensive: number | null; // null = declined
  comprehensiveDeductible: number | null;
}

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  estimatedValue: number;
  isFinanced: boolean;
}

export interface AutoPolicy {
  type: 'auto';
  state: string;
  coverage: AutoCoverage;
  vehicles: Vehicle[];
  priorClaims: number;
  hasHealthInsurance: boolean;
}

// Combined Policy Submission
export interface PolicySubmission {
  id: string;
  submittedAt: string;
  homePolicy?: HomePolicy;
  autoPolicy?: AutoPolicy;
  contactEmail?: string;
  contactName?: string;
}
```

**Step 2: Create grading result types**

Create `src/types/grading.ts`:
```typescript
export type RiskTier = 'low' | 'moderate' | 'elevated';

export interface CoverageGrade {
  name: string;
  score: number; // 1-5
  maxScore: 5;
  explanation: string;
  recommendation?: string;
}

export interface AdditionalCoverageAssessment {
  name: string;
  present: boolean;
  relevance: 'low' | 'situational' | 'often_worth_reviewing';
  note?: string;
}

export interface HomePolicyGrade {
  overallGrade: string; // A, B, C, D, F
  overallScore: number; // 0-100
  riskTier: RiskTier; // internal, not displayed
  standardCoverages: CoverageGrade[];
  deductibleGrade: CoverageGrade;
  additionalCoverages: AdditionalCoverageAssessment[];
  summary: string;
  keyStrengths: string[];
  areasToReview: string[];
}

export interface AutoPolicyGrade {
  overallGrade: string; // A, B, C, D, F
  overallScore: number; // 0-100
  riskTier: RiskTier; // internal, not displayed
  standardCoverages: CoverageGrade[];
  summary: string;
  keyStrengths: string[];
  areasToReview: string[];
}

export interface PolicyReport {
  id: string;
  generatedAt: string;
  homeGrade?: HomePolicyGrade;
  autoGrade?: AutoPolicyGrade;
  combinedGrade?: string;
  combinedScore?: number;
}
```

**Step 3: Commit**

```bash
git add src/types && git commit -m "feat: add TypeScript types for policy data and grading results

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Create Zod Validation Schemas

**Files:**
- Create: `src/lib/validation.ts`

**Step 1: Install Zod**

Run:
```bash
npm install zod
```

**Step 2: Create validation schemas**

Create `src/lib/validation.ts`:
```typescript
import { z } from 'zod';

// Flexible schema that accepts data from Zapier/Canopy
// Uses coercion and defaults to handle various input formats

export const homeCoverageSchema = z.object({
  dwelling: z.coerce.number().min(0),
  dwellingType: z.enum(['replacement_cost', 'actual_cash_value', 'unknown']).default('unknown'),
  otherStructures: z.coerce.number().min(0).default(0),
  personalProperty: z.coerce.number().min(0).default(0),
  personalPropertyType: z.enum(['replacement_cost', 'actual_cash_value', 'unknown']).default('unknown'),
  lossOfUse: z.union([z.coerce.number(), z.string()]).default(0),
  lossOfUseType: z.enum(['months', 'flat_dollar', 'percent_of_dwelling']).default('flat_dollar'),
  personalLiability: z.coerce.number().min(0).default(0),
  medicalPayments: z.coerce.number().min(0).default(0),
  deductible: z.coerce.number().min(0).default(0),
});

export const homeAdditionalCoveragesSchema = z.object({
  waterBackup: z.union([z.boolean(), z.coerce.number()]).default(false),
  equipmentBreakdown: z.coerce.boolean().default(false),
  serviceLine: z.union([z.boolean(), z.coerce.number()]).default(false),
  ordinanceLaw: z.union([z.boolean(), z.coerce.number()]).default(false),
  identityTheft: z.union([z.boolean(), z.coerce.number()]).default(false),
  scheduledProperty: z.union([z.boolean(), z.coerce.number()]).default(false),
}).default({});

export const homePolicySchema = z.object({
  type: z.literal('home').default('home'),
  policyType: z.enum(['HO3', 'HO5', 'HO6', 'HO4', 'other']).default('HO3'),
  state: z.string().length(2).toUpperCase(),
  coverage: homeCoverageSchema,
  additionalCoverages: homeAdditionalCoveragesSchema,
  priorClaims: z.coerce.number().min(0).default(0),
  hasDetachedStructures: z.coerce.boolean().default(false),
  hasPool: z.coerce.boolean().default(false),
  hasDog: z.coerce.boolean().default(false),
  hasTrampoline: z.coerce.boolean().default(false),
});

export const autoCoverageSchema = z.object({
  bodilyInjuryPerPerson: z.coerce.number().min(0).default(0),
  bodilyInjuryPerAccident: z.coerce.number().min(0).default(0),
  propertyDamage: z.coerce.number().min(0).default(0),
  uninsuredMotoristPerPerson: z.coerce.number().min(0).default(0),
  uninsuredMotoristPerAccident: z.coerce.number().min(0).default(0),
  underinsuredMotoristPerPerson: z.coerce.number().min(0).default(0),
  underinsuredMotoristPerAccident: z.coerce.number().min(0).default(0),
  medicalPayments: z.coerce.number().min(0).default(0),
  collision: z.coerce.number().nullable().default(null),
  collisionDeductible: z.coerce.number().nullable().default(null),
  comprehensive: z.coerce.number().nullable().default(null),
  comprehensiveDeductible: z.coerce.number().nullable().default(null),
});

export const vehicleSchema = z.object({
  year: z.coerce.number().min(1900).max(2030),
  make: z.string().min(1),
  model: z.string().min(1),
  estimatedValue: z.coerce.number().min(0).default(0),
  isFinanced: z.coerce.boolean().default(false),
});

export const autoPolicySchema = z.object({
  type: z.literal('auto').default('auto'),
  state: z.string().length(2).toUpperCase(),
  coverage: autoCoverageSchema,
  vehicles: z.array(vehicleSchema).min(1),
  priorClaims: z.coerce.number().min(0).default(0),
  hasHealthInsurance: z.coerce.boolean().default(true),
});

export const policySubmissionSchema = z.object({
  homePolicy: homePolicySchema.optional(),
  autoPolicy: autoPolicySchema.optional(),
  contactEmail: z.string().email().optional(),
  contactName: z.string().optional(),
}).refine(
  (data) => data.homePolicy || data.autoPolicy,
  { message: 'At least one policy (home or auto) must be provided' }
);

export type ValidatedPolicySubmission = z.infer<typeof policySubmissionSchema>;
```

**Step 3: Commit**

```bash
git add src/lib/validation.ts package.json package-lock.json && git commit -m "feat: add Zod validation schemas for policy data

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Create AI Grading Prompt and Service

**Files:**
- Create: `src/lib/grading-prompt.ts`
- Create: `src/lib/openai.ts`
- Create: `src/lib/grader.ts`

**Step 1: Install OpenAI SDK**

Run:
```bash
npm install openai
```

**Step 2: Create the grading system prompt**

Create `src/lib/grading-prompt.ts`:
```typescript
export const POLICY_GRADING_SYSTEM_PROMPT = `You are Policy Pilot, an expert insurance analyst specializing in home and auto coverage assessment. Your role is to grade insurance policies based on appropriateness, not maximum limits.

## CORE PRINCIPLES
- Grade coverage based on appropriateness, not maximum limits
- Do not assume higher coverage is always better
- Penalize misalignment (over- or under-insurance), not conservative choices
- Only recommend higher limits when there is a clear, risk-based reason
- Use neutral, educational language. Avoid fear-based phrasing

## RISK CONTEXT (Internal Use Only - Do Not Display)
Before grading, infer a Risk Tier using available policy data:
- Dwelling amount
- State
- Home policy type (HO3/HO5)
- Auto vehicle value & lien status
- Prior claims (if present)

Classify as: Low / Moderate / Elevated Risk
Use this tier to fine-tune scores — not to auto-increase recommendations.

## HOME POLICY GRADING

### STANDARD COVERAGES (Included in Overall Grade)

**1. Dwelling Coverage (1–5)**
Purpose: Rebuild the home after a total loss
- 5/5 → Replacement cost present AND dwelling aligns with realistic rebuild cost
- 4/5 → Replacement cost but limits seem high or low
- 3/5 → Replacement cost unclear or extended limits missing
- 1–2/5 → Actual Cash Value or clearly underinsured
⚠ Overinsurance reduces score if coverage materially exceeds rebuild cost.

**2. Other Structures (1–5)**
Purpose: Detached structures (garage, shed, fence)
- 5/5 → 10–20% of dwelling
- 4/5 → 5–10%
- 3/5 → <5% where detached structures exist
- Neutral if no detached structures are present

**3. Personal Property (1–5)**
Purpose: Belongings inside the home
- 5/5 → 50–70% of dwelling OR replacement cost endorsement
- 4/5 → 40–50%
- 3/5 → <40% without replacement cost
- No penalty if homeowner intentionally self-insures contents

**4. Loss of Use (1–5)**
Purpose: Temporary living expenses
- 5/5 → 12–24 months OR % tied to dwelling
- 4/5 → Flat dollar amount adequate for area
- 3/5 → Low limit that may expire early

**5. Personal Liability (1–5)**
Purpose: Injury or property damage claims
- 5/5 → $300k–$500k
- 4/5 → $100k–$300k
- 3/5 → Below $100k with no special exposure
- Consider: Pool, dog, trampoline increase exposure
- Do not default to $500k+

**6. Medical Payments (1–5)**
Purpose: Minor guest injuries
- 5/5 → $5k–$10k
- 4/5 → $2k–$5k
- Neutral if declined and liability coverage is adequate

### DEDUCTIBLE GRADING (HOME)
Grade based on deductible as % of dwelling:
- 0.5%–2% → 5/5
- <0.5% → 4/5 (lower deductible = higher premium)
- 2%–3% → 4/5
- 3%–5% → 3/5
- >5% → 2/5

### ADDITIONAL COVERAGES (Not Included in Overall Grade)
Water Backup, Equipment Breakdown, Service Line, Ordinance/Law, Identity Theft, Scheduled Property
- If not present: display as "Optional"
- Assign relevance: Low relevance / Situational / Often worth reviewing
- Do not penalize absence unless risk is obvious

## AUTO POLICY GRADING

### STANDARD COVERAGES

**Bodily Injury (1–5)**
- 5/5 → ≥$250k/$500k
- 4/5 → $100k/$300k
- 2/5 → State minimum

**Property Damage (1–5)**
- 5/5 → ≥$100k
- 4/5 → $50k–$100k
- 3/5 → $25k–$50k
- 2/5 → Below $25k

**Uninsured/Underinsured Motorist (1–5)**
- 5/5 → Matches BI limits
- 4/5 → Slightly lower than BI
- 2/5 → Minimal or declined in high-risk states

**Medical Payments (1–5)**
- 5/5 → ≥$5k
- Neutral if declined and strong health coverage exists

**Collision & Comprehensive (1–5)**
Grade based on vehicle value & lien:
- Financed vehicle with declined coverage → 1/5
- Paid-off / low-value vehicle with declined → Neutral
- Deductible ≤$500 (Collision) / ≤$250 (Comp) → 5/5

## OVERALL POLICY GRADE CALCULATION

**Includes:**
- Home or Auto Standard Coverages
- Deductibles

**Excludes:**
- Optional endorsements

**Weighting:**
- Liability: 30%
- Property protection: 30%
- Deductibles: 20%
- Coverage alignment: 20%

Assign letter grade based on weighted score:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: Below 60

## OUTPUT FORMAT
You must respond with valid JSON matching this structure:
{
  "homeGrade": {
    "overallGrade": "A|B|C|D|F",
    "overallScore": 0-100,
    "riskTier": "low|moderate|elevated",
    "standardCoverages": [
      {
        "name": "Coverage Name",
        "score": 1-5,
        "maxScore": 5,
        "explanation": "Why this score was given",
        "recommendation": "Optional suggestion if score < 4"
      }
    ],
    "deductibleGrade": {
      "name": "Deductible",
      "score": 1-5,
      "maxScore": 5,
      "explanation": "Why this score was given"
    },
    "additionalCoverages": [
      {
        "name": "Coverage Name",
        "present": true|false,
        "relevance": "low|situational|often_worth_reviewing",
        "note": "Optional context"
      }
    ],
    "summary": "2-3 sentence overall assessment",
    "keyStrengths": ["Strength 1", "Strength 2"],
    "areasToReview": ["Area 1", "Area 2"]
  },
  "autoGrade": {
    "overallGrade": "A|B|C|D|F",
    "overallScore": 0-100,
    "riskTier": "low|moderate|elevated",
    "standardCoverages": [...],
    "summary": "2-3 sentence overall assessment",
    "keyStrengths": ["Strength 1", "Strength 2"],
    "areasToReview": ["Area 1", "Area 2"]
  }
}

## EXPLANATION RULE
For every score:
- Explain why it fits or doesn't fit
- Clarify when coverage is adequate even if not maximal
- Never recommend higher limits without a clear reason`;

export function createGradingUserPrompt(policyData: unknown): string {
  return \`Please analyze and grade the following insurance policy data:

\`\`\`json
\${JSON.stringify(policyData, null, 2)}
\`\`\`

Provide a comprehensive grade report following the grading criteria and output format specified in your instructions.\`;
}
```

**Step 3: Create OpenAI client wrapper**

Create `src/lib/openai.ts`:
```typescript
import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}
```

**Step 4: Create the grading service**

Create `src/lib/grader.ts`:
```typescript
import { getOpenAIClient } from './openai';
import { POLICY_GRADING_SYSTEM_PROMPT, createGradingUserPrompt } from './grading-prompt';
import type { PolicySubmission, PolicyReport, HomePolicyGrade, AutoPolicyGrade } from '@/types/policy';
import type { PolicyReport as GradingReport } from '@/types/grading';

export async function gradePolicy(submission: PolicySubmission): Promise<PolicyReport> {
  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: POLICY_GRADING_SYSTEM_PROMPT },
      { role: 'user', content: createGradingUserPrompt(submission) },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3, // Lower temperature for more consistent grading
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const gradeResult = JSON.parse(content) as {
    homeGrade?: HomePolicyGrade;
    autoGrade?: AutoPolicyGrade;
  };

  // Calculate combined grade if both policies present
  let combinedGrade: string | undefined;
  let combinedScore: number | undefined;

  if (gradeResult.homeGrade && gradeResult.autoGrade) {
    combinedScore = Math.round(
      (gradeResult.homeGrade.overallScore + gradeResult.autoGrade.overallScore) / 2
    );
    combinedGrade = scoreToLetterGrade(combinedScore);
  }

  return {
    id: submission.id,
    generatedAt: new Date().toISOString(),
    homeGrade: gradeResult.homeGrade,
    autoGrade: gradeResult.autoGrade,
    combinedGrade,
    combinedScore,
  };
}

function scoreToLetterGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
```

**Step 5: Commit**

```bash
git add src/lib/grading-prompt.ts src/lib/openai.ts src/lib/grader.ts package.json package-lock.json && git commit -m "feat: add AI grading service with comprehensive policy grading prompt

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create In-Memory Report Storage

**Files:**
- Create: `src/lib/storage.ts`

**Step 1: Create simple in-memory storage**

Create `src/lib/storage.ts`:
```typescript
import type { PolicySubmission } from '@/types/policy';
import type { PolicyReport } from '@/types/grading';

// In-memory storage for MVP
// In production, replace with database (Postgres, Redis, etc.)
const submissions = new Map<string, PolicySubmission>();
const reports = new Map<string, PolicyReport>();

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function storeSubmission(submission: PolicySubmission): void {
  submissions.set(submission.id, submission);
}

export function getSubmission(id: string): PolicySubmission | undefined {
  return submissions.get(id);
}

export function storeReport(report: PolicyReport): void {
  reports.set(report.id, report);
}

export function getReport(id: string): PolicyReport | undefined {
  return reports.get(id);
}

// Clean up old entries (call periodically in production)
export function cleanupOldEntries(maxAgeMs: number = 24 * 60 * 60 * 1000): void {
  const now = Date.now();

  for (const [id, submission] of submissions) {
    const submittedAt = new Date(submission.submittedAt).getTime();
    if (now - submittedAt > maxAgeMs) {
      submissions.delete(id);
    }
  }

  for (const [id, report] of reports) {
    const generatedAt = new Date(report.generatedAt).getTime();
    if (now - generatedAt > maxAgeMs) {
      reports.delete(id);
    }
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/storage.ts && git commit -m "feat: add in-memory storage for policy submissions and reports

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create Zapier Webhook Endpoint

**Files:**
- Create: `src/app/api/webhook/route.ts`

**Step 1: Create the webhook API route**

Create `src/app/api/webhook/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { policySubmissionSchema } from '@/lib/validation';
import { gradePolicy } from '@/lib/grader';
import { generateId, storeSubmission, storeReport } from '@/lib/storage';
import type { PolicySubmission } from '@/types/policy';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const webhookSecret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.WEBHOOK_SECRET;

    if (expectedSecret && webhookSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse and validate the incoming data
    const rawData = await request.json();
    const validationResult = policySubmissionSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid policy data',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    // Create submission with generated ID
    const submission: PolicySubmission = {
      id: generateId(),
      submittedAt: new Date().toISOString(),
      ...validationResult.data,
    };

    // Store the submission
    storeSubmission(submission);

    // Grade the policy
    const report = await gradePolicy(submission);

    // Store the report
    storeReport(report);

    // Return the report URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const reportUrl = `${baseUrl}/report/${report.id}`;

    return NextResponse.json({
      success: true,
      reportId: report.id,
      reportUrl,
      grade: report.combinedGrade || report.homeGrade?.overallGrade || report.autoGrade?.overallGrade,
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Allow GET for Zapier webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' });
}
```

**Step 2: Commit**

```bash
git add src/app/api/webhook/route.ts && git commit -m "feat: add Zapier webhook endpoint for receiving policy data

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Create Report Page UI Components

**Files:**
- Create: `src/components/GradeCircle.tsx`
- Create: `src/components/CoverageCard.tsx`
- Create: `src/components/AdditionalCoverageList.tsx`
- Create: `src/components/ReportSection.tsx`

**Step 1: Create the grade circle component**

Create `src/components/GradeCircle.tsx`:
```typescript
interface GradeCircleProps {
  grade: string;
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16 text-2xl',
  md: 'w-24 h-24 text-4xl',
  lg: 'w-32 h-32 text-5xl',
};

const gradeColors: Record<string, string> = {
  A: 'from-green-400 to-green-600 text-green-50',
  B: 'from-blue-400 to-blue-600 text-blue-50',
  C: 'from-yellow-400 to-yellow-600 text-yellow-50',
  D: 'from-orange-400 to-orange-600 text-orange-50',
  F: 'from-red-400 to-red-600 text-red-50',
};

export function GradeCircle({ grade, score, size = 'md', label }: GradeCircleProps) {
  const colorClass = gradeColors[grade] || gradeColors.C;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center font-bold bg-gradient-to-br shadow-lg`}
      >
        {grade}
      </div>
      <div className="text-sm text-gray-600">{score}/100</div>
      {label && <div className="text-sm font-medium text-gray-800">{label}</div>}
    </div>
  );
}
```

**Step 2: Create the coverage card component**

Create `src/components/CoverageCard.tsx`:
```typescript
import type { CoverageGrade } from '@/types/grading';

interface CoverageCardProps {
  coverage: CoverageGrade;
}

function ScoreBar({ score, maxScore }: { score: number; maxScore: number }) {
  const percentage = (score / maxScore) * 100;
  const colorClass =
    score >= 4 ? 'bg-green-500' :
    score >= 3 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 w-12">
        {score}/{maxScore}
      </span>
    </div>
  );
}

export function CoverageCard({ coverage }: CoverageCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900">{coverage.name}</h4>
      </div>
      <ScoreBar score={coverage.score} maxScore={coverage.maxScore} />
      <p className="mt-3 text-sm text-gray-600">{coverage.explanation}</p>
      {coverage.recommendation && (
        <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
          <span className="font-medium">Consider:</span> {coverage.recommendation}
        </div>
      )}
    </div>
  );
}
```

**Step 3: Create additional coverage list component**

Create `src/components/AdditionalCoverageList.tsx`:
```typescript
import type { AdditionalCoverageAssessment } from '@/types/grading';

interface AdditionalCoverageListProps {
  coverages: AdditionalCoverageAssessment[];
}

const relevanceLabels: Record<string, { text: string; className: string }> = {
  low: { text: 'Low Priority', className: 'bg-gray-100 text-gray-600' },
  situational: { text: 'Situational', className: 'bg-yellow-100 text-yellow-700' },
  often_worth_reviewing: { text: 'Worth Reviewing', className: 'bg-blue-100 text-blue-700' },
};

export function AdditionalCoverageList({ coverages }: AdditionalCoverageListProps) {
  return (
    <div className="space-y-3">
      {coverages.map((coverage) => {
        const relevance = relevanceLabels[coverage.relevance] || relevanceLabels.low;

        return (
          <div
            key={coverage.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${coverage.present ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div>
                <span className="font-medium text-gray-900">{coverage.name}</span>
                {coverage.note && (
                  <p className="text-sm text-gray-500">{coverage.note}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${relevance.className}`}>
                {relevance.text}
              </span>
              <span className="text-sm text-gray-600">
                {coverage.present ? 'Included' : 'Optional'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

**Step 4: Create report section component**

Create `src/components/ReportSection.tsx`:
```typescript
import { ReactNode } from 'react';

interface ReportSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ReportSection({ title, children, className = '' }: ReportSectionProps) {
  return (
    <section className={`mb-8 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h3>
      {children}
    </section>
  );
}

interface StrengthsWeaknessesProps {
  strengths: string[];
  areasToReview: string[];
}

export function StrengthsWeaknesses({ strengths, areasToReview }: StrengthsWeaknessesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-medium text-green-800 mb-2">Key Strengths</h4>
        <ul className="space-y-1">
          {strengths.map((strength, i) => (
            <li key={i} className="text-sm text-green-700 flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              {strength}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="font-medium text-amber-800 mb-2">Areas to Review</h4>
        <ul className="space-y-1">
          {areasToReview.map((area, i) => (
            <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">→</span>
              {area}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

**Step 5: Commit**

```bash
git add src/components && git commit -m "feat: add UI components for policy report display

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Create Report Page

**Files:**
- Create: `src/app/report/[id]/page.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create the dynamic report page**

Create `src/app/report/[id]/page.tsx`:
```typescript
import { notFound } from 'next/navigation';
import { getReport } from '@/lib/storage';
import { GradeCircle } from '@/components/GradeCircle';
import { CoverageCard } from '@/components/CoverageCard';
import { AdditionalCoverageList } from '@/components/AdditionalCoverageList';
import { ReportSection, StrengthsWeaknesses } from '@/components/ReportSection';

interface ReportPageProps {
  params: { id: string };
}

export default function ReportPage({ params }: ReportPageProps) {
  const report = getReport(params.id);

  if (!report) {
    notFound();
  }

  const { homeGrade, autoGrade, combinedGrade, combinedScore } = report;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Policy Pilot Report</h1>
          <p className="text-gray-500 mt-1">
            Generated on {new Date(report.generatedAt).toLocaleDateString()}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Overall Grade Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {combinedGrade && combinedScore && (
              <GradeCircle
                grade={combinedGrade}
                score={combinedScore}
                size="lg"
                label="Overall Grade"
              />
            )}
            {homeGrade && (
              <GradeCircle
                grade={homeGrade.overallGrade}
                score={homeGrade.overallScore}
                size={combinedGrade ? 'md' : 'lg'}
                label="Home Policy"
              />
            )}
            {autoGrade && (
              <GradeCircle
                grade={autoGrade.overallGrade}
                score={autoGrade.overallScore}
                size={combinedGrade ? 'md' : 'lg'}
                label="Auto Policy"
              />
            )}
          </div>
        </div>

        {/* Home Policy Section */}
        {homeGrade && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Home Policy Analysis</h2>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{homeGrade.summary}</p>
            </div>

            <StrengthsWeaknesses
              strengths={homeGrade.keyStrengths}
              areasToReview={homeGrade.areasToReview}
            />

            <ReportSection title="Standard Coverages" className="mt-8">
              <div className="grid gap-4">
                {homeGrade.standardCoverages.map((coverage) => (
                  <CoverageCard key={coverage.name} coverage={coverage} />
                ))}
                <CoverageCard coverage={homeGrade.deductibleGrade} />
              </div>
            </ReportSection>

            <ReportSection title="Additional Coverages">
              <AdditionalCoverageList coverages={homeGrade.additionalCoverages} />
            </ReportSection>
          </div>
        )}

        {/* Auto Policy Section */}
        {autoGrade && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Auto Policy Analysis</h2>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{autoGrade.summary}</p>
            </div>

            <StrengthsWeaknesses
              strengths={autoGrade.keyStrengths}
              areasToReview={autoGrade.areasToReview}
            />

            <ReportSection title="Coverages" className="mt-8">
              <div className="grid gap-4">
                {autoGrade.standardCoverages.map((coverage) => (
                  <CoverageCard key={coverage.name} coverage={coverage} />
                ))}
              </div>
            </ReportSection>
          </div>
        )}

        {/* Footer Disclaimer */}
        <div className="text-center text-sm text-gray-500 mt-8 p-4 bg-gray-100 rounded-lg">
          <p>
            This report is for educational purposes only and does not constitute professional insurance advice.
            Consult with a licensed insurance agent for personalized recommendations.
          </p>
        </div>
      </main>
    </div>
  );
}
```

**Step 2: Update home page**

Modify `src/app/page.tsx`:
```typescript
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Policy Pilot
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered insurance policy analysis and grading
        </p>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            How It Works
          </h2>
          <ol className="text-left space-y-4 text-gray-600">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">1</span>
              <span>Connect your insurance data through our secure intake process</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">2</span>
              <span>Our AI analyzes your home and auto coverage</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">3</span>
              <span>Receive a detailed report with grades and recommendations</span>
            </li>
          </ol>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Your personalized report link will be sent to you after submitting your policy information.
        </p>
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/report src/app/page.tsx && git commit -m "feat: add report page and update home page

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Create Test Endpoint for Development

**Files:**
- Create: `src/app/api/test-grade/route.ts`

**Step 1: Create test endpoint with sample data**

Create `src/app/api/test-grade/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { gradePolicy } from '@/lib/grader';
import { generateId, storeSubmission, storeReport } from '@/lib/storage';
import type { PolicySubmission, HomePolicy, AutoPolicy } from '@/types/policy';

// Sample policy data for testing
const sampleHomePolicy: HomePolicy = {
  type: 'home',
  policyType: 'HO3',
  state: 'TX',
  coverage: {
    dwelling: 350000,
    dwellingType: 'replacement_cost',
    otherStructures: 35000,
    otherStructuresPercent: 10,
    personalProperty: 175000,
    personalPropertyPercent: 50,
    personalPropertyType: 'replacement_cost',
    lossOfUse: 70000,
    lossOfUseType: 'flat_dollar',
    personalLiability: 300000,
    medicalPayments: 5000,
    deductible: 2500,
    deductiblePercent: 0.71,
  },
  additionalCoverages: {
    waterBackup: 10000,
    equipmentBreakdown: true,
    serviceLine: false,
    ordinanceLaw: false,
    identityTheft: false,
    scheduledProperty: false,
  },
  priorClaims: 0,
  hasDetachedStructures: true,
  hasPool: false,
  hasDog: true,
  hasTrampoline: false,
};

const sampleAutoPolicy: AutoPolicy = {
  type: 'auto',
  state: 'TX',
  coverage: {
    bodilyInjuryPerPerson: 100000,
    bodilyInjuryPerAccident: 300000,
    propertyDamage: 100000,
    uninsuredMotoristPerPerson: 100000,
    uninsuredMotoristPerAccident: 300000,
    underinsuredMotoristPerPerson: 100000,
    underinsuredMotoristPerAccident: 300000,
    medicalPayments: 5000,
    collision: 1,
    collisionDeductible: 500,
    comprehensive: 1,
    comprehensiveDeductible: 250,
  },
  vehicles: [
    {
      year: 2022,
      make: 'Toyota',
      model: 'Camry',
      estimatedValue: 28000,
      isFinanced: true,
    },
  ],
  priorClaims: 0,
  hasHealthInsurance: true,
};

export async function GET() {
  try {
    const submission: PolicySubmission = {
      id: generateId(),
      submittedAt: new Date().toISOString(),
      homePolicy: sampleHomePolicy,
      autoPolicy: sampleAutoPolicy,
      contactEmail: 'test@example.com',
      contactName: 'Test User',
    };

    storeSubmission(submission);
    const report = await gradePolicy(submission);
    storeReport(report);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return NextResponse.json({
      success: true,
      reportId: report.id,
      reportUrl: `${baseUrl}/report/${report.id}`,
      report,
    });
  } catch (error) {
    console.error('Test grade error:', error);
    return NextResponse.json(
      { error: 'Failed to generate test report', details: String(error) },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/test-grade && git commit -m "feat: add test endpoint for development and demo purposes

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Final Setup and Documentation

**Files:**
- Create: `.env.local` (from template)
- Create: `README.md`

**Step 1: Create local environment file**

Copy `.env.example` to `.env.local` and fill in your API key:
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual values.

**Step 2: Create README**

Create `README.md`:
```markdown
# Policy Pilot

AI-powered insurance policy grading application. Analyzes home and auto insurance policies and provides educational grades and recommendations.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment template and add your API keys:
   ```bash
   cp .env.example .env.local
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Architecture

- **Next.js 14** with App Router
- **OpenAI GPT-4** for policy analysis
- **Zapier Webhook** integration for receiving Canopy Connect data

## API Endpoints

### POST /api/webhook
Receives policy data from Zapier/Canopy Connect.

**Headers:**
- `x-webhook-secret`: Your webhook secret (optional but recommended)

**Body:** Policy submission data (see `src/types/policy.ts`)

**Response:**
```json
{
  "success": true,
  "reportId": "abc123",
  "reportUrl": "https://yourapp.com/report/abc123",
  "grade": "B"
}
```

### GET /api/test-grade
Generates a test report with sample data (development only).

## Zapier Setup

1. Create a new Zap with Canopy Connect as trigger
2. Add "Webhooks by Zapier" as action
3. Set URL to `https://your-deployed-url.com/api/webhook`
4. Set method to POST
5. Add header `x-webhook-secret` with your secret
6. Map Canopy Connect fields to the expected JSON structure

## Report Page

Reports are available at `/report/[id]` and display:
- Overall letter grades (A-F)
- Individual coverage scores (1-5)
- Strengths and areas to review
- Educational explanations
```

**Step 3: Commit**

```bash
git add README.md && git commit -m "docs: add README with setup and usage instructions

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Run and Verify

**Step 1: Install dependencies**

Run:
```bash
npm install
```

**Step 2: Start development server**

Run:
```bash
npm run dev
```

**Step 3: Test the application**

1. Open http://localhost:3000 to see home page
2. Visit http://localhost:3000/api/test-grade to generate a test report (requires OPENAI_API_KEY)
3. Click the returned reportUrl to view the generated report

**Step 4: Final commit**

```bash
git add -A && git commit -m "chore: verify project setup complete

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Zapier Configuration Guide

Once deployed, configure your Zapier automation:

### Trigger (Canopy Connect)
- Event: "New Submission" or similar

### Action (Webhooks by Zapier)
- Action: "POST"
- URL: `https://your-vercel-url.com/api/webhook`
- Payload Type: JSON
- Data mapping (map Canopy fields to this structure):

```json
{
  "homePolicy": {
    "policyType": "{{canopy.home.policy_type}}",
    "state": "{{canopy.home.state}}",
    "coverage": {
      "dwelling": "{{canopy.home.dwelling_coverage}}",
      "dwellingType": "replacement_cost",
      "otherStructures": "{{canopy.home.other_structures}}",
      "personalProperty": "{{canopy.home.personal_property}}",
      "lossOfUse": "{{canopy.home.loss_of_use}}",
      "personalLiability": "{{canopy.home.liability}}",
      "medicalPayments": "{{canopy.home.med_pay}}",
      "deductible": "{{canopy.home.deductible}}"
    }
  },
  "autoPolicy": {
    "state": "{{canopy.auto.state}}",
    "coverage": {
      "bodilyInjuryPerPerson": "{{canopy.auto.bi_per_person}}",
      "bodilyInjuryPerAccident": "{{canopy.auto.bi_per_accident}}",
      "propertyDamage": "{{canopy.auto.pd}}",
      "uninsuredMotoristPerPerson": "{{canopy.auto.um_per_person}}",
      "uninsuredMotoristPerAccident": "{{canopy.auto.um_per_accident}}",
      "medicalPayments": "{{canopy.auto.med_pay}}",
      "collisionDeductible": "{{canopy.auto.collision_ded}}",
      "comprehensiveDeductible": "{{canopy.auto.comp_ded}}"
    },
    "vehicles": [
      {
        "year": "{{canopy.auto.vehicle_year}}",
        "make": "{{canopy.auto.vehicle_make}}",
        "model": "{{canopy.auto.vehicle_model}}",
        "estimatedValue": "{{canopy.auto.vehicle_value}}",
        "isFinanced": "{{canopy.auto.is_financed}}"
      }
    ]
  },
  "contactEmail": "{{canopy.email}}",
  "contactName": "{{canopy.name}}"
}
```

Note: Actual Canopy Connect field names may differ. Check their documentation or Zapier field mapping UI for exact names.

---

## Future Enhancements (Post-MVP)

1. **Database persistence** - Replace in-memory storage with PostgreSQL/Supabase
2. **Email delivery** - Send report links via email using SendGrid/Resend
3. **PDF export** - Generate downloadable PDF reports
4. **User accounts** - Allow users to save and compare reports
5. **Direct Canopy API** - Bypass Zapier for lower latency
6. **Comparison tool** - Compare multiple policy quotes
