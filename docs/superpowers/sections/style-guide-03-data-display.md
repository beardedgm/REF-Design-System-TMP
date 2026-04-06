## Data Display

Components for presenting structured content, metrics, user identity, and read-only information.

---

### 3.3.1 Card

Content container with optional header, body, and footer regions.

**When to use:** Grouping related content into a distinct visual unit -- dashboard widgets, list items, detail previews, stat summaries.

**Anatomy:**

```
+---------------------------------------+
|  [Header]  (optional, border-bottom)  |
|---------------------------------------|
|  [Body]  main content area            |
|---------------------------------------|
|  [Footer]  (optional, border-top)     |
+---------------------------------------+
```

**Variants:**

| Variant | Padding | Behavior | Use case |
|---------|---------|----------|----------|
| Basic | `space-xl` | Static, no interaction | Informational content |
| Interactive | `space-xl` | `cursor-pointer`, hover shadow + border | Clickable list items, links |
| Compact | `space-md` | Static or interactive | Dense layouts, grids |
| Stat/KPI | `space-xl` | Static | Dashboard metric display |

**States:**

| State | Style |
|-------|-------|
| Default | `bg-bg-card`, `border`, `shadow-sm`, `rounded-ds-lg` |
| Hover (interactive) | `shadow-md`, `border-hover`, `transition 150ms ease` |
| Focus-visible (interactive) | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Disabled | `opacity-50`, `pointer-events-none` |

**Accessibility:**
- Interactive cards use `<a>` or `<button>` as the root, or add `role="link"` / `role="button"` with `tabindex="0"`
- If the entire card is clickable, the heading inside should still be a link for screen reader discoverability
- Keyboard: `Enter` activates interactive cards

**Tailwind + React:**

```jsx
{/* Basic Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl">
  <h3 className="text-h3 text-text-primary mb-sm">Card Title</h3>
  <p className="text-body text-text-secondary">
    Card body content goes here.
  </p>
</div>

{/* Interactive Card */}
<a
  href="/detail/123"
  className="block bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl
             transition-all duration-micro ease-default
             hover:shadow-ds-md hover:border-border-hover
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
             cursor-pointer"
>
  <h3 className="text-h3 text-text-primary mb-sm">Clickable Card</h3>
  <p className="text-body text-text-secondary">Click anywhere to navigate.</p>
</a>

{/* Compact Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-md">
  <h3 className="text-label text-text-primary mb-xs">Compact Title</h3>
  <p className="text-caption text-text-secondary">Dense content layout.</p>
</div>

{/* Stat / KPI Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl">
  <p className="text-caption text-text-secondary mb-xs">Total Revenue</p>
  <p className="text-h1 text-text-primary mb-xs">$48,290</p>
  <span className="text-caption text-success flex items-center gap-xs">
    <ArrowUp className="w-4 h-4" /> 12.5%
  </span>
</div>
```

**Plain CSS + HTML:**

```html
<!-- Basic Card -->
<div class="card">
  <h3 class="card__title">Card Title</h3>
  <p class="card__body">Card body content goes here.</p>
</div>

<!-- Interactive Card -->
<a href="/detail/123" class="card card--interactive">
  <h3 class="card__title">Clickable Card</h3>
  <p class="card__body">Click anywhere to navigate.</p>
</a>

<style>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-xl);
}

.card--interactive {
  display: block;
  cursor: pointer;
  transition: box-shadow var(--duration-micro) var(--ease-default),
              border-color var(--duration-micro) var(--ease-default);
  text-decoration: none;
  color: inherit;
}

.card--interactive:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-hover);
}

.card--interactive:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.card--compact {
  padding: var(--space-md);
}

.card__title {
  font-size: var(--text-h3);
  font-weight: var(--weight-h3);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.card__body {
  font-size: var(--text-body);
  color: var(--text-secondary);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `shadow-sm` default, `shadow-md` on hover for interactive | Hardcode `box-shadow` values -- always use tokens |
| Let card background come from `--bg-card` | Use `--bg-primary` or `--bg-surface` for card backgrounds |
| Use `rounded-ds-lg` (12px) for cards | Use `rounded-ds-md` (8px) -- that is for buttons/inputs |
| Wrap entire card in `<a>` if clickable | Add nested links inside a clickable card (nested interactive) |

---

### 3.3.2 Badge / Tag

Small labeling elements for status indicators and content categorization.

**When to use:** Showing status (active, pending, error), categories, counts, or removable filter tags.

**Anatomy:**

```
+--[ optional icon ]--[ label text ]--[ optional remove X ]--+
```

**Variants:**

| Variant | Background | Text | Border | Use case |
|---------|-----------|------|--------|----------|
| Success | `bg-success-muted` | `text-success` | none | Active, online, completed |
| Error | `bg-error-muted` | `text-error` | none | Failed, offline, critical |
| Warning | `bg-warning-muted` | `text-warning` | none | Pending, expiring |
| Info | `bg-info-muted` | `text-info` | none | New, updated |
| Accent | `bg-accent-muted` | `text-accent` | none | Premium, featured |
| Subtle | `bg-bg-elevated` | `text-text-secondary` | none | Category, neutral tag |

**Sizes:**

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 20px | `px-sm` (8px) | `text-overline` |
| `base` | 24px | `px-md` (12px) | `text-caption` |

**States:**

| State | Style |
|-------|-------|
| Default | As defined by variant |
| Hover (removable) | Remove icon `text-text-primary` |
| Focus-visible (removable) | `outline: 2px solid var(--accent)` on remove button |

**Accessibility:**
- Badges are decorative by default -- the parent context conveys meaning
- Removable tags: remove button has `aria-label="Remove {tag name}"` and is focusable
- Do not rely on color alone -- the label text conveys the status

**Tailwind + React:**

```jsx
{/* Status Badge */}
<span className="inline-flex items-center h-6 px-md rounded-ds-full text-caption font-medium
                 bg-success-muted text-success">
  Active
</span>

