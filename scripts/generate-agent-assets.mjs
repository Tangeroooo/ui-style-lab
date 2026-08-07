import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { buildAgentCatalog, reviewPacks } from "../app/agent-contract.ts";

const outputDirectory = resolve(process.cwd(), "public/agent");
await mkdir(outputDirectory, { recursive: true });

await Promise.all([
  writeFile(
    resolve(outputDirectory, "catalog.v1.json"),
    `${JSON.stringify(buildAgentCatalog(), null, 2)}\n`,
    "utf8",
  ),
  writeFile(
    resolve(outputDirectory, "review-packs.v1.json"),
    `${JSON.stringify({ schemaVersion: "1.0.0", reviewPacks }, null, 2)}\n`,
    "utf8",
  ),
]);
