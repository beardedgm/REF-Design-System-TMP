# Signature Design System — Style Guide

The single source of truth for all SaaS applications. This document defines the visual language, design tokens, component patterns, and implementation rules for a MERN stack with Tailwind CSS.

**Companion files:**
- `tailwind.preset.js` — Tailwind theme preset (import into any app)
- `globals.css` — CSS custom properties + base styles (import into root layout)
- `index.html` — Interactive visual showcase

---

## 1. Design Philosophy

These principles guide every decision. When in doubt, refer back here.

### Core Tenets

1. **Dark-First, Light-Ready.** The default canvas is deep navy/charcoal. Every application must support both dark and light themes. All color references use CSS variables — never raw hex values in components.

2. **Consistency Over Novelty.** Every app should feel like it belongs to the same family. Use the tokens. Follow the patterns. Resist the urge to "improve" a component for one app — if it needs to change, change it in the design system for all apps.

3. **Warm Gold as the Signature.** The accent color (`--accent` / `#c9a267`) is the brand thread that ties everything together. It's used for primary CTAs, active states, and key interactive elements. Don't dilute it by overusing it on decorative elements.

4. **Density Over Sprawl.** Prefer compact, information-rich layouts. Use the 8-point spacing grid. Padding `1.25rem 1.5rem` for cards, `0.5rem 1rem` for buttons. Don't waste vertical space with excessive margins.

5. **Accessibility Is Non-Negotiable.** Every interactive element has a visible focus ring. Motion respects `prefers-reduced-motion`. Color is never the only indicator of state. Minimum 4.5:1 contrast ratio for text.

6. **Restrained Motion.** Animations are `150ms`–`200ms` ease transitions. They guide attention, not perform. No bouncing, no spring physics, no delays over 250ms. If removing an animation wouldn't hurt usability, remove it.

7. **Systematic Scaling.** Spacing, sizing, and elevation use predictable scales. The 8-point grid (`4, 8, 12, 16, 24, 32, 48px`) governs all layout decisions. No magic numbers.

### Do's and Don'ts

| Do | Don't |
|----|-------|
| Use `var(--token)` for all colors | Hardcode hex values in components |
| Use the spacing scale (`space-xs` through `space-3xl`) | Use arbitrary pixel values like `13px` or `37px` |
| Support both dark and light themes | Build dark-only or light-only components |
| Use `focus-visible` for keyboard focus rings | Use `focus` (shows ring on mouse click too) |
| Keep animations under 200ms | Add decorative animations or spring physics |
| Use the accent gold for primary actions | Use accent on every element (dilutes it) |
| Let the design system handle consistency | "Customize" per-app styling |

---

## 2. Design Tokens

### Color Palette — Dark Theme (Default)

**Backgrounds (Deepest → Lightest)**

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `--bg-primary` | `#0c0d12` | `bg-bg-primary` | App background, deepest canvas |
| `--bg-secondary` | `#12131a` | `bg-bg-secondary` | Alternating sections, secondary navs |
| `--bg-surface` | `#161720` | `bg-bg-surface` | Input fields, inner surfaces |
| `--bg-card` | `#1a1b24` | `bg-bg-card` | Cards, modals, panels |
| `--bg-elevated` | `#22232e` | `bg-bg-elevated` | Hover states, popovers, skeletons |

**Text Hierarchy**

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `--text-primary` | `#e8e8ec` | `text-text-primary` | Headings, body text |
| `--text-secondary` | `#8e8fa1` | `text-text-secondary` | Labels, descriptions, subtitles |
| `--text-tertiary` | `#8b8c9e` | `text-text-tertiary` | Metadata, counters |
| `--text-muted` | `#838495` | `text-text-muted` | Hints, placeholders, disabled |
| `--text-on-accent` | `#0c0d12` | `text-text-on-accent` | Dark text on gold backgrounds |

**Signature Accent**

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `--accent` | `#c9a267` | `bg-accent`, `text-accent`, `border-accent` | Primary buttons, active tabs, links |
| `--accent-hover` | `#dbb57e` | `hover:bg-accent-hover` | Hover state for accent elements |
| `--accent-muted` | `rgba(201,162,103,0.12)` | `bg-accent-muted` | Chip backgrounds, focus ring spreads |

**Semantic States**

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `--error` | `#e5484d` | `text-error`, `border-error` | Destructive actions, validation errors |
| `--success` | `#30a46c` | `text-success`, `border-success` | Success states, positive trends |
| `--warning` | `#f5a623` | `text-warning`, `border-warning` | Warning states, usage alerts |
| `--warning-muted` | `#e8a838` | `text-warning-muted` | Non-critical warnings |

**Status Sequence (Charts, Badges, Levels)**

| Token | Hex | Name |
|-------|-----|------|
| `--status-1` | `#30a46c` | Green |
| `--status-2` | `#3498db` | Blue |
| `--status-3` | `#d4873f` | Amber |
| `--status-4` | `#bb7fe2` | Purple |
| `--status-5` | `#e5484d` | Red |
| `--status-premium` | `#FFD700` | Gold |

