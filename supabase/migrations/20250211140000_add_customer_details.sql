-- Migration: Add additional customer details from Canopy
-- Run this in Supabase SQL Editor

-- Add new columns to submissions table
ALTER TABLE submissions 
ADD COLUMN IF NOT EXISTS customer_first_name TEXT,
ADD COLUMN IF NOT EXISTS customer_last_name TEXT,
ADD COLUMN IF NOT EXISTS insurance_provider TEXT,
ADD COLUMN IF NOT EXISTS insurance_provider_friendly TEXT,
ADD COLUMN IF NOT EXISTS session_token TEXT,
ADD COLUMN IF NOT EXISTS primary_address JSONB,
ADD COLUMN IF NOT EXISTS canopy_pull_id TEXT;

-- If customer_name exists and we want to migrate data to first/last
-- UPDATE submissions 
-- SET customer_first_name = split_part(customer_name, ' ', 1),
--     customer_last_name = substring(customer_name from position(' ' in customer_name) + 1)
-- WHERE customer_name IS NOT NULL AND customer_first_name IS NULL;

-- Drop old customer_name column if it exists (optional - keep for backwards compat)
-- ALTER TABLE submissions DROP COLUMN IF EXISTS customer_name;

-- Create drivers table for storing driver information
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Driver details from Canopy
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  gender TEXT,
  age INT,
  marital_status TEXT,
  drivers_license TEXT,
  date_of_birth TEXT,
  is_excluded BOOLEAN DEFAULT FALSE,
  
  -- Canopy IDs
  canopy_driver_id TEXT
);

-- Create documents table for storing document links
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Document details from Canopy
  title TEXT,
  document_type TEXT, -- DECLARATIONS, INSURANCE_ID_CARD, etc.
  date_added DATE,
  file_url TEXT,
  mime_type TEXT,
  
  -- Canopy IDs
  canopy_document_id TEXT,
  canopy_policy_id TEXT
);

-- Create agents table for storing agent/agency info
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Agent details from Canopy
  agency_name TEXT,
  agent_full_name TEXT,
  phone_number TEXT,
  email TEXT,
  address JSONB,
  
  -- Canopy IDs
  canopy_agent_id TEXT
);

-- Create addresses table for storing address details
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Address details from Canopy
  full_address TEXT,
  street1 TEXT,
  street2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT,
  address_nature TEXT, -- MAILING, PHYSICAL, LIENHOLDER, etc.
  
  -- Canopy IDs
  canopy_address_id TEXT
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_drivers_submission ON drivers(submission_id);
CREATE INDEX IF NOT EXISTS idx_drivers_policy ON drivers(policy_id);
CREATE INDEX IF NOT EXISTS idx_documents_submission ON documents(submission_id);
CREATE INDEX IF NOT EXISTS idx_documents_policy ON documents(policy_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);
CREATE INDEX IF NOT EXISTS idx_agents_submission ON agents(submission_id);
CREATE INDEX IF NOT EXISTS idx_addresses_submission ON addresses(submission_id);
CREATE INDEX IF NOT EXISTS idx_submissions_session_token ON submissions(session_token);
CREATE INDEX IF NOT EXISTS idx_submissions_pull_id ON submissions(canopy_pull_id);

-- Enable RLS on new tables
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access on drivers" ON drivers FOR ALL USING (true);
CREATE POLICY "Service role full access on documents" ON documents FOR ALL USING (true);
CREATE POLICY "Service role full access on agents" ON agents FOR ALL USING (true);
CREATE POLICY "Service role full access on addresses" ON addresses FOR ALL USING (true);

-- Update the submission_summaries view to include new fields
DROP VIEW IF EXISTS submission_summaries;
CREATE VIEW submission_summaries AS
SELECT 
  s.id,
  s.created_at,
  s.customer_email,
  s.customer_first_name,
  s.customer_last_name,
  s.customer_phone,
  s.insurance_provider_friendly,
  s.session_token,
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
