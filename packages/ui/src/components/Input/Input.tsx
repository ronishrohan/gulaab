import * as React from "react";
import { cn } from "../../lib/utils";

export type TextFieldSize = "small" | "medium" | "large";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: TextFieldSize;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, helperText, error, id, size = "medium", ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="gulaab-field">
        {label && <label className="gulaab-field-label" htmlFor={inputId}>{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={cn("gulaab-control", className)}
          data-size={size}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {helperText && <p className="gulaab-field-help" id={helperId}>{helperText}</p>}
        {error && <p className="gulaab-field-error" id={errorId}>{error}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };
