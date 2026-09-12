import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function SectionHeading({
  className,
  as: Component = "h2",
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <Component
      className={cn(
        "font-display font-bold text-ink tracking-tight",
        {
          "text-4xl md:text-6xl": Component === "h1",
          "text-3xl md:text-4xl": Component === "h2",
          "text-2xl md:text-3xl": Component === "h3",
          "text-xl md:text-2xl": Component === "h4",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
