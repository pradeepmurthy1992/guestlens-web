import { Link } from "react-router-dom";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Link to="/" className="mb-10 font-display text-2xl text-ink">
        GuestLens
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        {children}
      </div>
    </div>
  );
}
