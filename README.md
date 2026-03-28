# Signature Design System

A unified visual design system for all SaaS applications. Light-first with full dark theme support, built for MERN + Tailwind CSS.

## What's Inside

| File | What It Does |
|------|-------------|
| **`tailwind.preset.js`** | Tailwind theme preset — colors, typography, spacing, radii, shadows, animations. Import into any app. |
| **`globals.css`** | CSS custom properties for dark/light themes + base reset. Import into your root layout. |
| **`STYLE_GUIDE.md`** | Complete design spec — philosophy, tokens, component patterns with React + Tailwind code. |
| **`CLAUDE.md`** | Project rules for AI assistants — ensures consistent code generation across all apps. |
| **`index.html`** | Interactive showcase — open in browser to see every token and component rendered in both themes. |

## Quick Start

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

Toggle with JS: `document.documentElement.setAttribute('data-theme', 'light')`

## Design Principles

1. **Light-First, Dark-Ready** — Every app supports both themes via CSS variables
2. **Consistency Over Novelty** — Same tokens, same patterns, every app
3. **Warm Gold Signature** — `#c9a267` is the brand accent threading through all interactions
4. **Density Over Sprawl** — Compact, information-rich layouts on an 8-point grid
5. **Accessibility Non-Negotiable** — Focus rings, contrast ratios, reduced motion
6. **Restrained Motion** — 150–200ms transitions, no decorative animation
7. **Systematic Scaling** — Predictable spacing, sizing, and elevation scales

## Tailwind Classes at a Glance

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

## Showcase

Open `index.html` in any browser to see the full system rendered with a live dark/light toggle.
