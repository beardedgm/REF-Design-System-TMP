## Navigation

This section covers all navigation patterns. Every pattern supports both dark and light themes automatically through CSS custom properties. All examples use design system tokens exclusively -- no hardcoded values.

---

### 4.1 Sidebar Navigation

**When to use.** Dashboard apps with 7+ routes, grouped navigation, workspace-style apps. Use instead of top navigation when the app has deep hierarchies or section groups.

**Anatomy.**

| Part | Role |
|------|------|
| Container | `<nav>` landmark, fixed left, holds all sidebar content |
| Logo / brand | Top area, links to home/dashboard |
| Section label | `text-overline text-tertiary` uppercase group heading |
| Nav item | Icon + label row, triggers route change |
| Active indicator | Left border accent + muted background |
| Collapse toggle | Bottom button, switches between expanded and collapsed |
| Mobile drawer | Off-canvas panel from left with overlay backdrop |

**Variants.**

| Variant | Width | Content | Use |
|---------|-------|---------|-----|
| Expanded | 240px | Icon + label | Default on desktop (>= 768px) |
| Collapsed | 64px | Icon only, tooltip on hover | Compact mode, user toggle |
| Mobile drawer | 280px | Full expanded layout over overlay | Below 768px breakpoint |

**States.**

| State | Styles |
|-------|--------|
| Default | `text-text-secondary`, transparent background |
| Hover | `bg-bg-elevated`, `text-text-primary` |
| Active / current | `bg-accent-muted`, `text-accent`, `border-left: 2px solid var(--accent)` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Disabled | `text-text-muted`, `pointer-events: none`, `opacity: 0.5` |

**Accessibility.**

- Container: `<nav aria-label="Main navigation">`
- Active item: `aria-current="page"`
- Collapse toggle: `aria-expanded="true|false"`, `aria-label="Toggle sidebar"`
- Mobile drawer: `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`
- Mobile overlay: click or `Escape` closes drawer
- Focus trap inside mobile drawer when open
- All items reachable via `Tab`; `Enter` or `Space` activates

**Tailwind + React example.**

```jsx
import { Home, Users, Settings, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navSections = [
  {
    label: 'Main',
    items: [
      { icon: Home, label: 'Dashboard', href: '/dashboard', current: true },
      { icon: Users, label: 'Members', href: '/members', current: false },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: Settings, label: 'Settings', href: '/settings', current: false },
    ],
  },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      {navSections.map((section) => (
        <div key={section.label} className="mb-lg">
          {!collapsed && (
            <span className="block px-lg mb-sm text-overline text-text-tertiary">
              {section.label}
            </span>
          )}
          <ul className="space-y-xs">
            {section.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={`
                    flex items-center gap-md px-lg py-sm rounded-ds-md
                    transition-colors duration-micro ease-default
                    ${item.current
                      ? 'bg-accent-muted text-accent border-l-2 border-accent'
                      : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="text-label">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="Main navigation"
        className={`
          hidden md:flex flex-col fixed top-0 left-0 h-screen
          bg-bg-secondary border-r border-border
          transition-all duration-standard ease-default
          ${collapsed ? 'w-[64px]' : 'w-[240px]'}
        `}
      >
        <div className="flex-1 overflow-y-auto py-xl">
          {sidebarContent}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          aria-label="Toggle sidebar"
          className="
            flex items-center justify-center p-lg
            border-t border-border text-text-secondary
            hover:bg-bg-elevated hover:text-text-primary
            transition-colors duration-micro ease-default
          "
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile hamburger trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        className="md:hidden fixed top-lg left-lg z-sticky p-sm rounded-ds-md bg-bg-card shadow-ds-sm"
      >
        <Menu className="w-5 h-5 text-text-primary" />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-drawer">
          <div
            className="absolute inset-0 bg-bg-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="
              relative w-[280px] h-full bg-bg-secondary
              animate-[slide-in-left_300ms_ease]
            "
          >
            <div className="flex items-center justify-between p-lg border-b border-border">
              <span className="text-h4 text-text-primary font-semibold">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="p-xs rounded-ds-sm hover:bg-bg-elevated"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            <div className="py-xl overflow-y-auto">{sidebarContent}</div>
          </nav>
        </div>
      )}
    </>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    transition: width var(--duration-standard) var(--ease-default);
    z-index: var(--z-sticky);
  }

  .sidebar.collapsed {
    width: 64px;
  }

  .sidebar-section-label {
    display: block;
    padding: 0 var(--space-lg);
    margin-bottom: var(--space-sm);
    font-size: var(--text-overline);
    font-weight: var(--weight-overline);
    letter-spacing: var(--ls-overline);
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .sidebar.collapsed .sidebar-section-label {
    display: none;
  }

  .sidebar-nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    text-decoration: none;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }

  .sidebar-nav-item:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
  }

  .sidebar-nav-item[aria-current="page"] {
    background: var(--accent-muted);
    color: var(--accent);
    border-left: 2px solid var(--accent);
  }

  .sidebar-nav-item:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
    border: none;
    border-top: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default);
  }

  .sidebar-toggle:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
  }

  .sidebar.collapsed .sidebar-nav-label {
    display: none;
  }

  @media (max-width: 767px) {
    .sidebar {
      display: none;
    }
  }
