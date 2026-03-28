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

---

## 7. Icon System (Lucide React)

### Library

Use **Lucide React** (`lucide-react`) exclusively. No emoji, no PNG/raster icons, no mixing icon libraries.

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

- Always use Lucide icons — no exceptions
- Every icon-only button must have an `aria-label`
- Prefer outline style (default). Filled variants only for active indicator states
- Maintain consistent `2px` stroke width — don't mix with other icon sets

---

## 8. Sidebar Navigation

### Structure

Fixed left sidebar. `240px` wide expanded, `64px` collapsed (icon-only). Background: `bg-bg-secondary` with `1px` right border (`border-border`). Three vertical zones: Header, Nav Body (scrollable), Footer.

### Header

```jsx
<div className="flex items-center justify-between h-[56px] px-md border-b border-border">
  <div className="flex items-center gap-sm">
    <img src="/logo.svg" alt="App" className="h-8 w-8" />
    {!collapsed && <span className="text-label font-semibold text-text-primary">App Name</span>}
  </div>
  <button
    onClick={() => setCollapsed(!collapsed)}
    aria-expanded={!collapsed}
    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    className="text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-ds-sm p-xs transition-all duration-150"
  >
    {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
  </button>
</div>
```

### Nav Body

```jsx
<nav aria-label="Main navigation" className="flex-1 overflow-y-auto py-lg px-sm">
  <div className="mb-xl">
    <span className="text-overline font-semibold uppercase tracking-widest text-text-tertiary px-md mb-xs block">
      MAIN
    </span>
    <div className="flex flex-col gap-xs">
      {/* Active Item */}
      <a
        href="/dashboard"
        aria-current="page"
        className="flex items-center gap-sm h-[36px] px-md rounded-ds-sm bg-accent-muted text-accent border-l-2 border-accent transition-all duration-150"
      >
        <LayoutDashboard className="w-5 h-5" />
        {!collapsed && <span className="text-label">Dashboard</span>}
      </a>
      {/* Resting Item */}
      <a
        href="/projects"
        className="flex items-center gap-sm h-[36px] px-md rounded-ds-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-all duration-150"
      >
        <FolderOpen className="w-5 h-5" />
        {!collapsed && <span className="text-label">Projects</span>}
        {!collapsed && <span className="ml-auto inline-flex items-center px-sm py-[0.1rem] text-overline rounded-full bg-accent-muted text-accent">12</span>}
      </a>
    </div>
  </div>
</nav>
```

### Footer

```jsx
<div className="h-[64px] px-md flex items-center gap-sm border-t border-border">
  <img src="/avatar.jpg" alt="" className="w-8 h-8 rounded-full object-cover" />
  {!collapsed && (
    <div className="flex-1 min-w-0">
      <div className="text-label font-medium text-text-primary truncate">John Doe</div>
      <div className="text-caption text-text-tertiary truncate">john@example.com</div>
    </div>
  )}
</div>
```

Clicking the avatar area opens a dropdown with: Profile, Settings, Theme toggle (dark/light), Logout.

### States

| State | Classes |
|-------|---------|
| Resting | `text-text-secondary bg-transparent` |
| Hover | `bg-bg-elevated text-text-primary` |
| Active | `bg-accent-muted text-accent border-l-2 border-accent` |
| Collapsed icon | Centered icon only, tooltip on hover shows label |

### Mobile (< 768px)

- Sidebar hidden by default
- Hamburger button (`Menu` icon) triggers off-canvas drawer
- Drawer: `fixed inset-y-0 left-0 w-[280px] z-overlay bg-bg-secondary shadow-ds-lg`
- Overlay backdrop: `fixed inset-0 bg-black/50 z-overlay`
- Transition: `200ms ease` slide + fade
- Focus trapped inside drawer when open, `Escape` closes it

### Accessibility

- `<nav>` landmark with `aria-label="Main navigation"`
- Active item: `aria-current="page"`
- Collapse toggle: `aria-expanded` state
- Skip link as first focusable element: `Skip to main content`
- Mobile drawer: focus trapped, `Escape` closes

---

## 9. Top Navigation

