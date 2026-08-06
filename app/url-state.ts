import {
  axes,
  axisKeys,
  defaultSelection,
  normalizeSelection,
  recommendedSelection,
  type Language,
  type Selection,
} from "./style-data.ts";

export type KoreanCopyMode = "only" | "mixed";
export type ExperienceView = "lab" | "reference";

export type ExperienceState = {
  selection: Selection;
  language: Language;
  copyMode: KoreanCopyMode;
  view: ExperienceView;
};

export type ParsedExperienceState = {
  selection: Selection | null;
  language: Language | null;
  copyMode: KoreanCopyMode | null;
  view: ExperienceView | null;
};

export function getVisibleAxisKeys(language: Language, copyMode: KoreanCopyMode) {
  return axisKeys.filter((axis) => {
    if (language === "en") return axis !== "koType" && axis !== "fontMode";
    if (copyMode === "only") return axis !== "type" && axis !== "fontMode";
    return true;
  });
}

export function parseExperienceHash(hash: string): ParsedExperienceState {
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

  const language = params.get("language");
  const copyMode = params.get("copyMode");
  const view = params.get("view");

  return {
    selection: matched ? normalizeSelection(next) : null,
    language: language === "en" || language === "ko" ? language : null,
    copyMode: copyMode === "only" || copyMode === "mixed" ? copyMode : null,
    view: view === "lab" || view === "reference" ? view : null,
  };
}

export function serializeExperienceHash(state: ExperienceState): string {
  return new URLSearchParams({
    ...state.selection,
    language: state.language,
    copyMode: state.copyMode,
    view: state.view,
  }).toString();
}

export function createExperienceUrl(href: string, state: ExperienceState, view: ExperienceView): string {
  const url = new URL(href);
  url.hash = serializeExperienceHash({ ...state, view });
  return url.toString();
}
