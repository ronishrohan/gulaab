import * as React from "react";
import type { ButtonSize, ButtonTone, ButtonVariant } from "../Button";

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  disabled?: boolean;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "link", tone = "primary", size = "medium", disabled = false, ...props }, ref) => {
    const linkClassName = className ? `gulaab-link-button ${className}` : "gulaab-link-button";

    return (
      <a
        ref={ref}
        className={linkClassName}
        data-variant={variant}
        data-tone={tone}
        data-size={size}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
        {...props}
      />
    );
  }
);

LinkButton.displayName = "LinkButton";

export { LinkButton };