### Structure

Full-width horizontal bar, `56px` height, fixed to top (`z-sticky`). Background: `bg-bg-secondary` with bottom border (`border-border`), `shadow-ds-sm`. Three zones: Left (logo + links), Center (optional search), Right (actions).

### Pattern

```jsx
<header className="fixed top-0 left-0 right-0 h-[56px] bg-bg-secondary border-b border-border shadow-ds-sm z-sticky">
  <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-xl">
    <div className="flex items-center gap-xs">
      <img src="/logo.svg" alt="App" className="h-7 w-7" />
      <span className="text-h3 font-semibold text-text-primary mr-lg">AppName</span>
      <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-xs">
        <a href="/features" aria-current="page" className="text-label font-medium px-md py-sm rounded-ds-sm text-accent relative after:absolute after:bottom-0 after:left-md after:right-md after:h-[2px] after:bg-accent transition-all duration-150">
          Features
        </a>
        <a href="/pricing" className="text-label font-medium px-md py-sm rounded-ds-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all duration-150">
          Pricing
        </a>
      </nav>
    </div>
    <div className="flex items-center gap-sm">
      <button aria-label="Search" className="text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-ds-sm p-sm transition-all duration-150">
        <Search className="w-5 h-5" />
      </button>
      <button aria-label="Notifications, 3 unread" className="relative text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-ds-sm p-sm transition-all duration-150">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-error" />
      </button>
      <img src="/avatar.jpg" alt="User menu" className="w-7 h-7 rounded-full cursor-pointer" />
    </div>
  </div>
</header>
```

### States

| State | Classes |
|-------|---------|
| Resting link | `text-text-secondary` |
| Hover link | `text-text-primary bg-bg-elevated` |
| Active link | `text-accent` with `2px` bottom accent border (pseudo-element) |

### When to Use

- Public-facing pages (landing, pricing, docs, blog)
- Simpler apps with ≤ 6 top-level routes
- For dashboards with 7+ routes, use the sidebar shell instead

### Mobile (< 768px)

- Nav links collapse into hamburger menu (`Menu` icon, right side)
- Hamburger opens full-width dropdown: `bg-bg-card shadow-ds-md`
- Links stack vertically, `44px` min height touch targets
- Right zone shrinks to: hamburger + avatar only
- Transition: panel slides down `200ms ease`
- `aria-expanded` on menu button, `aria-controls` pointing to panel

### Accessibility

- `<nav>` landmark with `aria-label="Primary navigation"`
- Active link: `aria-current="page"`
- Notification badge: `aria-label="Notifications, 3 unread"` (dynamic count)
- All icon buttons have `aria-label`

---

## 10. Page Shell Layouts

### Sidebar Shell

```jsx
<div className="flex min-h-screen">
  <aside className={`fixed inset-y-0 left-0 bg-bg-secondary border-r border-border transition-all duration-200 ${collapsed ? 'w-[64px]' : 'w-[240px]'}`}>
    {/* Sidebar content (see Section 8) */}
  </aside>
  <main className={`flex-1 transition-all duration-200 ${collapsed ? 'ml-[64px]' : 'ml-[240px]'}`}>
    {/* Top Bar + Content */}
  </main>
</div>
```

- Sidebar: fixed left, full viewport height
- Main area scrolls independently
- Mobile (< 768px): sidebar becomes drawer, main area is full-width (`ml-0`)

### Top Nav Shell

```jsx
<div className="min-h-screen">
  <header className="fixed top-0 left-0 right-0 h-[56px] z-sticky ...">
    {/* Top nav content (see Section 9) */}
  </header>
  <main className="pt-[56px]">
    <div className="max-w-6xl mx-auto px-xl py-3xl">
      {/* Page content */}
    </div>
  </main>
</div>
```

- Top nav: fixed top, full viewport width
- Main area: `pt-[56px]` to offset fixed nav (no content overlap)
- Content centered, `max-w-6xl` (1152px) or `max-w-7xl` (1280px)

### Top Bar (In-Page Header)

Works with **both** shells. Sits at the top of the main content area.

