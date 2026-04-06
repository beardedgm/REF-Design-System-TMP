## Buttons & Actions

This section covers the three interactive action patterns: **Button**, **Button Group**, and **Floating Action Button**. Every example uses only design-system tokens -- no hardcoded colors, sizes, or shadows.

---

### 2.1 Button

**When to use:** For any interactive action the user can take -- submitting a form, opening a dialog, triggering a navigation, or performing a destructive operation. Choose the variant that matches the action's importance and intent.

**Anatomy:**
- `<button>` element (or `<a>` styled as button when navigating)
- Optional leading icon (Lucide, `w-4 h-4`)
- Label text (`font-weight: 500`, `text-label` size)
- Optional trailing icon
- Loading spinner (replaces content when loading)

**Variants:**

| Variant | Background | Text | Border | Use case |
|---------|-----------|------|--------|----------|
| Primary | `bg-accent` | `text-text-on-accent` | none | Primary CTA -- one per visible section |
| Default | `bg-bg-elevated` | `text-text-primary` | `border-border` | Secondary actions, toolbar buttons |
| Ghost | transparent | `text-text-secondary` | none | Tertiary actions, inline actions |
| Danger | `bg-error` | `#ffffff` | none | Destructive actions (delete, remove) |

**Sizes:**

| Size | Height | Padding X | Font size | Icon-only width | Radius |
|------|--------|-----------|-----------|-----------------|--------|
| `sm` | 28px | `space-md` (12px) | `text-caption` (0.75rem) | 28px | `radius-sm` (6px) |
| `base` | 36px | `space-lg` (16px) | `text-label` (0.8125rem) | 36px | `radius-md` (8px) |
| `lg` | 40px | `space-xl` (24px) | `text-body` (0.875rem) | 40px | `radius-md` (8px) |

**States:** default, hover, focus-visible, active, disabled, loading

| State | Primary | Default | Ghost | Danger |
|-------|---------|---------|-------|--------|
| Default | `bg-accent` | `bg-bg-elevated border-border` | transparent | `bg-error` |
| Hover | `bg-accent-hover` | `bg-bg-card border-border-hover` | `bg-bg-elevated` | `bg-error-hover` |
| Focus-visible | `outline: 2px solid var(--accent)` offset 2px | same ring | same ring | same ring |
| Active | `bg-accent-active` | `bg-bg-elevated` pressed | `bg-bg-elevated` pressed | darker red (filter) |
| Disabled | `opacity-50 cursor-not-allowed` | same | same | same |
| Loading | spinner, `aria-busy`, `pointer-events-none` | same | same | same |

**Accessibility:**
- Use `<button>` for actions, `<a>` only for navigation
- Icon-only buttons require `aria-label` describing the action
- Loading state sets `aria-busy="true"` and `aria-disabled="true"`
- Disabled buttons use `disabled` attribute (not just visual styling)
- Focus ring: `outline: 2px solid var(--accent)`, `outline-offset: 2px`
- Minimum touch target: 44x44px (padding expands hit area on `sm`)
- Keyboard: `Enter` and `Space` activate

**Tailwind + React Example:**

```jsx
import { Loader2, Trash2, Plus, Settings } from 'lucide-react';

/* ── Variant styles ── */
const variants = {
  primary:
    'bg-accent text-text-on-accent hover:bg-accent-hover active:bg-accent-active',
  default:
    'bg-bg-elevated text-text-primary border border-border hover:bg-bg-card hover:border-border-hover',
  ghost:
    'bg-transparent text-text-secondary hover:bg-bg-elevated hover:text-text-primary',
  danger:
    'bg-error text-white hover:bg-error-hover',
};

/* ── Size styles ── */
const sizes = {
  sm: 'h-7 px-md text-caption rounded-ds-sm gap-xs',
  base: 'h-9 px-lg text-label rounded-ds-md gap-sm',
  lg: 'h-10 px-xl text-body rounded-ds-md gap-sm',
};

/* ── Icon-only size styles ── */
const iconOnlySizes = {
  sm: 'h-7 w-7 rounded-ds-sm',
  base: 'h-9 w-9 rounded-ds-md',
  lg: 'h-10 w-10 rounded-ds-md',
};

function Button({
  variant = 'default',
  size = 'base',
  iconOnly = false,
  loading = false,
  disabled = false,
  children,
  'aria-label': ariaLabel,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        transition-colors duration-micro ease-default
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-accent focus-visible:outline-offset-2
        ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${variants[variant]}
        ${iconOnly ? iconOnlySizes[size] : sizes[size]}
      `}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}

