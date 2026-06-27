import * as React from "react";
import { cn } from "../../lib/utils";

export type KbdSize = "small" | "medium" | "large";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: KbdSize;
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, size = "medium", ...props }, ref) => (
  <kbd ref={ref} className={cn("gulaab-kbd", className)} data-size={size} {...props} />
));

Kbd.displayName = "Kbd";

export { Kbd };
