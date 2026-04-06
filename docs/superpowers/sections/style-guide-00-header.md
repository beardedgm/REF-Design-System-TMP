# Signature Design System v2 -- Style Guide

This document is the single source of truth for all SaaS applications in the Signature portfolio. It defines every design token, component pattern, and interaction rule that developers and AI agents need to build consistent, accessible interfaces. The companion files -- `globals.css` (framework-agnostic foundation), `tailwind.preset.js` (optional Tailwind layer), and `index.html` (visual showcase) -- implement and demonstrate everything described here.

---

## Design Philosophy

Seven tenets guide every decision in this system:

1. **Professional-first with subtle warmth.** The target community is TTRPG and nerd culture, but the visual language is polished enough for any industry. Personality comes through in accent color and typographic choices, never through gimmicks.

2. **Cool dark mode, warm light mode.** Dark theme uses a blue-black undertone (`#0c0d12` base) for a modern, immersive feel. Light theme uses a cream-parchment undertone (`#f5f3ef` base) for approachable warmth. The two moods are distinct but unified by a shared gold accent.

3. **Gold accent as the brand signature.** `#c9a267` in dark mode, `#a8843e` in light mode (deepened for contrast). This warm gold carries the entire brand identity across both themes. It is used sparingly and intentionally.

4. **Cinzel serif for marketing display only, Inter for all product UI.** The serif display face (`Cinzel`) adds character to hero sections and landing pages. Every dashboard, form, and data screen uses `Inter` exclusively for clarity at small sizes.

5. **8-point spacing grid, no arbitrary values.** All spacing tokens snap to multiples of 4px (the half-step) and 8px (the primary step). This eliminates guesswork and keeps layouts rhythmically consistent.

6. **Restrained motion.** Transitions range from `150ms` (micro-interactions) to `400ms` (page entrances). No bounce, spring, or elastic easing -- only `ease`. All animations are disabled when `prefers-reduced-motion` is active.

7. **Accessibility is non-negotiable.** WCAG AA compliance minimum. Keyboard navigation on every interactive element. ARIA landmarks and roles where semantics require them. Visible labels on every form control. Color is never the sole indicator of meaning.

---

## Visual Identity

### Dual-Tone Theme Architecture

Theming is controlled by a `data-theme` attribute on the `<html>` element. Dark mode is the default. All color tokens are CSS custom properties that swap values when the attribute changes -- components never reference raw hex values.

```html
<html data-theme="dark">  <!-- default -->
<html data-theme="light"> <!-- warm alternate -->
```

Both themes share identical token names. A component written once works in both contexts without conditional logic.

### Gold Accent Rules

The warm gold accent is the most recognizable element of the brand. Strict rules govern its use:

**Use for:**
- Primary call-to-action buttons
- Active tab and navigation indicators
- Focus rings (via `border-focus`)
- Key interactive links and highlights
- Brand marks and logo treatments

**Never use for:**
- Decorative backgrounds or large surface areas
- Body text or long-form content
- Data visualization series (use `--status-1` through `--status-5` instead)
- Disabled or inactive states

### Typography Strategy

| Context | Display / Hero | Headings | Body / UI |
|---------|---------------|----------|-----------|
| **Marketing** (landing pages, hero sections) | Cinzel, 700 weight | Inter, 600 weight | Inter, 400 weight |
| **Product** (dashboards, forms, data screens) | Inter, 600 weight | Inter, 600 weight | Inter, 400 weight |

Cinzel is loaded only on pages that need it. Product UI never loads the serif font.

---

## Complete Token Reference

All values are extracted directly from `globals.css`. Every token listed below is a CSS custom property available in both themes.

### Background Colors

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--bg-primary` | `#0c0d12` | `#f5f3ef` | Page body, app shell background |
| `--bg-secondary` | `#12131a` | `#ece8e1` | Sidebar, secondary panels |
| `--bg-surface` | `#161720` | `#ffffff` | Content surface areas |
| `--bg-card` | `#1a1b24` | `#ffffff` | Cards, dialogs, popovers |
| `--bg-elevated` | `#22232e` | `#f0ece6` | Hover states, elevated surfaces, skeleton base |
| `--bg-overlay` | `rgba(0,0,0,0.6)` | `rgba(0,0,0,0.4)` | Modal/drawer backdrop |