/* ── Usage: All variants at base size ── */
function ButtonShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-lg">
      {/* Primary */}
      <Button variant="primary">
        <Plus className="w-4 h-4" />
        Create Project
      </Button>

      {/* Default */}
      <Button variant="default">
        <Settings className="w-4 h-4" />
        Settings
      </Button>

      {/* Ghost */}
      <Button variant="ghost">Cancel</Button>

      {/* Danger */}
      <Button variant="danger">
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>

      {/* Icon-only */}
      <Button variant="default" iconOnly aria-label="Settings">
        <Settings className="w-4 h-4" />
      </Button>

      {/* Loading */}
      <Button variant="primary" loading>
        Saving...
      </Button>

      {/* Disabled */}
      <Button variant="primary" disabled>
        Unavailable
      </Button>

      {/* Small size */}
      <Button variant="primary" size="sm">Small</Button>

      {/* Large size */}
      <Button variant="primary" size="lg">Large</Button>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<style>
  /* ── Base button reset ── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    font-family: var(--font-sans);
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color var(--duration-micro) var(--ease-default),
                border-color var(--duration-micro) var(--ease-default),
                color var(--duration-micro) var(--ease-default);
  }
  .btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .btn:disabled,
  .btn[aria-busy="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Sizes ── */
  .btn--sm {
    height: 28px;
    padding-inline: var(--space-md);
    font-size: var(--text-caption);
    border-radius: var(--radius-sm);
    gap: var(--space-xs);
  }
  .btn--base {
    height: 36px;
    padding-inline: var(--space-lg);
    font-size: var(--text-label);
    border-radius: var(--radius-md);
  }
  .btn--lg {
    height: 40px;
    padding-inline: var(--space-xl);
    font-size: var(--text-body);
    border-radius: var(--radius-md);
  }

  /* ── Icon-only (square) ── */
  .btn--icon-only.btn--sm  { width: 28px; padding: 0; }
  .btn--icon-only.btn--base { width: 36px; padding: 0; }
  .btn--icon-only.btn--lg  { width: 40px; padding: 0; }

  /* ── Primary variant ── */
  .btn--primary {
    background: var(--accent);
    color: var(--text-on-accent);
  }
  .btn--primary:hover { background: var(--accent-hover); }
  .btn--primary:active { background: var(--accent-active); }

  /* ── Default variant ── */
  .btn--default {
    background: var(--bg-elevated);
    color: var(--text-primary);
    border: 1px solid var(--border);
  }
  .btn--default:hover {
    background: var(--bg-card);
    border-color: var(--border-hover);
  }
  .btn--default:active { background: var(--bg-elevated); }

  /* ── Ghost variant ── */
  .btn--ghost {
    background: transparent;
    color: var(--text-secondary);
  }
  .btn--ghost:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
  }
  .btn--ghost:active { background: var(--bg-elevated); }

  /* ── Danger variant ── */
  .btn--danger {
    background: var(--error);
    color: #ffffff;
  }
  .btn--danger:hover { background: var(--error-hover); }
  .btn--danger:active { filter: brightness(0.9); }

  /* ── Loading spinner ── */
  .btn__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    animation: btn-spin 600ms linear infinite;
  }
  @keyframes btn-spin {
    to { transform: rotate(360deg); }
  }
</style>

<!-- Primary (all sizes) -->
<button class="btn btn--primary btn--sm">Small Primary</button>
<button class="btn btn--primary btn--base">Base Primary</button>
<button class="btn btn--primary btn--lg">Large Primary</button>

<!-- Default -->
<button class="btn btn--default btn--base">
  <svg class="lucide" width="16" height="16"><use href="#settings-icon"/></svg>
  Settings
</button>

<!-- Ghost -->
<button class="btn btn--ghost btn--base">Cancel</button>

<!-- Danger -->
<button class="btn btn--danger btn--base">
  <svg class="lucide" width="16" height="16"><use href="#trash-icon"/></svg>
  Delete
</button>

<!-- Icon-only -->
<button class="btn btn--default btn--base btn--icon-only" aria-label="Settings">
  <svg class="lucide" width="16" height="16"><use href="#settings-icon"/></svg>
</button>

