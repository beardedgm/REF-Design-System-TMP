---
name: Signature Design System
description: Dual-theme reference system for SaaS, with a gold accent threading cool blue-black night and warm cream-parchment day.
colors:
  bg-primary: "#0c0d12"
  bg-secondary: "#12131a"
  bg-surface: "#161720"
  bg-card: "#1a1b24"
  bg-elevated: "#22232e"
  text-primary: "#e8e8ec"
  text-secondary: "#8e8fa1"
  text-tertiary: "#6b6c7e"
  text-muted: "#4e4f5e"
  text-on-accent: "#0c0d12"
  accent: "#c9a267"
  accent-hover: "#dbb57e"
  accent-active: "#b8934f"
  accent-muted: "#c9a2671a"
  accent-subtle: "#c9a2670d"
  border: "#1f2029"
  border-hover: "#2e2f3d"
  error: "#e5484d"
  error-hover: "#f06b6e"
  error-muted: "#e5484d1a"
  success: "#30a46c"
  success-hover: "#3ec282"
  success-muted: "#30a46c1a"
  warning: "#f5a623"
  warning-hover: "#f7b84a"
  warning-muted: "#f5a6231a"
  info: "#3498db"
  info-hover: "#5bb0e8"
  info-muted: "#3498db1a"
  status-1: "#30a46c"
  status-2: "#3498db"
  status-3: "#f5a623"
  status-4: "#9b59b6"
  status-5: "#e5484d"
  tooltip-bg: "#2a2b36"
  tooltip-border: "#3a3b48"
  tooltip-text: "#e8e8ec"
typography:
  display-1:
    fontFamily: "Cinzel, serif"
    fontSize: "3.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  display-2:
    fontFamily: "Cinzel, serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  h1:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0"
  h4:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
  caption:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
  overline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  "2xs": "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  "2xl": "32px"
  "3xl": "48px"
  "4xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text-on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.text-on-accent}"
  button-secondary:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-secondary-hover:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-ghost-hover:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  input-text:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "36px"
  card:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
  badge-accent:
    backgroundColor: "{colors.accent-muted}"
    textColor: "{colors.accent}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-success:
    backgroundColor: "{colors.success-muted}"
    textColor: "{colors.success}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  nav-item-active:
    backgroundColor: "{colors.accent-muted}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 16px"
  tooltip:
    backgroundColor: "{colors.tooltip-bg}"
    textColor: "{colors.tooltip-text}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
---

# Design System: Signature

## 1. Overview

**Creative North Star: "The Firelight Codex"**

A dual-mode reference system for SaaS interfaces, built around a single warm gold thread that survives the journey between cool blue-black night and warm cream-parchment day. The system rejects SaaS-cliche dark-purple-gradients, neon glow accents, and indistinguishable "professional" greys in favor of restraint with character: gold appears on roughly 10% of any screen, surrounded by architecture quiet enough to read at 2am and polished enough for a finance dashboard. The brand sensibility evokes treasure, legendary items, firelight (without being explicitly fantasy); the execution is plain enough for any industry to wear it.

The two themes are not a stylistic switch, they are different rooms in the same building. Dark is cool blue-black (`#0c0d12`), high-contrast, made for focused work. Light is warm cream-parchment (`#f5f3ef`), softer, made for daylight. The gold accent is the only thing that does not change identity between them; it deepens (`#c9a267` to `#a8843e`) so it carries equal contrast in both, but the hue family is shared. Toggling themes should feel like turning a coin, not flipping a switch.

This is a *codex*, not a kit. Tokens are normative. Components reference tokens via `var()` only, never hex literals, never arbitrary values, never inline `style`. AI agents that consume this file translate intent into tokens and live within the 8-point grid.

