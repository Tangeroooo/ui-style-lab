# UI Language Lab

같은 analytics dashboard 구조에 서로 다른 UI 디자인 언어의 층위를 적용해 비교하는 interactive reference입니다.

**Live:** https://tangerooo.github.io/ui-style-lab/

## What you can mix

- 12 base aesthetics — Minimalism, Swiss, Neo-brutalism, Editorial, Y2K, Cyberpunk, Frutiger Aero 등
- 9 surfaces — Flat, Glassmorphism, Neumorphism, Claymorphism, Material, Liquid Glass 등
- 7 layouts — Dashboard, Bento, Cards, Editorial, Split, Dense, Broken Grid
- 8 typography directions
- 10 color palettes
- 3 motion levels

총 181,440개 조합을 URL hash로 저장하고 공유할 수 있습니다. 18개의 curated preset과 randomize 기능도 포함합니다.

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
  StyleLab.tsx       interactive application and reference dashboard
  style-data.ts      axes, options, and curated presets
  style-lab.css      layered design tokens and visual implementations
static-main.tsx      GitHub Pages client entry
vite.pages.config.ts static Pages build configuration
```

The same React component is used by the local vinext preview and the GitHub Pages static build.
