# Signature Design System v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete ground-up rebuild of the Signature Design System with 52 component patterns, dual-theme tokens (cool dark + warm light), and full agentic documentation across 5 files.

**Architecture:** Token-first approach — globals.css defines all design tokens as CSS custom properties, tailwind.preset.js maps them to Tailwind utilities. STYLE_GUIDE.md contains all 52 component patterns with full code examples in both Tailwind and plain CSS. CLAUDE.md codifies the rules. index.html is the visual showcase. Component documentation sections are written as separate files in `docs/superpowers/sections/` and assembled into the final STYLE_GUIDE.md.

**Tech Stack:** CSS custom properties, Tailwind CSS preset, HTML5, Lucide React icons, Inter + Cinzel fonts

**Spec:** `docs/superpowers/specs/2026-04-06-design-system-v2-rebuild-design.md`

**Note on testing:** This is a design system (CSS tokens, documentation, and an HTML showcase), not an application. There are no unit tests. Verification is visual — open index.html in a browser and toggle themes. Each task that produces output should be visually verified.

---

## File Structure

```
globals.css                           # Complete rewrite — all tokens, reset, animations
tailwind.preset.js                    # Complete rewrite — maps tokens to Tailwind
STYLE_GUIDE.md                        # Complete rewrite — assembled from section files
CLAUDE.md                             # Complete rewrite — rules for agentic consumption
index.html                            # Complete rewrite — visual showcase

docs/superpowers/sections/            # Temporary section files (deleted after assembly)
  style-guide-00-header.md            # Philosophy, identity, token reference
  style-guide-01-inputs-forms.md      # 14 patterns
  style-guide-02-buttons-actions.md   # 3 patterns
  style-guide-03-data-display.md      # 10 patterns
  style-guide-04-navigation.md        # 8 patterns
  style-guide-05-feedback-status.md   # 7 patterns
  style-guide-06-overlays.md          # 5 patterns
  style-guide-07-layout-marketing.md  # 7 patterns + icons + accessibility + non-Tailwind guide
```

## Execution Phases

```
Phase 1 (sequential):  Task 1 — globals.css
Phase 2 (parallel):    Tasks 2-10 — all other files (9 parallel agents)
Phase 3 (sequential):  Task 11 — assemble STYLE_GUIDE.md
Phase 4 (sequential):  Task 12 — index.html
```

---

## Task 1: Token Foundation — globals.css

**Files:**
- Create: `globals.css` (overwrites existing)

This is the foundation everything else depends on. Must be completed before all other tasks.

- [ ] **Step 1: Write the complete globals.css**

Write the full file. It must contain: CSS reset, both theme blocks, all tokens, typography classes, keyframe animations, reduced-motion overrides, and utility classes for non-Tailwind usage.

