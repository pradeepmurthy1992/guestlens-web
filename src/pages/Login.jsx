import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Mail, CheckCircle2 } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const { user, loading, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  if (!loading && user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const { error: signInError } = await signInWithEmail(email);
    if (signInError) {
      setError(signInError.message);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 size={32} className="text-gold" />
          <h1 className="text-lg font-medium text-ink">Check your inbox</h1>
          <p className="text-sm text-muted">
            We sent a sign-in link to <span className="text-ink">{email}</span>. Open it on this
            device to continue.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 className="mb-2 font-display text-xl text-ink">Log in to GuestLens</h1>
      <p className="mb-6 text-sm text-muted">We'll email you a link — no password needed.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" variant="primary" className="w-full" disabled={status === "sending"}>
          <Mail size={16} />
          {status === "sending" ? "Sending link…" : "Send sign-in link"}
        </Button>
      </form>
    </AuthLayout>
  );
}
