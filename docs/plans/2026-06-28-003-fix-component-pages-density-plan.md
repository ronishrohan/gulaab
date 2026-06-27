---
title: "fix: Revamp Component Page Density"
type: fix
status: active
date: 2026-06-28
---

# fix: Revamp Component Page Density

## Summary

Tighten the component documentation pages so they feel lighter and closer to the restored Gulaab shell: smaller page titles, no top "Gulaab" kicker, no gradient preview frame, no accessibility/motion appendix, and no boxed preview containers around each section. Also make the components themselves rounder and ensure button hover/pressed states darken within their own color family rather than falling back to a gray surface.

---

## Problem Frame

The component pages still carry a large showcase layout from the earlier rebuild. That layout overstates the page title, adds a top product kicker, wraps every variant/tone group in a preview card, and ends with an explanatory accessibility/motion section the user does not want. Separately, the component style contract still uses generic gray hover/active treatment in places where buttons should darken in their own tone.

This is a docs presentation and component-state polish pass. It should not change the component API or rework the sidebar again beyond preserving the already-requested plain text/sidebar icon changes.

---

## Requirements

- R1. Component page headings should be much smaller than the current hero-scale title.
- R2. Remove the top "Gulaab" kicker from component pages.
- R3. Remove the gradient from the hero/display preview area.
- R4. Make components more rounded through the shared Gulaab radius contract.
- R5. Remove the accessibility/motion/sound appendix section from component pages.
- R6. Remove preview containers around section content such as variants, tones, and states; content should sit directly below each section heading.
- R7. Buttons must not turn gray on hover/press. Hover and held/active states should darken within each button's own variant/tone shade.
- R8. Preserve existing Tabler icon changes and text-only sidebar row styling from the current working tree.

---

## Technical Decisions

- Keep this as a style/docs reshaping pass: no component props or route changes.
- Use shared CSS tokens for roundness so all package components become rounder together.
- Remove the docs wrapper markup in `ComponentDocs` rather than hiding it with CSS, because the desired content hierarchy no longer has preview cards for sections.
- Replace generic button hover/active gray handling with variant-specific color rules that continue to respect tone variables.

---

## Implementation Units

### U1. Simplify Component Page Structure

- **Goal:** Remove the heavy docs page chrome and appendix sections.
- **Requirements:** R1, R2, R3, R5, R6, R8
- **Files:** `apps/docs/components/ComponentDocs.tsx`, `apps/docs/app/globals.css`
- **Approach:** Drop the kicker element and accessibility/motion section from `PageFrame`. Render section content directly after each section header instead of inside `.docs-demo`. Retune `.docs-title`, `.docs-hero`, `.docs-hero-card`, and section spacing for a smaller, flatter page.
- **Test scenarios:** Homepage/component page builds without missing JSX wrappers. Button page displays variant/tone rows directly below headings. No "Accessibility and motion" heading remains. No top "Gulaab" kicker remains.
- **Verification:** `pnpm --filter docs lint`, `pnpm --filter docs build`.

### U2. Round Components and Fix Button State Color

- **Goal:** Make package components rounder and make button interaction states color-aware.
- **Requirements:** R4, R7
- **Files:** `packages/ui/src/styles.css`
- **Approach:** Increase shared radius tokens. Remove the generic gray hover/active button treatment. Add variant-specific hover and active backgrounds for solid, soft, outline, and ghost/link button families that derive from `--gulaab-primary`, `--gulaab-primary-strong`, and tone-local overrides.
- **Test scenarios:** Primary, neutral, danger, and warning buttons darken or deepen within their own tone when hovered/pressed. Soft/outline/ghost variants no longer jump to neutral gray. Roundness changes apply to controls, cards, and overlays through shared tokens.
- **Verification:** `pnpm typecheck`, `pnpm build`.

### U3. Persist and Update PR

- **Goal:** Finish the LFG workflow with review, verification, commit, push, and PR update.
- **Requirements:** R1-R8
- **Files:** `docs/plans/2026-06-28-003-fix-component-pages-density-plan.md`, PR body if needed
- **Approach:** Run code review against this plan, apply any eligible mechanical fixes, skip browser automation if `agent-browser` remains unavailable, commit remaining work, push the open branch, and update the existing PR.
- **Test scenarios:** Working tree is clean after commit. Existing PR remains open and reflects the latest component page density changes.
- **Verification:** `gh pr view --json number,url,state,title`; CI watch if checks exist.

---

## Scope Boundaries

### In Scope

- Component docs page layout density and section structure.
- Shared component radius tokens.
- Button hover/active color behavior.
- Preserving existing uncommitted Tabler/sidebar refinements.

### Out of Scope

- Removing component pages or changing component list.
- Redesigning the sidebar beyond preserving the already requested text-only rows.
- Adding new component APIs.
- Adding browser automation tooling.
