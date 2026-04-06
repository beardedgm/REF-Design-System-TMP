## Overlays

Overlays are components that appear above the main page content, dimming or blocking interaction with the layer beneath. They range from heavyweight (modals, drawers) to lightweight (tooltips). Every overlay in the system traps or manages focus, respects `Escape` to close, and returns focus to the trigger element on dismissal.

**Shared tokens used across all overlays:**

| Token | Role |
|-------|------|
| `--bg-overlay` | Backdrop fill behind modals and drawers |
| `--bg-card` | Surface for overlay panels |
| `--border` | Panel border |
| `--shadow-lg` | Elevation shadow for overlay panels |
| `--z-modal` (`1000`) | Z-index for modals and drawers |
| `--z-dropdown` (`50`) | Z-index for menus, popovers, tooltips |
| `--z-overlay` (`900`) | Z-index for backdrops |
| `--duration-standard` (`200ms`) | Default transition duration |
| `--duration-emphasis` (`300ms`) | Drawer slide duration |
| `--duration-micro` (`150ms`) | Tooltip and fast exit duration |
| `--ease-default` (`ease`) | Easing for all overlay motion |

---

### 6.1 Modal / Dialog

Use modals for focused interactions that require a decision before returning to the page -- confirmations, forms, detail views. A modal blocks all interaction with the page beneath it.

#### Anatomy

```
Backdrop  (fixed, full-screen, bg-overlay)
  Panel  (centered, bg-card, border, shadow-lg, rounded-lg)
    Header  (border-bottom, p-xl)
      Title  (text-h3, text-primary)
      Close button  (icon-only, X icon, top-right)
    Body  (p-xl, scrollable when content overflows)
    Footer  (border-top, p-xl, flex justify-end gap-md)
      Secondary button
      Primary button
```

#### Variants

| Variant | Max-width | Use case |
|---------|-----------|----------|
| `sm` | `400px` | Confirmations, simple alerts |
| `md` | `520px` | Forms, detail views (default) |
| `lg` | `640px` | Multi-step flows, rich content |

#### States

| State | Behavior |
|-------|----------|
| Opening | Backdrop fades in. Panel plays `scale-in` animation (`200ms ease`). |
| Open | Focus trapped inside panel. Page scroll locked. |
| Closing | Panel plays `scale-out` (`150ms ease`). Backdrop fades out. Focus returns to trigger. |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Role | `role="dialog"` on the panel |
| Modal flag | `aria-modal="true"` |
| Label | `aria-labelledby` pointing to the title element's `id` |
| Description | `aria-describedby` pointing to the body element's `id` (optional) |
| Focus trap | First focusable element receives focus on open. `Tab` / `Shift+Tab` cycle within the panel. |
| Escape | Closes the modal and returns focus to the trigger |
| Click outside | Closes the modal (unless explicitly prevented for destructive flows) |
| Screen reader | Announce as dialog with title. Backdrop content is inert (`inert` attribute on siblings). |

#### Tailwind + React

```jsx
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const SIZES = {
  sm: 'max-w-[400px]',
  md: 'max-w-[520px]',
  lg: 'max-w-[640px]',
};

function Modal({ open, onClose, title, size = 'md', children, footer }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      panelRef.current?.querySelector('button, [href], input, select, textarea')?.focus();
    }
    return () => {
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-overlay flex items-center justify-center p-xl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-overlay animate-[fade-in-up_200ms_ease]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
        className={`
          relative z-modal w-full ${SIZES[size]}
          bg-bg-card border border-border rounded-ds-lg shadow-ds-lg
          animate-[scale-in_200ms_ease]
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-xl border-b border-border">
          <h2 id="modal-title" className="text-h3 text-text-primary font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-micro"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div id="modal-body" className="p-xl overflow-y-auto max-h-[60vh]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-md p-xl border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: var(--bg-overlay);
    z-index: var(--z-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-xl);
    animation: fade-in-up var(--duration-standard) var(--ease-default);
  }

  .modal-panel {
    position: relative;
    z-index: var(--z-modal);
    width: 100%;
    max-width: 520px; /* md — swap to 400px for sm, 640px for lg */
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    animation: scale-in var(--duration-standard) var(--ease-default);
  }

  .modal-panel.closing {
    animation: scale-out var(--duration-micro) var(--ease-default) forwards;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xl);
    border-bottom: 1px solid var(--border);
  }

  .modal-title {
    font-size: var(--text-h3);
    font-weight: var(--weight-h3);
    color: var(--text-primary);
  }

  .modal-body {
    padding: var(--space-xl);
    overflow-y: auto;
    max-height: 60vh;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    padding: var(--space-xl);
    border-top: 1px solid var(--border);
  }
