"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Info,
  LoaderCircle,
  Menu,
  MoreHorizontal,
  Search,
  Star,
  X,
} from "lucide-react";

import { getOption, type Language, type Selection } from "../style-data";
import { usesBilingualCopy, type KoreanCopyMode } from "../url-state";
import {
  componentCatalog,
  componentCategories,
  getComponentDefinition,
  type ComponentCategory,
  type ComponentId,
  type ComponentState,
} from "./component-data";

type ComponentLabSiteProps = {
  selection: Selection;
  language: Language;
  copyMode: KoreanCopyMode;
  selectedComponent: ComponentId;
  onSelectComponent: (component: ComponentId) => void;
};

const categoryLabels: Record<ComponentCategory, { en: string; ko: string }> = {
  actions: { en: "Actions", ko: "동작" },
  forms: { en: "Forms", ko: "입력" },
  navigation: { en: "Navigation", ko: "탐색" },
  feedback: { en: "Feedback", ko: "피드백" },
  "data-display": { en: "Data display", ko: "데이터 표시" },
  overlays: { en: "Overlays", ko: "오버레이" },
};

const stateLabels: Record<ComponentState, { en: string; ko: string }> = {
  default: { en: "Default", ko: "기본" },
  hover: { en: "Hover", ko: "호버" },
  focus: { en: "Focus", ko: "포커스" },
  active: { en: "Active", ko: "활성" },
  selected: { en: "Selected", ko: "선택됨" },
  disabled: { en: "Disabled", ko: "비활성" },
  loading: { en: "Loading", ko: "불러오는 중" },
  error: { en: "Error", ko: "오류" },
};