**Key Characteristics:**
- Dual-theme architecture controlled by `data-theme` on `<html>`; tokens swap, components don't change.
- Single warm gold accent (`#c9a267` dark / `#a8843e` light) used on <=10% of any screen.
- Two type families: Cinzel (marketing display only) plus Inter (everything else).
- 8-point spacing grid, no arbitrary values.
- Restrained motion: 150 to 400ms with `ease`, no bounce, no spring, exit faster than enter.
- WCAG AA minimum, focus rings always visible, color is never the sole signal.

## 2. Colors: The Cool-Dark / Warm-Light Palette

The palette is built on two opposing neutral undertones, cool blue-black for night and warm cream for day, connected by a single warm gold accent. Semantics (error, success, warning, info) and the data-viz status sequence layer on top, but the primary visual identity is gold-on-dark / gold-on-cream, full stop.

### Primary
- **Signature Gold** (`#c9a267` dark / `#a8843e` light): the brand thread. Primary CTAs, active tab and nav indicators, focus rings, brand marks, key links. The only hue used to draw attention. Deepened in light mode (`#a8843e`) so it carries AA contrast against cream surfaces.

### Neutral, Dark theme (cool blue-black)
- **Page** (`#0c0d12`): app shell and body background. The deepest surface.
- **Sidebar** (`#12131a`): secondary navigation panel.
- **Surface** (`#161720`): mid-level content surfaces.
- **Card** (`#1a1b24`): cards, dialogs, popovers. The dominant working surface.
- **Elevated** (`#22232e`): hover states, skeleton loader base.
- **Text Primary** (`#e8e8ec`): headings, body, primary content.
- **Text Secondary** (`#8e8fa1`): supporting text, descriptions.
- **Text Tertiary** (`#6b6c7e`): placeholders, disabled labels.
- **Text Muted** (`#4e4f5e`): least prominent. Hints, meta.
- **Border** (`#1f2029`): default dividers and card edges. **Border Hover** (`#2e2f3d`).

### Neutral, Light theme (warm cream / parchment)
- **Page** (`#f5f3ef`): cream undertone, body background.
- **Sidebar** (`#ece8e1`): secondary panel.
- **Surface / Card** (`#ffffff`): pure white, but only as a content surface, never as the page.
- **Elevated** (`#f0ece6`): hover, skeleton.
- **Text Primary** (`#1c1a16`): warm dark, not pure black.
- **Text Secondary** (`#5e5a50`): warm graphite.
- **Border** (`#ddd8d0`): warm taupe.

### Semantic
- **Error** (`#e5484d` dark / `#cd2b31` light): destructive actions, validation failures.
- **Success** (`#30a46c` dark / `#218358` light): confirmations, positive indicators.
- **Warning** (`#f5a623` dark / `#c47d0a` light): caution states, pre-destructive notices.
- **Info** (`#3498db` dark / `#2271a1` light): help, informational messages.

Each pairs with a `-hover` shift and a 10%-alpha `-muted` fill for inline alert backgrounds and badges.

### Data Visualization Sequence
- **Status 1, Positive Green** (`#30a46c`), **Status 2, Info Blue** (`#3498db`), **Status 3, Caution Amber** (`#f5a623`), **Status 4, Misc Purple** (`#9b59b6` / `#7c3aad`), **Status 5, Critical Red** (`#e5484d`), **Status Premium, Gold Accent** (`var(--accent)`).

Used in this exact order across multi-color charts so series identity is consistent app-to-app.

### Named Rules

**The 10% Rule.** The signature gold appears on no more than 10% of any given screen. Its rarity is the point. Overuse dilutes it from a brand thread to a decorative pattern.

**The Coin-Flip Rule.** Toggling between themes should feel like turning a coin, not flipping a switch. Each mode has its own physical character (cool air vs. warm parchment); the gold thread is the only continuity.

**The No-Black, No-White Rule.** Dark mode never uses `#000`; light mode never uses `#fff` for text. All neutrals carry a hue undertone, cool blue in dark and warm taupe in light, so surfaces never feel sterile.

