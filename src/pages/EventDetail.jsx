import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Download, Check, ArrowLeft, ImageIcon, Images, Lock } from "lucide-react";
import { getEventById, guestUploadUrl } from "../lib/eventService";
import { countEventMedia } from "../lib/mediaService";
import { useAuth } from "../lib/AuthContext";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import CollaboratorsPanel from "../components/collaborator/CollaboratorsPanel";
import ProUploadPanel from "../components/collaborator/ProUploadPanel";

export default function EventDetail() {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [mediaCount, setMediaCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  useEffect(() => {
    Promise.all([getEventById(eventId), countEventMedia(eventId)])
      .then(([eventData, count]) => {
        setEvent(eventData);
        setMediaCount(count);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-sm text-muted">Loading event…</p>
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

  const isOwner = event.owner_id === user?.id;
  const link = guestUploadUrl(event.slug);

  async function handleCopy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadQr() {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug}-qr.png`;
    a.click();
  }

  return (
    <DashboardLayout>
      <Link to="/dashboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft size={14} />
        Back to events
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-2xl text-ink">
          {event.bride_name} &amp; {event.groom_name}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {new Date(event.wedding_date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {!isOwner && " · You have photographer access to this event"}
        </p>
      </div>

      {isOwner ? (
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <Card>
              <p className="text-sm text-muted">Share this link with your guests</p>
              <div className="mt-3 flex items-center gap-2">
                <code className="flex-1 truncate rounded-lg border border-border bg-bg px-3 py-2.5 text-xs text-ink">
                  {link}
                </code>
                <Button variant="secondary" size="md" onClick={handleCopy}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <ImageIcon size={18} />
                </span>
                <div>
                  <p className="text-lg font-medium text-ink">{mediaCount}</p>
                  <p className="text-xs text-muted-2">memories collected</p>
                </div>
              </Card>

              <Link to={`/events/${eventId}/gallery`}>
                <Card className="flex h-full items-center gap-4 hover:border-gold-dim">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    {event.reveal_date ? <Lock size={18} /> : <Images size={18} />}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">View gallery</p>
                    <p className="text-xs text-muted-2">
                      {event.reveal_date ? "Locked until reveal" : "Open now"}
                    </p>
                  </div>
                </Card>
              </Link>
            </div>

            <Card>
              <h2 className="mb-4 text-sm font-medium text-ink">Photographer access</h2>
              <CollaboratorsPanel eventId={eventId} />
            </Card>

            <Card>
              <h2 className="mb-1 text-sm font-medium text-ink">Upload professional deliverables</h2>
              <ProUploadPanel eventId={eventId} />
            </Card>

            <Card className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink capitalize">{event.plan} plan</p>
                <p className="text-xs text-muted-2">
                  {event.plan === "free"
                    ? "Upgrade for unlimited storage and no watermark"
                    : "Thanks for being on Wedding Premium"}
                </p>
              </div>
              {event.plan === "free" && (
                <Button variant="secondary" size="md" disabled title="Payments coming soon">
                  Upgrade
                </Button>
              )}
            </Card>
          </div>

          <Card className="flex flex-col items-center gap-5 text-center">
            <p className="text-sm text-muted">Guests scan this to upload photos, videos &amp; wishes</p>
            <div ref={qrRef} className="rounded-2xl bg-white p-4">
              <QRCodeCanvas value={link} size={200} level="M" />
            </div>
            <Button variant="secondary" size="md" onClick={handleDownloadQr} className="w-full">
              <Download size={16} />
              Download QR code
            </Button>
          </Card>
        </div>
      ) : (
        <div className="mx-auto flex max-w-lg flex-col gap-6">
          <Link to={`/events/${eventId}/gallery`}>
            <Card className="flex items-center gap-4 hover:border-gold-dim">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                {event.reveal_date ? <Lock size={18} /> : <Images size={18} />}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">View gallery</p>
                <p className="text-xs text-muted-2">
                  {event.reveal_date ? "Locked until reveal" : "Open now"}
                </p>
              </div>
            </Card>
          </Link>

          <Card>
            <h2 className="mb-1 text-sm font-medium text-ink">Upload professional deliverables</h2>
            <ProUploadPanel eventId={eventId} />
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
