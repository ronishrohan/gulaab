import * as React from "react";
import { cn } from "../../lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value, max = 100, label, ...props }, ref) => {
  const safeMax = max > 0 ? max : 100;
  const clampedValue = Math.max(0, Math.min(safeMax, value));
  const pct = (clampedValue / safeMax) * 100;

  return (
    <div ref={ref} className={cn("gulaab-progress", className)} role="progressbar" aria-valuemin={0} aria-valuemax={safeMax} aria-valuenow={clampedValue} aria-label={label} {...props}>
      <div className="gulaab-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
});

Progress.displayName = "Progress";

export { Progress };
