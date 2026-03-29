# Phase 2 Batch 2 — Avatars & Tooltips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Avatars (section 15) and Tooltips (section 16) to the Signature Design System — new tokens in globals.css + tailwind.preset.js, documentation in STYLE_GUIDE.md, and interactive demos in index.html.

**Architecture:** Token changes first (globals.css + preset), then documentation (STYLE_GUIDE.md sections), then showcase (index.html CSS + nav + HTML demos + JS). Four files modified.

**Tech Stack:** CSS custom properties, Tailwind preset (JS), Markdown, HTML/CSS/vanilla JS

**Spec:** `docs/superpowers/specs/2026-03-28-avatars-tooltips-design.md`

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `globals.css` | Modify (lines 38 and 106) | Add `--tooltip-bg` and `--tooltip-border` tokens to both theme blocks |
| `tailwind.preset.js` | Modify (around line 38) | Add `tooltip.bg` and `tooltip.border` color references |
| `STYLE_GUIDE.md` | Modify (append after line 1087) | Add section 15 (Avatars) and section 16 (Tooltips) |
| `index.html` | Modify (CSS ~line 1937, nav ~line 2052, HTML ~line 3090, JS ~line 3186) | Add avatar/tooltip CSS, nav links, demo sections, interactive JS |

---

### Task 1: Add tooltip tokens to globals.css and tailwind.preset.js

**Files:**
- Modify: `globals.css:38` (after `--accent-muted` in `:root`/light block)
- Modify: `globals.css:106` (after `--accent-muted` in dark block)
- Modify: `tailwind.preset.js:38` (after accent colors object)

- [ ] **Step 1: Add tooltip tokens to `:root`/`[data-theme="light"]` block**

In `globals.css`, find the line `--accent-muted: rgba(201, 162, 103, 0.12);` in the first theme block (around line 38) and insert after it:

```css
  /* Tooltip */
  --tooltip-bg: rgba(201, 162, 103, 0.12);
  --tooltip-border: rgba(201, 162, 103, 0.25);
```

- [ ] **Step 2: Add tooltip tokens to `[data-theme="dark"]` block**

In `globals.css`, find the line `--accent-muted: rgba(168, 132, 62, 0.10);` in the dark block (around line 106) and insert after it:

```css
  /* Tooltip */
  --tooltip-bg: rgba(168, 132, 62, 0.10);
  --tooltip-border: rgba(168, 132, 62, 0.25);
```

- [ ] **Step 3: Add tooltip colors to tailwind.preset.js**

In `tailwind.preset.js`, find the closing `},` of the `accent` object (the line after `muted: 'var(--accent-muted)',`) and insert after the accent closing brace:

```js
        tooltip: {
          bg: 'var(--tooltip-bg)',
          border: 'var(--tooltip-border)',
        },
```

- [ ] **Step 4: Verify tokens are in place**

Run: `grep -n "tooltip" globals.css tailwind.preset.js`
Expected: 4 hits in globals.css (2 per theme), 2 hits in tailwind.preset.js

- [ ] **Step 5: Commit**

```bash
git add globals.css tailwind.preset.js
git commit -m "feat: add tooltip design tokens to globals.css and tailwind preset"
```

---

### Task 2: Add Avatars section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md:1087` (append after last line)

- [ ] **Step 1: Append section 15 (Avatars) to STYLE_GUIDE.md**

Add this content after line 1087 (end of section 14):

```markdown

---

## 15. Avatars

User identity indicators with image, initials fallback, status dot, and group/stack variants.

### Sizes

| Size | Class | Dimensions | Font Size | Status Dot |
|------|-------|-----------|-----------|------------|
| `xs` | `w-6 h-6` | 24px | `text-[0.625rem]` | `w-2 h-2` |
| `sm` | `w-8 h-8` | 32px | `text-caption` | `w-2.5 h-2.5` |
| `md` | `w-10 h-10` | 40px | `text-body` | `w-3 h-3` |
| `lg` | `w-14 h-14` | 56px | `text-h3` | `w-3.5 h-3.5` |

### Image Avatar

```jsx
<div className="relative inline-flex">
  <img
    src="/path/to/photo.jpg"
    alt="John Doe"
    className="w-10 h-10 rounded-full object-cover"
  />
