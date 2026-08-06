"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  axes,
  axisKeys,
  axisMeta,
  combinationCount,
  defaultSelection,
  getOption,
  getOptionNote,
  isOptionAllowed,
  normalizeSelection,
  presets,
  recommendedSelection,
  type AxisKey,
  type Language,
  type Selection,
} from "./style-data";

const storageKey = "ui-language-lab-selection";
const languageKey = "ui-language-lab-language";

const labCopy = {
  en: {
    home: "UI Language Lab home",
    tagline: "Design the layers. See the whole page.",
    pageNav: "Page navigation",
    introKicker: "INTERACTIVE UI REFERENCE",
    title: ["Mix design languages.", "See the whole system."],
    intro: "Choose eight coordinated layers and watch the same interface transform instantly—from components and charts to navigation and page rhythm.",
    explore: "Explore the live combination below",
    count: "validated combinations",
    mixer: "Design combination mixer",
    random: "Create a random compatible combination",
    share: "Copy the current combination link",
    applied: "Applied the aesthetic’s native visual system.",
    randomized: "Created a new compatible combination.",
    copied: "Combination link copied.",
    copyFallback: "Copy the URL from the address bar to share it.",
    close: "Close options",
    compat: (name: string) => `Only options compatible with ${name} can be selected.`,
    incompatible: (name: string) => `Not compatible with ${name}`,
    unavailable: (name: string) => `This combination is unavailable for ${name}.`,
    canvas: "FULL-PAGE LIVE CANVAS",
    presetKicker: "CURATED STARTING POINTS · 18",
    presetTitle: ["Switch the whole page", "in one move."],
    presetIntro: "Every preset applies a coherent visual system to the same Field Notes content. Start here, then adjust one layer at a time in the floating mixer.",
    filters: "Preset filters",
    all: "All",
    back: "BACK TO TOP ↑",
    footer: "Mix the system. Experience the page.",
    switchLanguage: "한국어로 전환",
  },
  ko: {
    home: "UI Language Lab 홈",
    tagline: "층위를 설계하고, 전체 페이지에서 확인하세요.",
    pageNav: "페이지 바로가기",
    introKicker: "인터랙티브 UI 레퍼런스",
    title: ["디자인 언어를 조합하고", "전체 시스템을 확인하세요."],
    intro: "서로 호환되는 여덟 개의 층위를 선택하면 같은 UI가 즉시 달라집니다. 컴포넌트와 차트부터 내비게이션, 페이지 리듬까지 한 화면에서 비교하세요.",
    explore: "아래에서 실제 조합 살펴보기",
    count: "검증된 조합",
    mixer: "디자인 조합 믹서",
    random: "호환되는 무작위 조합 만들기",
    share: "현재 조합 링크 복사",
    applied: "미학 고유의 시각 시스템을 적용했습니다.",
    randomized: "새로운 호환 조합을 만들었습니다.",
    copied: "조합 링크를 복사했습니다.",
    copyFallback: "주소창의 URL을 복사해 공유하세요.",
    close: "선택창 닫기",
    compat: (name: string) => `${name}의 시각 문법과 호환되는 옵션만 선택할 수 있습니다.`,
    incompatible: (name: string) => `${name}과 호환되지 않음`,
    unavailable: (name: string) => `${name}에서는 사용할 수 없는 조합입니다.`,
    canvas: "전체 페이지 라이브 캔버스",
    presetKicker: "추천 시작점 · 18",
    presetTitle: ["페이지의 분위기를", "한 번에 전환하세요."],
    presetIntro: "각 프리셋은 같은 Field Notes 콘텐츠에 일관된 시각 시스템을 적용합니다. 선택한 뒤 플로팅 믹서에서 한 층씩 바꿔 보세요.",
    filters: "프리셋 필터",
    all: "전체",
    back: "맨 위로 ↑",
    footer: "시스템을 조합하고, 페이지에서 경험하세요.",
    switchLanguage: "Switch to English",
  },
} as const;

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
    contribute: "CONTRIBUTE ↗",
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
    contribute: "기록 보내기 ↗",
    storyTitle: ["길은 목적지가 아니라", "감각을 회복하는 방식입니다."],
    storyLead: "우리는 더 빠른 경로 대신 오래 머물 수 있는 지점을 표시합니다. 이름 없는 벤치, 오후 네 시의 그림자, 비 온 뒤 짙어지는 흙 냄새처럼 지도에 남지 않는 것들입니다.",
    storyColumns: ["좋은 안내서는 모든 것을 설명하지 않습니다. 방향을 잃지 않을 만큼의 좌표와 각자의 감각으로 채울 여백만 남깁니다.", "이번 호에는 바다에서 숲으로 이어지는 세 개의 길과 그 곁에서 살아가는 사람들의 목소리를 담았습니다."],
    quote: ["장소가 대답할 수 있도록", "충분한 여백을 남겨두세요."],
    guideTitle: "이번 계절의 세 방향",
    guideIntro: "장소를 소비하는 대신 이해하기 위한 작은 단서들입니다.",
    openGuide: "가이드 열기",
    routeTitle: ["한 번의 주말,", "하나의 좋은 경로."],
    routeBody: "걷는 속도와 머무는 시간을 고르면 Field Notes가 당신만의 작은 여정을 구성합니다.",
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
      source: "출처 · Field Notes collective / 2026",
      walks: "걷기 기록",
      daylight: "일조량 지수",
      calm: "고요함",
      vivid: "생동감",
    },
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

