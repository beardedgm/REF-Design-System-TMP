## Layout

---

### Page Shell -- Sidebar

The standard dashboard layout. A fixed sidebar on the left holds navigation, a top bar contains breadcrumbs and page-level actions, and the main content area fills the remaining width. On mobile, the sidebar becomes an off-canvas drawer.

#### When to Use

- Dashboard applications with 7+ routes
- Workspace-style apps with grouped navigation sections
- Any product app where persistent navigation improves wayfinding

Do not use for marketing pages, public-facing landing pages, or apps with 6 or fewer routes -- use the Top Nav shell instead.

#### Anatomy

```
+--[ sidebar ]----+--[ top bar: breadcrumbs | title | actions ]----+
|  logo           |                                                 |
|  nav group 1    |  [ main content area ]                          |
|  nav group 2    |                                                 |
|  ...            |                                                 |
|  footer/user    |                                                 |
+-----------------+-------------------------------------------------+
```

1. **Sidebar** -- `bg-bg-secondary`, fixed left, full viewport height. `240px` expanded, `64px` collapsed.
2. **Top bar** -- Inside the content region. Contains breadcrumbs, page title, and action buttons. `bg-bg-card`, `border-bottom: 1px solid var(--border)`, height `56px`.
3. **Content area** -- `bg-bg-primary`, `margin-left` matching sidebar width, `padding: var(--space-xl)`.
4. **Mobile drawer** -- Below `768px`, sidebar becomes an off-canvas overlay with `bg-bg-overlay` backdrop.

#### Variants

| Variant | Sidebar Width | Behavior |
|---------|--------------|----------|
| Expanded | `240px` | Full labels + icons visible |
| Collapsed | `64px` | Icons only, tooltips on hover |
| Mobile drawer | Full width or `280px` | Slides in from left over backdrop |

#### States

| State | Treatment |
|-------|-----------|
| Default | Sidebar expanded, content offset by `240px` |
| Collapsed | Sidebar `64px`, content offset by `64px`, `200ms ease` transition |
| Mobile open | Drawer visible, backdrop active, body scroll locked |
| Mobile closed | Drawer off-screen left, backdrop hidden |

#### Accessibility

- Sidebar uses `<nav aria-label="Main navigation">` landmark
- Active item has `aria-current="page"`
- Collapse toggle button has `aria-label="Collapse sidebar"` / `"Expand sidebar"`
- Mobile drawer is focus-trapped when open; `Escape` closes it
- Drawer backdrop is `aria-hidden="true"`

#### Tailwind + React

```jsx
import { useState } from 'react';
import { Menu, ChevronLeft, Home, Settings } from 'lucide-react';

function SidebarShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Desktop sidebar */}
      <aside
        className={`
          hidden md:flex flex-col fixed inset-y-0 left-0 z-drawer
          bg-bg-secondary border-r border-border
          transition-all duration-standard ease-default
          ${collapsed ? 'w-[64px]' : 'w-[240px]'}
        `}
      >
        <div className="flex items-center justify-between h-14 px-lg border-b border-border">
          {!collapsed && <span className="text-h4 text-accent font-semibold">App</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-sm rounded-ds-md text-text-secondary hover:bg-bg-elevated
                       focus-visible:outline-2 focus-visible:outline-accent"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-standard
              ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex-1 py-lg px-sm space-y-xs overflow-y-auto">
          <a
            href="/dashboard"
            aria-current="page"
            className="flex items-center gap-md px-md py-sm rounded-ds-md
                       bg-accent-muted text-accent text-label"
          >
            <Home className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </a>
          <a
            href="/settings"
            className="flex items-center gap-md px-md py-sm rounded-ds-md
                       text-text-secondary hover:bg-bg-elevated hover:text-text-primary
                       text-label transition-colors duration-micro"
          >
            <Settings className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </a>
        </nav>
      </aside>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-bg-overlay z-drawer md:hidden"
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-[280px] z-modal md:hidden
          bg-bg-secondary border-r border-border
          transition-transform duration-standard ease-default
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav aria-label="Main navigation" className="py-lg px-sm space-y-xs">
          {/* Same nav items as desktop */}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-standard ease-default
        ${collapsed ? 'md:ml-[64px]' : 'md:ml-[240px]'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-sticky h-14 flex items-center justify-between
                           px-xl bg-bg-card border-b border-border">
          <div className="flex items-center gap-md">
            <button
              className="md:hidden p-sm rounded-ds-md text-text-secondary hover:bg-bg-elevated"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-caption text-text-tertiary">Home / Dashboard</span>
          </div>
          <h1 className="text-h3 text-text-primary">Dashboard</h1>
        </header>

        <main className="p-xl">{children}</main>
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .shell { display: flex; min-height: 100vh; background: var(--bg-primary); }

  .sidebar {
    position: fixed; inset: 0 auto 0 0;
    width: 240px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    z-index: var(--z-drawer);
    transition: width var(--duration-standard) var(--ease-default);
  }
  .sidebar.collapsed { width: 64px; }

  .sidebar-header {
    display: flex; align-items: center; justify-content: space-between;
    height: 56px; padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--border);
  }

  .sidebar-nav { flex: 1; padding: var(--space-lg) var(--space-sm); overflow-y: auto; }

  .nav-item {
    display: flex; align-items: center; gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    font-size: var(--text-label); font-weight: var(--weight-label);
    color: var(--text-secondary);
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }
  .nav-item:hover { background: var(--bg-elevated); color: var(--text-primary); }
  .nav-item[aria-current="page"] { background: var(--accent-muted); color: var(--accent); }

  .content-area {
    flex: 1; margin-left: 240px;
    transition: margin-left var(--duration-standard) var(--ease-default);
  }
  .sidebar.collapsed ~ .content-area { margin-left: 64px; }

  .top-bar {
    position: sticky; top: 0; z-index: var(--z-sticky);
    height: 56px; display: flex; align-items: center; justify-content: space-between;
    padding: 0 var(--space-xl);
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
  }

  .main-content { padding: var(--space-xl); }

  /* Mobile */
  @media (max-width: 767px) {
    .sidebar { transform: translateX(-100%); width: 280px; z-index: var(--z-modal); }
    .sidebar.open { transform: translateX(0); }
    .content-area { margin-left: 0; }
    .drawer-backdrop {
      position: fixed; inset: 0;
      background: var(--bg-overlay); z-index: var(--z-drawer);
    }
  }
</style>

<div class="shell">
  <aside class="sidebar">
    <div class="sidebar-header">
      <span style="font-size: var(--text-h4); color: var(--accent); font-weight: 600;">App</span>
    </div>
    <nav class="sidebar-nav" aria-label="Main navigation">
      <a href="/dashboard" class="nav-item" aria-current="page">Dashboard</a>
      <a href="/settings" class="nav-item">Settings</a>
    </nav>
  </aside>

  <div class="content-area">
    <header class="top-bar">
      <span style="font-size: var(--text-caption); color: var(--text-tertiary);">Home / Dashboard</span>
      <h1 style="font-size: var(--text-h3); color: var(--text-primary);">Dashboard</h1>
    </header>
    <main class="main-content">
      <!-- Page content -->
    </main>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use `bg-bg-secondary` for the sidebar background | Hardcode `#12131a` or any raw hex |
