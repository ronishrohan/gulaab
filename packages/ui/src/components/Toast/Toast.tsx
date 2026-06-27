import * as React from "react";
import { cn } from "../../lib/utils";
import type { ButtonTone } from "../Button";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tone?: ButtonTone;
  action?: React.ReactNode;
  onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ className, title, description, tone = "primary", action, onClose, ...props }, ref) => (
  <div ref={ref} className={cn("sky-toast", className)} data-tone={tone} role="status" {...props}>
    <div>
      <p className="sky-toast-title">{title}</p>
      {description && <p className="sky-toast-description">{description}</p>}
    </div>
    {onClose && <button type="button" className="sky-toast-close" aria-label="Close notification" onClick={onClose}>x</button>}
    {action && <div className="sky-toast-action">{action}</div>}
  </div>
));

Toast.displayName = "Toast";

export { Toast };
