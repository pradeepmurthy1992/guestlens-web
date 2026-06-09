import Container from "./Container";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "80px",
        borderTop: "1px solid #222",
      }}
    >
      <Container>
        <div
          style={{
            padding: "32px 0",
            color: "#A1A1AA",
          }}
        >
          © GuestLens
        </div>
      </Container>
    </footer>
  );
}
