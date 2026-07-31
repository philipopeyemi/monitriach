import { supabase } from "@/lib/supabaseClient";

export interface WorkspaceSettingsRecord {
  id: string;
  workspace_id?: string | null;
  company_domain?: string | null;
  openai_api_key?: string | null;
  anthropic_api_key?: string | null;
  ses_domain?: string | null;
  ses_region?: string | null;
}

export const settingService = {
  async getSettings(workspaceId?: string): Promise<WorkspaceSettingsRecord | null> {
    const { data, error } = await supabase
      .from("workspace_settings")
      .select("*")
      .single();

    if (error) return null;
    return data;
  },

  async updateSettings(settings: Partial<WorkspaceSettingsRecord>) {
    const { data, error } = await supabase
      .from("workspace_settings")
      .upsert([settings])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
