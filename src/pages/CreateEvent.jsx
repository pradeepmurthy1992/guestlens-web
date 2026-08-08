import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { createEvent } from "../lib/eventService";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    brideName: "",
    groomName: "",
    weddingDate: "",
    revealDate: "",
    photographerName: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createEvent({
        ownerId: user.id,
        brideName: form.brideName,
        groomName: form.groomName,
        weddingDate: form.weddingDate,
        revealDate: form.revealDate,
        photographerName: form.photographerName,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-lg">
        <h1 className="font-display text-2xl text-ink">Create your wedding event</h1>
        <p className="mt-1 text-sm text-muted">
          You can change these details later from your dashboard.
        </p>

        <Card className="mt-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="brideName"
                label="Bride's name"
                value={form.brideName}
                onChange={update("brideName")}
                required
              />
              <Input
                id="groomName"
                label="Groom's name"
                value={form.groomName}
                onChange={update("groomName")}
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="weddingDate"
                type="date"
                label="Wedding date"
                value={form.weddingDate}
                onChange={update("weddingDate")}
                required
              />
              <Input
                id="revealDate"
                type="date"
                label="Reveal date (optional)"
                value={form.revealDate}
                onChange={update("revealDate")}
              />
            </div>

            <Input
              id="photographerName"
              label="Photographer name (optional)"
              value={form.photographerName}
              onChange={update("photographerName")}
            />

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="submit" variant="primary" className="mt-2 w-full" disabled={submitting}>
              {submitting ? "Creating…" : "Create event"}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
