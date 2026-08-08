import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-display text-6xl text-gold">404</span>
      <p className="text-muted">This page doesn&rsquo;t exist.</p>
      <Button as={Link} to="/" variant="secondary">
        Back home
      </Button>
    </div>
  );
}
