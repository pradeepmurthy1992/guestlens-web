import { useRef, useState, useEffect } from "react";
import { Mic, Square, Check } from "lucide-react";
import Button from "../ui/Button";
import { uploadEventFile } from "../../lib/mediaService";

const MAX_SECONDS = 60;

export default function VoiceRecorderPanel({ eventId, guestName }) {
  const [state, setState] = useState("idle"); // idle | recording | recorded | uploading | done
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioBlobRef = useRef(null);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        audioBlobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        setState("recorded");
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setState("recording");
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) {
            stopRecording();
            return MAX_SECONDS;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setError("Couldn't access your microphone. Check your browser permissions and try again.");
    }
  }

  function stopRecording() {
    clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
  }

  async function handleSend() {
    if (!audioBlobRef.current) return;
    setState("uploading");
    setError(null);
    try {
      const file = new File([audioBlobRef.current], `voice-wish-${Date.now()}.webm`, {
        type: "audio/webm",
      });
      await uploadEventFile({ eventId, file, type: "voice", uploaderName: guestName });
      setState("done");
    } catch (err) {
      setError(err.message);
      setState("recorded");
    }
  }

  function reset() {
    setState("idle");
    setSeconds(0);
    setAudioUrl(null);
    audioBlobRef.current = null;
  }

  if (state === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <Check size={28} className="text-gold" />
        <p className="text-ink">Your voice wish was added</p>
        <Button variant="secondary" size="md" onClick={reset}>
          Record another
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      {state === "idle" && (
        <>
          <button
            type="button"
            onClick={startRecording}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-bg transition-transform hover:scale-105"
          >
            <Mic size={26} />
          </button>
          <p className="text-sm text-muted">Tap to record a voice wish (up to 60 seconds)</p>
        </>
      )}

      {state === "recording" && (
        <>
          <button
            type="button"
            onClick={stopRecording}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-white"
          >
            <Square size={22} />
          </button>
          <p className="text-sm text-muted">Recording… {seconds}s / {MAX_SECONDS}s</p>
        </>
      )}

      {state === "recorded" && (
        <>
          <audio src={audioUrl} controls className="w-full" />
          <div className="flex w-full gap-3">
            <Button variant="secondary" size="md" onClick={reset} className="flex-1">
              Re-record
            </Button>
            <Button variant="primary" size="md" onClick={handleSend} className="flex-1">
              Send
            </Button>
          </div>
        </>
      )}

      {state === "uploading" && <p className="text-sm text-muted">Uploading…</p>}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
