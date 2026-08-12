"use client";

import { lazy, Suspense } from "react";

import {
  ArrowDown,
  ArrowUpRight,
  BookOpenText,
  Check,
  Map,
  MapPinned,
  MoreHorizontal,
  Search,
} from "lucide-react";
import {
  getOption,
  type Language,
  type Selection,
} from "../style-data";
import { getFontStylesheets } from "../font-data";
import { buildAgentState } from "../agent-contract";
import {
  usesBilingualCopy,
  type KoreanCopyMode,
} from "../url-state";

const FieldDataCharts = lazy(() => import("./DataCharts").then((module) => ({ default: module.FieldDataCharts })));
const DashboardAreaChart = lazy(() => import("./DataCharts").then((module) => ({ default: module.DashboardAreaChart })));

const sampleCopy = {
  en: {
    navAria: "Example site navigation",
    nav: ["Story", "Guides", "Route"],
    plan: "Plan a walk",
    hero: ["Closer to", "the living world."],
    heroBody: "Step half a day beyond the familiar city and the landscape gains resolution. A slow-travel archive for people who walk, pause, and record.",
    explore: "EXPLORE THE EDITION",
    read: "Read the field note",
    artAria: "Abstract landscape of a sun and mountain ridges",
    componentsAria: "Core UI components with the selected design language",
    more: "More actions",
    destination: "Destination",
    destinationValue: "Eastern ridge",
    destinationAria: "Example destination",
    allRoutes: "All routes",
    coast: "Coast",
    forest: "Forest",
    fieldLog: "Field log",
    trailOpen: "Trail open",
    trailAria: "Trail status on",
    indexAria: "Edition summary",
    index: ["Distance grows when you walk slowly", "Field notes sent by local residents", "Reasons to walk the same path again"],
    collecting: "Send us one landscape you still remember.",
    contribute: "CONTRIBUTE",
    storyTitle: ["A path is not a destination,", "but a way to recover the senses."],
    storyLead: "Instead of the fastest route, we mark places where you can stay: an unnamed bench, the shadow at four, the scent of soil after rain—things a map cannot retain.",
    storyColumns: ["A good guide does not explain everything. It leaves enough coordinates to stay oriented and enough space to fill with your own senses.", "This edition follows three routes from sea to forest and gathers voices from the people who live beside them."],
    quote: ["Leave enough room", "for the place to answer."],
    guideTitle: "Three directions for this season",
    guideIntro: "Small clues for understanding a place instead of consuming it.",
    openGuide: "OPEN GUIDE",
    routeTitle: ["One good weekend.", "One meaningful route."],
    routeBody: "Choose your pace and how long you want to stay. Field Notes will shape a small journey around you.",
    routeButton: "BUILD MY ROUTE",
    footer: ["Independent guides for curious walkers.", "Published slowly in Seoul."],
    archive: "Archive",
    contact: "Contact",
    charts: {
      title: ["Every landscape", "has a readable rhythm."],
      intro: "Compare seasonal walking records with the sensory character of each region. The current visual language also shapes the charts and their motion.",
      areaTitle: "Seasonal field walks",
      areaAria: "Area chart of field walks from March to October",
      barTitle: "Calm / vivid balance",
      barAria: "Bar chart comparing calm and vivid scores across five regions",
      regions: "05 REGIONS",
      source: "Source · Field Notes collective / 2026",
      walks: "Field walks",
      daylight: "Daylight index",
      calm: "Calm",
      vivid: "Vivid",
    },
  },
  ko: {
    navAria: "예시 사이트 메뉴",
    nav: ["이야기", "가이드", "경로"],
    plan: "산책 계획하기",
    hero: ["살아 있는 세계에", "조금 더 가까이."],
    heroBody: "익숙한 도시에서 반나절만 벗어나도 풍경의 해상도는 달라집니다. 걷고, 머물고, 기록하는 사람을 위한 느린 여행 아카이브입니다.",
    explore: "이번 호 살펴보기",
    read: "필드 노트 읽기",
    artAria: "해와 산등성이를 추상화한 풍경",
    componentsAria: "선택한 디자인 언어가 적용된 핵심 UI 컴포넌트",
    more: "추가 메뉴",
    destination: "목적지",
    destinationValue: "동쪽 능선",
    destinationAria: "목적지 예시",
    allRoutes: "모든 경로",
    coast: "해안",
    forest: "숲",
    fieldLog: "필드 로그",
    trailOpen: "탐방로 운영 중",
    trailAria: "경로 상태 켜짐",
    indexAria: "이번 호 정보",
    index: ["천천히 걸을수록 길어지는 거리", "지역의 생활자가 보낸 기록", "같은 길을 다시 걷는 이유"],
    collecting: "당신이 오래 기억하는 하나의 풍경을 보내주세요.",
    contribute: "기록 보내기",
    storyTitle: ["길은 목적지가 아니라", "감각을 회복하는 방식입니다."],
    storyLead: "우리는 더 빠른 경로 대신 오래 머물 수 있는 지점을 표시합니다. 이름 없는 벤치, 오후 네 시의 그림자, 비 온 뒤 짙어지는 흙 냄새처럼 지도에 남지 않는 것들입니다.",
    storyColumns: ["좋은 안내서는 모든 것을 설명하지 않습니다. 방향을 잃지 않을 만큼의 좌표와 각자의 감각으로 채울 여백만 남깁니다.", "이번 호에는 바다에서 숲으로 이어지는 세 개의 길과 그 곁에서 살아가는 사람들의 목소리를 담았습니다."],
    quote: ["장소가 대답할 수 있도록", "충분한 여백을 남겨두세요."],
    guideTitle: "이번 계절의 세 방향",
    guideIntro: "장소를 소비하는 대신 이해하기 위한 작은 단서들입니다.",
    openGuide: "가이드 열기",
    routeTitle: ["한 번의 주말,", "하나의 좋은 경로."],
    routeBody: "걷는 속도와 머무는 시간을 고르면 현장 기록이 당신만의 작은 여정을 구성합니다.",
    routeButton: "내 경로 만들기",
    footer: ["호기심 많은 산책자를 위한 독립 가이드.", "서울에서 천천히 발행합니다."],
    archive: "아카이브",
    contact: "문의",
    charts: {
      title: ["풍경에도 읽을 수 있는", "리듬이 있습니다."],
      intro: "계절별 걷기 기록과 지역별 감각 데이터를 함께 비교합니다. 현재 시각 언어는 그래프의 형태와 움직임에도 이어집니다.",
      areaTitle: "계절별 걷기 기록",
      areaAria: "3월부터 10월까지의 걷기 기록 면적 그래프",
      barTitle: "고요함과 생동감의 균형",
      barAria: "다섯 지역의 고요함과 생동감 비교 막대 그래프",
      regions: "05개 지역",
      source: "출처 · 현장 기록 공동체 / 2026",
      walks: "걷기 기록",
      daylight: "일조량 지수",
      calm: "고요함",
      vivid: "생동감",
    },
  },
} as const;