### Text Colors

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--text-primary` | `#e8e8ec` | `#1c1a16` | Headings, body text, primary content |
| `--text-secondary` | `#8e8fa1` | `#5e5a50` | Supporting text, descriptions |
| `--text-tertiary` | `#6b6c7e` | `#8a857a` | Placeholder text, disabled labels |
| `--text-muted` | `#4e4f5e` | `#b0a99e` | Least prominent text, hints |
| `--text-on-accent` | `#0c0d12` | `#ffffff` | Text placed on accent-colored backgrounds |

### Accent Colors

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--accent` | `#c9a267` | `#a8843e` | Primary buttons, active indicators, links |
| `--accent-hover` | `#dbb57e` | `#c9a267` | Hover state for accent elements |
| `--accent-active` | `#b8934f` | `#96753a` | Pressed/active state for accent elements |
| `--accent-muted` | `rgba(201,162,103,0.10)` | `rgba(168,132,62,0.10)` | Accent backgrounds, selection highlight |
| `--accent-subtle` | `rgba(201,162,103,0.05)` | `rgba(168,132,62,0.05)` | Very subtle accent tint, hover fills |

### Semantic Colors -- Error

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--error` | `#e5484d` | `#cd2b31` | Error text, destructive buttons |
| `--error-hover` | `#f06b6e` | `#e5484d` | Hover on error elements |
| `--error-muted` | `rgba(229,72,77,0.10)` | `rgba(205,43,49,0.10)` | Error background tint |

### Semantic Colors -- Success

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--success` | `#30a46c` | `#218358` | Success messages, positive indicators |
| `--success-hover` | `#3ec282` | `#30a46c` | Hover on success elements |
| `--success-muted` | `rgba(48,164,108,0.10)` | `rgba(33,131,88,0.10)` | Success background tint |

### Semantic Colors -- Warning

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--warning` | `#f5a623` | `#c47d0a` | Warning messages, caution indicators |
| `--warning-hover` | `#f7b84a` | `#d49a2e` | Hover on warning elements |
| `--warning-muted` | `rgba(245,166,35,0.10)` | `rgba(196,125,10,0.10)` | Warning background tint |

### Semantic Colors -- Info

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--info` | `#3498db` | `#2271a1` | Informational messages, help indicators |
| `--info-hover` | `#5bb0e8` | `#3498db` | Hover on info elements |
| `--info-muted` | `rgba(52,152,219,0.10)` | `rgba(34,113,161,0.10)` | Info background tint |

### Border Colors

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--border` | `#1f2029` | `#ddd8d0` | Default borders, dividers |
| `--border-hover` | `#2e2f3d` | `#c8c2b8` | Hovered borders, scrollbar thumb |
| `--border-focus` | `var(--accent)` | `var(--accent)` | Focused input borders, focus rings |

### Status Sequence (Data Visualization)

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--status-1` | `#30a46c` | `#218358` | First data series (green) |
| `--status-2` | `#3498db` | `#2271a1` | Second data series (blue) |
| `--status-3` | `#f5a623` | `#c47d0a` | Third data series (amber) |
| `--status-4` | `#9b59b6` | `#7c3aad` | Fourth data series (purple) |
| `--status-5` | `#e5484d` | `#cd2b31` | Fifth data series (red) |
| `--status-premium` | `var(--accent)` | `var(--accent)` | Premium/special tier indicator |

### Tooltip Colors

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--tooltip-bg` | `#2a2b36` | `#1c1a16` | Tooltip background |
| `--tooltip-border` | `#3a3b48` | `#2e2a23` | Tooltip border |
| `--tooltip-text` | `#e8e8ec` | `#f5f3ef` | Tooltip text |

