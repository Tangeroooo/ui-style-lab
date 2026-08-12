import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const referenceCases = [
  {
    name: "minimal-glass-bento",
    viewport: { width: 1440, height: 900 },
    query: "aesthetic=minimal&surface=glass&layout=bento&nav=top&navStyle=text&type=grotesk&koType=plex&fontMode=split&palette=pureWhite&motion=subtle&language=en&copyMode=mixed",
  },
  {
    name: "neo-brutal-mobile",
    viewport: { width: 390, height: 844 },
    query: "aesthetic=brutalist&surface=flat&layout=landing&nav=left&navStyle=both&type=condensed&koType=blackhan&fontMode=koUnified&palette=primary&motion=kinetic&language=ko&copyMode=mixed",
  },
  {
    name: "mui-dashboard",
    viewport: { width: 1440, height: 900 },
    query: "aesthetic=mui&surface=material&layout=dashboard&nav=left&navStyle=both&type=grotesk&koType=suit&fontMode=split&palette=mui&motion=productive&language=en&copyMode=mixed",
  },
  {
    name: "editorial-supporting-pane-mobile",
    viewport: { width: 390, height: 844 },
    query: "aesthetic=editorial&surface=eink&layout=supportingPane&nav=top&navStyle=text&type=grotesk&koType=gowun&fontMode=split&palette=mono&motion=quiet&language=ko&copyMode=only",
  },
] as const;

async function openReadyReference(page: Page, query: string) {
  await page.goto(`/?${query}&view=reference&capture=1&strict=1`);
  await expect(page.locator(".reference-view")).toHaveAttribute("data-agent-ready", "true", { timeout: 12_000 });
  await expect(page.locator(".reference-view")).toHaveAttribute("data-agent-valid", "true");
  await expect(page.locator('[data-agent-pending="true"]')).toHaveCount(0);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
}

for (const reviewCase of referenceCases) {
  test(`${reviewCase.name} visual reference`, async ({ page }) => {
    await page.setViewportSize(reviewCase.viewport);
    await openReadyReference(page, reviewCase.query);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    }))).toEqual([]);
    await expect(page).toHaveScreenshot(`${reviewCase.name}.png`, { fullPage: false });
  });
}

test("mobile floating dock keeps evidence visible and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?view=lab&language=en&copyMode=mixed");
  await page.locator(".axis-controls > button").first().click();
  const dialog = page.getByRole("dialog", { name: "Aesthetic" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close options" })).toBeFocused();

  const evidenceLink = dialog.locator(".evidence-card a");
  const dock = page.locator(".floating-mixer");
  const evidenceBox = await evidenceLink.boundingBox();
  const dockBox = await dock.boundingBox();
  expect(evidenceBox).not.toBeNull();
  expect(dockBox).not.toBeNull();
  expect(evidenceBox!.y + evidenceBox!.height).toBeLessThanOrEqual(dockBox!.y - 4);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.locator(".axis-controls > button").first()).toBeFocused();
});

test("lab view passes the critical accessibility smoke test", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?view=lab&language=en&copyMode=mixed");
  await expect(page.locator(".lab-shell")).toHaveAttribute("data-agent-ready", "true", { timeout: 12_000 });
  await expect(page.locator('[data-agent-pending="true"]')).toHaveCount(0);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);

});
