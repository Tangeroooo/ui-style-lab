# UI Language Lab

**English** · [한국어](./README.ko.md)

[Live site](https://tangeroooo.github.io/ui-style-lab/) · [Repository](https://github.com/Tangeroooo/ui-style-lab)

UI Language Lab is an interactive, bilingual reference for composing complete interface systems. It applies every selection to the same full-page `Field Notes` site so that layout, navigation, components, typography, real charts, and content rhythm can be compared under consistent conditions.

English is the default interface language. The top language control offers `English`, `한국어 only`, and `한국어 + English` content modes.

## What you can mix

| Layer | Options | Purpose |
| --- | ---: | --- |
| Base aesthetic | 12 | The governing visual language: Minimalism, Swiss, Neo-brutalism, Editorial, Y2K, Cyberpunk, Frutiger Aero, and more |
| Surface | 9 | Flat, Glassmorphism, Neumorphism, Claymorphism, Material, Liquid Glass, Chrome, Paper, Gloss |
| Layout | 7 | Landing, Bento, Cards, Editorial, Split, Dense Index, Broken Grid |
| Navigation position | 2 | Top or left rail |
| Menu style | 3 | Text, icon, or icon + text |
| Korean type | 10 | IBM Plex Sans KR, Pretendard, SUIT, Noto Sans KR, Spoqa Han Sans Neo, Nanum Gothic, Gowun Dodum, Jua, Nanum Gothic Coding, Black Han Sans |
| Latin type | 8 | Grotesk, humanist, serif, mono, rounded, condensed, slab, pixel |
| Type binding | 2 | Pair Latin and Korean faces by script, or use the selected Korean face for both scripts |
| Palette | 10 | Monochrome, cobalt, primary, citrus, candy, forest, sunset, noir, aurora, aqua |
| Motion | 3 | Quiet, subtle, kinetic |

The lab exposes a different number of visually distinct combinations for each content mode: **20,804** in English, **44,024** in Korean-only, and **205,112** in Korean + English. This is not the unrestricted Cartesian product: the selected base aesthetic controls which values are valid in every dependent layer, and Latin type is not counted when Korean Unified makes it visually irrelevant. Incompatible values remain visible but disabled.

## Bilingual typography

Typography controls follow the content mode so irrelevant axes do not create duplicate combinations:

- `English`: `Latin Type` only.
- `한국어 only`: `Korean Type` only. The selected Korean face is applied automatically across the canvas.
- `한국어 + English`: controls are ordered `Korean Type` → conditional `Latin Type` → `Type Binding`.
  - Korean primary copy is paired with substantial English companion copy across the hero, data, index, story, guides, route, and footer—not just English labels or microcopy.
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