function SpecimenPreview({
  id,
  language,
  state = "default",
  compact = false,
}: {
  id: ComponentId;
  language: Language;
  state?: ComponentState;
  compact?: boolean;
}) {
  const ko = language === "ko";
  const disabled = state === "disabled";
  const loading = state === "loading";
  const selected = state === "selected";

  const content = (() => {
    switch (id) {
      case "button":
        return <div className="specimen-row"><button type="button" className="specimen-primary" disabled={disabled}>{loading && <LoaderCircle aria-hidden="true" />}{loading ? (ko ? "처리 중" : "Working") : (ko ? "계속하기" : "Continue")}</button><button type="button" className="specimen-secondary" disabled={disabled}>{ko ? "취소" : "Cancel"}</button><button type="button" className="specimen-icon-button" disabled={disabled} aria-label={ko ? "더보기" : "More actions"}><MoreHorizontal aria-hidden="true" /></button></div>;
      case "button-group":
        return <div className="specimen-button-group" role="group" aria-label={ko ? "보기 방식" : "View mode"}><button type="button" aria-pressed={!selected}>{ko ? "목록" : "List"}</button><button type="button" aria-pressed={selected}>{ko ? "격자" : "Grid"}</button><button type="button" disabled={disabled}>{ko ? "지도" : "Map"}</button></div>;
      case "input":
        return <label className="specimen-field"><span>{ko ? "프로젝트 이름" : "Project name"}</span><input defaultValue={state === "error" ? "Untitled /" : "Field atlas"} disabled={disabled} aria-invalid={state === "error"} /><small>{state === "error" ? (ko ? "슬래시는 사용할 수 없습니다." : "A slash is not allowed.") : (ko ? "공유 화면에 표시됩니다." : "Shown in shared views.")}</small></label>;
      case "textarea":
        return <label className="specimen-field"><span>{ko ? "기록" : "Notes"}</span><textarea defaultValue={ko ? "능선의 빛과 바람을 기록합니다." : "Record the light and wind along the ridge."} disabled={disabled} aria-invalid={state === "error"} /><small>{state === "error" ? (ko ? "10자 이상 입력하세요." : "Enter at least 10 characters.") : "42 / 180"}</small></label>;
      case "select":
        return <label className="specimen-field"><span>{ko ? "지역" : "Region"}</span><span className="specimen-select"><select defaultValue="east" disabled={disabled} aria-invalid={state === "error"}><option value="east">{ko ? "동쪽 능선" : "Eastern ridge"}</option><option value="coast">{ko ? "해안길" : "Coastal path"}</option></select><ChevronDown aria-hidden="true" /></span><small>{state === "error" ? (ko ? "지역을 선택하세요." : "Choose a region.") : (ko ? "현재 발행 지역" : "Current edition region")}</small></label>;
      case "checks":
        return <fieldset className="specimen-checks" disabled={disabled}><legend>{ko ? "경로 특징" : "Route character"}</legend><label><input type="checkbox" defaultChecked={selected || state === "default"} />{ko ? "조용한 길" : "Quiet paths"}</label><label><input type="checkbox" />{ko ? "전망 지점" : "Viewpoints"}</label><label><input type="radio" name={`pace-${state}-${compact}`} defaultChecked />{ko ? "느린 속도" : "Slow pace"}</label></fieldset>;
      case "switch":
        return <div className="specimen-setting"><div><b>{ko ? "오프라인 지도" : "Offline maps"}</b><small>{ko ? "와이파이 없이 경로 보기" : "Keep routes available without Wi-Fi"}</small></div><button type="button" role="switch" aria-label={ko ? "오프라인 지도" : "Offline maps"} aria-checked={selected || state === "default"} disabled={disabled}><i /></button></div>;
      case "slider":
        return <label className="specimen-slider"><span>{ko ? "산책 거리" : "Walking distance"}<output>12 km</output></span><input type="range" min="1" max="20" defaultValue="12" disabled={disabled} /></label>;
      case "tabs":
        return <div className="specimen-tabs" role="tablist" aria-label={ko ? "콘텐츠 보기" : "Content views"}><button type="button" role="tab" aria-selected={!selected}>{ko ? "개요" : "Overview"}</button><button type="button" role="tab" aria-selected={selected}>{ko ? "기록" : "Notes"}</button><button type="button" role="tab" aria-selected="false" disabled={disabled}>{ko ? "활동" : "Activity"}</button></div>;
      case "breadcrumb":
        return <nav className="specimen-breadcrumb" aria-label={ko ? "현재 경로" : "Breadcrumb"}><a href="#component-catalog">{ko ? "라이브러리" : "Library"}</a><ChevronRight aria-hidden="true" /><a href="#component-catalog">{ko ? "탐색" : "Navigation"}</a><ChevronRight aria-hidden="true" /><span>{ko ? "경로 표시" : "Breadcrumb"}</span></nav>;
      case "pagination":
        return <nav className="specimen-pagination" aria-label={ko ? "페이지 이동" : "Pagination"}><button type="button" disabled>{ko ? "이전" : "Previous"}</button><button type="button" aria-current={!selected ? "page" : undefined}>1</button><button type="button" aria-current={selected ? "page" : undefined}>2</button><button type="button">3</button><button type="button">{ko ? "다음" : "Next"}</button></nav>;
      case "alert":
        return <div className="specimen-alert" data-tone={state === "error" ? "error" : "info"} role="alert">{state === "error" ? <CircleAlert aria-hidden="true" /> : <Info aria-hidden="true" />}<div><b>{state === "error" ? (ko ? "저장하지 못했습니다" : "Could not save") : (ko ? "경로가 업데이트됐습니다" : "Route updated")}</b><p>{state === "error" ? (ko ? "연결을 확인하고 다시 시도하세요." : "Check the connection and try again.") : (ko ? "새 구간 두 곳을 검토하세요." : "Review two newly added segments.")}</p></div><button type="button" aria-label={ko ? "닫기" : "Dismiss"}><X aria-hidden="true" /></button></div>;
      case "toast":
        return <div className="specimen-toast" role="status"><CheckCircle2 aria-hidden="true" /><div><b>{ko ? "조합을 저장했습니다" : "Combination saved"}</b><small>{ko ? "내 프리셋에서 다시 볼 수 있습니다." : "Find it again in your presets."}</small></div><button type="button">{ko ? "되돌리기" : "Undo"}</button></div>;
      case "progress":
        return <div className="specimen-progress"><div><span>{ko ? "리뷰 팩 생성" : "Generating review pack"}</span><b>68%</b></div><progress value="68" max="100">68%</progress><div className="specimen-skeleton"><i /><i /><i /></div></div>;
      case "card":
        return <article className="specimen-card"><span>{ko ? "추천 경로" : "FEATURED ROUTE"}</span><div className="specimen-card-art"><Star aria-hidden="true" /></div><h4>{ko ? "바람이 만든 가장자리" : "An edge shaped by wind"}</h4><p>{ko ? "검은 현무암과 낮은 돌담 사이를 걷습니다." : "Walk between black basalt and low stone walls."}</p><a href="#component-catalog">{ko ? "경로 열기" : "Open route"}<ArrowRight aria-hidden="true" /></a></article>;
      case "badge-avatar":
        return <div className="specimen-identities"><div className="specimen-avatar" aria-label={ko ? "김하늘" : "Haneul Kim"}>HK<i /></div><div><b>{ko ? "김하늘" : "Haneul Kim"}</b><span>{ko ? "현장 편집자" : "Field editor"}</span></div><em>{ko ? "활성" : "ACTIVE"}</em><span className="specimen-badge">12</span></div>;
      case "table":
        return <div className="specimen-table-wrap"><table><caption className="sr-only">{ko ? "최근 경로" : "Recent routes"}</caption><thead><tr><th scope="col">{ko ? "경로" : "Route"}</th><th scope="col">{ko ? "상태" : "Status"}</th><th scope="col">{ko ? "거리" : "Distance"}</th></tr></thead><tbody><tr aria-selected={selected}><th scope="row">Eastern ridge</th><td><span>{ko ? "공개" : "Published"}</span></td><td>12.4 km</td></tr><tr><th scope="row">Basalt coast</th><td><span>{ko ? "검토" : "Review"}</span></td><td>8.2 km</td></tr></tbody></table></div>;
      case "dialog":
        return <div className="specimen-overlay-stage"><section className="specimen-dialog" role="dialog" aria-label={ko ? "경로 삭제" : "Delete route"}><header><b>{ko ? "경로를 삭제할까요?" : "Delete this route?"}</b><button type="button" aria-label={ko ? "닫기" : "Close"}><X aria-hidden="true" /></button></header><p>{ko ? "삭제한 경로와 현장 기록은 복구할 수 없습니다." : "The route and its field notes cannot be restored."}</p><footer><button type="button">{ko ? "취소" : "Cancel"}</button><button type="button" className="danger">{ko ? "삭제" : "Delete"}</button></footer></section></div>;
      case "popover":
        return <div className="specimen-popover-stage"><button type="button" className="specimen-icon-button" aria-expanded="true" aria-label={ko ? "알림 열기" : "Open notifications"}><Bell aria-hidden="true" /></button><section className="specimen-popover" aria-label={ko ? "알림" : "Notifications"}><span>{ko ? "새 알림" : "NEW NOTIFICATION"}</span><b>{ko ? "팀 검토가 완료됐습니다." : "Team review is complete."}</b><button type="button">{ko ? "검토 팩 열기" : "Open review pack"}</button></section></div>;
      case "drawer":
        return <div className="specimen-drawer-stage"><div><Menu aria-hidden="true" /><span>{ko ? "현재 페이지" : "Current page"}</span></div><aside aria-label={ko ? "필터" : "Filters"}><header><b>{ko ? "필터" : "Filters"}</b><button type="button" aria-label={ko ? "닫기" : "Close"}><X aria-hidden="true" /></button></header><label><input type="checkbox" defaultChecked />{ko ? "검증 완료" : "Validated"}</label><label><input type="checkbox" />{ko ? "즐겨찾기" : "Favorites"}</label><button type="button">{ko ? "결과 보기" : "Show results"}</button></aside></div>;
      default:
        return null;
    }
  })();

  return <div className="specimen-preview" data-component={id} data-preview-state={state} data-compact={compact} aria-hidden={compact || undefined} inert={compact || undefined}>{content}</div>;
}

