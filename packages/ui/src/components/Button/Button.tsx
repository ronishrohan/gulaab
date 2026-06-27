import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost" | "link";
export type ButtonTone = "primary" | "neutral" | "danger" | "warning";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  loading?: boolean;
  render?: React.ReactElement;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, render, loading = false, disabled, variant = "solid", tone = "primary", size = "medium", children, onClick, tabIndex, ...props }, ref) => {
    const Comp = asChild || render ? Slot : "button";
    const disabledState = disabled || loading;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      if (disabledState) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    }

    const content = (
      <>
        {loading && <SpinnerIcon />}
        <span className="gulaab-button-label">{children}</span>
      </>
    );

    return (
      <Comp
        ref={ref}
        className={cn("gulaab-button", className)}
        data-variant={variant}
        data-tone={tone}
        data-size={size}
        data-loading={loading || undefined}
        disabled={!asChild && !render ? disabledState : undefined}
        aria-disabled={asChild || render ? disabledState || undefined : undefined}
        aria-busy={loading || undefined}
        data-disabled={disabledState || undefined}
        tabIndex={disabledState && (asChild || render) ? -1 : tabIndex}
        onClick={handleClick}
        {...props}
      >
        {render ? React.cloneElement(render, {}, content) : content}
      </Comp>
    );
  }
);

function SpinnerIcon() {
  return (
    <svg className="gulaab-button-spinner" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

Button.displayName = "Button";

export { Button };
