# UI Language Lab

**English** · [한국어](./README.ko.md)

[Live site](https://tangeroooo.github.io/ui-style-lab/) · [Repository](https://github.com/Tangeroooo/ui-style-lab)

UI Language Lab is an interactive, bilingual reference for composing complete interface systems. It applies every selection to the same full-page `Field Notes` site so that layout, navigation, components, typography, real charts, and content rhythm can be compared under consistent conditions.

English is the default interface language. A detached floating language control offers `English`, `한국어 only`, and `한국어 + English` content modes without competing with the page navigation or combination mixer.

## What you can mix

| Layer | Options | Purpose |
| --- | ---: | --- |
| Base aesthetic | 23 | The governing visual language, including historical lineages, selected company systems, and their documented dark variants |
| Surface | 12 | Flat, Skeuomorphism, Glass, Acrylic, Neumorphism, Material, E-ink Paper, and more |
| Layout | 10 | Landing, Bento, Cards, Masonry, Editorial, Dashboard, Master–detail, Broken Grid, and more |
| Navigation position | 2 | Top or left rail |
| Menu style | 3 | Text, icon, or icon + text |
| Korean type | 10 | IBM Plex Sans KR, Pretendard, SUIT, Noto Sans KR, Spoqa Han Sans Neo, Nanum Gothic, Gowun Dodum, Jua, Nanum Gothic Coding, Black Han Sans |
| Latin type | 8 | Grotesk, humanist, serif, mono, rounded, condensed, slab, pixel |
| Type binding | 2 | Pair Latin and Korean faces by script, or use the selected Korean face for both scripts |
| Palette | 26 | Includes a four-color Enterprise Rail family, Pure White, and native Material, Fluent, Carbon, and shadcn/ui light/dark token families |
| Motion | 3 | Quiet, subtle, kinetic |

The lab exposes a different number of visually distinct combinations for each content mode: **78,388** in English, **179,800** in Korean-only, and **799,808** in Korean + English. This is not the unrestricted Cartesian product: the selected base aesthetic controls which values are valid in every dependent layer, and Latin type is not counted when Korean Unified makes it visually irrelevant. Incompatible values remain visible but disabled.

The added options were deliberately curated from the broader research list:

- Historical base aesthetics: `Bauhaus`, `Art Deco`, and `Scandinavian`. Each has a page-wide geometry, hierarchy, component, chart, and navigation treatment rather than a palette-only skin.
- Company systems: `Material 3`, `Fluent 2`, `IBM Carbon`, and `shadcn/ui`, with separately selectable official dark variants. Their native defaults follow documented semantic tokens, shape, component, and density rules. `shadcn/ui` is technically an Open Code component system and distribution model rather than a historical graphic-design movement, but it is useful here as a governing product-UI convention. See [Material 3](https://developer.android.com/develop/ui/compose/designsystems/material3), [Fluent 2 tokens](https://fluent2.microsoft.design/design-tokens), [Carbon themes](https://carbondesignsystem.com/elements/themes/code/), and [shadcn/ui](https://ui.shadcn.com/docs).
- Dependent layers: `Skeuomorphism`, `Acrylic`, `E-ink Paper`; `Masonry`, `Data Dashboard`, `Master–detail`; and six matching palette families.

Broader concepts such as Pop Art, Punk/Zine, Spatial UI, Polaris, and GOV.UK remain research candidates rather than selectable base aesthetics. They either overlap an existing axis, require a different interaction model, or need domain-specific content before the full-page comparison would be honest.

`Bento Grid` is modeled as a layout pattern, not a governing aesthetic. The `Bento Pastel` palette supplies the familiar white-card, navy, cobalt, coral, and mint product-dashboard skin while the base aesthetic still owns typography, geometry, and interaction rules. `Pure White` is a separate high-key palette: the canvas and cards stay white while near-black type, neutral borders, and restrained accents preserve hierarchy.

The `Enterprise Rail` family models the common dark-navigation/light-canvas product pattern. It now includes Navy + Porcelain (`#16294A`), Evergreen + Frost (`#193324`), Burgundy + Pearl (`#402731`), and Graphite + Snow (`#2D2E2F`). The four rail colors retain at least a 13.5:1 contrast against white navigation text. They are treated as role-based palette variants—not new aesthetics—and are enabled only for Minimal, Material 3, Fluent 2, Carbon, and shadcn/ui light systems. The role structure follows the background/solid/text separation described by [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale), while hue grades and contrast selection were checked against [USWDS color guidance](https://designsystem.digital.gov/design-tokens/color/overview/) and [WCAG 2.2 contrast minimums](https://www.w3.org/TR/WCAG22/#contrast-minimum).

The repeated dot matrix that previously appeared behind every canvas was an implementation artifact, not a UI standard. The global `radial-gradient` texture has been removed. Texture is now opt-in: E-ink keeps a deliberate pixel-like grain, while Acrylic and Digital Paper use non-dot material treatments. High-density phone displays no longer make an unintended common pattern appear across unrelated aesthetics.

Material 3 is the successor to Material 2, not a superset that contains Material 1 and 2. Google documents Material 2 → Material 3 as a migration between systems with changed theming, components, and APIs; both may coexist temporarily during migration, but they should not be treated as nested style presets. See the official [Material 2 to Material 3 migration guide](https://developer.android.com/develop/ui/compose/designsystems/material2-material3).

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

Every Korean face has layout-fit tokens for display size, line height, and tracking so the intended two-line hierarchy survives different Hangul metrics. Existing shared URLs remain compatible: older hashes without language, view, `koType`, or `fontMode` receive safe defaults.

The additional UI fonts come from their official webfont projects: [Pretendard](https://github.com/orioncactus/pretendard), [SUIT](https://github.com/sun-typeface/SUIT), [Noto](https://notofonts.github.io/noto-docs/website/use/), [Spoqa Han Sans Neo](https://github.com/spoqa/spoqa-han-sans), and [Google Fonts + Korean](https://googlefonts.github.io/korean/).

## Sharing

The Share menu creates two state-complete URLs:

- `Lab link`: mixer, presets, and the selected canvas.
- `Reference view`: the live canvas only, suitable for agent prompts, design briefs, and handoff.

Both links preserve the aesthetic combination, language, Korean content mode, and typography binding in the URL.

Randomize and Share remain a separate floating action group, but on desktop that group sits directly below the right-side mixer so the related controls stay in one attention zone. A contextual `Presets ↕ Canvas` action provides one-touch travel between the live page and curated presets after switching a whole-page style. The language control remains detached. On narrow screens all quick actions sit above the bottom mixer without overlapping it.

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
  style-data.ts      axes, aesthetic compatibility rules, presets, count
  style-lab.css      layered tokens and full-page visual implementations
  url-state.ts       language, content mode, share view, URL round-trip
tests/
  rendered-html.test.mjs
  style-data.test.mjs
AGENTS.md             contribution rules for extending the design layers
static-main.tsx       GitHub Pages client entry
vite.pages.config.ts  static Pages build configuration
```

## Design and asset policy

- The sample site is original and does not reuse the user's reference screenshots or their component composition.
- Charts use Recharts with real data structures rather than decorative chart drawings.
- Aesthetic identity takes precedence over arbitrary palette or surface mixing.
- See [AGENTS.md](./AGENTS.md) before adding an option, layer, or preset.
