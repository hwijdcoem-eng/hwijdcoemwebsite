"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-signal text-void hover:bg-signal-warm",
    secondary: "bg-panel text-ink hover:bg-line",
    outline: "border border-line text-ink hover:bg-panel",
    ghost: "text-ink-dim hover:text-ink hover:bg-panel",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-sm font-sans font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
