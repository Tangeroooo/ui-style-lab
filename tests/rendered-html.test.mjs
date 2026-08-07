import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the UI Style Lab product", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>UI Style Lab/);
  assert.match(html, /STYLE LAB/);
  assert.doesNotMatch(html, /UI Language Lab|LANGUAGE LAB/);
  assert.match(html, /LIVE COMBINATION/);
  assert.match(html, /FIELD NOTES/);
  assert.match(html, /Seasonal field walks/);
  assert.match(html, /FULL-PAGE LIVE CANVAS/);
  assert.match(html, /CURATED STARTING POINTS<!-- --> · <!-- -->57/);
  assert.match(html, /Primary action/);
  assert.match(html, /Navigation/);
  assert.match(html, /Latin Type/);
  assert.doesNotMatch(html, /Korean Type/);
  assert.doesNotMatch(html, /Type Binding/);
  assert.match(html, /100,608/);
  assert.match(html, /lucide-languages/);
  assert.match(html, /floating-language/);
  assert.match(html, /floating-utilities/);
  assert.match(html, /page-jump-toggle/);
  assert.match(html, /random-toggle/);
  assert.match(html, /share-toggle/);
  assert.match(html, /Jump to curated presets/);
  assert.match(html, /lucide-shuffle/);
  assert.match(html, /lucide-share/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("the live-canvas CTA follows the validated count and uses a full button treatment", () => {
  const source = readFileSync(new URL("../app/StyleLab.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/style-lab.css", import.meta.url), "utf8");
  assert.match(source, /className="intro-count"[^]*className="explore-cta"/);
  assert.match(source, /explore: "View live canvas"/);
  assert.match(source, /explore: "실제 조합 바로 보기"/);
  assert.match(css, /\.explore-cta \{[^}]*display:flex;[^}]*min-height:56px;[^}]*width:100%;[^}]*background:var\(--lab-blue\)/);
  assert.match(css, /\.explore-cta:focus-visible/);
  assert.match(css, /\.intro-side \{ display:grid;grid-template-columns:minmax\(0,1fr\) minmax\(220px,\.7fr\)/);
});
