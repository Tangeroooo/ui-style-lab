import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  aestheticRules,
  axes,
  axisKeys,
  combinationCount,
  defaultSelection,
  dependentAxisKeys,
  getAestheticRule,
  isOptionAllowed,
  normalizeSelection,
  presets,
  randomCompatibleSelection,
  recommendedSelection,
  resolveSelection,
} from "../app/style-data.ts";
import { hasStyleEvidence } from "../app/style-references.ts";

test("every aesthetic defines a valid default and allowed set for every dependent axis", () => {
  for (const aesthetic of axes.aesthetic) {
    const rule = aestheticRules[aesthetic.id];
    assert.ok(rule, `missing rule for ${aesthetic.id}`);

    for (const axis of dependentAxisKeys) {
      assert.ok(rule.allowed[axis].length > 0, `${aesthetic.id}.${axis} has no allowed values`);
      assert.ok(
        rule.allowed[axis].includes(rule.defaults[axis]),
        `${aesthetic.id}.${axis} default is not allowed`,
      );
      assert.ok(
        axes[axis].some((option) => option.id === rule.defaults[axis]),
        `${aesthetic.id}.${axis} default is not an axis option`,
      );
    }

    const recommended = recommendedSelection(aesthetic.id);
    assert.ok(axisKeys.every((axis) => isOptionAllowed(recommended, axis, recommended[axis])));
  }
});

test("the initial canvas is the curated minimal recommendation", () => {
  assert.deepEqual(defaultSelection, recommendedSelection("minimal"));
});

test("all curated presets are already normalized and compatible", () => {
  assert.equal(presets.length, 57);
  for (const preset of presets) {
    assert.deepEqual(normalizeSelection(preset.selection), preset.selection, preset.id);
  }
});

test("invalid candidates fall back to the governing aesthetic defaults", () => {
  const normalized = normalizeSelection({
    aesthetic: "luxury",
    surface: "glass",
    koType: "blackhan",
    fontMode: "koUnified",
    palette: "primary",
  });

  assert.equal(normalized.surface, "paper");
  assert.equal(normalized.koType, "gowun");
  assert.equal(normalized.fontMode, "koUnified");
  assert.equal(normalized.palette, "noir");
});

test("selection resolution explains every compatibility fallback", () => {
  const resolution = resolveSelection({
    aesthetic: "luxury",
    surface: "glass",
    palette: "primary",
  });

  assert.equal(resolution.valid, false);
  assert.equal(resolution.resolved.surface, "paper");
  assert.equal(resolution.resolved.palette, "noir");
  assert.deepEqual(
    resolution.adjustments.map(({ axis, reason }) => ({ axis, reason })),
    [
      { axis: "surface", reason: "not-allowed-by-aesthetic" },
      { axis: "palette", reason: "not-allowed-by-aesthetic" },
    ],
  );
});

test("bilingual randomization preserves the selected type binding", () => {
  const nearEnd = () => 0.999999;
  const split = randomCompatibleSelection({ fontMode: "split" }, nearEnd);
  const unified = randomCompatibleSelection({ fontMode: "koUnified" }, nearEnd);

  assert.equal(split.fontMode, "split");
  assert.equal(unified.fontMode, "koUnified");
  assert.ok(getAestheticRule(split.aesthetic).allowed.fontMode.includes("split"));
  assert.ok(getAestheticRule(unified.aesthetic).allowed.fontMode.includes("koUnified"));
  assert.ok(axisKeys.every((axis) => isOptionAllowed(split, axis, split[axis])));
  assert.ok(axisKeys.every((axis) => isOptionAllowed(unified, axis, unified[axis])));
});

test("the raw compatibility model retains every stored axis", () => {
  assert.equal(combinationCount(), 1_303_392);
});

test("new lineage and company aesthetics have full-page implementations", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  const additions = ["bauhaus", "artDeco", "scandinavian", "atlassian", "atlassianDark", "primer", "primerDark", "sapHorizon", "sapHorizonDark", "sapHorizonHcb", "sapHorizonHcw", "sapQuartz", "sapQuartzDark", "sapQuartzHcb", "sapQuartzHcw", "sapBelize", "material3", "material3Dark", "mui", "muiDark", "fluent2", "fluent2Dark", "carbon", "carbonDark", "shadcn", "shadcnDark", "zag", "tamagui", "tamaguiDark", "nebular", "nebularDark"];
  assert.equal(axes.aesthetic.length, 43);
  for (const id of additions) {
    assert.ok(axes.aesthetic.some((option) => option.id === id), id);
    assert.match(css, new RegExp(`data-aesthetic=["']${id}["']`), id);
  }
});