```jsx
<div className="flex items-start justify-between py-lg px-xl border-b border-border">
  <div>
    <nav aria-label="Breadcrumb" className="flex items-center gap-xs mb-xs">
      <a href="/home" className="text-caption text-text-tertiary hover:text-text-primary transition-all duration-150">Home</a>
      <ChevronRight className="w-3 h-3 text-text-muted" />
      <a href="/projects" className="text-caption text-text-tertiary hover:text-text-primary transition-all duration-150">Projects</a>
      <ChevronRight className="w-3 h-3 text-text-muted" />
      <span className="text-caption text-text-primary">Settings</span>
    </nav>
    <h1 className="text-h1 font-semibold text-text-primary">Project Settings</h1>
  </div>
  <div className="flex items-center gap-sm">
    <button className="btn-default">Export</button>
    <button className="btn-primary">Create New</button>
  </div>
</div>
```

- Breadcrumbs: `text-caption text-text-tertiary`, separator `ChevronRight` icon, last item `text-text-primary`
- Sticky option: add `sticky top-0 z-sticky bg-bg-primary` to prevent content showing through

---

## 11. Form Controls

All form controls share these rules:
- Visible `<label>` for every input (never placeholder-only)
- `focus-visible` ring: `border-accent ring-2 ring-accent-muted`
- Disabled: `opacity-40 cursor-not-allowed pointer-events-none`
- Error: `border-error` + error message below in `text-caption text-error`
- Transitions: `transition-all duration-150`
- Minimum touch target: `44px` height on mobile

### Toggle / Switch

```jsx
<label className="inline-flex items-center gap-md cursor-pointer">
  <button
    role="switch"
    aria-checked={enabled}
    onClick={() => setEnabled(!enabled)}
    className={`relative inline-flex items-center w-[36px] h-[20px] rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted ${enabled ? 'bg-accent' : 'bg-bg-elevated border border-border'}`}
  >
    <span className={`inline-block w-[14px] h-[14px] rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-[18px] bg-white' : 'translate-x-[2px] bg-text-muted'}`} />
  </button>
  <div>
    <span className="text-body text-text-primary">Email Notifications</span>
    <span className="block text-caption text-text-tertiary">Receive updates about your projects</span>
  </div>
</label>
```

- Track: `36px` wide, `20px` tall, `rounded-full`
- Off: track `bg-bg-elevated border border-border`, thumb `bg-text-muted`
- On: track `bg-accent`, thumb `#ffffff` (always white for contrast against gold)
- Thumb: `14px` circle, translates `16px` right when on
- Keyboard: `Space` toggles

### Checkbox

```jsx
<label className="inline-flex items-center gap-sm cursor-pointer">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    className="peer sr-only"
  />
  <span className="w-4 h-4 rounded-ds-sm border border-border bg-bg-surface flex items-center justify-center transition-all duration-150 peer-checked:bg-accent peer-checked:border-accent peer-hover:border-border-hover peer-focus-visible:ring-2 peer-focus-visible:ring-accent-muted">
    {checked && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
  </span>
  <span className="text-body text-text-primary">Remember me</span>
</label>
```

- Box: `16px` square, `rounded-ds-sm` (6px)
- Checked: `bg-accent border-accent`, white `Check` icon (`12px`, stroke-width 2.5)
- Indeterminate: `bg-accent border-accent`, white `Minus` icon
- Group: vertical stack with `gap-md`, optional group label as overline above
- Aria: native `<input type="checkbox">` with `aria-checked` (supports `"mixed"`)

### Radio Group

```jsx
<fieldset>
  <legend className="text-label font-medium text-text-primary mb-md">Notification Frequency</legend>
  <div role="radiogroup" className="flex flex-col gap-md">
    {options.map(option => (
      <label key={option.value} className="inline-flex items-center gap-sm cursor-pointer">
        <input
          type="radio"
          name="frequency"
          value={option.value}
          checked={selected === option.value}
          onChange={() => setSelected(option.value)}
          className="peer sr-only"
        />
        <span className="w-4 h-4 rounded-full border border-border bg-bg-surface flex items-center justify-center transition-all duration-150 peer-checked:border-accent peer-hover:border-border-hover peer-focus-visible:ring-2 peer-focus-visible:ring-accent-muted">
          {selected === option.value && <span className="w-2 h-2 rounded-full bg-accent" />}
        </span>
        <span className="text-body text-text-primary">{option.label}</span>
      </label>
    ))}
  </div>
</fieldset>
```