**The Gold-Is-Not-A-Color Rule.** Never use `--accent` as a data-viz series color. The status sequence (`--status-1` through `--status-5`) is for data; gold is reserved for UI interaction.

## 3. Typography

**Display Font:** Cinzel (serif). *Marketing only.*
**Body / UI Font:** Inter (with `system-ui, -apple-system, sans-serif` fallback). *Everything else.*

**Character.** Cinzel is a Roman-inscriptional serif: angular, weighted, ceremonial. It appears on landing pages, hero headlines, pricing pages, and 4xx/5xx error status codes, moments where the brand earns a flourish. Inter does all the work everywhere else: dashboards, forms, tables, dialogs, settings. The contrast is intentional. Marketing is theatrical; product is plain.

### Hierarchy

- **Display 1** (Cinzel, 700, `3.25rem` / 52px, line-height 1.1, tracking `-0.015em`): hero headlines, marketing splash, error-page status codes.
- **Display 2** (Cinzel, 700, `2.25rem` / 36px, line-height 1.2, tracking `-0.015em`): secondary marketing headings.
- **H1** (Inter, 600, `1.75rem` / 28px, line-height 1.3, tracking `-0.01em`): page titles in product UI.
- **H2** (Inter, 600, `1.375rem` / 22px, line-height 1.35, tracking `-0.01em`): section headings.
- **H3** (Inter, 600, `1.125rem` / 18px, line-height 1.4): subsection headings.
- **H4** (Inter, 600, `1rem` / 16px, line-height 1.4): card titles, group labels.
- **Body** (Inter, 400, `0.875rem` / 14px, line-height 1.5): paragraphs, descriptions. Cap reading width at 65 to 75ch.
- **Label** (Inter, 500, `0.8125rem` / 13px, line-height 1.4): form labels, nav items.
- **Caption** (Inter, 400, `0.75rem` / 12px, line-height 1.4): helper text, timestamps, tooltips.
- **Overline** (Inter, 600, `0.6875rem` / 11px, tracking `0.08em`, UPPERCASE): section overlines, sidebar group labels.

### Named Rules

**The Two-Family Rule.** Two type families exist in this system: Cinzel and Inter. Nothing else loads. No Roboto, no system Display fallback, no third "marketing accent" face.

**The Marketing-Only Cinzel Rule.** Cinzel is forbidden inside product UI. No dashboards, no forms, no tables, no settings panels. If you find yourself reaching for it inside the app shell, the answer is bigger Inter, not Cinzel.

**The 1.25-Ratio Rule.** Adjacent steps in the type scale carry at least a 1.25x size ratio. Flat scales (every step within 2px of the next) read as monotone hierarchy and are forbidden.

## 4. Elevation

Elevation in this system is structural, not ambient. Shadows exist, but they are quiet: soft black drops in dark mode, warm-tinted (`rgba(80, 60, 20, ...)`) in light mode to match the parchment undertone. Most cards rest flat on their parent surface and get depth from background-step contrast alone (`bg-card` over `bg-primary`). Shadows appear only when an element is genuinely lifted: dropdowns, popovers, modals, drawers.

### Shadow Vocabulary

- **shadow-sm** (`0 1px 2px rgba(0, 0, 0, 0.3)` dark / `0 1px 3px rgba(80, 60, 20, 0.08)` light): subtle elevation. Cards at rest if elevation is needed at all.
- **shadow-md** (`0 4px 12px rgba(0, 0, 0, 0.4)` dark / `0 4px 12px rgba(80, 60, 20, 0.10)` light): dropdowns, popovers, hovered surfaces.
- **shadow-lg** (`0 8px 24px rgba(0, 0, 0, 0.5)` dark / `0 8px 24px rgba(80, 60, 20, 0.14)` light): modals, dialogs, drawers. High elevation, true overlay.

### Named Rules

**The Tonal-First Rule.** Prefer background-step contrast over shadows. A `bg-card` panel on a `bg-primary` page already feels lifted; do not pile a shadow on top.

