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
    primary: "bg-crimson text-void hover:bg-crimson-bright font-bold tracking-wider uppercase",
    secondary: "bg-obsidian-raised text-ink hover:bg-chrome-dark border border-chrome-dark",
    outline: "border border-crimson text-crimson hover:bg-crimson hover:text-void",
    ghost: "text-steel hover:text-ink hover:bg-obsidian-raised",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center font-ui transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson uppercase",
        "clip-edge", // Assuming we will add a global clip path class if needed, or just sharp corners
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
