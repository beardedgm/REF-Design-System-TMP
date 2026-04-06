## Feedback & Status

Seven patterns for communicating system state, loading progress, confirmations, and empty views. Every component in this section uses design-system tokens exclusively -- no hardcoded colors, spacing, or radii.

---

### 5.1 Toast / Notification

Non-blocking ephemeral messages that confirm actions or surface errors without interrupting the user's flow.

#### When to Use

- Confirming a successful save, delete, or send action
- Surfacing non-critical errors that do not require immediate action
- Displaying warnings or informational messages triggered by background processes
- Do NOT use for errors that block the user's workflow (use Alert / Banner instead)

#### Anatomy

```
+------------------------------------------------------+
| [Icon]  Message text                        [X Close] |
+------------------------------------------------------+
```

1. **Icon** -- variant-specific Lucide icon (`w-5 h-5`)
2. **Message** -- single line or up to two lines of body text
3. **Close button** -- always present, `w-4 h-4` X icon

#### Variants

| Variant   | Icon            | Border / Accent Color | Background        |
|-----------|-----------------|-----------------------|-------------------|
| Success   | `CheckCircle`   | `--success`           | `--success-muted` |
| Error     | `XCircle`       | `--error`             | `--error-muted`   |
| Warning   | `AlertTriangle` | `--warning`           | `--warning-muted` |
| Info      | `Info`          | `--info`              | `--info-muted`    |

#### States

| State       | Behavior                                                  |
|-------------|-----------------------------------------------------------|
| Entering    | `fade-in-up` animation, `200ms ease`                      |
| Visible     | Static, auto-dismiss timer counting down (5 seconds)      |
| Hovered     | Auto-dismiss timer paused                                 |
| Exiting     | `fade-out-down` animation, `150ms ease`                   |
| Stacked     | Max 3 visible, newest on top, `space-sm` (8px) gap        |

#### Accessibility

- **Container**: `aria-live="polite"`, `role="status"` -- screen readers announce new toasts without interrupting
- **Close button**: `aria-label="Dismiss notification"`
- **Focus**: toasts never steal focus from the user's current position
- **Keyboard**: close button is focusable but toast itself is not in the tab order

#### Tailwind + React

