import Container from "../ui/Container";

const columns = [
  {
    title: "Product",
    links: ["How it works", "Features", "Pricing", "For photographers"],
  },
  {
    title: "Company",
    links: ["About", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-soft">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <span className="font-display text-xl text-ink">GuestLens</span>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            The wedding memory platform for couples and photographers.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-2">
              {col.title}
            </span>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border-soft py-6 text-xs text-muted-2 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} GuestLens. All rights reserved.</span>
        <span>Made for couples, guests, and the photographers who capture them.</span>
      </Container>
    </footer>
  );
}
