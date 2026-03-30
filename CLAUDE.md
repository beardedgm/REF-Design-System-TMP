# Signature Design System

This repository is the single source of truth for all SaaS application styling. Every app in the portfolio uses these tokens, patterns, and principles to maintain a consistent visual identity.

## Tech Stack

- **Apps:** MERN (MongoDB, Express, React, Node.js)
- **Styling:** Tailwind CSS with this design system's preset, OR plain CSS with variables
- **Theming:** Light/dark via `data-theme` attribute + CSS custom properties
- **Foundation:** `globals.css` is the framework-agnostic base — works with or without Tailwind

## Repository Structure

| File | Purpose |
|------|---------|
| `globals.css` | **The foundation.** CSS custom properties (dark + light themes), typography variables, spacing, base reset. Works independently — no Tailwind required. Import into any app's root layout. |
| `tailwind.preset.js` | **Optional convenience layer.** Maps `globals.css` variables to Tailwind utility classes. Import into any app's `tailwind.config.js` via `presets: [require('./path/tailwind.preset.js')]`. |
| `STYLE_GUIDE.md` | Complete design spec — tokens, principles, component patterns in both Tailwind and plain CSS. The LLM-readable reference. |
| `index.html` | Interactive visual showcase. Open in browser to see all tokens and components rendered. Uses plain CSS (no Tailwind). |

## Critical Rules

### 1. Always Use Tokens — Never Hardcode

Every color, spacing, radius, and shadow must come from the design system. Never write a raw hex value in a component.

- **With Tailwind:** Use the custom utility names (`bg-bg-card`, `text-accent`, `rounded-ds-md`, `shadow-ds-lg`)
- **Without Tailwind:** Use CSS variables (`var(--bg-card)`, `var(--accent)`, `var(--radius-md)`, `var(--shadow-lg)`)
- **Either way:** `globals.css` must be imported — it defines all the variables both approaches rely on

### 2. Always Support Both Themes

Every component must work in both dark and light mode. Since all colors reference CSS variables, this happens automatically — but verify by toggling `data-theme` in the showcase.

### 3. Keep All Files in Sync

When modifying any design token, **update all four files:**
1. `globals.css` — the CSS custom properties (both dark and light values)
2. `tailwind.preset.js` — the Tailwind theme extension
3. `STYLE_GUIDE.md` — the human/LLM-readable documentation
4. `index.html` — the visual showcase

Missing any file will cause the system to drift out of sync.

### 4. Accent Gold Is the Brand

The warm gold accent (`#c9a267` dark / `#a8843e` light) is the signature. Use it for:
- Primary CTA buttons
- Active tab indicators
- Key links and interactive highlights
- Focus ring accents

Do NOT use it for decorative backgrounds, large surface areas, or body text. Overuse dilutes its impact.

### 5. Spacing Uses the 8-Point Grid

