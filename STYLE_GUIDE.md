# Signature Design System v2 -- Style Guide

This document is the single source of truth for all SaaS applications in the Signature portfolio. It defines every design token, component pattern, and interaction rule that developers and AI agents need to build consistent, accessible interfaces. The companion files -- `globals.css` (the CSS custom property foundation) and `index.html` (visual showcase) -- implement and demonstrate everything described here. AI agents read this guide and write code using `var()` tokens directly.

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

## Tailwind and CSS Variable Mapping

The system has no Tailwind preset. With Tailwind, reference tokens via arbitrary values: `class="bg-[var(--bg-card)] text-[var(--text-primary)] rounded-[var(--radius-lg)] p-[var(--space-xl)]"`. With plain CSS, reference the variable directly: `background: var(--bg-card)`. The first column below shows the **legacy preset utility name** (kept for migration reference only); use the CSS variable in new code.

| Legacy preset (deprecated) | CSS variable (current) | Example value (Dark) |
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
## Inputs & Forms

All form controls in the Signature Design System share a consistent visual language: `bg-bg-elevated` surfaces, `border-border` edges that shift to `border-accent` on focus, and `text-caption text-error` validation messages. Every input requires a visible `<label>` -- placeholder-only fields are never acceptable.

---

### 1 Text Input

**When to use:** Standard single-line data entry -- names, emails, URLs, numbers. The most common form control in any application.

**Anatomy:**
- Label -- identifies the field, always visible above the input
- Required indicator (`*`) -- signals mandatory fields, rendered in `text-error`
- Input field -- the interactive text entry area
- Help text -- optional guidance below the label
- Error message -- validation feedback below the input

**Variants:**
| Variant | Description |
|---------|-------------|
| sm | 32px height, compact forms and table filters |
| base | 36px height, default for most forms |
| lg | 40px height, prominent single-field forms like login |
| With icon | Leading or trailing icon inside the input |

**States:** default, hover, focus-visible, disabled, error, success

**Accessibility:**
- ARIA: `<label>` linked via `htmlFor`/`id`, `aria-describedby` points to help text or error message, `aria-invalid="true"` on error
- Keyboard: Tab to focus, standard text editing keys
- Screen reader: announces label, required state, and error message when present

**Tailwind + React Example:**

```jsx
function TextInput({ label, id, required, error, helpText, size = "base", ...props }) {
  const heights = { sm: "h-[32px]", base: "h-[36px]", lg: "h-[40px]" };

  return (
    <div className="flex flex-col gap-sm">
      <label htmlFor={id} className="text-label text-text-primary">
        {label}
        {required && <span className="text-error ml-xs">*</span>}
      </label>

      {helpText && (
        <p id={`${id}-help`} className="text-caption text-text-tertiary -mt-xs">
          {helpText}
        </p>
      )}

      <input
        id={id}
        type="text"
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          error ? `${id}-error` : helpText ? `${id}-help` : undefined
        }
        className={`
          ${heights[size]} w-full px-md rounded-ds-md
          bg-bg-elevated border text-text-primary text-body
          placeholder:text-text-muted
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:border-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? "border-error focus-visible:ring-error"
            : "border-border hover:border-border-hover"
          }
        `}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-caption text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label for="email" class="form-label">
    Email address<span class="form-required">*</span>
  </label>
  <p id="email-help" class="form-help">We will never share your email.</p>
  <input
    type="email"
    id="email"
    required
    aria-describedby="email-help"
    class="form-input"
    placeholder="you@example.com"
  />
</div>

<style>
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.form-label {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}
.form-required {
  color: var(--error);
  margin-left: var(--space-xs);
}
.form-help {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
  margin-top: calc(-1 * var(--space-xs));
}
.form-input {
  height: 36px;
  width: 100%;
  padding: 0 var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  transition: border-color var(--duration-micro) var(--ease-default);
}
.form-input::placeholder {
  color: var(--text-muted);
}
.form-input:hover {
  border-color: var(--border-hover);
}
.form-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.form-input--error {
  border-color: var(--error);
}
.form-input--error:focus-visible {
  outline-color: var(--error);
}
.form-error {
  font-size: var(--text-caption);
  color: var(--error);
}
</style>
```

**Do / Don't:**
- DO: Always pair the input with a visible `<label>` and link them via `htmlFor`/`id`
- DON'T: Use placeholder text as the only label -- it disappears on focus and fails accessibility

---

### 2 Textarea

**When to use:** Multi-line text entry -- descriptions, comments, notes, bio fields. Use instead of Text Input when content is expected to exceed one line.

**Anatomy:**
- Label -- identifies the field
- Textarea -- resizable multi-line input area
- Character count -- optional, displayed bottom-right
- Error message -- validation feedback below the textarea

**Variants:**
| Variant | Description |
|---------|-------------|
| Default | Vertically resizable, min-height 80px |
| Fixed height | Non-resizable, specific row count |
| With character count | Shows current/max character count |

**States:** default, hover, focus-visible, disabled, error

**Accessibility:**
- ARIA: `<label>` linked via `htmlFor`/`id`, `aria-describedby` for help or error text, `aria-invalid="true"` on error
- Keyboard: Tab to focus, standard text editing keys, no Tab-trapping (Tab moves to next field)
- Screen reader: announces label, character count updates via `aria-live="polite"` region

**Tailwind + React Example:**

```jsx
function Textarea({ label, id, required, error, maxLength, rows = 3, ...props }) {
  const [value, setValue] = React.useState(props.defaultValue || "");

  return (
    <div className="flex flex-col gap-sm">
      <label htmlFor={id} className="text-label text-text-primary">
        {label}
        {required && <span className="text-error ml-xs">*</span>}
      </label>

      <textarea
        id={id}
        rows={rows}
        required={required}
        maxLength={maxLength}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`
          w-full min-h-[80px] px-md py-sm rounded-ds-md resize-y
          bg-bg-elevated border text-text-primary text-body
          placeholder:text-text-muted
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:border-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? "border-error focus-visible:ring-error"
            : "border-border hover:border-border-hover"
          }
        `}
        {...props}
      />

      <div className="flex justify-between">
        {error && (
          <p id={`${id}-error`} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
        {maxLength && (
          <p className="text-caption text-text-tertiary ml-auto" aria-live="polite">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label for="bio" class="form-label">Bio</label>
  <textarea
    id="bio"
    rows="3"
    maxlength="200"
    class="form-textarea"
    placeholder="Tell us about yourself..."
  ></textarea>
  <div class="form-textarea-footer">
    <span class="form-char-count" aria-live="polite">0/200</span>
  </div>
</div>

<style>
.form-textarea {
  width: 100%;
  min-height: 80px;
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  resize: vertical;
  transition: border-color var(--duration-micro) var(--ease-default);
}
.form-textarea:hover {
  border-color: var(--border-hover);
}
.form-textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.form-textarea-footer {
  display: flex;
  justify-content: flex-end;
}
.form-char-count {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
</style>
```

**Do / Don't:**
- DO: Set a sensible `min-height` (80px) so the textarea is clearly multi-line
- DON'T: Trap Tab key inside the textarea -- users need Tab to navigate to the next form field

---

### 3 Search Input

**When to use:** Standalone search fields -- page search, list filtering, command search. Not for inline table column filters (use Text Input with a filter icon instead).

**Anatomy:**
- Search icon -- magnifying glass positioned at the left inside the input
- Input field -- the text entry area with `type="search"`
- Clear button -- appears when input has value, clears on click
- Container -- wraps everything with `role="search"`

**Variants:**
| Variant | Description |
|---------|-------------|
| Default | Full-width search with icon and clear button |
| Compact | Smaller height for toolbars and headers |

**States:** default, hover, focus-visible, has-value (shows clear button), disabled

**Accessibility:**
- ARIA: `role="search"` on container, `aria-label="Search"` on input, clear button has `aria-label="Clear search"`
- Keyboard: Tab to focus, Escape clears input, Enter submits (optional)
- Screen reader: announces "Search" landmark, clear button action

**Tailwind + React Example:**

```jsx
import { Search, X } from "lucide-react";

function SearchInput({ placeholder = "Search...", onSearch, ...props }) {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  const handleClear = () => {
    setValue("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClear();
  };

  return (
    <div role="search" className="relative w-full">
      <Search className="absolute left-md top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch?.(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search"
        className="
          w-full h-[36px] pl-xl pr-xl rounded-ds-md
          bg-bg-elevated border border-border text-text-primary text-body
          placeholder:text-text-muted
          transition-colors duration-micro
          hover:border-border-hover
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:border-accent
        "
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="
            absolute right-sm top-1/2 -translate-y-1/2
            p-xs rounded-ds-sm text-text-muted
            hover:text-text-primary hover:bg-bg-elevated
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
          "
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div role="search" class="search-container">
  <svg class="search-icon" width="16" height="16" aria-hidden="true">
    <use href="#icon-search" />
  </svg>
  <input
    type="search"
    aria-label="Search"
    class="search-input"
    placeholder="Search..."
  />
  <button type="button" class="search-clear" aria-label="Clear search" hidden>
    <svg width="16" height="16" aria-hidden="true"><use href="#icon-x" /></svg>
  </button>
</div>

<style>
.search-container {
  position: relative;
  width: 100%;
}
.search-icon {
  position: absolute;
  left: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}
.search-input {
  width: 100%;
  height: 36px;
  padding: 0 var(--space-xl);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  transition: border-color var(--duration-micro) var(--ease-default);
}
.search-input:hover {
  border-color: var(--border-hover);
}
.search-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.search-clear {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  padding: var(--space-xs);
  border: none;
  background: none;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.search-clear:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}
</style>
```

**Do / Don't:**
- DO: Debounce the search callback (300ms recommended) to avoid excessive API calls
- DON'T: Forget to add `role="search"` on the container -- it creates a search landmark for screen readers

---

### 4 Select Dropdown

**When to use:** Choosing one or more options from a predefined list. Use when there are 5+ options (for fewer, consider Radio Group). Supports search filtering and multi-select.

**Anatomy:**
- Trigger button -- displays the selected value, `role="combobox"`
- Chevron icon -- indicates dropdown, rotates when open
- Dropdown panel -- `role="listbox"`, absolutely positioned below trigger
- Option items -- `role="option"` with `aria-selected`
- Search input -- optional, filters the option list
- Multi-select badge -- shows count of selected items in trigger

**Variants:**
| Variant | Description |
|---------|-------------|
| Single select | One option selected at a time |
| Multi-select | Checkbox on each option, badge shows count |
| Searchable | Search input at top of dropdown panel |

**States:** default, hover, focus-visible, open, disabled, error

**Accessibility:**
- ARIA: trigger has `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`; list has `role="listbox"`; items have `role="option"`, `aria-selected`
- Keyboard: Enter/Space opens, arrows navigate options, Enter selects, Escape closes, type-ahead search
- Screen reader: announces selected value, expanded/collapsed state, option count

**Tailwind + React Example:**

```jsx
import { ChevronDown, Check } from "lucide-react";

function Select({ label, id, options, value, onChange, error, required, placeholder = "Select..." }) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const listboxId = `${id}-listbox`;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (open && activeIndex >= 0) {
          onChange(options[activeIndex].value);
          setOpen(false);
        } else {
          setOpen(true);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-sm relative">
      <label id={`${id}-label`} className="text-label text-text-primary">
        {label}
        {required && <span className="text-error ml-xs">*</span>}
      </label>

      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={`${id}-label`}
        aria-invalid={error ? "true" : undefined}
        onKeyDown={handleKeyDown}
        onClick={() => setOpen(!open)}
        className={`
          flex items-center justify-between h-[36px] px-md rounded-ds-md
          bg-bg-elevated border text-body
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:border-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? "border-error"
            : "border-border hover:border-border-hover"
          }
          ${selected ? "text-text-primary" : "text-text-muted"}
        `}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-micro ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="
            absolute top-full left-0 right-0 mt-xs z-dropdown
            bg-bg-card border border-border rounded-ds-md shadow-ds-lg
            max-h-[240px] overflow-y-auto py-xs
          "
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => { onChange(option.value); setOpen(false); }}
              className={`
                flex items-center justify-between px-md py-sm cursor-pointer
                text-body transition-colors duration-micro
                ${index === activeIndex ? "bg-bg-elevated" : ""}
                ${option.value === value ? "text-accent" : "text-text-primary"}
                hover:bg-bg-elevated
              `}
            >
              <span>{option.label}</span>
              {option.value === value && <Check className="w-4 h-4 text-accent" />}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={`${id}-error`} className="text-caption text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field select-wrapper">
  <label id="role-label" class="form-label">Role</label>
  <button
    type="button"
    role="combobox"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-controls="role-listbox"
    aria-labelledby="role-label"
    class="select-trigger"
  >
    <span class="select-value">Select...</span>
    <svg class="select-chevron" width="16" height="16" aria-hidden="true">
      <use href="#icon-chevron-down" />
    </svg>
  </button>

  <ul id="role-listbox" role="listbox" aria-labelledby="role-label" class="select-dropdown" hidden>
    <li role="option" aria-selected="false" class="select-option">Admin</li>
    <li role="option" aria-selected="true" class="select-option select-option--active">Editor</li>
    <li role="option" aria-selected="false" class="select-option">Viewer</li>
  </ul>
</div>

<style>
.select-wrapper {
  position: relative;
}
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 36px;
  padding: 0 var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  cursor: pointer;
  transition: border-color var(--duration-micro) var(--ease-default);
}
.select-trigger:hover {
  border-color: var(--border-hover);
}
.select-trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.select-chevron {
  color: var(--text-muted);
  transition: transform var(--duration-micro) var(--ease-default);
}
.select-trigger[aria-expanded="true"] .select-chevron {
  transform: rotate(180deg);
}
.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--space-xs);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-height: 240px;
  overflow-y: auto;
  padding: var(--space-xs) 0;
  z-index: var(--z-dropdown);
}
.select-option {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.select-option:hover {
  background: var(--bg-elevated);
}
.select-option--active {
  color: var(--accent);
}
</style>
```

**Do / Don't:**
- DO: Support type-ahead search so users can jump to options by typing
- DON'T: Use a native `<select>` element for multi-select -- build a custom combobox instead

---

### 5 Combobox / Autocomplete

**When to use:** Search-as-you-type with a filtered results list. Use when the user needs to find a value from a large dataset (100+ options) or when free-text entry with suggestions is appropriate.

**Anatomy:**
- Input field -- `role="combobox"` with `aria-autocomplete="list"`
- Results listbox -- `role="listbox"`, positioned below the input
- Option items -- `role="option"` with highlighted matching text
- No-results message -- shown when filter returns empty

**Variants:**
| Variant | Description |
|---------|-------------|
| Strict | User must pick from the suggestions |
| Free-text | User can type a custom value not in the list |

**States:** default, hover, focus-visible, open (results visible), loading, no-results, disabled

**Accessibility:**
- ARIA: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` pointing to listbox, `aria-activedescendant` tracks the highlighted option
- Keyboard: arrows navigate results, Enter selects highlighted option, Escape closes list
- Screen reader: announces result count on filter change, selected option on confirm

**Tailwind + React Example:**

```jsx
import { Search } from "lucide-react";

