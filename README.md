# Signature Design System

A unified visual design system for all SaaS applications. CSS custom properties that work with any framework — Tailwind, plain CSS, or anything else.

## What's Inside

| File | What It Does |
|------|-------------|
| **`globals.css`** | **The foundation.** CSS custom properties for dark/light themes, typography, spacing, base reset, keyframe animations. Import this into any app. |
| **`STYLE_GUIDE.md`** | **The reference.** Complete design spec — philosophy, tokens, 52 component patterns with CSS variable examples and Tailwind equivalents. |
| **`CLAUDE.md`** | **The rules.** Project rules for AI agents — ensures consistent code generation across all apps. |
| **`index.html`** | **The showcase.** Interactive demo — open in browser to see every token and component rendered in both themes. |

## Quick Start

**1. Import the global styles:**

```jsx
// In your root layout (App.jsx, layout.tsx, etc.)
import '../path-to-design-system/globals.css';
```

Or in plain HTML:
```html
<link rel="stylesheet" href="path-to-design-system/globals.css" />
```

**2. Set the theme on your root element:**

```html
<html data-theme="dark">
```

**3. Use CSS variables in your code:**

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
}
```

**With Tailwind** — use arbitrary values, no preset needed:

```jsx
<div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-[var(--space-xl)]">
  <h2 className="text-[var(--text-h2)] text-[var(--text-primary)]">Title</h2>
</div>
```

Toggle theme with JS: `document.documentElement.setAttribute('data-theme', 'light')`

## Design Principles

1. **Cool Dark, Warm Light** — Asymmetric themes connected by a gold accent thread
2. **Consistency Over Novelty** — Same tokens, same patterns, every app
3. **Warm Gold Signature** — `#c9a267` is the brand accent threading through all interactions
4. **Density Over Sprawl** — Compact, information-rich layouts on an 8-point grid
5. **Accessibility Non-Negotiable** — Focus rings, contrast ratios, reduced motion
6. **Restrained Motion** — 150–200ms transitions, no decorative animation
7. **Systematic Scaling** — Predictable spacing, sizing, and elevation scales

## Token Quick Reference

```css
/* Backgrounds */
var(--bg-primary)  var(--bg-card)     var(--bg-elevated)  var(--bg-overlay)

/* Text */
var(--text-primary)  var(--text-secondary)  var(--text-muted)  var(--text-on-accent)

/* Accent */
var(--accent)  var(--accent-hover)  var(--accent-muted)  var(--accent-subtle)

/* Semantic */
var(--error)  var(--success)  var(--warning)  var(--info)

/* Shape */
var(--radius-sm)  var(--radius-md)  var(--radius-lg)
var(--shadow-sm)  var(--shadow-md)  var(--shadow-lg)

/* Spacing (8-point grid) */
var(--space-xs) var(--space-sm) var(--space-md) var(--space-lg) var(--space-xl) var(--space-2xl)

/* Typography */
var(--text-h1)  var(--text-h2)  var(--text-h3)  var(--text-body) var(--text-caption)
```

## Showcase

Open `index.html` in any browser to see the full system rendered with a live dark/light toggle.

See `STYLE_GUIDE.md` for the complete reference with all 52 component patterns.
