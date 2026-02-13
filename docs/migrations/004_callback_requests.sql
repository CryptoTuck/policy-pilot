-- Callback Requests Table
-- Stores phone number callback requests from users who want agent contact

CREATE TABLE IF NOT EXISTS callback_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255),
  submission_id UUID REFERENCES submissions(id),
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, completed, cancelled
  notes TEXT,
  agent_name VARCHAR(255),
  contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_callback_requests_status ON callback_requests(status);
CREATE INDEX idx_callback_requests_created_at ON callback_requests(created_at DESC);
CREATE INDEX idx_callback_requests_submission_id ON callback_requests(submission_id);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_callback_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER callback_requests_updated_at
  BEFORE UPDATE ON callback_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_callback_requests_updated_at();