<!-- Loading -->
<button class="btn btn--primary btn--base" aria-busy="true" aria-disabled="true" disabled>
  <span class="btn__spinner" aria-hidden="true"></span>
</button>

<!-- Disabled -->
<button class="btn btn--primary btn--base" disabled>Unavailable</button>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use one primary button per visible section | Place two primary buttons side by side |
| Use `<button>` for actions | Use `<div onClick>` or `<a>` for non-navigation actions |
| Provide `aria-label` on icon-only buttons | Rely on tooltip alone for icon-only meaning |
| Use danger variant for destructive actions | Use primary (gold) for delete/remove actions |
| Show loading spinner and disable during async | Leave button clickable while loading |
| Use ghost for cancel/dismiss in dialogs | Use primary for cancel actions |
| Keep labels short: 1-3 words | Write full sentences as button labels |

---

### 2.2 Button Group

**When to use:** When two or more related actions belong together visually -- such as a segmented control, a toolbar section, or a split button with a primary action and a dropdown trigger.

**Anatomy:**
- Container `<div role="group" aria-label="...">` wrapping multiple `<button>` elements
- First button: left radii only (`border-radius: var(--radius-md) 0 0 var(--radius-md)`)
- Middle buttons: no radii (`border-radius: 0`)
- Last button: right radii only (`border-radius: 0 var(--radius-md) var(--radius-md) 0`)
- Buttons share borders (negative margin or collapsed borders)
- Split button variant: primary action button + narrow dropdown trigger separated by a divider

**Variants:**

| Variant | Description |
|---------|-------------|
| Default group | Same-variant buttons joined together (e.g., all default) |
| Mixed group | Primary action + default secondary actions |
| Split button | Primary action + dropdown arrow trigger sharing one visual container |

**States:** default, hover (individual button), focus-visible (individual button with ring), disabled (individual or entire group)

**Accessibility:**
- Container has `role="group"` and `aria-label` describing the group's purpose
- Each button is independently focusable and labeled
- Split button dropdown trigger has `aria-haspopup="true"` and `aria-expanded`
- Keyboard: `Tab` moves between buttons normally (not arrow keys -- these are independent buttons, not a toolbar)

**Tailwind + React Example:**

```jsx
import { ChevronDown, Bold, Italic, Underline } from 'lucide-react';

/* ── Button Group container ── */
function ButtonGroup({ label, children }) {
  return (
    <div role="group" aria-label={label} className="inline-flex">
      {children}
    </div>
  );
}

/* ── Shared base for grouped buttons ── */
const groupedBase = `
  inline-flex items-center justify-center
  h-9 px-lg text-label font-medium
  bg-bg-elevated text-text-primary border border-border
  hover:bg-bg-card hover:border-border-hover
  focus-visible:outline focus-visible:outline-2
  focus-visible:outline-accent focus-visible:outline-offset-2
  focus-visible:z-10
  transition-colors duration-micro ease-default
  disabled:opacity-50 disabled:cursor-not-allowed
`;

/* ── Position classes ── */
const groupFirst  = 'rounded-l-ds-md rounded-r-none border-r-0';
const groupMiddle = 'rounded-none border-r-0';
const groupLast   = 'rounded-r-ds-md rounded-l-none';
const groupOnly   = 'rounded-ds-md'; /* single button fallback */

/* ── Default button group (toolbar) ── */
function ToolbarGroup() {
  return (
    <ButtonGroup label="Text formatting">
      <button className={`${groupedBase} ${groupFirst}`} aria-label="Bold">
        <Bold className="w-4 h-4" />
      </button>
      <button className={`${groupedBase} ${groupMiddle}`} aria-label="Italic">
        <Italic className="w-4 h-4" />
      </button>
      <button className={`${groupedBase} ${groupLast}`} aria-label="Underline">
        <Underline className="w-4 h-4" />
      </button>
    </ButtonGroup>
  );
}

/* ── Split button (primary action + dropdown) ── */
function SplitButton({ label, onClick, onDropdown, dropdownOpen }) {
  return (
    <ButtonGroup label={label}>
      {/* Primary action */}
      <button
        className={`
          inline-flex items-center justify-center
          h-9 px-lg text-label font-medium rounded-l-ds-md rounded-r-none
          bg-accent text-text-on-accent
          hover:bg-accent-hover active:bg-accent-active
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-accent focus-visible:outline-offset-2
          focus-visible:z-10
          transition-colors duration-micro ease-default
        `}
        onClick={onClick}
      >
        {label}
      </button>

      {/* Divider (1px accent-active line) */}
      <span className="w-px h-9 bg-accent-active" aria-hidden="true" />

      {/* Dropdown trigger */}
      <button
        className={`
          inline-flex items-center justify-center
          h-9 w-9 rounded-r-ds-md rounded-l-none
          bg-accent text-text-on-accent
          hover:bg-accent-hover active:bg-accent-active
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-accent focus-visible:outline-offset-2
          focus-visible:z-10
          transition-colors duration-micro ease-default
        `}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        aria-label={`More options for ${label}`}
        onClick={onDropdown}
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </ButtonGroup>
  );
}
```

