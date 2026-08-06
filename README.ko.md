# UI Language Lab

[English](./README.md) · **한국어**

[라이브 사이트](https://tangeroooo.github.io/ui-style-lab/) · [저장소](https://github.com/Tangeroooo/ui-style-lab)

UI Language Lab은 UI 디자인 언어를 전체 페이지 단위로 조합하고 비교하는 bilingual interactive reference입니다. 모든 선택을 동일한 `Field Notes` 사이트에 적용하기 때문에 layout, navigation, component, typography, 실제 chart와 콘텐츠 리듬을 같은 조건에서 비교할 수 있습니다.

기본 언어는 English입니다. 상단의 언어 버튼으로 실험실 UI와 예시 사이트 전체를 한국어로 전환할 수 있습니다.

## 조합할 수 있는 층위

| 층위 | 선택지 수 | 역할 |
| --- | ---: | --- |
| 기초 미학 | 12 | Minimalism, Swiss, Neo-brutalism, Editorial, Y2K 등 전체 시각 문법을 지배 |
| 표면 | 9 | Flat, Glassmorphism, Neumorphism, Claymorphism, Material 등 |
| 구성 | 7 | Landing, Bento, Cards, Editorial, Split, Dense Index, Broken Grid |
| 메뉴 위치 | 2 | 상단 또는 좌측 rail |
| 메뉴 표현 | 3 | 텍스트, 아이콘, 아이콘 + 텍스트 |
| 영문 서체 | 8 | Grotesk, humanist, serif, mono, rounded, condensed, slab, pixel |
| 한글 서체 | 5 | IBM Plex Sans KR, 고운 돋움, 주아, 나눔고딕 코딩, 검은고딕 |
| 서체 적용 | 2 | 언어별 서체를 분리하거나 한글 서체 하나로 모든 문자를 표현 |
| 색상 | 10 | Monochrome, cobalt, primary, citrus, candy, forest 등 |
| 움직임 | 3 | Quiet, subtle, kinetic |

현재 제공하는 조합은 **143,064개**입니다. 모든 선택지를 무제한으로 곱한 값이 아니라, 기초 미학별 compatibility rule을 통과한 조합만 계산한 수입니다. 호환되지 않는 선택지는 숨기지 않고 비활성화 상태로 보여줍니다.

## Bilingual typography

- `영문 서체`는 Latin 문자에 적용할 type direction을 선택합니다.
- `한글 서체`는 Hangul을 지원하는 실제 web font를 선택합니다. 한글 명조체는 의도적으로 제외합니다.
- `서체 적용`에서는 다음 두 방식을 선택할 수 있습니다.
  - `스크립트 페어링`: Latin은 영문 서체, 한글은 한글 서체 사용
  - `한글 서체 통합`: 선택한 한글 서체 하나로 Latin과 한글을 모두 표현

한국어 페이지에도 일부 English label과 data annotation을 남겨 두 서체의 관계를 실제 화면에서 확인할 수 있습니다. 기존 URL에 `koType`이나 `fontMode`가 없어도 기초 미학의 권장 기본값으로 자동 보완됩니다.

## 개발과 검증

Node.js 22.13 이상이 필요합니다.

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm test
npm run build:pages
```

`main` branch에 push하면 GitHub Pages workflow가 실행됩니다. 새 선택지나 층위를 추가하기 전에는 [AGENTS.md](./AGENTS.md)의 compatibility 및 검증 규칙을 확인하세요.

## 주요 파일

```text
app/StyleLab.tsx     mixer, bilingual sample site, Recharts
app/style-data.ts    axes, compatibility rules, presets, combination count
app/style-lab.css    layered visual tokens and implementations
AGENTS.md             확장 및 검증 규칙
```