```jsx
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'border-success bg-success-muted text-success',
  error: 'border-error bg-error-muted text-error',
  warning: 'border-warning bg-warning-muted text-warning',
  info: 'border-info bg-info-muted text-info',
};

function Toast({ variant = 'info', message, onDismiss }) {
  const Icon = icons[variant];

  return (
    <div
      role="status"
      className={`flex items-center gap-md p-lg border rounded-ds-lg shadow-ds-md
        animate-fade-in-up ${styles[variant]}`}
      onMouseEnter={/* pause auto-dismiss */}
      onMouseLeave={/* resume auto-dismiss */}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="text-body text-text-primary flex-1">{message}</p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="text-text-tertiary hover:text-text-primary p-xs rounded-ds-sm
          focus-visible:outline-2 focus-visible:outline-accent"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function ToastContainer({ toasts }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-xl right-xl z-toast flex flex-col-reverse gap-sm"
      style={{ maxWidth: '400px' }}
    >
      {toasts.slice(0, 3).map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div
  aria-live="polite"
  class="toast-container"
>
  <div role="status" class="toast toast--success">
    <!-- Lucide CheckCircle SVG -->
    <svg class="toast__icon" width="20" height="20"><!-- ... --></svg>
    <p class="toast__message">Changes saved successfully.</p>
    <button class="toast__close" aria-label="Dismiss notification">
      <svg width="16" height="16"><!-- X icon --></svg>
    </button>
  </div>
</div>

<style>
.toast-container {
  position: fixed;
  bottom: var(--space-xl);
  right: var(--space-xl);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-sm);
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  animation: fade-in-up 200ms var(--ease-default);
}

.toast--exiting {
  animation: fade-out-down 150ms var(--ease-default) forwards;
}

.toast--success {
  border-color: var(--success);
  background: var(--success-muted);
}
.toast--success .toast__icon { color: var(--success); }

.toast--error {
  border-color: var(--error);
  background: var(--error-muted);
}
.toast--error .toast__icon { color: var(--error); }

.toast--warning {
  border-color: var(--warning);
  background: var(--warning-muted);
}
.toast--warning .toast__icon { color: var(--warning); }

.toast--info {
  border-color: var(--info);
  background: var(--info-muted);
}
.toast--info .toast__icon { color: var(--info); }

.toast__message {
  flex: 1;
  font-size: var(--text-body);
  color: var(--text-primary);
}

.toast__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
}
.toast__close:hover { color: var(--text-primary); }
.toast__close:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use toasts for transient confirmations (saved, sent, copied) | Use toasts for errors that require user action |
| Keep message text to one or two short lines | Put interactive elements (links, forms) inside toasts |
| Auto-dismiss after 5 seconds, pause on hover | Show more than 3 toasts simultaneously |
| Use the exit animation (150ms) faster than enter (200ms) | Steal focus from the user's current workflow |

---

### 5.2 Alert / Banner

Persistent inline messages that sit within the content flow. Use for contextual feedback that should remain visible until the user acts or the condition resolves.

#### When to Use

- Displaying a form-level validation summary after submission
- Warning about expiring trials, pending actions, or degraded service
- Confirming a bulk operation completed (success variant)
- Do NOT use for ephemeral confirmations (use Toast instead)

#### Anatomy

```
+-------------------------------------------------------------------+
| [Icon]  Message text                    [Action Link]  [X Dismiss] |
+-------------------------------------------------------------------+
```

1. **Icon** -- variant-specific Lucide icon (`w-5 h-5`), left-aligned
2. **Message** -- body text, may include inline bold or links
3. **Action link** (optional) -- text link for a related action
4. **Dismiss button** (optional) -- allows the user to close the banner

#### Variants

| Variant | Icon            | Background        | Border Color | Role          |
|---------|-----------------|-------------------|--------------|---------------|
| Info    | `Info`          | `--info-muted`    | `--info`     | `role="status"` |
| Success | `CheckCircle`   | `--success-muted` | `--success`  | `role="status"` |
| Warning | `AlertTriangle` | `--warning-muted` | `--warning`  | `role="alert"`  |
| Error   | `XCircle`       | `--error-muted`   | `--error`    | `role="alert"`  |

#### States

| State     | Behavior                                    |
|-----------|---------------------------------------------|
| Default   | Visible within the content flow              |
| Dismissed | Removed from DOM or hidden with `display: none` |

#### Accessibility

- **Error / Warning**: `role="alert"` -- assertively announced by screen readers
- **Info / Success**: `role="status"` -- politely announced
- **Dismiss button**: `aria-label="Dismiss alert"`
- If the banner contains an action link, the link must have descriptive text (not "click here")

#### Tailwind + React

```jsx
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

const config = {
  info:    { icon: Info,          style: 'border-info bg-info-muted text-info',       role: 'status' },
  success: { icon: CheckCircle,   style: 'border-success bg-success-muted text-success', role: 'status' },
  warning: { icon: AlertTriangle, style: 'border-warning bg-warning-muted text-warning', role: 'alert' },
  error:   { icon: XCircle,       style: 'border-error bg-error-muted text-error',     role: 'alert' },
};