{/* Small Badge */}
<span className="inline-flex items-center h-5 px-sm rounded-ds-full text-overline
                 bg-error-muted text-error">
  Offline
</span>

{/* Removable Tag */}
<span className="inline-flex items-center gap-xs h-6 px-md rounded-ds-full text-caption
                 bg-bg-elevated text-text-secondary">
  Design
  <button
    aria-label="Remove Design"
    className="w-4 h-4 rounded-ds-full flex items-center justify-center
               text-text-muted hover:text-text-primary
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
  >
    <X className="w-3 h-3" />
  </button>
</span>
```

**Plain CSS + HTML:**

```html
<!-- Status Badge -->
<span class="badge badge--success">Active</span>

<!-- Removable Tag -->
<span class="badge badge--subtle">
  Design
  <button class="badge__remove" aria-label="Remove Design">
    <svg class="badge__remove-icon"><!-- X icon --></svg>
  </button>
</span>

<style>
.badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 var(--space-md);
  border-radius: var(--radius-full);
  font-size: var(--text-caption);
  font-weight: var(--weight-label);
  gap: var(--space-xs);
}

.badge--sm {
  height: 20px;
  padding: 0 var(--space-sm);
  font-size: var(--text-overline);
  text-transform: uppercase;
  letter-spacing: var(--ls-overline);
}

.badge--success {
  background: var(--success-muted);
  color: var(--success);
}

.badge--error {
  background: var(--error-muted);
  color: var(--error);
}

.badge--warning {
  background: var(--warning-muted);
  color: var(--warning);
}

.badge--info {
  background: var(--info-muted);
  color: var(--info);
}

.badge--accent {
  background: var(--accent-muted);
  color: var(--accent);
}

.badge--subtle {
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.badge__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--radius-full);
  color: var(--text-muted);
}

.badge__remove:hover {
  color: var(--text-primary);
}

.badge__remove:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 0;
}

.badge__remove-icon {
  width: 12px;
  height: 12px;
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use semantic muted backgrounds (`bg-success-muted`) | Use full-strength semantic colors as backgrounds |
| Keep badge text short (1-2 words) | Put sentences in badges |
| Use `rounded-ds-full` for pill shape | Use square or slightly rounded badges |
| Pair color with descriptive label text | Rely on color alone to convey status |

---

### 3.3.3 Data Table

Full-featured table for structured data with sorting, selection, and responsive behavior.

**When to use:** Displaying tabular datasets -- user lists, transaction logs, inventory, any multi-column structured data.

**Anatomy:**

```
+--[checkbox]--[Column A (sortable)]--[Column B]--[Column C]--+
|--------------------------------------------------------------|
|  [ ] row 1 data                                              |
|  [ ] row 2 data (hover highlighted)                          |
|  [x] row 3 data (selected)                                   |
|--------------------------------------------------------------|
|  Empty state (when no data)                                   |
+--------------------------------------------------------------+
```

**Variants:**

| Variant | Description |
|---------|-------------|
| Default | Header + rows, no selection |
| Selectable | Checkbox column, bulk selection |
| Striped | Alternating row backgrounds |
| Compact | Reduced row padding |

**States:**

| State | Style |
|-------|-------|
| Header | `bg-bg-secondary`, `text-caption text-text-secondary`, `font-weight-label`, sticky `top-0` |
| Row default | `bg-bg-card`, `border-b border-border` |
| Row hover | `bg-bg-elevated` |
| Row selected | `bg-accent-subtle` |
| Sortable header | Clickable, cycles `asc` / `desc` / `none`, shows sort icon |
| Empty state | Centered icon + message spanning full width |

**Accessibility:**
- Use semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- Sortable headers: `<th>` wraps `<button>` with `aria-sort="ascending"`, `"descending"`, or `"none"`
- Selectable rows: header checkbox controls "select all" with `aria-checked="mixed"` when partial
- Row checkboxes: `aria-label="Select row {identifier}"`
- Responsive: wrap in a container with `overflow-x: auto` and `role="region"` with `aria-label` and `tabindex="0"`

**Tailwind + React:**

```jsx
<div className="overflow-x-auto rounded-ds-lg border border-border" role="region" aria-label="Users table" tabIndex={0}>
  <table className="w-full text-body text-text-primary">
    <thead className="bg-bg-secondary sticky top-0">
      <tr>
        <th className="w-10 p-md">
          <input
            type="checkbox"
            aria-label="Select all rows"
            className="accent-accent"
          />
        </th>
        <th className="text-left text-caption text-text-secondary font-label p-md">
          <button
            className="inline-flex items-center gap-xs hover:text-text-primary"
            aria-sort="ascending"
          >
            Name
            <ArrowUp className="w-3 h-3" />
          </button>
        </th>
        <th className="text-left text-caption text-text-secondary font-label p-md">
          Email
        </th>
        <th className="text-left text-caption text-text-secondary font-label p-md">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-bg-elevated transition-colors duration-micro">
        <td className="p-md">
          <input type="checkbox" aria-label="Select Jane Cooper" className="accent-accent" />
        </td>
        <td className="p-md font-label">Jane Cooper</td>
        <td className="p-md text-text-secondary">jane@example.com</td>
        <td className="p-md">
          <span className="inline-flex items-center h-5 px-sm rounded-ds-full text-overline bg-success-muted text-success">
            Active
          </span>
        </td>
      </tr>
      {/* More rows... */}
    </tbody>
  </table>
</div>

{/* Empty State */}
<div className="overflow-x-auto rounded-ds-lg border border-border">
  <table className="w-full">
    <thead className="bg-bg-secondary">
      <tr>
        <th className="text-left text-caption text-text-secondary font-label p-md">Name</th>
        <th className="text-left text-caption text-text-secondary font-label p-md">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan={2} className="p-3xl text-center">
          <Inbox className="w-12 h-12 text-text-muted mx-auto mb-md" />
          <p className="text-body text-text-secondary">No users found</p>
          <p className="text-caption text-text-tertiary mt-xs">Try adjusting your filters.</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Plain CSS + HTML:**

```html
<div class="table-container" role="region" aria-label="Users table" tabindex="0">
  <table class="data-table">
    <thead>
      <tr>
        <th class="data-table__check-col">
          <input type="checkbox" aria-label="Select all rows" />
        </th>
        <th>
          <button class="data-table__sort-btn" aria-sort="ascending">
            Name <span class="data-table__sort-icon"><!-- arrow icon --></span>
          </button>
        </th>
        <th>Email</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="checkbox" aria-label="Select Jane Cooper" /></td>
        <td class="data-table__name-cell">Jane Cooper</td>
        <td>jane@example.com</td>
        <td><span class="badge badge--success badge--sm">Active</span></td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.table-container {
  overflow-x: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.data-table {
  width: 100%;
  font-size: var(--text-body);
  color: var(--text-primary);
  border-collapse: collapse;
}

.data-table thead {
  background: var(--bg-secondary);
  position: sticky;
  top: 0;
  z-index: 1;
}

.data-table th {
  text-align: left;
  font-size: var(--text-caption);
  font-weight: var(--weight-label);
  color: var(--text-secondary);
  padding: var(--space-md);
}

.data-table td {
  padding: var(--space-md);
}

.data-table tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background var(--duration-micro) var(--ease-default);
}

.data-table tbody tr:hover {
  background: var(--bg-elevated);
}

.data-table tbody tr.selected {
  background: var(--accent-subtle);
}

.data-table__sort-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  padding: 0;
}

