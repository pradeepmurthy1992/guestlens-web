import Container from "../../components/layout/Container";

const steps = [
  {
    title: "Create Event",
    desc: "Set up your wedding page in minutes.",
  },
  {
    title: "Share QR",
    desc: "Guests scan and instantly contribute.",
  },
  {
    title: "Collect Memories",
    desc: "Photos, videos, wishes and voice notes.",
  },
  {
    title: "Relive Forever",
    desc: "Download and revisit every memory.",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "100px 0" }}>
      <Container>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "50px",
          }}
        >
          How it works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "24px",
          }}
        >
          {steps.map((step, index) => (
            <div
              key={step.title}
              style={{
                background: "#18181B",
                padding: "24px",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  color: "#D4AF37",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                0{index + 1}
              </div>

              <h3>{step.title}</h3>

              <p style={{ color: "#A1A1AA" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