</div>
```

- Always `rounded-full` (circle)
- `object-cover` to prevent distortion
- `alt` text is required (user's name)

### Initials Fallback

When no image is available, show two-letter initials (first + last name) on an accent circle.

```jsx
<div
  className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-text-on-accent font-semibold text-body"
  aria-label="John Doe"
>
  JD
</div>
```

- Background: `bg-accent`
- Text: `text-text-on-accent font-semibold`
- Font size scales with avatar size (see Sizes table above)

### Status Indicator

Optional colored dot at bottom-right corner.

```jsx
<div className="relative inline-flex">
  <img src="/photo.jpg" alt="John Doe" className="w-10 h-10 rounded-full object-cover" />
  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-bg-primary" />
</div>
```

- Ring: `border-2 border-bg-primary` (matches page background for cutout effect)

| Status | Color |
|--------|-------|
| Online | `bg-success` |
| Away | `bg-warning` |
| Busy | `bg-error` |
| Offline | `bg-text-muted` |

### Avatar Group

Stacked avatars with right overlap. First avatar on top.

```jsx
<div className="flex -space-x-3" role="group" aria-label="Team members">
  <img src="/photo1.jpg" alt="John Doe" className="w-10 h-10 rounded-full object-cover ring-2 ring-bg-primary relative z-[3]" />
  <img src="/photo2.jpg" alt="Anna Kim" className="w-10 h-10 rounded-full object-cover ring-2 ring-bg-primary relative z-[2]" />
  <img src="/photo3.jpg" alt="Tom Smith" className="w-10 h-10 rounded-full object-cover ring-2 ring-bg-primary relative z-[1]" />
  <div className="w-10 h-10 rounded-full bg-bg-elevated text-text-secondary font-semibold text-caption flex items-center justify-center ring-2 ring-bg-primary relative z-[0]">
    +3
  </div>
</div>
```

- Overlap: `-space-x-3` (~12px)
- Ring: `ring-2 ring-bg-primary`
- Counter: `bg-bg-elevated text-text-secondary`

### Accessibility

- Image avatars: `alt` with user's name (required)
- Initials fallback: `aria-label` with user's full name on container
- Status dot: `aria-label` (e.g., "Online") or `aria-hidden="true"` if conveyed elsewhere
- Group: `role="group"` + `aria-label`
```

- [ ] **Step 2: Verify**

Run: `tail -n 5 STYLE_GUIDE.md`
Expected: Content from section 15.

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add Avatars component pattern (section 15) to STYLE_GUIDE"
```

---

### Task 3: Add Tooltips section to STYLE_GUIDE.md

**Files:**
- Modify: `STYLE_GUIDE.md` (append after section 15)

- [ ] **Step 1: Append section 16 (Tooltips) to STYLE_GUIDE.md**

Add this content after section 15:

```markdown

---

## 16. Tooltips

Contextual info popups triggered on hover and focus. Accent-tinted style with arrow pointer.

### Style

```jsx
<div
  role="tooltip"
  id="tooltip-edit"
  className="absolute z-dropdown px-md py-sm text-caption text-text-primary bg-tooltip-bg border border-tooltip-border rounded-ds-sm shadow-ds-sm max-w-[240px]"
>
  Edit your profile settings
</div>
```

- Background: `bg-tooltip-bg` (accent-tinted, theme-aware)
- Border: `border-tooltip-border`
- Text: `text-caption text-text-primary`
- Radius: `rounded-ds-sm`
- Shadow: `shadow-ds-sm`
- Max width: `max-w-[240px]`
- Z-index: `z-dropdown` (50)

### Positions

| Position | Tooltip class | Arrow |
|----------|--------------|-------|
| Top | `bottom-full left-1/2 -translate-x-1/2 mb-sm` | Points down |
| Right | `left-full top-1/2 -translate-y-1/2 ml-sm` | Points left |
| Bottom | `top-full left-1/2 -translate-x-1/2 mt-sm` | Points up |
| Left | `right-full top-1/2 -translate-y-1/2 mr-sm` | Points right |