function Combobox({ label, id, options, value, onChange, placeholder = "Type to search..." }) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const listboxId = `${id}-listbox`;

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const highlightMatch = (text) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-accent-muted text-text-primary rounded-ds-sm px-2xs">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          onChange(filtered[activeIndex].value);
          setQuery(filtered[activeIndex].label);
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-sm relative">
      <label htmlFor={id} className="text-label text-text-primary">{label}</label>

      <div className="relative">
        <Search className="absolute left-md top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIndex(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            w-full h-[36px] pl-xl pr-md rounded-ds-md
            bg-bg-elevated border border-border text-text-primary text-body
            placeholder:text-text-muted
            transition-colors duration-micro
            hover:border-border-hover
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:border-accent
          "
        />
      </div>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="
            absolute top-full left-0 right-0 mt-xs z-dropdown
            bg-bg-card border border-border rounded-ds-md shadow-ds-lg
            max-h-[240px] overflow-y-auto py-xs
          "
        >
          {filtered.length === 0 ? (
            <li className="px-md py-sm text-body text-text-muted">No results found</li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-opt-${index}`}
                role="option"
                aria-selected={option.value === value}
                onClick={() => { onChange(option.value); setQuery(option.label); setOpen(false); }}
                className={`
                  px-md py-sm cursor-pointer text-body
                  transition-colors duration-micro
                  ${index === activeIndex ? "bg-bg-elevated" : ""}
                  text-text-primary hover:bg-bg-elevated
                `}
              >
                {highlightMatch(option.label)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field combobox-wrapper">
  <label for="city" class="form-label">City</label>
  <input
    type="text"
    id="city"
    role="combobox"
    aria-expanded="true"
    aria-autocomplete="list"
    aria-controls="city-listbox"
    class="form-input combobox-input"
    placeholder="Type to search..."
  />
  <ul id="city-listbox" role="listbox" class="combobox-listbox">
    <li role="option" class="combobox-option combobox-option--active">
      <mark class="combobox-highlight">New</mark> York
    </li>
    <li role="option" class="combobox-option">
      <mark class="combobox-highlight">New</mark> Orleans
    </li>
  </ul>
</div>

<style>
.combobox-wrapper {
  position: relative;
}
.combobox-listbox {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--space-xs);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-height: 240px;
  overflow-y: auto;
  padding: var(--space-xs) 0;
  z-index: var(--z-dropdown);
}
.combobox-option {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.combobox-option:hover,
.combobox-option--active {
  background: var(--bg-elevated);
}
.combobox-highlight {
  background: var(--accent-muted);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 0 2px;
}
</style>
```

**Do / Don't:**
- DO: Highlight the matching portion of text in results so users can see why an option matched
- DON'T: Forget to manage `aria-activedescendant` -- screen readers need it to track the highlighted option

---

### 6 Checkbox

**When to use:** Binary choices (agree to terms), multiple selections from a group, or "select all" patterns with indeterminate state. Use instead of Toggle when the setting is part of a form that requires explicit submission.

**Anatomy:**
- Checkbox input -- native `<input type="checkbox">` with custom styling
- Label -- always visible, positioned to the right of the checkbox
- Description -- optional secondary text below the label
- Group legend -- for checkbox groups, wraps the set with `<fieldset>` + `<legend>`

**Variants:**
| Variant | Description |
|---------|-------------|
| Single | Standalone checkbox with label |
| Group | Multiple checkboxes in a vertical stack with shared legend |
| Indeterminate | `aria-checked="mixed"` for parent "select all" checkboxes |

**States:** default, hover, focus-visible, checked, indeterminate, disabled

**Accessibility:**
- ARIA: native `<input type="checkbox">`, `aria-checked="mixed"` for indeterminate, group wrapped in `<fieldset>` with `<legend>`
- Keyboard: Space toggles the checkbox, Tab moves between checkboxes
- Screen reader: announces checked/unchecked/mixed state, label, and group legend

**Tailwind + React Example:**

```jsx
function Checkbox({ id, label, description, checked, indeterminate, onChange, disabled }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate || false;
  }, [indeterminate]);

  return (
    <div className="flex items-start gap-md">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : checked}
        className="
          mt-2xs w-4 h-4 shrink-0
          rounded-ds-sm border border-border
          bg-bg-elevated text-accent
          focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          accent-[var(--accent)]
        "
      />
      <div className="flex flex-col">
        <label htmlFor={id} className="text-body text-text-primary cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-caption text-text-tertiary">{description}</p>
        )}
      </div>
    </div>
  );
}

function CheckboxGroup({ legend, children }) {
  return (
    <fieldset className="flex flex-col gap-md">
      <legend className="text-label text-text-primary mb-sm">{legend}</legend>
      {children}
    </fieldset>
  );
}
```

**Plain CSS + HTML Example:**

```html
<fieldset class="checkbox-group">
  <legend class="checkbox-legend">Notifications</legend>

  <div class="checkbox-item">
    <input type="checkbox" id="email-notif" class="checkbox-input" />
    <div class="checkbox-content">
      <label for="email-notif" class="checkbox-label">Email notifications</label>
      <p class="checkbox-desc">Receive updates via email</p>
    </div>
  </div>

  <div class="checkbox-item">
    <input type="checkbox" id="sms-notif" class="checkbox-input" />
    <div class="checkbox-content">
      <label for="sms-notif" class="checkbox-label">SMS notifications</label>
      <p class="checkbox-desc">Receive updates via text message</p>
    </div>
  </div>
</fieldset>

<style>
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  border: none;
  padding: 0;
}
.checkbox-legend {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}
.checkbox-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}
.checkbox-input {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;
}
.checkbox-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.checkbox-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.checkbox-label {
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
}
.checkbox-desc {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
</style>
```

**Do / Don't:**
- DO: Use `<fieldset>` and `<legend>` for checkbox groups so screen readers announce the group context
- DON'T: Style a `<div>` to look like a checkbox -- always use a native `<input type="checkbox">` for built-in keyboard and screen reader support

---

### 7 Radio Group

**When to use:** Mutually exclusive single selection from 2-7 options. Use instead of Select Dropdown when all options should be visible at once without opening a panel.

**Anatomy:**
- Fieldset container -- `role="radiogroup"` with `aria-labelledby`
- Legend -- group label
- Radio inputs -- native `<input type="radio">` with shared `name` attribute
- Radio labels -- positioned right of each radio button
- Optional description -- secondary text for each option

**Variants:**
| Variant | Description |
|---------|-------------|
| Vertical | Default stack layout, one option per line |
| Horizontal | Inline row layout for 2-4 short-label options |

**States:** default, hover, focus-visible, selected, disabled

**Accessibility:**
- ARIA: `role="radiogroup"` on container, `aria-labelledby` pointing to legend
- Keyboard: Arrow keys move selection within the group, Tab moves focus out of the group entirely
- Screen reader: announces group label, option label, selected state, and position (e.g. "2 of 4")

**Tailwind + React Example:**

```jsx
function RadioGroup({ legend, name, options, value, onChange, orientation = "vertical" }) {
  return (
    <fieldset
      role="radiogroup"
      aria-labelledby={`${name}-legend`}
      className={`flex ${orientation === "horizontal" ? "flex-row gap-xl" : "flex-col gap-md"}`}
    >
      <legend id={`${name}-legend`} className="text-label text-text-primary mb-sm">
        {legend}
      </legend>

      {options.map((option) => (
        <div key={option.value} className="flex items-start gap-md">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            disabled={option.disabled}
            className="
              mt-2xs w-4 h-4 shrink-0
              border border-border bg-bg-elevated
              text-accent accent-[var(--accent)]
              focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          />
          <div className="flex flex-col">
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-body text-text-primary cursor-pointer"
            >
              {option.label}
            </label>
            {option.description && (
              <p className="text-caption text-text-tertiary">{option.description}</p>
            )}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
```

**Plain CSS + HTML Example:**

```html
<fieldset role="radiogroup" aria-labelledby="plan-legend" class="radio-group">
  <legend id="plan-legend" class="radio-legend">Select plan</legend>

  <div class="radio-item">
    <input type="radio" id="plan-free" name="plan" value="free" class="radio-input" />
    <div class="radio-content">
      <label for="plan-free" class="radio-label">Free</label>
      <p class="radio-desc">Basic features for individuals</p>
    </div>
  </div>

  <div class="radio-item">
    <input type="radio" id="plan-pro" name="plan" value="pro" class="radio-input" checked />
    <div class="radio-content">
      <label for="plan-pro" class="radio-label">Pro</label>
      <p class="radio-desc">Advanced features for teams</p>
    </div>
  </div>
</fieldset>

<style>
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  border: none;
  padding: 0;
}
.radio-legend {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}
.radio-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}
.radio-input {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;
}
.radio-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.radio-label {
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
}
.radio-desc {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
</style>
```

**Do / Don't:**
- DO: Always provide a default selection in radio groups -- unlike checkboxes, radio buttons cannot be deselected
- DON'T: Use a radio group when multi-select is needed -- use Checkbox Group instead

---

### 8 Toggle / Switch

**When to use:** Immediate on/off settings that take effect without a form submission. Use instead of Checkbox when the change is applied instantly (e.g. dark mode, notification preferences).

**Anatomy:**
- Track -- the sliding background area
- Thumb -- the circular knob that slides between on/off positions
- Label -- always visible, describes the setting
- Description -- optional secondary text below the label

**Variants:**
| Variant | Description |
|---------|-------------|
| sm | 16px track height, compact settings lists |
| base | 20px track height, default size |

**States:** default (off), on, hover, focus-visible, disabled

**Accessibility:**
- ARIA: `role="switch"`, `aria-checked="true|false"`, `aria-labelledby`
- Keyboard: Space toggles the switch
- Screen reader: announces "switch", label, and on/off state

**Tailwind + React Example:**

```jsx
function Toggle({ id, label, description, checked, onChange, disabled, size = "base" }) {
  const trackSize = size === "sm" ? "w-[32px] h-[16px]" : "w-[40px] h-[20px]";
  const thumbSize = size === "sm" ? "w-[12px] h-[12px]" : "w-[16px] h-[16px]";
  const thumbTranslate = size === "sm" ? "translate-x-[16px]" : "translate-x-[20px]";

  return (
    <div className="flex items-start gap-md">
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative shrink-0 ${trackSize} rounded-full
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${checked ? "bg-accent" : "bg-bg-elevated border border-border"}
        `}
      >
        <span
          className={`
            absolute top-1/2 -translate-y-1/2 left-[2px]
            ${thumbSize} rounded-full bg-text-on-accent shadow-ds-sm
            transition-transform duration-micro
            ${checked ? thumbTranslate : "translate-x-0"}
          `}
        />
      </button>

      <div className="flex flex-col">
        <label id={`${id}-label`} className="text-body text-text-primary cursor-pointer"
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </label>
        {description && (
          <p className="text-caption text-text-tertiary">{description}</p>
        )}
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="toggle-field">
  <button
    type="button"
    role="switch"
    aria-checked="false"
    aria-labelledby="dark-mode-label"
    class="toggle-track"
  >
    <span class="toggle-thumb"></span>
  </button>
  <div class="toggle-content">
    <label id="dark-mode-label" class="toggle-label">Dark mode</label>
    <p class="toggle-desc">Switch to dark theme</p>
  </div>
</div>

<style>
.toggle-field {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}
.toggle-track {
  position: relative;
  width: 40px;
  height: 20px;
  flex-shrink: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.toggle-track[aria-checked="true"] {
  background: var(--accent);
  border-color: var(--accent);
}
.toggle-track:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.toggle-track:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.toggle-thumb {
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background: var(--text-on-accent);
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-micro) var(--ease-default);
}
.toggle-track[aria-checked="true"] .toggle-thumb {
  transform: translateY(-50%) translateX(20px);
}
.toggle-label {
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
}
.toggle-desc {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
</style>
```

**Do / Don't:**
- DO: Use Toggle for settings that take effect immediately -- the user should see the change without hitting "Save"
- DON'T: Use a Toggle inside a form that requires submission -- use a Checkbox instead

---

### 9 Date Picker

**When to use:** Selecting a calendar date or date range. Use for scheduling, filtering by date, and setting deadlines. For date + time, extend with a time input alongside.

**Anatomy:**
- Input trigger -- text input showing the selected date, opens calendar on click/focus
- Calendar popover -- positioned below the input, `bg-bg-card`, `shadow-ds-lg`
- Month/year navigation -- previous/next buttons and month/year display
- Day grid -- 7-column grid of day numbers
- Selected date indicator -- `bg-accent text-text-on-accent` circle
- Today indicator -- `border-accent` ring on the current date

**Variants:**
| Variant | Description |
|---------|-------------|
| Single date | Selects one date |
| Date range | Selects a start and end date with highlighted range |

**States:** default, hover (day cell), focus-visible, selected, today, disabled (out-of-range days), range-between

**Accessibility:**
- ARIA: `aria-label` on navigation buttons ("Previous month", "Next month"), `aria-selected` on the chosen date, `aria-current="date"` on today, grid uses `role="grid"` with `role="row"` and `role="gridcell"`
- Keyboard: Arrow keys navigate days, Enter selects, Escape closes popover, Page Up/Down for months
- Screen reader: announces "calendar", month/year, selected date, day of week

**Tailwind + React Example:**

```jsx
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

function DatePicker({ label, id, value, onChange, required, error }) {
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(value || new Date());

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const selectDate = (day) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(selected);
    setOpen(false);
  };

  const isSelected = (day) => {
    if (!value) return false;
    return value.getDate() === day &&
      value.getMonth() === viewDate.getMonth() &&
      value.getFullYear() === viewDate.getFullYear();
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear();
  };

  return (
    <div className="flex flex-col gap-sm relative">
      <label htmlFor={id} className="text-label text-text-primary">
        {label}
        {required && <span className="text-error ml-xs">*</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          type="text"
          readOnly
          value={value ? value.toLocaleDateString() : ""}
          onClick={() => setOpen(!open)}
          placeholder="Select a date"
          aria-invalid={error ? "true" : undefined}
          className={`
            w-full h-[36px] pl-md pr-xl rounded-ds-md cursor-pointer
            bg-bg-elevated border text-text-primary text-body
            placeholder:text-text-muted
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:border-accent
            ${error ? "border-error" : "border-border hover:border-border-hover"}
          `}
        />
        <Calendar className="absolute right-md top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-xs z-dropdown bg-bg-card border border-border rounded-ds-lg shadow-ds-lg p-md w-[280px]">
          <div className="flex items-center justify-between mb-md">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="p-xs rounded-ds-sm text-text-secondary hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-label text-text-primary">
              {viewDate.toLocaleString("default", { month: "long", year: "numeric" })}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="p-xs rounded-ds-sm text-text-secondary hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div role="grid" className="grid grid-cols-7 gap-xs text-center">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <div key={d} role="columnheader" className="text-caption text-text-muted py-xs">{d}</div>
            ))}

            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              return (
                <button
                  key={day}
                  type="button"
                  role="gridcell"
                  aria-selected={isSelected(day)}
                  aria-current={isToday(day) ? "date" : undefined}
                  onClick={() => selectDate(day)}
                  className={`
                    w-[32px] h-[32px] rounded-full text-body
                    flex items-center justify-center mx-auto
                    transition-colors duration-micro
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                    ${isSelected(day)
                      ? "bg-accent text-text-on-accent"
                      : isToday(day)
                        ? "border border-accent text-text-primary hover:bg-bg-elevated"
                        : "text-text-primary hover:bg-bg-elevated"
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <p className="text-caption text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field datepicker-wrapper">
  <label for="date-input" class="form-label">Start date</label>
  <div class="datepicker-trigger">
    <input type="text" id="date-input" class="form-input" placeholder="Select a date" readonly />
    <svg class="datepicker-icon" width="16" height="16" aria-hidden="true">
      <use href="#icon-calendar" />
    </svg>
  </div>

  <div class="datepicker-popover" role="dialog" aria-label="Choose date">
    <div class="datepicker-header">
      <button type="button" aria-label="Previous month" class="datepicker-nav">
        <svg width="16" height="16"><use href="#icon-chevron-left" /></svg>
      </button>
      <span class="datepicker-month">April 2026</span>
      <button type="button" aria-label="Next month" class="datepicker-nav">
        <svg width="16" height="16"><use href="#icon-chevron-right" /></svg>
      </button>
    </div>
    <div role="grid" class="datepicker-grid">
      <!-- Day headers and day buttons -->
    </div>
  </div>
</div>

<style>
.datepicker-wrapper {
  position: relative;
}
.datepicker-trigger {
  position: relative;
}
.datepicker-icon {
  position: absolute;
  right: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}
.datepicker-popover {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--space-xs);
  width: 280px;
  padding: var(--space-md);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
}
.datepicker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}
.datepicker-nav {
  padding: var(--space-xs);
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
}
.datepicker-nav:hover {
  background: var(--bg-elevated);
}
.datepicker-month {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}
.datepicker-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
  text-align: center;
}
.datepicker-day {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: var(--radius-full);
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.datepicker-day:hover {
  background: var(--bg-elevated);
}
.datepicker-day--selected {
  background: var(--accent);
  color: var(--text-on-accent);
}
.datepicker-day--today {
  border: 1px solid var(--accent);
}
</style>
```

**Do / Don't:**
- DO: Always allow manual text entry in the input as well as calendar selection
- DON'T: Disable keyboard navigation in the calendar grid -- arrow keys must move between day cells

---

### 10 Slider / Range

**When to use:** Selecting a numeric value within a defined range -- volume, price filters, opacity settings. Use when the exact value matters less than the approximate position within a range.

**Anatomy:**
- Track -- horizontal bar showing the full range
- Fill -- colored portion of the track from min to current value
- Thumb -- draggable handle on the track
- Min/Max labels -- optional, at track endpoints
- Value display -- optional, shows the current numeric value
- Tick marks -- optional, evenly spaced marks along the track

**Variants:**
| Variant | Description |
|---------|-------------|
| Single | One thumb, selects a single value |
| Range | Two thumbs, selects a min/max range |
| With ticks | Tick marks at regular intervals |

**States:** default, hover, active (dragging), focus-visible, disabled

**Accessibility:**
- ARIA: `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label`
- Keyboard: Left/Down decreases, Right/Up increases, Page Up/Page Down by 10x step, Home/End for min/max
- Screen reader: announces label, current value, min, and max

**Tailwind + React Example:**

```jsx
function Slider({ label, id, min = 0, max = 100, step = 1, value, onChange }) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-label text-text-primary">{label}</label>
        <span className="text-caption text-text-secondary">{value}</span>
      </div>

      <div className="relative flex items-center h-[20px]">
        <input
          type="range"
          id={id}
          role="slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="
            w-full h-[4px] appearance-none cursor-pointer
            bg-bg-elevated rounded-full
            accent-[var(--accent)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
            disabled:opacity-50 disabled:cursor-not-allowed
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-[16px]
            [&::-webkit-slider-thumb]:h-[16px]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:shadow-ds-sm
            [&::-webkit-slider-thumb]:cursor-pointer
          "
          style={{
            background: `linear-gradient(to right, var(--accent) ${percent}%, var(--bg-elevated) ${percent}%)`
          }}
        />
      </div>

      <div className="flex justify-between text-caption text-text-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <div class="slider-header">
    <label for="volume" class="form-label">Volume</label>
    <span class="slider-value">75</span>
  </div>
  <input
    type="range"
    id="volume"
    role="slider"
    min="0"
    max="100"
    step="1"
    value="75"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="75"
    class="slider-input"
  />
  <div class="slider-labels">
    <span>0</span>
    <span>100</span>
  </div>
</div>

<style>
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.slider-value {
  font-size: var(--text-caption);
  color: var(--text-secondary);
}
.slider-input {
  width: 100%;
  height: 4px;
  appearance: none;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  cursor: pointer;
  accent-color: var(--accent);
}
.slider-input::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background: var(--accent);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}
.slider-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-caption);
  color: var(--text-muted);
}
</style>
```

**Do / Don't:**
- DO: Always show the current numeric value alongside the slider so users know the exact selection
- DON'T: Use a slider for precise number entry (e.g. entering a specific dollar amount) -- use a Text Input with `type="number"` instead

---

### 11 File Upload / Dropzone

**When to use:** Uploading files such as documents, images, or CSV imports. Supports both drag-and-drop and click-to-browse.

**Anatomy:**
- Dropzone area -- dashed border container with centered icon and text
- Upload icon -- centered at the top of the dropzone (e.g. `UploadCloud`)
- Instruction text -- "Drag and drop or click to browse"
- Accepted types/size -- helper text below the instruction
- File list -- below the dropzone, shows uploaded files with name, size, and remove button

**Variants:**
| Variant | Description |
|---------|-------------|
| Default | Full dropzone area with drag-and-drop support |
| Compact | Single-line button-style upload trigger |

**States:** default, hover, drag-over (`border-accent bg-accent-subtle`), uploading (progress), error, disabled

**Accessibility:**
- ARIA: dropzone has `role="button"` and `tabindex="0"`, hidden `<input type="file">`, file list uses `aria-live="polite"` to announce additions/removals
- Keyboard: Enter/Space activates the file browser, Tab navigates to remove buttons
- Screen reader: announces "Upload area", accepted file types, and file list changes

**Tailwind + React Example:**

```jsx
import { UploadCloud, X, File } from "lucide-react";

function FileUpload({ label, id, accept, maxSize, onChange }) {
  const [files, setFiles] = React.useState([]);
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleFiles = (newFiles) => {
    const fileList = [...files, ...Array.from(newFiles)];
    setFiles(fileList);
    onChange?.(fileList);
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-sm">
      <label className="text-label text-text-primary">{label}</label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); }}}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`
          flex flex-col items-center justify-center gap-sm
          p-xl rounded-ds-lg border-2 border-dashed cursor-pointer
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
          ${dragOver
            ? "border-accent bg-accent-subtle"
            : "border-border hover:border-border-hover bg-bg-elevated"
          }
        `}
      >
        <UploadCloud className={`w-6 h-6 ${dragOver ? "text-accent" : "text-text-muted"}`} />
        <p className="text-body text-text-secondary">Drag and drop or click to browse</p>
        {accept && <p className="text-caption text-text-muted">Accepts: {accept}</p>}
        {maxSize && <p className="text-caption text-text-muted">Max size: {maxSize}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        id={id}
        accept={accept}
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
      />

      {files.length > 0 && (
        <ul className="flex flex-col gap-xs" aria-live="polite">
          {files.map((file, index) => (
            <li key={index} className="flex items-center gap-sm p-sm rounded-ds-md bg-bg-card border border-border">
              <File className="w-4 h-4 text-text-muted shrink-0" />
              <span className="text-body text-text-primary flex-1 truncate">{file.name}</span>
              <span className="text-caption text-text-tertiary">{(file.size / 1024).toFixed(1)} KB</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                className="p-xs rounded-ds-sm text-text-muted hover:text-error hover:bg-error-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label class="form-label">Attachments</label>
  <div class="dropzone" role="button" tabindex="0">
    <svg class="dropzone-icon" width="24" height="24" aria-hidden="true">
      <use href="#icon-upload-cloud" />
    </svg>
    <p class="dropzone-text">Drag and drop or click to browse</p>
    <p class="dropzone-hint">PNG, JPG up to 5MB</p>
  </div>
  <input type="file" class="sr-only" accept=".png,.jpg" multiple />

  <ul class="file-list" aria-live="polite">
    <li class="file-item">
      <svg width="16" height="16" aria-hidden="true"><use href="#icon-file" /></svg>
      <span class="file-name">photo.png</span>
      <span class="file-size">240 KB</span>
      <button type="button" class="file-remove" aria-label="Remove photo.png">
        <svg width="16" height="16"><use href="#icon-x" /></svg>
      </button>
    </li>
  </ul>
</div>

<style>
.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-xl);
  border: 2px dashed var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: border-color var(--duration-micro) var(--ease-default),
              background var(--duration-micro) var(--ease-default);
}
.dropzone:hover {
  border-color: var(--border-hover);
}
.dropzone--dragover {
  border-color: var(--accent);
  background: var(--accent-subtle);
}
.dropzone-icon {
  color: var(--text-muted);
}
.dropzone--dragover .dropzone-icon {
  color: var(--accent);
}
.dropzone-text {
  font-size: var(--text-body);
  color: var(--text-secondary);
}
.dropzone-hint {
  font-size: var(--text-caption);
  color: var(--text-muted);
}
.file-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.file-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-card);
}
.file-name {
  flex: 1;
  font-size: var(--text-body);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-size {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
.file-remove {
  padding: var(--space-xs);
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
}
.file-remove:hover {
  color: var(--error);
  background: var(--error-muted);
}
</style>
```

**Do / Don't:**
- DO: Show file type restrictions and max size in the dropzone text before the user selects a file
- DON'T: Remove the hidden `<input type="file">` -- it is the actual file picker and is required for the click-to-browse fallback

---

### 12 Tag Input / Multi-value

**When to use:** Entering multiple discrete values -- tags, email recipients, categories. Use when the user creates removable items by pressing Enter.

**Anatomy:**
- Container -- styled like a text input, wraps tags and the input field
- Tags -- removable badge-like chips inside the container
- Text input -- inline after the tags, grows to fill remaining space
- Remove button -- `X` icon on each tag

**Variants:**
| Variant | Description |
|---------|-------------|
| Default | Free-text entry, creates tag on Enter |
| With autocomplete | Shows filtered suggestions from a predefined list |

**States:** default, hover, focus-visible, has-tags, disabled, error

**Accessibility:**
- ARIA: container has `role="group"`, `aria-label` describing the field, each tag has `role="listitem"` inside a `role="list"`, remove button has `aria-label="Remove [tag name]"`
- Keyboard: Enter creates a tag, Backspace removes the last tag when input is empty, Tab moves to next form field
- Screen reader: announces tag creation, tag removal, and current tag count

**Tailwind + React Example:**

```jsx
import { X } from "lucide-react";

function TagInput({ label, id, value = [], onChange, placeholder = "Type and press Enter..." }) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);

  const addTag = (text) => {
    const trimmed = text.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-sm">
      <label htmlFor={id} className="text-label text-text-primary">{label}</label>

      <div
        role="group"
        aria-label={label}
        onClick={() => inputRef.current?.focus()}
        className="
          flex flex-wrap items-center gap-xs
          min-h-[36px] px-sm py-xs rounded-ds-md
          bg-bg-elevated border border-border
          focus-within:ring-2 focus-within:ring-accent focus-within:border-accent
          transition-colors duration-micro
          hover:border-border-hover
        "
      >
        <ul role="list" className="flex flex-wrap gap-xs">
          {value.map((tag, index) => (
            <li
              key={tag}
              role="listitem"
              className="
                flex items-center gap-2xs
                px-sm py-2xs rounded-ds-sm
                bg-accent-muted text-body text-text-primary
              "
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(index); }}
                aria-label={`Remove ${tag}`}
                className="
                  p-2xs rounded-ds-sm text-text-muted
                  hover:text-error hover:bg-error-muted
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                "
              >
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ul>

        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="
            flex-1 min-w-[80px] bg-transparent border-none
            text-body text-text-primary placeholder:text-text-muted
            focus:outline-none
          "
        />
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label for="tags" class="form-label">Tags</label>
  <div class="tag-input-container" role="group" aria-label="Tags">
    <ul class="tag-list" role="list">
      <li class="tag" role="listitem">
        <span>React</span>
        <button type="button" class="tag-remove" aria-label="Remove React">
          <svg width="12" height="12"><use href="#icon-x" /></svg>
        </button>
      </li>
      <li class="tag" role="listitem">
        <span>TypeScript</span>
        <button type="button" class="tag-remove" aria-label="Remove TypeScript">
          <svg width="12" height="12"><use href="#icon-x" /></svg>
        </button>
      </li>
    </ul>
    <input type="text" id="tags" class="tag-input" placeholder="" />
  </div>
</div>

<style>
.tag-input-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
  min-height: 36px;
  padding: var(--space-xs) var(--space-sm);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: text;
  transition: border-color var(--duration-micro) var(--ease-default);
}
.tag-input-container:hover {
  border-color: var(--border-hover);
}
.tag-input-container:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}
.tag {
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  padding: var(--space-2xs) var(--space-sm);
  background: var(--accent-muted);
  border-radius: var(--radius-sm);
  font-size: var(--text-body);
  color: var(--text-primary);
}
.tag-remove {
  padding: var(--space-2xs);
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
}
.tag-remove:hover {
  color: var(--error);
  background: var(--error-muted);
}
.tag-input {
  flex: 1;
  min-width: 80px;
  border: none;
  background: transparent;
  font-size: var(--text-body);
  color: var(--text-primary);
}
.tag-input:focus {
  outline: none;
}
.tag-input::placeholder {
  color: var(--text-muted);
}
</style>
```

**Do / Don't:**
- DO: Prevent duplicate tags by checking the value before adding
- DON'T: Allow tags to overflow the container without wrapping -- always use `flex-wrap`

---

### 13 Color Picker

**When to use:** Selecting a color from a predefined palette -- category colors, label colors, theme accent selection. Not for arbitrary color selection (use a full-featured color picker library for that).

**Anatomy:**
- Label -- describes the color selection purpose
- Swatch grid -- a grid of predefined color circles
- Selected indicator -- `ring-2 ring-accent` around the chosen swatch
- Optional hex input -- text input for entering a custom hex value

**Variants:**
| Variant | Description |
|---------|-------------|
| Swatch grid | Grid of predefined colors |
| With custom input | Adds a hex code text input below the swatches |

**States:** default, hover (swatch scale-up), focus-visible, selected (ring indicator)

**Accessibility:**
- ARIA: swatch grid uses `role="radiogroup"`, each swatch is `role="radio"` with `aria-checked` and `aria-label` describing the color name
- Keyboard: Arrow keys navigate swatches, Enter/Space selects, Tab moves out of group
- Screen reader: announces color name and selected state

**Tailwind + React Example:**

```jsx
const COLORS = [
  { name: "Red", value: "#e5484d" },
  { name: "Orange", value: "#f5a623" },
  { name: "Green", value: "#30a46c" },
  { name: "Blue", value: "#3498db" },
  { name: "Purple", value: "#9b59b6" },
  { name: "Gold", value: "#c9a267" },
];

function ColorPicker({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-sm">
      <label id={`${name}-label`} className="text-label text-text-primary">{label}</label>

      <div
        role="radiogroup"
        aria-labelledby={`${name}-label`}
        className="flex flex-wrap gap-sm"
      >
        {COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            role="radio"
            aria-checked={value === color.value}
            aria-label={color.name}
            onClick={() => onChange(color.value)}
            className={`
              w-[32px] h-[32px] rounded-full
              transition-all duration-micro
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
              hover:scale-110
              ${value === color.value ? "ring-2 ring-accent ring-offset-2" : ""}
            `}
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label id="color-label" class="form-label">Category color</label>
  <div role="radiogroup" aria-labelledby="color-label" class="color-grid">
    <button
      type="button"
      role="radio"
      aria-checked="true"
      aria-label="Red"
      class="color-swatch color-swatch--selected"
      style="background-color: #e5484d;"
    ></button>
    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Green"
      class="color-swatch"
      style="background-color: #30a46c;"
    ></button>
    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Blue"
      class="color-swatch"
      style="background-color: #3498db;"
    ></button>
  </div>
</div>

<style>
.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}
.color-swatch {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: transform var(--duration-micro) var(--ease-default);
}
.color-swatch:hover {
  transform: scale(1.1);
}
.color-swatch:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.color-swatch--selected {
  box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px var(--accent);
}
</style>
```

**Do / Don't:**
- DO: Use `aria-label` on each swatch with the color name so screen reader users know which color they are selecting
- DON'T: Rely only on the color itself to communicate selection -- always show a ring or checkmark indicator

---

### 14 Form Layout

**When to use:** Every form in the system. This is the composition pattern that governs how labels, inputs, help text, error messages, and groups are spaced relative to each other.

**Anatomy:**
- Label -- positioned above the input, always visible
- Required indicator -- `*` rendered in `text-error` after the label text
- Help text -- optional, below the label in `text-caption text-text-tertiary`
- Input -- the form control itself
- Error message -- below the input in `text-caption text-error`
- Form group -- a logical set of related fields separated by `space-xl`

**Variants:**
| Variant | Description |
|---------|-------------|
| Vertical (default) | Label above input, full-width fields |
| Horizontal | Label left, input right, used in settings forms at wider breakpoints |
| Inline | Multiple fields in a row (e.g. first name + last name) |

**States:** N/A (this is a layout pattern, not an interactive component)

**Accessibility:**
- ARIA: every input linked to its label via `htmlFor`/`id`, `aria-describedby` points to help text or error message, `aria-required="true"` on required fields
- Keyboard: Tab order follows visual order (top to bottom, left to right)
- Screen reader: announces label, required state, help text, and error message in sequence

**Spacing Rules:**
| Relationship | Token | Value |
|---|---|---|
| Label to input | `space-sm` | 8px |
| Input to help/error text | `space-xs` | 4px |
| Between form groups | `space-xl` | 24px |
| Label to help text (when help is between label and input) | `space-xs` | 4px |

**Tailwind + React Example:**

```jsx
function FormField({ label, id, required, helpText, error, children }) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-col gap-xs">
        <label htmlFor={id} className="text-label text-text-primary">
          {label}
          {required && <span className="text-error ml-xs">*</span>}
        </label>
        {helpText && (
          <p id={`${id}-help`} className="text-caption text-text-tertiary">
            {helpText}
          </p>
        )}
      </div>

      {children}

      {error && (
        <p id={`${id}-error`} className="text-caption text-error -mt-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ExampleForm() {
  return (
    <form className="flex flex-col gap-xl max-w-[480px]">
      <FormField label="Full name" id="name" required>
        <input
          id="name"
          type="text"
          required
          aria-required="true"
          className="
            h-[36px] w-full px-md rounded-ds-md
            bg-bg-elevated border border-border text-text-primary text-body
            placeholder:text-text-muted
            hover:border-border-hover
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:border-accent
          "
        />
      </FormField>

      <FormField label="Email" id="email" required helpText="We will never share your email.">
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-describedby="email-help"
          className="
            h-[36px] w-full px-md rounded-ds-md
            bg-bg-elevated border border-border text-text-primary text-body
            placeholder:text-text-muted
            hover:border-border-hover
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:border-accent
          "
        />
      </FormField>

      <FormField label="Bio" id="bio" error="Bio must be at least 10 characters.">
        <textarea
          id="bio"
          rows={3}
          aria-invalid="true"
          aria-describedby="bio-error"
          className="
            w-full min-h-[80px] px-md py-sm rounded-ds-md resize-y
            bg-bg-elevated border border-error text-text-primary text-body
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-error focus-visible:border-error
          "
        />
      </FormField>

      <div className="flex gap-md pt-md">
        <button
          type="submit"
          className="
            h-[36px] px-xl rounded-ds-md
            bg-accent text-text-on-accent text-label
            hover:bg-accent-hover active:bg-accent-active
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:ring-offset-2
            transition-colors duration-micro
          "
        >
          Save
        </button>
        <button
          type="button"
          className="
            h-[36px] px-xl rounded-ds-md
            bg-bg-elevated border border-border text-text-primary text-label
            hover:border-border-hover hover:bg-bg-card
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:ring-offset-2
            transition-colors duration-micro
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
```

**Plain CSS + HTML Example:**

```html
<form class="form-layout">
  <div class="form-group">
    <div class="form-label-block">
      <label for="fullname" class="form-label">
        Full name<span class="form-required">*</span>
      </label>
    </div>
    <input type="text" id="fullname" required aria-required="true" class="form-input" />
  </div>

  <div class="form-group">
    <div class="form-label-block">
      <label for="email" class="form-label">
        Email<span class="form-required">*</span>
      </label>
      <p id="email-help" class="form-help">We will never share your email.</p>
    </div>
    <input type="email" id="email" required aria-required="true"
      aria-describedby="email-help" class="form-input" />
  </div>

  <div class="form-group">
    <div class="form-label-block">
      <label for="bio" class="form-label">Bio</label>
    </div>
    <textarea id="bio" rows="3" aria-invalid="true" aria-describedby="bio-error"
      class="form-textarea form-textarea--error"></textarea>
    <p id="bio-error" class="form-error" role="alert">Bio must be at least 10 characters.</p>
  </div>

  <div class="form-actions">
    <button type="submit" class="btn btn-primary">Save</button>
    <button type="button" class="btn btn-default">Cancel</button>
  </div>
</form>

<style>
.form-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  max-width: 480px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.form-label-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.form-label {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}
.form-required {
  color: var(--error);
  margin-left: var(--space-xs);
}
.form-help {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
.form-input {
  height: 36px;
  width: 100%;
  padding: 0 var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  transition: border-color var(--duration-micro) var(--ease-default);
}
.form-input:hover {
  border-color: var(--border-hover);
}
.form-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.form-textarea {
  width: 100%;
  min-height: 80px;
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  resize: vertical;
  transition: border-color var(--duration-micro) var(--ease-default);
}
.form-textarea:hover {
  border-color: var(--border-hover);
}
.form-textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.form-textarea--error {
  border-color: var(--error);
}
.form-textarea--error:focus-visible {
  outline-color: var(--error);
}
.form-error {
  font-size: var(--text-caption);
  color: var(--error);
  margin-top: calc(-1 * var(--space-xs));
}
.form-actions {
  display: flex;
  gap: var(--space-md);
  padding-top: var(--space-md);
}
.btn {
  height: 36px;
  padding: 0 var(--space-xl);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.btn-primary {
  background: var(--accent);
  color: var(--text-on-accent);
}
.btn-primary:hover {
  background: var(--accent-hover);
}
.btn-default {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-primary);
}
.btn-default:hover {
  border-color: var(--border-hover);
  background: var(--bg-card);
}
</style>
```

**Do / Don't:**
- DO: Maintain consistent spacing: `space-sm` (8px) between label and input, `space-xs` (4px) between input and error, `space-xl` (24px) between form groups
- DON'T: Place the label inside the input as a floating label that disappears -- always keep labels visible above the field
## Buttons & Actions

This section covers the three interactive action patterns: **Button**, **Button Group**, and **Floating Action Button**. Every example uses only design-system tokens -- no hardcoded colors, sizes, or shadows.

---

### 2.1 Button

**When to use:** For any interactive action the user can take -- submitting a form, opening a dialog, triggering a navigation, or performing a destructive operation. Choose the variant that matches the action's importance and intent.

**Anatomy:**
- `<button>` element (or `<a>` styled as button when navigating)
- Optional leading icon (Lucide, `w-4 h-4`)
- Label text (`font-weight: 500`, `text-label` size)
- Optional trailing icon
- Loading spinner (replaces content when loading)

**Variants:**

| Variant | Background | Text | Border | Use case |
|---------|-----------|------|--------|----------|
| Primary | `bg-accent` | `text-text-on-accent` | none | Primary CTA -- one per visible section |
| Default | `bg-bg-elevated` | `text-text-primary` | `border-border` | Secondary actions, toolbar buttons |
| Ghost | transparent | `text-text-secondary` | none | Tertiary actions, inline actions |
| Danger | `bg-error` | `#ffffff` | none | Destructive actions (delete, remove) |

**Sizes:**

| Size | Height | Padding X | Font size | Icon-only width | Radius |
|------|--------|-----------|-----------|-----------------|--------|
| `sm` | 28px | `space-md` (12px) | `text-caption` (0.75rem) | 28px | `radius-sm` (6px) |
| `base` | 36px | `space-lg` (16px) | `text-label` (0.8125rem) | 36px | `radius-md` (8px) |
| `lg` | 40px | `space-xl` (24px) | `text-body` (0.875rem) | 40px | `radius-md` (8px) |

**States:** default, hover, focus-visible, active, disabled, loading

| State | Primary | Default | Ghost | Danger |
|-------|---------|---------|-------|--------|
| Default | `bg-accent` | `bg-bg-elevated border-border` | transparent | `bg-error` |
| Hover | `bg-accent-hover` | `bg-bg-card border-border-hover` | `bg-bg-elevated` | `bg-error-hover` |
| Focus-visible | `outline: 2px solid var(--accent)` offset 2px | same ring | same ring | same ring |
| Active | `bg-accent-active` | `bg-bg-elevated` pressed | `bg-bg-elevated` pressed | darker red (filter) |
| Disabled | `opacity-50 cursor-not-allowed` | same | same | same |
| Loading | spinner, `aria-busy`, `pointer-events-none` | same | same | same |

**Accessibility:**
- Use `<button>` for actions, `<a>` only for navigation
- Icon-only buttons require `aria-label` describing the action
- Loading state sets `aria-busy="true"` and `aria-disabled="true"`
- Disabled buttons use `disabled` attribute (not just visual styling)
- Focus ring: `outline: 2px solid var(--accent)`, `outline-offset: 2px`
- Minimum touch target: 44x44px (padding expands hit area on `sm`)
- Keyboard: `Enter` and `Space` activate

**Tailwind + React Example:**

```jsx
import { Loader2, Trash2, Plus, Settings } from 'lucide-react';

/* ── Variant styles ── */
const variants = {
  primary:
    'bg-accent text-text-on-accent hover:bg-accent-hover active:bg-accent-active',
  default:
    'bg-bg-elevated text-text-primary border border-border hover:bg-bg-card hover:border-border-hover',
  ghost:
    'bg-transparent text-text-secondary hover:bg-bg-elevated hover:text-text-primary',
  danger:
    'bg-error text-white hover:bg-error-hover',
};

/* ── Size styles ── */
const sizes = {
  sm: 'h-7 px-md text-caption rounded-ds-sm gap-xs',
  base: 'h-9 px-lg text-label rounded-ds-md gap-sm',
  lg: 'h-10 px-xl text-body rounded-ds-md gap-sm',
};

/* ── Icon-only size styles ── */
const iconOnlySizes = {
  sm: 'h-7 w-7 rounded-ds-sm',
  base: 'h-9 w-9 rounded-ds-md',
  lg: 'h-10 w-10 rounded-ds-md',
};

function Button({
  variant = 'default',
  size = 'base',
  iconOnly = false,
  loading = false,
  disabled = false,
  children,
  'aria-label': ariaLabel,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        transition-colors duration-micro ease-default
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-accent focus-visible:outline-offset-2
        ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${variants[variant]}
        ${iconOnly ? iconOnlySizes[size] : sizes[size]}
      `}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}

/* ── Usage: All variants at base size ── */
function ButtonShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-lg">
      {/* Primary */}
      <Button variant="primary">
        <Plus className="w-4 h-4" />
        Create Project
      </Button>

      {/* Default */}
      <Button variant="default">
        <Settings className="w-4 h-4" />
        Settings
      </Button>

      {/* Ghost */}
      <Button variant="ghost">Cancel</Button>

      {/* Danger */}
      <Button variant="danger">
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>

      {/* Icon-only */}
      <Button variant="default" iconOnly aria-label="Settings">
        <Settings className="w-4 h-4" />
      </Button>

      {/* Loading */}
      <Button variant="primary" loading>
        Saving...
      </Button>

      {/* Disabled */}
      <Button variant="primary" disabled>
        Unavailable
      </Button>

      {/* Small size */}
      <Button variant="primary" size="sm">Small</Button>

      {/* Large size */}
      <Button variant="primary" size="lg">Large</Button>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<style>
  /* ── Base button reset ── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    font-family: var(--font-sans);
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color var(--duration-micro) var(--ease-default),
                border-color var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }
  .btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .btn:disabled,
  .btn[aria-busy="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Sizes ── */
  .btn--sm {
    height: 28px;
    padding-inline: var(--space-md);
    font-size: var(--text-caption);
    border-radius: var(--radius-sm);
    gap: var(--space-xs);
  }
  .btn--base {
    height: 36px;
    padding-inline: var(--space-lg);
    font-size: var(--text-label);
    border-radius: var(--radius-md);
  }
  .btn--lg {
    height: 40px;
    padding-inline: var(--space-xl);
    font-size: var(--text-body);
    border-radius: var(--radius-md);
  }

  /* ── Icon-only (square) ── */
  .btn--icon-only.btn--sm  { width: 28px; padding: 0; }
  .btn--icon-only.btn--base { width: 36px; padding: 0; }
  .btn--icon-only.btn--lg  { width: 40px; padding: 0; }

  /* ── Primary variant ── */
  .btn--primary {
    background: var(--accent);
    color: var(--text-on-accent);
  }
  .btn--primary:hover { background: var(--accent-hover); }
  .btn--primary:active { background: var(--accent-active); }

  /* ── Default variant ── */
  .btn--default {
    background: var(--bg-elevated);
    color: var(--text-primary);
    border: 1px solid var(--border);
  }
  .btn--default:hover {
    background: var(--bg-card);
    border-color: var(--border-hover);
  }
  .btn--default:active { background: var(--bg-elevated); }

  /* ── Ghost variant ── */
  .btn--ghost {
    background: transparent;
    color: var(--text-secondary);
  }
  .btn--ghost:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
  }
  .btn--ghost:active { background: var(--bg-elevated); }

  /* ── Danger variant ── */
  .btn--danger {
    background: var(--error);
    color: #ffffff;
  }
  .btn--danger:hover { background: var(--error-hover); }
  .btn--danger:active { filter: brightness(0.9); }

  /* ── Loading spinner ── */
  .btn__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    animation: btn-spin 600ms linear infinite;
  }
  @keyframes btn-spin {
    to { transform: rotate(360deg); }
  }
</style>

<!-- Primary (all sizes) -->
<button class="btn btn--primary btn--sm">Small Primary</button>
<button class="btn btn--primary btn--base">Base Primary</button>
<button class="btn btn--primary btn--lg">Large Primary</button>

<!-- Default -->
<button class="btn btn--default btn--base">
  <svg class="lucide" width="16" height="16"><use href="#settings-icon"/></svg>
  Settings
</button>

<!-- Ghost -->
<button class="btn btn--ghost btn--base">Cancel</button>

<!-- Danger -->
<button class="btn btn--danger btn--base">
  <svg class="lucide" width="16" height="16"><use href="#trash-icon"/></svg>
  Delete
</button>

<!-- Icon-only -->
<button class="btn btn--default btn--base btn--icon-only" aria-label="Settings">
  <svg class="lucide" width="16" height="16"><use href="#settings-icon"/></svg>
</button>

<!-- Loading -->
<button class="btn btn--primary btn--base" aria-busy="true" aria-disabled="true" disabled>
  <span class="btn__spinner" aria-hidden="true"></span>
</button>

<!-- Disabled -->
<button class="btn btn--primary btn--base" disabled>Unavailable</button>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use one primary button per visible section | Place two primary buttons side by side |
| Use `<button>` for actions | Use `<div onClick>` or `<a>` for non-navigation actions |
| Provide `aria-label` on icon-only buttons | Rely on tooltip alone for icon-only meaning |
| Use danger variant for destructive actions | Use primary (gold) for delete/remove actions |
| Show loading spinner and disable during async | Leave button clickable while loading |
| Use ghost for cancel/dismiss in dialogs | Use primary for cancel actions |
| Keep labels short: 1-3 words | Write full sentences as button labels |

---

### 2.2 Button Group

**When to use:** When two or more related actions belong together visually -- such as a segmented control, a toolbar section, or a split button with a primary action and a dropdown trigger.

**Anatomy:**
- Container `<div role="group" aria-label="...">` wrapping multiple `<button>` elements
- First button: left radii only (`border-radius: var(--radius-md) 0 0 var(--radius-md)`)
- Middle buttons: no radii (`border-radius: 0`)
- Last button: right radii only (`border-radius: 0 var(--radius-md) var(--radius-md) 0`)
- Buttons share borders (negative margin or collapsed borders)
- Split button variant: primary action button + narrow dropdown trigger separated by a divider

**Variants:**

| Variant | Description |
|---------|-------------|
| Default group | Same-variant buttons joined together (e.g., all default) |
| Mixed group | Primary action + default secondary actions |
| Split button | Primary action + dropdown arrow trigger sharing one visual container |

**States:** default, hover (individual button), focus-visible (individual button with ring), disabled (individual or entire group)

**Accessibility:**
- Container has `role="group"` and `aria-label` describing the group's purpose
- Each button is independently focusable and labeled
- Split button dropdown trigger has `aria-haspopup="true"` and `aria-expanded`
- Keyboard: `Tab` moves between buttons normally (not arrow keys -- these are independent buttons, not a toolbar)

**Tailwind + React Example:**

```jsx
import { ChevronDown, Bold, Italic, Underline } from 'lucide-react';

/* ── Button Group container ── */
function ButtonGroup({ label, children }) {
  return (
    <div role="group" aria-label={label} className="inline-flex">
      {children}
    </div>
  );
}

/* ── Shared base for grouped buttons ── */
const groupedBase = `
  inline-flex items-center justify-center
  h-9 px-lg text-label font-medium
  bg-bg-elevated text-text-primary border border-border
  hover:bg-bg-card hover:border-border-hover
  focus-visible:outline focus-visible:outline-2
  focus-visible:outline-accent focus-visible:outline-offset-2
  focus-visible:z-10
  transition-colors duration-micro ease-default
  disabled:opacity-50 disabled:cursor-not-allowed
`;

/* ── Position classes ── */
const groupFirst  = 'rounded-l-ds-md rounded-r-none border-r-0';
const groupMiddle = 'rounded-none border-r-0';
const groupLast   = 'rounded-r-ds-md rounded-l-none';
const groupOnly   = 'rounded-ds-md'; /* single button fallback */

/* ── Default button group (toolbar) ── */
function ToolbarGroup() {
  return (
    <ButtonGroup label="Text formatting">
      <button className={`${groupedBase} ${groupFirst}`} aria-label="Bold">
        <Bold className="w-4 h-4" />
      </button>
      <button className={`${groupedBase} ${groupMiddle}`} aria-label="Italic">
        <Italic className="w-4 h-4" />
      </button>
      <button className={`${groupedBase} ${groupLast}`} aria-label="Underline">
        <Underline className="w-4 h-4" />
      </button>
    </ButtonGroup>
  );
}

/* ── Split button (primary action + dropdown) ── */
function SplitButton({ label, onClick, onDropdown, dropdownOpen }) {
  return (
    <ButtonGroup label={label}>
      {/* Primary action */}
      <button
        className={`
          inline-flex items-center justify-center
          h-9 px-lg text-label font-medium rounded-l-ds-md rounded-r-none
          bg-accent text-text-on-accent
          hover:bg-accent-hover active:bg-accent-active
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-accent focus-visible:outline-offset-2
          focus-visible:z-10
          transition-colors duration-micro ease-default
        `}
        onClick={onClick}
      >
        {label}
      </button>

      {/* Divider (1px accent-active line) */}
      <span className="w-px h-9 bg-accent-active" aria-hidden="true" />

      {/* Dropdown trigger */}
      <button
        className={`
          inline-flex items-center justify-center
          h-9 w-9 rounded-r-ds-md rounded-l-none
          bg-accent text-text-on-accent
          hover:bg-accent-hover active:bg-accent-active
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-accent focus-visible:outline-offset-2
          focus-visible:z-10
          transition-colors duration-micro ease-default
        `}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        aria-label={`More options for ${label}`}
        onClick={onDropdown}
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </ButtonGroup>
  );
}
```

**Plain CSS + HTML Example:**

