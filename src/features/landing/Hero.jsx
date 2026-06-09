import Button from "../../components/ui/Button";
import Container from "../../components/layout/Container";

export default function Hero() {
  return (
    <section
      style={{
        padding: "120px 0",
      }}
    >
      <Container>
        <div
          style={{
            maxWidth: "800px",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            See your wedding through every guest's eyes.
          </h1>

          <p
            style={{
              color: "#A1A1AA",
              fontSize: "1.2rem",
              marginBottom: "32px",
            }}
          >
            Collect guest photos, videos, wishes and
            memories in one beautiful place.
          </p>

          <Button>
            Create Event
          </Button>
        </div>
      </Container>
    </section>
  );
}
