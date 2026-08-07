import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  aestheticRules,
  axes,
  axisKeys,
  combinationCount,
  dependentAxisKeys,
  getAestheticRule,
  isOptionAllowed,
  normalizeSelection,
  presets,
  randomCompatibleSelection,
  recommendedSelection,
} from "../app/style-data.ts";

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

test("all curated presets are already normalized and compatible", () => {
  assert.equal(presets.length, 41);
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
  assert.equal(combinationCount(), 1_249_232);
});

test("new lineage and company aesthetics have full-page implementations", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  const additions = ["bauhaus", "artDeco", "scandinavian", "appleLiquid", "appleLiquidDark", "atlassian", "atlassianDark", "primer", "primerDark", "fiori", "fioriDark", "material3", "material3Dark", "fluent2", "fluent2Dark", "carbon", "carbonDark", "shadcn", "shadcnDark"];
  assert.equal(axes.aesthetic.length, 31);
  for (const id of additions) {
    assert.ok(axes.aesthetic.some((option) => option.id === id), id);
    assert.match(css, new RegExp(`data-aesthetic=["']${id}["']`), id);
  }
});

test("new dependent options are implemented and conservatively enabled", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  const additions = {
    surface: ["skeuo", "acrylic", "eink"],
    layout: ["masonry", "dashboard", "masterDetail"],
    palette: ["pureWhite", "enterpriseNavy", "enterpriseEvergreen", "enterpriseBurgundy", "enterpriseGraphite", "bauhaus", "deco", "nordic", "appleSystem", "appleSystemDark", "atlassian", "atlassianDark", "primer", "primerDark", "fiori", "fioriDark", "materialDynamic", "materialDark", "fluent", "fluentDark", "carbon", "carbonDark", "zincDark"],
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
    ["appleLiquid", "appleLiquidDark", "atlassian", "atlassianDark", "primer", "primerDark", "fiori", "fioriDark", "material3", "material3Dark", "fluent2", "fluent2Dark", "carbon", "carbonDark", "shadcn", "shadcnDark"].map((id) => ({
      id,
      surface: aestheticRules[id].defaults.surface,
      layout: aestheticRules[id].defaults.layout,
      palette: aestheticRules[id].defaults.palette,
    })),
    [
      { id: "appleLiquid", surface: "liquid", layout: "landing", palette: "appleSystem" },
      { id: "appleLiquidDark", surface: "liquid", layout: "landing", palette: "appleSystemDark" },
      { id: "atlassian", surface: "flat", layout: "dashboard", palette: "atlassian" },
      { id: "atlassianDark", surface: "flat", layout: "dashboard", palette: "atlassianDark" },
      { id: "primer", surface: "flat", layout: "dense", palette: "primer" },
      { id: "primerDark", surface: "flat", layout: "dense", palette: "primerDark" },
      { id: "fiori", surface: "flat", layout: "masterDetail", palette: "fiori" },
      { id: "fioriDark", surface: "flat", layout: "masterDetail", palette: "fioriDark" },
      { id: "material3", surface: "material", layout: "cards", palette: "materialDynamic" },
      { id: "material3Dark", surface: "material", layout: "cards", palette: "materialDark" },
      { id: "fluent2", surface: "flat", layout: "masterDetail", palette: "fluent" },
      { id: "fluent2Dark", surface: "flat", layout: "masterDetail", palette: "fluentDark" },
      { id: "carbon", surface: "flat", layout: "dashboard", palette: "carbon" },
      { id: "carbonDark", surface: "flat", layout: "dashboard", palette: "carbonDark" },
      { id: "shadcn", surface: "flat", layout: "dashboard", palette: "pureWhite" },
      { id: "shadcnDark", surface: "flat", layout: "dashboard", palette: "zincDark" },
    ],
  );
});

test("official dark variants preserve their parent geometry and lock native dark tokens", () => {
  const pairs = [
    ["appleLiquid", "appleLiquidDark", "appleSystemDark"],
    ["atlassian", "atlassianDark", "atlassianDark"],
    ["primer", "primerDark", "primerDark"],
    ["fiori", "fioriDark", "fioriDark"],
    ["material3", "material3Dark", "materialDark"],
    ["fluent2", "fluent2Dark", "fluentDark"],
    ["carbon", "carbonDark", "carbonDark"],
    ["shadcn", "shadcnDark", "zincDark"],
  ];

  for (const [light, dark, palette] of pairs) {
    for (const axis of dependentAxisKeys.filter((axis) => axis !== "palette")) {
      assert.deepEqual(aestheticRules[dark].allowed[axis], aestheticRules[light].allowed[axis], `${dark}.${axis}`);
    }
    assert.deepEqual(aestheticRules[dark].allowed.palette, [palette]);
  }
});

test("Apple Liquid Glass is a governing aesthetic, not a blanket translucent content surface", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  const source = readFileSync(new URL("../app/StyleLab.tsx", import.meta.url), "utf8");
  assert.deepEqual(aestheticRules.appleLiquid.allowed.surface, ["liquid"]);
  assert.deepEqual(aestheticRules.appleLiquidDark.allowed.surface, ["liquid"]);
  assert.match(source, /feImage[^>]+href=\{liquidGlassWarpMap\}/);
  assert.match(source, /feDisplacementMap[^>]+scale=\{7\}/);
  assert.match(source, /feDisplacementMap[^>]+scale=\{34\}/);
  assert.match(source, /feColorMatrix/);
  assert.match(source, /feOffset/);
  assert.match(source, /feSpecularLighting/);
  assert.match(css, /appleLiquid[^\n]+backdrop-filter:url\("#ui-liquid-glass-refraction"\)/);
  assert.match(css, /appleLiquid[^\n]+backdrop-filter:blur\(14px\) contrast\(\.84\) saturate\(1\.28\)/);
  assert.match(css, /appleLiquid[^\n]+rack-cell[^\n]+backdrop-filter:none/);
});

test("Glassmorphism stays a frosted surface rather than reusing Apple refraction", () => {
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  assert.match(css, /data-surface="glass"[^\n]+site-solid\) 30%,transparent/);
  assert.match(css, /data-surface="glass"[^\n]+sample-surface[^\n]+blur\(16px\) saturate\(1\.18\)/);
  assert.match(css, /data-surface="glass"[^\n]+sample-noise[^\n]+radial-gradient/);
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
    ["minimal", "memphis", "organic"],
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
      ["minimal", "material3", "fluent2", "carbon", "shadcn"],
    );
  }
  assert.match(css, /enterpriseEvergreen[^\n]+enterpriseBurgundy[^\n]+enterpriseGraphite[^\n]+sample-nav[^\n]+background:var\(--site-rail\)/);
});
