export default function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-8 transition-colors duration-200 hover:border-border-soft hover:bg-surface-2 ${className}`}
    >
      {children}
    </div>
  );
}
