import Container from "./Container";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header
      style={{
        borderBottom: "1px solid #242428",
        position: "sticky",
        top: 0,
        background: "#0B0B0C",
        zIndex: 100,
      }}
    >
      <Container>
        <div
          style={{
            height: "76px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
            }}
          >
            GuestLens
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="/login">Login</a>

            <Button>
              Create Event
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
