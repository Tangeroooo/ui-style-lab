# UI Style Lab

[English](./README.md) · **한국어**

[라이브 사이트](https://tangeroooo.github.io/ui-style-lab/) · [저장소](https://github.com/Tangeroooo/ui-style-lab)

UI Style Lab은 UI 디자인 언어를 전체 페이지 단위로 조합하고 비교하는 bilingual interactive reference입니다. 모든 선택을 동일한 `Field Notes` 사이트에 적용하기 때문에 layout, navigation, component, typography, 실제 chart와 콘텐츠 리듬을 같은 조건에서 비교할 수 있습니다.

기본 언어는 English입니다. 페이지 navigation과 조합 mixer에서 분리된 floating 언어 버튼으로 `English`, `한국어 only`, `한국어 + English`를 선택할 수 있습니다.

## 조합할 수 있는 층위

| 층위 | 선택지 수 | 역할 |
| --- | ---: | --- |
| 기초 미학 | 36 | 역사 계보, 선별한 기업 system과 공식 dark variant를 포함해 전체 시각 문법을 지배 |
| 표면 | 12 | Flat, Skeuomorphism, Glass, Acrylic, Neumorphism, Material, E-ink Paper 등 |
| 구성 | 10 | Landing, Bento, Cards, Masonry, Editorial, Dashboard, Master–detail, Broken Grid 등 |
| 메뉴 위치 | 2 | 상단 또는 좌측 rail |
| 메뉴 표현 | 3 | 텍스트, 아이콘, 아이콘 + 텍스트 |
| 한글 서체 | 10 | IBM Plex Sans KR, 프리텐다드, 수트, Noto Sans KR, 스포카 한 산스 네오, 나눔고딕, 고운 돋움, 주아, 나눔고딕 코딩, 검은고딕 |
| 영문 서체 | 8 | Grotesk, humanist, serif, mono, rounded, condensed, slab, pixel |
| 서체 적용 | 2 | 언어별 서체를 분리하거나 한글 서체 하나로 모든 문자를 표현 |
| 색상 | 39 | 4색 Enterprise Rail family, Pure White와 Apple, Atlassian, Primer, Fiori, Material, Fluent, Carbon, shadcn/ui, Zag, Tamagui, Nebular token family 포함 |
| 움직임 | 3 | Quiet, subtle, kinetic |

화면에서 실제로 구분되는 조합은 English **81,220개**, 한국어 only **184,936개**, 한국어 + English **817,040개**입니다. 모든 선택지를 무제한으로 곱한 값이 아니라, 현재 콘텐츠 모드에 보이는 layer와 기초 미학별 compatibility rule을 통과한 조합만 계산합니다. `한글 서체 통합`에서 결과에 영향을 주지 않는 영문 서체는 중복 조합으로 세지 않습니다. 호환되지 않는 선택지는 숨기지 않고 비활성화 상태로 보여줍니다.

넓은 조사 목록에서는 다음 기준으로 실제 선택지를 선별했습니다.

- 역사 기초 미학: `Bauhaus`, `Art Deco`, `Scandinavian`. 단순 palette가 아니라 페이지 geometry, hierarchy, component, chart, navigation까지 달라집니다.
- 기업·library system: `Apple Liquid Glass`, `Atlassian Design System`, `GitHub Primer`, `SAP Fiori`, `Material 3`, `Fluent 2`, `IBM Carbon`, `shadcn/ui`, `Tamagui`, `Nebular Eva`와 문서화된 dark variant. native default는 공식 semantic color, material, shape, component, density, navigation 원칙을 기준으로 했습니다. `shadcn/ui`는 Open Code distribution model이고 Tamagui는 configurable cross-platform style/UI system이지만, 제품 UI를 지배하는 일관된 convention이 있어 기초 미학에 포함했습니다. 공식 자료: [Apple Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass), [Atlassian foundations](https://atlassian.design/foundations), [Primer foundations](https://primer.style/product/getting-started/foundations/), [SAP Fiori](https://experience.sap.com/fiori-design-web/sap-fiori/), [Material 3](https://developer.android.com/develop/ui/compose/designsystems/material3), [Fluent 2 token](https://fluent2.microsoft.design/design-tokens), [Carbon theme](https://carbondesignsystem.com/elements/themes/code/), [shadcn/ui](https://ui.shadcn.com/docs), [Tamagui theme](https://tamagui.dev/docs/core/theme), [Nebular Eva theme](https://akveo.github.io/nebular/docs/design-system/design-system-theme/).
- 다른 layer: `Skeuomorphism`, `Glassmorphism`, `Liquid Glass`, `Acrylic`, `E-ink Paper`; `Masonry`, `Data Dashboard`, `Master–detail`; 그리고 각 미학과 호환되는 palette family를 유지합니다.

[awesome-styleguides 목록](https://github.com/streamich/awesome-styleguides)은 그대로 가져오는 catalog가 아니라 후보를 찾는 discovery index로 사용했습니다. Tamagui와 Nebular는 공식 token·theme·shape·component state 문서를 전체 canvas와 대조한 뒤 승격했습니다. Zag는 의도적인 예외입니다. [machine API 자체가 공식적으로 headless·unstyled](https://zagjs.com/overview/introduction)이므로 `Zag Showcase`는 official docs site의 charcoal, green, pill state와 statechart flow만 가리키며, 존재하지 않는 Zag core theme를 뜻하지 않습니다. React Aria, Radix, Flowbite, Material UI 같은 library는 theme에 따라 결과가 달라지거나 기존 governing system과 겹쳐 별도 기초 미학으로 만들지 않았습니다.

`Apple Liquid Glass`는 단순히 반투명 surface를 선택하는 것과 구분합니다. 범용 `Glassmorphism`과 `Liquid Glass`는 계속 재사용 가능한 표면 layer이고, Apple 기초 미학은 현재 HIG 원칙대로 glass를 content 위의 navigation·control용 기능 layer로 제한하며 배경에 적응시키고 절제해 사용합니다. control에는 가장자리를 압축하고 중앙을 팽창시키는 identity map, 미세 ripple displacement, 절제된 RGB chromatic aberration, Fresnel 방식의 비대칭 specular rim과 색 보정 layered-blur fallback을 결합했습니다. 본문 card까지 전부 흐린 유리판으로 만들지 않고 읽기 쉬운 불투명 content surface를 유지합니다. light/dark 항목은 geometry와 compatibility를 공유하되 adaptive system palette를 분리했습니다. 공식 [Liquid Glass overview](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass), [Materials 지침](https://developer.apple.com/design/human-interface-guidelines/materials), [Dark Mode 지침](https://developer.apple.com/design/human-interface-guidelines/dark-mode), [Atlas Pup Labs의 CSS 분석](https://atlaspuplabs.com/blog/liquid-glass-but-in-css)을 기준으로 구현했습니다.

범용 `Glassmorphism` surface는 의도적으로 광학 굴절을 사용하지 않습니다. tint를 18%, backdrop blur를 12px로 낮춰 panel 뒤의 color field와 geometry가 실제로 비치게 하고, 반투명 border, inner highlight와 soft shadow로 frosted layer를 구분합니다. 범용 `Liquid Glass`는 12% fill과 9px color-adjusted blur로 더 투명하며 큰 ring과 color field가 surface 뒤를 지나가도록 구성했습니다. 불투명 white card를 glass처럼 보이게 처리하지 않으면서 Apple의 굴절 material과도 구분합니다.

`Bento Grid`는 기초 미학이 아니라 layout pattern으로 유지합니다. `Bento Pastel`은 흰 card, navy, cobalt, coral, mint로 익숙한 dashboard skin을 제공하고, 기초 미학은 계속 typography, geometry, interaction을 지배합니다. `Pure White` palette는 배경과 card를 white로 유지하면서 near-black text, neutral border, 절제된 accent로 hierarchy를 보존합니다.

`Enterprise Rail` family는 dark navigation과 light canvas를 대비시키는 제품 UI 패턴입니다. Navy + Porcelain(`#16294A`), Evergreen + Frost(`#193324`), Burgundy + Pearl(`#402731`), Graphite + Snow(`#2D2E2F`) 네 종류이며, 모두 white navigation text와 최소 13.5:1의 대비를 유지합니다. 새 기초 미학이 아니라 동일한 color role을 공유하는 palette variant로 모델링했고 Minimal, Material 3, Fluent 2, Carbon, shadcn/ui의 light system에서만 활성화했습니다. role 구성은 [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)의 background/solid/text 구분을, 명도 grade와 대비는 [USWDS color guidance](https://designsystem.digital.gov/design-tokens/color/overview/)와 [WCAG 2.2](https://www.w3.org/TR/WCAG22/#contrast-minimum)를 기준으로 점검했습니다.

이전에 모든 canvas 뒤에 반복되던 작은 점(dot matrix)은 UI 표준이 아니라 공통 `.sample-noise`의 `radial-gradient`가 만든 구현 문제였습니다. global 점 texture를 제거했고, 이제 E-ink처럼 pixel grain이 물성 표현에 필요한 surface에서만 명시적으로 사용합니다. Acrylic과 Digital Paper는 점 격자 대신 각 material에 맞는 blur와 섬유 방향 texture를 사용하므로 고밀도 iPhone 화면에서도 서로 무관한 미학에 같은 점 무늬가 나타나지 않습니다.

Material 3은 Material 1·2를 내부에 포함하는 superset이 아니라 Material 2의 successor입니다. Google의 공식 문서도 theme, component, API가 달라지는 migration으로 설명하며, 전환 중 일시적으로 M2와 M3를 함께 쓸 수는 있지만 하나의 nested style family처럼 다루지는 않습니다. 공식 [Material 2 → Material 3 migration guide](https://developer.android.com/develop/ui/compose/designsystems/material2-material3)를 참고하세요.

## Bilingual typography

- `English`: `영문 서체`만 표시합니다.
- `한국어 only`: `한글 서체`만 표시하고 선택한 서체를 canvas 전체에 자동 적용합니다.
- `한국어 + English`: `한글 서체` 다음에 조건부 `영문 서체`, 그리고 `서체 적용`을 표시합니다.
  - English를 작은 label이나 companion text에만 두지 않고 hero, data, story, guide, route의 큰 display headline에도 섞고, 각 section의 본문에도 충분한 English copy를 제공합니다.
  - `한글 서체`는 Hangul을 지원하는 실제 web font를 선택합니다. 한글 명조체는 의도적으로 제외합니다.
  - `영문 서체`는 `스크립트 페어링`일 때만 표시합니다. `한글 서체 통합`에서는 결과에 영향을 주지 않으므로 숨깁니다.
  - `서체 적용`에서는 다음 두 방식을 선택할 수 있습니다.
    - `스크립트 페어링`: Latin은 영문 서체, 한글은 한글 서체 사용
    - `한글 서체 통합`: 선택한 한글 서체 하나로 Latin과 한글을 모두 표현

각 한글 서체에는 display 크기, line-height, letter-spacing용 layout-fit token을 따로 두어 서체를 바꿔도 의도한 2행 구조와 콘텐츠 높이가 유지되도록 했습니다. 기존 URL에 언어·화면 모드·`koType`·`fontMode`가 없어도 안전한 기본값으로 자동 보완됩니다.

추가한 UI 서체는 공식 webfont 배포처를 기준으로 선정했습니다: [Pretendard](https://github.com/orioncactus/pretendard), [SUIT](https://github.com/sun-typeface/SUIT), [Noto](https://notofonts.github.io/noto-docs/website/use/), [Spoqa Han Sans Neo](https://github.com/spoqa/spoqa-han-sans), [Google Fonts + Korean](https://googlefonts.github.io/korean/).

## 공유 방식

- `실험실 링크`: mixer, preset과 현재 canvas를 함께 공유합니다.
- `레퍼런스 화면`: 선택한 live canvas만 표시합니다. 에이전트 prompt, 디자인 brief, handoff용 reference로 전달하기 좋습니다.

두 링크 모두 디자인 조합, 언어, 한국어 콘텐츠 모드와 서체 적용 방식을 URL에 저장합니다.

무작위 조합과 공유는 독립 floating action group을 유지하되 desktop에서는 우측 mixer 바로 아래에 배치해 하나의 조작 영역으로 인식되게 했습니다. contextual `프리셋 ↕ 캔버스` 버튼으로 whole-page preset을 적용한 뒤 live canvas와 preset 목록 사이를 원터치로 왕복할 수 있습니다. 언어 control은 계속 분리되며 narrow viewport에서는 quick action이 bottom mixer 위에 겹치지 않도록 배치됩니다.

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
