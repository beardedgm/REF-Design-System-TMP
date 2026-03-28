# Phase 2 Roadmap — Remaining SaaS Primitives

**Status:** Planned (not yet started)
**Prerequisite:** Phase 1 complete (nav shells, form controls, toasts, icon system)

---

## Scope

Fill the remaining component gaps so any SaaS app can be built entirely from the design system.

## Components

### High Priority (needed by most apps)

| Component | Description | Key Details |
|-----------|-------------|-------------|
| **Tabs** | Horizontal tab bar with underline indicator | Variants: underline, pill, vertical. `role="tablist"`, arrow key navigation, `aria-selected`. Accent underline on active tab. |
| **Pagination** | Page navigation for lists/tables | Previous/Next + numbered pages. Compact variant (prev/next only). `aria-label="Pagination"`, `aria-current="page"`. |
| **Avatars** | User/entity image with fallback | Sizes: `xs` (24px), `sm` (32px), `md` (40px), `lg` (56px). Fallback: initials on `bg-accent` circle. Group/stack variant with overlap. |
| **Tooltips** | Contextual info on hover/focus | `role="tooltip"`, appears on hover + focus-visible. Positioning: top/right/bottom/left. `150ms` delay-in, `0ms` delay-out. Arrow pointer. Max width `240px`. |

### Medium Priority (common but not universal)

| Component | Description | Key Details |
|-----------|-------------|-------------|
| **Command Palette** | Keyboard-triggered search/action modal | `Cmd+K` / `Ctrl+K` trigger. Search input + filterable action list. `role="combobox"`, `aria-expanded`. `z-modal`. Recent items section. |
| **Empty States** | Placeholder for zero-data views | Centered layout: Lucide icon (`w-12 h-12 text-text-muted`), heading, description, optional CTA button. Used in tables, lists, dashboards with no data. |
| **Error Pages** | 404, 500, maintenance pages | Full-page centered. Large status code, message, description, "Go Home" CTA. Consistent branding. |

### Lower Priority (nice-to-have)

| Component | Description | Key Details |
|-----------|-------------|-------------|
| **Skeleton Loaders** | Loading placeholders | Animated pulse (`bg-bg-elevated` → `bg-bg-surface` shimmer). Match layout shape of content being loaded. `aria-busy="true"`, `aria-label="Loading"`. |
| **Data Viz Guidance** | Chart color tokens + rules | Use status palette for series colors. Accessible patterns (not color-only). Recommended chart library. Axis/grid styling tokens. |

## Delivery

Same as Phase 1:
- **STYLE_GUIDE.md** — React + Tailwind copy-paste patterns for each component
- **index.html** — Interactive visual demos in the showcase
- **CLAUDE.md** — Concise rules added to Critical Rules section

No changes expected to `tailwind.preset.js` or `globals.css` unless new tokens are needed (unlikely).

## Suggested Execution Order

1. Tabs + Pagination (table/list companions — test alongside existing Table section)
2. Avatars + Tooltips (small, self-contained — quick wins)
3. Empty States + Error Pages (page-level patterns)
4. Command Palette (complex, standalone)
5. Skeleton Loaders + Data Viz (polish)

## Files to Update

| File | Changes |
|------|---------|
| `STYLE_GUIDE.md` | Add sections 13-21 (one per component) |
| `index.html` | Add demo sections + nav group entries |
| `CLAUDE.md` | Add rules 12+ as needed |

## How to Start

When ready to begin Phase 2, use the brainstorming skill to create a detailed design spec for the first batch (Tabs + Pagination), then writing-plans to create the implementation plan.
