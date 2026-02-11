-- PolicyPilot Supabase Schema
-- Run this in the Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Submissions table: stores raw Canopy data and processing status
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Customer info (if available from Canopy metadata)
  customer_email TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  
  -- Raw data storage
  raw_canopy_data JSONB NOT NULL,
  
  -- Processing status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  
  -- Results
  grading_result JSONB,
  formatted_output JSONB,
  
  -- Timestamps
  processed_at TIMESTAMPTZ
);

-- Policies table: individual policies extracted from a submission
CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Policy identification
  policy_type TEXT NOT NULL CHECK (policy_type IN ('home', 'auto', 'renters')),
  policy_index INT, -- 0, 1, 2 from Canopy
  
  -- Policy details
  carrier TEXT,
  policy_number TEXT,
  status TEXT, -- e.g., 'ACTIVE'
  effective_date DATE,
  expiration_date DATE,
  renewal_date DATE,
  
  -- Premium details
  premium_cents BIGINT,
  paid_in_full BOOLEAN,
  amount_due_cents BIGINT,
  amount_paid_cents BIGINT,
  
  -- For auto policies
  vehicle_count INT DEFAULT 0
);

-- Vehicles table (for auto policies)
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Vehicle details
  vehicle_index INT NOT NULL,
  year INT,
  make TEXT,
  model TEXT,
  vin TEXT,
  vehicle_type TEXT,
  uses TEXT
);

-- Coverages table: individual coverage items for each policy
CREATE TABLE coverages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Coverage details
  name TEXT NOT NULL,
  friendly_name TEXT,
  
  -- Limits (all in cents)
  per_incident_limit_cents BIGINT,
  per_person_limit_cents BIGINT,
  deductible_cents BIGINT,
  
  -- Status
  is_declined BOOLEAN DEFAULT FALSE,
  
  -- For auto: which vehicle this applies to
  vehicle_index INT,
  
  -- Original index from Canopy array
  source_index INT
);

-- Grading results table: stores OpenAI grading output
CREATE TABLE grading_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Formatted coverage strings
  formatted_home_coverage TEXT,
  formatted_home_deductible TEXT,
  formatted_auto_coverage TEXT,
  formatted_renters_coverage TEXT,
  
  -- Grading scores
  home_score INT,
  auto_score INT,
  renters_score INT,
  overall_score INT,
  
  -- AI recommendations
  recommendations JSONB,
  
  -- Full OpenAI response
  openai_response JSONB
);

-- Indexes for common queries
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created ON submissions(created_at DESC);
CREATE INDEX idx_submissions_email ON submissions(customer_email);
CREATE INDEX idx_policies_submission ON policies(submission_id);
CREATE INDEX idx_policies_type ON policies(policy_type);
CREATE INDEX idx_coverages_policy ON coverages(policy_id);
CREATE INDEX idx_grading_results_submission ON grading_results(submission_id);

-- Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE coverages ENABLE ROW LEVEL SECURITY;
ALTER TABLE grading_results ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for webhook backend)
CREATE POLICY "Service role full access on submissions" ON submissions
  FOR ALL USING (true);
  
CREATE POLICY "Service role full access on policies" ON policies
  FOR ALL USING (true);
  
CREATE POLICY "Service role full access on coverages" ON coverages
  FOR ALL USING (true);
  
CREATE POLICY "Service role full access on grading_results" ON grading_results
  FOR ALL USING (true);

-- Helpful views

-- View for getting full submission details with policy summary
CREATE VIEW submission_summaries AS
SELECT 
  s.id,
  s.created_at,
  s.customer_email,
  s.customer_name,
  s.status,
  s.processed_at,
  (SELECT COUNT(*) FROM policies p WHERE p.submission_id = s.id) as policy_count,
  (SELECT array_agg(DISTINCT policy_type) FROM policies p WHERE p.submission_id = s.id) as policy_types,
  gr.overall_score,
  gr.home_score,
  gr.auto_score,
  gr.renters_score
FROM submissions s
LEFT JOIN grading_results gr ON gr.submission_id = s.id;

-- Function to clean up old submissions (optional - run on a schedule)
CREATE OR REPLACE FUNCTION cleanup_old_submissions(days_old INT DEFAULT 30)
RETURNS INT AS $$
DECLARE
  deleted_count INT;
BEGIN
  DELETE FROM submissions 
  WHERE created_at < NOW() - (days_old || ' days')::INTERVAL;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Usage: SELECT cleanup_old_submissions(30);