```css
/* ============================================
   Signature Design System v2 — Token Foundation
   ============================================
   This file is the single source of truth for all design tokens.
   Import into any app's root layout. Works with or without Tailwind.

   Theme: data-theme="dark" (default) or data-theme="light"
   ============================================ */

/* --- Reset / Normalize --- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-body-size);
  line-height: var(--text-body-line-height);
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

/* --- Dark Theme (Default) --- */
[data-theme="dark"] {
  color-scheme: dark;

  /* Backgrounds */
  --bg-primary: #0c0d12;
  --bg-secondary: #12131a;
  --bg-surface: #161720;
  --bg-card: #1a1b24;
  --bg-elevated: #22232e;
  --bg-overlay: rgba(0, 0, 0, 0.6);

  /* Text */
  --text-primary: #e8e8ec;
  --text-secondary: #8e8fa1;
  --text-tertiary: #6b6c7e;
  --text-muted: #4e4f5e;
  --text-on-accent: #0c0d12;

  /* Accent (Gold) */
  --accent: #c9a267;
  --accent-hover: #dbb57e;
  --accent-active: #b8934f;
  --accent-muted: rgba(201, 162, 103, 0.10);
  --accent-subtle: rgba(201, 162, 103, 0.05);

  /* Semantic */
  --error: #e5484d;
  --error-hover: #f06b6e;
  --error-muted: rgba(229, 72, 77, 0.10);
  --success: #30a46c;
  --success-hover: #3ec282;
  --success-muted: rgba(48, 164, 108, 0.10);
  --warning: #f5a623;
  --warning-hover: #f7b84a;
  --warning-muted: rgba(245, 166, 35, 0.10);
  --info: #3498db;
  --info-hover: #5bb0e8;
  --info-muted: rgba(52, 152, 219, 0.10);

  /* Borders */
  --border: #1f2029;
  --border-hover: #2e2f3d;
  --border-focus: var(--accent);

  /* Status Sequence (Charts) */
  --status-1: #30a46c;
  --status-2: #3498db;
  --status-3: #f5a623;
  --status-4: #9b59b6;
  --status-5: #e5484d;
  --status-premium: var(--accent);

  /* Tooltip */
  --tooltip-bg: #2a2b36;
  --tooltip-border: #3a3b48;
  --tooltip-text: #e8e8ec;

  /* Shimmer */
  --shimmer-highlight: rgba(255, 255, 255, 0.04);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
}

/* --- Light Theme --- */
[data-theme="light"] {
  color-scheme: light;

  /* Backgrounds */
  --bg-primary: #f5f3ef;
  --bg-secondary: #ece8e1;
  --bg-surface: #ffffff;
  --bg-card: #ffffff;
  --bg-elevated: #f0ece6;
  --bg-overlay: rgba(0, 0, 0, 0.4);

  /* Text */
  --text-primary: #1c1a16;
  --text-secondary: #5e5a50;
  --text-tertiary: #8a857a;
  --text-muted: #b0a99e;
  --text-on-accent: #ffffff;

  /* Accent (Gold) */
  --accent: #a8843e;
  --accent-hover: #c9a267;
  --accent-active: #96753a;
  --accent-muted: rgba(168, 132, 62, 0.10);
  --accent-subtle: rgba(168, 132, 62, 0.05);

  /* Semantic */
  --error: #cd2b31;
  --error-hover: #e5484d;
  --error-muted: rgba(205, 43, 49, 0.10);
  --success: #218358;
  --success-hover: #30a46c;
  --success-muted: rgba(33, 131, 88, 0.10);
  --warning: #c47d0a;
  --warning-hover: #d49a2e;
  --warning-muted: rgba(196, 125, 10, 0.10);
  --info: #2271a1;
  --info-hover: #3498db;
  --info-muted: rgba(34, 113, 161, 0.10);

  /* Borders */
  --border: #ddd8d0;
  --border-hover: #c8c2b8;
  --border-focus: var(--accent);

  /* Status Sequence (Charts) */
  --status-1: #218358;
  --status-2: #2271a1;
  --status-3: #c47d0a;
  --status-4: #7c3aad;
  --status-5: #cd2b31;
  --status-premium: var(--accent);

  /* Tooltip */
  --tooltip-bg: #1c1a16;
  --tooltip-border: #2e2a23;
  --tooltip-text: #f5f3ef;

  /* Shimmer */
  --shimmer-highlight: rgba(255, 255, 255, 0.6);

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(80, 60, 20, 0.08);
  --shadow-md: 0 4px 12px rgba(80, 60, 20, 0.10);
  --shadow-lg: 0 8px 24px rgba(80, 60, 20, 0.14);
}

/* --- Theme-Agnostic Tokens --- */
:root {
  /* Font Families */
  --font-display: 'Cinzel', serif;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;

  /* Type Scale — Sizes */
  --text-display-1-size: 3.25rem;
  --text-display-1-weight: 700;
  --text-display-1-tracking: -0.015em;
  --text-display-1-line-height: 1.1;

  --text-display-2-size: 2.25rem;
  --text-display-2-weight: 700;
  --text-display-2-tracking: -0.015em;
  --text-display-2-line-height: 1.2;

  --text-h1-size: 1.75rem;
  --text-h1-weight: 600;
  --text-h1-tracking: -0.01em;
  --text-h1-line-height: 1.3;

  --text-h2-size: 1.375rem;
  --text-h2-weight: 600;
  --text-h2-tracking: -0.01em;
  --text-h2-line-height: 1.35;

  --text-h3-size: 1.125rem;
  --text-h3-weight: 600;
  --text-h3-tracking: 0;
  --text-h3-line-height: 1.4;

  --text-h4-size: 1rem;
  --text-h4-weight: 600;
  --text-h4-tracking: 0;
  --text-h4-line-height: 1.4;

  --text-body-size: 0.875rem;
  --text-body-weight: 400;
  --text-body-tracking: 0;
  --text-body-line-height: 1.5;

  --text-label-size: 0.8125rem;
  --text-label-weight: 500;
  --text-label-tracking: 0;
  --text-label-line-height: 1.4;

  --text-caption-size: 0.75rem;
  --text-caption-weight: 400;
  --text-caption-tracking: 0;
  --text-caption-line-height: 1.4;

  --text-overline-size: 0.6875rem;
  --text-overline-weight: 600;
  --text-overline-tracking: 0.08em;
  --text-overline-line-height: 1.3;

  /* Spacing (8-point grid) */
  --space-2xs: 2px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 48px;
  --space-4xl: 64px;

  /* Border Radii */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Z-Index Scale */
  --z-dropdown: 50;
  --z-sticky: 100;
  --z-drawer: 200;
  --z-overlay: 900;
  --z-modal: 1000;
  --z-toast: 1100;

  /* Motion */
  --duration-micro: 150ms;
  --duration-standard: 200ms;
  --duration-emphasis: 300ms;
  --duration-entrance: 400ms;
  --ease-default: ease;
}

/* --- Typography Utility Classes (Non-Tailwind) --- */
.display-1 {
  font-family: var(--font-display);
  font-size: var(--text-display-1-size);
  font-weight: var(--text-display-1-weight);
  letter-spacing: var(--text-display-1-tracking);
  line-height: var(--text-display-1-line-height);
}

.display-2 {
  font-family: var(--font-display);
  font-size: var(--text-display-2-size);
  font-weight: var(--text-display-2-weight);
  letter-spacing: var(--text-display-2-tracking);
  line-height: var(--text-display-2-line-height);
}

.heading-1 {
  font-family: var(--font-sans);
  font-size: var(--text-h1-size);
  font-weight: var(--text-h1-weight);
  letter-spacing: var(--text-h1-tracking);
  line-height: var(--text-h1-line-height);
}

.heading-2 {
  font-family: var(--font-sans);
  font-size: var(--text-h2-size);
  font-weight: var(--text-h2-weight);
  letter-spacing: var(--text-h2-tracking);
  line-height: var(--text-h2-line-height);
}

.heading-3 {
  font-family: var(--font-sans);
  font-size: var(--text-h3-size);
  font-weight: var(--text-h3-weight);
  letter-spacing: var(--text-h3-tracking);
  line-height: var(--text-h3-line-height);
}

.heading-4 {
  font-family: var(--font-sans);
  font-size: var(--text-h4-size);
  font-weight: var(--text-h4-weight);
  letter-spacing: var(--text-h4-tracking);
  line-height: var(--text-h4-line-height);
}

.text-body { font-size: var(--text-body-size); font-weight: var(--text-body-weight); letter-spacing: var(--text-body-tracking); line-height: var(--text-body-line-height); }
.text-label { font-size: var(--text-label-size); font-weight: var(--text-label-weight); letter-spacing: var(--text-label-tracking); line-height: var(--text-label-line-height); }
.text-caption { font-size: var(--text-caption-size); font-weight: var(--text-caption-weight); letter-spacing: var(--text-caption-tracking); line-height: var(--text-caption-line-height); }
.text-overline { font-size: var(--text-overline-size); font-weight: var(--text-overline-weight); letter-spacing: var(--text-overline-tracking); line-height: var(--text-overline-line-height); text-transform: uppercase; }

/* --- Focus Ring --- */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* --- Keyframe Animations --- */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-out-down {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(8px); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes slide-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes slide-out-right {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

@keyframes slide-in-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes slide-out-left {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes scale-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}

/* --- Shimmer utility for skeleton loaders --- */
.shimmer {
  background: linear-gradient(
    90deg,
    var(--bg-elevated) 25%,
    var(--shimmer-highlight) 50%,
    var(--bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

/* --- Reduced Motion --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .shimmer {
    animation: none;
    background: var(--bg-elevated);
  }
}

/* --- Selection --- */
::selection {
  background-color: var(--accent-muted);
  color: var(--text-primary);
}

/* --- Scrollbar (subtle) --- */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--border-hover);
}
```

