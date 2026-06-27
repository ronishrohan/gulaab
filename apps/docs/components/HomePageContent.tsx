"use client";

import Link from "next/link";
import { Badge, Button, TextField } from "@gulaab/ui";
import { Sidebar } from "./Sidebar";
import { COMPONENTS } from "./componentRegistry";

export function HomePageContent() {
  return (
    <div className="docs-shell">
      <Sidebar />
      <main className="docs-main">
        <article className="docs-page docs-page-simple">
          <section className="docs-section">
            <h1 className="docs-title">Why Gulaab</h1>
            <p className="docs-description">A small React component library for building calm interfaces with a rose accent, plain docs, and sensible defaults.</p>
          </section>

          <section className="docs-section">
            <div className="docs-section-header">
              <h2 className="docs-section-title">Examples</h2>
            </div>
            <div className="docs-row">
              <Button>Save</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outline">Outline</Button>
              <Badge>Ready</Badge>
            </div>
            <div className="docs-form-example">
              <TextField label="Email" placeholder="you@example.com" helperText="Small controls, clear labels." />
            </div>
          </section>

          <section className="docs-section">
            <div className="docs-section-header">
              <h2 className="docs-section-title">Components</h2>
            </div>
            <nav className="docs-component-list" aria-label="Components">
              {COMPONENTS.map((component) => (
                <Link key={component.slug} href={component.href}>
                  {component.name}
                </Link>
              ))}
            </nav>
          </section>
        </article>
      </main>
    </div>
  );
}
