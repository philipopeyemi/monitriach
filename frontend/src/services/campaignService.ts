import { supabase } from "@/lib/supabaseClient";

export interface CampaignRecord {
  id: string;
  workspace_id?: string | null;
  name: string;
  target_audience?: string | null;
  status?: string | null;
  sent_count?: number | null;
  open_rate?: number | null;
  reply_rate?: number | null;
  meetings_booked?: number | null;
  created_at?: string;
}

export const campaignService = {
  async getCampaigns(): Promise<CampaignRecord[]> {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  },

  async createCampaign(campaign: Omit<CampaignRecord, "id">): Promise<CampaignRecord | null> {
    const { data, error } = await supabase
      .from("campaigns")
      .insert([campaign])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCampaign(id: string, updates: Partial<CampaignRecord>) {
    const { data, error } = await supabase
      .from("campaigns")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCampaign(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("campaigns")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  }
};