export function ComponentLabSite({
  selection,
  language,
  copyMode,
  selectedComponent,
  onSelectComponent,
}: ComponentLabSiteProps) {
  const [category, setCategory] = useState<ComponentCategory | "all">("all");
  const [query, setQuery] = useState("");
  const selected = getComponentDefinition(selectedComponent);
  const bilingual = usesBilingualCopy(language, copyMode);
  const localized = (value: { en: string; ko: string }) => value[language];
  const aesthetic = getOption("aesthetic", selection.aesthetic);
  const filteredComponents = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return componentCatalog.filter((component) => (
      (category === "all" || component.category === category)
      && (!needle || `${component.en} ${component.ko} ${component.description.en} ${component.description.ko}`.toLocaleLowerCase().includes(needle))
    ));
  }, [category, query]);

  return (
    <section
      className="live-site component-lab-site"
      id="component-lab"
      lang={language}
      data-language={language}
      data-copy-mode={copyMode}
      data-aesthetic={selection.aesthetic}
      data-surface={selection.surface}
      data-layout={selection.layout}
      data-nav={selection.nav}
      data-nav-style={selection.navStyle}
      data-type={selection.type}
      data-ko-type={selection.koType}
      data-font-mode={selection.fontMode}
      data-palette={selection.palette}
      data-motion={selection.motion}
      aria-label={`${localized(aesthetic)} ${language === "ko" ? "컴포넌트 라이브러리" : "component library"}`}
    >
      <div className="sample-noise" aria-hidden="true" />
      <div className="component-lab-inner">
        <header className="component-lab-heading">
          <div><span>COMPONENT WORKBENCH · 20</span><h2>{language === "ko" ? "한 조합으로," : "One combination."}<br /><em>{language === "ko" ? "모든 상태까지." : "Every component state."}</em></h2></div>
          <p>{language === "ko" ? "현재 layer 조합을 실제로 조작 가능한 UI component에 적용합니다. 전체 페이지와 동일한 design token을 공유합니다." : "Apply the current layer combination to reusable, interactive UI components. Every specimen shares the same design tokens as the full-page canvas."}{bilingual && <span className="english-companion" lang="en">Inspect controls, data display, feedback, and overlays at production scale.</span>}</p>
        </header>

        <section className="component-detail" aria-labelledby="component-detail-title">
          <header><div><span>{localized(categoryLabels[selected.category])} · {String(selected.states.length).padStart(2, "0")} STATES</span><h3 id="component-detail-title">{localized(selected)}{language === "ko" && bilingual && <small lang="en">{selected.en}</small>}</h3><p>{localized(selected.description)}</p></div><div className="component-detail-meta"><span>{language === "ko" ? "적용된 기초 미학" : "Governing aesthetic"}</span><b>{localized(aesthetic)}</b></div></header>
          <div className="component-state-grid">
            {selected.states.map((state) => <article className="component-state-card sample-surface" key={state}><span>{localized(stateLabels[state])}</span><SpecimenPreview id={selectedComponent} language={language} state={state} /></article>)}
          </div>
        </section>

        <section className="component-catalog" id="component-catalog" aria-labelledby="component-catalog-title">
          <header><div><span>REUSABLE COMPONENTS</span><h3 id="component-catalog-title">{language === "ko" ? "라이브러리 탐색" : "Explore the library"}</h3></div><label className="component-search"><Search aria-hidden="true" /><span className="sr-only">{language === "ko" ? "컴포넌트 검색" : "Search components"}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "ko" ? "이름이나 역할 검색" : "Search by name or purpose"} /></label></header>
          <div className="component-category-tabs" role="group" aria-label={language === "ko" ? "컴포넌트 분류" : "Component categories"}>
            <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>{language === "ko" ? "전체" : "All"}<span>{componentCatalog.length}</span></button>
            {componentCategories.map((item) => <button type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{localized(categoryLabels[item])}<span>{componentCatalog.filter((component) => component.category === item).length}</span></button>)}
          </div>
          <p className="component-result-count">{language === "ko" ? `${filteredComponents.length}개 컴포넌트` : `${filteredComponents.length} components`}</p>
          <div className="component-catalog-grid">
            {filteredComponents.map((component) => {
              const active = component.id === selectedComponent;
              return <article className="component-catalog-card sample-surface" data-selected={active} key={component.id}><span>{localized(categoryLabels[component.category])}</span><b>{localized(component)}{language === "ko" && bilingual && <small lang="en">{component.en}</small>}</b><p>{localized(component.description)}</p><SpecimenPreview id={component.id} language={language} compact /><button type="button" className="component-card-action" onClick={() => { onSelectComponent(component.id); document.querySelector(".component-detail")?.scrollIntoView({ behavior: selection.motion === "quiet" ? "auto" : "smooth" }); }} aria-pressed={active}>{language === "ko" ? "상태 보기" : "Inspect states"}<ArrowRight aria-hidden="true" /></button></article>;
            })}
          </div>
          {filteredComponents.length === 0 && <p className="component-empty">{language === "ko" ? "검색 조건에 맞는 컴포넌트가 없습니다." : "No components match this search."}</p>}
        </section>
      </div>
    </section>
  );
}
