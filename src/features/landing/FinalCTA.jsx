import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";

export default function FinalCTA() {
  return (
    <section
      style={{
        padding: "120px 0",
      }}
    >
      <Container>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
            }}
          >
            Start collecting memories today.
          </h2>

          <p
            style={{
              color: "#A1A1AA",
              marginBottom: "30px",
            }}
          >
            Every guest. Every memory. One place.
          </p>

          <Button>
            Create Event
          </Button>
        </div>
      </Container>
    </section>
  );
}
