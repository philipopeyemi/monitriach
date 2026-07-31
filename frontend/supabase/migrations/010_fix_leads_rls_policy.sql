-- MONITRIACH MIGRATION 010: FIX LEADS & ENTITIES RLS POLICIES FOR PUBLIC & AUTHENTICATED PERSISTENCE

-- Drop restrictive RLS policies if existing
DROP POLICY IF EXISTS "Allow auth leads" ON leads;
DROP POLICY IF EXISTS "Allow public leads select" ON leads;
DROP POLICY IF EXISTS "Allow public leads insert" ON leads;
DROP POLICY IF EXISTS "Allow public leads update" ON leads;
DROP POLICY IF EXISTS "Allow public leads delete" ON leads;

-- Create permissive RLS policies on leads for both anon & authenticated roles
CREATE POLICY "Allow public leads select" ON leads FOR SELECT USING (true);
CREATE POLICY "Allow public leads insert" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public leads update" ON leads FOR UPDATE USING (true);
CREATE POLICY "Allow public leads delete" ON leads FOR DELETE USING (true);

-- Ensure RLS policies on opportunities, campaigns, notifications, business_memory are equally permissive
DROP POLICY IF EXISTS "Allow public opps select" ON opportunities;
DROP POLICY IF EXISTS "Allow public opps insert" ON opportunities;
DROP POLICY IF EXISTS "Allow public opps update" ON opportunities;
DROP POLICY IF EXISTS "Allow public opps delete" ON opportunities;

CREATE POLICY "Allow public opps select" ON opportunities FOR SELECT USING (true);
CREATE POLICY "Allow public opps insert" ON opportunities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public opps update" ON opportunities FOR UPDATE USING (true);
CREATE POLICY "Allow public opps delete" ON opportunities FOR DELETE USING (true);
