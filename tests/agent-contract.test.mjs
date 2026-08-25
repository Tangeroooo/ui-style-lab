import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { buildAgentCatalog, buildAgentState, reviewPacks } from "../app/agent-contract.ts";
import { componentCatalog } from "../app/component-lab/component-data.ts";
import { resolveSelection } from "../app/style-data.ts";

test("the agent catalog publishes rules, evidence, presets, and bounded review packs", () => {
  const catalog = buildAgentCatalog();

  assert.equal(catalog.schemaVersion, "1.0.0");
  assert.equal(catalog.project.license.spdx, "MIT");
  assert.equal(catalog.transport.canonical, "query");
  assert.equal(catalog.compatibility.governingAxis, "aesthetic");
  assert.equal(catalog.axes.length, 10);
  assert.equal(catalog.presets.length, 62);
  assert.equal(catalog.componentLab.components.length, 48);
  assert.equal(catalog.componentLab.defaultSection, "page");
  assert.equal(catalog.compatibility.crossAxisConstraints[0].id, "kakao-screen-pair-requires-script-pairing");
  assert.ok(catalog.evidence.aesthetic.minimal);
  assert.ok(reviewPacks.every((pack) => pack.presetIds.length > 0));
  assert.equal("combinations" in catalog, false);
});

test("every catalog entry has a dedicated semantic specimen renderer", () => {
  const source = readFileSync(new URL("../app/component-lab/ComponentLabSite.tsx", import.meta.url), "utf8");
  for (const component of componentCatalog) {
    assert.match(source, new RegExp(`case ["']${component.id}["']:`), component.id);
  }
  assert.match(source, /<button\b/);
  assert.match(source, /<input\b/);
  assert.match(source, /<nav\b/);
  assert.match(source, /<table\b/);
  assert.match(source, /<details\b/);
  assert.match(source, /<dl\b/);
});

test("rendered agent state exposes requested, resolved, adjustments, and reference URL", () => {
  const resolution = resolveSelection({ aesthetic: "luxury", surface: "glass" });
  const payload = buildAgentState({
    state: {
      selection: resolution.resolved,
      language: "en",
      copyMode: "mixed",
      view: "reference",
      section: "components",
      component: "dialog",
    },
    resolution,
    ready: true,
    capture: true,
    strict: true,
  });

  assert.equal(payload.valid, false);
  assert.equal(payload.requested.surface, "glass");
  assert.equal(payload.resolved.surface, "paper");
  assert.equal(payload.adjustments[0].reason, "not-allowed-by-aesthetic");
  assert.match(payload.referenceUrl, /view=reference/);
  assert.match(payload.referenceUrl, /capture=1/);
  assert.equal(payload.mode.section, "components");
  assert.equal(payload.mode.component, "dialog");
});

test("generated installation-free assets match the source contract", () => {
  const catalog = JSON.parse(readFileSync(new URL("../public/agent/catalog.v1.json", import.meta.url), "utf8"));
  const packs = JSON.parse(readFileSync(new URL("../public/agent/review-packs.v1.json", import.meta.url), "utf8"));
  const guide = readFileSync(new URL("../public/agent-guide.md", import.meta.url), "utf8");
  const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");

  assert.deepEqual(catalog, buildAgentCatalog());
  assert.deepEqual(packs.reviewPacks, reviewPacks);
  assert.match(guide, /No `npm install`, MCP server/);
  assert.match(llms, /catalog\.v1\.json/);
});
