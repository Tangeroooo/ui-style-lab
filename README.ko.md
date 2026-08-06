# UI Language Lab

[English](./README.md) · **한국어**

[라이브 사이트](https://tangeroooo.github.io/ui-style-lab/) · [저장소](https://github.com/Tangeroooo/ui-style-lab)

UI Language Lab은 UI 디자인 언어를 전체 페이지 단위로 조합하고 비교하는 bilingual interactive reference입니다. 모든 선택을 동일한 `Field Notes` 사이트에 적용하기 때문에 layout, navigation, component, typography, 실제 chart와 콘텐츠 리듬을 같은 조건에서 비교할 수 있습니다.

기본 언어는 English입니다. 상단의 언어 버튼에서 `English`, `한국어 only`, `한국어 + English`를 선택할 수 있습니다.

## 조합할 수 있는 층위

| 층위 | 선택지 수 | 역할 |
| --- | ---: | --- |
| 기초 미학 | 12 | Minimalism, Swiss, Neo-brutalism, Editorial, Y2K 등 전체 시각 문법을 지배 |
| 표면 | 9 | Flat, Glassmorphism, Neumorphism, Claymorphism, Material 등 |
| 구성 | 7 | Landing, Bento, Cards, Editorial, Split, Dense Index, Broken Grid |
| 메뉴 위치 | 2 | 상단 또는 좌측 rail |
| 메뉴 표현 | 3 | 텍스트, 아이콘, 아이콘 + 텍스트 |
| 영문 서체 | 8 | Grotesk, humanist, serif, mono, rounded, condensed, slab, pixel |
| 한글 서체 | 10 | IBM Plex Sans KR, 프리텐다드, 수트, Noto Sans KR, 스포카 한 산스 네오, 나눔고딕, 고운 돋움, 주아, 나눔고딕 코딩, 검은고딕 |
| 서체 적용 | 2 | 언어별 서체를 분리하거나 한글 서체 하나로 모든 문자를 표현 |
| 색상 | 10 | Monochrome, cobalt, primary, citrus, candy, forest 등 |
| 움직임 | 3 | Quiet, subtle, kinetic |

화면에서 실제로 구분되는 조합은 English **20,804개**, 한국어 only **44,024개**, 한국어 + English **322,176개**입니다. 모든 선택지를 무제한으로 곱한 값이 아니라, 현재 콘텐츠 모드에 보이는 layer와 기초 미학별 compatibility rule을 통과한 조합만 계산합니다. 호환되지 않는 선택지는 숨기지 않고 비활성화 상태로 보여줍니다.

## Bilingual typography

- `English`: `영문 서체`만 표시합니다.
- `한국어 only`: `한글 서체`만 표시하고 선택한 서체를 canvas 전체에 자동 적용합니다.
- `한국어 + English`: `영문 서체`, `한글 서체`, `서체 적용`을 모두 표시합니다.
  - `한글 서체`는 Hangul을 지원하는 실제 web font를 선택합니다. 한글 명조체는 의도적으로 제외합니다.
  - `서체 적용`에서는 다음 두 방식을 선택할 수 있습니다.
    - `스크립트 페어링`: Latin은 영문 서체, 한글은 한글 서체 사용
    - `한글 서체 통합`: 선택한 한글 서체 하나로 Latin과 한글을 모두 표현

각 한글 서체에는 display 크기, line-height, letter-spacing용 layout-fit token을 따로 두어 서체를 바꿔도 의도한 2행 구조와 콘텐츠 높이가 유지되도록 했습니다. 기존 URL에 언어·화면 모드·`koType`·`fontMode`가 없어도 안전한 기본값으로 자동 보완됩니다.

추가한 UI 서체는 공식 webfont 배포처를 기준으로 선정했습니다: [Pretendard](https://github.com/orioncactus/pretendard), [SUIT](https://github.com/sun-typeface/SUIT), [Noto](https://notofonts.github.io/noto-docs/website/use/), [Spoqa Han Sans Neo](https://github.com/spoqa/spoqa-han-sans), [Google Fonts + Korean](https://googlefonts.github.io/korean/).

## 공유 방식

- `실험실 링크`: mixer, preset과 현재 canvas를 함께 공유합니다.
- `레퍼런스 화면`: 선택한 live canvas만 표시합니다. 에이전트 prompt, 디자인 brief, handoff용 reference로 전달하기 좋습니다.

두 링크 모두 디자인 조합, 언어, 한국어 콘텐츠 모드와 서체 적용 방식을 URL에 저장합니다.

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
app/url-state.ts     language, content mode, reference view, URL state
AGENTS.md             확장 및 검증 규칙
```
