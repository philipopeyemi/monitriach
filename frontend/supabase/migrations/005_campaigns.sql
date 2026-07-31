-- Migration: 005_campaigns.sql
-- Description: Campaigns, Messages, and Agent Tasks tables

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

CREATE TABLE IF NOT EXISTS public.agent_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  status TEXT DEFAULT 'IDLE',
  task_description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
