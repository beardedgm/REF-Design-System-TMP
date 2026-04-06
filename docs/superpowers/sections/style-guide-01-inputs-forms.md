## Inputs & Forms

All form controls in the Signature Design System share a consistent visual language: `bg-bg-elevated` surfaces, `border-border` edges that shift to `border-accent` on focus, and `text-caption text-error` validation messages. Every input requires a visible `<label>` -- placeholder-only fields are never acceptable.

---

### 1 Text Input

**When to use:** Standard single-line data entry -- names, emails, URLs, numbers. The most common form control in any application.

**Anatomy:**
- Label -- identifies the field, always visible above the input
- Required indicator (`*`) -- signals mandatory fields, rendered in `text-error`
- Input field -- the interactive text entry area
- Help text -- optional guidance below the label
- Error message -- validation feedback below the input

**Variants:**
| Variant | Description |
|---------|-------------|
| sm | 32px height, compact forms and table filters |
| base | 36px height, default for most forms |
| lg | 40px height, prominent single-field forms like login |
| With icon | Leading or trailing icon inside the input |

**States:** default, hover, focus-visible, disabled, error, success

**Accessibility:**
- ARIA: `<label>` linked via `htmlFor`/`id`, `aria-describedby` points to help text or error message, `aria-invalid="true"` on error
- Keyboard: Tab to focus, standard text editing keys
- Screen reader: announces label, required state, and error message when present

**Tailwind + React Example:**

```jsx
function TextInput({ label, id, required, error, helpText, size = "base", ...props }) {
  const heights = { sm: "h-[32px]", base: "h-[36px]", lg: "h-[40px]" };

  return (
    <div className="flex flex-col gap-sm">
      <label htmlFor={id} className="text-label text-text-primary">
        {label}
        {required && <span className="text-error ml-xs">*</span>}
      </label>

      {helpText && (
        <p id={`${id}-help`} className="text-caption text-text-tertiary -mt-xs">
          {helpText}
        </p>
      )}

      <input
        id={id}
        type="text"
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          error ? `${id}-error` : helpText ? `${id}-help` : undefined
        }
        className={`
          ${heights[size]} w-full px-md rounded-ds-md
          bg-bg-elevated border text-text-primary text-body
          placeholder:text-text-muted
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:border-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? "border-error focus-visible:ring-error"
            : "border-border hover:border-border-hover"
          }
        `}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-caption text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label for="email" class="form-label">
    Email address<span class="form-required">*</span>
  </label>
  <p id="email-help" class="form-help">We will never share your email.</p>
  <input
    type="email"
    id="email"
    required
    aria-describedby="email-help"
    class="form-input"
    placeholder="you@example.com"
  />
</div>

<style>
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.form-label {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}
.form-required {
  color: var(--error);
  margin-left: var(--space-xs);
}
.form-help {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
  margin-top: calc(-1 * var(--space-xs));
}
.form-input {
  height: 36px;
  width: 100%;
  padding: 0 var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  transition: border-color var(--duration-micro) var(--ease-default);
}
.form-input::placeholder {
  color: var(--text-muted);
}
.form-input:hover {
  border-color: var(--border-hover);
}
.form-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.form-input--error {
  border-color: var(--error);
}
.form-input--error:focus-visible {
  outline-color: var(--error);
}
.form-error {
  font-size: var(--text-caption);
  color: var(--error);
}
</style>
```

**Do / Don't:**
- DO: Always pair the input with a visible `<label>` and link them via `htmlFor`/`id`
- DON'T: Use placeholder text as the only label -- it disappears on focus and fails accessibility

---

### 2 Textarea

**When to use:** Multi-line text entry -- descriptions, comments, notes, bio fields. Use instead of Text Input when content is expected to exceed one line.

**Anatomy:**
- Label -- identifies the field
- Textarea -- resizable multi-line input area
- Character count -- optional, displayed bottom-right
- Error message -- validation feedback below the textarea

**Variants:**
| Variant | Description |
|---------|-------------|
| Default | Vertically resizable, min-height 80px |
| Fixed height | Non-resizable, specific row count |
| With character count | Shows current/max character count |

**States:** default, hover, focus-visible, disabled, error

**Accessibility:**
- ARIA: `<label>` linked via `htmlFor`/`id`, `aria-describedby` for help or error text, `aria-invalid="true"` on error
- Keyboard: Tab to focus, standard text editing keys, no Tab-trapping (Tab moves to next field)
- Screen reader: announces label, character count updates via `aria-live="polite"` region

**Tailwind + React Example:**

```jsx
function Textarea({ label, id, required, error, maxLength, rows = 3, ...props }) {
  const [value, setValue] = React.useState(props.defaultValue || "");

  return (
    <div className="flex flex-col gap-sm">
      <label htmlFor={id} className="text-label text-text-primary">
        {label}
        {required && <span className="text-error ml-xs">*</span>}
      </label>

      <textarea
        id={id}
        rows={rows}
        required={required}
        maxLength={maxLength}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`
          w-full min-h-[80px] px-md py-sm rounded-ds-md resize-y
          bg-bg-elevated border text-text-primary text-body
          placeholder:text-text-muted
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:border-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? "border-error focus-visible:ring-error"
            : "border-border hover:border-border-hover"
          }
        `}
        {...props}
      />

      <div className="flex justify-between">
        {error && (
          <p id={`${id}-error`} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
        {maxLength && (
          <p className="text-caption text-text-tertiary ml-auto" aria-live="polite">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label for="bio" class="form-label">Bio</label>
  <textarea
    id="bio"
    rows="3"
    maxlength="200"
    class="form-textarea"
    placeholder="Tell us about yourself..."
  ></textarea>
  <div class="form-textarea-footer">
    <span class="form-char-count" aria-live="polite">0/200</span>
  </div>
</div>

<style>
.form-textarea {
  width: 100%;
  min-height: 80px;
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  resize: vertical;
  transition: border-color var(--duration-micro) var(--ease-default);
}
.form-textarea:hover {
  border-color: var(--border-hover);
}
.form-textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.form-textarea-footer {
  display: flex;
  justify-content: flex-end;
}
.form-char-count {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
</style>
```

**Do / Don't:**
- DO: Set a sensible `min-height` (80px) so the textarea is clearly multi-line
- DON'T: Trap Tab key inside the textarea -- users need Tab to navigate to the next form field

---

### 3 Search Input

**When to use:** Standalone search fields -- page search, list filtering, command search. Not for inline table column filters (use Text Input with a filter icon instead).

**Anatomy:**
- Search icon -- magnifying glass positioned at the left inside the input
- Input field -- the text entry area with `type="search"`
- Clear button -- appears when input has value, clears on click
- Container -- wraps everything with `role="search"`

