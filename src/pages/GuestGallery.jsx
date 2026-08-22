import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventBySlug, isRevealed } from "../lib/eventService";
import { listEventMedia } from "../lib/mediaService";
import Container from "../components/ui/Container";
import GalleryContent from "../components/gallery/GalleryContent";

export default function GuestGallery() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getEventBySlug(slug)
      .then(async (eventData) => {
        setEvent(eventData);
        if (isRevealed(eventData)) {
          setMedia(await listEventMedia(eventData.id));
        }
      })
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
      <Container className="max-w-4xl">
        <div className="mb-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Iniya Kadhai</p>
          <h1 className="mt-3 font-display text-3xl text-ink">
            {event.bride_name} &amp; {event.groom_name}
          </h1>
          <Link
            to={`/e/${slug}`}
            className="mt-2 inline-block text-sm text-muted hover:text-ink"
          >
            Add your own photo, video or wish →
          </Link>
        </div>

        <GalleryContent event={event} media={media} />
      </Container>
    </div>
  );
}
