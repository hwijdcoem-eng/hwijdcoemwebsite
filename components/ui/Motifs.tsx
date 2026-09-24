import { cn } from "../../utils/cn";

export function Reticle({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-6 h-6 flex items-center justify-center opacity-80", className)}>
      <div className="absolute w-full h-[1px] bg-crimson" />
      <div className="absolute h-full w-[1px] bg-crimson" />
      <div className="absolute w-4 h-4 border border-crimson rounded-full" />
    </div>
  );
}

export function TickMarks({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1 opacity-70", className)}>
      <div className="w-1 h-3 bg-crimson transform -skew-x-[30deg]" />
      <div className="w-1 h-3 bg-crimson transform -skew-x-[30deg]" />
      <div className="w-1 h-3 bg-crimson transform -skew-x-[30deg]" />
    </div>
  );
}
