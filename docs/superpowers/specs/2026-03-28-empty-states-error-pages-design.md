# Phase 2 Batch 3 — Empty States & Error Pages Design Spec

**Status:** Approved
**Date:** 2026-03-28
**Prerequisite:** Phase 2 Batch 2 complete (Avatars, Tooltips)

---

## Overview

Add Empty States (section 17) and Error Pages (section 18) to the Signature Design System. These are page-level layout patterns — no new tokens needed. Both use existing typography, color, and spacing tokens.

## Files to Update

| File | Changes |
|------|---------|
| `STYLE_GUIDE.md` | Add section 17 (Empty States) and section 18 (Error Pages) |
| `index.html` | Add CSS, nav links, and demo sections for both |
| `globals.css` | No changes |
| `tailwind.preset.js` | No changes |
| `CLAUDE.md` | No new rules needed |

---

## Empty States (Section 17)

Centered placeholder for views with no data. Used in tables, lists, dashboards, and search results.

### Layout

Vertically and horizontally centered within the parent container. All content stacked in a column.

```jsx
<div className="flex flex-col items-center justify-center text-center py-3xl px-xl">
  <Inbox className="w-12 h-12 text-text-muted mb-lg" />
  <h3 className="text-h2 text-text-primary mb-xs">No projects yet</h3>
  <p className="text-subtitle text-text-secondary max-w-[360px] mb-xl">
    Create your first project to get started. Projects help you organize your work.
  </p>
  <button className="inline-flex items-center justify-center gap-sm px-lg py-sm bg-accent text-text-on-accent font-medium text-body rounded-ds-md shadow-ds-sm hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    <Plus className="w-4 h-4" />
    Create Project
  </button>
</div>
```

### Structure

| Element | Classes | Required |
|---------|---------|----------|
| Container | `flex flex-col items-center justify-center text-center py-3xl px-xl` | Yes |
| Icon | `w-12 h-12 text-text-muted mb-lg` | Yes |
| Heading | `text-h2 text-text-primary mb-xs` | Yes |
| Description | `text-subtitle text-text-secondary max-w-[360px] mb-xl` | Yes |
| CTA button | Primary button pattern (see section 3) | Optional |

### Icon Guidelines

- Use a Lucide icon that represents the empty content type
- Common choices: `Inbox` (messages), `FolderOpen` (files), `Users` (team), `Search` (search results), `BarChart3` (analytics)
- Always `w-12 h-12 text-text-muted`

### Variants by Context

| Context | Icon | Heading | Description |
|---------|------|---------|-------------|
| Empty table | `Inbox` | No items yet | Add your first item to get started. |
| Empty search | `Search` | No results found | Try adjusting your search or filters. |
| Empty dashboard | `BarChart3` | No data available | Data will appear here once activity is recorded. |

### Accessibility

- Icon: `aria-hidden="true"` (decorative, heading provides context)
- Heading: use appropriate heading level for page hierarchy (typically `h2` or `h3`)
- CTA: follows standard button accessibility (focus-visible ring)

---

## Error Pages (Section 18)

Full-page centered error screens for 404, 500, and maintenance states. Uses the Cinzel display font for the status code to maintain brand identity.

### Layout

Full viewport height, centered content.

```jsx
<div className="flex flex-col items-center justify-center text-center min-h-screen py-3xl px-xl">
  <span className="font-display text-display-1 text-accent mb-lg">404</span>
  <h1 className="text-h1 text-text-primary mb-xs">Page not found</h1>
  <p className="text-subtitle text-text-secondary max-w-[480px] mb-xl">
    The page you're looking for doesn't exist or has been moved.
  </p>
  <a href="/" className="inline-flex items-center justify-center gap-sm px-lg py-sm bg-accent text-text-on-accent font-medium text-body rounded-ds-md shadow-ds-sm hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-muted transition-all duration-150">
    <Home className="w-4 h-4" />
    Go Home
  </a>
</div>
```

### Structure

| Element | Classes | Required |
|---------|---------|----------|
| Container | `flex flex-col items-center justify-center text-center min-h-screen py-3xl px-xl` | Yes |
| Status code | `font-display text-display-1 text-accent mb-lg` | Yes |
| Heading | `text-h1 text-text-primary mb-xs` | Yes |
| Description | `text-subtitle text-text-secondary max-w-[480px] mb-xl` | Yes |
| CTA link/button | Primary button pattern styled as `<a>` | Yes |

### Variants

| Variant | Code | Heading | Description |
|---------|------|---------|-------------|
| Not Found | `404` | Page not found | The page you're looking for doesn't exist or has been moved. |
| Server Error | `500` | Something went wrong | We're working on fixing this. Please try again later. |
| Maintenance | `503` | Under maintenance | We're making improvements. We'll be back shortly. |

### Design Details

- Status code uses `font-display` (Cinzel) at `text-display-1` size — the largest type in the system
- Status code color is `text-accent` (gold) — ties the error page to the brand
- Description max-width is `480px` (wider than empty states since these are full-page)
- CTA is always present on error pages (user needs a way out)

### Accessibility

- Status code: decorative — screen readers will read the heading which conveys the same meaning
- Heading: `h1` (these are standalone pages)
- CTA: uses `<a>` tag for navigation (not `<button>`)

---

## Design Decisions & Rationale

1. **No new tokens.** Both patterns use existing typography, color, and spacing tokens. No component-specific variables needed.

2. **Cinzel display font for error codes.** Makes error pages feel intentional and branded rather than generic. The display font is already in the system but underutilized.

3. **Different max-widths.** Empty states use `360px` (compact, inline context) while error pages use `480px` (full-page, more breathing room).

4. **CTA optional on empty states, required on error pages.** Empty states may not always have a clear action (e.g., empty search results). Error pages always need an escape route.

5. **Icon always present on empty states.** Visual anchor that immediately communicates "nothing here" before reading the text. Uses `w-12 h-12` (hero icon size from the icon system).

6. **Status code as visual anchor on error pages.** Large, gold number serves the same role as the icon in empty states — immediate visual communication of state.
