import Container from "./Container";

export default function Navbar() {
  return (
    <header
      style={{
        borderBottom: "1px solid #222",
      }}
    >
      <Container>
        <div
          style={{
            height: "72px",

            display: "flex",

            alignItems: "center",

            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
            }}
          >
            GuestLens
          </div>

          <nav
            style={{
              display: "flex",
              gap: "24px",
            }}
          >
            <a href="/">Home</a>

            <a href="#">Features</a>

            <a href="#">Pricing</a>

            <a href="/login">Login</a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
