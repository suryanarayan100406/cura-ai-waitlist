CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  use_case TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'website'
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Insert only"
ON waitlist
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Count only"
ON waitlist
FOR SELECT
USING (true);
