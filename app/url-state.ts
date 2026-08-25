import {
  axisKeys,
  combinationCount,
  defaultSelection,
  resolveSelection,
  type AxisKey,
  type Language,
  type Selection,
  type SelectionResolution,
} from "./style-data.ts";
import {
  defaultComponentId,
  isComponentId,
  type ComponentId,
} from "./component-lab/component-data.ts";

export type KoreanCopyMode = "only" | "mixed";
export type ExperienceView = "lab" | "reference";
export type ExperienceSection = "page" | "components";
export type ExperienceStateSource = "query" | "legacy-hash" | "none";

export type ExperienceState = {
  selection: Selection;
  language: Language;
  copyMode: KoreanCopyMode;
  view: ExperienceView;
  section: ExperienceSection;
  component: ComponentId;
};

export type ExperienceUrlState = ExperienceState & {
  capture?: boolean;
  strict?: boolean;
};

export type ParsedExperienceState = {
  selection: Selection | null;
  resolution: SelectionResolution | null;
  language: Language | null;
  copyMode: KoreanCopyMode | null;
  view: ExperienceView | null;
  section: ExperienceSection | null;
  component: ComponentId | null;
  capture: boolean | null;
  strict: boolean | null;
  source: ExperienceStateSource;
};

const koreanFirstAxisKeys = [
  "aesthetic",
  "surface",
  "layout",
  "nav",
  "navStyle",
  "koType",
  "type",
  "fontMode",
  "palette",
  "motion",
] as const;

export function getVisibleAxisKeys(language: Language, copyMode: KoreanCopyMode, fontMode = "split") {
  const orderedAxes = language === "ko" ? koreanFirstAxisKeys : axisKeys;
  return orderedAxes.filter((axis) => {
    if (language === "en") return axis !== "koType" && axis !== "fontMode";
    if (copyMode === "only") return axis !== "type" && axis !== "fontMode";
    if (axis === "type") return fontMode === "split";
    return true;
  });
}

export function experienceCombinationCount(language: Language, copyMode: KoreanCopyMode) {
  if (language !== "ko" || copyMode !== "mixed") {
    return combinationCount(getVisibleAxisKeys(language, copyMode));
  }

  return combinationCount(getVisibleAxisKeys("ko", "mixed", "split"), { fontMode: "split" })
    + combinationCount(getVisibleAxisKeys("ko", "mixed", "koUnified"), { fontMode: "koUnified" });
}

export function usesBilingualCopy(language: Language, copyMode: KoreanCopyMode) {
  return language === "ko" && copyMode === "mixed";
}

function readBoolean(params: URLSearchParams, key: string) {
  if (!params.has(key)) return null;
  const value = params.get(key);
  if (value === "1" || value === "true") return true;
  if (value === "0" || value === "false") return false;
  return null;
}

function parseExperienceParams(
  params: URLSearchParams,
  source: Exclude<ExperienceStateSource, "none">,
): ParsedExperienceState {
  const candidate: Partial<Record<AxisKey, string>> = {};
  let matchedSelection = false;

  for (const axis of axisKeys) {
    const value = params.get(axis);
    if (value) {
      candidate[axis] = value;
      matchedSelection = true;
    }
  }

  const resolution = matchedSelection ? resolveSelection(candidate) : null;
  const language = params.get("language");
  const copyMode = params.get("copyMode");
  const view = params.get("view");
  const section = params.get("section");
  const component = params.get("component");
  const capture = readBoolean(params, "capture");
  const strict = readBoolean(params, "strict");
  const matchedState = matchedSelection
    || params.has("language")
    || params.has("copyMode")
    || params.has("view")
    || params.has("section")
    || params.has("component")
    || params.has("capture")
    || params.has("strict");

  return {
    selection: resolution?.resolved ?? null,
    resolution,
    language: language === "en" || language === "ko" ? language : null,
    copyMode: copyMode === "only" || copyMode === "mixed" ? copyMode : null,
    view: view === "lab" || view === "reference" ? view : null,
    section: section === "page" || section === "components" ? section : null,
    component: isComponentId(component) ? component : null,
    capture,
    strict,
    source: matchedState ? source : "none",
  };
}

/** Parse the pre-v1 hash transport. New links must use the query transport. */
export function parseExperienceHash(hash: string): ParsedExperienceState {
  return parseExperienceParams(new URLSearchParams(hash.replace(/^#/, "")), "legacy-hash");
}

/** Query state is canonical; a legacy state hash is read only when no query state exists. */
export function parseExperienceLocation(search: string, hash: string): ParsedExperienceState {
  const fromQuery = parseExperienceParams(new URLSearchParams(search.replace(/^\?/, "")), "query");
  return fromQuery.source === "query" ? fromQuery : parseExperienceHash(hash);
}

/** Kept for backwards-compatible tests and external links. */
export function serializeExperienceHash(state: ExperienceState): string {
  const section = state.section ?? "page";
  const component = state.component ?? defaultComponentId;
  return new URLSearchParams({
    ...state.selection,
    language: state.language,
    copyMode: state.copyMode,
    view: state.view,
    section,
    component,
  }).toString();
}

export function serializeExperienceQuery(state: ExperienceUrlState): string {
  const section = state.section ?? "page";
  const component = state.component ?? defaultComponentId;
  const params = new URLSearchParams();
  for (const axis of axisKeys) params.set(axis, state.selection[axis]);
  params.set("language", state.language);
  params.set("copyMode", state.copyMode);
  params.set("view", state.view);
  if (section !== "page") params.set("section", section);
  if (section === "components" || component !== defaultComponentId) {
    params.set("component", component);
  }
  if (state.capture) params.set("capture", "1");
  if (state.strict) params.set("strict", "1");
  return params.toString();
}

export function createExperienceUrl(
  href: string,
  state: ExperienceState,
  view: ExperienceView,
): string {
  const url = new URL(href);
  url.search = serializeExperienceQuery({
    ...state,
    view,
    capture: view === "reference",
    strict: view === "reference",
  });
  url.hash = "";
  return url.toString();
}

export function defaultExperienceResolution() {
  return resolveSelection(defaultSelection);
}