```html
<style>
  /* ── Button group container ── */
  .btn-group {
    display: inline-flex;
  }

  /* ── Grouped button base ── */
  .btn-group .btn {
    border-radius: 0;
    position: relative;
  }
  .btn-group .btn + .btn {
    margin-left: -1px; /* collapse shared borders */
  }
  .btn-group .btn:focus-visible {
    z-index: 1; /* focus ring above siblings */
  }

  /* ── First / last radii ── */
  .btn-group .btn:first-child {
    border-radius: var(--radius-md) 0 0 var(--radius-md);
  }
  .btn-group .btn:last-child {
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }
  .btn-group .btn:only-child {
    border-radius: var(--radius-md);
  }

  /* ── Split button divider ── */
  .btn-group__divider {
    width: 1px;
    background: var(--accent-active);
    align-self: stretch;
  }
</style>

<!-- Default button group (toolbar) -->
<div class="btn-group" role="group" aria-label="Text formatting">
  <button class="btn btn--default btn--base btn--icon-only" aria-label="Bold">
    <svg class="lucide" width="16" height="16"><use href="#bold-icon"/></svg>
  </button>
  <button class="btn btn--default btn--base btn--icon-only" aria-label="Italic">
    <svg class="lucide" width="16" height="16"><use href="#italic-icon"/></svg>
  </button>
  <button class="btn btn--default btn--base btn--icon-only" aria-label="Underline">
    <svg class="lucide" width="16" height="16"><use href="#underline-icon"/></svg>
  </button>
</div>

<!-- Split button -->
<div class="btn-group" role="group" aria-label="Save options">
  <button class="btn btn--primary btn--base">Save</button>
  <span class="btn-group__divider" aria-hidden="true"></span>
  <button
    class="btn btn--primary btn--base btn--icon-only"
    aria-haspopup="true"
    aria-expanded="false"
    aria-label="More save options"
  >
    <svg class="lucide" width="16" height="16"><use href="#chevron-down-icon"/></svg>
  </button>
</div>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Group related actions that belong together | Group unrelated actions just for layout |
| Use `role="group"` with `aria-label` on the container | Omit group labeling |
| Collapse shared borders with negative margin or `border-right: 0` | Leave double borders between buttons |
| Keep groups to 2-5 buttons maximum | Create long button groups with 6+ items |
| Use split button for a clear primary + secondary action | Use split button when both actions are equally important |

---

### 2.3 Floating Action Button (FAB)

**When to use:** For the single most important action on a mobile screen -- creating a new item, composing a message, or starting a workflow. The FAB is a mobile-only pattern; on desktop, use a standard primary button in the page header or toolbar instead.

**Anatomy:**
- Circular `<button>` with `position: fixed`, anchored to the bottom-right corner
- Gold background (`bg-accent`), elevated shadow (`shadow-lg`)
- Single Lucide icon (`w-6 h-6`), no text label (icon-only)
- `z-sticky` (z-index 100) to float above scrolling content
- Optional: extended FAB with icon + short text label (pill shape)

**Variants:**

| Variant | Shape | Content | Radius |
|---------|-------|---------|--------|
| Standard | Circle, 56x56px | Icon only | `radius-full` |
| Extended | Pill, 56px height | Icon + label | `radius-full` |

**States:** default, hover, focus-visible, active, disabled

| State | Style |
|-------|-------|
| Default | `bg-accent`, `shadow-lg` |
| Hover | `bg-accent-hover`, `shadow-lg` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Active | `bg-accent-active`, `shadow-md` (pressed feel) |
| Disabled | `opacity-50`, `cursor-not-allowed`, `pointer-events-none` |

**Accessibility:**
- Always requires `aria-label` describing the action (e.g., "Create new project")
- Must not overlap critical content or navigation when keyboard is open
- `z-index: var(--z-sticky)` keeps it above content but below modals/overlays
- Respect `prefers-reduced-motion`: skip entrance animation
- On desktop viewports (>= 768px), hide the FAB -- use inline primary buttons instead

**Tailwind + React Example:**

```jsx
import { Plus, MessageSquare } from 'lucide-react';

/* ── Standard FAB (icon only) ── */
function Fab({ icon: Icon, label, onClick, disabled = false }) {
  return (
    <button
      className={`
        fixed bottom-xl right-xl z-sticky
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-accent text-text-on-accent shadow-ds-lg
        hover:bg-accent-hover
        active:bg-accent-active active:shadow-ds-md
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-accent focus-visible:outline-offset-2
        transition-all duration-micro ease-default
        md:hidden
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
      `}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}

/* ── Extended FAB (icon + label) ── */
function FabExtended({ icon: Icon, label, onClick, disabled = false }) {
  return (
    <button
      className={`
        fixed bottom-xl right-xl z-sticky
        inline-flex items-center gap-sm
        h-14 px-xl rounded-full
        bg-accent text-text-on-accent shadow-ds-lg
        hover:bg-accent-hover
        active:bg-accent-active active:shadow-ds-md
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-accent focus-visible:outline-offset-2
        transition-all duration-micro ease-default
        text-label font-medium
        md:hidden
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="w-6 h-6" />
      {label}
    </button>
  );
}

/* ── Usage ── */
function MobileView() {
  return (
    <main>
      {/* Page content... */}

      {/* Standard FAB */}
      <Fab
        icon={Plus}
        label="Create new project"
        onClick={() => console.log('create')}
      />

      {/* Or extended FAB */}
      {/* <FabExtended
        icon={MessageSquare}
        label="Compose"
        onClick={() => console.log('compose')}
      /> */}
    </main>
  );
}
```

**Plain CSS + HTML Example:**

```html
<style>
  /* ── Standard FAB ── */
  .fab {
    position: fixed;
    bottom: var(--space-xl);
    right: var(--space-xl);
    z-index: var(--z-sticky);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: none;
    border-radius: var(--radius-full);
    background: var(--accent);
    color: var(--text-on-accent);
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    transition: background-color var(--duration-micro) var(--ease-default),
                box-shadow var(--duration-micro) var(--ease-default);
  }
  .fab:hover {
    background: var(--accent-hover);
  }
  .fab:active {
    background: var(--accent-active);
    box-shadow: var(--shadow-md);
  }
  .fab:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .fab:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  .fab svg {
    width: 24px;
    height: 24px;
  }

  /* ── Extended FAB (icon + label) ── */
  .fab--extended {
    width: auto;
    padding-inline: var(--space-xl);
    gap: var(--space-sm);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 500;
  }

  /* ── Hide on desktop ── */
  @media (min-width: 768px) {
    .fab { display: none; }
  }
</style>

<!-- Standard FAB -->
<button class="fab" aria-label="Create new project">
  <svg class="lucide" width="24" height="24"><use href="#plus-icon"/></svg>
</button>

<!-- Extended FAB -->
<button class="fab fab--extended" aria-label="Compose message">
  <svg class="lucide" width="24" height="24"><use href="#message-square-icon"/></svg>
  Compose
</button>

<!-- Disabled FAB -->
<button class="fab" aria-label="Create new project" disabled>
  <svg class="lucide" width="24" height="24"><use href="#plus-icon"/></svg>
</button>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use for the single most important action on mobile | Show multiple FABs on one screen |
| Hide on desktop (>= 768px) with `md:hidden` or `@media` | Show FAB on desktop -- use inline primary buttons instead |
| Use gold accent background to signal primary action | Use default/ghost styling -- FAB must stand out |
| Position at `bottom-xl right-xl` consistently | Move FAB to other corners or positions |
| Use a single recognizable icon (Plus, Compose, etc.) | Put complex icons or text-only content in standard FAB |
| Ensure FAB does not cover navigation or critical UI | Let FAB overlap bottom nav bars or input fields |
| Respect `prefers-reduced-motion` for entrance animation | Add bounce/spring animations to FAB |
## Data Display

Components for presenting structured content, metrics, user identity, and read-only information.

---

### 3.3.1 Card

Content container with optional header, body, and footer regions.

**When to use:** Grouping related content into a distinct visual unit -- dashboard widgets, list items, detail previews, stat summaries.

**Anatomy:**

```
+---------------------------------------+
|  [Header]  (optional, border-bottom)  |
|---------------------------------------|
|  [Body]  main content area            |
|---------------------------------------|
|  [Footer]  (optional, border-top)     |
+---------------------------------------+
```

**Variants:**

| Variant | Padding | Behavior | Use case |
|---------|---------|----------|----------|
| Basic | `space-xl` | Static, no interaction | Informational content |
| Interactive | `space-xl` | `cursor-pointer`, hover shadow + border | Clickable list items, links |
| Compact | `space-md` | Static or interactive | Dense layouts, grids |
| Stat/KPI | `space-xl` | Static | Dashboard metric display |

**States:**

| State | Style |
|-------|-------|
| Default | `bg-bg-card`, `border`, `shadow-sm`, `rounded-ds-lg` |
| Hover (interactive) | `shadow-md`, `border-hover`, `transition 150ms ease` |
| Focus-visible (interactive) | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Disabled | `opacity-50`, `pointer-events-none` |

**Accessibility:**
- Interactive cards use `<a>` or `<button>` as the root, or add `role="link"` / `role="button"` with `tabindex="0"`
- If the entire card is clickable, the heading inside should still be a link for screen reader discoverability
- Keyboard: `Enter` activates interactive cards

**Tailwind + React:**

```jsx
{/* Basic Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl">
  <h3 className="text-h3 text-text-primary mb-sm">Card Title</h3>
  <p className="text-body text-text-secondary">
    Card body content goes here.
  </p>
</div>

{/* Interactive Card */}
<a
  href="/detail/123"
  className="block bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl
             transition-all duration-micro ease-default
             hover:shadow-ds-md hover:border-border-hover
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
             cursor-pointer"
>
  <h3 className="text-h3 text-text-primary mb-sm">Clickable Card</h3>
  <p className="text-body text-text-secondary">Click anywhere to navigate.</p>
</a>

{/* Compact Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-md">
  <h3 className="text-label text-text-primary mb-xs">Compact Title</h3>
  <p className="text-caption text-text-secondary">Dense content layout.</p>
</div>

{/* Stat / KPI Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl">
  <p className="text-caption text-text-secondary mb-xs">Total Revenue</p>
  <p className="text-h1 text-text-primary mb-xs">$48,290</p>
  <span className="text-caption text-success flex items-center gap-xs">
    <ArrowUp className="w-4 h-4" /> 12.5%
  </span>
</div>
```

**Plain CSS + HTML:**

```html
<!-- Basic Card -->
<div class="card">
  <h3 class="card__title">Card Title</h3>
  <p class="card__body">Card body content goes here.</p>
</div>

<!-- Interactive Card -->
<a href="/detail/123" class="card card--interactive">
  <h3 class="card__title">Clickable Card</h3>
  <p class="card__body">Click anywhere to navigate.</p>
</a>

<style>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-xl);
}

.card--interactive {
  display: block;
  cursor: pointer;
  transition: box-shadow var(--duration-micro) var(--ease-default),
              border-color var(--duration-micro) var(--ease-default);
  text-decoration: none;
  color: inherit;
}

.card--interactive:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-hover);
}

.card--interactive:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.card--compact {
  padding: var(--space-md);
}

.card__title {
  font-size: var(--text-h3);
  font-weight: var(--weight-h3);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.card__body {
  font-size: var(--text-body);
  color: var(--text-secondary);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `shadow-sm` default, `shadow-md` on hover for interactive | Hardcode `box-shadow` values -- always use tokens |
| Let card background come from `--bg-card` | Use `--bg-primary` or `--bg-surface` for card backgrounds |
| Use `rounded-ds-lg` (12px) for cards | Use `rounded-ds-md` (8px) -- that is for buttons/inputs |
| Wrap entire card in `<a>` if clickable | Add nested links inside a clickable card (nested interactive) |

---

### 3.3.2 Badge / Tag

Small labeling elements for status indicators and content categorization.

**When to use:** Showing status (active, pending, error), categories, counts, or removable filter tags.

**Anatomy:**

```
+--[ optional icon ]--[ label text ]--[ optional remove X ]--+
```

**Variants:**

| Variant | Background | Text | Border | Use case |
|---------|-----------|------|--------|----------|
| Success | `bg-success-muted` | `text-success` | none | Active, online, completed |
| Error | `bg-error-muted` | `text-error` | none | Failed, offline, critical |
| Warning | `bg-warning-muted` | `text-warning` | none | Pending, expiring |
| Info | `bg-info-muted` | `text-info` | none | New, updated |
| Accent | `bg-accent-muted` | `text-accent` | none | Premium, featured |
| Subtle | `bg-bg-elevated` | `text-text-secondary` | none | Category, neutral tag |

**Sizes:**

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 20px | `px-sm` (8px) | `text-overline` |
| `base` | 24px | `px-md` (12px) | `text-caption` |

**States:**

| State | Style |
|-------|-------|
| Default | As defined by variant |
| Hover (removable) | Remove icon `text-text-primary` |
| Focus-visible (removable) | `outline: 2px solid var(--accent)` on remove button |

**Accessibility:**
- Badges are decorative by default -- the parent context conveys meaning
- Removable tags: remove button has `aria-label="Remove {tag name}"` and is focusable
- Do not rely on color alone -- the label text conveys the status

**Tailwind + React:**

```jsx
{/* Status Badge */}
<span className="inline-flex items-center h-6 px-md rounded-ds-full text-caption font-medium
                 bg-success-muted text-success">
  Active
</span>

{/* Small Badge */}
<span className="inline-flex items-center h-5 px-sm rounded-ds-full text-overline
                 bg-error-muted text-error">
  Offline
</span>

{/* Removable Tag */}
<span className="inline-flex items-center gap-xs h-6 px-md rounded-ds-full text-caption
                 bg-bg-elevated text-text-secondary">
  Design
  <button
    aria-label="Remove Design"
    className="w-4 h-4 rounded-ds-full flex items-center justify-center
               text-text-muted hover:text-text-primary
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
  >
    <X className="w-3 h-3" />
  </button>
</span>
```

**Plain CSS + HTML:**

```html
<!-- Status Badge -->
<span class="badge badge--success">Active</span>

<!-- Removable Tag -->
<span class="badge badge--subtle">
  Design
  <button class="badge__remove" aria-label="Remove Design">
    <svg class="badge__remove-icon"><!-- X icon --></svg>
  </button>
</span>

<style>
.badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 var(--space-md);
  border-radius: var(--radius-full);
  font-size: var(--text-caption);
  font-weight: var(--weight-label);
  gap: var(--space-xs);
}

.badge--sm {
  height: 20px;
  padding: 0 var(--space-sm);
  font-size: var(--text-overline);
  text-transform: uppercase;
  letter-spacing: var(--ls-overline);
}

.badge--success {
  background: var(--success-muted);
  color: var(--success);
}

.badge--error {
  background: var(--error-muted);
  color: var(--error);
}

.badge--warning {
  background: var(--warning-muted);
  color: var(--warning);
}

.badge--info {
  background: var(--info-muted);
  color: var(--info);
}

.badge--accent {
  background: var(--accent-muted);
  color: var(--accent);
}

.badge--subtle {
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.badge__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--radius-full);
  color: var(--text-muted);
}

.badge__remove:hover {
  color: var(--text-primary);
}

.badge__remove:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 0;
}

.badge__remove-icon {
  width: 12px;
  height: 12px;
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use semantic muted backgrounds (`bg-success-muted`) | Use full-strength semantic colors as backgrounds |
| Keep badge text short (1-2 words) | Put sentences in badges |
| Use `rounded-ds-full` for pill shape | Use square or slightly rounded badges |
| Pair color with descriptive label text | Rely on color alone to convey status |

---

### 3.3.3 Data Table

Full-featured table for structured data with sorting, selection, and responsive behavior.

**When to use:** Displaying tabular datasets -- user lists, transaction logs, inventory, any multi-column structured data.

**Anatomy:**

```
+--[checkbox]--[Column A (sortable)]--[Column B]--[Column C]--+
|--------------------------------------------------------------|
|  [ ] row 1 data                                              |
|  [ ] row 2 data (hover highlighted)                          |
|  [x] row 3 data (selected)                                   |
|--------------------------------------------------------------|
|  Empty state (when no data)                                   |
+--------------------------------------------------------------+
```

**Variants:**

| Variant | Description |
|---------|-------------|
| Default | Header + rows, no selection |
| Selectable | Checkbox column, bulk selection |
| Striped | Alternating row backgrounds |
| Compact | Reduced row padding |

**States:**

| State | Style |
|-------|-------|
| Header | `bg-bg-secondary`, `text-caption text-text-secondary`, `font-weight-label`, sticky `top-0` |
| Row default | `bg-bg-card`, `border-b border-border` |
| Row hover | `bg-bg-elevated` |
| Row selected | `bg-accent-subtle` |
| Sortable header | Clickable, cycles `asc` / `desc` / `none`, shows sort icon |
| Empty state | Centered icon + message spanning full width |

**Accessibility:**
- Use semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- Sortable headers: `<th>` wraps `<button>` with `aria-sort="ascending"`, `"descending"`, or `"none"`
- Selectable rows: header checkbox controls "select all" with `aria-checked="mixed"` when partial
- Row checkboxes: `aria-label="Select row {identifier}"`
- Responsive: wrap in a container with `overflow-x: auto` and `role="region"` with `aria-label` and `tabindex="0"`

**Tailwind + React:**

```jsx
<div className="overflow-x-auto rounded-ds-lg border border-border" role="region" aria-label="Users table" tabIndex={0}>
  <table className="w-full text-body text-text-primary">
    <thead className="bg-bg-secondary sticky top-0">
      <tr>
        <th className="w-10 p-md">
          <input
            type="checkbox"
            aria-label="Select all rows"
            className="accent-accent"
          />
        </th>
        <th className="text-left text-caption text-text-secondary font-label p-md">
          <button
            className="inline-flex items-center gap-xs hover:text-text-primary"
            aria-sort="ascending"
          >
            Name
            <ArrowUp className="w-3 h-3" />
          </button>
        </th>
        <th className="text-left text-caption text-text-secondary font-label p-md">
          Email
        </th>
        <th className="text-left text-caption text-text-secondary font-label p-md">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-bg-elevated transition-colors duration-micro">
        <td className="p-md">
          <input type="checkbox" aria-label="Select Jane Cooper" className="accent-accent" />
        </td>
        <td className="p-md font-label">Jane Cooper</td>
        <td className="p-md text-text-secondary">jane@example.com</td>
        <td className="p-md">
          <span className="inline-flex items-center h-5 px-sm rounded-ds-full text-overline bg-success-muted text-success">
            Active
          </span>
        </td>
      </tr>
      {/* More rows... */}
    </tbody>
  </table>
</div>

{/* Empty State */}
<div className="overflow-x-auto rounded-ds-lg border border-border">
  <table className="w-full">
    <thead className="bg-bg-secondary">
      <tr>
        <th className="text-left text-caption text-text-secondary font-label p-md">Name</th>
        <th className="text-left text-caption text-text-secondary font-label p-md">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan={2} className="p-3xl text-center">
          <Inbox className="w-12 h-12 text-text-muted mx-auto mb-md" />
          <p className="text-body text-text-secondary">No users found</p>
          <p className="text-caption text-text-tertiary mt-xs">Try adjusting your filters.</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Plain CSS + HTML:**

```html
<div class="table-container" role="region" aria-label="Users table" tabindex="0">
  <table class="data-table">
    <thead>
      <tr>
        <th class="data-table__check-col">
          <input type="checkbox" aria-label="Select all rows" />
        </th>
        <th>
          <button class="data-table__sort-btn" aria-sort="ascending">
            Name <span class="data-table__sort-icon"><!-- arrow icon --></span>
          </button>
        </th>
        <th>Email</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="checkbox" aria-label="Select Jane Cooper" /></td>
        <td class="data-table__name-cell">Jane Cooper</td>
        <td>jane@example.com</td>
        <td><span class="badge badge--success badge--sm">Active</span></td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.table-container {
  overflow-x: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.data-table {
  width: 100%;
  font-size: var(--text-body);
  color: var(--text-primary);
  border-collapse: collapse;
}

.data-table thead {
  background: var(--bg-secondary);
  position: sticky;
  top: 0;
  z-index: 1;
}

.data-table th {
  text-align: left;
  font-size: var(--text-caption);
  font-weight: var(--weight-label);
  color: var(--text-secondary);
  padding: var(--space-md);
}

.data-table td {
  padding: var(--space-md);
}

.data-table tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background var(--duration-micro) var(--ease-default);
}

.data-table tbody tr:hover {
  background: var(--bg-elevated);
}

.data-table tbody tr.selected {
  background: var(--accent-subtle);
}

.data-table__sort-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  padding: 0;
}

.data-table__sort-btn:hover {
  color: var(--text-primary);
}

.data-table__check-col {
  width: 40px;
}

.data-table__name-cell {
  font-weight: var(--weight-label);
}

/* Empty state */
.data-table__empty {
  padding: var(--space-3xl);
  text-align: center;
}

.data-table__empty-icon {
  width: 48px;
  height: 48px;
  color: var(--text-muted);
  margin: 0 auto var(--space-md);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use sticky header for scrollable tables | Let headers scroll out of view |
| Wrap table in `overflow-x-auto` for mobile | Use fixed widths that break on small screens |
| Use `aria-sort` on sortable column headers | Toggle sort visually without ARIA updates |
| Provide an empty state with helpful message | Show a blank table body when no data exists |
| Use semantic `<table>`, `<th>`, `<td>` | Build tables from `<div>` elements |

---

### 3.3.4 Description List

Key-value pair display for detail views and metadata panels.

**When to use:** Showing object properties, profile details, order summaries, configuration settings.

**Anatomy:**

```
Horizontal:
  [Key (right-aligned)] : [Value (left-aligned)]
  [Key]                 : [Value]

Vertical:
  [Key]
  [Value]
  --------
  [Key]
  [Value]
```

**Variants:**

| Variant | Layout | Use case |
|---------|--------|----------|
| Horizontal | Key and value on same row, key right-aligned | Wide panels, sidebars |
| Vertical | Key above value, stacked | Narrow spaces, mobile |
| Divided | Horizontal/vertical with `border-b` between rows | When visual separation helps scanning |

**Accessibility:**
- Use semantic `<dl>`, `<dt>`, `<dd>` elements
- Group related terms with `<div>` wrappers inside `<dl>` for styling
- Screen readers announce term/definition pairs naturally

**Tailwind + React:**

```jsx
{/* Horizontal Description List */}
<dl className="grid grid-cols-[minmax(120px,auto)_1fr] gap-y-md gap-x-xl">
  <dt className="text-body text-text-secondary text-right">Name</dt>
  <dd className="text-body text-text-primary">Jane Cooper</dd>

  <dt className="text-body text-text-secondary text-right">Email</dt>
  <dd className="text-body text-text-primary">jane@example.com</dd>

  <dt className="text-body text-text-secondary text-right">Role</dt>
  <dd className="text-body text-text-primary">Administrator</dd>
</dl>

{/* Vertical Description List with dividers */}
<dl className="divide-y divide-border">
  <div className="py-md">
    <dt className="text-caption text-text-secondary mb-xs">Name</dt>
    <dd className="text-body text-text-primary">Jane Cooper</dd>
  </div>
  <div className="py-md">
    <dt className="text-caption text-text-secondary mb-xs">Email</dt>
    <dd className="text-body text-text-primary">jane@example.com</dd>
  </div>
  <div className="py-md">
    <dt className="text-caption text-text-secondary mb-xs">Role</dt>
    <dd className="text-body text-text-primary">Administrator</dd>
  </div>
</dl>
```

**Plain CSS + HTML:**

```html
<!-- Horizontal -->
<dl class="desc-list desc-list--horizontal">
  <div class="desc-list__row">
    <dt class="desc-list__key">Name</dt>
    <dd class="desc-list__value">Jane Cooper</dd>
  </div>
  <div class="desc-list__row">
    <dt class="desc-list__key">Email</dt>
    <dd class="desc-list__value">jane@example.com</dd>
  </div>
</dl>

<!-- Vertical with dividers -->
<dl class="desc-list desc-list--vertical desc-list--divided">
  <div class="desc-list__row">
    <dt class="desc-list__key">Name</dt>
    <dd class="desc-list__value">Jane Cooper</dd>
  </div>
  <div class="desc-list__row">
    <dt class="desc-list__key">Email</dt>
    <dd class="desc-list__value">jane@example.com</dd>
  </div>
</dl>

<style>
.desc-list {
  margin: 0;
}

.desc-list--horizontal {
  display: grid;
  grid-template-columns: minmax(120px, auto) 1fr;
  gap: var(--space-md) var(--space-xl);
}

.desc-list--horizontal .desc-list__key {
  text-align: right;
  font-size: var(--text-body);
  color: var(--text-secondary);
}

.desc-list--horizontal .desc-list__value {
  font-size: var(--text-body);
  color: var(--text-primary);
}

.desc-list--vertical .desc-list__row {
  padding: var(--space-md) 0;
}

.desc-list--vertical .desc-list__key {
  font-size: var(--text-caption);
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.desc-list--vertical .desc-list__value {
  font-size: var(--text-body);
  color: var(--text-primary);
}

.desc-list--divided .desc-list__row {
  border-bottom: 1px solid var(--border);
}

.desc-list--divided .desc-list__row:last-child {
  border-bottom: none;
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `<dl>`, `<dt>`, `<dd>` semantic elements | Build with generic `<div>` + `<span>` |
| Switch to vertical layout on mobile | Force horizontal layout in narrow containers |
| Right-align keys in horizontal layout for easy scanning | Left-align keys with inconsistent widths |
| Use `text-secondary` for keys, `text-primary` for values | Use the same color for both |

---

### 3.3.5 Accordion / Collapsible

Expandable content sections for progressive disclosure.

**When to use:** FAQ pages, settings groups, long content sections where showing everything at once is overwhelming.

**Anatomy:**

```
+--------------------------------------------+
|  [Chevron]  [Trigger label]                |  <- button
+--------------------------------------------+
|  [Panel content, hidden when collapsed]    |  <- region
+--------------------------------------------+
```

**Variants:**

| Variant | Behavior | Use case |
|---------|----------|----------|
| Single | Standalone collapsible | One-off expandable section |
| Group | Multiple sections stacked | FAQ, settings categories |
| Exclusive | Group where only one can be open | Step wizards, space-constrained layouts |

**States:**

| State | Style |
|-------|-------|
| Collapsed | Chevron points right/down, panel hidden |
| Expanded | Chevron rotated 180deg, panel visible |
| Hover | Trigger `bg-bg-elevated` |
| Focus-visible | Trigger has `outline: 2px solid var(--accent)` |
| Disabled | `opacity-50`, `pointer-events-none` |

**Accessibility:**
- Trigger: `<button>` with `aria-expanded="true|false"` and `aria-controls="{panel-id}"`
- Panel: `role="region"` with `aria-labelledby="{trigger-id}"` and `id="{panel-id}"`
- Keyboard: `Enter` / `Space` toggles the section
- In a group: each trigger is independently focusable via `Tab`
- Chevron rotation: `transform: rotate(180deg)` with `transition: var(--duration-standard)`

**Tailwind + React:**

```jsx
function Accordion({ items, exclusive = false }) {
  const [openIndex, setOpenIndex] = useState(exclusive ? null : new Set());

  const toggle = (index) => {
    if (exclusive) {
      setOpenIndex(openIndex === index ? null : index);
    } else {
      setOpenIndex((prev) => {
        const next = new Set(prev);
        next.has(index) ? next.delete(index) : next.add(index);
        return next;
      });
    }
  };

  const isOpen = (index) =>
    exclusive ? openIndex === index : openIndex.has(index);

  return (
    <div className="divide-y divide-border border border-border rounded-ds-lg overflow-hidden">
      {items.map((item, index) => (
        <div key={index}>
          <button
            id={`accordion-trigger-${index}`}
            aria-expanded={isOpen(index)}
            aria-controls={`accordion-panel-${index}`}
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-lg text-left
                       text-body text-text-primary font-label
                       hover:bg-bg-elevated transition-colors duration-micro
                       focus-visible:outline focus-visible:outline-2
                       focus-visible:outline-accent focus-visible:outline-offset-[-2px]"
          >
            {item.title}
            <ChevronDown
              className={`w-5 h-5 text-text-secondary transition-transform duration-standard
                         ${isOpen(index) ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            id={`accordion-panel-${index}`}
            role="region"
            aria-labelledby={`accordion-trigger-${index}`}
            hidden={!isOpen(index)}
            className="px-lg pb-lg text-body text-text-secondary"
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Plain CSS + HTML:**

```html
<div class="accordion">
  <div class="accordion__item">
    <button
      class="accordion__trigger"
      id="acc-trigger-1"
      aria-expanded="false"
      aria-controls="acc-panel-1"
    >
      <span>How do I get started?</span>
      <svg class="accordion__chevron"><!-- ChevronDown --></svg>
    </button>
    <div
      class="accordion__panel"
      id="acc-panel-1"
      role="region"
      aria-labelledby="acc-trigger-1"
      hidden
    >
      <p>Sign up for an account and follow the onboarding wizard.</p>
    </div>
  </div>
</div>

<style>
.accordion {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.accordion__item {
  border-bottom: 1px solid var(--border);
}

.accordion__item:last-child {
  border-bottom: none;
}

.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-lg);
  background: none;
  border: none;
  font-size: var(--text-body);
  font-weight: var(--weight-label);
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: background var(--duration-micro) var(--ease-default);
}

.accordion__trigger:hover {
  background: var(--bg-elevated);
}

.accordion__trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.accordion__chevron {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  transition: transform var(--duration-standard) var(--ease-default);
}

.accordion__trigger[aria-expanded="true"] .accordion__chevron {
  transform: rotate(180deg);
}

.accordion__panel {
  padding: 0 var(--space-lg) var(--space-lg);
  font-size: var(--text-body);
  color: var(--text-secondary);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `aria-expanded` and `aria-controls` on every trigger | Toggle visibility without ARIA attributes |
| Animate the chevron rotation with `--duration-standard` | Use bounce/spring easing on the icon |
| Allow multiple open in group mode by default | Default to exclusive mode unless space is constrained |
| Use `hidden` attribute on collapsed panels | Use `display:none` via class toggling (breaks accessibility in some edge cases) |

---

### 3.3.6 Activity Feed / Timeline

Chronological list of events connected by a vertical line.

**When to use:** Audit logs, project history, order tracking, change logs.

**Anatomy:**

```
  [date header]
  |
  o---- [icon] [event title]
  |            [event description]
  |            [timestamp]
  |
  o---- [icon] [event title]
  |            [timestamp]
  |
  [date header]
  |
  o---- [icon] [event title]
```

**Variants:**

| Variant | Description |
|---------|-------------|
| Default | Icon node + content + timestamp |
| Compact | Dot node + single-line content + inline timestamp |
| Grouped | Events grouped by date headers |

**Accessibility:**
- Use `<ol>` for ordered events or `<ul>` for unordered
- Each event is an `<li>`
- Date group headers: use a heading level appropriate for the page hierarchy
- Icons are decorative (`aria-hidden="true"`); meaning conveyed by text
- Timestamps use `<time datetime="...">` for machine readability

**Tailwind + React:**

```jsx
<div>
  <h3 className="text-caption text-text-secondary font-label mb-md">Today</h3>
  <ol className="relative ml-4 border-l border-border">
    <li className="mb-xl pl-xl relative">
      {/* Node dot */}
      <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-ds-full bg-success ring-4 ring-bg-card" />
      <div>
        <p className="text-body text-text-primary font-label">Deployment completed</p>
        <p className="text-caption text-text-secondary mt-xs">
          v2.4.1 deployed to production successfully.
        </p>
        <time className="text-caption text-text-tertiary mt-xs block" dateTime="2026-04-06T14:30:00Z">
          2:30 PM
        </time>
      </div>
    </li>
    <li className="mb-xl pl-xl relative">
      <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-ds-full bg-info ring-4 ring-bg-card" />
      <div>
        <p className="text-body text-text-primary font-label">Code review approved</p>
        <time className="text-caption text-text-tertiary mt-xs block" dateTime="2026-04-06T11:00:00Z">
          11:00 AM
        </time>
      </div>
    </li>
  </ol>
</div>
```

**Plain CSS + HTML:**

```html
<div class="timeline">
  <h3 class="timeline__date-header">Today</h3>
  <ol class="timeline__list">
    <li class="timeline__event">
      <span class="timeline__node timeline__node--success" aria-hidden="true"></span>
      <div class="timeline__content">
        <p class="timeline__title">Deployment completed</p>
        <p class="timeline__desc">v2.4.1 deployed to production successfully.</p>
        <time class="timeline__time" datetime="2026-04-06T14:30:00Z">2:30 PM</time>
      </div>
    </li>
    <li class="timeline__event">
      <span class="timeline__node timeline__node--info" aria-hidden="true"></span>
      <div class="timeline__content">
        <p class="timeline__title">Code review approved</p>
        <time class="timeline__time" datetime="2026-04-06T11:00:00Z">11:00 AM</time>
      </div>
    </li>
  </ol>
</div>

<style>
.timeline__date-header {
  font-size: var(--text-caption);
  font-weight: var(--weight-label);
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.timeline__list {
  position: relative;
  margin-left: var(--space-lg);
  border-left: 1px solid var(--border);
  list-style: none;
  padding: 0;
}

.timeline__event {
  position: relative;
  padding-left: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.timeline__node {
  position: absolute;
  left: -5px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  box-shadow: 0 0 0 4px var(--bg-card);
}

.timeline__node--success { background: var(--success); }
.timeline__node--error   { background: var(--error); }
.timeline__node--info    { background: var(--info); }
.timeline__node--warning { background: var(--warning); }
.timeline__node--muted   { background: var(--text-muted); }

.timeline__title {
  font-size: var(--text-body);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}

.timeline__desc {
  font-size: var(--text-caption);
  color: var(--text-secondary);
  margin-top: var(--space-xs);
}

.timeline__time {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
  margin-top: var(--space-xs);
  display: block;
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use semantic `<ol>` / `<ul>` and `<li>` | Build with nested `<div>` elements |
| Use `<time datetime="...">` for timestamps | Use plain text for dates without machine-readable format |
| Mark icon nodes `aria-hidden="true"` | Rely on node color alone to convey event type |
| Group events by date for long feeds | Show hundreds of events without grouping |

---

### 3.3.7 Progress Bar

Visual completion indicator in linear, circular, stepped, and indeterminate forms.

**When to use:** Upload progress, onboarding steps, usage meters, loading states.

**Anatomy:**

```
Linear:   [===========--------] 65%
Ring:     ( circular SVG arc )
Stepped:  [===|===|===|   |   ] Step 3 of 5
```

**Variants:**

| Variant | Description | Fill color |
|---------|-------------|------------|
| Linear | Horizontal bar | `--accent` (single), `--status-N` (multi) |
| Ring / Circle | SVG circular progress | `--accent` |
| Stepped | Segmented bar showing discrete steps | `--accent` per completed step |
| Indeterminate | Animated stripe, no known endpoint | `--accent` |

**States:**

| State | Style |
|-------|-------|
| Track | `bg-bg-elevated`, `rounded-ds-full`, height `8px` (default) or `4px` (slim) |
| Fill | `bg-accent` (or `bg-status-N`), `rounded-ds-full`, `transition: width 300ms ease` |
| Complete | Fill at 100%, optional `bg-success` swap |
| Indeterminate | CSS animation sliding stripe left-to-right |

**Accessibility:**
- Linear / Ring: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label`
- Indeterminate: omit `aria-valuenow`
- Stepped: use `aria-label="Step {current} of {total}"` or equivalent text
- Respect `prefers-reduced-motion`: stop indeterminate animation

**Tailwind + React:**

```jsx
{/* Linear Progress */}
<div className="w-full">
  <div className="flex justify-between mb-xs">
    <span className="text-caption text-text-secondary">Storage</span>
    <span className="text-caption text-text-secondary">65%</span>
  </div>
  <div
    className="h-2 bg-bg-elevated rounded-ds-full overflow-hidden"
    role="progressbar"
    aria-valuenow={65}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label="Storage usage"
  >
    <div
      className="h-full bg-accent rounded-ds-full transition-all duration-emphasis"
      style={{ width: '65%' }}
    />
  </div>
</div>

{/* Stepped Progress */}
<div className="flex gap-sm" aria-label="Step 3 of 5" role="progressbar" aria-valuenow={3} aria-valuemin={1} aria-valuemax={5}>
  {[1, 2, 3, 4, 5].map((step) => (
    <div
      key={step}
      className={`h-2 flex-1 rounded-ds-full ${
        step <= 3 ? 'bg-accent' : 'bg-bg-elevated'
      }`}
    />
  ))}
</div>

{/* Circle / Ring Progress (SVG) */}
<svg className="w-16 h-16" viewBox="0 0 64 64" aria-label="75% complete" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
  <circle cx="32" cy="32" r="28" fill="none" strokeWidth="4" className="stroke-bg-elevated" />
  <circle
    cx="32" cy="32" r="28" fill="none" strokeWidth="4"
    className="stroke-accent"
    strokeLinecap="round"
    strokeDasharray={`${2 * Math.PI * 28}`}
    strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.75)}`}
    transform="rotate(-90 32 32)"
  />
  <text x="32" y="32" textAnchor="middle" dominantBaseline="central" className="text-caption text-text-primary fill-current">
    75%
  </text>
</svg>

{/* Indeterminate */}
<div className="h-2 bg-bg-elevated rounded-ds-full overflow-hidden" role="progressbar" aria-label="Loading">
  <div className="h-full w-1/3 bg-accent rounded-ds-full animate-[indeterminate_1.5s_ease-in-out_infinite]" />
</div>
```

**Plain CSS + HTML:**

```html
<!-- Linear -->
<div class="progress">
  <div class="progress__label">
    <span>Storage</span>
    <span>65%</span>
  </div>
  <div class="progress__track" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="Storage usage">
    <div class="progress__fill" style="width: 65%"></div>
  </div>
</div>

<!-- Indeterminate -->
<div class="progress__track progress__track--indeterminate" role="progressbar" aria-label="Loading">
  <div class="progress__fill progress__fill--indeterminate"></div>
</div>

<style>
.progress__label {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-caption);
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.progress__track {
  height: 8px;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  background: var(--accent);
  border-radius: var(--radius-full);
  transition: width var(--duration-emphasis) var(--ease-default);
}

.progress__fill--indeterminate {
  width: 33%;
  animation: indeterminate 1.5s ease-in-out infinite;
}

@keyframes indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

@media (prefers-reduced-motion: reduce) {
  .progress__fill--indeterminate {
    animation: none;
    width: 100%;
    opacity: 0.5;
  }
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `--accent` for single-metric fills | Use `--accent` for multi-series data fills (use `--status-N`) |
| Use `--bg-elevated` for the track | Use `--border` or a hardcoded gray for the track |
| Include `role="progressbar"` with `aria-valuenow` | Show progress visually without ARIA |
| Respect `prefers-reduced-motion` for animations | Run indeterminate animation unconditionally |

---

### 3.3.8 Stat Card / KPI

Dashboard metric display with large number, label, and trend indicator.

**When to use:** Dashboard summary rows, analytics overview, KPI grids.

**Anatomy:**

```
+-----------------------------------+
|  [Label]         text-caption     |
|  [Large number]  text-h1 / h2    |
|  [Trend arrow + percentage]      |
|  [Optional sparkline]            |
+-----------------------------------+
```

**Variants:**

| Variant | Number size | Padding | Use case |
|---------|------------|---------|----------|
| Default | `text-h1` | `space-xl` | Primary metrics in a grid |
| Compact | `text-h2` | `space-md` | Dense dashboard grids, sidebar stats |

**States:**

| State | Style |
|-------|-------|
| Trend up | `text-success` + `ArrowUp` icon |
| Trend down | `text-error` + `ArrowDown` icon |
| Neutral | `text-text-secondary` + `Minus` icon |

**Accessibility:**
- The card itself has no special role -- it is a static display
- Trend must have text label ("+12.5%") not just an icon
- Sparklines are decorative: `aria-hidden="true"` on the SVG
- Use descriptive headings or `aria-label` on the card container if context is not provided by surrounding content

**Tailwind + React:**

```jsx
{/* Default Stat Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl">
  <p className="text-caption text-text-secondary mb-xs">Total Revenue</p>
  <p className="text-h1 text-text-primary mb-sm">$48,290</p>
  <div className="flex items-center gap-xs">
    <ArrowUp className="w-4 h-4 text-success" />
    <span className="text-caption text-success font-label">+12.5%</span>
    <span className="text-caption text-text-tertiary">vs last month</span>
  </div>
</div>

{/* Compact Stat Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-md">
  <p className="text-caption text-text-secondary mb-xs">Active Users</p>
  <p className="text-h2 text-text-primary mb-xs">1,284</p>
  <div className="flex items-center gap-xs">
    <ArrowDown className="w-4 h-4 text-error" />
    <span className="text-caption text-error font-label">-3.2%</span>
  </div>
</div>

{/* Stat Card with Sparkline */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl relative overflow-hidden">
  <p className="text-caption text-text-secondary mb-xs">Orders</p>
  <p className="text-h1 text-text-primary mb-sm">892</p>
  <div className="flex items-center gap-xs">
    <ArrowUp className="w-4 h-4 text-success" />
    <span className="text-caption text-success font-label">+8.1%</span>
  </div>
  {/* Decorative sparkline */}
  <svg className="absolute bottom-0 left-0 w-full h-12 opacity-20" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 200 50">
    <polyline fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"
      points="0,40 20,35 40,38 60,25 80,30 100,15 120,20 140,10 160,18 180,5 200,12" />
  </svg>
</div>
```

**Plain CSS + HTML:**

```html
<div class="stat-card">
  <p class="stat-card__label">Total Revenue</p>
  <p class="stat-card__value">$48,290</p>
  <div class="stat-card__trend stat-card__trend--up">
    <svg class="stat-card__trend-icon" aria-hidden="true"><!-- ArrowUp --></svg>
    <span>+12.5%</span>
    <span class="stat-card__trend-context">vs last month</span>
  </div>
</div>

<style>
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-xl);
}

.stat-card--compact {
  padding: var(--space-md);
}

.stat-card__label {
  font-size: var(--text-caption);
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.stat-card__value {
  font-size: var(--text-h1);
  font-weight: var(--weight-h1);
  letter-spacing: var(--ls-h1);
  line-height: var(--lh-h1);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.stat-card--compact .stat-card__value {
  font-size: var(--text-h2);
  font-weight: var(--weight-h2);
  margin-bottom: var(--space-xs);
}

.stat-card__trend {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-caption);
  font-weight: var(--weight-label);
}

.stat-card__trend--up   { color: var(--success); }
.stat-card__trend--down { color: var(--error); }

.stat-card__trend-icon {
  width: 16px;
  height: 16px;
}

.stat-card__trend-context {
  color: var(--text-tertiary);
  font-weight: var(--weight-caption);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `text-h1` for primary stats, `text-h2` for compact | Use arbitrary font sizes for stat numbers |
| Pair trend arrow with a text percentage | Show only a colored arrow with no number |
| Mark sparklines `aria-hidden="true"` | Leave sparkline SVGs discoverable to screen readers |
| Use `text-success` / `text-error` for trends | Use accent color for trend indicators |

---

### 3.3.9 Avatar

User representation as image, initials, or group.

**When to use:** User profiles, comment authors, assignee indicators, team member lists.

**Anatomy:**

```
Image:     [rounded image with alt text]
Initials:  [colored circle with 1-2 letters]
With dot:  [avatar] + [status dot at bottom-right]
Group:     [avatar][avatar][avatar][+N]
```

**Sizes:**

| Size | Dimension | Tailwind width | Use case |
|------|-----------|----------------|----------|
| `xs` | 24px | `w-6 h-6` | Inline mentions, compact lists |
| `sm` | 32px | `w-8 h-8` | Comment threads, table cells |
| `md` | 40px | `w-10 h-10` | Cards, default size |
| `lg` | 56px | `w-14 h-14` | Profile headers, hero sections |

**Status dot colors:**

| Status | Color |
|--------|-------|
| Online | `bg-success` |
| Away | `bg-warning` |
| Busy | `bg-error` |
| Offline | `bg-text-muted` |

**Accessibility:**
- Image avatars: `alt="User Name"` (always include the user's name)
- Initials fallback: `aria-label="User Name"` on the container
- Status dot: `aria-label` on the dot or visually hidden text (e.g., "Online")
- Avatar groups: announce total count (e.g., "+3 more" must be accessible text, not just visual)
- Decorative context (e.g., avatar next to the user's name text): `alt=""` or `aria-hidden="true"`

**Tailwind + React:**

```jsx
{/* Image Avatar - Medium */}
<img
  src="/avatars/jane.jpg"
  alt="Jane Cooper"
  className="w-10 h-10 rounded-ds-full object-cover"
/>

{/* Initials Fallback - Medium */}
<div
  className="w-10 h-10 rounded-ds-full bg-accent flex items-center justify-center"
  aria-label="Jane Cooper"
>
  <span className="text-label text-text-on-accent">JC</span>
</div>

{/* Avatar with Status Dot */}
<div className="relative inline-block">
  <img
    src="/avatars/jane.jpg"
    alt="Jane Cooper"
    className="w-10 h-10 rounded-ds-full object-cover"
  />
  <span
    className="absolute bottom-0 right-0 w-3 h-3 rounded-ds-full bg-success ring-2 ring-bg-card"
    aria-label="Online"
  />
</div>

{/* Avatar Group */}
<div className="flex -space-x-2" aria-label="Team members">
  <img src="/avatars/jane.jpg" alt="Jane Cooper" className="w-8 h-8 rounded-ds-full object-cover ring-2 ring-bg-card" />
  <img src="/avatars/bob.jpg" alt="Bob Smith" className="w-8 h-8 rounded-ds-full object-cover ring-2 ring-bg-card" />
  <img src="/avatars/alex.jpg" alt="Alex Doe" className="w-8 h-8 rounded-ds-full object-cover ring-2 ring-bg-card" />
  <div className="w-8 h-8 rounded-ds-full bg-bg-elevated flex items-center justify-center ring-2 ring-bg-card">
    <span className="text-overline text-text-secondary">+3</span>
  </div>
</div>
```

**Plain CSS + HTML:**

```html
<!-- Image Avatar -->
<img class="avatar avatar--md" src="/avatars/jane.jpg" alt="Jane Cooper" />

<!-- Initials Fallback -->
<div class="avatar avatar--md avatar--initials" aria-label="Jane Cooper">
  <span>JC</span>
</div>

<!-- Avatar with Status -->
<div class="avatar-wrapper">
  <img class="avatar avatar--md" src="/avatars/jane.jpg" alt="Jane Cooper" />
  <span class="avatar__status avatar__status--online" aria-label="Online"></span>
</div>

<!-- Avatar Group -->
<div class="avatar-group" aria-label="Team members">
  <img class="avatar avatar--sm" src="/avatars/jane.jpg" alt="Jane Cooper" />
  <img class="avatar avatar--sm" src="/avatars/bob.jpg" alt="Bob Smith" />
  <div class="avatar avatar--sm avatar--overflow">
    <span>+3</span>
  </div>
</div>

<style>
.avatar {
  border-radius: var(--radius-full);
  object-fit: cover;
  display: inline-block;
}

.avatar--xs { width: 24px; height: 24px; }
.avatar--sm { width: 32px; height: 32px; }
.avatar--md { width: 40px; height: 40px; }
.avatar--lg { width: 56px; height: 56px; }

.avatar--initials {
  background: var(--accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-accent);
  font-size: var(--text-label);
  font-weight: var(--weight-label);
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  box-shadow: 0 0 0 2px var(--bg-card);
}

.avatar__status--online  { background: var(--success); }
.avatar__status--away    { background: var(--warning); }
.avatar__status--busy    { background: var(--error); }
.avatar__status--offline { background: var(--text-muted); }

.avatar-group {
  display: flex;
}

.avatar-group .avatar {
  margin-left: -8px;
  box-shadow: 0 0 0 2px var(--bg-card);
}

.avatar-group .avatar:first-child {
  margin-left: 0;
}

.avatar--overflow {
  background: var(--bg-elevated);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-overline);
  font-weight: var(--weight-overline);
  text-transform: uppercase;
  letter-spacing: var(--ls-overline);
  color: var(--text-secondary);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Always include `alt` text with the user's name | Use empty `alt` unless avatar is decorative (name already shown as text) |
| Use `bg-accent text-text-on-accent` for initials | Use random or hardcoded background colors for initials |
| Use `ring-2 ring-bg-card` on status dots and group items | Let status dots blend into the avatar edge |
| Size consistently: `xs` 24, `sm` 32, `md` 40, `lg` 56 | Use arbitrary avatar sizes outside the scale |

---

### 3.3.10 Code Block / KBD

Display code snippets, inline code, and keyboard shortcut indicators.

**When to use:** Documentation, changelogs, settings pages showing keyboard shortcuts, API references, configuration displays.

**Anatomy:**

```
Code block:   +--- header (optional: language label + copy button) ---+
              |  line 1                                               |
              |  line 2                                               |
              +-------------------------------------------------------+

Inline code:  Text with `inline code` in a sentence.

KBD:          Press [Ctrl] + [K] to open command palette.
```

**Variants:**

| Variant | Style | Use case |
|---------|-------|----------|
| Code block | `bg-bg-secondary`, `border`, monospace, optional line numbers | Multi-line code |
| Inline code | `bg-bg-elevated`, `px-xs`, `rounded-sm`, monospace | Code in body text |
| KBD | `bg-bg-elevated`, `border`, `border-b-2`, `rounded-sm`, `text-caption` | Keyboard shortcuts |

**States:**

| State | Style |
|-------|-------|
| Default | As defined by variant |
| Copy button hover | `bg-bg-elevated`, `text-text-primary` |
| Copy button active | Brief "Copied!" text swap |

**Accessibility:**
- Code blocks: use `<pre><code>` semantic elements
- If syntax-highlighted, add `aria-label="Code example"` or a heading before the block
- KBD: use `<kbd>` semantic element; screen readers announce it as keyboard input
- Copy button: `aria-label="Copy code to clipboard"`, announce success with `aria-live="polite"` region

**Tailwind + React:**

```jsx
{/* Code Block */}
<div className="rounded-ds-lg border border-border overflow-hidden">
  <div className="flex items-center justify-between px-lg py-sm bg-bg-elevated border-b border-border">
    <span className="text-caption text-text-tertiary">jsx</span>
    <button
      className="text-caption text-text-secondary hover:text-text-primary
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent
                 flex items-center gap-xs"
      aria-label="Copy code to clipboard"
      onClick={handleCopy}
    >
      <Copy className="w-4 h-4" />
      Copy
    </button>
  </div>
  <pre className="bg-bg-secondary p-lg overflow-x-auto">
    <code className="text-body font-mono text-text-primary">
{`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
    </code>
  </pre>
</div>

{/* Inline Code */}
<p className="text-body text-text-primary">
  Use the <code className="bg-bg-elevated text-text-primary px-xs py-[1px] rounded-ds-sm text-[0.8125rem] font-mono">useState</code> hook for local state.
</p>

{/* Keyboard Shortcut */}
<p className="text-body text-text-secondary">
  Press{' '}
  <kbd className="bg-bg-elevated border border-border border-b-2 rounded-ds-sm px-sm py-[1px] text-caption font-mono text-text-primary">Ctrl</kbd>
  {' + '}
  <kbd className="bg-bg-elevated border border-border border-b-2 rounded-ds-sm px-sm py-[1px] text-caption font-mono text-text-primary">K</kbd>
  {' '}to open the command palette.
</p>
```

**Plain CSS + HTML:**

```html
<!-- Code Block -->
<div class="code-block">
  <div class="code-block__header">
    <span class="code-block__lang">jsx</span>
    <button class="code-block__copy" aria-label="Copy code to clipboard">
      <svg class="code-block__copy-icon"><!-- Copy icon --></svg>
      Copy
    </button>
  </div>
  <pre class="code-block__pre"><code class="code-block__code">function greet(name) {
  return `Hello, ${name}!`;
}</code></pre>
</div>

<!-- Inline Code -->
<p>Use the <code class="inline-code">useState</code> hook for local state.</p>

<!-- Keyboard Shortcut -->
<p>Press <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">K</kbd> to open the command palette.</p>

<style>
.code-block {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  overflow: hidden;
}

.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-lg);
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}

.code-block__lang {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}

.code-block__copy {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-caption);
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.code-block__copy:hover {
  color: var(--text-primary);
}

.code-block__copy:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.code-block__copy-icon {
  width: 16px;
  height: 16px;
}

.code-block__pre {
  background: var(--bg-secondary);
  padding: var(--space-lg);
  overflow-x: auto;
  margin: 0;
}

.code-block__code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: var(--text-body);
  color: var(--text-primary);
  line-height: var(--lh-body);
}

/* Inline Code */
.inline-code {
  background: var(--bg-elevated);
  color: var(--text-primary);
  padding: 1px var(--space-xs);
  border-radius: var(--radius-sm);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.8125rem;
}

/* Keyboard Key */
.kbd {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: var(--radius-sm);
  padding: 1px var(--space-sm);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: var(--text-caption);
  color: var(--text-primary);
  white-space: nowrap;
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `<pre><code>` for code blocks | Use `<div>` with `white-space: pre` |
| Use `<kbd>` for keyboard shortcut keys | Use `<span>` styled to look like keys |
| Use `bg-bg-secondary` for code block background | Hardcode a dark background that breaks in light theme |
| Provide a copy button with `aria-label` | Require users to manually select and copy code |
| Use monospace font-family stack | Use the body `Inter` font for code |
| Use `border-b-2` on `<kbd>` for the pressed-key depth effect | Use box-shadow for the key depth (harder to theme) |
## Navigation

This section covers all navigation patterns. Every pattern supports both dark and light themes automatically through CSS custom properties. All examples use design system tokens exclusively -- no hardcoded values.

---

### 4.1 Sidebar Navigation

**When to use.** Dashboard apps with 7+ routes, grouped navigation, workspace-style apps. Use instead of top navigation when the app has deep hierarchies or section groups.

**Anatomy.**

| Part | Role |
|------|------|
| Container | `<nav>` landmark, fixed left, holds all sidebar content |
| Logo / brand | Top area, links to home/dashboard |
| Section label | `text-overline text-tertiary` uppercase group heading |
| Nav item | Icon + label row, triggers route change |
| Active indicator | Left border accent + muted background |
| Collapse toggle | Bottom button, switches between expanded and collapsed |
| Mobile drawer | Off-canvas panel from left with overlay backdrop |

**Variants.**

| Variant | Width | Content | Use |
|---------|-------|---------|-----|
| Expanded | 240px | Icon + label | Default on desktop (>= 768px) |
| Collapsed | 64px | Icon only, tooltip on hover | Compact mode, user toggle |
| Mobile drawer | 280px | Full expanded layout over overlay | Below 768px breakpoint |

**States.**

| State | Styles |
|-------|--------|
| Default | `text-text-secondary`, transparent background |
| Hover | `bg-bg-elevated`, `text-text-primary` |
| Active / current | `bg-accent-muted`, `text-accent`, `border-left: 2px solid var(--accent)` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Disabled | `text-text-muted`, `pointer-events: none`, `opacity: 0.5` |

**Accessibility.**

- Container: `<nav aria-label="Main navigation">`
- Active item: `aria-current="page"`
- Collapse toggle: `aria-expanded="true|false"`, `aria-label="Toggle sidebar"`
- Mobile drawer: `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`
- Mobile overlay: click or `Escape` closes drawer
- Focus trap inside mobile drawer when open
- All items reachable via `Tab`; `Enter` or `Space` activates

**Tailwind + React example.**

```jsx
import { Home, Users, Settings, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navSections = [
  {
    label: 'Main',
    items: [
      { icon: Home, label: 'Dashboard', href: '/dashboard', current: true },
      { icon: Users, label: 'Members', href: '/members', current: false },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: Settings, label: 'Settings', href: '/settings', current: false },
    ],
  },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      {navSections.map((section) => (
        <div key={section.label} className="mb-lg">
          {!collapsed && (
            <span className="block px-lg mb-sm text-overline text-text-tertiary">
              {section.label}
            </span>
          )}
          <ul className="space-y-xs">
            {section.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={`
                    flex items-center gap-md px-lg py-sm rounded-ds-md
                    transition-colors duration-micro ease-default
                    ${item.current
                      ? 'bg-accent-muted text-accent border-l-2 border-accent'
                      : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="text-label">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="Main navigation"
        className={`
          hidden md:flex flex-col fixed top-0 left-0 h-screen
          bg-bg-secondary border-r border-border
          transition-all duration-standard ease-default
          ${collapsed ? 'w-[64px]' : 'w-[240px]'}
        `}
      >
        <div className="flex-1 overflow-y-auto py-xl">
          {sidebarContent}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          aria-label="Toggle sidebar"
          className="
            flex items-center justify-center p-lg
            border-t border-border text-text-secondary
            hover:bg-bg-elevated hover:text-text-primary
            transition-colors duration-micro ease-default
          "
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile hamburger trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        className="md:hidden fixed top-lg left-lg z-sticky p-sm rounded-ds-md bg-bg-card shadow-ds-sm"
      >
        <Menu className="w-5 h-5 text-text-primary" />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-drawer">
          <div
            className="absolute inset-0 bg-bg-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="
              relative w-[280px] h-full bg-bg-secondary
              animate-[slide-in-left_300ms_ease]
            "
          >
            <div className="flex items-center justify-between p-lg border-b border-border">
              <span className="text-h4 text-text-primary font-semibold">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="p-xs rounded-ds-sm hover:bg-bg-elevated"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            <div className="py-xl overflow-y-auto">{sidebarContent}</div>
          </nav>
        </div>
      )}
    </>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    transition: width var(--duration-standard) var(--ease-default);
    z-index: var(--z-sticky);
  }

  .sidebar.collapsed {
    width: 64px;
  }

  .sidebar-section-label {
    display: block;
    padding: 0 var(--space-lg);
    margin-bottom: var(--space-sm);
    font-size: var(--text-overline);
    font-weight: var(--weight-overline);
    letter-spacing: var(--ls-overline);
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .sidebar.collapsed .sidebar-section-label {
    display: none;
  }

  .sidebar-nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    text-decoration: none;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }

  .sidebar-nav-item:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
  }

  .sidebar-nav-item[aria-current="page"] {
    background: var(--accent-muted);
    color: var(--accent);
    border-left: 2px solid var(--accent);
  }

  .sidebar-nav-item:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
    border: none;
    border-top: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default);
  }

  .sidebar-toggle:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
  }

  .sidebar.collapsed .sidebar-nav-label {
    display: none;
  }

  @media (max-width: 767px) {
    .sidebar {
      display: none;
    }
  }
