import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  BookOpenText,
  Check,
  ChevronDown,
  Circle,
  ExternalLink,
  Languages,
  Redo2,
  Share2,
  Shuffle,
  Undo2,
  X,
} from "lucide-react";

import {
  axes,
  axisKeys,
  axisMeta,
  getOption,
  getOptionConstraint,
  getOptionNote,
  isOptionAllowed,
  normalizeSelection,
  presets,
  randomCompatibleSelection,
  recommendedSelection,
  type AxisKey,
  type Language,
  type Selection,
} from "../style-data";
import { getStyleEvidence } from "../style-references";
import {
  createExperienceUrl,
  experienceCombinationCount,
  getVisibleAxisKeys,
  type ExperienceView,
  type KoreanCopyMode,
} from "../url-state";
import { labCopy } from "./lab-copy";
import { PresetGallery } from "./PresetGallery";

type LabExperienceProps = {
  selection: Selection;
  language: Language;
  copyMode: KoreanCopyMode;
  agentReady: boolean;
  resolutionValid: boolean;
  capture: boolean;
  canvas: ReactNode;
  canUndo: boolean;
  canRedo: boolean;
  onApplySelection: (selection: Selection) => void;
  onUndo: () => void;
  onRedo: () => void;
  onLanguageChange: (language: Language, copyMode: KoreanCopyMode) => void;
};

function selectionsMatch(left: Selection, right: Selection) {
  return axisKeys.every((axis) => left[axis] === right[axis]);
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard unavailable");
}

function usePopoverFocus(
  openKey: string | boolean | null,
  panelRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!openKey) return;
    const panel = panelRef.current;
    restoreFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const frame = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus], button:not(:disabled), a[href]")?.focus();
    });
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      const activeElement = document.activeElement;
      if (panel?.contains(activeElement) || activeElement === document.body) {
        restoreFocusRef.current?.focus({ preventScroll: true });
      }
    };
  }, [onClose, openKey, panelRef]);
}

