---
title: "fix: Simplify Gulaab Docs Content"
type: fix
status: active
date: 2026-06-28
---

# fix: Simplify Gulaab Docs Content

## Summary

Make the docs site extremely simple. Remove remaining showcase framing, remove sound controls, keep the theme toggle plain, and reshape the homepage so it starts with "Why Gulaab", then "Examples", then "Components". Component pages should remain useful but should avoid preview cards, labels, and heavy explanatory copy.

---

## Problem Frame

The docs app still feels too designed for a showcase: hero preview cards, explanatory page sections, sound controls, and interaction chrome add too much detail. The user wants a much simpler documentation surface. Dark mode also exposes two rough edges: the theme toggle styling breaks visually and sidebar controls still have background-hover behavior. The sound toggle should be removed entirely.

---

## Requirements

- R1. Remove the sound toggle from the sidebar.
- R2. Theme toggle must remain visible and functional in dark mode.
- R3. Theme toggle must not get a background hover effect.
- R4. Remove preview-card framing from the website content, including the hero/display preview.
- R5. Make the docs content very simple and reduce explanatory detail.
- R6. The homepage order should be: "Why Gulaab", then "Examples", then "Components".
- R7. There must not be a label above "Why Gulaab".
- R8. Preserve the existing component routes and core examples.
- R9. Keep the current dark-mode button fixes and avoid bringing back the too-bright soft button behavior.

---

## Technical Decisions

- Use a dedicated homepage instead of making `/` reuse the Button component page. This lets the docs have the requested "Why Gulaab / Examples / Components" order without distorting individual component reference pages.
- Keep `ComponentDocPage` generic, but remove its hero card wrapper so component examples render as plain content.
- Remove `SoundToggle` from the sidebar and remove sound-specific homepage copy. The sound hook can stay because `SoundButton` still uses it for examples unless a later request removes sound entirely.
- Fix the theme toggle as sidebar text control using scoped CSS, not button backgrounds.
- Clean up the token mistake from the prior dark-mode soft-button work so light tokens stay light and dark tokens stay dark.

---

## Implementation Units

### U1. Simplify Homepage and Page Frame

- **Goal:** Build a minimal homepage and remove preview framing from component pages.
- **Requirements:** R4, R5, R6, R7, R8
- **Files:** `apps/docs/app/page.tsx`, `apps/docs/components/ComponentDocs.tsx`, `apps/docs/app/globals.css`
- **Approach:** Replace the homepage's Button page reuse with simple markup: `Why Gulaab`, `Examples`, `Components`. Remove the hero preview-card wrapper from `ComponentDocPage`, using a plain examples block instead. Simplify spacing and remove unused preview/card CSS where no longer needed.
- **Test scenarios:** `/` renders Why Gulaab first with no label above it. Examples appears before Components. Component links still route correctly. Component pages still show their examples without card framing.
- **Verification:** `pnpm --filter docs lint`, `pnpm --filter docs build`.

### U2. Remove Sound Toggle and Fix Sidebar Controls

- **Goal:** Keep the sidebar simple and avoid broken dark-mode control styling.
- **Requirements:** R1, R2, R3
- **Files:** `apps/docs/components/Sidebar.tsx`, `apps/docs/components/ThemeToggle.tsx`, `apps/docs/app/globals.css`
- **Approach:** Remove `SoundToggle` import/render from the sidebar. Keep `ThemeToggle`, but render it as a plain sidebar row with no background hover. Remove the extra spacer div and any footer styling that existed only to house multiple controls.
- **Test scenarios:** Sidebar shows only theme toggle below component nav. Theme toggle changes text/icon in dark mode. Hovering it changes text color only, not background.
- **Verification:** lint/build.

### U3. Normalize Light/Dark Button Tokens

- **Goal:** Preserve the dark soft-button fix while correcting token placement.
- **Requirements:** R9
- **Files:** `packages/ui/src/styles.css`
- **Approach:** Restore light-mode soft tokens to light values. Keep dark-mode soft tokens dark and keep explicit dark base/hover/active rules for soft, outline, ghost, and neutral variants.
- **Test scenarios:** Light soft button is pale rose. Dark soft button is dark rose tint, not white. Dark hover is subtle. Dark active is slightly brighter but not a flash.
- **Verification:** typecheck/build.

### U4. LFG Finish

- **Goal:** Review, apply eligible fixes, commit, push, update PR, and check CI.
- **Requirements:** R1-R9
- **Files:** `docs/plans/2026-06-28-004-fix-simple-docs-content-plan.md`
- **Approach:** Run code review with this plan, apply mechanical fixes, skip browser automation if `agent-browser` remains unavailable, commit and push remaining changes, update the existing PR, and watch checks if present.
- **Test scenarios:** Working tree clean; open PR updated; no checks or green checks.
- **Verification:** `git status --short`, `gh pr view --json number,url,state,title`.

---

## Scope Boundaries

### In Scope

- Homepage content order and simplification.
- Removing preview-card wrappers.
- Removing sound toggle from the sidebar.
- Theme toggle dark/hover styling.
- Light/dark button token cleanup.

### Out of Scope

- Removing the component library or routes.
- Removing the sound hook or `SoundButton` behavior everywhere.
- Adding visual automation tooling.
