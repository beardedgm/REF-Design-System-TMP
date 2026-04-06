# Signature Design System

Single source of truth for all SaaS application styling. Every app in the portfolio uses these tokens, patterns, and principles to maintain a consistent visual identity. This document is consumed by AI agents building UIs -- every decision is explicit, no "use your judgment."

## Tech Stack

- **Apps:** MERN (MongoDB, Express, React, Node.js)
- **Styling:** Tailwind CSS with this design system's preset, OR plain CSS with variables
- **Theming:** Light/dark via `data-theme` attribute + CSS custom properties
- **Foundation:** `globals.css` is the framework-agnostic base -- works with or without Tailwind

## Repository Structure

| File | Purpose |
|------|---------|
| `globals.css` | **The foundation.** CSS custom properties (dark + light themes), typography variables, spacing, base reset, keyframe animations. Works independently -- no Tailwind required. Import into any app's root layout. |
| `tailwind.preset.js` | **Optional convenience layer.** Maps `globals.css` variables to Tailwind utility classes. Import into any app's `tailwind.config.js` via `presets: [require('./path/tailwind.preset.js')]`. |
| `STYLE_GUIDE.md` | Complete design spec -- tokens, principles, 52 component patterns in both Tailwind and plain CSS. The LLM-readable reference. |
| `index.html` | Interactive visual showcase. Open in browser to see all tokens and components rendered. Uses plain CSS (no Tailwind). |

---

## Critical Rules

### 1. Always Use Tokens -- Never Hardcode

Every color, spacing, radius, and shadow must come from the design system. Never write a raw hex value, pixel value, or arbitrary number in a component.

- **With Tailwind:** Use the custom utility names (`bg-bg-card`, `text-accent`, `rounded-ds-md`, `shadow-ds-lg`, `p-xl`, `gap-lg`)
- **Without Tailwind:** Use CSS variables (`var(--bg-card)`, `var(--accent)`, `var(--radius-md)`, `var(--shadow-lg)`, `var(--space-xl)`)
- **Either way:** `globals.css` must be imported -- it defines all the variables both approaches rely on

**Do:**
```jsx
<div className="bg-bg-card border border-border rounded-ds-lg p-xl shadow-ds-sm">
```
```css
.my-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-xl); box-shadow: var(--shadow-sm); }
```

**Don't:**
```jsx
<div className="bg-[#1a1b24] border border-[#1f2029] rounded-[12px] p-[24px]">
```

### 2. Always Support Both Themes

Every component must work in both dark and light mode. Since all colors reference CSS variables that change per theme, this happens automatically -- but verify by toggling `data-theme` on the `<html>` element. Dark is the default/preferred mode.

Never assume a specific theme. Never use colors that only make sense in one theme.

### 3. Keep All Files in Sync

When modifying any design token, **update all five files:**

1. `globals.css` -- the CSS custom properties (both dark and light values)
2. `tailwind.preset.js` -- the Tailwind theme extension
3. `STYLE_GUIDE.md` -- the human/LLM-readable documentation
4. `CLAUDE.md` -- this rules document
5. `index.html` -- the visual showcase

Missing any file will cause the system to drift out of sync.

### 4. Accent Gold Is the Brand

The warm gold accent (`#c9a267` dark / `#a8843e` light) is the signature. It evokes treasure, legendary items, firelight -- without being explicitly "fantasy."

**Use for:**
- Primary CTA buttons
- Active tab/nav indicators
- Key links and interactive highlights
- Focus ring accents
- Brand marks and logos
- Single-metric chart fills (progress bars, gauges)

**Never use for:**
- Decorative backgrounds
- Large surface areas
- Body text
- Data series in multi-color charts (use `--status-N` instead)

Overuse dilutes its impact.

### 5. Spacing Uses the 8-Point Grid

All spacing values follow a strict token scale. No arbitrary values.

