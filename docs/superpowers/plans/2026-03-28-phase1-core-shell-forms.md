# Phase 1: Core Shell + Forms — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add navigation shells (sidebar + top nav), page layouts, form controls, toast notifications, and icon system guidance to the Signature Design System.

**Architecture:** Three files updated in sequence — STYLE_GUIDE.md gets the React + Tailwind copy-paste patterns, index.html gets interactive visual demos, CLAUDE.md gets concise rules for AI consumption. No token changes needed (all new components use existing tokens).

**Tech Stack:** HTML/CSS (index.html), Markdown (STYLE_GUIDE.md, CLAUDE.md), React + Tailwind patterns (documented, not executed).

**Spec:** `docs/superpowers/specs/2026-03-28-phase1-core-shell-forms-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `STYLE_GUIDE.md` | Modify (append sections after current Section 6) | React + Tailwind component patterns for all new components |
| `index.html` | Modify (add sections + nav links + CSS) | Interactive visual demos for all new components |
| `CLAUDE.md` | Modify (add rules to Component Patterns + Quick Reference) | Concise AI-consumable rules for nav, forms, toasts, icons |

---

## Task 1: Add Icon System section to STYLE_GUIDE.md

**Why first:** Icon conventions are referenced by every subsequent component (nav items, form controls, toasts all use icons).

**Files:**
- Modify: `STYLE_GUIDE.md` — append after Section 6 (Accessibility)

- [ ] **Step 1: Add Section 7 — Icon System**

Append after the last line of `STYLE_GUIDE.md`:

```markdown
---

## 7. Icon System (Lucide React)

### Library

Use **Lucide React** (`lucide-react`) exclusively. No emoji, no PNG/raster icons, no mixing icon libraries.

### Sizing Convention

| Context | Size | Tailwind |
|---------|------|----------|
| Nav items, inline with text | `20px` | `w-5 h-5` |
| Buttons (inside) | `16px` | `w-4 h-4` |
| Card headers, feature icons | `24px` | `w-6 h-6` |
| Hero / empty state illustrations | `48px` | `w-12 h-12` |

### Color Rules

- Icons inherit text color via `currentColor` (default Lucide behavior)
- Nav icons: `text-text-secondary`, active: `text-accent`
- Semantic icons: match their semantic color (`text-error`, `text-success`, etc.)
- Never use a color that doesn't come from the design token system

### Usage Pattern

```jsx
import { Home, Settings, Bell } from 'lucide-react';

<Home className="w-5 h-5" />            {/* Nav icon */}
<Settings className="w-4 h-4" />        {/* Button icon */}
<Bell className="w-5 h-5 text-accent" /> {/* Highlighted */}
```

### Rules

- Always use Lucide icons — no exceptions
- Every icon-only button must have an `aria-label`
- Prefer outline style (default). Filled variants only for active indicator states
- Maintain consistent `2px` stroke width — don't mix with other icon sets
```

- [ ] **Step 2: Verify the markdown renders correctly**

Open `STYLE_GUIDE.md` and confirm the new section appears after Section 6 with proper heading hierarchy.

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add icon system section to STYLE_GUIDE.md (Phase 1)"
```

---

## Task 2: Add Sidebar Navigation section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md` — append after Section 7

- [ ] **Step 1: Add Section 8 — Sidebar Navigation**

Append after Section 7:

```markdown
---

## 8. Sidebar Navigation

### Structure

Fixed left sidebar. `240px` wide expanded, `64px` collapsed (icon-only). Background: `bg-bg-secondary` with `1px` right border (`border-border`). Three vertical zones: Header, Nav Body (scrollable), Footer.

### Header

```jsx
<div className="flex items-center justify-between h-[56px] px-md border-b border-border">
  {/* Logo + App Name */}
  <div className="flex items-center gap-sm">
    <img src="/logo.svg" alt="App" className="h-8 w-8" />
    {!collapsed && <span className="text-label font-semibold text-text-primary">App Name</span>}
  </div>
  {/* Collapse Toggle */}
  <button
    onClick={() => setCollapsed(!collapsed)}
    aria-expanded={!collapsed}
    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    className="text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-ds-sm p-xs transition-all duration-150"
  >
    {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
  </button>
</div>
```

### Nav Body

```jsx
<nav aria-label="Main navigation" className="flex-1 overflow-y-auto py-lg px-sm">
  {/* Section Group */}
  <div className="mb-xl">
    <span className="text-overline font-semibold uppercase tracking-widest text-text-tertiary px-md mb-xs block">
      MAIN
    </span>
    <div className="flex flex-col gap-xs">
      {/* Active Item */}
      <a
        href="/dashboard"
        aria-current="page"
        className="flex items-center gap-sm h-[36px] px-md rounded-ds-sm bg-accent-muted text-accent border-l-2 border-accent transition-all duration-150"
      >
        <LayoutDashboard className="w-5 h-5" />
        {!collapsed && <span className="text-label">Dashboard</span>}
      </a>
      {/* Resting Item */}
      <a
        href="/projects"
        className="flex items-center gap-sm h-[36px] px-md rounded-ds-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-all duration-150"
      >
        <FolderOpen className="w-5 h-5" />
        {!collapsed && <span className="text-label">Projects</span>}
        {!collapsed && <span className="ml-auto inline-flex items-center px-sm py-[0.1rem] text-overline rounded-full bg-accent-muted text-accent">12</span>}
      </a>
    </div>
  </div>
</nav>
```

### Footer

```jsx
<div className="h-[64px] px-md flex items-center gap-sm border-t border-border">
  <img src="/avatar.jpg" alt="" className="w-8 h-8 rounded-full object-cover" />
  {!collapsed && (
    <div className="flex-1 min-w-0">
      <div className="text-label font-medium text-text-primary truncate">John Doe</div>
      <div className="text-caption text-text-tertiary truncate">john@example.com</div>
    </div>
  )}
</div>
```

Clicking the avatar area opens a dropdown with: Profile, Settings, Theme toggle (dark/light), Logout.

### States

| State | Classes |
|-------|---------|
| Resting | `text-text-secondary bg-transparent` |
| Hover | `bg-bg-elevated text-text-primary` |
| Active | `bg-accent-muted text-accent border-l-2 border-accent` |
| Collapsed icon | Centered icon only, tooltip on hover shows label |

### Mobile (< 768px)

- Sidebar hidden by default
- Hamburger button (`Menu` icon) triggers off-canvas drawer
- Drawer: `fixed inset-y-0 left-0 w-[280px] z-overlay bg-bg-secondary shadow-ds-lg`
- Overlay backdrop: `fixed inset-0 bg-black/50 z-overlay`
- Transition: `200ms ease` slide + fade
- Focus trapped inside drawer when open, `Escape` closes it

### Accessibility

- `<nav>` landmark with `aria-label="Main navigation"`
- Active item: `aria-current="page"`
- Collapse toggle: `aria-expanded` state
- Skip link as first focusable element: `Skip to main content`
- Mobile drawer: focus trapped, `Escape` closes
```

- [ ] **Step 2: Verify markdown renders correctly**

Confirm new section appears with proper heading hierarchy and code blocks.

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add sidebar navigation section to STYLE_GUIDE.md (Phase 1)"
```

---

## Task 3: Add Top Navigation section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md` — append after Section 8

- [ ] **Step 1: Add Section 9 — Top Navigation**

Append after Section 8:

```markdown
---

## 9. Top Navigation

### Structure

Full-width horizontal bar, `56px` height, fixed to top (`z-sticky`). Background: `bg-bg-secondary` with bottom border (`border-border`), `shadow-ds-sm`. Three zones: Left (logo + links), Center (optional search), Right (actions).

### Pattern

```jsx
<header className="fixed top-0 left-0 right-0 h-[56px] bg-bg-secondary border-b border-border shadow-ds-sm z-sticky">
  <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-xl">
    {/* Left Zone */}
    <div className="flex items-center gap-xs">
      <img src="/logo.svg" alt="App" className="h-7 w-7" />
      <span className="text-h3 font-semibold text-text-primary mr-lg">AppName</span>
      {/* Nav Links */}
      <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-xs">
        <a href="/features" aria-current="page" className="text-label font-medium px-md py-sm rounded-ds-sm text-accent relative after:absolute after:bottom-0 after:left-md after:right-md after:h-[2px] after:bg-accent transition-all duration-150">
          Features
        </a>
        <a href="/pricing" className="text-label font-medium px-md py-sm rounded-ds-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all duration-150">
          Pricing
        </a>
      </nav>
    </div>

    {/* Right Zone */}
    <div className="flex items-center gap-sm">
      <button aria-label="Search" className="text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-ds-sm p-sm transition-all duration-150">
        <Search className="w-5 h-5" />
      </button>
      <button aria-label="Notifications, 3 unread" className="relative text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-ds-sm p-sm transition-all duration-150">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-error" />
      </button>
      <img src="/avatar.jpg" alt="User menu" className="w-7 h-7 rounded-full cursor-pointer" />
    </div>
  </div>
</header>
```

### States

| State | Classes |
|-------|---------|
| Resting link | `text-text-secondary` |
| Hover link | `text-text-primary bg-bg-elevated` |
| Active link | `text-accent` with `2px` bottom accent border (pseudo-element) |

### When to Use

- Public-facing pages (landing, pricing, docs, blog)
- Simpler apps with ≤ 6 top-level routes
- For dashboards with 7+ routes, use the sidebar shell instead

### Mobile (< 768px)

- Nav links collapse into hamburger menu (`Menu` icon, right side)
- Hamburger opens full-width dropdown: `bg-bg-card shadow-ds-md`
- Links stack vertically, `44px` min height touch targets
- Right zone shrinks to: hamburger + avatar only
- Transition: panel slides down `200ms ease`
- `aria-expanded` on menu button, `aria-controls` pointing to panel

### Accessibility

- `<nav>` landmark with `aria-label="Primary navigation"`
- Active link: `aria-current="page"`
- Notification badge: `aria-label="Notifications, 3 unread"` (dynamic count)
- All icon buttons have `aria-label`
```

- [ ] **Step 2: Verify markdown renders correctly**

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add top navigation section to STYLE_GUIDE.md (Phase 1)"
```

---

## Task 4: Add Page Shell Layouts section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md` — append after Section 9

- [ ] **Step 1: Add Section 10 — Page Shell Layouts**

Append after Section 9:

```markdown
---

## 10. Page Shell Layouts

### Sidebar Shell

```jsx
<div className="flex min-h-screen">
  {/* Sidebar — fixed left */}
  <aside className={`fixed inset-y-0 left-0 bg-bg-secondary border-r border-border transition-all duration-200 ${collapsed ? 'w-[64px]' : 'w-[240px]'}`}>
    {/* Sidebar content (see Section 8) */}
  </aside>

  {/* Main area */}
  <main className={`flex-1 transition-all duration-200 ${collapsed ? 'ml-[64px]' : 'ml-[240px]'}`}>
    {/* Top Bar + Content */}
  </main>
</div>
```

- Sidebar: fixed left, full viewport height
- Main area scrolls independently
- Mobile (< 768px): sidebar becomes drawer, main area is full-width (`ml-0`)

### Top Nav Shell

```jsx
<div className="min-h-screen">
  {/* Top Nav — fixed top (see Section 9) */}
  <header className="fixed top-0 left-0 right-0 h-[56px] z-sticky ...">
    {/* Top nav content */}
  </header>

  {/* Main area — offset for fixed nav */}
  <main className="pt-[56px]">
    <div className="max-w-6xl mx-auto px-xl py-3xl">
      {/* Page content */}
    </div>
  </main>
</div>
```

- Top nav: fixed top, full viewport width
- Main area: `pt-[56px]` to offset fixed nav (no content overlap)
- Content centered, `max-w-6xl` (1152px) or `max-w-7xl` (1280px)

### Top Bar (In-Page Header)

Works with **both** shells. Sits at the top of the main content area.

```jsx
<div className="flex items-start justify-between py-lg px-xl border-b border-border">
  <div>
    {/* Breadcrumbs (if 3+ levels deep) */}
    <nav aria-label="Breadcrumb" className="flex items-center gap-xs mb-xs">
      <a href="/home" className="text-caption text-text-tertiary hover:text-text-primary transition-all duration-150">Home</a>
      <ChevronRight className="w-3 h-3 text-text-muted" />
      <a href="/projects" className="text-caption text-text-tertiary hover:text-text-primary transition-all duration-150">Projects</a>
      <ChevronRight className="w-3 h-3 text-text-muted" />
      <span className="text-caption text-text-primary">Settings</span>
    </nav>
    {/* Page Title */}
    <h1 className="text-h1 font-semibold text-text-primary">Project Settings</h1>
  </div>
  {/* Page-level actions */}
  <div className="flex items-center gap-sm">
    <button className="btn-default">Export</button>
    <button className="btn-primary">Create New</button>
  </div>
</div>
```

- Breadcrumbs: `text-caption text-text-tertiary`, separator `ChevronRight` icon, last item `text-text-primary`
- Sticky option: add `sticky top-0 z-sticky bg-bg-primary` to prevent content showing through
```

- [ ] **Step 2: Verify markdown renders correctly**

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add page shell layouts section to STYLE_GUIDE.md (Phase 1)"
```

---

## Task 5: Add Form Controls section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md` — append after Section 10

- [ ] **Step 1: Add Section 11 — Form Controls**

Append after Section 10:

```markdown
---

## 11. Form Controls

All form controls share these rules:
- Visible `<label>` for every input (never placeholder-only)
- `focus-visible` ring: `border-accent ring-2 ring-accent-muted`
- Disabled: `opacity-40 cursor-not-allowed pointer-events-none`
- Error: `border-error` + error message below in `text-caption text-error`
- Transitions: `transition-all duration-150`
- Minimum touch target: `44px` height on mobile

### Toggle / Switch

```jsx
<label className="inline-flex items-center gap-md cursor-pointer">
  <button
    role="switch"
    aria-checked={enabled}
    onClick={() => setEnabled(!enabled)}
    className={`relative inline-flex items-center w-[36px] h-[20px] rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted ${enabled ? 'bg-accent' : 'bg-bg-elevated border border-border'}`}
  >
    <span className={`inline-block w-[14px] h-[14px] rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-[18px] bg-white' : 'translate-x-[2px] bg-text-muted'}`} />
  </button>
  <div>
    <span className="text-body text-text-primary">Email Notifications</span>
    <span className="block text-caption text-text-tertiary">Receive updates about your projects</span>
  </div>
</label>
```

- Track: `36px` wide, `20px` tall, `rounded-full`
- Off: track `bg-bg-elevated border border-border`, thumb `bg-text-muted`
- On: track `bg-accent`, thumb `#ffffff` (always white for contrast against gold)
- Thumb: `14px` circle, translates `16px` right when on
- Keyboard: `Space` toggles

### Checkbox

```jsx
<label className="inline-flex items-center gap-sm cursor-pointer">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    className="peer sr-only"
  />
  <span className="w-4 h-4 rounded-ds-sm border border-border bg-bg-surface flex items-center justify-center transition-all duration-150 peer-checked:bg-accent peer-checked:border-accent peer-hover:border-border-hover peer-focus-visible:ring-2 peer-focus-visible:ring-accent-muted">
    {checked && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
  </span>
  <span className="text-body text-text-primary">Remember me</span>
</label>
```

- Box: `16px` square, `rounded-ds-sm` (6px)
- Checked: `bg-accent border-accent`, white `Check` icon (`12px`, stroke-width 2.5)
- Indeterminate: `bg-accent border-accent`, white `Minus` icon
- Group: vertical stack with `gap-md`, optional group label as overline above
- Aria: native `<input type="checkbox">` with `aria-checked` (supports `"mixed"`)

### Radio Group

```jsx
<fieldset>
  <legend className="text-label font-medium text-text-primary mb-md">Notification Frequency</legend>
  <div role="radiogroup" className="flex flex-col gap-md">
    {options.map(option => (
      <label key={option.value} className="inline-flex items-center gap-sm cursor-pointer">
        <input
          type="radio"
          name="frequency"
          value={option.value}
          checked={selected === option.value}
          onChange={() => setSelected(option.value)}
          className="peer sr-only"
        />
        <span className="w-4 h-4 rounded-full border border-border bg-bg-surface flex items-center justify-center transition-all duration-150 peer-checked:border-accent peer-hover:border-border-hover peer-focus-visible:ring-2 peer-focus-visible:ring-accent-muted">
          {selected === option.value && <span className="w-2 h-2 rounded-full bg-accent" />}
        </span>
        <span className="text-body text-text-primary">{option.label}</span>
      </label>
    ))}
  </div>
</fieldset>
```

- Circle: `16px`, `rounded-full`, `border border-border bg-bg-surface`
- Selected: `border-accent` with inner `8px` circle in `bg-accent`
- Horizontal variant: `flex-row gap-xl` for 2-4 options
- Keyboard: arrow keys navigate within group

### Select Dropdown (Custom)

```jsx
<div className="relative">
  <button
    role="combobox"
    aria-expanded={open}
    aria-haspopup="listbox"
    onClick={() => setOpen(!open)}
    className="w-full flex items-center justify-between bg-bg-surface border border-border rounded-ds-md px-md py-sm text-body text-text-primary hover:border-border-hover focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150"
  >
    <span className={selected ? 'text-text-primary' : 'text-text-muted'}>{selected || 'Select an option...'}</span>
    <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
  </button>

  {open && (
    <ul
      role="listbox"
      className="absolute top-full left-0 right-0 mt-xs bg-bg-card border border-border rounded-ds-md shadow-ds-md z-dropdown max-h-[240px] overflow-y-auto animate-fade-in-up"
    >
      {options.map(option => (
        <li
          key={option}
          role="option"
          aria-selected={selected === option}
          onClick={() => { setSelected(option); setOpen(false); }}
          className="flex items-center justify-between px-md py-sm text-body cursor-pointer hover:bg-bg-elevated transition-all duration-150"
        >
          <span>{option}</span>
          {selected === option && <Check className="w-4 h-4 text-accent" />}
        </li>
      ))}
    </ul>
  )}
</div>
```

- Trigger: same styling as text input
- Chevron rotates `180deg` when open
- Dropdown: `bg-bg-card border rounded-ds-md shadow-ds-md z-dropdown`
- Max height: `240px`, scrollable
- Keyboard: `Enter`/`Space` opens, arrows navigate, `Enter` selects, `Escape` closes
- Click outside closes
```

- [ ] **Step 2: Verify markdown renders correctly**

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add form controls section to STYLE_GUIDE.md (Phase 1)"
```

---

## Task 6: Add Toast / Notification System section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md` — append after Section 11

- [ ] **Step 1: Add Section 12 — Toast / Notification System**

Append after Section 11:

```markdown
---

## 12. Toast / Notification System

### Container

```jsx
<div
  aria-live="polite"
  role="status"
  className="fixed bottom-xl right-xl z-modal flex flex-col gap-sm max-w-sm"
>
  {/* Toast items stack here, newest on top */}
</div>
```

- Position: bottom-right desktop, bottom-center mobile (full-width minus `space-lg` margin)
- Max visible: 3 toasts. Additional queue and appear as earlier ones dismiss.

### Individual Toast

```jsx
<div className="flex items-start gap-md bg-bg-card border border-border rounded-ds-md shadow-ds-lg px-lg py-md animate-fade-in-up">
  {/* Icon — matches variant */}
  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-[1px]" />

  {/* Content */}
  <div className="flex-1 min-w-0">
    <p className="text-label font-medium text-text-primary">Changes saved</p>
    <p className="text-caption text-text-secondary">Your project settings have been updated.</p>
  </div>

  {/* Close */}
  <button
    aria-label="Dismiss notification"
    className="text-text-muted hover:text-text-primary flex-shrink-0 transition-all duration-150"
  >
    <X className="w-4 h-4" />
  </button>
</div>
```

### Variants

| Variant | Icon | Color |
|---------|------|-------|
| Success | `CheckCircle` | `text-success` |
| Error | `XCircle` | `text-error` |
| Warning | `AlertTriangle` | `text-warning` |
| Info | `Info` | `text-status-2` |

### Behavior

- Auto-dismiss: **5 seconds** default (configurable)
- Hover pauses auto-dismiss timer
- Entrance: slide from right + fade (`translateX(100%) → 0`, `200ms ease`)
- Exit: fade + slide right (`150ms ease`) — exit faster than enter
- Swipe right to dismiss on mobile

### Accessibility

- Container: `aria-live="polite"`, `role="status"`
- Toasts don't steal focus
- Close button: `aria-label="Dismiss notification"`
- `Escape` dismisses the most recent toast if focused
```

- [ ] **Step 2: Verify markdown renders correctly**

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add toast notification system section to STYLE_GUIDE.md (Phase 1)"
```

---

## Task 7: Add new component demos to index.html — CSS styles

This and the next task add interactive demos for all new Phase 1 components to the HTML showcase. This task adds all the CSS; the next adds the HTML markup.

**Files:**
- Modify: `index.html` — add CSS rules before the closing `</style>` tag

- [ ] **Step 1: Add CSS for sidebar nav demo**

Insert before the closing `</style>` tag in `index.html`:

```css
/* ========================================
   SIDEBAR NAV DEMO
   ======================================== */
.sidebar-demo {
  display: flex;
  gap: var(--space-xl);
  align-items: stretch;
}

.sidebar-demo-panel {
  width: 240px;
  min-height: 400px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.sidebar-demo-panel.collapsed {
  width: 64px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 var(--space-md);
  border-bottom: 1px solid var(--border);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.sidebar-logo-icon {
  width: 32px;
  height: 32px;
  background: var(--accent);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-accent);
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.sidebar-collapse-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--radius-sm);
  transition: all 150ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-collapse-btn:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}

.sidebar-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-lg) var(--space-sm);
}

