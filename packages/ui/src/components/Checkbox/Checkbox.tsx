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
      <div className={cn("sky-field", className)}>
        <label className="sky-choice" htmlFor={checkboxId} data-size={size}>
          <input ref={ref} id={checkboxId} type="checkbox" className="sky-choice-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...props} />
          <span className="sky-checkbox" aria-hidden="true" />
          {(label || description) && (
            <span className="sky-choice-copy">
              {label && <span className="sky-choice-label">{label}</span>}
              {description && <span className="sky-choice-description" id={descriptionId}>{description}</span>}
            </span>
          )}
        </label>
        {error && <p className="sky-field-error" id={errorId}>{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
