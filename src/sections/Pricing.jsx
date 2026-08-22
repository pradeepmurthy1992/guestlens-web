import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    description: "See how it feels before your wedding day.",
    features: ["1 event", "Up to 200 photos", "30 days of storage", "Iniya Kadhai watermark"],
    cta: "Start for free",
    to: "/create-event",
    variant: "secondary",
  },
  {
    name: "Wedding Premium",
    price: "₹1,499",
    period: "/ event",
    description: "Full storage for the wedding itself.",
    features: [
      "Unlimited photos & videos",
      "Voice wishes",
      "1 year of storage",
      "No watermark",
      "Full archive download",
    ],
    cta: "Create your event",
    to: "/create-event",
    variant: "primary",
    featured: true,
  },
  {
    name: "Photographer Pro",
    price: "₹1,999",
    period: "/ month",
    description: "For photographers running multiple weddings.",
    features: [
      "Up to 50 active events",
      "Client dashboard",
      "Branded delivery gallery",
      "Event analytics",
    ],
    cta: "Talk to us",
    href: "mailto:hello@iniyakadhai.com",
    variant: "secondary",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing, priced per wedding."
            description="Launch pricing — subject to change as we grow."
          />
        </Reveal>

        <Reveal as="div" className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.featured ? "relative border-gold/40 bg-surface-2" : ""}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[11px] font-medium text-bg">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-medium text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-3xl text-ink">{plan.price}</span>
                <span className="text-sm text-muted-2">{plan.period}</span>
              </div>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                {...(plan.to ? { as: Link, to: plan.to } : { as: "a", href: plan.href })}
                variant={plan.variant}
                size="md"
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
