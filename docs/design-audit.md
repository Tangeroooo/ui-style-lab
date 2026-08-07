# Design Reference Audit

Last reviewed: 2026-08-07

## Decision model

UI Style Lab keeps the combination model, but it does not treat every Cartesian product as valid.

```text
Base aesthetic
  → native defaults
  → aesthetic allowlist
  → semantic layout renderer
  → surface / navigation / typography / palette / motion tokens
  → full-page canvas
```

The governing aesthetic defines the visual grammar. A dependent option remains visible when incompatible, but is disabled. `normalizeSelection()`, randomization, presets, URL state, and combination counts all use the same rules in `app/style-data.ts`.

## Audit changes

| Area | Finding | Resolution |
| --- | --- | --- |
| Minimalism | Glass, Acrylic, Neumorphism, Material, E-ink, data-dense layouts, and vivid palettes were simultaneously allowed; Glass was the default | Native default is now Flat + Landing + Pure White + Quiet. The allowlist is restricted to restrained surfaces, layouts, type, palettes, and motion |
| Material naming | Generic `Material` surface could be mistaken for a Google or MUI system | Stable URL ID remains `material`; user-facing name is `Elevated Paper` |
| Material 3 | Generic shadow cards were overused | Tonal containers, shape scale, pill actions, and low-shadow elevation now carry the aesthetic |
| Material UI / MUI | Previously described only as a reference despite its well-known component defaults | Added separate `MUI Material UI` light/dark aesthetics. They model the MUI React library's current Material Design 2 component grammar, not Google Material 3 |
| Company systems | Some light systems accepted unrelated brand palettes | Native palettes are locked for Material 3 and MUI. Enterprise Rail variants remain only where the host system can plausibly support brand theming |
| Masonry | A regular grid with manual offsets imitated Masonry | Uses variable-height CSS columns as a production fallback; native CSS masonry is still not Baseline |
| Dashboard | Reused the editorial page DOM with denser spacing | Dedicated KPI, real Recharts plot, status list, and controls |
| Master–detail | Reordered existing cards | Dedicated list pane with a selected item and detail pane |
| Feed / Supporting pane | Primarily CSS reshaping | Dedicated repeated feed records and explicit primary/supporting regions |
| Data table | Cards were styled to look like rows | Uses semantic `table`, `caption`, column headers, row headers, and status cells |
| Wizard | Cards were numbered with pseudo-elements | Uses a real ordered progress list and form with back/continue actions |
| Evidence | Sources lived only in README prose | Every aesthetic, surface, and layout has a typed evidence record and a selected-option source card |

## Evidence levels

- `official-system`: maintained documentation from the system owner.
- `institutional-history`: a museum or established reference for a historical movement.
- `documented-pattern`: a recognized UX, standards, or archive reference.
- `community-term`: a retrospective or community label; the UI must not present it as a formal standard.

The complete registry is `app/style-references.ts`. Tests fail when a new aesthetic, surface, or layout has no evidence record.

## Material terminology

- **Material Design 3**: Google's design system.
- **Material UI**: MUI's independently maintained React component library. Its official documentation currently states that Material UI adopts Material Design 2.
- **Elevated Paper**: this lab's generic surface layer. It is not a design-system identity.

## Verification contract

```bash
npm run lint
npm test
npm run build:pages
git diff --check
```

Visual QA covers desktop and iPhone-width layouts, every dedicated structural renderer, outside-click / Escape dismissal, randomization, language modes, reference sharing, and console errors.