function Alert({ variant = 'info', message, action, onDismiss }) {
  const { icon: Icon, style, role } = config[variant];

  return (
    <div
      role={role}
      className={`flex items-center gap-md p-lg border rounded-ds-lg ${style}`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="text-body text-text-primary flex-1">{message}</p>
      {action && (
        <a
          href={action.href}
          className="text-label text-accent hover:text-accent-hover underline whitespace-nowrap"
        >
          {action.label}
        </a>
      )}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="text-text-tertiary hover:text-text-primary p-xs rounded-ds-sm
            focus-visible:outline-2 focus-visible:outline-accent"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div role="alert" class="alert alert--error">
  <svg class="alert__icon" width="20" height="20"><!-- XCircle --></svg>
  <p class="alert__message">Unable to save changes. Please try again.</p>
  <a href="/support" class="alert__action">Contact support</a>
  <button class="alert__dismiss" aria-label="Dismiss alert">
    <svg width="16" height="16"><!-- X icon --></svg>
  </button>
</div>

<style>
.alert {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid;
  border-radius: var(--radius-lg);
}

.alert--info    { border-color: var(--info);    background: var(--info-muted); }
.alert--success { border-color: var(--success); background: var(--success-muted); }
.alert--warning { border-color: var(--warning); background: var(--warning-muted); }
.alert--error   { border-color: var(--error);   background: var(--error-muted); }

.alert__icon { shrink: 0; }
.alert--info    .alert__icon { color: var(--info); }
.alert--success .alert__icon { color: var(--success); }
.alert--warning .alert__icon { color: var(--warning); }
.alert--error   .alert__icon { color: var(--error); }

.alert__message {
  flex: 1;
  font-size: var(--text-body);
  color: var(--text-primary);
}

.alert__action {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--accent);
  text-decoration: underline;
  white-space: nowrap;
}
.alert__action:hover { color: var(--accent-hover); }

.alert__dismiss {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
}
.alert__dismiss:hover { color: var(--text-primary); }
.alert__dismiss:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Place alerts inline within the content they relate to | Float alerts over content like toasts |
| Use `role="alert"` for errors and warnings only | Use `role="alert"` for informational messages (too assertive) |
| Provide a dismiss button when the user can safely ignore | Leave error alerts permanently on screen with no escape |
| Keep the message concise; link to details if needed | Embed long paragraphs or multiple actions inside a banner |

---

### 5.3 Callout / Admonition

Inline content blocks used within documentation, help text, and long-form content to highlight tips, warnings, and important notes.

#### When to Use

- Highlighting a helpful tip or best practice in documentation
- Warning about a gotcha or destructive consequence within instructional text
- Calling out required prerequisites or important context
- Do NOT use for live system alerts (use Alert / Banner instead)

#### Anatomy

```
+-+--------------------------------------------+
| | [Icon]  Title (bold)                        |
| |  Body text describing the callout content.  |
+-+--------------------------------------------+
  ^-- 3px left border in semantic color
```

1. **Left border** -- 3px solid, colored by variant
2. **Icon** -- variant-specific Lucide icon (`w-5 h-5`)
3. **Title** -- bold label text (optional but recommended)
4. **Body** -- body text, may contain inline formatting

#### Variants

| Variant | Border Color | Icon            | Use Case                   |
|---------|-------------|-----------------|----------------------------|
| Tip     | `--accent`  | `Lightbulb`     | Best practices, pro tips   |
| Warning | `--warning` | `AlertTriangle` | Gotchas, caveats           |
| Danger  | `--error`   | `AlertOctagon`  | Destructive / irreversible |
| Info    | `--info`    | `Info`          | Additional context         |
| Note    | `--border`  | `StickyNote`    | General side notes         |

#### States

Callouts are static content blocks. They have no interactive states.

#### Accessibility

- Use semantic HTML: a `<div>` or `<aside>` with an appropriate `role` is sufficient
- The icon is decorative (`aria-hidden="true"`) -- the title carries the meaning
- If the callout warns about a destructive action, pair with `role="note"` or include the word "Warning" in the title so screen readers convey urgency through text

#### Tailwind + React

```jsx
import { Lightbulb, AlertTriangle, AlertOctagon, Info, StickyNote } from 'lucide-react';

const config = {
  tip:     { icon: Lightbulb,     border: 'border-l-accent',  iconColor: 'text-accent' },
  warning: { icon: AlertTriangle, border: 'border-l-warning', iconColor: 'text-warning' },
  danger:  { icon: AlertOctagon,  border: 'border-l-error',   iconColor: 'text-error' },
  info:    { icon: Info,          border: 'border-l-info',    iconColor: 'text-info' },
  note:    { icon: StickyNote,    border: 'border-l-border',  iconColor: 'text-text-tertiary' },
};

function Callout({ variant = 'note', title, children }) {
  const { icon: Icon, border, iconColor } = config[variant];

  return (
    <aside className={`border-l-[3px] ${border} bg-bg-elevated rounded-ds-md p-lg`}>
      <div className="flex items-center gap-sm mb-sm">
        <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} aria-hidden="true" />
        {title && (
          <span className="text-label text-text-primary">{title}</span>
        )}
      </div>
      <div className="text-body text-text-secondary pl-[28px]">
        {children}
      </div>
    </aside>
  );
}
```

#### Plain CSS + HTML

```html
<aside class="callout callout--warning">
  <div class="callout__header">
    <svg class="callout__icon" width="20" height="20" aria-hidden="true">
      <!-- AlertTriangle -->
    </svg>
    <span class="callout__title">Warning</span>
  </div>
  <div class="callout__body">
    This action cannot be undone. Deleted items are permanently removed
    after 30 days.
  </div>
</aside>

<style>
.callout {
  border-left: 3px solid;
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}

.callout--tip     { border-left-color: var(--accent); }
.callout--warning { border-left-color: var(--warning); }
.callout--danger  { border-left-color: var(--error); }
.callout--info    { border-left-color: var(--info); }
.callout--note    { border-left-color: var(--border); }

.callout__header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.callout--tip     .callout__icon { color: var(--accent); }
.callout--warning .callout__icon { color: var(--warning); }
.callout--danger  .callout__icon { color: var(--error); }
.callout--info    .callout__icon { color: var(--info); }
.callout--note    .callout__icon { color: var(--text-tertiary); }

.callout__title {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}

.callout__body {
  font-size: var(--text-body);
  color: var(--text-secondary);
  padding-left: 28px; /* icon width + gap */
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use sparingly -- one or two callouts per page section | Overload a page with callouts (they lose impact) |
| Match the variant to the severity of the content | Use "danger" for minor tips or general info |
| Include a descriptive title so the callout is scannable | Rely on border color alone to convey meaning |
| Keep body text concise -- link out for extended explanations | Nest callouts inside other callouts |

---

### 5.4 Confirmation Dialog

A modal dialog for confirming destructive or irreversible actions. Extends the base Modal pattern with a focused layout for confirmation flows.

#### When to Use

- Confirming deletion of a record, project, or account
- Approving an irreversible bulk operation
- Any action where the user should explicitly opt in before proceeding
- Do NOT use for simple informational messages (use Alert or Toast)

#### Anatomy

```
+--overlay (bg-overlay)----------------------------+
|                                                   |
|  +--dialog card---------------------------+       |
|  |  [AlertTriangle icon]                  |       |
|  |  Heading                               |       |
|  |  Description text explaining the       |       |
|  |  consequences of the action.           |       |
|  |                                        |       |
|  |  [Cancel]              [Delete / Confirm]|      |
|  +----------------------------------------+       |
|                                                   |
+---------------------------------------------------+
```

1. **Overlay** -- `bg-overlay`, covers the viewport
2. **Dialog card** -- `bg-bg-card`, `shadow-ds-lg`, `rounded-ds-lg`, max-width `440px`
3. **Icon** -- `AlertTriangle` in `text-warning` or `text-error`, `w-10 h-10`
4. **Heading** -- `text-h3`, clear action description
5. **Description** -- `text-body text-text-secondary`, explains consequences
6. **Cancel button** -- default/ghost style, receives initial focus
7. **Confirm button** -- danger variant (`bg-error text-text-on-accent`)

#### States

| State      | Behavior                                                |
|------------|---------------------------------------------------------|
| Opening    | Overlay fades in, dialog uses `scale-in` 200ms          |
| Open       | Focus trapped within dialog, body scroll locked         |
| Closing    | `scale-out` 150ms, overlay fades out                    |

#### Accessibility

- **Dialog**: `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby` pointing to heading, `aria-describedby` pointing to description
- **Focus trap**: focus cycles between Cancel, Confirm, and close button only
- **Initial focus**: Cancel button (not the destructive action) -- prevents accidental confirmation
- **Keyboard**: `Escape` triggers cancel, `Enter` activates the focused button
- **Screen reader**: `alertdialog` role causes the description to be read automatically on open

#### Tailwind + React

```jsx
import { AlertTriangle, X } from 'lucide-react';
import { useRef, useEffect } from 'react';

function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-bg-overlay"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="relative bg-bg-card rounded-ds-lg shadow-ds-lg p-xl
          w-full max-w-[440px] animate-scale-in"
      >
        <div className="flex flex-col items-center text-center gap-lg">
          <div className="w-10 h-10 rounded-full bg-error-muted flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>

          <h2 id="confirm-title" className="text-h3 text-text-primary">
            {title}
          </h2>

          <p id="confirm-desc" className="text-body text-text-secondary">
            {description}
          </p>

          <div className="flex gap-md w-full">
            <button
              ref={cancelRef}
              onClick={onCancel}
              className="flex-1 px-lg py-sm rounded-ds-md border border-border
                text-label text-text-primary bg-transparent
                hover:bg-bg-elevated
                focus-visible:outline-2 focus-visible:outline-accent"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-lg py-sm rounded-ds-md
                text-label text-text-on-accent bg-error hover:bg-error-hover
                focus-visible:outline-2 focus-visible:outline-accent"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div class="confirm-overlay">
  <div
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="confirm-title"
    aria-describedby="confirm-desc"
    class="confirm-dialog"
  >
    <div class="confirm-icon-wrap">
      <svg class="confirm-icon" width="24" height="24"><!-- AlertTriangle --></svg>
    </div>
    <h2 id="confirm-title" class="confirm-title">Delete project?</h2>
    <p id="confirm-desc" class="confirm-desc">
      This will permanently delete "My Project" and all its data.
      This action cannot be undone.
    </p>
    <div class="confirm-actions">
      <button class="confirm-cancel">Cancel</button>
      <button class="confirm-submit">Delete</button>
    </div>
  </div>
</div>

<style>
.confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-overlay);
}

