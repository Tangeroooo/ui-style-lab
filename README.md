# UI Language Lab

일곱 가지 UI 디자인 층위를 조합하고, 같은 `Field Notes` component lab 전체에 적용해 비교하는 interactive reference입니다. Buttons, inputs, filters, navigation, 실제 Recharts data visualization, content module까지 하나의 visual system으로 연결됩니다.

**Live:** https://tangerooo.github.io/ui-style-lab/

## What you can mix

- 12 base aesthetics — Minimalism, Swiss, Neo-brutalism, Editorial, Y2K, Cyberpunk, Frutiger Aero 등
- 9 surfaces — Flat, Glassmorphism, Neumorphism, Claymorphism, Material, Liquid Glass 등
- 7 layouts — Landing Narrative, Bento, Modular Cards, Editorial, Split, Compact Index, Broken Grid
- 2 navigation positions — Top, Left
- 8 typography directions
- 10 color palettes
- 3 motion levels

기초 미학별 compatibility rule을 통과한 8,332개 조합을 URL hash로 저장하고 공유할 수 있습니다. 호환되지 않는 옵션은 목록에 남아 있지만 비활성화되며, 18개의 curated preset과 유효 조합만 생성하는 randomize 기능도 포함합니다.

## Local development

```bash
npm ci
npm run dev
```

GitHub Pages용 static build:

```bash
npm run build:pages
```

## Structure

```text
app/
  StyleLab.tsx       interactive mixer, full-page sample site, Recharts data visualization
  style-data.ts      axes, options, and curated presets
  style-lab.css      layered design tokens and visual implementations
static-main.tsx      GitHub Pages client entry
vite.pages.config.ts static Pages build configuration
```

The same React component is used by the local vinext preview and the GitHub Pages static build.
