import { supabase } from "@/lib/supabaseClient";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  domain?: string | null;
  owner_id?: string | null;
}

export interface Workspace {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
}

export const organizationService = {
  async getOrganizations(): Promise<Organization[]> {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  },

  async getWorkspaces(organizationId: string): Promise<Workspace[]> {
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  },

  async createOrganization(name: string, domain?: string): Promise<Organization | null> {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const { data, error } = await supabase
      .from("organizations")
      .insert([{ name, slug, domain }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