.confirm-dialog {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-xl);
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-lg);
  animation: scale-in 200ms var(--ease-default);
}

.confirm-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--error-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-icon { color: var(--error); }

.confirm-title {
  font-size: var(--text-h3);
  font-weight: var(--weight-h3);
  color: var(--text-primary);
}

.confirm-desc {
  font-size: var(--text-body);
  color: var(--text-secondary);
}

.confirm-actions {
  display: flex;
  gap: var(--space-md);
  width: 100%;
}

.confirm-cancel,
.confirm-submit {
  flex: 1;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  cursor: pointer;
  border: none;
}

.confirm-cancel {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
}
.confirm-cancel:hover { background: var(--bg-elevated); }

.confirm-submit {
  background: var(--error);
  color: var(--text-on-accent);
}
.confirm-submit:hover { background: var(--error-hover); }

.confirm-cancel:focus-visible,
.confirm-submit:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Set initial focus on the Cancel button | Auto-focus the destructive Confirm button |
| Describe the exact consequence in the description text | Use vague language like "Are you sure?" with no context |
| Use `role="alertdialog"` so screen readers announce the description | Use a generic `role="dialog"` for destructive confirmations |
| Allow `Escape` to cancel and close the dialog | Require the user to click Cancel -- keyboard must work |

---

