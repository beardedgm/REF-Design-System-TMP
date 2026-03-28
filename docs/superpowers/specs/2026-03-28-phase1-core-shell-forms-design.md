# Phase 1: Core Shell + Forms — Design Spec

**Date:** 2026-03-28
**Status:** Draft
**Scope:** Add navigation shells (sidebar + top nav), page layouts, form controls, toast notifications, and icon system guidance to the Signature Design System.

---

## 1. Context

The design system currently defines tokens (colors, typography, spacing, shadows) and basic component patterns (buttons, inputs, cards, badges, modals, tables). To build a functional SaaS app, we need the structural shell (navigation + layout) and the remaining form primitives. This is Phase 1 of a multi-phase expansion.

**Delivery model:** Copy-paste React + Tailwind patterns in STYLE_GUIDE.md. No npm package. Each app copies what it needs.

**Stack:** MERN + Tailwind CSS + Lucide React icons.

---

## 2. Sidebar Navigation

### Structure

- Fixed left sidebar, `240px` wide expanded, `64px` collapsed (icon-only)
- Background: `bg-bg-secondary` with `1px` right border (`border-border`)
- Three vertical zones: **Header**, **Nav Body** (scrollable), **Footer**

### Header

- App logo (icon or wordmark, max height `32px`) + app name in `text-label font-semibold`
- Collapse toggle button: Lucide `PanelLeftClose` / `PanelLeftOpen` icon, `20px`
- When collapsed: only logo icon visible, toggle moves to center
- Height: `56px`, bottom border `border-border`

### Nav Body

- Grouped with overline section labels (e.g., "MAIN", "WORKSPACE", "SETTINGS")
- Each nav item: Lucide icon (`20px`) + label (`text-label`) + optional trailing badge (count or dot)
- **Resting:** `text-text-secondary`, transparent background
- **Hover:** `bg-bg-elevated text-text-primary`, `transition-all duration-150`
- **Active:** `bg-accent-muted text-accent` with `2px` left border in `border-accent`
- **Item height:** `36px`, padding `px-md`, gap `gap-sm` between icon and label
- **Section gap:** `gap-xl` between groups, `gap-xs` between items within a group
- Vertically scrollable with hidden scrollbar if content overflows
- When collapsed: only icons visible, centered. Hovering an icon shows a tooltip with the label.

### Footer

- User avatar (`32px` circle, `rounded-full`) + name (`text-label font-medium`) + role/email (`text-caption text-text-tertiary`)
- Separated by top border `border-border`
- Clicking the avatar area opens a dropdown menu with: Profile, Settings, Theme toggle (dark/light), Logout
- When collapsed: only avatar visible, click opens same dropdown
- Height: `64px`

### Mobile Behavior (< 768px)

- Sidebar hidden by default
- Hamburger button (`Menu` icon, top-left of page) triggers an off-canvas drawer
- Drawer slides in from left with overlay backdrop (`bg-black/50`, `z-overlay`)
- Drawer is full sidebar at `280px` width
- Clicking overlay or any nav item closes the drawer
- Transition: `200ms ease` slide + fade

### Accessibility

- `<nav>` landmark with `aria-label="Main navigation"`
- Active item: `aria-current="page"`
- Collapse toggle: `aria-expanded` state, `aria-label="Collapse sidebar"` / `"Expand sidebar"`
- Skip link: `Skip to main content` link as first focusable element
- Tab order follows visual order top-to-bottom
- Mobile drawer: focus trapped inside when open, `Escape` closes it

---

## 3. Top Navigation

### Structure

- Full-width horizontal bar, height `56px`, fixed to top (`z-sticky`)
- Background: `bg-bg-secondary` with `1px` bottom border (`border-border`), `shadow-ds-sm`
- Three horizontal zones: **Left** (logo + nav links), **Center** (optional search), **Right** (actions)

### Left Zone

