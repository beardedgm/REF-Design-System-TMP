# Phase 2 Batch 1 — Tabs & Pagination Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Tabs (section 13) and Pagination (section 14) component patterns to the Signature Design System — STYLE_GUIDE.md documentation and index.html interactive showcase.

**Architecture:** Documentation-only changes across two files. Each component gets a STYLE_GUIDE.md section with React+Tailwind copy-paste patterns, then an index.html interactive demo section with CSS styling and nav link entries. No token files modified.

**Tech Stack:** Markdown (STYLE_GUIDE.md), HTML/CSS/vanilla JS (index.html)

**Spec:** `docs/superpowers/specs/2026-03-28-tabs-pagination-design.md`

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `STYLE_GUIDE.md` | Modify (append after line 877) | Add section 13 (Tabs) and section 14 (Pagination) |
| `index.html` | Modify (CSS ~line 1750, nav ~line 1810, HTML ~line 2781) | Add tab/pagination CSS classes, nav links, and demo sections |

---

### Task 1: Add Tabs section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md:877` (append after last line)

- [ ] **Step 1: Append section 13 (Tabs) to STYLE_GUIDE.md**

Add this content after line 877 (the end of section 12):

```markdown

---

## 13. Tabs

Horizontal and vertical tab bars for switching between views within a page. Three visual variants to suit different contexts.

### Variants

#### Underline

Horizontal tab bar with accent bottom-border indicator. Best for: page-level section switching, dashboard views.

```jsx
{/* Container */}
<div role="tablist" aria-label="Section tabs" className="flex border-b border-border">
  {/* Active tab */}
  <button role="tab" aria-selected="true" id="tab-overview" aria-controls="panel-overview" className="inline-flex items-center gap-sm px-lg py-sm text-body font-semibold text-accent border-b-[3px] border-accent -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    <LayoutDashboard className="w-4 h-4" /> {/* optional icon */}
    Overview
  </button>
  {/* Inactive tab */}
  <button role="tab" aria-selected="false" id="tab-settings" aria-controls="panel-settings" tabIndex={-1} className="inline-flex items-center gap-sm px-lg py-sm text-body text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Settings
  </button>
</div>

{/* Tab panel */}
<div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="py-xl">
  Panel content here
</div>
```

- Track line: `border-b border-border` on the container
- Active indicator: `border-b-[3px] border-accent -mb-px` (3px accent bottom border, overlaps track)
- Active text: `text-accent font-semibold`
- Inactive text: `text-text-secondary`, hover → `text-text-primary`

#### Pill

Horizontal tab bar with filled background indicator. Best for: toolbars, compact filter bars, inline content switching.

```jsx
<div role="tablist" aria-label="View tabs" className="inline-flex p-xs bg-bg-secondary rounded-ds-md">
  {/* Active */}
  <button role="tab" aria-selected="true" id="tab-grid" aria-controls="panel-grid" className="inline-flex items-center gap-sm px-lg py-sm text-body font-semibold text-accent bg-accent-muted rounded-ds-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Grid View
  </button>
  {/* Inactive */}
  <button role="tab" aria-selected="false" id="tab-list" aria-controls="panel-list" tabIndex={-1} className="inline-flex items-center gap-sm px-lg py-sm text-body text-text-secondary hover:bg-bg-elevated rounded-ds-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    List View
  </button>
</div>
```

- Track: `bg-bg-secondary rounded-ds-md p-xs`
- Active pill: `bg-accent-muted text-accent font-semibold rounded-ds-sm`
- Inactive hover: `bg-bg-elevated`

#### Vertical

Stacked tabs for sidebar-style content switching. Best for: settings panels, multi-section forms.

```jsx
<div role="tablist" aria-label="Settings sections" aria-orientation="vertical" className="flex flex-col gap-xs">
  {/* Active */}
  <button role="tab" aria-selected="true" id="tab-general" aria-controls="panel-general" className="inline-flex items-center gap-sm px-lg py-sm text-body font-semibold text-accent bg-accent-muted rounded-ds-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    <Settings className="w-4 h-4" />
    General
  </button>
  {/* Inactive */}
  <button role="tab" aria-selected="false" id="tab-security" aria-controls="panel-security" tabIndex={-1} className="inline-flex items-center gap-sm px-lg py-sm text-body text-text-secondary hover:bg-bg-elevated rounded-ds-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    <Shield className="w-4 h-4" />
    Security
  </button>