| Token | Value | Tailwind |
|-------|-------|----------|
| `--space-2xs` | 2px | `p-2xs`, `m-2xs`, `gap-2xs` |
| `--space-xs` | 4px | `p-xs`, `m-xs`, `gap-xs` |
| `--space-sm` | 8px | `p-sm`, `m-sm`, `gap-sm` |
| `--space-md` | 12px | `p-md`, `m-md`, `gap-md` |
| `--space-lg` | 16px | `p-lg`, `m-lg`, `gap-lg` |
| `--space-xl` | 24px | `p-xl`, `m-xl`, `gap-xl` |
| `--space-2xl` | 32px | `p-2xl`, `m-2xl`, `gap-2xl` |
| `--space-3xl` | 48px | `p-3xl`, `m-3xl`, `gap-3xl` |
| `--space-4xl` | 64px | `p-4xl`, `m-4xl`, `gap-4xl` |

Every margin, padding, and gap must use a token. No `p-[13px]` or `gap-[20px]`.

### 6. Motion Is Restrained

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| `--duration-micro` | 150ms | ease | Hover, focus, toggle states |
| `--duration-standard` | 200ms | ease | Elevation, transform, collapse |
| `--duration-emphasis` | 300ms | ease | Drawer open/close, accordion |
| `--duration-entrance` | 400ms | ease | Page entrance, modal appear |

**Keyframe animations defined in globals.css:**
- `fade-in-up`: opacity 0 to 1, translateY 8px to 0 at `--duration-entrance`
- `shimmer`: horizontal gradient sweep at 1.5s ease-in-out infinite
- `slide-in-right`: translateX 100% to 0 at `--duration-emphasis`
- `slide-in-left`: translateX -100% to 0 at `--duration-emphasis`
- `scale-in`: scale 0.95 to 1, opacity 0 to 1 at `--duration-standard`

**Rules:**
- No bounce, spring, or elastic easing anywhere
- Exit animations faster than enter (150ms vs 200ms for toasts, 200ms vs 300ms for drawers)
- Respect `prefers-reduced-motion: reduce` -- disable all animations, use instant state changes

### 7. Accessibility Is Non-Negotiable

These apply to ALL components without exception:

1. **Focus visible:** `outline: 2px solid var(--accent)`, `outline-offset: 2px` on all interactive elements via `:focus-visible`
2. **Color contrast:** Minimum 4.5:1 for normal text, 3:1 for large text (>= 18px or >= 14px bold)
3. **Color independence:** Never convey meaning through color alone -- pair with icons, text, or patterns
4. **Keyboard navigation:** Every interactive element reachable and operable via keyboard
5. **ARIA landmarks:** `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>` used correctly
6. **Labels:** Every form input has a visible `<label>` -- never placeholder-only
7. **Reduced motion:** `prefers-reduced-motion: reduce` disables all animations
8. **Screen reader:** All dynamic content changes announced via `aria-live` regions
9. **Touch targets:** Minimum 44x44px on mobile

### 8. Icons Use Lucide React Only

- Use `lucide-react` for all icons -- no emoji, no PNG, no mixing icon libraries
- Sizes: `w-4 h-4` (buttons, inline), `w-5 h-5` (nav items, form icons), `w-6 h-6` (cards, empty states), `w-12 h-12` (hero, empty state primary icon)
- Icons inherit color via `currentColor` -- apply semantic text color classes to parent or icon element
- Every icon-only button must have `aria-label`
- Prefer meaning over decoration -- every icon should communicate something

### 9. Cinzel Is Marketing-Only

Two contexts, two type treatments:

| Context | Display Font | UI Font | Where Used |
|---------|-------------|---------|------------|
| **Marketing** | Cinzel (700) | Inter | Landing pages, hero sections, pricing pages, email headers, error page status codes |
| **Product** | Inter (600) | Inter (400, 500) | App shell, dashboards, forms, tables, all UI |

Cinzel is loaded only in marketing contexts. Product apps load Inter only, reducing bundle size. Never use Cinzel in product UI (dashboards, settings, forms). Never use it for body text, labels, or captions.

### 10. Warm Light, Cool Dark

The system uses asymmetric undertones across themes:

- **Dark mode:** Cool blue-black undertone (`#0c0d12` page background). Professional, high-contrast. The gold accent pops sharply against cool tones.
- **Light mode:** Warm cream/parchment undertone (`#f5f3ef` page background). Softer, inviting. The gold feels naturally at home.

