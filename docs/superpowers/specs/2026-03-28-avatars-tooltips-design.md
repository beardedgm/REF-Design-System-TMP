# Phase 2 Batch 2 — Avatars & Tooltips Design Spec

**Status:** Approved
**Date:** 2026-03-28
**Prerequisite:** Phase 2 Batch 1 complete (Tabs, Pagination)

---

## Overview

Add Avatars (section 15) and Tooltips (section 16) to the Signature Design System. Avatars are small, self-contained identity indicators. Tooltips are contextual info popups. Two new CSS tokens are needed for the accent-tinted tooltip style.

## Files to Update

| File | Changes |
|------|---------|
| `globals.css` | Add `--tooltip-bg` and `--tooltip-border` tokens (both themes) |
| `tailwind.preset.js` | Add `tooltip.bg` and `tooltip.border` color references |
| `STYLE_GUIDE.md` | Add section 15 (Avatars) and section 16 (Tooltips) |
| `index.html` | Add CSS, nav links, and interactive demo sections for both |
| `CLAUDE.md` | No new rules needed |

---

## New Tokens

Two tokens for the accent-tinted tooltip, added to both theme blocks:

| Token | `:root` / `[data-theme="light"]` block | `[data-theme="dark"]` block |
|-------|----------------------------------------|-----------------------------|
| `--tooltip-bg` | `rgba(201,162,103,0.12)` | `rgba(168,132,62,0.10)` |
| `--tooltip-border` | `rgba(201,162,103,0.25)` | `rgba(168,132,62,0.25)` |

Note: globals.css `:root`/`light` uses `--accent: #c9a267` and `dark` uses `--accent: #a8843e`. Tooltip values are derived from the same accent hex in each block.

### globals.css additions

In the `:root` / `[data-theme="light"]` block (after `--accent-muted`):
```css
/* Tooltip */
--tooltip-bg: rgba(201,162,103,0.12);
--tooltip-border: rgba(201,162,103,0.25);
```

In the `[data-theme="dark"]` block (after `--accent-muted`):
```css
/* Tooltip */
--tooltip-bg: rgba(168,132,62,0.10);
--tooltip-border: rgba(168,132,62,0.25);
```

### tailwind.preset.js additions

In `colors`:
```js
tooltip: {
  bg: 'var(--tooltip-bg)',
  border: 'var(--tooltip-border)',
},
```

---

## Avatars (Section 15)

### Sizes

| Size | Dimensions | Font Size | Status Dot | Use Case |
|------|-----------|-----------|------------|----------|
| `xs` | 24px | `0.625rem` (10px) | 8px | Inline mentions, compact lists |
| `sm` | 32px | `0.75rem` (12px) | 10px | Table rows, nav items |
| `md` | 40px | `0.875rem` (14px) | 12px | Cards, comment threads |
| `lg` | 56px | `1rem` (16px) | 14px | Profile headers, team pages |

### Image Avatar

```jsx
<div className="relative inline-flex">
  <img
    src="/path/to/photo.jpg"
    alt="John Doe"
    className="w-10 h-10 rounded-full object-cover"
  />
</div>
```

