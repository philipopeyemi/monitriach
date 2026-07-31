import { supabase } from "@/lib/supabaseClient";

export interface NotificationItem {
  id: string;
  workspace_id?: string | null;
  title: string;
  description: string;
  read: boolean;
  created_at: string;
}

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  }
};