</style>

<div class="modal-backdrop" role="presentation">
  <div
    class="modal-panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-body"
  >
    <div class="modal-header">
      <h2 class="modal-title" id="modal-title">Confirm action</h2>
      <button aria-label="Close dialog">&times;</button>
    </div>
    <div class="modal-body" id="modal-body">
      <p>Are you sure you want to continue? This action cannot be undone.</p>
    </div>
    <div class="modal-footer">
      <button class="btn-default">Cancel</button>
      <button class="btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Return focus to the trigger element on close | Leave focus stranded on the backdrop |
| Use `sm` for simple confirmations | Use `lg` when content fits in `md` |
| Lock body scroll while open | Allow page to scroll behind the modal |
| Provide both close button and Escape key | Require only click-outside to dismiss |
| Keep the footer pinned when body scrolls | Let action buttons scroll out of view |

---

### 6.2 Drawer / Slide-over

Use drawers for contextual panels that slide in from a screen edge -- detail views, settings, mobile navigation, or multi-field forms that benefit from more vertical space than a modal provides.

#### Anatomy

```
Backdrop  (fixed, full-screen, bg-overlay)
  Panel  (fixed, edge-anchored, full-height, bg-card, border, shadow-lg)
    Header  (border-bottom, p-xl)
      Title  (text-h3, text-primary)
      Close button  (X icon, top-right)
    Body  (p-xl, flex-1, overflow-y-auto)
    Footer  (optional, border-top, p-xl)
```

#### Variants

| Variant | Width | Use case |
|---------|-------|----------|
| `sm` | `320px` | Notification panels, quick details |
| `md` | `400px` | Settings, detail views (default) |
| `lg` | `560px` | Forms, multi-section editors |
| `full` | `100%` | Mobile navigation, full-screen takeover |

| Direction | Animation |
|-----------|-----------|
| `right` (default) | `slide-in-right` / `slide-out-right` |
| `left` | `slide-in-left` / `slide-out-left` |

#### States

| State | Behavior |
|-------|----------|
| Opening | Backdrop fades in. Panel plays `slide-in-right` (`300ms ease`). |
| Open | Focus trapped inside panel. Page scroll locked. |
| Closing | Panel plays `slide-out-right` (`200ms ease`). Backdrop fades out. Focus returns to trigger. |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Role | `role="dialog"` on the panel |
| Modal flag | `aria-modal="true"` |
| Label | `aria-labelledby` pointing to the drawer title's `id` |
| Focus trap | First focusable element receives focus on open. `Tab` cycles within. |
| Escape | Closes the drawer and returns focus to the trigger |
| Click outside | Clicking the backdrop closes the drawer |
| Screen reader | Announce as dialog. Sibling content marked `inert`. |

#### Tailwind + React

