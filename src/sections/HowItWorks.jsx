import { QrCode, Upload, Sparkles } from "lucide-react";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";

const steps = [
  {
    icon: QrCode,
    title: "Create your event, share a QR",
    description:
      "Set your names, wedding date and a reveal date. GuestLens generates a private gallery and a QR code to print or share.",
  },
  {
    icon: Upload,
    title: "Guests add photos, videos & wishes",
    description:
      "Guests scan the code and contribute straight from their phone browser — no app, no account. Your photographer uploads the professional album to the same place.",
  },
  {
    icon: Sparkles,
    title: "Reveal day, then keep it forever",
    description:
      "The gallery unlocks on your reveal date. From there, browse everything together and download the full archive whenever you want.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps between the wedding and the memory."
            description="Built to stay out of the way on the day itself."
          />
        </Reveal>

        <Reveal className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-gold">
                  <step.icon size={18} />
                </span>
                <span className="font-display text-sm text-muted-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-medium text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