Shadows are warm-tinted in light mode (`rgba(80,60,20,...)`) to match the parchment undertone. Dark mode shadows use pure black (`rgba(0,0,0,...)`).

Toggling themes should feel like turning a coin, not flipping a switch. Each mode has its own character, connected by the gold accent thread.

### 11. Navigation Shell Selection

Choose the shell based on app complexity:

| Shell | When to Use | Specs |
|-------|-------------|-------|
| **Sidebar** | Dashboard apps with 7+ routes, grouped navigation, workspace-style apps | Expanded: 240px, Collapsed: 64px (icons only), `200ms ease` transition |
| **Top nav** | Public pages, marketing sites, simpler apps with 6 or fewer routes | Height: 56px, fixed to top with `z-sticky` |

**Both shells must have:**
- `<nav>` landmarks with `aria-label="Main navigation"`
- `aria-current="page"` on active items
- Mobile (< 768px): sidebar becomes off-canvas drawer from left; top nav links collapse to hamburger menu

**Sidebar specifics:**
- Background: `bg-bg-secondary`, full-height, fixed left
- Section group labels: `text-overline text-tertiary`
- Active item: `bg-accent-muted text-accent border-l-2 border-accent`
- Collapse toggle button at bottom

**Top nav specifics:**
- Background: `bg-bg-card`, `border-bottom`, `z-sticky`
- Active link: `text-accent border-b-2 border-accent`
- Layout: logo left, nav links center or left, actions right

### 12. Form Controls Have Visible Labels

Every form input has a visible `<label>` -- never rely on placeholder alone.

| Control | Key ARIA | Keyboard |
|---------|----------|----------|
| Toggle/Switch | `role="switch"`, `aria-checked` | `Space` toggles |
| Checkbox | native `<input type="checkbox">`, `aria-checked="mixed"` for indeterminate | `Space` toggles |
| Radio | native `<input type="radio">`, shared `name` attribute | Arrow keys move selection, `Tab` exits group |
| Select | `role="combobox"`, `aria-expanded`, `role="listbox"` on dropdown | Arrows navigate, `Enter` selects, `Escape` closes |

- Error messages appear below the field in `text-caption text-error`
- Required indicator: `*` in `text-error` after label text
- Help text below label in `text-caption text-tertiary`
- Spacing: `space-sm` between label and input, `space-xs` between input and help/error, `space-xl` between form groups

### 13. Toast Notifications Are Non-Blocking

- Container: `fixed bottom-xl right-xl z-toast`, `aria-live="polite"`, `role="status"`
- Max 3 visible, stacked with `space-sm` gap
- Auto-dismiss: 5 seconds, hover pauses timer
- Variants: success (`CheckCircle`), error (`XCircle`), warning (`AlertTriangle`), info (`Info`) -- all from Lucide
- Enter: `fade-in-up` 200ms. Exit: `fade-out-down` 150ms. (Exit faster than enter.)
- Close button on each toast
- Toasts never steal focus

### 14. Tabs Use ARIA Tablist Pattern

- Container: `role="tablist"` with `aria-label`
- Each tab: `role="tab"`, `aria-selected`, `aria-controls` pointing to panel ID
- Each panel: `role="tabpanel"`, `aria-labelledby` pointing to tab ID
- Keyboard: arrow keys switch tabs, `Home`/`End` for first/last

**Three variants:**
1. **Underline** -- bottom border indicator, for section switching. Active: `border-accent`
2. **Pill** -- filled indicator, for view toggling. Active: `bg-accent text-text-on-accent`
3. **Vertical** -- left-side list, for settings/preferences

### 15. Avatars Always Have Fallbacks

- Image avatars: `rounded-full object-cover` with `alt="User Name"`
- Initials fallback: `bg-accent text-text-on-accent` circle with 1-2 letter initials
- Sizes: xs (24px / `w-6`), sm (32px / `w-8`), md (40px / `w-10`), lg (56px / `w-14`)
- Status dot: positioned `absolute bottom-0 right-0` with ring `ring-2 ring-bg-card`
  - Online: `bg-success`, Away: `bg-warning`, Offline: `bg-text-muted`, Busy: `bg-error`
- Avatar groups: `-space-x-2` overlap, `+N` overflow badge