```jsx
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const WIDTHS = {
  sm: 'w-[320px]',
  md: 'w-[400px]',
  lg: 'w-[560px]',
  full: 'w-full',
};

const DIRECTIONS = {
  right: {
    position: 'right-0',
    enter: 'animate-[slide-in-right_300ms_ease]',
    exit: 'animate-[slide-out-right_200ms_ease_forwards]',
  },
  left: {
    position: 'left-0',
    enter: 'animate-[slide-in-left_300ms_ease]',
    exit: 'animate-[slide-out-left_200ms_ease_forwards]',
  },
};

function Drawer({ open, onClose, title, size = 'md', direction = 'right', children, footer }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      panelRef.current?.querySelector('button, [href], input, select, textarea')?.focus();
    }
    return () => {
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const dir = DIRECTIONS[direction];

  return (
    <div className="fixed inset-0 z-overlay">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-overlay animate-[fade-in-up_200ms_ease]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`
          fixed top-0 ${dir.position} h-full ${WIDTHS[size]}
          bg-bg-card border-l border-border shadow-ds-lg
          flex flex-col z-modal ${dir.enter}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-xl border-b border-border shrink-0">
          <h2 id="drawer-title" className="text-h3 text-text-primary font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-micro"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-xl">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-md p-xl border-t border-border shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: var(--bg-overlay);
    z-index: var(--z-overlay);
    animation: fade-in-up var(--duration-standard) var(--ease-default);
  }

  .drawer-panel {
    position: fixed;
    top: 0;
    right: 0; /* swap to left: 0 for left direction */
    height: 100%;
    width: 400px; /* sm: 320px, lg: 560px, full: 100% */
    background: var(--bg-card);
    border-left: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-modal);
    display: flex;
    flex-direction: column;
    animation: slide-in-right var(--duration-emphasis) var(--ease-default);
  }

  .drawer-panel.left {
    right: auto;
    left: 0;
    border-left: none;
    border-right: 1px solid var(--border);
    animation-name: slide-in-left;
  }

  .drawer-panel.closing {
    animation: slide-out-right var(--duration-standard) var(--ease-default) forwards;
  }

  .drawer-panel.left.closing {
    animation-name: slide-out-left;
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xl);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .drawer-title {
    font-size: var(--text-h3);
    font-weight: var(--weight-h3);
    color: var(--text-primary);
  }

  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-xl);
  }

  .drawer-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    padding: var(--space-xl);
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
</style>

<div class="drawer-backdrop" role="presentation">
  <div
    class="drawer-panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="drawer-title"
  >
    <div class="drawer-header">
      <h2 class="drawer-title" id="drawer-title">User details</h2>
      <button aria-label="Close drawer">&times;</button>
    </div>
    <div class="drawer-body">
      <p>Drawer content goes here. Scrolls when content overflows.</p>
    </div>
    <div class="drawer-footer">
      <button class="btn-default">Cancel</button>
      <button class="btn-primary">Save</button>
    </div>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use `right` direction for detail/settings panels | Open drawers from the right for primary navigation |
| Use `left` direction for navigation drawers | Use `full` width on desktop -- reserve for mobile |
| Keep the header pinned so the title stays visible | Hide the close button |
| Provide a backdrop to indicate modal context | Open a drawer without blocking page interaction |
| Return focus to the trigger on close | Leave focus inside the now-hidden drawer |

---

### 6.3 Dropdown Menu

Use dropdown menus for contextual action lists triggered by a button -- "More actions", profile menus, sort options. Items are non-navigational actions (use links or routing for navigation).

#### Anatomy

```
Trigger button  (aria-haspopup="menu", aria-expanded)
  Menu panel  (role="menu", bg-card, border, shadow-lg, rounded-md)
    Menu group (optional label)
      Menu item  (role="menuitem", icon? + label + shortcut?)
      Menu item
    Divider  (border-t, mx-sm)
    Menu group
      Menu item
```

#### Variants

| Variant | Description |
|---------|-------------|
| Simple | Label-only items |
| With icons | Icon left-aligned before label |
| With shortcuts | Keyboard shortcut hint right-aligned in `text-tertiary` |
| Grouped | Logical sections separated by dividers |
| Nested | Submenu opens on hover or arrow-right |
| Danger item | `text-error` color for destructive actions |

