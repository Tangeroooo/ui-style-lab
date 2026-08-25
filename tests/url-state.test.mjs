import assert from "node:assert/strict";
import test from "node:test";

import { defaultSelection } from "../app/style-data.ts";
import {
  createExperienceUrl,
  experienceCombinationCount,
  getVisibleAxisKeys,
  parseExperienceHash,
  parseExperienceLocation,
  serializeExperienceHash,
  serializeExperienceQuery,
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

  const koreanMixedSplit = getVisibleAxisKeys("ko", "mixed", "split");
  assert.ok(koreanMixedSplit.includes("type"));
  assert.ok(koreanMixedSplit.includes("koType"));
  assert.ok(koreanMixedSplit.includes("fontMode"));
  assert.equal(koreanMixedSplit.indexOf("type"), koreanMixedSplit.indexOf("koType") + 1);
  assert.equal(koreanMixedSplit.indexOf("fontMode"), koreanMixedSplit.indexOf("type") + 1);

  const koreanMixedUnified = getVisibleAxisKeys("ko", "mixed", "koUnified");
  assert.ok(!koreanMixedUnified.includes("type"));
  assert.ok(koreanMixedUnified.includes("koType"));
  assert.ok(koreanMixedUnified.includes("fontMode"));
  assert.equal(koreanMixedUnified.indexOf("fontMode"), koreanMixedUnified.indexOf("koType") + 1);
});

test("companion English copy appears only in the Korean + English mode", () => {
  assert.equal(usesBilingualCopy("en", "mixed"), false);
  assert.equal(usesBilingualCopy("ko", "only"), false);
  assert.equal(usesBilingualCopy("ko", "mixed"), true);
});

test("each content mode reports only visually distinct combinations", () => {
  assert.equal(experienceCombinationCount("en", "mixed"), 113_668);
  assert.equal(experienceCombinationCount("ko", "only"), 365_416);
  assert.equal(experienceCombinationCount("ko", "mixed"), 1_449_524);
});

test("legacy Fiori hashes migrate to the matching Horizon aesthetics", () => {
  assert.equal(parseExperienceHash("#aesthetic=fiori&palette=fiori").selection?.aesthetic, "sapHorizon");
  assert.equal(parseExperienceHash("#aesthetic=fioriDark&palette=fioriDark").selection?.aesthetic, "sapHorizonDark");
});

test("language, content mode, view, and selection round-trip through the share hash", () => {
  const hash = serializeExperienceHash({
    selection: defaultSelection,
    language: "ko",
    copyMode: "mixed",
    view: "reference",
    section: "components",
    component: "dialog",
  });
  const parsed = parseExperienceHash(`#${hash}`);

  assert.deepEqual(parsed.selection, defaultSelection);
  assert.equal(parsed.language, "ko");
  assert.equal(parsed.copyMode, "mixed");
  assert.equal(parsed.view, "reference");
  assert.equal(parsed.section, "components");
  assert.equal(parsed.component, "dialog");
});

test("reference sharing creates a canvas-only URL without mutating the source URL", () => {
  const source = "https://example.com/ui-style-lab/#live-site";
  const result = createExperienceUrl(source, {
    selection: defaultSelection,
    language: "ko",
    copyMode: "only",
    view: "lab",
    section: "components",
    component: "button",
  }, "reference");

  assert.match(result, /view=reference/);
  assert.match(result, /language=ko/);
  assert.match(result, /copyMode=only/);
  assert.match(result, /section=components/);
  assert.match(result, /component=button/);
  assert.match(result, /capture=1/);
  assert.match(result, /strict=1/);
  assert.equal(new URL(result).hash, "");
  assert.equal(source, "https://example.com/ui-style-lab/#live-site");
});

test("canonical query state round-trips independently of anchors", () => {
  const query = serializeExperienceQuery({
    selection: defaultSelection,
    language: "en",
    copyMode: "mixed",
    view: "reference",
    section: "page",
    component: "button",
    capture: true,
    strict: true,
  });
  const parsed = parseExperienceLocation(`?${query}`, "#live-site");

  assert.equal(parsed.source, "query");
  assert.deepEqual(parsed.selection, defaultSelection);
  assert.equal(parsed.capture, true);
  assert.equal(parsed.strict, true);
  assert.equal(parsed.section, null);
  assert.equal(parsed.component, null);
  assert.equal(parsed.resolution?.valid, true);
});

test("component lab deep links round-trip without changing design combination counts", () => {
  const query = serializeExperienceQuery({
    selection: defaultSelection,
    language: "en",
    copyMode: "mixed",
    view: "lab",
    section: "components",
    component: "table",
  });
  const parsed = parseExperienceLocation(`?${query}`, "");

  assert.equal(parsed.section, "components");
  assert.equal(parsed.component, "table");
  assert.deepEqual(parsed.selection, defaultSelection);
  assert.equal(experienceCombinationCount("en", "mixed"), 113_668);
});

test("query state takes precedence while legacy hash state remains readable", () => {
  const parsed = parseExperienceLocation(
    "?aesthetic=minimal&surface=flat&view=lab",
    "#aesthetic=terminal&surface=flat&view=reference",
  );
  const legacy = parseExperienceLocation("", "#aesthetic=fiori&surface=flat");

  assert.equal(parsed.source, "query");
  assert.equal(parsed.selection?.aesthetic, "minimal");
  assert.equal(parsed.view, "lab");
  assert.equal(legacy.source, "legacy-hash");
  assert.equal(legacy.selection?.aesthetic, "sapHorizon");
  assert.equal(legacy.resolution?.adjustments[0]?.reason, "legacy-alias");
});

test("strict parsing reports unknown and incompatible requested values", () => {
  const parsed = parseExperienceLocation(
    "?aesthetic=luxury&surface=glass&palette=not-a-palette&strict=1",
    "",
  );

  assert.equal(parsed.selection?.surface, "paper");
  assert.equal(parsed.selection?.palette, "noir");
  assert.equal(parsed.resolution?.valid, false);
  assert.deepEqual(
    parsed.resolution?.adjustments.map(({ axis, reason }) => ({ axis, reason })),
    [
      { axis: "surface", reason: "not-allowed-by-aesthetic" },
      { axis: "palette", reason: "unknown-option" },
    ],
  );
});