### 5.5 Skeleton Loader

Loading placeholders that mirror the shape of incoming content, providing spatial continuity while data loads.

#### When to Use

- Showing placeholder shapes while an API call is in flight
- Replacing a card, list, or table with a structural preview during loading
- Initial page load where content areas have a known layout
- Do NOT use for actions that complete in under 200ms (show nothing instead)

#### Anatomy

Three composable primitives:

| Primitive | Shape             | Default Size         |
|-----------|-------------------|----------------------|
| Line      | Rounded rectangle | `h-4`, full width    |
| Circle    | Perfect circle    | Explicit `w-*` / `h-*` |
| Rect      | Rounded rectangle | Explicit dimensions  |

All primitives use `bg-bg-elevated` as the base color with a horizontal shimmer gradient using `--shimmer-highlight`.

#### Variants

Skeletons are composed, not predefined. Common compositions:

| Composition    | Primitives Used                                      |
|----------------|------------------------------------------------------|
| Card skeleton  | Rect (image) + Line (title) + Line (subtitle, 60%)  |
| Avatar + text  | Circle (40px) + Line (name) + Line (role, 50%)      |
| Table row      | 4-5 Lines in a horizontal grid                       |
| Paragraph      | 3 Lines (100%, 100%, 75%)                            |

#### States

