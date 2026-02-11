-- Split customer_name into customer_first_name and customer_last_name

-- Drop view first (depends on customer_name column)
DROP VIEW IF EXISTS submission_summaries;

-- Add new columns (IF NOT EXISTS in case of partial prior run)
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS customer_first_name TEXT;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS customer_last_name TEXT;

-- Migrate existing data (split on first space)
UPDATE submissions
SET
  customer_first_name = CASE
    WHEN customer_name IS NOT NULL AND customer_name != '' THEN split_part(customer_name, ' ', 1)
    ELSE NULL
  END,
  customer_last_name = CASE
    WHEN customer_name IS NOT NULL AND position(' ' in customer_name) > 0 THEN substring(customer_name from position(' ' in customer_name) + 1)
    ELSE NULL
  END;

-- Drop old column
ALTER TABLE submissions DROP COLUMN customer_name;

-- Recreate the view with updated columns
CREATE VIEW submission_summaries AS
SELECT
  s.id,
  s.created_at,
  s.customer_email,
  s.customer_first_name,
  s.customer_last_name,
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
