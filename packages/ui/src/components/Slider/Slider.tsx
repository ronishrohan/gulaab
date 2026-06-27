import * as React from "react";
import { cn } from "../../lib/utils";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  valueLabel?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, helperText, valueLabel, id, ...props }, ref) => {
    const generatedId = React.useId();
    const sliderId = id ?? generatedId;
    const helperId = helperText ? `${sliderId}-helper` : undefined;

    return (
      <div className="sky-field">
        {(label || valueLabel) && (
          <div className="sky-slider-row">
            {label && <label className="sky-field-label" htmlFor={sliderId}>{label}</label>}
            {valueLabel && <span>{valueLabel}</span>}
          </div>
        )}
        <input ref={ref} id={sliderId} type="range" className={cn("sky-slider", className)} aria-describedby={helperId} {...props} />
        {helperText && <p className="sky-field-help" id={helperId}>{helperText}</p>}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