### 16. Tooltips Are Accent-Tinted

- Background: `bg-tooltip-bg` (accent-tinted dark surface), border: `border-tooltip-border`
- Text: `text-tooltip-text`, `text-caption`
- Position: top (default), right, bottom, left -- with CSS arrow pointer
- Trigger: hover + `focus-visible`, `150ms` delay-in, `0ms` delay-out
- `role="tooltip"`, triggered element has `aria-describedby`
- Max width: 240px, z-index: `z-dropdown`
- Never contain interactive elements -- use Popover instead

### 17. Empty States and Error Pages Are Centered

**Empty states:**
- Centered: icon (`w-12 h-12 text-text-muted`) + heading (`text-h3`) + description (`text-text-secondary`) + optional CTA button
- Icon from Lucide, contextually appropriate
- CTA: primary button for the most logical next action

**Error pages:**
- Full-screen centered vertically and horizontally
- Status code: `font-display text-display-1 text-accent` (Cinzel -- this is a brand moment)
- Heading: `text-h2`
- Description: `text-body text-text-secondary`
- CTA always present (user needs an escape route): "Go Home", "Try Again", etc.
- Variants: 404 (not found), 500 (server error), 503 (maintenance)

### 18. Command Palette Uses Combobox Pattern

- Trigger: `Cmd+K` / `Ctrl+K`, global keyboard listener
- Panel: `role="dialog"`, `aria-modal="true"`, centered, `max-width: 560px`, `bg-bg-card`, `shadow-ds-lg`
- Input: `role="combobox"`, `aria-expanded`, `aria-controls` pointing to listbox
- Results: `role="listbox"`, each item `role="option"`, `aria-selected` on active
- Keyboard: `Escape` closes, arrows navigate, `Enter` selects, focus trapped
- Footer shows keyboard hints in `text-caption text-text-muted`
- Results grouped by category with group headers

### 19. Skeleton Loaders Match Content Layout

- Three primitives: line (`h-4 rounded-ds-md`), circle (`rounded-full`), rect (`rounded-ds-md`)
- Base color: `bg-bg-elevated`
- Shimmer animation: horizontal gradient sweep using `var(--shimmer-highlight)`, `1.5s ease-in-out infinite`
- Compose primitives to match the layout of the content being loaded
- Respect `prefers-reduced-motion: reduce` -- static fill, no animation
- Never show skeletons for more than 3 seconds -- if loading takes longer, add a `text-caption text-text-tertiary` hint below

### 20. Data Viz Colors Use Status Sequence

- Chart palette used in order: `--status-1` (green/positive), `--status-2` (blue/info), `--status-3` (yellow/caution), `--status-4` (purple/misc), `--status-5` (red/critical), `--status-premium` (gold/featured)
- Never use `--accent` for data series in multi-color charts -- it is reserved for UI interactions
- Single-metric charts (progress bars, gauges): `--accent` fill + `--bg-elevated` track
- Never use color alone -- pair with labels, legends, or patterns
- Max 5-6 colors per chart

### 21. Drawers Slide From Edge

- Directions: right (default), left
- Widths: sm (320px), md (400px), lg (560px), full (100% -- mobile)
- `role="dialog"`, `aria-modal="true"`
- Backdrop: `bg-overlay`
- Focus trapped inside, `Escape` closes, return focus to trigger on close
- Enter: `slide-in-right` 300ms (`--duration-emphasis`). Exit: reverse 200ms (`--duration-standard`).
- Use for: detail panels, settings, mobile navigation, forms

### 22. Dropdown Menus Use Menu Role

- Trigger: button with `aria-haspopup="menu"`, `aria-expanded`
- Menu: `role="menu"`, items `role="menuitem"`
- Positioned below trigger, auto-flips if near viewport edge
- Items: icon (optional, left) + label + shortcut hint (optional, right-aligned, `text-text-tertiary`)
- Dividers between groups
- Keyboard: arrows navigate, `Enter` selects, `Escape` closes
- Nested submenu: arrow right opens, arrow left closes

### 23. Alerts Are Inline, Toasts Are Floating

These are different patterns. Do not confuse them.

