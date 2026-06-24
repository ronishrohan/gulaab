"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("sky-theme");
    setTheme(stored === "dark" ? "dark" : "light");
  }, []);

  // Class toggle lives in an effect so flushSync can flush it synchronously
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem("sky-theme", next);

    // Disable all element CSS transitions for the duration of the switch
    document.documentElement.classList.add("no-transition");

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(next);
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          document.documentElement.classList.remove("no-transition")
        )
      );
      return;
    }

    const vt = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    vt.finished.then(() => {
      document.documentElement.classList.remove("no-transition");
    });
  }

  if (!mounted) return <div style={{ height: 28 }} aria-hidden />;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px 8px",
        borderRadius: 6,
        fontSize: 13,
        color: "var(--text-3)",
        fontFamily: "inherit",
        fontWeight: 400,
        transition: "color 120ms",
        textAlign: "left",
        width: "100%",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)"; }}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
