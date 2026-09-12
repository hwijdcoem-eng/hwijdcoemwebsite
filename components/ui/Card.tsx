import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  withGlow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = "md", withGlow = false, children, ...props }, ref) => {
    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative group bg-gradient-to-br from-chrome-light to-chrome-dark p-[1px]",
          "transition-all duration-300",
          withGlow && "hover:shadow-[0_0_20px_rgba(255,16,83,0.3)]",
          className
        )}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))"
        }}
        {...props}
      >
        <div 
          className={cn(
            "bg-obsidian w-full h-full relative overflow-hidden transition-colors duration-300 group-hover:bg-obsidian-raised",
            paddings[padding]
          )}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))"
          }}
        >
          {withGlow && (
            <div 
              className="absolute bottom-0 left-0 w-[15px] h-[15px] bg-crimson/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
              style={{ clipPath: "polygon(100% 100%, 0 100%, 0 0)" }}
            />
          )}
          {children}
        </div>
      </div>
    );
  }
);
Card.displayName = "Card";
