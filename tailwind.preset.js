/**
 * Signature Design System — Tailwind Preset
 *
 * Usage in any MERN app:
 *   // tailwind.config.js
 *   const designSystem = require('./path-to/tailwind.preset.js');
 *   module.exports = { presets: [designSystem], content: [...] }
 *
 * Also import globals.css in your root layout for the CSS custom properties.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      /* ===== COLORS =====
       * All colors reference CSS variables defined in globals.css.
       * This lets dark/light theming work via data-theme attribute swap. */
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
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
          muted: 'var(--accent-muted)',
        },
        error: 'var(--error)',
        success: 'var(--success)',
        warning: {
          DEFAULT: 'var(--warning)',
          muted: 'var(--warning-muted)',
        },
        status: {
          1: 'var(--status-1)',
          2: 'var(--status-2)',
          3: 'var(--status-3)',
          4: 'var(--status-4)',
          5: 'var(--status-5)',
          premium: 'var(--status-premium)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
        },
      },

      /* ===== TYPOGRAPHY ===== */
      fontFamily: {
        sans: ["'Inter'", '-apple-system', 'system-ui', 'sans-serif'],
        display: ["'Cinzel'", 'serif'],
      },
      fontSize: {
        'display-1': ['3.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'h1': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['1.375rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
        'subtitle': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['0.8125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        'overline': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
      },

      /* ===== SPACING (8-point grid) ===== */
      spacing: {
        'xs': '0.25rem',   /* 4px */
        'sm': '0.5rem',    /* 8px */
        'md': '0.75rem',   /* 12px */
        'lg': '1rem',      /* 16px */
        'xl': '1.5rem',    /* 24px */
        '2xl': '2rem',     /* 32px */
        '3xl': '3rem',     /* 48px */
      },

      /* ===== BORDER RADIUS ===== */
      borderRadius: {
        'ds-sm': '6px',
        'ds-md': '8px',
        'ds-lg': '12px',
        /* 'full' is already built into Tailwind */
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
        'dropdown': '50',
        'sticky': '100',
        'overlay': '900',
        'modal': '1000',
      },

      /* ===== TRANSITIONS ===== */
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '400': '400ms',
      },

      /* ===== ANIMATION ===== */
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 400ms ease forwards',
      },
    },
  },
};
