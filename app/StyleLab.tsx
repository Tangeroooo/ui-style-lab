"use client";

import { useEffect, useMemo, useState } from "react";
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
  presets,
  type AxisKey,
  type Selection,
} from "./style-data";

const storageKey = "ui-language-lab-selection";

function sameSelection(a: Selection, b: Selection) {
  return axisKeys.every((axis) => a[axis] === b[axis]);
}

function parseHash(hash: string): Selection | null {
  if (!hash) return null;
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const next = { ...defaultSelection };
  let matched = false;

  for (const axis of axisKeys) {
    const value = params.get(axis);
    if (value && axes[axis].some((option) => option.id === value)) {
      next[axis] = value;
      matched = true;
    }
  }

  return matched ? next : null;
}

const guideStories = [
  {
    number: "01",
    region: "JEJU · VOLCANIC COAST",
    title: "바람이 만든 가장자리",
    copy: "검은 현무암과 낮은 돌담 사이, 섬의 속도를 따라 걷는 이틀의 기록.",
    tone: "ember",
  },
  {
    number: "02",
    region: "GANGWON · PINE FOREST",
    title: "오래된 숲의 방향",
    copy: "이른 안개가 걷히기 전 시작하는 능선과 소나무 숲의 작은 안내서.",
    tone: "moss",
  },
  {
    number: "03",
    region: "TONGYEONG · ISLAND PATH",
    title: "섬과 섬 사이의 오후",
    copy: "배 시간과 물때, 천천히 이어지는 남쪽 바다의 하루를 채집했습니다.",
    tone: "tide",
  },
];

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

function FieldDataCharts({ selection }: { selection: Selection }) {
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
        <div><span>FIELD DATA · LIVE CHARTS</span><h3 id="field-data-title">풍경에도 읽을 수 있는<br />리듬이 있습니다.</h3></div>
        <p>계절별 걷기 기록과 지역별 감각 데이터를 함께 비교합니다. 현재 visual language는 graph의 형태와 움직임에도 이어집니다.</p>
      </header>
      <div className="data-grid">
        <article className="data-chart sample-surface">
          <div className="data-chart-heading"><div><span>WALKING CADENCE</span><h4>Seasonal field walks</h4></div><b>+18.4%</b></div>
          <div className="chart-wrap" aria-label="3월부터 10월까지의 걷기 기록 면적 그래프">
            <ResponsiveContainer width="100%" height={330}>
              <AreaChart data={seasonalWalks} margin={{ top: 20, right: 10, left: -25, bottom: 0 }} accessibilityLayer>
                <defs>
                  <linearGradient id="walkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--site-accent)" stopOpacity={0.62} />
                    <stop offset="100%" stopColor="var(--site-accent)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--site-line)" strokeDasharray={angular ? "0" : "3 7"} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontSize: 9 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontSize: 9 }} />
                <Tooltip contentStyle={chartTooltip} cursor={{ stroke: "var(--site-accent-3)", strokeWidth: 1 }} />
                <Area type={curve} dataKey="walks" name="Field walks" stroke="var(--site-accent)" strokeWidth={angular ? 3.5 : 2.5} fill="url(#walkFill)" isAnimationActive={animate} animationDuration={duration} />
                <Area type={curve} dataKey="daylight" name="Daylight index" stroke="var(--site-accent-3)" strokeWidth={1.5} fill="transparent" strokeDasharray="5 5" isAnimationActive={animate} animationDuration={duration + 180} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="data-chart sample-surface">
          <div className="data-chart-heading"><div><span>ROUTE CHARACTER</span><h4>Calm / vivid balance</h4></div><b>05 REGIONS</b></div>
          <div className="chart-wrap" aria-label="다섯 지역의 고요함과 생동감 비교 막대 그래프">
            <ResponsiveContainer width="100%" height={330}>
              <BarChart data={routeConditions} margin={{ top: 20, right: 0, left: -25, bottom: 0 }} accessibilityLayer>
                <CartesianGrid stroke="var(--site-line)" strokeDasharray={angular ? "0" : "3 7"} vertical={false} />
                <XAxis dataKey="condition" axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontSize: 8 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontSize: 9 }} />
                <Tooltip contentStyle={chartTooltip} cursor={{ fill: "color-mix(in srgb, var(--site-accent) 8%, transparent)" }} />
                <Bar dataKey="calm" name="Calm" fill="var(--site-accent)" radius={barRadius} isAnimationActive={animate} animationDuration={duration} />
                <Bar dataKey="vivid" name="Vivid" fill="var(--site-accent-3)" radius={barRadius} isAnimationActive={animate} animationDuration={duration + 180} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend"><span><i />Calm</span><span><i />Vivid</span><p>Source · Field Notes collective / 2026</p></div>
        </article>
      </div>
    </section>
  );
}

