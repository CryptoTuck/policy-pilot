# PolicyPilot Webhook — Zapier Setup Guide

## Endpoint

```
POST https://{your-domain}/api/webhook/canopy
```

For local dev: `http://localhost:3000/api/webhook/canopy`

---

## Headers

| Header | Value | Required |
|--------|-------|----------|
| `Content-Type` | `application/json` | Yes |
| `x-webhook-secret` | `{WEBHOOK_SECRET from .env}` | If configured |

---

## Payload Format

The webhook accepts two formats. Use whichever is easier in Zapier.

### Option 1: Raw Canopy Format (with policies array)

```json
{
  "Pull First Name": "John",
  "Pull Last Name": "Doe", 
  "Pull Account Email": "john@example.com",
  "Pull Phone": "5551234567",
  "sessionToken": "abc123",
  
  "policies": [
    {
      "policy_type": "auto",
      "carrier": { "name": "GEICO" },
      "policy_number": "12345678",
      "effective_date": "2026-01-01",
      "expiration_date": "2026-07-01",
      "premium": 1200.50,
      "vehicles": [
        {
          "year": 2022,
          "make": "Toyota",
          "model": "Camry",
          "vin": "1HGBH41JXMN109186",
          "coverages": [
            {
              "name": "Bodily Injury Liability",
              "friendly_name": "BI",
              "limit_per_person": 100000,
              "limit_per_occurrence": 300000,
              "is_declined": false
            },
            {
              "name": "Property Damage Liability",
              "limit_per_occurrence": 100000,
              "is_declined": false
            },
            {
              "name": "Collision",
              "deductible": 500,
              "is_declined": false
            },
            {
              "name": "Comprehensive",
              "deductible": 250,
              "is_declined": false
            },
            {
              "name": "Medical Payments",
              "limit_per_occurrence": 5000,
              "is_declined": false
            },
            {
              "name": "Uninsured Motorist Bodily Injury Liability",
              "limit_per_person": 100000,
              "limit_per_occurrence": 300000,
              "is_declined": false
            }
          ]
        }
      ]
    },
    {
      "policy_type": "home",
      "carrier": { "name": "State Farm" },
      "policy_number": "H12345",
      "effective_date": "2025-06-01",
      "expiration_date": "2026-06-01",
      "premium": 2400.00,
      "dwellings": [
        {
          "name": "Dwelling Coverage",
          "friendly_name": "Coverage A",
          "limit": 400000
        },
        {
          "name": "Other Structures",
          "friendly_name": "Coverage B", 
          "limit": 40000
        },
        {
          "name": "Personal Property",
          "friendly_name": "Coverage C",
          "limit": 200000
        },
        {
          "name": "Loss of Use",
          "friendly_name": "Coverage D",
          "limit": 80000
        },
        {
          "name": "Personal Liability",
          "friendly_name": "Coverage E",
          "limit_per_occurrence": 300000
        },
        {
          "name": "Medical Payments to Others",
          "friendly_name": "Coverage F",
          "limit_per_person": 5000
        }
      ]
    }
  ]
}
```

### Option 2: Flattened Format (easier for Zapier mapping)

```json
{
  "Pull First Name": "John",
  "Pull Last Name": "Doe",
  "Pull Account Email": "john@example.com",
  "Pull Phone": "5551234567",
  "sessionToken": "abc123",
  
  "autoNames": "Bodily Injury Liability,Property Damage Liability,Collision,Comprehensive",
  "autoAmounts": "300000,100000,,",
  "autoPerPersonLimits": "100000,,,",
  "autoDeductibles": ",,500,250",
  "autoDeclined": "false,false,false,false",
  "autoEffectiveDate": "2026-01-01",
  
  "homeNames": "Dwelling Coverage,Personal Property,Personal Liability,Medical Payments to Others",
  "homeAmounts": "400000,200000,300000,",
  "homePerPerson": ",,,5000",
  "homeDeductibles": "1000,,,",
  "homeDeclined": "false,false,false,false",
  "homeEffectiveDate": "2025-06-01",
  
  "rentersNames": "Personal Property,Personal Liability",
  "rentersAmounts": "30000,100000",
  "rentersDeductibles": "500,",
  "rentersDeclined": "false,false",
  "rentersEffectiveDate": "2025-09-01"
}
```

**Note:** Arrays can be:
- Comma-separated strings: `"value1,value2,value3"`
- JSON arrays: `["value1", "value2", "value3"]`
- Actual arrays (if Zapier supports it)

---

## Response Format

### Success (200)

```json
{
  "success": true,
  "submissionId": "7aec3a23-0c86-41f7-937e-174af7c0aa6a",
  "reportUrl": "https://policypilot.com/report/7aec3a23-0c86-41f7-937e-174af7c0aa6a",
  "sessionToken": "abc123",
  "grades": {
    "home": "B",
    "auto": "A", 
    "renters": null,
    "overall": "A-"
  },
  "formattedCoverages": {
    "home": "Dwelling Coverage: $400,000, Personal Property: $200,000, Personal Liability: $300,000",
    "homeDeductible": "Dwelling Coverage: $1,000",
    "auto": "Bodily Injury Liability: $100,000/$300,000, Property Damage Liability: $100,000, Collision: $500 deductible",
    "renters": null
  }
}
```

### Error (400/401/500)

```json
{
  "error": "Processing failed",
  "details": "No valid policies found in the submitted data",
  "submissionId": "7aec3a23-0c86-41f7-937e-174af7c0aa6a"
}
```

---

## Canopy Coverage Names Reference

### Auto Policy Coverages
| Name | Has Per-Person | Has Per-Incident | Has Deductible |
|------|----------------|------------------|----------------|
| Bodily Injury Liability | ✅ | ✅ | ❌ |
| Property Damage Liability | ❌ | ✅ | ❌ |
| Collision | ❌ | ❌ | ✅ |
| Comprehensive | ❌ | ❌ | ✅ |
| Medical Payments | ❌ | ✅ | ❌ |
| Uninsured Motorist Bodily Injury | ✅ | ✅ | ❌ |
| Underinsured Motorist Bodily Injury | ✅ | ✅ | ❌ |
| Car Rental and Travel Expenses | ✅ | ✅ | ❌ |
| Emergency Road Service | ❌ | ❌ | ❌ |

### Home Policy Coverages
| Name | Typical Field |
|------|---------------|
| Dwelling Coverage | limit (Coverage A) |
| Other Structures | limit (Coverage B) |
| Personal Property | limit (Coverage C) |
| Loss of Use | limit (Coverage D) |
| Personal Liability | limit_per_occurrence (Coverage E) |
| Medical Payments to Others | limit_per_person (Coverage F) |

---

## Zapier Setup Steps

1. **Trigger:** New record in Canopy Connect (or webhook from Canopy)

2. **Action:** Webhooks by Zapier → POST

3. **URL:** `https://your-domain.com/api/webhook/canopy`

4. **Payload Type:** JSON

5. **Data:** Map Canopy fields to webhook format above

6. **Headers:**
   - `x-webhook-secret`: Your secret (if using)

7. **Test:** Send test data, check Supabase for new submission

---

## Environment Variables Needed

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx

# OpenAI (for grading)
OPENAI_API_KEY=sk-xxx

# Optional
WEBHOOK_SECRET=your-secret-here
NEXT_PUBLIC_BASE_URL=https://policypilot.com
```

---

*Last updated: Feb 11, 2026*
