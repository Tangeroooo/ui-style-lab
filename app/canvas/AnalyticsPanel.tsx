import { useEffect, useId, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight } from "lucide-react";
import type { Language, Selection } from "../style-data";
import { usesBilingualCopy, type KoreanCopyMode } from "../url-state";
import { periods, periodSummary, routes, type Period } from "./field-data";

export function AnalyticsPanel({ language, selection, copyMode = "only" }: { language: Language; selection: Selection; copyMode?: KoreanCopyMode }) {
  const ko = language === "ko";
  const [period, setPeriod] = useState<Period>("month");
  const [reduced, setReduced] = useState(true);
  const uid = useId().replaceAll(":", "");
  useEffect(() => { const query = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setReduced(query.matches); update(); query.addEventListener("change", update); return () => query.removeEventListener("change", update); }, []);
  const summary = periodSummary(period);
  const weekdays = ko ? ["월", "화", "수", "목", "금", "토", "일"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = periods[period].values.map((walks, index) => ({ label: period === "week" ? weekdays[index] : ko ? `${index + 1}주` : `Week ${index + 1}`, walks }));
  return <section className="scene-primary analytics-panel" aria-label={ko ? "현장 운영 분석" : "Field operations analytics"}>
    <div className="scene-panel-heading"><div><span className="scene-eyebrow">{ko ? "현장 기록 · 예시 데이터" : "FIELD NOTES / SAMPLE DATA"}</span><h3>{ko ? "한 걸음씩, 더 멀리." : "Small steps. Wider horizons."}{usesBilingualCopy(language, copyMode) && <span className="studio-companion" lang="en">Small steps. Wider horizons.</span>}</h3><p>{ko ? "걷기 기록과 경로 현황을 한눈에 확인하세요." : "A clear picture of your walks and the routes ahead."}</p></div><label className="analytics-period">{ko ? "기간" : "Period"}<select value={period} onChange={(e) => setPeriod(e.target.value as Period)}>{Object.entries(periods).map(([id, p]) => <option key={id} value={id}>{p[language]}</option>)}</select></label></div>
    <div className="analytics-kpis" aria-live="polite"><article><span>{ko ? "걷기 기록" : "Recorded walks"}</span><strong>{summary.total}<small>{ko ? "회" : "walks"}</small></strong><p><ArrowUpRight aria-hidden="true" /> +{summary.change}% · {ko ? "이전 기간 대비" : "vs. previous period"}</p></article><article><span>{ko ? "열린 경로" : "Open routes"}</span><strong>{routes.filter((r) => r.status === "open").length}<small>/ {routes.length}</small></strong><p>{ko ? "현재 이용 가능한 경로" : "Available to explore now"}</p></article><article><span>{ko ? "등록된 총 거리" : "Distance in the collection"}</span><strong>{routes.reduce((sum, r) => sum + r.km, 0).toFixed(1)}<small>km</small></strong><p>{ko ? "전체 경로의 거리 합계" : "Across all registered routes"}</p></article></div>
    <div className="analytics-chart-head"><h4>{ko ? "걷기 기록 추이" : "Walking activity"}</h4><span>{periods[period][language]} · {ko ? "단위: 회" : "Unit: walks"}</span></div>
    <div className="analytics-chart" role="img" aria-label={ko ? `${periods[period].ko} 걷기 기록 ${summary.total}회. 아래 표에서 수치를 확인할 수 있습니다.` : `${summary.total} walks ${periods[period].en.toLowerCase()}. Exact values are available in the table below.`}>
      <ResponsiveContainer width="100%" height={260}><AreaChart data={values} margin={{ top: 15, right: 18, bottom: 0, left: -20 }} accessibilityLayer><defs><linearGradient id={`activity-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--site-accent)" stopOpacity={0.18} /><stop offset="100%" stopColor="var(--site-accent)" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--site-line)" /><XAxis dataKey="label" tick={{ fill: "var(--site-muted)", fontSize: 12 }} tickLine={false} axisLine={false} /><YAxis tick={{ fill: "var(--site-muted)", fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} /><Tooltip contentStyle={{ color: "var(--site-ink)", background: "var(--site-solid)", border: "1px solid var(--site-line)", borderRadius: 8 }} /><Area type="linear" dataKey="walks" name={ko ? "기록 수" : "Walks"} stroke="var(--site-accent)" strokeWidth={2.5} fill={`url(#activity-${uid})`} isAnimationActive={!reduced && selection.motion !== "quiet"} animationDuration={320} /></AreaChart></ResponsiveContainer>
    </div><details className="analytics-data"><summary>{ko ? "차트 수치 보기" : "View chart data"}</summary><table><caption>{ko ? "기간별 걷기 기록" : "Walking records by period"}</caption><thead><tr><th scope="col">{ko ? "기간" : "Period"}</th><th scope="col">{ko ? "기록 수" : "Walks"}</th></tr></thead><tbody>{values.map((v) => <tr key={v.label}><th scope="row">{v.label}</th><td>{v.walks}</td></tr>)}</tbody><tfoot><tr><th scope="row">{ko ? "이전 기간 합계" : "Previous period total"}</th><td>{summary.previous}</td></tr></tfoot></table></details>
  </section>;
}
