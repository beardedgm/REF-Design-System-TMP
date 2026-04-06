# Signature Design System v2 — Complete Rebuild Spec

## Overview

A ground-up rebuild of the Signature Design System. This system is the single source of truth for all SaaS applications in the portfolio — consumed agentically by Claude Code to build UIs without improvisation.

**Target audience:** Customer-facing SaaS applications across multiple industries (TTRPG tools, scheduling, productivity, general SaaS). All apps share one visual identity.

**Design philosophy:** Professional-first with a subtle warmth that nods to the gamer/TTRPG/coder community. The personality lives in color temperature, gold accent usage, and how the system *feels* — never in themed illustrations or overt decoration.

**Tagline:** "Forge & Function" — the craftsmanship of a fantasy blacksmith meets the precision of modern software.

---

## 1. Visual Identity

### 1.1 Dual-Tone Theme Architecture

The system uses asymmetric undertones across themes:

- **Dark mode:** Cool blue-black undertone. Professional, high-contrast. The gold accent pops sharply against cool tones.
- **Light mode:** Warm cream/parchment undertone. Softer, inviting. The gold feels naturally at home — like firelight on aged paper.

This asymmetry is intentional — each mode has its own character, connected by the gold accent thread. Toggling themes should feel like turning a coin, not flipping a switch.

Theme is controlled via `data-theme="dark"` or `data-theme="light"` on the root `<html>` element. Dark is the default/preferred mode.

### 1.2 Typography Strategy

Two contexts, two type treatments:

| Context | Display Font | UI Font | Where Used |
|---------|-------------|---------|------------|
| **Marketing** | Cinzel (700) | Inter | Landing pages, hero sections, pricing, email headers |
| **Product** | Inter (600) | Inter (400, 500) | App shell, dashboards, forms, tables, all UI |

Cinzel is loaded only in marketing contexts. Product apps load Inter only, reducing bundle size.

### 1.3 The Gold Accent

The warm gold (`#c9a267` dark / `#a8843e` light) is the brand signature. It evokes treasure, legendary items, firelight — without being explicitly "fantasy."

**Use for:** Primary CTA buttons, active indicators, focus ring accents, key links, brand marks, single-metric chart fills.

**Never use for:** Decorative backgrounds, large surface areas, body text, data series in multi-color charts. Overuse dilutes impact.

---

## 2. Token Foundation

### 2.1 Color Tokens

#### Backgrounds

| Token | Dark | Light | Role |
|-------|------|-------|------|
| `--bg-primary` | `#0c0d12` | `#f5f3ef` | Page background |
| `--bg-secondary` | `#12131a` | `#ece8e1` | Grouped sections, sidebar bg |
| `--bg-surface` | `#161720` | `#ffffff` | Main content areas (the large region inside the shell). In light mode, same as card — differentiated by context, not color. |
| `--bg-card` | `#1a1b24` | `#ffffff` | Cards, panels, popovers (discrete elevated containers). In light mode, same as surface — shadow and border create the distinction. |
| `--bg-elevated` | `#22232e` | `#f0ece6` | Hover states, nested elements, inputs |
| `--bg-overlay` | `rgba(0,0,0,0.6)` | `rgba(0,0,0,0.4)` | Behind modals, drawers, overlays |

#### Text

| Token | Dark | Light | Role |
|-------|------|-------|------|
| `--text-primary` | `#e8e8ec` | `#1c1a16` | Headings, body text |
| `--text-secondary` | `#8e8fa1` | `#5e5a50` | Supporting text, descriptions |
| `--text-tertiary` | `#6b6c7e` | `#8a857a` | Placeholders, tertiary info |
| `--text-muted` | `#4e4f5e` | `#b0a99e` | Disabled text, subtle hints |
| `--text-on-accent` | `#0c0d12` | `#ffffff` | Text on gold backgrounds |

#### Accent (Gold)

| Token | Dark | Light |
|-------|------|-------|
| `--accent` | `#c9a267` | `#a8843e` |
| `--accent-hover` | `#dbb57e` | `#c9a267` |
| `--accent-active` | `#b8934f` | `#96753a` |
| `--accent-muted` | `rgba(201,162,103,0.10)` | `rgba(168,132,62,0.10)` |
| `--accent-subtle` | `rgba(201,162,103,0.05)` | `rgba(168,132,62,0.05)` |

#### Semantic