</div>
```

- No track border — items float in a vertical stack
- Active highlight: `bg-accent-muted text-accent rounded-ds-sm`
- Inactive hover: `bg-bg-elevated rounded-ds-sm`
- Add `aria-orientation="vertical"` to the tablist

### Icons

- Optional Lucide icon before label: `w-4 h-4`, inherits `currentColor`
- Use `gap-sm` between icon and text (provided by `inline-flex items-center gap-sm`)
- Icon-only tabs are NOT supported — always include a text label

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `←` / `→` | Move focus to previous/next tab (underline, pill) |
| `↑` / `↓` | Move focus to previous/next tab (vertical) |
| `Home` | Move focus to first tab |
| `End` | Move focus to last tab |
| `Enter` / `Space` | Activate focused tab |
| `Tab` | Move focus out of tablist to tab panel |

Arrow keys wrap: pressing `→` on the last tab returns focus to the first.

### Accessibility Checklist

- Container: `role="tablist"` + `aria-label`
- Each tab: `role="tab"` + `aria-selected` + `id` + `aria-controls`
- Panel: `role="tabpanel"` + `id` + `aria-labelledby`
- Only active tab in tab order (`tabindex="0"`), others `tabindex="-1"`
- Vertical variant: add `aria-orientation="vertical"` to tablist
```

- [ ] **Step 2: Verify the markdown renders correctly**

Run: `head -n 5 STYLE_GUIDE.md && echo "..." && tail -n 5 STYLE_GUIDE.md`
Expected: File starts with `# Signature Design System` and ends with content from section 13.

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add Tabs component pattern (section 13) to STYLE_GUIDE"
```

---

### Task 2: Add Pagination section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md` (append after section 13)

- [ ] **Step 1: Append section 14 (Pagination) to STYLE_GUIDE.md**

Add this content after section 13:

```markdown

---

## 14. Pagination

Page navigation for lists and tables. Two variants: full numbered for data tables, compact for simpler lists.

### Full (Numbered)

All page numbers as bordered buttons with accent active state. Includes prev/next and ellipsis truncation.

```jsx
<nav aria-label="Pagination" className="flex items-center gap-xs">
  {/* Prev — disabled on page 1 */}
  <button
    aria-disabled="true"
    className="inline-flex items-center px-md py-sm text-label border border-border rounded-ds-md text-text-secondary opacity-40 cursor-not-allowed pointer-events-none"
  >
    <ChevronLeft className="w-4 h-4 mr-xs" />
    Prev
  </button>

  {/* Page numbers */}
  <button className="min-w-[36px] px-sm py-sm text-label text-text-secondary border border-border rounded-ds-md hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 text-center">
    1
  </button>

  {/* Ellipsis */}
  <span className="px-xs text-text-muted" aria-hidden="true">…</span>

  <button className="min-w-[36px] px-sm py-sm text-label text-text-secondary border border-border rounded-ds-md hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 text-center">
    4
  </button>

  {/* Active page */}
  <button
    aria-current="page"
    className="min-w-[36px] px-sm py-sm text-label font-semibold text-accent border border-accent bg-accent-muted rounded-ds-md text-center"
  >
    5
  </button>

  <button className="min-w-[36px] px-sm py-sm text-label text-text-secondary border border-border rounded-ds-md hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 text-center">
    6
  </button>

  <span className="px-xs text-text-muted" aria-hidden="true">…</span>

  <button className="min-w-[36px] px-sm py-sm text-label text-text-secondary border border-border rounded-ds-md hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 text-center">
    12
  </button>

  {/* Next */}
  <button className="inline-flex items-center px-md py-sm text-label border border-border rounded-ds-md text-text-secondary hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Next
    <ChevronRight className="w-4 h-4 ml-xs" />
  </button>
