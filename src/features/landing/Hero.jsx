import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

export default function Hero() {
  return (
    <section
      style={{
        padding: "140px 0",
      }}
    >
      <Container>
        <div
          style={{
            maxWidth: "900px",
          }}
        >
          <Badge>
            Wedding Memory Platform
          </Badge>

          <h1
            style={{
              fontSize: "5rem",
              lineHeight: 1.05,
              marginTop: "24px",
              marginBottom: "24px",
            }}
          >
            See your wedding through every guest's eyes.
          </h1>

          <p
            style={{
              color: "#A1A1AA",
              fontSize: "1.2rem",
              maxWidth: "700px",
              marginBottom: "32px",
            }}
          >
            GuestLens helps couples collect guest
            photos, videos, wishes and professional
            memories in one beautiful place.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <Button>
              Create Event
            </Button>

            <Button>
              Watch Demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