const sampleMicrocopy = {
  en: {
    brand: "FIELD NOTES",
    dataKicker: "FIELD DATA · LIVE CHARTS",
    cadence: "WALKING CADENCE",
    character: "ROUTE CHARACTER",
    edition: "EDITION NO. 07",
    coordinates: "37.5665° N · 126.9780° E",
    fieldLog: "FIELD LOG",
    season: "SUMMER / 2026",
    landscape: ["THE EASTERN RIDGE", "BEFORE FIRST LIGHT"],
    componentLabels: ["BUTTONS", "INPUT", "FILTERS", "PROGRESS", "STATUS"],
    primary: "Primary action",
    secondary: "Secondary",
    indexLabels: ["01 / DISTANCE", "02 / FIELD GUIDES", "03 / SEASONS"],
    indexUnits: ["km", "stories", "ways"],
    collecting: "NOW COLLECTING",
    essay: "FIELD ESSAY · 01",
    principle: "— Field principle No. 03",
    guides: "SELECTED FIELD GUIDES",
    makeItYours: "MAKE IT YOURS",
    copyright: "© 2026 · WALK LIGHTLY",
    instagram: "Instagram",
    routePoints: ["A", "B", "C"],
    routeCoordinates: ["35° 09′ 31″ N", "129° 09′ 38″ E"],
    regions: ["JEJU · VOLCANIC COAST", "GANGWON · PINE FOREST", "TONGYEONG · ISLAND PATH"],
    months: ["MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"],
    conditions: ["COAST", "FOREST", "RIDGE", "ISLAND", "CITY"],
  },
  ko: {
    brand: "현장 기록",
    dataKicker: "현장 데이터 · 실제 차트",
    cadence: "걷기 리듬",
    character: "경로 특성",
    edition: "제07호",
    coordinates: "북위 37.5665° · 동경 126.9780°",
    fieldLog: "현장 기록",
    season: "2026년 여름",
    landscape: ["동쪽 능선", "해 뜨기 전"],
    componentLabels: ["버튼", "입력", "필터", "진행률", "상태"],
    primary: "주요 동작",
    secondary: "보조 동작",
    indexLabels: ["01 / 거리", "02 / 현장 가이드", "03 / 계절"],
    indexUnits: ["킬로미터", "편", "가지"],
    collecting: "기록 수집 중",
    essay: "현장 에세이 · 01",
    principle: "— 현장 원칙 제03호",
    guides: "선별한 현장 가이드",
    makeItYours: "나만의 경로",
    copyright: "© 2026 · 가볍게 걷기",
    instagram: "인스타그램",
    routePoints: ["가", "나", "다"],
    routeCoordinates: ["북위 35° 09′ 31″", "동경 129° 09′ 38″"],
    regions: ["제주 · 화산 해안", "강원 · 소나무 숲", "통영 · 섬길"],
    months: ["3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월"],
    conditions: ["해안", "숲", "능선", "섬", "도시"],
  },
} as const;

