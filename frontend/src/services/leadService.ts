import { supabase } from "@/lib/supabaseClient";

export interface LeadRecord {
  id: string;
  workspace_id?: string | null;
  opportunity_id?: string | null;
  name: string;
  title?: string | null;
  company?: string | null;
  email: string;
  phone?: string | null;
  status?: string | null;
  intent_score?: number | null;
  created_at?: string;
}

export const leadService = {
  async getLeads(): Promise<LeadRecord[]> {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  },

  async createLead(lead: Omit<LeadRecord, "id">): Promise<LeadRecord | null> {
    const { data, error } = await supabase
      .from("leads")
      .insert([lead])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
