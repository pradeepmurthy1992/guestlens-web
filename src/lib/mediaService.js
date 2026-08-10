import { supabase } from "./supabase";

function extensionFor(file) {
  const parts = file.name.split(".");
  return parts.length > 1 ? parts.pop() : "bin";
}

export async function uploadEventFile({ eventId, file, type, uploaderName, message, isProfessional = false }) {
  const path = `${eventId}/${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extensionFor(file)}`;

  const { error: uploadError } = await supabase.storage.from("event-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { error: insertError } = await supabase.from("media").insert({
    event_id: eventId,
    type,
    storage_path: path,
    uploader_name: uploaderName || null,
    message: message || null,
    is_professional: isProfessional,
  });
  if (insertError) throw insertError;
}

export async function addGuestMessage({ eventId, uploaderName, message }) {
  const { error } = await supabase.from("media").insert({
    event_id: eventId,
    type: "message",
    uploader_name: uploaderName || null,
    message,
  });
  if (error) throw error;
}

export async function countEventMedia(eventId) {
  const { count, error } = await supabase
    .from("media")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId);
  if (error) throw error;
  return count ?? 0;
}

export async function listEventMedia(eventId) {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export function publicMediaUrl(storagePath) {
  const { data } = supabase.storage.from("event-media").getPublicUrl(storagePath);
  return data.publicUrl;
}