| Pattern | Position | Persistence | Use |
|---------|----------|-------------|-----|
| **Alert/Banner** | Inline, within content flow | Persistent until dismissed | Form validation summary, page-level warnings, system announcements |
| **Toast** | Fixed `bottom-right`, floating | Auto-dismiss 5 seconds | Action confirmations, background process results |

- Alerts: `role="alert"` for errors/warnings, `role="status"` for info/success. Full-width in content flow. Variants: `bg-info-muted border-info`, `bg-warning-muted border-warning`, `bg-error-muted border-error`, `bg-success-muted border-success`.
- Toasts: `aria-live="polite"`, `role="status"`. Fixed positioned, stacked. See Rule 13.

### 24. Confirmation Dialogs Focus Cancel

- Extends Modal pattern with `role="alertdialog"`, `aria-describedby` on description
- Icon: `AlertTriangle` or similar warning icon
- Two buttons: Cancel (default/ghost variant) + Confirm (danger variant)
- **Initial focus goes to Cancel, not the destructive action**
- Focus trapped inside, `Escape` cancels (same as clicking Cancel)
- Keyboard: `Enter` activates the focused button, `Escape` cancels

### 25. Progress Bars Use Accent Fill

- Single-metric (one bar): fill with `--accent`, track with `--bg-elevated`
- Multi-metric (segmented or stacked): fill with `--status-1` through `--status-5` in order, track with `--bg-elevated`
- Linear: horizontal bar with fill, optional percentage label
- Ring/Circle: SVG-based circular progress
- Indeterminate: animated stripe pattern
- Always pair with a text label describing what is being measured

---

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
<html data-theme="dark">
```

### Without Tailwind (plain CSS)

```html
<!-- Link globals.css in your HTML head or import in your bundler -->
<link rel="stylesheet" href="path-to-design-system/globals.css" />
```

```html
<!-- Set theme on root element -->
<html data-theme="dark">
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

.my-button {
  background: var(--accent);
  color: var(--text-on-accent);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-lg);
  transition: background var(--duration-micro) var(--ease-default);
}
.my-button:hover {
  background: var(--accent-hover);
}
.my-button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

See the "Using Without Tailwind (Plain CSS)" section in `STYLE_GUIDE.md` for full plain-CSS component examples and the Tailwind-to-CSS Variable mapping table.

---

## Component Patterns