#### States

| State | Visual |
|-------|--------|
| Default item | `text-text-primary` on `bg-bg-card` |
| Hover / focus | `bg-bg-elevated`, `text-text-primary` |
| Active (pressed) | `bg-accent-muted`, `text-accent` |
| Disabled | `text-text-muted`, `pointer-events: none` |
| Danger item | `text-error`, hover: `bg-error-muted` |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Trigger | `aria-haspopup="menu"`, `aria-expanded="true/false"` |
| Menu | `role="menu"` |
| Items | `role="menuitem"` on each item |
| Disabled | `aria-disabled="true"` on disabled items |
| Keyboard | `ArrowDown` / `ArrowUp` navigate items. `Enter` / `Space` select. `Escape` closes. `Home` / `End` jump to first/last. |
| Nested menus | `ArrowRight` opens submenu, `ArrowLeft` closes and returns to parent |
| Focus | Focus moves to the first item when opened. Returns to trigger on close. |
| Screen reader | Announces menu role and item count |

#### Tailwind + React

```jsx
import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

function DropdownMenu({ trigger, items, groups }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector('[role="menuitem"]')?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const flatItems = groups
    ? groups.flatMap((g) => g.items)
    : items;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % flatItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(flatItems.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        flatItems[activeIndex]?.onSelect?.();
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          onKeyDown={handleKeyDown}
          className="
            absolute top-full mt-xs right-0
            min-w-[180px] py-xs
            bg-bg-card border border-border rounded-ds-md shadow-ds-lg
            z-dropdown animate-[fade-in-up_150ms_ease]
          "
        >
          {(groups || [{ items }]).map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="border-t border-border mx-sm my-xs" />}
              {group.label && (
                <span className="block px-lg py-xs text-overline text-text-tertiary">
                  {group.label}
                </span>
              )}
              {group.items.map((item, ii) => (
                <button
                  key={ii}
                  role="menuitem"
                  aria-disabled={item.disabled || undefined}
                  tabIndex={-1}
                  onClick={() => {
                    item.onSelect?.();
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={`
                    w-full flex items-center gap-md px-lg py-sm text-body
                    transition-colors duration-micro
                    ${item.danger ? 'text-error hover:bg-error-muted' : 'text-text-primary hover:bg-bg-elevated'}
                    ${item.disabled ? 'text-text-muted pointer-events-none' : ''}
                  `}
                >
                  {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <span className="text-caption text-text-tertiary ml-xl">{item.shortcut}</span>
                  )}
                  {item.hasSubmenu && <ChevronRight className="w-4 h-4 text-text-tertiary" />}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .dropdown-wrapper {
    position: relative;
    display: inline-block;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: var(--space-xs);
    min-width: 180px;
    padding: var(--space-xs) 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-dropdown);
    animation: fade-in-up var(--duration-micro) var(--ease-default);
  }

  .dropdown-menu[hidden] {
    display: none;
  }

  .dropdown-group-label {
    display: block;
    padding: var(--space-xs) var(--space-lg);
    font-size: var(--text-overline);
    font-weight: var(--weight-overline);
    letter-spacing: var(--ls-overline);
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .dropdown-divider {
    border-top: 1px solid var(--border);
    margin: var(--space-xs) var(--space-sm);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    width: 100%;
    padding: var(--space-sm) var(--space-lg);
    background: none;
    border: none;
    font-size: var(--text-body);
    color: var(--text-primary);
    cursor: pointer;
    transition: background var(--duration-micro) var(--ease-default);
  }

  .dropdown-item:hover,
  .dropdown-item:focus-visible {
    background: var(--bg-elevated);
  }

  .dropdown-item.danger {
    color: var(--error);
  }

  .dropdown-item.danger:hover {
    background: var(--error-muted);
  }

  .dropdown-item[aria-disabled="true"] {
    color: var(--text-muted);
    pointer-events: none;
  }

  .dropdown-item .shortcut {
    margin-left: auto;
    font-size: var(--text-caption);
    color: var(--text-tertiary);
  }
</style>

<div class="dropdown-wrapper">
  <button aria-haspopup="menu" aria-expanded="false" id="menu-trigger">
    Actions
  </button>
  <div class="dropdown-menu" role="menu" aria-labelledby="menu-trigger" hidden>
    <button class="dropdown-item" role="menuitem">
      Edit <span class="shortcut">Ctrl+E</span>
    </button>
    <button class="dropdown-item" role="menuitem">
      Duplicate <span class="shortcut">Ctrl+D</span>
    </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item danger" role="menuitem">
      Delete <span class="shortcut">Del</span>
    </button>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Place destructive actions last, separated by a divider | Mix danger items randomly among safe items |
| Show keyboard shortcuts in `text-tertiary` | Use shortcuts as the only way to discover an action |
| Auto-flip the menu when near viewport edges | Let the menu clip or overflow off-screen |
| Close the menu after an item is selected | Leave the menu open after selection |
| Use `role="menuitem"` on every actionable item | Use `role="option"` -- that belongs to listboxes |

---

### 6.4 Popover

Use popovers for rich interactive content that appears near a trigger -- filter panels, mini-forms, rich previews, or any overlay that contains buttons, links, or inputs. Popovers are like tooltips but interactive: they open on click (not hover) and can receive focus.

#### Anatomy

```
Trigger  (button or link, aria-haspopup="dialog")
  Popover panel  (bg-card, border, shadow-lg, rounded-lg)
    Arrow  (optional, CSS triangle matching bg-card)
    Content  (any interactive content: forms, links, buttons)