**Variants:**
| Variant | Description |
|---------|-------------|
| Default | Full-width search with icon and clear button |
| Compact | Smaller height for toolbars and headers |

**States:** default, hover, focus-visible, has-value (shows clear button), disabled

**Accessibility:**
- ARIA: `role="search"` on container, `aria-label="Search"` on input, clear button has `aria-label="Clear search"`
- Keyboard: Tab to focus, Escape clears input, Enter submits (optional)
- Screen reader: announces "Search" landmark, clear button action

**Tailwind + React Example:**

```jsx
import { Search, X } from "lucide-react";

function SearchInput({ placeholder = "Search...", onSearch, ...props }) {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  const handleClear = () => {
    setValue("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClear();
  };

  return (
    <div role="search" className="relative w-full">
      <Search className="absolute left-md top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch?.(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search"
        className="
          w-full h-[36px] pl-xl pr-xl rounded-ds-md
          bg-bg-elevated border border-border text-text-primary text-body
          placeholder:text-text-muted
          transition-colors duration-micro
          hover:border-border-hover
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:border-accent
        "
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="
            absolute right-sm top-1/2 -translate-y-1/2
            p-xs rounded-ds-sm text-text-muted
            hover:text-text-primary hover:bg-bg-elevated
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
          "
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div role="search" class="search-container">
  <svg class="search-icon" width="16" height="16" aria-hidden="true">
    <use href="#icon-search" />
  </svg>
  <input
    type="search"
    aria-label="Search"
    class="search-input"
    placeholder="Search..."
  />
  <button type="button" class="search-clear" aria-label="Clear search" hidden>
    <svg width="16" height="16" aria-hidden="true"><use href="#icon-x" /></svg>
  </button>
</div>

<style>
.search-container {
  position: relative;
  width: 100%;
}
.search-icon {
  position: absolute;
  left: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}
.search-input {
  width: 100%;
  height: 36px;
  padding: 0 var(--space-xl);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  transition: border-color var(--duration-micro) var(--ease-default);
}
.search-input:hover {
  border-color: var(--border-hover);
}
.search-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.search-clear {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  padding: var(--space-xs);
  border: none;
  background: none;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.search-clear:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}
</style>
```

**Do / Don't:**
- DO: Debounce the search callback (300ms recommended) to avoid excessive API calls
- DON'T: Forget to add `role="search"` on the container -- it creates a search landmark for screen readers

---

### 4 Select Dropdown

**When to use:** Choosing one or more options from a predefined list. Use when there are 5+ options (for fewer, consider Radio Group). Supports search filtering and multi-select.

**Anatomy:**
- Trigger button -- displays the selected value, `role="combobox"`
- Chevron icon -- indicates dropdown, rotates when open
- Dropdown panel -- `role="listbox"`, absolutely positioned below trigger
- Option items -- `role="option"` with `aria-selected`
- Search input -- optional, filters the option list
- Multi-select badge -- shows count of selected items in trigger

**Variants:**
| Variant | Description |
|---------|-------------|
| Single select | One option selected at a time |
| Multi-select | Checkbox on each option, badge shows count |
| Searchable | Search input at top of dropdown panel |

**States:** default, hover, focus-visible, open, disabled, error

**Accessibility:**
- ARIA: trigger has `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`; list has `role="listbox"`; items have `role="option"`, `aria-selected`
- Keyboard: Enter/Space opens, arrows navigate options, Enter selects, Escape closes, type-ahead search
- Screen reader: announces selected value, expanded/collapsed state, option count

**Tailwind + React Example:**

```jsx
import { ChevronDown, Check } from "lucide-react";

function Select({ label, id, options, value, onChange, error, required, placeholder = "Select..." }) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const listboxId = `${id}-listbox`;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (open && activeIndex >= 0) {
          onChange(options[activeIndex].value);
          setOpen(false);
        } else {
          setOpen(true);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-sm relative">
      <label id={`${id}-label`} className="text-label text-text-primary">
        {label}
        {required && <span className="text-error ml-xs">*</span>}
      </label>

      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={`${id}-label`}
        aria-invalid={error ? "true" : undefined}
        onKeyDown={handleKeyDown}
        onClick={() => setOpen(!open)}
        className={`
          flex items-center justify-between h-[36px] px-md rounded-ds-md
          bg-bg-elevated border text-body
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:border-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? "border-error"
            : "border-border hover:border-border-hover"
          }
          ${selected ? "text-text-primary" : "text-text-muted"}
        `}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-micro ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="
            absolute top-full left-0 right-0 mt-xs z-dropdown
            bg-bg-card border border-border rounded-ds-md shadow-ds-lg
            max-h-[240px] overflow-y-auto py-xs
          "
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => { onChange(option.value); setOpen(false); }}
              className={`
                flex items-center justify-between px-md py-sm cursor-pointer
                text-body transition-colors duration-micro
                ${index === activeIndex ? "bg-bg-elevated" : ""}
                ${option.value === value ? "text-accent" : "text-text-primary"}
                hover:bg-bg-elevated
              `}
            >
              <span>{option.label}</span>
              {option.value === value && <Check className="w-4 h-4 text-accent" />}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={`${id}-error`} className="text-caption text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field select-wrapper">
  <label id="role-label" class="form-label">Role</label>
  <button
    type="button"
    role="combobox"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-controls="role-listbox"
    aria-labelledby="role-label"
    class="select-trigger"
  >
    <span class="select-value">Select...</span>
    <svg class="select-chevron" width="16" height="16" aria-hidden="true">
      <use href="#icon-chevron-down" />
    </svg>
  </button>

  <ul id="role-listbox" role="listbox" aria-labelledby="role-label" class="select-dropdown" hidden>
    <li role="option" aria-selected="false" class="select-option">Admin</li>
    <li role="option" aria-selected="true" class="select-option select-option--active">Editor</li>
    <li role="option" aria-selected="false" class="select-option">Viewer</li>
  </ul>
</div>

<style>
.select-wrapper {
  position: relative;
}
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 36px;
  padding: 0 var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  cursor: pointer;
  transition: border-color var(--duration-micro) var(--ease-default);
}
.select-trigger:hover {
  border-color: var(--border-hover);
}
.select-trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.select-chevron {
  color: var(--text-muted);
  transition: transform var(--duration-micro) var(--ease-default);
}
.select-trigger[aria-expanded="true"] .select-chevron {
  transform: rotate(180deg);
}
.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--space-xs);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-height: 240px;
  overflow-y: auto;
  padding: var(--space-xs) 0;
  z-index: var(--z-dropdown);
}
.select-option {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.select-option:hover {
  background: var(--bg-elevated);
}
.select-option--active {
  color: var(--accent);
}
</style>
```

**Do / Don't:**
- DO: Support type-ahead search so users can jump to options by typing
- DON'T: Use a native `<select>` element for multi-select -- build a custom combobox instead

