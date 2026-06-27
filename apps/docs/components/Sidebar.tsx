"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPONENTS } from "./componentRegistry";
import { ThemeToggle } from "./ThemeToggle";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="docs-sidebar">
      <Link className="docs-logo" href="/" aria-label="Gulaab home">
        <span className="docs-logo-mark" aria-hidden="true" />
        <span className="docs-logo-text">गुलाब</span>
      </Link>

      <div className="docs-nav-group">
        <p className="docs-nav-label">Components</p>
        <nav className="docs-nav-list" aria-label="Components">
          {COMPONENTS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href;
            const disabled = item.status === "planned";
            return (
              <Link
                key={item.slug}
                className="docs-nav-link"
                href={disabled ? "#" : item.href}
                data-active={active || undefined}
                data-disabled={disabled || undefined}
                aria-disabled={disabled || undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="docs-sidebar-footer">
        <ThemeToggle />
      </div>
    </aside>
  );
}