**The Warm-Shadow Rule.** Light mode never uses pure black shadows. All light-mode shadow rgba values use `(80, 60, 20)` so the cast color reads as parchment-shadow, not printer-toner.

**The Three-Step Rule.** Shadow elevation has exactly three steps (`sm` / `md` / `lg`). No `shadow-xl`, no nested glows, no inner shadows for "depth." Three is enough.

## 5. Components

Each component below is documented as character plus token contract. Full state machines (hover, focus, error, disabled) live in the sidecar `DESIGN.json` so the live panel can render them; this section captures the visual identity.

### Buttons
- **Shape:** moderately rounded corners (`8px` / `--radius-md`).
- **Sizing:** 32 / 36 / 40px height (`sm` / `base` / `lg`). Horizontal padding `var(--space-lg)` (16px) at base; vertical padding handled by height.
- **Primary:** gold fill (`--accent`), `--text-on-accent` label. The most assertive control on any screen. One per primary action, never as a row of three side-by-side.
- **Secondary / Default:** `--bg-elevated` fill, `1px solid --border` outline, `--text-primary` label. The workhorse.
- **Ghost:** transparent fill, `--text-primary` label. Hover fills `--bg-elevated`. Used where a button must blend until hovered (toolbars, dense tables).
- **Danger:** `--error` fill, white label. Reserved for destructive confirmations, never the default action of a multi-button group.
- **Hover:** color shift via `--accent-hover` or `--bg-elevated` over `--duration-micro` (150ms) `ease`.
- **Focus:** 2px `--accent` outline, `outline-offset: 2px`.

### Inputs / Fields
- **Shape:** 8px radius, 36px height (base).
- **Surface:** `--bg-elevated` fill, `1px solid --border` edge.
- **Focus:** border shifts to `--accent`; outline ring appears via `:focus-visible`.
- **Error:** border becomes `--error`; `--text-caption text-error` message appears below the field.
- **Label rule:** every input has a visible `<label>` above it. Placeholder is supplemental, never the only label.

### Cards / Containers
- **Corner Style:** 12px radius (`--radius-lg`) on standard cards, 16px (`--radius-xl`) on prominent or hero cards.
- **Background:** `--bg-card` (`#1a1b24` dark / `#ffffff` light).
- **Shadow Strategy:** flat at rest. Shadow appears only on interactive cards on hover (`--shadow-sm` rising to `--shadow-md`).
- **Border:** `1px solid --border`, present even when there is also a shadow, because the border carries identity through both themes.
- **Internal Padding:** `var(--space-xl)` (24px) standard, `var(--space-lg)` (16px) compact.

### Badges / Tags
- **Shape:** pill (`--radius-full`).
- **Color assignment:** `--accent-muted` fill plus `--accent` text for brand tags; `--{semantic}-muted` plus `--{semantic}` for status tags (success, warning, error, info); `--bg-elevated` plus `--text-secondary` for neutral tags.
- **Padding:** `var(--space-2xs) var(--space-sm)` (2px / 8px). Compact by design.

### Navigation, Sidebar
- **Width:** 240px expanded, 64px collapsed (icons only). Transition `200ms ease` on `width`.
- **Surface:** `--bg-secondary`, full-height, fixed left, `1px solid --border` right edge.
- **Group labels:** `--text-overline` (uppercase, tracking 0.08em), `--text-tertiary` color.
- **Item, default:** `--text-secondary` label, no fill.
- **Item, hover:** `--bg-elevated` fill, `--text-primary` label.
- **Item, active:** `--accent-muted` fill, `--accent` label, `2px solid --accent` left border. The signature visual for "where you are."

### Navigation, Top Nav
- **Height:** 56px, fixed top, `z-sticky`.
- **Surface:** `--bg-card`, `1px solid --border` bottom.
- **Active link:** `--accent` text, `2px solid --accent` bottom border. Same gold thread, different anchor edge.

