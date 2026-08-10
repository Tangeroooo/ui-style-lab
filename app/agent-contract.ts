import {
  aestheticRules,
  axes,
  axisKeys,
  axisMeta,
  crossAxisConstraints,
  legacyAestheticAliases,
  presets,
  type Language,
  type SelectionResolution,
} from "./style-data.ts";
import { styleEvidenceRegistries } from "./style-references.ts";
import { koreanFontResources, latinFontResources } from "./font-data.ts";
import {
  createExperienceUrl,
  experienceCombinationCount,
  type ExperienceState,
  type KoreanCopyMode,
} from "./url-state.ts";

export const agentSchemaVersion = "1.0.0";
export const canonicalLabUrl = "https://tangeroooo.github.io/ui-style-lab/";

export const reviewPacks = [
  {
    id: "official-systems",
    name: "Official design systems",
    purpose: "Compare documented company systems without losing each system's native defaults.",
    presetIds: presets
      .filter((preset) => preset.category === "Design System" || preset.category === "Component Library")
      .map((preset) => preset.id),
  },
  {
    id: "layout-and-motion",
    name: "Layout and motion",
    purpose: "Compare structural page patterns and interaction pacing on the same content.",
    presetIds: presets
      .filter((preset) => preset.category === "Layout" || preset.category === "Motion")
      .map((preset) => preset.id),
  },
  {
    id: "lineage-and-retro",
    name: "Historical and retro lineages",
    purpose: "Review historical graphic lineages and retrospective digital aesthetics.",
    presetIds: presets
      .filter((preset) => ["Lineage", "Modernist", "Retro"].includes(preset.category))
      .map((preset) => preset.id),
  },
  {
    id: "accessibility-and-dark",
    name: "Accessibility and dark themes",
    purpose: "Review official high-contrast and dark-theme branches as separate governing aesthetics.",
    presetIds: presets
      .filter((preset) => preset.category === "Accessibility" || /night|dark|gray 100/i.test(preset.name))
      .map((preset) => preset.id),
  },
] as const;

export function buildAgentCatalog() {
  return {
    schemaVersion: agentSchemaVersion,
    project: {
      name: "UI Style Lab",
      repository: "https://github.com/Tangeroooo/ui-style-lab",
      canonicalUrl: canonicalLabUrl,
      defaultLanguage: "en",
      license: {
        spdx: "MIT",
        url: "https://github.com/Tangeroooo/ui-style-lab/blob/main/LICENSE",
      },
    },
    transport: {
      canonical: "query",
      legacyReadOnly: "hash",
      queryTemplate: `${canonicalLabUrl}?aesthetic={id}&surface={id}&layout={id}&nav={id}&navStyle={id}&type={id}&koType={id}&fontMode={id}&palette={id}&motion={id}&language={en|ko}&copyMode={only|mixed}&view={lab|reference}&capture=1&strict=1`,
      flags: {
        strict: "Preserve invalid requested values in the URL and report every resolver adjustment.",
        capture: "Disable non-essential motion and expose a deterministic readiness marker.",
      },
    },
    compatibility: {
      governingAxis: "aesthetic",
      policy: "Only values in the selected aesthetic's allowed lists are valid.",
      fallback: "Unknown or incompatible values resolve to that aesthetic's native defaults.",
      aliases: legacyAestheticAliases,
      rules: aestheticRules,
      crossAxisConstraints,
    },
    axes: axisKeys.map((axis) => ({
      id: axis,
      label: axisMeta[axis],
      options: axes[axis],
    })),
    typographyResources: {
      latin: latinFontResources,
      korean: koreanFontResources,
    },
    presets,
    reviewPacks,
    evidence: styleEvidenceRegistries,
    validatedCombinationCounts: {
      english: experienceCombinationCount("en", "mixed"),
      koreanOnly: experienceCombinationCount("ko", "only"),
      koreanEnglish: experienceCombinationCount("ko", "mixed"),
    },
    notes: [
      "The catalog intentionally publishes rules and curated presets, not the full Cartesian product.",
      "Bento Grid is a layout option, not a governing aesthetic.",
      "Reference evidence is currently defined for aesthetic, surface, and layout options.",
    ],
  };
}

export type AgentStateInput = {
  state: ExperienceState;
  resolution: SelectionResolution;
  ready: boolean;
  capture: boolean;
  strict: boolean;
};

export function buildAgentState({ state, resolution, ready, capture, strict }: AgentStateInput) {
  const language = state.language as Language;
  const copyMode = state.copyMode as KoreanCopyMode;
  return {
    schemaVersion: agentSchemaVersion,
    ready,
    valid: resolution.valid,
    requested: resolution.requested,
    resolved: resolution.resolved,
    adjustments: resolution.adjustments,
    mode: {
      language,
      copyMode,
      view: state.view,
      capture,
      strict,
    },
    selectedOptions: Object.fromEntries(axisKeys.map((axis) => {
      const option = axes[axis].find((item) => item.id === resolution.resolved[axis]);
      return [axis, option ? { id: option.id, ko: option.ko, en: option.en, note: option.note } : null];
    })),
    selectedEvidence: Object.fromEntries(
      ["aesthetic", "surface", "layout"].map((axis) => [
        axis,
        styleEvidenceRegistries[axis]?.[resolution.resolved[axis]],
      ]),
    ),
    referenceUrl: createExperienceUrl(canonicalLabUrl, state, "reference"),
  };
}