const presetLabelsEn: Record<string, string> = {
  "glass-bento": "A translucent field journal",
  "neo-brutal": "A forceful independent publication",
  "soft-neumo": "A calm wellness journal",
  "swiss-flat": "A field archive organized by grid",
  "editorial-luxury": "A restrained luxury journal",
  "y2k-chrome": "An optimistic future from the 2000s",
  "cyber-hud": "A neon expedition index",
  "material-you": "Friendly dynamic color",
  "memphis-pop": "Playful creative tools",
  "frutiger-gloss": "Nature meets the glossy web",
  "terminal-green": "A phosphor field log",
  "paper-report": "A printed annual report",
  "clay-candy": "A soft, dimensional onboarding",
  "liquid-spatial": "Floating glass controls",
  "corporate-clean": "A clear editorial landing page",
  "vapor-grid": "A dreamy retro travel page",
  "organic-calm": "Wellness with quiet data",
  "citrus-split": "Energetic commerce",
};

const seasonalWalks = [
  { month: "MAR", walks: 28, daylight: 42 },
  { month: "APR", walks: 44, daylight: 51 },
  { month: "MAY", walks: 39, daylight: 63 },
  { month: "JUN", walks: 67, daylight: 76 },
  { month: "JUL", walks: 58, daylight: 82 },
  { month: "AUG", walks: 84, daylight: 78 },
  { month: "SEP", walks: 73, daylight: 64 },
  { month: "OCT", walks: 91, daylight: 52 },
];

const routeConditions = [
  { condition: "COAST", calm: 72, vivid: 44 },
  { condition: "FOREST", calm: 91, vivid: 35 },
  { condition: "RIDGE", calm: 56, vivid: 82 },
  { condition: "ISLAND", calm: 77, vivid: 63 },
  { condition: "CITY", calm: 38, vivid: 74 },
];

function sameSelection(a: Selection, b: Selection) {
  return axisKeys.every((axis) => a[axis] === b[axis]);
}

function parseHash(hash: string): Selection | null {
  if (!hash) return null;
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const requestedAesthetic = params.get("aesthetic");
  const aesthetic = requestedAesthetic && axes.aesthetic.some((option) => option.id === requestedAesthetic)
    ? requestedAesthetic
    : defaultSelection.aesthetic;
  const next = recommendedSelection(aesthetic);
  let matched = Boolean(requestedAesthetic);

  for (const axis of axisKeys) {
    const value = params.get(axis);
    if (value && axes[axis].some((option) => option.id === value)) {
      next[axis] = value;
      matched = true;
    }
  }

  return matched ? normalizeSelection(next) : null;
}

