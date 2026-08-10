import { useState } from "react";
import { Check } from "lucide-react";
import Button from "../ui/Button";
import { addGuestMessage } from "../../lib/mediaService";

export default function MessagePanel({ eventId, guestName }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await addGuestMessage({ eventId, uploaderName: guestName, message });
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <Check size={28} className="text-gold" />
        <p className="text-ink">Your message was added</p>
        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            setMessage("");
            setStatus("idle");
          }}
        >
          Leave another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your wishes for the couple…"
        rows={5}
        required
        className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted-2 outline-none focus:border-gold-dim"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" variant="primary" size="md" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
