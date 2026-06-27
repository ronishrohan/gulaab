import * as React from "react";
import { cn } from "../../lib/utils";

export type SwitchSize = "small" | "medium" | "large";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  label?: string;
  description?: string;
  defaultPressed?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  size?: SwitchSize;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, label, description, defaultPressed = false, pressed, onPressedChange, onClick, size = "medium", ...props }, ref) => {
    const [internalPressed, setInternalPressed] = React.useState(defaultPressed);
    const isPressed = pressed ?? internalPressed;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      const next = !isPressed;
      if (pressed === undefined) setInternalPressed(next);
      onPressedChange?.(next);
      onClick?.(event);
    }

    return (
      <button ref={ref} type="button" role="switch" aria-checked={isPressed} className={cn("sky-switch", className)} data-size={size} onClick={handleClick} {...props}>
        <span className="sky-switch-track" aria-hidden="true"><span className="sky-switch-thumb" /></span>
        {(label || description) && (
          <span className="sky-switch-copy">
            {label && <span className="sky-switch-label">{label}</span>}
            {description && <span className="sky-switch-description">{description}</span>}
          </span>
        )}
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
