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

import type { Selection } from "../style-data";

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

type ChartCopy = {
  title: readonly string[];
  intro: string;
  areaTitle: string;
  areaAria: string;
  barTitle: string;
  barAria: string;
  regions: string;
  source: string;
  walks: string;
  daylight: string;
  calm: string;
  vivid: string;
};

type ChartMicrocopy = {
  dataKicker: string;
  cadence: string;
  character: string;
  months: readonly string[];
  conditions: readonly string[];
};

type FieldDataChartsProps = {
  selection: Selection;
  copy: ChartCopy;
  microcopy: ChartMicrocopy;
  microLanguage: "en" | "ko";
  bilingual: boolean;
  englishTitle: string;
  englishIntro: string;
};

function EnglishCompanion({ children, visible }: { children: string; visible: boolean }) {
  if (!visible) return null;
  return <span className="english-companion" lang="en">{children}</span>;
}

export function DashboardAreaChart({ animate }: { animate: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <AreaChart data={seasonalWalks} margin={{ top: 12, right: 8, left: -32, bottom: 0 }} accessibilityLayer>
        <CartesianGrid stroke="var(--site-line)" vertical={false} />
        <XAxis dataKey="month" hide />
        <YAxis hide />
        <Area type="monotone" dataKey="walks" stroke="var(--site-accent)" strokeWidth={3} fill="var(--site-accent-2)" isAnimationActive={animate} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FieldDataCharts({
  selection,
  copy: t,
  microcopy: micro,
  microLanguage,
  bilingual,
  englishTitle,
  englishIntro,
}: FieldDataChartsProps) {
  const walks = seasonalWalks.map((entry, index) => ({ ...entry, label: micro.months[index] }));
  const conditions = routeConditions.map((entry, index) => ({ ...entry, label: micro.conditions[index] }));
  const angular = ["brutalist", "swiss", "terminal", "cyberpunk"].includes(selection.aesthetic);
  const curve = angular ? "stepAfter" as const : "monotone" as const;
  const barRadius: [number, number, number, number] = angular ? [0, 0, 0, 0] : [8, 8, 0, 0];
  const animate = selection.motion !== "quiet";
  const duration = selection.motion === "productive" ? 280 : selection.motion === "kinetic" ? 1100 : selection.motion === "spring" ? 900 : selection.motion === "staged" ? 720 : 480;
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
        <div><span lang={microLanguage}>{micro.dataKicker}</span><h3 id="field-data-title">{t.title[0]}<br /><span className={bilingual ? "english-display-line" : undefined} lang={bilingual ? "en" : undefined}>{bilingual ? englishTitle : t.title[1]}</span></h3></div>
        <p>{t.intro}<EnglishCompanion visible={bilingual}>{englishIntro}</EnglishCompanion></p>
      </header>
      <div className="data-grid">
        <article className="data-chart sample-surface">
          <div className="data-chart-heading"><div><span lang={microLanguage}>{micro.cadence}</span><h4>{t.areaTitle}</h4></div><b lang="en">+18.4%</b></div>
          <div className="chart-wrap" role="img" aria-label={t.areaAria}>
            <ResponsiveContainer width="100%" height={330}>
              <AreaChart data={walks} margin={{ top: 20, right: 10, left: -25, bottom: 0 }} accessibilityLayer>
                <defs><linearGradient id="walkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--site-accent)" stopOpacity={0.62} /><stop offset="100%" stopColor="var(--site-accent)" stopOpacity={0.03} /></linearGradient></defs>
                <CartesianGrid stroke="var(--site-line)" strokeDasharray={angular ? "0" : "3 7"} vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontFamily: "var(--site-metric-font)", fontSize: 9 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontFamily: "var(--site-metric-font)", fontSize: 9 }} />
                <Tooltip contentStyle={chartTooltip} cursor={{ stroke: "var(--site-accent-3)", strokeWidth: 1 }} />
                <Area type={curve} dataKey="walks" name={t.walks} stroke="var(--site-accent)" strokeWidth={angular ? 3.5 : 2.5} fill="url(#walkFill)" isAnimationActive={animate} animationDuration={duration} />
                <Area type={curve} dataKey="daylight" name={t.daylight} stroke="var(--site-accent-3)" strokeWidth={1.5} fill="transparent" strokeDasharray="5 5" isAnimationActive={animate} animationDuration={duration + 180} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="data-chart sample-surface">
          <div className="data-chart-heading"><div><span lang={microLanguage}>{micro.character}</span><h4>{t.barTitle}</h4></div><b>{t.regions}</b></div>
          <div className="chart-wrap" role="img" aria-label={t.barAria}>
            <ResponsiveContainer width="100%" height={330}>
              <BarChart data={conditions} margin={{ top: 20, right: 0, left: -25, bottom: 0 }} accessibilityLayer>
                <CartesianGrid stroke="var(--site-line)" strokeDasharray={angular ? "0" : "3 7"} vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontFamily: "var(--site-metric-font)", fontSize: 8 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--site-muted)", fontFamily: "var(--site-metric-font)", fontSize: 9 }} />
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