- App logo/icon (max `28px` height) + app name (`text-h3 font-semibold`)
- Primary nav links: horizontal, `gap-xs` between items
- Each link: `text-label font-medium`, padding `px-md py-sm`, `rounded-ds-sm`
- **Resting:** `text-text-secondary`
- **Hover:** `text-text-primary bg-bg-elevated`, `transition-all duration-150`
- **Active:** `text-accent` with `2px` bottom accent border (pseudo-element, not affecting layout height)
- Maximum ~6 links before it becomes crowded (use sidebar shell for more)

### Right Zone

- Action cluster: icon buttons (`32px` tap target, `44px` hit area via padding)
- Common items: Search toggle (`Search` icon), Notifications (`Bell` icon with optional red dot), Theme toggle (`Moon`/`Sun` icon), Avatar dropdown
- Each icon button: `text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-ds-sm p-sm`
- Avatar: `28px` circle, clicking opens same dropdown as sidebar footer
- Notification dot: `6px` circle, `bg-error`, absolute positioned top-right of bell icon

### Mobile Behavior (< 768px)

- Nav links collapse into hamburger menu (`Menu` icon, right side)
- Hamburger opens a full-width dropdown panel below the nav bar, `bg-bg-card`, `shadow-ds-md`
- Nav links stack vertically, full-width touch targets (`44px` min height)
- Right zone shrinks to: hamburger + avatar only
- Transition: panel slides down `200ms ease`

### When to Use

- Public-facing pages (landing, pricing, docs, blog)
- Simpler apps with <= 6 top-level routes
- For dashboards with 7+ routes, use the sidebar shell instead

### Accessibility

- `<nav>` landmark with `aria-label="Primary navigation"`
- Active link: `aria-current="page"`
- Mobile menu button: `aria-expanded`, `aria-controls` pointing to menu panel
- Notification badge: `aria-label="Notifications, 3 unread"` (dynamic count)
- All icon buttons have `aria-label` (no icon-only buttons without labels)

---

## 4. Page Shell Layouts

### Sidebar Shell

```
┌──────────┬─────────────────────────────────┐
│          │  Top Bar (breadcrumbs + actions) │
│ Sidebar  ├─────────────────────────────────┤
│ (240px)  │                                 │
│          │  Main Content (scrollable)      │
│          │  max-w: 1200px, centered        │
│          │  padding: space-3xl / space-xl  │
│          │                                 │
└──────────┴─────────────────────────────────┘
```

- Sidebar: fixed left, full viewport height
- Main area: `margin-left: 240px` (or `64px` when collapsed)
- Main area scrolls independently
- Transition on collapse: `200ms ease` on margin-left
- Mobile: sidebar becomes drawer, main area is full-width

### Top Nav Shell

```
┌─────────────────────────────────────────────┐
│  Top Nav (logo + links + actions)           │
├─────────────────────────────────────────────┤
│                                             │
│  Main Content (scrollable)                  │
│  max-w: 1200px, centered                   │
│  padding: space-3xl / space-xl             │
│                                             │
└─────────────────────────────────────────────┘
```

- Top nav: fixed top, full viewport width
- Main area: `padding-top: 56px` to offset fixed nav (no content overlap)
- Content centered, `max-w-6xl` (1152px) or `max-w-7xl` (1280px)

### Top Bar (In-Page Header)

Works with **both** shells. Sits at the top of the main content area.

- Full width of main content, height `auto`, padding `py-lg px-xl`
- Bottom border `border-border`
- **Left:** Breadcrumbs (if 3+ levels deep) + page title (`text-h1`)
- **Right:** Page-level action buttons (e.g., "Create New", "Export")
- Breadcrumbs: `text-caption text-text-tertiary`, separator `/` or `ChevronRight` icon, last item `text-text-primary`
- Page title below breadcrumbs, `gap-xs` between them
- Sticky behavior: optional. If sticky, `z-sticky` with `bg-bg-primary` to prevent content showing through

---

## 5. Form Controls

All form controls follow these shared rules:
- Visible `<label>` for every input (never placeholder-only)
- `focus-visible` ring: `border-accent ring-2 ring-accent-muted`
- Disabled: `opacity-40 cursor-not-allowed pointer-events-none`
- Error: `border-error` + error message below in `text-caption text-error`
- Transitions: `transition-all duration-150`
- Minimum touch target: `44px` height on mobile

