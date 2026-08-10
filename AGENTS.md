# UI Style Lab 작업 규칙

이 문서는 새로운 option, layer, preset 또는 visual implementation을 추가하는 작업자가 반드시 지켜야 할 repository-level 규칙이다.

## 1. 최우선 원칙: Aesthetic이 governing layer다

- `aesthetic`은 다른 모든 layer의 유효 범위를 결정한다.
- palette나 surface 때문에 기초 미학의 정체성이 훼손되어서는 안 된다.
- Bento Grid처럼 정보 배치가 핵심인 개념은 layout으로 유지한다. white card, navy rail, pastel accent처럼 장식 체계가 필요한 경우 별도 aesthetic을 만들지 말고 palette 또는 surface skin으로 모델링한다.
- 기능 아이콘은 특수문자 glyph 대신 현재 icon component system(`lucide-react`)을 사용하고, 색·크기·stroke가 기초 미학의 token을 상속하게 한다.
- 새로운 option이 기술적으로 렌더링 가능하더라도 해당 aesthetic의 역사적·시각적 문법과 맞지 않으면 `allowed`에 넣지 않는다.
- 호환되지 않는 option은 UI에서 숨기지 않는다. 사용자가 전체 가능성을 이해할 수 있도록 보이게 유지하고 `disabled` 상태와 이유를 제공한다.
- aesthetic을 바꾸면 `recommendedSelection()`으로 그 미학의 native default 전체를 적용한다.

## 2. Data flow와 source of truth

```text
app/style-data.ts
  axes
    → aestheticRules.defaults / aestheticRules.allowed
    → normalizeSelection() / isOptionAllowed()
    → presets / randomize / canonical URL query
    → data-* attributes in StyleLab.tsx
    → selectors and tokens in style-lab.css

app/style-references.ts
  aesthetic / surface / layout evidence
    → selected-option reference card in StyleLab.tsx
    → evidence completeness invariant in tests

app/url-state.ts
  language / copyMode / view / selection
    → query URL round-trip / legacy hash migration

app/agent-contract.ts
  axes / rules / presets / evidence
    → public agent catalog / rendered resolution report
```

- option ID, compatibility, 기본값, 조합 수의 source of truth는 `app/style-data.ts`다.
- UI에서 별도의 compatibility 조건을 hard-code하지 않는다.
- `normalizeSelection()`을 우회해 state를 적용하지 않는다.
- 새 URL은 query parameter를 canonical transport로 사용한다. 기존 state hash key는 read-only migration input으로 유지하고 누락된 값은 aesthetic default로 보완한다.
- Agent catalog는 full Cartesian product를 나열하지 않는다. `axes + aestheticRules + presets + review packs`로 재현 가능하게 유지한다.

## 3. 기존 layer에 option을 추가할 때

다음을 모두 수행한다.

1. `axes[axis]`에 stable `id`, `ko`, `en`, `note`를 추가한다.
2. `optionNotesEn`에 같은 ID의 English note를 추가한다.
3. `axes.aesthetic`에 등록된 모든 `aestheticRules.allowed[axis]`를 검토한다.
4. 각 aesthetic에서 허용한 option이 정말 해당 미학을 표현하는지 full-page canvas 기준으로 확인한다.
5. 필요한 `data-*` CSS selector와 visual token을 구현한다.
6. option이 필요한 curated preset을 업데이트한다.
7. disabled state, randomize, URL round-trip을 검증한다.
8. `combinationCount(activeAxes)` 결과를 mode별로 다시 계산하고 README, intro, metadata, OG image의 숫자를 함께 갱신한다.

허용 목록에 무조건 추가한 뒤 palette나 CSS override로 억지로 맞추지 않는다.

현재 compatibility model은 aesthetic별 axis allowlist의 곱이다. 즉 한 aesthetic에서 각각 허용한 surface와 palette는 서로도 자동으로 조합된다. 새 option을 허용할 때는 option 하나만 따로 보지 말고 해당 aesthetic의 `allowed` cross-product 전체에서 정체성, contrast, 정보 가독성이 유지되는지 확인한다. pairwise 예외가 꼭 필요해지면 UI에 조건문을 흩뿌리지 말고 `app/style-data.ts`의 rule model을 먼저 확장한다.

## 3-1. 기업 Design System을 기초 미학으로 추가할 때

