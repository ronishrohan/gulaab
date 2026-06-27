import * as React from "react";
import { cn } from "../../lib/utils";
import type { TextFieldSize } from "../Input";

export type SelectSize = TextFieldSize;

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, id, size = "medium", children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const helperId = helperText ? `${selectId}-helper` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="gulaab-field">
        {label && <label className="gulaab-field-label" htmlFor={selectId}>{label}</label>}
        <div className="gulaab-select-wrap">
          <select
            ref={ref}
            id={selectId}
            className={cn("gulaab-control gulaab-select", className)}
            data-size={size}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...props}
          >
            {children}
          </select>
        </div>
        {helperText && <p className="gulaab-field-help" id={helperId}>{helperText}</p>}
        {error && <p className="gulaab-field-error" id={errorId}>{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
