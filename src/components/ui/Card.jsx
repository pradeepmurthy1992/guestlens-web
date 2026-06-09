export default function Card({
  children,
}) {
  return (
    <div
      style={{
        background: "#121214",

        border: "1px solid #242428",

        borderRadius: "20px",

        padding: "24px",
      }}
    >
      {children}
    </div>
  );
}