| Token | Dark | Light |
|-------|------|-------|
| `--error` | `#e5484d` | `#cd2b31` |
| `--error-hover` | `#f06b6e` | `#e5484d` |
| `--error-muted` | `rgba(229,72,77,0.10)` | `rgba(205,43,49,0.10)` |
| `--success` | `#30a46c` | `#218358` |
| `--success-hover` | `#3ec282` | `#30a46c` |
| `--success-muted` | `rgba(48,164,108,0.10)` | `rgba(33,131,88,0.10)` |
| `--warning` | `#f5a623` | `#c47d0a` |
| `--warning-hover` | `#f7b84a` | `#d49a2e` |
| `--warning-muted` | `rgba(245,166,35,0.10)` | `rgba(196,125,10,0.10)` |
| `--info` | `#3498db` | `#2271a1` |
| `--info-hover` | `#5bb0e8` | `#3498db` |
| `--info-muted` | `rgba(52,152,219,0.10)` | `rgba(34,113,161,0.10)` |

#### Borders

| Token | Dark | Light |
|-------|------|-------|
| `--border` | `#1f2029` | `#ddd8d0` |
| `--border-hover` | `#2e2f3d` | `#c8c2b8` |
| `--border-focus` | `var(--accent)` | `var(--accent)` |

#### Status Sequence (Charts & Badges)

Used in order for multi-series data. Never use `--accent` for data series.

| Token | Dark | Light | Semantic |
|-------|------|-------|----------|
| `--status-1` | `#30a46c` | `#218358` | Positive / best |
| `--status-2` | `#3498db` | `#2271a1` | Informational |
| `--status-3` | `#f5a623` | `#c47d0a` | Caution / mid |
| `--status-4` | `#9b59b6` | `#7c3aad` | Neutral / misc |
| `--status-5` | `#e5484d` | `#cd2b31` | Critical / low |
| `--status-premium` | `var(--accent)` | `var(--accent)` | Featured / gold |

#### Tooltip-Specific

| Token | Dark | Light |
|-------|------|-------|
| `--tooltip-bg` | `#2a2b36` | `#1c1a16` |
| `--tooltip-border` | `#3a3b48` | `#2e2a23` |
| `--tooltip-text` | `#e8e8ec` | `#f5f3ef` |

#### Shimmer (Skeleton Loaders)

| Token | Dark | Light |
|-------|------|-------|
| `--shimmer-base` | `var(--bg-elevated)` | `var(--bg-elevated)` |
| `--shimmer-highlight` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.6)` |

### 2.2 Typography Tokens

**Font Families:**

| Token | Value | Context |
|-------|-------|---------|
| `--font-display` | `'Cinzel', serif` | Marketing display headings only |
| `--font-sans` | `'Inter', system-ui, -apple-system, sans-serif` | All product UI |

**Type Scale:**

| Token | Size | Weight | Tracking | Line Height | Font | Use |
|-------|------|--------|----------|-------------|------|-----|
| `--text-display-1` | 3.25rem | 700 | -0.015em | 1.1 | Cinzel | Marketing hero |
| `--text-display-2` | 2.25rem | 700 | -0.015em | 1.2 | Cinzel | Marketing subheading |
| `--text-h1` | 1.75rem | 600 | -0.01em | 1.3 | Inter | Page titles |
| `--text-h2` | 1.375rem | 600 | -0.01em | 1.35 | Inter | Section headings |
| `--text-h3` | 1.125rem | 600 | 0 | 1.4 | Inter | Card titles |
| `--text-h4` | 1rem | 600 | 0 | 1.4 | Inter | Subsections |
| `--text-body` | 0.875rem | 400 | 0 | 1.5 | Inter | Default text |
| `--text-label` | 0.8125rem | 500 | 0 | 1.4 | Inter | Form labels, nav items |
| `--text-caption` | 0.75rem | 400 | 0 | 1.4 | Inter | Help text, timestamps |
| `--text-overline` | 0.6875rem | 600 | 0.08em | 1.3 | Inter | Section labels, badges |

### 2.3 Spacing (8-Point Grid)

| Token | Value |
|-------|-------|
| `--space-2xs` | 2px |
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 12px |
| `--space-lg` | 16px |
| `--space-xl` | 24px |
| `--space-2xl` | 32px |
| `--space-3xl` | 48px |
| `--space-4xl` | 64px |

No arbitrary spacing values. Every margin, padding, and gap must use a token.

### 2.4 Border Radii

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 6px | Small elements (badges, chips) |
| `--radius-md` | 8px | Default (buttons, inputs) |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Modals, large containers |
| `--radius-full` | 9999px | Avatars, pills |

### 2.5 Shadows

Shadows use warm-tinted RGBA in light mode to match the parchment undertone.

**Dark mode:**

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` |

