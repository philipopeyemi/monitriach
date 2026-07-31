-- MONITRIACH MIGRATION 010: FIX LEADS, CAMPAIGNS & OPPORTUNITIES RLS POLICIES FOR PUBLIC & AUTHENTICATED PERSISTENCE

-- 1. LEADS POLICIES
DROP POLICY IF EXISTS "Allow auth leads" ON leads;
DROP POLICY IF EXISTS "Allow public leads select" ON leads;
DROP POLICY IF EXISTS "Allow public leads insert" ON leads;
DROP POLICY IF EXISTS "Allow public leads update" ON leads;
DROP POLICY IF EXISTS "Allow public leads delete" ON leads;

CREATE POLICY "Allow public leads select" ON leads FOR SELECT USING (true);
CREATE POLICY "Allow public leads insert" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public leads update" ON leads FOR UPDATE USING (true);
CREATE POLICY "Allow public leads delete" ON leads FOR DELETE USING (true);

-- 2. CAMPAIGNS POLICIES
DROP POLICY IF EXISTS "Allow auth campaigns" ON campaigns;
DROP POLICY IF EXISTS "Allow public campaigns select" ON campaigns;
DROP POLICY IF EXISTS "Allow public campaigns insert" ON campaigns;
DROP POLICY IF EXISTS "Allow public campaigns update" ON campaigns;
DROP POLICY IF EXISTS "Allow public campaigns delete" ON campaigns;

CREATE POLICY "Allow public campaigns select" ON campaigns FOR SELECT USING (true);
CREATE POLICY "Allow public campaigns insert" ON campaigns FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public campaigns update" ON campaigns FOR UPDATE USING (true);
CREATE POLICY "Allow public campaigns delete" ON campaigns FOR DELETE USING (true);

-- 3. OPPORTUNITIES POLICIES
DROP POLICY IF EXISTS "Allow auth opportunities" ON opportunities;
DROP POLICY IF EXISTS "Allow public opps select" ON opportunities;
DROP POLICY IF EXISTS "Allow public opps insert" ON opportunities;
DROP POLICY IF EXISTS "Allow public opps update" ON opportunities;
DROP POLICY IF EXISTS "Allow public opps delete" ON opportunities;

CREATE POLICY "Allow public opps select" ON opportunities FOR SELECT USING (true);
CREATE POLICY "Allow public opps insert" ON opportunities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public opps update" ON opportunities FOR UPDATE USING (true);
CREATE POLICY "Allow public opps delete" ON opportunities FOR DELETE USING (true);