- [ ] **Step 2: Verify the file renders correctly**

Open a test HTML file or the existing index.html in a browser with `data-theme="dark"` and `data-theme="light"` on the `<html>` element. Verify:
- Background colors change between themes
- Text is readable in both themes
- Gold accent is visible in both themes
- Scrollbar styling works

- [ ] **Step 3: Commit**

```bash
git add globals.css
git commit -m "feat: rewrite globals.css with v2 token foundation

Complete token system: cool dark (blue-black) + warm light (cream/parchment).
Gold accent, 5 background levels, 5 text tiers, semantic colors with hover/muted
variants, status sequence, spacing grid, typography scale, animations, and
reduced-motion support."
```

---

## Task 2: Tailwind Preset — tailwind.preset.js

**Files:**
- Create: `tailwind.preset.js` (overwrites existing)

**Depends on:** Task 1 (references token names from globals.css)

- [ ] **Step 1: Write the complete tailwind.preset.js**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
          overlay: 'var(--bg-overlay)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
          'on-accent': 'var(--text-on-accent)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
          muted: 'var(--accent-muted)',
          subtle: 'var(--accent-subtle)',
        },
        error: {
          DEFAULT: 'var(--error)',
          hover: 'var(--error-hover)',
          muted: 'var(--error-muted)',
        },
        success: {
          DEFAULT: 'var(--success)',
          hover: 'var(--success-hover)',
          muted: 'var(--success-muted)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          hover: 'var(--warning-hover)',
          muted: 'var(--warning-muted)',
        },
        info: {
          DEFAULT: 'var(--info)',
          hover: 'var(--info-hover)',
          muted: 'var(--info-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
          focus: 'var(--border-focus)',
        },
        status: {
          1: 'var(--status-1)',
          2: 'var(--status-2)',
          3: 'var(--status-3)',
          4: 'var(--status-4)',
          5: 'var(--status-5)',
          premium: 'var(--status-premium)',
        },
        tooltip: {
          bg: 'var(--tooltip-bg)',
          border: 'var(--tooltip-border)',
          text: 'var(--tooltip-text)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      fontSize: {
        'display-1': ['var(--text-display-1-size)', {
          lineHeight: 'var(--text-display-1-line-height)',
          letterSpacing: 'var(--text-display-1-tracking)',
          fontWeight: 'var(--text-display-1-weight)',
        }],
        'display-2': ['var(--text-display-2-size)', {
          lineHeight: 'var(--text-display-2-line-height)',
          letterSpacing: 'var(--text-display-2-tracking)',
          fontWeight: 'var(--text-display-2-weight)',
        }],
        h1: ['var(--text-h1-size)', {
          lineHeight: 'var(--text-h1-line-height)',
          letterSpacing: 'var(--text-h1-tracking)',
          fontWeight: 'var(--text-h1-weight)',
        }],
        h2: ['var(--text-h2-size)', {
          lineHeight: 'var(--text-h2-line-height)',
          letterSpacing: 'var(--text-h2-tracking)',
          fontWeight: 'var(--text-h2-weight)',
        }],
        h3: ['var(--text-h3-size)', {
          lineHeight: 'var(--text-h3-line-height)',
          letterSpacing: 'var(--text-h3-tracking)',
          fontWeight: 'var(--text-h3-weight)',
        }],
        h4: ['var(--text-h4-size)', {
          lineHeight: 'var(--text-h4-line-height)',
          letterSpacing: 'var(--text-h4-tracking)',
          fontWeight: 'var(--text-h4-weight)',
        }],
        body: ['var(--text-body-size)', {
          lineHeight: 'var(--text-body-line-height)',
          letterSpacing: 'var(--text-body-tracking)',
          fontWeight: 'var(--text-body-weight)',
        }],
        label: ['var(--text-label-size)', {
          lineHeight: 'var(--text-label-line-height)',
          letterSpacing: 'var(--text-label-tracking)',
          fontWeight: 'var(--text-label-weight)',
        }],
        caption: ['var(--text-caption-size)', {
          lineHeight: 'var(--text-caption-line-height)',
          letterSpacing: 'var(--text-caption-tracking)',
          fontWeight: 'var(--text-caption-weight)',
        }],
        overline: ['var(--text-overline-size)', {
          lineHeight: 'var(--text-overline-line-height)',
          letterSpacing: 'var(--text-overline-tracking)',
          fontWeight: 'var(--text-overline-weight)',
        }],
      },
      spacing: {
        '2xs': 'var(--space-2xs)',
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
      },
      borderRadius: {
        'ds-sm': 'var(--radius-sm)',
        'ds-md': 'var(--radius-md)',
        'ds-lg': 'var(--radius-lg)',
        'ds-xl': 'var(--radius-xl)',
      },
      boxShadow: {
        'ds-sm': 'var(--shadow-sm)',
        'ds-md': 'var(--shadow-md)',
        'ds-lg': 'var(--shadow-lg)',
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        drawer: 'var(--z-drawer)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out-down': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'scale-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.95)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up var(--duration-entrance) var(--ease-default)',
        'fade-out-down': 'fade-out-down var(--duration-micro) var(--ease-default)',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'slide-in-right': 'slide-in-right var(--duration-emphasis) var(--ease-default)',
        'slide-out-right': 'slide-out-right var(--duration-standard) var(--ease-default)',
        'scale-in': 'scale-in var(--duration-standard) var(--ease-default)',
        'scale-out': 'scale-out var(--duration-micro) var(--ease-default)',
      },
      transitionDuration: {
        micro: 'var(--duration-micro)',
        standard: 'var(--duration-standard)',
        emphasis: 'var(--duration-emphasis)',
        entrance: 'var(--duration-entrance)',
      },
    },
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.preset.js
git commit -m "feat: rewrite tailwind.preset.js with v2 token mapping

