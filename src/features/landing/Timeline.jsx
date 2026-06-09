import Container from "../../components/layout/Container";

export default function Timeline() {
  return (
    <section style={{ padding: "100px 0" }}>
      <Container>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "50px",
          }}
        >
          Every moment matters
        </h2>

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {[
            "Engagement",
            "Mehendi",
            "Haldi",
            "Wedding",
            "Reception",
          ].map((item) => (
            <div
              key={item}
              style={{
                padding: "20px",
                background: "#18181B",
                borderRadius: "14px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