**Plain CSS + HTML Example:**

```html
<style>
  /* ── Button group container ── */
  .btn-group {
    display: inline-flex;
  }

  /* ── Grouped button base ── */
  .btn-group .btn {
    border-radius: 0;
    position: relative;
  }
  .btn-group .btn + .btn {
    margin-left: -1px; /* collapse shared borders */
  }
  .btn-group .btn:focus-visible {
    z-index: 1; /* focus ring above siblings */
  }

  /* ── First / last radii ── */
  .btn-group .btn:first-child {
    border-radius: var(--radius-md) 0 0 var(--radius-md);
  }
  .btn-group .btn:last-child {
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }
  .btn-group .btn:only-child {
    border-radius: var(--radius-md);
  }

  /* ── Split button divider ── */
  .btn-group__divider {
    width: 1px;
    background: var(--accent-active);
    align-self: stretch;
  }
</style>

<!-- Default button group (toolbar) -->
<div class="btn-group" role="group" aria-label="Text formatting">
  <button class="btn btn--default btn--base btn--icon-only" aria-label="Bold">
    <svg class="lucide" width="16" height="16"><use href="#bold-icon"/></svg>
  </button>
  <button class="btn btn--default btn--base btn--icon-only" aria-label="Italic">
    <svg class="lucide" width="16" height="16"><use href="#italic-icon"/></svg>
  </button>
  <button class="btn btn--default btn--base btn--icon-only" aria-label="Underline">
    <svg class="lucide" width="16" height="16"><use href="#underline-icon"/></svg>
  </button>
</div>

<!-- Split button -->
<div class="btn-group" role="group" aria-label="Save options">
  <button class="btn btn--primary btn--base">Save</button>
  <span class="btn-group__divider" aria-hidden="true"></span>
  <button
    class="btn btn--primary btn--base btn--icon-only"
    aria-haspopup="true"
    aria-expanded="false"
    aria-label="More save options"
  >
    <svg class="lucide" width="16" height="16"><use href="#chevron-down-icon"/></svg>
  </button>
</div>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Group related actions that belong together | Group unrelated actions just for layout |
| Use `role="group"` with `aria-label` on the container | Omit group labeling |
| Collapse shared borders with negative margin or `border-right: 0` | Leave double borders between buttons |
| Keep groups to 2-5 buttons maximum | Create long button groups with 6+ items |
| Use split button for a clear primary + secondary action | Use split button when both actions are equally important |

---

### 2.3 Floating Action Button (FAB)

**When to use:** For the single most important action on a mobile screen -- creating a new item, composing a message, or starting a workflow. The FAB is a mobile-only pattern; on desktop, use a standard primary button in the page header or toolbar instead.

**Anatomy:**
- Circular `<button>` with `position: fixed`, anchored to the bottom-right corner
- Gold background (`bg-accent`), elevated shadow (`shadow-lg`)
- Single Lucide icon (`w-6 h-6`), no text label (icon-only)
- `z-sticky` (z-index 100) to float above scrolling content
- Optional: extended FAB with icon + short text label (pill shape)

**Variants:**

| Variant | Shape | Content | Radius |
|---------|-------|---------|--------|
| Standard | Circle, 56x56px | Icon only | `radius-full` |
| Extended | Pill, 56px height | Icon + label | `radius-full` |

**States:** default, hover, focus-visible, active, disabled

| State | Style |
|-------|-------|
| Default | `bg-accent`, `shadow-lg` |
| Hover | `bg-accent-hover`, `shadow-lg` |
| Focus-visible | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Active | `bg-accent-active`, `shadow-md` (pressed feel) |
| Disabled | `opacity-50`, `cursor-not-allowed`, `pointer-events-none` |

**Accessibility:**
- Always requires `aria-label` describing the action (e.g., "Create new project")
- Must not overlap critical content or navigation when keyboard is open
- `z-index: var(--z-sticky)` keeps it above content but below modals/overlays
- Respect `prefers-reduced-motion`: skip entrance animation
- On desktop viewports (>= 768px), hide the FAB -- use inline primary buttons instead

**Tailwind + React Example:**

```jsx
import { Plus, MessageSquare } from 'lucide-react';

