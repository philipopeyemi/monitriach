-- MONITRIACH PHASE 4: REVENUE INTELLIGENCE ENGINE DDL MIGRATION (009)

-- 1. Research Jobs Table
CREATE TABLE IF NOT EXISTS company_research_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    website_url VARCHAR(550),
    status VARCHAR(50) DEFAULT 'Queued' CHECK (status IN ('Queued', 'Running', 'Completed', 'Failed')),
    industry VARCHAR(255),
    country VARCHAR(100),
    company_size VARCHAR(100),
    employee_estimate INTEGER,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    social_links JSONB DEFAULT '{}'::jsonb,
    description TEXT,
    funding_info VARCHAR(255),
    keywords TEXT[],
    confidence_score INTEGER DEFAULT 90,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buying Signals Table
CREATE TABLE IF NOT EXISTS buying_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    signal_type VARCHAR(100) NOT NULL, -- Hiring, Funding, Expansion, Tech Migration, Redesign
    description TEXT NOT NULL,
    confidence INTEGER DEFAULT 85,
    source VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Pain Points Table
CREATE TABLE IF NOT EXISTS pain_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    pain_description TEXT NOT NULL,
    evidence TEXT,
    confidence INTEGER DEFAULT 88,
    potential_solution TEXT,
    estimated_roi VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ICP Match Scores Table
CREATE TABLE IF NOT EXISTS icp_match_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    industry_fit INTEGER DEFAULT 90,
    budget_fit INTEGER DEFAULT 85,
    company_size_fit INTEGER DEFAULT 95,
    problem_fit INTEGER DEFAULT 88,
    urgency INTEGER DEFAULT 82,
    overall_match_score INTEGER DEFAULT 88,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Offer Recommendations Table
CREATE TABLE IF NOT EXISTS offer_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    recommended_service VARCHAR(255) NOT NULL,
    expected_roi VARCHAR(100),
    estimated_price VARCHAR(100),
    estimated_timeline VARCHAR(100),
    reasoning TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Executive Timeline Table
CREATE TABLE IF NOT EXISTS executive_timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL, -- Research, Signal, Pain, Offer, Outreach, Reply, Meeting
    title VARCHAR(255) NOT NULL,
    description TEXT,
    actor VARCHAR(100) DEFAULT 'MONITRIACH AI',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for high-frequency queries
CREATE INDEX IF NOT EXISTS idx_research_jobs_opp ON company_research_jobs(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_signals_opp ON buying_signals(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_pain_points_opp ON pain_points(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_icp_opp ON icp_match_scores(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_offers_opp ON offer_recommendations(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_timeline_opp ON executive_timeline_events(opportunity_id);

-- Enable RLS
ALTER TABLE company_research_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE buying_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE pain_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE icp_match_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE executive_timeline_events ENABLE ROW LEVEL SECURITY;

-- Public RLS Policies for authenticated users
CREATE POLICY "Allow auth research jobs" ON company_research_jobs FOR ALL USING (true);
CREATE POLICY "Allow auth buying signals" ON buying_signals FOR ALL USING (true);
CREATE POLICY "Allow auth pain points" ON pain_points FOR ALL USING (true);
CREATE POLICY "Allow auth icp scores" ON icp_match_scores FOR ALL USING (true);
CREATE POLICY "Allow auth offer recs" ON offer_recommendations FOR ALL USING (true);
CREATE POLICY "Allow auth timeline events" ON executive_timeline_events FOR ALL USING (true);