### Toggle / Switch

- Track: `36px` wide, `20px` tall, `rounded-full`
- **Off:** track `bg-bg-elevated border border-border`, thumb `bg-text-muted`
- **On:** track `bg-accent`, thumb `#ffffff` (always white regardless of theme — provides contrast against gold)
- Thumb: `14px` circle, `2px` inset, translates `16px` right when on
- Transition: thumb `transform 200ms ease`, track `background 150ms ease`
- Label: to the right of the toggle, `text-body`, `gap-md`
- Optional description text below label in `text-caption text-text-tertiary`
- Keyboard: `Space` toggles, `focus-visible` ring on track
- Aria: `role="switch"`, `aria-checked`

### Checkbox

- Box: `16px` square, `rounded-ds-sm` (6px), `border border-border bg-bg-surface`
- **Checked:** `bg-accent border-accent`, white checkmark icon (`Check` from Lucide, `12px`, stroke-width 2.5)
- **Indeterminate:** `bg-accent border-accent`, white minus icon (`Minus`, `12px`)
- **Hover:** `border-border-hover`
- Label: to the right, `text-body`, `gap-sm`
- Group: vertical stack with `gap-md`, optional group label as overline above
- Keyboard: `Space` toggles
- Aria: native `<input type="checkbox">` with `aria-checked` (supports `"mixed"` for indeterminate)

### Radio Group

- Circle: `16px`, `rounded-full`, `border border-border bg-bg-surface`
- **Selected:** `border-accent` with inner filled circle `8px` in `bg-accent`
- **Hover:** `border-border-hover`
- Label: to the right, `text-body`, `gap-sm`
- Group: vertical stack with `gap-md`, group label as `text-label font-medium` above
- Horizontal variant: `flex-row gap-xl` for 2-4 options
- Keyboard: arrow keys navigate within group
- Aria: `role="radiogroup"` on container, native `<input type="radio">` with shared `name`

### Select Dropdown (Custom)

