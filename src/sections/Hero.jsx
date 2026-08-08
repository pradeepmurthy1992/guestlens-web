import { Camera, Mic, Video } from "lucide-react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pb-32 md:pt-28">
      <div
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
      />

      <Container className="relative grid gap-16 md:grid-cols-2 md:items-center md:gap-10">
        <div className="flex flex-col items-start gap-6">
          <Badge>For couples &amp; photographers</Badge>

          <h1 className="font-display text-4xl leading-[1.1] text-ink md:text-6xl">
            See your wedding through every guest&rsquo;s eyes.
          </h1>

          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            Your photographer&rsquo;s album, your guests&rsquo; photos and
            videos, and every voice wish — collected in one private gallery
            instead of scattered across WhatsApp and Google Drive.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="#final-cta" variant="primary" size="lg">
              Create your event
            </Button>
            <Button as="a" href="#how-it-works" variant="secondary" size="lg">
              See how it works
            </Button>
          </div>

          <p className="text-xs text-muted-2">
            No app required for guests · Free to start
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-border-soft pb-4">
              <div>
                <p className="font-display text-lg text-ink">Priya &amp; Akash</p>
                <p className="text-xs text-muted-2">14 Feb 2027 · guestlens.app/priya-akash</p>
              </div>
              <span className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-medium text-gold">
                Live
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-surface-2"
                  style={{ opacity: 1 - i * 0.07 }}
                />
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-border-soft bg-bg/40 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Camera size={14} className="text-gold" />
                <span>248</span>
                <Video size={14} className="ml-2 text-gold" />
                <span>36</span>
                <Mic size={14} className="ml-2 text-gold" />
                <span>19</span>
              </div>
              <span className="text-xs text-muted-2">from 96 guests</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