See `STYLE_GUIDE.md` for complete specs (anatomy, variants, states, accessibility, Tailwind JSX, plain CSS, do/don't) for all 52 patterns:

### Inputs & Forms (14)
1. Text Input
2. Textarea
3. Search Input
4. Select Dropdown
5. Combobox / Autocomplete
6. Checkbox
7. Radio Group
8. Toggle / Switch
9. Date Picker
10. Slider / Range
11. File Upload / Dropzone
12. Tag Input / Multi-value
13. Color Picker
14. Form Layout

### Buttons & Actions (3)
15. Button (primary, default, ghost, danger x 3 sizes)
16. Button Group
17. Floating Action Button

### Data Display (10)
18. Card (basic, interactive, compact, stat/KPI)
19. Badge / Tag
20. Data Table
21. Description List
22. Accordion / Collapsible
23. Activity Feed / Timeline
24. Progress Bar
25. Stat Card / KPI
26. Avatar
27. Code Block / KBD

### Navigation (8)
28. Sidebar Navigation
29. Top Navigation
30. Breadcrumbs
31. Tabs (underline, pill, vertical)
32. Pagination (full numbered, compact)
33. Stepper / Wizard
34. Segmented Control
35. Sticky Section Header

### Feedback & Status (7)
36. Toast / Notification
37. Alert / Banner
38. Callout / Admonition
39. Confirmation Dialog
40. Skeleton Loader
41. Progress / Loading Bar
42. Empty State

### Overlays (5)
43. Modal / Dialog
44. Drawer / Slide-over
45. Dropdown Menu
46. Popover
47. Tooltip

### Layout (4)
48. Page Shell -- Sidebar
49. Page Shell -- Top Nav
50. Divider / Separator
51. Bottom Sheet (Mobile)

### Marketing & Utility (3)
52. Command Palette
53. Pricing Table
54. Error Pages (404, 500, 503)

---

## Verification

Quick checks to confirm the design system is working:

```bash
# Verify Tailwind preset loads without errors
node -e "require('./tailwind.preset.js'); console.log('Preset OK')"

# Open the showcase in default browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

In the showcase, verify:
- Toggle between dark and light themes (top-right button)
- All color swatches update correctly
- Interactive elements work (tabs, accordion, modal, toasts)

### .gitignore

Add these to your app's `.gitignore` if not already present:

```
.superpowers/
.claude/
.remember/
```

---

## Quick Reference -- Tailwind Class Naming

| Category | Pattern | Example |
|----------|---------|---------|
| Backgrounds | `bg-bg-{level}` | `bg-bg-card`, `bg-bg-elevated`, `bg-bg-surface`, `bg-bg-primary`, `bg-bg-secondary` |
| Text colors | `text-text-{level}` | `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `text-text-muted` |
| Text on accent | `text-text-on-accent` | Text on gold backgrounds |
| Accent | `bg-accent`, `text-accent`, `border-accent` | `hover:bg-accent-hover`, `bg-accent-muted`, `bg-accent-subtle` |
| Semantic | `text-{state}`, `bg-{state}`, `border-{state}` | `text-error`, `bg-success-muted`, `border-warning` |
| Borders | `border-border` | `hover:border-border-hover`, `focus:border-border-focus` |
| Radii | `rounded-ds-{size}` | `rounded-ds-sm`, `rounded-ds-md`, `rounded-ds-lg`, `rounded-ds-xl`, `rounded-ds-full` |
| Shadows | `shadow-ds-{size}` | `shadow-ds-sm`, `shadow-ds-md`, `shadow-ds-lg` |
| Spacing | `p-{size}`, `m-{size}`, `gap-{size}` | `p-xl`, `gap-lg`, `m-sm`, `p-2xs`, `gap-4xl` |
| Font size | `text-{role}` | `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-caption`, `text-overline`, `text-display-1` |
| Font family | `font-sans`, `font-display` | `font-display` for Cinzel (marketing only) |
| Z-index | `z-{level}` | `z-dropdown`, `z-sticky`, `z-drawer`, `z-overlay`, `z-modal`, `z-toast` |
| Nav items | Active sidebar item | `bg-accent-muted text-accent border-l-2 border-accent` |
| Nav items | Active top nav link | `text-accent border-b-2 border-accent` |
| Form controls | Toggle | `role="switch"`, `aria-checked` |
| Form controls | Select | `role="combobox"`, `role="listbox"` |
| Toasts | Container | `fixed bottom-xl right-xl z-toast`, `aria-live="polite"` |
| Icons | Sizes | `w-4 h-4` (btn), `w-5 h-5` (nav), `w-6 h-6` (card), `w-12 h-12` (hero) |
| Tabs | Container + items | `role="tablist"`, `role="tab"`, `aria-selected`, arrow key nav |
| Pagination | Container | `aria-label="Pagination"`, `aria-current="page"` on active |
| Avatars | Image | `rounded-full object-cover`, sizes `w-6`/`w-8`/`w-10`/`w-14` |
| Tooltips | Container | `role="tooltip"`, `bg-tooltip-bg`, `border-tooltip-border`, `aria-describedby` |
| Command Palette | Dialog + input | `role="dialog"`, `role="combobox"`, `aria-modal="true"`, `Cmd+K` trigger |
| Skeletons | Primitives | `bg-bg-elevated`, `animate-shimmer`, `--shimmer-highlight` |
| Data Viz | Chart colors | `--status-1` through `--status-5`, `--status-premium` |
| Drawers | Container | `role="dialog"`, `aria-modal="true"`, `slide-in-right` |
| Dropdowns | Menu | `role="menu"`, `role="menuitem"`, `aria-haspopup="menu"` |
| Alerts | Inline | `role="alert"`, `bg-error-muted border-error` |
| Confirmation | Dialog | `role="alertdialog"`, focus on Cancel |
| Progress | Bar | `--accent` fill, `--bg-elevated` track |
| Overlay | Backdrop | `bg-bg-overlay`, `z-overlay` |
