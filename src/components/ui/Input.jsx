import { forwardRef } from "react";

const Input = forwardRef(({ label, id, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm text-muted">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`h-11 rounded-xl border border-border bg-surface px-4 text-sm text-ink placeholder:text-muted-2 outline-none transition-colors focus:border-gold-dim ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";
export default Input;