export function LabExperience({
  selection,
  language,
  copyMode,
  agentReady,
  resolutionValid,
  capture,
  canvas,
  canUndo,
  canRedo,
  onApplySelection,
  onUndo,
  onRedo,
  onLanguageChange,
}: LabExperienceProps) {
  const [activeAxis, setActiveAxis] = useState<AxisKey | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [presetSectionVisible, setPresetSectionVisible] = useState(false);
  const mixerRef = useRef<HTMLElement>(null);
  const mixerPopoverRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const languagePopoverRef = useRef<HTMLDivElement>(null);
  const utilityRef = useRef<HTMLDivElement>(null);
  const sharePopoverRef = useRef<HTMLDivElement>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const t = labCopy[language];

  const currentPreset = useMemo(
    () => presets.find((preset) => selectionsMatch(preset.selection, selection)),
    [selection],
  );
  const visibleAxisKeys = useMemo(
    () => getVisibleAxisKeys(language, copyMode, selection.fontMode),
    [copyMode, language, selection.fontMode],
  );

  const closeAxis = useCallback(() => setActiveAxis(null), []);
  const closeShare = useCallback(() => setShareOpen(false), []);
  const closeLanguage = useCallback(() => setLanguageOpen(false), []);
  usePopoverFocus(activeAxis, mixerPopoverRef, closeAxis);
  usePopoverFocus(shareOpen, sharePopoverRef, closeShare);
  usePopoverFocus(languageOpen, languagePopoverRef, closeLanguage);

  const showNotice = useCallback((message: string, duration = 1800) => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    setNotice(message);
    noticeTimerRef.current = window.setTimeout(() => {
      setNotice("");
      noticeTimerRef.current = null;
    }, duration);
  }, []);

  useEffect(() => () => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
  }, []);

  useEffect(() => {
    if (!activeAxis) return;
    function closeOnOutsideClick(event: PointerEvent) {
      if (!mixerRef.current?.contains(event.target as Node)) closeAxis();
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [activeAxis, closeAxis]);

  useEffect(() => {
    if (!shareOpen) return;
    function closeOnOutsideClick(event: PointerEvent) {
      if (!utilityRef.current?.contains(event.target as Node)) closeShare();
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [closeShare, shareOpen]);

  useEffect(() => {
    if (!languageOpen) return;
    function closeOnOutsideClick(event: PointerEvent) {
      if (!languageRef.current?.contains(event.target as Node)) closeLanguage();
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [closeLanguage, languageOpen]);

  useEffect(() => {
    const presetSection = document.getElementById("presets");
    if (!presetSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPresetSectionVisible(entry.isIntersecting),
      { rootMargin: "-18% 0px -62%", threshold: 0 },
    );
    observer.observe(presetSection);
    return () => observer.disconnect();
  }, []);

  const randomize = useCallback(() => {
    const preserveFontMode = language === "ko" && copyMode === "mixed";
    onApplySelection(randomCompatibleSelection(preserveFontMode ? { fontMode: selection.fontMode } : {}));
    closeAxis();
    closeShare();
    showNotice(t.randomized, 1600);
  }, [closeAxis, closeShare, copyMode, language, onApplySelection, selection.fontMode, showNotice, t.randomized]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (activeAxis || shareOpen || languageOpen) return;
      if (target?.closest("input, select, textarea, button, a[href], [contenteditable='true'], [role='dialog']")) return;
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        randomize();
        return;
      }
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const currentIndex = currentPreset ? presets.indexOf(currentPreset) : -1;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (currentIndex + direction + presets.length) % presets.length;
      onApplySelection(normalizeSelection(presets[next].selection));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeAxis, currentPreset, languageOpen, onApplySelection, randomize, shareOpen]);

  function update(axis: AxisKey, value: string) {
    const next = axis === "aesthetic"
      ? recommendedSelection(value)
      : isOptionAllowed(selection, axis, value)
        ? { ...selection, [axis]: value }
        : selection;
    if (!selectionsMatch(next, selection)) onApplySelection(next);
    if (axis === "aesthetic") showNotice(t.applied);
  }

  async function share(targetView: ExperienceView) {
    const url = createExperienceUrl(
      window.location.href,
      { selection, language, copyMode, view: "lab" },
      targetView,
    );
    try {
      await copyText(url);
      showNotice(targetView === "reference" ? t.copiedReference : t.copiedLab);
    } catch {
      showNotice(t.copyFallback);
    }
    closeShare();
  }

  function chooseLanguage(nextLanguage: Language, nextCopyMode: KoreanCopyMode = copyMode) {
    onLanguageChange(nextLanguage, nextCopyMode);
    closeLanguage();
    closeAxis();
    closeShare();
  }

  function choosePreset(nextSelection: Selection) {
    onApplySelection(normalizeSelection(nextSelection));
    closeAxis();
    document.getElementById("live-site")?.scrollIntoView({ behavior: selection.motion === "quiet" ? "auto" : "smooth" });
  }

  function jumpBetweenCanvasAndPresets() {
    const targetId = presetSectionVisible ? "live-site" : "presets";
    document.getElementById(targetId)?.scrollIntoView({ behavior: selection.motion === "quiet" ? "auto" : "smooth" });
    closeAxis();
    closeShare();
  }

  function undo() {
    onUndo();
    closeAxis();
    closeShare();
    showNotice(t.undone, 1400);
  }

  function redo() {
    onRedo();
    closeAxis();
    closeShare();
    showNotice(t.redone, 1400);
  }

  const aestheticName = language === "en"
    ? getOption("aesthetic", selection.aesthetic).en
    : getOption("aesthetic", selection.aesthetic).ko;
  const activeEvidence = activeAxis ? getStyleEvidence(activeAxis, selection[activeAxis]) : undefined;
  const activeAxisIndex = activeAxis
    ? String(visibleAxisKeys.indexOf(activeAxis) + 1).padStart(2, "0")
    : "";

  return (
    <main
      className="lab-shell"
      data-language={language}
      data-agent-ready={agentReady}
      data-agent-valid={resolutionValid}
      data-capture={capture}
    >
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={t.home}><span>UI</span><b>STYLE LAB</b></a>
        <p>{t.tagline}</p>
        <div className="header-actions">
          <nav aria-label={t.pageNav}><a href="#mixer">MIXER</a><a href="#presets">PRESETS</a><a href="https://github.com/Tangeroooo/ui-style-lab" target="_blank" rel="noreferrer">GITHUB <ExternalLink aria-hidden="true" /></a></nav>
        </div>
      </header>

      <section className="intro" id="top">
        <div className="intro-kicker"><span>{t.introKicker}</span><i />2026</div>
        <h1>{t.title[0]}<br /><em>{t.title[1]}</em></h1>
        <div className="intro-side">
          <p>{language === "ko" && copyMode === "only" ? t.introOnly : t.intro}</p>
          <div className="intro-count"><strong>{experienceCombinationCount(language, copyMode).toLocaleString("en-US")}</strong><span>{t.count}</span></div>
          <a className="explore-cta" href="#live-site"><b>{t.explore}</b><span aria-hidden="true"><ArrowDown /></span></a>
          <aside className="agent-guide-note">
            <span className="agent-guide-icon" aria-hidden="true"><BookOpenText /></span>
            <div><small>{t.agentGuideKicker}</small><b>{t.agentGuideTitle}</b><p>{t.agentGuideBody}</p></div>
            <a href="agent-guide.md" target="_blank" rel="noreferrer">{t.agentGuideLink}<ExternalLink aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <div className="mixer-anchor" id="mixer">
        <section className="floating-mixer" aria-label={t.mixer} ref={mixerRef}>
          <div className="mixer-status"><span className="status-dot" /><div><small>LIVE COMBINATION</small><b>{currentPreset?.name ?? "Custom mix"}</b></div></div>
          <div className="axis-controls">
            {visibleAxisKeys.map((axis) => {
              const option = getOption(axis, selection[axis]);
              return (
                <button
                  type="button"
                  key={axis}
                  className={activeAxis === axis ? "active" : ""}
                  aria-expanded={activeAxis === axis}
                  aria-controls={activeAxis === axis ? "axis-option-dialog" : undefined}
                  onClick={() => {
                    closeShare();
                    closeLanguage();
                    setActiveAxis((current) => current === axis ? null : axis);
                  }}
                >
                  <small>{language === "en" ? axisMeta[axis].en : axisMeta[axis].ko}</small><b>{language === "en" ? option.en : option.ko}</b><span aria-hidden="true"><ChevronDown /></span>
                </button>
              );
            })}
          </div>
          {activeAxis && (
            <div
              className="mixer-popover"
              id="axis-option-dialog"
              data-axis={activeAxis}
              role="dialog"
              aria-modal="false"
              aria-label={language === "en" ? axisMeta[activeAxis].en : axisMeta[activeAxis].ko}
              ref={mixerPopoverRef}
            >
              <header><div><span>{activeAxisIndex}</span><b>{language === "en" ? axisMeta[activeAxis].en : axisMeta[activeAxis].ko}</b><small>{language === "en" ? axisMeta[activeAxis].ko : axisMeta[activeAxis].en}</small></div><button type="button" data-autofocus onClick={closeAxis} aria-label={t.close}><X aria-hidden="true" /></button></header>
              {activeAxis !== "aesthetic" && <p className="compatibility-note"><b>{aestheticName}</b> · {t.compat(aestheticName)}</p>}
              <div className="popover-scroll" data-testid="popover-scroll">
                <div className="popover-options">
                  {axes[activeAxis].map((option) => {
                    const selected = selection[activeAxis] === option.id;
                    const allowed = isOptionAllowed(selection, activeAxis, option.id);
                    const constraint = getOptionConstraint(selection, activeAxis, option.id);
                    const name = language === "en" ? option.en : option.ko;
                    const note = allowed ? getOptionNote(activeAxis, option.id, language) : constraint?.message[language] ?? t.incompatible(aestheticName);
                    return (
                      <button type="button" data-option={option.id} className={`${selected ? "selected" : ""}${allowed ? "" : " incompatible"}`} disabled={!allowed} key={option.id} onClick={() => update(activeAxis, option.id)} title={allowed ? note : constraint?.message[language] ?? t.unavailable(aestheticName)}>
                        <i /><span><b>{name}</b><small>{language === "ko" ? `${option.en} · ` : ""}{note}</small>{(activeAxis === "type" || activeAxis === "koType") && <span className="font-sample" lang={activeAxis === "koType" ? "ko" : "en"}>{activeAxis === "koType" ? "가나다 Aa 27" : "Aa Rr 27"}</span>}</span><em aria-hidden="true">{selected ? <Check /> : allowed ? <Circle /> : <X />}</em>
                      </button>
                    );
                  })}
                </div>
              </div>
              {activeEvidence && (
                <aside className="evidence-card">
                  <span>{t.evidence} · {activeEvidence.kind.replaceAll("-", " ")}</span>
                  <p>{activeEvidence.claim}</p>
                  <a href={activeEvidence.url} target="_blank" rel="noreferrer"><b>{activeEvidence.source}</b><small>{t.evidenceChecked} · {activeEvidence.checkedAt}</small><em>{t.viewSource}<ExternalLink aria-hidden="true" /></em></a>
                </aside>
              )}
            </div>
          )}
        </section>

        <div className="floating-utilities" ref={utilityRef} aria-label={language === "en" ? "Quick actions" : "빠른 동작"}>
          <button className="utility-toggle history-toggle" type="button" onClick={undo} disabled={!canUndo} aria-label={t.undo} title={`${t.undo} (Ctrl/⌘ Z)`}><Undo2 aria-hidden="true" /><b>{t.undoShort}</b></button>
          <button className="utility-toggle history-toggle" type="button" onClick={redo} disabled={!canRedo} aria-label={t.redo} title={`${t.redo} (Ctrl/⌘ Shift Z)`}><Redo2 aria-hidden="true" /><b>{t.redoShort}</b></button>
          <button className="utility-toggle page-jump-toggle" type="button" onClick={jumpBetweenCanvasAndPresets} aria-label={presetSectionVisible ? t.canvasJumpLabel : t.presetsJumpLabel} title={presetSectionVisible ? t.canvasJumpLabel : t.presetsJumpLabel}>
            {presetSectionVisible ? <ArrowUp aria-hidden="true" /> : <ArrowDown aria-hidden="true" />}<b>{presetSectionVisible ? t.canvasJump : t.presetsJump}</b>
          </button>
          <button className="utility-toggle random-toggle" type="button" onClick={randomize} aria-label={t.random} title={`${t.random} (R)`}><Shuffle aria-hidden="true" /><b>{t.randomShort}</b></button>
          <div className="share-control">
            <button className="utility-toggle share-toggle" type="button" onClick={() => { closeAxis(); closeLanguage(); setShareOpen((current) => !current); }} aria-expanded={shareOpen} aria-controls={shareOpen ? "share-dialog" : undefined} aria-label={t.share} title={t.share}><Share2 aria-hidden="true" /><b>{t.shareShort}</b></button>
            {shareOpen && (
              <div className="share-popover" id="share-dialog" role="dialog" aria-modal="false" aria-label={t.shareTitle} ref={sharePopoverRef}>
                <header><div><span aria-hidden="true"><Share2 /></span><b>{t.shareTitle}</b></div><button type="button" data-autofocus onClick={closeShare} aria-label={t.close}><X aria-hidden="true" /></button></header>
                <p>{t.shareIntro}</p>
                <div>
                  <button type="button" onClick={() => share("lab")}><span><b>{t.labLink}</b><small>{t.labLinkNote}</small></span><em>LAB <ExternalLink aria-hidden="true" /></em></button>
                  <button type="button" onClick={() => share("reference")}><span><b>{t.referenceLink}</b><small>{t.referenceLinkNote}</small></span><em>REF <ExternalLink aria-hidden="true" /></em></button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="language-control floating-language" ref={languageRef}>
          <button className="language-toggle" type="button" onClick={() => { closeAxis(); closeShare(); setLanguageOpen((current) => !current); }} aria-expanded={languageOpen} aria-controls={languageOpen ? "language-dialog" : undefined} aria-label={t.languageMenu} title={t.languageMenu}><span aria-hidden="true"><Languages /></span><b>{language === "en" ? "EN" : copyMode === "only" ? "한" : "한+EN"}</b></button>
          {languageOpen && (
            <div className="language-menu" id="language-dialog" role="dialog" aria-modal="false" aria-label={t.languageMenu} ref={languagePopoverRef}>
              <span>{t.languageMenu}</span>
              <button type="button" data-autofocus className={language === "en" ? "selected" : ""} onClick={() => chooseLanguage("en")}><b>EN</b><span>{t.englishMode}</span><em aria-hidden="true">{language === "en" ? <Check /> : <Circle />}</em></button>
              <button type="button" className={language === "ko" && copyMode === "only" ? "selected" : ""} onClick={() => chooseLanguage("ko", "only")}><b>한</b><span>{t.koreanOnlyMode}</span><em aria-hidden="true">{language === "ko" && copyMode === "only" ? <Check /> : <Circle />}</em></button>
              <button type="button" className={language === "ko" && copyMode === "mixed" ? "selected" : ""} onClick={() => chooseLanguage("ko", "mixed")}><b>한+</b><span>{t.koreanMixedMode}</span><em aria-hidden="true">{language === "ko" && copyMode === "mixed" ? <Check /> : <Circle />}</em></button>
            </div>
          )}
        </div>
      </div>

      <div className="canvas-label"><span>{t.canvas}</span><b>{visibleAxisKeys.map((axis) => language === "en" ? getOption(axis, selection[axis]).en : getOption(axis, selection[axis]).ko).join(" × ")}</b></div>
      {canvas}
      <PresetGallery language={language} onChoosePreset={choosePreset} />
      <footer className="lab-footer"><div className="wordmark"><span>UI</span><b>STYLE LAB</b></div><p>{t.footer}</p><a href="#top">{t.back}<ArrowUp aria-hidden="true" /></a></footer>
      <div className="toast" aria-live="polite" data-visible={Boolean(notice)}>{notice}</div>
    </main>
  );
}
