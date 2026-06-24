# गुलाब

a detail-obsessed react component library. things that thock.

gulaab (गुलाब, hindi for rose) is a design system built around one idea: how things feel matters as much as how they look. every button press has a sound. every state change has motion. every spacing decision has a reason.

the accent is rose. the type is open runde. the backgrounds are warm. the borders are transparent. the philosophy is swiss-caliber precision with warmth, color, and personality on top.

## what's inside

- **button** — four variants (solid, soft, ghost, outline), five colors (accent, blue, red, amber, black), five sizes (micro → large), loading state with smooth spinner animation, programmatic sound feedback per variant
- **design tokens** — css custom properties for colors, spacing, radius, easing, and duration. light and dark mode. no raw hex in components.
- **sound design** — programmatic web audio api synthesis. four sound profiles matched to button variants. subtle enough you barely notice, but you'd miss it if it was gone. disabled on mobile and when `prefers-reduced-motion` is active.

## install

```bash
pnpm add @gulaab/ui
```

## usage

```tsx
import { Button } from "@gulaab/ui";

function Example() {
  return <Button variant="solid" color="accent">thock me</Button>;
}
```

import the styles too:

```tsx
import "@gulaab/ui/styles";
```

## design principles

1. **feel first.** motion is first-class. sound is first-class. every interaction responds.
2. **precision with warmth.** off-white backgrounds, transparent borders, rounded type. not clinical.
3. **four colors max.** background, text, border, one accent. if you're reaching for a fifth, remove something.
4. **equal spacing.** when an icon sits next to text, its left space equals its gap to the text. no exceptions.
5. **concentric radius.** outer radius = inner radius + padding. if they don't match, it feels off.
6. **no `transition: all`.** ever. specify the exact properties.

the full design reference lives in [`DESIGN.md`](./DESIGN.md). it's long, opinionated, and every rule exists because breaking it made something feel wrong.

## monorepo

```
gulaab/
├── packages/ui/      → @gulaab/ui (the component library)
└── apps/docs/        → next.js showcase (what you're looking at)
```

## dev

```bash
pnpm install
pnpm dev
```

## the name

गुलाब. rose. because the accent is rose. because it sounds nice. because bengaluru.

---

[ronish.dev](https://ronish.dev)