- Circle: `16px`, `rounded-full`, `border border-border bg-bg-surface`
- Selected: `border-accent` with inner `8px` circle in `bg-accent`
- Horizontal variant: `flex-row gap-xl` for 2-4 options
- Keyboard: arrow keys navigate within group

### Select Dropdown (Custom)

```jsx
<div className="relative">
  <button
    role="combobox"
    aria-expanded={open}
    aria-haspopup="listbox"
    onClick={() => setOpen(!open)}
    className="w-full flex items-center justify-between bg-bg-surface border border-border rounded-ds-md px-md py-sm text-body text-text-primary hover:border-border-hover focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150"
  >
    <span className={selected ? 'text-text-primary' : 'text-text-muted'}>{selected || 'Select an option...'}</span>
    <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
  </button>

  {open && (
    <ul
      role="listbox"
      className="absolute top-full left-0 right-0 mt-xs bg-bg-card border border-border rounded-ds-md shadow-ds-md z-dropdown max-h-[240px] overflow-y-auto animate-fade-in-up"
    >
      {options.map(option => (
        <li
          key={option}
          role="option"
          aria-selected={selected === option}
          onClick={() => { setSelected(option); setOpen(false); }}
          className="flex items-center justify-between px-md py-sm text-body cursor-pointer hover:bg-bg-elevated transition-all duration-150"
        >
          <span>{option}</span>
          {selected === option && <Check className="w-4 h-4 text-accent" />}
        </li>
      ))}
    </ul>
  )}
</div>
```

- Trigger: same styling as text input
- Chevron rotates `180deg` when open
- Dropdown: `bg-bg-card border rounded-ds-md shadow-ds-md z-dropdown`
- Max height: `240px`, scrollable
- Keyboard: `Enter`/`Space` opens, arrows navigate, `Enter` selects, `Escape` closes
- Click outside closes

---

## 12. Toast / Notification System

### Container

```jsx
<div
  aria-live="polite"
  role="status"
  className="fixed bottom-xl right-xl z-modal flex flex-col gap-sm max-w-sm"
>
  {/* Toast items stack here, newest on top */}
</div>
```

- Position: bottom-right desktop, bottom-center mobile (full-width minus `space-lg` margin)
- Max visible: 3 toasts. Additional queue and appear as earlier ones dismiss.

### Individual Toast

```jsx
<div className="flex items-start gap-md bg-bg-card border border-border rounded-ds-md shadow-ds-lg px-lg py-md animate-fade-in-up">
  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-[1px]" />
  <div className="flex-1 min-w-0">
    <p className="text-label font-medium text-text-primary">Changes saved</p>
    <p className="text-caption text-text-secondary">Your project settings have been updated.</p>
  </div>
  <button
    aria-label="Dismiss notification"
    className="text-text-muted hover:text-text-primary flex-shrink-0 transition-all duration-150"
  >
    <X className="w-4 h-4" />
  </button>
</div>
```

### Variants

| Variant | Icon | Color |
|---------|------|-------|
| Success | `CheckCircle` | `text-success` |
| Error | `XCircle` | `text-error` |
| Warning | `AlertTriangle` | `text-warning` |
| Info | `Info` | `text-status-2` |

### Behavior

- Auto-dismiss: **5 seconds** default (configurable)
- Hover pauses auto-dismiss timer
- Entrance: slide from right + fade (`translateX(100%) → 0`, `200ms ease`)
- Exit: fade + slide right (`150ms ease`) — exit faster than enter
- Swipe right to dismiss on mobile

### Accessibility

- Container: `aria-live="polite"`, `role="status"`
- Toasts don't steal focus
- Close button: `aria-label="Dismiss notification"`
- `Escape` dismisses the most recent toast if focused