.data-table__sort-btn:hover {
  color: var(--text-primary);
}

.data-table__check-col {
  width: 40px;
}

.data-table__name-cell {
  font-weight: var(--weight-label);
}

/* Empty state */
.data-table__empty {
  padding: var(--space-3xl);
  text-align: center;
}

.data-table__empty-icon {
  width: 48px;
  height: 48px;
  color: var(--text-muted);
  margin: 0 auto var(--space-md);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use sticky header for scrollable tables | Let headers scroll out of view |
| Wrap table in `overflow-x-auto` for mobile | Use fixed widths that break on small screens |
| Use `aria-sort` on sortable column headers | Toggle sort visually without ARIA updates |
| Provide an empty state with helpful message | Show a blank table body when no data exists |
| Use semantic `<table>`, `<th>`, `<td>` | Build tables from `<div>` elements |

---

### 3.3.4 Description List

Key-value pair display for detail views and metadata panels.

**When to use:** Showing object properties, profile details, order summaries, configuration settings.

**Anatomy:**

```
Horizontal:
  [Key (right-aligned)] : [Value (left-aligned)]
  [Key]                 : [Value]

Vertical:
  [Key]
  [Value]
  --------
  [Key]
  [Value]
```

**Variants:**

| Variant | Layout | Use case |
|---------|--------|----------|
| Horizontal | Key and value on same row, key right-aligned | Wide panels, sidebars |
| Vertical | Key above value, stacked | Narrow spaces, mobile |
| Divided | Horizontal/vertical with `border-b` between rows | When visual separation helps scanning |

**Accessibility:**
- Use semantic `<dl>`, `<dt>`, `<dd>` elements
- Group related terms with `<div>` wrappers inside `<dl>` for styling
- Screen readers announce term/definition pairs naturally

**Tailwind + React:**

```jsx
{/* Horizontal Description List */}
<dl className="grid grid-cols-[minmax(120px,auto)_1fr] gap-y-md gap-x-xl">
  <dt className="text-body text-text-secondary text-right">Name</dt>
  <dd className="text-body text-text-primary">Jane Cooper</dd>

  <dt className="text-body text-text-secondary text-right">Email</dt>
  <dd className="text-body text-text-primary">jane@example.com</dd>

  <dt className="text-body text-text-secondary text-right">Role</dt>
  <dd className="text-body text-text-primary">Administrator</dd>
</dl>

{/* Vertical Description List with dividers */}
<dl className="divide-y divide-border">
  <div className="py-md">
    <dt className="text-caption text-text-secondary mb-xs">Name</dt>
    <dd className="text-body text-text-primary">Jane Cooper</dd>
  </div>
  <div className="py-md">
    <dt className="text-caption text-text-secondary mb-xs">Email</dt>
    <dd className="text-body text-text-primary">jane@example.com</dd>
  </div>
  <div className="py-md">
    <dt className="text-caption text-text-secondary mb-xs">Role</dt>
    <dd className="text-body text-text-primary">Administrator</dd>
  </div>
</dl>
```

**Plain CSS + HTML:**

```html
<!-- Horizontal -->
<dl class="desc-list desc-list--horizontal">
  <div class="desc-list__row">
    <dt class="desc-list__key">Name</dt>
    <dd class="desc-list__value">Jane Cooper</dd>
  </div>
  <div class="desc-list__row">
    <dt class="desc-list__key">Email</dt>
    <dd class="desc-list__value">jane@example.com</dd>
  </div>
</dl>

<!-- Vertical with dividers -->
<dl class="desc-list desc-list--vertical desc-list--divided">
  <div class="desc-list__row">
    <dt class="desc-list__key">Name</dt>
    <dd class="desc-list__value">Jane Cooper</dd>
  </div>
  <div class="desc-list__row">
    <dt class="desc-list__key">Email</dt>
    <dd class="desc-list__value">jane@example.com</dd>
  </div>
</dl>

<style>
.desc-list {
  margin: 0;
}

.desc-list--horizontal {
  display: grid;
  grid-template-columns: minmax(120px, auto) 1fr;
  gap: var(--space-md) var(--space-xl);
}

.desc-list--horizontal .desc-list__key {
  text-align: right;
  font-size: var(--text-body);
  color: var(--text-secondary);
}

.desc-list--horizontal .desc-list__value {
  font-size: var(--text-body);
  color: var(--text-primary);
}

.desc-list--vertical .desc-list__row {
  padding: var(--space-md) 0;
}

.desc-list--vertical .desc-list__key {
  font-size: var(--text-caption);
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.desc-list--vertical .desc-list__value {
  font-size: var(--text-body);
  color: var(--text-primary);
}

.desc-list--divided .desc-list__row {
  border-bottom: 1px solid var(--border);
}

.desc-list--divided .desc-list__row:last-child {
  border-bottom: none;
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `<dl>`, `<dt>`, `<dd>` semantic elements | Build with generic `<div>` + `<span>` |
| Switch to vertical layout on mobile | Force horizontal layout in narrow containers |
| Right-align keys in horizontal layout for easy scanning | Left-align keys with inconsistent widths |
| Use `text-secondary` for keys, `text-primary` for values | Use the same color for both |

---

### 3.3.5 Accordion / Collapsible

Expandable content sections for progressive disclosure.

**When to use:** FAQ pages, settings groups, long content sections where showing everything at once is overwhelming.

**Anatomy:**

```
+--------------------------------------------+
|  [Chevron]  [Trigger label]                |  <- button
+--------------------------------------------+
|  [Panel content, hidden when collapsed]    |  <- region
+--------------------------------------------+
```

**Variants:**

| Variant | Behavior | Use case |
|---------|----------|----------|
| Single | Standalone collapsible | One-off expandable section |
| Group | Multiple sections stacked | FAQ, settings categories |
| Exclusive | Group where only one can be open | Step wizards, space-constrained layouts |

**States:**

| State | Style |
|-------|-------|
| Collapsed | Chevron points right/down, panel hidden |
| Expanded | Chevron rotated 180deg, panel visible |
| Hover | Trigger `bg-bg-elevated` |
| Focus-visible | Trigger has `outline: 2px solid var(--accent)` |
| Disabled | `opacity-50`, `pointer-events-none` |

**Accessibility:**
- Trigger: `<button>` with `aria-expanded="true|false"` and `aria-controls="{panel-id}"`
- Panel: `role="region"` with `aria-labelledby="{trigger-id}"` and `id="{panel-id}"`
- Keyboard: `Enter` / `Space` toggles the section
- In a group: each trigger is independently focusable via `Tab`
- Chevron rotation: `transform: rotate(180deg)` with `transition: var(--duration-standard)`

**Tailwind + React:**

```jsx
function Accordion({ items, exclusive = false }) {
  const [openIndex, setOpenIndex] = useState(exclusive ? null : new Set());

  const toggle = (index) => {
    if (exclusive) {
      setOpenIndex(openIndex === index ? null : index);
    } else {
      setOpenIndex((prev) => {
        const next = new Set(prev);
        next.has(index) ? next.delete(index) : next.add(index);
        return next;
      });
    }
  };

  const isOpen = (index) =>
    exclusive ? openIndex === index : openIndex.has(index);

  return (
    <div className="divide-y divide-border border border-border rounded-ds-lg overflow-hidden">
      {items.map((item, index) => (
        <div key={index}>
          <button
            id={`accordion-trigger-${index}`}
            aria-expanded={isOpen(index)}
            aria-controls={`accordion-panel-${index}`}
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-lg text-left
                       text-body text-text-primary font-label
                       hover:bg-bg-elevated transition-colors duration-micro
                       focus-visible:outline focus-visible:outline-2
                       focus-visible:outline-accent focus-visible:outline-offset-[-2px]"
          >
            {item.title}
            <ChevronDown
              className={`w-5 h-5 text-text-secondary transition-transform duration-standard
                         ${isOpen(index) ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            id={`accordion-panel-${index}`}
            role="region"
            aria-labelledby={`accordion-trigger-${index}`}
            hidden={!isOpen(index)}
            className="px-lg pb-lg text-body text-text-secondary"
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Plain CSS + HTML:**

```html
<div class="accordion">
  <div class="accordion__item">
    <button
      class="accordion__trigger"
      id="acc-trigger-1"
      aria-expanded="false"
      aria-controls="acc-panel-1"
    >
      <span>How do I get started?</span>
      <svg class="accordion__chevron"><!-- ChevronDown --></svg>
    </button>
    <div
      class="accordion__panel"
      id="acc-panel-1"
      role="region"
      aria-labelledby="acc-trigger-1"
      hidden
    >
      <p>Sign up for an account and follow the onboarding wizard.</p>
    </div>
  </div>
</div>

<style>
.accordion {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.accordion__item {
  border-bottom: 1px solid var(--border);
}

.accordion__item:last-child {
  border-bottom: none;
}

.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-lg);
  background: none;
  border: none;
  font-size: var(--text-body);
  font-weight: var(--weight-label);
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: background var(--duration-micro) var(--ease-default);
}

.accordion__trigger:hover {
  background: var(--bg-elevated);
}

.accordion__trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.accordion__chevron {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  transition: transform var(--duration-standard) var(--ease-default);
}

.accordion__trigger[aria-expanded="true"] .accordion__chevron {
  transform: rotate(180deg);
}

.accordion__panel {
  padding: 0 var(--space-lg) var(--space-lg);
  font-size: var(--text-body);
  color: var(--text-secondary);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `aria-expanded` and `aria-controls` on every trigger | Toggle visibility without ARIA attributes |
| Animate the chevron rotation with `--duration-standard` | Use bounce/spring easing on the icon |
| Allow multiple open in group mode by default | Default to exclusive mode unless space is constrained |
| Use `hidden` attribute on collapsed panels | Use `display:none` via class toggling (breaks accessibility in some edge cases) |

---

### 3.3.6 Activity Feed / Timeline

Chronological list of events connected by a vertical line.

**When to use:** Audit logs, project history, order tracking, change logs.

**Anatomy:**

```
  [date header]
  |
  o---- [icon] [event title]
  |            [event description]
  |            [timestamp]
  |
  o---- [icon] [event title]
  |            [timestamp]
  |
  [date header]
  |
  o---- [icon] [event title]
```

**Variants:**

| Variant | Description |
|---------|-------------|
| Default | Icon node + content + timestamp |
| Compact | Dot node + single-line content + inline timestamp |
| Grouped | Events grouped by date headers |

**Accessibility:**
- Use `<ol>` for ordered events or `<ul>` for unordered
- Each event is an `<li>`
- Date group headers: use a heading level appropriate for the page hierarchy
- Icons are decorative (`aria-hidden="true"`); meaning conveyed by text
- Timestamps use `<time datetime="...">` for machine readability

**Tailwind + React:**

```jsx
<div>
  <h3 className="text-caption text-text-secondary font-label mb-md">Today</h3>
  <ol className="relative ml-4 border-l border-border">
    <li className="mb-xl pl-xl relative">
      {/* Node dot */}
      <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-ds-full bg-success ring-4 ring-bg-card" />
      <div>
        <p className="text-body text-text-primary font-label">Deployment completed</p>
        <p className="text-caption text-text-secondary mt-xs">
          v2.4.1 deployed to production successfully.
        </p>
        <time className="text-caption text-text-tertiary mt-xs block" dateTime="2026-04-06T14:30:00Z">
          2:30 PM
        </time>
      </div>
    </li>
    <li className="mb-xl pl-xl relative">
      <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-ds-full bg-info ring-4 ring-bg-card" />
      <div>
        <p className="text-body text-text-primary font-label">Code review approved</p>
        <time className="text-caption text-text-tertiary mt-xs block" dateTime="2026-04-06T11:00:00Z">
          11:00 AM
        </time>
      </div>
    </li>
  </ol>
</div>
```

**Plain CSS + HTML:**

```html
<div class="timeline">
  <h3 class="timeline__date-header">Today</h3>
  <ol class="timeline__list">
    <li class="timeline__event">
      <span class="timeline__node timeline__node--success" aria-hidden="true"></span>
      <div class="timeline__content">
        <p class="timeline__title">Deployment completed</p>
        <p class="timeline__desc">v2.4.1 deployed to production successfully.</p>
        <time class="timeline__time" datetime="2026-04-06T14:30:00Z">2:30 PM</time>
      </div>
    </li>
    <li class="timeline__event">
      <span class="timeline__node timeline__node--info" aria-hidden="true"></span>
      <div class="timeline__content">
        <p class="timeline__title">Code review approved</p>
        <time class="timeline__time" datetime="2026-04-06T11:00:00Z">11:00 AM</time>
      </div>
    </li>
  </ol>
</div>

<style>
.timeline__date-header {
  font-size: var(--text-caption);
  font-weight: var(--weight-label);
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.timeline__list {
  position: relative;
  margin-left: var(--space-lg);
  border-left: 1px solid var(--border);
  list-style: none;
  padding: 0;
}

.timeline__event {
  position: relative;
  padding-left: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.timeline__node {
  position: absolute;
  left: -5px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  box-shadow: 0 0 0 4px var(--bg-card);
}

.timeline__node--success { background: var(--success); }
.timeline__node--error   { background: var(--error); }
.timeline__node--info    { background: var(--info); }
.timeline__node--warning { background: var(--warning); }
.timeline__node--muted   { background: var(--text-muted); }

.timeline__title {
  font-size: var(--text-body);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}

.timeline__desc {
  font-size: var(--text-caption);
  color: var(--text-secondary);
  margin-top: var(--space-xs);
}

.timeline__time {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
  margin-top: var(--space-xs);
  display: block;
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use semantic `<ol>` / `<ul>` and `<li>` | Build with nested `<div>` elements |
| Use `<time datetime="...">` for timestamps | Use plain text for dates without machine-readable format |
| Mark icon nodes `aria-hidden="true"` | Rely on node color alone to convey event type |
| Group events by date for long feeds | Show hundreds of events without grouping |

---

### 3.3.7 Progress Bar

Visual completion indicator in linear, circular, stepped, and indeterminate forms.

**When to use:** Upload progress, onboarding steps, usage meters, loading states.

**Anatomy:**

```
Linear:   [===========--------] 65%
Ring:     ( circular SVG arc )
Stepped:  [===|===|===|   |   ] Step 3 of 5
```

**Variants:**

| Variant | Description | Fill color |
|---------|-------------|------------|
| Linear | Horizontal bar | `--accent` (single), `--status-N` (multi) |
| Ring / Circle | SVG circular progress | `--accent` |
| Stepped | Segmented bar showing discrete steps | `--accent` per completed step |
| Indeterminate | Animated stripe, no known endpoint | `--accent` |

**States:**

| State | Style |
|-------|-------|
| Track | `bg-bg-elevated`, `rounded-ds-full`, height `8px` (default) or `4px` (slim) |
| Fill | `bg-accent` (or `bg-status-N`), `rounded-ds-full`, `transition: width 300ms ease` |
| Complete | Fill at 100%, optional `bg-success` swap |
| Indeterminate | CSS animation sliding stripe left-to-right |

**Accessibility:**
- Linear / Ring: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label`
- Indeterminate: omit `aria-valuenow`
- Stepped: use `aria-label="Step {current} of {total}"` or equivalent text
- Respect `prefers-reduced-motion`: stop indeterminate animation

**Tailwind + React:**

```jsx
{/* Linear Progress */}
<div className="w-full">
  <div className="flex justify-between mb-xs">
    <span className="text-caption text-text-secondary">Storage</span>
    <span className="text-caption text-text-secondary">65%</span>
  </div>
  <div
    className="h-2 bg-bg-elevated rounded-ds-full overflow-hidden"
    role="progressbar"
    aria-valuenow={65}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label="Storage usage"
  >
    <div
      className="h-full bg-accent rounded-ds-full transition-all duration-emphasis"
      style={{ width: '65%' }}
    />
  </div>
</div>

{/* Stepped Progress */}
<div className="flex gap-sm" aria-label="Step 3 of 5" role="progressbar" aria-valuenow={3} aria-valuemin={1} aria-valuemax={5}>
  {[1, 2, 3, 4, 5].map((step) => (
    <div
      key={step}
      className={`h-2 flex-1 rounded-ds-full ${
        step <= 3 ? 'bg-accent' : 'bg-bg-elevated'
      }`}
    />
  ))}
</div>

{/* Circle / Ring Progress (SVG) */}
<svg className="w-16 h-16" viewBox="0 0 64 64" aria-label="75% complete" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
  <circle cx="32" cy="32" r="28" fill="none" strokeWidth="4" className="stroke-bg-elevated" />
  <circle
    cx="32" cy="32" r="28" fill="none" strokeWidth="4"
    className="stroke-accent"
    strokeLinecap="round"
    strokeDasharray={`${2 * Math.PI * 28}`}
    strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.75)}`}
    transform="rotate(-90 32 32)"
  />
  <text x="32" y="32" textAnchor="middle" dominantBaseline="central" className="text-caption text-text-primary fill-current">
    75%
  </text>
</svg>

{/* Indeterminate */}
<div className="h-2 bg-bg-elevated rounded-ds-full overflow-hidden" role="progressbar" aria-label="Loading">
  <div className="h-full w-1/3 bg-accent rounded-ds-full animate-[indeterminate_1.5s_ease-in-out_infinite]" />
</div>
```

**Plain CSS + HTML:**

```html
<!-- Linear -->
<div class="progress">
  <div class="progress__label">
    <span>Storage</span>
    <span>65%</span>
  </div>
  <div class="progress__track" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="Storage usage">
    <div class="progress__fill" style="width: 65%"></div>
  </div>
</div>

<!-- Indeterminate -->
<div class="progress__track progress__track--indeterminate" role="progressbar" aria-label="Loading">
  <div class="progress__fill progress__fill--indeterminate"></div>
</div>

<style>
.progress__label {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-caption);
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.progress__track {
  height: 8px;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  background: var(--accent);
  border-radius: var(--radius-full);
  transition: width var(--duration-emphasis) var(--ease-default);
}

.progress__fill--indeterminate {
  width: 33%;
  animation: indeterminate 1.5s ease-in-out infinite;
}

@keyframes indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

@media (prefers-reduced-motion: reduce) {
  .progress__fill--indeterminate {
    animation: none;
    width: 100%;
    opacity: 0.5;
  }
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `--accent` for single-metric fills | Use `--accent` for multi-series data fills (use `--status-N`) |
| Use `--bg-elevated` for the track | Use `--border` or a hardcoded gray for the track |
| Include `role="progressbar"` with `aria-valuenow` | Show progress visually without ARIA |
| Respect `prefers-reduced-motion` for animations | Run indeterminate animation unconditionally |

---

### 3.3.8 Stat Card / KPI

Dashboard metric display with large number, label, and trend indicator.

**When to use:** Dashboard summary rows, analytics overview, KPI grids.

**Anatomy:**

```
+-----------------------------------+
|  [Label]         text-caption     |
|  [Large number]  text-h1 / h2    |
|  [Trend arrow + percentage]      |
|  [Optional sparkline]            |
+-----------------------------------+
```

**Variants:**

| Variant | Number size | Padding | Use case |
|---------|------------|---------|----------|
| Default | `text-h1` | `space-xl` | Primary metrics in a grid |
| Compact | `text-h2` | `space-md` | Dense dashboard grids, sidebar stats |

**States:**

| State | Style |
|-------|-------|
| Trend up | `text-success` + `ArrowUp` icon |
| Trend down | `text-error` + `ArrowDown` icon |
| Neutral | `text-text-secondary` + `Minus` icon |

**Accessibility:**
- The card itself has no special role -- it is a static display
- Trend must have text label ("+12.5%") not just an icon
- Sparklines are decorative: `aria-hidden="true"` on the SVG
- Use descriptive headings or `aria-label` on the card container if context is not provided by surrounding content

**Tailwind + React:**

```jsx
{/* Default Stat Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl">
  <p className="text-caption text-text-secondary mb-xs">Total Revenue</p>
  <p className="text-h1 text-text-primary mb-sm">$48,290</p>
  <div className="flex items-center gap-xs">
    <ArrowUp className="w-4 h-4 text-success" />
    <span className="text-caption text-success font-label">+12.5%</span>
    <span className="text-caption text-text-tertiary">vs last month</span>
  </div>
</div>

{/* Compact Stat Card */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-md">
  <p className="text-caption text-text-secondary mb-xs">Active Users</p>
  <p className="text-h2 text-text-primary mb-xs">1,284</p>
  <div className="flex items-center gap-xs">
    <ArrowDown className="w-4 h-4 text-error" />
    <span className="text-caption text-error font-label">-3.2%</span>
  </div>
</div>

{/* Stat Card with Sparkline */}
<div className="bg-bg-card border border-border rounded-ds-lg shadow-ds-sm p-xl relative overflow-hidden">
  <p className="text-caption text-text-secondary mb-xs">Orders</p>
  <p className="text-h1 text-text-primary mb-sm">892</p>
  <div className="flex items-center gap-xs">
    <ArrowUp className="w-4 h-4 text-success" />
    <span className="text-caption text-success font-label">+8.1%</span>
  </div>
  {/* Decorative sparkline */}
  <svg className="absolute bottom-0 left-0 w-full h-12 opacity-20" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 200 50">
    <polyline fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"
      points="0,40 20,35 40,38 60,25 80,30 100,15 120,20 140,10 160,18 180,5 200,12" />
  </svg>
</div>
```

**Plain CSS + HTML:**

```html
<div class="stat-card">
  <p class="stat-card__label">Total Revenue</p>
  <p class="stat-card__value">$48,290</p>
  <div class="stat-card__trend stat-card__trend--up">
    <svg class="stat-card__trend-icon" aria-hidden="true"><!-- ArrowUp --></svg>
    <span>+12.5%</span>
    <span class="stat-card__trend-context">vs last month</span>
  </div>
</div>

<style>
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-xl);
}

.stat-card--compact {
  padding: var(--space-md);
}

.stat-card__label {
  font-size: var(--text-caption);
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.stat-card__value {
  font-size: var(--text-h1);
  font-weight: var(--weight-h1);
  letter-spacing: var(--ls-h1);
  line-height: var(--lh-h1);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.stat-card--compact .stat-card__value {
  font-size: var(--text-h2);
  font-weight: var(--weight-h2);
  margin-bottom: var(--space-xs);
}

.stat-card__trend {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-caption);
  font-weight: var(--weight-label);
}

.stat-card__trend--up   { color: var(--success); }
.stat-card__trend--down { color: var(--error); }

.stat-card__trend-icon {
  width: 16px;
  height: 16px;
}

.stat-card__trend-context {
  color: var(--text-tertiary);
  font-weight: var(--weight-caption);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `text-h1` for primary stats, `text-h2` for compact | Use arbitrary font sizes for stat numbers |
| Pair trend arrow with a text percentage | Show only a colored arrow with no number |
| Mark sparklines `aria-hidden="true"` | Leave sparkline SVGs discoverable to screen readers |
| Use `text-success` / `text-error` for trends | Use accent color for trend indicators |

---

### 3.3.9 Avatar

User representation as image, initials, or group.

**When to use:** User profiles, comment authors, assignee indicators, team member lists.

**Anatomy:**

```
Image:     [rounded image with alt text]
Initials:  [colored circle with 1-2 letters]
With dot:  [avatar] + [status dot at bottom-right]
Group:     [avatar][avatar][avatar][+N]
```

**Sizes:**

| Size | Dimension | Tailwind width | Use case |
|------|-----------|----------------|----------|
| `xs` | 24px | `w-6 h-6` | Inline mentions, compact lists |
| `sm` | 32px | `w-8 h-8` | Comment threads, table cells |
| `md` | 40px | `w-10 h-10` | Cards, default size |
| `lg` | 56px | `w-14 h-14` | Profile headers, hero sections |

**Status dot colors:**

| Status | Color |
|--------|-------|
| Online | `bg-success` |
| Away | `bg-warning` |
| Busy | `bg-error` |
| Offline | `bg-text-muted` |

**Accessibility:**
- Image avatars: `alt="User Name"` (always include the user's name)
- Initials fallback: `aria-label="User Name"` on the container
- Status dot: `aria-label` on the dot or visually hidden text (e.g., "Online")
- Avatar groups: announce total count (e.g., "+3 more" must be accessible text, not just visual)
- Decorative context (e.g., avatar next to the user's name text): `alt=""` or `aria-hidden="true"`

**Tailwind + React:**

```jsx
{/* Image Avatar - Medium */}
<img
  src="/avatars/jane.jpg"
  alt="Jane Cooper"
  className="w-10 h-10 rounded-ds-full object-cover"
/>

{/* Initials Fallback - Medium */}
<div
  className="w-10 h-10 rounded-ds-full bg-accent flex items-center justify-center"
  aria-label="Jane Cooper"
>
  <span className="text-label text-text-on-accent">JC</span>
</div>

{/* Avatar with Status Dot */}
<div className="relative inline-block">
  <img
    src="/avatars/jane.jpg"
    alt="Jane Cooper"
    className="w-10 h-10 rounded-ds-full object-cover"
  />
  <span
    className="absolute bottom-0 right-0 w-3 h-3 rounded-ds-full bg-success ring-2 ring-bg-card"
    aria-label="Online"
  />
</div>

{/* Avatar Group */}
<div className="flex -space-x-2" aria-label="Team members">
  <img src="/avatars/jane.jpg" alt="Jane Cooper" className="w-8 h-8 rounded-ds-full object-cover ring-2 ring-bg-card" />
  <img src="/avatars/bob.jpg" alt="Bob Smith" className="w-8 h-8 rounded-ds-full object-cover ring-2 ring-bg-card" />
  <img src="/avatars/alex.jpg" alt="Alex Doe" className="w-8 h-8 rounded-ds-full object-cover ring-2 ring-bg-card" />
  <div className="w-8 h-8 rounded-ds-full bg-bg-elevated flex items-center justify-center ring-2 ring-bg-card">
    <span className="text-overline text-text-secondary">+3</span>
  </div>
</div>
```

**Plain CSS + HTML:**

```html
<!-- Image Avatar -->
<img class="avatar avatar--md" src="/avatars/jane.jpg" alt="Jane Cooper" />

<!-- Initials Fallback -->
<div class="avatar avatar--md avatar--initials" aria-label="Jane Cooper">
  <span>JC</span>
</div>

<!-- Avatar with Status -->
<div class="avatar-wrapper">
  <img class="avatar avatar--md" src="/avatars/jane.jpg" alt="Jane Cooper" />
  <span class="avatar__status avatar__status--online" aria-label="Online"></span>
</div>

<!-- Avatar Group -->
<div class="avatar-group" aria-label="Team members">
  <img class="avatar avatar--sm" src="/avatars/jane.jpg" alt="Jane Cooper" />
  <img class="avatar avatar--sm" src="/avatars/bob.jpg" alt="Bob Smith" />
  <div class="avatar avatar--sm avatar--overflow">
    <span>+3</span>
  </div>
</div>

<style>
.avatar {
  border-radius: var(--radius-full);
  object-fit: cover;
  display: inline-block;
}

.avatar--xs { width: 24px; height: 24px; }
.avatar--sm { width: 32px; height: 32px; }
.avatar--md { width: 40px; height: 40px; }
.avatar--lg { width: 56px; height: 56px; }

.avatar--initials {
  background: var(--accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-accent);
  font-size: var(--text-label);
  font-weight: var(--weight-label);
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  box-shadow: 0 0 0 2px var(--bg-card);
}

.avatar__status--online  { background: var(--success); }
.avatar__status--away    { background: var(--warning); }
.avatar__status--busy    { background: var(--error); }
.avatar__status--offline { background: var(--text-muted); }

.avatar-group {
  display: flex;
}

.avatar-group .avatar {
  margin-left: -8px;
  box-shadow: 0 0 0 2px var(--bg-card);
}

.avatar-group .avatar:first-child {
  margin-left: 0;
}

.avatar--overflow {
  background: var(--bg-elevated);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-overline);
  font-weight: var(--weight-overline);
  text-transform: uppercase;
  letter-spacing: var(--ls-overline);
  color: var(--text-secondary);
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Always include `alt` text with the user's name | Use empty `alt` unless avatar is decorative (name already shown as text) |
| Use `bg-accent text-text-on-accent` for initials | Use random or hardcoded background colors for initials |
| Use `ring-2 ring-bg-card` on status dots and group items | Let status dots blend into the avatar edge |
| Size consistently: `xs` 24, `sm` 32, `md` 40, `lg` 56 | Use arbitrary avatar sizes outside the scale |

---

### 3.3.10 Code Block / KBD

Display code snippets, inline code, and keyboard shortcut indicators.

**When to use:** Documentation, changelogs, settings pages showing keyboard shortcuts, API references, configuration displays.

**Anatomy:**

```
Code block:   +--- header (optional: language label + copy button) ---+
              |  line 1                                               |
              |  line 2                                               |
              +-------------------------------------------------------+

Inline code:  Text with `inline code` in a sentence.

KBD:          Press [Ctrl] + [K] to open command palette.
```

**Variants:**

| Variant | Style | Use case |
|---------|-------|----------|
| Code block | `bg-bg-secondary`, `border`, monospace, optional line numbers | Multi-line code |
| Inline code | `bg-bg-elevated`, `px-xs`, `rounded-sm`, monospace | Code in body text |
| KBD | `bg-bg-elevated`, `border`, `border-b-2`, `rounded-sm`, `text-caption` | Keyboard shortcuts |

**States:**

| State | Style |
|-------|-------|
| Default | As defined by variant |
| Copy button hover | `bg-bg-elevated`, `text-text-primary` |
| Copy button active | Brief "Copied!" text swap |

**Accessibility:**
- Code blocks: use `<pre><code>` semantic elements
- If syntax-highlighted, add `aria-label="Code example"` or a heading before the block
- KBD: use `<kbd>` semantic element; screen readers announce it as keyboard input
- Copy button: `aria-label="Copy code to clipboard"`, announce success with `aria-live="polite"` region

**Tailwind + React:**

```jsx
{/* Code Block */}
<div className="rounded-ds-lg border border-border overflow-hidden">
  <div className="flex items-center justify-between px-lg py-sm bg-bg-elevated border-b border-border">
    <span className="text-caption text-text-tertiary">jsx</span>
    <button
      className="text-caption text-text-secondary hover:text-text-primary
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent
                 flex items-center gap-xs"
      aria-label="Copy code to clipboard"
      onClick={handleCopy}
    >
      <Copy className="w-4 h-4" />
      Copy
    </button>
  </div>
  <pre className="bg-bg-secondary p-lg overflow-x-auto">
    <code className="text-body font-mono text-text-primary">
{`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
    </code>
  </pre>
</div>

{/* Inline Code */}
<p className="text-body text-text-primary">
  Use the <code className="bg-bg-elevated text-text-primary px-xs py-[1px] rounded-ds-sm text-[0.8125rem] font-mono">useState</code> hook for local state.
</p>

{/* Keyboard Shortcut */}
<p className="text-body text-text-secondary">
  Press{' '}
  <kbd className="bg-bg-elevated border border-border border-b-2 rounded-ds-sm px-sm py-[1px] text-caption font-mono text-text-primary">Ctrl</kbd>
  {' + '}
  <kbd className="bg-bg-elevated border border-border border-b-2 rounded-ds-sm px-sm py-[1px] text-caption font-mono text-text-primary">K</kbd>
  {' '}to open the command palette.
</p>
```

**Plain CSS + HTML:**

```html
<!-- Code Block -->
<div class="code-block">
  <div class="code-block__header">
    <span class="code-block__lang">jsx</span>
    <button class="code-block__copy" aria-label="Copy code to clipboard">
      <svg class="code-block__copy-icon"><!-- Copy icon --></svg>
      Copy
    </button>
  </div>
  <pre class="code-block__pre"><code class="code-block__code">function greet(name) {
  return `Hello, ${name}!`;
}</code></pre>
</div>

<!-- Inline Code -->
<p>Use the <code class="inline-code">useState</code> hook for local state.</p>

<!-- Keyboard Shortcut -->
<p>Press <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">K</kbd> to open the command palette.</p>

<style>
.code-block {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  overflow: hidden;
}

.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-lg);
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}

.code-block__lang {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}

.code-block__copy {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-caption);
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.code-block__copy:hover {
  color: var(--text-primary);
}

.code-block__copy:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.code-block__copy-icon {
  width: 16px;
  height: 16px;
}

.code-block__pre {
  background: var(--bg-secondary);
  padding: var(--space-lg);
  overflow-x: auto;
  margin: 0;
}

.code-block__code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: var(--text-body);
  color: var(--text-primary);
  line-height: var(--lh-body);
}

/* Inline Code */
.inline-code {
  background: var(--bg-elevated);
  color: var(--text-primary);
  padding: 1px var(--space-xs);
  border-radius: var(--radius-sm);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.8125rem;
}

/* Keyboard Key */
.kbd {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: var(--radius-sm);
  padding: 1px var(--space-sm);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: var(--text-caption);
  color: var(--text-primary);
  white-space: nowrap;
}
</style>
```

**Do / Don't:**

| Do | Don't |
|----|-------|
| Use `<pre><code>` for code blocks | Use `<div>` with `white-space: pre` |
| Use `<kbd>` for keyboard shortcut keys | Use `<span>` styled to look like keys |
| Use `bg-bg-secondary` for code block background | Hardcode a dark background that breaks in light theme |
| Provide a copy button with `aria-label` | Require users to manually select and copy code |
| Use monospace font-family stack | Use the body `Inter` font for code |
| Use `border-b-2` on `<kbd>` for the pressed-key depth effect | Use box-shadow for the key depth (harder to theme) |
