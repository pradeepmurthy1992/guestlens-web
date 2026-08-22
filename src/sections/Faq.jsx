import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";

const faqs = [
  {
    q: "Do guests need to download an app or make an account?",
    a: "No. Guests scan the QR code and upload straight from their phone's browser. No app, no sign-up.",
  },
  {
    q: "Can our photographer use Iniya Kadhai too?",
    a: "Yes — photographers get their own login to upload the professional album, teasers and highlights into the same event guests are contributing to.",
  },
  {
    q: "What happens on the reveal date?",
    a: "Until then, the gallery shows a countdown and guest uploads keep collecting in the background. On your reveal date it unlocks automatically for everyone.",
  },
  {
    q: "Can we download everything afterwards?",
    a: "Yes. Wedding Premium includes a full export of your event — every photo, video and voice wish — as one download.",
  },
  {
    q: "Is our gallery private?",
    a: "Every event lives at its own link and is only accessible to people you share it with — it isn't indexed or discoverable publicly.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 md:py-32">
      <Container>
        <Reveal className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <SectionHeading eyebrow="FAQ" title="Common questions." />

          <div className="flex flex-col divide-y divide-border-soft border-t border-border-soft">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-sm font-medium text-ink md:text-base">{item.q}</span>
                    <Plus
                      size={18}
                      className={`shrink-0 text-gold transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