const guideStories = [
  {
    number: "01",
    region: "JEJU · VOLCANIC COAST",
    title: { en: "An edge shaped by wind", ko: "바람이 만든 가장자리" },
    copy: { en: "Two days following the island’s pace between black basalt and low stone walls.", ko: "검은 현무암과 낮은 돌담 사이, 섬의 속도를 따라 걷는 이틀의 기록." },
    tone: "ember",
  },
  {
    number: "02",
    region: "GANGWON · PINE FOREST",
    title: { en: "The direction of an old forest", ko: "오래된 숲의 방향" },
    copy: { en: "A small guide to the ridge and pines before the early mist clears.", ko: "이른 안개가 걷히기 전 시작하는 능선과 소나무 숲의 작은 안내서." },
    tone: "moss",
  },
  {
    number: "03",
    region: "TONGYEONG · ISLAND PATH",
    title: { en: "An afternoon between islands", ko: "섬과 섬 사이의 오후" },
    copy: { en: "Ferry times, tides, and one slowly unfolding day along the southern sea.", ko: "배 시간과 물때, 천천히 이어지는 남쪽 바다의 하루를 채집했습니다." },
    tone: "tide",
  },
] as const;

function EnglishCompanion({ children, visible }: { children: string; visible: boolean }) {
  if (!visible) return null;
  return <span className="english-companion" lang="en">{children}</span>;
}

export function AgentStateScript({ payload }: { payload: ReturnType<typeof buildAgentState> }) {
  const json = JSON.stringify(payload).replaceAll("<", "\\u003c");
  return <script id="ui-style-lab-state" type="application/json" dangerouslySetInnerHTML={{ __html: json }} />;
}

