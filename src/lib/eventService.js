import { supabase } from "./supabase";

function slugify(brideName, groomName) {
  const base = `${brideName}-${groomName}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

export async function createEvent({ ownerId, brideName, groomName, weddingDate, revealDate, photographerName }) {
  const slug = slugify(brideName, groomName);

  const { data, error } = await supabase
    .from("events")
    .insert({
      owner_id: ownerId,
      slug,
      bride_name: brideName,
      groom_name: groomName,
      wedding_date: weddingDate,
      reveal_date: revealDate || null,
      photographer_name: photographerName || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function listMyEvents(ownerId) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getEventById(eventId) {
  const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single();
  if (error) throw error;
  return data;
}

export async function getEventBySlug(slug) {
  const { data, error } = await supabase.from("events").select("*").eq("slug", slug).single();
  if (error) throw error;
  return data;
}

export function guestUploadUrl(slug) {
  return `${window.location.origin}/e/${slug}`;
}