.sidebar-section-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--text-tertiary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0 var(--space-md);
  margin-bottom: var(--space-xs);
}

.sidebar-nav-group {
  margin-bottom: var(--space-xl);
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  height: 36px;
  padding: 0 var(--space-md);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.sidebar-nav-item:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.sidebar-nav-item.active {
  background: var(--accent-muted);
  color: var(--accent);
  border-left: 2px solid var(--accent);
}

.sidebar-nav-item svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.sidebar-badge {
  margin-left: auto;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.1rem var(--space-sm);
  border-radius: var(--radius-full);
  background: var(--accent-muted);
  color: var(--accent);
}

.sidebar-footer {
  height: 64px;
  padding: 0 var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  border-top: 1px solid var(--border);
}

.sidebar-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--accent);
  color: var(--text-on-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.sidebar-user-info .label-medium {
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.3;
}

.sidebar-user-info .caption {
  line-height: 1.3;
}
```

- [ ] **Step 2: Add CSS for top nav demo**

```css
/* ========================================
   TOP NAV DEMO
   ======================================== */
.topnav-demo {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.topnav-bar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-xl);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.topnav-left {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.topnav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-right: var(--space-lg);
}

.topnav-link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  transition: all 150ms ease;
  position: relative;
  cursor: pointer;
}

