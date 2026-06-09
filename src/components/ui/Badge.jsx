export default function Badge({
  children,
}) {
  return (
    <span
      style={{
        display: "inline-block",

        background: "rgba(212,175,55,0.15)",

        color: "#D4AF37",

        padding: "8px 12px",

        borderRadius: "999px",

        fontSize: "0.85rem",
      }}
    >
      {children}
    </span>
  );
}
