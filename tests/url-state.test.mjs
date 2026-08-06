import assert from "node:assert/strict";
import test from "node:test";

import { combinationCount, defaultSelection } from "../app/style-data.ts";
import {
  createExperienceUrl,
  getVisibleAxisKeys,
  parseExperienceHash,
  serializeExperienceHash,
  usesBilingualCopy,
} from "../app/url-state.ts";

test("typography controls follow the selected content mode", () => {
  const english = getVisibleAxisKeys("en", "mixed");
  assert.ok(english.includes("type"));
  assert.ok(!english.includes("koType"));
  assert.ok(!english.includes("fontMode"));

  const koreanOnly = getVisibleAxisKeys("ko", "only");
  assert.ok(!koreanOnly.includes("type"));
  assert.ok(koreanOnly.includes("koType"));
  assert.ok(!koreanOnly.includes("fontMode"));

  const koreanMixed = getVisibleAxisKeys("ko", "mixed");
  assert.ok(koreanMixed.includes("type"));
  assert.ok(koreanMixed.includes("koType"));
  assert.ok(koreanMixed.includes("fontMode"));
});

test("companion English copy appears only in the Korean + English mode", () => {
  assert.equal(usesBilingualCopy("en", "mixed"), false);
  assert.equal(usesBilingualCopy("ko", "only"), false);
  assert.equal(usesBilingualCopy("ko", "mixed"), true);
});

test("each content mode reports only visually distinct combinations", () => {
  assert.equal(combinationCount(getVisibleAxisKeys("en", "mixed")), 20_804);
  assert.equal(combinationCount(getVisibleAxisKeys("ko", "only")), 44_024);
  assert.equal(combinationCount(getVisibleAxisKeys("ko", "mixed")), 322_176);
});

test("language, content mode, view, and selection round-trip through the share hash", () => {
  const hash = serializeExperienceHash({
    selection: defaultSelection,
    language: "ko",
    copyMode: "mixed",
    view: "reference",
  });
  const parsed = parseExperienceHash(`#${hash}`);

  assert.deepEqual(parsed.selection, defaultSelection);
  assert.equal(parsed.language, "ko");
  assert.equal(parsed.copyMode, "mixed");
  assert.equal(parsed.view, "reference");
});

test("reference sharing creates a canvas-only URL without mutating the source URL", () => {
  const source = "https://example.com/ui-style-lab/#live-site";
  const result = createExperienceUrl(source, {
    selection: defaultSelection,
    language: "ko",
    copyMode: "only",
    view: "lab",
  }, "reference");

  assert.match(result, /view=reference/);
  assert.match(result, /language=ko/);
  assert.match(result, /copyMode=only/);
  assert.equal(source, "https://example.com/ui-style-lab/#live-site");
});
