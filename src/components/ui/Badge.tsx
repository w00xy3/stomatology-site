import { ReactNode } from "react";

interface BadgeProps {
  variant?: "default" | "primary" | "success" | "warning" | "outline";
  children: ReactNode;
  className?: string;
}

const variantClasses = {
  default: "bg-background-alt text-text-secondary",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-accent/10 text-accent",
  outline: "border border-border text-text-secondary",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