### Shimmer

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--shimmer-highlight` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.6)` | Skeleton loader shimmer pass |

### Typography Tokens

#### Font Families

| Token | Value | Use Case |
|-------|-------|----------|
| `--font-display` | `'Cinzel', serif` | Marketing display headings only |
| `--font-sans` | `'Inter', system-ui, -apple-system, sans-serif` | All product UI text |

#### Type Scale

| Level | Size | Weight | Tracking | Line Height | Font Family | Use Case |
|-------|------|--------|----------|-------------|-------------|----------|
| `display-1` | `3.25rem` (52px) | 700 | `-0.015em` | 1.1 | `--font-display` | Hero headlines, marketing splash |
| `display-2` | `2.25rem` (36px) | 700 | `-0.015em` | 1.2 | `--font-display` | Secondary marketing headings |
| `h1` | `1.75rem` (28px) | 600 | `-0.01em` | 1.3 | `--font-sans` | Page titles |
| `h2` | `1.375rem` (22px) | 600 | `-0.01em` | 1.35 | `--font-sans` | Section headings |
| `h3` | `1.125rem` (18px) | 600 | `0` | 1.4 | `--font-sans` | Subsection headings |
| `h4` | `1rem` (16px) | 600 | `0` | 1.4 | `--font-sans` | Card titles, group labels |
| `body` | `0.875rem` (14px) | 400 | `0` | 1.5 | `--font-sans` | Body text, paragraphs |
| `label` | `0.8125rem` (13px) | 500 | `0` | 1.4 | `--font-sans` | Form labels, nav items |
| `caption` | `0.75rem` (12px) | 400 | `0` | 1.4 | `--font-sans` | Helper text, timestamps |
| `overline` | `0.6875rem` (11px) | 600 | `0.08em` | 1.3 | `--font-sans` | Section overlines, uppercase labels |

### Spacing (8-Point Grid)

| Token | Value | Pixels |
|-------|-------|--------|
| `--space-2xs` | `2px` | 2 |
| `--space-xs` | `4px` | 4 |
| `--space-sm` | `8px` | 8 |
| `--space-md` | `12px` | 12 |
| `--space-lg` | `16px` | 16 |
| `--space-xl` | `24px` | 24 |
| `--space-2xl` | `32px` | 32 |
| `--space-3xl` | `48px` | 48 |
| `--space-4xl` | `64px` | 64 |

### Border Radii

| Token | Value | Use Case |
|-------|-------|----------|
| `--radius-sm` | `6px` | Small elements (badges, chips) |
| `--radius-md` | `8px` | Default (inputs, buttons, cards) |
| `--radius-lg` | `12px` | Larger containers (modals, panels) |
| `--radius-xl` | `16px` | Prominent cards, hero elements |
| `--radius-full` | `9999px` | Circles (avatars, pills, dots) |

### Shadows

| Token | Dark | Light | Use Case |
|-------|------|-------|----------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | `0 1px 3px rgba(80,60,20,0.08)` | Subtle elevation (cards at rest) |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | `0 4px 12px rgba(80,60,20,0.10)` | Medium elevation (dropdowns, popovers) |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | `0 8px 24px rgba(80,60,20,0.14)` | High elevation (modals, dialogs) |

Note: Light theme shadows use a warm tint (`rgba(80,60,20,...)`) rather than pure black, matching the parchment aesthetic.

### Z-Index Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--z-dropdown` | `50` | Dropdown menus, select panels |
| `--z-sticky` | `100` | Sticky headers, top nav |
| `--z-drawer` | `200` | Side drawers, slide-out panels |
| `--z-overlay` | `900` | Overlay backdrop behind modals |
| `--z-modal` | `1000` | Modal dialogs, command palette |
| `--z-toast` | `1100` | Toast notifications (always on top) |

### Motion Durations

