import { useCallback, useEffect, useState } from "react";
import { X, UserPlus } from "lucide-react";
import { listCollaborators, addCollaborator, removeCollaborator } from "../../lib/eventService";
import Button from "../ui/Button";

export default function CollaboratorsPanel({ eventId }) {
  const [collaborators, setCollaborators] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    return listCollaborators(eventId).then(setCollaborators);
  }, [eventId]);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  async function handleInvite(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addCollaborator(eventId, email);
      setEmail("");
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRemove(id) {
    await removeCollaborator(id);
    refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        Invite your photographer by email. They'll be able to sign in and upload professional
        photos and videos to this event.
      </p>

      <form onSubmit={handleInvite} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="photographer@example.com"
          className="h-11 flex-1 rounded-xl border border-border bg-bg px-4 text-sm text-ink placeholder:text-muted-2 outline-none focus:border-gold-dim"
        />
        <Button type="submit" variant="secondary" size="md" disabled={submitting}>
          <UserPlus size={16} />
          Invite
        </Button>
      </form>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && collaborators.length > 0 && (
        <ul className="flex flex-col gap-2">
          {collaborators.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-ink"
            >
              {c.email}
              <button
                type="button"
                onClick={() => handleRemove(c.id)}
                className="text-muted-2 hover:text-red-400"
                aria-label={`Remove ${c.email}`}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