test("new dependent options are implemented and conservatively enabled", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  const additions = {
    surface: ["skeuo", "acrylic", "eink"],
    layout: ["masonry", "dashboard", "masterDetail", "feed", "supportingPane", "table", "wizard"],
    palette: ["pureWhite", "enterpriseNavy", "enterpriseEvergreen", "enterpriseBurgundy", "enterpriseGraphite", "bauhaus", "deco", "nordic", "atlassian", "atlassianDark", "primer", "primerDark", "sapHorizon", "sapHorizonDark", "sapHorizonHcb", "sapHorizonHcw", "sapQuartz", "sapQuartzDark", "sapQuartzHcb", "sapQuartzHcw", "sapBelize", "materialDynamic", "materialDark", "mui", "muiDark", "fluent", "fluentDark", "carbon", "carbonDark", "zincDark", "zag", "tamagui", "tamaguiDark", "nebular", "nebularDark"],
    motion: ["productive", "staged", "spring"],
  };

  for (const [axis, ids] of Object.entries(additions)) {
    for (const id of ids) {
      assert.ok(axes[axis].some((option) => option.id === id), `${axis}.${id}`);
      assert.match(css, new RegExp(`data-${axis}=["']${id}["']`), `${axis}.${id}`);
      const enabledBy = axes.aesthetic.filter((aesthetic) => aestheticRules[aesthetic.id].allowed[axis].includes(id));
      assert.ok(enabledBy.length > 0, `${axis}.${id} is never enabled`);
      assert.ok(enabledBy.length < axes.aesthetic.length, `${axis}.${id} is not conservative`);
    }
  }
});

test("company design systems keep native defaults", () => {
  assert.deepEqual(
    ["atlassian", "atlassianDark", "primer", "primerDark", "sapHorizon", "sapHorizonDark", "sapHorizonHcb", "sapHorizonHcw", "sapQuartz", "sapQuartzDark", "sapQuartzHcb", "sapQuartzHcw", "sapBelize", "material3", "material3Dark", "mui", "muiDark", "fluent2", "fluent2Dark", "carbon", "carbonDark", "shadcn", "shadcnDark", "zag", "tamagui", "tamaguiDark", "nebular", "nebularDark"].map((id) => ({
      id,
      surface: aestheticRules[id].defaults.surface,
      layout: aestheticRules[id].defaults.layout,
      palette: aestheticRules[id].defaults.palette,
    })),
    [
      { id: "atlassian", surface: "flat", layout: "dashboard", palette: "atlassian" },
      { id: "atlassianDark", surface: "flat", layout: "dashboard", palette: "atlassianDark" },
      { id: "primer", surface: "flat", layout: "dense", palette: "primer" },
      { id: "primerDark", surface: "flat", layout: "dense", palette: "primerDark" },
      { id: "sapHorizon", surface: "flat", layout: "masterDetail", palette: "sapHorizon" },
      { id: "sapHorizonDark", surface: "flat", layout: "masterDetail", palette: "sapHorizonDark" },
      { id: "sapHorizonHcb", surface: "flat", layout: "masterDetail", palette: "sapHorizonHcb" },
      { id: "sapHorizonHcw", surface: "flat", layout: "masterDetail", palette: "sapHorizonHcw" },
      { id: "sapQuartz", surface: "flat", layout: "masterDetail", palette: "sapQuartz" },
      { id: "sapQuartzDark", surface: "flat", layout: "masterDetail", palette: "sapQuartzDark" },
      { id: "sapQuartzHcb", surface: "flat", layout: "masterDetail", palette: "sapQuartzHcb" },
      { id: "sapQuartzHcw", surface: "flat", layout: "masterDetail", palette: "sapQuartzHcw" },
      { id: "sapBelize", surface: "flat", layout: "masterDetail", palette: "sapBelize" },
      { id: "material3", surface: "material", layout: "cards", palette: "materialDynamic" },
      { id: "material3Dark", surface: "material", layout: "cards", palette: "materialDark" },
      { id: "mui", surface: "material", layout: "dashboard", palette: "mui" },
      { id: "muiDark", surface: "material", layout: "dashboard", palette: "muiDark" },
      { id: "fluent2", surface: "flat", layout: "masterDetail", palette: "fluent" },
      { id: "fluent2Dark", surface: "flat", layout: "masterDetail", palette: "fluentDark" },
      { id: "carbon", surface: "flat", layout: "dashboard", palette: "carbon" },
      { id: "carbonDark", surface: "flat", layout: "dashboard", palette: "carbonDark" },
      { id: "shadcn", surface: "flat", layout: "dashboard", palette: "pureWhite" },
      { id: "shadcnDark", surface: "flat", layout: "dashboard", palette: "zincDark" },
      { id: "zag", surface: "flat", layout: "landing", palette: "zag" },
      { id: "tamagui", surface: "material", layout: "landing", palette: "tamagui" },
      { id: "tamaguiDark", surface: "material", layout: "landing", palette: "tamaguiDark" },
      { id: "nebular", surface: "flat", layout: "dashboard", palette: "nebular" },
      { id: "nebularDark", surface: "flat", layout: "dashboard", palette: "nebularDark" },
    ],
  );
});

