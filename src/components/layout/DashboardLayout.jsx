import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function DashboardLayout({ children }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border-soft">
        <Container className="flex h-20 items-center justify-between">
          <Link to="/dashboard" className="font-display text-xl text-ink">
            GuestLens
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">{user?.email}</span>
            <Button variant="ghost" size="md" onClick={handleSignOut}>
              <LogOut size={16} />
              Log out
            </Button>
          </div>
        </Container>
      </header>
      <main className="py-12">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
