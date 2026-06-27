import * as React from "react";
import { Button, type ButtonProps } from "../Button";
import { cn } from "../../lib/utils";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  children: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <Button ref={ref} className={cn("gulaab-icon-button", className)} {...props}>
      {children}
    </Button>
  );
});

IconButton.displayName = "IconButton";

export { IconButton };
