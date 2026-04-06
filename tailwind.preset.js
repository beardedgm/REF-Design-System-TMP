/**
 * Signature Design System v2 — Tailwind Preset
 *
 * This is an OPTIONAL convenience layer that maps the CSS variables defined
 * in globals.css to Tailwind utility classes (e.g., bg-bg-card, text-accent).
 *
 * globals.css is the foundation and works independently — this preset just
 * makes the tokens available as Tailwind classes for projects that use Tailwind.
 *
 * Usage in any MERN app:
 *   // tailwind.config.js
 *   const designSystem = require('./path-to/tailwind.preset.js');
 *   module.exports = { presets: [designSystem], content: [...] }
 *
 * IMPORTANT: You must also import globals.css in your root layout.
 * Without it, the CSS variables this preset references won't exist.
 *
 * For projects NOT using Tailwind, skip this file entirely and use
 * globals.css CSS variables directly (see STYLE_GUIDE.md Section 19).
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      /* ===== COLORS =====
       * All colors reference CSS variables defined in globals.css.
       * This lets dark/light theming work via data-theme attribute swap. */
      colors: {
        /* Backgrounds */
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
          overlay: 'var(--bg-overlay)',
        },

        /* Text */
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
          'on-accent': 'var(--text-on-accent)',
        },

        /* Accent — warm gold signature */
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
          muted: 'var(--accent-muted)',
          subtle: 'var(--accent-subtle)',
        },

        /* Semantic — error */
        error: {
          DEFAULT: 'var(--error)',
          hover: 'var(--error-hover)',
          muted: 'var(--error-muted)',
        },

        /* Semantic — success */
        success: {
          DEFAULT: 'var(--success)',
          hover: 'var(--success-hover)',
          muted: 'var(--success-muted)',
        },

        /* Semantic — warning */
        warning: {
          DEFAULT: 'var(--warning)',
          hover: 'var(--warning-hover)',
          muted: 'var(--warning-muted)',
        },

        /* Semantic — info */
        info: {
          DEFAULT: 'var(--info)',
          hover: 'var(--info-hover)',
          muted: 'var(--info-muted)',
        },

        /* Borders */
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
          focus: 'var(--border-focus)',
        },

        /* Status sequence — charts, badges, level indicators */
        status: {
          1: 'var(--status-1)',
          2: 'var(--status-2)',
          3: 'var(--status-3)',
          4: 'var(--status-4)',
          5: 'var(--status-5)',
          premium: 'var(--status-premium)',
        },

        /* Tooltip — accent-tinted */
        tooltip: {
          bg: 'var(--tooltip-bg)',
          border: 'var(--tooltip-border)',
          text: 'var(--tooltip-text)',
        },
      },

      /* ===== TYPOGRAPHY ===== */
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },

      fontSize: {
        'display-1': [
          'var(--text-display-1)',
          {
            lineHeight: 'var(--lh-display-1)',
            letterSpacing: 'var(--ls-display-1)',
            fontWeight: 'var(--weight-display-1)',
          },
        ],
        'display-2': [
          'var(--text-display-2)',
          {
            lineHeight: 'var(--lh-display-2)',
            letterSpacing: 'var(--ls-display-2)',
            fontWeight: 'var(--weight-display-2)',
          },
        ],
        h1: [
          'var(--text-h1)',
          {
            lineHeight: 'var(--lh-h1)',
            letterSpacing: 'var(--ls-h1)',
            fontWeight: 'var(--weight-h1)',
          },
        ],
        h2: [
          'var(--text-h2)',
          {
            lineHeight: 'var(--lh-h2)',
            letterSpacing: 'var(--ls-h2)',
            fontWeight: 'var(--weight-h2)',
          },
        ],
        h3: [
          'var(--text-h3)',
          {
            lineHeight: 'var(--lh-h3)',
            letterSpacing: 'var(--ls-h3)',
            fontWeight: 'var(--weight-h3)',
          },
        ],
        h4: [
          'var(--text-h4)',
          {
            lineHeight: 'var(--lh-h4)',
            letterSpacing: 'var(--ls-h4)',
            fontWeight: 'var(--weight-h4)',
          },
        ],
        body: [
          'var(--text-body)',
          {
            lineHeight: 'var(--lh-body)',
            letterSpacing: 'var(--ls-body)',
            fontWeight: 'var(--weight-body)',
          },
        ],
        label: [
          'var(--text-label)',
          {
            lineHeight: 'var(--lh-label)',
            letterSpacing: 'var(--ls-label)',
            fontWeight: 'var(--weight-label)',
          },
        ],
        caption: [
          'var(--text-caption)',
          {
            lineHeight: 'var(--lh-caption)',
            letterSpacing: 'var(--ls-caption)',
            fontWeight: 'var(--weight-caption)',
          },
        ],
        overline: [
          'var(--text-overline)',
          {
            lineHeight: 'var(--lh-overline)',
            letterSpacing: 'var(--ls-overline)',
            fontWeight: 'var(--weight-overline)',
          },
        ],
      },

      /* ===== SPACING (8-point grid) ===== */
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

      /* ===== BORDER RADIUS ===== */
      borderRadius: {
        'ds-sm': 'var(--radius-sm)',
        'ds-md': 'var(--radius-md)',
        'ds-lg': 'var(--radius-lg)',
        'ds-xl': 'var(--radius-xl)',
      },

      /* ===== SHADOWS =====
       * Reference CSS variables so light/dark themes get appropriate opacity. */
      boxShadow: {
        'ds-sm': 'var(--shadow-sm)',
        'ds-md': 'var(--shadow-md)',
        'ds-lg': 'var(--shadow-lg)',
      },

      /* ===== Z-INDEX ===== */
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        drawer: 'var(--z-drawer)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)',
      },

      /* ===== TRANSITION DURATION ===== */
      transitionDuration: {
        micro: 'var(--duration-micro)',
        standard: 'var(--duration-standard)',
        emphasis: 'var(--duration-emphasis)',
        entrance: 'var(--duration-entrance)',
      },

      /* ===== KEYFRAMES ===== */
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
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-out-right': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(100%)' },
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

      /* ===== ANIMATIONS ===== */
      animation: {
        'fade-in-up': 'fade-in-up var(--duration-entrance) var(--ease-default) forwards',
        'fade-out-down': 'fade-out-down var(--duration-micro) var(--ease-default) forwards',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'slide-in-right': 'slide-in-right var(--duration-standard) var(--ease-default) forwards',
        'slide-out-right': 'slide-out-right var(--duration-micro) var(--ease-default) forwards',
        'scale-in': 'scale-in var(--duration-standard) var(--ease-default) forwards',
        'scale-out': 'scale-out var(--duration-micro) var(--ease-default) forwards',
      },
    },
  },
};