- Always `rounded-full` (circle)
- `object-cover` to prevent distortion
- `alt` text is required (user's name)

Size classes:
- `xs`: `w-6 h-6`
- `sm`: `w-8 h-8`
- `md`: `w-10 h-10`
- `lg`: `w-14 h-14`

### Initials Fallback

When no image is available, show two-letter initials on an accent circle.

```jsx
<div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-text-on-accent font-semibold text-body">
  JD
</div>
```

- Background: `bg-accent`
- Text: `text-text-on-accent font-semibold`
- Initials: first letter of first name + first letter of last name, uppercase
- Font sizes per size: `xs` = `text-[0.625rem]`, `sm` = `text-caption`, `md` = `text-body`, `lg` = `text-h3`

### Status Indicator

Optional colored dot positioned at the bottom-right corner of the avatar.

```jsx
<div className="relative inline-flex">
  <img src="/photo.jpg" alt="John Doe" className="w-10 h-10 rounded-full object-cover" />
  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-bg-primary" />
</div>
```

- Position: `absolute bottom-0 right-0`
- Ring: `border-2 border-bg-primary` (matches page background for cutout effect)
- Dot sizes: `xs` = `w-2 h-2`, `sm` = `w-2.5 h-2.5`, `md` = `w-3 h-3`, `lg` = `w-3.5 h-3.5`

| Status | Color | Token |
|--------|-------|-------|
| Online | Green | `bg-success` |
| Away | Yellow | `bg-warning` |
| Busy | Red | `bg-error` |
| Offline | Gray | `bg-text-muted` |

### Avatar Group

Stacked avatars with right overlap. First avatar has highest z-index.

```jsx
<div className="flex -space-x-3" role="group" aria-label="Team members">
  <img src="/photo1.jpg" alt="John Doe" className="w-10 h-10 rounded-full object-cover ring-2 ring-bg-primary relative z-[3]" />
  <img src="/photo2.jpg" alt="Anna Kim" className="w-10 h-10 rounded-full object-cover ring-2 ring-bg-primary relative z-[2]" />
  <img src="/photo3.jpg" alt="Tom Smith" className="w-10 h-10 rounded-full object-cover ring-2 ring-bg-primary relative z-[1]" />
  <div className="w-10 h-10 rounded-full bg-bg-elevated text-text-secondary font-semibold text-caption flex items-center justify-center ring-2 ring-bg-primary relative z-[0]">
    +3
  </div>
</div>
```

- Overlap: `-space-x-3` (negative margin, ~12px overlap)
- Ring: `ring-2 ring-bg-primary` (2px ring matching page background)
- Z-index: first avatar highest, decreasing. Counter is lowest.
- Counter: `bg-bg-elevated text-text-secondary font-semibold text-caption`
- Group a11y: `role="group"` + `aria-label` describing the group

### Accessibility

- Image avatars: `alt` with user's name (required)
- Initials fallback: `aria-label` with user's full name on the container div
- Status dot: `aria-label` on the dot (e.g., "Online") or `aria-hidden="true"` if status is conveyed elsewhere
- Avatar group: `role="group"` + `aria-label`

---

## Tooltips (Section 16)

### Style

Accent-tinted: subtle gold background with accent border and arrow pointer.

```jsx
<div role="tooltip" id="tooltip-edit" className="absolute z-dropdown px-md py-sm text-caption text-text-primary bg-tooltip-bg border border-tooltip-border rounded-ds-sm shadow-ds-sm max-w-[240px]">
  Edit your profile settings
  {/* Arrow (CSS pseudo-element in practice, shown here for clarity) */}
</div>
```

- Background: `bg-tooltip-bg` (accent-tinted, theme-aware)
- Border: `border-tooltip-border`
- Text: `text-caption text-text-primary`
- Radius: `rounded-ds-sm`
- Shadow: `shadow-ds-sm`
- Max width: `max-w-[240px]`
- Z-index: `z-dropdown` (50)

### Positions

Four positions, each with corresponding arrow placement:

| Position | Tooltip placement | Arrow direction |
|----------|------------------|-----------------|
| Top (default) | Above trigger, centered | Points down |
| Right | Right of trigger, vertically centered | Points left |
| Bottom | Below trigger, centered | Points up |
| Left | Left of trigger, vertically centered | Points right |

Arrow is a 6px CSS border-triangle in `--tooltip-border` color with a 5px inner triangle in `--tooltip-bg` for the filled effect.

### Trigger Behavior

```jsx
<button
  aria-describedby="tooltip-edit"
  className="..."
  {/* Tooltip shown on hover + focus-visible */}
>
  <Pencil className="w-4 h-4" />
</button>
```

- **Show on:** `mouseenter` + `focus-visible`
- **Hide on:** `mouseleave` + `blur`
- **Delay in:** `150ms` (prevents flicker on mouse pass-through)
- **Delay out:** `0ms` (instant hide)
- **Animation:** Fade in via `opacity 0→1` over `150ms ease`

### Accessibility

- Tooltip element: `role="tooltip"` + unique `id`
- Trigger element: `aria-describedby` referencing the tooltip `id`
- Tooltip does NOT receive focus (it's supplementary info)
- Appears on `focus-visible` so keyboard users can access it
- `Escape` dismisses the tooltip (returns focus to trigger)
- Respects `prefers-reduced-motion` (skip fade, show instantly)

### Tailwind Class Patterns

**Trigger + Tooltip (top position):**
```jsx
<div className="relative inline-flex">
  <button aria-describedby="tip-1" className="...">
    <Pencil className="w-4 h-4" />
  </button>
  <div
    role="tooltip"
    id="tip-1"
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-sm z-dropdown px-md py-sm text-caption text-text-primary bg-tooltip-bg border border-tooltip-border rounded-ds-sm shadow-ds-sm max-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150"
  >
    Edit profile
    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-tooltip-border" />
    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-[-1px] border-[5px] border-transparent border-t-tooltip-bg" />
  </div>
</div>
```

**Position classes:**
- Top: `bottom-full left-1/2 -translate-x-1/2 mb-sm` — arrow at bottom
- Right: `left-full top-1/2 -translate-y-1/2 ml-sm` — arrow at left
- Bottom: `top-full left-1/2 -translate-x-1/2 mt-sm` — arrow at top
- Left: `right-full top-1/2 -translate-y-1/2 mr-sm` — arrow at right

---

## Design Decisions & Rationale

1. **Two-letter initials at all sizes.** More identifiable than single letter, and even at `xs` (24px) two letters at 10px font are readable.

2. **Accent background for initials fallback.** Uses the brand gold, making avatars feel intentional rather than like broken images. Consistent with how accent is used for key interactive highlights.

3. **Status dot with page-bg ring.** The 2px ring in `border-bg-primary` creates a visual cutout that separates the dot from the avatar image cleanly in both themes.

4. **First avatar on top in groups.** Emphasizes the primary/most important user (often the current user or team lead). The `+N` counter is always last and lowest z-index.

5. **Accent-tinted tooltips.** Ties tooltips to the brand identity. The semi-transparent accent background is subtle enough not to compete with actual accent CTAs while remaining distinctive.

6. **New tokens for tooltip.** Rather than reusing `--accent-muted`, dedicated `--tooltip-bg` and `--tooltip-border` tokens allow future tuning without affecting other accent-muted usage. Only 2 new variables.

7. **Always show arrow.** Removes ambiguity about which element the tooltip describes. Critical when multiple interactive elements are close together.

8. **150ms delay-in, 0ms delay-out.** Prevents tooltip flicker when mouse passes through trigger areas quickly. Instant hide feels responsive.

9. **`aria-describedby` not `aria-labelledby`.** Tooltips provide supplementary info, not the primary label. Screen readers announce the trigger's own label first, then the tooltip description.
