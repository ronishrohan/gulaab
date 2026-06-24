# Gulaab component notes

> Working notes for Gulaab components. Read this before changing component styles or adding new components.

---

## 1. Direction

Gulaab is small on purpose. Keep the defaults clear, consistent, and easy to reason about.

Use the rose accent for interactive states. Keep backgrounds warm, borders quiet, and motion short. If a visual detail does not make the component clearer or easier to use, remove it.

---

## 2. Color System

### Light Mode

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F6F5F0` | Page background, warm off-white, not pure white |
| `--bg-subtle` | `#EEECEA` | Cards, panels, code blocks |
| `--bg-hover` | `#E8E6E1` | Hover state on surfaces |
| `--text` | `#111110` | Primary text |
| `--text-2` | `#706F6B` | Secondary text, descriptions |
| `--text-3` | `#9E9B96` | Placeholder, muted labels |
| `--border` | `rgba(0,0,0,0.08)` | Default borders, never use a solid color |
| `--border-strong` | `rgba(0,0,0,0.15)` | Emphasized borders |
| `--shadow` | `0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.06)` | Card depth |

### Dark Mode

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#111110` | Page background, warm dark, not pure black |
| `--bg-subtle` | `#1A1A18` | Cards, panels |
| `--bg-hover` | `#222220` | Hover state on surfaces |
| `--text` | `#EDEDEC` | Primary text |
| `--text-2` | `#A09E99` | Secondary text |
| `--text-3` | `#706F6B` | Muted labels |
| `--border` | `rgba(255,255,255,0.08)` | Default borders |
| `--border-strong` | `rgba(255,255,255,0.14)` | Emphasized borders |
| `--shadow` | `0 1px 2px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)` | Card depth |

### Rose Accent (Primary)

Uses Tailwind's `rose` palette. The semantic tokens:

| Token | Light | Dark |
|---|---|---|
| `--accent` | `rose-500 (#F43F5E)` | `rose-400 (#FB7185)` |
| `--accent-hover` | `rose-600 (#E11D48)` | `rose-300 (#FDA4AF)` |
| `--accent-soft` | `rose-100 (#FFE4E6)` | `rose-950/40` |
| `--accent-text` | `rose-700 (#BE123C)` | `rose-300 (#FDA4AF)` |

### Rules
- Do not use raw hex values in components. Reference a token.
- The `--border` token must be transparent/alpha so it adapts to any background.
- Accent color appears only on interactive elements and their states. Not as decoration.
- Limit color use: background, text, border, and one accent. Add more only for a real semantic state.

---

## 3. Typography

### Type Scale

| Name | Size | Line height | Letter spacing | Weight | Use |
|---|---|---|---|---|---|
| `micro` | 11px | 16px | +0.02em | 500 | Labels, badges, caps |
| `small` | 12px | 18px | +0.01em | 400/500 | Code, metadata |
| `body` | 14px | 21px | −0.01em | 400 | Body text |
| `body-md` | 15px | 23px | −0.02em | 400 | Long-form reading |
| `heading-sm` | 16px | 24px | −0.03em | 600 | Small headings |
| `heading` | 20px | 28px | −0.04em | 600 | Section headings |
| `heading-lg` | 24px | 32px | −0.05em | 700 | Page headings |
| `display` | 32–48px | 1.1 | −0.06em | 700 | Hero, display only |

### Rules
- Use `text-wrap: balance` on all headings.
- Use `text-wrap: pretty` on multi-line body text to prevent orphans.
- Weight carries hierarchy, not variety. One family, weight + size = hierarchy.
- Left-aligned, ragged right. Never justified.
- `font-variant-numeric: tabular-nums` on any number that updates dynamically.

---

## 4. Spacing & Layout

**Base unit: 4px.** All spacing is a multiple of 4.

### Spacing Scale

| Token | Value | Tailwind |
|---|---|---|
| `--space-1` | 4px | `p-1`, `gap-1` |
| `--space-2` | 8px | `p-2` |
| `--space-3` | 12px | `p-3` |
| `--space-4` | 16px | `p-4` |
| `--space-6` | 24px | `p-6` |
| `--space-8` | 32px | `p-8` |
| `--space-12` | 48px | `p-12` |
| `--space-16` | 64px | `p-16` |
| `--space-24` | 96px | `p-24` |

### Grid
- 12-column grid. Every layout answers to it.
- Gutter: 24px (desktop), 16px (tablet), 12px (mobile).
- Max content width: 1280px. Constrained layouts: 720px for reading, 960px for content.
- Sections get 64–96px vertical padding. Never less than 48px.

### Rules
- Define spacing with the scale, never arbitrary values.
- Do not fill empty space without a reason.

---

## 5. Border Radius

Use the concentric rule: `outer radius = inner radius + padding`.

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | Badges, small chips |
| `--radius-md` | 8px | Buttons (medium), inputs |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Modals, sheets |
| `--radius-full` | 9999px | Pills, avatars |

If a `--radius-md` button sits inside a `--radius-lg` card with 8px padding, adjust the card to `--radius-xl` or the button to `--radius-sm`.

---

## 6. Motion & Animation

Interactive states should transition. Keep animations short, interruptible, and disabled when the user asks for reduced motion.

### Easing Curves

```css
--ease-circ: cubic-bezier(0, 0.55, 0.45, 1);    /* circ-out: quick start, smooth land */
--ease-expo: cubic-bezier(0.16, 1, 0.3, 1);      /* expo-out: snappy, modern */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);     /* ease-in-out: balanced */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* slight overshoot: playful */
```