| Token | Value | Use Case |
|-------|-------|----------|
| `--duration-micro` | `150ms` | Hover states, color transitions, micro-interactions |
| `--duration-standard` | `200ms` | Elevation changes, transforms, most transitions |
| `--duration-emphasis` | `300ms` | Expanding panels, emphasized transitions |
| `--duration-entrance` | `400ms` | Page entrance, modal open, major reveals |

All transitions use `ease` timing function. `prefers-reduced-motion` disables all animations and transitions.

### Responsive Breakpoints

| Name | Min Width | Typical Use |
|------|-----------|-------------|
| `sm` | `640px` | Large phones in landscape |
| `md` | `768px` | Tablets, sidebar collapse point |
| `lg` | `1024px` | Small desktops, sidebar expand point |
| `xl` | `1280px` | Standard desktops |
| `2xl` | `1536px` | Large monitors, ultrawide |

---

## Icon System

All icons come from **Lucide React** (`lucide-react`). No emoji, no PNG assets, no mixing icon libraries.

### Sizes

| Size Class | Pixels | Use Case |
|------------|--------|----------|
| `w-4 h-4` | 16px | Buttons, inline indicators |
| `w-5 h-5` | 20px | Navigation items, form icons |
| `w-6 h-6` | 24px | Cards, empty state secondary |
| `w-12 h-12` | 48px | Hero sections, empty state primary |

### Rules

- Icons inherit color via `currentColor` -- apply semantic text color classes to the parent or the icon element itself.
- Every icon-only button must have an `aria-label` describing the action.
- Decorative icons (next to text that already conveys meaning) should use `aria-hidden="true"`.
- Do not add custom stroke widths or fills unless creating a specific visual variant.

---

## Accessibility Requirements

These nine rules are mandatory for every component and page:

1. **Focus visible.** All interactive elements show a visible focus ring on `:focus-visible`: `outline: 2px solid var(--accent); outline-offset: 2px`. The ring uses the accent color for brand consistency.

2. **Color contrast.** Minimum 4.5:1 contrast ratio for normal text (below 18px / 14px bold). Minimum 3:1 for large text (18px+ or 14px+ bold) and UI components.

3. **Color independence.** Never use color as the sole indicator of state, meaning, or required action. Pair with icons, text labels, or patterns.

4. **Keyboard navigation.** Every interactive element is reachable via `Tab` and operable via `Enter`, `Space`, or arrow keys as appropriate. Tab order follows visual reading order.

5. **ARIA landmarks.** Use semantic HTML5 elements and ARIA landmarks correctly: `<nav>` with `aria-label`, `<main>`, `<header>`, `<footer>`, `<aside>`. One `<main>` per page.

6. **Visible labels.** Every form input has a visible `<label>` element. Placeholder text is supplemental, never a substitute. Labels appear above or to the left of their input.

7. **Reduced motion.** When `prefers-reduced-motion: reduce` is active, all animations have `duration: 0.01ms`, all transitions have `duration: 0.01ms`, and `scroll-behavior` is set to `auto`. Skeleton shimmer stops entirely.

8. **Screen reader announcements.** Dynamic content changes (toasts, form errors, live data) are announced via `aria-live` regions. Use `polite` for non-urgent updates, `assertive` for errors.

9. **Touch targets.** All interactive elements have a minimum touch target of 44x44px on mobile viewports. Use padding or min-height/min-width to achieve this without affecting visual size on desktop.

---

## Tailwind <-> CSS Variable Mapping

For projects using Tailwind, the preset maps every token to a utility class. For projects using plain CSS, use the variable directly. This table shows the correspondence:

