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
      <fieldset ref={ref} className={cn("gulaab-radio-group", className)} {...props}>
        {legend && <legend className="gulaab-radio-legend">{legend}</legend>}
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <label key={option.value} className="gulaab-choice" htmlFor={id}>
              <input
                id={id}
                className="gulaab-choice-input"
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                disabled={option.disabled}
                onChange={() => handleChange(option.value)}
              />
              <span className="gulaab-radio-mark" aria-hidden="true" />
              <span className="gulaab-choice-copy">
                <span className="gulaab-choice-label">{option.label}</span>
                {option.description && <span className="gulaab-choice-description">{option.description}</span>}
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
