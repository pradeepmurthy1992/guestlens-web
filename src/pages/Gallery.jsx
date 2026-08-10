import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getEventById, isRevealed } from "../lib/eventService";
import { listEventMedia } from "../lib/mediaService";
import DashboardLayout from "../components/layout/DashboardLayout";
import GalleryContent from "../components/gallery/GalleryContent";

export default function Gallery() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventById(eventId)
      .then(async (eventData) => {
        setEvent(eventData);
        if (isRevealed(eventData)) {
          setMedia(await listEventMedia(eventId));
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-sm text-muted">Loading gallery…</p>
      </DashboardLayout>
    );
  }

  if (error || !event) {
    return (
      <DashboardLayout>
        <p className="text-sm text-red-400">{error || "Event not found."}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Link
        to={`/events/${eventId}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft size={14} />
        Back to event
      </Link>

      <h1 className="font-display text-2xl text-ink">
        {event.bride_name} &amp; {event.groom_name}'s gallery
      </h1>

      <GalleryContent event={event} media={media} />
    </DashboardLayout>
  );
}