| State            | Behavior                                              |
|------------------|-------------------------------------------------------|
| Loading          | Shimmer animation at `1.5s ease-in-out infinite`      |
| Reduced motion   | Static `bg-bg-elevated` fill, no animation            |
| Extended loading | After 3 seconds, add a `text-caption text-text-tertiary` hint |

#### Accessibility

- Skeleton containers should have `aria-busy="true"` while loading
- The parent region should have `aria-label="Loading content"` or similar
- When content loads, remove `aria-busy` and the skeleton elements
- Screen readers should not attempt to read individual skeleton shapes -- they are purely visual

#### Tailwind + React

```jsx
function SkeletonLine({ width = 'w-full' }) {
  return (
    <div
      className={`h-4 rounded-ds-md bg-bg-elevated shimmer ${width}`}
      aria-hidden="true"
    />
  );
}

function SkeletonCircle({ size = 'w-10 h-10' }) {
  return (
    <div
      className={`rounded-full bg-bg-elevated shimmer ${size}`}
      aria-hidden="true"
    />
  );
}

function SkeletonRect({ className = 'w-full h-32' }) {
  return (
    <div
      className={`rounded-ds-md bg-bg-elevated shimmer ${className}`}
      aria-hidden="true"
    />
  );
}

/* Shimmer utility class defined in globals.css:
   .shimmer {
     background: linear-gradient(90deg,
       var(--bg-elevated) 25%,
       var(--shimmer-highlight) 50%,
       var(--bg-elevated) 75%);
     background-size: 200% 100%;
     animation: shimmer 1.5s ease-in-out infinite;
   }
*/

function CardSkeleton() {
  return (
    <div
      className="bg-bg-card border border-border rounded-ds-lg p-lg space-y-md"
      aria-busy="true"
      aria-label="Loading content"
    >
      <SkeletonRect className="w-full h-40" />
      <SkeletonLine width="w-3/4" />
      <SkeletonLine width="w-1/2" />
    </div>
  );
}

function AvatarRowSkeleton() {
  return (
    <div
      className="flex items-center gap-md"
      aria-busy="true"
      aria-label="Loading content"
    >
      <SkeletonCircle size="w-10 h-10" />
      <div className="flex-1 space-y-sm">
        <SkeletonLine width="w-1/3" />
        <SkeletonLine width="w-1/5" />
      </div>
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div class="skeleton-card" aria-busy="true" aria-label="Loading content">
  <div class="skeleton-rect shimmer" style="height: 160px;"></div>
  <div class="skeleton-line shimmer" style="width: 75%;"></div>
  <div class="skeleton-line shimmer" style="width: 50%;"></div>
</div>

<!-- Extended loading hint (shown after 3s via JS) -->
<p class="skeleton-hint" hidden>Still loading, please wait...</p>

<style>
.skeleton-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.skeleton-line {
  height: 16px; /* matches --text-body line height visually */
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
}

.skeleton-circle {
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
}

.skeleton-rect {
  width: 100%;
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
}

/* .shimmer class is defined in globals.css */

.skeleton-hint {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
  text-align: center;
  margin-top: var(--space-sm);
}

@media (prefers-reduced-motion: reduce) {
  .shimmer {
    animation: none;
    background: var(--bg-elevated);
  }
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Match skeleton shapes to the actual content layout | Use a single generic spinner for all loading states |
| Respect `prefers-reduced-motion` with a static fill | Keep the shimmer animation running for reduced-motion users |
| Add a text hint after 3 seconds of loading | Show skeletons indefinitely with no fallback or timeout |
| Set `aria-busy="true"` on the loading region | Make individual skeleton shapes focusable or readable |

---

### 5.6 Progress / Loading Bar

A thin bar at the top of the viewport indicating page-level loading progress. Used for route transitions, file uploads, or any operation with measurable progress.

#### When to Use

- Indicating a page/route transition is in progress
- Showing upload or processing progress with a known percentage
- Providing visual feedback during background data fetching
- Do NOT use for inline component loading (use Skeleton Loader instead)

#### Anatomy

```
[=========>                                    ]  <- 3px bar, full viewport width
```

1. **Track** -- invisible or same as page background, full viewport width
2. **Fill** -- `--accent` colored bar, 3px height

#### Variants

| Variant       | Behavior                                               |
|---------------|--------------------------------------------------------|
| Indeterminate | Animated sweep from left to right, loops continuously  |
| Determinate   | Width set to progress percentage, smooth `200ms` transition |

#### States

| State      | Behavior                                             |
|------------|------------------------------------------------------|
| Active     | Bar visible, animating or filling                    |
| Complete   | Bar reaches 100%, holds briefly, then fades out      |
| Hidden     | Bar not rendered (default state)                     |

#### Accessibility

- Use `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` for determinate
- For indeterminate, omit `aria-valuenow` (screen readers announce "loading" or "busy")
- Add `aria-label="Page loading"` or a descriptive label
- The bar is a visual-only enhancement -- ensure the page remains usable during loading

#### Tailwind + React

```jsx
function ProgressBar({ progress, indeterminate = false }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : progress}
      aria-label="Page loading"
      className="fixed top-0 left-0 right-0 h-[3px] z-toast overflow-hidden"
    >
      <div
        className={`h-full bg-accent ${
          indeterminate
            ? 'animate-progress-sweep'
            : 'transition-[width] duration-standard ease-default'
        }`}
        style={indeterminate ? undefined : { width: `${progress}%` }}
      />
    </div>
  );
}