**Default to `--ease-circ` for interactive feedback (hover, press, focus). Use `--ease-expo` for entrance animations. Use `--ease-smooth` for exit animations.**

### Duration

```css
--duration-instant: 80ms;   /* press feedback, immediate response */
--duration-fast: 150ms;     /* hover states */
--duration-base: 200ms;     /* state transitions */
--duration-slow: 300ms;     /* entrance animations */
--duration-slower: 400ms;   /* modal open/close */
```

### Rules
- **Never use `transition: all`.** Specify exact properties: `transition-property: transform, opacity, background-color`.
- **Always use `will-change: transform` sparingly**, only when you observe first-frame stutter, only for `transform`/`opacity`/`filter`.
- Interactive state changes use CSS transitions (interruptible). Entrance/exit sequences use keyframes.
- `prefers-reduced-motion: reduce` must suppress all non-essential motion. Essential = communicates state change.
- Scale on press: always `scale(0.97)`. Never below `0.95`.
- Stagger sibling enter animations by 60–80ms per item.

### Button Animation Rules
- **Light mode press/focus:** button darkens with either `brightness(0.88)` or a darker same-color state.
- **Dark mode press/focus:** button brightens with either `brightness(1.15)` or a lighter same-color state.
- Transition: `var(--ease-circ) var(--duration-instant)`.

---

## 7. Component Design Standards

### Buttons
- Three props control appearance: `variant` (solid/soft/ghost/outline), `color`, `size`. Variant does not impose color.
- Loading state: retain color, do not gray out. Only the cursor changes to `not-allowed`. The loader replaces or accompanies the content.
- Disabled state: `opacity-40`. Do not change color scheme.
- Press: `scale(0.97)`. Never lower than `0.95`.
- Focus ring: 2px, offset 2px, color matches accent.
- Hit area: minimum 32px height for `small`, 36px for `medium`, 40px for `large`.

### Inputs
- Height matches corresponding button sizes.
- Focus state: ring using `--accent`, no outline.
- Error state: red border, red ring on focus.
- Never use placeholder as the label substitute.

### Interactive Elements
- All interactive elements need `min-width: 40px; min-height: 40px` hit area (extend with `:before` pseudo-element if visually smaller).
- `cursor: pointer` on all clickable elements.
- `user-select: none` on all interactive controls to prevent text selection on click.

---

## 8. Dark Mode

- Default: **light** (off-white background).
- User preference: stored in `localStorage` under `gulaab-theme`. Values: `"light"` | `"dark"` | `"system"`.
- Toggle applies `.dark` class to `<html>`.
- **No flash on load**: use an inline script in `<head>` that reads localStorage and sets the class before paint.
- Transitions between modes: `transition: background-color 200ms var(--ease-smooth), color 200ms var(--ease-smooth)`. Do NOT transition `border` or `box-shadow`, they flicker.

### Toggle Component
- Icon: Sun (light) ↔ Moon (dark).
- Animate icon swap: cross-fade with `opacity` + `scale(0.8→1)` + `blur(4px→0)`.
- Transition: `var(--ease-expo) 150ms`.
- Minimum hit area: 40×40px.

---

## 9. Sound

Some interactive elements use quiet synthesized sounds.

### Approach
- Programmatic synthesis via Web Audio API. No audio file dependencies.
- Sounds are extremely subtle: low gain, short decay. If you can clearly hear it, it's too loud.
- Disable on mobile (mobile OS pauses other audio to play sounds, which is jarring).
- Disable when `prefers-reduced-motion: reduce` is active.
- User can opt out: check `localStorage.getItem('gulaab-sounds') === 'false'`.

### Sound Profiles per Button Variant

| Variant | Frequency | Decay | Gain |
|---|---|---|---|
| `solid` | 280Hz | 90ms | 0.25 |
| `soft` | 440Hz | 120ms | 0.12 |
| `ghost` | 880Hz | 60ms | 0.06 |
| `outline` | 360Hz | 80ms | 0.18 |

All use an `OscillatorNode` (sine) + `GainNode` with exponential ramp to near-zero.

### Implementation Pattern
```typescript
function playUISound(variant: string) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (localStorage.getItem('gulaab-sounds') === 'false') return;
  if ('ontouchstart' in window) return; // disable mobile

  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  // ... configure per variant, connect, start, stop
}
```

---

## 10. Accessibility

- All interactive elements must be keyboard navigable.
- Focus rings: always visible, 2px solid, 2px offset, `--accent` color.
- Never rely on color alone to convey state.
- `aria-label` on icon-only buttons.
- Contrast: text must meet WCAG AA (4.5:1 for body, 3:1 for large text). The off-white + `--text` combination clears this.
- `prefers-reduced-motion`: all animations suppressed except opacity transitions.

---

## 11. Anti-Patterns

Avoid these:

- `transition: all`, always specify properties
- Border radius mismatches on nested elements
- Decoration that isn't also information (gradients for their own sake, icons that repeat label text)
- More than 4 colors in a single component
- Animations under 80ms (imperceptible) or over 500ms (feels broken)
- `border: 1px solid #e5e7eb`, use transparent/alpha borders
- Justified text
- Centered-aligned body text blocks
- Icons without 40×40 hit area
- `z-index` values above 100 without documentation
- `!important` in component styles
