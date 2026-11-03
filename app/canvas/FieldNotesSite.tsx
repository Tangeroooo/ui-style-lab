"use client";

import { PageWorkbenches, RouteExplorer, RoutePlanner } from "./PageWorkbenches";

import {
  ArrowDown,
  ArrowUpRight,
  BookOpenText,
  Map,
  MapPinned,
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

function EnglishCompanion({ children, visible }: { children: string; visible: boolean }) {
  if (!visible) return null;
  return <span className="english-companion" lang="en">{children}</span>;
}

export function AgentStateScript({ payload }: { payload: ReturnType<typeof buildAgentState> }) {
  const json = JSON.stringify(payload).replaceAll("<", "\\u003c");
  return <script id="ui-style-lab-state" type="application/json" dangerouslySetInnerHTML={{ __html: json }} />;
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
  const operational = ["dashboard", "masterDetail", "supportingPane", "table", "wizard", "feed", "masonry", "dense"].includes(selection.layout);
  const navItems = operational ? (selection.layout === "wizard" ? [{ href: "#sample-route", Icon: MapPinned, label: language === "ko" ? "계획하기" : "Plan a walk" }] : [{ href: "#live-site", Icon: BookOpenText, label: language === "ko" ? "개요" : "Overview" }, { href: "#sample-guides", Icon: Map, label: language === "ko" ? "경로" : "Routes" }, { href: "#sample-route", Icon: MapPinned, label: language === "ko" ? "계획하기" : "Plan a walk" }]) : [
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
      data-operational={operational}
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
        <button type="button" onClick={() => document.getElementById("sample-route")?.scrollIntoView({ behavior: "auto" })} className="sample-nav-cta">{t.plan} <span aria-hidden="true"><ArrowUpRight /></span></button>
      </header>

      <div className="sample-main">
        {operational ? <PageWorkbenches selection={selection} language={language} copyMode={copyMode} /> : <>
        <section className="sample-hero">
          <div className="hero-copy">
            <div className="sample-eyebrow"><span lang={microLanguage}>{micro.edition}</span><i /><span lang={microLanguage}>{micro.coordinates}</span></div>
            <h2><span>{t.hero[0]}</span><em lang={bilingual ? "en" : undefined}>{bilingual ? sampleCopy.en.hero[1] : t.hero[1]}</em></h2>
            <p>{t.heroBody}<EnglishCompanion visible={bilingual}>{sampleCopy.en.heroBody}</EnglishCompanion></p>
            <div className="hero-actions"><button type="button" onClick={() => document.getElementById("sample-guides")?.scrollIntoView({ behavior: "auto" })}>{t.explore} <span aria-hidden="true"><ArrowUpRight /></span></button><a href="#sample-story" onClick={(event) => scrollWithinCanvas(event, "sample-story")}><i aria-hidden="true"><ArrowDown /></i> {t.read}</a></div>
          </div>

          <div className="hero-landscape sample-surface" aria-label={t.artAria}>
            <div className="landscape-sun" /><div className="landscape-orbit orbit-one" /><div className="landscape-orbit orbit-two" />
            <div className="landscape-ridge ridge-back" /><div className="landscape-ridge ridge-front" /><div className="landscape-path" />
            <div className="landscape-stamp" lang={microLanguage}><span>{micro.fieldLog}</span><b>07</b><small>{micro.season}</small></div>
            <p lang={microLanguage}>{micro.landscape[0]}<br />{micro.landscape[1]}</p>
          </div>
        </section>

        <section className="sample-story" id="sample-story">
          <div className="story-heading"><span lang={microLanguage}>{micro.essay}</span><h3>{t.storyTitle[0]}<br /><em className={bilingual ? "english-display-line" : undefined} lang={bilingual ? "en" : undefined}>{bilingual ? sampleCopy.en.storyTitle[1] : t.storyTitle[1]}</em></h3></div>
          <div className="story-body">
            <p className="story-lead">{t.storyLead}<EnglishCompanion visible={bilingual}>{sampleCopy.en.storyLead}</EnglishCompanion></p>
            <div className="story-columns"><p>{t.storyColumns[0]}<EnglishCompanion visible={bilingual}>{sampleCopy.en.storyColumns[0]}</EnglishCompanion></p><p>{t.storyColumns[1]}<EnglishCompanion visible={bilingual}>{sampleCopy.en.storyColumns[1]}</EnglishCompanion></p></div>
            <blockquote><i>“</i><p>{t.quote[0]}<br />{t.quote[1]}<EnglishCompanion visible={bilingual}>{sampleCopy.en.quote.join(" ")}</EnglishCompanion></p><cite lang={microLanguage}>{micro.principle}</cite></blockquote>
          </div>
        </section>

        <RouteExplorer language={language} copyMode={copyMode} onPlan={() => document.getElementById("sample-route")?.scrollIntoView({ behavior: "auto" })} />
        <RoutePlanner language={language} copyMode={copyMode} />
        </>}
      </div>

      <footer className="sample-footer">
        <div className="sample-brand"><span className="sample-mark"><i /><i /><i /></span><b lang={microLanguage}>{micro.brand}</b></div>
        <p>{t.footer[0]}<br />{t.footer[1]}<EnglishCompanion visible={bilingual}>{sampleCopy.en.footer.join(" ")}</EnglishCompanion></p>
        <div><a href="#live-site" onClick={(event) => scrollWithinCanvas(event, "live-site")}>{language === "ko" ? "맨 위로" : "Back to top"}</a><a href="#sample-route" onClick={(event) => scrollWithinCanvas(event, "sample-route")}>{t.plan}</a></div>
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
