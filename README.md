# gulaab

a small React component library for buttons and interaction details.

Gulaab means rose in Hindi. Right now the library is small: a button component, a docs app, a few tokens, and some interaction work around loading, hover, press, dark mode, and sound.

This is not trying to be a huge design system. I mostly want the defaults to feel right and stay consistent.

## what's inside

- **button** - variants, sizes, colors, loading state, and disabled state
- **docs app** - a small Next.js page for trying the components
- **sound** - synthesized in the browser, low gain, disabled on mobile and reduced motion
- **tokens** - colors, radius, spacing, easing, and duration values used by the components

## install

```bash
pnpm add @gulaab/ui
```

## usage

```tsx
import { Button } from "@gulaab/ui";

function Example() {
  return <Button variant="solid" color="accent">Upload</Button>;
}
```

import the styles too:

```tsx
import "@gulaab/ui/styles";
```

## notes

- Keep color use limited. Background, text, border, one accent is usually enough.
- Don't use `transition: all`.
- If an icon sits next to text, make the spacing look even.
- Respect `prefers-reduced-motion`.
- Keep sounds quiet and easy to disable.

The component rules are in [`DESIGN.md`](./DESIGN.md).

## monorepo

```
gulaab/
├── packages/ui/      -> @gulaab/ui
└── apps/docs/        -> docs app
```

## dev

```bash
pnpm install
pnpm dev
```

---

[ronish.dev](https://ronish.dev)