Maps all v2 CSS custom properties to Tailwind utilities: colors, typography,
spacing, radii, shadows, z-index, keyframes, and animations."
```

---

## Task 3: STYLE_GUIDE Section — Header, Philosophy & Token Reference

**Files:**
- Create: `docs/superpowers/sections/style-guide-00-header.md`

**Depends on:** Task 1 (token values)

This section covers: design philosophy, visual identity, complete token reference tables, typography system, spacing, radii, shadows, z-index, motion, responsive breakpoints, icon system, accessibility requirements, and the Tailwind ↔ CSS variable mapping table.

- [ ] **Step 1: Write the header section**

Read the spec at `docs/superpowers/specs/2026-04-06-design-system-v2-rebuild-design.md` sections 1 (Visual Identity), 2 (Token Foundation), 4 (Icon System), and 5 (Accessibility Requirements).

Write `docs/superpowers/sections/style-guide-00-header.md` containing:

1. **Title and overview** — "Signature Design System v2 — Style Guide"
2. **Design Philosophy** — 7 tenets from the spec: professional-first with subtle warmth, cool dark + warm light, gold accent as brand thread, Cinzel for marketing / Inter for product, 8-point grid, restrained motion, accessibility non-negotiable
3. **Visual Identity** — dual-tone theme architecture explanation, the gold accent rules (when to use, when not to), typography strategy (marketing vs product contexts)
4. **Token Reference** — complete tables for ALL tokens matching the spec exactly:
   - Backgrounds (6 tokens with dark + light values and roles)
   - Text (5 tokens)
   - Accent Gold (5 tokens)
   - Semantic colors (12 tokens — error, success, warning, info with DEFAULT/hover/muted)
   - Borders (3 tokens)
   - Status sequence (6 tokens with semantic meaning)
   - Tooltip (3 tokens)
   - Shimmer (1 token)
5. **Typography** — font families, complete type scale table (10 levels with size, weight, tracking, line-height, font, and use)
6. **Spacing** — 8-point grid table (9 tokens from 2xs to 4xl)
7. **Border Radii** — table (5 tokens with use guidance)
8. **Shadows** — dark and light tables (3 tokens each, note warm-tinted light shadows)
9. **Z-Index** — table (6 levels)
10. **Motion** — duration tokens, keyframe animations list, rules (reduced motion, no bounce, exit faster than enter)
11. **Responsive Breakpoints** — table (5 breakpoints), max-width rule
12. **Icon System** — Lucide React only, 4 size tiers, currentColor inheritance, aria-label rule
13. **Accessibility Requirements** — all 9 rules from spec section 5
14. **Tailwind ↔ CSS Variable Mapping** — two-column table showing Tailwind class → CSS variable for all major categories (backgrounds, text, accent, semantic, borders, radii, shadows, spacing, type, z-index)

- [ ] **Step 2: Verify completeness**

Cross-reference every token in `globals.css` against the tables in this file. Every CSS custom property must appear in a table.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/sections/style-guide-00-header.md
git commit -m "docs: write STYLE_GUIDE header, philosophy, and token reference"
```