**Light mode:**

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(80,60,20,0.08)` |
| `--shadow-md` | `0 4px 12px rgba(80,60,20,0.10)` |
| `--shadow-lg` | `0 8px 24px rgba(80,60,20,0.14)` |

### 2.6 Z-Index Scale

| Token | Value | Use |
|-------|-------|-----|
| `--z-dropdown` | 50 | Dropdown menus, popovers |
| `--z-sticky` | 100 | Sticky headers, navbars |
| `--z-drawer` | 200 | Slide-over drawers |
| `--z-overlay` | 900 | Background overlay behind modals |
| `--z-modal` | 1000 | Modal dialogs, command palette |
| `--z-toast` | 1100 | Toast notifications (always on top) |

### 2.7 Motion

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| `--duration-micro` | 150ms | ease | Hover, focus, toggle |
| `--duration-standard` | 200ms | ease | Elevation, transform, collapse |
| `--duration-emphasis` | 300ms | ease | Drawer open/close, accordion |
| `--duration-entrance` | 400ms | ease | Page entrance, modal appear |

**Keyframe animations:**
- `fade-in-up`: `opacity 0→1, translateY 8px→0` at `--duration-entrance`
- `shimmer`: horizontal gradient sweep at `1.5s ease-in-out infinite`
- `slide-in-right`: `translateX 100%→0` at `--duration-emphasis`
- `slide-in-left`: `translateX -100%→0` at `--duration-emphasis`
- `scale-in`: `scale 0.95→1, opacity 0→1` at `--duration-standard`

**Rules:**
- Respect `prefers-reduced-motion`: disable all animations, use instant state changes
- No bounce, spring, or elastic easing anywhere
- Exit animations faster than enter (150ms vs 200ms for toasts, 200ms vs 300ms for drawers)

### 2.8 Responsive Breakpoints

| Token | Value | Use |
|-------|-------|-----|
| `--bp-sm` | 640px | Large phones landscape |
| `--bp-md` | 768px | Tablets, sidebar collapse trigger |
| `--bp-lg` | 1024px | Small desktops |
| `--bp-xl` | 1280px | Standard desktops |
| `--bp-2xl` | 1536px | Large monitors |

**Layout max-width:** 1280px for content areas. Full-bleed for navigation shells.

---

## 3. Component Kit — Full Inventory

Every component pattern in the STYLE_GUIDE.md must include:

1. **When to use** — which situations call for this pattern
2. **Anatomy** — the parts and their roles
3. **Variants** — size, style, or context variants with exact values
4. **States** — default, hover, focus-visible, active, disabled, error, loading (as applicable)
5. **Accessibility** — ARIA roles/attributes, keyboard navigation, screen reader behavior
6. **Tailwind example** — complete JSX with design system utility classes
7. **Plain CSS example** — complete HTML + CSS using `var()` tokens
8. **Do / Don't** — common mistakes agents should avoid

### 3.1 Inputs & Forms (14 patterns)

#### 3.1.1 Text Input
Standard single-line input with label, help text, error state, optional icon.
- Sizes: sm (32px), base (36px), lg (40px)
- States: default, hover, focus, disabled, error, success
- Required indicator: red asterisk after label text
- Error message: `text-caption text-error` below input

#### 3.1.2 Textarea
Multi-line text input. Same styling as Text Input but resizable vertically.
- Min height: 80px. Max configurable.
- Character count optional (bottom-right, `text-caption text-tertiary`)

#### 3.1.3 Search Input
Standalone search with magnifying glass icon (left) and clear button (right).
- `role="search"` on container, `type="search"` on input
- Escape key clears input
- Debounced input event (300ms recommended)

#### 3.1.4 Select Dropdown
Custom select with search, single-select and multi-select variants.
- Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`
- List: `role="listbox"`, items `role="option"`, `aria-selected`
- Keyboard: arrows navigate, Enter selects, Escape closes, type-ahead search
- Multi-select: checkboxes on options, selected count badge in trigger

#### 3.1.5 Combobox / Autocomplete
Search-as-you-type with filtered results list.
- `role="combobox"`, `aria-autocomplete="list"`, `aria-controls`
- Results in `role="listbox"` positioned below input
- Highlight matching text in results

#### 3.1.6 Checkbox
Native `<input type="checkbox">` with custom styling.
- Single checkbox with label + optional description
- Checkbox group (vertical stack, shared legend)
- Indeterminate state: `aria-checked="mixed"` for "select all" patterns
- Keyboard: Space toggles