</style>

<nav aria-label="Main navigation" class="sidebar">
  <div style="flex: 1; overflow-y: auto; padding: var(--space-xl) 0;">
    <span class="sidebar-section-label">Main</span>
    <ul style="list-style: none; margin-bottom: var(--space-lg);">
      <li>
        <a href="/dashboard" class="sidebar-nav-item" aria-current="page">
          <!-- icon svg w=20 h=20 -->
          <span class="sidebar-nav-label">Dashboard</span>
        </a>
      </li>
      <li>
        <a href="/members" class="sidebar-nav-item">
          <!-- icon svg w=20 h=20 -->
          <span class="sidebar-nav-label">Members</span>
        </a>
      </li>
    </ul>
    <span class="sidebar-section-label">System</span>
    <ul style="list-style: none;">
      <li>
        <a href="/settings" class="sidebar-nav-item">
          <!-- icon svg w=20 h=20 -->
          <span class="sidebar-nav-label">Settings</span>
        </a>
      </li>
    </ul>
  </div>
  <button class="sidebar-toggle" aria-expanded="true" aria-label="Toggle sidebar">
    <!-- chevron icon svg w=20 h=20 -->
  </button>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use `<nav>` with `aria-label` | Use `<div>` without landmark role |
| Mark active item with `aria-current="page"` | Rely on visual style alone to indicate current page |
| Transition width with `duration-standard` | Use instant width change or slow animation (> 300ms) |
| Provide mobile drawer with overlay + close button | Hide navigation entirely on mobile with no alternative |
| Use `text-overline` for section group labels | Use body text size for section labels |
| Collapse to 64px with icons only | Collapse to 0px, hiding all navigation |

---

### 4.2 Top Navigation

**When to use.** Public pages, marketing sites, simpler apps with 6 or fewer routes. Prefer over sidebar when the app has a flat hierarchy and few top-level destinations.

**Anatomy.**

| Part | Role |
|------|------|
| Container | `<nav>` landmark, fixed top, full-width bar |
| Logo | Left-aligned, links to home |
| Nav links | Center or left-aligned horizontal link list |
| Action area | Right-aligned buttons/icons (search, notifications, avatar) |
| Mobile menu | Hamburger trigger that opens a dropdown or drawer |

**Variants.**

| Variant | Layout | Use |
|---------|--------|-----|
| Centered links | Logo left, links centered, actions right | Marketing / landing pages |
| Left-aligned links | Logo + links left, actions right | Product apps with few routes |
| Transparent | No background, blends with hero | Landing page hero sections |

**States.**

| State | Styles |
|-------|--------|
| Default link | `text-text-secondary` |
| Hover link | `text-text-primary` |
| Active link | `text-accent`, `border-bottom: 2px solid var(--accent)` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |

**Accessibility.**

- Container: `<nav aria-label="Main navigation">`
- Active link: `aria-current="page"`
- Mobile hamburger: `aria-expanded="true|false"`, `aria-controls` pointing to menu ID, `aria-label="Toggle menu"`
- Mobile menu: can be dropdown (`role="menu"`) or drawer (`role="dialog"`)
- `Escape` closes mobile menu
- All links keyboard-reachable via `Tab`

**Tailwind + React example.**

```jsx
import { Search, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { label: 'Dashboard', href: '/dashboard', current: true },
  { label: 'Projects', href: '/projects', current: false },
  { label: 'Reports', href: '/reports', current: false },
];

function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className="
        fixed top-0 left-0 right-0 z-sticky h-[56px]
        bg-bg-card border-b border-border
        flex items-center px-xl
      "
    >
      {/* Logo */}
      <a href="/" className="text-h4 font-semibold text-text-primary mr-3xl">
        AppName
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-xl">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={link.current ? 'page' : undefined}
              className={`
                inline-flex items-center h-[56px] text-label
                border-b-2 transition-colors duration-micro ease-default
                ${link.current
                  ? 'text-accent border-accent'
                  : 'text-text-secondary border-transparent hover:text-text-primary'
                }
              `}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Action icons */}
      <div className="hidden md:flex items-center gap-sm">
        <button aria-label="Search" className="p-sm rounded-ds-md hover:bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors duration-micro">
          <Search className="w-5 h-5" />
        </button>
        <button aria-label="Notifications" className="p-sm rounded-ds-md hover:bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors duration-micro">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-menu"
        aria-label="Toggle menu"
        className="md:hidden p-sm rounded-ds-md hover:bg-bg-elevated text-text-secondary"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul
          id="mobile-nav-menu"
          className="
            md:hidden absolute top-[56px] left-0 right-0
            bg-bg-card border-b border-border shadow-ds-md
            py-sm
          "
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={link.current ? 'page' : undefined}
                className={`
                  block px-xl py-md text-label
                  ${link.current
                    ? 'text-accent bg-accent-muted'
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                  }
                `}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .topnav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-sticky);
    height: 56px;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 var(--space-xl);
  }

  .topnav-logo {
    font-size: var(--text-h4);
    font-weight: var(--weight-h4);
    color: var(--text-primary);
    text-decoration: none;
    margin-right: var(--space-3xl);
  }

  .topnav-links {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
    list-style: none;
  }

  .topnav-link {
    display: inline-flex;
    align-items: center;
    height: 56px;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: color var(--duration-micro) var(--ease-default),
                border-color var(--duration-micro) var(--ease-default);
  }

  .topnav-link:hover {
    color: var(--text-primary);
  }

  .topnav-link[aria-current="page"] {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .topnav-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .topnav-hamburger {
    display: none;
  }

  @media (max-width: 767px) {
    .topnav-links {
      display: none;
    }

    .topnav-hamburger {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-sm);
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      border-radius: var(--radius-md);
    }

    .topnav-hamburger:hover {
      background: var(--bg-elevated);
    }
  }
</style>

<nav aria-label="Main navigation" class="topnav">
  <a href="/" class="topnav-logo">AppName</a>
  <ul class="topnav-links">
    <li><a href="/dashboard" class="topnav-link" aria-current="page">Dashboard</a></li>
    <li><a href="/projects" class="topnav-link">Projects</a></li>
    <li><a href="/reports" class="topnav-link">Reports</a></li>
  </ul>
  <div style="flex: 1;"></div>
  <button class="topnav-hamburger" aria-expanded="false" aria-label="Toggle menu">
    <!-- Menu icon svg w=20 h=20 -->
  </button>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Fix to top with `z-sticky` (100) | Use `z-modal` or other inappropriate z-index |
| Keep height at 56px | Make the bar taller than 64px |
| Use `border-b-2 border-accent` for active link | Use background fill for active top nav links |
| Collapse to hamburger below 768px | Overflow links horizontally on mobile |
| Pair with `<main>` that has `padding-top: 56px` | Forget to offset page content for fixed nav |
| Use `aria-current="page"` on the active link | Mark multiple links as current simultaneously |

---

### 4.3 Breadcrumbs

**When to use.** Any page deeper than the second level of the navigation hierarchy. Shows the user where they are and provides quick access to parent routes. Always pair with a sidebar or top nav -- breadcrumbs supplement, never replace, primary navigation.

**Anatomy.**

| Part | Role |
|------|------|
| Container | `<nav>` landmark wrapping an `<ol>` |
| Breadcrumb item | Link to ancestor page |
| Separator | `/` character or chevron icon between items |
| Current page | Final item, plain text (not a link) |
| Overflow trigger | `...` button that opens a dropdown of hidden middle items |

**Variants.**

| Variant | Separator | Use |
|---------|-----------|-----|
| Slash | `/` character | Default, most compact |
| Chevron | `ChevronRight` icon | Visually richer, matches icon-heavy UIs |

**Truncation rule.** When there are more than 4 breadcrumb items, collapse the middle items into a single `...` dropdown. Always show the first item (root) and the last two items (parent + current).

**States.**

| State | Styles |
|-------|--------|
| Link (ancestor) | `text-text-secondary`, underline on hover |
| Current page | `text-text-primary`, no link, `font-weight: 500` |
| Hover (link) | `text-text-primary` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |

**Accessibility.**

- Container: `<nav aria-label="Breadcrumb">`
- List: `<ol>` (ordered list, represents hierarchy)
- Current page item: `aria-current="page"`
- Separators: decorative only, hidden from screen readers with `aria-hidden="true"`
- Overflow dropdown: `aria-label="Show more breadcrumbs"`, `aria-expanded`

**Tailwind + React example.**

```jsx
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

