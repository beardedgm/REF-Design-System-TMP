# Phase 2 Batch 1 — Tabs & Pagination Design Spec

**Status:** Approved
**Date:** 2026-03-28
**Prerequisite:** Phase 1 complete (nav shells, form controls, toasts, icon system)

---

## Overview

Add Tabs (section 13) and Pagination (section 14) to the Signature Design System. These are table/list companion components needed by most SaaS apps. No new design tokens required — both components build entirely on the existing token set.

## Files to Update

| File | Changes |
|------|---------|
| `STYLE_GUIDE.md` | Add section 13 (Tabs) and section 14 (Pagination) |
| `index.html` | Add interactive demos + nav group entries for both |
| `globals.css` | No changes |
| `tailwind.preset.js` | No changes |
| `CLAUDE.md` | No new rules needed |

---

## Tabs (Section 13)

### Variants

Three tab variants, each with a distinct visual indicator:

#### 1. Underline

- Horizontal tab bar with a `1px border-border` bottom track line
- Active tab: `3px` accent bottom border (overlaps track), `text-accent`, `font-semibold`
- Inactive tabs: `text-text-secondary`, no bottom border
- Hover (inactive): `text-text-primary`

#### 2. Pill

- Horizontal tab bar with `bg-bg-secondary` track, `rounded-ds-md`, `p-xs` padding on track
- Active tab: `bg-accent-muted`, `text-accent`, `font-semibold`, `rounded-ds-sm`
- Inactive tabs: `text-text-secondary`, transparent background
- Hover (inactive): `bg-bg-elevated`

#### 3. Vertical

- Vertical stack, no track border
- Active tab: `bg-accent-muted`, `text-accent`, `font-semibold`, `rounded-ds-sm`
- Inactive tabs: `text-text-secondary`, transparent background
- Hover (inactive): `bg-bg-elevated`, `rounded-ds-sm`
- Width: determined by container (typically `180px`–`240px` in a settings panel)

### Icons

- Optional Lucide icon before label: `w-4 h-4` with `gap-sm` between icon and text
- Icons inherit color via `currentColor` — no extra color classes needed
- Icon-only tabs are NOT supported (text label always required)

### Sizing

- Single size matching existing component scale:
  - Tab items: `py-sm px-lg text-body`
  - Pill track padding: `p-xs`

### Accessibility

- Container: `role="tablist"`, `aria-label` describing the tab group
- Each tab: `role="tab"`, `aria-selected="true|false"`, `tabindex="0|-1"`
- Associated panel: `role="tabpanel"`, `aria-labelledby` referencing the tab `id`
- Keyboard: arrow keys move focus between tabs, `Enter`/`Space` activates, `Home`/`End` jump to first/last
- Only the active tab is in the tab order (`tabindex="0"`), others are `tabindex="-1"`

### Motion

- Indicator transitions: `transition-all duration-150 ease`
- Applies to: underline position, pill background, vertical highlight
- Respects `prefers-reduced-motion`

### Tailwind Class Patterns

**Underline:**
```jsx
{/* Container */}
<div role="tablist" aria-label="Section tabs" className="flex border-b border-border">
  {/* Active tab */}
  <button role="tab" aria-selected="true" className="inline-flex items-center gap-sm px-lg py-sm text-body font-semibold text-accent border-b-[3px] border-accent -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    <ChevronRight className="w-4 h-4" /> {/* optional icon */}
    Overview
  </button>
  {/* Inactive tab */}
  <button role="tab" aria-selected="false" tabIndex={-1} className="inline-flex items-center gap-sm px-lg py-sm text-body text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Settings
  </button>
</div>
```

**Pill:**
```jsx
<div role="tablist" aria-label="View tabs" className="inline-flex p-xs bg-bg-secondary rounded-ds-md">
  {/* Active */}
  <button role="tab" aria-selected="true" className="inline-flex items-center gap-sm px-lg py-sm text-body font-semibold text-accent bg-accent-muted rounded-ds-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Overview
  </button>
  {/* Inactive */}
  <button role="tab" aria-selected="false" tabIndex={-1} className="inline-flex items-center gap-sm px-lg py-sm text-body text-text-secondary hover:bg-bg-elevated rounded-ds-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Settings
  </button>
</div>
```

**Vertical:**
```jsx
<div role="tablist" aria-label="Settings sections" aria-orientation="vertical" className="flex flex-col gap-xs">
  {/* Active */}
  <button role="tab" aria-selected="true" className="inline-flex items-center gap-sm px-lg py-sm text-body font-semibold text-accent bg-accent-muted rounded-ds-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    General
  </button>
  {/* Inactive */}
  <button role="tab" aria-selected="false" tabIndex={-1} className="inline-flex items-center gap-sm px-lg py-sm text-body text-text-secondary hover:bg-bg-elevated rounded-ds-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Security
  </button>
</div>
```

---

## Pagination (Section 14)

### Variants

Two pagination variants for different contexts:

#### 1. Full (Numbered)

- All page numbers displayed as bordered buttons: `border border-border rounded-ds-md`
- Active page: `border-accent bg-accent-muted text-accent font-semibold`
- Inactive pages: `text-text-secondary`, hover: `border-border-hover bg-bg-elevated`
- Prev/Next buttons: bordered, same style as inactive page numbers but with text labels
- Ellipsis: `text-text-muted`, not clickable, rendered as `...`
- Minimum button size: `36px` width for page numbers (ensures touch target)