| Animate sidebar collapse with `200ms ease` | Use spring or bounce easing |
| Provide `aria-current="page"` on the active link | Indicate active state with color alone |
| Lock body scroll when mobile drawer is open | Allow content to scroll behind the drawer |
| Include a visible collapse/expand toggle button | Rely on swipe gestures as the only collapse method |

---

### Page Shell -- Top Nav

A simpler shell with a horizontal navigation bar fixed to the top. Best for marketing pages, public sites, and apps with fewer routes.

#### When to Use

- Public-facing pages and marketing sites
- Simple apps with 6 or fewer primary routes
- Landing pages, documentation, and content sites

#### Anatomy

```
+--[ top nav: logo | links | actions ]--+
|                                        |
|  [ centered content, max 1280px ]      |
|                                        |
+----------------------------------------+
```

1. **Top nav bar** -- Fixed, `bg-bg-card`, `border-bottom: 1px solid var(--border)`, height `56px`, `z-sticky`.
2. **Nav content** -- Centered container, `max-width: 1280px`, horizontal link row.
3. **Main content** -- Below nav, centered `max-width: 1280px`, `bg-bg-primary`, `padding: var(--space-xl)`.
4. **Mobile** -- Links collapse into a hamburger menu (dropdown or drawer).

#### Variants

| Variant | Behavior |
|---------|----------|
| Default | All links visible in nav bar |
| Mobile (< 768px) | Links hidden, hamburger icon toggles dropdown |

#### States

| State | Treatment |
|-------|-----------|
| Default | Nav visible, links in a row |
| Scrolled | Optionally add `shadow-ds-sm` to indicate elevation |
| Mobile menu open | Dropdown visible below nav bar, backdrop optional |
| Mobile menu closed | Dropdown hidden |

#### Accessibility

- Uses `<nav aria-label="Primary navigation">` landmark
- Active link has `aria-current="page"`
- Hamburger button: `aria-label="Open menu"` / `"Close menu"`, `aria-expanded`
- Mobile dropdown is focus-trapped when open; `Escape` closes it

#### Tailwind + React

```jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function TopNavShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="fixed top-0 inset-x-0 z-sticky h-14 bg-bg-card border-b border-border">
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-xl">
          <a href="/" className="text-h4 text-accent font-semibold">Brand</a>

          {/* Desktop links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-xl">
            <a href="/features" className="text-label text-text-secondary hover:text-text-primary
                                           transition-colors duration-micro">Features</a>
            <a href="/pricing" aria-current="page"
               className="text-label text-accent">Pricing</a>
            <a href="/docs" className="text-label text-text-secondary hover:text-text-primary
                                       transition-colors duration-micro">Docs</a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-sm rounded-ds-md text-text-secondary hover:bg-bg-elevated"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav className="md:hidden bg-bg-card border-b border-border px-xl py-lg space-y-sm">
            <a href="/features" className="block text-label text-text-secondary py-sm">Features</a>
            <a href="/pricing" aria-current="page"
               className="block text-label text-accent py-sm">Pricing</a>
            <a href="/docs" className="block text-label text-text-secondary py-sm">Docs</a>
          </nav>
        )}
      </header>

      <main className="pt-14 max-w-[1280px] mx-auto px-xl py-xl">
        {children}
      </main>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .topnav-shell { min-height: 100vh; background: var(--bg-primary); }

  .topnav {
    position: fixed; top: 0; left: 0; right: 0;
    height: 56px; z-index: var(--z-sticky);
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
  }

  .topnav-inner {
    max-width: 1280px; margin: 0 auto; height: 100%;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 var(--space-xl);
  }

  .topnav-brand {
    font-size: var(--text-h4); font-weight: 600; color: var(--accent);
  }

  .topnav-links { display: flex; align-items: center; gap: var(--space-xl); }

  .topnav-link {
    font-size: var(--text-label); font-weight: var(--weight-label);
    color: var(--text-secondary);
    transition: color var(--duration-micro) var(--ease-default);
  }
  .topnav-link:hover { color: var(--text-primary); }
  .topnav-link[aria-current="page"] { color: var(--accent); }

  .topnav-content {
    padding-top: 56px;
    max-width: 1280px; margin: 0 auto;
    padding-left: var(--space-xl); padding-right: var(--space-xl);
    padding-bottom: var(--space-xl);
  }

  @media (max-width: 767px) {
    .topnav-links { display: none; }
    .topnav-links.open { display: flex; flex-direction: column; /* ... */ }
  }
</style>

<div class="topnav-shell">
  <header class="topnav">
    <div class="topnav-inner">
      <a href="/" class="topnav-brand">Brand</a>
      <nav class="topnav-links" aria-label="Primary navigation">
        <a href="/features" class="topnav-link">Features</a>
        <a href="/pricing" class="topnav-link" aria-current="page">Pricing</a>
        <a href="/docs" class="topnav-link">Docs</a>
      </nav>
    </div>
  </header>

  <main class="topnav-content">
    <!-- Page content -->
  </main>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Fix the nav to `top: 0` with `z-sticky` | Let the nav scroll away on long pages |
| Center content with `max-width: 1280px` | Let content span full viewport width unconstrained |
| Collapse links to a hamburger below `768px` | Show all links on mobile, causing overflow |
| Use `aria-expanded` on the hamburger button | Omit expanded state from screen readers |

---

### Divider / Separator

A thin visual break between content sections. Available as horizontal, vertical, or labeled variants.

#### When to Use

- Between groups of related content within a page or card
- As a vertical separator in toolbars or inline layouts
- To label a transition point ("or", "Section 2", a date, etc.)

#### Anatomy

**Horizontal:** A full-width line, `1px solid var(--border)`.

**Vertical:** A full-height line in a flex container, `1px solid var(--border)`.

**Labeled:** A horizontal line interrupted by centered text. The text has `bg-bg-primary` padding to visually mask the line behind it.

#### Variants

| Variant | CSS | Notes |
|---------|-----|-------|
| Horizontal | `border-top: 1px solid var(--border)` | Default. Full-width block element. |
| Vertical | `border-left: 1px solid var(--border)` | Inline within a flex row. Self-stretches to parent height. |
| Labeled | Horizontal line + centered `<span>` | Text uses `text-caption`, `text-text-tertiary`, `bg-bg-primary` padding |

#### States

Dividers have no interactive states. They are purely decorative.

#### Accessibility

- Horizontal and vertical dividers use `role="separator"`
- Labeled dividers use `role="separator"` on the container
- Purely decorative dividers may use `aria-hidden="true"` if they carry no semantic meaning
- Never use a divider as the only indicator of content grouping -- pair with headings

#### Tailwind + React

```jsx
function DividerHorizontal() {
  return <hr className="border-t border-border my-xl" role="separator" />;
}