/*
  Add to your Tailwind config or globals.css:

  @keyframes progress-sweep {
    0%   { transform: translateX(-100%); width: 40%; }
    50%  { width: 60%; }
    100% { transform: translateX(250%); width: 40%; }
  }
*/
```

#### Plain CSS + HTML

```html
<!-- Determinate -->
<div
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="65"
  aria-label="Upload progress"
  class="progress-bar"
>
  <div class="progress-bar__fill" style="width: 65%;"></div>
</div>

<!-- Indeterminate -->
<div
  role="progressbar"
  aria-label="Page loading"
  class="progress-bar"
>
  <div class="progress-bar__fill progress-bar__fill--indeterminate"></div>
</div>

<style>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: var(--z-toast);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--accent);
  transition: width var(--duration-standard) var(--ease-default);
}

.progress-bar__fill--indeterminate {
  width: 40%;
  animation: progress-sweep 1.5s var(--ease-default) infinite;
}

@keyframes progress-sweep {
  0%   { transform: translateX(-100%); width: 40%; }
  50%  { width: 60%; }
  100% { transform: translateX(250%); width: 40%; }
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar__fill--indeterminate {
    animation: none;
    width: 100%;
    opacity: 0.5;
  }
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Use indeterminate when you cannot predict duration | Show a stuck determinate bar at 99% for a long time |
| Place at the very top of the viewport with `z-toast` | Stack multiple progress bars on one page |
| Fade out after reaching 100% | Leave the completed bar visible permanently |
| Keep the bar at 3px -- it should be subtle, not dominant | Make the bar thick or add text labels on it |

---

### 5.7 Empty State

Centered placeholder views shown when a list, table, or page has no content yet. Guides the user toward the next logical action.

#### When to Use

- A list or table has zero items (empty inbox, no projects, no search results)
- A first-time user lands on a feature they have not populated yet
- A search or filter returns no matching results
- Do NOT use when content is loading (use Skeleton Loader instead)

#### Anatomy

```
         [  Icon  ]       <- w-12 h-12, text-text-tertiary
          Heading          <- text-h3, text-text-primary
     Description text      <- text-body, text-text-secondary
     [ Primary CTA ]       <- optional, accent button
```

1. **Icon** -- contextually appropriate Lucide icon, `w-12 h-12`, `text-text-tertiary`
2. **Heading** -- `text-h3`, concise label for the empty state
3. **Description** -- `text-body text-text-secondary`, one to two sentences explaining why this is empty and what the user can do
4. **CTA button** (optional) -- primary accent button for the most logical next action

#### Variants

| Context         | Icon Example   | Heading Example        | CTA Example       |
|-----------------|----------------|------------------------|--------------------|
| Empty list      | `Inbox`        | "No messages yet"      | "Compose message"  |
| No results      | `SearchX`      | "No results found"     | "Clear filters"    |
| First-time user | `Rocket`       | "Welcome! Get started" | "Create first..."  |
| Error-empty     | `AlertCircle`  | "Something went wrong" | "Try again"        |

#### States

Empty states are static. The CTA button follows standard button states (default, hover, active, focus, disabled).

#### Accessibility

- The icon is decorative: `aria-hidden="true"`
- The heading and description provide all necessary context for screen readers
- If a CTA is present, it must be a focusable button or link
- If the empty state replaces a list, the container should still have its list role removed or updated to avoid confusing screen readers

#### Tailwind + React

```jsx
import { Inbox } from 'lucide-react';

function EmptyState({
  icon: Icon = Inbox,
  heading,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-3xl px-xl">
      <Icon
        className="w-12 h-12 text-text-tertiary mb-lg"
        aria-hidden="true"
      />
      <h3 className="text-h3 text-text-primary mb-sm">{heading}</h3>
      <p className="text-body text-text-secondary max-w-sm mb-xl">
        {description}
      </p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="px-xl py-sm rounded-ds-md bg-accent text-text-on-accent
            text-label hover:bg-accent-hover active:bg-accent-active
            focus-visible:outline-2 focus-visible:outline-accent
            focus-visible:outline-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
```

#### Plain CSS + HTML

```html
<div class="empty-state">
  <svg class="empty-state__icon" width="48" height="48" aria-hidden="true">
    <!-- Lucide Inbox icon -->
  </svg>
  <h3 class="empty-state__heading">No messages yet</h3>
  <p class="empty-state__description">
    When you receive messages, they will appear here.
    Start a conversation to get going.
  </p>
  <button class="empty-state__cta">Compose message</button>
</div>

<style>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-3xl) var(--space-xl);
}

.empty-state__icon {
  color: var(--text-tertiary);
  margin-bottom: var(--space-lg);
}

.empty-state__heading {
  font-size: var(--text-h3);
  font-weight: var(--weight-h3);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.empty-state__description {
  font-size: var(--text-body);
  color: var(--text-secondary);
  max-width: 24rem;
  margin-bottom: var(--space-xl);
}

.empty-state__cta {
  padding: var(--space-sm) var(--space-xl);
  border-radius: var(--radius-md);
  border: none;
  background: var(--accent);
  color: var(--text-on-accent);
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  cursor: pointer;
}
.empty-state__cta:hover { background: var(--accent-hover); }
.empty-state__cta:active { background: var(--accent-active); }
.empty-state__cta:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
```

#### Do / Don't

| Do | Don't |
|----|-------|
| Choose an icon that relates to the content type (Inbox for messages, etc.) | Use a generic sad-face emoji or illustration |
| Provide a clear CTA so the user knows the next step | Leave the user stranded with no action to take |
| Write the description in a helpful, forward-looking tone | Blame the user ("You have not created anything") |
| Keep the layout centered and vertically balanced | Push the empty state to a corner or make it tiny |