All spacing values: `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px), `2xl` (32px), `3xl` (48px). No arbitrary values.

### 6. Motion Is Restrained

- Interactive state transitions: `150ms ease`
- Elevation/transform transitions: `200ms ease`
- Page entrance animations: `400ms ease` max
- Respect `prefers-reduced-motion`
- No bounce, spring, or elastic easing

### 7. Accessibility Is Non-Negotiable

- `focus-visible` rings on all interactive elements (accent border + muted ring)
- Never use color alone to convey meaning
- Minimum 4.5:1 contrast ratio for text
- All inputs have associated labels

### 8. Icons Use Lucide React Only

- Use `lucide-react` for all icons — no emoji, no PNG, no mixing libraries
- Sizes: `w-5 h-5` (nav/inline), `w-4 h-4` (buttons), `w-6 h-6` (cards), `w-12 h-12` (hero)
- Icons inherit color via `currentColor` — use semantic text colors
- Every icon-only button must have `aria-label`

### 9. Navigation Shell Selection

- **Sidebar shell**: Dashboard apps with 7+ routes, grouped navigation, workspace-style apps
- **Top nav shell**: Public pages, marketing sites, simpler apps with ≤ 6 routes
- Sidebar: `240px` expanded, `64px` collapsed, `200ms ease` transitions
- Top nav: `56px` height, fixed to top with `z-sticky`
- Both shells use `<nav>` landmarks with `aria-label`, `aria-current="page"` on active items
- Mobile (< 768px): sidebar becomes off-canvas drawer, top nav links collapse to hamburger

### 10. Form Controls Have Visible Labels

- Every form input has a visible `<label>` — never rely on placeholder alone
- Toggle/Switch: `role="switch"`, `aria-checked`, `Space` to toggle
- Checkbox: native `<input type="checkbox">`, supports `aria-checked="mixed"`
- Radio: native `<input type="radio">` with shared `name`, arrow key navigation
- Select: `role="listbox"`, `aria-expanded`, `Escape` closes
- Error messages appear below the field in `text-caption text-error`

### 11. Toast Notifications Are Non-Blocking

- Container: `fixed bottom-xl right-xl z-modal`, `aria-live="polite"`, `role="status"`
- Max 3 visible, auto-dismiss 5 seconds, hover pauses timer
- Variants: success (`CheckCircle`), error (`XCircle`), warning (`AlertTriangle`), info (`Info`)
- Toasts never steal focus
- Exit animation faster than enter (150ms vs 200ms)

### 12. Tabs Use ARIA Tablist Pattern

- Container: `role="tablist"` with `aria-label`
- Each tab: `role="tab"`, `aria-selected`, `aria-controls` pointing to panel ID
- Each panel: `role="tabpanel"`, `aria-labelledby` pointing to tab ID
- Keyboard: arrow keys switch tabs, `Home`/`End` for first/last
- Three variants: underline (section switching), pill (view toggling), vertical (settings)
- Active indicator: `border-accent` underline or `bg-accent text-text-on-accent` pill

### 13. Avatars Always Have Fallbacks

- Image avatars: `rounded-full object-cover` with `alt="User Name"`
- Initials fallback: `bg-accent text-text-on-accent` circle with 1-2 letter initials
- Sizes: `xs` (24px), `sm` (32px), `md` (40px), `lg` (56px)
- Status dot: positioned `absolute bottom-0 right-0` with ring `ring-2 ring-bg-card`
- Avatar groups: `-space-x-2` overlap, `+N` overflow badge

### 14. Tooltips Are Accent-Tinted

- Background: `bg-tooltip-bg` (accent-tinted), border: `border-tooltip-border`
- Position: top/right/bottom/left with CSS arrow pointer
- Trigger: hover + `focus-visible`, `150ms` delay-in, `0ms` delay-out
- `role="tooltip"`, triggered element has `aria-describedby`
- Max width `240px`, `text-caption`, `z-dropdown`

### 15. Empty States and Error Pages Are Centered

- Empty states: centered icon (`w-12 h-12 text-text-muted`) + heading + description + optional CTA
- Error pages: full-screen centered, status code in `font-display text-display-1 text-accent`
- Variants: 404 (not found), 500 (server error), 503 (maintenance)
- CTA always present on error pages (user needs an escape route)

### 16. Command Palette Uses Combobox Pattern

- Trigger: `Cmd+K` / `Ctrl+K`, opens centered dialog with search input
- Panel: `role="dialog"`, `aria-modal="true"`, `max-width: 560px`, `bg-bg-card`, `shadow-ds-lg`
- Input: `role="combobox"`, `aria-expanded`, `aria-controls` pointing to listbox
- Results: `role="listbox"`, each item `role="option"`, `aria-selected` on active
- Keyboard: `Escape` closes, arrows navigate, `Enter` selects, focus trapped
- Footer shows keyboard hints in `text-caption text-text-muted`

### 17. Skeleton Loaders Match Content Layout

- Base: `bg-bg-elevated` with CSS shimmer animation (`1.5s ease-in-out infinite`)
- Shimmer highlight: `var(--shimmer-highlight)` (theme-aware)
- Three primitives: line (`h-4 rounded-ds-md`), circle (`rounded-full`), rect (`rounded-ds-md`)
- Compose primitives to match the layout of the content being loaded
- Respect `prefers-reduced-motion`: static fill, no animation
- Never show skeletons for more than 3 seconds — if loading takes longer, add a text hint

### 18. Data Viz Colors Use Status Sequence

- Chart palette: `--status-1` through `--status-5` + `--status-premium`, used in order
- Never use `--accent` for data series (reserved for UI)
- Single-metric charts (progress bars, gauges): `--accent` fill + `--bg-elevated` track
- Never use color alone — pair with labels or patterns
- Max 5-6 colors per chart

## How to Use in a New App

### With Tailwind (recommended for React apps)

```js
// tailwind.config.js
const designSystem = require('../path-to-design-system/tailwind.preset.js');