.topnav-link:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}

.topnav-link.active {
  color: var(--accent);
}

.topnav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: var(--space-md);
  right: var(--space-md);
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
}

.topnav-right {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.topnav-icon-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 150ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.topnav-icon-btn:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}

.topnav-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--error);
}

.topnav-content-area {
  padding: var(--space-xl);
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 0.8125rem;
}
```

- [ ] **Step 3: Add CSS for form controls demo**

```css
/* ========================================
   FORM CONTROLS DEMO
   ======================================== */
.form-controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-2xl);
}

.form-control-demo {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

.form-control-demo .heading-3 {
  margin-bottom: var(--space-lg);
}

/* Toggle */
.toggle-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 36px;
  height: 20px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background 150ms ease;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  flex-shrink: 0;
}

.toggle-track.active {
  background: var(--accent);
  border-color: var(--accent);
}

.toggle-thumb {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: var(--radius-full);
  transition: transform 200ms ease;
  left: 2px;
}

.toggle-track:not(.active) .toggle-thumb {
  background: var(--text-muted);
}

.toggle-track.active .toggle-thumb {
  background: #ffffff;
  transform: translateX(16px);
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.toggle-label-group {
  display: flex;
  flex-direction: column;
}

/* Checkbox */
.checkbox-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  cursor: pointer;
}

