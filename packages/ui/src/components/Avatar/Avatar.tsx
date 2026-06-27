import * as React from "react";
import { cn } from "../../lib/utils";

export type AvatarSize = "small" | "medium" | "large";

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt = "", fallback, size = "medium", ...props }, ref) => {
    const [failedSrc, setFailedSrc] = React.useState<string | undefined>();
    const showImage = src && failedSrc !== src;
    const initials = fallback?.trim().slice(0, 2).toUpperCase();

    return (
      <span ref={ref} className={cn("sky-avatar", className)} data-size={size} {...props}>
        {showImage ? <img src={src} alt={alt} onError={() => setFailedSrc(src)} /> : <span aria-hidden="true">{initials}</span>}
      </span>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