### Tooltips
- **Surface:** `--tooltip-bg` (slightly accent-tinted dark in dark mode, `#2a2b36`; near-black warm in light mode, `#1c1a16`).
- **Border:** `1px solid --tooltip-border`.
- **Text:** caption size, `--tooltip-text` color.
- **Max width:** 240px. Tooltips never contain interactive elements; use Popover instead.
- **Trigger:** hover plus `:focus-visible`, 150ms delay-in, 0ms delay-out.

### Toasts
- **Container:** fixed `bottom-xl right-xl`, `z-toast`, `aria-live="polite"`. Max 3 visible, stacked with `space-sm` gap.
- **Surface:** `--bg-card`, `--shadow-lg`, 12px radius, `1px solid --border`.
- **Variants:** colored leading icon (Lucide `CheckCircle`, `XCircle`, `AlertTriangle`, `Info`). The icon carries the variant, not a colored side-stripe.
- **Motion:** enter `fade-in-up` 200ms, exit `fade-out-down` 150ms. Exit faster than enter, intentionally.

### Signature: The Gold Thread

The single visual element that ties the entire system together is the use of `--accent` as a 2px left or bottom border on the active navigation item. Sidebar uses `border-left`; top nav uses `border-bottom`. This is the **only** place in the system where a colored stripe-border greater than 1px is permitted, and it is permitted because it is the orientation marker, telling the user where they are. Everywhere else, colored side-stripes are forbidden.

## 6. Do's and Don'ts

### Do:
- **Do** reference every color, radius, shadow, and space via `var(--token-name)`. Never hardcode hex, px, or rgba.
- **Do** use the gold accent only for primary CTAs, active nav, focus rings, and brand marks. <=10% of any screen.
- **Do** support both `data-theme="dark"` and `data-theme="light"` on every component. Components never read theme; they read tokens, and the tokens swap.
- **Do** snap every margin, padding, and gap to a token from the 8-point grid (`--space-2xs` through `--space-4xl`).
- **Do** put a visible `<label>` on every form input. Placeholder text supplements but never replaces.
- **Do** use Lucide React for every icon: `w-4 h-4` (buttons), `w-5 h-5` (nav), `w-6 h-6` (cards), `w-12 h-12` (hero / empty state primary).
- **Do** disable all motion under `prefers-reduced-motion: reduce`, animation-duration `0.01ms`, shimmer stops entirely.
- **Do** show a `:focus-visible` ring on every interactive element: `outline: 2px solid var(--accent); outline-offset: 2px`.
- **Do** order multi-color chart series as `--status-1, -2, -3, -4, -5` so series identity carries app-to-app.

### Don't:
- **Don't** use `#000` or `#fff` literals anywhere. Neutrals are tinted, cool blue-black or warm cream.
- **Don't** use Cinzel inside product UI (dashboards, forms, tables, settings). Marketing surfaces only.
- **Don't** use the gold accent as a data-viz series color, on decorative backgrounds, on body text, or on disabled states. Overuse dilutes it.
- **Don't** use a colored side-stripe (`border-left` or `border-right` greater than 1px) anywhere except the single active-nav-item case in Signature.
- **Don't** use bounce, spring, or elastic easing. `ease` only. Durations capped at 400ms.
- **Don't** wrap a container around things by reflex. Cards are not the answer to "where should this live"; nested cards are always wrong.
- **Don't** invent radii, shadows, or spacings. The scale is fixed: `radius-sm/md/lg/xl/full`, `shadow-sm/md/lg`, `space-2xs` through `space-4xl`. No `radius-2xl`, no `shadow-xl`, no `space-13px`.
- **Don't** use color as the only signal of state. Pair every error / success / warning color with an icon, a label, or a pattern.
- **Don't** open a modal as the default response to an interaction. Inline editing or a drawer is almost always the better answer; the modal is the loud option.
- **Don't** mix icon libraries or use emoji. Lucide React only.