.checkbox-box {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;
  flex-shrink: 0;
}

.checkbox-row:hover .checkbox-box {
  border-color: var(--border-hover);
}

.checkbox-box.checked {
  background: var(--accent);
  border-color: var(--accent);
}

.checkbox-box svg {
  width: 12px;
  height: 12px;
  color: #ffffff;
  stroke-width: 2.5;
}

/* Radio */
.radio-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  cursor: pointer;
}

.radio-circle {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;
  flex-shrink: 0;
}

.radio-row:hover .radio-circle {
  border-color: var(--border-hover);
}

.radio-circle.selected {
  border-color: var(--accent);
}

.radio-circle .radio-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--accent);
}

/* Select */
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 150ms ease;
}

.select-trigger:hover {
  border-color: var(--border-hover);
}

.select-trigger .placeholder {
  color: var(--text-muted);
}

.select-trigger svg {
  width: 16px;
  height: 16px;
  color: var(--text-muted);
  transition: transform 150ms ease;
}

.select-trigger.open svg {
  transform: rotate(180deg);
}

.select-dropdown {
  margin-top: var(--space-xs);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  max-height: 200px;
  overflow-y: auto;
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 150ms ease;
}

.select-option:hover {
  background: var(--bg-elevated);
}

.select-option.selected {
  color: var(--accent);
}

.select-option svg {
  width: 16px;
  height: 16px;
}
```

- [ ] **Step 4: Add CSS for toast demo**

```css
/* ========================================
   TOAST DEMO
   ======================================== */
.toast-demo-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.toast-demo-triggers {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.toast-demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 384px;
}

.toast-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-md) var(--space-lg);
}

.toast-item svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-content .label-medium {
  color: var(--text-primary);
  margin-bottom: 2px;
}

.toast-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 2px;
  transition: color 150ms ease;
  display: flex;
  align-items: center;
}

.toast-close:hover {
  color: var(--text-primary);
}

.toast-close svg {
  width: 16px;
  height: 16px;
}
```

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add CSS styles for Phase 1 component demos in index.html"
```

---

## Task 8: Add new component demos to index.html — HTML markup

**Files:**
- Modify: `index.html` — add nav links + section markup before the footer

- [ ] **Step 1: Add nav links for new sections**

In the `<nav class="section-nav">` element, add these links after the existing `Dashboard` link:

```html
<a class="nav-link" href="#sidebar">Sidebar Nav</a>
<a class="nav-link" href="#topnav">Top Nav</a>
<a class="nav-link" href="#forms">Form Controls</a>
<a class="nav-link" href="#toasts">Toasts</a>
```

- [ ] **Step 2: Add Sidebar Navigation demo section**

Insert before the `<!-- ====== FOOTER ====== -->` comment:

