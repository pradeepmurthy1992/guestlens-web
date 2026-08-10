import { useState } from "react";
import { Camera, Video } from "lucide-react";
import FileUploadPanel from "../guest/FileUploadPanel";

const tabs = [
  { id: "photo", label: "Photo", icon: Camera, accept: "image/*" },
  { id: "video", label: "Video", icon: Video, accept: "video/*" },
];

export default function ProUploadPanel({ eventId }) {
  const [activeTab, setActiveTab] = useState("photo");
  const tab = tabs.find((t) => t.id === activeTab);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted">
        Deliverables you upload here are marked as professional and stand out in the couple's
        gallery.
      </p>

      <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-bg p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs transition-colors ${
              activeTab === t.id ? "bg-gold text-bg" : "text-muted hover:text-ink"
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      <FileUploadPanel
        key={activeTab}
        eventId={eventId}
        type={activeTab}
        accept={tab.accept}
        label={`Upload a ${activeTab}`}
        isProfessional
      />
    </div>
  );
}
