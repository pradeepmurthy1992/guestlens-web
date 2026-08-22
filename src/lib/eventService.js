import { supabase } from "./supabase";

export function slugify(brideName, groomName) {
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

// Builds an absolute URL to a client-side route, respecting both the
// Vite base path (e.g. "/guestlens-web/" on GitHub Pages) and hash routing.
export function appUrl(path) {
  return `${window.location.origin}${import.meta.env.BASE_URL}#${path}`;
}

export function guestUploadUrl(slug) {
  return appUrl(`/e/${slug}`);
}

export function isRevealed(event) {
  if (!event.reveal_date) return true;
  const today = new Date();
  const reveal = new Date(event.reveal_date);
  return today.setHours(0, 0, 0, 0) >= reveal.setHours(0, 0, 0, 0);
}

export async function listInvitedEvents(email) {
  const { data, error } = await supabase
    .from("event_collaborators")
    .select("event:events(*)")
    .eq("email", email);

  if (error) throw error;
  return data.map((row) => row.event).filter(Boolean);
}

export async function listCollaborators(eventId) {
  const { data, error } = await supabase
    .from("event_collaborators")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function addCollaborator(eventId, email) {
  const { error } = await supabase
    .from("event_collaborators")
    .insert({ event_id: eventId, email: email.trim().toLowerCase() });
  if (error) throw error;
}

export async function removeCollaborator(collaboratorId) {
  const { error } = await supabase.from("event_collaborators").delete().eq("id", collaboratorId);
  if (error) throw error;
}