#### 3.1.7 Radio Group
Native `<input type="radio">` with shared `name` attribute.
- Vertical (default) and horizontal variants
- `role="radiogroup"` on container, `aria-labelledby`
- Keyboard: arrow keys move selection, Tab moves out of group

#### 3.1.8 Toggle / Switch
On/off toggle for binary settings.
- `role="switch"`, `aria-checked`
- Label + optional description text
- Keyboard: Space toggles
- Sizes: sm (16px track), base (20px track)

#### 3.1.9 Date Picker
Calendar-based date selection.
- Input trigger opens calendar popover
- Month/year navigation, day grid
- `aria-label` on navigation buttons, `aria-selected` on chosen date
- Keyboard: arrows navigate days, Enter selects, Escape closes
- Optional range selection (start + end date)

#### 3.1.10 Slider / Range
Numeric range input with track and thumb.
- Single value and range (two thumbs) variants
- Optional tick marks, min/max labels, value display
- `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Keyboard: arrows adjust by step, Page Up/Down by 10× step

#### 3.1.11 File Upload / Dropzone
Drag-and-drop file upload area with click-to-browse fallback.
- Dashed border, centered icon + text
- Drag-over state: `border-accent bg-accent-subtle`
- File list below with name, size, remove button
- Accept types, max size configurable

#### 3.1.12 Tag Input / Multi-value
Text input that creates removable tags/chips on Enter.
- Tags render as badges inside the input container
- Backspace removes last tag
- Optional autocomplete suggestions

#### 3.1.13 Color Picker
Simple swatch-based color selector.
- Grid of predefined color swatches
- Selected swatch has `ring-2 ring-accent` indicator
- Optional custom hex input

#### 3.1.14 Form Layout
Standard form field composition pattern.
- Label above input (always visible, never placeholder-only)
- Optional help text below label in `text-caption text-tertiary`
- Error message below input in `text-caption text-error`
- Required indicator: `*` in `text-error` after label text
- Consistent spacing: `space-sm` between label and input, `space-xs` between input and help/error, `space-xl` between form groups

### 3.2 Buttons & Actions (3 patterns)

#### 3.2.1 Button
The primary interactive element.
- Variants: primary (gold), default (subtle), ghost (text-only), danger (red)
- Sizes: sm (28px), base (36px), lg (40px)
- Icon-only: square aspect ratio, `aria-label` required
- Loading state: spinner replaces content, `aria-busy="true"`, `pointer-events-none`
- Focus: `outline: 2px solid var(--accent)`, `outline-offset: 2px`

#### 3.2.2 Button Group
Connected buttons for related actions.
- Buttons share borders, first/last get outer radii, middle buttons get `radius: 0`
- Split button variant: primary action + dropdown trigger

#### 3.2.3 Floating Action Button
Mobile-only bottom-right fixed button.
- `position: fixed`, `bottom: var(--space-xl)`, `right: var(--space-xl)`
- Gold background, `shadow-lg`, `z-sticky`
- Single primary action only

### 3.3 Data Display (10 patterns)

#### 3.3.1 Card
Content container with optional header, body, footer.
- Basic: static content display
- Interactive: `cursor-pointer`, hover elevation (`shadow-sm` → `shadow-md`), `border-hover`
- Compact: reduced padding (`space-md` instead of `space-xl`)
- Stat/KPI: large number + label + trend indicator

#### 3.3.2 Badge / Tag
Small labeling elements.
- Status badges: filled semantic color backgrounds (`bg-success-muted text-success`)
- Category tags: subtle backgrounds, optional remove button
- Sizes: sm (20px height), base (24px height)

#### 3.3.3 Data Table
Full-featured table for structured data.
- Sticky header, sortable columns (click to cycle asc/desc/none)
- Selectable rows with checkbox column
- Hover highlight: `bg-elevated`
- Striped rows optional
- Empty state: centered message with icon
- Responsive: horizontal scroll on mobile

#### 3.3.4 Description List
Key-value pair display for detail views.
- Horizontal: key and value on same row, key right-aligned
- Vertical: key above value (stacked, for mobile or narrow spaces)
- Dividers between rows optional

#### 3.3.5 Accordion / Collapsible
Expandable content sections.
- Single: standalone collapsible section
- Group: multiple sections, optional exclusive mode (one open at a time)
- Trigger: `aria-expanded`, `aria-controls` pointing to panel
- Panel: `role="region"`, `aria-labelledby` pointing to trigger
- Chevron icon rotates on open (`180deg`, `--duration-standard`)
- Keyboard: Enter/Space toggles

#### 3.3.6 Activity Feed / Timeline
Chronological list of events.
- Vertical line connecting event nodes
- Each event: icon (left), content (right), timestamp
- Icon variants: colored dots for status, Lucide icons for action types
- Group by date headers

#### 3.3.7 Progress Bar
Visual completion indicator.
- Linear: horizontal bar with fill, optional percentage label
- Ring/Circle: SVG-based circular progress
- Stepped: segmented bar showing discrete steps
- Fill color: `--accent` for single-metric, `--status-N` for multi-metric
- Track color: `--bg-elevated`
- Indeterminate: animated stripe pattern

#### 3.3.8 Stat Card / KPI
Dashboard metric display.
- Large number in `text-h1` or `text-h2` weight
- Label in `text-caption text-secondary`
- Trend indicator: up/down arrow with `text-success` / `text-error`
- Optional sparkline area chart background
- Compact variant for grid layouts

#### 3.3.9 Avatar
User representation.
- Image: `rounded-full object-cover`, `alt` required
- Initials fallback: `bg-accent text-text-on-accent`, 1-2 letters
- Sizes: xs (24px), sm (32px), md (40px), lg (56px)
- Status dot: `absolute bottom-0 right-0`, `ring-2 ring-bg-card`
  - Online: `bg-success`, Away: `bg-warning`, Offline: `bg-text-muted`, Busy: `bg-error`
- Group: `-space-x-2` overlap, `+N` overflow badge

#### 3.3.10 Code Block / KBD
Code and keyboard shortcut display.
- Code block: `bg-bg-secondary`, `border`, monospace font, optional line numbers
- Inline code: `bg-bg-elevated`, `px-xs`, `rounded-sm`, monospace
- KBD: `bg-bg-elevated`, `border`, `border-b-2`, `rounded-sm`, `text-caption`, `px-sm` — keyboard key appearance
- Syntax highlighting via external library (Prism or Shiki) — the system only provides the container styling

### 3.4 Navigation (8 patterns)

#### 3.4.1 Sidebar Navigation
Primary nav for dashboard/workspace apps.
- Expanded: 240px width. Collapsed: 64px (icons only).
- Sections with group labels (`text-overline text-tertiary`)
- Items: icon + label, `hover:bg-elevated`, active: `bg-accent-muted text-accent border-l-2 border-accent`
- Collapse toggle button at bottom
- Mobile (< 768px): off-canvas drawer from left, overlay behind
- `<nav aria-label="Main navigation">`, `aria-current="page"` on active

#### 3.4.2 Top Navigation
Horizontal nav bar for simpler apps or marketing pages.
- Height: 56px, fixed top, `z-sticky`
- Layout: logo (left), nav links (center or left), actions (right)
- Active link: `text-accent border-b-2 border-accent`
- Mobile (< 768px): hamburger menu, links collapse to dropdown/drawer
- `<nav aria-label="Main navigation">`

#### 3.4.3 Breadcrumbs
Hierarchical location indicator.
- Separator: `/` or chevron icon between items
- Current page: `text-primary` (not a link), `aria-current="page"`
- Previous pages: `text-secondary` links
- Truncation: collapse middle items to `...` dropdown when > 4 items
- `<nav aria-label="Breadcrumb">`, `<ol>` list

#### 3.4.4 Tabs
Segmented content switching.
- Underline variant: bottom border indicator, for section switching
- Pill variant: `bg-accent text-text-on-accent` fill, for view toggling
- Vertical variant: left-side list, for settings/preferences
- `role="tablist"`, tabs `role="tab"` with `aria-selected`, `aria-controls`
- Panels `role="tabpanel"` with `aria-labelledby`
- Keyboard: arrows switch tabs, Home/End for first/last

#### 3.4.5 Pagination
Page navigation for lists/tables.
- Full numbered: `1 2 3 ... 10` with truncation at 7+ pages
- Compact: `← Previous | Next →` with page count
- Active page: `bg-accent text-text-on-accent`
- `<nav aria-label="Pagination">`, `aria-current="page"` on active

#### 3.4.6 Stepper / Wizard
Multi-step process indicator.
- Horizontal (default): numbered circles connected by lines
- Vertical: stacked steps with content areas
- Step states: completed (checkmark, `text-success`), current (`border-accent`), upcoming (`text-muted`)
- With validation: block advancement until current step is valid
- `aria-label="Progress"`, `aria-current="step"` on active

#### 3.4.7 Segmented Control
Inline toggle between 2-4 mutually exclusive options.
- Container: `bg-bg-elevated`, `rounded-lg`, `p-2xs`
- Selected option: `bg-bg-card`, `shadow-sm`, `rounded-md`
- Transition: `--duration-micro` ease
- `role="radiogroup"`, items `role="radio"`, `aria-checked`
- Keyboard: arrow keys switch selection

#### 3.4.8 Sticky Section Header
Anchored header for scrollable content sections.
- `position: sticky`, `top: 0`, `z-sticky`
- `bg-bg-primary` (or parent background) with slight bottom shadow on scroll
- Used for: long forms, settings pages, data-heavy layouts

### 3.5 Feedback & Status (7 patterns)

#### 3.5.1 Toast / Notification
Non-blocking ephemeral messages.
- Container: `fixed bottom-xl right-xl z-toast`, `aria-live="polite"`, `role="status"`
- Max 3 visible, stacked with `space-sm` gap
- Auto-dismiss: 5 seconds, hover pauses timer
- Variants: success (CheckCircle), error (XCircle), warning (AlertTriangle), info (Info)
- Enter: `fade-in-up` 200ms. Exit: `fade-out-down` 150ms.
- Close button on each toast
- Never steal focus

#### 3.5.2 Alert / Banner
Persistent inline messages.
- Full-width, within content flow (not floating)
- Variants: info (`bg-info-muted border-info`), warning, error, success
- Icon (left) + message + optional action link + optional dismiss button
- `role="alert"` for errors/warnings, `role="status"` for info/success

#### 3.5.3 Callout / Admonition
Inline content blocks for tips, warnings, notes.
- Left border accent: 3px solid in semantic color
- Icon + title (bold) + body text
- Variants: tip (`--accent`), warning (`--warning`), danger (`--error`), info (`--info`), note (`--border`)
- Used within documentation, help text, long-form content

#### 3.5.4 Confirmation Dialog
Destructive action pattern. Extends Modal.
- Icon (AlertTriangle or similar) + heading + description
- Two buttons: Cancel (default/ghost) + Confirm (danger variant)
- `role="alertdialog"`, `aria-describedby` on description
- Focus trapped, initial focus on Cancel (not the destructive action)
- Keyboard: Escape cancels

#### 3.5.5 Skeleton Loader
Loading placeholder that matches content layout.
- Three primitives: line (`h-4 rounded-md`), circle (`rounded-full`), rect (`rounded-md`)
- Base: `bg-bg-elevated`
- Shimmer animation: horizontal gradient sweep, `1.5s ease-in-out infinite`
- Compose primitives to match the layout being loaded
- `prefers-reduced-motion`: static fill, no animation
- If loading > 3 seconds, add `text-caption text-tertiary` hint below

#### 3.5.6 Progress / Loading Bar
Page-level loading indicator.
- Position: top of viewport, full-width, `z-toast`
- Height: 3px
- Indeterminate: animated left-to-right sweep
- Determinate: width percentage with smooth transition
- Color: `--accent`

#### 3.5.7 Empty State
Placeholder for content-less views.
- Centered: icon (`w-12 h-12 text-tertiary`) + heading (`text-h3`) + description (`text-secondary`) + optional CTA button
- Icon from Lucide, contextually appropriate
- CTA: primary button for the most logical next action
- Used for: empty lists, no search results, first-time user states

### 3.6 Overlays (5 patterns)

#### 3.6.1 Modal / Dialog
Centered overlay for focused interactions.
- Sizes: sm (400px), md (520px), lg (640px)
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
- Backdrop: `bg-overlay`, click-outside closes (unless `aria-modal` requires explicit dismiss)
- Focus trapped inside, Escape closes, return focus to trigger on close
- Scrollable body with fixed header/footer
- Enter: `scale-in` 200ms. Exit: reverse 150ms.

#### 3.6.2 Drawer / Slide-over
Panel that slides from the edge.
- Directions: right (default), left
- Widths: sm (320px), md (400px), lg (560px), full (100% — mobile)
- `role="dialog"`, `aria-modal="true"`
- Backdrop: `bg-overlay`
- Focus trapped, Escape closes
- Enter: `slide-in-right` 300ms. Exit: reverse 200ms.
- Use for: detail panels, settings, mobile navigation, forms

#### 3.6.3 Dropdown Menu
Action/context menu.
- Trigger: button with `aria-haspopup="menu"`, `aria-expanded`
- Menu: `role="menu"`, items `role="menuitem"`
- Positioned below trigger, auto-flips if near viewport edge
- Items: icon (optional) + label + shortcut hint (optional, right-aligned, `text-tertiary`)
- Dividers between groups
- Keyboard: arrows navigate, Enter selects, Escape closes
- Nested submenu: arrow right opens, arrow left closes

#### 3.6.4 Popover
Rich content overlay positioned near trigger.
- Similar to tooltip but interactive — can contain forms, buttons, links
- `aria-haspopup="dialog"` on trigger
- Click to open (not hover), click-outside or Escape to close
- Positioned with auto-flip, optional arrow pointer
- Use for: filter panels, mini-forms, rich previews

#### 3.6.5 Tooltip
Simple text hint on hover/focus.
- Background: `bg-tooltip-bg`, border: `border-tooltip-border`
- Text: `text-tooltip-text`, `text-caption`
- Positions: top (default), right, bottom, left, with CSS arrow
- Trigger: hover + `focus-visible`, 150ms delay-in, 0ms delay-out
- `role="tooltip"`, trigger has `aria-describedby`
- Max width: 240px
- Never contain interactive elements — use Popover instead

### 3.7 Layout (4 patterns)

#### 3.7.1 Page Shell — Sidebar
Standard dashboard layout.
- Sidebar: `bg-bg-secondary`, full-height, fixed left
- Content: `margin-left` matching sidebar width, `bg-bg-primary`
- Top bar within content: breadcrumbs + page title + actions
- Mobile: sidebar becomes off-canvas drawer

#### 3.7.2 Page Shell — Top Nav
Simpler app or marketing layout.
- Top nav: fixed, `bg-bg-card`, `border-bottom`, `z-sticky`
- Content below: centered, `max-width: 1280px`, `bg-bg-primary`
- Mobile: nav links collapse to hamburger menu

#### 3.7.3 Divider / Separator
Visual content break.
- Horizontal: `border-top: 1px solid var(--border)`, full-width
- Vertical: `border-left: 1px solid var(--border)`, full-height (in flex contexts)
- With label: centered text interrupting the line, `text-caption text-tertiary`, `bg-bg-primary` padding to mask the line behind text

#### 3.7.4 Bottom Sheet (Mobile)
Mobile-only action panel from bottom.
- `position: fixed`, `bottom: 0`, full-width, `z-modal`
- Drag handle at top: `w-8 h-1 rounded-full bg-text-muted` centered
- `border-radius: var(--radius-xl) var(--radius-xl) 0 0` (top corners only)
- Slide-up animation, backdrop behind
- States: peek (partial height), expanded (full content), dismissed

### 3.8 Marketing & Utility (3 patterns)

#### 3.8.1 Command Palette
Cmd+K search dialog.
- Trigger: `Cmd+K` / `Ctrl+K`, global keyboard listener
- Panel: `role="dialog"`, `aria-modal="true"`, centered, `max-width: 560px`
- Input: `role="combobox"`, `aria-expanded`, `aria-controls` → listbox
- Results: `role="listbox"`, items `role="option"`, `aria-selected` on active
- Keyboard: Escape closes, arrows navigate, Enter selects, focus trapped
- Footer: keyboard hints in `text-caption text-muted`
- Results grouped by category with group headers

#### 3.8.2 Pricing Table
Tiered pricing display for marketing pages.
- 2-4 plan columns, responsive (stack on mobile)
- Highlighted/recommended plan: `border-accent`, optional "Popular" badge
- Feature rows with checkmarks (`text-success`) and X marks (`text-muted`)
- CTA button per plan: primary for recommended, default for others
- Annual/monthly toggle at top (Segmented Control)

#### 3.8.3 Error Pages
Full-page error states.
- Centered vertically and horizontally
- Status code: `font-display text-display-1 text-accent` (Cinzel — this is a brand moment)
- Heading: `text-h2`
- Description: `text-body text-secondary`
- CTA: primary button ("Go Home", "Try Again", etc.)
- Variants: 404 (not found), 500 (server error), 503 (maintenance)

---

## 4. Icon System

- **Library:** Lucide React only — no emoji, no PNG, no mixing libraries
- **Sizes:** `w-4 h-4` (buttons, inline), `w-5 h-5` (nav items, form icons), `w-6 h-6` (cards, empty states), `w-12 h-12` (hero illustrations, empty state primary)
- Icons inherit color via `currentColor` — apply semantic text color classes
- Every icon-only button must have `aria-label`
- Prefer meaning over decoration — every icon should communicate something

---

## 5. Accessibility Requirements

These apply to ALL components without exception:

1. **Focus visible:** `outline: 2px solid var(--accent)`, `outline-offset: 2px` on all interactive elements via `:focus-visible`
2. **Color contrast:** Minimum 4.5:1 for normal text, 3:1 for large text (>= 18px or >= 14px bold)
3. **Color independence:** Never convey meaning through color alone — pair with icons, text, or patterns
4. **Keyboard navigation:** Every interactive element reachable and operable via keyboard
5. **ARIA landmarks:** `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>` used correctly
6. **Labels:** Every form input has a visible `<label>` — never placeholder-only
7. **Reduced motion:** `prefers-reduced-motion: reduce` disables all animations
8. **Screen reader:** All dynamic content changes announced via `aria-live` regions
9. **Touch targets:** Minimum 44×44px on mobile

---

## 6. File Deliverables

### 6.1 globals.css
Complete rewrite. Contains:
- CSS reset/normalize
- `[data-theme="dark"]` and `[data-theme="light"]` blocks with all tokens
- Base typography styles
- Keyframe animations
- `prefers-reduced-motion` overrides
- Utility classes for non-Tailwind usage

### 6.2 tailwind.preset.js
Complete rewrite. Maps every token to Tailwind utilities:
- `theme.extend.colors` — all semantic color tokens
- `theme.extend.spacing` — space tokens
- `theme.extend.borderRadius` — radius tokens with `ds-` prefix
- `theme.extend.boxShadow` — shadow tokens with `ds-` prefix
- `theme.extend.fontSize` — type scale with `[size, { lineHeight, letterSpacing, fontWeight }]`
- `theme.extend.fontFamily` — sans + display
- `theme.extend.zIndex` — z-scale
- `theme.extend.animation` + `theme.extend.keyframes` — motion tokens

### 6.3 STYLE_GUIDE.md
Complete rewrite. The agentic reference document. Contains:
- Design philosophy and identity principles
- Complete token reference with values
- All 52 component patterns with full specs (anatomy, variants, states, accessibility, Tailwind JSX, plain CSS HTML, do/don't)
- Layout principles and responsive behavior
- Tailwind ↔ CSS variable mapping table

### 6.4 CLAUDE.md
Complete rewrite. The rules document for Claude Code agents. Contains:
- All current rules updated for v2 tokens
- New rules for added patterns
- Marketing vs Product typography context rule
- Complete component reference table
- Agentic usage instructions

### 6.5 index.html
Complete rewrite. Interactive visual showcase. Contains:
- All 52 component patterns rendered in both themes
- Live theme toggle
- Sticky navigation organized by category
- Token visualization (colors, type, spacing, radii, shadows)
- Uses plain CSS only (no Tailwind) — proves the system works without it

---

## 7. Design Principles (Codified in CLAUDE.md)

1. **Token-only values** — every color, spacing, radius, and shadow comes from the system. Zero hardcoded values.
2. **Both themes mandatory** — every component works in dark and light. Verify by toggling `data-theme`.
3. **Accessibility non-negotiable** — ARIA, keyboard, contrast, motion. No exceptions.
4. **8-point grid** — all spacing uses tokens. No arbitrary values.
5. **Lucide React icons only** — consistent icon language across all apps.
6. **Restrained motion** — fast, functional transitions. No bounce or spring. Respect reduced-motion.
7. **Gold is the signature** — use it for primary actions and brand moments only. Never decorative.
8. **Cinzel is marketing-only** — product UI uses Inter exclusively.
9. **Warm in light, cool in dark** — each theme has its own character, connected by the gold accent.
10. **Agents don't guess** — every decision is explicit. No "use your judgment" in the spec.

---

## 8. Parallelization Strategy

This rebuild is designed for sub-agent execution. Independent work streams:

| Stream | Scope | Dependencies |
|--------|-------|-------------|
| **A: Token Foundation** | globals.css (all tokens, reset, animations) | None — start first |
| **B: Tailwind Preset** | tailwind.preset.js (full mapping) | Depends on A (token values) |
| **C: Inputs & Forms** | 14 component patterns in STYLE_GUIDE.md | Depends on A (token names) |
| **D: Buttons & Actions** | 3 component patterns | Depends on A |
| **E: Data Display** | 10 component patterns | Depends on A |
| **F: Navigation** | 8 component patterns | Depends on A |
| **G: Feedback & Status** | 7 component patterns | Depends on A |
| **H: Overlays** | 5 component patterns | Depends on A |
| **I: Layout & Marketing** | 7 component patterns | Depends on A |
| **J: CLAUDE.md** | Rules document rewrite | Depends on all component streams |
| **K: index.html** | Visual showcase | Depends on A + all component streams |

Streams C through I can run in parallel once A completes. J and K are final integration steps.