```html
<!-- ====== SIDEBAR NAV ====== -->
<section class="section" id="sidebar">
  <div class="section-header">
    <div class="overline">Navigation</div>
    <h2 class="heading-2">Sidebar Navigation</h2>
    <p class="subtitle">Fixed left sidebar with collapsible states, section groups, and active indicators.</p>
  </div>
  <div class="sidebar-demo">
    <!-- Expanded -->
    <div class="sidebar-demo-panel">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">S</div>
          <span class="label-medium" style="color: var(--text-primary); font-weight: 600;">Signature</span>
        </div>
        <button class="sidebar-collapse-btn" aria-label="Collapse sidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 9 12 12 15 15"/></svg>
        </button>
      </div>
      <div class="sidebar-body">
        <div class="sidebar-nav-group">
          <div class="sidebar-section-label">Main</div>
          <a class="sidebar-nav-item active" href="#sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </a>
          <a class="sidebar-nav-item" href="#sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span>Projects</span>
            <span class="sidebar-badge">12</span>
          </a>
          <a class="sidebar-nav-item" href="#sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Team</span>
          </a>
        </div>
        <div class="sidebar-nav-group">
          <div class="sidebar-section-label">Workspace</div>
          <a class="sidebar-nav-item" href="#sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Search</span>
          </a>
          <a class="sidebar-nav-item" href="#sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Settings</span>
          </a>
        </div>
      </div>
      <div class="sidebar-footer">
        <div class="sidebar-avatar">JD</div>
        <div class="sidebar-user-info">
          <div class="label-medium">John Doe</div>
          <div class="caption">john@example.com</div>
        </div>
      </div>
    </div>

    <!-- Collapsed -->
    <div class="sidebar-demo-panel collapsed">
      <div class="sidebar-header" style="justify-content: center;">
        <div class="sidebar-logo-icon">S</div>
      </div>
      <div class="sidebar-body" style="align-items: center;">
        <div class="sidebar-nav-group" style="width: 100%;">
          <a class="sidebar-nav-item active" href="#sidebar" style="justify-content: center; padding: 0; border-left: none; border-bottom: 2px solid var(--accent); border-radius: 0;" title="Dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </a>
          <a class="sidebar-nav-item" href="#sidebar" style="justify-content: center; padding: 0;" title="Projects">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </a>
          <a class="sidebar-nav-item" href="#sidebar" style="justify-content: center; padding: 0;" title="Team">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </a>
          <a class="sidebar-nav-item" href="#sidebar" style="justify-content: center; padding: 0;" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </a>
          <a class="sidebar-nav-item" href="#sidebar" style="justify-content: center; padding: 0;" title="Settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          </a>
        </div>
      </div>
      <div class="sidebar-footer" style="justify-content: center;">
        <div class="sidebar-avatar">JD</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add Top Navigation demo section**

Insert after the sidebar section:

```html
<!-- ====== TOP NAV ====== -->
<section class="section" id="topnav">
  <div class="section-header">
    <div class="overline">Navigation</div>
    <h2 class="heading-2">Top Navigation</h2>
    <p class="subtitle">Horizontal nav bar for public pages and simpler apps with fewer routes.</p>
  </div>
  <div class="topnav-demo">
    <div class="topnav-bar">
      <div class="topnav-left">
        <div class="topnav-brand">
          <div class="sidebar-logo-icon" style="width: 28px; height: 28px; font-size: 0.75rem;">S</div>
          <span class="heading-3">AppName</span>
        </div>
        <a class="topnav-link active" href="#topnav">Features</a>
        <a class="topnav-link" href="#topnav">Pricing</a>
        <a class="topnav-link" href="#topnav">Docs</a>
        <a class="topnav-link" href="#topnav">Blog</a>
      </div>
      <div class="topnav-right">
        <button class="topnav-icon-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <button class="topnav-icon-btn" aria-label="Notifications, 3 unread">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span class="topnav-dot"></span>
        </button>
        <button class="topnav-icon-btn" aria-label="Toggle theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <div class="sidebar-avatar" style="width: 28px; height: 28px; font-size: 0.6875rem; cursor: pointer;">JD</div>
      </div>
    </div>
    <div class="topnav-content-area">
      Main content area — offset with padding-top to clear fixed nav
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add Form Controls demo section**

Insert after the top nav section:

```html
<!-- ====== FORM CONTROLS ====== -->
<section class="section" id="forms">
  <div class="section-header">
    <div class="overline">Inputs</div>
    <h2 class="heading-2">Form Controls</h2>
    <p class="subtitle">Toggle switches, checkboxes, radio groups, and custom select dropdowns.</p>
  </div>
  <div class="form-controls-grid">
    <!-- Toggle / Switch -->
    <div class="form-control-demo">
      <h3 class="heading-3">Toggle / Switch</h3>
      <div class="toggle-row">
        <div class="toggle-track active" role="switch" aria-checked="true" tabindex="0" onclick="this.classList.toggle('active'); this.setAttribute('aria-checked', this.classList.contains('active'))">
          <span class="toggle-thumb"></span>
        </div>
        <div class="toggle-label-group">
          <span class="body-default">Email Notifications</span>
          <span class="caption">Receive project updates</span>
        </div>
      </div>
      <div class="toggle-row">
        <div class="toggle-track" role="switch" aria-checked="false" tabindex="0" onclick="this.classList.toggle('active'); this.setAttribute('aria-checked', this.classList.contains('active'))">
          <span class="toggle-thumb"></span>
        </div>
        <div class="toggle-label-group">
          <span class="body-default">Dark Mode</span>
          <span class="caption">Use dark theme</span>
        </div>
      </div>
      <div class="toggle-row" style="opacity: 0.4; pointer-events: none;">
        <div class="toggle-track" role="switch" aria-checked="false" aria-disabled="true" tabindex="-1">
          <span class="toggle-thumb"></span>
        </div>
        <div class="toggle-label-group">
          <span class="body-default">Disabled Toggle</span>
          <span class="caption">Not available</span>
        </div>
      </div>
    </div>

    <!-- Checkbox -->
    <div class="form-control-demo">
      <h3 class="heading-3">Checkbox</h3>
      <div class="checkbox-row" onclick="this.querySelector('.checkbox-box').classList.toggle('checked')">
        <span class="checkbox-box checked">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="body-default">Accept terms &amp; conditions</span>
      </div>
      <div class="checkbox-row" onclick="this.querySelector('.checkbox-box').classList.toggle('checked')">
        <span class="checkbox-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="body-default">Send me marketing emails</span>
      </div>
      <div class="checkbox-row" onclick="this.querySelector('.checkbox-box').classList.toggle('checked')">
        <span class="checkbox-box checked">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="body-default">Remember my preferences</span>
      </div>
    </div>

    <!-- Radio Group -->
    <div class="form-control-demo">
      <h3 class="heading-3">Radio Group</h3>
      <div class="overline" style="color: var(--text-tertiary); margin-bottom: var(--space-md);">Notification Frequency</div>
      <div class="radio-row" onclick="document.querySelectorAll('#radio-demo .radio-circle').forEach(c=>c.classList.remove('selected'));this.querySelector('.radio-circle').classList.add('selected')" id="radio-demo">
        <span class="radio-circle selected"><span class="radio-dot"></span></span>
        <span class="body-default">Instant</span>
      </div>
      <div class="radio-row" onclick="document.querySelectorAll('#radio-demo .radio-circle, #radio-demo2 .radio-circle, #radio-demo3 .radio-circle').forEach(c=>c.classList.remove('selected'));this.querySelector('.radio-circle').classList.add('selected')" id="radio-demo2">
        <span class="radio-circle"><span class="radio-dot"></span></span>
        <span class="body-default">Daily digest</span>
      </div>
      <div class="radio-row" onclick="document.querySelectorAll('#radio-demo .radio-circle, #radio-demo2 .radio-circle, #radio-demo3 .radio-circle').forEach(c=>c.classList.remove('selected'));this.querySelector('.radio-circle').classList.add('selected')" id="radio-demo3">
        <span class="radio-circle"><span class="radio-dot"></span></span>
        <span class="body-default">Weekly summary</span>
      </div>
    </div>

    <!-- Select Dropdown -->
    <div class="form-control-demo">
      <h3 class="heading-3">Select Dropdown</h3>
      <label class="label-medium" style="display: block; margin-bottom: var(--space-sm);">Project Status</label>
      <div style="position: relative;">
        <div class="select-trigger" onclick="this.classList.toggle('open'); this.nextElementSibling.style.display = this.classList.contains('open') ? 'block' : 'none'">
          <span class="placeholder">Select a status...</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="select-dropdown" style="display: none;">
          <div class="select-option" onclick="this.closest('.form-control-demo').querySelector('.select-trigger span').textContent=this.textContent.trim(); this.closest('.form-control-demo').querySelector('.select-trigger span').classList.remove('placeholder'); this.closest('.select-dropdown').style.display='none'; this.closest('.form-control-demo').querySelector('.select-trigger').classList.remove('open');">Active</div>
          <div class="select-option" onclick="this.closest('.form-control-demo').querySelector('.select-trigger span').textContent=this.textContent.trim(); this.closest('.form-control-demo').querySelector('.select-trigger span').classList.remove('placeholder'); this.closest('.select-dropdown').style.display='none'; this.closest('.form-control-demo').querySelector('.select-trigger').classList.remove('open');">In Review</div>
          <div class="select-option" onclick="this.closest('.form-control-demo').querySelector('.select-trigger span').textContent=this.textContent.trim(); this.closest('.form-control-demo').querySelector('.select-trigger span').classList.remove('placeholder'); this.closest('.select-dropdown').style.display='none'; this.closest('.form-control-demo').querySelector('.select-trigger').classList.remove('open');">On Hold</div>
          <div class="select-option" onclick="this.closest('.form-control-demo').querySelector('.select-trigger span').textContent=this.textContent.trim(); this.closest('.form-control-demo').querySelector('.select-trigger span').classList.remove('placeholder'); this.closest('.select-dropdown').style.display='none'; this.closest('.form-control-demo').querySelector('.select-trigger').classList.remove('open');">Completed</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Add Toast demo section**

Insert after the form controls section:

```html
<!-- ====== TOASTS ====== -->
<section class="section" id="toasts">
  <div class="section-header">
    <div class="overline">Feedback</div>
    <h2 class="heading-2">Toast Notifications</h2>
    <p class="subtitle">Non-blocking notifications that stack bottom-right, auto-dismiss after 5 seconds.</p>
  </div>
  <div class="toast-demo-container">
    <div class="toast-demo-stack">
      <!-- Success -->
      <div class="toast-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color: var(--success);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div class="toast-content">
          <div class="label-medium">Changes saved</div>
          <div class="caption">Your project settings have been updated.</div>
        </div>
        <button class="toast-close" aria-label="Dismiss notification">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- Error -->
      <div class="toast-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color: var(--error);"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <div class="toast-content">
          <div class="label-medium">Upload failed</div>
          <div class="caption">File exceeds the 10MB size limit.</div>
        </div>
        <button class="toast-close" aria-label="Dismiss notification">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- Warning -->
      <div class="toast-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color: var(--warning);"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div class="toast-content">
          <div class="label-medium">Storage almost full</div>
          <div class="caption">You've used 90% of your storage quota.</div>
        </div>
        <button class="toast-close" aria-label="Dismiss notification">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- Info -->
      <div class="toast-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color: var(--status-2);"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div class="toast-content">
          <div class="label-medium">New version available</div>
          <div class="caption">Refresh to get the latest features.</div>
        </div>
        <button class="toast-close" aria-label="Dismiss notification">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Verify the HTML renders correctly**

