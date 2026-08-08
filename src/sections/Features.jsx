import { Camera, Mic, Timer, Users, Download, Image as ImageIcon } from "lucide-react";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";

const features = [
  {
    icon: ImageIcon,
    title: "One gallery, every source",
    description:
      "Professional photos from your photographer and casual shots from guests, side by side instead of split across five apps.",
  },
  {
    icon: Mic,
    title: "Voice wishes",
    description:
      "Guests leave a short spoken message instead of a text comment — the kind of thing you'll actually want to hear again in ten years.",
  },
  {
    icon: Users,
    title: "No account for guests",
    description:
      "Scan, upload, done. Nobody at your wedding should have to sign up for anything to leave you a photo.",
  },
  {
    icon: Timer,
    title: "Reveal on your schedule",
    description:
      "Keep the gallery locked with a countdown until the moment you want to open it — right after the wedding, or on your first anniversary.",
  },
  {
    icon: Camera,
    title: "Built for photographers",
    description:
      "Photographers get their own dashboard to deliver albums, teasers and highlights under your event, not a generic drop folder.",
  },
  {
    icon: Download,
    title: "Everything, downloadable",
    description:
      "Export the full event as one archive whenever you want it. Your memories aren't locked to a subscription.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything a wedding produces, kept in one place."
          />
        </Reveal>

        <Reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                <feature.icon size={18} />
              </span>
              <h3 className="mb-2 text-base font-medium text-ink">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
