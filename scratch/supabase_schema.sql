-- =========================================================
-- MONITRIACH PRODUCTION SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'MEMBER',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORGANIZATIONS TABLE
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT,
  owner_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. WORKSPACES TABLE
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. OPPORTUNITIES TABLE
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

-- 5. LEADS TABLE
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

-- 6. CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_audience TEXT,
  status TEXT DEFAULT 'DRAFT',
  sent_count INT DEFAULT 0,
  open_rate NUMERIC(5,2) DEFAULT 0.00,
  reply_rate NUMERIC(5,2) DEFAULT 0.00,
  meetings_booked INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MESSAGES / INBOX TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sentiment TEXT DEFAULT 'NEUTRAL',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BUSINESS MEMORY TABLE
CREATE TABLE IF NOT EXISTS public.business_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. AGENT TASKS TABLE
CREATE TABLE IF NOT EXISTS public.agent_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  status TEXT DEFAULT 'IDLE',
  task_description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. WORKSPACE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.workspace_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID UNIQUE REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_domain TEXT,
  openai_api_key TEXT,
  anthropic_api_key TEXT,
  ses_domain TEXT,
  ses_region TEXT DEFAULT 'us-east-1',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users access
CREATE POLICY "Allow authenticated read/write on profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on organizations" ON public.organizations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on workspaces" ON public.workspaces FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on opportunities" ON public.opportunities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on campaigns" ON public.campaigns FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on messages" ON public.messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on business_memory" ON public.business_memory FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on agent_tasks" ON public.agent_tasks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on notifications" ON public.notifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read/write on workspace_settings" ON public.workspace_settings FOR ALL USING (auth.role() = 'authenticated');