test("Primer separates blue accent states from green primary actions", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  assert.match(css, /data-palette=["']primer["'][^}]*--site-accent:#0969da;--site-accent-2:#ddf4ff;--site-accent-3:#1f883d;--site-success:#1f883d/);
  assert.match(css, /data-palette=["']primerDark["'][^}]*--site-accent:#4493f8;--site-accent-2:#0c2d6b;--site-accent-3:#3fb950;--site-success:#238636/);
  assert.match(css, /data-aesthetic=["']primer["'][^\n]*\.sample-nav nav a:first-child \{ color:var\(--site-accent\)/);
  assert.match(css, /button-cell button:first-child\) \{ color:#fff;[^}]*background:var\(--site-success\)/);
  assert.match(css, /tag-cell button\.selected,[^}]*route-point\) \{ color:#fff; \}/);
  assert.match(css, /toggle-cell button em \{ background:#fff; \}/);
});

test("quick actions keep distinct filled emphasis colors", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  assert.match(css, /\.page-jump-toggle \{ color:#fff;border-color:var\(--lab-blue\);background:var\(--lab-blue\); \}/);
  assert.match(css, /\.random-toggle \{ color:#171714;border-color:#d3b900;background:var\(--lab-yellow\)/);
  assert.match(css, /\.share-toggle \{ color:#fff;border-color:var\(--lab-red\);background:var\(--lab-red\)/);
});

test("official dark variants preserve their parent geometry and lock native dark tokens", () => {
  const pairs = [
    ["atlassian", "atlassianDark", "atlassianDark"],
    ["primer", "primerDark", "primerDark"],
    ["sapHorizon", "sapHorizonDark", "sapHorizonDark"],
    ["sapQuartz", "sapQuartzDark", "sapQuartzDark"],
    ["material3", "material3Dark", "materialDark"],
    ["mui", "muiDark", "muiDark"],
    ["fluent2", "fluent2Dark", "fluentDark"],
    ["carbon", "carbonDark", "carbonDark"],
    ["shadcn", "shadcnDark", "zincDark"],
    ["tamagui", "tamaguiDark", "tamaguiDark"],
    ["nebular", "nebularDark", "nebularDark"],
  ];

  for (const [light, dark, palette] of pairs) {
    for (const axis of dependentAxisKeys.filter((axis) => axis !== "palette")) {
      assert.deepEqual(aestheticRules[dark].allowed[axis], aestheticRules[light].allowed[axis], `${dark}.${axis}`);
    }
    assert.deepEqual(aestheticRules[dark].allowed.palette, [palette]);
  }
});

test("SAP Fiori generations and accessibility themes remain separately governed", () => {
  const families = [
    ["sapHorizon", ["sapHorizon", "sapHorizonDark", "sapHorizonHcb", "sapHorizonHcw"]],
    ["sapQuartz", ["sapQuartz", "sapQuartzDark", "sapQuartzHcb", "sapQuartzHcw"]],
  ];

  for (const [light, variants] of families) {
    for (const variant of variants) {
      assert.equal(aestheticRules[variant].defaults.layout, aestheticRules[light].defaults.layout);
      assert.deepEqual(aestheticRules[variant].allowed.palette, [variant]);
    }
  }
  assert.deepEqual(aestheticRules.sapBelize.allowed.palette, ["sapBelize"]);
  assert.deepEqual(normalizeSelection({ aesthetic: "fiori" }).aesthetic, "sapHorizon");
  assert.deepEqual(normalizeSelection({ aesthetic: "fioriDark" }).aesthetic, "sapHorizonDark");
});

test("Apple Liquid Glass aesthetics and the Liquid Glass surface are fully removed", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  const source = readFileSync(new URL("../app/StyleLab.tsx", import.meta.url), "utf8");
  assert.equal(axes.aesthetic.some((option) => option.id.startsWith("appleLiquid")), false);
  assert.equal(axes.surface.some((option) => option.id === "liquid"), false);
  assert.equal(axes.palette.some((option) => option.id.startsWith("appleSystem")), false);
  assert.equal(axes.surface.length, 11);
  assert.doesNotMatch(source, /liquidGlassWarpMap|ui-liquid-glass-refraction/);
  assert.doesNotMatch(css, /appleLiquid|data-surface=["']liquid["']|ui-liquid-glass-refraction/);
});

test("Glassmorphism keeps its backdrop highly transmissive", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  assert.match(css, /data-surface="glass"[^\n]+site-solid\) 8%,transparent/);
  assert.match(css, /data-surface="glass"[^\n]+sample-surface[^\n]+blur\(7px\) saturate\(1\.12\)/);
  assert.match(css, /data-surface="glass"[^\n]+sample-noise[^\n]+radial-gradient/);
});

test("common layouts and motion models have full-canvas implementations", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  for (const layout of ["feed", "supportingPane", "table", "wizard"]) {
    assert.match(css, new RegExp(`data-layout=["']${layout}["']`));
  }
  for (const motion of ["productive", "staged", "spring"]) {
    assert.match(css, new RegExp(`data-motion=["']${motion}["']`));
  }
  assert.match(css, /prefers-reduced-motion:reduce/);
});

test("dot matrix texture is opt-in rather than a global canvas default", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  const baseNoise = css.match(/\.sample-noise\s*\{[^}]+\}/)?.[0] ?? "";
  assert.match(baseNoise, /opacity:\s*0/);
  assert.match(baseNoise, /background:\s*none/);
  assert.match(css, /data-surface="eink"[^\n]+sample-noise[^\n]+radial-gradient/);
  assert.doesNotMatch(css, /data-surface="acrylic"[^\n]+sample-noise[^\n]+5px 5px/);
});

test("Korean typography options remain sans, gothic, or coding-oriented", () => {
  const prohibited = /myeongjo|명조|serif/i;
  assert.equal(axes.koType.length, 10);
  for (const option of axes.koType) {
    assert.doesNotMatch(`${option.id} ${option.ko} ${option.en} ${option.note}`, prohibited);
  }
});

test("every Korean type option has a full-canvas CSS implementation", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  for (const option of axes.koType) {
    assert.match(css, new RegExp(`data-ko-type=["']${option.id}["']`), option.id);
  }
  assert.match(css, /--site-ko-hero-size/);
  assert.match(css, /--site-ko-display-line/);
  assert.match(css, /--site-ko-tracking/);
});

test("Bento Pastel is implemented as a palette skin with a conservative allowlist", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  assert.ok(axes.palette.some((option) => option.id === "bentoPastel"));
  assert.match(css, /data-palette=["']bentoPastel["']/);
  assert.deepEqual(
    axes.aesthetic
      .filter((aesthetic) => aestheticRules[aesthetic.id].allowed.palette.includes("bentoPastel"))
      .map((aesthetic) => aesthetic.id),
    ["memphis", "organic"],
  );
});

test("enterprise rail palettes keep accessible dark navigation and a conservative allowlist", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  const family = [
    ["enterpriseNavy", "16294a"],
    ["enterpriseEvergreen", "193324"],
    ["enterpriseBurgundy", "402731"],
    ["enterpriseGraphite", "2d2e2f"],
  ];
  const luminance = (hex) => {
    const channels = hex.match(/../g).map((part) => parseInt(part, 16) / 255);
    const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };

  for (const [id, rail] of family) {
    assert.ok(axes.palette.some((option) => option.id === id));
    assert.match(css, new RegExp(`data-palette=["']${id}["'][^\\n]+--site-rail:#${rail}`));
    assert.ok(1.05 / (luminance(rail) + 0.05) >= 4.5, `${id} rail must pass WCAG AA with white text`);
    assert.deepEqual(
      axes.aesthetic
        .filter((aesthetic) => aestheticRules[aesthetic.id].allowed.palette.includes(id))
        .map((aesthetic) => aesthetic.id),
      ["minimal", "fluent2", "carbon", "shadcn"],
    );
  }
  assert.match(css, /enterpriseEvergreen[^\n]+enterpriseBurgundy[^\n]+enterpriseGraphite[^\n]+sample-nav[^\n]+background:var\(--site-rail\)/);
});

test("every aesthetic, surface, and layout exposes an auditable reference", () => {
  for (const axis of ["aesthetic", "surface", "layout"]) {
    for (const option of axes[axis]) {
      assert.equal(hasStyleEvidence(axis, option.id), true, `${axis}.${option.id}`);
    }
  }
});

test("structural layouts use dedicated semantic renderers", () => {
  const source = readFileSync(new URL("../app/StyleLab.tsx", import.meta.url), "utf8");
  assert.match(source, /masonry-workbench/);
  assert.match(source, /dashboard-workbench/);
  assert.match(source, /master-detail-workbench/);
  assert.match(source, /<table>/);
  assert.match(source, /Operations data table/);
  assert.match(source, /wizard-workbench/);
  assert.match(source, /Guided task flow/);
  assert.match(source, /<ol>/);
  assert.match(source, /ResponsiveContainer/);
});
