# UI Language Lab

**English** · [한국어](./README.ko.md)

[Live site](https://tangeroooo.github.io/ui-style-lab/) · [Repository](https://github.com/Tangeroooo/ui-style-lab)

UI Language Lab is an interactive, bilingual reference for composing complete interface systems. It applies every selection to the same full-page `Field Notes` site so that layout, navigation, components, typography, real charts, and content rhythm can be compared under consistent conditions.

English is the default interface language. Use the language control in the top navigation to switch the entire lab and its sample site to Korean.

## What you can mix

| Layer | Options | Purpose |
| --- | ---: | --- |
| Base aesthetic | 12 | The governing visual language: Minimalism, Swiss, Neo-brutalism, Editorial, Y2K, Cyberpunk, Frutiger Aero, and more |
| Surface | 9 | Flat, Glassmorphism, Neumorphism, Claymorphism, Material, Liquid Glass, Chrome, Paper, Gloss |
| Layout | 7 | Landing, Bento, Cards, Editorial, Split, Dense Index, Broken Grid |
| Navigation position | 2 | Top or left rail |
| Menu style | 3 | Text, icon, or icon + text |
| Latin type | 8 | Grotesk, humanist, serif, mono, rounded, condensed, slab, pixel |
| Korean type | 5 | IBM Plex Sans KR, Gowun Dodum, Jua, Nanum Gothic Coding, Black Han Sans |
| Type binding | 2 | Pair Latin and Korean faces by script, or use the selected Korean face for both scripts |
| Palette | 10 | Monochrome, cobalt, primary, citrus, candy, forest, sunset, noir, aurora, aqua |
| Motion | 3 | Quiet, subtle, kinetic |

The lab currently exposes **143,064 validated combinations**. This is not the unrestricted Cartesian product: the selected base aesthetic controls which values are valid in every dependent layer. Incompatible values remain visible but disabled.

## Bilingual typography

The typography system has three coordinated controls:

- `Latin Type` selects the Latin type direction.
- `Korean Type` selects a Hangul-capable web font. Korean serif/Myeongjo faces are intentionally excluded.
- `Type Binding` chooses between:
  - `Script Pairing`: Latin glyphs use `Latin Type`; Hangul uses `Korean Type`.
  - `Korean Unified`: the selected Korean face renders both Latin and Hangul.

Korean pages intentionally keep selected English labels and data annotations, making the interaction between the two type systems visible. Existing shared URLs remain compatible: older hashes without `koType` or `fontMode` receive the selected aesthetic's recommended defaults.

## Compatibility model

`app/style-data.ts` is the source of truth.

```text
axes
  → aestheticRules.defaults / aestheticRules.allowed
  → normalizeSelection()
  → URL hash + mixer disabled states
  → data-* attributes on the full-page canvas
  → CSS visual system
```

`combinationCount()` sums the valid product for each aesthetic. Randomize and presets also pass through the same compatibility rules.

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
