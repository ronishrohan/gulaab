"use client";

import { useLayoutEffect, useRef, useState } from "react";

export function AnimatingText({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const sizerRef = useRef<HTMLSpanElement>(null);

  // useLayoutEffect runs before paint, so the intermediate state
  // (old width with new content) is never visible.
  // A hidden sizer measures the natural content width — scrollWidth
  // on the display span would return max(clientWidth, content) and
  // fail to detect shrinkage.
  useLayoutEffect(() => {
    if (!sizerRef.current) return;
    setWidth(sizerRef.current.offsetWidth);
  }, [children]);

  return (
    <span style={{ display: "inline-flex", position: "relative" }}>
      <span
        ref={sizerRef}
        aria-hidden
        style={{ visibility: "hidden", position: "absolute", whiteSpace: "nowrap" }}
      >
        {children}
      </span>
      <span
        style={{
          display: "inline-block",
          width,
          transition: "width 200ms cubic-bezier(0,0.55,0.45,1)",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </span>
  );
}