function FieldNotesSite({ selection }: { selection: Selection }) {
  const aesthetic = getOption("aesthetic", selection.aesthetic);
  const surface = getOption("surface", selection.surface);

  return (
    <section
      className="live-site"
      id="live-site"
      data-aesthetic={selection.aesthetic}
      data-surface={selection.surface}
      data-layout={selection.layout}
      data-type={selection.type}
      data-palette={selection.palette}
      data-motion={selection.motion}
      aria-label={`${aesthetic.ko}, ${surface.ko} 조합으로 표현한 전체 웹사이트 예시`}
    >
      <div className="sample-noise" aria-hidden="true" />
      <header className="sample-nav sample-surface">
        <a href="#live-site" className="sample-brand" aria-label="Field Notes 홈">
          <span className="sample-mark"><i /><i /><i /></span>
          <b>FIELD NOTES</b>
        </a>
        <nav aria-label="예시 사이트 메뉴">
          <a href="#sample-story">Story</a>
          <a href="#sample-guides">Guides</a>
          <a href="#sample-route">Route</a>
        </nav>
        <button type="button" className="sample-nav-cta">Plan a walk <span>↗</span></button>
      </header>

      <main className="sample-main">
        <section className="sample-hero">
          <div className="hero-copy">
            <div className="sample-eyebrow"><span>EDITION NO. 07</span><i /><span>37.5665° N · 126.9780° E</span></div>
            <h2><span>Closer to</span><em>the living world.</em></h2>
            <p>익숙한 도시에서 반나절만 벗어나도 풍경의 해상도는 달라집니다. 걷고, 머물고, 기록하는 사람을 위한 느린 여행 아카이브.</p>
            <div className="hero-actions">
              <button type="button">EXPLORE THE EDITION <span>↗</span></button>
              <a href="#sample-story"><i>↓</i> Read the field note</a>
            </div>
          </div>

          <div className="hero-landscape sample-surface" aria-label="산과 해를 추상화한 그래픽">
            <div className="landscape-sun" />
            <div className="landscape-orbit orbit-one" />
            <div className="landscape-orbit orbit-two" />
            <div className="landscape-ridge ridge-back" />
            <div className="landscape-ridge ridge-front" />
            <div className="landscape-path" />
            <div className="landscape-stamp"><span>FIELD LOG</span><b>07</b><small>SUMMER / 2026</small></div>
            <p>THE EASTERN RIDGE<br />BEFORE FIRST LIGHT</p>
          </div>
        </section>

        <section className="sample-index" aria-label="이번 호 정보">
          <div><span>01 / DISTANCE</span><strong>42.7<small>km</small></strong><p>천천히 걸을수록 길어지는 거리</p></div>
          <div><span>02 / FIELD GUIDES</span><strong>12<small>stories</small></strong><p>지역의 생활자가 보낸 기록</p></div>
          <div><span>03 / SEASONS</span><strong>04<small>ways</small></strong><p>같은 길을 다시 걷는 이유</p></div>
          <div className="index-note"><span>NOW COLLECTING</span><p>당신이 오래 기억하는<br />하나의 풍경을 보내주세요.</p><a href="#sample-route">CONTRIBUTE ↗</a></div>
        </section>

        <FieldDataCharts selection={selection} />

        <section className="sample-story" id="sample-story">
          <div className="story-heading">
            <span>FIELD ESSAY · 01</span>
            <h3>길은 목적지가 아니라<br /><em>감각을 회복하는 방식.</em></h3>
          </div>
          <div className="story-body">
            <p className="story-lead">우리는 더 빠른 경로 대신 오래 머물 수 있는 지점을 표시합니다. 이름 없는 벤치, 오후 네 시의 그림자, 비 온 뒤 짙어지는 흙 냄새처럼 지도에 남지 않는 것들입니다.</p>
            <div className="story-columns">
              <p>좋은 안내서는 모든 것을 설명하지 않습니다. 방향을 잃지 않을 만큼의 좌표와, 각자의 감각으로 채울 여백만 남깁니다.</p>
              <p>이번 호에는 바다에서 숲으로 이어지는 세 개의 길과 그 곁에서 살아가는 사람들의 목소리를 담았습니다.</p>
            </div>
            <blockquote><i>“</i><p>Leave enough room<br />for the place to answer.</p><cite>— Field principle No. 03</cite></blockquote>
          </div>
        </section>

        <section className="sample-guides" id="sample-guides">
          <header>
            <div><span>SELECTED FIELD GUIDES</span><h3>이번 계절의 세 방향</h3></div>
            <p>장소를 소비하는 대신 이해하기 위한 작은 단서들.</p>
          </header>
          <div className="guide-grid">
            {guideStories.map((story) => (
              <article className={`guide-card sample-surface ${story.tone}`} key={story.number}>
                <div className="guide-art" aria-hidden="true"><i /><i /><i /><span>{story.number}</span></div>
                <div className="guide-copy">
                  <span>{story.region}</span>
                  <h4>{story.title}</h4>
                  <p>{story.copy}</p>
                  <a href="#sample-route" aria-label={`${story.title} 읽기`}>OPEN GUIDE <b>↗</b></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sample-route sample-surface" id="sample-route">
          <div className="route-map" aria-hidden="true">
            <i className="route-line line-a" /><i className="route-line line-b" /><i className="route-line line-c" />
            <b className="route-point point-a">A</b><b className="route-point point-b">B</b><b className="route-point point-c">C</b>
            <span className="route-coordinate">35° 09′ 31″ N<br />129° 09′ 38″ E</span>
          </div>
          <div className="route-copy">
            <span>MAKE IT YOURS</span>
            <h3>한 번의 주말,<br />하나의 좋은 경로.</h3>
            <p>걷는 속도와 머무는 시간을 고르면 Field Notes가 당신만의 작은 여정을 구성합니다.</p>
            <button type="button">BUILD MY ROUTE <b>↗</b></button>
          </div>
        </section>
      </main>

      <footer className="sample-footer">
        <div className="sample-brand"><span className="sample-mark"><i /><i /><i /></span><b>FIELD NOTES</b></div>
        <p>Independent guides for curious walkers.<br />Published slowly in Seoul.</p>
        <div><a href="#live-site">Instagram</a><a href="#live-site">Archive</a><a href="#live-site">Contact</a></div>
        <span>© 2026 · WALK LIGHTLY</span>
      </footer>
    </section>
  );
}

export function StyleLab() {
  const [selection, setSelection] = useState<Selection>(defaultSelection);
  const [activeAxis, setActiveAxis] = useState<AxisKey | null>(null);
  const [notice, setNotice] = useState("");
  const [presetFilter, setPresetFilter] = useState("All");

  const currentPreset = useMemo(
    () => presets.find((preset) => sameSelection(preset.selection, selection)),
    [selection],
  );
  const filters = ["All", ...Array.from(new Set(presets.map((preset) => preset.category)))];
  const visiblePresets = presetFilter === "All" ? presets : presets.filter((preset) => preset.category === presetFilter);

  useEffect(() => {
    const fromHash = parseHash(window.location.hash);
    let initialSelection = fromHash;

    try {
      if (!initialSelection) {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) initialSelection = { ...defaultSelection, ...JSON.parse(saved) };
      }
    } catch {
      // The lab still works when browser storage is unavailable.
    }

    if (!initialSelection) return;
    const timeoutId = window.setTimeout(() => setSelection(initialSelection as Selection), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const hash = new URLSearchParams(selection).toString();
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(selection));
    } catch {
      // Ignore storage failures.
    }
  }, [selection]);

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
        setSelection(presets[next].selection);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function update(axis: AxisKey, value: string) {
    setSelection((current) => ({ ...current, [axis]: value }));
  }

  function randomize() {
    const next = { ...selection };
    for (const axis of axisKeys) {
      const options = axes[axis];
      next[axis] = options[Math.floor(Math.random() * options.length)].id;
    }
    setSelection(next);
    setNotice("새로운 조합을 만들었습니다.");
    window.setTimeout(() => setNotice(""), 1600);
  }

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("조합 링크를 복사했습니다.");
    } catch {
      setNotice("주소창의 URL을 복사해 공유하세요.");
    }
    window.setTimeout(() => setNotice(""), 1800);
  }

  function choosePreset(nextSelection: Selection) {
    setSelection(nextSelection);
    setActiveAxis(null);
    document.getElementById("live-site")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="lab-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="UI Language Lab 홈"><span>UI</span><b>LANGUAGE LAB</b></a>
        <p>Design the layers. See the whole page.</p>
        <nav aria-label="페이지 바로가기"><a href="#mixer">MIXER</a><a href="#presets">PRESETS</a><a href="https://github.com/Tangerooo/ui-style-lab" target="_blank" rel="noreferrer">GITHUB ↗</a></nav>
      </header>

      <section className="intro" id="top">
        <div className="intro-kicker"><span>INTERACTIVE UI REFERENCE</span><i />2026</div>
        <h1>UI 시스템을 조합하고<br /><em>실제 페이지</em>에서 확인하세요.</h1>
        <div className="intro-side">
          <p>하나의 디자인을 Aesthetic, Surface, Layout, Typography, Palette, Motion의 여섯 층위로 분해해 직접 조합하는 interactive reference.</p>
          <div><strong>{combinationCount().toLocaleString("en-US")}</strong><span>가능한 조합</span></div>
        </div>
      </section>

      <div className="mixer-anchor" id="mixer">
        <section className="floating-mixer" aria-label="디자인 조합 믹서">
          <div className="mixer-status">
            <span className="status-dot" />
            <div><small>LIVE COMBINATION</small><b>{currentPreset?.name ?? "Custom mix"}</b></div>
          </div>
          <div className="axis-controls">
            {axisKeys.map((axis) => (
              <button
                type="button"
                key={axis}
                className={activeAxis === axis ? "active" : ""}
                aria-expanded={activeAxis === axis}
                onClick={() => setActiveAxis((current) => current === axis ? null : axis)}
              >
                <small>{axisMeta[axis].en}</small>
                <b>{getOption(axis, selection[axis]).en}</b>
                <span>⌄</span>
              </button>
            ))}
          </div>
          <div className="mixer-actions">
            <button type="button" onClick={randomize} aria-label="무작위 조합"><span>↝</span><b>Shuffle</b><kbd>R</kbd></button>
            <button type="button" onClick={share} aria-label="현재 조합 링크 복사"><span>↗</span><b>Share</b></button>
          </div>

          {activeAxis && (
            <div className="mixer-popover">
              <header><div><span>{axisMeta[activeAxis].index}</span><b>{axisMeta[activeAxis].ko}</b><small>{axisMeta[activeAxis].en}</small></div><button type="button" onClick={() => setActiveAxis(null)} aria-label="선택창 닫기">×</button></header>
              <div className="popover-options">
                {axes[activeAxis].map((option) => (
                  <button
                    type="button"
                    className={selection[activeAxis] === option.id ? "selected" : ""}
                    key={option.id}
                    onClick={() => update(activeAxis, option.id)}
                  >
                    <i />
                    <span><b>{option.ko}</b><small>{option.en} · {option.note}</small></span>
                    <em>{selection[activeAxis] === option.id ? "●" : "○"}</em>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="canvas-label"><span>FULL-PAGE LIVE CANVAS</span><b>{axisKeys.map((axis) => getOption(axis, selection[axis]).en).join(" × ")}</b></div>
      <FieldNotesSite selection={selection} />

      <section className="preset-section" id="presets">
        <header><div><span>CURATED STARTING POINTS · 18</span><h2>페이지의 분위기를<br />한 번에 전환하세요.</h2></div><p>각 preset은 같은 Field Notes 콘텐츠에 서로 다른 visual system을 적용합니다. 선택한 뒤 floating mixer에서 한 층씩 바꿔 보세요.</p></header>
        <div className="preset-filters" aria-label="프리셋 필터">
          {filters.map((filter) => <button className={presetFilter === filter ? "active" : ""} type="button" key={filter} onClick={() => setPresetFilter(filter)}>{filter}</button>)}
        </div>
        <div className="preset-grid">
          {visiblePresets.map((preset, index) => (
            <button className="preset-card" type="button" key={preset.id} onClick={() => choosePreset(preset.selection)}>
              <div className="preset-mini" data-aesthetic={preset.selection.aesthetic} data-surface={preset.selection.surface} data-palette={preset.selection.palette}>
                <span className="mini-nav"><i /><b /><b /></span>
                <span className="mini-hero"><strong /><em /></span>
                <span className="mini-grid"><i /><i /><i /></span>
              </div>
              <div className="preset-copy"><span>{(index + 1).toString().padStart(2, "0")} · {preset.category}</span><h3>{preset.name}</h3><p>{preset.label}</p></div>
              <span className="preset-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="lab-footer"><div className="wordmark"><span>UI</span><b>LANGUAGE LAB</b></div><p>Mix the system. Experience the page.</p><a href="#top">BACK TO TOP ↑</a></footer>
      <div className="toast" aria-live="polite" data-visible={Boolean(notice)}>{notice}</div>
    </main>
  );
}
