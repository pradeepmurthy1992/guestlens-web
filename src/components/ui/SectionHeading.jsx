export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl leading-[1.15] text-ink md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>
      )}
    </div>
  );
}