**Borders**

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `--border` | `#1f2029` | `border-border` | Default borders |
| `--border-hover` | `#2e2f3d` | `hover:border-border-hover` | Interactive hover states |

---

### Color Palette — Light Theme

Applied via `data-theme="light"` on `<html>`. Same CSS variable names, different values.

**Backgrounds**

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#f4f4f6` | App background |
| `--bg-secondary` | `#eaeaee` | Alternating sections |
| `--bg-surface` | `#ffffff` | Input fields, surfaces |
| `--bg-card` | `#ffffff` | Cards, modals |
| `--bg-elevated` | `#f0f0f4` | Hover states, popovers |

**Text**

| Token | Hex |
|-------|-----|
| `--text-primary` | `#1a1b24` |
| `--text-secondary` | `#5c5d6e` |
| `--text-tertiary` | `#72738a` |
| `--text-muted` | `#9394a5` |
| `--text-on-accent` | `#ffffff` |

**Accent (Deepened for light contrast)**

| Token | Hex |
|-------|-----|
| `--accent` | `#a8843e` |
| `--accent-hover` | `#c9a267` |
| `--accent-muted` | `rgba(168,132,62,0.10)` |

**Semantic (Darkened for readability)**

| Token | Hex |
|-------|-----|
| `--error` | `#cd2b31` |
| `--success` | `#218358` |
| `--warning` | `#c47d0a` |
| `--warning-muted` | `#d49a2e` |

**Status (Darkened)**

| Token | Hex |
|-------|-----|
| `--status-1` | `#218358` |
| `--status-2` | `#2271a1` |
| `--status-3` | `#a86520` |
| `--status-4` | `#8b4fc0` |
| `--status-5` | `#cd2b31` |
| `--status-premium` | `#9a7800` |

**Borders**

| Token | Hex |
|-------|-----|
| `--border` | `#d8d9e0` |
| `--border-hover` | `#bcbdc8` |

**Shadows (Softer)**

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.06)` |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.08)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` |

---

### Theme Switching

Apply themes with the `data-theme` attribute:

```html
<html data-theme="dark">
```

Toggle in React:

```jsx
const [theme, setTheme] = useState(() => localStorage.getItem('ds-theme') || 'dark');

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ds-theme', theme);
}, [theme]);
```

**Rule:** Components never reference theme directly. They use `var(--token)` or Tailwind classes that resolve to CSS variables. The theme switch at the root automatically propagates.

---

### Typography System

**Font Stacks**
- **UI (Default):** `'Inter', -apple-system, sans-serif` — Weights: 400, 500, 600
- **Display:** `'Cinzel', serif` — Weight: 700

**Scale**

| Role | Size | Weight | Tailwind Classes | Letter Spacing |
|------|------|--------|------------------|----------------|
| Display 1 (Hero) | `3.25rem` | 700 | `font-display text-display-1 font-bold tracking-tight` | `-0.015em` |
| Heading 1 (Page) | `1.75rem` | 600 | `text-h1 font-semibold tracking-tight` | `-0.01em` |
| Heading 2 (Section) | `1.375rem` | 600 | `text-h2 font-semibold tracking-tight` | `-0.01em` |
| Heading 3 (Card) | `1rem` | 600 | `text-h3 font-semibold` | — |
| Subtitle | `0.875rem` | 400 | `text-subtitle text-text-secondary` | — |
| Body | `0.875rem` | 400 | `text-body` | — |
| Label | `0.8125rem` | 500 | `text-label font-medium text-text-secondary` | — |
| Caption | `0.75rem` | 400 | `text-caption text-text-tertiary` | — |
| Overline | `0.6875rem` | 600 | `text-overline font-semibold uppercase tracking-widest text-text-tertiary` | `0.08em` |

---

### Spacing (8-Point Grid)

| Token | Value | Tailwind Key |
|-------|-------|--------------|
| `--space-xs` | `0.25rem` (4px) | `xs` |
| `--space-sm` | `0.5rem` (8px) | `sm` |
| `--space-md` | `0.75rem` (12px) | `md` |
| `--space-lg` | `1rem` (16px) | `lg` |
| `--space-xl` | `1.5rem` (24px) | `xl` |
| `--space-2xl` | `2rem` (32px) | `2xl` |
| `--space-3xl` | `3rem` (48px) | `3xl` |

Use as: `p-lg`, `gap-xl`, `m-sm`, `px-2xl`, etc.

---

### Border Radii

| Token | Value | Tailwind Key |
|-------|-------|--------------|
| `--radius-sm` | `6px` | `rounded-ds-sm` |
| `--radius-md` | `8px` | `rounded-ds-md` |
| `--radius-lg` | `12px` | `rounded-ds-lg` |
| `--radius-full` | `9999px` | `rounded-full` |

---

### Elevation & Shadows

