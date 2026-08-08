import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Calendar, ExternalLink } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { listMyEvents } from "../lib/eventService";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    listMyEvents(user.id)
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <DashboardLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink">Your events</h1>
          <p className="mt-1 text-sm text-muted">Create and manage your wedding galleries.</p>
        </div>
        <Button as={Link} to="/create-event" variant="primary">
          <Plus size={16} />
          Create event
        </Button>
      </div>

      {loading && <p className="text-sm text-muted">Loading your events…</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <Card className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-ink">No events yet</p>
          <p className="max-w-xs text-sm text-muted">
            Create your first event to get a shareable gallery link and QR code.
          </p>
          <Button as={Link} to="/create-event" variant="primary" className="mt-2">
            <Plus size={16} />
            Create event
          </Button>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg text-ink">
                  {event.bride_name} &amp; {event.groom_name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-2">
                  <Calendar size={12} />
                  {new Date(event.wedding_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-medium capitalize text-gold">
                {event.status}
              </span>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-2">
              <ExternalLink size={12} />
              guestlens.app/{event.slug}
            </p>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