function LayoutShowcase({ selection, language, copyMode }: { selection: Selection; language: Language; copyMode: KoreanCopyMode }) {
  const t = sampleCopy[language];
  const bilingual = usesBilingualCopy(language, copyMode);
  const items = [
    { number: "01", metric: "42.7 km", title: t.index[0], meta: language === "ko" ? "해안 경로 · 6시간" : "Coastal route · 6 hours" },
    { number: "02", metric: "12", title: t.index[1], meta: language === "ko" ? "지역 기록 · 업데이트됨" : "Local dispatches · updated" },
    { number: "03", metric: "04", title: t.index[2], meta: language === "ko" ? "계절별 관찰" : "Seasonal observations" },
    { number: "04", metric: "18%", title: t.collecting, meta: language === "ko" ? "이번 주 증가" : "Growth this week" },
    { number: "05", metric: "07", title: t.guideTitle, meta: language === "ko" ? "현재 열람 가능" : "Available now" },
    { number: "06", metric: "86", title: t.routeTitle.join(" "), meta: language === "ko" ? "추천 경로 점수" : "Route confidence" },
  ];

  if (selection.layout === "masonry") {
    return (
      <section className="layout-showcase masonry-workbench" aria-label={language === "ko" ? "실제 메이슨리 구성" : "True masonry composition"}>
        {items.map((item, index) => <article className="sample-surface" key={item.number} data-height={(index % 3) + 1}><span>{item.number}</span><strong>{item.metric}</strong><h3>{item.title}</h3><p>{item.meta}</p></article>)}
      </section>
    );
  }

  if (selection.layout === "dashboard") {
    return (
      <section className="layout-showcase dashboard-workbench" aria-label={language === "ko" ? "데이터 대시보드 구성" : "Data dashboard composition"}>
        <header><div><span>LIVE OVERVIEW</span><h3>{language === "ko" ? "현장 운영 대시보드" : "Field operations dashboard"}</h3></div><button type="button">{language === "ko" ? "기간 설정" : "Set range"}</button></header>
        <div className="dashboard-kpis">{items.slice(0, 4).map((item) => <article className="sample-surface" key={item.number}><span>{item.number}</span><strong>{item.metric}</strong><p>{item.title}</p></article>)}</div>
        <article className="dashboard-chart sample-surface"><div><span>WEEKLY SIGNAL</span><h4>{language === "ko" ? "걷기 기록 추이" : "Walking record trend"}</h4></div><Suspense fallback={<div className="chart-skeleton" data-agent-pending="true" aria-hidden="true" />}><DashboardAreaChart animate={selection.motion !== "quiet"} /></Suspense></article>
        <div className="dashboard-status sample-surface">{items.slice(0, 4).map((item, index) => <div key={item.number}><i data-state={index === 2 ? "watch" : "ready"} /><span>{item.title}</span><b>{index === 2 ? "WATCH" : "READY"}</b></div>)}</div>
      </section>
    );
  }

  if (selection.layout === "masterDetail") {
    return (
      <section className="layout-showcase master-detail-workbench sample-surface" aria-label={language === "ko" ? "목록과 상세 패널" : "List and detail panes"}>
        <div className="master-list" role="list"><header><span>FIELD INDEX</span><b>{language === "ko" ? "경로 목록" : "Route list"}</b></header>{items.slice(0, 4).map((item, index) => <button type="button" className={index === 0 ? "selected" : ""} aria-current={index === 0 ? "true" : undefined} key={item.number}><span>{item.number}</span><b>{item.title}</b><small>{item.meta}</small></button>)}</div>
        <article className="detail-pane"><span>{items[0].meta}</span><h3>{items[0].title}</h3><strong>{items[0].metric}</strong><p>{t.storyLead}<EnglishCompanion visible={bilingual}>{sampleCopy.en.storyLead}</EnglishCompanion></p><div><button type="button">{t.read}</button><button type="button">{t.plan}</button></div></article>
      </section>
    );
  }

  if (selection.layout === "feed") {
    return <section className="layout-showcase feed-workbench" aria-label={language === "ko" ? "콘텐츠 피드" : "Content feed"}>{items.map((item) => <article className="sample-surface" key={item.number}><span>{item.number}</span><div><small>{item.meta}</small><h3>{item.title}</h3></div><strong>{item.metric}</strong></article>)}</section>;
  }

  if (selection.layout === "supportingPane") {
    return <section className="layout-showcase supporting-workbench" aria-label={language === "ko" ? "주요·보조 패널 구성" : "Primary and supporting panes"}><article className="sample-surface"><span>PRIMARY PANE</span><h3>{t.storyTitle.join(" ")}</h3><p>{t.storyLead}<EnglishCompanion visible={bilingual}>{sampleCopy.en.storyLead}</EnglishCompanion></p><button type="button">{t.read}</button></article><aside className="sample-surface"><span>SUPPORTING PANE</span><h4>{t.guideTitle}</h4>{items.slice(0, 3).map((item) => <div key={item.number}><b>{item.number}</b><p>{item.title}</p></div>)}</aside></section>;
  }

  if (selection.layout === "table") {
    return (
      <section className="layout-showcase table-workbench sample-surface" aria-label={language === "ko" ? "운영 데이터 테이블" : "Operations data table"}><header><div><span>ROUTE DATA</span><h3>{language === "ko" ? "현장 기록 비교" : "Compare field records"}</h3></div><button type="button">{language === "ko" ? "필터" : "Filter"}</button></header><div className="table-scroll"><table><caption>{language === "ko" ? "경로 상태와 지표" : "Route status and metrics"}</caption><thead><tr><th scope="col">ID</th><th scope="col">{language === "ko" ? "기록" : "Record"}</th><th scope="col">{language === "ko" ? "상태" : "Status"}</th><th scope="col">{language === "ko" ? "지표" : "Metric"}</th></tr></thead><tbody>{items.map((item, index) => <tr key={item.number}><td>{item.number}</td><th scope="row">{item.title}<small>{item.meta}</small></th><td><i data-state={index === 2 ? "watch" : "ready"} />{index === 2 ? "Watch" : "Ready"}</td><td>{item.metric}</td></tr>)}</tbody></table></div></section>
    );
  }

  if (selection.layout === "wizard") {
    const steps = language === "ko" ? ["지역 선택", "속도 설정", "경로 확인", "기록 시작"] : ["Choose region", "Set pace", "Review route", "Start journal"];
    return <section className="layout-showcase wizard-workbench sample-surface" aria-label={language === "ko" ? "단계별 작업 흐름" : "Guided task flow"}><ol>{steps.map((step, index) => <li className={index === 0 ? "current" : ""} key={step}><i>{index === 0 ? <Check aria-hidden="true" /> : index + 1}</i><span>{step}</span><small>{index === 0 ? (language === "ko" ? "현재 단계" : "Current") : (language === "ko" ? "예정" : "Upcoming")}</small></li>)}</ol><form onSubmit={(event) => event.preventDefault()}><span>STEP 01 / 04</span><h3>{steps[0]}</h3><p>{language === "ko" ? "걷고 싶은 지역과 풍경을 먼저 선택하세요." : "Begin by choosing the landscape you want to walk through."}</p><label>{t.destination}<input value={t.destinationValue} readOnly /></label><div><button type="button">{language === "ko" ? "이전" : "Back"}</button><button type="submit">{language === "ko" ? "다음 단계" : "Continue"}</button></div></form></section>;
  }

  return (
    <section className="sample-index" aria-label={t.indexAria}>
      {items.slice(0, 3).map((item, index) => <div key={item.number}><span>{item.number}</span><strong>{item.metric.replace(" km", "")}<small>{index === 0 ? "km" : index === 1 ? "stories" : "ways"}</small></strong><p>{item.title}<EnglishCompanion visible={bilingual}>{sampleCopy.en.index[index]}</EnglishCompanion></p></div>)}
      <div className="index-note"><span>NOW COLLECTING</span><p>{t.collecting}<EnglishCompanion visible={bilingual}>{sampleCopy.en.collecting}</EnglishCompanion></p><a href="#sample-route">{t.contribute}<ArrowUpRight aria-hidden="true" /></a></div>
    </section>
  );
}

