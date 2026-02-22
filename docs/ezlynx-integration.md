# EZLynx Quote Integration

## Overview
Policy Pilot receives policy data from Canopy Connect, grades it with AI, and displays a report card at `/report/[id]`. EZLynx is used as the comparative rater to generate competitive quotes. This document outlines the integration path and how quotes are delivered back into Policy Pilot for display.

## End-to-end Flow (Canopy → EZLynx → Policy Pilot)
1. **Canopy Connect** pulls the insured’s existing policy data and sends the webhook to Policy Pilot.
2. **Policy Pilot** grades the policy and generates the report at `/report/[id]`.
3. **Agent sends data to EZLynx** from the Canopy dashboard, launching EZLynx comparative rating.
4. **EZLynx generates quotes** (330+ carriers) and provides quote data.
5. **Policy Pilot receives quotes** via the quote API or webhook and stores them in Supabase.
6. **Report page displays quotes** in the “Competitive Quotes” section.

## How the Canopy + EZLynx Workflow Operates
- Agents use the Canopy Connect dashboard to initiate quoting.
- Canopy pushes data into EZLynx’s comparative rater (typically through agency-level integrations).
- EZLynx returns carrier premiums and coverage summaries to the agency workflow.
- Policy Pilot can accept that output through a webhook or manual API submission.

## EZLynx Comparative Quotes
EZLynx aggregates quotes across a large carrier network (330+ carriers depending on line of business) and returns a comparative premium table. Policy Pilot stores those quotes in the `ezlynx_quotes` table for display in the report.

## Manual Quote Entry API
Use `POST /api/quotes` to submit quotes manually.

Example payload (single submission):
```json
{
  "submission_id": "<submission-uuid>",
  "quotes": [
    {
      "carrier_name": "Acme Insurance",
      "policy_type": "home",
      "annual_premium_cents": 182500,
      "monthly_premium_cents": 15208,
      "coverage_summary": {
        "dwelling": 350000,
        "personal_property": 175000
      },
      "deductibles": {
        "all_perils": 2500
      },
      "is_recommended": true,
      "recommendation_reason": "Best overall value with higher liability limits",
      "bind_url": "https://carrier.example.com/bind"
    }
  ]
}
```

You can also submit an array of quotes where each item includes its own `submission_id`.

## Webhook Format (Automated Delivery)
Send `POST /api/quotes/webhook` with `x-webhook-secret` (optional) and a payload that maps to Policy Pilot’s quote structure.

Supported fields (snake_case or camelCase):
- `submission_id` or `submissionId`
- `carrier_name` or `carrierName`
- `policy_type` or `policyType` (home, auto, bundle)
- `annual_premium_cents` or `annualPremium` (dollars)
- `monthly_premium_cents` or `monthlyPremium` (dollars)
- `coverage_summary` or `coverageSummary`
- `deductibles`
- `is_recommended` or `recommended`
- `recommendation_reason` or `recommendationReason`
- `bind_url` or `bindUrl`
- `ezlynx_quote_id` or `quoteId`
- `expires_at` or `expiresAt`

Example webhook payload:
```json
{
  "submission_id": "<submission-uuid>",
  "quotes": [
    {
      "carrierName": "Lighthouse Mutual",
      "policyType": "home",
      "annualPremium": 1960,
      "monthlyPremium": 163,
      "coverageSummary": {
        "dwelling": 300000,
        "personal_property": 150000
      },
      "deductibles": {
        "all_perils": 2000
      },
      "recommended": true
    }
  ]
}
```

## Future Automation Roadmap
- Direct automation for EZLynx output ingestion (no manual export).
- Carrier-level bind links with deep links into EZLynx workflows.
- Automated quote refresh before `expires_at`.
- Expanded comparison analytics on the report page (savings by coverage category).
