import * as React from "react";
import { cn } from "../../lib/utils";

export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  error?: string;
  size?: CheckboxSize;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, size = "medium", ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("gulaab-field", className)}>
        <label className="gulaab-choice" htmlFor={checkboxId} data-size={size}>
          <input ref={ref} id={checkboxId} type="checkbox" className="gulaab-choice-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...props} />
          <span className="gulaab-checkbox" aria-hidden="true" />
          {(label || description) && (
            <span className="gulaab-choice-copy">
              {label && <span className="gulaab-choice-label">{label}</span>}
              {description && <span className="gulaab-choice-description" id={descriptionId}>{description}</span>}
            </span>
          )}
        </label>
        {error && <p className="gulaab-field-error" id={errorId}>{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
