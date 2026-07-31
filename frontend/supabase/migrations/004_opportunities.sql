-- Migration: 004_opportunities.sql
-- Description: Opportunities and Leads tables

CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  domain TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  ai_confidence_score INT DEFAULT 85,
  stage TEXT DEFAULT 'RESEARCHING',
  value_amount NUMERIC(12,2) DEFAULT 0.00,
  research_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'NEW',
  intent_score INT DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