- Trigger: same styling as text input (`bg-bg-surface border-border rounded-ds-md px-md py-sm`)
- Chevron icon (`ChevronDown`, `16px`) on right, rotates `180deg` when open
- Placeholder: `text-text-muted`
- **Dropdown panel:** `bg-bg-card border border-border rounded-ds-md shadow-ds-md`, `z-dropdown`
- Max height: `240px`, scrollable
- Optional search input at top (pinned, doesn't scroll)
- Each option: `px-md py-sm text-body`, full-width
- **Hover:** `bg-bg-elevated`
- **Selected:** `text-accent` with `Check` icon on right
- **Multi-select variant:** checkboxes inside each option, selected items shown as pills in trigger
- Transition: dropdown appears with `opacity + translateY(-4px)` over `150ms ease`
- Keyboard: `Enter`/`Space` opens, arrows navigate, `Enter` selects, `Escape` closes
- Click outside closes
- Aria: `role="listbox"`, `aria-expanded`, options have `role="option"`, `aria-selected`

---

## 6. Toast / Notification System

### Structure

- Toasts stack in bottom-right corner (desktop) or bottom-center (mobile, full-width minus `space-lg` margin)
- Stacking direction: newest on top, `gap-sm` between toasts
- Container: `fixed bottom-xl right-xl z-modal`, `max-w-sm` (384px)

### Individual Toast

- Background: `bg-bg-card`, border `border-border`, `rounded-ds-md`, `shadow-ds-lg`
- Padding: `px-lg py-md`
- Layout: icon (left) + content (center, flex-grow) + close button (right)
- **Icon:** `20px` Lucide icon, color matches variant
  - Success: `CheckCircle` in `text-success`
  - Error: `XCircle` in `text-error`
  - Warning: `AlertTriangle` in `text-warning`
  - Info: `Info` in `text-status-2`
- **Content:** title (`text-label font-medium`) + optional description (`text-caption text-text-secondary`)
- **Close:** `X` icon button, `16px`, `text-text-muted hover:text-text-primary`

### Behavior

- Auto-dismiss: **5 seconds** default (configurable)
- Progress bar: optional `2px` bar at bottom showing time remaining, color matches variant
- Hover pauses auto-dismiss timer
- Max visible: 3 toasts. Additional toasts queue and appear as earlier ones dismiss
- Entrance: slide in from right + fade (`transform: translateX(100%) → 0`, `200ms ease`)
- Exit: fade + slide right (`150ms ease`) — exit faster than enter per UX guidelines
- Dismiss: click close button, or swipe right on mobile

### Accessibility

- Container: `aria-live="polite"`, `role="status"`
- Toasts don't steal focus
- Close button: `aria-label="Dismiss notification"`
- Screen readers announce toast content when it appears
- Keyboard: `Escape` dismisses the most recent toast if focused

---

## 7. Icon System

### Library

- **Lucide React** (`lucide-react` npm package)
- Consistent 24px grid, 2px stroke width, round line caps

### Sizing Convention

| Context | Size | Tailwind |
|---------|------|----------|
| Nav items, inline with text | `20px` | `w-5 h-5` |
| Buttons (inside) | `16px` | `w-4 h-4` |
| Card headers, feature icons | `24px` | `w-6 h-6` |
| Hero / empty state illustrations | `48px` | `w-12 h-12` |

### Color Rules

- Icons inherit text color via `currentColor` (default Lucide behavior)
- Nav icons: `text-text-secondary`, active: `text-accent`
- Semantic icons: match their semantic color (`text-error`, `text-success`, etc.)
- Never use a color that doesn't come from the design token system

### Usage Pattern

```jsx
import { Home, Settings, Bell } from 'lucide-react';

<Home className="w-5 h-5" />            {/* Nav icon */}
<Settings className="w-4 h-4" />        {/* Button icon */}
<Bell className="w-5 h-5 text-accent" /> {/* Highlighted */}
```

### Rules

- Always use Lucide icons. No emoji, no PNG/raster icons, no mixing icon libraries
- Every icon-only button must have an `aria-label`
- Prefer outline style (default Lucide). Filled variants only for "active" indicator states if needed
- Maintain consistent stroke width — don't mix Lucide with other icon sets that have different stroke weights

---

## 8. Files to Update

| File | Changes |
|------|---------|
| `STYLE_GUIDE.md` | Add sections: Sidebar Nav, Top Nav, Page Shells, Toggle, Checkbox, Radio, Select Dropdown, Toast System, Icon System |
| `index.html` | Add interactive demos for all new components |
| `CLAUDE.md` | Add nav shell guidance, form control rules, icon system rules, toast pattern |
| `tailwind.preset.js` | No token changes needed — all new components use existing tokens |
| `globals.css` | No changes needed — tokens already defined |

---

## 9. UX Validation Checklist

Derived from UI/UX Pro Max guidelines:

- [ ] All nav items have both icon and text label (no icon-only nav)
- [ ] Active nav state is visually highlighted (color + indicator)
- [ ] Fixed nav compensates with padding (no content overlap)
- [ ] Skip-to-main-content link present
- [ ] Tab order matches visual order throughout
- [ ] Mobile drawer: focus trapped, Escape closes, overlay dismisses
- [ ] All touch targets >= 44px
- [ ] All form inputs have visible labels (not placeholder-only)
- [ ] Error messages appear near the field, not just at top
- [ ] Disabled states use reduced opacity + cursor change + semantic attribute
- [ ] Toasts auto-dismiss 3-5s, don't steal focus, use `aria-live="polite"`
- [ ] Loading buttons disabled during async with spinner
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Z-index follows system scale (dropdown: 50, sticky: 100, overlay: 900, modal: 1000)
- [ ] Breadcrumbs used for 3+ level deep hierarchies
- [ ] Hover states have smooth transitions (150ms)
- [ ] Icon-only buttons always have `aria-label`
- [ ] SVG icons only (Lucide), no emoji as structural icons
- [ ] Consistent 8px spacing rhythm maintained
- [ ] Both dark and light themes tested for all new components