/* ── Standard FAB (icon only) ── */
function Fab({ icon: Icon, label, onClick, disabled = false }) {
  return (
    <button
      className={`
        fixed bottom-xl right-xl z-sticky
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-accent text-text-on-accent shadow-ds-lg
        hover:bg-accent-hover
        active:bg-accent-active active:shadow-ds-md
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-accent focus-visible:outline-offset-2
        transition-all duration-micro ease-default
        md:hidden
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
      `}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}

/* ── Extended FAB (icon + label) ── */
function FabExtended({ icon: Icon, label, onClick, disabled = false }) {
  return (
    <button
      className={`
        fixed bottom-xl right-xl z-sticky
        inline-flex items-center gap-sm
        h-14 px-xl rounded-full
        bg-accent text-text-on-accent shadow-ds-lg
        hover:bg-accent-hover
        active:bg-accent-active active:shadow-ds-md
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-accent focus-visible:outline-offset-2
        transition-all duration-micro ease-default
        text-label font-medium
        md:hidden
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="w-6 h-6" />
      {label}
    </button>
  );
}

/* ── Usage ── */
function MobileView() {
  return (
    <main>
      {/* Page content... */}

      {/* Standard FAB */}
      <Fab
        icon={Plus}
        label="Create new project"
        onClick={() => console.log('create')}
      />

      {/* Or extended FAB */}
      {/* <FabExtended
        icon={MessageSquare}
        label="Compose"
        onClick={() => console.log('compose')}
      /> */}
    </main>
  );
}
```

**Plain CSS + HTML Example:**

```html
<style>
  /* ── Standard FAB ── */
  .fab {
    position: fixed;
    bottom: var(--space-xl);
    right: var(--space-xl);
    z-index: var(--z-sticky);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: none;
    border-radius: var(--radius-full);
    background: var(--accent);
    color: var(--text-on-accent);
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    transition: background-color var(--duration-micro) var(--ease-default),
                box-shadow var(--duration-micro) var(--ease-default);
  }
  .fab:hover {
    background: var(--accent-hover);
  }
  .fab:active {
    background: var(--accent-active);
    box-shadow: var(--shadow-md);
  }
  .fab:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .fab:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  .fab svg {
    width: 24px;
    height: 24px;
  }

  /* ── Extended FAB (icon + label) ── */
  .fab--extended {
    width: auto;
    padding-inline: var(--space-xl);
    gap: var(--space-sm);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 500;
  }

  /* ── Hide on desktop ── */
  @media (min-width: 768px) {
    .fab { display: none; }
  }
</style>

<!-- Standard FAB -->
<button class="fab" aria-label="Create new project">
  <svg class="lucide" width="24" height="24"><use href="#plus-icon"/></svg>
</button>

<!-- Extended FAB -->
<button class="fab fab--extended" aria-label="Compose message">
  <svg class="lucide" width="24" height="24"><use href="#message-square-icon"/></svg>
  Compose
</button>

<!-- Disabled FAB -->
<button class="fab" aria-label="Create new project" disabled>
  <svg class="lucide" width="24" height="24"><use href="#plus-icon"/></svg>
</button>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use for the single most important action on mobile | Show multiple FABs on one screen |
| Hide on desktop (>= 768px) with `md:hidden` or `@media` | Show FAB on desktop -- use inline primary buttons instead |
| Use gold accent background to signal primary action | Use default/ghost styling -- FAB must stand out |
| Position at `bottom-xl right-xl` consistently | Move FAB to other corners or positions |
| Use a single recognizable icon (Plus, Compose, etc.) | Put complex icons or text-only content in standard FAB |
| Ensure FAB does not cover navigation or critical UI | Let FAB overlap bottom nav bars or input fields |
| Respect `prefers-reduced-motion` for entrance animation | Add bounce/spring animations to FAB |