#### 2. Compact (Prev/Next)

- Two bordered buttons: "← Previous" and "Next →"
- Center text: "Page X of Y" in `text-caption text-text-muted`
- Button style matches default (ghost) button pattern: `border border-border rounded-ds-md`
- Hover: `border-border-hover bg-bg-elevated`

### Truncation Logic (Full variant)

Activates when total pages >= 7. Algorithm:

- Always show first page and last page
- Show a window of 3 pages centered on the current page
- Use `...` ellipsis to bridge gaps between first/window and window/last
- Examples:
  - Page 1 of 12: `[1] 2 3 ... 12`
  - Page 5 of 12: `1 ... 4 [5] 6 ... 12`
  - Page 12 of 12: `1 ... 10 11 [12]`
  - Page 3 of 8: `1 2 [3] 4 ... 8`

### Disabled State

- Previous button disabled on page 1: `opacity-40 cursor-not-allowed pointer-events-none`
- Next button disabled on last page: same disabled treatment
- Uses `aria-disabled="true"` (not `disabled` attribute, to allow screen reader announcement)

### Accessibility

- Wrapper: `<nav aria-label="Pagination">`
- Active page: `aria-current="page"`
- Disabled buttons: `aria-disabled="true"`
- Each page button has accessible text (number is sufficient)
- Ellipsis elements: `aria-hidden="true"` (decorative)

### Motion

- Hover/active transitions: `transition-all duration-150 ease`
- Respects `prefers-reduced-motion`

### Tailwind Class Patterns

**Full (Numbered):**
```jsx
<nav aria-label="Pagination" className="flex items-center gap-xs">
  {/* Prev button */}
  <button className="inline-flex items-center px-md py-sm text-label border border-border rounded-ds-md text-text-secondary hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed" aria-disabled="true">
    <ChevronLeft className="w-4 h-4 mr-xs" />
    Prev
  </button>

  {/* Page number */}
  <button className="min-w-[36px] px-sm py-sm text-label text-text-secondary border border-border rounded-ds-md hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 text-center">
    1
  </button>

  {/* Ellipsis */}
  <span className="px-xs text-text-muted" aria-hidden="true">...</span>

  {/* Active page */}
  <button className="min-w-[36px] px-sm py-sm text-label font-semibold text-accent border border-accent bg-accent-muted rounded-ds-md text-center" aria-current="page">
    5
  </button>

  {/* Next button */}
  <button className="inline-flex items-center px-md py-sm text-label border border-border rounded-ds-md text-text-secondary hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Next
    <ChevronRight className="w-4 h-4 ml-xs" />
  </button>
</nav>
```

**Compact:**
```jsx
<nav aria-label="Pagination" className="flex items-center gap-lg">
  <button className="inline-flex items-center px-lg py-sm text-body border border-border rounded-ds-md text-text-secondary hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed">
    <ChevronLeft className="w-4 h-4 mr-sm" />
    Previous
  </button>

  <span className="text-caption text-text-muted">Page 3 of 12</span>

  <button className="inline-flex items-center px-lg py-sm text-body border border-border rounded-ds-md text-text-secondary hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Next
    <ChevronRight className="w-4 h-4 ml-sm" />
  </button>
</nav>
```

---

## Interaction Details

### Tab Keyboard Behavior

| Key | Action |
|-----|--------|
| `←` / `→` | Move focus to previous/next tab (underline, pill) |
| `↑` / `↓` | Move focus to previous/next tab (vertical) |
| `Home` | Move focus to first tab |
| `End` | Move focus to last tab |
| `Enter` / `Space` | Activate focused tab |
| `Tab` | Move focus out of tablist to tab panel |

Arrow keys wrap: pressing `→` on the last tab moves focus to the first tab.

### Pagination Keyboard Behavior

- Standard button tabbing — each page button is focusable
- `Enter` / `Space` activates the focused page button
- Disabled buttons are skipped by `aria-disabled` + `pointer-events-none`

---

## Design Decisions & Rationale

1. **No new tokens.** Both components use existing accent, border, spacing, and radius tokens. This keeps the token surface area small and follows the precedent set by all Phase 1 components.

2. **Thick underline (3px).** Chosen over 2px for stronger visual presence that matches the weight of the accent gold brand color.

3. **Accent pill over neutral pill.** Ties the pill variant to the brand identity rather than using a generic white raised pill.

4. **Rounded highlight for vertical tabs.** Modern, softer feel compared to left-border indicators. Consistent with the pill variant's rounded accent-muted approach.

5. **All-bordered pagination.** More structured feel that pairs naturally with bordered data tables — the primary context where full pagination is used.

6. **Buttons with page info for compact.** Provides context ("Page X of Y") that pure text links don't, without the complexity of numbered pages.

7. **Truncation at 7+ pages.** Balances information density with visual cleanliness. Window of 3 around the current page gives enough context for navigation.

8. **`aria-disabled` over `disabled` attribute** on pagination buttons. Screen readers can still announce the button exists and its state, rather than skipping it entirely.