```

#### Variants

| Variant | Description |
|---------|-------------|
| Default | Content panel with no arrow |
| With arrow | CSS triangle pointing to trigger |
| Filter panel | Checkbox/radio list with "Apply" button |
| Mini-form | Inline form fields with submit |
| Rich preview | Thumbnail, title, description, link |

#### Positions

| Position | Placement | Arrow direction |
|----------|-----------|-----------------|
| `top` | Above trigger, centered | Points down |
| `bottom` | Below trigger, centered (default) | Points up |
| `left` | Left of trigger, vertically centered | Points right |
| `right` | Right of trigger, vertically centered | Points left |

Auto-flip: if there is not enough space in the preferred direction, flip to the opposite side.

#### States

| State | Behavior |
|-------|----------|
| Closed | Hidden, no DOM presence or `display: none` |
| Opening | Appears with `fade-in-up` (`150ms ease`) |
| Open | Receives focus. Click-outside or `Escape` closes. |
| Closing | Fades out (`150ms ease`). Focus returns to trigger. |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Trigger | `aria-haspopup="dialog"`, `aria-expanded="true/false"` |
| Panel | No specific role needed unless it functions as a dialog; use `role="dialog"` + `aria-label` for complex forms |
| Focus management | Move focus into the popover on open. Return to trigger on close. |
| Escape | Closes the popover |
| Click outside | Closes the popover |
| Screen reader | Trigger announces expanded state |

#### Tailwind + React

```jsx
import { useState, useRef, useEffect } from 'react';

