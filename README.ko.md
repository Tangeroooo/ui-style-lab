# UI Style Lab

[English](./README.md) · **한국어**

[라이브 사이트](https://tangeroooo.github.io/ui-style-lab/) · [저장소](https://github.com/Tangeroooo/ui-style-lab)

UI Style Lab은 UI 디자인 언어를 전체 페이지 단위로 조합하고 비교하는 bilingual interactive reference입니다. 모든 선택을 동일한 `Field Notes` 사이트에 적용하기 때문에 layout, navigation, component, typography, 실제 chart와 콘텐츠 리듬을 같은 조건에서 비교할 수 있습니다.

기본 언어는 English입니다. 데스크톱에서는 우측 floating stack의 프리셋·무작위·공유 바로 아래에서 `English`, `한국어 only`, `한국어 + English`를 선택할 수 있습니다.

## 조합할 수 있는 층위

| 층위 | 선택지 수 | 역할 |
| --- | ---: | --- |
| 기초 미학 | 43 | 역사 계보, 선별한 기업 system, 공식 dark variant, MUI와 SAP 접근성 theme을 포함해 전체 시각 문법을 지배 |
| 표면 | 11 | Flat, Skeuomorphism, Glass, Acrylic, Neumorphism, Elevated Paper, E-ink Paper 등 |
| 구성 | 14 | Landing, Bento, Feed, Supporting Pane, Data Table, Wizard, Dashboard, Master–detail 등 |
| 메뉴 위치 | 2 | 상단 또는 좌측 rail |
| 메뉴 표현 | 3 | 텍스트, 아이콘, 아이콘 + 텍스트 |
| 한글 서체 | 10 | IBM Plex Sans KR, 프리텐다드, 수트, Noto Sans KR, 스포카 한 산스 네오, 나눔고딕, 고운 돋움, 주아, 나눔고딕 코딩, 검은고딕 |
| 영문 서체 | 8 | Grotesk, humanist, serif, mono, rounded, condensed, slab, pixel |
| 서체 적용 | 2 | 언어별 서체를 분리하거나 한글 서체 하나로 모든 문자를 표현 |
| 색상 | 46 | 4색 Enterprise Rail family, Pure White와 Atlassian, Primer, SAP Horizon/Quartz/Belize, Material, MUI, Fluent, Carbon, shadcn/ui, Zag, Tamagui, Nebular token family 포함 |
| 움직임 | 6 | Quiet, subtle, kinetic, productive, staged, spring physics |

화면에서 실제로 구분되는 조합은 English **100,608개**, 한국어 only **245,992개**, 한국어 + English **897,688개**입니다. 수가 줄어든 것은 의도적입니다. 렌더링은 가능해도 governing aesthetic의 문법과 충돌하던 조합을 compatibility 감사에서 제거했습니다. `한글 서체 통합`에서 결과에 영향을 주지 않는 영문 서체는 중복 조합으로 세지 않습니다. 호환되지 않는 선택지는 숨기지 않고 비활성화 상태로 보여줍니다.

넓은 조사 목록에서는 다음 기준으로 실제 선택지를 선별했습니다.

- 역사 기초 미학: `Bauhaus`, `Art Deco`, `Scandinavian`. 단순 palette가 아니라 페이지 geometry, hierarchy, component, chart, navigation까지 달라집니다.
- 기업·library system: `Atlassian Design System`, `GitHub Primer`, `SAP Fiori`, `Material 3`, `MUI Material UI`, `Fluent 2`, `IBM Carbon`, `shadcn/ui`, `Tamagui`, `Nebular Eva`와 문서화된 dark variant. native default는 공식 semantic color, material, shape, component, density, navigation 원칙을 기준으로 했습니다. `shadcn/ui`는 Open Code distribution model이고 Tamagui는 configurable cross-platform style/UI system이지만, 제품 UI를 지배하는 일관된 convention이 있어 기초 미학에 포함했습니다. 공식 자료: [Atlassian foundations](https://atlassian.design/foundations), [Primer foundations](https://primer.style/product/getting-started/foundations/), [SAP Fiori](https://experience.sap.com/fiori-design-web/sap-fiori/), [Material 3](https://developer.android.com/develop/ui/compose/designsystems/material3), [MUI Material UI](https://mui.com/material-ui/), [Fluent 2 token](https://fluent2.microsoft.design/design-tokens), [Carbon theme](https://carbondesignsystem.com/elements/themes/code/), [shadcn/ui](https://ui.shadcn.com/docs), [Tamagui theme](https://tamagui.dev/docs/core/theme), [Nebular Eva theme](https://akveo.github.io/nebular/docs/design-system/design-system-theme/).
  - SAP Fiori는 하나의 visual skin이 아니라 상위 design system으로 다룹니다. `Morning/Evening Horizon`, Horizon 고대비 2종, `Quartz Light/Dark`, Quartz 고대비 2종, legacy `Belize`는 component geometry, shell, focus, border와 color token이 함께 달라지므로 각각 독립 기초 미학입니다. `Horizon Set`, `Quartz Set`, `Quartz Auto`는 화면 결과가 아니라 runtime selector이므로 선택지와 조합 수에 포함하지 않습니다. 공식 자료: [Fundamental Styles theme 목록](https://github.com/SAP/fundamental-styles#-theming), [SAP theming guideline](https://experience.sap.com/fiori-design-web/theming/), [SAP theming base content](https://github.com/SAP/theming-base-content).
  - Primer의 link, selected control, active navigation, focus는 blue `accent` role입니다. Green은 primary button과 positive/success state에만 사용해 눈에 띄되 페이지 전체 accent가 되지 않도록 했습니다. 참고: [Primer color usage](https://primer.style/product/getting-started/foundations/color-usage/), [Primer color primitives](https://primer.style/product/primitives/color/).
- 다른 layer: `Skeuomorphism`, `Glassmorphism`, `Acrylic`, `E-ink Paper`; `Feed`, `Supporting Pane`, `Data Table`, `Wizard`, `Masonry`, `Dashboard`, `Master–detail`; 그리고 각 미학과 호환되는 motion·palette family를 유지합니다.

[awesome-styleguides 목록](https://github.com/streamich/awesome-styleguides)은 그대로 가져오는 catalog가 아니라 후보를 찾는 discovery index로 사용했습니다. Tamagui와 Nebular는 공식 token·theme·shape·component state 문서를 전체 canvas와 대조한 뒤 승격했습니다. Zag는 의도적인 예외입니다. [machine API 자체가 공식적으로 headless·unstyled](https://zagjs.com/overview/introduction)이므로 `Zag Showcase`는 official docs site의 charcoal, green, pill state와 statechart flow만 가리키며, 존재하지 않는 Zag core theme를 뜻하지 않습니다. React Aria, Radix, Flowbite는 계속 참고 자료로만 유지합니다. MUI는 공식 문서가 현재 Material Design 2 구현임을 밝히고 있고 기본 component convention이 뚜렷해 별도 기초 미학으로 추가했습니다.

Apple Liquid Glass light/dark 기초 미학과 Liquid Glass 표면, 전용 palette는 모두 제거했습니다. 남은 `Glassmorphism`은 tint 8%와 backdrop blur 7px만 사용합니다. 큰 ring과 color field가 panel 뒤를 실제로 지나가도록 하고, 얇은 border·절제된 highlight·soft shadow로 layer separation만 유지했습니다.

새 layout은 breakpoint 전체에서 실제로 구분되는 제품 패턴만 추가했습니다. Material이 canonical adaptive layout으로 문서화한 `Feed`와 `Supporting Pane`, Carbon이 큰 비교 데이터에 권장하는 `Data Table`, 그리고 다단계 입력·과업의 `Wizard Flow`입니다. 기존 Master–detail은 Material의 List-detail 역할을 이미 담당합니다. 참고: [Material canonical layouts](https://m3.material.io/foundations/layout/canonical-examples/overview), [Carbon structured list와 data table](https://carbondesignsystem.com/components/structured-list/usage/), [Carbon universal patterns](https://carbondesignsystem.com/patterns/overview/).

motion은 기존 Quiet·Subtle·Kinetic에 `Productive`, `Staged`, `Spring Physics`를 추가했습니다. Productive는 Carbon의 빠른 task-oriented timing, Staged는 Fluent의 enter/exit choreography, Spring은 Material의 tokenized motion physics를 반영합니다. 모든 animation은 `prefers-reduced-motion`에서 중지됩니다. 참고: [Carbon motion](https://carbondesignsystem.com/elements/motion/overview/), [Fluent 2 motion](https://fluent2.microsoft.design/motion), [Material 3](https://m3.material.io/), [W3C C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39).

`Bento Grid`는 기초 미학이 아니라 layout pattern으로 유지합니다. `Bento Pastel`은 흰 card, navy, cobalt, coral, mint로 익숙한 dashboard skin을 제공하고, 기초 미학은 계속 typography, geometry, interaction을 지배합니다. `Pure White` palette는 배경과 card를 white로 유지하면서 near-black text, neutral border, 절제된 accent로 hierarchy를 보존합니다.

`Enterprise Rail` family는 dark navigation과 light canvas를 대비시키는 제품 UI 패턴입니다. Navy + Porcelain(`#16294A`), Evergreen + Frost(`#193324`), Burgundy + Pearl(`#402731`), Graphite + Snow(`#2D2E2F`) 네 종류이며, 모두 white navigation text와 최소 13.5:1의 대비를 유지합니다. 새 기초 미학이 아니라 동일한 color role을 공유하는 palette variant로 모델링했고 compatibility 감사 후 Minimal, Fluent 2, Carbon, shadcn/ui의 light system에서만 활성화했습니다. role 구성은 [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)의 background/solid/text 구분을, 명도 grade와 대비는 [USWDS color guidance](https://designsystem.digital.gov/design-tokens/color/overview/)와 [WCAG 2.2](https://www.w3.org/TR/WCAG22/#contrast-minimum)를 기준으로 점검했습니다.

이전에 모든 canvas 뒤에 반복되던 작은 점(dot matrix)은 UI 표준이 아니라 공통 `.sample-noise`의 `radial-gradient`가 만든 구현 문제였습니다. global 점 texture를 제거했고, 이제 E-ink처럼 pixel grain이 물성 표현에 필요한 surface에서만 명시적으로 사용합니다. Acrylic과 Digital Paper는 점 격자 대신 각 material에 맞는 blur와 섬유 방향 texture를 사용하므로 고밀도 iPhone 화면에서도 서로 무관한 미학에 같은 점 무늬가 나타나지 않습니다.

Material 3은 Material 1·2를 내부에 포함하는 superset이 아니라 Material 2의 successor입니다. Google의 공식 문서도 theme, component, API가 달라지는 migration으로 설명하며, 전환 중 일시적으로 M2와 M3를 함께 쓸 수는 있지만 하나의 nested style family처럼 다루지는 않습니다. 공식 [Material 2 → Material 3 migration guide](https://developer.android.com/develop/ui/compose/designsystems/material2-material3)를 참고하세요.

`Material Design 3`와 `MUI Material UI`는 별도 기초 미학입니다. Material Design은 Google의 design system이고, Material UI는 독립적인 MUI 조직의 React component library입니다. MUI 공식 문서는 현재 component set을 Material Design 2 구현으로 설명합니다. 다른 미학에서 `Material` 표면을 선택했다고 오해하지 않도록 기존 범용 표면 이름은 `Elevated Paper / 입체 페이퍼`로 바꿨습니다.

기초 미학·표면·구성 선택창에는 이제 검토일이 포함된 레퍼런스 근거가 표시됩니다. `app/style-references.ts`에서 각 근거를 official system, institutional history, documented pattern, community term으로 구분합니다. Masonry는 가변 높이 column fallback, Dashboard는 실제 Recharts, Master–detail은 목록/상세 pane, Data Table은 semantic table, Wizard는 실제 form과 순차 step으로 별도 렌더링합니다.

판단 모델, 수정한 분류와 검증 계약은 [Design Reference Audit](./docs/design-audit.md)에 기록했습니다.

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

프리셋 이동·무작위·공유는 우측 mixer 바로 아래의 floating action group을 유지하고, 언어 control은 desktop에서 그 바로 아래에 붙였습니다. narrow viewport에서는 네 action을 bottom mixer 위의 한 줄로 압축하고, 언어·공유 dialog는 viewport 안에 고정되는 sheet로 열어 control 크기가 커져도 서로 겹치거나 화면 밖으로 벗어나지 않습니다.

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
