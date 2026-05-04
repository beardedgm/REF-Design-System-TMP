---
register: product
---

# Signature Design System

## Product purpose

A single design foundation, consumed as `globals.css` plus a documented token contract, used by every SaaS application in the portfolio. Apps import the foundation, set `data-theme` on `<html>`, and write components against `var()` tokens. The system survives across stacks (MERN, Tailwind, plain CSS) by living entirely in CSS custom properties; nothing requires a build step or a framework.

The system has two consumption surfaces:

1. **The foundation** (`globals.css`, `DESIGN.md`, `STYLE_GUIDE.md`, `CLAUDE.md`, `DESIGN.json`): what apps depend on. The contract.
2. **The showcase** (`index.html`): a self-rendering reference. The visual proof that the contract works in both themes.

The first surface is product-register: tokens, components, rules. The second mixes registers; a brand-register hero ("The Firelight Codex") fronts a product-register catalog of components. The system as a whole is product, with a single sanctioned brand moment at the entry.

## Users

**Primary: portfolio app authors.** One developer wearing many hats, building several SaaS apps that share a visual identity. Needs decisions to be already made: which font, which radius, which gold, which animation curve. Reads `CLAUDE.md` more than they read the showcase. Writes Tailwind arbitrary values like `bg-[var(--bg-card)]` daily.

**Secondary: AI agents writing code in those apps.** They consume `CLAUDE.md` and `DESIGN.md` directly. They do not have judgment; they need rules. Every "use your discretion" is a regression for them. The system is written for both human and agent readers, with the agent-readable parts explicit and exhaustive.

**Not the user:** end-users of the apps. The system never speaks to them; it speaks through the apps that consume it. End-user voice is the app's job.

## Brand

**Creative north star: "The Firelight Codex."** A treasure-document aesthetic without explicit fantasy. Cool blue-black night, warm cream-parchment day, one warm gold thread connecting them. Evokes legendary items, struck-from-the-page seals, firelight on velum. Rendered plain enough to wear in any industry: finance, observability, healthcare, internal tooling.

**Visual identity, in three lines:**
- Cool blue-black dark (`#0c0d12`) and warm cream-parchment light (`#f5f3ef`) are different rooms in the same building.
- Warm gold (`#c9a267` dark, `#a8843e` light) is the only hue that crosses themes; it appears on ≤10% of any screen.
- Cinzel for marketing display moments (hero, error codes); Inter everywhere else. No third typeface ever loads.

**Color strategy:** Restrained. Tinted neutrals plus a single accent capped at ~10%. Status colors (success, error, warning, info) are pulled from a fixed `--status-1..5` sequence and never mixed with `--accent` for data viz.

## Tone

**For documentation and component copy:** spare, declarative, lightly literary. "A codex, not a kit." "Every component documented; nothing decorative." Each sentence carries weight; throat-clearing phrases ("In order to...", "It's important to note...") are out. Em dashes are forbidden in copy and code comments alike. Use commas, colons, semicolons, periods, or parentheses instead.

**For app UI consumed from the system:** product voice belongs to the consuming app, not the system. Where the system supplies UX strings (toasts, alerts, error pages in the showcase), they read concise and direct: "Saved. Your changes are live across all environments." not "Your changes have been successfully saved!"

**Cinzel never speaks in the product.** Inside dashboards, forms, settings, and tables, the system uses Inter at the H4 to H1 weights for emphasis. Cinzel is reserved for moments where the brand earns a flourish: landing pages, hero sections, the showcase's own header, and the giant 4xx/5xx status code on error pages.

## Anti-references

What this system rejects, by name:

- **SaaS cliché dark.** Purple-to-pink gradients, neon glow accents, glassmorphism cards. The dark theme here is cool blue-black on flat surfaces, depth from background-step contrast, not from gradients or glows.
- **"Professional" indistinguishable greys.** The generic enterprise palette (every neutral pure grey, every accent the same blue). Every neutral here carries a hue undertone (cool blue in dark, warm taupe in light) so surfaces never feel sterile.
- **Side-stripe affectation.** Colored `border-left` greater than 1px on cards, callouts, alerts, list items. The single sanctioned exception is the 2px gold edge on active nav items; everywhere else it's an absolute ban.
- **The hero-metric template.** Big number, small label, gradient accent, three supporting stats. Every SaaS landing page since 2018 looks like this; ours doesn't.
- **Identical card grids.** Same-sized cards with icon plus heading plus text, repeated endlessly. The Cards section in the showcase deliberately uses a 2:1 asymmetric grid with four different card weights for this reason.
- **Modal-as-default.** Modals are usually laziness. Inline editing, drawers, and progressive disclosure exhaust their use cases first.
- **Decorative motion.** Bounce, spring, elastic, parallax, scroll-jacking. Motion durations cap at 400ms with `ease`; exit faster than enter.

## Strategic principles

In priority order, when these conflict:

1. **Tokens are non-negotiable.** Every color, spacing, radius, and shadow comes from `globals.css`. Hex literals, arbitrary px values, and inline magic numbers are bugs to fix, not styling shortcuts.
2. **Both themes always work.** Components never read theme; they read tokens that swap. A component that breaks in light mode is a broken component, not a "dark-mode-first" choice.
3. **Accessibility before delight.** WCAG AA contrast, visible focus rings, keyboard-operability, reduced-motion respect, and semantic landmarks are floors, not goals. `--text-muted` is graphical-objects-only (3:1 floor); functional small text routes through `--text-tertiary` (AA-pass).
4. **The 10% gold rule.** The signature accent appears on ≤10% of any screen. Overuse dilutes it from a brand thread to a decorative pattern.
5. **One source of truth, four files in sync.** When a token changes, `globals.css`, `DESIGN.md`, `STYLE_GUIDE.md`, and `CLAUDE.md` all update together. Drift between them is the fastest way to break the system.
6. **Restraint over flourish in product UI.** Cinzel, ornamental glyphs, gold radial gradients, large-display sizes are marketing-only. Inside the product they read as costume.
7. **Density over sprawl.** Compact, information-rich layouts on the 8-point grid. White space is rhythm, not padding-by-reflex.

## Surfaces and their registers

| Surface | Register | Notes |
|---|---|---|
| `globals.css`, `DESIGN.md`, `STYLE_GUIDE.md`, `CLAUDE.md`, `DESIGN.json` | product | The contract. Plain, terse, normative. |
| `index.html` hero + colophon | brand | Sanctioned marketing moments: Cinzel display, gold radial firelight, ornamental rule. |
| `index.html` everything else (foundation tokens, components, dashboard demo) | product | Inter, restrained motion, no Cinzel. |
| Apps consuming the system | product | The system serves the app's UI; the app supplies its own product voice on top. |

When a sub-command's `register` cue conflicts with this file, the cue in the task wins (per impeccable's routing rules).
