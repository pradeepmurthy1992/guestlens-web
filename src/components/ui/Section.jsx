import Container from "../layout/Container";

export default function Section({
  children,
  title,
  subtitle,
}) {
  return (
    <section
      style={{
        padding: "100px 0",
      }}
    >
      <Container>
        {(title || subtitle) && (
          <div
            style={{
              marginBottom: "48px",
            }}
          >
            {title && (
              <h2
                style={{
                  fontSize: "2.8rem",
                  marginBottom: "12px",
                }}
              >
                {title}
              </h2>
            )}

            {subtitle && (
              <p
                style={{
                  color: "#A1A1AA",
                  maxWidth: "700px",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}
