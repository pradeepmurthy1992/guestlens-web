export default function Heading({
  title,
  subtitle,
}) {
  return (
    <>
      <h2
        style={{
          fontSize: "2.8rem",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

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
    </>
  );
}
