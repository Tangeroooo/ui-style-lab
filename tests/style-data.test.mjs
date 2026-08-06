import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  aestheticRules,
  axes,
  axisKeys,
  combinationCount,
  dependentAxisKeys,
  isOptionAllowed,
  normalizeSelection,
  presets,
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

test("the raw compatibility model retains every stored axis", () => {
  assert.equal(combinationCount(), 359_904);
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
