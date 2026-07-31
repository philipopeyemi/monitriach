import { supabase } from "@/lib/supabaseClient";

export interface OpportunityRecord {
  id: string;
  workspace_id?: string | null;
  company_name: string;
  domain: string;
  contact_name?: string | null;
  contact_email?: string | null;
  ai_confidence_score?: number | null;
  stage?: string | null;
  value_amount?: number | null;
  research_summary?: string | null;
  created_at?: string;
}

export const opportunityService = {
  async getOpportunities(): Promise<OpportunityRecord[]> {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  },

  async createOpportunity(opp: Omit<OpportunityRecord, "id">): Promise<OpportunityRecord | null> {
    const { data, error } = await supabase
      .from("opportunities")
      .insert([opp])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateOpportunity(id: string, updates: Partial<OpportunityRecord>) {
    const { data, error } = await supabase
      .from("opportunities")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