</nav>
```

- Active page: `border-accent bg-accent-muted text-accent font-semibold`
- Inactive page: `border-border text-text-secondary`, hover → `border-border-hover bg-bg-elevated`
- Minimum button width: `min-w-[36px]` for consistent sizing and touch targets
- Disabled: `opacity-40 cursor-not-allowed pointer-events-none` + `aria-disabled="true"`

### Compact (Prev/Next)

Simplified navigation with bordered prev/next buttons and page info text.

```jsx
<nav aria-label="Pagination" className="flex items-center gap-lg">
  <button className="inline-flex items-center px-lg py-sm text-body border border-border rounded-ds-md text-text-secondary hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed">
    <ChevronLeft className="w-4 h-4 mr-sm" />
    Previous
  </button>

  <span className="text-caption text-text-muted">Page 3 of 12</span>

  <button className="inline-flex items-center px-lg py-sm text-body border border-border rounded-ds-md text-text-secondary hover:border-border-hover hover:bg-bg-elevated focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    Next
    <ChevronRight className="w-4 h-4 ml-sm" />
  </button>
</nav>
```

### Truncation Logic

Activates at 7+ total pages. Shows first page, last page, and a window of 3 centered on current page, with `…` ellipsis bridging gaps.

| Current | Rendered |
|---------|----------|
| Page 1 of 12 | `[1] 2 3 … 12` |
| Page 5 of 12 | `1 … 4 [5] 6 … 12` |
| Page 12 of 12 | `1 … 10 11 [12]` |
| Page 3 of 8 | `1 2 [3] 4 … 8` |

### Accessibility

- Wrapper: `<nav aria-label="Pagination">`
- Active page: `aria-current="page"`
- Disabled buttons: `aria-disabled="true"` (not `disabled` — screen readers still announce it)
- Ellipsis: `aria-hidden="true"`
```

- [ ] **Step 2: Verify the file ends correctly**

