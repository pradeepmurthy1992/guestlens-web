
export default function Button({
  children,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "#D4AF37",
        color: "#000",

        border: "none",

        borderRadius: "12px",

        padding: "14px 24px",

        fontWeight: 600,

        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
