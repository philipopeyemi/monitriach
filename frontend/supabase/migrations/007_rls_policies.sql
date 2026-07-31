-- Migration: 007_rls_policies.sql
-- Description: Row Level Security (RLS) Policies for all public tables

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

-- Security Policies
CREATE POLICY "Allow users full access to own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
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