| Token | Dark Value | Tailwind Key |
|-------|-----------|--------------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | `shadow-ds-sm` |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.4)` | `shadow-ds-md` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | `shadow-ds-lg` |

**Z-Index Scale**

| Token | Value | Usage |
|-------|-------|-------|
| `--z-dropdown` | `50` | Dropdown menus |
| `--z-sticky` | `100` | Sticky headers, navs |
| `--z-overlay` | `900` | Overlay backdrops |
| `--z-modal` | `1000` | Modal dialogs |

---

## 3. Component Patterns (React + Tailwind)

### Interactive States

All interactive elements follow these state patterns:

- **Resting:** Default border and background
- **Hover:** `border-border-hover bg-bg-elevated transition-all duration-150 ease-in-out`
- **Focus-Visible:** `focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted`
- **Disabled:** `disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`

### Buttons

**Primary (CTA)**
```jsx
<button className="inline-flex items-center justify-center gap-sm px-lg py-sm bg-accent text-text-on-accent font-medium text-body rounded-ds-md shadow-ds-sm hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed">
  Button Label
</button>
```

**Default (Ghost)**
```jsx
<button className="inline-flex items-center justify-center gap-sm px-lg py-sm bg-bg-card text-text-primary font-medium text-body border border-border rounded-ds-md hover:bg-bg-elevated hover:border-border-hover focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed">
  Button Label
</button>
```

**Danger**
```jsx
<button className="inline-flex items-center justify-center gap-sm px-lg py-sm bg-transparent text-error font-medium text-body border border-transparent rounded-ds-md hover:border-error hover:bg-error/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/20 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed">
  Delete
</button>
```

**Sizes:**
- Large: `py-md px-xl text-h3 rounded-ds-md`
- Base: `py-sm px-lg text-body rounded-ds-md`
- Small: `py-xs px-md text-label rounded-ds-sm`

### Inputs

**Text Input**
```jsx
<input className="w-full bg-bg-surface border border-border rounded-ds-md px-md py-sm text-body text-text-primary placeholder:text-text-muted hover:border-border-hover focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted transition-all duration-150" />
```

**Error State:** Add `border-error bg-error/[0.02] focus:border-error focus:ring-error/10`

### Cards

**Standard Card**
```jsx
<div className="bg-bg-card border border-border rounded-ds-lg p-xl hover:border-border-hover hover:bg-bg-elevated hover:shadow-ds-md transition-all duration-150">
  <h3 className="text-h3 font-semibold text-text-primary">Title</h3>
  <p className="text-subtitle text-text-secondary mt-xs">Description</p>
</div>
```

### Badges

```jsx
<span className="inline-flex items-center gap-xs px-sm py-[0.2rem] text-overline font-semibold rounded-full bg-success/10 text-success">
  <span className="w-1.5 h-1.5 rounded-full bg-success" />
  Active
</span>
```

Variants: `bg-success/10 text-success`, `bg-status-2/10 text-status-2`, `bg-error/10 text-error`, etc.

### Modal

```jsx
<div className="fixed inset-0 z-modal flex items-center justify-center">
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative max-w-md w-full bg-bg-card border border-border rounded-ds-lg shadow-ds-lg">
    <div className="flex items-center justify-between px-xl py-lg border-b border-border">
      <h3 className="text-h3 font-semibold">Title</h3>
      <button>×</button>
    </div>
    <div className="px-xl py-xl">
      <p className="text-subtitle text-text-secondary">Content</p>
    </div>
    <div className="flex justify-end gap-sm px-xl py-lg border-t border-border">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </div>
</div>
```

---

## 4. Layout Principles

- **Max content width:** `1200px` centered
- **Page padding:** `space-3xl` vertical, `space-xl` horizontal
- **Section spacing:** `space-3xl` between sections
- **Card grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl`
- **Form stack:** `flex flex-col gap-xl max-w-md`

**Responsive breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 5. Motion & Animation

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| `border-color`, `background`, `color` | `150ms` | `ease` | Hover/focus state changes |
| `box-shadow`, `transform` | `200ms` | `ease` | Elevation changes, subtle scale |
| Page entrance | `400ms` | `ease` | Fade-in-up on mount |

**Tailwind classes:** `transition-all duration-150` for interactive states.

**Rules:**
- Never animate `width`, `height`, or `top/left` — use `transform` instead
- Respect `prefers-reduced-motion`: wrap animations in `motion-safe:`
- No animation should exceed `400ms`
- No bounce, spring, or elastic easings

---

## 6. Accessibility

- **Focus rings:** Every interactive element gets `focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted`
- **Reduced motion:** Wrap animations in `@media (prefers-reduced-motion: reduce)` or use `motion-safe:` prefix
- **Color:** Never use color as the only indicator. Pair with icons, text, or patterns
- **Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard:** All interactive elements must be reachable and operable via keyboard
- **Labels:** All form inputs have associated `<label>` elements
