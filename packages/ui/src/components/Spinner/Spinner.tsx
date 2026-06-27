import * as React from "react";
import { cn } from "../../lib/utils";

export type SpinnerSize = "small" | "medium" | "large";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(({ className, size = "medium", label, ...props }, ref) => (
  <span ref={ref} className={cn("sky-spinner", className)} data-size={size} role={label ? "status" : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...props} />
));

Spinner.displayName = "Spinner";

export { Spinner };