Run: `tail -n 5 STYLE_GUIDE.md`
Expected: Content from section 14 (Pagination accessibility section).

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add Pagination component pattern (section 14) to STYLE_GUIDE"
```

---

### Task 3: Add Tabs CSS to index.html

**Files:**
- Modify: `index.html` (insert CSS before the toast CSS block, around line 1700)

- [ ] **Step 1: Add tab component CSS classes**

Insert the following CSS block before the `.toast-demo-container` CSS rule (line 1701 of index.html). Find the line `.toast-demo-container {` and insert this block immediately before it:

```css
    /* ========================================
       TABS
       ======================================== */
    .tabs-demo-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .tabs-demo-group h4 {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: var(--space-sm);
    }

    /* Underline tabs */
    .tabs-underline {
      display: flex;
      border-bottom: 1px solid var(--border);
    }

    .tabs-underline .tab-item {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-lg);
      font-size: 0.875rem;
      color: var(--text-secondary);
      border: none;
      background: none;
      cursor: pointer;
      transition: all 150ms ease;
      border-bottom: 3px solid transparent;
      margin-bottom: -1px;
    }

    .tabs-underline .tab-item:hover {
      color: var(--text-primary);
    }

    .tabs-underline .tab-item.active {
      color: var(--accent);
      font-weight: 600;
      border-bottom-color: var(--accent);
    }

    /* Pill tabs */
    .tabs-pill {
      display: inline-flex;
      padding: var(--space-xs);
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
    }

    .tabs-pill .tab-item {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-lg);
      font-size: 0.875rem;
      color: var(--text-secondary);
      border: none;
      background: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 150ms ease;
    }

    .tabs-pill .tab-item:hover {
      background: var(--bg-elevated);
    }

    .tabs-pill .tab-item.active {
      background: var(--accent-muted);
      color: var(--accent);
      font-weight: 600;
    }

    .tabs-pill .tab-item.active:hover {
      background: var(--accent-muted);
    }

    /* Vertical tabs */
    .tabs-vertical {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      width: 200px;
    }

    .tabs-vertical .tab-item {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-lg);
      font-size: 0.875rem;
      color: var(--text-secondary);
      border: none;
      background: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      text-align: left;
      transition: all 150ms ease;
    }

    .tabs-vertical .tab-item:hover {
      background: var(--bg-elevated);
    }

    .tabs-vertical .tab-item.active {
      background: var(--accent-muted);
      color: var(--accent);
      font-weight: 600;
    }

    .tabs-vertical .tab-item.active:hover {
      background: var(--accent-muted);
    }

    /* Tab panel */
    .tab-panel {
      padding: var(--space-lg) 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    /* Tab icon (inline SVG) */
    .tab-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
```

- [ ] **Step 2: Verify CSS was inserted**

Run: `grep -n "TABS" index.html`
Expected: Shows the `/* TABS */` comment at the inserted line.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Tabs CSS to showcase"
```

---

### Task 4: Add Pagination CSS to index.html

**Files:**
- Modify: `index.html` (insert CSS after the Tabs CSS block, before toast CSS)

- [ ] **Step 1: Add pagination component CSS classes**

Insert this CSS block immediately after the Tabs CSS block (after `.tab-icon` rule), before the `.toast-demo-container` rule:

```css

    /* ========================================
       PAGINATION
       ======================================== */
    .pagination-demo-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .pagination-demo-group h4 {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: var(--space-sm);
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .pagination-compact {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
    }

    .page-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      padding: var(--space-sm) var(--space-sm);
      font-size: 0.8125rem;
      color: var(--text-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: none;
      cursor: pointer;
      text-align: center;
      transition: all 150ms ease;
    }

    .page-btn:hover {
      border-color: var(--border-hover);
      background: var(--bg-elevated);
    }

    .page-btn.active {
      color: var(--accent);
      font-weight: 600;
      border-color: var(--accent);
      background: var(--accent-muted);
      cursor: default;
    }

    .page-btn.active:hover {
      background: var(--accent-muted);
    }

    .page-btn-nav {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
      font-size: 0.8125rem;
      color: var(--text-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: none;
      cursor: pointer;
      transition: all 150ms ease;
    }

    .page-btn-nav:hover {
      border-color: var(--border-hover);
      background: var(--bg-elevated);
    }

    .page-btn-nav.disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .page-btn-nav svg {
      width: 16px;
      height: 16px;
    }

    .page-ellipsis {
      padding: 0 var(--space-xs);
      color: var(--text-muted);
      font-size: 0.8125rem;
    }

    .page-info {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
```

- [ ] **Step 2: Verify CSS was inserted**

Run: `grep -n "PAGINATION" index.html`
Expected: Shows the `/* PAGINATION */` comment.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Pagination CSS to showcase"
```

---

### Task 5: Add nav links for Tabs and Pagination

**Files:**
- Modify: `index.html:1806-1813` (the "Patterns" nav group)

- [ ] **Step 1: Add nav links to the Patterns nav group**

Find this block in the section nav (around line 1806):

```html
      <div class="nav-group">
        <span class="nav-group-label">Patterns</span>
        <a class="nav-link" href="#sidebar">Sidebar</a>
        <a class="nav-link" href="#topnav">Top Nav</a>
        <a class="nav-link" href="#forms">Forms</a>
        <a class="nav-link" href="#toasts">Toasts</a>
        <a class="nav-link" href="#dashboard">Dashboard</a>
      </div>
```

Replace it with:

```html
      <div class="nav-group">
        <span class="nav-group-label">Patterns</span>
        <a class="nav-link" href="#sidebar">Sidebar</a>
        <a class="nav-link" href="#topnav">Top Nav</a>
        <a class="nav-link" href="#forms">Forms</a>
        <a class="nav-link" href="#tabs">Tabs</a>
        <a class="nav-link" href="#pagination">Pagination</a>
        <a class="nav-link" href="#toasts">Toasts</a>
        <a class="nav-link" href="#dashboard">Dashboard</a>
      </div>
```

- [ ] **Step 2: Verify nav links are present**

Run: `grep -n "href=\"#tabs\"\|href=\"#pagination\"" index.html`
Expected: Two matching lines with the new nav links.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Tabs and Pagination nav links to showcase"
```

---

### Task 6: Add Tabs demo section to index.html

**Files:**
- Modify: `index.html` (insert HTML before the Toasts section, around line 2715)

- [ ] **Step 1: Add Tabs demo section HTML**

Find the line `<!-- ====== TOASTS ====== -->` (should be just before the `<section ... id="toasts">` block) and insert this block immediately before it:

Note: there is no HTML comment `<!-- ====== TOASTS ====== -->` in the file. Instead, find `<section class="section animate-in" id="toasts">` (line 2715) and insert immediately before it:

```html
    <!-- ====== TABS ====== -->
    <section class="section animate-in" id="tabs">
      <div class="section-header">
        <div class="overline">Navigation</div>
        <h2 class="heading-2">Tabs</h2>
        <p class="subtitle">Three tab variants — underline, pill, and vertical — for switching between views within a page.</p>
      </div>

      <div class="tabs-demo-group">
        <!-- Underline -->
        <div>
          <h4>Underline</h4>
          <div class="tabs-underline" role="tablist" aria-label="Underline demo tabs">
            <button class="tab-item active" role="tab" aria-selected="true" onclick="switchTab(this, 'underline')">
              <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Overview
            </button>
            <button class="tab-item" role="tab" aria-selected="false" onclick="switchTab(this, 'underline')">Analytics</button>
            <button class="tab-item" role="tab" aria-selected="false" onclick="switchTab(this, 'underline')">Reports</button>
            <button class="tab-item" role="tab" aria-selected="false" onclick="switchTab(this, 'underline')">Settings</button>
          </div>
          <div class="tab-panel">Selected tab content appears here.</div>
        </div>

        <!-- Pill -->
        <div>
          <h4>Pill</h4>
          <div class="tabs-pill" role="tablist" aria-label="Pill demo tabs">
            <button class="tab-item active" role="tab" aria-selected="true" onclick="switchTab(this, 'pill')">Grid View</button>
            <button class="tab-item" role="tab" aria-selected="false" onclick="switchTab(this, 'pill')">List View</button>
            <button class="tab-item" role="tab" aria-selected="false" onclick="switchTab(this, 'pill')">Board</button>
          </div>
        </div>

        <!-- Vertical -->
        <div>
          <h4>Vertical</h4>
          <div style="display: flex; gap: var(--space-xl);">
            <div class="tabs-vertical" role="tablist" aria-label="Vertical demo tabs" aria-orientation="vertical">
              <button class="tab-item active" role="tab" aria-selected="true" onclick="switchTab(this, 'vertical')">
                <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                General
              </button>
              <button class="tab-item" role="tab" aria-selected="false" onclick="switchTab(this, 'vertical')">
                <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Security
              </button>
              <button class="tab-item" role="tab" aria-selected="false" onclick="switchTab(this, 'vertical')">
                <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                Billing
              </button>
              <button class="tab-item" role="tab" aria-selected="false" onclick="switchTab(this, 'vertical')">
                <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                Notifications
              </button>
            </div>
            <div class="tab-panel" style="flex: 1; padding: var(--space-lg); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md);">
              Selected section content appears here.
            </div>
          </div>
        </div>
      </div>
    </section>

```

- [ ] **Step 2: Verify section was inserted**

Run: `grep -n "id=\"tabs\"" index.html`
Expected: One match showing the new Tabs section.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Tabs interactive demo to showcase"
```

---

### Task 7: Add Pagination demo section to index.html

**Files:**
- Modify: `index.html` (insert HTML after Tabs section, before Toasts section)

- [ ] **Step 1: Add Pagination demo section HTML**

Find `<section class="section animate-in" id="toasts">` and insert this block immediately before it:

```html
    <!-- ====== PAGINATION ====== -->
    <section class="section animate-in" id="pagination">
      <div class="section-header">
        <div class="overline">Navigation</div>
        <h2 class="heading-2">Pagination</h2>
        <p class="subtitle">Full numbered pagination for data tables and compact prev/next for simpler lists.</p>
      </div>

      <div class="pagination-demo-group">
        <!-- Full numbered -->
        <div>
          <h4>Full (Numbered)</h4>
          <nav class="pagination" aria-label="Full pagination demo">
            <button class="page-btn-nav disabled" aria-disabled="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Prev
            </button>
            <button class="page-btn active" aria-current="page">1</button>
            <button class="page-btn" onclick="switchPage(this)">2</button>
            <button class="page-btn" onclick="switchPage(this)">3</button>
            <span class="page-ellipsis" aria-hidden="true">…</span>
            <button class="page-btn" onclick="switchPage(this)">12</button>
            <button class="page-btn-nav" onclick="switchPage(this)">
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </nav>
        </div>

        <!-- Full numbered — mid page -->
        <div>
          <h4>Full (Mid-page with truncation)</h4>
          <nav class="pagination" aria-label="Truncated pagination demo">
            <button class="page-btn-nav">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Prev
            </button>
            <button class="page-btn">1</button>
            <span class="page-ellipsis" aria-hidden="true">…</span>
            <button class="page-btn">4</button>
            <button class="page-btn active" aria-current="page">5</button>
            <button class="page-btn">6</button>
            <span class="page-ellipsis" aria-hidden="true">…</span>
            <button class="page-btn">12</button>
            <button class="page-btn-nav">
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </nav>
        </div>

        <!-- Compact -->
        <div>
          <h4>Compact</h4>
          <nav class="pagination-compact" aria-label="Compact pagination demo">
            <button class="page-btn-nav disabled" aria-disabled="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Previous
            </button>
            <span class="page-info">Page 1 of 12</span>
            <button class="page-btn-nav">
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </nav>
        </div>
      </div>
    </section>

```

- [ ] **Step 2: Verify section was inserted**

Run: `grep -n "id=\"pagination\"" index.html`
Expected: One match showing the new Pagination section.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Pagination interactive demo to showcase"
```

---

### Task 8: Add interactive JavaScript for Tabs and Pagination

**Files:**
- Modify: `index.html` (add JS functions in the `<script>` block, around line 2810)

- [ ] **Step 1: Add switchTab and switchPage functions**

Find the existing `<script>` block (the one containing `function selectRadio`). Add these two functions after the `pickOption` function and before the `(function() {` IIFE:

```javascript

    function switchTab(el, variant) {
      var tablist = el.parentElement;
      tablist.querySelectorAll('.tab-item').forEach(function(t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      el.classList.add('active');
      el.setAttribute('aria-selected', 'true');
    }

    function switchPage(el) {
      var nav = el.closest('.pagination');
      if (!nav) return;
      nav.querySelectorAll('.page-btn').forEach(function(b) {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });
      if (el.classList.contains('page-btn')) {
        el.classList.add('active');
        el.setAttribute('aria-current', 'page');
      }
    }
```

- [ ] **Step 2: Verify JS functions are present**

Run: `grep -n "function switchTab\|function switchPage" index.html`
Expected: Two matches showing both function definitions.

- [ ] **Step 3: Open in browser and verify all demos work**

Open `http://localhost:8080/index.html` and verify:
- Tabs section shows all three variants (underline, pill, vertical)
- Clicking tabs switches the active state visually
- Pagination section shows full numbered (page 1, mid-page) and compact variants
- Clicking page numbers switches the active page
- Both dark and light themes render correctly (toggle theme)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add interactive JS for Tabs and Pagination demos"
```

---

### Task 9: Visual QA and final commit

**Files:**
- Possibly modify: `index.html`, `STYLE_GUIDE.md` (minor fixes only)

- [ ] **Step 1: Visual QA in both themes**

Open `http://localhost:8080/index.html` and check:
1. Toggle to **light** theme — verify all tab variants and pagination demos have correct colors, borders visible, text readable
2. Toggle to **dark** theme — verify same
3. Check the section nav — "Tabs" and "Pagination" links scroll to correct sections
4. Click through all tab variants — active states transition smoothly
5. Click through pagination buttons — active page highlights correctly
6. Verify disabled prev buttons appear dimmed on first-page demos

- [ ] **Step 2: Fix any visual issues found**

If any issues are found, fix them and commit individually.

- [ ] **Step 3: Final commit (if any fixes were made)**

```bash
git add -A
git commit -m "fix: visual QA fixes for Tabs and Pagination demos"
```