function FieldDataCharts({ selection, language }: { selection: Selection; language: Language }) {
  const t = sampleCopy[language].charts;
  const angular = ["brutalist", "swiss", "terminal", "cyberpunk"].includes(selection.aesthetic);
  const curve = angular ? "stepAfter" as const : "monotone" as const;
  const barRadius: [number, number, number, number] = angular ? [0, 0, 0, 0] : [8, 8, 0, 0];
  const animate = selection.motion !== "quiet";
  const duration = selection.motion === "kinetic" ? 1100 : 480;
  const chartTooltip = {
    background: "var(--site-solid)",
    border: "var(--site-border)",
    borderRadius: angular ? 0 : 10,
    boxShadow: "var(--site-shadow)",
    color: "var(--site-ink)",
    fontFamily: "var(--site-font)",
    fontSize: 11,
  };

  return (
    <section className="sample-data" aria-labelledby="field-data-title">
      <header>
        <div><span>FIELD DATA · LIVE CHARTS</span><h3 id="field-data-title">{t.title[0]}<br />{t.title[1]}</h3></div>
        <p>{t.intro}</p>
      </header>
      <div className="data-grid">
        <article className="data-chart sample-surface">
          <div className="data-chart-heading"><div><span>WALKING CADENCE</span><h4>{t.areaTitle}</h4></div><b>+18.4%</b></div>
          <div className="chart-wrap" aria-label={t.areaAria}>
            <ResponsiveContainer width="100%" height={330}>
              <AreaChart data={seasonalWalks} margin={{ top: 20, right: 10, left: -25, bottom: 0 }} accessibilityLayer>
                <defs><linearGradient id="walkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--site-accent)" stopOpacity={0.62} /><stop offset="100%" stopColor="var(--site-accent)" stopOpacity={0.03} /></linearGradient></defs>
                <CartesianGrid stroke="var(--site-line)" strokeDasharray={angular ? "0" : "3 7"} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontSize: 9 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontSize: 9 }} />
                <Tooltip contentStyle={chartTooltip} cursor={{ stroke: "var(--site-accent-3)", strokeWidth: 1 }} />
                <Area type={curve} dataKey="walks" name={t.walks} stroke="var(--site-accent)" strokeWidth={angular ? 3.5 : 2.5} fill="url(#walkFill)" isAnimationActive={animate} animationDuration={duration} />
                <Area type={curve} dataKey="daylight" name={t.daylight} stroke="var(--site-accent-3)" strokeWidth={1.5} fill="transparent" strokeDasharray="5 5" isAnimationActive={animate} animationDuration={duration + 180} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="data-chart sample-surface">
          <div className="data-chart-heading"><div><span>ROUTE CHARACTER</span><h4>{t.barTitle}</h4></div><b>{t.regions}</b></div>
          <div className="chart-wrap" aria-label={t.barAria}>
            <ResponsiveContainer width="100%" height={330}>
              <BarChart data={routeConditions} margin={{ top: 20, right: 0, left: -25, bottom: 0 }} accessibilityLayer>
                <CartesianGrid stroke="var(--site-line)" strokeDasharray={angular ? "0" : "3 7"} vertical={false} />
                <XAxis dataKey="condition" axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontSize: 8 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontSize: 9 }} />
                <Tooltip contentStyle={chartTooltip} cursor={{ fill: "color-mix(in srgb, var(--site-accent) 8%, transparent)" }} />
                <Bar dataKey="calm" name={t.calm} fill="var(--site-accent)" radius={barRadius} isAnimationActive={animate} animationDuration={duration} />
                <Bar dataKey="vivid" name={t.vivid} fill="var(--site-accent-3)" radius={barRadius} isAnimationActive={animate} animationDuration={duration + 180} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend"><span><i />{t.calm}</span><span><i />{t.vivid}</span><p>{t.source}</p></div>
        </article>
      </div>
    </section>
  );
}

