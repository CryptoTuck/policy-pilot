-- EZLynx quotes table for competitive comparisons

CREATE TABLE ezlynx_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  carrier_name TEXT NOT NULL,
  carrier_logo_url TEXT,
  policy_type TEXT NOT NULL CHECK (policy_type IN ('home', 'auto', 'bundle')),
  monthly_premium_cents INTEGER,
  annual_premium_cents INTEGER NOT NULL,
  coverage_summary JSONB,
  deductibles JSONB,
  is_recommended BOOLEAN DEFAULT FALSE,
  recommendation_reason TEXT,
  bind_url TEXT,
  ezlynx_quote_id TEXT,
  source TEXT DEFAULT 'manual',
  expires_at TIMESTAMPTZ
);

CREATE INDEX idx_ezlynx_quotes_submission ON ezlynx_quotes(submission_id);

ALTER TABLE ezlynx_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on ezlynx_quotes" ON ezlynx_quotes
  FOR ALL USING (true);
