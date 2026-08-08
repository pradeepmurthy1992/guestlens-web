import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center md:px-16 md:py-24">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, #D4AF37, transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <h2 className="font-display text-3xl leading-[1.15] text-ink md:text-5xl">
              Start collecting your wedding memories.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted">
              Free to create. Add your photographer and invite guests whenever you're ready.
            </p>
            <Button as={Link} to="/create-event" variant="primary" size="lg">
              Create your event
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