function FieldNotesSite({ selection, language }: { selection: Selection; language: Language }) {
  const t = sampleCopy[language];
  const aesthetic = getOption("aesthetic", selection.aesthetic);
  const surface = getOption("surface", selection.surface);
  const localizedAesthetic = language === "en" ? aesthetic.en : aesthetic.ko;
  const localizedSurface = language === "en" ? surface.en : surface.ko;
  const navItems = [
    { href: "#sample-story", icon: "◇", label: t.nav[0] },
    { href: "#sample-guides", icon: "▦", label: t.nav[1] },
    { href: "#sample-route", icon: "⌖", label: t.nav[2] },
  ];

  return (
    <section
      className="live-site"
      id="live-site"
      lang={language}
      data-language={language}
      data-aesthetic={selection.aesthetic}
      data-surface={selection.surface}
      data-layout={selection.layout}
      data-nav={selection.nav}
      data-nav-style={selection.navStyle}
      data-type={selection.type}
      data-palette={selection.palette}
      data-motion={selection.motion}
      aria-label={`${localizedAesthetic}, ${localizedSurface} full-page interface example`}
    >
      <div className="sample-noise" aria-hidden="true" />
      <header className="sample-nav sample-surface">
        <a href="#live-site" className="sample-brand" aria-label="Field Notes home"><span className="sample-mark"><i /><i /><i /></span><b>FIELD NOTES</b></a>
        <nav aria-label={t.navAria}>
          {navItems.map((item) => <a href={item.href} aria-label={item.label} key={item.href}><span className="nav-icon" aria-hidden="true">{item.icon}</span><span className="nav-text">{item.label}</span></a>)}
        </nav>
        <button type="button" className="sample-nav-cta">{t.plan} <span>↗</span></button>
      </header>

      <main className="sample-main">
        <section className="sample-hero">
          <div className="hero-copy">
            <div className="sample-eyebrow"><span>EDITION NO. 07</span><i /><span>37.5665° N · 126.9780° E</span></div>
            <h2><span>{t.hero[0]}</span><em>{t.hero[1]}</em></h2>
            <p>{t.heroBody}</p>
            <div className="hero-actions"><button type="button">{t.explore} <span>↗</span></button><a href="#sample-story"><i>↓</i> {t.read}</a></div>
          </div>

          <div className="hero-landscape sample-surface" aria-label={t.artAria}>
            <div className="landscape-sun" /><div className="landscape-orbit orbit-one" /><div className="landscape-orbit orbit-two" />
            <div className="landscape-ridge ridge-back" /><div className="landscape-ridge ridge-front" /><div className="landscape-path" />
            <div className="landscape-stamp"><span>FIELD LOG</span><b>07</b><small>SUMMER / 2026</small></div>
            <p>THE EASTERN RIDGE<br />BEFORE FIRST LIGHT</p>
          </div>
        </section>

        <section className="component-rack" aria-label={t.componentsAria}>
          <article className="rack-cell sample-surface button-cell"><span>BUTTONS</span><div><button type="button">Primary action</button><button type="button">Secondary</button><button type="button" aria-label={t.more}>•••</button></div></article>
          <article className="rack-cell sample-surface input-cell"><span>INPUT</span><label><small>{t.destination}</small><input value={t.destinationValue} readOnly aria-label={t.destinationAria} /><b>⌕</b></label></article>
          <article className="rack-cell sample-surface tag-cell"><span>FILTERS</span><div><button type="button" className="selected">{t.allRoutes}</button><button type="button">{t.coast}</button><button type="button">{t.forest}</button></div></article>
          <article className="rack-cell sample-surface progress-cell"><span>PROGRESS</span><div><b>{t.fieldLog}</b><em>72%</em></div><i><b /></i></article>
          <article className="rack-cell sample-surface toggle-cell"><span>STATUS</span><div><i /><b>{t.trailOpen}</b><button type="button" aria-label={t.trailAria}><em /></button></div></article>
        </section>

        <section className="sample-index" aria-label={t.indexAria}>
          <div><span>01 / DISTANCE</span><strong>42.7<small>km</small></strong><p>{t.index[0]}</p></div>
          <div><span>02 / FIELD GUIDES</span><strong>12<small>stories</small></strong><p>{t.index[1]}</p></div>
          <div><span>03 / SEASONS</span><strong>04<small>ways</small></strong><p>{t.index[2]}</p></div>
          <div className="index-note"><span>NOW COLLECTING</span><p>{t.collecting}</p><a href="#sample-route">{t.contribute}</a></div>
        </section>

        <FieldDataCharts selection={selection} language={language} />

        <section className="sample-story" id="sample-story">
          <div className="story-heading"><span>FIELD ESSAY · 01</span><h3>{t.storyTitle[0]}<br /><em>{t.storyTitle[1]}</em></h3></div>
          <div className="story-body">
            <p className="story-lead">{t.storyLead}</p>
            <div className="story-columns"><p>{t.storyColumns[0]}</p><p>{t.storyColumns[1]}</p></div>
            <blockquote><i>“</i><p>{t.quote[0]}<br />{t.quote[1]}</p><cite>— Field principle No. 03</cite></blockquote>
          </div>
        </section>

        <section className="sample-guides" id="sample-guides">
          <header><div><span>SELECTED FIELD GUIDES</span><h3>{t.guideTitle}</h3></div><p>{t.guideIntro}</p></header>
          <div className="guide-grid">
            {guideStories.map((story) => {
              const title = story.title[language];
              return (
                <article className={`guide-card sample-surface ${story.tone}`} key={story.number}>
                  <div className="guide-art" aria-hidden="true"><i /><i /><i /><span>{story.number}</span></div>
                  <div className="guide-copy"><span>{story.region}</span><h4>{title}</h4><p>{story.copy[language]}</p><a href="#sample-route" aria-label={`${t.openGuide}: ${title}`}>{t.openGuide} <b>↗</b></a></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="sample-route sample-surface" id="sample-route">
          <div className="route-map" aria-hidden="true"><i className="route-line line-a" /><i className="route-line line-b" /><i className="route-line line-c" /><b className="route-point point-a">A</b><b className="route-point point-b">B</b><b className="route-point point-c">C</b><span className="route-coordinate">35° 09′ 31″ N<br />129° 09′ 38″ E</span></div>
          <div className="route-copy"><span>MAKE IT YOURS</span><h3>{t.routeTitle[0]}<br />{t.routeTitle[1]}</h3><p>{t.routeBody}</p><button type="button">{t.routeButton} <b>↗</b></button></div>
        </section>
      </main>

      <footer className="sample-footer">
        <div className="sample-brand"><span className="sample-mark"><i /><i /><i /></span><b>FIELD NOTES</b></div>
        <p>{t.footer[0]}<br />{t.footer[1]}</p>
        <div><a href="#live-site">Instagram</a><a href="#live-site">{t.archive}</a><a href="#live-site">{t.contact}</a></div>
        <span>© 2026 · WALK LIGHTLY</span>
      </footer>
    </section>
  );
}

export function StyleLab() {
  const [selection, setSelection] = useState<Selection>(defaultSelection);
  const [activeAxis, setActiveAxis] = useState<AxisKey | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [notice, setNotice] = useState("");
  const [presetFilter, setPresetFilter] = useState("All");
  const [ready, setReady] = useState(false);
  const mixerRef = useRef<HTMLElement>(null);
  const t = labCopy[language];

  const currentPreset = useMemo(() => presets.find((preset) => sameSelection(preset.selection, selection)), [selection]);
  const filters = ["All", ...Array.from(new Set(presets.map((preset) => preset.category)))];
  const visiblePresets = presetFilter === "All" ? presets : presets.filter((preset) => preset.category === presetFilter);

  useEffect(() => {
    const fromHash = parseHash(window.location.hash);
    let initialSelection = fromHash;
    let initialLanguage: Language | null = null;

    try {
      if (!initialSelection) {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) initialSelection = normalizeSelection({ ...defaultSelection, ...JSON.parse(saved) });
      }
      const savedLanguage = window.localStorage.getItem(languageKey);
      if (savedLanguage === "en" || savedLanguage === "ko") initialLanguage = savedLanguage;
    } catch {
      // The lab still works when browser storage is unavailable.
    }

    const timeoutId = window.setTimeout(() => {
      if (initialSelection) setSelection(initialSelection);
      if (initialLanguage) setLanguage(initialLanguage);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const hash = new URLSearchParams(selection).toString();
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(selection));
    } catch {
      // Ignore storage failures.
    }
  }, [ready, selection]);

  useEffect(() => {
    if (!ready) return;
    function applyHashSelection() {
      const fromHash = parseHash(window.location.hash);
      if (!fromHash) return;
      setSelection((current) => sameSelection(current, fromHash) ? current : fromHash);
    }
    window.addEventListener("hashchange", applyHashSelection);
    return () => window.removeEventListener("hashchange", applyHashSelection);
  }, [ready]);

  useEffect(() => {
    document.documentElement.lang = language;
    if (!ready) return;
    try {
      window.localStorage.setItem(languageKey, language);
    } catch {
      // Ignore storage failures.
    }
  }, [language, ready]);

  useEffect(() => {
    if (!activeAxis) return;
    function closeOnOutsideClick(event: PointerEvent) {
      if (!mixerRef.current?.contains(event.target as Node)) setActiveAxis(null);
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [activeAxis]);

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, select, textarea, button")) return;
      if (event.key.toLowerCase() === "r") randomize();
      if (event.key === "Escape") setActiveAxis(null);
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const currentIndex = currentPreset ? presets.indexOf(currentPreset) : -1;
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (currentIndex + direction + presets.length) % presets.length;
        setSelection(normalizeSelection(presets[next].selection));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function update(axis: AxisKey, value: string) {
    setSelection((current) => {
      if (axis === "aesthetic") return recommendedSelection(value);
      if (!isOptionAllowed(current, axis, value)) return current;
      return { ...current, [axis]: value };
    });

    if (axis === "aesthetic") {
      setNotice(t.applied);
      window.setTimeout(() => setNotice(""), 1800);
    }
  }

  function randomize() {
    const aesthetics = axes.aesthetic;
    const aesthetic = aesthetics[Math.floor(Math.random() * aesthetics.length)].id;
    const next = recommendedSelection(aesthetic);

    for (const axis of axisKeys) {
      if (axis === "aesthetic") continue;
      const options = axes[axis].filter((option) => isOptionAllowed(next, axis, option.id));
      next[axis] = options[Math.floor(Math.random() * options.length)].id;
    }
    setSelection(next);
    setNotice(t.randomized);
    window.setTimeout(() => setNotice(""), 1600);
  }

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice(t.copied);
    } catch {
      setNotice(t.copyFallback);
    }
    window.setTimeout(() => setNotice(""), 1800);
  }

  function choosePreset(nextSelection: Selection) {
    setSelection(normalizeSelection(nextSelection));
    setActiveAxis(null);
    document.getElementById("live-site")?.scrollIntoView({ behavior: "smooth" });
  }

  const aestheticName = language === "en" ? getOption("aesthetic", selection.aesthetic).en : getOption("aesthetic", selection.aesthetic).ko;

  return (
    <main className="lab-shell" data-language={language}>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={t.home}><span>UI</span><b>LANGUAGE LAB</b></a>
        <p>{t.tagline}</p>
        <div className="header-actions">
          <nav aria-label={t.pageNav}><a href="#mixer">MIXER</a><a href="#presets">PRESETS</a><a href="https://github.com/Tangerooo/ui-style-lab" target="_blank" rel="noreferrer">GITHUB ↗</a></nav>
          <button className="language-toggle" type="button" onClick={() => setLanguage((current) => current === "en" ? "ko" : "en")} aria-label={t.switchLanguage} title={t.switchLanguage}><span aria-hidden="true">◎</span><b>{language === "en" ? "EN" : "한"}</b></button>
        </div>
      </header>

      <section className="intro" id="top">
        <div className="intro-kicker"><span>{t.introKicker}</span><i />2026</div>
        <h1>{t.title[0]}<br /><em>{t.title[1]}</em></h1>
        <div className="intro-side"><p>{t.intro}</p><a className="explore-cta" href="#live-site"><span>↓</span><b>{t.explore}</b></a><div className="intro-count"><strong>{combinationCount().toLocaleString("en-US")}</strong><span>{t.count}</span></div></div>
      </section>

      <div className="mixer-anchor" id="mixer">
        <section className="floating-mixer" aria-label={t.mixer} ref={mixerRef}>
          <div className="mixer-status"><span className="status-dot" /><div><small>LIVE COMBINATION</small><b>{currentPreset?.name ?? "Custom mix"}</b></div></div>
          <div className="axis-controls">
            {axisKeys.map((axis) => {
              const option = getOption(axis, selection[axis]);
              return (
                <button type="button" key={axis} className={activeAxis === axis ? "active" : ""} aria-expanded={activeAxis === axis} onClick={() => setActiveAxis((current) => current === axis ? null : axis)}>
                  <small>{language === "en" ? axisMeta[axis].en : axisMeta[axis].ko}</small><b>{language === "en" ? option.en : option.ko}</b><span>⌄</span>
                </button>
              );
            })}
          </div>
          <div className="mixer-actions"><button type="button" onClick={randomize} aria-label={t.random}><span>↝</span><b>Shuffle</b><kbd>R</kbd></button><button type="button" onClick={share} aria-label={t.share}><span>↗</span><b>Share</b></button></div>

          {activeAxis && (
            <div className="mixer-popover" role="dialog" aria-label={language === "en" ? axisMeta[activeAxis].en : axisMeta[activeAxis].ko}>
              <header><div><span>{axisMeta[activeAxis].index}</span><b>{language === "en" ? axisMeta[activeAxis].en : axisMeta[activeAxis].ko}</b><small>{language === "en" ? axisMeta[activeAxis].ko : axisMeta[activeAxis].en}</small></div><button type="button" onClick={() => setActiveAxis(null)} aria-label={t.close}>×</button></header>
              {activeAxis !== "aesthetic" && <p className="compatibility-note"><b>{aestheticName}</b> · {t.compat(aestheticName)}</p>}
              <div className="popover-options">
                {axes[activeAxis].map((option) => {
                  const selected = selection[activeAxis] === option.id;
                  const allowed = isOptionAllowed(selection, activeAxis, option.id);
                  const name = language === "en" ? option.en : option.ko;
                  const note = allowed ? getOptionNote(activeAxis, option.id, language) : t.incompatible(aestheticName);
                  return (
                    <button type="button" className={`${selected ? "selected" : ""}${allowed ? "" : " incompatible"}`} disabled={!allowed} key={option.id} onClick={() => update(activeAxis, option.id)} title={allowed ? note : t.unavailable(aestheticName)}>
                      <i /><span><b>{name}</b><small>{language === "ko" ? `${option.en} · ` : ""}{note}</small></span><em>{selected ? "●" : allowed ? "○" : "×"}</em>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="canvas-label"><span>{t.canvas}</span><b>{axisKeys.map((axis) => language === "en" ? getOption(axis, selection[axis]).en : getOption(axis, selection[axis]).ko).join(" × ")}</b></div>
      <FieldNotesSite selection={selection} language={language} />

      <section className="preset-section" id="presets">
        <header><div><span>{t.presetKicker}</span><h2>{t.presetTitle[0]}<br />{t.presetTitle[1]}</h2></div><p>{t.presetIntro}</p></header>
        <div className="preset-filters" aria-label={t.filters}>{filters.map((filter) => <button className={presetFilter === filter ? "active" : ""} type="button" key={filter} onClick={() => setPresetFilter(filter)}>{filter === "All" ? t.all : filter}</button>)}</div>
        <div className="preset-grid">
          {visiblePresets.map((preset, index) => (
            <button className="preset-card" type="button" key={preset.id} onClick={() => choosePreset(preset.selection)}>
              <div className="preset-mini" data-aesthetic={preset.selection.aesthetic} data-surface={preset.selection.surface} data-palette={preset.selection.palette}><span className="mini-nav"><i /><b /><b /></span><span className="mini-hero"><strong /><em /></span><span className="mini-grid"><i /><i /><i /></span></div>
              <div className="preset-copy"><span>{(index + 1).toString().padStart(2, "0")} · {preset.category}</span><h3>{preset.name}</h3><p>{language === "en" ? presetLabelsEn[preset.id] : preset.label}</p></div><span className="preset-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="lab-footer"><div className="wordmark"><span>UI</span><b>LANGUAGE LAB</b></div><p>{t.footer}</p><a href="#top">{t.back}</a></footer>
      <div className="toast" aria-live="polite" data-visible={Boolean(notice)}>{notice}</div>
    </main>
  );
}
