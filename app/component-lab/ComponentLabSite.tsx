"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Download,
  FileUp,
  Folder,
  Gauge,
  Info,
  Link2,
  LoaderCircle,
  Menu,
  Minus,
  MoreHorizontal,
  PanelLeft,
  Plus,
  Rocket,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Upload,
  UserRound,
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
  const active = selected || state === "active";

  const content = (() => {
    switch (id) {
      case "button":
        return <div className="specimen-row"><button type="button" className="specimen-primary" disabled={disabled}>{loading && <LoaderCircle aria-hidden="true" />}{loading ? (ko ? "처리 중" : "Working") : (ko ? "계속하기" : "Continue")}</button><button type="button" className="specimen-secondary" disabled={disabled}>{ko ? "취소" : "Cancel"}</button><button type="button" className="specimen-icon-button" disabled={disabled} aria-label={ko ? "더보기" : "More actions"}><MoreHorizontal aria-hidden="true" /></button></div>;
      case "button-group":
        return <div className="specimen-button-group" role="group" aria-label={ko ? "보기 방식" : "View mode"}><button type="button" aria-pressed={!selected}>{ko ? "목록" : "List"}</button><button type="button" aria-pressed={selected}>{ko ? "격자" : "Grid"}</button><button type="button" disabled={disabled}>{ko ? "지도" : "Map"}</button></div>;
      case "split-button":
        return <div className="specimen-split-button"><button type="button" disabled={disabled}>{ko ? "경로 발행" : "Publish route"}</button><button type="button" disabled={disabled} aria-haspopup="menu" aria-label={ko ? "다른 발행 방식" : "Other publishing options"}><ChevronDown aria-hidden="true" /></button></div>;
      case "toolbar":
        return <div className="specimen-toolbar" role="toolbar" aria-label={ko ? "지도 편집 도구" : "Map editing tools"}><button type="button" aria-pressed={active} aria-label={ko ? "패널" : "Panel"}><PanelLeft aria-hidden="true" /></button><button type="button" aria-label={ko ? "연결" : "Link"}><Link2 aria-hidden="true" /></button><button type="button" disabled={disabled} aria-label={ko ? "다운로드" : "Download"}><Download aria-hidden="true" /></button><i /><button type="button" aria-label={ko ? "설정" : "Settings"}><SlidersHorizontal aria-hidden="true" /></button></div>;
      case "link":
        return <div className="specimen-links"><p>{ko ? "제주의 새로운 산책 경로를 " : "Read the "}<a href="#component-catalog" aria-disabled={disabled || undefined}>{ko ? "경로 안내서" : "route guide"}</a>{ko ? "에서 확인하세요." : " for Jeju's newest walk."}</p><a className="standalone" href="#component-catalog" aria-disabled={disabled || undefined}>{ko ? "모든 현장 기록 보기" : "View all field notes"}<ArrowRight aria-hidden="true" /></a></div>;
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
      case "combobox":
        return <div className="specimen-combobox"><label htmlFor={`region-${state}-${compact}`}>{ko ? "지역 찾기" : "Find a region"}</label><div><input id={`region-${state}-${compact}`} role="combobox" aria-expanded={active} aria-controls={`region-options-${state}-${compact}`} defaultValue={selected ? (ko ? "성산" : "Seongsan") : ""} placeholder={ko ? "지역 입력" : "Type a region"} disabled={disabled} /><ChevronDown aria-hidden="true" /></div><ul id={`region-options-${state}-${compact}`} role="listbox"><li role="option" aria-selected={selected}>{ko ? "성산 · 동쪽" : "Seongsan · East"}</li><li role="option" aria-selected="false">Aewol · West</li></ul></div>;
      case "search-field":
        return <form className="specimen-search" role="search"><Search aria-hidden="true" /><label className="sr-only" htmlFor={`search-${state}-${compact}`}>{ko ? "경로 검색" : "Search routes"}</label><input id={`search-${state}-${compact}`} type="search" placeholder={ko ? "경로, 지역, 작성자" : "Route, region, author"} disabled={disabled} /><button type="submit" disabled={disabled}>{loading ? <LoaderCircle aria-label={ko ? "검색 중" : "Searching"} /> : (ko ? "검색" : "Search")}</button></form>;
      case "number-input":
        return <label className="specimen-number"><span>{ko ? "여행 인원" : "Travellers"}</span><div><button type="button" aria-label={ko ? "한 명 줄이기" : "Decrease by one"} disabled={disabled}><Minus aria-hidden="true" /></button><input type="number" min="1" max="12" defaultValue="4" disabled={disabled} aria-invalid={state === "error"} /><button type="button" aria-label={ko ? "한 명 늘리기" : "Increase by one"} disabled={disabled}><Plus aria-hidden="true" /></button></div><small>{state === "error" ? (ko ? "1명 이상 입력하세요." : "Enter at least one traveller.") : (ko ? "최대 12명" : "Up to 12")}</small></label>;
      case "date-input":
        return <label className="specimen-date"><span>{ko ? "출발 날짜" : "Departure date"}</span><div><CalendarDays aria-hidden="true" /><input type="date" defaultValue="2026-09-18" disabled={disabled} aria-invalid={state === "error"} /></div><small>{state === "error" ? (ko ? "이 날짜에는 경로를 이용할 수 없습니다." : "This route is unavailable on that date.") : (ko ? "현지 시간 기준" : "Local time")}</small></label>;
      case "file-upload":
        return <label className="specimen-file" data-selected={selected}><FileUp aria-hidden="true" /><b>{selected ? "ridge-map.gpx" : (ko ? "파일을 선택하거나 놓으세요" : "Choose or drop a file")}</b><span>{selected ? "2.4 MB · GPX" : "GPX, KML · 10 MB max"}</span><input type="file" accept=".gpx,.kml" disabled={disabled} /></label>;
      case "segmented-control":
        return <div className="specimen-segments" role="radiogroup" aria-label={ko ? "지도 유형" : "Map type"}><button type="button" role="radio" aria-checked={!selected}>{ko ? "표준" : "Standard"}</button><button type="button" role="radio" aria-checked={selected}>{ko ? "위성" : "Satellite"}</button><button type="button" role="radio" aria-checked="false" disabled={disabled}>{ko ? "지형" : "Terrain"}</button></div>;
      case "color-input":
        return <label className="specimen-color"><span>{ko ? "경로 색상" : "Route color"}</span><div><input type="color" defaultValue="#3158e7" disabled={disabled} /><output>#3158E7</output><button type="button" disabled={disabled}>{ko ? "초기화" : "Reset"}</button></div></label>;
      case "tabs":
        return <div className="specimen-tabs" role="tablist" aria-label={ko ? "콘텐츠 보기" : "Content views"}><button type="button" role="tab" aria-selected={!selected}>{ko ? "개요" : "Overview"}</button><button type="button" role="tab" aria-selected={selected}>{ko ? "기록" : "Notes"}</button><button type="button" role="tab" aria-selected="false" disabled={disabled}>{ko ? "활동" : "Activity"}</button></div>;
      case "breadcrumb":
        return <nav className="specimen-breadcrumb" aria-label={ko ? "현재 경로" : "Breadcrumb"}><a href="#component-catalog">{ko ? "라이브러리" : "Library"}</a><ChevronRight aria-hidden="true" /><a href="#component-catalog">{ko ? "탐색" : "Navigation"}</a><ChevronRight aria-hidden="true" /><span>{ko ? "경로 표시" : "Breadcrumb"}</span></nav>;
      case "pagination":
        return <nav className="specimen-pagination" aria-label={ko ? "페이지 이동" : "Pagination"}><button type="button" disabled>{ko ? "이전" : "Previous"}</button><button type="button" aria-current={!selected ? "page" : undefined}>1</button><button type="button" aria-current={selected ? "page" : undefined}>2</button><button type="button">3</button><button type="button">{ko ? "다음" : "Next"}</button></nav>;
      case "navigation-menu":
        return <nav className="specimen-navigation" aria-label={ko ? "주 메뉴" : "Primary navigation"}><a href="#component-catalog" aria-current={active ? "page" : undefined}>{ko ? "경로" : "Routes"}</a><a href="#component-catalog">Atlas</a><a href="#component-catalog">{ko ? "팀" : "Team"}</a><button type="button" aria-label={ko ? "더 보기" : "More destinations"}><MoreHorizontal aria-hidden="true" /></button></nav>;
      case "sidebar-menu":
        return <nav className="specimen-sidebar" aria-label={ko ? "작업공간 메뉴" : "Workspace navigation"}><b>FIELD / 04</b><a href="#component-catalog" aria-current={active ? "page" : undefined}><Gauge aria-hidden="true" />{ko ? "개요" : "Overview"}</a><a href="#component-catalog"><Folder aria-hidden="true" />{ko ? "경로" : "Routes"}<span>24</span></a><a href="#component-catalog"><UserRound aria-hidden="true" />{ko ? "팀" : "Team"}</a></nav>;
      case "stepper":
        return <ol className="specimen-stepper" aria-label={ko ? "발행 단계" : "Publishing steps"}><li data-complete="true"><i><Check aria-hidden="true" /></i><span>{ko ? "기록" : "Details"}</span></li><li aria-current={active ? "step" : undefined}><i>2</i><span>{ko ? "경로" : "Route"}</span></li><li><i>3</i><span>{ko ? "검토" : "Review"}</span></li></ol>;
      case "tree-view":
        return <div className="specimen-tree" role="tree" aria-label={ko ? "경로 파일" : "Route files"}><div role="treeitem" aria-expanded="true" aria-selected="false"><ChevronDown aria-hidden="true" /><Folder aria-hidden="true" />Jeju atlas</div><div role="group"><div role="treeitem" aria-selected={selected}><span /><FileUp aria-hidden="true" />Eastern ridge.gpx</div><div role="treeitem" aria-selected="false"><span /><FileUp aria-hidden="true" />Basalt coast.gpx</div></div></div>;
      case "command-menu":
        return <div className="specimen-command-menu"><div><Search aria-hidden="true" /><span>{ko ? "명령 또는 페이지 검색" : "Search commands or pages"}</span><kbd>⌘ K</kbd></div><ul role="menu"><li role="menuitem" aria-current={selected || undefined}><Rocket aria-hidden="true" />{ko ? "새 경로 발행" : "Publish a new route"}<kbd>↵</kbd></li><li role="menuitem"><SlidersHorizontal aria-hidden="true" />{ko ? "필터 열기" : "Open filters"}</li></ul></div>;
      case "alert":
        return <div className="specimen-alert" data-tone={state === "error" ? "error" : "info"} role="alert">{state === "error" ? <CircleAlert aria-hidden="true" /> : <Info aria-hidden="true" />}<div><b>{state === "error" ? (ko ? "저장하지 못했습니다" : "Could not save") : (ko ? "경로가 업데이트됐습니다" : "Route updated")}</b><p>{state === "error" ? (ko ? "연결을 확인하고 다시 시도하세요." : "Check the connection and try again.") : (ko ? "새 구간 두 곳을 검토하세요." : "Review two newly added segments.")}</p></div><button type="button" aria-label={ko ? "닫기" : "Dismiss"}><X aria-hidden="true" /></button></div>;
      case "toast":
        return <div className="specimen-toast" role="status"><CheckCircle2 aria-hidden="true" /><div><b>{ko ? "조합을 저장했습니다" : "Combination saved"}</b><small>{ko ? "내 프리셋에서 다시 볼 수 있습니다." : "Find it again in your presets."}</small></div><button type="button">{ko ? "되돌리기" : "Undo"}</button></div>;
      case "progress":
        return <div className="specimen-progress"><div><span>{ko ? "리뷰 팩 생성" : "Generating review pack"}</span><b>68%</b></div><progress value="68" max="100">68%</progress><div className="specimen-skeleton"><i /><i /><i /></div></div>;
      case "banner":
        return <section className="specimen-banner" data-tone={state === "error" ? "error" : "info"} aria-label={ko ? "페이지 알림" : "Page announcement"}>{state === "error" ? <CircleAlert aria-hidden="true" /> : <Sparkles aria-hidden="true" />}<div><b>{state === "error" ? (ko ? "동기화가 중단됐습니다" : "Sync was interrupted") : (ko ? "새 오프라인 지도를 사용할 수 있습니다" : "A new offline map is available")}</b><p>{state === "error" ? (ko ? "로컬 변경 사항은 안전하게 보관 중입니다." : "Your local changes are safely retained.") : (ko ? "출발 전에 동쪽 지역을 내려받으세요." : "Download the eastern region before departure.")}</p></div><button type="button">{state === "error" ? (ko ? "다시 시도" : "Retry") : (ko ? "다운로드" : "Download")}</button></section>;
      case "tooltip":
        return <div className="specimen-tooltip-stage"><div className="specimen-tooltip" id={`route-tooltip-${state}-${compact}`} role="tooltip">{ko ? "지도에 경로 표시" : "Show route on map"}</div><button type="button" aria-describedby={`route-tooltip-${state}-${compact}`}><Gauge aria-hidden="true" /><span className="sr-only">{ko ? "지도에 경로 표시" : "Show route on map"}</span></button></div>;
      case "empty-state":
        return <section className="specimen-empty"><div><Search aria-hidden="true" /></div><b>{ko ? "아직 저장한 경로가 없습니다" : "No saved routes yet"}</b><p>{ko ? "Atlas에서 첫 경로를 찾아 보세요." : "Explore the atlas and save your first route."}</p><button type="button">{ko ? "경로 탐색" : "Explore routes"}</button></section>;
      case "spinner":
        return <div className="specimen-spinner" role="status"><LoaderCircle aria-hidden="true" /><b>{loading ? (ko ? "지도를 불러오는 중" : "Loading the map") : (ko ? "경로를 준비하는 중" : "Preparing routes")}</b><span>{ko ? "잠시만 기다려 주세요." : "This should only take a moment."}</span></div>;
      case "card":
        return <article className="specimen-card"><span>{ko ? "추천 경로" : "FEATURED ROUTE"}</span><div className="specimen-card-art"><Star aria-hidden="true" /></div><h4>{ko ? "바람이 만든 가장자리" : "An edge shaped by wind"}</h4><p>{ko ? "검은 현무암과 낮은 돌담 사이를 걷습니다." : "Walk between black basalt and low stone walls."}</p><a href="#component-catalog">{ko ? "경로 열기" : "Open route"}<ArrowRight aria-hidden="true" /></a></article>;
      case "badge-avatar":
        return <div className="specimen-identities"><div className="specimen-avatar" aria-label={ko ? "김하늘" : "Haneul Kim"}>HK<i /></div><div><b>{ko ? "김하늘" : "Haneul Kim"}</b><span>{ko ? "현장 편집자" : "Field editor"}</span></div><em>{ko ? "활성" : "ACTIVE"}</em><span className="specimen-badge">12</span></div>;
      case "table":
        return <div className="specimen-table-wrap"><table><caption className="sr-only">{ko ? "최근 경로" : "Recent routes"}</caption><thead><tr><th scope="col">{ko ? "경로" : "Route"}</th><th scope="col">{ko ? "상태" : "Status"}</th><th scope="col">{ko ? "거리" : "Distance"}</th></tr></thead><tbody><tr aria-selected={selected}><th scope="row">Eastern ridge</th><td><span>{ko ? "공개" : "Published"}</span></td><td>12.4 km</td></tr><tr><th scope="row">Basalt coast</th><td><span>{ko ? "검토" : "Review"}</span></td><td>8.2 km</td></tr></tbody></table></div>;
      case "list":
        return <ul className="specimen-list"><li data-selected={selected}><div className="specimen-avatar">ER</div><div><b>{ko ? "동쪽 능선" : "Eastern ridge"}</b><span>{ko ? "오늘 · 12.4 km" : "Today · 12.4 km"}</span></div><button type="button" aria-label={ko ? "동쪽 능선 더보기" : "More for Eastern ridge"}><MoreHorizontal aria-hidden="true" /></button></li><li><div className="specimen-avatar">BC</div><div><b>{ko ? "현무암 해안" : "Basalt coast"}</b><span>{ko ? "어제 · 8.2 km" : "Yesterday · 8.2 km"}</span></div><button type="button" aria-label={ko ? "현무암 해안 더보기" : "More for Basalt coast"}><MoreHorizontal aria-hidden="true" /></button></li></ul>;
      case "description-list":
        return <dl className="specimen-description"><div><dt>{ko ? "상태" : "Status"}</dt><dd><span />{ko ? "발행됨" : "Published"}</dd></div><div><dt>{ko ? "지역" : "Region"}</dt><dd>{ko ? "제주 동부" : "East Jeju"}</dd></div><div><dt>{ko ? "업데이트" : "Updated"}</dt><dd><time dateTime="2026-08-25">25 Aug 2026</time></dd></div></dl>;
      case "stat-card":
        return <article className="specimen-stat"><header><span>{ko ? "이번 달 산책" : "WALKS THIS MONTH"}</span><Gauge aria-hidden="true" /></header><strong>128<small> km</small></strong><p><b>+18.4%</b> {ko ? "지난달 대비" : "from last month"}</p><div aria-hidden="true"><i /><i /><i /><i /><i /></div></article>;
      case "accordion":
        return <div className="specimen-accordion"><details open={selected || state === "default"}><summary>{ko ? "경로 난이도는 어떻게 정하나요?" : "How is route difficulty measured?"}<ChevronDown aria-hidden="true" /></summary><p>{ko ? "거리, 고도 변화, 노면 상태를 함께 평가합니다." : "We combine distance, elevation gain, and surface conditions."}</p></details><details><summary>{ko ? "오프라인에서도 사용할 수 있나요?" : "Can I use it offline?"}<ChevronDown aria-hidden="true" /></summary></details></div>;
      case "timeline":
        return <ol className="specimen-timeline"><li data-active={selected}><i /><div><time dateTime="09:42">09:42</time><b>{ko ? "경로를 발행했습니다" : "Route published"}</b><span>{ko ? "김하늘 편집자" : "Haneul Kim"}</span></div></li><li><i /><div><time dateTime="08:16">08:16</time><b>{ko ? "현장 사진 12장 추가" : "12 field photos added"}</b><span>Min Park</span></div></li></ol>;
      case "calendar":
        return <div className="specimen-calendar"><header><button type="button" aria-label={ko ? "이전 달" : "Previous month"}><ChevronLeft aria-hidden="true" /></button><b>{ko ? "2026년 9월" : "September 2026"}</b><button type="button" aria-label={ko ? "다음 달" : "Next month"}><ChevronRight aria-hidden="true" /></button></header><div className="week" aria-hidden="true"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div><div className="days"><span /><span /><button type="button">1</button><button type="button">2</button><button type="button" aria-pressed={selected}>3</button><button type="button">4</button><button type="button" disabled={disabled}>5</button><button type="button">6</button><button type="button">7</button><button type="button">8</button><button type="button">9</button></div></div>;
      case "dialog":
        return <div className="specimen-overlay-stage"><section className="specimen-dialog" role="dialog" aria-label={ko ? "경로 삭제" : "Delete route"}><header><b>{ko ? "경로를 삭제할까요?" : "Delete this route?"}</b><button type="button" aria-label={ko ? "닫기" : "Close"}><X aria-hidden="true" /></button></header><p>{ko ? "삭제한 경로와 현장 기록은 복구할 수 없습니다." : "The route and its field notes cannot be restored."}</p><footer><button type="button">{ko ? "취소" : "Cancel"}</button><button type="button" className="danger">{ko ? "삭제" : "Delete"}</button></footer></section></div>;
      case "popover":
        return <div className="specimen-popover-stage"><button type="button" className="specimen-icon-button" aria-expanded="true" aria-label={ko ? "알림 열기" : "Open notifications"}><Bell aria-hidden="true" /></button><section className="specimen-popover" aria-label={ko ? "알림" : "Notifications"}><span>{ko ? "새 알림" : "NEW NOTIFICATION"}</span><b>{ko ? "팀 검토가 완료됐습니다." : "Team review is complete."}</b><button type="button">{ko ? "검토 팩 열기" : "Open review pack"}</button></section></div>;
      case "drawer":
        return <div className="specimen-drawer-stage"><div><Menu aria-hidden="true" /><span>{ko ? "현재 페이지" : "Current page"}</span></div><aside aria-label={ko ? "필터" : "Filters"}><header><b>{ko ? "필터" : "Filters"}</b><button type="button" aria-label={ko ? "닫기" : "Close"}><X aria-hidden="true" /></button></header><label><input type="checkbox" defaultChecked />{ko ? "검증 완료" : "Validated"}</label><label><input type="checkbox" />{ko ? "즐겨찾기" : "Favorites"}</label><button type="button">{ko ? "결과 보기" : "Show results"}</button></aside></div>;
      case "context-menu":
        return <div className="specimen-context"><button type="button" aria-haspopup="menu" aria-expanded="true">Eastern ridge<MoreHorizontal aria-hidden="true" /></button><ul role="menu"><li role="menuitem"><Link2 aria-hidden="true" />{ko ? "링크 복사" : "Copy link"}<kbd>⌘C</kbd></li><li role="menuitem"><Download aria-hidden="true" />{ko ? "내보내기" : "Export"}</li><li role="menuitem" aria-disabled={disabled}><X aria-hidden="true" />{ko ? "보관" : "Archive"}</li></ul></div>;
      case "hover-card":
        return <div className="specimen-hover-card"><a href="#component-catalog">@field-atlas</a><article><div className="specimen-avatar">FA</div><div><b>Field Atlas</b><span>@field-atlas</span></div><p>{ko ? "천천히 걷고 세심하게 기록하는 독립 현장 안내서." : "An independent field guide for walking slowly and noticing more."}</p><footer><b>24</b> {ko ? "경로" : "routes"}<b>8.4k</b> {ko ? "저장" : "saves"}</footer></article></div>;
      case "command-palette":
        return <section className="specimen-command-palette" role="dialog" aria-label={ko ? "명령 팔레트" : "Command palette"}><header><Search aria-hidden="true" /><input aria-label={ko ? "명령 검색" : "Search commands"} defaultValue={selected ? (ko ? "경로" : "route") : ""} placeholder={ko ? "명령 검색…" : "Search commands…"} /><kbd>ESC</kbd></header><span>{ko ? "빠른 실행" : "QUICK ACTIONS"}</span><button type="button" aria-pressed={selected}><Rocket aria-hidden="true" />{ko ? "새 경로 만들기" : "Create a new route"}<kbd>⌘N</kbd></button><button type="button"><Upload aria-hidden="true" />{ko ? "GPX 가져오기" : "Import GPX"}</button></section>;
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
          <div><span>COMPONENT WORKBENCH · {componentCatalog.length}</span><h2>{language === "ko" ? "한 조합으로," : "One combination."}<br /><em>{language === "ko" ? "모든 상태까지." : "Every component state."}</em></h2></div>
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