function Breadcrumbs({ items }) {
  const [showOverflow, setShowOverflow] = useState(false);

  const shouldTruncate = items.length > 4;
  const first = items[0];
  const middle = shouldTruncate ? items.slice(1, -2) : [];
  const visible = shouldTruncate
    ? [first, ...items.slice(-2)]
    : items;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-sm text-label">
        {visible.map((item, i) => {
          const isLast = shouldTruncate
            ? i === visible.length - 1
            : i === items.length - 1;

          return (
            <li key={item.href || item.label} className="flex items-center gap-sm">
              {/* Insert overflow trigger after first item */}
              {shouldTruncate && i === 1 && (
                <>
                  <div className="relative">
                    <button
                      onClick={() => setShowOverflow(!showOverflow)}
                      aria-label="Show more breadcrumbs"
                      aria-expanded={showOverflow}
                      className="p-xs rounded-ds-sm text-text-tertiary hover:text-text-primary hover:bg-bg-elevated"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {showOverflow && (
                      <ul className="absolute top-full left-0 mt-xs bg-bg-card border border-border rounded-ds-md shadow-ds-md py-xs min-w-[160px] z-dropdown">
                        {middle.map((m) => (
                          <li key={m.href}>
                            <a
                              href={m.href}
                              className="block px-md py-xs text-label text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                            >
                              {m.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted" aria-hidden="true" />
                </>
              )}

              {isLast ? (
                <span className="text-text-primary font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="text-text-secondary hover:text-text-primary transition-colors duration-micro">
                  {item.label}
                </a>
              )}

              {!isLast && (
                <ChevronRight className="w-4 h-4 text-text-muted" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--text-label);
    font-weight: var(--weight-label);
  }

  .breadcrumbs ol {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    list-style: none;
  }

  .breadcrumbs li {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .breadcrumb-link {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--duration-micro) var(--ease-default);
  }

  .breadcrumb-link:hover {
    color: var(--text-primary);
  }

  .breadcrumb-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  .breadcrumb-current {
    color: var(--text-primary);
    font-weight: var(--weight-label);
  }

  .breadcrumb-separator {
    color: var(--text-muted);
    user-select: none;
  }
</style>

<nav aria-label="Breadcrumb">
  <ol class="breadcrumbs">
    <li>
      <a href="/home" class="breadcrumb-link">Home</a>
      <span class="breadcrumb-separator" aria-hidden="true">/</span>
    </li>
    <li>
      <a href="/projects" class="breadcrumb-link">Projects</a>
      <span class="breadcrumb-separator" aria-hidden="true">/</span>
    </li>
    <li>
      <span class="breadcrumb-current" aria-current="page">Project Alpha</span>
    </li>
  </ol>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use `<nav aria-label="Breadcrumb">` with `<ol>` | Use `<div>` with `<span>` items |
| Make current page plain text, not a link | Link the current page to itself |
| Hide separators from screen readers with `aria-hidden` | Let screen readers announce every `/` character |
| Truncate middle items when > 4 levels | Show 8+ breadcrumb items in a single row |
| Place breadcrumbs below the top nav, above page content | Put breadcrumbs inside the sidebar |

---

### 4.4 Tabs

**When to use.** Switching between related views within the same context. Content in each panel should be peers -- not steps in a sequence (use Stepper for that).

**Anatomy.**

| Part | Role |
|------|------|
| Tab list | `role="tablist"` container with `aria-label` |
| Tab | `role="tab"` button, controls one panel |
| Tab panel | `role="tabpanel"` content area, shown when its tab is active |
| Active indicator | Underline border or pill background on the selected tab |

**Variants.**

| Variant | Active indicator | Use |
|---------|-----------------|-----|
| Underline | `border-bottom: 2px solid var(--accent)` + `text-accent` | Section switching within a page |
| Pill | `bg-accent text-text-on-accent rounded-ds-full` | View toggling (grid/list, day/week/month) |
| Vertical | `border-left: 2px solid var(--accent)` + `bg-accent-muted` | Settings pages, side panel navigation |

**States.**

| State | Underline variant | Pill variant |
|-------|-------------------|--------------|
| Default | `text-text-secondary`, transparent border | `text-text-secondary`, transparent bg |
| Hover | `text-text-primary` | `text-text-primary`, `bg-bg-elevated` |
| Selected | `text-accent`, `border-accent` | `bg-accent`, `text-text-on-accent` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` | Same |
| Disabled | `text-text-muted`, `pointer-events: none` | Same |

**Accessibility.**

- Tab list: `role="tablist"`, `aria-label` describing the tab group
- Each tab: `role="tab"`, `aria-selected="true|false"`, `aria-controls="panel-id"`, `tabindex="0"` on selected / `tabindex="-1"` on others
- Each panel: `role="tabpanel"`, `aria-labelledby="tab-id"`, `tabindex="0"`
- Keyboard: Left/Right arrows switch tabs (horizontal), Up/Down for vertical, `Home`/`End` for first/last
- Only the selected tab is in the tab order; arrow keys move between tabs (roving tabindex)

**Tailwind + React example.**

```jsx
import { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
];

function UnderlineTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleKeyDown = (e, index) => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActiveTab(tabs[next].id);
  };

  return (
    <div>
      <div role="tablist" aria-label="Content sections" className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`
              px-lg py-md text-label border-b-2 -mb-px
              transition-colors duration-micro ease-default
              ${activeTab === tab.id
                ? 'text-accent border-accent'
                : 'text-text-secondary border-transparent hover:text-text-primary'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={activeTab !== tab.id}
          className="p-xl"
        >
          {/* Panel content for {tab.label} */}
          <p className="text-body text-text-primary">Content for {tab.label} tab.</p>
        </div>
      ))}
    </div>
  );
}

function PillTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleKeyDown = (e, index) => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActiveTab(tabs[next].id);
  };

  return (
    <div role="tablist" aria-label="View options" className="inline-flex gap-xs bg-bg-elevated rounded-ds-full p-2xs">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          role="tab"
          id={`pill-tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`pill-panel-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={() => setActiveTab(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`
            px-lg py-xs text-label rounded-ds-full
            transition-all duration-micro ease-default
            ${activeTab === tab.id
              ? 'bg-accent text-text-on-accent shadow-ds-sm'
              : 'text-text-secondary hover:text-text-primary'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  /* Underline tabs */
  .tab-list {
    display: flex;
    border-bottom: 1px solid var(--border);
  }

  .tab-button {
    padding: var(--space-md) var(--space-lg);
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    cursor: pointer;
    transition: color var(--duration-micro) var(--ease-default),
                border-color var(--duration-micro) var(--ease-default);
  }

  .tab-button:hover {
    color: var(--text-primary);
  }

  .tab-button[aria-selected="true"] {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .tab-button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  .tab-panel {
    padding: var(--space-xl);
  }

  .tab-panel[hidden] {
    display: none;
  }

  /* Pill tabs */
  .tab-list-pill {
    display: inline-flex;
    gap: var(--space-xs);
    background: var(--bg-elevated);
    border-radius: var(--radius-full);
    padding: var(--space-2xs);
  }

  .tab-pill {
    padding: var(--space-xs) var(--space-lg);
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    background: none;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all var(--duration-micro) var(--ease-default);
  }

  .tab-pill:hover {
    color: var(--text-primary);
  }

  .tab-pill[aria-selected="true"] {
    background: var(--accent);
    color: var(--text-on-accent);
    box-shadow: var(--shadow-sm);
  }
</style>

<!-- Underline tabs -->
<div role="tablist" aria-label="Content sections" class="tab-list">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1" tabindex="0" class="tab-button">Overview</button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1" class="tab-button">Activity</button>
  <button role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3" tabindex="-1" class="tab-button">Settings</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0" class="tab-panel">
  <p>Overview content.</p>
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" class="tab-panel" hidden>
  <p>Activity content.</p>
</div>
<div role="tabpanel" id="panel-3" aria-labelledby="tab-3" tabindex="0" class="tab-panel" hidden>
  <p>Settings content.</p>
</div>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use roving `tabindex` (0 on selected, -1 on others) | Put all tabs in the Tab order |
| Connect tabs to panels with `aria-controls` / `aria-labelledby` | Leave tabs and panels unlinked |
| Use arrow keys to switch between tabs | Require Tab key to move between tabs |
| Show only one panel at a time | Render all panels visible with accordion-style toggle |
| Use underline for section switching, pill for view toggling | Mix variants within the same tab group |

---

### 4.5 Pagination

**When to use.** Navigating through pages of list or table data. Use full numbered pagination for datasets where the user benefits from jumping to a specific page. Use compact pagination for simpler "next/previous" flows.

**Anatomy.**

| Part | Role |
|------|------|
| Container | `<nav>` landmark with `aria-label="Pagination"` |
| Previous button | Navigates to the previous page |
| Page numbers | Direct links to specific pages |
| Ellipsis | `...` indicating truncated page range |
| Next button | Navigates to the next page |
| Active page | Highlighted current page number |

**Variants.**

| Variant | Content | Use |
|---------|---------|-----|
| Full numbered | `1 2 3 ... 10` with page buttons | Tables, data-heavy lists |
| Compact | `Previous` / `Next` with optional page indicator | Simple lists, mobile |

**Truncation rule (full numbered).** When total pages exceed 7, show: first page, current +/- 1 neighbor, last page, with `...` filling gaps. Example for page 5 of 20: `1 ... 4 5 6 ... 20`.

**States.**

| State | Styles |
|-------|--------|
| Default page | `text-text-secondary`, `bg-transparent` |
| Hover | `bg-bg-elevated`, `text-text-primary` |
| Active / current | `bg-accent`, `text-text-on-accent` |
| Disabled (prev on first page, next on last) | `text-text-muted`, `pointer-events: none`, `opacity: 0.5` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |

**Accessibility.**

- Container: `<nav aria-label="Pagination">`
- Active page: `aria-current="page"`
- Previous/Next: `aria-label="Go to previous page"` / `aria-label="Go to next page"`
- Disabled buttons: `aria-disabled="true"` (preferred over removing from DOM)
- Each page number: `aria-label="Go to page N"`

**Tailwind + React example.**

```jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  return (
    <nav aria-label="Pagination" className="flex items-center gap-xs">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        aria-disabled={currentPage === 1}
        className={`
          p-sm rounded-ds-md transition-colors duration-micro
          ${currentPage === 1
            ? 'text-text-muted opacity-50 pointer-events-none'
            : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
          }
        `}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-sm text-text-muted">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Go to page ${page}`}
            className={`
              w-[36px] h-[36px] rounded-ds-md text-label
              flex items-center justify-center
              transition-colors duration-micro
              ${page === currentPage
                ? 'bg-accent text-text-on-accent'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
              }
            `}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        aria-disabled={currentPage === totalPages}
        className={`
          p-sm rounded-ds-md transition-colors duration-micro
          ${currentPage === totalPages
            ? 'text-text-muted opacity-50 pointer-events-none'
            : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
          }
        `}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .pagination {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }

  .pagination-btn:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
  }

  .pagination-btn[aria-current="page"] {
    background: var(--accent);
    color: var(--text-on-accent);
  }

  .pagination-btn:disabled,
  .pagination-btn[aria-disabled="true"] {
    color: var(--text-muted);
    opacity: 0.5;
    pointer-events: none;
  }

  .pagination-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .pagination-ellipsis {
    padding: 0 var(--space-sm);
    color: var(--text-muted);
  }
</style>

<nav aria-label="Pagination" class="pagination">
  <button class="pagination-btn" aria-label="Go to previous page" aria-disabled="true" disabled>
    <!-- ChevronLeft icon svg w=20 h=20 -->
  </button>
  <button class="pagination-btn" aria-current="page" aria-label="Go to page 1">1</button>
  <button class="pagination-btn" aria-label="Go to page 2">2</button>
  <button class="pagination-btn" aria-label="Go to page 3">3</button>
  <span class="pagination-ellipsis">...</span>
  <button class="pagination-btn" aria-label="Go to page 10">10</button>
  <button class="pagination-btn" aria-label="Go to next page">
    <!-- ChevronRight icon svg w=20 h=20 -->
  </button>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Truncate with `...` when > 7 pages | Show all 50 page buttons in a row |
| Disable Previous on page 1, Next on last page | Remove the buttons entirely |
| Use `aria-current="page"` on the active page button | Mark the active page with only visual style |
| Provide `aria-label` on every page button | Rely on the number alone for screen readers |
| Use compact variant on mobile | Force full numbered pagination on small screens |

---

### 4.6 Stepper / Wizard

**When to use.** Multi-step processes such as onboarding, checkout, form wizards, or setup flows. Shows progress and allows users to understand where they are in a sequence. Use when steps must be completed in order and the process has clear phases.

**Anatomy.**

| Part | Role |
|------|------|
| Container | Wrapper with `aria-label="Progress"` |
| Step indicator | Numbered circle or checkmark showing step state |
| Step label | Text below (horizontal) or beside (vertical) the indicator |
| Connector line | Visual line between step indicators |
| Step content | (Vertical only) Collapsible content area for each step |

**Variants.**

| Variant | Layout | Use |
|---------|--------|-----|
| Horizontal | Circles + lines in a row, labels below | Top of page, checkout flows |
| Vertical | Stacked circles + lines, content to the right | Multi-form wizards, settings onboarding |

**Step states.**

| State | Indicator | Label |
|-------|-----------|-------|
| Completed | Checkmark icon, `bg-success`, `text-white` circle | `text-text-primary` |
| Current | Step number, `border: 2px solid var(--accent)`, `text-accent` | `text-text-primary`, `font-weight: 600` |
| Upcoming | Step number, `border: 1px solid var(--border)`, `text-text-muted` | `text-text-muted` |
| Error | `!` icon, `bg-error`, `text-white` circle | `text-error` |

**Accessibility.**

- Container: `aria-label="Progress"` or descriptive label like `"Checkout progress"`
- Current step: `aria-current="step"`
- Each step: text label is the accessible name
- Completed steps can be buttons (allowing navigation back), upcoming steps are inert
- Validation: block the "Next" button until the current step form is valid; announce errors with `aria-live="polite"`

**Tailwind + React example.**

```jsx
import { Check } from 'lucide-react';

const steps = [
  { id: 'account', label: 'Account' },
  { id: 'profile', label: 'Profile' },
  { id: 'review', label: 'Review' },
];

function HorizontalStepper({ currentStep, completedSteps = [] }) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isUpcoming = !isCompleted && !isCurrent;
          const isLast = i === steps.length - 1;

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-sm">
                {/* Step circle */}
                <div
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`
                    w-[32px] h-[32px] rounded-full flex items-center justify-center text-label
                    ${isCompleted
                      ? 'bg-success text-white'
                      : isCurrent
                        ? 'border-2 border-accent text-accent bg-transparent'
                        : 'border border-border text-text-muted bg-transparent'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                {/* Step label */}
                <span
                  className={`
                    text-caption
                    ${isCompleted || isCurrent ? 'text-text-primary' : 'text-text-muted'}
                    ${isCurrent ? 'font-semibold' : ''}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`
                    w-[64px] h-[2px] mx-md
                    ${isCompleted ? 'bg-success' : 'bg-border'}
                  `}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .stepper {
    display: flex;
    align-items: flex-start;
  }

  .stepper-step {
    display: flex;
    align-items: center;
  }

  .stepper-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
  }

  .stepper-circle {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
  }

  .stepper-circle.completed {
    background: var(--success);
    color: #ffffff;
  }

  .stepper-circle.current {
    border: 2px solid var(--accent);
    color: var(--accent);
    background: transparent;
  }

  .stepper-circle.upcoming {
    border: 1px solid var(--border);
    color: var(--text-muted);
    background: transparent;
  }

  .stepper-label {
    font-size: var(--text-caption);
    font-weight: var(--weight-caption);
  }

  .stepper-label.active {
    color: var(--text-primary);
    font-weight: var(--weight-label);
  }

  .stepper-label.muted {
    color: var(--text-muted);
  }

  .stepper-connector {
    width: 64px;
    height: 2px;
    margin: 0 var(--space-md);
    margin-top: 15px; /* center with circle */
  }

  .stepper-connector.done {
    background: var(--success);
  }

  .stepper-connector.pending {
    background: var(--border);
  }
</style>

<nav aria-label="Progress">
  <ol class="stepper" style="list-style: none;">
    <li class="stepper-step">
      <div class="stepper-indicator">
        <div class="stepper-circle completed">
          <!-- Check icon svg w=16 h=16 -->
        </div>
        <span class="stepper-label active">Account</span>
      </div>
      <div class="stepper-connector done"></div>
    </li>
    <li class="stepper-step">
      <div class="stepper-indicator">
        <div class="stepper-circle current" aria-current="step">2</div>
        <span class="stepper-label active">Profile</span>
      </div>
      <div class="stepper-connector pending"></div>
    </li>
    <li class="stepper-step">
      <div class="stepper-indicator">
        <div class="stepper-circle upcoming">3</div>
        <span class="stepper-label muted">Review</span>
      </div>
    </li>
  </ol>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Allow navigation back to completed steps | Lock completed steps from being revisited |
| Validate the current step before allowing "Next" | Let users skip ahead without completing required fields |
| Use `aria-current="step"` on the current step | Rely solely on color to indicate current vs. upcoming |
| Show a checkmark for completed steps | Keep the number visible after completion |
| Use horizontal for 3-5 steps, vertical for more | Cram 8+ steps into a horizontal stepper |

---

### 4.7 Segmented Control

**When to use.** Inline toggle between 2-4 mutually exclusive options. Unlike tabs, a segmented control does not switch large content panels -- it adjusts a parameter within the current view (e.g., time range, view mode, unit system).

**Anatomy.**

| Part | Role |
|------|------|
| Container | `role="radiogroup"` wrapper with `aria-label` |
| Segment | `role="radio"` button, one per option |
| Selected indicator | Background + shadow on the active segment |

**Variants.**

| Variant | Options | Use |
|---------|---------|-----|
| Compact | 2 options | Simple binary toggles (on/off not suited for switch) |
| Standard | 3-4 options | View mode, time range, unit selection |

**States.**

| State | Styles |
|-------|--------|
| Default (unselected) | `text-text-secondary`, transparent background |
| Hover (unselected) | `text-text-primary` |
| Selected | `bg-bg-card`, `shadow-ds-sm`, `text-text-primary`, `rounded-ds-md` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Disabled | `text-text-muted`, `opacity: 0.5`, `pointer-events: none` |

**Accessibility.**

- Container: `role="radiogroup"`, `aria-label` describing the choice
- Each segment: `role="radio"`, `aria-checked="true|false"`
- Selected segment: `tabindex="0"`, others: `tabindex="-1"` (roving tabindex)
- Keyboard: Left/Right arrows switch selection; selection changes immediately
- Label each option clearly; avoid icon-only segments without `aria-label`

**Tailwind + React example.**

```jsx
import { useState } from 'react';

const options = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
];

function SegmentedControl() {
  const [selected, setSelected] = useState('week');

  const handleKeyDown = (e, index) => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % options.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + options.length) % options.length;
    else return;
    e.preventDefault();
    setSelected(options[next].id);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Time range"
      className="inline-flex bg-bg-elevated rounded-ds-lg p-2xs"
    >
      {options.map((option, i) => (
        <button
          key={option.id}
          role="radio"
          aria-checked={selected === option.id}
          tabIndex={selected === option.id ? 0 : -1}
          onClick={() => setSelected(option.id)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`
            px-lg py-xs text-label rounded-ds-md
            transition-all duration-micro ease-default
            ${selected === option.id
              ? 'bg-bg-card shadow-ds-sm text-text-primary'
              : 'text-text-secondary hover:text-text-primary'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .segmented-control {
    display: inline-flex;
    background: var(--bg-elevated);
    border-radius: var(--radius-lg);
    padding: var(--space-2xs);
  }

  .segment {
    padding: var(--space-xs) var(--space-lg);
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    background: none;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--duration-micro) var(--ease-default);
  }

  .segment:hover {
    color: var(--text-primary);
  }

  .segment[aria-checked="true"] {
    background: var(--bg-card);
    color: var(--text-primary);
    box-shadow: var(--shadow-sm);
  }

  .segment:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .segment:disabled {
    color: var(--text-muted);
    opacity: 0.5;
    pointer-events: none;
  }
</style>

<div role="radiogroup" aria-label="Time range" class="segmented-control">
  <button role="radio" aria-checked="false" tabindex="-1" class="segment">Day</button>
  <button role="radio" aria-checked="true" tabindex="0" class="segment">Week</button>
  <button role="radio" aria-checked="false" tabindex="-1" class="segment">Month</button>
</div>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use `role="radiogroup"` + `role="radio"` | Use `role="tablist"` (segmented controls are not tabs) |
| Limit to 2-4 options | Cram 5+ options into a segmented control |
| Apply selection immediately on click/arrow | Require a "confirm" step after selection |
| Use roving tabindex for arrow key navigation | Put all segments in the tab order |
| Provide text labels on every segment | Use icon-only segments without `aria-label` |

---

### 4.8 Sticky Section Header

**When to use.** Long scrollable pages with distinct sections -- settings pages, long forms, data-heavy layouts, documentation. The header stays visible as the user scrolls through the section, providing persistent context.

**Anatomy.**

| Part | Role |
|------|------|
| Header bar | `position: sticky` element at the top of the section |
| Title | Section heading text |
| Optional actions | Buttons or links aligned to the right |
| Shadow indicator | Bottom shadow appears once the header is "stuck" |

**Variants.**

| Variant | Content | Use |
|---------|---------|-----|
| Simple | Title only | Section labeling in long forms |
| With actions | Title + right-aligned action buttons | Settings sections with save/reset |
| With count | Title + badge count | List sections showing filtered total |

**States.**

| State | Styles |
|-------|--------|
| Default (not stuck) | `bg-bg-primary`, no shadow |
| Stuck (scrolled) | `bg-bg-primary`, `shadow-ds-sm` bottom edge |

**Implementation notes.**

- Use `position: sticky; top: 0;` (or `top: 56px` if below a fixed top nav)
- `z-index: var(--z-sticky)` to stay above scrollable content
- Background must be opaque (`bg-bg-primary`) so content scrolls behind cleanly
- Shadow can be toggled via an `IntersectionObserver` or a CSS-only approach using a pseudo-element

**Accessibility.**

- Use an appropriate heading level (`<h2>`, `<h3>`, etc.) matching the document hierarchy
- The sticky behavior is purely visual; it does not change the DOM or reading order
- If the header contains actions, ensure they are keyboard-reachable

**Tailwind + React example.**

```jsx
import { useRef, useState, useEffect } from 'react';

function StickyHeader({ title, children, actions }) {
  const sentinelRef = useRef(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 1.0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <section>
      {/* Sentinel element to detect when header becomes stuck */}
      <div ref={sentinelRef} className="h-0" />

      <div
        className={`
          sticky top-0 z-sticky bg-bg-primary
          flex items-center justify-between
          px-xl py-md border-b border-border
          transition-shadow duration-micro
          ${isStuck ? 'shadow-ds-sm' : ''}
        `}
      >
        <h2 className="text-h3 text-text-primary">{title}</h2>
        {actions && <div className="flex items-center gap-sm">{actions}</div>}
      </div>

      <div className="p-xl">{children}</div>
    </section>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md) var(--space-xl);
    border-bottom: 1px solid var(--border);
    transition: box-shadow var(--duration-micro) var(--ease-default);
  }

  .sticky-header.stuck {
    box-shadow: var(--shadow-sm);
  }

  .sticky-header h2 {
    font-size: var(--text-h3);
    font-weight: var(--weight-h3);
    color: var(--text-primary);
    margin: 0;
  }

  .sticky-header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* If below a fixed 56px top nav, offset the sticky position */
  .has-topnav .sticky-header {
    top: 56px;
  }
</style>

<section>
  <div class="sticky-header" id="section-header">
    <h2>Account Settings</h2>
    <div class="sticky-header-actions">
      <button class="btn-default">Reset</button>
      <button class="btn-primary">Save</button>
    </div>
  </div>
  <div style="padding: var(--space-xl);">
    <!-- Long section content -->
  </div>
</section>

<script>
  // Toggle .stuck class via IntersectionObserver
  const sentinel = document.createElement('div');
  const header = document.getElementById('section-header');
  header.parentElement.insertBefore(sentinel, header);

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('stuck', !entry.isIntersecting),
    { threshold: 1.0 }
  );
  observer.observe(sentinel);
</script>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use `position: sticky` with `top: 0` | Use `position: fixed` (removes element from flow) |
| Set `z-index: var(--z-sticky)` | Use a z-index higher than modals or toasts |
| Use opaque background matching the page | Use transparent or semi-transparent background |
| Add shadow only when stuck (via JS observer) | Show shadow permanently even when not scrolled |
| Offset `top` value if used below a fixed nav bar | Forget the nav bar height, causing overlap |
| Use a semantic heading element (`<h2>`, `<h3>`) | Use a `<div>` or `<span>` for the title text |
## Feedback & Status

Seven patterns for communicating system state, loading progress, confirmations, and empty views. Every component in this section uses design-system tokens exclusively -- no hardcoded colors, spacing, or radii.

---

### 5.1 Toast / Notification

Non-blocking ephemeral messages that confirm actions or surface errors without interrupting the user's flow.

#### When to Use

- Confirming a successful save, delete, or send action
- Surfacing non-critical errors that do not require immediate action
- Displaying warnings or informational messages triggered by background processes
- Do NOT use for errors that block the user's workflow (use Alert / Banner instead)

#### Anatomy

```
+------------------------------------------------------+
| [Icon]  Message text                        [X Close] |
+------------------------------------------------------+
```

1. **Icon** -- variant-specific Lucide icon (`w-5 h-5`)
2. **Message** -- single line or up to two lines of body text
3. **Close button** -- always present, `w-4 h-4` X icon

#### Variants

| Variant   | Icon            | Border / Accent Color | Background        |
|-----------|-----------------|-----------------------|-------------------|
| Success   | `CheckCircle`   | `--success`           | `--success-muted` |
| Error     | `XCircle`       | `--error`             | `--error-muted`   |
| Warning   | `AlertTriangle` | `--warning`           | `--warning-muted` |
| Info      | `Info`          | `--info`              | `--info-muted`    |

#### States

| State       | Behavior                                                  |
|-------------|-----------------------------------------------------------|
| Entering    | `fade-in-up` animation, `200ms ease`                      |
| Visible     | Static, auto-dismiss timer counting down (5 seconds)      |
| Hovered     | Auto-dismiss timer paused                                 |
| Exiting     | `fade-out-down` animation, `150ms ease`                   |
| Stacked     | Max 3 visible, newest on top, `space-sm` (8px) gap        |

#### Accessibility

- **Container**: `aria-live="polite"`, `role="status"` -- screen readers announce new toasts without interrupting
- **Close button**: `aria-label="Dismiss notification"`
- **Focus**: toasts never steal focus from the user's current position
- **Keyboard**: close button is focusable but toast itself is not in the tab order

#### Tailwind + React

```jsx
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'border-success bg-success-muted text-success',
  error: 'border-error bg-error-muted text-error',
  warning: 'border-warning bg-warning-muted text-warning',
  info: 'border-info bg-info-muted text-info',
};

function Toast({ variant = 'info', message, onDismiss }) {
  const Icon = icons[variant];

  return (
    <div
      role="status"
      className={`flex items-center gap-md p-lg border rounded-ds-lg shadow-ds-md
        animate-fade-in-up ${styles[variant]}`}
      onMouseEnter={/* pause auto-dismiss */}
      onMouseLeave={/* resume auto-dismiss */}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="text-body text-text-primary flex-1">{message}</p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="text-text-tertiary hover:text-text-primary p-xs rounded-ds-sm
          focus-visible:outline-2 focus-visible:outline-accent"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function ToastContainer({ toasts }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-xl right-xl z-toast flex flex-col-reverse gap-sm"
      style={{ maxWidth: '400px' }}
    >
      {toasts.slice(0, 3).map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div
  aria-live="polite"
  class="toast-container"
>
  <div role="status" class="toast toast--success">
    <!-- Lucide CheckCircle SVG -->
    <svg class="toast__icon" width="20" height="20"><!-- ... --></svg>
    <p class="toast__message">Changes saved successfully.</p>
    <button class="toast__close" aria-label="Dismiss notification">
      <svg width="16" height="16"><!-- X icon --></svg>
    </button>
  </div>
</div>

<style>
.toast-container {
  position: fixed;
  bottom: var(--space-xl);
  right: var(--space-xl);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-sm);
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  animation: fade-in-up 200ms var(--ease-default);
}

.toast--exiting {
  animation: fade-out-down 150ms var(--ease-default) forwards;
}

.toast--success {
  border-color: var(--success);
  background: var(--success-muted);
}
.toast--success .toast__icon { color: var(--success); }

.toast--error {
  border-color: var(--error);
  background: var(--error-muted);
}
.toast--error .toast__icon { color: var(--error); }

.toast--warning {
  border-color: var(--warning);
  background: var(--warning-muted);
}
.toast--warning .toast__icon { color: var(--warning); }

.toast--info {
  border-color: var(--info);
  background: var(--info-muted);
}
.toast--info .toast__icon { color: var(--info); }

.toast__message {
  flex: 1;
  font-size: var(--text-body);
  color: var(--text-primary);
}

.toast__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
}
.toast__close:hover { color: var(--text-primary); }
.toast__close:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use toasts for transient confirmations (saved, sent, copied) | Use toasts for errors that require user action |
| Keep message text to one or two short lines | Put interactive elements (links, forms) inside toasts |
| Auto-dismiss after 5 seconds, pause on hover | Show more than 3 toasts simultaneously |
| Use the exit animation (150ms) faster than enter (200ms) | Steal focus from the user's current workflow |

---

### 5.2 Alert / Banner

Persistent inline messages that sit within the content flow. Use for contextual feedback that should remain visible until the user acts or the condition resolves.

#### When to Use

- Displaying a form-level validation summary after submission
- Warning about expiring trials, pending actions, or degraded service
- Confirming a bulk operation completed (success variant)
- Do NOT use for ephemeral confirmations (use Toast instead)

#### Anatomy

```
+-------------------------------------------------------------------+
| [Icon]  Message text                    [Action Link]  [X Dismiss] |
+-------------------------------------------------------------------+
```

1. **Icon** -- variant-specific Lucide icon (`w-5 h-5`), left-aligned
2. **Message** -- body text, may include inline bold or links
3. **Action link** (optional) -- text link for a related action
4. **Dismiss button** (optional) -- allows the user to close the banner

#### Variants

| Variant | Icon            | Background        | Border Color | Role          |
|---------|-----------------|-------------------|--------------|---------------|
| Info    | `Info`          | `--info-muted`    | `--info`     | `role="status"` |
| Success | `CheckCircle`   | `--success-muted` | `--success`  | `role="status"` |
| Warning | `AlertTriangle` | `--warning-muted` | `--warning`  | `role="alert"`  |
| Error   | `XCircle`       | `--error-muted`   | `--error`    | `role="alert"`  |

#### States

| State     | Behavior                                    |
|-----------|---------------------------------------------|
| Default   | Visible within the content flow              |
| Dismissed | Removed from DOM or hidden with `display: none` |

#### Accessibility

- **Error / Warning**: `role="alert"` -- assertively announced by screen readers
- **Info / Success**: `role="status"` -- politely announced
- **Dismiss button**: `aria-label="Dismiss alert"`
- If the banner contains an action link, the link must have descriptive text (not "click here")

#### Tailwind + React

```jsx
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

const config = {
  info:    { icon: Info,          style: 'border-info bg-info-muted text-info',       role: 'status' },
  success: { icon: CheckCircle,   style: 'border-success bg-success-muted text-success', role: 'status' },
  warning: { icon: AlertTriangle, style: 'border-warning bg-warning-muted text-warning', role: 'alert' },
  error:   { icon: XCircle,       style: 'border-error bg-error-muted text-error',     role: 'alert' },
};

function Alert({ variant = 'info', message, action, onDismiss }) {
  const { icon: Icon, style, role } = config[variant];

  return (
    <div
      role={role}
      className={`flex items-center gap-md p-lg border rounded-ds-lg ${style}`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="text-body text-text-primary flex-1">{message}</p>
      {action && (
        <a
          href={action.href}
          className="text-label text-accent hover:text-accent-hover underline whitespace-nowrap"
        >
          {action.label}
        </a>
      )}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="text-text-tertiary hover:text-text-primary p-xs rounded-ds-sm
            focus-visible:outline-2 focus-visible:outline-accent"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div role="alert" class="alert alert--error">
  <svg class="alert__icon" width="20" height="20"><!-- XCircle --></svg>
  <p class="alert__message">Unable to save changes. Please try again.</p>
  <a href="/support" class="alert__action">Contact support</a>
  <button class="alert__dismiss" aria-label="Dismiss alert">
    <svg width="16" height="16"><!-- X icon --></svg>
  </button>
</div>

<style>
.alert {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid;
  border-radius: var(--radius-lg);
}

.alert--info    { border-color: var(--info);    background: var(--info-muted); }
.alert--success { border-color: var(--success); background: var(--success-muted); }
.alert--warning { border-color: var(--warning); background: var(--warning-muted); }
.alert--error   { border-color: var(--error);   background: var(--error-muted); }

.alert__icon { shrink: 0; }
.alert--info    .alert__icon { color: var(--info); }
.alert--success .alert__icon { color: var(--success); }
.alert--warning .alert__icon { color: var(--warning); }
.alert--error   .alert__icon { color: var(--error); }

.alert__message {
  flex: 1;
  font-size: var(--text-body);
  color: var(--text-primary);
}

.alert__action {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--accent);
  text-decoration: underline;
  white-space: nowrap;
}
.alert__action:hover { color: var(--accent-hover); }

.alert__dismiss {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
}
.alert__dismiss:hover { color: var(--text-primary); }
.alert__dismiss:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Place alerts inline within the content they relate to | Float alerts over content like toasts |
| Use `role="alert"` for errors and warnings only | Use `role="alert"` for informational messages (too assertive) |
| Provide a dismiss button when the user can safely ignore | Leave error alerts permanently on screen with no escape |
| Keep the message concise; link to details if needed | Embed long paragraphs or multiple actions inside a banner |

---

### 5.3 Callout / Admonition

Inline content blocks used within documentation, help text, and long-form content to highlight tips, warnings, and important notes.

#### When to Use

- Highlighting a helpful tip or best practice in documentation
- Warning about a gotcha or destructive consequence within instructional text
- Calling out required prerequisites or important context
- Do NOT use for live system alerts (use Alert / Banner instead)

#### Anatomy

```
+-+--------------------------------------------+
| | [Icon]  Title (bold)                        |
| |  Body text describing the callout content.  |
+-+--------------------------------------------+
  ^-- 3px left border in semantic color
```

1. **Left border** -- 3px solid, colored by variant
2. **Icon** -- variant-specific Lucide icon (`w-5 h-5`)
3. **Title** -- bold label text (optional but recommended)
4. **Body** -- body text, may contain inline formatting

#### Variants

| Variant | Border Color | Icon            | Use Case                   |
|---------|-------------|-----------------|----------------------------|
| Tip     | `--accent`  | `Lightbulb`     | Best practices, pro tips   |
| Warning | `--warning` | `AlertTriangle` | Gotchas, caveats           |
| Danger  | `--error`   | `AlertOctagon`  | Destructive / irreversible |
| Info    | `--info`    | `Info`          | Additional context         |
| Note    | `--border`  | `StickyNote`    | General side notes         |

#### States

Callouts are static content blocks. They have no interactive states.

#### Accessibility

- Use semantic HTML: a `<div>` or `<aside>` with an appropriate `role` is sufficient
- The icon is decorative (`aria-hidden="true"`) -- the title carries the meaning
- If the callout warns about a destructive action, pair with `role="note"` or include the word "Warning" in the title so screen readers convey urgency through text

#### Tailwind + React

```jsx
import { Lightbulb, AlertTriangle, AlertOctagon, Info, StickyNote } from 'lucide-react';

const config = {
  tip:     { icon: Lightbulb,     border: 'border-l-accent',  iconColor: 'text-accent' },
  warning: { icon: AlertTriangle, border: 'border-l-warning', iconColor: 'text-warning' },
  danger:  { icon: AlertOctagon,  border: 'border-l-error',   iconColor: 'text-error' },
  info:    { icon: Info,          border: 'border-l-info',    iconColor: 'text-info' },
  note:    { icon: StickyNote,    border: 'border-l-border',  iconColor: 'text-text-tertiary' },
};

function Callout({ variant = 'note', title, children }) {
  const { icon: Icon, border, iconColor } = config[variant];

  return (
    <aside className={`border-l-[3px] ${border} bg-bg-elevated rounded-ds-md p-lg`}>
      <div className="flex items-center gap-sm mb-sm">
        <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} aria-hidden="true" />
        {title && (
          <span className="text-label text-text-primary">{title}</span>
        )}
      </div>
      <div className="text-body text-text-secondary pl-[28px]">
        {children}
      </div>
    </aside>
  );
}
```

#### Plain CSS + HTML

```html
<aside class="callout callout--warning">
  <div class="callout__header">
    <svg class="callout__icon" width="20" height="20" aria-hidden="true">
      <!-- AlertTriangle -->
    </svg>
    <span class="callout__title">Warning</span>
  </div>
  <div class="callout__body">
    This action cannot be undone. Deleted items are permanently removed
    after 30 days.
  </div>
</aside>

<style>
.callout {
  border-left: 3px solid;
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}

.callout--tip     { border-left-color: var(--accent); }
.callout--warning { border-left-color: var(--warning); }
.callout--danger  { border-left-color: var(--error); }
.callout--info    { border-left-color: var(--info); }
.callout--note    { border-left-color: var(--border); }

.callout__header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.callout--tip     .callout__icon { color: var(--accent); }
.callout--warning .callout__icon { color: var(--warning); }
.callout--danger  .callout__icon { color: var(--error); }
.callout--info    .callout__icon { color: var(--info); }
.callout--note    .callout__icon { color: var(--text-tertiary); }

.callout__title {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}

.callout__body {
  font-size: var(--text-body);
  color: var(--text-secondary);
  padding-left: 28px; /* icon width + gap */
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use sparingly -- one or two callouts per page section | Overload a page with callouts (they lose impact) |
| Match the variant to the severity of the content | Use "danger" for minor tips or general info |
| Include a descriptive title so the callout is scannable | Rely on border color alone to convey meaning |
| Keep body text concise -- link out for extended explanations | Nest callouts inside other callouts |

---

### 5.4 Confirmation Dialog

A modal dialog for confirming destructive or irreversible actions. Extends the base Modal pattern with a focused layout for confirmation flows.

#### When to Use

- Confirming deletion of a record, project, or account
- Approving an irreversible bulk operation
- Any action where the user should explicitly opt in before proceeding
- Do NOT use for simple informational messages (use Alert or Toast)

#### Anatomy

```
+--overlay (bg-overlay)----------------------------+
|                                                   |
|  +--dialog card---------------------------+       |
|  |  [AlertTriangle icon]                  |       |
|  |  Heading                               |       |
|  |  Description text explaining the       |       |
|  |  consequences of the action.           |       |
|  |                                        |       |
|  |  [Cancel]              [Delete / Confirm]|      |
|  +----------------------------------------+       |
|                                                   |
+---------------------------------------------------+
```

1. **Overlay** -- `bg-overlay`, covers the viewport
2. **Dialog card** -- `bg-bg-card`, `shadow-ds-lg`, `rounded-ds-lg`, max-width `440px`
3. **Icon** -- `AlertTriangle` in `text-warning` or `text-error`, `w-10 h-10`
4. **Heading** -- `text-h3`, clear action description
5. **Description** -- `text-body text-text-secondary`, explains consequences
6. **Cancel button** -- default/ghost style, receives initial focus
7. **Confirm button** -- danger variant (`bg-error text-text-on-accent`)

#### States

| State      | Behavior                                                |
|------------|---------------------------------------------------------|
| Opening    | Overlay fades in, dialog uses `scale-in` 200ms          |
| Open       | Focus trapped within dialog, body scroll locked         |
| Closing    | `scale-out` 150ms, overlay fades out                    |

#### Accessibility

- **Dialog**: `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby` pointing to heading, `aria-describedby` pointing to description
- **Focus trap**: focus cycles between Cancel, Confirm, and close button only
- **Initial focus**: Cancel button (not the destructive action) -- prevents accidental confirmation
- **Keyboard**: `Escape` triggers cancel, `Enter` activates the focused button
- **Screen reader**: `alertdialog` role causes the description to be read automatically on open

#### Tailwind + React

```jsx
import { AlertTriangle, X } from 'lucide-react';
import { useRef, useEffect } from 'react';

function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-bg-overlay"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="relative bg-bg-card rounded-ds-lg shadow-ds-lg p-xl
          w-full max-w-[440px] animate-scale-in"
      >
        <div className="flex flex-col items-center text-center gap-lg">
          <div className="w-10 h-10 rounded-full bg-error-muted flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>

          <h2 id="confirm-title" className="text-h3 text-text-primary">
            {title}
          </h2>

          <p id="confirm-desc" className="text-body text-text-secondary">
            {description}
          </p>

          <div className="flex gap-md w-full">
            <button
              ref={cancelRef}
              onClick={onCancel}
              className="flex-1 px-lg py-sm rounded-ds-md border border-border
                text-label text-text-primary bg-transparent
                hover:bg-bg-elevated
                focus-visible:outline-2 focus-visible:outline-accent"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-lg py-sm rounded-ds-md
                text-label text-text-on-accent bg-error hover:bg-error-hover
                focus-visible:outline-2 focus-visible:outline-accent"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div class="confirm-overlay">
  <div
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="confirm-title"
    aria-describedby="confirm-desc"
    class="confirm-dialog"
  >
    <div class="confirm-icon-wrap">
      <svg class="confirm-icon" width="24" height="24"><!-- AlertTriangle --></svg>
    </div>
    <h2 id="confirm-title" class="confirm-title">Delete project?</h2>
    <p id="confirm-desc" class="confirm-desc">
      This will permanently delete "My Project" and all its data.
      This action cannot be undone.
    </p>
    <div class="confirm-actions">
      <button class="confirm-cancel">Cancel</button>
      <button class="confirm-submit">Delete</button>
    </div>
  </div>
</div>

<style>
.confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-overlay);
}

.confirm-dialog {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-xl);
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-lg);
  animation: scale-in 200ms var(--ease-default);
}

.confirm-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--error-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-icon { color: var(--error); }

.confirm-title {
  font-size: var(--text-h3);
  font-weight: var(--weight-h3);
  color: var(--text-primary);
}

.confirm-desc {
  font-size: var(--text-body);
  color: var(--text-secondary);
}

.confirm-actions {
  display: flex;
  gap: var(--space-md);
  width: 100%;
}

.confirm-cancel,
.confirm-submit {
  flex: 1;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  cursor: pointer;
  border: none;
}

.confirm-cancel {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
}
.confirm-cancel:hover { background: var(--bg-elevated); }

.confirm-submit {
  background: var(--error);
  color: var(--text-on-accent);
}
.confirm-submit:hover { background: var(--error-hover); }

.confirm-cancel:focus-visible,
.confirm-submit:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Set initial focus on the Cancel button | Auto-focus the destructive Confirm button |
| Describe the exact consequence in the description text | Use vague language like "Are you sure?" with no context |
| Use `role="alertdialog"` so screen readers announce the description | Use a generic `role="dialog"` for destructive confirmations |
| Allow `Escape` to cancel and close the dialog | Require the user to click Cancel -- keyboard must work |

---

### 5.5 Skeleton Loader

Loading placeholders that mirror the shape of incoming content, providing spatial continuity while data loads.

#### When to Use

- Showing placeholder shapes while an API call is in flight
- Replacing a card, list, or table with a structural preview during loading
- Initial page load where content areas have a known layout
- Do NOT use for actions that complete in under 200ms (show nothing instead)

#### Anatomy

Three composable primitives:

| Primitive | Shape             | Default Size         |
|-----------|-------------------|----------------------|
| Line      | Rounded rectangle | `h-4`, full width    |
| Circle    | Perfect circle    | Explicit `w-*` / `h-*` |
| Rect      | Rounded rectangle | Explicit dimensions  |

All primitives use `bg-bg-elevated` as the base color with a horizontal shimmer gradient using `--shimmer-highlight`.

#### Variants

Skeletons are composed, not predefined. Common compositions:

| Composition    | Primitives Used                                      |
|----------------|------------------------------------------------------|
| Card skeleton  | Rect (image) + Line (title) + Line (subtitle, 60%)  |
| Avatar + text  | Circle (40px) + Line (name) + Line (role, 50%)      |
| Table row      | 4-5 Lines in a horizontal grid                       |
| Paragraph      | 3 Lines (100%, 100%, 75%)                            |

#### States

| State            | Behavior                                              |
|------------------|-------------------------------------------------------|
| Loading          | Shimmer animation at `1.5s ease-in-out infinite`      |
| Reduced motion   | Static `bg-bg-elevated` fill, no animation            |
| Extended loading | After 3 seconds, add a `text-caption text-text-tertiary` hint |

#### Accessibility

- Skeleton containers should have `aria-busy="true"` while loading
- The parent region should have `aria-label="Loading content"` or similar
- When content loads, remove `aria-busy` and the skeleton elements
- Screen readers should not attempt to read individual skeleton shapes -- they are purely visual

#### Tailwind + React

```jsx
function SkeletonLine({ width = 'w-full' }) {
  return (
    <div
      className={`h-4 rounded-ds-md bg-bg-elevated shimmer ${width}`}
      aria-hidden="true"
    />
  );
}

function SkeletonCircle({ size = 'w-10 h-10' }) {
  return (
    <div
      className={`rounded-full bg-bg-elevated shimmer ${size}`}
      aria-hidden="true"
    />
  );
}

function SkeletonRect({ className = 'w-full h-32' }) {
  return (
    <div
      className={`rounded-ds-md bg-bg-elevated shimmer ${className}`}
      aria-hidden="true"
    />
  );
}

/* Shimmer utility class defined in globals.css:
   .shimmer {
     background: linear-gradient(90deg,
       var(--bg-elevated) 25%,
       var(--shimmer-highlight) 50%,
       var(--bg-elevated) 75%);
     background-size: 200% 100%;
     animation: shimmer 1.5s ease-in-out infinite;
   }
*/

function CardSkeleton() {
  return (
    <div
      className="bg-bg-card border border-border rounded-ds-lg p-lg space-y-md"
      aria-busy="true"
      aria-label="Loading content"
    >
      <SkeletonRect className="w-full h-40" />
      <SkeletonLine width="w-3/4" />
      <SkeletonLine width="w-1/2" />
    </div>
  );
}

function AvatarRowSkeleton() {
  return (
    <div
      className="flex items-center gap-md"
      aria-busy="true"
      aria-label="Loading content"
    >
      <SkeletonCircle size="w-10 h-10" />
      <div className="flex-1 space-y-sm">
        <SkeletonLine width="w-1/3" />
        <SkeletonLine width="w-1/5" />
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div class="skeleton-card" aria-busy="true" aria-label="Loading content">
  <div class="skeleton-rect shimmer" style="height: 160px;"></div>
  <div class="skeleton-line shimmer" style="width: 75%;"></div>
  <div class="skeleton-line shimmer" style="width: 50%;"></div>
</div>

<!-- Extended loading hint (shown after 3s via JS) -->
<p class="skeleton-hint" hidden>Still loading, please wait...</p>

<style>
.skeleton-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.skeleton-line {
  height: 16px; /* matches --text-body line height visually */
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
}

.skeleton-circle {
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
}

.skeleton-rect {
  width: 100%;
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
}

/* .shimmer class is defined in globals.css */

.skeleton-hint {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
  text-align: center;
  margin-top: var(--space-sm);
}

@media (prefers-reduced-motion: reduce) {
  .shimmer {
    animation: none;
    background: var(--bg-elevated);
  }
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Match skeleton shapes to the actual content layout | Use a single generic spinner for all loading states |
| Respect `prefers-reduced-motion` with a static fill | Keep the shimmer animation running for reduced-motion users |
| Add a text hint after 3 seconds of loading | Show skeletons indefinitely with no fallback or timeout |
| Set `aria-busy="true"` on the loading region | Make individual skeleton shapes focusable or readable |

---

### 5.6 Progress / Loading Bar

A thin bar at the top of the viewport indicating page-level loading progress. Used for route transitions, file uploads, or any operation with measurable progress.

#### When to Use

- Indicating a page/route transition is in progress
- Showing upload or processing progress with a known percentage
- Providing visual feedback during background data fetching
- Do NOT use for inline component loading (use Skeleton Loader instead)

#### Anatomy

```
[=========>                                    ]  <- 3px bar, full viewport width
```

1. **Track** -- invisible or same as page background, full viewport width
2. **Fill** -- `--accent` colored bar, 3px height

#### Variants

| Variant       | Behavior                                               |
|---------------|--------------------------------------------------------|
| Indeterminate | Animated sweep from left to right, loops continuously  |
| Determinate   | Width set to progress percentage, smooth `200ms` transition |

#### States

| State      | Behavior                                             |
|------------|------------------------------------------------------|
| Active     | Bar visible, animating or filling                    |
| Complete   | Bar reaches 100%, holds briefly, then fades out      |
| Hidden     | Bar not rendered (default state)                     |

#### Accessibility

- Use `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` for determinate
- For indeterminate, omit `aria-valuenow` (screen readers announce "loading" or "busy")
- Add `aria-label="Page loading"` or a descriptive label
- The bar is a visual-only enhancement -- ensure the page remains usable during loading

#### Tailwind + React

```jsx
function ProgressBar({ progress, indeterminate = false }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : progress}
      aria-label="Page loading"
      className="fixed top-0 left-0 right-0 h-[3px] z-toast overflow-hidden"
    >
      <div
        className={`h-full bg-accent ${
          indeterminate
            ? 'animate-progress-sweep'
            : 'transition-[width] duration-standard ease-default'
        }`}
        style={indeterminate ? undefined : { width: `${progress}%` }}
      />
    </div>
  );
}

/*
  Add to your Tailwind config or globals.css:

  @keyframes progress-sweep {
    0%   { transform: translateX(-100%); width: 40%; }
    50%  { width: 60%; }
    100% { transform: translateX(250%); width: 40%; }
  }
*/
```

#### Plain CSS + HTML

```html
<!-- Determinate -->
<div
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="65"
  aria-label="Upload progress"
  class="progress-bar"
>
  <div class="progress-bar__fill" style="width: 65%;"></div>
</div>

<!-- Indeterminate -->
<div
  role="progressbar"
  aria-label="Page loading"
  class="progress-bar"
>
  <div class="progress-bar__fill progress-bar__fill--indeterminate"></div>
</div>

<style>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: var(--z-toast);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--accent);
  transition: width var(--duration-standard) var(--ease-default);
}

.progress-bar__fill--indeterminate {
  width: 40%;
  animation: progress-sweep 1.5s var(--ease-default) infinite;
}

@keyframes progress-sweep {
  0%   { transform: translateX(-100%); width: 40%; }
  50%  { width: 60%; }
  100% { transform: translateX(250%); width: 40%; }
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar__fill--indeterminate {
    animation: none;
    width: 100%;
    opacity: 0.5;
  }
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use indeterminate when you cannot predict duration | Show a stuck determinate bar at 99% for a long time |
| Place at the very top of the viewport with `z-toast` | Stack multiple progress bars on one page |
| Fade out after reaching 100% | Leave the completed bar visible permanently |
| Keep the bar at 3px -- it should be subtle, not dominant | Make the bar thick or add text labels on it |

---

### 5.7 Empty State

Centered placeholder views shown when a list, table, or page has no content yet. Guides the user toward the next logical action.

#### When to Use

- A list or table has zero items (empty inbox, no projects, no search results)
- A first-time user lands on a feature they have not populated yet
- A search or filter returns no matching results
- Do NOT use when content is loading (use Skeleton Loader instead)

#### Anatomy

```
         [  Icon  ]       <- w-12 h-12, text-text-tertiary
          Heading          <- text-h3, text-text-primary
     Description text      <- text-body, text-text-secondary
     [ Primary CTA ]       <- optional, accent button
```

1. **Icon** -- contextually appropriate Lucide icon, `w-12 h-12`, `text-text-tertiary`
2. **Heading** -- `text-h3`, concise label for the empty state
3. **Description** -- `text-body text-text-secondary`, one to two sentences explaining why this is empty and what the user can do
4. **CTA button** (optional) -- primary accent button for the most logical next action

#### Variants

| Context         | Icon Example   | Heading Example        | CTA Example       |
|-----------------|----------------|------------------------|--------------------|
| Empty list      | `Inbox`        | "No messages yet"      | "Compose message"  |
| No results      | `SearchX`      | "No results found"     | "Clear filters"    |
| First-time user | `Rocket`       | "Welcome! Get started" | "Create first..."  |
| Error-empty     | `AlertCircle`  | "Something went wrong" | "Try again"        |

#### States

Empty states are static. The CTA button follows standard button states (default, hover, active, focus, disabled).

#### Accessibility

- The icon is decorative: `aria-hidden="true"`
- The heading and description provide all necessary context for screen readers
- If a CTA is present, it must be a focusable button or link
- If the empty state replaces a list, the container should still have its list role removed or updated to avoid confusing screen readers

#### Tailwind + React

```jsx
import { Inbox } from 'lucide-react';

function EmptyState({
  icon: Icon = Inbox,
  heading,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-3xl px-xl">
      <Icon
        className="w-12 h-12 text-text-tertiary mb-lg"
        aria-hidden="true"
      />
      <h3 className="text-h3 text-text-primary mb-sm">{heading}</h3>
      <p className="text-body text-text-secondary max-w-sm mb-xl">
        {description}
      </p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="px-xl py-sm rounded-ds-md bg-accent text-text-on-accent
            text-label hover:bg-accent-hover active:bg-accent-active
            focus-visible:outline-2 focus-visible:outline-accent
            focus-visible:outline-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div class="empty-state">
  <svg class="empty-state__icon" width="48" height="48" aria-hidden="true">
    <!-- Lucide Inbox icon -->
  </svg>
  <h3 class="empty-state__heading">No messages yet</h3>
  <p class="empty-state__description">
    When you receive messages, they will appear here.
    Start a conversation to get going.
  </p>
  <button class="empty-state__cta">Compose message</button>
</div>

<style>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-3xl) var(--space-xl);
}

.empty-state__icon {
  color: var(--text-tertiary);
  margin-bottom: var(--space-lg);
}

.empty-state__heading {
  font-size: var(--text-h3);
  font-weight: var(--weight-h3);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.empty-state__description {
  font-size: var(--text-body);
  color: var(--text-secondary);
  max-width: 24rem;
  margin-bottom: var(--space-xl);
}

.empty-state__cta {
  padding: var(--space-sm) var(--space-xl);
  border-radius: var(--radius-md);
  border: none;
  background: var(--accent);
  color: var(--text-on-accent);
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  cursor: pointer;
}
.empty-state__cta:hover { background: var(--accent-hover); }
.empty-state__cta:active { background: var(--accent-active); }
.empty-state__cta:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Choose an icon that relates to the content type (Inbox for messages, etc.) | Use a generic sad-face emoji or illustration |
| Provide a clear CTA so the user knows the next step | Leave the user stranded with no action to take |
| Write the description in a helpful, forward-looking tone | Blame the user ("You have not created anything") |
| Keep the layout centered and vertically balanced | Push the empty state to a corner or make it tiny |
## Overlays

Overlays are components that appear above the main page content, dimming or blocking interaction with the layer beneath. They range from heavyweight (modals, drawers) to lightweight (tooltips). Every overlay in the system traps or manages focus, respects `Escape` to close, and returns focus to the trigger element on dismissal.

**Shared tokens used across all overlays:**

| Token | Role |
|-------|------|
| `--bg-overlay` | Backdrop fill behind modals and drawers |
| `--bg-card` | Surface for overlay panels |
| `--border` | Panel border |
| `--shadow-lg` | Elevation shadow for overlay panels |
| `--z-modal` (`1000`) | Z-index for modals and drawers |
| `--z-dropdown` (`50`) | Z-index for menus, popovers, tooltips |
| `--z-overlay` (`900`) | Z-index for backdrops |
| `--duration-standard` (`200ms`) | Default transition duration |
| `--duration-emphasis` (`300ms`) | Drawer slide duration |
| `--duration-micro` (`150ms`) | Tooltip and fast exit duration |
| `--ease-default` (`ease`) | Easing for all overlay motion |

---

### 6.1 Modal / Dialog

Use modals for focused interactions that require a decision before returning to the page -- confirmations, forms, detail views. A modal blocks all interaction with the page beneath it.

#### Anatomy

```
Backdrop  (fixed, full-screen, bg-overlay)
  Panel  (centered, bg-card, border, shadow-lg, rounded-lg)
    Header  (border-bottom, p-xl)
      Title  (text-h3, text-primary)
      Close button  (icon-only, X icon, top-right)
    Body  (p-xl, scrollable when content overflows)
    Footer  (border-top, p-xl, flex justify-end gap-md)
      Secondary button
      Primary button
```

#### Variants

| Variant | Max-width | Use case |
|---------|-----------|----------|
| `sm` | `400px` | Confirmations, simple alerts |
| `md` | `520px` | Forms, detail views (default) |
| `lg` | `640px` | Multi-step flows, rich content |

#### States

| State | Behavior |
|-------|----------|
| Opening | Backdrop fades in. Panel plays `scale-in` animation (`200ms ease`). |
| Open | Focus trapped inside panel. Page scroll locked. |
| Closing | Panel plays `scale-out` (`150ms ease`). Backdrop fades out. Focus returns to trigger. |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Role | `role="dialog"` on the panel |
| Modal flag | `aria-modal="true"` |
| Label | `aria-labelledby` pointing to the title element's `id` |
| Description | `aria-describedby` pointing to the body element's `id` (optional) |
| Focus trap | First focusable element receives focus on open. `Tab` / `Shift+Tab` cycle within the panel. |
| Escape | Closes the modal and returns focus to the trigger |
| Click outside | Closes the modal (unless explicitly prevented for destructive flows) |
| Screen reader | Announce as dialog with title. Backdrop content is inert (`inert` attribute on siblings). |

#### Tailwind + React

```jsx
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const SIZES = {
  sm: 'max-w-[400px]',
  md: 'max-w-[520px]',
  lg: 'max-w-[640px]',
};

function Modal({ open, onClose, title, size = 'md', children, footer }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      panelRef.current?.querySelector('button, [href], input, select, textarea')?.focus();
    }
    return () => {
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-overlay flex items-center justify-center p-xl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-overlay animate-[fade-in-up_200ms_ease]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
        className={`
          relative z-modal w-full ${SIZES[size]}
          bg-bg-card border border-border rounded-ds-lg shadow-ds-lg
          animate-[scale-in_200ms_ease]
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-xl border-b border-border">
          <h2 id="modal-title" className="text-h3 text-text-primary font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-micro"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div id="modal-body" className="p-xl overflow-y-auto max-h-[60vh]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-md p-xl border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: var(--bg-overlay);
    z-index: var(--z-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-xl);
    animation: fade-in-up var(--duration-standard) var(--ease-default);
  }

  .modal-panel {
    position: relative;
    z-index: var(--z-modal);
    width: 100%;
    max-width: 520px; /* md size: swap to 400px for sm, 640px for lg */
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    animation: scale-in var(--duration-standard) var(--ease-default);
  }

  .modal-panel.closing {
    animation: scale-out var(--duration-micro) var(--ease-default) forwards;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xl);
    border-bottom: 1px solid var(--border);
  }

  .modal-title {
    font-size: var(--text-h3);
    font-weight: var(--weight-h3);
    color: var(--text-primary);
  }

  .modal-body {
    padding: var(--space-xl);
    overflow-y: auto;
    max-height: 60vh;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    padding: var(--space-xl);
    border-top: 1px solid var(--border);
  }
</style>

<div class="modal-backdrop" role="presentation">
  <div
    class="modal-panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-body"
  >
    <div class="modal-header">
      <h2 class="modal-title" id="modal-title">Confirm action</h2>
      <button aria-label="Close dialog">&times;</button>
    </div>
    <div class="modal-body" id="modal-body">
      <p>Are you sure you want to continue? This action cannot be undone.</p>
    </div>
    <div class="modal-footer">
      <button class="btn-default">Cancel</button>
      <button class="btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Return focus to the trigger element on close | Leave focus stranded on the backdrop |
| Use `sm` for simple confirmations | Use `lg` when content fits in `md` |
| Lock body scroll while open | Allow page to scroll behind the modal |
| Provide both close button and Escape key | Require only click-outside to dismiss |
| Keep the footer pinned when body scrolls | Let action buttons scroll out of view |

---

### 6.2 Drawer / Slide-over

Use drawers for contextual panels that slide in from a screen edge -- detail views, settings, mobile navigation, or multi-field forms that benefit from more vertical space than a modal provides.

#### Anatomy

```
Backdrop  (fixed, full-screen, bg-overlay)
  Panel  (fixed, edge-anchored, full-height, bg-card, border, shadow-lg)
    Header  (border-bottom, p-xl)
      Title  (text-h3, text-primary)
      Close button  (X icon, top-right)
    Body  (p-xl, flex-1, overflow-y-auto)
    Footer  (optional, border-top, p-xl)
```

#### Variants

| Variant | Width | Use case |
|---------|-------|----------|
| `sm` | `320px` | Notification panels, quick details |
| `md` | `400px` | Settings, detail views (default) |
| `lg` | `560px` | Forms, multi-section editors |
| `full` | `100%` | Mobile navigation, full-screen takeover |

| Direction | Animation |
|-----------|-----------|
| `right` (default) | `slide-in-right` / `slide-out-right` |
| `left` | `slide-in-left` / `slide-out-left` |

#### States

| State | Behavior |
|-------|----------|
| Opening | Backdrop fades in. Panel plays `slide-in-right` (`300ms ease`). |
| Open | Focus trapped inside panel. Page scroll locked. |
| Closing | Panel plays `slide-out-right` (`200ms ease`). Backdrop fades out. Focus returns to trigger. |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Role | `role="dialog"` on the panel |
| Modal flag | `aria-modal="true"` |
| Label | `aria-labelledby` pointing to the drawer title's `id` |
| Focus trap | First focusable element receives focus on open. `Tab` cycles within. |
| Escape | Closes the drawer and returns focus to the trigger |
| Click outside | Clicking the backdrop closes the drawer |
| Screen reader | Announce as dialog. Sibling content marked `inert`. |

#### Tailwind + React

```jsx
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const WIDTHS = {
  sm: 'w-[320px]',
  md: 'w-[400px]',
  lg: 'w-[560px]',
  full: 'w-full',
};

const DIRECTIONS = {
  right: {
    position: 'right-0',
    enter: 'animate-[slide-in-right_300ms_ease]',
    exit: 'animate-[slide-out-right_200ms_ease_forwards]',
  },
  left: {
    position: 'left-0',
    enter: 'animate-[slide-in-left_300ms_ease]',
    exit: 'animate-[slide-out-left_200ms_ease_forwards]',
  },
};

function Drawer({ open, onClose, title, size = 'md', direction = 'right', children, footer }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      panelRef.current?.querySelector('button, [href], input, select, textarea')?.focus();
    }
    return () => {
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const dir = DIRECTIONS[direction];

  return (
    <div className="fixed inset-0 z-overlay">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-overlay animate-[fade-in-up_200ms_ease]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`
          fixed top-0 ${dir.position} h-full ${WIDTHS[size]}
          bg-bg-card border-l border-border shadow-ds-lg
          flex flex-col z-modal ${dir.enter}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-xl border-b border-border shrink-0">
          <h2 id="drawer-title" className="text-h3 text-text-primary font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-micro"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-xl">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-md p-xl border-t border-border shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: var(--bg-overlay);
    z-index: var(--z-overlay);
    animation: fade-in-up var(--duration-standard) var(--ease-default);
  }

  .drawer-panel {
    position: fixed;
    top: 0;
    right: 0; /* swap to left: 0 for left direction */
    height: 100%;
    width: 400px; /* sm: 320px, lg: 560px, full: 100% */
    background: var(--bg-card);
    border-left: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-modal);
    display: flex;
    flex-direction: column;
    animation: slide-in-right var(--duration-emphasis) var(--ease-default);
  }

  .drawer-panel.left {
    right: auto;
    left: 0;
    border-left: none;
    border-right: 1px solid var(--border);
    animation-name: slide-in-left;
  }

  .drawer-panel.closing {
    animation: slide-out-right var(--duration-standard) var(--ease-default) forwards;
  }

  .drawer-panel.left.closing {
    animation-name: slide-out-left;
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xl);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .drawer-title {
    font-size: var(--text-h3);
    font-weight: var(--weight-h3);
    color: var(--text-primary);
  }

  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-xl);
  }

  .drawer-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    padding: var(--space-xl);
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
</style>

<div class="drawer-backdrop" role="presentation">
  <div
    class="drawer-panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="drawer-title"
  >
    <div class="drawer-header">
      <h2 class="drawer-title" id="drawer-title">User details</h2>
      <button aria-label="Close drawer">&times;</button>
    </div>
    <div class="drawer-body">
      <p>Drawer content goes here. Scrolls when content overflows.</p>
    </div>
    <div class="drawer-footer">
      <button class="btn-default">Cancel</button>
      <button class="btn-primary">Save</button>
    </div>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use `right` direction for detail/settings panels | Open drawers from the right for primary navigation |
| Use `left` direction for navigation drawers | Use `full` width on desktop -- reserve for mobile |
| Keep the header pinned so the title stays visible | Hide the close button |
| Provide a backdrop to indicate modal context | Open a drawer without blocking page interaction |
| Return focus to the trigger on close | Leave focus inside the now-hidden drawer |

---

### 6.3 Dropdown Menu

Use dropdown menus for contextual action lists triggered by a button -- "More actions", profile menus, sort options. Items are non-navigational actions (use links or routing for navigation).

#### Anatomy

```
Trigger button  (aria-haspopup="menu", aria-expanded)
  Menu panel  (role="menu", bg-card, border, shadow-lg, rounded-md)
    Menu group (optional label)
      Menu item  (role="menuitem", icon? + label + shortcut?)
      Menu item
    Divider  (border-t, mx-sm)
    Menu group
      Menu item
```

#### Variants

| Variant | Description |
|---------|-------------|
| Simple | Label-only items |
| With icons | Icon left-aligned before label |
| With shortcuts | Keyboard shortcut hint right-aligned in `text-tertiary` |
| Grouped | Logical sections separated by dividers |
| Nested | Submenu opens on hover or arrow-right |
| Danger item | `text-error` color for destructive actions |

#### States

| State | Visual |
|-------|--------|
| Default item | `text-text-primary` on `bg-bg-card` |
| Hover / focus | `bg-bg-elevated`, `text-text-primary` |
| Active (pressed) | `bg-accent-muted`, `text-accent` |
| Disabled | `text-text-muted`, `pointer-events: none` |
| Danger item | `text-error`, hover: `bg-error-muted` |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Trigger | `aria-haspopup="menu"`, `aria-expanded="true/false"` |
| Menu | `role="menu"` |
| Items | `role="menuitem"` on each item |
| Disabled | `aria-disabled="true"` on disabled items |
| Keyboard | `ArrowDown` / `ArrowUp` navigate items. `Enter` / `Space` select. `Escape` closes. `Home` / `End` jump to first/last. |
| Nested menus | `ArrowRight` opens submenu, `ArrowLeft` closes and returns to parent |
| Focus | Focus moves to the first item when opened. Returns to trigger on close. |
| Screen reader | Announces menu role and item count |

#### Tailwind + React

```jsx
import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

function DropdownMenu({ trigger, items, groups }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector('[role="menuitem"]')?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const flatItems = groups
    ? groups.flatMap((g) => g.items)
    : items;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % flatItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(flatItems.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        flatItems[activeIndex]?.onSelect?.();
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          onKeyDown={handleKeyDown}
          className="
            absolute top-full mt-xs right-0
            min-w-[180px] py-xs
            bg-bg-card border border-border rounded-ds-md shadow-ds-lg
            z-dropdown animate-[fade-in-up_150ms_ease]
          "
        >
          {(groups || [{ items }]).map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="border-t border-border mx-sm my-xs" />}
              {group.label && (
                <span className="block px-lg py-xs text-overline text-text-tertiary">
                  {group.label}
                </span>
              )}
              {group.items.map((item, ii) => (
                <button
                  key={ii}
                  role="menuitem"
                  aria-disabled={item.disabled || undefined}
                  tabIndex={-1}
                  onClick={() => {
                    item.onSelect?.();
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={`
                    w-full flex items-center gap-md px-lg py-sm text-body
                    transition-colors duration-micro
                    ${item.danger ? 'text-error hover:bg-error-muted' : 'text-text-primary hover:bg-bg-elevated'}
                    ${item.disabled ? 'text-text-muted pointer-events-none' : ''}
                  `}
                >
                  {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <span className="text-caption text-text-tertiary ml-xl">{item.shortcut}</span>
                  )}
                  {item.hasSubmenu && <ChevronRight className="w-4 h-4 text-text-tertiary" />}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .dropdown-wrapper {
    position: relative;
    display: inline-block;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: var(--space-xs);
    min-width: 180px;
    padding: var(--space-xs) 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-dropdown);
    animation: fade-in-up var(--duration-micro) var(--ease-default);
  }

  .dropdown-menu[hidden] {
    display: none;
  }

  .dropdown-group-label {
    display: block;
    padding: var(--space-xs) var(--space-lg);
    font-size: var(--text-overline);
    font-weight: var(--weight-overline);
    letter-spacing: var(--ls-overline);
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .dropdown-divider {
    border-top: 1px solid var(--border);
    margin: var(--space-xs) var(--space-sm);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    width: 100%;
    padding: var(--space-sm) var(--space-lg);
    background: none;
    border: none;
    font-size: var(--text-body);
    color: var(--text-primary);
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default);
  }

  .dropdown-item:hover,
  .dropdown-item:focus-visible {
    background: var(--bg-elevated);
  }

  .dropdown-item.danger {
    color: var(--error);
  }

  .dropdown-item.danger:hover {
    background: var(--error-muted);
  }

  .dropdown-item[aria-disabled="true"] {
    color: var(--text-muted);
    pointer-events: none;
  }

  .dropdown-item .shortcut {
    margin-left: auto;
    font-size: var(--text-caption);
    color: var(--text-tertiary);
  }
</style>

<div class="dropdown-wrapper">
  <button aria-haspopup="menu" aria-expanded="false" id="menu-trigger">
    Actions
  </button>
  <div class="dropdown-menu" role="menu" aria-labelledby="menu-trigger" hidden>
    <button class="dropdown-item" role="menuitem">
      Edit <span class="shortcut">Ctrl+E</span>
    </button>
    <button class="dropdown-item" role="menuitem">
      Duplicate <span class="shortcut">Ctrl+D</span>
    </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item danger" role="menuitem">
      Delete <span class="shortcut">Del</span>
    </button>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Place destructive actions last, separated by a divider | Mix danger items randomly among safe items |
| Show keyboard shortcuts in `text-tertiary` | Use shortcuts as the only way to discover an action |
| Auto-flip the menu when near viewport edges | Let the menu clip or overflow off-screen |
| Close the menu after an item is selected | Leave the menu open after selection |
| Use `role="menuitem"` on every actionable item | Use `role="option"` -- that belongs to listboxes |

---

### 6.4 Popover

Use popovers for rich interactive content that appears near a trigger -- filter panels, mini-forms, rich previews, or any overlay that contains buttons, links, or inputs. Popovers are like tooltips but interactive: they open on click (not hover) and can receive focus.

#### Anatomy

```
Trigger  (button or link, aria-haspopup="dialog")
  Popover panel  (bg-card, border, shadow-lg, rounded-lg)
    Arrow  (optional, CSS triangle matching bg-card)
    Content  (any interactive content: forms, links, buttons)
```

#### Variants

| Variant | Description |
|---------|-------------|
| Default | Content panel with no arrow |
| With arrow | CSS triangle pointing to trigger |
| Filter panel | Checkbox/radio list with "Apply" button |
| Mini-form | Inline form fields with submit |
| Rich preview | Thumbnail, title, description, link |

#### Positions

| Position | Placement | Arrow direction |
|----------|-----------|-----------------|
| `top` | Above trigger, centered | Points down |
| `bottom` | Below trigger, centered (default) | Points up |
| `left` | Left of trigger, vertically centered | Points right |
| `right` | Right of trigger, vertically centered | Points left |

Auto-flip: if there is not enough space in the preferred direction, flip to the opposite side.

#### States

| State | Behavior |
|-------|----------|
| Closed | Hidden, no DOM presence or `display: none` |
| Opening | Appears with `fade-in-up` (`150ms ease`) |
| Open | Receives focus. Click-outside or `Escape` closes. |
| Closing | Fades out (`150ms ease`). Focus returns to trigger. |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Trigger | `aria-haspopup="dialog"`, `aria-expanded="true/false"` |
| Panel | No specific role needed unless it functions as a dialog; use `role="dialog"` + `aria-label` for complex forms |
| Focus management | Move focus into the popover on open. Return to trigger on close. |
| Escape | Closes the popover |
| Click outside | Closes the popover |
| Screen reader | Trigger announces expanded state |

#### Tailwind + React

```jsx
import { useState, useRef, useEffect } from 'react';

function Popover({ trigger, position = 'bottom', arrow = false, children }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector('button, [href], input, select, textarea')?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (
        !panelRef.current?.contains(e.target) &&
        !triggerRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const positionClasses = {
    top: 'bottom-full mb-sm left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-sm left-1/2 -translate-x-1/2',
    left: 'right-full mr-sm top-1/2 -translate-y-1/2',
    right: 'left-full ml-sm top-1/2 -translate-y-1/2',
  };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>

      {open && (
        <div
          ref={panelRef}
          className={`
            absolute ${positionClasses[position]}
            bg-bg-card border border-border rounded-ds-lg shadow-ds-lg
            p-lg z-dropdown
            animate-[fade-in-up_150ms_ease]
          `}
        >
          {arrow && (
            <div className={`
              absolute w-2 h-2 bg-bg-card border border-border rotate-45
              ${position === 'bottom' ? '-top-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0' : ''}
              ${position === 'top' ? '-bottom-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0' : ''}
              ${position === 'left' ? '-right-1 top-1/2 -translate-y-1/2 border-l-0 border-b-0' : ''}
              ${position === 'right' ? '-left-1 top-1/2 -translate-y-1/2 border-r-0 border-t-0' : ''}
            `} />
          )}
          {children}
        </div>
      )}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .popover-wrapper {
    position: relative;
    display: inline-block;
  }

  .popover-panel {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--space-sm);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--space-lg);
    z-index: var(--z-dropdown);
    animation: fade-in-up var(--duration-micro) var(--ease-default);
  }

  .popover-panel[hidden] {
    display: none;
  }

  /* Arrow at bottom position (arrow points up) */
  .popover-arrow {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: var(--bg-card);
    border-top: 1px solid var(--border);
    border-left: 1px solid var(--border);
  }
</style>

<div class="popover-wrapper">
  <button aria-haspopup="dialog" aria-expanded="false" id="pop-trigger">
    Filter
  </button>
  <div class="popover-panel" hidden>
    <div class="popover-arrow"></div>
    <form>
      <label>
        <input type="checkbox" /> Active only
      </label>
      <label>
        <input type="checkbox" /> Include archived
      </label>
      <button type="submit">Apply</button>
    </form>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use click-to-open for interactive content | Use hover-to-open when the popover has buttons or links |
| Auto-flip position when clipped by viewport | Let the popover overflow off-screen |
| Return focus to the trigger on close | Trap focus like a modal (popovers are lighter) |
| Keep content concise -- use a modal for complex flows | Nest popovers inside popovers |
| Use `aria-haspopup="dialog"` on the trigger | Use `aria-haspopup="menu"` -- that is for dropdown menus |

---

### 6.5 Tooltip

Use tooltips for simple, non-interactive text hints that describe an element on hover or keyboard focus. Tooltips are the lightest overlay -- they provide supplementary information and disappear the instant the pointer or focus leaves the trigger.

#### Anatomy

```
Trigger element  (aria-describedby pointing to tooltip id)
  Tooltip  (role="tooltip", bg-tooltip-bg, border-tooltip-border)
    Arrow  (CSS triangle matching tooltip background)
    Text  (text-tooltip-text, text-caption, max-width 240px)
```

#### Positions

| Position | Placement | Arrow direction |
|----------|-----------|-----------------|
| `top` (default) | Centered above trigger | Points down |
| `right` | Right of trigger, vertically centered | Points left |
| `bottom` | Centered below trigger | Points up |
| `left` | Left of trigger, vertically centered | Points right |

#### States

| State | Behavior |
|-------|----------|
| Hidden | No DOM presence or `visibility: hidden` |
| Delay-in | `150ms` delay before showing on hover / `focus-visible` |
| Visible | Appears with `fade-in-up` (`150ms ease`) |
| Delay-out | `0ms` -- disappears immediately on pointer leave / blur |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Role | `role="tooltip"` on the tooltip element |
| Association | Trigger has `aria-describedby` pointing to the tooltip's `id` |
| Trigger events | Show on `mouseenter` + `focus-visible`. Hide on `mouseleave` + `blur`. |
| Keyboard | Visible when trigger has `focus-visible`. Hidden on `Escape` (optional). |
| Not interactive | Tooltips must **never** contain buttons, links, or form controls. Use Popover for interactive content. |
| Screen reader | Reads tooltip text as the element's accessible description |

#### Tailwind + React

```jsx
import { useState, useRef, useId } from 'react';

const POSITIONS = {
  top: 'bottom-full mb-sm left-1/2 -translate-x-1/2',
  bottom: 'top-full mt-sm left-1/2 -translate-x-1/2',
  left: 'right-full mr-sm top-1/2 -translate-y-1/2',
  right: 'left-full ml-sm top-1/2 -translate-y-1/2',
};

function Tooltip({ text, position = 'top', children }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const id = useId();

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 150);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? id : undefined}>
        {children}
      </span>

      {visible && (
        <span
          id={id}
          role="tooltip"
          className={`
            absolute ${POSITIONS[position]}
            px-md py-xs max-w-[240px]
            bg-tooltip-bg border border-tooltip-border rounded-ds-md
            text-tooltip-text text-caption whitespace-normal
            z-dropdown pointer-events-none
            animate-[fade-in-up_150ms_ease]
          `}
        >
          {text}
        </span>
      )}
    </span>
  );
}
```

Usage:

```jsx
<Tooltip text="Create a new project" position="top">
  <button aria-label="New project">
    <Plus className="w-5 h-5" />
  </button>
</Tooltip>
```

#### Plain CSS + HTML

```html
<style>
  .tooltip-wrapper {
    position: relative;
    display: inline-flex;
  }

  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: var(--space-sm);
    padding: var(--space-xs) var(--space-md);
    max-width: 240px;
    background: var(--tooltip-bg);
    border: 1px solid var(--tooltip-border);
    border-radius: var(--radius-md);
    color: var(--tooltip-text);
    font-size: var(--text-caption);
    font-weight: var(--weight-caption);
    line-height: var(--lh-caption);
    white-space: normal;
    z-index: var(--z-dropdown);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--duration-micro) var(--ease-default),
                visibility var(--duration-micro) var(--ease-default);
  }

  /* Arrow at top position (arrow points down) */
  .tooltip-arrow {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: var(--tooltip-bg);
    border-right: 1px solid var(--tooltip-border);
    border-bottom: 1px solid var(--tooltip-border);
  }

  /* Show on hover and focus-visible (with 150ms delay) */
  .tooltip-wrapper:hover .tooltip,
  .tooltip-wrapper:focus-within .tooltip {
    opacity: 1;
    visibility: visible;
    transition-delay: 150ms;
  }

  /* Hide immediately (0ms delay-out) */
  .tooltip-wrapper:not(:hover):not(:focus-within) .tooltip {
    transition-delay: 0ms;
  }

  /* Position variants */
  .tooltip.bottom {
    bottom: auto;
    top: 100%;
    margin-bottom: 0;
    margin-top: var(--space-sm);
  }

  .tooltip.bottom .tooltip-arrow {
    bottom: auto;
    top: -5px;
    border-right: none;
    border-bottom: none;
    border-top: 1px solid var(--tooltip-border);
    border-left: 1px solid var(--tooltip-border);
  }

  .tooltip.left {
    bottom: auto;
    left: auto;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 0;
    margin-right: var(--space-sm);
  }

  .tooltip.right {
    bottom: auto;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 0;
    margin-left: var(--space-sm);
  }
</style>

<span class="tooltip-wrapper">
  <button aria-describedby="tip-1" aria-label="Settings">
    <!-- icon here -->
  </button>
  <span class="tooltip" id="tip-1" role="tooltip">
    <span class="tooltip-arrow"></span>
    Open application settings
  </span>
</span>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use for supplementary text hints on icon-only buttons | Put interactive content (links, buttons) inside a tooltip |
| Keep text short -- one line or two at most | Write paragraph-length tooltip text |
| Show on both hover and `focus-visible` | Show only on hover (keyboard users would never see it) |
| Use `150ms` delay-in to avoid flicker | Show instantly -- rapid cursor movement causes distracting flashes |
| Use `aria-describedby` to associate trigger and tooltip | Use `aria-label` when `aria-describedby` is the correct pattern |
| Use Popover for any content that needs interaction | Add click handlers to tooltip content |
## Layout

---

### Page Shell -- Sidebar

The standard dashboard layout. A fixed sidebar on the left holds navigation, a top bar contains breadcrumbs and page-level actions, and the main content area fills the remaining width. On mobile, the sidebar becomes an off-canvas drawer.

#### When to Use

- Dashboard applications with 7+ routes
- Workspace-style apps with grouped navigation sections
- Any product app where persistent navigation improves wayfinding

Do not use for marketing pages, public-facing landing pages, or apps with 6 or fewer routes -- use the Top Nav shell instead.

#### Anatomy

```
+--[ sidebar ]----+--[ top bar: breadcrumbs | title | actions ]----+
|  logo           |                                                 |
|  nav group 1    |  [ main content area ]                          |
|  nav group 2    |                                                 |
|  ...            |                                                 |
|  footer/user    |                                                 |
+-----------------+-------------------------------------------------+
```

1. **Sidebar** -- `bg-bg-secondary`, fixed left, full viewport height. `240px` expanded, `64px` collapsed.
2. **Top bar** -- Inside the content region. Contains breadcrumbs, page title, and action buttons. `bg-bg-card`, `border-bottom: 1px solid var(--border)`, height `56px`.
3. **Content area** -- `bg-bg-primary`, `margin-left` matching sidebar width, `padding: var(--space-xl)`.
4. **Mobile drawer** -- Below `768px`, sidebar becomes an off-canvas overlay with `bg-bg-overlay` backdrop.

#### Variants

| Variant | Sidebar Width | Behavior |
|---------|--------------|----------|
| Expanded | `240px` | Full labels + icons visible |
| Collapsed | `64px` | Icons only, tooltips on hover |
| Mobile drawer | Full width or `280px` | Slides in from left over backdrop |

#### States

| State | Treatment |
|-------|-----------|
| Default | Sidebar expanded, content offset by `240px` |
| Collapsed | Sidebar `64px`, content offset by `64px`, `200ms ease` transition |
| Mobile open | Drawer visible, backdrop active, body scroll locked |
| Mobile closed | Drawer off-screen left, backdrop hidden |

#### Accessibility

- Sidebar uses `<nav aria-label="Main navigation">` landmark
- Active item has `aria-current="page"`
- Collapse toggle button has `aria-label="Collapse sidebar"` / `"Expand sidebar"`
- Mobile drawer is focus-trapped when open; `Escape` closes it
- Drawer backdrop is `aria-hidden="true"`

#### Tailwind + React

```jsx
import { useState } from 'react';
import { Menu, ChevronLeft, Home, Settings } from 'lucide-react';

function SidebarShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden md:flex flex-col fixed inset-y-0 left-0 z-drawer
          bg-bg-secondary border-r border-border
          transition-all duration-standard ease-default
          ${collapsed ? 'w-[64px]' : 'w-[240px]'}
        `}
      >
        <div className="flex items-center justify-between h-14 px-lg border-b border-border">
          {!collapsed && <span className="text-h4 text-accent font-semibold">App</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-sm rounded-ds-md text-text-secondary hover:bg-bg-elevated
                       focus-visible:outline-2 focus-visible:outline-accent"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-standard
              ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex-1 py-lg px-sm space-y-xs overflow-y-auto">
          <a
            href="/dashboard"
            aria-current="page"
            className="flex items-center gap-md px-md py-sm rounded-ds-md
                       bg-accent-muted text-accent text-label"
          >
            <Home className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </a>
          <a
            href="/settings"
            className="flex items-center gap-md px-md py-sm rounded-ds-md
                       text-text-secondary hover:bg-bg-elevated hover:text-text-primary
                       text-label transition-colors duration-micro"
          >
            <Settings className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </a>
        </nav>
      </aside>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-bg-overlay z-drawer md:hidden"
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-[280px] z-modal md:hidden
          bg-bg-secondary border-r border-border
          transition-transform duration-standard ease-default
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav aria-label="Main navigation" className="py-lg px-sm space-y-xs">
          {/* Same nav items as desktop */}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-standard ease-default
        ${collapsed ? 'md:ml-[64px]' : 'md:ml-[240px]'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-sticky h-14 flex items-center justify-between
                           px-xl bg-bg-card border-b border-border">
          <div className="flex items-center gap-md">
            <button
              className="md:hidden p-sm rounded-ds-md text-text-secondary hover:bg-bg-elevated"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-caption text-text-tertiary">Home / Dashboard</span>
          </div>
          <h1 className="text-h3 text-text-primary">Dashboard</h1>
        </header>

        <main className="p-xl">{children}</main>
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .shell { display: flex; min-height: 100vh; background: var(--bg-primary); }

  .sidebar {
    position: fixed; inset: 0 auto 0 0;
    width: 240px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    z-index: var(--z-drawer);
    transition: width var(--duration-standard) var(--ease-default);
  }
  .sidebar.collapsed { width: 64px; }

  .sidebar-header {
    display: flex; align-items: center; justify-content: space-between;
    height: 56px; padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--border);
  }

  .sidebar-nav { flex: 1; padding: var(--space-lg) var(--space-sm); overflow-y: auto; }

  .nav-item {
    display: flex; align-items: center; gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    font-size: var(--text-label); font-weight: var(--weight-label);
    color: var(--text-secondary);
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }
  .nav-item:hover { background: var(--bg-elevated); color: var(--text-primary); }
  .nav-item[aria-current="page"] { background: var(--accent-muted); color: var(--accent); }

  .content-area {
    flex: 1; margin-left: 240px;
    transition: margin-left var(--duration-standard) var(--ease-default);
  }
  .sidebar.collapsed ~ .content-area { margin-left: 64px; }

  .top-bar {
    position: sticky; top: 0; z-index: var(--z-sticky);
    height: 56px; display: flex; align-items: center; justify-content: space-between;
    padding: 0 var(--space-xl);
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
  }

  .main-content { padding: var(--space-xl); }

  /* Mobile */
  @media (max-width: 767px) {
    .sidebar { transform: translateX(-100%); width: 280px; z-index: var(--z-modal); }
    .sidebar.open { transform: translateX(0); }
    .content-area { margin-left: 0; }
    .drawer-backdrop {
      position: fixed; inset: 0;
      background: var(--bg-overlay); z-index: var(--z-drawer);
    }
  }
</style>

<div class="shell">
  <aside class="sidebar">
    <div class="sidebar-header">
      <span style="font-size: var(--text-h4); color: var(--accent); font-weight: 600;">App</span>
    </div>
    <nav class="sidebar-nav" aria-label="Main navigation">
      <a href="/dashboard" class="nav-item" aria-current="page">Dashboard</a>
      <a href="/settings" class="nav-item">Settings</a>
    </nav>
  </aside>

  <div class="content-area">
    <header class="top-bar">
      <span style="font-size: var(--text-caption); color: var(--text-tertiary);">Home / Dashboard</span>
      <h1 style="font-size: var(--text-h3); color: var(--text-primary);">Dashboard</h1>
    </header>
    <main class="main-content">
      <!-- Page content -->
    </main>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use `bg-bg-secondary` for the sidebar background | Hardcode `#12131a` or any raw hex |
| Animate sidebar collapse with `200ms ease` | Use spring or bounce easing |
| Provide `aria-current="page"` on the active link | Indicate active state with color alone |
| Lock body scroll when mobile drawer is open | Allow content to scroll behind the drawer |
| Include a visible collapse/expand toggle button | Rely on swipe gestures as the only collapse method |

---

### Page Shell -- Top Nav

A simpler shell with a horizontal navigation bar fixed to the top. Best for marketing pages, public sites, and apps with fewer routes.

#### When to Use

- Public-facing pages and marketing sites
- Simple apps with 6 or fewer primary routes
- Landing pages, documentation, and content sites

#### Anatomy

```
+--[ top nav: logo | links | actions ]--+
|                                        |
|  [ centered content, max 1280px ]      |
|                                        |
+----------------------------------------+
```

1. **Top nav bar** -- Fixed, `bg-bg-card`, `border-bottom: 1px solid var(--border)`, height `56px`, `z-sticky`.
2. **Nav content** -- Centered container, `max-width: 1280px`, horizontal link row.
3. **Main content** -- Below nav, centered `max-width: 1280px`, `bg-bg-primary`, `padding: var(--space-xl)`.
4. **Mobile** -- Links collapse into a hamburger menu (dropdown or drawer).

#### Variants

| Variant | Behavior |
|---------|----------|
| Default | All links visible in nav bar |
| Mobile (< 768px) | Links hidden, hamburger icon toggles dropdown |

#### States

| State | Treatment |
|-------|-----------|
| Default | Nav visible, links in a row |
| Scrolled | Optionally add `shadow-ds-sm` to indicate elevation |
| Mobile menu open | Dropdown visible below nav bar, backdrop optional |
| Mobile menu closed | Dropdown hidden |

#### Accessibility

- Uses `<nav aria-label="Primary navigation">` landmark
- Active link has `aria-current="page"`
- Hamburger button: `aria-label="Open menu"` / `"Close menu"`, `aria-expanded`
- Mobile dropdown is focus-trapped when open; `Escape` closes it

#### Tailwind + React

```jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function TopNavShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="fixed top-0 inset-x-0 z-sticky h-14 bg-bg-card border-b border-border">
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-xl">
          <a href="/" className="text-h4 text-accent font-semibold">Brand</a>

          {/* Desktop links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-xl">
            <a href="/features" className="text-label text-text-secondary hover:text-text-primary
                                           transition-colors duration-micro">Features</a>
            <a href="/pricing" aria-current="page"
               className="text-label text-accent">Pricing</a>
            <a href="/docs" className="text-label text-text-secondary hover:text-text-primary
                                       transition-colors duration-micro">Docs</a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-sm rounded-ds-md text-text-secondary hover:bg-bg-elevated"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav className="md:hidden bg-bg-card border-b border-border px-xl py-lg space-y-sm">
            <a href="/features" className="block text-label text-text-secondary py-sm">Features</a>
            <a href="/pricing" aria-current="page"
               className="block text-label text-accent py-sm">Pricing</a>
            <a href="/docs" className="block text-label text-text-secondary py-sm">Docs</a>
          </nav>
        )}
      </header>

      <main className="pt-14 max-w-[1280px] mx-auto px-xl py-xl">
        {children}
      </main>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .topnav-shell { min-height: 100vh; background: var(--bg-primary); }

  .topnav {
    position: fixed; top: 0; left: 0; right: 0;
    height: 56px; z-index: var(--z-sticky);
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
  }

  .topnav-inner {
    max-width: 1280px; margin: 0 auto; height: 100%;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 var(--space-xl);
  }

  .topnav-brand {
    font-size: var(--text-h4); font-weight: 600; color: var(--accent);
  }

  .topnav-links { display: flex; align-items: center; gap: var(--space-xl); }

  .topnav-link {
    font-size: var(--text-label); font-weight: var(--weight-label);
    color: var(--text-secondary);
    transition: color var(--duration-micro) var(--ease-default);
  }
  .topnav-link:hover { color: var(--text-primary); }
  .topnav-link[aria-current="page"] { color: var(--accent); }

  .topnav-content {
    padding-top: 56px;
    max-width: 1280px; margin: 0 auto;
    padding-left: var(--space-xl); padding-right: var(--space-xl);
    padding-bottom: var(--space-xl);
  }

  @media (max-width: 767px) {
    .topnav-links { display: none; }
    .topnav-links.open { display: flex; flex-direction: column; /* ... */ }
  }
</style>

<div class="topnav-shell">
  <header class="topnav">
    <div class="topnav-inner">
      <a href="/" class="topnav-brand">Brand</a>
      <nav class="topnav-links" aria-label="Primary navigation">
        <a href="/features" class="topnav-link">Features</a>
        <a href="/pricing" class="topnav-link" aria-current="page">Pricing</a>
        <a href="/docs" class="topnav-link">Docs</a>
      </nav>
    </div>
  </header>

  <main class="topnav-content">
    <!-- Page content -->
  </main>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Fix the nav to `top: 0` with `z-sticky` | Let the nav scroll away on long pages |
| Center content with `max-width: 1280px` | Let content span full viewport width unconstrained |
| Collapse links to a hamburger below `768px` | Show all links on mobile, causing overflow |
| Use `aria-expanded` on the hamburger button | Omit expanded state from screen readers |

---

### Divider / Separator

A thin visual break between content sections. Available as horizontal, vertical, or labeled variants.

#### When to Use

- Between groups of related content within a page or card
- As a vertical separator in toolbars or inline layouts
- To label a transition point ("or", "Section 2", a date, etc.)

#### Anatomy

**Horizontal:** A full-width line, `1px solid var(--border)`.

**Vertical:** A full-height line in a flex container, `1px solid var(--border)`.

**Labeled:** A horizontal line interrupted by centered text. The text has `bg-bg-primary` padding to visually mask the line behind it.

#### Variants

| Variant | CSS | Notes |
|---------|-----|-------|
| Horizontal | `border-top: 1px solid var(--border)` | Default. Full-width block element. |
| Vertical | `border-left: 1px solid var(--border)` | Inline within a flex row. Self-stretches to parent height. |
| Labeled | Horizontal line + centered `<span>` | Text uses `text-caption`, `text-text-tertiary`, `bg-bg-primary` padding |

#### States

Dividers have no interactive states. They are purely decorative.

#### Accessibility

- Horizontal and vertical dividers use `role="separator"`
- Labeled dividers use `role="separator"` on the container
- Purely decorative dividers may use `aria-hidden="true"` if they carry no semantic meaning
- Never use a divider as the only indicator of content grouping -- pair with headings

#### Tailwind + React

```jsx
function DividerHorizontal() {
  return <hr className="border-t border-border my-xl" role="separator" />;
}

function DividerVertical() {
  return <div className="border-l border-border self-stretch mx-md" role="separator" />;
}

function DividerLabeled({ label }) {
  return (
    <div className="flex items-center gap-lg my-xl" role="separator">
      <div className="flex-1 border-t border-border" />
      <span className="text-caption text-text-tertiary px-sm bg-bg-primary">{label}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .divider-h {
    border: none; border-top: 1px solid var(--border);
    margin: var(--space-xl) 0;
  }

  .divider-v {
    border: none; border-left: 1px solid var(--border);
    align-self: stretch;
    margin: 0 var(--space-md);
  }

  .divider-labeled {
    display: flex; align-items: center; gap: var(--space-lg);
    margin: var(--space-xl) 0;
  }
  .divider-labeled::before,
  .divider-labeled::after {
    content: ''; flex: 1;
    border-top: 1px solid var(--border);
  }
  .divider-labeled span {
    font-size: var(--text-caption); font-weight: var(--weight-caption);
    color: var(--text-tertiary);
    padding: 0 var(--space-sm);
    background: var(--bg-primary);
  }
</style>

<!-- Horizontal -->
<hr class="divider-h" role="separator" />

<!-- Vertical (inside a flex row) -->
<div style="display: flex; align-items: center;">
  <span>Left</span>
  <div class="divider-v" role="separator"></div>
  <span>Right</span>
</div>

<!-- Labeled -->
<div class="divider-labeled" role="separator">
  <span>or continue with</span>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use `var(--border)` for the line color | Hardcode a gray hex value |
| Add `role="separator"` for semantic clarity | Use an empty `<div>` with no role |
| Use `bg-bg-primary` on the label to mask the line | Let the line show through the label text |
| Use sparingly between logical groups | Place a divider between every single item in a list |

---

### Bottom Sheet (Mobile)

A panel that slides up from the bottom of the screen on mobile. Used for contextual actions, confirmations, or auxiliary content that does not warrant a full modal.

#### When to Use

- Mobile-only action menus (share, delete, edit options)
- Confirmations and quick forms on small screens
- Auxiliary content that should not navigate the user away

Do not use on desktop -- prefer modal dialogs, popovers, or inline panels instead.

#### Anatomy

```
+----------- viewport -----------+
|                                |
|        [ backdrop ]            |
|                                |
+--------------------------------+
| [ ---- drag handle ---- ]     |
| [ content / actions ]         |
| [ content / actions ]         |
+--------------------------------+
```

1. **Backdrop** -- `bg-bg-overlay`, fixed full-screen, `z-overlay`.
2. **Sheet panel** -- Fixed `bottom: 0`, full-width, `bg-bg-card`, top corners `border-radius: var(--radius-xl) var(--radius-xl) 0 0`, `z-modal`.
3. **Drag handle** -- `width: 32px`, `height: 4px`, `border-radius: var(--radius-full)`, `bg-text-muted`, centered at top with `padding: var(--space-md) 0`.
4. **Content area** -- Padding `var(--space-xl)`, scrollable if content exceeds viewport.

#### Variants

| Variant | Height | Behavior |
|---------|--------|----------|
| Peek | ~30% viewport | Shows a summary; drag up to expand |
| Expanded | Up to 90% viewport | Full content visible, scrollable internally |
| Dismissed | 0 | Slides down and hides; backdrop fades out |

#### States

| State | Treatment |
|-------|-----------|
| Entering | Slide up from off-screen, `400ms ease`; backdrop fades in `200ms ease` |
| Peek | Partial height, drag handle visible, content partially visible |
| Expanded | Near-full height, content scrollable |
| Exiting | Slide down, `200ms ease`; backdrop fades out `150ms ease` |

#### Accessibility

- Sheet panel uses `role="dialog"`, `aria-modal="true"`, `aria-label="[descriptive name]"`
- Focus is trapped inside the sheet while open
- `Escape` key dismisses the sheet
- Drag handle is decorative (`aria-hidden="true"`) -- provide a close button for keyboard users
- When dismissed, focus returns to the triggering element

#### Tailwind + React

```jsx
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

function BottomSheet({ open, onClose, title, children }) {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (open) {
      sheetRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg-overlay z-overlay animate-[fade-in-up_200ms_ease]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="fixed bottom-0 inset-x-0 z-modal bg-bg-card
                   rounded-t-xl shadow-ds-lg
                   animate-[fade-in-up_400ms_ease]
                   max-h-[90vh] flex flex-col"
      >
        {/* Drag handle (decorative) */}
        <div className="flex justify-center pt-md pb-sm" aria-hidden="true">
          <div className="w-8 h-1 rounded-full bg-text-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-xl pb-md">
          <h2 className="text-h3 text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-xs rounded-ds-md text-text-secondary hover:bg-bg-elevated
                       focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-xl pb-xl">
          {children}
        </div>
      </div>
    </>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .bottom-sheet-backdrop {
    position: fixed; inset: 0;
    background: var(--bg-overlay);
    z-index: var(--z-overlay);
    animation: fade-in-up 200ms var(--ease-default);
  }

  .bottom-sheet {
    position: fixed; bottom: 0; left: 0; right: 0;
    z-index: var(--z-modal);
    background: var(--bg-card);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    box-shadow: var(--shadow-lg);
    max-height: 90vh;
    display: flex; flex-direction: column;
    animation: slide-up 400ms var(--ease-default);
  }

  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }

  .bottom-sheet-handle {
    width: 32px; height: 4px;
    border-radius: var(--radius-full);
    background: var(--text-muted);
    margin: var(--space-md) auto var(--space-sm);
  }

  .bottom-sheet-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 var(--space-xl) var(--space-md);
  }

  .bottom-sheet-content {
    flex: 1; overflow-y: auto;
    padding: 0 var(--space-xl) var(--space-xl);
  }
</style>

<div class="bottom-sheet-backdrop" aria-hidden="true"></div>
<div class="bottom-sheet" role="dialog" aria-modal="true" aria-label="Actions">
  <div class="bottom-sheet-handle" aria-hidden="true"></div>
  <div class="bottom-sheet-header">
    <h2 style="font-size: var(--text-h3); color: var(--text-primary);">Actions</h2>
    <button aria-label="Close"><!-- close icon --></button>
  </div>
  <div class="bottom-sheet-content">
    <!-- Sheet content -->
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Only use on mobile viewports (< 768px) | Show a bottom sheet on desktop |
| Provide a close button for keyboard users | Rely on drag-to-dismiss as the only close method |
| Lock body scroll when sheet is open | Allow background content to scroll |
| Animate entry at `400ms ease`, exit at `200ms ease` | Use bounce or spring easing |
| Top corners use `border-radius: var(--radius-xl)` | Round all four corners |

---

## Marketing & Utility

---

### Command Palette

A search-driven command dialog triggered by a keyboard shortcut. Users can find and execute actions, navigate to pages, or search content without leaving the keyboard.

#### When to Use

- Any product app where power users benefit from keyboard-driven navigation
- Apps with many routes, commands, or searchable entities
- As a complement (not replacement) to primary navigation

#### Anatomy

```
+--[ overlay backdrop ]------+
|                            |
|  +--[ dialog panel ]----+  |
|  | [ search input     ] |  |
|  | [ group header     ] |  |
|  | [ result option    ] |  |
|  | [ result option *  ] |  |
|  | [ group header     ] |  |
|  | [ result option    ] |  |
|  | [ keyboard hints   ] |  |
|  +-----------------------+  |
|                            |
+----------------------------+
```

1. **Backdrop** -- `bg-bg-overlay`, fixed full-screen, `z-overlay`. Click to dismiss.
2. **Panel** -- `role="dialog"`, `aria-modal="true"`, centered, `max-width: 560px`, `bg-bg-card`, `border: 1px solid var(--border)`, `border-radius: var(--radius-lg)`, `shadow-ds-lg`, `z-modal`.
3. **Search input** -- `role="combobox"`, `aria-expanded`, `aria-controls` pointing to the listbox. Full-width, no visible border (borderless within the panel), `padding: var(--space-lg)`.
4. **Results list** -- `role="listbox"`, each item `role="option"` with `aria-selected` on the active (highlighted) item.
5. **Group headers** -- Non-interactive section labels, `text-overline text-text-tertiary`, `padding: var(--space-sm) var(--space-lg)`.
6. **Footer** -- Keyboard hints in `text-caption text-text-muted`, `border-top: 1px solid var(--border)`, `padding: var(--space-sm) var(--space-lg)`.

#### Variants

| Variant | Description |
|---------|------------|
| Default | Flat list of results |
| Grouped | Results organized under category headers (Pages, Commands, Recent) |
| Empty state | "No results found" message with suggestion text |

#### States

| State | Treatment |
|-------|-----------|
| Closed | Not rendered or visually hidden |
| Open (empty) | Panel visible, input focused, no results shown yet |
| Open (results) | Results listed, first item highlighted by default |
| Open (no match) | Empty state message displayed |
| Active option | `bg-bg-elevated` highlight on the option with `aria-selected="true"` |

#### Accessibility

- Trigger: global `keydown` listener for `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
- Panel: `role="dialog"`, `aria-modal="true"`, `aria-label="Command palette"`
- Input: `role="combobox"`, `aria-expanded="true"`, `aria-controls="[listbox-id]"`, `aria-activedescendant="[active-option-id]"`
- Results: `role="listbox"`, `id` matching `aria-controls`
- Each result: `role="option"`, unique `id`, `aria-selected` on active
- Keyboard: `ArrowDown` / `ArrowUp` navigate, `Enter` selects, `Escape` closes
- Focus is trapped inside the dialog while open
- On close, focus returns to the element that triggered the palette

#### Tailwind + React

```jsx
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

function CommandPalette({ commands, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = Object.groupBy(filtered, (cmd) => cmd.category);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); setQuery(''); }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && filtered[activeIndex]) {
      onSelect(filtered[activeIndex]);
      setOpen(false);
      setQuery('');
    }
  };

  if (!open) return null;

  let optionIndex = -1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg-overlay z-overlay"
        onClick={() => { setOpen(false); setQuery(''); }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="fixed inset-0 z-modal flex items-start justify-center pt-[20vh]"
      >
        <div className="w-full max-w-[560px] bg-bg-card border border-border
                        rounded-ds-lg shadow-ds-lg overflow-hidden
                        animate-[scale-in_200ms_ease]"
        >
          {/* Search input */}
          <div className="flex items-center gap-md px-lg border-b border-border">
            <Search className="w-5 h-5 text-text-muted shrink-0" />
            <input
              ref={inputRef}
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-listbox"
              aria-activedescendant={filtered[activeIndex] ? `option-${activeIndex}` : undefined}
              type="text"
              placeholder="Search commands..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent py-lg text-body text-text-primary
                         placeholder:text-text-muted outline-none"
            />
          </div>

          {/* Results */}
          <ul
            id="palette-listbox"
            role="listbox"
            className="max-h-[320px] overflow-y-auto py-sm"
          >
            {filtered.length === 0 && (
              <li className="px-lg py-xl text-center text-body text-text-secondary">
                No results found.
              </li>
            )}
            {Object.entries(grouped).map(([category, items]) => (
              <li key={category} role="presentation">
                <div className="text-overline text-text-tertiary px-lg pt-md pb-xs">
                  {category}
                </div>
                <ul role="group" aria-label={category}>
                  {items.map((cmd) => {
                    optionIndex++;
                    const isActive = optionIndex === activeIndex;
                    const idx = optionIndex;
                    return (
                      <li
                        key={cmd.id}
                        id={`option-${idx}`}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => { onSelect(cmd); setOpen(false); setQuery(''); }}
                        className={`flex items-center gap-md px-lg py-sm cursor-pointer
                          text-label transition-colors duration-micro
                          ${isActive ? 'bg-bg-elevated text-text-primary' : 'text-text-secondary hover:bg-bg-elevated'}`}
                      >
                        {cmd.icon && <cmd.icon className="w-4 h-4 shrink-0" />}
                        <span>{cmd.label}</span>
                        {cmd.shortcut && (
                          <kbd className="ml-auto text-caption text-text-muted">{cmd.shortcut}</kbd>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>

          {/* Footer hints */}
          <div className="flex items-center gap-lg px-lg py-sm border-t border-border">
            <span className="text-caption text-text-muted">
              <kbd className="px-xs py-2xs bg-bg-elevated rounded-ds-sm text-caption">↑↓</kbd> navigate
            </span>
            <span className="text-caption text-text-muted">
              <kbd className="px-xs py-2xs bg-bg-elevated rounded-ds-sm text-caption">↵</kbd> select
            </span>
            <span className="text-caption text-text-muted">
              <kbd className="px-xs py-2xs bg-bg-elevated rounded-ds-sm text-caption">esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .cmd-backdrop {
    position: fixed; inset: 0;
    background: var(--bg-overlay);
    z-index: var(--z-overlay);
  }

  .cmd-wrapper {
    position: fixed; inset: 0;
    z-index: var(--z-modal);
    display: flex; align-items: flex-start; justify-content: center;
    padding-top: 20vh;
  }

  .cmd-panel {
    width: 100%; max-width: 560px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    animation: scale-in 200ms var(--ease-default);
  }

  .cmd-input-row {
    display: flex; align-items: center; gap: var(--space-md);
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--border);
  }

  .cmd-input {
    flex: 1; background: transparent; border: none; outline: none;
    padding: var(--space-lg) 0;
    font-size: var(--text-body); color: var(--text-primary);
  }
  .cmd-input::placeholder { color: var(--text-muted); }

  .cmd-results {
    max-height: 320px; overflow-y: auto;
    padding: var(--space-sm) 0;
    list-style: none;
  }

  .cmd-group-header {
    font-size: var(--text-overline); font-weight: var(--weight-overline);
    letter-spacing: var(--ls-overline); text-transform: uppercase;
    color: var(--text-tertiary);
    padding: var(--space-md) var(--space-lg) var(--space-xs);
  }

  .cmd-option {
    display: flex; align-items: center; gap: var(--space-md);
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--text-label); font-weight: var(--weight-label);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }
  .cmd-option:hover,
  .cmd-option[aria-selected="true"] {
    background: var(--bg-elevated); color: var(--text-primary);
  }

  .cmd-footer {
    display: flex; align-items: center; gap: var(--space-lg);
    padding: var(--space-sm) var(--space-lg);
    border-top: 1px solid var(--border);
    font-size: var(--text-caption); color: var(--text-muted);
  }

  .cmd-kbd {
    display: inline-block;
    padding: var(--space-2xs) var(--space-xs);
    background: var(--bg-elevated);
    border-radius: var(--radius-sm);
    font-size: var(--text-caption);
  }
</style>

<div class="cmd-backdrop" aria-hidden="true"></div>
<div class="cmd-wrapper">
  <div class="cmd-panel" role="dialog" aria-modal="true" aria-label="Command palette">
    <div class="cmd-input-row">
      <!-- search icon -->
      <input class="cmd-input" role="combobox"
             aria-expanded="true" aria-controls="cmd-list"
             placeholder="Search commands..." />
    </div>
    <ul id="cmd-list" class="cmd-results" role="listbox">
      <li class="cmd-group-header" role="presentation">Pages</li>
      <li class="cmd-option" role="option" aria-selected="true" id="opt-0">Dashboard</li>
      <li class="cmd-option" role="option" id="opt-1">Settings</li>
      <li class="cmd-group-header" role="presentation">Commands</li>
      <li class="cmd-option" role="option" id="opt-2">Toggle theme</li>
    </ul>
    <div class="cmd-footer">
      <span><kbd class="cmd-kbd">↑↓</kbd> navigate</span>
      <span><kbd class="cmd-kbd">↵</kbd> select</span>
      <span><kbd class="cmd-kbd">esc</kbd> close</span>
    </div>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Trap focus inside the dialog while open | Allow Tab to escape to the page behind |
| Return focus to the trigger element on close | Leave focus stranded after dismissal |
| Use `aria-activedescendant` to track the active option | Move DOM focus to each option (use virtual focus) |
| Group results by category with clear headers | Show a flat unsorted list with no grouping |
| Show keyboard hints in the footer | Assume all users know the keyboard shortcuts |
| Limit `max-width` to `560px` | Let the palette stretch to full viewport width |

---

### Pricing Table

A multi-column comparison of plan tiers for marketing pages. One plan is visually promoted as recommended.

#### When to Use

- Marketing landing pages with tiered pricing
- Plan comparison and upgrade flows
- Any context where users choose between subscription levels

#### Anatomy

```
+--[ billing toggle: Monthly | Annual ]--+

+--------+----------+----------+--------+
|  Free  | Pro      | Team     | Enter. |
|        | ★Popular |          |        |
| $0/mo  | $19/mo   | $49/mo   | Custom |
|        |          |          |        |
| ✓ feat | ✓ feat   | ✓ feat   | ✓ feat |
| ✓ feat | ✓ feat   | ✓ feat   | ✓ feat |
| ✗ feat | ✓ feat   | ✓ feat   | ✓ feat |
| ✗ feat | ✗ feat   | ✓ feat   | ✓ feat |
|        |          |          |        |
| [CTA ] | [CTA ★ ] | [CTA ]   | [CTA ] |
+--------+----------+----------+--------+
```

1. **Billing toggle** -- Segmented control at top: Monthly / Annual. Annual shows savings badge.
2. **Plan columns** -- 2-4 columns, equal width. Each has plan name, price, feature list, CTA.
3. **Recommended plan** -- `border: 2px solid var(--accent)`, optional "Popular" badge (`bg-accent text-text-on-accent`).
4. **Feature rows** -- Checkmark icon in `text-success` for included, X icon in `text-text-muted` for excluded.
5. **CTA buttons** -- Primary (`bg-accent`) for recommended plan, default for others.

#### Variants

| Variant | Columns | Notes |
|---------|---------|-------|
| Compact | 2 | Side-by-side comparison (free vs paid) |
| Standard | 3 | Most common (free, pro, team) |
| Full | 4 | Enterprise tier added |
| Mobile | 1 (stacked) | Cards stack vertically below `768px` |

#### States

| State | Treatment |
|-------|-----------|
| Monthly selected | Monthly prices shown, Monthly segment active |
| Annual selected | Annual prices shown, Annual segment active, savings badge visible |
| Hover on plan card | `shadow-ds-md` elevation increase |
| Hover on CTA | Standard button hover state |

#### Accessibility

- Billing toggle uses `role="radiogroup"` with `role="radio"` options, `aria-checked`
- Feature check/X marks: use `aria-label="Included"` or `aria-label="Not included"` on icons
- Plan columns are structured with headings (`<h3>`) for each plan name
- CTA buttons have descriptive text ("Start Free", "Upgrade to Pro") -- not just "Get Started"
- Price changes on toggle are announced via `aria-live="polite"` region

#### Tailwind + React

```jsx
import { useState } from 'react';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Free', monthly: 0, annual: 0, popular: false,
    features: [true, true, false, false],
    cta: 'Start Free',
  },
  {
    name: 'Pro', monthly: 19, annual: 15, popular: true,
    features: [true, true, true, false],
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Team', monthly: 49, annual: 39, popular: false,
    features: [true, true, true, true],
    cta: 'Choose Team',
  },
];

const featureLabels = ['Unlimited projects', '10 GB storage', 'Priority support', 'Custom domain'];

function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <section className="max-w-[1024px] mx-auto px-xl py-3xl">
      {/* Billing toggle */}
      <div className="flex justify-center mb-2xl" role="radiogroup" aria-label="Billing period">
        {['monthly', 'annual'].map((period) => (
          <button
            key={period}
            role="radio"
            aria-checked={billing === period}
            onClick={() => setBilling(period)}
            className={`px-xl py-sm text-label capitalize transition-colors duration-micro
              ${billing === period
                ? 'bg-accent text-text-on-accent rounded-ds-md'
                : 'bg-bg-elevated text-text-secondary rounded-ds-md'}`}
          >
            {period}
            {period === 'annual' && <span className="ml-sm text-caption"> Save 20%</span>}
          </button>
        ))}
      </div>

      {/* Price display (live region) */}
      <div aria-live="polite" className="sr-only">
        Showing {billing} prices.
      </div>

      {/* Plan columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col bg-bg-card rounded-ds-lg p-xl
              transition-shadow duration-standard hover:shadow-ds-md
              ${plan.popular
                ? 'border-2 border-accent shadow-ds-md'
                : 'border border-border'}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2
                               bg-accent text-text-on-accent text-caption font-semibold
                               px-md py-xs rounded-ds-md">
                Popular
              </span>
            )}

            <h3 className="text-h3 text-text-primary mb-sm">{plan.name}</h3>
            <p className="text-display-2 text-text-primary font-bold mb-xs">
              ${billing === 'monthly' ? plan.monthly : plan.annual}
              <span className="text-body text-text-secondary font-normal">/mo</span>
            </p>

            <ul className="flex-1 space-y-md my-xl">
              {featureLabels.map((feat, i) => (
                <li key={feat} className="flex items-center gap-sm text-body">
                  {plan.features[i] ? (
                    <Check className="w-4 h-4 text-success shrink-0" aria-label="Included" />
                  ) : (
                    <X className="w-4 h-4 text-text-muted shrink-0" aria-label="Not included" />
                  )}
                  <span className={plan.features[i] ? 'text-text-primary' : 'text-text-muted'}>
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-sm rounded-ds-md text-label font-semibold
                transition-colors duration-micro
                ${plan.popular
                  ? 'bg-accent text-text-on-accent hover:bg-accent-hover'
                  : 'bg-bg-elevated text-text-primary hover:bg-border-hover border border-border'}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .pricing-section {
    max-width: 1024px; margin: 0 auto;
    padding: var(--space-xl);
  }

  .billing-toggle {
    display: flex; justify-content: center;
    margin-bottom: var(--space-2xl);
  }
  .billing-toggle button {
    padding: var(--space-sm) var(--space-xl);
    font-size: var(--text-label); font-weight: var(--weight-label);
    border: none; cursor: pointer;
    border-radius: var(--radius-md);
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }
  .billing-toggle button[aria-checked="true"] {
    background: var(--accent); color: var(--text-on-accent);
  }
  .billing-toggle button[aria-checked="false"] {
    background: var(--bg-elevated); color: var(--text-secondary);
  }

  .pricing-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
  }
  @media (max-width: 767px) {
    .pricing-grid { grid-template-columns: 1fr; }
  }

  .plan-card {
    position: relative;
    display: flex; flex-direction: column;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    border: 1px solid var(--border);
    transition: box-shadow var(--duration-standard) var(--ease-default);
  }
  .plan-card:hover { box-shadow: var(--shadow-md); }
  .plan-card.popular { border: 2px solid var(--accent); box-shadow: var(--shadow-md); }

  .popular-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--accent); color: var(--text-on-accent);
    font-size: var(--text-caption); font-weight: 600;
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-md);
  }

  .plan-name { font-size: var(--text-h3); font-weight: var(--weight-h3); color: var(--text-primary); }
  .plan-price { font-size: var(--text-display-2); font-weight: 700; color: var(--text-primary); }
  .plan-price span { font-size: var(--text-body); font-weight: 400; color: var(--text-secondary); }

  .feature-list { list-style: none; flex: 1; margin: var(--space-xl) 0; }
  .feature-list li {
    display: flex; align-items: center; gap: var(--space-sm);
    font-size: var(--text-body); padding: var(--space-xs) 0;
  }
  .feature-included { color: var(--success); }
  .feature-excluded { color: var(--text-muted); }

  .plan-cta {
    width: 100%; padding: var(--space-sm) 0;
    border-radius: var(--radius-md);
    font-size: var(--text-label); font-weight: 600;
    border: none; cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default);
  }
  .plan-cta.primary { background: var(--accent); color: var(--text-on-accent); }
  .plan-cta.primary:hover { background: var(--accent-hover); }
  .plan-cta.default { background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border); }
  .plan-cta.default:hover { background: var(--border-hover); }
</style>

<section class="pricing-section">
  <div class="billing-toggle" role="radiogroup" aria-label="Billing period">
    <button role="radio" aria-checked="true">Monthly</button>
    <button role="radio" aria-checked="false">Annual <small>Save 20%</small></button>
  </div>

  <div class="pricing-grid">
    <div class="plan-card">
      <h3 class="plan-name">Free</h3>
      <p class="plan-price">$0<span>/mo</span></p>
      <ul class="feature-list">
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Unlimited projects</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> 10 GB storage</li>
        <li><span class="feature-excluded" aria-label="Not included">&#10007;</span> Priority support</li>
      </ul>
      <button class="plan-cta default">Start Free</button>
    </div>

    <div class="plan-card popular">
      <span class="popular-badge">Popular</span>
      <h3 class="plan-name">Pro</h3>
      <p class="plan-price">$19<span>/mo</span></p>
      <ul class="feature-list">
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Unlimited projects</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> 10 GB storage</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Priority support</li>
      </ul>
      <button class="plan-cta primary">Upgrade to Pro</button>
    </div>

    <div class="plan-card">
      <h3 class="plan-name">Team</h3>
      <p class="plan-price">$49<span>/mo</span></p>
      <ul class="feature-list">
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Unlimited projects</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> 10 GB storage</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Priority support</li>
      </ul>
      <button class="plan-cta default">Choose Team</button>
    </div>
  </div>
</section>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Highlight the recommended plan with `border-accent` | Use color alone to differentiate plans |
| Use `text-success` checkmarks and `text-text-muted` X marks | Use emoji or images for feature indicators |
| Stack columns vertically on mobile | Force horizontal scroll on small screens |
| Give each CTA a descriptive label ("Upgrade to Pro") | Use generic "Get Started" on every button |
| Announce price changes via `aria-live` on toggle | Silently swap prices with no screen reader notification |

---

### Error Pages

Full-screen centered pages for HTTP error states. The status code is displayed in the Cinzel display font as a brand moment.

#### When to Use

- 404: Resource not found
- 500: Server error
- 503: Maintenance mode
- Any unrecoverable error that replaces the normal page content

#### Anatomy

```
+---------- full viewport ----------+
|                                   |
|          [ status code ]          |   font-display, text-display-1, text-accent
|          [ heading ]              |   text-h2, text-text-primary
|          [ description ]          |   text-body, text-text-secondary
|          [ CTA button ]           |   primary button
|                                   |
+-----------------------------------+
```

1. **Status code** -- `font-family: var(--font-display)` (Cinzel), `font-size: var(--text-display-1)`, `color: var(--accent)`. The large gold number is the brand signature.
2. **Heading** -- `text-h2`, `text-text-primary`. Brief error summary.
3. **Description** -- `text-body`, `text-text-secondary`. Friendly explanation.
4. **CTA** -- Primary button. Always present -- the user must have an escape route.

#### Variants

| Variant | Code | Heading | Description | CTA |
|---------|------|---------|-------------|-----|
| Not Found | 404 | Page not found | The page you're looking for doesn't exist or has been moved. | Go Home |
| Server Error | 500 | Something went wrong | We're working on it. Please try again in a moment. | Try Again |
| Maintenance | 503 | Under maintenance | We're making improvements. We'll be back shortly. | Check Status |

#### States

Error pages have no interactive states beyond the CTA button's standard hover/focus/active states.

#### Accessibility

- Page uses a `<main>` landmark
- Status code is decorative for screen readers -- use `aria-hidden="true"` and provide the error in the heading
- Heading uses `<h1>` (it is the primary content of the page)
- CTA button has clear, descriptive text
- `<title>` element reflects the error: "404 -- Page Not Found | App Name"

#### Tailwind + React

```jsx
import { useNavigate } from 'react-router-dom';

function ErrorPage({ code = 404, heading, description, ctaLabel, ctaAction }) {
  const navigate = useNavigate();

  const defaults = {
    404: {
      heading: 'Page not found',
      description: "The page you're looking for doesn't exist or has been moved.",
      ctaLabel: 'Go Home',
      ctaAction: () => navigate('/'),
    },
    500: {
      heading: 'Something went wrong',
      description: "We're working on it. Please try again in a moment.",
      ctaLabel: 'Try Again',
      ctaAction: () => window.location.reload(),
    },
    503: {
      heading: 'Under maintenance',
      description: "We're making improvements. We'll be back shortly.",
      ctaLabel: 'Check Status',
      ctaAction: () => navigate('/status'),
    },
  };

  const config = defaults[code] || defaults[500];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-xl text-center">
      <p
        aria-hidden="true"
        className="font-display text-display-1 text-accent leading-none mb-lg"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {code}
      </p>
      <h1 className="text-h2 text-text-primary mb-sm">
        {heading || config.heading}
      </h1>
      <p className="text-body text-text-secondary max-w-md mb-xl">
        {description || config.description}
      </p>
      <button
        onClick={ctaAction || config.ctaAction}
        className="px-xl py-sm bg-accent text-text-on-accent rounded-ds-md
                   text-label font-semibold hover:bg-accent-hover
                   transition-colors duration-micro
                   focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {ctaLabel || config.ctaLabel}
      </button>
    </main>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .error-page {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--bg-primary);
    padding: var(--space-xl);
    text-align: center;
  }

  .error-code {
    font-family: var(--font-display);
    font-size: var(--text-display-1);
    font-weight: var(--weight-display-1);
    letter-spacing: var(--ls-display-1);
    line-height: var(--lh-display-1);
    color: var(--accent);
    margin-bottom: var(--space-lg);
  }

  .error-heading {
    font-size: var(--text-h2);
    font-weight: var(--weight-h2);
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }

  .error-description {
    font-size: var(--text-body);
    color: var(--text-secondary);
    max-width: 28rem;
    margin-bottom: var(--space-xl);
  }

  .error-cta {
    padding: var(--space-sm) var(--space-xl);
    background: var(--accent);
    color: var(--text-on-accent);
    border: none; border-radius: var(--radius-md);
    font-size: var(--text-label); font-weight: 600;
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default);
  }
  .error-cta:hover { background: var(--accent-hover); }
  .error-cta:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>

<main class="error-page">
  <p class="error-code" aria-hidden="true">404</p>
  <h1 class="error-heading">Page not found</h1>
  <p class="error-description">
    The page you're looking for doesn't exist or has been moved.
  </p>
  <a href="/" class="error-cta">Go Home</a>
</main>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use Cinzel (`--font-display`) for the status code | Use Inter or any sans-serif for the code number |
| Color the status code with `text-accent` (gold) | Use red or error color for the status code |
| Always provide a CTA button | Leave the user on a dead-end page with no action |
| Set the page `<title>` to reflect the error | Keep the default page title on error pages |
| Use `aria-hidden="true"` on the decorative status code | Let screen readers announce "four zero four" |

---

## Using Without Tailwind (Plain CSS)

This design system works fully without Tailwind. The foundation is `globals.css`, which defines all tokens as CSS custom properties. Any application can use these variables directly.

### Setup

**Option 1: HTML link tag**

```html
<link rel="stylesheet" href="path-to-design-system/globals.css" />
```

**Option 2: CSS or bundler import**

```css
@import 'path-to-design-system/globals.css';
```

```js
// In a bundler (Vite, Webpack, etc.)
import 'path-to-design-system/globals.css';
```

### Setting the Theme

Apply `data-theme` on the root `<html>` element. Dark mode is the default and preferred theme.

```html
<html data-theme="dark">  <!-- default: cool blue-black -->
<html data-theme="light"> <!-- warm cream/parchment alternate -->
```

To toggle at runtime:

```js
document.documentElement.setAttribute('data-theme',
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
);
```

### Example: Card Component (Plain CSS)

```html
<style>
  .ds-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--duration-standard) var(--ease-default),
                border-color var(--duration-standard) var(--ease-default);
  }
  .ds-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--border-hover);
  }
  .ds-card-title {
    font-size: var(--text-h3);
    font-weight: var(--weight-h3);
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }
  .ds-card-body {
    font-size: var(--text-body);
    color: var(--text-secondary);
    line-height: var(--lh-body);
  }
</style>

<div class="ds-card">
  <h3 class="ds-card-title">Card Title</h3>
  <p class="ds-card-body">
    Card description using only design system tokens. No hardcoded values.
  </p>
</div>
```

### Example: Form with Validation (Plain CSS)

```html
<style>
  .ds-field { margin-bottom: var(--space-lg); }

  .ds-label {
    display: block;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
  }

  .ds-input {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    font-size: var(--text-body);
    color: var(--text-primary);
    transition: border-color var(--duration-micro) var(--ease-default),
                box-shadow var(--duration-micro) var(--ease-default);
  }
  .ds-input::placeholder { color: var(--text-muted); }
  .ds-input:hover { border-color: var(--border-hover); }
  .ds-input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-muted);
  }
  .ds-input.error {
    border-color: var(--error);
    box-shadow: 0 0 0 3px var(--error-muted);
  }

  .ds-error-message {
    font-size: var(--text-caption);
    color: var(--error);
    margin-top: var(--space-xs);
  }
</style>

<div class="ds-field">
  <label class="ds-label" for="email">Email address</label>
  <input class="ds-input" type="email" id="email" placeholder="you@example.com" />
</div>

<div class="ds-field">
  <label class="ds-label" for="password">Password</label>
  <input class="ds-input error" type="password" id="password"
         aria-describedby="password-error" aria-invalid="true" />
  <p class="ds-error-message" id="password-error">Password must be at least 8 characters.</p>
</div>
```

### Tailwind Class to CSS Variable Mapping

Use this table to translate between common Tailwind utility class patterns and the underlying CSS variables from `globals.css`. When using Tailwind, reference tokens via arbitrary values: `bg-[var(--bg-card)]`, `text-[var(--text-primary)]`, etc.

#### Backgrounds

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `bg-bg-primary` | `var(--bg-primary)` |
| `bg-bg-secondary` | `var(--bg-secondary)` |
| `bg-bg-surface` | `var(--bg-surface)` |
| `bg-bg-card` | `var(--bg-card)` |
| `bg-bg-elevated` | `var(--bg-elevated)` |
| `bg-bg-overlay` | `var(--bg-overlay)` |

#### Text Colors

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `text-text-primary` | `var(--text-primary)` |
| `text-text-secondary` | `var(--text-secondary)` |
| `text-text-tertiary` | `var(--text-tertiary)` |
| `text-text-muted` | `var(--text-muted)` |
| `text-text-on-accent` | `var(--text-on-accent)` |

#### Accent

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `bg-accent` | `var(--accent)` |
| `bg-accent-hover` | `var(--accent-hover)` |
| `bg-accent-active` | `var(--accent-active)` |
| `bg-accent-muted` | `var(--accent-muted)` |
| `bg-accent-subtle` | `var(--accent-subtle)` |
| `text-accent` | `var(--accent)` |
| `border-accent` | `var(--accent)` |

#### Semantic Colors

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `text-error` | `var(--error)` |
| `bg-error-muted` | `var(--error-muted)` |
| `text-success` | `var(--success)` |
| `bg-success-muted` | `var(--success-muted)` |
| `text-warning` | `var(--warning)` |
| `bg-warning-muted` | `var(--warning-muted)` |
| `text-info` | `var(--info)` |
| `bg-info-muted` | `var(--info-muted)` |

#### Borders

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `border-border` | `var(--border)` |
| `border-border-hover` | `var(--border-hover)` |
| `border-border-focus` | `var(--border-focus)` |

#### Border Radii

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `rounded-ds-sm` | `var(--radius-sm)` -- `6px` |
| `rounded-ds-md` | `var(--radius-md)` -- `8px` |
| `rounded-ds-lg` | `var(--radius-lg)` -- `12px` |
| `rounded-ds-xl` | `var(--radius-xl)` -- `16px` |
| `rounded-full` | `var(--radius-full)` -- `9999px` |

#### Shadows

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `shadow-ds-sm` | `var(--shadow-sm)` |
| `shadow-ds-md` | `var(--shadow-md)` |
| `shadow-ds-lg` | `var(--shadow-lg)` |

#### Spacing

| Tailwind Class | CSS Variable | Value |
|---------------|-------------|-------|
| `p-2xs`, `m-2xs`, `gap-2xs` | `var(--space-2xs)` | `2px` |
| `p-xs`, `m-xs`, `gap-xs` | `var(--space-xs)` | `4px` |
| `p-sm`, `m-sm`, `gap-sm` | `var(--space-sm)` | `8px` |
| `p-md`, `m-md`, `gap-md` | `var(--space-md)` | `12px` |
| `p-lg`, `m-lg`, `gap-lg` | `var(--space-lg)` | `16px` |
| `p-xl`, `m-xl`, `gap-xl` | `var(--space-xl)` | `24px` |
| `p-2xl`, `m-2xl`, `gap-2xl` | `var(--space-2xl)` | `32px` |
| `p-3xl`, `m-3xl`, `gap-3xl` | `var(--space-3xl)` | `48px` |
| `p-4xl`, `m-4xl`, `gap-4xl` | `var(--space-4xl)` | `64px` |

#### Typography

| Tailwind Class | CSS Variables |
|---------------|-------------|
| `text-display-1` | `font-size: var(--text-display-1)` -- `3.25rem` |
| `text-display-2` | `font-size: var(--text-display-2)` -- `2.25rem` |
| `text-h1` | `font-size: var(--text-h1)` -- `1.75rem` |
| `text-h2` | `font-size: var(--text-h2)` -- `1.375rem` |
| `text-h3` | `font-size: var(--text-h3)` -- `1.125rem` |
| `text-h4` | `font-size: var(--text-h4)` -- `1rem` |
| `text-body` | `font-size: var(--text-body)` -- `0.875rem` |
| `text-label` | `font-size: var(--text-label)` -- `0.8125rem` |
| `text-caption` | `font-size: var(--text-caption)` -- `0.75rem` |
| `text-overline` | `font-size: var(--text-overline)` -- `0.6875rem` |

#### Z-Index

| Tailwind Class | CSS Variable | Value |
|---------------|-------------|-------|
| `z-dropdown` | `var(--z-dropdown)` | `50` |
| `z-sticky` | `var(--z-sticky)` | `100` |
| `z-drawer` | `var(--z-drawer)` | `200` |
| `z-overlay` | `var(--z-overlay)` | `900` |
| `z-modal` | `var(--z-modal)` | `1000` |
| `z-toast` | `var(--z-toast)` | `1100` |

#### Motion

| CSS Variable | Value | Use Case |
|-------------|-------|----------|
| `var(--duration-micro)` | `150ms` | Hover, focus, color changes |
| `var(--duration-standard)` | `200ms` | Elevation, transform |
| `var(--duration-emphasis)` | `300ms` | Expanding panels |
| `var(--duration-entrance)` | `400ms` | Page entrance, modals |
| `var(--ease-default)` | `ease` | All transitions |