</style>

<nav aria-label="Main navigation" class="sidebar">
  <div style="flex: 1; overflow-y: auto; padding: var(--space-xl) 0;">
    <span class="sidebar-section-label">Main</span>
    <ul style="list-style: none; margin-bottom: var(--space-lg);">
      <li>
        <a href="/dashboard" class="sidebar-nav-item" aria-current="page">
          <!-- icon svg w=20 h=20 -->
          <span class="sidebar-nav-label">Dashboard</span>
        </a>
      </li>
      <li>
        <a href="/members" class="sidebar-nav-item">
          <!-- icon svg w=20 h=20 -->
          <span class="sidebar-nav-label">Members</span>
        </a>
      </li>
    </ul>
    <span class="sidebar-section-label">System</span>
    <ul style="list-style: none;">
      <li>
        <a href="/settings" class="sidebar-nav-item">
          <!-- icon svg w=20 h=20 -->
          <span class="sidebar-nav-label">Settings</span>
        </a>
      </li>
    </ul>
  </div>
  <button class="sidebar-toggle" aria-expanded="true" aria-label="Toggle sidebar">
    <!-- chevron icon svg w=20 h=20 -->
  </button>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use `<nav>` with `aria-label` | Use `<div>` without landmark role |
| Mark active item with `aria-current="page"` | Rely on visual style alone to indicate current page |
| Transition width with `duration-standard` | Use instant width change or slow animation (> 300ms) |
| Provide mobile drawer with overlay + close button | Hide navigation entirely on mobile with no alternative |
| Use `text-overline` for section group labels | Use body text size for section labels |
| Collapse to 64px with icons only | Collapse to 0px, hiding all navigation |

---

### 4.2 Top Navigation

**When to use.** Public pages, marketing sites, simpler apps with 6 or fewer routes. Prefer over sidebar when the app has a flat hierarchy and few top-level destinations.

**Anatomy.**

| Part | Role |
|------|------|
| Container | `<nav>` landmark, fixed top, full-width bar |
| Logo | Left-aligned, links to home |
| Nav links | Center or left-aligned horizontal link list |
| Action area | Right-aligned buttons/icons (search, notifications, avatar) |
| Mobile menu | Hamburger trigger that opens a dropdown or drawer |

**Variants.**

| Variant | Layout | Use |
|---------|--------|-----|
| Centered links | Logo left, links centered, actions right | Marketing / landing pages |
| Left-aligned links | Logo + links left, actions right | Product apps with few routes |
| Transparent | No background, blends with hero | Landing page hero sections |

**States.**

| State | Styles |
|-------|--------|
| Default link | `text-text-secondary` |
| Hover link | `text-text-primary` |
| Active link | `text-accent`, `border-bottom: 2px solid var(--accent)` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |

**Accessibility.**

- Container: `<nav aria-label="Main navigation">`
- Active link: `aria-current="page"`
- Mobile hamburger: `aria-expanded="true|false"`, `aria-controls` pointing to menu ID, `aria-label="Toggle menu"`
- Mobile menu: can be dropdown (`role="menu"`) or drawer (`role="dialog"`)
- `Escape` closes mobile menu
- All links keyboard-reachable via `Tab`

**Tailwind + React example.**

