import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { getEventById } from "../lib/eventService";
import { listEventMedia } from "../lib/mediaService";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Countdown from "../components/ui/Countdown";
import MediaTile from "../components/gallery/MediaTile";

function isRevealed(event) {
  if (!event.reveal_date) return true;
  const today = new Date();
  const reveal = new Date(event.reveal_date);
  return today.setHours(0, 0, 0, 0) >= reveal.setHours(0, 0, 0, 0);
}

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

      {!isRevealed(event) ? (
        <Card className="mt-8 flex flex-col items-center gap-4 py-16 text-center">
          <Lock size={22} className="text-gold" />
          <p className="text-ink">Your gallery is still locked</p>
          <p className="max-w-sm text-sm text-muted">
            Guest photos, videos and wishes are being collected in the background. Everything
            unlocks on your reveal date —{" "}
            {new Date(event.reveal_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            .
          </p>
          <div className="mt-2">
            <Countdown date={event.reveal_date} />
          </div>
        </Card>
      ) : media.length === 0 ? (
        <Card className="mt-8 flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-ink">No memories yet</p>
          <p className="max-w-xs text-sm text-muted">
            Share your event link or QR code with guests to start collecting photos and wishes.
          </p>
        </Card>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <MediaTile key={item.id} item={item} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
