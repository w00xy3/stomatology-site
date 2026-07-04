"use client";

import { motion } from "framer-motion";
import { Loader2 } from "@/components/icons";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  href?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md hover:shadow-primary/20",
  secondary:
    "bg-background-alt text-text-primary hover:bg-border",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-background-alt",
  accent:
    "bg-accent text-white hover:bg-accent-light font-semibold shadow-sm hover:shadow-md hover:shadow-accent/20",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  iconLeft,
  iconRight,
  isLoading = false,
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-300 ease-in-out",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