```jsx
import { Search, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { label: 'Dashboard', href: '/dashboard', current: true },
  { label: 'Projects', href: '/projects', current: false },
  { label: 'Reports', href: '/reports', current: false },
];

function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className="
        fixed top-0 left-0 right-0 z-sticky h-[56px]
        bg-bg-card border-b border-border
        flex items-center px-xl
      "
    >
      {/* Logo */}
      <a href="/" className="text-h4 font-semibold text-text-primary mr-3xl">
        AppName
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-xl">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={link.current ? 'page' : undefined}
              className={`
                inline-flex items-center h-[56px] text-label
                border-b-2 transition-colors duration-micro ease-default
                ${link.current
                  ? 'text-accent border-accent'
                  : 'text-text-secondary border-transparent hover:text-text-primary'
                }
              `}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Action icons */}
      <div className="hidden md:flex items-center gap-sm">
        <button aria-label="Search" className="p-sm rounded-ds-md hover:bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors duration-micro">
          <Search className="w-5 h-5" />
        </button>
        <button aria-label="Notifications" className="p-sm rounded-ds-md hover:bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors duration-micro">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-menu"
        aria-label="Toggle menu"
        className="md:hidden p-sm rounded-ds-md hover:bg-bg-elevated text-text-secondary"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul
          id="mobile-nav-menu"
          className="
            md:hidden absolute top-[56px] left-0 right-0
            bg-bg-card border-b border-border shadow-ds-md
            py-sm
          "
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={link.current ? 'page' : undefined}
                className={`
                  block px-xl py-md text-label
                  ${link.current
                    ? 'text-accent bg-accent-muted'
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                  }
                `}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .topnav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-sticky);
    height: 56px;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 var(--space-xl);
  }

  .topnav-logo {
    font-size: var(--text-h4);
    font-weight: var(--weight-h4);
    color: var(--text-primary);
    text-decoration: none;
    margin-right: var(--space-3xl);
  }

  .topnav-links {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
    list-style: none;
  }

  .topnav-link {
    display: inline-flex;
    align-items: center;
    height: 56px;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: color var(--duration-micro) var(--ease-default),
                border-color var(--duration-micro) var(--ease-default);
  }

  .topnav-link:hover {
    color: var(--text-primary);
  }

  .topnav-link[aria-current="page"] {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .topnav-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .topnav-hamburger {
    display: none;
  }

  @media (max-width: 767px) {
    .topnav-links {
      display: none;
    }

    .topnav-hamburger {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-sm);
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      border-radius: var(--radius-md);
    }

    .topnav-hamburger:hover {
      background: var(--bg-elevated);
    }
  }
</style>

<nav aria-label="Main navigation" class="topnav">
  <a href="/" class="topnav-logo">AppName</a>
  <ul class="topnav-links">
    <li><a href="/dashboard" class="topnav-link" aria-current="page">Dashboard</a></li>
    <li><a href="/projects" class="topnav-link">Projects</a></li>
    <li><a href="/reports" class="topnav-link">Reports</a></li>
  </ul>
  <div style="flex: 1;"></div>
  <button class="topnav-hamburger" aria-expanded="false" aria-label="Toggle menu">
    <!-- Menu icon svg w=20 h=20 -->
  </button>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Fix to top with `z-sticky` (100) | Use `z-modal` or other inappropriate z-index |
| Keep height at 56px | Make the bar taller than 64px |
| Use `border-b-2 border-accent` for active link | Use background fill for active top nav links |
| Collapse to hamburger below 768px | Overflow links horizontally on mobile |
| Pair with `<main>` that has `padding-top: 56px` | Forget to offset page content for fixed nav |
| Use `aria-current="page"` on the active link | Mark multiple links as current simultaneously |

---

### 4.3 Breadcrumbs

**When to use.** Any page deeper than the second level of the navigation hierarchy. Shows the user where they are and provides quick access to parent routes. Always pair with a sidebar or top nav -- breadcrumbs supplement, never replace, primary navigation.

**Anatomy.**

| Part | Role |
|------|------|
| Container | `<nav>` landmark wrapping an `<ol>` |
| Breadcrumb item | Link to ancestor page |
| Separator | `/` character or chevron icon between items |
| Current page | Final item, plain text (not a link) |
| Overflow trigger | `...` button that opens a dropdown of hidden middle items |

**Variants.**

| Variant | Separator | Use |
|---------|-----------|-----|
| Slash | `/` character | Default, most compact |
| Chevron | `ChevronRight` icon | Visually richer, matches icon-heavy UIs |

**Truncation rule.** When there are more than 4 breadcrumb items, collapse the middle items into a single `...` dropdown. Always show the first item (root) and the last two items (parent + current).

**States.**

| State | Styles |
|-------|--------|
| Link (ancestor) | `text-text-secondary`, underline on hover |
| Current page | `text-text-primary`, no link, `font-weight: 500` |
| Hover (link) | `text-text-primary` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |

**Accessibility.**

- Container: `<nav aria-label="Breadcrumb">`
- List: `<ol>` (ordered list, represents hierarchy)
- Current page item: `aria-current="page"`
- Separators: decorative only, hidden from screen readers with `aria-hidden="true"`
- Overflow dropdown: `aria-label="Show more breadcrumbs"`, `aria-expanded`

**Tailwind + React example.**

```jsx
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