Arrow: 6px CSS border-triangle in `tooltip-border` color, with 5px inner triangle in `tooltip-bg`.

### Trigger Pattern

```jsx
<div className="relative inline-flex group">
  <button aria-describedby="tip-1" className="...">
    <Pencil className="w-4 h-4" />
  </button>
  <div
    role="tooltip"
    id="tip-1"
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-sm z-dropdown px-md py-sm text-caption text-text-primary bg-tooltip-bg border border-tooltip-border rounded-ds-sm shadow-ds-sm max-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150"
  >
    Edit profile
    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-tooltip-border" />
    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-[-1px] border-[5px] border-transparent border-t-tooltip-bg" />
  </div>
</div>
```

### Behavior

- **Show on:** `mouseenter` + `focus-visible`
- **Hide on:** `mouseleave` + `blur`
- **Delay in:** `150ms`
- **Delay out:** `0ms`
- **Animation:** Fade via `opacity` over `150ms ease`
- **Dismiss:** `Escape` key hides tooltip

### Accessibility

- Tooltip: `role="tooltip"` + unique `id`
- Trigger: `aria-describedby` referencing tooltip `id`
- Tooltip does not receive focus
- Appears on `focus-visible` for keyboard access
- Respects `prefers-reduced-motion`
```

- [ ] **Step 2: Verify**

Run: `tail -n 5 STYLE_GUIDE.md`
Expected: Content from section 16.

- [ ] **Step 3: Commit**

```bash
git add STYLE_GUIDE.md
git commit -m "docs: add Tooltips component pattern (section 16) to STYLE_GUIDE"
```

---

### Task 4: Add Avatar and Tooltip CSS to index.html

**Files:**
- Modify: `index.html` (insert CSS before the `TOAST DEMO` comment, around line 1938)

- [ ] **Step 1: Add Avatar and Tooltip CSS**

Find the line `/* ========================================` followed by `TOAST DEMO` (around line 1938) and insert this CSS block immediately before it:

```css
    /* ========================================
       AVATARS
       ======================================== */
    .avatar-demo-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .avatar-demo-group h4 {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: var(--space-sm);
    }

    .avatar-row {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      flex-wrap: wrap;
    }

    .avatar {
      position: relative;
      display: inline-flex;
    }

    .avatar img {
      border-radius: 9999px;
      object-fit: cover;
    }

    .avatar-initials {
      border-radius: 9999px;
      background: var(--accent);
      color: var(--text-on-accent);
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-status {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 9999px;
      border: 2px solid var(--bg-primary);
    }

    .avatar-group {
      display: flex;
    }

    .avatar-group > * {
      margin-left: -12px;
      box-shadow: 0 0 0 2px var(--bg-primary);
      border-radius: 9999px;
    }

    .avatar-group > *:first-child {
      margin-left: 0;
    }

    .avatar-group-counter {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      background: var(--bg-elevated);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.75rem;
    }

    /* ========================================
       TOOLTIPS
       ======================================== */
    .tooltip-demo-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .tooltip-demo-group h4 {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: var(--space-sm);
    }

    .tooltip-demo-row {
      display: flex;
      align-items: center;
      gap: var(--space-3xl);
      flex-wrap: wrap;
      padding: var(--space-3xl) 0;
      justify-content: center;
    }

    .tooltip-trigger {
      position: relative;
      display: inline-flex;
    }

    .tooltip-trigger .tooltip-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: var(--bg-card);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 150ms ease;
    }

    .tooltip-trigger .tooltip-btn:hover {
      border-color: var(--border-hover);
      background: var(--bg-elevated);
      color: var(--text-primary);
    }

    .tooltip-box {
      position: absolute;
      z-index: 50;
      padding: var(--space-sm) var(--space-md);
      font-size: 0.75rem;
      line-height: 1.5;
      color: var(--text-primary);
      background: var(--tooltip-bg);
      border: 1px solid var(--tooltip-border);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-sm);
      max-width: 240px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 150ms ease;
      pointer-events: none;
    }

    .tooltip-trigger:hover .tooltip-box,
    .tooltip-trigger:focus-within .tooltip-box {
      opacity: 1;
      visibility: visible;
    }

    /* Top position */
    .tooltip-box.top {
      bottom: calc(100% + var(--space-sm));
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip-box.top .tooltip-arrow-border {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-top-color: var(--tooltip-border);
    }

    .tooltip-box.top .tooltip-arrow-fill {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: -1px;
      border: 5px solid transparent;
      border-top-color: var(--tooltip-bg);
    }

    /* Bottom position */
    .tooltip-box.bottom {
      top: calc(100% + var(--space-sm));
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip-box.bottom .tooltip-arrow-border {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-bottom-color: var(--tooltip-border);
    }

    .tooltip-box.bottom .tooltip-arrow-fill {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: -1px;
      border: 5px solid transparent;
      border-bottom-color: var(--tooltip-bg);
    }

    /* Right position */
    .tooltip-box.right {
      left: calc(100% + var(--space-sm));
      top: 50%;
      transform: translateY(-50%);
    }

    .tooltip-box.right .tooltip-arrow-border {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 6px solid transparent;
      border-right-color: var(--tooltip-border);
    }

    .tooltip-box.right .tooltip-arrow-fill {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: -1px;
      border: 5px solid transparent;
      border-right-color: var(--tooltip-bg);
    }

    /* Left position */
    .tooltip-box.left {
      right: calc(100% + var(--space-sm));
      top: 50%;
      transform: translateY(-50%);
    }

    .tooltip-box.left .tooltip-arrow-border {
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 6px solid transparent;
      border-left-color: var(--tooltip-border);
    }

    .tooltip-box.left .tooltip-arrow-fill {
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: -1px;
      border: 5px solid transparent;
      border-left-color: var(--tooltip-bg);
    }
```

- [ ] **Step 2: Verify CSS**

Run: `grep -n "AVATARS\|TOOLTIPS" index.html`
Expected: Two matches for the new CSS comment headers.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Avatar and Tooltip CSS to showcase"
```

---

### Task 5: Add nav links for Avatars and Tooltips

**Files:**
- Modify: `index.html:2052` (Patterns nav group)

- [ ] **Step 1: Add nav links**

Find this in the Patterns nav group:

```html
        <a class="nav-link" href="#pagination">Pagination</a>
        <a class="nav-link" href="#toasts">Toasts</a>
```

Replace with:

```html
        <a class="nav-link" href="#pagination">Pagination</a>
        <a class="nav-link" href="#avatars">Avatars</a>
        <a class="nav-link" href="#tooltips">Tooltips</a>
        <a class="nav-link" href="#toasts">Toasts</a>
```

- [ ] **Step 2: Verify**

Run: `grep -n "href=\"#avatars\"\|href=\"#tooltips\"" index.html`
Expected: Two matches.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Avatars and Tooltips nav links to showcase"
```

---

### Task 6: Add Avatars demo section to index.html

**Files:**
- Modify: `index.html` (insert before `<section ... id="toasts">`, around line 3090)

- [ ] **Step 1: Add Avatars demo HTML**

Find `<section class="section animate-in" id="toasts">` and insert immediately before it:

```html
    <!-- ====== AVATARS ====== -->
    <section class="section animate-in" id="avatars">
      <div class="section-header">
        <div class="overline">Identity</div>
        <h2 class="heading-2">Avatars</h2>
        <p class="subtitle">User identity indicators with image, initials fallback, status dot, and group/stack variants.</p>
      </div>

      <div class="avatar-demo-group">
        <!-- Sizes with images -->
        <div>
          <h4>Sizes (Image)</h4>
          <div class="avatar-row">
            <div class="avatar">
              <img src="https://i.pravatar.cc/56?img=1" alt="Emily Chen" style="width: 24px; height: 24px;">
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/56?img=1" alt="Emily Chen" style="width: 32px; height: 32px;">
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/56?img=1" alt="Emily Chen" style="width: 40px; height: 40px;">
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/56?img=1" alt="Emily Chen" style="width: 56px; height: 56px;">
            </div>
          </div>
        </div>

        <!-- Sizes with initials -->
        <div>
          <h4>Sizes (Initials Fallback)</h4>
          <div class="avatar-row">
            <div class="avatar-initials" style="width: 24px; height: 24px; font-size: 0.625rem;" aria-label="John Doe">JD</div>
            <div class="avatar-initials" style="width: 32px; height: 32px; font-size: 0.75rem;" aria-label="Anna Kim">AK</div>
            <div class="avatar-initials" style="width: 40px; height: 40px; font-size: 0.875rem;" aria-label="Tom Smith">TS</div>
            <div class="avatar-initials" style="width: 56px; height: 56px; font-size: 1rem;" aria-label="Maria Lopez">ML</div>
          </div>
        </div>

        <!-- Status indicators -->
        <div>
          <h4>Status Indicators</h4>
          <div class="avatar-row">
            <div class="avatar">
              <img src="https://i.pravatar.cc/56?img=2" alt="Alex Rivera" style="width: 40px; height: 40px; border-radius: 9999px; object-fit: cover;">
              <span class="avatar-status" style="width: 12px; height: 12px; background: var(--success);" aria-label="Online"></span>
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/56?img=3" alt="Sam Park" style="width: 40px; height: 40px; border-radius: 9999px; object-fit: cover;">
              <span class="avatar-status" style="width: 12px; height: 12px; background: var(--warning);" aria-label="Away"></span>
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/56?img=4" alt="Chris Lee" style="width: 40px; height: 40px; border-radius: 9999px; object-fit: cover;">
              <span class="avatar-status" style="width: 12px; height: 12px; background: var(--error);" aria-label="Busy"></span>
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/56?img=5" alt="Jordan Wu" style="width: 40px; height: 40px; border-radius: 9999px; object-fit: cover;">
              <span class="avatar-status" style="width: 12px; height: 12px; background: var(--text-muted);" aria-label="Offline"></span>
            </div>
          </div>
        </div>

        <!-- Avatar Group -->
        <div>
          <h4>Avatar Group</h4>
          <div class="avatar-group" role="group" aria-label="Team members">
            <img src="https://i.pravatar.cc/56?img=6" alt="Pat Kim" style="width: 40px; height: 40px; border-radius: 9999px; object-fit: cover; position: relative; z-index: 4;">
            <img src="https://i.pravatar.cc/56?img=7" alt="Robin Cruz" style="width: 40px; height: 40px; border-radius: 9999px; object-fit: cover; position: relative; z-index: 3;">
            <img src="https://i.pravatar.cc/56?img=8" alt="Quinn Ali" style="width: 40px; height: 40px; border-radius: 9999px; object-fit: cover; position: relative; z-index: 2;">
            <div class="avatar-initials avatar-group-counter" style="width: 40px; height: 40px; position: relative; z-index: 1; background: var(--bg-elevated); color: var(--text-secondary);">+3</div>
          </div>
        </div>
      </div>
    </section>

```

- [ ] **Step 2: Verify**

Run: `grep -n "id=\"avatars\"" index.html`
Expected: One match.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Avatars interactive demo to showcase"
```

---

### Task 7: Add Tooltips demo section to index.html

**Files:**
- Modify: `index.html` (insert after Avatars section, before Toasts section)

- [ ] **Step 1: Add Tooltips demo HTML**

Find `<section class="section animate-in" id="toasts">` and insert immediately before it:

```html
    <!-- ====== TOOLTIPS ====== -->
    <section class="section animate-in" id="tooltips">
      <div class="section-header">
        <div class="overline">Feedback</div>
        <h2 class="heading-2">Tooltips</h2>
        <p class="subtitle">Contextual info popups with accent-tinted style, arrow pointer, and four position options.</p>
      </div>

      <div class="tooltip-demo-group">
        <div>
          <h4>Positions</h4>
          <div class="tooltip-demo-row">
            <!-- Top -->
            <div class="tooltip-trigger">
              <button class="tooltip-btn" aria-describedby="demo-tip-top">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><polyline points="5 12 12 5 19 12"/></svg>
              </button>
              <div class="tooltip-box top" role="tooltip" id="demo-tip-top">
                Tooltip on top
                <span class="tooltip-arrow-border"></span>
                <span class="tooltip-arrow-fill"></span>
              </div>
            </div>

            <!-- Right -->
            <div class="tooltip-trigger">
              <button class="tooltip-btn" aria-describedby="demo-tip-right">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <div class="tooltip-box right" role="tooltip" id="demo-tip-right">
                Tooltip on right
                <span class="tooltip-arrow-border"></span>
                <span class="tooltip-arrow-fill"></span>
              </div>
            </div>

            <!-- Bottom -->
            <div class="tooltip-trigger">
              <button class="tooltip-btn" aria-describedby="demo-tip-bottom">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><polyline points="19 12 12 19 5 12"/></svg>
              </button>
              <div class="tooltip-box bottom" role="tooltip" id="demo-tip-bottom">
                Tooltip on bottom
                <span class="tooltip-arrow-border"></span>
                <span class="tooltip-arrow-fill"></span>
              </div>
            </div>

            <!-- Left -->
            <div class="tooltip-trigger">
              <button class="tooltip-btn" aria-describedby="demo-tip-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
              </button>
              <div class="tooltip-box left" role="tooltip" id="demo-tip-left">
                Tooltip on left
                <span class="tooltip-arrow-border"></span>
                <span class="tooltip-arrow-fill"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

```

- [ ] **Step 2: Verify**

Run: `grep -n "id=\"tooltips\"" index.html`
Expected: One match.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Tooltips interactive demo to showcase"
```

---

### Task 8: Add tooltip tokens to index.html style block

**Files:**
- Modify: `index.html` (both theme blocks in the `<style>` tag)

The index.html has its own copy of CSS custom properties (separate from globals.css). The tooltip tokens must also be added there.

- [ ] **Step 1: Add tooltip tokens to index.html light theme (`:root`)**

Find `--accent-muted: rgba(168, 132, 62, 0.10);` inside the `:root` block in index.html's `<style>` tag (this is the LIGHT theme block in index.html, around line 36). Note: index.html's `:root` has the light theme values, not the dark ones like globals.css.

Insert after `--accent-muted`:

```css
      /* Tooltip */
      --tooltip-bg: rgba(168, 132, 62, 0.10);
      --tooltip-border: rgba(168, 132, 62, 0.25);
```

- [ ] **Step 2: Add tooltip tokens to index.html dark theme**

Find `--accent-muted: rgba(201, 162, 103, 0.12);` in the dark theme `[data-theme="dark"]` block in index.html. Insert after it:

```css
      /* Tooltip */
      --tooltip-bg: rgba(201, 162, 103, 0.12);
      --tooltip-border: rgba(201, 162, 103, 0.25);
```

- [ ] **Step 3: Verify**

Run: `grep -n "tooltip-bg\|tooltip-border" index.html | head -10`
Expected: 4 matches for the CSS variables (2 per theme) plus references in the CSS classes.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add tooltip tokens to index.html theme blocks"
```

---

### Task 9: Visual QA and final fixes

**Files:**
- Possibly modify: `index.html`, `STYLE_GUIDE.md` (minor fixes only)

- [ ] **Step 1: Visual QA in both themes**

Open `http://localhost:8080/index.html` and check:
1. Toggle to **light** theme — avatars have gold initials, status dots visible, group overlap clean, tooltips show on hover with accent tint
2. Toggle to **dark** theme — same checks, tooltip colors adapt correctly
3. Check nav — "Avatars" and "Tooltips" links scroll to correct sections
4. Hover each tooltip trigger — all 4 positions render correctly with arrows
5. Avatar images load from pravatar.cc (requires internet)
6. Avatar group has proper overlap with first avatar on top

- [ ] **Step 2: Fix any issues found**

If issues found, fix and commit individually.

- [ ] **Step 3: Final commit (if fixes needed)**

```bash
git add -A
git commit -m "fix: visual QA fixes for Avatars and Tooltips demos"
```
