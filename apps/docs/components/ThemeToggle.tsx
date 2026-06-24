"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("gulaab-theme");
    setTheme(stored === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function applyToggle(current: "light" | "dark") {
    const next = current === "light" ? "dark" : "light";
    localStorage.setItem("gulaab-theme", next);
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

    vt.finished.finally(() => {
      document.documentElement.classList.remove("no-transition");
    });
  }

  // ⌘\ global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "\\") {
        e.preventDefault();
        applyToggle(themeRef.current);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!mounted) return <div style={{ height: 28 }} aria-hidden />;

  return (
    <button
      onClick={() => applyToggle(theme)}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode (⌘\\)`}
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
        userSelect: "none",
        textAlign: "left",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)"; }}
    >
      {theme === "light"
        ? <Moon size={13} weight="regular" />
        : <Sun size={13} weight="regular" />
      }
      <span style={{ flex: 1 }}>{theme === "light" ? "Dark" : "Light"}</span>
      <kbd style={{
        fontSize: 10,
        color: "var(--text-3)",
        background: "var(--bg-subtle)",
        border: "1px solid var(--border)",
        borderRadius: 4,
        padding: "1px 4px",
        fontFamily: "inherit",
        letterSpacing: "0.01em",
        lineHeight: 1.6,
        opacity: 0.7,
      }}>
        ⌘\
      </kbd>
    </button>
  );
}
