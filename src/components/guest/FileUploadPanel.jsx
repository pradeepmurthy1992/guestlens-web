import { useRef, useState } from "react";
import { Upload, Check } from "lucide-react";
import Button from "../ui/Button";
import { uploadEventFile } from "../../lib/mediaService";

export default function FileUploadPanel({ eventId, type, accept, label, guestName, isProfessional = false }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setStatus("idle");
    setError(null);
  }

  async function handleUpload() {
    if (!file) return;
    setStatus("uploading");
    setError(null);
    try {
      await uploadEventFile({ eventId, file, type, uploaderName: guestName, isProfessional });
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  function reset() {
    setFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setError(null);
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <Check size={28} className="text-gold" />
        <p className="text-ink">Added to the gallery</p>
        <Button variant="secondary" size="md" onClick={reset}>
          Add another
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-12 text-muted transition-colors hover:border-gold-dim hover:text-ink"
        >
          <Upload size={22} />
          <span className="text-sm">{label}</span>
        </button>
      ) : type === "photo" ? (
        <img src={previewUrl} alt="Preview" className="max-h-64 w-full rounded-xl object-cover" />
      ) : (
        <video src={previewUrl} controls className="max-h-64 w-full rounded-xl" />
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      {file && (
        <div className="flex gap-3">
          <Button variant="secondary" size="md" onClick={reset} className="flex-1">
            Choose different file
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleUpload}
            disabled={status === "uploading"}
            className="flex-1"
          >
            {status === "uploading" ? "Uploading…" : "Send"}
          </Button>
        </div>
      )}
    </div>
  );
}
