import { Lock } from "lucide-react";
import Card from "../ui/Card";
import Countdown from "../ui/Countdown";
import MediaTile from "./MediaTile";

export default function GalleryContent({ event, media, locked }) {
  if (locked) {
    return (
      <Card className="mt-8 flex flex-col items-center gap-4 py-16 text-center">
        <Lock size={22} className="text-gold" />
        <p className="text-ink">The gallery is still locked for guests</p>
        <p className="max-w-sm text-sm text-muted">
          Photos, videos and wishes are being collected in the background. It unlocks for
          guests on the reveal date —{" "}
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
    );
  }

  if (media.length === 0) {
    return (
      <Card className="mt-8 flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-ink">No memories yet</p>
        <p className="max-w-xs text-sm text-muted">Nothing has been shared here yet.</p>
      </Card>
    );
  }

  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {media.map((item) => (
        <MediaTile key={item.id} item={item} />
      ))}
    </div>
  );
}
