"use client";

import { useEffect, useMemo, useState } from "react";
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

function MetricCard({
  label,
  value,
  delta,
  icon,
  bars,
}: {
  label: string;
  value: string;
  delta: string;
  icon: string;
  bars: number[];
}) {
  return (
    <article className="metric-card surface">
      <div className="metric-card-top">
        <span className="metric-icon" aria-hidden="true">{icon}</span>
        <span className="metric-delta">{delta}</span>
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <div className="spark-bars" aria-hidden="true">
        {bars.map((bar, index) => (
          <i key={index} style={{ height: `${bar}%` }} />
        ))}
      </div>
    </article>
  );
}

function LineChart() {
  const points = [68, 55, 60, 40, 48, 27, 34, 14];

  return (
    <div className="line-chart" aria-label="주간 활성 사용자 증가 추이">
      <div className="chart-grid" aria-hidden="true" />
      <div className="chart-fill" aria-hidden="true" />
      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        const width = 100 / (points.length - 1);
        const delta = next - point;
        const length = Math.sqrt(width * width + delta * delta);
        const angle = Math.atan2(delta, width) * (180 / Math.PI);
        return (
          <i
            className="line-segment"
            key={index}
            style={{
              left: `${index * width}%`,
              top: `${point}%`,
              width: `${length}%`,
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}
      {points.map((point, index) => (
        <b
          className="line-point"
          key={index}
          style={{ left: `${index * (100 / (points.length - 1))}%`, top: `${point}%` }}
        />
      ))}
      <div className="chart-labels" aria-hidden="true">
        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span>
        <span>FRI</span><span>SAT</span><span>SUN</span>
      </div>
    </div>
  );
}

function DashboardPreview({ selection }: { selection: Selection }) {
  const aesthetic = getOption("aesthetic", selection.aesthetic);
  const surface = getOption("surface", selection.surface);

  return (
    <section
      className="preview-frame"
      data-aesthetic={selection.aesthetic}
      data-surface={selection.surface}
      data-layout={selection.layout}
      data-type={selection.type}
      data-palette={selection.palette}
      data-motion={selection.motion}
      aria-label={`${aesthetic.ko}, ${surface.ko} 조합 미리보기`}
    >
      <div className="scene-shape shape-one" aria-hidden="true" />
      <div className="scene-shape shape-two" aria-hidden="true" />
      <div className="scene-shape shape-three" aria-hidden="true" />

      <div className="dashboard-shell surface">
        <header className="dash-topbar">
          <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
          <div className="dash-brand"><span>UL</span> PULSEBOARD</div>
          <div className="dash-actions">
            <button type="button" aria-label="검색">⌕</button>
            <button className="primary-mini" type="button">EXPORT ↗</button>
          </div>
        </header>

        <aside className="dash-sidebar">
          <div className="side-mark">UL</div>
          <nav aria-label="대시보드 메뉴">
            {["⌂", "▦", "⌁", "◔", "◎", "⚙"].map((icon, index) => (
              <button className={index === 0 ? "active" : ""} type="button" key={icon} aria-label={`메뉴 ${index + 1}`}>
                <span aria-hidden="true">{icon}</span><em>{["Overview", "Signals", "Flow", "Audience", "Goals", "Settings"][index]}</em>
              </button>
            ))}
          </nav>
          <div className="side-profile surface"><span>TK</span><div><b>Tangerooo</b><small>Design explorer</small></div></div>
        </aside>

        <main className="dash-content">
          <div className="dash-heading">
            <div><p>WEEK 32 · LIVE VIEW</p><h2>Product pulse</h2></div>
            <div className="date-chip surface"><span>Aug 01</span><b>—</b><span>Aug 06</span></div>
          </div>

          <div className="dashboard-grid">
            <div className="metric-row">
              <MetricCard label="Active users" value="12,540" delta="+18.2%" icon="↗" bars={[30, 42, 38, 55, 62, 56, 75]} />
              <MetricCard label="Conversion" value="23.8%" delta="+4.1%" icon="◇" bars={[28, 34, 48, 43, 58, 70, 82]} />
              <MetricCard label="Net revenue" value="$84.2K" delta="+12.6%" icon="$" bars={[24, 46, 40, 66, 59, 73, 88]} />
              <MetricCard label="Session time" value="4m 12s" delta="−0.8%" icon="◷" bars={[58, 52, 64, 48, 55, 60, 57]} />
            </div>

            <article className="main-chart surface">
              <div className="card-heading"><div><p>ACTIVE USERS</p><h3>Weekly momentum</h3></div><button type="button">7 DAYS⌄</button></div>
              <LineChart />
            </article>

            <article className="channel-card surface">
              <div className="card-heading"><div><p>ACQUISITION</p><h3>Top channels</h3></div><span>•••</span></div>
              <div className="bar-chart" aria-label="채널별 유입 막대 차트">
                {[44, 72, 53, 87, 66, 94].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
              </div>
              <div className="legend"><span><i />Direct</span><b>42%</b><span><i />Social</span><b>31%</b></div>
            </article>

            <article className="activity-card surface">
              <div className="card-heading"><div><p>RECENT EVENTS</p><h3>Activity stream</h3></div><span>LIVE</span></div>
              <div className="activity-table">
                {[
                  ["New workspace", "Tokyo", "+24"],
                  ["Campaign synced", "Seoul", "+18"],
                  ["Team upgraded", "Berlin", "+12"],
                  ["Report shared", "Paris", "+08"],
                ].map((row, index) => (
                  <div key={row[0]}><i>{index + 1}</i><span><b>{row[0]}</b><small>{row[1]} · {index + 2}m ago</small></span><em>{row[2]}</em></div>
                ))}
              </div>
            </article>

            <article className="retention-card surface">
              <div className="card-heading"><div><p>RETENTION</p><h3>Returning users</h3></div><span>•••</span></div>
              <div className="donut-row">
                <div className="donut"><span><b>74</b><small>%</small></span></div>
                <div className="donut-copy"><b>Strong signal</b><p>Returning visits are up by 8.4% this week.</p><button type="button">VIEW COHORT →</button></div>
              </div>
            </article>
          </div>
        </main>
      </div>
    </section>
  );
}

export function StyleLab() {
  const [selection, setSelection] = useState<Selection>(defaultSelection);
  const [activeAxis, setActiveAxis] = useState<AxisKey>("aesthetic");
  const [notice, setNotice] = useState("");
  const [presetFilter, setPresetFilter] = useState("All");

  const currentPreset = useMemo(
    () => presets.find((preset) => sameSelection(preset.selection, selection)),
    [selection],
  );

  const aesthetic = getOption("aesthetic", selection.aesthetic);
  const surface = getOption("surface", selection.surface);
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
      // A private browsing context may block local storage; the app still works.
    }

    if (!initialSelection) return;

    const timeoutId = window.setTimeout(() => {
      setSelection(initialSelection as Selection);
    }, 0);

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
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setNotice("조합 링크를 복사했습니다.");
    } catch {
      setNotice("주소창의 URL을 복사해 공유하세요.");
    }
    window.setTimeout(() => setNotice(""), 1800);
  }

  return (
    <main className="lab-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="UI Language Lab 홈"><span>UI</span><b>LANGUAGE LAB</b></a>
        <p>같은 구조, 다른 디자인 언어.</p>
        <nav aria-label="페이지 바로가기"><a href="#mixer">MIXER</a><a href="#presets">PRESETS</a><a href="https://github.com/Tangerooo/ui-style-lab" target="_blank" rel="noreferrer">GITHUB ↗</a></nav>
      </header>

      <section className="intro" id="top">
        <div className="intro-kicker"><span>INTERACTIVE REFERENCE</span><i />2026</div>
        <h1>디자인은 하나의<br /><em>스타일</em>이 아니라 조합이다.</h1>
        <div className="intro-side"><p>Aesthetic, Surface, Layout, Typography, Palette, Motion을 분리해서 같은 화면에 적용해 보세요.</p><div><strong>{combinationCount().toLocaleString("en-US")}</strong><span>가능한 조합</span></div></div>
      </section>

      <section className="mixer" id="mixer">
        <aside className="control-panel">
          <div className="panel-heading"><div><span>01</span><p>COMBINATION MIXER</p></div><button type="button" onClick={() => setSelection(defaultSelection)}>RESET</button></div>

          <div className="axis-tabs" role="tablist" aria-label="디자인 축 선택">
            {axisKeys.map((axis) => (
              <button role="tab" aria-selected={activeAxis === axis} type="button" key={axis} onClick={() => setActiveAxis(axis)}>
                <span>{axisMeta[axis].index}</span>{axisMeta[axis].ko}
              </button>
            ))}
          </div>

          <div className="axis-detail" role="tabpanel">
            <div className="axis-detail-head"><span>{axisMeta[activeAxis].en}</span><b>{axes[activeAxis].length.toString().padStart(2, "0")} OPTIONS</b></div>
            <div className="option-list">
              {axes[activeAxis].map((option) => (
                <button className={selection[activeAxis] === option.id ? "selected" : ""} type="button" key={option.id} onClick={() => update(activeAxis, option.id)}>
                  <i /><span><b>{option.ko}</b><small>{option.en} · {option.note}</small></span><em>{selection[activeAxis] === option.id ? "●" : "○"}</em>
                </button>
              ))}
            </div>
          </div>

          <div className="control-actions">
            <button className="random-button" type="button" onClick={randomize}><span>↝</span> RANDOMIZE <kbd>R</kbd></button>
            <button className="share-button" type="button" onClick={share}>SHARE LINK ↗</button>
          </div>
        </aside>

        <div className="preview-column">
          <header className="preview-heading">
            <div><span>LIVE COMBINATION</span><h2>{aesthetic.ko}</h2><p>{aesthetic.en} × {surface.en}</p></div>
            <div className="preview-number"><span>{currentPreset ? (presets.indexOf(currentPreset) + 1).toString().padStart(2, "0") : "∞"}</span><i />{presets.length.toString().padStart(2, "0")}</div>
          </header>
          <DashboardPreview selection={selection} />
          <div className="combination-dna">
            <span>COMBINATION DNA</span>
            <div>{axisKeys.map((axis) => <button type="button" onClick={() => setActiveAxis(axis)} key={axis}><small>{axisMeta[axis].en}</small><b>{getOption(axis, selection[axis]).en}</b></button>)}</div>
          </div>
        </div>
      </section>

      <section className="preset-section" id="presets">
        <header><div><span>02 / CURATED STARTING POINTS</span><h2>검증된 조합부터<br />시작해 보세요.</h2></div><p>Preset을 선택한 뒤 한 축씩 바꾸면 스타일이 어떤 층위에서 달라지는지 더 쉽게 관찰할 수 있습니다.</p></header>
        <div className="preset-filters" aria-label="프리셋 필터">{filters.map((filter) => <button className={presetFilter === filter ? "active" : ""} type="button" key={filter} onClick={() => setPresetFilter(filter)}>{filter}</button>)}</div>
        <div className="preset-grid">
          {visiblePresets.map((preset, index) => (
            <button className="preset-card" type="button" key={preset.id} onClick={() => { setSelection(preset.selection); document.getElementById("mixer")?.scrollIntoView({ behavior: "smooth" }); }}>
              <div className="preset-mini" data-aesthetic={preset.selection.aesthetic} data-surface={preset.selection.surface} data-palette={preset.selection.palette}>
                <i /><span><b /><b /><b /></span><em /><em />
              </div>
              <div className="preset-copy"><span>{(index + 1).toString().padStart(2, "0")} · {preset.category}</span><h3>{preset.name}</h3><p>{preset.label}</p></div>
              <span className="preset-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <footer><div className="wordmark"><span>UI</span><b>LANGUAGE LAB</b></div><p>Layer the language. Compare the result.</p><a href="#top">BACK TO TOP ↑</a></footer>
      <div className="toast" aria-live="polite" data-visible={Boolean(notice)}>{notice}</div>
    </main>
  );
}
