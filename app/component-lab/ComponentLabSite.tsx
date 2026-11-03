"use client";

import { InteractiveSpecimen } from "./InteractiveSpecimens";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Download,
  FileUp,
  Gauge,
  Info,
  Link2,
  LoaderCircle,
  Minus,
  MoreHorizontal,
  PanelLeft,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
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
  const [toggled, setToggled] = useState(state === "selected");
  const [number, setNumber] = useState(4);
  const [distance, setDistance] = useState(12);
  const [color, setColor] = useState("#3158e7");
  const [choice, setChoice] = useState(state === "selected" ? 1 : 0);
  const [fileName, setFileName] = useState(state === "selected" ? "ridge-map.gpx" : "");
  const [notes, setNotes] = useState(ko ? "능선의 빛과 바람을 기록합니다." : "Record the light and wind along the ridge.");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const selected = toggled;
  const active = selected || state === "active";

  const content = (() => {
    switch (id) {
      case "button":
        return <div className="specimen-row"><button type="button" className="specimen-primary" onClick={() => setMessage(ko ? "동작을 완료했습니다." : "Action completed.")} disabled={disabled}>{loading && <LoaderCircle aria-hidden="true" />}{loading ? (ko ? "처리 중" : "Working") : (ko ? "계속하기" : "Continue")}</button><button type="button" className="specimen-secondary" onClick={() => setMessage(ko ? "취소했습니다." : "Cancelled.")} disabled={disabled}>{ko ? "취소" : "Cancel"}</button><button type="button" className="specimen-icon-button" disabled={disabled} onClick={() => setMessage(ko ? "추가 동작: 예시 저장 · 공유" : "More actions: demo save · share")} aria-label={ko ? "더보기" : "More actions"}><MoreHorizontal aria-hidden="true" /></button></div>;
      case "button-group":
        return <div className="specimen-button-group" role="group" aria-label={ko ? "보기 방식" : "View mode"}><button type="button" aria-pressed={choice === 0} onClick={() => setChoice(0)}>{ko ? "목록" : "List"}</button><button type="button" aria-pressed={choice === 1} onClick={() => setChoice(1)}>{ko ? "격자" : "Grid"}</button><button type="button" disabled={disabled} aria-pressed={choice === 2} onClick={() => setChoice(2)}>{ko ? "지도" : "Map"}</button></div>;
      case "split-button":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "toolbar":
        return <div className="specimen-toolbar" role="toolbar" aria-label={ko ? "지도 편집 도구" : "Map editing tools"}><button type="button" disabled={disabled} aria-pressed={selected} onClick={() => { setToggled(!selected); setMessage(ko ? selected ? "패널을 닫았습니다." : "패널: 동쪽 능선 · 현무암 해안" : selected ? "Panel closed." : "Panel: Eastern ridge · Basalt coast"); }} aria-label={ko ? "패널" : "Panel"}><PanelLeft aria-hidden="true" /></button><button type="button" disabled={disabled} onClick={() => setMessage(ko ? "선택한 경로: 동쪽 능선 (JE-01)" : "Linked route: Eastern ridge (JE-01)")} aria-label={ko ? "연결" : "Link"}><Link2 aria-hidden="true" /></button><button type="button" disabled={disabled} onClick={() => { const url = URL.createObjectURL(new Blob(['<gpx version="1.1"><metadata><name>Demo route</name></metadata></gpx>'], { type: "application/gpx+xml" })); const link = document.createElement("a"); link.href = url; link.download = "demo-route.gpx"; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000); setMessage(ko ? "예시 GPX 파일을 만들었습니다." : "Demo GPX file created."); }} aria-label={ko ? "다운로드" : "Download"}><Download aria-hidden="true" /></button><i /><button type="button" disabled={disabled} onClick={() => setMessage(ko ? "표시 설정: 거리 km · 현지 시간" : "Display settings: kilometres · local time")} aria-label={ko ? "설정" : "Settings"}><SlidersHorizontal aria-hidden="true" /></button></div>;
      case "link":
        return <div className="specimen-links"><p>{ko ? "제주의 새로운 산책 경로를 " : "Read the "}<a href="#specimen-destination" onClick={(event) => { event.preventDefault(); if (!disabled) setMessage(ko ? "현장 기록: 동쪽 능선 · 제주 · 8.4 km" : "Field Notes: Eastern ridge · Jeju · 8.4 km"); }} aria-disabled={disabled || undefined}>{ko ? "경로 안내서" : "route guide"}</a>{ko ? "에서 확인하세요." : " for Jeju's newest walk."}</p><a className="standalone" href="#specimen-destination" onClick={(event) => { event.preventDefault(); if (!disabled) setMessage(ko ? "현장 기록: 동쪽 능선 · 제주 · 8.4 km" : "Field Notes: Eastern ridge · Jeju · 8.4 km"); }} aria-disabled={disabled || undefined}>{ko ? "모든 현장 기록 보기" : "View all field notes"}<ArrowRight aria-hidden="true" /></a></div>;
      case "input":
        return <label className="specimen-field"><span>{ko ? "프로젝트 이름" : "Project name"}</span><input defaultValue={state === "error" ? "Untitled /" : "Field atlas"} disabled={disabled} aria-invalid={state === "error"} /><small>{state === "error" ? (ko ? "슬래시는 사용할 수 없습니다." : "A slash is not allowed.") : (ko ? "공유 화면에 표시됩니다." : "Shown in shared views.")}</small></label>;
      case "textarea":
        return <label className="specimen-field"><span>{ko ? "기록" : "Notes"}</span><textarea value={notes} maxLength={180} onChange={(event) => setNotes(event.target.value)} disabled={disabled} aria-invalid={state === "error"} /><small>{state === "error" ? (ko ? "10자 이상 입력하세요." : "Enter at least 10 characters.") : `${notes.length} / 180`}</small></label>;
      case "select":
        return <label className="specimen-field"><span>{ko ? "지역" : "Region"}</span><span className="specimen-select"><select defaultValue="east" disabled={disabled} aria-invalid={state === "error"}><option value="east">{ko ? "동쪽 능선" : "Eastern ridge"}</option><option value="coast">{ko ? "해안길" : "Coastal path"}</option></select><ChevronDown aria-hidden="true" /></span><small>{state === "error" ? (ko ? "지역을 선택하세요." : "Choose a region.") : (ko ? "현재 발행 지역" : "Current edition region")}</small></label>;
      case "checks":
        return <fieldset className="specimen-checks" disabled={disabled}><legend>{ko ? "경로 특징" : "Route character"}</legend><label><input type="checkbox" defaultChecked={selected || state === "default"} />{ko ? "조용한 길" : "Quiet paths"}</label><label><input type="checkbox" />{ko ? "전망 지점" : "Viewpoints"}</label><label><input type="radio" name={`pace-${state}-${compact}`} defaultChecked />{ko ? "느린 속도" : "Slow pace"}</label></fieldset>;
      case "switch":
        return <div className="specimen-setting"><div><b>{ko ? "오프라인 지도" : "Offline maps"}</b><small>{ko ? "와이파이 없이 경로 보기" : "Keep routes available without Wi-Fi"}</small></div><button type="button" role="switch" aria-label={ko ? "오프라인 지도" : "Offline maps"} aria-checked={selected} onClick={() => setToggled(!selected)} disabled={disabled}><i /></button></div>;
      case "slider":
        return <label className="specimen-slider"><span>{ko ? "산책 거리" : "Walking distance"}<output>{distance} km</output></span><input type="range" min="1" max="20" value={distance} onChange={(event) => setDistance(Number(event.target.value))} disabled={disabled} /></label>;
      case "combobox":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "search-field":
        return <form className="specimen-search" role="search" onSubmit={(event) => { event.preventDefault(); setMessage(ko ? "예시 경로 2개를 찾았습니다." : "Found 2 sample routes."); }}><Search aria-hidden="true" /><label className="sr-only" htmlFor={`search-${state}-${compact}`}>{ko ? "경로 검색" : "Search routes"}</label><input id={`search-${state}-${compact}`} type="search" placeholder={ko ? "경로, 지역, 작성자" : "Route, region, author"} disabled={disabled} /><button type="submit" disabled={disabled}>{loading ? <LoaderCircle aria-label={ko ? "검색 중" : "Searching"} /> : (ko ? "검색" : "Search")}</button></form>;
      case "number-input":
        return <label className="specimen-number"><span>{ko ? "여행 인원" : "Travellers"}</span><div><button type="button" aria-label={ko ? "한 명 줄이기" : "Decrease by one"} onClick={() => setNumber(Math.max(1, number - 1))} disabled={disabled || number === 1}><Minus aria-hidden="true" /></button><input type="number" min="1" max="12" value={number} onChange={(event) => setNumber(Number(event.target.value))} disabled={disabled} aria-invalid={state === "error"} /><button type="button" aria-label={ko ? "한 명 늘리기" : "Increase by one"} onClick={() => setNumber(Math.min(12, number + 1))} disabled={disabled || number === 12}><Plus aria-hidden="true" /></button></div><small>{state === "error" ? (ko ? "1명 이상 입력하세요." : "Enter at least one traveller.") : (ko ? "최대 12명" : "Up to 12")}</small></label>;
      case "date-input":
        return <label className="specimen-date"><span>{ko ? "출발 날짜" : "Departure date"}</span><div><CalendarDays aria-hidden="true" /><input type="date" defaultValue="2026-09-18" disabled={disabled} aria-invalid={state === "error"} /></div><small>{state === "error" ? (ko ? "이 날짜에는 경로를 이용할 수 없습니다." : "This route is unavailable on that date.") : (ko ? "현지 시간 기준" : "Local time")}</small></label>;
      case "file-upload":
        return <label className="specimen-file" data-selected={Boolean(fileName)}><FileUp aria-hidden="true" /><b>{fileName ? fileName : (ko ? "파일을 선택하거나 놓으세요" : "Choose or drop a file")}</b><span>{fileName ? (ko ? "선택됨 · 전송되지 않음" : "Selected · Not uploaded") : "GPX, KML · 10 MB max"}</span><input type="file" accept=".gpx,.kml" disabled={disabled} onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; if (!/\.(gpx|kml)$/i.test(file.name) || file.size > 10 * 1024 * 1024) { setMessage(ko ? "GPX, KML 파일만 가능합니다 (최대 10 MB)." : "Choose GPX or KML, up to 10 MB."); return; } setFileName(file.name); setMessage(ko ? "파일이 선택됐습니다. 전송하지 않습니다." : "File selected. Nothing is uploaded."); }} /></label>;
      case "segmented-control":
        return <div className="specimen-segments" role="radiogroup" aria-label={ko ? "지도 유형" : "Map type"}><button type="button" role="radio" aria-checked={choice === 0} onClick={() => setChoice(0)}>{ko ? "표준" : "Standard"}</button><button type="button" role="radio" aria-checked={choice === 1} onClick={() => setChoice(1)}>{ko ? "위성" : "Satellite"}</button><button type="button" role="radio" aria-checked={choice === 2} onClick={() => setChoice(2)} disabled={disabled}>{ko ? "지형" : "Terrain"}</button></div>;
      case "color-input":
        return <label className="specimen-color"><span>{ko ? "경로 색상" : "Route color"}</span><div><input type="color" value={color} onChange={(event) => setColor(event.target.value)} disabled={disabled} /><output>{color.toUpperCase()}</output><button type="button" disabled={disabled} onClick={() => setColor("#3158e7")}>{ko ? "초기화" : "Reset"}</button></div></label>;
      case "tabs":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "breadcrumb":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "pagination":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "navigation-menu":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "sidebar-menu":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "stepper":
        return <ol className="specimen-stepper" aria-label={ko ? "발행 단계" : "Publishing steps"}><li data-complete="true"><i><Check aria-hidden="true" /></i><span>{ko ? "기록" : "Details"}</span></li><li aria-current={active ? "step" : undefined}><i>2</i><span>{ko ? "경로" : "Route"}</span></li><li><i>3</i><span>{ko ? "검토" : "Review"}</span></li></ol>;
      case "tree-view":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "command-menu":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "alert":
        return <div hidden={!open} className="specimen-alert" data-tone={state === "error" ? "error" : "info"} role="alert">{state === "error" ? <CircleAlert aria-hidden="true" /> : <Info aria-hidden="true" />}<div><b>{state === "error" ? (ko ? "저장하지 못했습니다" : "Could not save") : (ko ? "경로가 업데이트됐습니다" : "Route updated")}</b><p>{state === "error" ? (ko ? "연결을 확인하고 다시 시도하세요." : "Check the connection and try again.") : (ko ? "새 구간 두 곳을 검토하세요." : "Review two newly added segments.")}</p></div><button type="button" aria-label={ko ? "닫기" : "Dismiss"} onClick={() => setOpen(false)}><X aria-hidden="true" /></button></div>;
      case "toast":
        return <div className="specimen-toast" role="status"><CheckCircle2 aria-hidden="true" /><div><b>{ko ? "조합을 저장했습니다" : "Combination saved"}</b><small>{ko ? "내 프리셋에서 다시 볼 수 있습니다." : "Find it again in your presets."}</small></div><button type="button" disabled={Boolean(message)} onClick={() => setMessage(ko ? "예시 저장을 되돌렸습니다." : "Demo save undone.")}>{ko ? "되돌리기" : "Undo"}</button></div>;
      case "progress":
        return <div className="specimen-progress"><div><span>{ko ? "리뷰 팩 생성" : "Generating review pack"}</span><b>68%</b></div><progress value="68" max="100">68%</progress><div className="specimen-skeleton"><i /><i /><i /></div></div>;
      case "banner":
        return <section className="specimen-banner" data-tone={state === "error" ? "error" : "info"} aria-label={ko ? "페이지 알림" : "Page announcement"}>{state === "error" ? <CircleAlert aria-hidden="true" /> : <Sparkles aria-hidden="true" />}<div><b>{state === "error" ? (ko ? "동기화가 중단됐습니다" : "Sync was interrupted") : (ko ? "새 오프라인 지도를 사용할 수 있습니다" : "A new offline map is available")}</b><p>{state === "error" ? (ko ? "로컬 변경 사항은 안전하게 보관 중입니다." : "Your local changes are safely retained.") : (ko ? "출발 전에 동쪽 지역을 내려받으세요." : "Download the eastern region before departure.")}</p></div><button type="button" onClick={() => setMessage(ko ? "예시 작업이 완료됐습니다." : "Demo operation completed.")}>{state === "error" ? (ko ? "다시 시도" : "Retry") : (ko ? "다운로드" : "Download")}</button></section>;
      case "tooltip":
        return <div className="specimen-tooltip-stage"><div className="specimen-tooltip" id={`route-tooltip-${state}-${compact}`} role="tooltip">{ko ? "지도에 경로 표시" : "Show route on map"}</div><button type="button" onClick={() => setMessage(ko ? "지도 위치: 제주 동쪽 능선" : "Map location: Eastern ridge, Jeju")} aria-describedby={`route-tooltip-${state}-${compact}`}><Gauge aria-hidden="true" /><span className="sr-only">{ko ? "지도에 경로 표시" : "Show route on map"}</span></button></div>;
      case "empty-state":
        return <section className="specimen-empty"><div><Search aria-hidden="true" /></div><b>{ko ? "아직 저장한 경로가 없습니다" : "No saved routes yet"}</b><p>{ko ? "Atlas에서 첫 경로를 찾아 보세요." : "Explore the atlas and save your first route."}</p><button type="button" onClick={() => setMessage(ko ? "동쪽 능선 · 제주 · 8.4 km" : "Eastern ridge · Jeju · 8.4 km")}>{ko ? "경로 탐색" : "Explore routes"}</button></section>;
      case "spinner":
        return <div className="specimen-spinner" role="status"><LoaderCircle aria-hidden="true" /><b>{loading ? (ko ? "지도를 불러오는 중" : "Loading the map") : (ko ? "경로를 준비하는 중" : "Preparing routes")}</b><span>{ko ? "잠시만 기다려 주세요." : "This should only take a moment."}</span></div>;
      case "card":
        return <article className="specimen-card"><span>{ko ? "추천 경로" : "FEATURED ROUTE"}</span><div className="specimen-card-art"><Star aria-hidden="true" /></div><h4>{ko ? "바람이 만든 가장자리" : "An edge shaped by wind"}</h4><p>{ko ? "검은 현무암과 낮은 돌담 사이를 걷습니다." : "Walk between black basalt and low stone walls."}</p><a href="#specimen-destination" onClick={(event) => { event.preventDefault(); if (!disabled) setMessage(ko ? "현장 기록: 동쪽 능선 · 제주 · 8.4 km" : "Field Notes: Eastern ridge · Jeju · 8.4 km"); }}>{ko ? "경로 열기" : "Open route"}<ArrowRight aria-hidden="true" /></a></article>;
      case "badge-avatar":
        return <div className="specimen-identities"><div className="specimen-avatar" aria-label={ko ? "김하늘" : "Haneul Kim"}>HK<i /></div><div><b>{ko ? "김하늘" : "Haneul Kim"}</b><span>{ko ? "현장 편집자" : "Field editor"}</span></div><em>{ko ? "활성" : "ACTIVE"}</em><span className="specimen-badge">12</span></div>;
      case "table":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "list":
        return <ul className="specimen-list"><li data-selected={selected}><div className="specimen-avatar">ER</div><div><b>{ko ? "동쪽 능선" : "Eastern ridge"}</b><span>{ko ? "오늘 · 12.4 km" : "Today · 12.4 km"}</span></div><button type="button" onClick={() => setMessage(ko ? "동쪽 능선 · 경로 정보 선택됨" : "Eastern ridge · Route details selected")} aria-label={ko ? "동쪽 능선 더보기" : "More for Eastern ridge"}><MoreHorizontal aria-hidden="true" /></button></li><li><div className="specimen-avatar">BC</div><div><b>{ko ? "현무암 해안" : "Basalt coast"}</b><span>{ko ? "어제 · 8.2 km" : "Yesterday · 8.2 km"}</span></div><button type="button" onClick={() => setMessage(ko ? "현무암 해안 · 경로 정보 선택됨" : "Basalt coast · Route details selected")} aria-label={ko ? "현무암 해안 더보기" : "More for Basalt coast"}><MoreHorizontal aria-hidden="true" /></button></li></ul>;
      case "description-list":
        return <dl className="specimen-description"><div><dt>{ko ? "상태" : "Status"}</dt><dd><span />{ko ? "발행됨" : "Published"}</dd></div><div><dt>{ko ? "지역" : "Region"}</dt><dd>{ko ? "제주 동부" : "East Jeju"}</dd></div><div><dt>{ko ? "업데이트" : "Updated"}</dt><dd><time dateTime="2026-08-25">25 Aug 2026</time></dd></div></dl>;
      case "stat-card":
        return <article className="specimen-stat"><header><span>{ko ? "이번 달 산책" : "WALKS THIS MONTH"}</span><Gauge aria-hidden="true" /></header><strong>128<small> km</small></strong><p><b>+18.4%</b> {ko ? "지난달 대비" : "from last month"}</p><div aria-hidden="true"><i /><i /><i /><i /><i /></div></article>;
      case "accordion":
        return <div className="specimen-accordion"><details open={selected || state === "default"}><summary>{ko ? "경로 난이도는 어떻게 정하나요?" : "How is route difficulty measured?"}<ChevronDown aria-hidden="true" /></summary><p>{ko ? "거리, 고도 변화, 노면 상태를 함께 평가합니다." : "We combine distance, elevation gain, and surface conditions."}</p></details><details><summary>{ko ? "오프라인에서도 사용할 수 있나요?" : "Can I use it offline?"}<ChevronDown aria-hidden="true" /></summary><p>{ko ? "출발 전에 지도와 안내서를 저장하세요." : "Save the map and field guide before setting out."}</p></details></div>;
      case "timeline":
        return <ol className="specimen-timeline"><li data-active={selected}><i /><div><time dateTime="09:42">09:42</time><b>{ko ? "경로를 발행했습니다" : "Route published"}</b><span>{ko ? "김하늘 편집자" : "Haneul Kim"}</span></div></li><li><i /><div><time dateTime="08:16">08:16</time><b>{ko ? "현장 사진 12장 추가" : "12 field photos added"}</b><span>Min Park</span></div></li></ol>;
      case "calendar":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "dialog":
        return <div className="specimen-overlay-stage">{!open ? <button type="button" onClick={() => setOpen(true)}>{ko ? "대화상자 열기" : "Open dialog"}</button> : <section className="specimen-dialog" role="dialog" aria-label={ko ? "경로 삭제" : "Delete route"}><header><b>{ko ? "경로를 삭제할까요?" : "Delete this route?"}</b><button type="button" aria-label={ko ? "닫기" : "Close"} onClick={() => setOpen(false)}><X aria-hidden="true" /></button></header><p>{ko ? "삭제한 경로와 현장 기록은 복구할 수 없습니다." : "The route and its field notes cannot be restored."}</p><footer><button type="button" onClick={() => setOpen(false)}>{ko ? "취소" : "Cancel"}</button><button type="button" onClick={() => { setOpen(false); setMessage(ko ? "예시 경로를 삭제했습니다." : "Demo route deleted."); }} className="danger">{ko ? "삭제" : "Delete"}</button></footer></section>}</div>;
      case "popover":
        return <div className="specimen-popover-stage"><button type="button" className="specimen-icon-button" aria-expanded={open} onClick={() => setOpen(!open)} aria-label={ko ? "알림 열기" : "Open notifications"}><Bell aria-hidden="true" /></button><section hidden={!open} className="specimen-popover" aria-label={ko ? "알림" : "Notifications"}><span>{ko ? "새 알림" : "NEW NOTIFICATION"}</span><b>{ko ? "팀 검토가 완료됐습니다." : "Team review is complete."}</b><button type="button" onClick={() => setMessage(ko ? "검토 완료: 경로 2개, 수정 사항 없음" : "Review complete: 2 routes, no changes requested")}>{ko ? "검토 팩 열기" : "Open review pack"}</button></section></div>;
      case "drawer":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "context-menu":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      case "hover-card":
        return <div className="specimen-hover-card"><a href="#specimen-destination" onClick={(event) => { event.preventDefault(); if (!disabled) setMessage(ko ? "현장 기록: 동쪽 능선 · 제주 · 8.4 km" : "Field Notes: Eastern ridge · Jeju · 8.4 km"); }}>@field-atlas</a><article><div className="specimen-avatar">FA</div><div><b>Field Atlas</b><span>@field-atlas</span></div><p>{ko ? "천천히 걷고 세심하게 기록하는 독립 현장 안내서." : "An independent field guide for walking slowly and noticing more."}</p><footer><b>24</b> {ko ? "경로" : "routes"}<b>8.4k</b> {ko ? "저장" : "saves"}</footer></article></div>;
      case "command-palette":
        return <InteractiveSpecimen id={id} language={language} state={state} />;
      default:
        return null;
    }
  })();

  return <div className="specimen-preview" data-component={id} data-preview-state={state} data-compact={compact} aria-hidden={compact || undefined} inert={compact || undefined}>{content}{message && <p className="specimen-live-message" role="status">{message}</p>}</div>;
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
  function inspect(id: ComponentId) {
    onSelectComponent(id);
    requestAnimationFrame(() => {
      const title = document.getElementById("component-detail-title");
      title?.focus({ preventScroll: true });
      title?.closest(".component-detail")?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  }
  function returnToCatalog() {
    const card = document.querySelector<HTMLElement>(`[data-component="${selectedComponent}"] .component-card-action`);
    const target = card ?? document.getElementById("component-catalog-title");
    target?.focus({ preventScroll: true });
    (card?.closest(".component-catalog-card") ?? target)?.scrollIntoView({ behavior: "instant", block: "center" });
  }
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

        <nav className="component-browser" aria-label={language === "ko" ? "컴포넌트 탐색" : "Component browser"}>
          <label>{language === "ko" ? "컴포넌트 바로 선택" : "Choose a component"}<select value={selectedComponent} onChange={(event) => inspect(event.target.value as ComponentId)}>{componentCatalog.map((item) => <option key={item.id} value={item.id}>{localized(item)}</option>)}</select></label>
          <button type="button" onClick={returnToCatalog}><ArrowLeft aria-hidden="true" />{language === "ko" ? "목록에서 탐색" : "Browse the library"}</button>
        </nav>
        <section className="component-detail" aria-labelledby="component-detail-title">
          <header><div><span>{localized(categoryLabels[selected.category])} · {String(selected.states.length).padStart(2, "0")} STATES</span><h3 id="component-detail-title" tabIndex={-1}>{localized(selected)}{language === "ko" && bilingual && <small lang="en">{selected.en}</small>}</h3><p>{localized(selected.description)}</p></div><div className="component-detail-meta"><span>{language === "ko" ? "적용된 기초 미학" : "Governing aesthetic"}</span><b>{localized(aesthetic)}</b></div></header>
          <p className="component-state-note">{language === "ko" ? "기본 예시에서 조작해 보세요. 호버·포커스 표시는 상태를 비교하기 위한 시각 예시입니다." : "Try the default example. Hover and focus previews are visual fixtures for comparing states."}</p><div className="component-state-grid">
            {selected.states.map((state) => <article className="component-state-card sample-surface" key={state}><span>{localized(stateLabels[state])}</span><SpecimenPreview key={`${selectedComponent}-${state}`} id={selectedComponent} language={language} state={state} /></article>)}
          </div>
          <button type="button" className="component-back" onClick={returnToCatalog}><ArrowLeft aria-hidden="true" />{language === "ko" ? "컴포넌트 목록으로 돌아가기" : "Back to components"}</button>
        </section>

        <section className="component-catalog" id="component-catalog" aria-labelledby="component-catalog-title">
          <header><div><span>REUSABLE COMPONENTS</span><h3 id="component-catalog-title" tabIndex={-1}>{language === "ko" ? "라이브러리 탐색" : "Explore the library"}</h3></div><label className="component-search"><Search aria-hidden="true" /><span className="sr-only">{language === "ko" ? "컴포넌트 검색" : "Search components"}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "ko" ? "이름이나 역할 검색" : "Search by name or purpose"} /></label></header>
          <div className="component-category-tabs" role="group" aria-label={language === "ko" ? "컴포넌트 분류" : "Component categories"}>
            <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>{language === "ko" ? "전체" : "All"}<span>{componentCatalog.length}</span></button>
            {componentCategories.map((item) => <button type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{localized(categoryLabels[item])}<span>{componentCatalog.filter((component) => component.category === item).length}</span></button>)}
          </div>
          <p className="component-result-count">{language === "ko" ? `${filteredComponents.length}개 컴포넌트` : `${filteredComponents.length} components`}</p>
          <div className="component-catalog-grid">
            {filteredComponents.map((component) => {
              const active = component.id === selectedComponent;
              return <article className="component-catalog-card sample-surface" data-selected={active} data-component={component.id} key={component.id}><span>{localized(categoryLabels[component.category])}</span><b>{localized(component)}{language === "ko" && bilingual && <small lang="en">{component.en}</small>}</b><p>{localized(component.description)}</p><SpecimenPreview id={component.id} language={language} compact /><button type="button" className="component-card-action" onClick={() => inspect(component.id)} aria-label={`${language === "ko" ? "상태 보기" : "Inspect states"}: ${localized(component)}`} aria-pressed={active}>{language === "ko" ? "상태 보기" : "Inspect states"}<ArrowRight aria-hidden="true" /></button></article>;
            })}
          </div>
          {filteredComponents.length === 0 && <p className="component-empty">{language === "ko" ? "검색 조건에 맞는 컴포넌트가 없습니다." : "No components match this search."}</p>}
        </section>
      </div>
    </section>
  );
}
