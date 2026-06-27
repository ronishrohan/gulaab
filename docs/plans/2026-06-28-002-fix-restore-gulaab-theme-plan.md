---
title: "fix: Restore Gulaab Theme Around Rebuilt Components"
type: fix
status: active
date: 2026-06-28
---

# fix: Restore Gulaab Theme Around Rebuilt Components

## Summary

Restore the Gulaab product frame that the previous rebuild accidentally replaced: rose-toned theme, Devanagari wordmark, prior sidebar feel, Gulaab metadata, and docs copy. Keep the component rebuild, but retheme the components so they feel native to Gulaab rather than Sky.

---

## Problem Frame

The UI library was rebuilt around a new "Sky UI" identity. That violated the user's latest correction: the docs shell, sidebar, brand, and theme should remain Gulaab. The only intended change surface is the components themselves, and those components should inherit the same Gulaab theme and interaction sensibility.

The fix should not throw away the rebuilt component architecture. It should preserve the new component coverage and reviewed interaction work while restoring the existing Gulaab visual language around and inside it.

---

## Requirements

- R1. The docs app must present itself as Gulaab, not Sky, in metadata, hero copy, sidebar logo, storage keys, and visible labels.
- R2. The sidebar should regain the previous Gulaab feel: sticky left rail, rose-to-light gradient dot, Devanagari wordmark, compact component navigation, and bottom theme control.
- R3. The page-level docs chrome should use the prior off-white / near-black Gulaab theme, not sky-blue page decoration.
- R4. Rebuilt components should remain, but their accent, focus, active, sound, and state styling should follow Gulaab rose tokens and the prior interaction details.
- R5. The package should still expose a coherent component API and build cleanly.
- R6. Existing review fixes must be preserved: disabled slotted buttons, dialog close `asChild`, tabs ARIA, progress clamping, avatar retry, sound suppression, and direct docs CSS import.

---

## Key Technical Decisions

- KTD1. **Retheme rather than revert the component rebuild:** The user's correction targets the theme/frame, not the existence of the rebuilt components.
- KTD2. **Keep package-owned styles:** The component styling should still live in `packages/ui/src/styles.css`; the values and class naming can be corrected without moving style ownership back into docs.
- KTD3. **Preserve Gulaab-compatible routes:** The new component pages can remain, but all visible product language should say Gulaab and examples should avoid "Sky" wording.
- KTD4. **Do not reintroduce the old broken package CSS export path:** The docs app should keep the direct workspace CSS import that fixed Turbopack resolution.

---

## Implementation Units

### U1. Restore Gulaab Docs Shell

- **Goal:** Restore Gulaab identity and previous sidebar feel in the docs app.
- **Requirements:** R1, R2, R3, R6
- **Dependencies:** none
- **Files:** `apps/docs/app/globals.css`, `apps/docs/app/layout.tsx`, `apps/docs/components/Sidebar.tsx`, `apps/docs/components/ThemeToggle.tsx`, `apps/docs/components/SoundToggle.tsx`
- **Approach:** Replace Sky labels and storage keys with Gulaab equivalents. Bring back the compact rose logo treatment and Devanagari wordmark. Keep the current component registry but render it inside the prior sidebar rhythm.
- **Patterns to follow:** The pre-rebuild `Sidebar` shape and Gulaab notes in `docs/plans/plan2.md`.
- **Test scenarios:** Verify the app title/description say Gulaab. Verify the sidebar logo reads `गुलाब`. Verify the theme shortcut persists through `gulaab-theme`. Verify sound toggle does not disrupt the previous bottom sidebar placement.
- **Verification:** Docs build and lint pass.

### U2. Retheme Package Tokens and Component Copy

- **Goal:** Make rebuilt components visually belong to Gulaab.
- **Requirements:** R3, R4, R5, R6
- **Dependencies:** U1
- **Files:** `packages/ui/src/styles.css`, `apps/docs/components/ComponentDocs.tsx`, `apps/docs/hooks/useSound.ts`, `apps/docs/components/SoundButton.tsx`
- **Approach:** Change the package token values from sky-blue to Gulaab rose while preserving the existing class contract and reviewed behavior. Replace visible "Sky" copy in examples with Gulaab phrasing. Keep sound pointer-only, subtle, and user-disableable.
- **Patterns to follow:** Previous rose token values from the pre-rebuild docs CSS and the existing reviewed component class structure.
- **Test scenarios:** Verify primary components render rose, not blue. Verify dark mode brightens active rose controls. Verify docs copy no longer says Sky. Verify sound still skips keyboard activation.
- **Verification:** Package typecheck, docs lint, and full build pass.

### U3. Update PR and Verification

- **Goal:** Persist the correction on the existing PR branch.
- **Requirements:** R5, R6
- **Dependencies:** U1, U2
- **Files:** `docs/plans/2026-06-28-002-fix-restore-gulaab-theme-plan.md`, PR body if residual findings need durable handoff
- **Approach:** Run review, apply mechanical findings, commit and push to the existing PR. Browser automation remains skipped unless `agent-browser` becomes available.
- **Patterns to follow:** Current LFG pipeline and existing PR workflow.
- **Test scenarios:** Verify `pnpm --filter docs lint`, `pnpm typecheck`, and `pnpm build` pass after review fixes.
- **Verification:** Branch is clean, pushed, and the existing PR remains open.

---

## Scope Boundaries

### In Scope

- Restoring Gulaab branding and theme.
- Retheming rebuilt components to rose/Gulaab tokens.
- Keeping the new component architecture and reviewed accessibility fixes.
- Updating docs examples that still say Sky.

### Out of Scope

- Reverting to the old single-button-only docs implementation.
- Removing the new component pages solely because they were introduced during the rebuild.
- Reworking the entire package API again unless review finds a concrete breakage.

---

## Sources and Research

- `docs/plans/plan2.md`: Gulaab brand notes, rose gradient logo, prior sidebar expectations, dark mode expectations.
- `apps/docs/components/Sidebar.tsx`: current Sky sidebar that needs Gulaab restoration.
- `apps/docs/app/globals.css`: current docs shell styles and direct package CSS import.
- `packages/ui/src/styles.css`: rebuilt component token contract to retheme.
