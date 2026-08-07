# UI Style Lab

**English** · [한국어](./README.ko.md)

[Live site](https://tangeroooo.github.io/ui-style-lab/) · [Repository](https://github.com/Tangeroooo/ui-style-lab)

UI Style Lab is an interactive, bilingual reference for composing complete interface systems. It applies every selection to the same full-page `Field Notes` site so that layout, navigation, components, typography, real charts, and content rhythm can be compared under consistent conditions.

English is the default interface language. The right-side floating control stack offers `English`, `한국어 only`, and `한국어 + English` immediately below the preset, randomize, and share actions on desktop.

## What you can mix

| Layer | Options | Purpose |
| --- | ---: | --- |
| Base aesthetic | 43 | The governing visual language, including historical lineages, selected company systems, documented dark variants, MUI, and SAP accessibility themes |
| Surface | 11 | Flat, Skeuomorphism, Glass, Acrylic, Neumorphism, Elevated Paper, E-ink Paper, and more |
| Layout | 14 | Landing, Bento, Feed, Supporting Pane, Data Table, Wizard, Dashboard, Master–detail, and more |
| Navigation position | 2 | Top or left rail |
| Menu style | 3 | Text, icon, or icon + text |
| Korean type | 10 | IBM Plex Sans KR, Pretendard, SUIT, Noto Sans KR, Spoqa Han Sans Neo, Nanum Gothic, Gowun Dodum, Jua, Nanum Gothic Coding, Black Han Sans |
| Latin type | 8 | Grotesk, humanist, serif, mono, rounded, condensed, slab, pixel |
| Type binding | 2 | Pair Latin and Korean faces by script, or use the selected Korean face for both scripts |
| Palette | 46 | Includes a four-color Enterprise Rail family, Pure White, and native Atlassian, Primer, SAP Horizon/Quartz/Belize, Material, MUI, Fluent, Carbon, shadcn/ui, Zag, Tamagui, and Nebular token families |
| Motion | 6 | Quiet, subtle, kinetic, productive, staged, and spring physics |

The lab exposes a different number of visually distinct combinations for each content mode: **100,608** in English, **245,992** in Korean-only, and **897,688** in Korean + English. The lower count is intentional: the compatibility audit removed combinations that rendered but contradicted their governing aesthetic. Latin type is not counted when Korean Unified makes it visually irrelevant. Incompatible values remain visible but disabled.

The added options were deliberately curated from the broader research list:

- Historical base aesthetics: `Bauhaus`, `Art Deco`, and `Scandinavian`. Each has a page-wide geometry, hierarchy, component, chart, and navigation treatment rather than a palette-only skin.
- Company and library systems: `Atlassian Design System`, `GitHub Primer`, `SAP Fiori`, `Material 3`, `MUI Material UI`, `Fluent 2`, `IBM Carbon`, `shadcn/ui`, `Tamagui`, and `Nebular Eva`, with separately selectable documented dark variants. Their native defaults follow official semantic color, material, shape, component, density, and navigation guidance. `shadcn/ui` is an Open Code distribution model and Tamagui is a configurable cross-platform style/UI system rather than a historical movement, but each supplies a coherent governing product-UI convention. Sources: [Atlassian foundations](https://atlassian.design/foundations), [Primer foundations](https://primer.style/product/getting-started/foundations/), [SAP Fiori](https://experience.sap.com/fiori-design-web/sap-fiori/), [Material 3](https://developer.android.com/develop/ui/compose/designsystems/material3), [MUI Material UI](https://mui.com/material-ui/), [Fluent 2 tokens](https://fluent2.microsoft.design/design-tokens), [Carbon themes](https://carbondesignsystem.com/elements/themes/code/), [shadcn/ui](https://ui.shadcn.com/docs), [Tamagui themes](https://tamagui.dev/docs/core/theme), and [Nebular's Eva theme](https://akveo.github.io/nebular/docs/design-system/design-system-theme/).
  - SAP Fiori is treated as the parent design system rather than one visual skin. `Morning/Evening Horizon`, both `Horizon High Contrast` themes, `Quartz Light/Dark`, both `Quartz High Contrast` themes, and legacy `Belize` are separate base aesthetics because they change component geometry, shell treatment, focus, border, and color tokens together. `Horizon Set`, `Quartz Set`, and `Quartz Auto` are runtime selectors rather than visual results, so they are not options or counted combinations. Sources: [Fundamental Styles themes](https://github.com/SAP/fundamental-styles#-theming), [SAP theming guidance](https://experience.sap.com/fiori-design-web/theming/), and [SAP theming base content](https://github.com/SAP/theming-base-content).
  - Primer specifically keeps links, selected controls, active navigation, and focus in the blue `accent` role. Green is reserved for primary buttons and positive/success states, so it is deliberately visible but not the page-wide accent. Source: [Primer color usage](https://primer.style/product/getting-started/foundations/color-usage/) and [Primer color primitives](https://primer.style/product/primitives/color/).
- Dependent layers: `Skeuomorphism`, `Glassmorphism`, `Acrylic`, `E-ink Paper`; `Feed`, `Supporting Pane`, `Data Table`, `Wizard`, `Masonry`, `Dashboard`, `Master–detail`; and their compatible motion and palette families.

The [awesome-styleguides collection](https://github.com/streamich/awesome-styleguides) was used as a discovery index, not copied wholesale. Tamagui and Nebular were promoted after their official token, theme, shape, and component-state documentation was checked against the whole canvas. Zag is a deliberate exception: its [machine APIs are officially headless and unstyled](https://zagjs.com/overview/introduction), so `Zag Showcase` represents only the official docs site's charcoal, green, pill-state, and statechart-flow visual grammar—not a falsely implied Zag core theme. React Aria, Radix, and Flowbite remain references rather than aesthetics. MUI is included separately because its Material UI package has recognizable default component conventions and officially states that it currently implements Material Design 2.

The Apple Liquid Glass light/dark aesthetics, Liquid Glass surface, and their dedicated palettes have been removed. The remaining `Glassmorphism` surface now uses only an 8% tinted fill and 7px backdrop blur. Large rings and color fields deliberately pass behind the panels, making the actual backdrop visibly transmissive while a thin border, restrained highlight, and soft shadow preserve layer separation.

The expanded layout axis follows product patterns that remain distinct across breakpoints. Material documents `Feed`, `List-detail`, and `Supporting pane` as canonical adaptive layouts; this lab already had Master–detail, so it adds Feed and Supporting Pane. Data Table follows Carbon’s guidance for larger, nested, comparable datasets, while Wizard Flow represents the common sequential form/task pattern. Sources: [Material canonical layouts](https://m3.material.io/foundations/layout/canonical-examples/overview), [Carbon structured list and data table guidance](https://carbondesignsystem.com/components/structured-list/usage/), and [Carbon universal patterns](https://carbondesignsystem.com/patterns/overview/).

The motion axis now distinguishes Productive feedback, Staged enter/exit choreography, and Spring Physics from the existing quiet, subtle, and kinetic modes. Productive motion follows Carbon’s efficient task-oriented timing; staged transitions follow Fluent’s common enter/exit and choreography principles; spring behavior reflects Material’s tokenized motion physics. Every animated mode is disabled under `prefers-reduced-motion`. Sources: [Carbon motion](https://carbondesignsystem.com/elements/motion/overview/), [Fluent 2 motion](https://fluent2.microsoft.design/motion), [Material 3](https://m3.material.io/), and [W3C reduced-motion technique C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39).

`Bento Grid` is modeled as a layout pattern, not a governing aesthetic. The `Bento Pastel` palette supplies the familiar white-card, navy, cobalt, coral, and mint product-dashboard skin while the base aesthetic still owns typography, geometry, and interaction rules. `Pure White` is a separate high-key palette: the canvas and cards stay white while near-black type, neutral borders, and restrained accents preserve hierarchy.

The `Enterprise Rail` family models the common dark-navigation/light-canvas product pattern. It includes Navy + Porcelain (`#16294A`), Evergreen + Frost (`#193324`), Burgundy + Pearl (`#402731`), and Graphite + Snow (`#2D2E2F`). The four rail colors retain at least a 13.5:1 contrast against white navigation text. They are role-based palette variants—not new aesthetics—and are enabled only for Minimal, Fluent 2, Carbon, and shadcn/ui light systems after the compatibility audit. The role structure follows the background/solid/text separation described by [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale), while hue grades and contrast selection were checked against [USWDS color guidance](https://designsystem.digital.gov/design-tokens/color/overview/) and [WCAG 2.2 contrast minimums](https://www.w3.org/TR/WCAG22/#contrast-minimum).

The repeated dot matrix that previously appeared behind every canvas was an implementation artifact, not a UI standard. The global `radial-gradient` texture has been removed. Texture is now opt-in: E-ink keeps a deliberate pixel-like grain, while Acrylic and Digital Paper use non-dot material treatments. High-density phone displays no longer make an unintended common pattern appear across unrelated aesthetics.

Material 3 is the successor to Material 2, not a superset that contains Material 1 and 2. Google documents Material 2 → Material 3 as a migration between systems with changed theming, components, and APIs; both may coexist temporarily during migration, but they should not be treated as nested style presets. See the official [Material 2 to Material 3 migration guide](https://developer.android.com/develop/ui/compose/designsystems/material2-material3).

`Material Design 3` and `MUI Material UI` are separate base aesthetics. Material Design is Google's design system; Material UI is the independently maintained MUI React component library, whose official documentation currently identifies its component set as a Material Design 2 implementation. The generic surface formerly labeled `Material` is now labeled `Elevated Paper` so selecting a surface cannot falsely turn another aesthetic into a Google or MUI system.

The aesthetic, surface, and layout dialogs expose a dated reference-basis card. `app/style-references.ts` classifies each source as an official system, institutional history, documented pattern, or community term. Structural layouts now use dedicated semantic renderers: a true variable-height column fallback for Masonry, a real Recharts dashboard, list/detail panes, semantic data table, feed, supporting pane, and form-based wizard.

See [Design Reference Audit](./docs/design-audit.md) for the decision model, corrected classifications, and verification contract.

Functional interface symbols use tree-shakable Lucide React SVG components rather than text glyphs. Their size, color, and stroke weight inherit the selected visual system.

## Bilingual typography

Typography controls follow the content mode so irrelevant axes do not create duplicate combinations:

- `English`: `Latin Type` only.
- `한국어 only`: `Korean Type` only. The selected Korean face is applied automatically across the canvas.
- `한국어 + English`: controls are ordered `Korean Type` → conditional `Latin Type` → `Type Binding`.
  - Korean primary copy is paired with English across the hero, data, story, guides, and route display headlines as well as substantial body copy—not just labels or small companion text.
  - `Korean Type` selects a Hangul-capable web font. Korean serif/Myeongjo faces are intentionally excluded.
  - `Latin Type` is visible only while `Script Pairing` is selected because it has no visual effect in `Korean Unified`.
  - `Type Binding` chooses between:
    - `Script Pairing`: Latin glyphs use `Latin Type`; Hangul uses `Korean Type`.
    - `Korean Unified`: the selected Korean face renders both Latin and Hangul.

Every Korean face has layout-fit tokens for display size, line height, and tracking so the intended two-line hierarchy survives different Hangul metrics. Canonical shared URLs now use query parameters; existing hash-state links remain readable and migrate to the current contract with safe defaults.

The additional UI fonts come from their official webfont projects: [Pretendard](https://github.com/orioncactus/pretendard), [SUIT](https://github.com/sun-typeface/SUIT), [Noto](https://notofonts.github.io/noto-docs/website/use/), [Spoqa Han Sans Neo](https://github.com/spoqa/spoqa-han-sans), and [Google Fonts + Korean](https://googlefonts.github.io/korean/).

## Sharing

The Share menu creates two state-complete URLs:

- `Lab link`: mixer, presets, and the selected canvas.
- `Reference view`: the live canvas only, suitable for agent prompts, design briefs, and handoff.

Both links preserve the aesthetic combination, language, Korean content mode, and typography binding as canonical query parameters. Reference links also enable deterministic `capture=1` and compatibility-reporting `strict=1` modes.

## Agent access without installation

Agents do not need an npm package, MCP server, login, or API key. [`llms.txt`](./public/llms.txt) points to the [agent guide](./public/agent-guide.md), machine-readable [`catalog.v1.json`](./public/agent/catalog.v1.json), and bounded [`review-packs.v1.json`](./public/agent/review-packs.v1.json). The catalog publishes stable IDs, aesthetic-governed allowlists, curated presets, evidence, and validated counts rather than enumerating every combination.

A browser agent can load a reference query, wait for `[data-agent-ready="true"]`, and read `#ui-style-lab-state`. That JSON reports `requested`, safe `resolved` state, and every `adjustment`; `data-agent-valid` makes invalid requests explicit. Legacy hashes are read-only input and are no longer emitted by the app.

Preset jump, Randomize, and Share remain a separate floating action group directly below the right-side mixer. The language control now sits immediately below that group on desktop. On narrow screens all four quick actions collapse into one compact row above the bottom mixer; language and share dialogs use viewport-bound sheets so enlarged controls cannot overlap each other or escape the screen.

## Compatibility model

`app/style-data.ts` is the source of truth.

```text
axes
  → aestheticRules.defaults / aestheticRules.allowed
  → normalizeSelection()
  → url-state.ts + mixer disabled states
  → data-* attributes on the full-page canvas
  → CSS visual system
```

`combinationCount(activeAxes, fixedValues)` sums the valid product for each aesthetic and supports conditional branches such as split versus unified typography. Randomize and presets also pass through the same compatibility rules.

## Development

Requirements: Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Validation:

```bash
npm run lint
npm test
npm run build:pages
```

Pushing `main` triggers the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`.

## Project structure

```text
app/
  StyleLab.tsx       mixer, bilingual sample site, Recharts visualizations
  agent-contract.ts  machine-readable catalog and rendered state contract
  style-data.ts      axes, aesthetic compatibility rules, presets, count
  style-lab.css      layered tokens and full-page visual implementations
  url-state.ts       language, content mode, share view, URL round-trip
tests/
  agent-contract.test.mjs
  rendered-html.test.mjs
  style-data.test.mjs
AGENTS.md             contribution rules for extending the design layers
static-main.tsx       GitHub Pages client entry
vite.pages.config.ts  static Pages build configuration
public/
  llms.txt, agent-guide.md, agent/catalog.v1.json
```

## Design and asset policy

- The sample site is original and does not reuse the user's reference screenshots or their component composition.
- Charts use Recharts with real data structures rather than decorative chart drawings.
- Aesthetic identity takes precedence over arbitrary palette or surface mixing.
- See [AGENTS.md](./AGENTS.md) before adding an option, layer, or preset.
