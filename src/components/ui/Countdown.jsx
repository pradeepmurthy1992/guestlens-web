function daysUntil(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  const diffMs = target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export default function Countdown({ date }) {
  const days = daysUntil(date);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-display text-5xl text-gold">{Math.max(days, 0)}</span>
      <span className="text-sm text-muted">
        {days === 1 ? "day to go" : "days to go"}
      </span>
    </div>
  );
}
