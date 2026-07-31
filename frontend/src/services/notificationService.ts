import { supabase } from "@/lib/supabaseClient";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: "OPPORTUNITY" | "OUTREACH" | "SYSTEM" | "MEETING";
  timestamp: string;
  read: boolean;
  link?: string;
}

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return (data || []).map((n) => ({
      id: n.id,
      title: n.title,
      description: n.description || "",
      type: n.type || "SYSTEM",
      timestamp: n.created_at || new Date().toISOString(),
      read: n.read || false,
      link: n.link || undefined,
    }));
  },

  async createNotification(notif: { title: string; description: string; type?: string }) {
    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          title: notif.title,
          description: notif.description,
          type: notif.type || "SYSTEM",
          read: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
