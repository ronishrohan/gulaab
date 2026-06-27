import * as React from "react";
import { cn } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  name: string;
  legend?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, name, legend, options, value, defaultValue, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const selectedValue = value ?? internalValue;

    function handleChange(next: string) {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    }

    return (
      <fieldset ref={ref} className={cn("sky-radio-group", className)} {...props}>
        {legend && <legend className="sky-radio-legend">{legend}</legend>}
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <label key={option.value} className="sky-choice" htmlFor={id}>
              <input
                id={id}
                className="sky-choice-input"
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                disabled={option.disabled}
                onChange={() => handleChange(option.value)}
              />
              <span className="sky-radio-mark" aria-hidden="true" />
              <span className="sky-choice-copy">
                <span className="sky-choice-label">{option.label}</span>
                {option.description && <span className="sky-choice-description">{option.description}</span>}
              </span>
            </label>
          );
        })}
      </fieldset>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
