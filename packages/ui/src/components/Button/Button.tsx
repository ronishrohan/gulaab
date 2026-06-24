import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 cursor-pointer",
    "font-medium leading-none select-none whitespace-nowrap",
    "rounded-md border border-transparent",
    // Specific properties only — never transition-all
    "transition-[background-color,border-color,color,transform,filter,opacity,box-shadow]",
    "duration-[80ms] ease-[cubic-bezier(0,0.55,0.45,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    // Press: scale down + darken in light mode, brighten in dark mode
    "active:scale-[0.97]",
    "active:[filter:brightness(0.88)]",
    "dark:active:[filter:brightness(1.15)]",
    // Focus matches press brightness (subtle, not just ring)
    "focus-visible:[filter:brightness(0.92)]",
    "dark:focus-visible:[filter:brightness(1.10)]",
  ],
  {
    variants: {
      variant: {
        solid: "",
        soft: "",
        ghost: "border-transparent bg-transparent",
        outline: "bg-transparent",
      },
      color: {
        accent: "",
        blue: "",
        red: "",
        amber: "",
        black: "",
      },
      size: {
        micro: "h-5 px-1.5 text-[11px] rounded",
        tiny: "h-6 px-2 text-xs rounded",
        small: "h-7 px-2.5 text-sm",
        medium: "h-8 px-3 text-sm",
        large: "h-10 px-4 text-base",
      },
    },
    compoundVariants: [
      // solid + color — light: border lighter than bg, dark: border darker than bg
      { variant: "solid", color: "accent", class: "bg-rose-500 text-white border-rose-400 hover:bg-rose-600 dark:border-rose-600 focus-visible:ring-rose-500" },
      { variant: "solid", color: "blue", class: "bg-blue-500 text-white border-blue-400 hover:bg-blue-600 dark:border-blue-600 focus-visible:ring-blue-500" },
      { variant: "solid", color: "red", class: "bg-red-500 text-white border-red-400 hover:bg-red-600 dark:border-red-600 focus-visible:ring-red-500" },
      { variant: "solid", color: "amber", class: "bg-amber-400 text-black border-amber-300 hover:bg-amber-500 dark:border-amber-500 focus-visible:ring-amber-400" },
      { variant: "solid", color: "black", class: "bg-gray-900 text-white border-gray-700 hover:bg-gray-800 focus-visible:ring-gray-900 dark:bg-white dark:text-gray-900 dark:border-gray-200 dark:hover:bg-gray-100" },
      // soft + color
      { variant: "soft", color: "accent", class: "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800/60 dark:hover:bg-rose-900/50 focus-visible:ring-rose-500" },
      { variant: "soft", color: "blue", class: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/60 dark:hover:bg-blue-900/50 focus-visible:ring-blue-500" },
      { variant: "soft", color: "red", class: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/60 dark:hover:bg-red-900/50 focus-visible:ring-red-500" },
      { variant: "soft", color: "amber", class: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/60 dark:hover:bg-amber-900/50 focus-visible:ring-amber-400" },
      { variant: "soft", color: "black", class: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 focus-visible:ring-gray-500" },
      // ghost + color
      { variant: "ghost", color: "accent", class: "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20 focus-visible:ring-rose-500" },
      { variant: "ghost", color: "blue", class: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 focus-visible:ring-blue-500" },
      { variant: "ghost", color: "red", class: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 focus-visible:ring-red-500" },
      { variant: "ghost", color: "amber", class: "text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20 focus-visible:ring-amber-400" },
      { variant: "ghost", color: "black", class: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus-visible:ring-gray-500" },
      // outline + color
      { variant: "outline", color: "accent", class: "border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-900/20 focus-visible:ring-rose-500" },
      { variant: "outline", color: "blue", class: "border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 focus-visible:ring-blue-500" },
      { variant: "outline", color: "red", class: "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 focus-visible:ring-red-500" },
      { variant: "outline", color: "amber", class: "border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20 focus-visible:ring-amber-400" },
      { variant: "outline", color: "black", class: "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 focus-visible:ring-gray-500" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "accent",
      size: "medium",
    },
  }
);

export type ButtonVariant = "solid" | "soft" | "ghost" | "outline";
export type ButtonColor = "accent" | "blue" | "red" | "amber" | "black";
export type ButtonSize = "micro" | "tiny" | "small" | "medium" | "large";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  render?: React.ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      asChild = false,
      loading = false,
      render,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    if (render) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, color, size }), className)}
          {...props}
        >
          {React.cloneElement(render, {}, children)}
        </Slot>
      );
    }

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, color, size }), className)}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...props}
      >
        {/* Always in DOM — animates margin-left to drive parent width */}
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            overflow: "hidden",
            flexShrink: 0,
            maxWidth: loading ? 14 : 0,
            marginRight: loading ? 0 : -6, // -6px cancels gap-1.5 when hidden
            opacity: loading ? 1 : 0,
            transition: [
              "max-width 200ms cubic-bezier(0,0.55,0.45,1)",
              "margin-right 200ms cubic-bezier(0,0.55,0.45,1)",
              "opacity 150ms",
            ].join(", "),
          }}
        >
          <SpinnerSvg />
        </span>
        {children}
      </Comp>
    );
  }
);

function SpinnerSvg() {
  return (
    <>
      <style>{`@keyframes gulaab-spin { to { transform: rotate(360deg); } }`}</style>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        style={{ animation: "gulaab-spin 0.75s linear infinite", flexShrink: 0 }}
      >
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
        <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </>
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
