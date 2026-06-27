import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClosePrimitive = DialogPrimitive.Close;

export type DialogProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(
  ({ className, ...props }, ref) => <DialogPrimitive.Overlay ref={ref} className={cn("gulaab-dialog-overlay", className)} {...props} />
);
DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={cn("gulaab-dialog-content", className)} {...props}>
        <div className="gulaab-dialog-panel">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(({ className, ...props }, ref) => <div ref={ref} className={cn("gulaab-dialog-header", className)} {...props} />);
DialogHeader.displayName = "DialogHeader";

export interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}
const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn("gulaab-dialog-title", className)} {...props} />);
DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
const DialogDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, DialogDescriptionProps>(({ className, ...props }, ref) => <DialogPrimitive.Description ref={ref} className={cn("gulaab-dialog-description", className)} {...props} />);
DialogDescription.displayName = "DialogDescription";

export interface DialogCloseProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {}
const DialogClose = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Close>, DialogCloseProps>(({ className, children, asChild, ...props }, ref) => {
  if (asChild) {
    return <DialogClosePrimitive ref={ref} asChild {...props}>{children}</DialogClosePrimitive>;
  }

  return (
    <DialogClosePrimitive ref={ref} className={cn("gulaab-dialog-close", className)} aria-label="Close" {...props}>
      {children ?? "x"}
    </DialogClosePrimitive>
  );
});
DialogClose.displayName = "DialogClose";

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose };
