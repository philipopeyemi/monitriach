-- Migration: 008_indexes.sql
-- Description: Performance optimization indices for high-frequency database queries

CREATE INDEX IF NOT EXISTS idx_opportunities_workspace_id ON public.opportunities(workspace_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON public.opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_leads_workspace_id ON public.leads(workspace_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_campaigns_workspace_id ON public.campaigns(workspace_id);
CREATE INDEX IF NOT EXISTS idx_messages_workspace_id ON public.messages(workspace_id);
CREATE INDEX IF NOT EXISTS idx_notifications_workspace_id ON public.notifications(workspace_id);
