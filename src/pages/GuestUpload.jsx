import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Camera, Video, Mic, MessageSquare } from "lucide-react";
import { getEventBySlug } from "../lib/eventService";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import FileUploadPanel from "../components/guest/FileUploadPanel";
import VoiceRecorderPanel from "../components/guest/VoiceRecorderPanel";
import MessagePanel from "../components/guest/MessagePanel";

const tabs = [
  { id: "photo", label: "Photo", icon: Camera },
  { id: "video", label: "Video", icon: Video },
  { id: "voice", label: "Voice", icon: Mic },
  { id: "message", label: "Message", icon: MessageSquare },
];

export default function GuestUpload() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("photo");
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    getEventBySlug(slug)
      .then(setEvent)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted">
        Loading…
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-ink">This event doesn't exist or isn't live yet.</p>
        <Link to="/" className="text-sm text-gold hover:underline">
          Back to Iniya Kadhai
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <Container className="max-w-lg">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Iniya Kadhai</p>
          <h1 className="mt-3 font-display text-3xl text-ink">
            {event.bride_name} &amp; {event.groom_name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {new Date(event.wedding_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Link to={`/e/${slug}/gallery`} className="mt-2 inline-block text-sm text-gold hover:underline">
            View the gallery →
          </Link>
        </div>

        <Card>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Your name (optional)"
            className="mb-5 h-11 w-full rounded-xl border border-border bg-bg px-4 text-sm text-ink placeholder:text-muted-2 outline-none focus:border-gold-dim"
          />

          <div className="mb-6 grid grid-cols-4 gap-1 rounded-xl border border-border bg-bg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 rounded-lg py-2.5 text-xs transition-colors ${
                  activeTab === tab.id ? "bg-gold text-bg" : "text-muted hover:text-ink"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "photo" && (
            <FileUploadPanel
              eventId={event.id}
              type="photo"
              accept="image/*"
              label="Tap to choose or take a photo"
              guestName={guestName}
            />
          )}
          {activeTab === "video" && (
            <FileUploadPanel
              eventId={event.id}
              type="video"
              accept="video/*"
              label="Tap to choose or record a video"
              guestName={guestName}
            />
          )}
          {activeTab === "voice" && <VoiceRecorderPanel eventId={event.id} guestName={guestName} />}
          {activeTab === "message" && <MessagePanel eventId={event.id} guestName={guestName} />}
        </Card>
      </Container>
    </div>
  );
}
