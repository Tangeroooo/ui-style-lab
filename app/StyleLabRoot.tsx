"use client";

import { lazy, Suspense, useCallback, useEffect, useState } from "react";

import { getRequiredFontFamilies } from "./font-data";
import { buildAgentState } from "./agent-contract";
import {
  defaultSelection,
  resolveSelection,
  type Language,
  type Selection,
  type SelectionResolution,
} from "./style-data";
import {
  defaultExperienceResolution,
  parseExperienceHash,
  parseExperienceLocation,
  serializeExperienceQuery,
  type ExperienceView,
  type KoreanCopyMode,
} from "./url-state";
import { AgentStateScript, FieldNotesSite, FontResourceLinks } from "./canvas/FieldNotesSite";
import { useSelectionHistory } from "./lab/useSelectionHistory";

const LabExperience = lazy(() => import("./lab/LabExperience").then((module) => ({
  default: module.LabExperience,
})));

const storageKey = "ui-language-lab-selection";
const languageKey = "ui-language-lab-language";
const copyModeKey = "ui-language-lab-copy-mode";

type StyleLabRootProps = {
  initialView?: ExperienceView;
};

function settleStylesheet(link: HTMLLinkElement, timeouts: Set<number>) {
  if (link.sheet) return Promise.resolve();
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      link.removeEventListener("load", finish);
      link.removeEventListener("error", finish);
      window.clearTimeout(timeoutId);
      timeouts.delete(timeoutId);
      resolve();
    };
    const timeoutId = window.setTimeout(finish, 5000);
    timeouts.add(timeoutId);
    link.addEventListener("load", finish, { once: true });
    link.addEventListener("error", finish, { once: true });
  });
}