function DividerVertical() {
  return <div className="border-l border-border self-stretch mx-md" role="separator" />;
}

function DividerLabeled({ label }) {
  return (
    <div className="flex items-center gap-lg my-xl" role="separator">
      <div className="flex-1 border-t border-border" />
      <span className="text-caption text-text-tertiary px-sm bg-bg-primary">{label}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .divider-h {
    border: none; border-top: 1px solid var(--border);
    margin: var(--space-xl) 0;
  }

  .divider-v {
    border: none; border-left: 1px solid var(--border);
    align-self: stretch;
    margin: 0 var(--space-md);
  }

  .divider-labeled {
    display: flex; align-items: center; gap: var(--space-lg);
    margin: var(--space-xl) 0;
  }
  .divider-labeled::before,
  .divider-labeled::after {
    content: ''; flex: 1;
    border-top: 1px solid var(--border);
  }
  .divider-labeled span {
    font-size: var(--text-caption); font-weight: var(--weight-caption);
    color: var(--text-tertiary);
    padding: 0 var(--space-sm);
    background: var(--bg-primary);
  }
</style>

<!-- Horizontal -->
<hr class="divider-h" role="separator" />

<!-- Vertical (inside a flex row) -->
<div style="display: flex; align-items: center;">
  <span>Left</span>
  <div class="divider-v" role="separator"></div>
  <span>Right</span>
</div>

<!-- Labeled -->
<div class="divider-labeled" role="separator">
  <span>or continue with</span>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use `var(--border)` for the line color | Hardcode a gray hex value |
| Add `role="separator"` for semantic clarity | Use an empty `<div>` with no role |
| Use `bg-bg-primary` on the label to mask the line | Let the line show through the label text |
| Use sparingly between logical groups | Place a divider between every single item in a list |

---

### Bottom Sheet (Mobile)

A panel that slides up from the bottom of the screen on mobile. Used for contextual actions, confirmations, or auxiliary content that does not warrant a full modal.

#### When to Use

- Mobile-only action menus (share, delete, edit options)
- Confirmations and quick forms on small screens
- Auxiliary content that should not navigate the user away

Do not use on desktop -- prefer modal dialogs, popovers, or inline panels instead.

#### Anatomy

```
+----------- viewport -----------+
|                                |
|        [ backdrop ]            |
|                                |
+--------------------------------+
| [ ---- drag handle ---- ]     |
| [ content / actions ]         |
| [ content / actions ]         |
+--------------------------------+
```

1. **Backdrop** -- `bg-bg-overlay`, fixed full-screen, `z-overlay`.
2. **Sheet panel** -- Fixed `bottom: 0`, full-width, `bg-bg-card`, top corners `border-radius: var(--radius-xl) var(--radius-xl) 0 0`, `z-modal`.
3. **Drag handle** -- `width: 32px`, `height: 4px`, `border-radius: var(--radius-full)`, `bg-text-muted`, centered at top with `padding: var(--space-md) 0`.
4. **Content area** -- Padding `var(--space-xl)`, scrollable if content exceeds viewport.

#### Variants

| Variant | Height | Behavior |
|---------|--------|----------|
| Peek | ~30% viewport | Shows a summary; drag up to expand |
| Expanded | Up to 90% viewport | Full content visible, scrollable internally |
| Dismissed | 0 | Slides down and hides; backdrop fades out |

#### States

| State | Treatment |
|-------|-----------|
| Entering | Slide up from off-screen, `400ms ease`; backdrop fades in `200ms ease` |
| Peek | Partial height, drag handle visible, content partially visible |
| Expanded | Near-full height, content scrollable |
| Exiting | Slide down, `200ms ease`; backdrop fades out `150ms ease` |

#### Accessibility

- Sheet panel uses `role="dialog"`, `aria-modal="true"`, `aria-label="[descriptive name]"`
- Focus is trapped inside the sheet while open
- `Escape` key dismisses the sheet
- Drag handle is decorative (`aria-hidden="true"`) -- provide a close button for keyboard users
- When dismissed, focus returns to the triggering element

#### Tailwind + React

```jsx
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

function BottomSheet({ open, onClose, title, children }) {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (open) {
      sheetRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg-overlay z-overlay animate-[fade-in-up_200ms_ease]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="fixed bottom-0 inset-x-0 z-modal bg-bg-card
                   rounded-t-xl shadow-ds-lg
                   animate-[fade-in-up_400ms_ease]
                   max-h-[90vh] flex flex-col"
      >
        {/* Drag handle (decorative) */}
        <div className="flex justify-center pt-md pb-sm" aria-hidden="true">
          <div className="w-8 h-1 rounded-full bg-text-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-xl pb-md">
          <h2 className="text-h3 text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-xs rounded-ds-md text-text-secondary hover:bg-bg-elevated
                       focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-xl pb-xl">
          {children}
        </div>
      </div>
    </>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .bottom-sheet-backdrop {
    position: fixed; inset: 0;
    background: var(--bg-overlay);
    z-index: var(--z-overlay);
    animation: fade-in-up 200ms var(--ease-default);
  }

  .bottom-sheet {
    position: fixed; bottom: 0; left: 0; right: 0;
    z-index: var(--z-modal);
    background: var(--bg-card);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    box-shadow: var(--shadow-lg);
    max-height: 90vh;
    display: flex; flex-direction: column;
    animation: slide-up 400ms var(--ease-default);
  }

  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }

  .bottom-sheet-handle {
    width: 32px; height: 4px;
    border-radius: var(--radius-full);
    background: var(--text-muted);
    margin: var(--space-md) auto var(--space-sm);
  }

  .bottom-sheet-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 var(--space-xl) var(--space-md);
  }

  .bottom-sheet-content {
    flex: 1; overflow-y: auto;
    padding: 0 var(--space-xl) var(--space-xl);
  }
</style>

<div class="bottom-sheet-backdrop" aria-hidden="true"></div>
<div class="bottom-sheet" role="dialog" aria-modal="true" aria-label="Actions">
  <div class="bottom-sheet-handle" aria-hidden="true"></div>
  <div class="bottom-sheet-header">
    <h2 style="font-size: var(--text-h3); color: var(--text-primary);">Actions</h2>
    <button aria-label="Close"><!-- close icon --></button>
  </div>
  <div class="bottom-sheet-content">
    <!-- Sheet content -->
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Only use on mobile viewports (< 768px) | Show a bottom sheet on desktop |
| Provide a close button for keyboard users | Rely on drag-to-dismiss as the only close method |
| Lock body scroll when sheet is open | Allow background content to scroll |
| Animate entry at `400ms ease`, exit at `200ms ease` | Use bounce or spring easing |
| Top corners use `border-radius: var(--radius-xl)` | Round all four corners |

---

## Marketing & Utility

---

### Command Palette

A search-driven command dialog triggered by a keyboard shortcut. Users can find and execute actions, navigate to pages, or search content without leaving the keyboard.

#### When to Use

- Any product app where power users benefit from keyboard-driven navigation
- Apps with many routes, commands, or searchable entities
- As a complement (not replacement) to primary navigation

#### Anatomy

```
+--[ overlay backdrop ]------+
|                            |
|  +--[ dialog panel ]----+  |
|  | [ search input     ] |  |
|  | [ group header     ] |  |
|  | [ result option    ] |  |
|  | [ result option *  ] |  |
|  | [ group header     ] |  |
|  | [ result option    ] |  |
|  | [ keyboard hints   ] |  |
|  +-----------------------+  |
|                            |
+----------------------------+
```

1. **Backdrop** -- `bg-bg-overlay`, fixed full-screen, `z-overlay`. Click to dismiss.
2. **Panel** -- `role="dialog"`, `aria-modal="true"`, centered, `max-width: 560px`, `bg-bg-card`, `border: 1px solid var(--border)`, `border-radius: var(--radius-lg)`, `shadow-ds-lg`, `z-modal`.
3. **Search input** -- `role="combobox"`, `aria-expanded`, `aria-controls` pointing to the listbox. Full-width, no visible border (borderless within the panel), `padding: var(--space-lg)`.
4. **Results list** -- `role="listbox"`, each item `role="option"` with `aria-selected` on the active (highlighted) item.
5. **Group headers** -- Non-interactive section labels, `text-overline text-text-tertiary`, `padding: var(--space-sm) var(--space-lg)`.
6. **Footer** -- Keyboard hints in `text-caption text-text-muted`, `border-top: 1px solid var(--border)`, `padding: var(--space-sm) var(--space-lg)`.

#### Variants

| Variant | Description |
|---------|------------|
| Default | Flat list of results |
| Grouped | Results organized under category headers (Pages, Commands, Recent) |
| Empty state | "No results found" message with suggestion text |

#### States

| State | Treatment |
|-------|-----------|
| Closed | Not rendered or visually hidden |
| Open (empty) | Panel visible, input focused, no results shown yet |
| Open (results) | Results listed, first item highlighted by default |
| Open (no match) | Empty state message displayed |
| Active option | `bg-bg-elevated` highlight on the option with `aria-selected="true"` |

#### Accessibility

- Trigger: global `keydown` listener for `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
- Panel: `role="dialog"`, `aria-modal="true"`, `aria-label="Command palette"`
- Input: `role="combobox"`, `aria-expanded="true"`, `aria-controls="[listbox-id]"`, `aria-activedescendant="[active-option-id]"`
- Results: `role="listbox"`, `id` matching `aria-controls`
- Each result: `role="option"`, unique `id`, `aria-selected` on active
- Keyboard: `ArrowDown` / `ArrowUp` navigate, `Enter` selects, `Escape` closes
- Focus is trapped inside the dialog while open
- On close, focus returns to the element that triggered the palette

#### Tailwind + React

```jsx
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

function CommandPalette({ commands, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = Object.groupBy(filtered, (cmd) => cmd.category);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); setQuery(''); }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && filtered[activeIndex]) {
      onSelect(filtered[activeIndex]);
      setOpen(false);
      setQuery('');
    }
  };

  if (!open) return null;

  let optionIndex = -1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg-overlay z-overlay"
        onClick={() => { setOpen(false); setQuery(''); }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="fixed inset-0 z-modal flex items-start justify-center pt-[20vh]"
      >
        <div className="w-full max-w-[560px] bg-bg-card border border-border
                        rounded-ds-lg shadow-ds-lg overflow-hidden
                        animate-[scale-in_200ms_ease]"
        >
          {/* Search input */}
          <div className="flex items-center gap-md px-lg border-b border-border">
            <Search className="w-5 h-5 text-text-muted shrink-0" />
            <input
              ref={inputRef}
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-listbox"
              aria-activedescendant={filtered[activeIndex] ? `option-${activeIndex}` : undefined}
              type="text"
              placeholder="Search commands..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent py-lg text-body text-text-primary
                         placeholder:text-text-muted outline-none"
            />
          </div>

          {/* Results */}
          <ul
            id="palette-listbox"
            role="listbox"
            className="max-h-[320px] overflow-y-auto py-sm"
          >
            {filtered.length === 0 && (
              <li className="px-lg py-xl text-center text-body text-text-secondary">
                No results found.
              </li>
            )}
            {Object.entries(grouped).map(([category, items]) => (
              <li key={category} role="presentation">
                <div className="text-overline text-text-tertiary px-lg pt-md pb-xs">
                  {category}
                </div>
                <ul role="group" aria-label={category}>
                  {items.map((cmd) => {
                    optionIndex++;
                    const isActive = optionIndex === activeIndex;
                    const idx = optionIndex;
                    return (
                      <li
                        key={cmd.id}
                        id={`option-${idx}`}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => { onSelect(cmd); setOpen(false); setQuery(''); }}
                        className={`flex items-center gap-md px-lg py-sm cursor-pointer
                          text-label transition-colors duration-micro
                          ${isActive ? 'bg-bg-elevated text-text-primary' : 'text-text-secondary hover:bg-bg-elevated'}`}
                      >
                        {cmd.icon && <cmd.icon className="w-4 h-4 shrink-0" />}
                        <span>{cmd.label}</span>
                        {cmd.shortcut && (
                          <kbd className="ml-auto text-caption text-text-muted">{cmd.shortcut}</kbd>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>

          {/* Footer hints */}
          <div className="flex items-center gap-lg px-lg py-sm border-t border-border">
            <span className="text-caption text-text-muted">
              <kbd className="px-xs py-2xs bg-bg-elevated rounded-ds-sm text-caption">↑↓</kbd> navigate
            </span>
            <span className="text-caption text-text-muted">
              <kbd className="px-xs py-2xs bg-bg-elevated rounded-ds-sm text-caption">↵</kbd> select
            </span>
            <span className="text-caption text-text-muted">
              <kbd className="px-xs py-2xs bg-bg-elevated rounded-ds-sm text-caption">esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .cmd-backdrop {
    position: fixed; inset: 0;
    background: var(--bg-overlay);
    z-index: var(--z-overlay);
  }

  .cmd-wrapper {
    position: fixed; inset: 0;
    z-index: var(--z-modal);
    display: flex; align-items: flex-start; justify-content: center;
    padding-top: 20vh;
  }

  .cmd-panel {
    width: 100%; max-width: 560px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    animation: scale-in 200ms var(--ease-default);
  }

  .cmd-input-row {
    display: flex; align-items: center; gap: var(--space-md);
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--border);
  }

  .cmd-input {
    flex: 1; background: transparent; border: none; outline: none;
    padding: var(--space-lg) 0;
    font-size: var(--text-body); color: var(--text-primary);
  }
  .cmd-input::placeholder { color: var(--text-muted); }

  .cmd-results {
    max-height: 320px; overflow-y: auto;
    padding: var(--space-sm) 0;
    list-style: none;
  }

  .cmd-group-header {
    font-size: var(--text-overline); font-weight: var(--weight-overline);
    letter-spacing: var(--ls-overline); text-transform: uppercase;
    color: var(--text-tertiary);
    padding: var(--space-md) var(--space-lg) var(--space-xs);
  }

  .cmd-option {
    display: flex; align-items: center; gap: var(--space-md);
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--text-label); font-weight: var(--weight-label);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }
  .cmd-option:hover,
  .cmd-option[aria-selected="true"] {
    background: var(--bg-elevated); color: var(--text-primary);
  }

  .cmd-footer {
    display: flex; align-items: center; gap: var(--space-lg);
    padding: var(--space-sm) var(--space-lg);
    border-top: 1px solid var(--border);
    font-size: var(--text-caption); color: var(--text-muted);
  }

  .cmd-kbd {
    display: inline-block;
    padding: var(--space-2xs) var(--space-xs);
    background: var(--bg-elevated);
    border-radius: var(--radius-sm);
    font-size: var(--text-caption);
  }
</style>

<div class="cmd-backdrop" aria-hidden="true"></div>
<div class="cmd-wrapper">
  <div class="cmd-panel" role="dialog" aria-modal="true" aria-label="Command palette">
    <div class="cmd-input-row">
      <!-- search icon -->
      <input class="cmd-input" role="combobox"
             aria-expanded="true" aria-controls="cmd-list"
             placeholder="Search commands..." />
    </div>
    <ul id="cmd-list" class="cmd-results" role="listbox">
      <li class="cmd-group-header" role="presentation">Pages</li>
      <li class="cmd-option" role="option" aria-selected="true" id="opt-0">Dashboard</li>
      <li class="cmd-option" role="option" id="opt-1">Settings</li>
      <li class="cmd-group-header" role="presentation">Commands</li>
      <li class="cmd-option" role="option" id="opt-2">Toggle theme</li>
    </ul>
    <div class="cmd-footer">
      <span><kbd class="cmd-kbd">↑↓</kbd> navigate</span>
      <span><kbd class="cmd-kbd">↵</kbd> select</span>
      <span><kbd class="cmd-kbd">esc</kbd> close</span>
    </div>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Trap focus inside the dialog while open | Allow Tab to escape to the page behind |
| Return focus to the trigger element on close | Leave focus stranded after dismissal |
| Use `aria-activedescendant` to track the active option | Move DOM focus to each option (use virtual focus) |
| Group results by category with clear headers | Show a flat unsorted list with no grouping |
| Show keyboard hints in the footer | Assume all users know the keyboard shortcuts |
| Limit `max-width` to `560px` | Let the palette stretch to full viewport width |

---

### Pricing Table

A multi-column comparison of plan tiers for marketing pages. One plan is visually promoted as recommended.

#### When to Use

- Marketing landing pages with tiered pricing
- Plan comparison and upgrade flows
- Any context where users choose between subscription levels

#### Anatomy

```
+--[ billing toggle: Monthly | Annual ]--+

+--------+----------+----------+--------+
|  Free  | Pro      | Team     | Enter. |
|        | ★Popular |          |        |
| $0/mo  | $19/mo   | $49/mo   | Custom |
|        |          |          |        |
| ✓ feat | ✓ feat   | ✓ feat   | ✓ feat |
| ✓ feat | ✓ feat   | ✓ feat   | ✓ feat |
| ✗ feat | ✓ feat   | ✓ feat   | ✓ feat |
| ✗ feat | ✗ feat   | ✓ feat   | ✓ feat |
|        |          |          |        |
| [CTA ] | [CTA ★ ] | [CTA ]   | [CTA ] |
+--------+----------+----------+--------+
```

1. **Billing toggle** -- Segmented control at top: Monthly / Annual. Annual shows savings badge.
2. **Plan columns** -- 2-4 columns, equal width. Each has plan name, price, feature list, CTA.
3. **Recommended plan** -- `border: 2px solid var(--accent)`, optional "Popular" badge (`bg-accent text-text-on-accent`).
4. **Feature rows** -- Checkmark icon in `text-success` for included, X icon in `text-text-muted` for excluded.
5. **CTA buttons** -- Primary (`bg-accent`) for recommended plan, default for others.

#### Variants

| Variant | Columns | Notes |
|---------|---------|-------|
| Compact | 2 | Side-by-side comparison (free vs paid) |
| Standard | 3 | Most common (free, pro, team) |
| Full | 4 | Enterprise tier added |
| Mobile | 1 (stacked) | Cards stack vertically below `768px` |

#### States

| State | Treatment |
|-------|-----------|
| Monthly selected | Monthly prices shown, Monthly segment active |
| Annual selected | Annual prices shown, Annual segment active, savings badge visible |
| Hover on plan card | `shadow-ds-md` elevation increase |
| Hover on CTA | Standard button hover state |

#### Accessibility

- Billing toggle uses `role="radiogroup"` with `role="radio"` options, `aria-checked`
- Feature check/X marks: use `aria-label="Included"` or `aria-label="Not included"` on icons
- Plan columns are structured with headings (`<h3>`) for each plan name
- CTA buttons have descriptive text ("Start Free", "Upgrade to Pro") -- not just "Get Started"
- Price changes on toggle are announced via `aria-live="polite"` region

#### Tailwind + React

```jsx
import { useState } from 'react';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Free', monthly: 0, annual: 0, popular: false,
    features: [true, true, false, false],
    cta: 'Start Free',
  },
  {
    name: 'Pro', monthly: 19, annual: 15, popular: true,
    features: [true, true, true, false],
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Team', monthly: 49, annual: 39, popular: false,
    features: [true, true, true, true],
    cta: 'Choose Team',
  },
];

