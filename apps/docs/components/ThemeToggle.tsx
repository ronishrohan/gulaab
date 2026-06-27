"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "@phosphor-icons/react";
import { Button, Kbd } from "@gulaab/ui";

type Theme = "light" | "dark";

const THEME_EVENT = "sky-theme-change";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    return localStorage.getItem("sky-theme") === "dark" ? "dark" : "light";
  } catch {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }
}

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem("sky-theme", theme);
  } finally {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.dispatchEvent(new Event(THEME_EVENT));
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getThemeSnapshot, () => "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const cleanupTransitions = useCallback(() => {
    document.documentElement.classList.remove("no-transition");
  }, []);

  const applyToggle = useCallback((current: Theme) => {
    const next = current === "light" ? "dark" : "light";
    document.documentElement.classList.add("no-transition");

    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        storeTheme(next);
      } finally {
        requestAnimationFrame(() => requestAnimationFrame(cleanupTransitions));
      }
      return;
    }

    let transition: ViewTransition | undefined;
    try {
      transition = document.startViewTransition(() => {
        flushSync(() => storeTheme(next));
      });
    } catch {
      storeTheme(next);
      cleanupTransitions();
      return;
    }

    transition.finished.finally(cleanupTransitions);
  }, [cleanupTransitions]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "\\") {
        event.preventDefault();
        applyToggle(theme);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [applyToggle, theme]);

  return (
    <Button variant="ghost" tone="neutral" size="small" onClick={() => applyToggle(theme)} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      {theme === "light" ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}
      {theme === "light" ? "Dark" : "Light"}
      <Kbd size="small">Cmd \</Kbd>
    </Button>
  );
}
