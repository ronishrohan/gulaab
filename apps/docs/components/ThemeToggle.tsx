"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { IconMoon, IconSun } from "@tabler/icons-react";

type Theme = "light" | "dark";

const THEME_EVENT = "gulaab-theme-change";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    return localStorage.getItem("gulaab-theme") === "dark" ? "dark" : "light";
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
    localStorage.setItem("gulaab-theme", theme);
  } catch {
    // Visual theme changes should still work when storage is unavailable.
  }
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getThemeSnapshot, () => "light");
  const transitionId = useRef(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const cleanupTransitions = useCallback((id: number) => {
    if (transitionId.current === id) document.documentElement.classList.remove("no-transition");
  }, []);

  const applyToggle = useCallback((current: Theme) => {
    const next = current === "light" ? "dark" : "light";
    const id = transitionId.current + 1;
    transitionId.current = id;
    document.documentElement.classList.add("no-transition");

    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        storeTheme(next);
      } finally {
        requestAnimationFrame(() => requestAnimationFrame(() => cleanupTransitions(id)));
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
      cleanupTransitions(id);
      return;
    }

    transition.finished.finally(() => cleanupTransitions(id));
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
    <button className="docs-sidebar-action" type="button" onClick={() => applyToggle(theme)} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      {theme === "light" ? <IconMoon size={15} stroke={1.8} aria-hidden="true" /> : <IconSun size={15} stroke={1.8} aria-hidden="true" />}
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