function Popover({ trigger, position = 'bottom', arrow = false, children }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector('button, [href], input, select, textarea')?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (
        !panelRef.current?.contains(e.target) &&
        !triggerRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const positionClasses = {
    top: 'bottom-full mb-sm left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-sm left-1/2 -translate-x-1/2',
    left: 'right-full mr-sm top-1/2 -translate-y-1/2',
    right: 'left-full ml-sm top-1/2 -translate-y-1/2',
  };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>

      {open && (
        <div
          ref={panelRef}
          className={`
            absolute ${positionClasses[position]}
            bg-bg-card border border-border rounded-ds-lg shadow-ds-lg
            p-lg z-dropdown
            animate-[fade-in-up_150ms_ease]
          `}
        >
          {arrow && (
            <div className={`
              absolute w-2 h-2 bg-bg-card border border-border rotate-45
              ${position === 'bottom' ? '-top-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0' : ''}
              ${position === 'top' ? '-bottom-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0' : ''}
              ${position === 'left' ? '-right-1 top-1/2 -translate-y-1/2 border-l-0 border-b-0' : ''}
              ${position === 'right' ? '-left-1 top-1/2 -translate-y-1/2 border-r-0 border-t-0' : ''}
            `} />
          )}
          {children}
        </div>
      )}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<style>
  .popover-wrapper {
    position: relative;
    display: inline-block;
  }

  .popover-panel {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--space-sm);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--space-lg);
    z-index: var(--z-dropdown);
    animation: fade-in-up var(--duration-micro) var(--ease-default);
  }

  .popover-panel[hidden] {
    display: none;
  }

  /* Arrow — bottom position (arrow points up) */
  .popover-arrow {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: var(--bg-card);
    border-top: 1px solid var(--border);
    border-left: 1px solid var(--border);
  }
</style>

<div class="popover-wrapper">
  <button aria-haspopup="dialog" aria-expanded="false" id="pop-trigger">
    Filter
  </button>
  <div class="popover-panel" hidden>
    <div class="popover-arrow"></div>
    <form>
      <label>
        <input type="checkbox" /> Active only
      </label>
      <label>
        <input type="checkbox" /> Include archived
      </label>
      <button type="submit">Apply</button>
    </form>
  </div>
</div>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use click-to-open for interactive content | Use hover-to-open when the popover has buttons or links |
| Auto-flip position when clipped by viewport | Let the popover overflow off-screen |
| Return focus to the trigger on close | Trap focus like a modal (popovers are lighter) |
| Keep content concise -- use a modal for complex flows | Nest popovers inside popovers |
| Use `aria-haspopup="dialog"` on the trigger | Use `aria-haspopup="menu"` -- that is for dropdown menus |

---

### 6.5 Tooltip

Use tooltips for simple, non-interactive text hints that describe an element on hover or keyboard focus. Tooltips are the lightest overlay -- they provide supplementary information and disappear the instant the pointer or focus leaves the trigger.

#### Anatomy

```
Trigger element  (aria-describedby pointing to tooltip id)
  Tooltip  (role="tooltip", bg-tooltip-bg, border-tooltip-border)
    Arrow  (CSS triangle matching tooltip background)
    Text  (text-tooltip-text, text-caption, max-width 240px)
```

#### Positions

| Position | Placement | Arrow direction |
|----------|-----------|-----------------|
| `top` (default) | Centered above trigger | Points down |
| `right` | Right of trigger, vertically centered | Points left |
| `bottom` | Centered below trigger | Points up |
| `left` | Left of trigger, vertically centered | Points right |

#### States

| State | Behavior |
|-------|----------|
| Hidden | No DOM presence or `visibility: hidden` |
| Delay-in | `150ms` delay before showing on hover / `focus-visible` |
| Visible | Appears with `fade-in-up` (`150ms ease`) |
| Delay-out | `0ms` -- disappears immediately on pointer leave / blur |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Role | `role="tooltip"` on the tooltip element |
| Association | Trigger has `aria-describedby` pointing to the tooltip's `id` |
| Trigger events | Show on `mouseenter` + `focus-visible`. Hide on `mouseleave` + `blur`. |
| Keyboard | Visible when trigger has `focus-visible`. Hidden on `Escape` (optional). |
| Not interactive | Tooltips must **never** contain buttons, links, or form controls. Use Popover for interactive content. |
| Screen reader | Reads tooltip text as the element's accessible description |

#### Tailwind + React