---

## Tasks 4-10: STYLE_GUIDE Component Sections

Each of the following tasks writes one component category as a standalone section file. All 7 tasks can run **in parallel** after Task 1.

### Component Documentation Template

Every component in every section MUST follow this exact structure:

```markdown
### [N.N] Component Name

**When to use:** [1-2 sentences describing when to reach for this component]

**Anatomy:**
- Part 1 — role description
- Part 2 — role description

**Variants:**
| Variant | Description | Key Difference |
|---------|-------------|----------------|
| Name | Description | Visual/behavioral distinction |

**States:** default, hover, focus-visible, active, disabled[, error, loading as applicable]

**Accessibility:**
- ARIA: [roles, attributes]
- Keyboard: [navigation, activation]
- Screen reader: [announcements]

**Tailwind + React Example:**
\`\`\`jsx
// Complete, copy-pasteable JSX using design system Tailwind classes
\`\`\`

**Plain CSS + HTML Example:**
\`\`\`html
<!-- Complete, copy-pasteable HTML using var() tokens -->
<style>
  /* Scoped CSS using design system variables */
</style>
\`\`\`

**Do / Don't:**
- DO: [correct usage]
- DON'T: [common mistake agents should avoid]
```

**Critical rules for component code examples:**
- Tailwind examples use ONLY design system classes (`bg-bg-card`, `text-accent`, `rounded-ds-md`, `shadow-ds-sm`, `p-xl`, etc.) — never raw Tailwind values (`bg-gray-800`, `rounded-lg`)
- Plain CSS examples use ONLY `var()` references — never hardcoded colors, sizes, or values
- Show ALL states in examples (hover, focus, disabled, error) using Tailwind state modifiers or CSS pseudo-classes
- Include complete ARIA attributes in every example
- Icons use Lucide React names (e.g., `<Search className="w-5 h-5" />`)

---

## Task 4: STYLE_GUIDE Section — Inputs & Forms (14 patterns)

**Files:**
- Create: `docs/superpowers/sections/style-guide-01-inputs-forms.md`

**Depends on:** Task 1

- [ ] **Step 1: Read the spec**

Read spec section 3.1 (Inputs & Forms) at `docs/superpowers/specs/2026-04-06-design-system-v2-rebuild-design.md` for all 14 component specs.

- [ ] **Step 2: Write all 14 component patterns**

Write `docs/superpowers/sections/style-guide-01-inputs-forms.md` with a `## Inputs & Forms` header, then all 14 components following the template above:

1. Text Input
2. Textarea
3. Search Input
4. Select Dropdown (custom, searchable, multi-select)
5. Combobox / Autocomplete
6. Checkbox (single, group, indeterminate)
7. Radio Group (vertical, horizontal)
8. Toggle / Switch
9. Date Picker
10. Slider / Range
11. File Upload / Dropzone
12. Tag Input / Multi-value
13. Color Picker
14. Form Layout (the composition pattern — label placement, error display, spacing)

Each pattern gets the full template: when to use, anatomy, variants, states, accessibility, Tailwind+React example, plain CSS+HTML example, do/don't.

For form-related patterns, ensure:
- Every input has a visible `<label>` — never placeholder-only
- Error messages use `text-caption text-error` below the input
- Required fields show `*` in `text-error` after label text
- Consistent spacing: `space-sm` between label and input, `space-xs` between input and help/error, `space-xl` between form groups

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/sections/style-guide-01-inputs-forms.md
git commit -m "docs: write STYLE_GUIDE inputs & forms section (14 patterns)"
```

---

## Task 5: STYLE_GUIDE Section — Buttons & Actions (3 patterns)

**Files:**
- Create: `docs/superpowers/sections/style-guide-02-buttons-actions.md`

**Depends on:** Task 1

- [ ] **Step 1: Read the spec**

Read spec section 3.2 (Buttons & Actions).

- [ ] **Step 2: Write all 3 component patterns**

Write `docs/superpowers/sections/style-guide-02-buttons-actions.md` with a `## Buttons & Actions` header, then:

1. Button (primary/default/ghost/danger × sm/base/lg, icon-only, loading state)
2. Button Group (connected buttons, split button with dropdown)
3. Floating Action Button (mobile-only)

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/sections/style-guide-02-buttons-actions.md
git commit -m "docs: write STYLE_GUIDE buttons & actions section (3 patterns)"
```

---

## Task 6: STYLE_GUIDE Section — Data Display (10 patterns)

**Files:**
- Create: `docs/superpowers/sections/style-guide-03-data-display.md`

**Depends on:** Task 1

- [ ] **Step 1: Read the spec**

Read spec section 3.3 (Data Display).

- [ ] **Step 2: Write all 10 component patterns**

Write `docs/superpowers/sections/style-guide-03-data-display.md` with a `## Data Display` header, then:

1. Card (basic, interactive, compact, stat/KPI)
2. Badge / Tag (status, category, removable)
3. Data Table (sortable, selectable, sticky header, empty state)
4. Description List (horizontal, vertical)
5. Accordion / Collapsible (single, group, exclusive mode)
6. Activity Feed / Timeline (vertical, date-grouped)
7. Progress Bar (linear, ring/circle, stepped, indeterminate)
8. Stat Card / KPI (number, trend, sparkline, compact)
9. Avatar (image, initials, status dot, group)
10. Code Block / KBD (block, inline, keyboard shortcut)

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/sections/style-guide-03-data-display.md
git commit -m "docs: write STYLE_GUIDE data display section (10 patterns)"
```

---

## Task 7: STYLE_GUIDE Section — Navigation (8 patterns)

**Files:**
- Create: `docs/superpowers/sections/style-guide-04-navigation.md`

**Depends on:** Task 1

- [ ] **Step 1: Read the spec**

Read spec section 3.4 (Navigation).

- [ ] **Step 2: Write all 8 component patterns**

Write `docs/superpowers/sections/style-guide-04-navigation.md` with a `## Navigation` header, then:

1. Sidebar Navigation (expanded/collapsed, sections, mobile drawer)
2. Top Navigation (logo, links, actions, mobile hamburger)
3. Breadcrumbs (truncation, separator)
4. Tabs (underline, pill, vertical)
5. Pagination (full numbered, compact)
6. Stepper / Wizard (horizontal, vertical, validation-gated)
7. Segmented Control (2-4 options)
8. Sticky Section Header

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/sections/style-guide-04-navigation.md
git commit -m "docs: write STYLE_GUIDE navigation section (8 patterns)"
```

---

## Task 8: STYLE_GUIDE Section — Feedback & Status (7 patterns)

**Files:**
- Create: `docs/superpowers/sections/style-guide-05-feedback-status.md`

**Depends on:** Task 1

- [ ] **Step 1: Read the spec**

Read spec section 3.5 (Feedback & Status).

- [ ] **Step 2: Write all 7 component patterns**

Write `docs/superpowers/sections/style-guide-05-feedback-status.md` with a `## Feedback & Status` header, then:

1. Toast / Notification (success/error/warning/info, stacking, auto-dismiss)
2. Alert / Banner (inline, full-width, dismissible)
3. Callout / Admonition (tip, warning, danger, info, note)
4. Confirmation Dialog (destructive action pattern, focus on Cancel)
5. Skeleton Loader (line, circle, rect primitives, shimmer)
6. Progress / Loading Bar (page-level, indeterminate/determinate)
7. Empty State (centered icon + heading + CTA)

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/sections/style-guide-05-feedback-status.md
git commit -m "docs: write STYLE_GUIDE feedback & status section (7 patterns)"
```

---

## Task 9: STYLE_GUIDE Section — Overlays (5 patterns)

**Files:**
- Create: `docs/superpowers/sections/style-guide-06-overlays.md`

**Depends on:** Task 1

- [ ] **Step 1: Read the spec**

Read spec section 3.6 (Overlays).

- [ ] **Step 2: Write all 5 component patterns**

Write `docs/superpowers/sections/style-guide-06-overlays.md` with a `## Overlays` header, then:

1. Modal / Dialog (sm/md/lg, scrollable, form variant, focus trap)
2. Drawer / Slide-over (left/right, sm/md/lg/full widths)
3. Dropdown Menu (action menu, context menu, nested submenu)
4. Popover (rich content, click-to-open, auto-flip)
5. Tooltip (accent-tinted, 4 positions, arrow, hover+focus trigger)

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/sections/style-guide-06-overlays.md
git commit -m "docs: write STYLE_GUIDE overlays section (5 patterns)"
```

---

## Task 10: STYLE_GUIDE Section — Layout, Marketing & Cross-Cutting (7 patterns)

**Files:**
- Create: `docs/superpowers/sections/style-guide-07-layout-marketing.md`

**Depends on:** Task 1

- [ ] **Step 1: Read the spec**

Read spec sections 3.7 (Layout), 3.8 (Marketing & Utility).

- [ ] **Step 2: Write all 7 component patterns + Non-Tailwind usage guide**

Write `docs/superpowers/sections/style-guide-07-layout-marketing.md` with sections for:

**## Layout**
1. Page Shell — Sidebar (dashboard layout)
2. Page Shell — Top Nav (simpler apps)
3. Divider / Separator (horizontal, vertical, with label)
4. Bottom Sheet (mobile-only)

**## Marketing & Utility**
5. Command Palette (Cmd+K, combobox search)
6. Pricing Table (tiered, highlighted plan, annual/monthly toggle)
7. Error Pages (404, 500, 503 with Cinzel brand moment)

**## Using Without Tailwind (Plain CSS)**
A reference section showing how to use the design system with plain CSS:
- How to import globals.css
- How to set the theme
- A complete card component example using only `var()` references
- A complete form example using only `var()` references
- Mapping table: Tailwind class → CSS variable for every major utility

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/sections/style-guide-07-layout-marketing.md
git commit -m "docs: write STYLE_GUIDE layout, marketing, and non-Tailwind sections (7 patterns)"
```

---

## Task 11: Assemble STYLE_GUIDE.md

**Files:**
- Create: `STYLE_GUIDE.md` (overwrites existing)
- Read: All files in `docs/superpowers/sections/style-guide-*.md`

**Depends on:** Tasks 3-10 (all section files must be complete)

- [ ] **Step 1: Concatenate all section files in order**

Read all section files in order and write them as one continuous document to `STYLE_GUIDE.md`:

```bash
cat docs/superpowers/sections/style-guide-00-header.md \
    docs/superpowers/sections/style-guide-01-inputs-forms.md \
    docs/superpowers/sections/style-guide-02-buttons-actions.md \
    docs/superpowers/sections/style-guide-03-data-display.md \
    docs/superpowers/sections/style-guide-04-navigation.md \
    docs/superpowers/sections/style-guide-05-feedback-status.md \
    docs/superpowers/sections/style-guide-06-overlays.md \
    docs/superpowers/sections/style-guide-07-layout-marketing.md \
    > STYLE_GUIDE.md
```

- [ ] **Step 2: Review for consistency**

Scan the assembled file for:
- Consistent heading levels (## for categories, ### for components)
- Consistent numbering (sequential section numbers)
- No duplicate component names
- Token names matching globals.css exactly (e.g., `--bg-card` not `--bg-cards`)
- Tailwind class names matching tailwind.preset.js exactly (e.g., `bg-bg-card` not `bg-card`)

Fix any issues found.

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: assemble complete STYLE_GUIDE.md from section files (52 patterns)"
```

---

## Task 12: CLAUDE.md — Rules Document

**Files:**
- Create: `CLAUDE.md` (overwrites existing)

**Depends on:** Task 1 (token names), Tasks 3-10 (component list is known from spec)

- [ ] **Step 1: Write the complete CLAUDE.md**

Read the current CLAUDE.md for structure reference, then rewrite completely. The new CLAUDE.md must contain:

1. **Header** — "Signature Design System" with brief description
2. **Tech Stack** — MERN, Tailwind CSS with preset, theming via data-theme, globals.css as foundation
3. **Repository Structure** — table of all 5 files and their purposes
4. **Critical Rules** — all 10 design principles from spec section 7, each as a numbered rule with explanation:
   - Rule 1: Always Use Tokens — Never Hardcode (with Tailwind and CSS examples)
   - Rule 2: Always Support Both Themes
   - Rule 3: Keep All Files in Sync (when modifying tokens, update all 5 files)
   - Rule 4: Accent Gold Is the Brand (use for / never use for)
   - Rule 5: Spacing Uses the 8-Point Grid
   - Rule 6: Motion Is Restrained (durations, no bounce, respect reduced-motion)
   - Rule 7: Accessibility Is Non-Negotiable (focus rings, contrast, keyboard, labels)
   - Rule 8: Icons Use Lucide React Only (sizes, currentColor, aria-label)
   - Rule 9: Cinzel Is Marketing-Only (product UI uses Inter exclusively)
   - Rule 10: Warm Light, Cool Dark (each theme has its own undertone character)
   - Plus rules for: Navigation Shell Selection, Form Controls, Toast Notifications, Tabs, Avatars, Tooltips, Empty States, Error Pages, Command Palette, Skeleton Loaders, Data Viz Colors, Drawers, Dropdown Menus, Alerts/Banners, Breadcrumbs, Stepper/Wizard, Progress Bars, Confirmation Dialogs, Pricing Tables
5. **How to Use in a New App** — Tailwind setup and plain CSS setup instructions
6. **Component Patterns** — complete list of all 52 patterns pointing to STYLE_GUIDE.md
7. **Quick Reference — Tailwind Class Naming** — table mapping category → pattern → example for every component category

Each rule must be specific enough that an AI agent can follow it without interpretation. Include exact token names, exact class names, exact ARIA attributes.

- [ ] **Step 2: Verify rule completeness**

Cross-reference every component in STYLE_GUIDE.md against CLAUDE.md. Every component should have a corresponding rule or be covered by a general rule.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: rewrite CLAUDE.md with v2 rules for agentic consumption

Complete rules document covering all 52 component patterns, token usage,
accessibility requirements, and design principles. Written for AI agent
consumption — every decision is explicit."
```

---

## Task 13: index.html — Visual Showcase

**Files:**
- Create: `index.html` (overwrites existing)

**Depends on:** Task 1 (globals.css), Task 11 (STYLE_GUIDE.md for component reference)

This is the largest single file — a complete interactive showcase of all tokens and components. It uses plain CSS only (no Tailwind) to prove the system works without it.

- [ ] **Step 1: Read the spec and STYLE_GUIDE.md for component details**

Read the full spec and the assembled STYLE_GUIDE.md to understand every component's structure and styling.

- [ ] **Step 2: Write the complete index.html**

The file must include:

**Document structure:**
- `<!DOCTYPE html>` with `data-theme="dark"` default
- Google Fonts import for Inter (400, 500, 600) and Cinzel (700)
- Lucide icons via CDN (unpkg)
- Link to `globals.css`
- Internal `<style>` for showcase-specific layout (not design system styles)

**Sticky navigation:**
- Left sidebar (on desktop) or hamburger menu (mobile) with section links
- Sections organized by category matching STYLE_GUIDE.md structure

**Theme toggle:**
- Fixed-position toggle button (top-right)
- Toggles `data-theme` between "dark" and "light" on `<html>`
- Persists choice to `localStorage`

**Showcase sections (in order):**
1. **Hero** — System name in Cinzel display-1, description, theme toggle CTA
2. **Color Palette** — All background, text, accent, semantic, status, border color swatches with labels and hex values. Swatches update live when theme toggles.
3. **Typography** — Full type scale specimen showing each level with name, size, weight
4. **Spacing** — Visual boxes showing each spacing token
5. **Border Radii** — Boxes with each radius applied
6. **Shadows** — Cards with each shadow level
7. **Buttons** — All variants × all sizes, icon-only, loading state, disabled state, button group
8. **Inputs & Forms** — Text input, textarea, search, select, checkbox, radio, toggle, with validation states. Form layout example showing label + input + help + error spacing.
9. **Cards** — Basic, interactive (with hover), compact, stat/KPI
10. **Badges** — Status badges, category tags, removable tags
11. **Data Table** — Sample table with sortable headers, hover rows, striped option
12. **Accordion** — Expandable sections with chevron animation
13. **Progress Bars** — Linear, circular, stepped variants
14. **Stat Cards** — Dashboard-style KPI cards with trend indicators
15. **Avatars** — Image, initials, status dots, groups
16. **Code Block / KBD** — Styled code block + keyboard shortcut badges
17. **Sidebar Navigation** — Expandable/collapsible demo sidebar
18. **Top Navigation** — Horizontal nav bar demo
19. **Breadcrumbs** — Sample breadcrumb trail
20. **Tabs** — All three variants (underline, pill, vertical) with working tab switching
21. **Pagination** — Full numbered + compact
22. **Stepper** — Horizontal step indicator
23. **Segmented Control** — Working toggle between options
24. **Toasts** — Trigger buttons for each variant, live toast demos
25. **Alerts / Banners** — All variants inline
26. **Callouts** — Tip, warning, danger, info, note
27. **Confirmation Dialog** — Button triggers modal with cancel/confirm
28. **Skeleton Loaders** — Card skeleton, list skeleton, with shimmer animation
29. **Modal** — Button triggers centered modal dialog
30. **Drawer** — Button triggers slide-over panel from right
31. **Dropdown Menu** — Button triggers action menu
32. **Popover** — Button triggers rich content popover
33. **Tooltips** — Elements with tooltips in all 4 positions
34. **Empty State** — Centered placeholder with icon + CTA
35. **Error Pages** — 404/500/503 miniature demos (Cinzel status codes)
36. **Command Palette** — Cmd+K demo (or click trigger)
37. **File Upload** — Dropzone demo
38. **Dividers** — Horizontal, vertical, with label
39. **Description List** — Horizontal and vertical key-value pairs
40. **Activity Feed** — Timeline demo with events
41. **Dashboard Example** — Integrated layout showing sidebar + stats + table + chart placeholder

**Interactivity requirements:**
- Theme toggle works and persists
- Tabs switch content
- Accordion expands/collapses
- Modal/Drawer open and close
- Toast trigger buttons create live toasts
- Command palette opens on Cmd+K or button click
- Sidebar collapses/expands
- Segmented control switches active option
- All using vanilla JavaScript (no frameworks)

- [ ] **Step 3: Verify in browser**

Open index.html in a browser. Check:
- All sections render in dark mode
- Toggle to light mode — all sections render correctly
- Interactive elements work (tabs, accordion, modal, drawer, toasts, command palette)
- No hardcoded colors (everything uses CSS variables)
- Responsive: check at mobile width (< 768px)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: rewrite index.html showcase with all 52 v2 component demos

Complete interactive showcase: token visualization, all component patterns,
working theme toggle, keyboard navigation demos, and responsive layout.
Plain CSS only — no Tailwind dependency."
```

---

## Task 14: Final Cleanup

**Files:**
- Delete: `docs/superpowers/sections/style-guide-*.md` (temporary files)

**Depends on:** Task 11 (assembly complete)

- [ ] **Step 1: Remove temporary section files**

```bash
rm -rf docs/superpowers/sections/
```

- [ ] **Step 2: Final verification**

Run a quick check:
- `globals.css` exists and has both theme blocks
- `tailwind.preset.js` exists and exports a config
- `STYLE_GUIDE.md` exists and contains all 52 component patterns
- `CLAUDE.md` exists and contains all rules
- `index.html` exists and opens in a browser

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove temporary section files after STYLE_GUIDE assembly"
```

---

## Execution Summary

| Task | Description | Depends On | Parallel Group |
|------|-------------|------------|----------------|
| 1 | globals.css — token foundation | None | Phase 1 |
| 2 | tailwind.preset.js — Tailwind mapping | Task 1 | Phase 2 |
| 3 | STYLE_GUIDE header + token reference | Task 1 | Phase 2 |
| 4 | STYLE_GUIDE inputs & forms (14) | Task 1 | Phase 2 |
| 5 | STYLE_GUIDE buttons & actions (3) | Task 1 | Phase 2 |
| 6 | STYLE_GUIDE data display (10) | Task 1 | Phase 2 |
| 7 | STYLE_GUIDE navigation (8) | Task 1 | Phase 2 |
| 8 | STYLE_GUIDE feedback & status (7) | Task 1 | Phase 2 |
| 9 | STYLE_GUIDE overlays (5) | Task 1 | Phase 2 |
| 10 | STYLE_GUIDE layout & marketing (7) | Task 1 | Phase 2 |
| 11 | Assemble STYLE_GUIDE.md | Tasks 3-10 | Phase 3 |
| 12 | CLAUDE.md — rules document | Task 1 | Phase 2 |
| 13 | index.html — visual showcase | Tasks 1, 11 | Phase 4 |
| 14 | Cleanup temp files | Task 11 | Phase 4 |

**Maximum parallelism:** 10 agents in Phase 2 (Tasks 2-10 + 12)
