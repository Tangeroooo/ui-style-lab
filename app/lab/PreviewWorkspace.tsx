import { isSceneId, type SceneId } from "../scenes/scene-data";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Columns2, Maximize2, Monitor, Smartphone, Tablet, X } from "lucide-react";
import { aestheticRules, axes, normalizeSelection, recommendedSelection } from "../style-data";
import { serializeExperienceQuery, type ExperienceState } from "../url-state";

export function PreviewWorkspace({ state, children, onSceneChange }: { state: ExperienceState; children: ReactNode; onSceneChange: (scene: SceneId) => void }) {
  const [size, setSize] = useState("fluid");
  const [compare, setCompare] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [other, setOther] = useState("brutalist");
  const [loads, setLoads] = useState(0);
  const workspace = useRef<HTMLElement>(null);
  const left = useRef<HTMLIFrameElement>(null);
  const right = useRef<HTMLIFrameElement>(null);
  const ko = state.language === "ko";
  const candidates = axes.aesthetic.filter((option) => state.section !== "page" || aestheticRules[option.id].allowed.layout.includes(state.selection.layout));
  const chosen = candidates.some((item) => item.id === other) ? other : candidates.find((item) => item.id !== state.selection.aesthetic)?.id ?? state.selection.aesthetic;
  const comparison = normalizeSelection({ ...recommendedSelection(chosen), ...(state.section === "page" ? { layout: state.selection.layout } : {}) });
  const referenceQuery = (selection = state.selection, capture = false) => `?${serializeExperienceQuery({ ...state, selection, view: "reference", capture, strict: true })}`;
  const leftUrl = referenceQuery(state.selection, compare);
  const rightUrl = referenceQuery(comparison, true);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || ![left.current?.contentWindow, right.current?.contentWindow].includes(event.source as Window)) return;
      if (event.data?.type === "ui-style-lab-scene" && isSceneId(event.data.scene)) onSceneChange(event.data.scene);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onSceneChange]);
  useEffect(() => {
    if (!compare) return;
    const a = left.current?.contentWindow;
    const b = right.current?.contentWindow;
    if (!a || !b) return;
    let locked = false;
    let frame = 0;
    function sync(from: Window, to: Window) {
      if (locked) return;
      const maximum = from.document.documentElement.scrollHeight - from.innerHeight;
      locked = true;
      to.scrollTo({ top: maximum > 0 ? from.scrollY / maximum * (to.document.documentElement.scrollHeight - to.innerHeight) : 0, behavior: "instant" });
      frame = requestAnimationFrame(() => { locked = false; });
    }
    const syncA = () => sync(a!, b!);
    const syncB = () => sync(b!, a!);
    a.addEventListener("scroll", syncA); b.addEventListener("scroll", syncB);
    return () => { a.removeEventListener("scroll", syncA); b.removeEventListener("scroll", syncB); cancelAnimationFrame(frame); };
  }, [compare, loads, leftUrl, rightUrl]);
  useEffect(() => {
    if (!expanded) return;
    const before = document.body.style.overflow;
    const restoreFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const siblings = Array.from(workspace.current?.parentElement?.children ?? []).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== workspace.current);
    const original = siblings.map((el) => el.inert);
    siblings.forEach((el) => { el.inert = true; });
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key !== "Tab") return;
      const focusable = Array.from(workspace.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, textarea, iframe, summary') ?? []).filter((el) => el.getClientRects().length > 0);
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const frameWindows = [left.current?.contentWindow, right.current?.contentWindow].filter((frame): frame is Window => Boolean(frame));
    const closeFromFrame = (event: KeyboardEvent) => { if (event.key === "Escape") setExpanded(false); };
    frameWindows.forEach((frame) => frame.addEventListener("keydown", closeFromFrame));
    window.addEventListener("keydown", close);
    return () => { frameWindows.forEach((frame) => frame.removeEventListener("keydown", closeFromFrame)); document.body.style.overflow = before; siblings.forEach((el, index) => { el.inert = original[index]; }); window.removeEventListener("keydown", close); restoreFocus?.focus({ preventScroll: true }); };
  }, [expanded, loads]);
  return <section id="design-preview" ref={workspace} role={expanded ? "dialog" : undefined} aria-modal={expanded || undefined} className="preview-workspace" data-expanded={expanded} aria-label={ko ? "디자인 미리보기" : "Design preview"}>
    <div className="preview-toolbar"><div className="preview-sizes" role="group" aria-label={ko ? "미리보기 너비" : "Preview width"}>{[{ id: "fluid", Icon: Monitor, label: ko ? "전체" : "Fit" }, { id: "768", Icon: Tablet, label: ko ? "태블릿" : "Tablet" }, { id: "390", Icon: Smartphone, label: ko ? "모바일" : "Mobile" }].map(({ id, Icon, label }) => <button key={id} type="button" aria-pressed={size === id} onClick={() => setSize(id)}><Icon aria-hidden="true" />{label}</button>)}</div><div className="preview-actions"><button type="button" aria-pressed={compare} onClick={() => setCompare(!compare)}><Columns2 aria-hidden="true" />{ko ? "비교" : "Compare"}</button><button type="button" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? <X aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}{expanded ? ko ? "닫기" : "Close" : ko ? "크게 보기" : "Expand"}</button><a href={referenceQuery()} target="_blank" rel="noreferrer">{ko ? "독립 화면" : "Reference"}</a></div></div>
    {compare && <div className="comparison-controls"><span>{ko ? "같은 내용 · 같은 페이지 유형 · 스크롤 동기화" : "Same content · Same page type · Linked scrolling"}</span><label>{ko ? "비교할 스타일" : "Compare with"}<select value={chosen} onChange={(e) => setOther(e.target.value)}>{candidates.map((item) => <option key={item.id} value={item.id}>{item[state.language]}</option>)}</select></label></div>}
    {compare || size !== "fluid" ? <div className="preview-frame-grid" data-compare={compare} data-size={size}><div className="preview-frame"><span>{axes.aesthetic.find((a) => a.id === state.selection.aesthetic)?.[state.language]}</span><iframe ref={left} src={leftUrl} title={ko ? "현재 디자인" : "Current design"} style={{ width: size === "fluid" ? "100%" : `${size}px` }} onLoad={() => setLoads((n) => n + 1)} /></div>{compare && <div className="preview-frame"><span>{axes.aesthetic.find((a) => a.id === chosen)?.[state.language]}</span><iframe ref={right} src={rightUrl} title={ko ? "비교 디자인" : "Comparison design"} style={{ width: size === "fluid" ? "100%" : `${size}px` }} onLoad={() => setLoads((n) => n + 1)} /></div>}</div> : <div className="preview-content">{children}</div>}
  </section>;
}