- 공식 documentation을 primary source로 사용해 color role, shape, spacing/grid, typography, elevation/material, motion 원칙을 확인한다.
- 회사명이나 대표 색상만 빌린 palette skin은 aesthetic으로 추가하지 않는다. navigation, component state, data visualization, content density, page rhythm까지 독립적인 시각 문법이 있어야 한다.
- Google `Material Design 3`와 MUI 조직의 `Material UI`를 같은 system으로 부르지 않는다. 현재 MUI 공식 문서는 Material UI를 Material Design 2 기반 React component library로 설명한다. `material3*`와 `mui*`의 palette, radius, elevation, component grammar를 별도로 유지한다.
- 범용 `material` surface ID는 이전 URL 호환을 위해 유지하지만 UI 명칭과 의미는 `Elevated Paper`다. 이 surface를 선택했다고 Google Material 또는 MUI aesthetic이 되는 것이 아니다.
- 특정 제품 screenshot, proprietary asset, logo, illustration을 복제하지 않는다. 이 repository의 동일한 `Field Notes` content와 Lucide icon, Recharts data component로 원칙만 재구성한다.
- Design System의 domain pattern이 핵심이라면 현재 sample content로 정직하게 검증 가능한지 먼저 판단한다. 예를 들어 commerce admin이나 government form 전용 system은 일반 field-journal page에서 시각 정체성을 충분히 보여주기 어려울 수 있다.
- curated collection이나 `awesome-*` 목록은 discovery index로만 사용한다. 기초 미학 승격 여부는 각 system의 공식 primary documentation에서 page-level color role, material, navigation, component, density 원칙을 다시 검증한다.
- headless/unstyled library의 documentation site에 독립적인 visual grammar가 있어 추가하는 경우 core library의 design system으로 오해시키지 않는다. aesthetic 이름에 `Showcase`나 `Docs`를 명시하고 README에서 구현 범위를 분리한다.
- Apple Liquid Glass light/dark aesthetic과 Liquid Glass surface는 의도적으로 제거된 상태다. 사용자가 다시 명시적으로 요청하지 않는 한 전용 palette, preset, SVG refraction filter까지 포함해 재도입하지 않는다.
- 범용 Glassmorphism surface는 refraction을 흉내 내지 않는다. 매우 낮은 반투명 tint, 배경 geometry를 식별할 수 있는 약한 backdrop blur, 얇은 밝은 border, soft shadow와 배경의 다채로운 color field로 frosted layer separation을 표현한다. opaque card 위에 highlight만 얹어 glass라고 부르지 않는다.
- native default를 `aestheticRules.defaults`에 먼저 정의하고, 변형 palette/surface는 공식 원칙을 해치지 않는 최소 범위만 `allowed`에 추가한다.
- 공식 dark theme가 semantic token과 component state 수준에서 문서화된 system은 별도 `*Dark` aesthetic으로 모델링한다. light/dark pair는 geometry, layout, navigation, typography, motion allowlist를 공유하고 palette만 native dark token으로 제한한다.
- SAP Fiori는 상위 design system이고 Horizon·Quartz·Belize는 서로 다른 세대의 visual theme다. 현재 architecture에서는 Morning/Evening Horizon, Horizon HCB/HCW, Quartz Light/Dark, Quartz HCB/HCW, Belize를 각각 별도 aesthetic으로 유지한다. High Contrast theme은 color뿐 아니라 border, focus, radius와 component override도 바뀌므로 일반 palette로 다른 aesthetic과 섞지 않는다. `*_set`, `sap_fiori_3_light_dark`처럼 OS 설정에 따라 실제 theme을 고르는 bundle은 visual option이나 검증된 조합 수에 포함하지 않는다.
- 단순히 background를 검게 만든 변형이나 역사적 미학의 임의 dark version은 추가하지 않는다. Terminal·Cyberpunk처럼 원래 dark-native인 aesthetic도 중복 dark 항목을 만들지 않는다.
- 이름, 버전, 공식 source link를 README에 기록한다. major version이 바뀌면 기존 ID를 조용히 재해석하지 말고 migration 영향을 검토한다.

## 4. 새로운 layer를 추가할 때

다음을 빠뜨리면 build가 성공해도 조합 모델이 깨진다.