const featureLabels = ['Unlimited projects', '10 GB storage', 'Priority support', 'Custom domain'];

function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <section className="max-w-[1024px] mx-auto px-xl py-3xl">
      {/* Billing toggle */}
      <div className="flex justify-center mb-2xl" role="radiogroup" aria-label="Billing period">
        {['monthly', 'annual'].map((period) => (
          <button
            key={period}
            role="radio"
            aria-checked={billing === period}
            onClick={() => setBilling(period)}
            className={`px-xl py-sm text-label capitalize transition-colors duration-micro
              ${billing === period
                ? 'bg-accent text-text-on-accent rounded-ds-md'
                : 'bg-bg-elevated text-text-secondary rounded-ds-md'}`}
          >
            {period}
            {period === 'annual' && <span className="ml-sm text-caption"> Save 20%</span>}
          </button>
        ))}
      </div>

      {/* Price display (live region) */}
      <div aria-live="polite" className="sr-only">
        Showing {billing} prices.
      </div>

      {/* Plan columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col bg-bg-card rounded-ds-lg p-xl
              transition-shadow duration-standard hover:shadow-ds-md
              ${plan.popular
                ? 'border-2 border-accent shadow-ds-md'
                : 'border border-border'}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2
                               bg-accent text-text-on-accent text-caption font-semibold
                               px-md py-xs rounded-ds-md">
                Popular
              </span>
            )}

            <h3 className="text-h3 text-text-primary mb-sm">{plan.name}</h3>
            <p className="text-display-2 text-text-primary font-bold mb-xs">
              ${billing === 'monthly' ? plan.monthly : plan.annual}
              <span className="text-body text-text-secondary font-normal">/mo</span>
            </p>

            <ul className="flex-1 space-y-md my-xl">
              {featureLabels.map((feat, i) => (
                <li key={feat} className="flex items-center gap-sm text-body">
                  {plan.features[i] ? (
                    <Check className="w-4 h-4 text-success shrink-0" aria-label="Included" />
                  ) : (
                    <X className="w-4 h-4 text-text-muted shrink-0" aria-label="Not included" />
                  )}
                  <span className={plan.features[i] ? 'text-text-primary' : 'text-text-muted'}>
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-sm rounded-ds-md text-label font-semibold
                transition-colors duration-micro
                ${plan.popular
                  ? 'bg-accent text-text-on-accent hover:bg-accent-hover'
                  : 'bg-bg-elevated text-text-primary hover:bg-border-hover border border-border'}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .pricing-section {
    max-width: 1024px; margin: 0 auto;
    padding: var(--space-xl);
  }

  .billing-toggle {
    display: flex; justify-content: center;
    margin-bottom: var(--space-2xl);
  }
  .billing-toggle button {
    padding: var(--space-sm) var(--space-xl);
    font-size: var(--text-label); font-weight: var(--weight-label);
    border: none; cursor: pointer;
    border-radius: var(--radius-md);
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }
  .billing-toggle button[aria-checked="true"] {
    background: var(--accent); color: var(--text-on-accent);
  }
  .billing-toggle button[aria-checked="false"] {
    background: var(--bg-elevated); color: var(--text-secondary);
  }

  .pricing-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
  }
  @media (max-width: 767px) {
    .pricing-grid { grid-template-columns: 1fr; }
  }

  .plan-card {
    position: relative;
    display: flex; flex-direction: column;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    border: 1px solid var(--border);
    transition: box-shadow var(--duration-standard) var(--ease-default);
  }
  .plan-card:hover { box-shadow: var(--shadow-md); }
  .plan-card.popular { border: 2px solid var(--accent); box-shadow: var(--shadow-md); }

  .popular-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--accent); color: var(--text-on-accent);
    font-size: var(--text-caption); font-weight: 600;
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-md);
  }

  .plan-name { font-size: var(--text-h3); font-weight: var(--weight-h3); color: var(--text-primary); }
  .plan-price { font-size: var(--text-display-2); font-weight: 700; color: var(--text-primary); }
  .plan-price span { font-size: var(--text-body); font-weight: 400; color: var(--text-secondary); }

  .feature-list { list-style: none; flex: 1; margin: var(--space-xl) 0; }
  .feature-list li {
    display: flex; align-items: center; gap: var(--space-sm);
    font-size: var(--text-body); padding: var(--space-xs) 0;
  }
  .feature-included { color: var(--success); }
  .feature-excluded { color: var(--text-muted); }

  .plan-cta {
    width: 100%; padding: var(--space-sm) 0;
    border-radius: var(--radius-md);
    font-size: var(--text-label); font-weight: 600;
    border: none; cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default);
  }
  .plan-cta.primary { background: var(--accent); color: var(--text-on-accent); }
  .plan-cta.primary:hover { background: var(--accent-hover); }
  .plan-cta.default { background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border); }
  .plan-cta.default:hover { background: var(--border-hover); }
</style>

<section class="pricing-section">
  <div class="billing-toggle" role="radiogroup" aria-label="Billing period">
    <button role="radio" aria-checked="true">Monthly</button>
    <button role="radio" aria-checked="false">Annual <small>Save 20%</small></button>
  </div>

  <div class="pricing-grid">
    <div class="plan-card">
      <h3 class="plan-name">Free</h3>
      <p class="plan-price">$0<span>/mo</span></p>
      <ul class="feature-list">
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Unlimited projects</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> 10 GB storage</li>
        <li><span class="feature-excluded" aria-label="Not included">&#10007;</span> Priority support</li>
      </ul>
      <button class="plan-cta default">Start Free</button>
    </div>

    <div class="plan-card popular">
      <span class="popular-badge">Popular</span>
      <h3 class="plan-name">Pro</h3>
      <p class="plan-price">$19<span>/mo</span></p>
      <ul class="feature-list">
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Unlimited projects</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> 10 GB storage</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Priority support</li>
      </ul>
      <button class="plan-cta primary">Upgrade to Pro</button>
    </div>

    <div class="plan-card">
      <h3 class="plan-name">Team</h3>
      <p class="plan-price">$49<span>/mo</span></p>
      <ul class="feature-list">
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Unlimited projects</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> 10 GB storage</li>
        <li><span class="feature-included" aria-label="Included">&#10003;</span> Priority support</li>
      </ul>
      <button class="plan-cta default">Choose Team</button>
    </div>
  </div>
</section>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Highlight the recommended plan with `border-accent` | Use color alone to differentiate plans |
| Use `text-success` checkmarks and `text-text-muted` X marks | Use emoji or images for feature indicators |
| Stack columns vertically on mobile | Force horizontal scroll on small screens |
| Give each CTA a descriptive label ("Upgrade to Pro") | Use generic "Get Started" on every button |
| Announce price changes via `aria-live` on toggle | Silently swap prices with no screen reader notification |

---

### Error Pages

Full-screen centered pages for HTTP error states. The status code is displayed in the Cinzel display font as a brand moment.

#### When to Use

- 404: Resource not found
- 500: Server error
- 503: Maintenance mode
- Any unrecoverable error that replaces the normal page content

#### Anatomy

```
+---------- full viewport ----------+
|                                   |
|          [ status code ]          |   font-display, text-display-1, text-accent
|          [ heading ]              |   text-h2, text-text-primary
|          [ description ]          |   text-body, text-text-secondary
|          [ CTA button ]           |   primary button
|                                   |
+-----------------------------------+
```

1. **Status code** -- `font-family: var(--font-display)` (Cinzel), `font-size: var(--text-display-1)`, `color: var(--accent)`. The large gold number is the brand signature.
2. **Heading** -- `text-h2`, `text-text-primary`. Brief error summary.
3. **Description** -- `text-body`, `text-text-secondary`. Friendly explanation.
4. **CTA** -- Primary button. Always present -- the user must have an escape route.

#### Variants

| Variant | Code | Heading | Description | CTA |
|---------|------|---------|-------------|-----|
| Not Found | 404 | Page not found | The page you're looking for doesn't exist or has been moved. | Go Home |
| Server Error | 500 | Something went wrong | We're working on it. Please try again in a moment. | Try Again |
| Maintenance | 503 | Under maintenance | We're making improvements. We'll be back shortly. | Check Status |

#### States

Error pages have no interactive states beyond the CTA button's standard hover/focus/active states.

#### Accessibility

- Page uses a `<main>` landmark
- Status code is decorative for screen readers -- use `aria-hidden="true"` and provide the error in the heading
- Heading uses `<h1>` (it is the primary content of the page)
- CTA button has clear, descriptive text
- `<title>` element reflects the error: "404 -- Page Not Found | App Name"

#### Tailwind + React

```jsx
import { useNavigate } from 'react-router-dom';

function ErrorPage({ code = 404, heading, description, ctaLabel, ctaAction }) {
  const navigate = useNavigate();

  const defaults = {
    404: {
      heading: 'Page not found',
      description: "The page you're looking for doesn't exist or has been moved.",
      ctaLabel: 'Go Home',
      ctaAction: () => navigate('/'),
    },
    500: {
      heading: 'Something went wrong',
      description: "We're working on it. Please try again in a moment.",
      ctaLabel: 'Try Again',
      ctaAction: () => window.location.reload(),
    },
    503: {
      heading: 'Under maintenance',
      description: "We're making improvements. We'll be back shortly.",
      ctaLabel: 'Check Status',
      ctaAction: () => navigate('/status'),
    },
  };

  const config = defaults[code] || defaults[500];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-xl text-center">
      <p
        aria-hidden="true"
        className="font-display text-display-1 text-accent leading-none mb-lg"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {code}
      </p>
      <h1 className="text-h2 text-text-primary mb-sm">
        {heading || config.heading}
      </h1>
      <p className="text-body text-text-secondary max-w-md mb-xl">
        {description || config.description}
      </p>
      <button
        onClick={ctaAction || config.ctaAction}
        className="px-xl py-sm bg-accent text-text-on-accent rounded-ds-md
                   text-label font-semibold hover:bg-accent-hover
                   transition-colors duration-micro
                   focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {ctaLabel || config.ctaLabel}
      </button>
    </main>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .error-page {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--bg-primary);
    padding: var(--space-xl);
    text-align: center;
  }

  .error-code {
    font-family: var(--font-display);
    font-size: var(--text-display-1);
    font-weight: var(--weight-display-1);
    letter-spacing: var(--ls-display-1);
    line-height: var(--lh-display-1);
    color: var(--accent);
    margin-bottom: var(--space-lg);
  }

  .error-heading {
    font-size: var(--text-h2);
    font-weight: var(--weight-h2);
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }

  .error-description {
    font-size: var(--text-body);
    color: var(--text-secondary);
    max-width: 28rem;
    margin-bottom: var(--space-xl);
  }

  .error-cta {
    padding: var(--space-sm) var(--space-xl);
    background: var(--accent);
    color: var(--text-on-accent);
    border: none; border-radius: var(--radius-md);
    font-size: var(--text-label); font-weight: 600;
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default);
  }
  .error-cta:hover { background: var(--accent-hover); }
  .error-cta:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>

<main class="error-page">
  <p class="error-code" aria-hidden="true">404</p>
  <h1 class="error-heading">Page not found</h1>
  <p class="error-description">
    The page you're looking for doesn't exist or has been moved.
  </p>
  <a href="/" class="error-cta">Go Home</a>
</main>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use Cinzel (`--font-display`) for the status code | Use Inter or any sans-serif for the code number |
| Color the status code with `text-accent` (gold) | Use red or error color for the status code |
| Always provide a CTA button | Leave the user on a dead-end page with no action |
| Set the page `<title>` to reflect the error | Keep the default page title on error pages |
| Use `aria-hidden="true"` on the decorative status code | Let screen readers announce "four zero four" |

---

## Using Without Tailwind (Plain CSS)

This design system works fully without Tailwind. The foundation is `globals.css`, which defines all tokens as CSS custom properties. Any application can use these variables directly.

### Setup

**Option 1: HTML link tag**

```html
<link rel="stylesheet" href="path-to-design-system/globals.css" />
```

**Option 2: CSS or bundler import**

```css
@import 'path-to-design-system/globals.css';
```

```js
// In a bundler (Vite, Webpack, etc.)
import 'path-to-design-system/globals.css';
```

### Setting the Theme

Apply `data-theme` on the root `<html>` element. Dark mode is the default and preferred theme.

```html
<html data-theme="dark">  <!-- default: cool blue-black -->
<html data-theme="light"> <!-- warm cream/parchment alternate -->
```

To toggle at runtime:

```js
document.documentElement.setAttribute('data-theme',
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
);
```

### Example: Card Component (Plain CSS)

```html
<style>
  .ds-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--duration-standard) var(--ease-default),
                border-color var(--duration-standard) var(--ease-default);
  }
  .ds-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--border-hover);
  }
  .ds-card-title {
    font-size: var(--text-h3);
    font-weight: var(--weight-h3);
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }
  .ds-card-body {
    font-size: var(--text-body);
    color: var(--text-secondary);
    line-height: var(--lh-body);
  }
</style>

<div class="ds-card">
  <h3 class="ds-card-title">Card Title</h3>
  <p class="ds-card-body">
    Card description using only design system tokens. No hardcoded values.
  </p>
</div>
```

### Example: Form with Validation (Plain CSS)

```html
<style>
  .ds-field { margin-bottom: var(--space-lg); }

  .ds-label {
    display: block;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
  }

  .ds-input {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    font-size: var(--text-body);
    color: var(--text-primary);
    transition: border-color var(--duration-micro) var(--ease-default),
                box-shadow var(--duration-micro) var(--ease-default);
  }
  .ds-input::placeholder { color: var(--text-muted); }
  .ds-input:hover { border-color: var(--border-hover); }
  .ds-input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-muted);
  }
  .ds-input.error {
    border-color: var(--error);
    box-shadow: 0 0 0 3px var(--error-muted);
  }

  .ds-error-message {
    font-size: var(--text-caption);
    color: var(--error);
    margin-top: var(--space-xs);
  }
</style>

<div class="ds-field">
  <label class="ds-label" for="email">Email address</label>
  <input class="ds-input" type="email" id="email" placeholder="you@example.com" />
</div>

<div class="ds-field">
  <label class="ds-label" for="password">Password</label>
  <input class="ds-input error" type="password" id="password"
         aria-describedby="password-error" aria-invalid="true" />
  <p class="ds-error-message" id="password-error">Password must be at least 8 characters.</p>
</div>
```

### Tailwind Class to CSS Variable Mapping

Use this table to translate between the Tailwind utility classes defined in `tailwind.preset.js` and the underlying CSS variables from `globals.css`.

#### Backgrounds

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `bg-bg-primary` | `var(--bg-primary)` |
| `bg-bg-secondary` | `var(--bg-secondary)` |
| `bg-bg-surface` | `var(--bg-surface)` |
| `bg-bg-card` | `var(--bg-card)` |
| `bg-bg-elevated` | `var(--bg-elevated)` |
| `bg-bg-overlay` | `var(--bg-overlay)` |

#### Text Colors

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `text-text-primary` | `var(--text-primary)` |
| `text-text-secondary` | `var(--text-secondary)` |
| `text-text-tertiary` | `var(--text-tertiary)` |
| `text-text-muted` | `var(--text-muted)` |
| `text-text-on-accent` | `var(--text-on-accent)` |

#### Accent

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `bg-accent` | `var(--accent)` |
| `bg-accent-hover` | `var(--accent-hover)` |
| `bg-accent-active` | `var(--accent-active)` |
| `bg-accent-muted` | `var(--accent-muted)` |
| `bg-accent-subtle` | `var(--accent-subtle)` |
| `text-accent` | `var(--accent)` |
| `border-accent` | `var(--accent)` |

#### Semantic Colors

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `text-error` | `var(--error)` |
| `bg-error-muted` | `var(--error-muted)` |
| `text-success` | `var(--success)` |
| `bg-success-muted` | `var(--success-muted)` |
| `text-warning` | `var(--warning)` |
| `bg-warning-muted` | `var(--warning-muted)` |
| `text-info` | `var(--info)` |
| `bg-info-muted` | `var(--info-muted)` |

#### Borders

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `border-border` | `var(--border)` |
| `border-border-hover` | `var(--border-hover)` |
| `border-border-focus` | `var(--border-focus)` |

#### Border Radii

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `rounded-ds-sm` | `var(--radius-sm)` -- `6px` |
| `rounded-ds-md` | `var(--radius-md)` -- `8px` |
| `rounded-ds-lg` | `var(--radius-lg)` -- `12px` |
| `rounded-ds-xl` | `var(--radius-xl)` -- `16px` |
| `rounded-full` | `var(--radius-full)` -- `9999px` |

#### Shadows

| Tailwind Class | CSS Variable |
|---------------|-------------|
| `shadow-ds-sm` | `var(--shadow-sm)` |
| `shadow-ds-md` | `var(--shadow-md)` |
| `shadow-ds-lg` | `var(--shadow-lg)` |

#### Spacing

| Tailwind Class | CSS Variable | Value |
|---------------|-------------|-------|
| `p-2xs`, `m-2xs`, `gap-2xs` | `var(--space-2xs)` | `2px` |
| `p-xs`, `m-xs`, `gap-xs` | `var(--space-xs)` | `4px` |
| `p-sm`, `m-sm`, `gap-sm` | `var(--space-sm)` | `8px` |
| `p-md`, `m-md`, `gap-md` | `var(--space-md)` | `12px` |
| `p-lg`, `m-lg`, `gap-lg` | `var(--space-lg)` | `16px` |
| `p-xl`, `m-xl`, `gap-xl` | `var(--space-xl)` | `24px` |
| `p-2xl`, `m-2xl`, `gap-2xl` | `var(--space-2xl)` | `32px` |
| `p-3xl`, `m-3xl`, `gap-3xl` | `var(--space-3xl)` | `48px` |
| `p-4xl`, `m-4xl`, `gap-4xl` | `var(--space-4xl)` | `64px` |

#### Typography

| Tailwind Class | CSS Variables |
|---------------|-------------|
| `text-display-1` | `font-size: var(--text-display-1)` -- `3.25rem` |
| `text-display-2` | `font-size: var(--text-display-2)` -- `2.25rem` |
| `text-h1` | `font-size: var(--text-h1)` -- `1.75rem` |
| `text-h2` | `font-size: var(--text-h2)` -- `1.375rem` |
| `text-h3` | `font-size: var(--text-h3)` -- `1.125rem` |
| `text-h4` | `font-size: var(--text-h4)` -- `1rem` |
| `text-body` | `font-size: var(--text-body)` -- `0.875rem` |
| `text-label` | `font-size: var(--text-label)` -- `0.8125rem` |
| `text-caption` | `font-size: var(--text-caption)` -- `0.75rem` |
| `text-overline` | `font-size: var(--text-overline)` -- `0.6875rem` |

#### Z-Index

| Tailwind Class | CSS Variable | Value |
|---------------|-------------|-------|
| `z-dropdown` | `var(--z-dropdown)` | `50` |
| `z-sticky` | `var(--z-sticky)` | `100` |
| `z-drawer` | `var(--z-drawer)` | `200` |
| `z-overlay` | `var(--z-overlay)` | `900` |
| `z-modal` | `var(--z-modal)` | `1000` |
| `z-toast` | `var(--z-toast)` | `1100` |

#### Motion

| CSS Variable | Value | Use Case |
|-------------|-------|----------|
| `var(--duration-micro)` | `150ms` | Hover, focus, color changes |
| `var(--duration-standard)` | `200ms` | Elevation, transform |
| `var(--duration-emphasis)` | `300ms` | Expanding panels |
| `var(--duration-entrance)` | `400ms` | Page entrance, modals |
| `var(--ease-default)` | `ease` | All transitions |