module.exports = {
  presets: [designSystem],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

```jsx
// App.jsx or root layout
import '../path-to-design-system/globals.css';
```

```html
<!-- index.html or root template -->
<html data-theme="light">
```

### Without Tailwind (plain CSS)

```html
<!-- Link globals.css in your HTML head or import in your bundler -->
<link rel="stylesheet" href="path-to-design-system/globals.css" />
```

```html
<!-- Set theme on root element -->
<html data-theme="light">
```

```css
/* Use CSS variables in your stylesheets */
.my-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
}
```

See `STYLE_GUIDE.md` Section 19 for full plain-CSS component examples and the Tailwind ↔ CSS Variable mapping table.

## Component Patterns

See `STYLE_GUIDE.md` for complete React + Tailwind component patterns including:
- Buttons (Primary, Default, Danger × 3 sizes)
- Text inputs with validation states
- Cards with hover elevation
- Badges and status indicators
- Modal dialogs
- Table rows with hover highlighting
- **Sidebar Navigation** (expanded/collapsed, section groups, mobile drawer)
- **Top Navigation** (horizontal bar, icon buttons, mobile hamburger)
- **Page Shell Layouts** (sidebar shell, top nav shell, top bar with breadcrumbs)
- **Toggle / Switch** (on/off with label + description)
- **Checkbox** (single + group, indeterminate state)
- **Radio Group** (vertical + horizontal variants)
- **Select Dropdown** (custom, with search, multi-select variant)
- **Toast Notifications** (success/error/warning/info, auto-dismiss, stacking)
- **Tabs** (underline, pill, vertical variants with ARIA tablist)
- **Pagination** (full numbered + compact prev/next)
- **Avatars** (image, initials fallback, status dots, group stacking)
- **Tooltips** (accent-tinted, 4 positions, arrow pointer)
- **Empty States** (centered icon + heading + CTA)
- **Error Pages** (404, 500, 503 full-page centered)
- **Command Palette** (Cmd+K modal, combobox search, keyboard navigation)
- **Skeleton Loaders** (line, circle, rect primitives with shimmer animation)
- **Data Viz Colors** (chart color sequence using status tokens)

## Quick Reference — Tailwind Class Naming

| Category | Pattern | Example |
|----------|---------|---------|
| Backgrounds | `bg-bg-{level}` | `bg-bg-card`, `bg-bg-elevated` |
| Text colors | `text-text-{level}` | `text-text-primary`, `text-text-muted` |
| Accent | `bg-accent`, `text-accent`, `border-accent` | `hover:bg-accent-hover` |
| Semantic | `text-{state}`, `border-{state}` | `text-error`, `border-success` |
| Borders | `border-border` | `hover:border-border-hover` |
| Radii | `rounded-ds-{size}` | `rounded-ds-md`, `rounded-ds-lg` |
| Shadows | `shadow-ds-{size}` | `shadow-ds-sm`, `shadow-ds-lg` |
| Spacing | `p-{size}`, `m-{size}`, `gap-{size}` | `p-xl`, `gap-lg`, `m-sm` |
| Font size | `text-{role}` | `text-h1`, `text-body`, `text-caption` |
| Z-index | `z-{level}` | `z-modal`, `z-dropdown` |
| Nav items | `sidebar-nav-item`, `topnav-link` | `hover:bg-bg-elevated`, `.active` |
| Form controls | `role="switch"`, `role="listbox"` | Toggle, checkbox, radio, select |
| Toasts | `aria-live="polite"` | Success, error, warning, info variants |
| Icons | `w-{size} h-{size}` from Lucide | `w-5 h-5` nav, `w-4 h-4` btn |
| Tabs | `role="tablist"`, `role="tab"` | `aria-selected`, arrow key nav |
| Pagination | `aria-label="Pagination"` | `aria-current="page"` on active |
| Avatars | `rounded-full object-cover` | `w-6`/`w-8`/`w-10`/`w-14` sizes |
| Tooltips | `role="tooltip"`, `bg-tooltip-bg` | `aria-describedby`, 4 positions |
| Command Palette | `role="dialog"`, `role="combobox"` | `aria-modal`, `Cmd+K` trigger |
| Skeletons | `bg-bg-elevated`, `animate-shimmer` | `--shimmer-highlight`, 3 primitives |
| Data Viz | `--status-1` through `--status-5` | Sequential chart palette |
