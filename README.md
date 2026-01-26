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

## Testing

Visit the home page and click the "Generate Test Report" button in the DEV MODE section to create a sample report with mock data.

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
