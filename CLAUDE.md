# Signature Design System

This repository is the single source of truth for all SaaS application styling. Every app in the portfolio uses these tokens, patterns, and principles to maintain a consistent visual identity.

## Tech Stack

- **Apps:** MERN (MongoDB, Express, React, Node.js)
- **Styling:** Tailwind CSS with this design system's preset
- **Theming:** Dark/light via `data-theme` attribute + CSS custom properties

## Repository Structure

| File | Purpose |
|------|---------|
| `STYLE_GUIDE.md` | Complete design spec — tokens, principles, component patterns, Tailwind classes. The LLM-readable reference. |
| `tailwind.preset.js` | Tailwind theme preset. Import into any app's `tailwind.config.js` via `presets: [require('./path/tailwind.preset.js')]`. |
| `globals.css` | CSS custom properties (dark + light themes) + base reset. Import into root layout. |
| `index.html` | Interactive visual showcase. Open in browser to see all tokens and components rendered. |

## Critical Rules

### 1. Always Use Tokens — Never Hardcode

Every color, spacing, radius, and shadow must come from the design system. In Tailwind classes, use the custom utility names (`bg-bg-card`, `text-accent`, `rounded-ds-md`, `shadow-ds-lg`). In raw CSS, use `var(--token-name)`. Never write a raw hex value in a component.

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

## How to Use in a New App

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
<html data-theme="dark">
```

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
