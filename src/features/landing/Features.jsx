import Container from "../../components/layout/Container";

const features = [
  "Guest Photos",
  "Guest Videos",
  "Voice Wishes",
  "Private Gallery",
  "Reveal Countdown",
  "Photographer Delivery",
  "Download Everything",
  "Wedding Timeline",
];

export default function Features() {
  return (
    <section style={{ padding: "100px 0" }}>
      <Container>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "40px",
          }}
        >
          Everything in one place
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {features.map((item) => (
            <div
              key={item}
              style={{
                padding: "24px",
                border: "1px solid #222",
                borderRadius: "18px",
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
