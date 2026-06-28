import * as React from "react";
import { Button, type ButtonProps } from "../Button";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  children: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ className, children, ...props }, ref) => {
  const iconClassName = className ? `gulaab-icon-button ${className}` : "gulaab-icon-button";

  return (
    <Button ref={ref} className={iconClassName} {...props}>
      {children}
    </Button>
  );
});

IconButton.displayName = "IconButton";

export { IconButton };
