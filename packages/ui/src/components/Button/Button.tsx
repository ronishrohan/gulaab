import * as React from "react";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost" | "link";
export type ButtonTone = "primary" | "neutral" | "danger" | "warning";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      loading = false,
      disabled,
      variant = "solid",
      tone = "primary",
      size = "medium",
      children,
      onClick,
      onPointerCancel,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      onPointerUp,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const disabledState = disabled || loading;
    const buttonClassName = className ? `gulaab-button ${className}` : "gulaab-button";

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      if (disabledState) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    }

    function updatePressVars(event: React.PointerEvent<HTMLButtonElement>) {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      element.style.setProperty("--gulaab-spot-x", `${Math.max(0, Math.min(x, rect.width)).toFixed(2)}px`);
      element.style.setProperty("--gulaab-spot-y", `${Math.max(0, Math.min(y, rect.height)).toFixed(2)}px`);

      const dxFromCenter = event.clientX - (rect.left + rect.width / 2);
      const dyFromCenter = event.clientY - (rect.top + rect.height / 2);
      const totalDistance = Math.abs(dxFromCenter) + Math.abs(dyFromCenter) || 1;
      const distance = Math.sqrt(dxFromCenter ** 2 + dyFromCenter ** 2);
      const scale = Math.min(distance / 220, 1) * 0.12;

      element.style.setProperty("--gulaab-drag-x", `${Math.max(-10, Math.min(10, dxFromCenter * 0.08)).toFixed(2)}px`);
      element.style.setProperty("--gulaab-drag-y", `${Math.max(-10, Math.min(10, dyFromCenter * 0.08)).toFixed(2)}px`);
      element.style.setProperty("--gulaab-scale-x", (1.04 + scale * (Math.abs(dxFromCenter) / totalDistance)).toFixed(3));
      element.style.setProperty("--gulaab-scale-y", (1.04 + scale * (Math.abs(dyFromCenter) / totalDistance)).toFixed(3));
    }

    function releasePointer(element: HTMLElement) {
      delete element.dataset.pressed;
      element.style.setProperty("--gulaab-drag-x", "0px");
      element.style.setProperty("--gulaab-drag-y", "0px");
      element.style.setProperty("--gulaab-scale-x", "1");
      element.style.setProperty("--gulaab-scale-y", "1");
    }

    function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
      if (!disabledState && event.currentTarget.dataset.pressed === "true") updatePressVars(event);
      onPointerMove?.(event);
    }

    function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
      if (!disabledState) {
        event.currentTarget.dataset.pressed = "true";
        event.currentTarget.setPointerCapture?.(event.pointerId);
        updatePressVars(event);
      }
      onPointerDown?.(event);
    }

    function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
      releasePointer(event.currentTarget);
      onPointerUp?.(event);
    }

    function handlePointerCancel(event: React.PointerEvent<HTMLButtonElement>) {
      releasePointer(event.currentTarget);
      onPointerCancel?.(event);
    }

    function handlePointerLeave(event: React.PointerEvent<HTMLButtonElement>) {
      if (event.currentTarget.dataset.pressed !== "true") releasePointer(event.currentTarget);
      onPointerLeave?.(event);
    }

    const content = (
      <>
        {loading && <SpinnerIcon />}
        <span className="gulaab-button-label">{children}</span>
      </>
    );

    return (
      <button
        ref={ref}
        className={buttonClassName}
        data-variant={variant}
        data-tone={tone}
        data-size={size}
        data-loading={loading || undefined}
        disabled={disabledState}
        aria-busy={loading || undefined}
        data-disabled={disabledState || undefined}
        tabIndex={tabIndex}
        onClick={handleClick}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerEnter={onPointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        {...props}
      >
        {content}
      </button>
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