```jsx
import { useState, useRef, useId } from 'react';

const POSITIONS = {
  top: 'bottom-full mb-sm left-1/2 -translate-x-1/2',
  bottom: 'top-full mt-sm left-1/2 -translate-x-1/2',
  left: 'right-full mr-sm top-1/2 -translate-y-1/2',
  right: 'left-full ml-sm top-1/2 -translate-y-1/2',
};

function Tooltip({ text, position = 'top', children }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const id = useId();

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 150);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? id : undefined}>
        {children}
      </span>

      {visible && (
        <span
          id={id}
          role="tooltip"
          className={`
            absolute ${POSITIONS[position]}
            px-md py-xs max-w-[240px]
            bg-tooltip-bg border border-tooltip-border rounded-ds-md
            text-tooltip-text text-caption whitespace-normal
            z-dropdown pointer-events-none
            animate-[fade-in-up_150ms_ease]
          `}
        >
          {text}
        </span>
      )}
    </span>
  );
}
```

Usage:

```jsx
<Tooltip text="Create a new project" position="top">
  <button aria-label="New project">
    <Plus className="w-5 h-5" />
  </button>
</Tooltip>
```

#### Plain CSS + HTML

```html
<style>
  .tooltip-wrapper {
    position: relative;
    display: inline-flex;
  }

  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: var(--space-sm);
    padding: var(--space-xs) var(--space-md);
    max-width: 240px;
    background: var(--tooltip-bg);
    border: 1px solid var(--tooltip-border);
    border-radius: var(--radius-md);
    color: var(--tooltip-text);
    font-size: var(--text-caption);
    font-weight: var(--weight-caption);
    line-height: var(--lh-caption);
    white-space: normal;
    z-index: var(--z-dropdown);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--duration-micro) var(--ease-default),
                visibility var(--duration-micro) var(--ease-default);
  }

  /* Arrow — top position (arrow points down) */
  .tooltip-arrow {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: var(--tooltip-bg);
    border-right: 1px solid var(--tooltip-border);
    border-bottom: 1px solid var(--tooltip-border);
  }

  /* Show on hover and focus-visible — with 150ms delay */
  .tooltip-wrapper:hover .tooltip,
  .tooltip-wrapper:focus-within .tooltip {
    opacity: 1;
    visibility: visible;
    transition-delay: 150ms;
  }

  /* Hide immediately (0ms delay-out) */
  .tooltip-wrapper:not(:hover):not(:focus-within) .tooltip {
    transition-delay: 0ms;
  }

  /* Position variants */
  .tooltip.bottom {
    bottom: auto;
    top: 100%;
    margin-bottom: 0;
    margin-top: var(--space-sm);
  }

  .tooltip.bottom .tooltip-arrow {
    bottom: auto;
    top: -5px;
    border-right: none;
    border-bottom: none;
    border-top: 1px solid var(--tooltip-border);
    border-left: 1px solid var(--tooltip-border);
  }

  .tooltip.left {
    bottom: auto;
    left: auto;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 0;
    margin-right: var(--space-sm);
  }

  .tooltip.right {
    bottom: auto;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 0;
    margin-left: var(--space-sm);
  }
</style>

<span class="tooltip-wrapper">
  <button aria-describedby="tip-1" aria-label="Settings">
    <!-- icon here -->
  </button>
  <span class="tooltip" id="tip-1" role="tooltip">
    <span class="tooltip-arrow"></span>
    Open application settings
  </span>
</span>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use for supplementary text hints on icon-only buttons | Put interactive content (links, buttons) inside a tooltip |
| Keep text short -- one line or two at most | Write paragraph-length tooltip text |
| Show on both hover and `focus-visible` | Show only on hover (keyboard users would never see it) |
| Use `150ms` delay-in to avoid flicker | Show instantly -- rapid cursor movement causes distracting flashes |
| Use `aria-describedby` to associate trigger and tooltip | Use `aria-label` when `aria-describedby` is the correct pattern |
| Use Popover for any content that needs interaction | Add click handlers to tooltip content |