export function FieldNotesSite({ selection, language, copyMode }: { selection: Selection; language: Language; copyMode: KoreanCopyMode }) {
  const t = sampleCopy[language];
  const bilingual = usesBilingualCopy(language, copyMode);
  const microLanguage = language === "ko" && copyMode === "only" ? "ko" : "en";
  const micro = sampleMicrocopy[microLanguage];
  const aesthetic = getOption("aesthetic", selection.aesthetic);
  const surface = getOption("surface", selection.surface);
  const localizedAesthetic = language === "en" ? aesthetic.en : aesthetic.ko;
  const localizedSurface = language === "en" ? surface.en : surface.ko;
  const navItems = [
    { href: "#sample-story", Icon: BookOpenText, label: t.nav[0] },
    { href: "#sample-guides", Icon: Map, label: t.nav[1] },
    { href: "#sample-route", Icon: MapPinned, label: t.nav[2] },
  ];

  function scrollWithinCanvas(event: { preventDefault(): void }, targetId: string) {
    event.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: selection.motion === "quiet" ? "auto" : "smooth" });
  }

  return (
    <section
      className="live-site"
      id="live-site"
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
      aria-label={`${localizedAesthetic}, ${localizedSurface} full-page interface example`}
    >
      <div className="sample-noise" aria-hidden="true" />
      <header className="sample-nav sample-surface">
        <a href="#live-site" onClick={(event) => scrollWithinCanvas(event, "live-site")} className="sample-brand" aria-label={language === "ko" ? "현장 기록 홈" : "Field Notes home"}><span className="sample-mark"><i /><i /><i /></span><b lang={microLanguage}>{micro.brand}</b></a>
        <nav aria-label={t.navAria}>
          {navItems.map((item) => <a href={item.href} onClick={(event) => scrollWithinCanvas(event, item.href.slice(1))} aria-label={item.label} key={item.href}><span className="nav-icon" aria-hidden="true"><item.Icon /></span><span className="nav-text">{item.label}</span></a>)}
        </nav>
        <button type="button" className="sample-nav-cta">{t.plan} <span aria-hidden="true"><ArrowUpRight /></span></button>
      </header>

      <div className="sample-main">
        <section className="sample-hero">
          <div className="hero-copy">
            <div className="sample-eyebrow"><span lang={microLanguage}>{micro.edition}</span><i /><span lang={microLanguage}>{micro.coordinates}</span></div>
            <h2><span>{t.hero[0]}</span><em lang={bilingual ? "en" : undefined}>{bilingual ? sampleCopy.en.hero[1] : t.hero[1]}</em></h2>
            <p>{t.heroBody}<EnglishCompanion visible={bilingual}>{sampleCopy.en.heroBody}</EnglishCompanion></p>
            <div className="hero-actions"><button type="button">{t.explore} <span aria-hidden="true"><ArrowUpRight /></span></button><a href="#sample-story" onClick={(event) => scrollWithinCanvas(event, "sample-story")}><i aria-hidden="true"><ArrowDown /></i> {t.read}</a></div>
          </div>

          <div className="hero-landscape sample-surface" aria-label={t.artAria}>
            <div className="landscape-sun" /><div className="landscape-orbit orbit-one" /><div className="landscape-orbit orbit-two" />
            <div className="landscape-ridge ridge-back" /><div className="landscape-ridge ridge-front" /><div className="landscape-path" />
            <div className="landscape-stamp" lang={microLanguage}><span>{micro.fieldLog}</span><b>07</b><small>{micro.season}</small></div>
            <p lang={microLanguage}>{micro.landscape[0]}<br />{micro.landscape[1]}</p>
          </div>
        </section>

        <section className="component-rack" aria-label={t.componentsAria}>
          <article className="rack-cell sample-surface button-cell"><span lang={microLanguage}>{micro.componentLabels[0]}</span><div><button type="button" lang={microLanguage}>{micro.primary}</button><button type="button" lang={microLanguage}>{micro.secondary}</button><button type="button" aria-label={t.more}><MoreHorizontal aria-hidden="true" /></button></div></article>
          <article className="rack-cell sample-surface input-cell"><span lang={microLanguage}>{micro.componentLabels[1]}</span><label><small>{t.destination}</small><input value={t.destinationValue} readOnly aria-label={t.destinationAria} /><b aria-hidden="true"><Search /></b></label></article>
          <article className="rack-cell sample-surface tag-cell"><span lang={microLanguage}>{micro.componentLabels[2]}</span><div><button type="button" className="selected">{t.allRoutes}</button><button type="button">{t.coast}</button><button type="button">{t.forest}</button></div></article>
          <article className="rack-cell sample-surface progress-cell"><span lang={microLanguage}>{micro.componentLabels[3]}</span><div><b>{t.fieldLog}</b><em lang="en">72%</em></div><i><b /></i></article>
          <article className="rack-cell sample-surface toggle-cell"><span lang={microLanguage}>{micro.componentLabels[4]}</span><div><i /><b>{t.trailOpen}</b><button type="button" aria-label={t.trailAria}><em /></button></div></article>
        </section>

        <LayoutShowcase selection={selection} language={language} copyMode={copyMode} />

        <Suspense fallback={<section className="sample-data chart-loading" data-agent-pending="true" aria-busy="true" aria-label={language === "ko" ? "차트 불러오는 중" : "Loading charts"} />}>
          <FieldDataCharts
            selection={selection}
            copy={t.charts}
            microcopy={micro}
            microLanguage={microLanguage}
            bilingual={bilingual}
            englishTitle={sampleCopy.en.charts.title[1]}
            englishIntro={sampleCopy.en.charts.intro}
          />
        </Suspense>

        <section className="sample-story" id="sample-story">
          <div className="story-heading"><span lang={microLanguage}>{micro.essay}</span><h3>{t.storyTitle[0]}<br /><em className={bilingual ? "english-display-line" : undefined} lang={bilingual ? "en" : undefined}>{bilingual ? sampleCopy.en.storyTitle[1] : t.storyTitle[1]}</em></h3></div>
          <div className="story-body">
            <p className="story-lead">{t.storyLead}<EnglishCompanion visible={bilingual}>{sampleCopy.en.storyLead}</EnglishCompanion></p>
            <div className="story-columns"><p>{t.storyColumns[0]}<EnglishCompanion visible={bilingual}>{sampleCopy.en.storyColumns[0]}</EnglishCompanion></p><p>{t.storyColumns[1]}<EnglishCompanion visible={bilingual}>{sampleCopy.en.storyColumns[1]}</EnglishCompanion></p></div>
            <blockquote><i>“</i><p>{t.quote[0]}<br />{t.quote[1]}<EnglishCompanion visible={bilingual}>{sampleCopy.en.quote.join(" ")}</EnglishCompanion></p><cite lang={microLanguage}>{micro.principle}</cite></blockquote>
          </div>
        </section>

        <section className="sample-guides" id="sample-guides">
          <header><div><span lang={microLanguage}>{micro.guides}</span><h3>{t.guideTitle}{bilingual && <span className="english-display-line" lang="en">{sampleCopy.en.guideTitle}</span>}</h3></div><p>{t.guideIntro}<EnglishCompanion visible={bilingual}>{sampleCopy.en.guideIntro}</EnglishCompanion></p></header>
          <div className="guide-grid">
            {guideStories.map((story, index) => {
              const title = story.title[language];
              return (
                <article className={`guide-card sample-surface ${story.tone}`} key={story.number}>
                  <div className="guide-art" aria-hidden="true"><i /><i /><i /><span>{story.number}</span></div>
                  <div className="guide-copy"><span lang={microLanguage}>{micro.regions[index]}</span><h4>{title}{bilingual && <span className="english-display-line" lang="en">{story.title.en}</span>}</h4><p>{story.copy[language]}<EnglishCompanion visible={bilingual}>{story.copy.en}</EnglishCompanion></p><a href="#sample-route" onClick={(event) => scrollWithinCanvas(event, "sample-route")} aria-label={`${t.openGuide}: ${title}`}>{t.openGuide} <ArrowUpRight aria-hidden="true" /></a></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="sample-route sample-surface" id="sample-route">
          <div className="route-map" aria-hidden="true" lang={microLanguage}><i className="route-line line-a" /><i className="route-line line-b" /><i className="route-line line-c" /><b className="route-point point-a">{micro.routePoints[0]}</b><b className="route-point point-b">{micro.routePoints[1]}</b><b className="route-point point-c">{micro.routePoints[2]}</b><span className="route-coordinate">{micro.routeCoordinates[0]}<br />{micro.routeCoordinates[1]}</span></div>
          <div className="route-copy"><span lang={microLanguage}>{micro.makeItYours}</span><h3>{t.routeTitle[0]}<br /><span className={bilingual ? "english-display-line" : undefined} lang={bilingual ? "en" : undefined}>{bilingual ? sampleCopy.en.routeTitle[1] : t.routeTitle[1]}</span></h3><p>{t.routeBody}<EnglishCompanion visible={bilingual}>{sampleCopy.en.routeBody}</EnglishCompanion></p><button type="button">{t.routeButton} <b aria-hidden="true"><ArrowUpRight /></b></button></div>
        </section>
      </div>

      <footer className="sample-footer">
        <div className="sample-brand"><span className="sample-mark"><i /><i /><i /></span><b lang={microLanguage}>{micro.brand}</b></div>
        <p>{t.footer[0]}<br />{t.footer[1]}<EnglishCompanion visible={bilingual}>{sampleCopy.en.footer.join(" ")}</EnglishCompanion></p>
        <div><a href="#live-site" onClick={(event) => scrollWithinCanvas(event, "live-site")}>{micro.instagram}</a><a href="#live-site" onClick={(event) => scrollWithinCanvas(event, "live-site")}>{t.archive}</a><a href="#live-site" onClick={(event) => scrollWithinCanvas(event, "live-site")}>{t.contact}</a></div>
        <span lang={microLanguage}>{micro.copyright}</span>
      </footer>
    </section>
  );
}

export function FontResourceLinks({ selection, language, copyMode }: { selection: Selection; language: Language; copyMode: KoreanCopyMode }) {
  return getFontStylesheets(selection, language, copyMode).map((href) => (
    <link key={href} rel="stylesheet" href={href} data-ui-style-font="true" />
  ));
}
