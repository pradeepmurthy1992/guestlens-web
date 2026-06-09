import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";

export default function Pricing() {
  return (
    <section style={{ padding: "100px 0" }}>
      <Container>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "50px",
          }}
        >
          Simple pricing
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "24px",
          }}
        >
          <div
            style={{
              border: "1px solid #222",
              padding: "32px",
              borderRadius: "20px",
            }}
          >
            <h3>Free</h3>

            <h1>₹0</h1>

            <p>200 uploads</p>

            <p>30 day storage</p>
          </div>

          <div
            style={{
              background: "#18181B",
              padding: "32px",
              borderRadius: "20px",
            }}
          >
            <h3>Wedding Premium</h3>

            <h1>₹1499</h1>

            <p>Unlimited uploads</p>

            <p>Videos</p>

            <p>Voice wishes</p>

            <p>1 year storage</p>

            <Button>Choose Plan</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
