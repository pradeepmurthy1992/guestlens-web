import { forwardRef } from "react";

const variants = {
  primary:
    "bg-gold text-bg hover:bg-gold-soft border border-transparent",
  secondary:
    "bg-transparent text-ink border border-border hover:border-gold-dim hover:bg-surface",
  ghost:
    "bg-transparent text-muted hover:text-ink border border-transparent",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

const Button = forwardRef(
  ({ as: Tag = "button", variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Button.displayName = "Button";
export default Button;