| Tailwind Class | CSS Variable | Example Value (Dark) |
|---------------|-------------|---------------------|
| `bg-bg-primary` | `var(--bg-primary)` | `#0c0d12` |
| `bg-bg-secondary` | `var(--bg-secondary)` | `#12131a` |
| `bg-bg-surface` | `var(--bg-surface)` | `#161720` |
| `bg-bg-card` | `var(--bg-card)` | `#1a1b24` |
| `bg-bg-elevated` | `var(--bg-elevated)` | `#22232e` |
| `text-text-primary` | `var(--text-primary)` | `#e8e8ec` |
| `text-text-secondary` | `var(--text-secondary)` | `#8e8fa1` |
| `text-text-tertiary` | `var(--text-tertiary)` | `#6b6c7e` |
| `text-text-muted` | `var(--text-muted)` | `#4e4f5e` |
| `text-text-on-accent` | `var(--text-on-accent)` | `#0c0d12` |
| `bg-accent` | `var(--accent)` | `#c9a267` |
| `text-accent` | `var(--accent)` | `#c9a267` |
| `border-accent` | `var(--accent)` | `#c9a267` |
| `hover:bg-accent-hover` | `var(--accent-hover)` | `#dbb57e` |
| `bg-accent-muted` | `var(--accent-muted)` | `rgba(201,162,103,0.10)` |
| `text-error` | `var(--error)` | `#e5484d` |
| `text-success` | `var(--success)` | `#30a46c` |
| `text-warning` | `var(--warning)` | `#f5a623` |
| `border-border` | `var(--border)` | `#1f2029` |
| `hover:border-border-hover` | `var(--border-hover)` | `#2e2f3d` |
| `bg-tooltip-bg` | `var(--tooltip-bg)` | `#2a2b36` |
| `border-tooltip-border` | `var(--tooltip-border)` | `#3a3b48` |
| `bg-status-1` | `var(--status-1)` | `#30a46c` |
| `bg-status-2` | `var(--status-2)` | `#3498db` |
| `bg-status-3` | `var(--status-3)` | `#f5a623` |
| `bg-status-4` | `var(--status-4)` | `#9b59b6` |
| `bg-status-5` | `var(--status-5)` | `#e5484d` |
| `bg-status-premium` | `var(--status-premium)` | `var(--accent)` |
| `rounded-ds-sm` | `var(--radius-sm)` | `6px` |
| `rounded-ds-md` | `var(--radius-md)` | `8px` |
| `rounded-ds-lg` | `var(--radius-lg)` | `12px` |
| `rounded-full` | `var(--radius-full)` | `9999px` |
| `shadow-ds-sm` | `var(--shadow-sm)` | See Shadows table |
| `shadow-ds-md` | `var(--shadow-md)` | See Shadows table |
| `shadow-ds-lg` | `var(--shadow-lg)` | See Shadows table |
| `p-xs` / `m-xs` / `gap-xs` | `var(--space-xs)` | `4px` |
| `p-sm` / `m-sm` / `gap-sm` | `var(--space-sm)` | `8px` |
| `p-md` / `m-md` / `gap-md` | `var(--space-md)` | `12px` |
| `p-lg` / `m-lg` / `gap-lg` | `var(--space-lg)` | `16px` |
| `p-xl` / `m-xl` / `gap-xl` | `var(--space-xl)` | `24px` |
| `p-2xl` / `m-2xl` / `gap-2xl` | `var(--space-2xl)` | `32px` |
| `p-3xl` / `m-3xl` / `gap-3xl` | `var(--space-3xl)` | `48px` |
| `text-display-1` | `var(--text-display-1)` | `3.25rem` |
| `text-h1` | `var(--text-h1)` | `1.75rem` |
| `text-h2` | `var(--text-h2)` | `1.375rem` |
| `text-h3` | `var(--text-h3)` | `1.125rem` |
| `text-body` | `var(--text-body)` | `0.875rem` |
| `text-label` | `var(--text-label)` | `0.8125rem` |
| `text-caption` | `var(--text-caption)` | `0.75rem` |
| `text-overline` | `var(--text-overline)` | `0.6875rem` |
| `font-sans` | `var(--font-sans)` | Inter stack |
| `font-display` | `var(--font-display)` | Cinzel stack |
| `z-dropdown` | `var(--z-dropdown)` | `50` |
| `z-sticky` | `var(--z-sticky)` | `100` |
| `z-overlay` | `var(--z-overlay)` | `900` |
| `z-modal` | `var(--z-modal)` | `1000` |
