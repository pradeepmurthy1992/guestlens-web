import { supabase } from "./supabase";

export async function getPlatformStats() {
  const { data, error } = await supabase.rpc("get_platform_stats").single();
  if (error) throw error;
  return {
    eventCount: data.event_count ?? 0,
    mediaCount: data.media_count ?? 0,
  };
}
