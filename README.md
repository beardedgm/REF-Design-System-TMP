# Signature Design System

A unified visual design system for all SaaS applications. Light-first with full dark theme support. Works with **or without** Tailwind CSS.

## What's Inside

| File | What It Does |
|------|-------------|
| **`globals.css`** | **The foundation.** CSS custom properties for dark/light themes, typography, spacing, base reset. Works independently — no Tailwind required. |
| **`tailwind.preset.js`** | Optional convenience layer. Maps CSS variables to Tailwind utility classes. |
| **`STYLE_GUIDE.md`** | Complete design spec — philosophy, tokens, component patterns in both Tailwind and plain CSS. |
| **`CLAUDE.md`** | Project rules for AI assistants — ensures consistent code generation across all apps. |
| **`index.html`** | Interactive showcase — open in browser to see every token and component rendered in both themes. |

## Quick Start — With Tailwind

**1. Add the Tailwind preset to your app:**

```js
// tailwind.config.js
const designSystem = require('../path-to-design-system/tailwind.preset.js');

module.exports = {
  presets: [designSystem],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

**2. Import the global styles:**

```jsx
// App.jsx or root layout
import '../path-to-design-system/globals.css';
```

**3. Set the theme on your root element:**

```html
<html data-theme="light">
```

**4. Use Tailwind utility classes:**

```jsx
<div className="bg-bg-card border border-border rounded-ds-lg p-xl shadow-ds-sm">
  <h2 className="text-h2 text-text-primary">Title</h2>
  <p className="text-body text-text-secondary">Description</p>
</div>
```

## Quick Start — Without Tailwind (Plain CSS)

**1. Link or import `globals.css`:**

```html
<link rel="stylesheet" href="path-to-design-system/globals.css" />
```

```jsx
// Or in a bundler
import 'path-to-design-system/globals.css';
```

**2. Set the theme on your root element:**

```html
<html data-theme="light">
```

**3. Use CSS variables in your stylesheets:**

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
}
.card h2 {
  font-size: var(--text-h2);
  color: var(--text-primary);
}
.card p {
  font-size: var(--text-body);
  color: var(--text-secondary);
}
```

Toggle theme with JS: `document.documentElement.setAttribute('data-theme', 'dark')`

See `STYLE_GUIDE.md` Section 19 for full plain-CSS component examples and a complete Tailwind ↔ CSS Variable mapping table.

## Design Principles

1. **Light-First, Dark-Ready** — Every app supports both themes via CSS variables
2. **Consistency Over Novelty** — Same tokens, same patterns, every app
3. **Warm Gold Signature** — `#c9a267` is the brand accent threading through all interactions
4. **Density Over Sprawl** — Compact, information-rich layouts on an 8-point grid
5. **Accessibility Non-Negotiable** — Focus rings, contrast ratios, reduced motion
6. **Restrained Motion** — 150–200ms transitions, no decorative animation
7. **Systematic Scaling** — Predictable spacing, sizing, and elevation scales

## Token Quick Reference

**Tailwind classes:**
```
bg-bg-primary    bg-bg-card       bg-accent         text-text-primary
bg-bg-secondary  bg-bg-elevated   bg-accent-hover   text-text-secondary
bg-bg-surface    border-border    bg-accent-muted   text-text-muted

text-error  text-success  text-warning  text-accent

rounded-ds-sm  rounded-ds-md  rounded-ds-lg  rounded-full
shadow-ds-sm   shadow-ds-md   shadow-ds-lg

p-xs  p-sm  p-md  p-lg  p-xl  p-2xl  p-3xl
text-h1  text-h2  text-h3  text-body  text-caption  text-overline
```

**CSS variables:**
```css
var(--bg-primary)  var(--bg-card)     var(--accent)       var(--text-primary)
var(--bg-secondary) var(--bg-elevated) var(--accent-hover) var(--text-secondary)
var(--bg-surface)  var(--border)      var(--accent-muted) var(--text-muted)

var(--error)  var(--success)  var(--warning)  var(--accent)

var(--radius-sm)  var(--radius-md)  var(--radius-lg)  var(--radius-full)
var(--shadow-sm)  var(--shadow-md)  var(--shadow-lg)

var(--space-xs) var(--space-sm) var(--space-md) var(--space-lg) var(--space-xl)
var(--text-h1)  var(--text-h2)  var(--text-h3)  var(--text-body) var(--text-caption)
```

## Showcase

Open `index.html` in any browser to see the full system rendered with a live dark/light toggle.
