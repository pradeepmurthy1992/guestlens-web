import Container from "../../components/layout/Container";

export default function Faq() {
  return (
    <section style={{ padding: "100px 0" }}>
      <Container>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "50px",
          }}
        >
          FAQ
        </h2>

        <div>
          <h3>Do guests need an app?</h3>
          <p>No. Guests simply scan a QR code.</p>

          <h3>Can guests upload videos?</h3>
          <p>Yes.</p>

          <h3>Can I download everything?</h3>
          <p>Absolutely.</p>
        </div>
      </Container>
    </section>
  );
}