function Breadcrumbs({ items }) {
  const [showOverflow, setShowOverflow] = useState(false);

  const shouldTruncate = items.length > 4;
  const first = items[0];
  const middle = shouldTruncate ? items.slice(1, -2) : [];
  const visible = shouldTruncate
    ? [first, ...items.slice(-2)]
    : items;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-sm text-label">
        {visible.map((item, i) => {
          const isLast = shouldTruncate
            ? i === visible.length - 1
            : i === items.length - 1;

          return (
            <li key={item.href || item.label} className="flex items-center gap-sm">
              {/* Insert overflow trigger after first item */}
              {shouldTruncate && i === 1 && (
                <>
                  <div className="relative">
                    <button
                      onClick={() => setShowOverflow(!showOverflow)}
                      aria-label="Show more breadcrumbs"
                      aria-expanded={showOverflow}
                      className="p-xs rounded-ds-sm text-text-tertiary hover:text-text-primary hover:bg-bg-elevated"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {showOverflow && (
                      <ul className="absolute top-full left-0 mt-xs bg-bg-card border border-border rounded-ds-md shadow-ds-md py-xs min-w-[160px] z-dropdown">
                        {middle.map((m) => (
                          <li key={m.href}>
                            <a
                              href={m.href}
                              className="block px-md py-xs text-label text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                            >
                              {m.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted" aria-hidden="true" />
                </>
              )}

              {isLast ? (
                <span className="text-text-primary font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="text-text-secondary hover:text-text-primary transition-colors duration-micro">
                  {item.label}
                </a>
              )}

              {!isLast && (
                <ChevronRight className="w-4 h-4 text-text-muted" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--text-label);
    font-weight: var(--weight-label);
  }

  .breadcrumbs ol {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    list-style: none;
  }

  .breadcrumbs li {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .breadcrumb-link {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--duration-micro) var(--ease-default);
  }

  .breadcrumb-link:hover {
    color: var(--text-primary);
  }

  .breadcrumb-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  .breadcrumb-current {
    color: var(--text-primary);
    font-weight: var(--weight-label);
  }

  .breadcrumb-separator {
    color: var(--text-muted);
    user-select: none;
  }
</style>

<nav aria-label="Breadcrumb">
  <ol class="breadcrumbs">
    <li>
      <a href="/home" class="breadcrumb-link">Home</a>
      <span class="breadcrumb-separator" aria-hidden="true">/</span>
    </li>
    <li>
      <a href="/projects" class="breadcrumb-link">Projects</a>
      <span class="breadcrumb-separator" aria-hidden="true">/</span>
    </li>
    <li>
      <span class="breadcrumb-current" aria-current="page">Project Alpha</span>
    </li>
  </ol>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use `<nav aria-label="Breadcrumb">` with `<ol>` | Use `<div>` with `<span>` items |
| Make current page plain text, not a link | Link the current page to itself |
| Hide separators from screen readers with `aria-hidden` | Let screen readers announce every `/` character |
| Truncate middle items when > 4 levels | Show 8+ breadcrumb items in a single row |
| Place breadcrumbs below the top nav, above page content | Put breadcrumbs inside the sidebar |

---

### 4.4 Tabs

**When to use.** Switching between related views within the same context. Content in each panel should be peers -- not steps in a sequence (use Stepper for that).

**Anatomy.**

| Part | Role |
|------|------|
| Tab list | `role="tablist"` container with `aria-label` |
| Tab | `role="tab"` button, controls one panel |
| Tab panel | `role="tabpanel"` content area, shown when its tab is active |
| Active indicator | Underline border or pill background on the selected tab |

**Variants.**

| Variant | Active indicator | Use |
|---------|-----------------|-----|
| Underline | `border-bottom: 2px solid var(--accent)` + `text-accent` | Section switching within a page |
| Pill | `bg-accent text-text-on-accent rounded-ds-full` | View toggling (grid/list, day/week/month) |
| Vertical | `border-left: 2px solid var(--accent)` + `bg-accent-muted` | Settings pages, side panel navigation |

**States.**

| State | Underline variant | Pill variant |
|-------|-------------------|--------------|
| Default | `text-text-secondary`, transparent border | `text-text-secondary`, transparent bg |
| Hover | `text-text-primary` | `text-text-primary`, `bg-bg-elevated` |
| Selected | `text-accent`, `border-accent` | `bg-accent`, `text-text-on-accent` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` | Same |
| Disabled | `text-text-muted`, `pointer-events: none` | Same |

**Accessibility.**

- Tab list: `role="tablist"`, `aria-label` describing the tab group
- Each tab: `role="tab"`, `aria-selected="true|false"`, `aria-controls="panel-id"`, `tabindex="0"` on selected / `tabindex="-1"` on others
- Each panel: `role="tabpanel"`, `aria-labelledby="tab-id"`, `tabindex="0"`
- Keyboard: Left/Right arrows switch tabs (horizontal), Up/Down for vertical, `Home`/`End` for first/last
- Only the selected tab is in the tab order; arrow keys move between tabs (roving tabindex)

**Tailwind + React example.**

```jsx
import { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
];

function UnderlineTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleKeyDown = (e, index) => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActiveTab(tabs[next].id);
  };

  return (
    <div>
      <div role="tablist" aria-label="Content sections" className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`
              px-lg py-md text-label border-b-2 -mb-px
              transition-colors duration-micro ease-default
              ${activeTab === tab.id
                ? 'text-accent border-accent'
                : 'text-text-secondary border-transparent hover:text-text-primary'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={activeTab !== tab.id}
          className="p-xl"
        >
          {/* Panel content for {tab.label} */}
          <p className="text-body text-text-primary">Content for {tab.label} tab.</p>
        </div>
      ))}
    </div>
  );
}

function PillTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleKeyDown = (e, index) => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActiveTab(tabs[next].id);
  };

  return (
    <div role="tablist" aria-label="View options" className="inline-flex gap-xs bg-bg-elevated rounded-ds-full p-2xs">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          role="tab"
          id={`pill-tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`pill-panel-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={() => setActiveTab(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`
            px-lg py-xs text-label rounded-ds-full
            transition-all duration-micro ease-default
            ${activeTab === tab.id
              ? 'bg-accent text-text-on-accent shadow-ds-sm'
              : 'text-text-secondary hover:text-text-primary'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  /* Underline tabs */
  .tab-list {
    display: flex;
    border-bottom: 1px solid var(--border);
  }

  .tab-button {
    padding: var(--space-md) var(--space-lg);
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    cursor: pointer;
    transition: color var(--duration-micro) var(--ease-default),
                border-color var(--duration-micro) var(--ease-default);
  }

  .tab-button:hover {
    color: var(--text-primary);
  }

  .tab-button[aria-selected="true"] {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .tab-button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  .tab-panel {
    padding: var(--space-xl);
  }

  .tab-panel[hidden] {
    display: none;
  }

  /* Pill tabs */
  .tab-list-pill {
    display: inline-flex;
    gap: var(--space-xs);
    background: var(--bg-elevated);
    border-radius: var(--radius-full);
    padding: var(--space-2xs);
  }

  .tab-pill {
    padding: var(--space-xs) var(--space-lg);
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    background: none;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all var(--duration-micro) var(--ease-default);
  }

  .tab-pill:hover {
    color: var(--text-primary);
  }

  .tab-pill[aria-selected="true"] {
    background: var(--accent);
    color: var(--text-on-accent);
    box-shadow: var(--shadow-sm);
  }
</style>

<!-- Underline tabs -->
<div role="tablist" aria-label="Content sections" class="tab-list">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1" tabindex="0" class="tab-button">Overview</button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1" class="tab-button">Activity</button>
  <button role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3" tabindex="-1" class="tab-button">Settings</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0" class="tab-panel">
  <p>Overview content.</p>
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" class="tab-panel" hidden>
  <p>Activity content.</p>
</div>
<div role="tabpanel" id="panel-3" aria-labelledby="tab-3" tabindex="0" class="tab-panel" hidden>
  <p>Settings content.</p>
</div>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use roving `tabindex` (0 on selected, -1 on others) | Put all tabs in the Tab order |
| Connect tabs to panels with `aria-controls` / `aria-labelledby` | Leave tabs and panels unlinked |
| Use arrow keys to switch between tabs | Require Tab key to move between tabs |
| Show only one panel at a time | Render all panels visible with accordion-style toggle |
| Use underline for section switching, pill for view toggling | Mix variants within the same tab group |

---

### 4.5 Pagination

**When to use.** Navigating through pages of list or table data. Use full numbered pagination for datasets where the user benefits from jumping to a specific page. Use compact pagination for simpler "next/previous" flows.

**Anatomy.**

| Part | Role |
|------|------|
| Container | `<nav>` landmark with `aria-label="Pagination"` |
| Previous button | Navigates to the previous page |
| Page numbers | Direct links to specific pages |
| Ellipsis | `...` indicating truncated page range |
| Next button | Navigates to the next page |
| Active page | Highlighted current page number |

**Variants.**

| Variant | Content | Use |
|---------|---------|-----|
| Full numbered | `1 2 3 ... 10` with page buttons | Tables, data-heavy lists |
| Compact | `Previous` / `Next` with optional page indicator | Simple lists, mobile |

**Truncation rule (full numbered).** When total pages exceed 7, show: first page, current +/- 1 neighbor, last page, with `...` filling gaps. Example for page 5 of 20: `1 ... 4 5 6 ... 20`.

**States.**

| State | Styles |
|-------|--------|
| Default page | `text-text-secondary`, `bg-transparent` |
| Hover | `bg-bg-elevated`, `text-text-primary` |
| Active / current | `bg-accent`, `text-text-on-accent` |
| Disabled (prev on first page, next on last) | `text-text-muted`, `pointer-events: none`, `opacity: 0.5` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |

**Accessibility.**

- Container: `<nav aria-label="Pagination">`
- Active page: `aria-current="page"`
- Previous/Next: `aria-label="Go to previous page"` / `aria-label="Go to next page"`
- Disabled buttons: `aria-disabled="true"` (preferred over removing from DOM)
- Each page number: `aria-label="Go to page N"`

**Tailwind + React example.**

```jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  return (
    <nav aria-label="Pagination" className="flex items-center gap-xs">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        aria-disabled={currentPage === 1}
        className={`
          p-sm rounded-ds-md transition-colors duration-micro
          ${currentPage === 1
            ? 'text-text-muted opacity-50 pointer-events-none'
            : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
          }
        `}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-sm text-text-muted">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Go to page ${page}`}
            className={`
              w-[36px] h-[36px] rounded-ds-md text-label
              flex items-center justify-center
              transition-colors duration-micro
              ${page === currentPage
                ? 'bg-accent text-text-on-accent'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
              }
            `}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        aria-disabled={currentPage === totalPages}
        className={`
          p-sm rounded-ds-md transition-colors duration-micro
          ${currentPage === totalPages
            ? 'text-text-muted opacity-50 pointer-events-none'
            : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
          }
        `}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .pagination {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }

  .pagination-btn:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
  }

  .pagination-btn[aria-current="page"] {
    background: var(--accent);
    color: var(--text-on-accent);
  }

  .pagination-btn:disabled,
  .pagination-btn[aria-disabled="true"] {
    color: var(--text-muted);
    opacity: 0.5;
    pointer-events: none;
  }

  .pagination-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .pagination-ellipsis {
    padding: 0 var(--space-sm);
    color: var(--text-muted);
  }
</style>

<nav aria-label="Pagination" class="pagination">
  <button class="pagination-btn" aria-label="Go to previous page" aria-disabled="true" disabled>
    <!-- ChevronLeft icon svg w=20 h=20 -->
  </button>
  <button class="pagination-btn" aria-current="page" aria-label="Go to page 1">1</button>
  <button class="pagination-btn" aria-label="Go to page 2">2</button>
  <button class="pagination-btn" aria-label="Go to page 3">3</button>
  <span class="pagination-ellipsis">...</span>
  <button class="pagination-btn" aria-label="Go to page 10">10</button>
  <button class="pagination-btn" aria-label="Go to next page">
    <!-- ChevronRight icon svg w=20 h=20 -->
  </button>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Truncate with `...` when > 7 pages | Show all 50 page buttons in a row |
| Disable Previous on page 1, Next on last page | Remove the buttons entirely |
| Use `aria-current="page"` on the active page button | Mark the active page with only visual style |
| Provide `aria-label` on every page button | Rely on the number alone for screen readers |
| Use compact variant on mobile | Force full numbered pagination on small screens |

---

### 4.6 Stepper / Wizard

**When to use.** Multi-step processes such as onboarding, checkout, form wizards, or setup flows. Shows progress and allows users to understand where they are in a sequence. Use when steps must be completed in order and the process has clear phases.

**Anatomy.**

| Part | Role |
|------|------|
| Container | Wrapper with `aria-label="Progress"` |
| Step indicator | Numbered circle or checkmark showing step state |
| Step label | Text below (horizontal) or beside (vertical) the indicator |
| Connector line | Visual line between step indicators |
| Step content | (Vertical only) Collapsible content area for each step |

**Variants.**

| Variant | Layout | Use |
|---------|--------|-----|
| Horizontal | Circles + lines in a row, labels below | Top of page, checkout flows |
| Vertical | Stacked circles + lines, content to the right | Multi-form wizards, settings onboarding |

**Step states.**

| State | Indicator | Label |
|-------|-----------|-------|
| Completed | Checkmark icon, `bg-success`, `text-white` circle | `text-text-primary` |
| Current | Step number, `border: 2px solid var(--accent)`, `text-accent` | `text-text-primary`, `font-weight: 600` |
| Upcoming | Step number, `border: 1px solid var(--border)`, `text-text-muted` | `text-text-muted` |
| Error | `!` icon, `bg-error`, `text-white` circle | `text-error` |

**Accessibility.**

- Container: `aria-label="Progress"` or descriptive label like `"Checkout progress"`
- Current step: `aria-current="step"`
- Each step: text label is the accessible name
- Completed steps can be buttons (allowing navigation back), upcoming steps are inert
- Validation: block the "Next" button until the current step form is valid; announce errors with `aria-live="polite"`

**Tailwind + React example.**

```jsx
import { Check } from 'lucide-react';

const steps = [
  { id: 'account', label: 'Account' },
  { id: 'profile', label: 'Profile' },
  { id: 'review', label: 'Review' },
];

function HorizontalStepper({ currentStep, completedSteps = [] }) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isUpcoming = !isCompleted && !isCurrent;
          const isLast = i === steps.length - 1;

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-sm">
                {/* Step circle */}
                <div
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`
                    w-[32px] h-[32px] rounded-full flex items-center justify-center text-label
                    ${isCompleted
                      ? 'bg-success text-white'
                      : isCurrent
                        ? 'border-2 border-accent text-accent bg-transparent'
                        : 'border border-border text-text-muted bg-transparent'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                {/* Step label */}
                <span
                  className={`
                    text-caption
                    ${isCompleted || isCurrent ? 'text-text-primary' : 'text-text-muted'}
                    ${isCurrent ? 'font-semibold' : ''}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`
                    w-[64px] h-[2px] mx-md
                    ${isCompleted ? 'bg-success' : 'bg-border'}
                  `}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .stepper {
    display: flex;
    align-items: flex-start;
  }

  .stepper-step {
    display: flex;
    align-items: center;
  }

  .stepper-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
  }

  .stepper-circle {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-label);
    font-weight: var(--weight-label);
  }

  .stepper-circle.completed {
    background: var(--success);
    color: #ffffff;
  }

  .stepper-circle.current {
    border: 2px solid var(--accent);
    color: var(--accent);
    background: transparent;
  }

  .stepper-circle.upcoming {
    border: 1px solid var(--border);
    color: var(--text-muted);
    background: transparent;
  }

  .stepper-label {
    font-size: var(--text-caption);
    font-weight: var(--weight-caption);
  }

  .stepper-label.active {
    color: var(--text-primary);
    font-weight: var(--weight-label);
  }

  .stepper-label.muted {
    color: var(--text-muted);
  }

  .stepper-connector {
    width: 64px;
    height: 2px;
    margin: 0 var(--space-md);
    margin-top: 15px; /* center with circle */
  }

  .stepper-connector.done {
    background: var(--success);
  }

  .stepper-connector.pending {
    background: var(--border);
  }
</style>

<nav aria-label="Progress">
  <ol class="stepper" style="list-style: none;">
    <li class="stepper-step">
      <div class="stepper-indicator">
        <div class="stepper-circle completed">
          <!-- Check icon svg w=16 h=16 -->
        </div>
        <span class="stepper-label active">Account</span>
      </div>
      <div class="stepper-connector done"></div>
    </li>
    <li class="stepper-step">
      <div class="stepper-indicator">
        <div class="stepper-circle current" aria-current="step">2</div>
        <span class="stepper-label active">Profile</span>
      </div>
      <div class="stepper-connector pending"></div>
    </li>
    <li class="stepper-step">
      <div class="stepper-indicator">
        <div class="stepper-circle upcoming">3</div>
        <span class="stepper-label muted">Review</span>
      </div>
    </li>
  </ol>
</nav>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Allow navigation back to completed steps | Lock completed steps from being revisited |
| Validate the current step before allowing "Next" | Let users skip ahead without completing required fields |
| Use `aria-current="step"` on the current step | Rely solely on color to indicate current vs. upcoming |
| Show a checkmark for completed steps | Keep the number visible after completion |
| Use horizontal for 3-5 steps, vertical for more | Cram 8+ steps into a horizontal stepper |

---

### 4.7 Segmented Control

**When to use.** Inline toggle between 2-4 mutually exclusive options. Unlike tabs, a segmented control does not switch large content panels -- it adjusts a parameter within the current view (e.g., time range, view mode, unit system).

**Anatomy.**

| Part | Role |
|------|------|
| Container | `role="radiogroup"` wrapper with `aria-label` |
| Segment | `role="radio"` button, one per option |
| Selected indicator | Background + shadow on the active segment |

**Variants.**

| Variant | Options | Use |
|---------|---------|-----|
| Compact | 2 options | Simple binary toggles (on/off not suited for switch) |
| Standard | 3-4 options | View mode, time range, unit selection |

**States.**

| State | Styles |
|-------|--------|
| Default (unselected) | `text-text-secondary`, transparent background |
| Hover (unselected) | `text-text-primary` |
| Selected | `bg-bg-card`, `shadow-ds-sm`, `text-text-primary`, `rounded-ds-md` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Disabled | `text-text-muted`, `opacity: 0.5`, `pointer-events: none` |

**Accessibility.**

- Container: `role="radiogroup"`, `aria-label` describing the choice
- Each segment: `role="radio"`, `aria-checked="true|false"`
- Selected segment: `tabindex="0"`, others: `tabindex="-1"` (roving tabindex)
- Keyboard: Left/Right arrows switch selection; selection changes immediately
- Label each option clearly; avoid icon-only segments without `aria-label`

**Tailwind + React example.**

```jsx
import { useState } from 'react';

const options = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
];

function SegmentedControl() {
  const [selected, setSelected] = useState('week');

  const handleKeyDown = (e, index) => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % options.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + options.length) % options.length;
    else return;
    e.preventDefault();
    setSelected(options[next].id);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Time range"
      className="inline-flex bg-bg-elevated rounded-ds-lg p-2xs"
    >
      {options.map((option, i) => (
        <button
          key={option.id}
          role="radio"
          aria-checked={selected === option.id}
          tabIndex={selected === option.id ? 0 : -1}
          onClick={() => setSelected(option.id)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`
            px-lg py-xs text-label rounded-ds-md
            transition-all duration-micro ease-default
            ${selected === option.id
              ? 'bg-bg-card shadow-ds-sm text-text-primary'
              : 'text-text-secondary hover:text-text-primary'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .segmented-control {
    display: inline-flex;
    background: var(--bg-elevated);
    border-radius: var(--radius-lg);
    padding: var(--space-2xs);
  }

  .segment {
    padding: var(--space-xs) var(--space-lg);
    font-size: var(--text-label);
    font-weight: var(--weight-label);
    color: var(--text-secondary);
    background: none;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--duration-micro) var(--ease-default);
  }

  .segment:hover {
    color: var(--text-primary);
  }

  .segment[aria-checked="true"] {
    background: var(--bg-card);
    color: var(--text-primary);
    box-shadow: var(--shadow-sm);
  }

  .segment:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .segment:disabled {
    color: var(--text-muted);
    opacity: 0.5;
    pointer-events: none;
  }
</style>

<div role="radiogroup" aria-label="Time range" class="segmented-control">
  <button role="radio" aria-checked="false" tabindex="-1" class="segment">Day</button>
  <button role="radio" aria-checked="true" tabindex="0" class="segment">Week</button>
  <button role="radio" aria-checked="false" tabindex="-1" class="segment">Month</button>
</div>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use `role="radiogroup"` + `role="radio"` | Use `role="tablist"` (segmented controls are not tabs) |
| Limit to 2-4 options | Cram 5+ options into a segmented control |
| Apply selection immediately on click/arrow | Require a "confirm" step after selection |
| Use roving tabindex for arrow key navigation | Put all segments in the tab order |
| Provide text labels on every segment | Use icon-only segments without `aria-label` |

---

### 4.8 Sticky Section Header

**When to use.** Long scrollable pages with distinct sections -- settings pages, long forms, data-heavy layouts, documentation. The header stays visible as the user scrolls through the section, providing persistent context.

**Anatomy.**

| Part | Role |
|------|------|
| Header bar | `position: sticky` element at the top of the section |
| Title | Section heading text |
| Optional actions | Buttons or links aligned to the right |
| Shadow indicator | Bottom shadow appears once the header is "stuck" |

**Variants.**

| Variant | Content | Use |
|---------|---------|-----|
| Simple | Title only | Section labeling in long forms |
| With actions | Title + right-aligned action buttons | Settings sections with save/reset |
| With count | Title + badge count | List sections showing filtered total |

**States.**

| State | Styles |
|-------|--------|
| Default (not stuck) | `bg-bg-primary`, no shadow |
| Stuck (scrolled) | `bg-bg-primary`, `shadow-ds-sm` bottom edge |

**Implementation notes.**

- Use `position: sticky; top: 0;` (or `top: 56px` if below a fixed top nav)
- `z-index: var(--z-sticky)` to stay above scrollable content
- Background must be opaque (`bg-bg-primary`) so content scrolls behind cleanly
- Shadow can be toggled via an `IntersectionObserver` or a CSS-only approach using a pseudo-element

**Accessibility.**

- Use an appropriate heading level (`<h2>`, `<h3>`, etc.) matching the document hierarchy
- The sticky behavior is purely visual; it does not change the DOM or reading order
- If the header contains actions, ensure they are keyboard-reachable

**Tailwind + React example.**

```jsx
import { useRef, useState, useEffect } from 'react';

function StickyHeader({ title, children, actions }) {
  const sentinelRef = useRef(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 1.0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <section>
      {/* Sentinel element to detect when header becomes stuck */}
      <div ref={sentinelRef} className="h-0" />

      <div
        className={`
          sticky top-0 z-sticky bg-bg-primary
          flex items-center justify-between
          px-xl py-md border-b border-border
          transition-shadow duration-micro
          ${isStuck ? 'shadow-ds-sm' : ''}
        `}
      >
        <h2 className="text-h3 text-text-primary">{title}</h2>
        {actions && <div className="flex items-center gap-sm">{actions}</div>}
      </div>

      <div className="p-xl">{children}</div>
    </section>
  );
}
```

**Plain CSS + HTML example.**

```html
<style>
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md) var(--space-xl);
    border-bottom: 1px solid var(--border);
    transition: box-shadow var(--duration-micro) var(--ease-default);
  }

  .sticky-header.stuck {
    box-shadow: var(--shadow-sm);
  }

  .sticky-header h2 {
    font-size: var(--text-h3);
    font-weight: var(--weight-h3);
    color: var(--text-primary);
    margin: 0;
  }

  .sticky-header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* If below a fixed 56px top nav, offset the sticky position */
  .has-topnav .sticky-header {
    top: 56px;
  }
</style>

<section>
  <div class="sticky-header" id="section-header">
    <h2>Account Settings</h2>
    <div class="sticky-header-actions">
      <button class="btn-default">Reset</button>
      <button class="btn-primary">Save</button>
    </div>
  </div>
  <div style="padding: var(--space-xl);">
    <!-- Long section content -->
  </div>
</section>

<script>
  // Toggle .stuck class via IntersectionObserver
  const sentinel = document.createElement('div');
  const header = document.getElementById('section-header');
  header.parentElement.insertBefore(sentinel, header);

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('stuck', !entry.isIntersecting),
    { threshold: 1.0 }
  );
  observer.observe(sentinel);
</script>
```

**Do / Don't.**

| Do | Don't |
|----|-------|
| Use `position: sticky` with `top: 0` | Use `position: fixed` (removes element from flow) |
| Set `z-index: var(--z-sticky)` | Use a z-index higher than modals or toasts |
| Use opaque background matching the page | Use transparent or semi-transparent background |
| Add shadow only when stuck (via JS observer) | Show shadow permanently even when not scrolled |
| Offset `top` value if used below a fixed nav bar | Forget the nav bar height, causing overlap |
| Use a semantic heading element (`<h2>`, `<h3>`) | Use a `<div>` or `<span>` for the title text |
