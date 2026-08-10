import { useEffect, useState } from "react";
import { Heart, Images } from "lucide-react";
import { getPlatformStats } from "../../lib/statsService";

export default function TrustStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getPlatformStats()
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  if (!stats || stats.eventCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
      <span className="flex items-center gap-2">
        <Heart size={14} className="text-gold" />
        {stats.eventCount} {stats.eventCount === 1 ? "wedding" : "weddings"} on GuestLens
      </span>
      <span className="flex items-center gap-2">
        <Images size={14} className="text-gold" />
        {stats.mediaCount} {stats.mediaCount === 1 ? "memory" : "memories"} collected
      </span>
    </div>
  );
}