---

### 5 Combobox / Autocomplete

**When to use:** Search-as-you-type with a filtered results list. Use when the user needs to find a value from a large dataset (100+ options) or when free-text entry with suggestions is appropriate.

**Anatomy:**
- Input field -- `role="combobox"` with `aria-autocomplete="list"`
- Results listbox -- `role="listbox"`, positioned below the input
- Option items -- `role="option"` with highlighted matching text
- No-results message -- shown when filter returns empty

**Variants:**
| Variant | Description |
|---------|-------------|
| Strict | User must pick from the suggestions |
| Free-text | User can type a custom value not in the list |

**States:** default, hover, focus-visible, open (results visible), loading, no-results, disabled

**Accessibility:**
- ARIA: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` pointing to listbox, `aria-activedescendant` tracks the highlighted option
- Keyboard: arrows navigate results, Enter selects highlighted option, Escape closes list
- Screen reader: announces result count on filter change, selected option on confirm

**Tailwind + React Example:**

```jsx
import { Search } from "lucide-react";

function Combobox({ label, id, options, value, onChange, placeholder = "Type to search..." }) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const listboxId = `${id}-listbox`;

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const highlightMatch = (text) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-accent-muted text-text-primary rounded-ds-sm px-2xs">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          onChange(filtered[activeIndex].value);
          setQuery(filtered[activeIndex].label);
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-sm relative">
      <label htmlFor={id} className="text-label text-text-primary">{label}</label>

      <div className="relative">
        <Search className="absolute left-md top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIndex(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            w-full h-[36px] pl-xl pr-md rounded-ds-md
            bg-bg-elevated border border-border text-text-primary text-body
            placeholder:text-text-muted
            transition-colors duration-micro
            hover:border-border-hover
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:border-accent
          "
        />
      </div>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="
            absolute top-full left-0 right-0 mt-xs z-dropdown
            bg-bg-card border border-border rounded-ds-md shadow-ds-lg
            max-h-[240px] overflow-y-auto py-xs
          "
        >
          {filtered.length === 0 ? (
            <li className="px-md py-sm text-body text-text-muted">No results found</li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-opt-${index}`}
                role="option"
                aria-selected={option.value === value}
                onClick={() => { onChange(option.value); setQuery(option.label); setOpen(false); }}
                className={`
                  px-md py-sm cursor-pointer text-body
                  transition-colors duration-micro
                  ${index === activeIndex ? "bg-bg-elevated" : ""}
                  text-text-primary hover:bg-bg-elevated
                `}
              >
                {highlightMatch(option.label)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field combobox-wrapper">
  <label for="city" class="form-label">City</label>
  <input
    type="text"
    id="city"
    role="combobox"
    aria-expanded="true"
    aria-autocomplete="list"
    aria-controls="city-listbox"
    class="form-input combobox-input"
    placeholder="Type to search..."
  />
  <ul id="city-listbox" role="listbox" class="combobox-listbox">
    <li role="option" class="combobox-option combobox-option--active">
      <mark class="combobox-highlight">New</mark> York
    </li>
    <li role="option" class="combobox-option">
      <mark class="combobox-highlight">New</mark> Orleans
    </li>
  </ul>
</div>

<style>
.combobox-wrapper {
  position: relative;
}
.combobox-listbox {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--space-xs);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  max-height: 240px;
  overflow-y: auto;
  padding: var(--space-xs) 0;
  z-index: var(--z-dropdown);
}
.combobox-option {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.combobox-option:hover,
.combobox-option--active {
  background: var(--bg-elevated);
}
.combobox-highlight {
  background: var(--accent-muted);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 0 2px;
}
</style>
```

**Do / Don't:**
- DO: Highlight the matching portion of text in results so users can see why an option matched
- DON'T: Forget to manage `aria-activedescendant` -- screen readers need it to track the highlighted option

---

### 6 Checkbox

**When to use:** Binary choices (agree to terms), multiple selections from a group, or "select all" patterns with indeterminate state. Use instead of Toggle when the setting is part of a form that requires explicit submission.

**Anatomy:**
- Checkbox input -- native `<input type="checkbox">` with custom styling
- Label -- always visible, positioned to the right of the checkbox
- Description -- optional secondary text below the label
- Group legend -- for checkbox groups, wraps the set with `<fieldset>` + `<legend>`

**Variants:**
| Variant | Description |
|---------|-------------|
| Single | Standalone checkbox with label |
| Group | Multiple checkboxes in a vertical stack with shared legend |
| Indeterminate | `aria-checked="mixed"` for parent "select all" checkboxes |

**States:** default, hover, focus-visible, checked, indeterminate, disabled

**Accessibility:**
- ARIA: native `<input type="checkbox">`, `aria-checked="mixed"` for indeterminate, group wrapped in `<fieldset>` with `<legend>`
- Keyboard: Space toggles the checkbox, Tab moves between checkboxes
- Screen reader: announces checked/unchecked/mixed state, label, and group legend

**Tailwind + React Example:**

```jsx
function Checkbox({ id, label, description, checked, indeterminate, onChange, disabled }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate || false;
  }, [indeterminate]);

  return (
    <div className="flex items-start gap-md">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : checked}
        className="
          mt-2xs w-4 h-4 shrink-0
          rounded-ds-sm border border-border
          bg-bg-elevated text-accent
          focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          accent-[var(--accent)]
        "
      />
      <div className="flex flex-col">
        <label htmlFor={id} className="text-body text-text-primary cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-caption text-text-tertiary">{description}</p>
        )}
      </div>
    </div>
  );
}

function CheckboxGroup({ legend, children }) {
  return (
    <fieldset className="flex flex-col gap-md">
      <legend className="text-label text-text-primary mb-sm">{legend}</legend>
      {children}
    </fieldset>
  );
}
```

**Plain CSS + HTML Example:**

```html
<fieldset class="checkbox-group">
  <legend class="checkbox-legend">Notifications</legend>

  <div class="checkbox-item">
    <input type="checkbox" id="email-notif" class="checkbox-input" />
    <div class="checkbox-content">
      <label for="email-notif" class="checkbox-label">Email notifications</label>
      <p class="checkbox-desc">Receive updates via email</p>
    </div>
  </div>

  <div class="checkbox-item">
    <input type="checkbox" id="sms-notif" class="checkbox-input" />
    <div class="checkbox-content">
      <label for="sms-notif" class="checkbox-label">SMS notifications</label>
      <p class="checkbox-desc">Receive updates via text message</p>
    </div>
  </div>
</fieldset>

<style>
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  border: none;
  padding: 0;
}
.checkbox-legend {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}
.checkbox-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}
.checkbox-input {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;
}
.checkbox-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.checkbox-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.checkbox-label {
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
}
.checkbox-desc {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
</style>
```

**Do / Don't:**
- DO: Use `<fieldset>` and `<legend>` for checkbox groups so screen readers announce the group context
- DON'T: Style a `<div>` to look like a checkbox -- always use a native `<input type="checkbox">` for built-in keyboard and screen reader support

---

### 7 Radio Group

**When to use:** Mutually exclusive single selection from 2-7 options. Use instead of Select Dropdown when all options should be visible at once without opening a panel.

**Anatomy:**
- Fieldset container -- `role="radiogroup"` with `aria-labelledby`
- Legend -- group label
- Radio inputs -- native `<input type="radio">` with shared `name` attribute
- Radio labels -- positioned right of each radio button
- Optional description -- secondary text for each option

**Variants:**
| Variant | Description |
|---------|-------------|
| Vertical | Default stack layout, one option per line |
| Horizontal | Inline row layout for 2-4 short-label options |

**States:** default, hover, focus-visible, selected, disabled

**Accessibility:**
- ARIA: `role="radiogroup"` on container, `aria-labelledby` pointing to legend
- Keyboard: Arrow keys move selection within the group, Tab moves focus out of the group entirely
- Screen reader: announces group label, option label, selected state, and position (e.g. "2 of 4")

**Tailwind + React Example:**

```jsx
function RadioGroup({ legend, name, options, value, onChange, orientation = "vertical" }) {
  return (
    <fieldset
      role="radiogroup"
      aria-labelledby={`${name}-legend`}
      className={`flex ${orientation === "horizontal" ? "flex-row gap-xl" : "flex-col gap-md"}`}
    >
      <legend id={`${name}-legend`} className="text-label text-text-primary mb-sm">
        {legend}
      </legend>

      {options.map((option) => (
        <div key={option.value} className="flex items-start gap-md">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            disabled={option.disabled}
            className="
              mt-2xs w-4 h-4 shrink-0
              border border-border bg-bg-elevated
              text-accent accent-[var(--accent)]
              focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          />
          <div className="flex flex-col">
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-body text-text-primary cursor-pointer"
            >
              {option.label}
            </label>
            {option.description && (
              <p className="text-caption text-text-tertiary">{option.description}</p>
            )}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
```

**Plain CSS + HTML Example:**

```html
<fieldset role="radiogroup" aria-labelledby="plan-legend" class="radio-group">
  <legend id="plan-legend" class="radio-legend">Select plan</legend>

  <div class="radio-item">
    <input type="radio" id="plan-free" name="plan" value="free" class="radio-input" />
    <div class="radio-content">
      <label for="plan-free" class="radio-label">Free</label>
      <p class="radio-desc">Basic features for individuals</p>
    </div>
  </div>

  <div class="radio-item">
    <input type="radio" id="plan-pro" name="plan" value="pro" class="radio-input" checked />
    <div class="radio-content">
      <label for="plan-pro" class="radio-label">Pro</label>
      <p class="radio-desc">Advanced features for teams</p>
    </div>
  </div>
</fieldset>

<style>
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  border: none;
  padding: 0;
}
.radio-legend {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}
.radio-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}
.radio-input {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;
}
.radio-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.radio-label {
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
}
.radio-desc {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
</style>
```

**Do / Don't:**
- DO: Always provide a default selection in radio groups -- unlike checkboxes, radio buttons cannot be deselected
- DON'T: Use a radio group when multi-select is needed -- use Checkbox Group instead

---

### 8 Toggle / Switch

**When to use:** Immediate on/off settings that take effect without a form submission. Use instead of Checkbox when the change is applied instantly (e.g. dark mode, notification preferences).

**Anatomy:**
- Track -- the sliding background area
- Thumb -- the circular knob that slides between on/off positions
- Label -- always visible, describes the setting
- Description -- optional secondary text below the label

**Variants:**
| Variant | Description |
|---------|-------------|
| sm | 16px track height, compact settings lists |
| base | 20px track height, default size |

**States:** default (off), on, hover, focus-visible, disabled

**Accessibility:**
- ARIA: `role="switch"`, `aria-checked="true|false"`, `aria-labelledby`
- Keyboard: Space toggles the switch
- Screen reader: announces "switch", label, and on/off state

**Tailwind + React Example:**

```jsx
function Toggle({ id, label, description, checked, onChange, disabled, size = "base" }) {
  const trackSize = size === "sm" ? "w-[32px] h-[16px]" : "w-[40px] h-[20px]";
  const thumbSize = size === "sm" ? "w-[12px] h-[12px]" : "w-[16px] h-[16px]";
  const thumbTranslate = size === "sm" ? "translate-x-[16px]" : "translate-x-[20px]";

  return (
    <div className="flex items-start gap-md">
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative shrink-0 ${trackSize} rounded-full
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${checked ? "bg-accent" : "bg-bg-elevated border border-border"}
        `}
      >
        <span
          className={`
            absolute top-1/2 -translate-y-1/2 left-[2px]
            ${thumbSize} rounded-full bg-text-on-accent shadow-ds-sm
            transition-transform duration-micro
            ${checked ? thumbTranslate : "translate-x-0"}
          `}
        />
      </button>

      <div className="flex flex-col">
        <label id={`${id}-label`} className="text-body text-text-primary cursor-pointer"
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </label>
        {description && (
          <p className="text-caption text-text-tertiary">{description}</p>
        )}
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="toggle-field">
  <button
    type="button"
    role="switch"
    aria-checked="false"
    aria-labelledby="dark-mode-label"
    class="toggle-track"
  >
    <span class="toggle-thumb"></span>
  </button>
  <div class="toggle-content">
    <label id="dark-mode-label" class="toggle-label">Dark mode</label>
    <p class="toggle-desc">Switch to dark theme</p>
  </div>
</div>

<style>
.toggle-field {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}
.toggle-track {
  position: relative;
  width: 40px;
  height: 20px;
  flex-shrink: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.toggle-track[aria-checked="true"] {
  background: var(--accent);
  border-color: var(--accent);
}
.toggle-track:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.toggle-track:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.toggle-thumb {
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background: var(--text-on-accent);
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-micro) var(--ease-default);
}
.toggle-track[aria-checked="true"] .toggle-thumb {
  transform: translateY(-50%) translateX(20px);
}
.toggle-label {
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
}
.toggle-desc {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
</style>
```

**Do / Don't:**
- DO: Use Toggle for settings that take effect immediately -- the user should see the change without hitting "Save"
- DON'T: Use a Toggle inside a form that requires submission -- use a Checkbox instead

---

### 9 Date Picker

**When to use:** Selecting a calendar date or date range. Use for scheduling, filtering by date, and setting deadlines. For date + time, extend with a time input alongside.

**Anatomy:**
- Input trigger -- text input showing the selected date, opens calendar on click/focus
- Calendar popover -- positioned below the input, `bg-bg-card`, `shadow-ds-lg`
- Month/year navigation -- previous/next buttons and month/year display
- Day grid -- 7-column grid of day numbers
- Selected date indicator -- `bg-accent text-text-on-accent` circle
- Today indicator -- `border-accent` ring on the current date

**Variants:**
| Variant | Description |
|---------|-------------|
| Single date | Selects one date |
| Date range | Selects a start and end date with highlighted range |

**States:** default, hover (day cell), focus-visible, selected, today, disabled (out-of-range days), range-between

**Accessibility:**
- ARIA: `aria-label` on navigation buttons ("Previous month", "Next month"), `aria-selected` on the chosen date, `aria-current="date"` on today, grid uses `role="grid"` with `role="row"` and `role="gridcell"`
- Keyboard: Arrow keys navigate days, Enter selects, Escape closes popover, Page Up/Down for months
- Screen reader: announces "calendar", month/year, selected date, day of week

**Tailwind + React Example:**

```jsx
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

function DatePicker({ label, id, value, onChange, required, error }) {
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(value || new Date());

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const selectDate = (day) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(selected);
    setOpen(false);
  };

  const isSelected = (day) => {
    if (!value) return false;
    return value.getDate() === day &&
      value.getMonth() === viewDate.getMonth() &&
      value.getFullYear() === viewDate.getFullYear();
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear();
  };

  return (
    <div className="flex flex-col gap-sm relative">
      <label htmlFor={id} className="text-label text-text-primary">
        {label}
        {required && <span className="text-error ml-xs">*</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          type="text"
          readOnly
          value={value ? value.toLocaleDateString() : ""}
          onClick={() => setOpen(!open)}
          placeholder="Select a date"
          aria-invalid={error ? "true" : undefined}
          className={`
            w-full h-[36px] pl-md pr-xl rounded-ds-md cursor-pointer
            bg-bg-elevated border text-text-primary text-body
            placeholder:text-text-muted
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:border-accent
            ${error ? "border-error" : "border-border hover:border-border-hover"}
          `}
        />
        <Calendar className="absolute right-md top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-xs z-dropdown bg-bg-card border border-border rounded-ds-lg shadow-ds-lg p-md w-[280px]">
          <div className="flex items-center justify-between mb-md">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="p-xs rounded-ds-sm text-text-secondary hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-label text-text-primary">
              {viewDate.toLocaleString("default", { month: "long", year: "numeric" })}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="p-xs rounded-ds-sm text-text-secondary hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div role="grid" className="grid grid-cols-7 gap-xs text-center">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <div key={d} role="columnheader" className="text-caption text-text-muted py-xs">{d}</div>
            ))}

            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              return (
                <button
                  key={day}
                  type="button"
                  role="gridcell"
                  aria-selected={isSelected(day)}
                  aria-current={isToday(day) ? "date" : undefined}
                  onClick={() => selectDate(day)}
                  className={`
                    w-[32px] h-[32px] rounded-full text-body
                    flex items-center justify-center mx-auto
                    transition-colors duration-micro
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                    ${isSelected(day)
                      ? "bg-accent text-text-on-accent"
                      : isToday(day)
                        ? "border border-accent text-text-primary hover:bg-bg-elevated"
                        : "text-text-primary hover:bg-bg-elevated"
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <p className="text-caption text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field datepicker-wrapper">
  <label for="date-input" class="form-label">Start date</label>
  <div class="datepicker-trigger">
    <input type="text" id="date-input" class="form-input" placeholder="Select a date" readonly />
    <svg class="datepicker-icon" width="16" height="16" aria-hidden="true">
      <use href="#icon-calendar" />
    </svg>
  </div>

  <div class="datepicker-popover" role="dialog" aria-label="Choose date">
    <div class="datepicker-header">
      <button type="button" aria-label="Previous month" class="datepicker-nav">
        <svg width="16" height="16"><use href="#icon-chevron-left" /></svg>
      </button>
      <span class="datepicker-month">April 2026</span>
      <button type="button" aria-label="Next month" class="datepicker-nav">
        <svg width="16" height="16"><use href="#icon-chevron-right" /></svg>
      </button>
    </div>
    <div role="grid" class="datepicker-grid">
      <!-- Day headers and day buttons -->
    </div>
  </div>
</div>

<style>
.datepicker-wrapper {
  position: relative;
}
.datepicker-trigger {
  position: relative;
}
.datepicker-icon {
  position: absolute;
  right: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}
.datepicker-popover {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--space-xs);
  width: 280px;
  padding: var(--space-md);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
}
.datepicker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}
.datepicker-nav {
  padding: var(--space-xs);
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
}
.datepicker-nav:hover {
  background: var(--bg-elevated);
}
.datepicker-month {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}
.datepicker-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
  text-align: center;
}
.datepicker-day {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: var(--radius-full);
  font-size: var(--text-body);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.datepicker-day:hover {
  background: var(--bg-elevated);
}
.datepicker-day--selected {
  background: var(--accent);
  color: var(--text-on-accent);
}
.datepicker-day--today {
  border: 1px solid var(--accent);
}
</style>
```

**Do / Don't:**
- DO: Always allow manual text entry in the input as well as calendar selection
- DON'T: Disable keyboard navigation in the calendar grid -- arrow keys must move between day cells

---

### 10 Slider / Range

**When to use:** Selecting a numeric value within a defined range -- volume, price filters, opacity settings. Use when the exact value matters less than the approximate position within a range.

**Anatomy:**
- Track -- horizontal bar showing the full range
- Fill -- colored portion of the track from min to current value
- Thumb -- draggable handle on the track
- Min/Max labels -- optional, at track endpoints
- Value display -- optional, shows the current numeric value
- Tick marks -- optional, evenly spaced marks along the track

**Variants:**
| Variant | Description |
|---------|-------------|
| Single | One thumb, selects a single value |
| Range | Two thumbs, selects a min/max range |
| With ticks | Tick marks at regular intervals |

**States:** default, hover, active (dragging), focus-visible, disabled

**Accessibility:**
- ARIA: `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label`
- Keyboard: Left/Down decreases, Right/Up increases, Page Up/Page Down by 10x step, Home/End for min/max
- Screen reader: announces label, current value, min, and max

**Tailwind + React Example:**

```jsx
function Slider({ label, id, min = 0, max = 100, step = 1, value, onChange }) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-label text-text-primary">{label}</label>
        <span className="text-caption text-text-secondary">{value}</span>
      </div>

      <div className="relative flex items-center h-[20px]">
        <input
          type="range"
          id={id}
          role="slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="
            w-full h-[4px] appearance-none cursor-pointer
            bg-bg-elevated rounded-full
            accent-[var(--accent)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
            disabled:opacity-50 disabled:cursor-not-allowed
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-[16px]
            [&::-webkit-slider-thumb]:h-[16px]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:shadow-ds-sm
            [&::-webkit-slider-thumb]:cursor-pointer
          "
          style={{
            background: `linear-gradient(to right, var(--accent) ${percent}%, var(--bg-elevated) ${percent}%)`
          }}
        />
      </div>

      <div className="flex justify-between text-caption text-text-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <div class="slider-header">
    <label for="volume" class="form-label">Volume</label>
    <span class="slider-value">75</span>
  </div>
  <input
    type="range"
    id="volume"
    role="slider"
    min="0"
    max="100"
    step="1"
    value="75"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="75"
    class="slider-input"
  />
  <div class="slider-labels">
    <span>0</span>
    <span>100</span>
  </div>
</div>

<style>
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.slider-value {
  font-size: var(--text-caption);
  color: var(--text-secondary);
}
.slider-input {
  width: 100%;
  height: 4px;
  appearance: none;
  background: var(--bg-elevated);
  border-radius: var(--radius-full);
  cursor: pointer;
  accent-color: var(--accent);
}
.slider-input::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background: var(--accent);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}
.slider-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-caption);
  color: var(--text-muted);
}
</style>
```

**Do / Don't:**
- DO: Always show the current numeric value alongside the slider so users know the exact selection
- DON'T: Use a slider for precise number entry (e.g. entering a specific dollar amount) -- use a Text Input with `type="number"` instead

---

### 11 File Upload / Dropzone

**When to use:** Uploading files such as documents, images, or CSV imports. Supports both drag-and-drop and click-to-browse.

**Anatomy:**
- Dropzone area -- dashed border container with centered icon and text
- Upload icon -- centered at the top of the dropzone (e.g. `UploadCloud`)
- Instruction text -- "Drag and drop or click to browse"
- Accepted types/size -- helper text below the instruction
- File list -- below the dropzone, shows uploaded files with name, size, and remove button

**Variants:**
| Variant | Description |
|---------|-------------|
| Default | Full dropzone area with drag-and-drop support |
| Compact | Single-line button-style upload trigger |

**States:** default, hover, drag-over (`border-accent bg-accent-subtle`), uploading (progress), error, disabled

**Accessibility:**
- ARIA: dropzone has `role="button"` and `tabindex="0"`, hidden `<input type="file">`, file list uses `aria-live="polite"` to announce additions/removals
- Keyboard: Enter/Space activates the file browser, Tab navigates to remove buttons
- Screen reader: announces "Upload area", accepted file types, and file list changes

**Tailwind + React Example:**

```jsx
import { UploadCloud, X, File } from "lucide-react";

function FileUpload({ label, id, accept, maxSize, onChange }) {
  const [files, setFiles] = React.useState([]);
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleFiles = (newFiles) => {
    const fileList = [...files, ...Array.from(newFiles)];
    setFiles(fileList);
    onChange?.(fileList);
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-sm">
      <label className="text-label text-text-primary">{label}</label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); }}}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`
          flex flex-col items-center justify-center gap-sm
          p-xl rounded-ds-lg border-2 border-dashed cursor-pointer
          transition-colors duration-micro
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
          ${dragOver
            ? "border-accent bg-accent-subtle"
            : "border-border hover:border-border-hover bg-bg-elevated"
          }
        `}
      >
        <UploadCloud className={`w-6 h-6 ${dragOver ? "text-accent" : "text-text-muted"}`} />
        <p className="text-body text-text-secondary">Drag and drop or click to browse</p>
        {accept && <p className="text-caption text-text-muted">Accepts: {accept}</p>}
        {maxSize && <p className="text-caption text-text-muted">Max size: {maxSize}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        id={id}
        accept={accept}
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
      />

      {files.length > 0 && (
        <ul className="flex flex-col gap-xs" aria-live="polite">
          {files.map((file, index) => (
            <li key={index} className="flex items-center gap-sm p-sm rounded-ds-md bg-bg-card border border-border">
              <File className="w-4 h-4 text-text-muted shrink-0" />
              <span className="text-body text-text-primary flex-1 truncate">{file.name}</span>
              <span className="text-caption text-text-tertiary">{(file.size / 1024).toFixed(1)} KB</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                className="p-xs rounded-ds-sm text-text-muted hover:text-error hover:bg-error-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label class="form-label">Attachments</label>
  <div class="dropzone" role="button" tabindex="0">
    <svg class="dropzone-icon" width="24" height="24" aria-hidden="true">
      <use href="#icon-upload-cloud" />
    </svg>
    <p class="dropzone-text">Drag and drop or click to browse</p>
    <p class="dropzone-hint">PNG, JPG up to 5MB</p>
  </div>
  <input type="file" class="sr-only" accept=".png,.jpg" multiple />

  <ul class="file-list" aria-live="polite">
    <li class="file-item">
      <svg width="16" height="16" aria-hidden="true"><use href="#icon-file" /></svg>
      <span class="file-name">photo.png</span>
      <span class="file-size">240 KB</span>
      <button type="button" class="file-remove" aria-label="Remove photo.png">
        <svg width="16" height="16"><use href="#icon-x" /></svg>
      </button>
    </li>
  </ul>
</div>

<style>
.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-xl);
  border: 2px dashed var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: border-color var(--duration-micro) var(--ease-default),
              background var(--duration-micro) var(--ease-default);
}
.dropzone:hover {
  border-color: var(--border-hover);
}
.dropzone--dragover {
  border-color: var(--accent);
  background: var(--accent-subtle);
}
.dropzone-icon {
  color: var(--text-muted);
}
.dropzone--dragover .dropzone-icon {
  color: var(--accent);
}
.dropzone-text {
  font-size: var(--text-body);
  color: var(--text-secondary);
}
.dropzone-hint {
  font-size: var(--text-caption);
  color: var(--text-muted);
}
.file-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.file-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-card);
}
.file-name {
  flex: 1;
  font-size: var(--text-body);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-size {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
.file-remove {
  padding: var(--space-xs);
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
}
.file-remove:hover {
  color: var(--error);
  background: var(--error-muted);
}
</style>
```

**Do / Don't:**
- DO: Show file type restrictions and max size in the dropzone text before the user selects a file
- DON'T: Remove the hidden `<input type="file">` -- it is the actual file picker and is required for the click-to-browse fallback

---

### 12 Tag Input / Multi-value

**When to use:** Entering multiple discrete values -- tags, email recipients, categories. Use when the user creates removable items by pressing Enter.

**Anatomy:**
- Container -- styled like a text input, wraps tags and the input field
- Tags -- removable badge-like chips inside the container
- Text input -- inline after the tags, grows to fill remaining space
- Remove button -- `X` icon on each tag

**Variants:**
| Variant | Description |
|---------|-------------|
| Default | Free-text entry, creates tag on Enter |
| With autocomplete | Shows filtered suggestions from a predefined list |

**States:** default, hover, focus-visible, has-tags, disabled, error

**Accessibility:**
- ARIA: container has `role="group"`, `aria-label` describing the field, each tag has `role="listitem"` inside a `role="list"`, remove button has `aria-label="Remove [tag name]"`
- Keyboard: Enter creates a tag, Backspace removes the last tag when input is empty, Tab moves to next form field
- Screen reader: announces tag creation, tag removal, and current tag count

**Tailwind + React Example:**

```jsx
import { X } from "lucide-react";

function TagInput({ label, id, value = [], onChange, placeholder = "Type and press Enter..." }) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);

  const addTag = (text) => {
    const trimmed = text.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-sm">
      <label htmlFor={id} className="text-label text-text-primary">{label}</label>

      <div
        role="group"
        aria-label={label}
        onClick={() => inputRef.current?.focus()}
        className="
          flex flex-wrap items-center gap-xs
          min-h-[36px] px-sm py-xs rounded-ds-md
          bg-bg-elevated border border-border
          focus-within:ring-2 focus-within:ring-accent focus-within:border-accent
          transition-colors duration-micro
          hover:border-border-hover
        "
      >
        <ul role="list" className="flex flex-wrap gap-xs">
          {value.map((tag, index) => (
            <li
              key={tag}
              role="listitem"
              className="
                flex items-center gap-2xs
                px-sm py-2xs rounded-ds-sm
                bg-accent-muted text-body text-text-primary
              "
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(index); }}
                aria-label={`Remove ${tag}`}
                className="
                  p-2xs rounded-ds-sm text-text-muted
                  hover:text-error hover:bg-error-muted
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                "
              >
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ul>

        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="
            flex-1 min-w-[80px] bg-transparent border-none
            text-body text-text-primary placeholder:text-text-muted
            focus:outline-none
          "
        />
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label for="tags" class="form-label">Tags</label>
  <div class="tag-input-container" role="group" aria-label="Tags">
    <ul class="tag-list" role="list">
      <li class="tag" role="listitem">
        <span>React</span>
        <button type="button" class="tag-remove" aria-label="Remove React">
          <svg width="12" height="12"><use href="#icon-x" /></svg>
        </button>
      </li>
      <li class="tag" role="listitem">
        <span>TypeScript</span>
        <button type="button" class="tag-remove" aria-label="Remove TypeScript">
          <svg width="12" height="12"><use href="#icon-x" /></svg>
        </button>
      </li>
    </ul>
    <input type="text" id="tags" class="tag-input" placeholder="" />
  </div>
</div>

<style>
.tag-input-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
  min-height: 36px;
  padding: var(--space-xs) var(--space-sm);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: text;
  transition: border-color var(--duration-micro) var(--ease-default);
}
.tag-input-container:hover {
  border-color: var(--border-hover);
}
.tag-input-container:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}
.tag {
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  padding: var(--space-2xs) var(--space-sm);
  background: var(--accent-muted);
  border-radius: var(--radius-sm);
  font-size: var(--text-body);
  color: var(--text-primary);
}
.tag-remove {
  padding: var(--space-2xs);
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
}
.tag-remove:hover {
  color: var(--error);
  background: var(--error-muted);
}
.tag-input {
  flex: 1;
  min-width: 80px;
  border: none;
  background: transparent;
  font-size: var(--text-body);
  color: var(--text-primary);
}
.tag-input:focus {
  outline: none;
}
.tag-input::placeholder {
  color: var(--text-muted);
}
</style>
```

**Do / Don't:**
- DO: Prevent duplicate tags by checking the value before adding
- DON'T: Allow tags to overflow the container without wrapping -- always use `flex-wrap`

---

### 13 Color Picker

**When to use:** Selecting a color from a predefined palette -- category colors, label colors, theme accent selection. Not for arbitrary color selection (use a full-featured color picker library for that).

**Anatomy:**
- Label -- describes the color selection purpose
- Swatch grid -- a grid of predefined color circles
- Selected indicator -- `ring-2 ring-accent` around the chosen swatch
- Optional hex input -- text input for entering a custom hex value

**Variants:**
| Variant | Description |
|---------|-------------|
| Swatch grid | Grid of predefined colors |
| With custom input | Adds a hex code text input below the swatches |

**States:** default, hover (swatch scale-up), focus-visible, selected (ring indicator)

**Accessibility:**
- ARIA: swatch grid uses `role="radiogroup"`, each swatch is `role="radio"` with `aria-checked` and `aria-label` describing the color name
- Keyboard: Arrow keys navigate swatches, Enter/Space selects, Tab moves out of group
- Screen reader: announces color name and selected state

**Tailwind + React Example:**

```jsx
const COLORS = [
  { name: "Red", value: "#e5484d" },
  { name: "Orange", value: "#f5a623" },
  { name: "Green", value: "#30a46c" },
  { name: "Blue", value: "#3498db" },
  { name: "Purple", value: "#9b59b6" },
  { name: "Gold", value: "#c9a267" },
];

function ColorPicker({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-sm">
      <label id={`${name}-label`} className="text-label text-text-primary">{label}</label>

      <div
        role="radiogroup"
        aria-labelledby={`${name}-label`}
        className="flex flex-wrap gap-sm"
      >
        {COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            role="radio"
            aria-checked={value === color.value}
            aria-label={color.name}
            onClick={() => onChange(color.value)}
            className={`
              w-[32px] h-[32px] rounded-full
              transition-all duration-micro
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
              hover:scale-110
              ${value === color.value ? "ring-2 ring-accent ring-offset-2" : ""}
            `}
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
    </div>
  );
}
```

**Plain CSS + HTML Example:**

```html
<div class="form-field">
  <label id="color-label" class="form-label">Category color</label>
  <div role="radiogroup" aria-labelledby="color-label" class="color-grid">
    <button
      type="button"
      role="radio"
      aria-checked="true"
      aria-label="Red"
      class="color-swatch color-swatch--selected"
      style="background-color: #e5484d;"
    ></button>
    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Green"
      class="color-swatch"
      style="background-color: #30a46c;"
    ></button>
    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Blue"
      class="color-swatch"
      style="background-color: #3498db;"
    ></button>
  </div>
</div>

<style>
.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}
.color-swatch {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: transform var(--duration-micro) var(--ease-default);
}
.color-swatch:hover {
  transform: scale(1.1);
}
.color-swatch:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.color-swatch--selected {
  box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px var(--accent);
}
</style>
```

**Do / Don't:**
- DO: Use `aria-label` on each swatch with the color name so screen reader users know which color they are selecting
- DON'T: Rely only on the color itself to communicate selection -- always show a ring or checkmark indicator

---

### 14 Form Layout

**When to use:** Every form in the system. This is the composition pattern that governs how labels, inputs, help text, error messages, and groups are spaced relative to each other.

**Anatomy:**
- Label -- positioned above the input, always visible
- Required indicator -- `*` rendered in `text-error` after the label text
- Help text -- optional, below the label in `text-caption text-text-tertiary`
- Input -- the form control itself
- Error message -- below the input in `text-caption text-error`
- Form group -- a logical set of related fields separated by `space-xl`

**Variants:**
| Variant | Description |
|---------|-------------|
| Vertical (default) | Label above input, full-width fields |
| Horizontal | Label left, input right, used in settings forms at wider breakpoints |
| Inline | Multiple fields in a row (e.g. first name + last name) |

**States:** N/A (this is a layout pattern, not an interactive component)

**Accessibility:**
- ARIA: every input linked to its label via `htmlFor`/`id`, `aria-describedby` points to help text or error message, `aria-required="true"` on required fields
- Keyboard: Tab order follows visual order (top to bottom, left to right)
- Screen reader: announces label, required state, help text, and error message in sequence

**Spacing Rules:**
| Relationship | Token | Value |
|---|---|---|
| Label to input | `space-sm` | 8px |
| Input to help/error text | `space-xs` | 4px |
| Between form groups | `space-xl` | 24px |
| Label to help text (when help is between label and input) | `space-xs` | 4px |

**Tailwind + React Example:**

```jsx
function FormField({ label, id, required, helpText, error, children }) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-col gap-xs">
        <label htmlFor={id} className="text-label text-text-primary">
          {label}
          {required && <span className="text-error ml-xs">*</span>}
        </label>
        {helpText && (
          <p id={`${id}-help`} className="text-caption text-text-tertiary">
            {helpText}
          </p>
        )}
      </div>

      {children}

      {error && (
        <p id={`${id}-error`} className="text-caption text-error -mt-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ExampleForm() {
  return (
    <form className="flex flex-col gap-xl max-w-[480px]">
      <FormField label="Full name" id="name" required>
        <input
          id="name"
          type="text"
          required
          aria-required="true"
          className="
            h-[36px] w-full px-md rounded-ds-md
            bg-bg-elevated border border-border text-text-primary text-body
            placeholder:text-text-muted
            hover:border-border-hover
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:border-accent
          "
        />
      </FormField>

      <FormField label="Email" id="email" required helpText="We will never share your email.">
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-describedby="email-help"
          className="
            h-[36px] w-full px-md rounded-ds-md
            bg-bg-elevated border border-border text-text-primary text-body
            placeholder:text-text-muted
            hover:border-border-hover
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:border-accent
          "
        />
      </FormField>

      <FormField label="Bio" id="bio" error="Bio must be at least 10 characters.">
        <textarea
          id="bio"
          rows={3}
          aria-invalid="true"
          aria-describedby="bio-error"
          className="
            w-full min-h-[80px] px-md py-sm rounded-ds-md resize-y
            bg-bg-elevated border border-error text-text-primary text-body
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-error focus-visible:border-error
          "
        />
      </FormField>

      <div className="flex gap-md pt-md">
        <button
          type="submit"
          className="
            h-[36px] px-xl rounded-ds-md
            bg-accent text-text-on-accent text-label
            hover:bg-accent-hover active:bg-accent-active
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:ring-offset-2
            transition-colors duration-micro
          "
        >
          Save
        </button>
        <button
          type="button"
          className="
            h-[36px] px-xl rounded-ds-md
            bg-bg-elevated border border-border text-text-primary text-label
            hover:border-border-hover hover:bg-bg-card
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:ring-offset-2
            transition-colors duration-micro
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
```

**Plain CSS + HTML Example:**

```html
<form class="form-layout">
  <div class="form-group">
    <div class="form-label-block">
      <label for="fullname" class="form-label">
        Full name<span class="form-required">*</span>
      </label>
    </div>
    <input type="text" id="fullname" required aria-required="true" class="form-input" />
  </div>

  <div class="form-group">
    <div class="form-label-block">
      <label for="email" class="form-label">
        Email<span class="form-required">*</span>
      </label>
      <p id="email-help" class="form-help">We will never share your email.</p>
    </div>
    <input type="email" id="email" required aria-required="true"
      aria-describedby="email-help" class="form-input" />
  </div>

  <div class="form-group">
    <div class="form-label-block">
      <label for="bio" class="form-label">Bio</label>
    </div>
    <textarea id="bio" rows="3" aria-invalid="true" aria-describedby="bio-error"
      class="form-textarea form-textarea--error"></textarea>
    <p id="bio-error" class="form-error" role="alert">Bio must be at least 10 characters.</p>
  </div>

  <div class="form-actions">
    <button type="submit" class="btn btn-primary">Save</button>
    <button type="button" class="btn btn-default">Cancel</button>
  </div>
</form>

<style>
.form-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  max-width: 480px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.form-label-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.form-label {
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  color: var(--text-primary);
}
.form-required {
  color: var(--error);
  margin-left: var(--space-xs);
}
.form-help {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
}
.form-input {
  height: 36px;
  width: 100%;
  padding: 0 var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  transition: border-color var(--duration-micro) var(--ease-default);
}
.form-input:hover {
  border-color: var(--border-hover);
}
.form-input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.form-textarea {
  width: 100%;
  min-height: 80px;
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-body);
  resize: vertical;
  transition: border-color var(--duration-micro) var(--ease-default);
}
.form-textarea:hover {
  border-color: var(--border-hover);
}
.form-textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}
.form-textarea--error {
  border-color: var(--error);
}
.form-textarea--error:focus-visible {
  outline-color: var(--error);
}
.form-error {
  font-size: var(--text-caption);
  color: var(--error);
  margin-top: calc(-1 * var(--space-xs));
}
.form-actions {
  display: flex;
  gap: var(--space-md);
  padding-top: var(--space-md);
}
.btn {
  height: 36px;
  padding: 0 var(--space-xl);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-label);
  font-weight: var(--weight-label);
  cursor: pointer;
  transition: background var(--duration-micro) var(--ease-default);
}
.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.btn-primary {
  background: var(--accent);
  color: var(--text-on-accent);
}
.btn-primary:hover {
  background: var(--accent-hover);
}
.btn-default {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-primary);
}
.btn-default:hover {
  border-color: var(--border-hover);
  background: var(--bg-card);
}
</style>
```

**Do / Don't:**
- DO: Maintain consistent spacing: `space-sm` (8px) between label and input, `space-xs` (4px) between input and error, `space-xl` (24px) between form groups
- DON'T: Place the label inside the input as a floating label that disappears -- always keep labels visible above the field
