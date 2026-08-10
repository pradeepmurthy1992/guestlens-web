import { Sparkles, MessageSquare } from "lucide-react";
import { publicMediaUrl } from "../../lib/mediaService";
import Card from "../ui/Card";

export default function MediaTile({ item }) {
  const url = item.storage_path ? publicMediaUrl(item.storage_path) : null;

  return (
    <Card className="flex flex-col gap-3 p-4">
      {item.type === "photo" && (
        <img src={url} alt="" className="aspect-square w-full rounded-xl object-cover" />
      )}
      {item.type === "video" && (
        <video src={url} controls className="aspect-square w-full rounded-xl object-cover" />
      )}
      {item.type === "voice" && (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-xl bg-bg">
          <span className="text-3xl">🎙️</span>
          <audio src={url} controls className="w-full px-4" />
        </div>
      )}
      {item.type === "message" && (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl bg-bg p-4 text-center">
          <MessageSquare size={20} className="text-gold" />
          <p className="text-sm text-ink">{item.message}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted-2">
        <span>{item.uploader_name || "Anonymous guest"}</span>
        {item.is_professional && (
          <span className="flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-gold">
            <Sparkles size={10} />
            Pro
          </span>
        )}
      </div>
    </Card>
  );
}
