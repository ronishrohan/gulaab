import * as React from "react";
import { cn } from "../../lib/utils";
import type { TextFieldSize } from "../Input";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: TextFieldSize;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, size = "medium", ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="gulaab-field">
        {label && <label className="gulaab-field-label" htmlFor={textareaId}>{label}</label>}
        <textarea
          ref={ref}
          id={textareaId}
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

Textarea.displayName = "Textarea";

export { Textarea };
