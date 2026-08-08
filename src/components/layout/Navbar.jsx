import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-bg/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <a href="/" className="font-display text-xl tracking-tight text-ink">
          GuestLens
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button as="a" href="#" variant="ghost" size="md">
            Log in
          </Button>
          <Button as="a" href="#final-cta" variant="primary" size="md">
            Create your event
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border-soft bg-bg md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm text-muted hover:bg-surface hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 px-2">
              <Button as="a" href="#" variant="secondary" size="md" className="w-full">
                Log in
              </Button>
              <Button as="a" href="#final-cta" variant="primary" size="md" className="w-full">
                Create your event
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
