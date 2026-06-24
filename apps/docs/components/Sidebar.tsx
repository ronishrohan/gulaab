"use client";

import { ThemeToggle } from "./ThemeToggle";

const COMPONENTS = [
  { name: "Button", active: true },
  { name: "Kbd", disabled: true },
  { name: "Tooltip", disabled: true },
  { name: "Input", disabled: true },
  { name: "Select", disabled: true },
  { name: "Checkbox", disabled: true },
  { name: "Toggle", disabled: true },
  { name: "Badge", disabled: true },
  { name: "Avatar", disabled: true },
  { name: "Dialog", disabled: true },
  { name: "Popover", disabled: true },
];

export function Sidebar() {
  return (
    <aside
      style={{
        width: 200,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        paddingRight: 16,
        paddingBottom: 120,
        paddingTop: 120,
      }}
    >
      {/* Logo — sits right above "Components" label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingLeft: 8,
          paddingBottom: 16,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "linear-gradient(to bottom, #FB7185, #FFF1F2)",
            flexShrink: 0,
          }}
        />
        <span
          lang="hi"
          style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", lineHeight: 1, fontFamily: "var(--font-khand), sans-serif" }}
        >
          गुलाब
        </span>
      </div>

      {/* Component list */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "var(--text-3)",
            marginBottom: 8,
            paddingLeft: 8,
            letterSpacing: "0.02em",
          }}
        >
          Components
        </p>
        <nav>
          {COMPONENTS.map((c) => (
            <button
              key={c.name}
              disabled={c.disabled}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "5px 8px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: c.active ? 500 : 400,
                color: c.active ? "var(--text)" : "var(--text-3)",
                background: c.active ? "var(--bg-subtle)" : "transparent",
                border: "none",
                cursor: c.disabled ? "default" : "pointer",
                opacity: c.disabled ? 0.4 : 1,
                transition: "background 120ms, color 120ms",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (!c.disabled && !c.active) {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-subtle)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!c.active) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)";
                }
              }}
            >
              {c.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Theme toggle at bottom */}
      <div style={{ paddingLeft: 0, flexShrink: 0 }}>
        <ThemeToggle />
      </div>
    </aside>
  );
}