1. `AxisKey`와 `axes`에 layer 추가
2. `axisMeta`의 Korean/English label 추가. 화면 index는 현재 mode의 visible order에서 동적으로 계산한다.
3. `defaultSelection`에 기본값 추가
4. `dependentAxisKeys`에 추가 (`aesthetic` 제외)
5. 모든 aesthetic의 `defaults`와 `allowed`에 추가
6. 모든 preset selection에 값 추가
7. `StyleLab.tsx`의 `data-*` attribute와 필요한 render logic 추가
8. `style-lab.css`에 실제 full-page implementation 추가
9. canonical query가 round-trip되고 URL hash의 이전 버전이 `resolveSelection()`으로 migration되는지 확인
10. test와 documentation, validated combination count 갱신

## 5. Typography 규칙

- `type`은 backward compatibility를 위해 유지되는 Latin typography axis다. UI label은 `Latin Type / 영문 서체`다.
- `koType`은 Korean web-font axis다.
- typography control 노출은 content mode에 따라 달라진다.
  - English: `type`만 표시
  - Korean only: `koType`만 표시하고 Korean font를 자동 통합 적용
  - Korean + English: `koType`을 먼저 표시하고 `fontMode`를 표시한다. `type`은 `fontMode=split`일 때만 `koType` 다음에 표시한다.
- `fontMode`는 Korean + English의 script binding 방식이다.
  - `split`: Latin glyph는 `type`, Hangul은 `koType`
  - `koUnified`: 선택한 `koType`으로 Latin과 Hangul 모두 렌더링
- Korean only에서는 live canvas의 microcopy, chart category, 지도 label도 한국어로 제공한다.
- Korean + English에서는 English microcopy와 body companion뿐 아니라 hero, data, story, guide, route의 주요 display headline에도 English를 충분한 크기로 섞는다. Korean only에는 English companion/display line을 노출하지 않으며 English-only element에는 `lang="en"`을 지정한다.
- 한글 명조체 계열은 추가하지 않는다. Editorial/Luxury aesthetic에서도 한글은 검증된 gothic/dotum 계열을 사용한다.
- 새 Korean font는 Hangul coverage, Latin coverage, webfont loading, fallback stack, weight availability를 확인한다.
- 새 Korean font는 `--site-ko-hero-size`, `--site-ko-display-line`, `--site-ko-tracking`을 실제 glyph metric에 맞게 조정한다. headline의 의도한 행 수와 container overflow를 함께 확인한다.
- font family, stylesheet, 공식 source와 license metadata는 `app/font-data.ts`에서 관리한다. 모든 font를 global `@import`로 load하지 말고 현재 language·copy mode·binding에서 실제로 쓰는 resource만 `getFontStylesheets()`로 load한다.
- 하나의 option이 display/body처럼 여러 family를 역할별로 묶으면 `koUnified` 같은 binding과의 의미 충돌을 검토한다. 충돌은 UI 조건문이 아니라 `app/style-data.ts`의 `crossAxisConstraints`에 기록하고 disabled reason, URL resolution, randomize, combination count에서 공유한다.
- 기존 option ID를 다른 family로 조용히 재해석하지 않는다. URL compatibility가 필요한 기존 ID는 유지하고 새 family는 별도 stable ID로 추가한다.
- 특정 aesthetic이 강제로 `--site-display`를 덮어써 typography axis를 무력화하지 않도록 한다. aesthetic identity는 recommended default와 allowed set으로 유지한다.

## 6. Validated combination count

조합 수는 global Cartesian product가 아니다.

```text
sum(
  for each aesthetic:
    product(length of every allowed dependent axis)
)
```

- 계산은 반드시 `combinationCount(activeAxes, fixedValues)`를 사용한다. Korean + English는 `split` branch에서는 `type`을 포함하고 `koUnified` branch에서는 제외한 뒤 두 branch를 합산한다.
- `crossAxisConstraints`에 의해 성립하지 않는 branch는 조합 수에서 제외한다. 숨겨진 axis는 무조건 곱하지 않고 현재 visible/fixed axis 조건에서 유효한 completion이 존재하는지 계산한다.
- English, Korean only, Korean + English는 보이는 typography axis가 다르므로 각 mode의 distinct count를 별도로 검증한다.
- 새 option이 일부 aesthetic에만 허용되면 해당 미학의 product만 증가해야 한다.
- 다음 위치의 숫자가 서로 같아야 한다.
  - mode별 live intro count
  - `README.md` / `README.ko.md`
  - `app/layout.tsx`
  - `index.html`
  - `public/og.png`에는 최대 조합 수(Korean + English)를 표시
- preset은 항상 `normalizeSelection(preset.selection)`과 동일해야 한다.

## 7. Visual implementation 규칙

