import * as React from "react";
import { cn } from "../../lib/utils";
import type { ButtonTone } from "../Button";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeTone = ButtonTone;
export type BadgeSize = "small" | "medium";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "soft", tone = "primary", size = "medium", ...props }, ref) => (
    <span ref={ref} className={cn("sky-badge", className)} data-variant={variant} data-tone={tone} data-size={size} {...props} />
  )
);

Badge.displayName = "Badge";

export { Badge };