export function StyleLabRoot({ initialView }: StyleLabRootProps) {
  const history = useSelectionHistory(defaultSelection);
  const { commit, replace, undo: undoHistory, redo: redoHistory } = history;
  const selection = history.selection;
  const [resolution, setResolution] = useState<SelectionResolution>(defaultExperienceResolution);
  const [language, setLanguage] = useState<Language>("en");
  const [copyMode, setCopyMode] = useState<KoreanCopyMode>("mixed");
  const [view, setView] = useState<ExperienceView>(initialView ?? "lab");
  const [ready, setReady] = useState(false);
  const [agentReady, setAgentReady] = useState(false);
  const [capture, setCapture] = useState(false);
  const [strict, setStrict] = useState(false);

  useEffect(() => {
    const fromLocation = parseExperienceLocation(window.location.search, window.location.hash);
    let initialSelection = fromLocation.selection;
    let initialResolution = fromLocation.resolution;
    let initialLanguage = fromLocation.language;
    let initialCopyMode = fromLocation.copyMode;

    try {
      if (!initialSelection) {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          initialResolution = resolveSelection({ ...defaultSelection, ...JSON.parse(saved) });
          initialSelection = initialResolution.resolved;
        }
      }
      const savedLanguage = window.localStorage.getItem(languageKey);
      if (!initialLanguage && (savedLanguage === "en" || savedLanguage === "ko")) initialLanguage = savedLanguage;
      const savedCopyMode = window.localStorage.getItem(copyModeKey);
      if (!initialCopyMode && (savedCopyMode === "only" || savedCopyMode === "mixed")) initialCopyMode = savedCopyMode;
    } catch {
      // Storage is an optional convenience; URL state remains authoritative.
    }

    const timeoutId = window.setTimeout(() => {
      if (initialSelection) replace(initialSelection);
      if (initialResolution) setResolution(initialResolution);
      if (initialLanguage) setLanguage(initialLanguage);
      if (initialCopyMode) setCopyMode(initialCopyMode);
      if (fromLocation.view) setView(fromLocation.view);
      if (fromLocation.capture !== null) setCapture(fromLocation.capture);
      if (fromLocation.strict !== null) setStrict(fromLocation.strict);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [replace]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(selection));
    } catch {
      // Ignore storage failures.
    }
    if (strict && !resolution.valid) return;
    const query = serializeExperienceQuery({ selection, language, copyMode, view, capture, strict });
    const anchor = /^#(?:top|mixer|presets|live-site)$/.test(window.location.hash) ? window.location.hash : "";
    window.history.replaceState(null, "", `${window.location.pathname}?${query}${anchor}`);
  }, [capture, copyMode, language, ready, resolution, selection, strict, view]);

  useEffect(() => {
    if (!ready) return;
    function applyParsedState() {
      const parsed = parseExperienceLocation(window.location.search, window.location.hash);
      if (parsed.source === "none") return;
      if (parsed.selection) replace(parsed.selection);
      if (parsed.resolution) setResolution(parsed.resolution);
      if (parsed.language) setLanguage(parsed.language);
      if (parsed.copyMode) setCopyMode(parsed.copyMode);
      if (parsed.view) setView(parsed.view);
      if (parsed.capture !== null) setCapture(parsed.capture);
      if (parsed.strict !== null) setStrict(parsed.strict);
      setAgentReady(false);
    }
    function migrateLegacyHash() {
      if (parseExperienceHash(window.location.hash).source === "legacy-hash") applyParsedState();
    }
    window.addEventListener("popstate", applyParsedState);
    window.addEventListener("hashchange", migrateLegacyHash);
    return () => {
      window.removeEventListener("popstate", applyParsedState);
      window.removeEventListener("hashchange", migrateLegacyHash);
    };
  }, [ready, replace]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    const timeouts = new Set<number>();

    async function settleDocument() {
      setAgentReady(false);
      const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[data-ui-style-font="true"]'));
      await Promise.all(links.map((link) => settleStylesheet(link, timeouts)));
      if (cancelled) return;
      if (document.fonts?.load) {
        await Promise.allSettled(getRequiredFontFamilies(selection, language, copyMode).map((family) => (
          document.fonts.load(`400 16px "${family}"`)
        )));
      }
      if (document.fonts?.ready) await document.fonts.ready;
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
      const lazyContentDeadline = window.performance.now() + 5000;
      while (!cancelled && document.querySelector('[data-agent-pending="true"]')) {
        if (window.performance.now() >= lazyContentDeadline) return;
        await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
      }
      if (!cancelled) setAgentReady(true);
    }

    void settleDocument();
    return () => {
      cancelled = true;
      for (const timeoutId of timeouts) window.clearTimeout(timeoutId);
      timeouts.clear();
    };
  }, [capture, copyMode, language, ready, selection, view]);

  useEffect(() => {
    document.documentElement.lang = language;
    if (!ready) return;
    try {
      window.localStorage.setItem(languageKey, language);
      window.localStorage.setItem(copyModeKey, copyMode);
    } catch {
      // Ignore storage failures.
    }
  }, [copyMode, language, ready]);

  const applySelection = useCallback((next: Selection) => {
    commit(next);
    setResolution(resolveSelection(next));
    setAgentReady(false);
  }, [commit]);

  const undo = useCallback(() => {
    const restored = undoHistory();
    if (!restored) return;
    setResolution(resolveSelection(restored));
    setAgentReady(false);
  }, [undoHistory]);

  const redo = useCallback(() => {
    const restored = redoHistory();
    if (!restored) return;
    setResolution(resolveSelection(restored));
    setAgentReady(false);
  }, [redoHistory]);

  useEffect(() => {
    if (!ready) return;
    function onHistoryShortcut(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.key.toLowerCase() !== "z") return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    }
    window.addEventListener("keydown", onHistoryShortcut);
    return () => window.removeEventListener("keydown", onHistoryShortcut);
  }, [ready, redo, undo]);

  const changeLanguage = useCallback((nextLanguage: Language, nextCopyMode: KoreanCopyMode) => {
    setLanguage(nextLanguage);
    setCopyMode(nextCopyMode);
    setAgentReady(false);
  }, []);

  const agentState = buildAgentState({
    state: { selection, language, copyMode, view },
    resolution,
    ready: agentReady,
    capture,
    strict,
  });
  const canvas = <FieldNotesSite selection={selection} language={language} copyMode={copyMode} />;

  return (
    <>
      <FontResourceLinks selection={selection} language={language} copyMode={copyMode} />
      <AgentStateScript payload={agentState} />
      {view === "reference" ? (
        <main className="reference-view" data-agent-ready={agentReady} data-agent-valid={resolution.valid} data-capture={capture}>
          <h1 className="sr-only">UI Style Lab reference canvas</h1>
          {canvas}
        </main>
      ) : (
        <Suspense fallback={<main className="lab-shell lab-loading" aria-busy="true"><span>UI STYLE LAB</span></main>}>
          <LabExperience
            selection={selection}
            language={language}
            copyMode={copyMode}
            agentReady={agentReady}
            resolutionValid={resolution.valid}
            capture={capture}
            canvas={canvas}
            canUndo={history.canUndo}
            canRedo={history.canRedo}
            onApplySelection={applySelection}
            onUndo={undo}
            onRedo={redo}
            onLanguageChange={changeLanguage}
          />
        </Suspense>
      )}
    </>
  );
}
