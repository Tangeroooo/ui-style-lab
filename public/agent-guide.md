# UI Style Lab agent guide

UI Style Lab is a static, installation-free design reference. It lets an agent compare full-page UI combinations while preserving the selected governing aesthetic.

## Recommended workflow

1. Fetch [`agent/catalog.v1.json`](./agent/catalog.v1.json).
2. Choose either a curated preset or an aesthetic plus values from that aesthetic's `allowed` lists.
3. Build a canonical query URL. Do not generate new hash-state URLs.
4. Add `view=reference&capture=1&strict=1` for a clean, deterministic canvas.
5. In a browser, wait for `[data-agent-ready="true"]`.
6. Read the JSON in `#ui-style-lab-state`. Continue only when `valid` is `true`; otherwise inspect `adjustments` and retry with the reported `resolved` values.
7. Capture or compare the rendered page.

No `npm install`, MCP server, login, API key, or runtime SDK is required for this workflow.

## State contract

The governing axis is `aesthetic`. Every other selected layer must occur in that aesthetic's `compatibility.rules[id].allowed[axis]` list.

The live document exposes:

- `data-agent-ready="true|false"` after fonts and two animation frames settle.
- `data-agent-valid="true|false"` after compatibility resolution.
- `data-capture="true|false"` for deterministic motion handling.
- `<script id="ui-style-lab-state" type="application/json">` with `requested`, `resolved`, `adjustments`, selected labels, evidence, and a canonical reference URL.

Resolution adjustments use these reasons:

- `legacy-alias`: a retired ID migrated to its current ID.
- `unknown-option`: the axis does not contain the requested ID.
- `not-allowed-by-aesthetic`: the ID exists but is not valid for the selected aesthetic.

When `strict=1` and the request is invalid, the original query remains in the address bar so an agent can inspect what failed. The preview still renders the safe resolved selection.

## Canonical URL example

```text
https://tangeroooo.github.io/ui-style-lab/?aesthetic=minimal&surface=flat&layout=landing&nav=top&navStyle=text&type=grotesk&koType=plex&fontMode=split&palette=pureWhite&motion=quiet&language=en&copyMode=mixed&view=reference&capture=1&strict=1
```

All selection keys are stable IDs. New links should include the complete resolved state for reproducible review.

## Comparing several combinations

Use [`agent/review-packs.v1.json`](./agent/review-packs.v1.json) for bounded comparison sets, or select preset IDs from the catalog. The catalog intentionally publishes compatibility rules and curated presets instead of enumerating the full Cartesian product.

For each candidate:

```text
build URL → load reference view → wait for ready → assert valid → read evidence → capture/compare
```

The evidence registry currently covers the `aesthetic`, `surface`, and `layout` layers. It distinguishes official systems, institutional histories, documented patterns, and community terms.

## Legacy links

Existing `#aesthetic=...` links remain readable and are migrated in the browser. They are not the canonical transport and should not be emitted by new agent workflows.