- 작은 thumbnail이나 한 개 component만 바꾸지 말고 navigation, hero, component rack, charts, content section, footer까지 동일한 design language가 이어지는지 본다.
- `Masonry`, `Dashboard`, `Master–detail`, `Feed`, `Supporting Pane`, `Data Table`, `Wizard`처럼 DOM 의미와 flow가 다른 layout은 CSS 재배치만으로 구현하지 않는다. `StyleLab.tsx`의 dedicated semantic renderer와 responsive fallback을 함께 제공한다.
- user-provided reference screenshot이나 다른 제작자의 component composition을 복제하거나 asset으로 재사용하지 않는다.
- chart는 Recharts의 실제 data component를 유지한다. decorative path로 chart를 흉내 내지 않는다.
- palette는 contrast를 보존해야 하며 text와 surface가 같은 명도에 묻히지 않게 한다.
- global canvas texture를 기본값으로 두지 않는다. dot matrix, paper grain, scanline, grid는 해당 surface/aesthetic의 문법일 때만 명시적으로 opt-in하고, high-density mobile display에서 pattern이 과장되지 않는지 확인한다.
- desktop, tablet, mobile에서 horizontal overflow가 없어야 한다.
- motion은 `prefers-reduced-motion`과 `quiet` mode를 존중한다.

## 8. Interaction과 accessibility

- option dialog는 outside click과 `Escape`로 닫혀야 한다.
- language menu와 share dialog도 outside click과 `Escape`로 닫혀야 한다.
- language control은 header navigation과 combination mixer에서 분리된 floating control로 유지한다. randomize, share, canvas/preset jump는 별도의 quick-action group으로 유지하되 desktop에서는 우측 mixer 바로 아래에 간격을 두고 정렬해 관련 조작이 한 attention zone에 머물게 한다. narrow viewport에서는 bottom mixer 위로 이동해 겹침을 피한다.
- whole-page preset을 적용해 live canvas로 이동한 뒤 긴 역방향 scroll을 강제하지 않는다. contextual canvas/preset jump처럼 keyboard-accessible한 원터치 왕복 동선을 유지한다.
- reference share URL은 `view=reference`를 포함하고 mixer/preset 없이 live canvas만 렌더링해야 한다.
- reference share URL은 `capture=1&strict=1`을 포함한다. document는 fonts와 두 animation frame이 안정된 뒤 `data-agent-ready="true"`를 노출하고, `#ui-style-lab-state`에 requested/resolved/adjustments를 기록한다.
- disabled option에는 `disabled`, reason text, accessible title을 유지한다.
- icon-only navigation에는 `aria-label`과 visually hidden text를 유지한다.
- language switch는 `<html lang>`과 sample canvas의 `lang`을 함께 갱신한다.
- 모든 선택은 keyboard로 접근 가능해야 한다.

## 9. 변경 경계

- `app/style-data.ts`: option, compatibility, preset, count
- `app/font-data.ts`: font family, conditional stylesheet, source, license와 readiness family
- `app/style-references.ts`: aesthetic·surface·layout의 reference URL, 근거 수준, 구현 claim, 검토일
- `app/StyleLab.tsx`: state, URL, bilingual content, semantic markup, chart composition
- `app/url-state.ts`: language, content mode, share view, URL serialization
- `app/agent-contract.ts`: static catalog, review pack, rendered agent-state schema
- `app/style-lab.css`: design tokens, axis selectors, responsive behavior
- `README*.md`: public product and contributor documentation
- `tests/`: data invariants and rendered product contract

기존 package manager, Vinext/Vite 구조, GitHub Pages workflow를 임의로 교체하지 않는다.

## 10. 완료 조건

최소한 아래를 모두 통과해야 한다.

```bash
npm run lint
npm test
npm run build:pages
git diff --check
```

추가 검증:

- 모든 preset이 compatible한지 검사
- 각 aesthetic의 recommended selection이 compatible한지 검사
- invalid candidate가 aesthetic default로 normalize되는지 검사
- combination count가 문서 및 metadata와 일치하는지 검사
- 모든 aesthetic·surface·layout option에 reference evidence가 있고 선택창에서 열리는지 검사
- structural layout이 dedicated semantic renderer를 사용하며 table/form/list landmark가 유지되는지 검사
- Korean `split`과 `koUnified`에서 Latin/Hangul font binding이 각각 의도대로 동작하는지 확인

`main`에 push하면 GitHub Pages가 자동 배포된다. 배포 후 live page의 count, language default, canonical query·legacy hash migration, agent assets, console error를 확인한다.