Open `index.html` in a browser. Verify:
- New nav links appear in the sticky section nav
- Sidebar demo shows expanded + collapsed states side by side
- Top nav demo shows the full horizontal bar
- All 4 form controls render with interactive states (toggles click, checkboxes toggle, radios switch, select opens)
- All 4 toast variants display with correct semantic colors
- Toggle dark/light theme — all new sections adapt correctly

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: add Phase 1 component demos to index.html (sidebar, topnav, forms, toasts)"
```

---

## Task 9: Update CLAUDE.md with Phase 1 rules

**Files:**
- Modify: `CLAUDE.md` — update Component Patterns list and add new rules

- [ ] **Step 1: Update the Component Patterns list**

In the `## Component Patterns` section, replace the existing bullet list with:

```markdown
See `STYLE_GUIDE.md` for complete React + Tailwind component patterns including:
- Buttons (Primary, Default, Danger × 3 sizes)
- Text inputs with validation states
- Cards with hover elevation
- Badges and status indicators
- Modal dialogs
- Table rows with hover highlighting
- **Sidebar Navigation** (expanded/collapsed, section groups, mobile drawer)
- **Top Navigation** (horizontal bar, icon buttons, mobile hamburger)
- **Page Shell Layouts** (sidebar shell, top nav shell, top bar with breadcrumbs)
- **Toggle / Switch** (on/off with label + description)
- **Checkbox** (single + group, indeterminate state)
- **Radio Group** (vertical + horizontal variants)
- **Select Dropdown** (custom, with search, multi-select variant)
- **Toast Notifications** (success/error/warning/info, auto-dismiss, stacking)
```

- [ ] **Step 2: Add Icon System rule to Critical Rules**

After rule 7 (Accessibility Is Non-Negotiable), add:

```markdown
### 8. Icons Use Lucide React Only

- Use `lucide-react` for all icons — no emoji, no PNG, no mixing libraries
- Sizes: `w-5 h-5` (nav/inline), `w-4 h-4` (buttons), `w-6 h-6` (cards), `w-12 h-12` (hero)
- Icons inherit color via `currentColor` — use semantic text colors
- Every icon-only button must have `aria-label`
```

- [ ] **Step 3: Add Navigation Shell guidance**

After rule 8, add:

```markdown
### 9. Navigation Shell Selection

- **Sidebar shell**: Dashboard apps with 7+ routes, grouped navigation, workspace-style apps
- **Top nav shell**: Public pages, marketing sites, simpler apps with ≤ 6 routes
- Sidebar: `240px` expanded, `64px` collapsed, `200ms ease` transitions
- Top nav: `56px` height, fixed to top with `z-sticky`
- Both shells use `<nav>` landmarks with `aria-label`, `aria-current="page"` on active items
- Mobile (< 768px): sidebar becomes off-canvas drawer, top nav links collapse to hamburger

### 10. Form Controls Have Visible Labels

- Every form input has a visible `<label>` — never rely on placeholder alone
- Toggle/Switch: `role="switch"`, `aria-checked`, `Space` to toggle
- Checkbox: native `<input type="checkbox">`, supports `aria-checked="mixed"`
- Radio: native `<input type="radio">` with shared `name`, arrow key navigation
- Select: `role="listbox"`, `aria-expanded`, `Escape` closes
- Error messages appear below the field in `text-caption text-error`

### 11. Toast Notifications Are Non-Blocking

- Container: `fixed bottom-xl right-xl z-modal`, `aria-live="polite"`, `role="status"`
- Max 3 visible, auto-dismiss 5 seconds, hover pauses timer
- Variants: success (`CheckCircle`), error (`XCircle`), warning (`AlertTriangle`), info (`Info`)
- Toasts never steal focus
- Exit animation faster than enter (150ms vs 200ms)
```

- [ ] **Step 4: Update Quick Reference table**

Add these rows to the Quick Reference table:

```markdown
| Nav items | `sidebar-nav-item`, `topnav-link` | `hover:bg-bg-elevated`, `.active` |
| Form controls | `role="switch"`, `role="listbox"` | Toggle, checkbox, radio, select |
| Toasts | `aria-live="polite"` | Success, error, warning, info variants |
| Icons | `w-{size} h-{size}` from Lucide | `w-5 h-5` nav, `w-4 h-4` btn |
```

- [ ] **Step 5: Verify CLAUDE.md is coherent**

Read the full file and confirm no duplicate rules, consistent numbering, and all new sections reference the correct STYLE_GUIDE.md sections.

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add Phase 1 rules to CLAUDE.md (icons, nav, forms, toasts)"
```

---

## Task 10: Final visual verification and wrap-up commit

- [ ] **Step 1: Open index.html in browser and verify both themes**

Check every new section in dark mode:
- Sidebar nav: expanded + collapsed render correctly, active state shows gold highlight
- Top nav: links, icon buttons, notification dot visible
- Form controls: toggles animate, checkboxes toggle, radios switch, select opens dropdown
- Toasts: all 4 variants show correct icon + semantic color

Switch to light mode and verify the same.

- [ ] **Step 2: Verify STYLE_GUIDE.md sections 7-12 are complete**

Skim each new section. Confirm:
- All code blocks have correct jsx/html syntax
- All Tailwind classes reference design system tokens (no raw hex)
- Accessibility notes present for each component
- Mobile behavior documented for navigation components

- [ ] **Step 3: Verify CLAUDE.md rules 8-11 are consistent with STYLE_GUIDE.md**

Cross-reference rules with the style guide patterns. Confirm no contradictions.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: Phase 1 visual/doc fixes from final review"
```

Skip this commit if no fixes were needed.
