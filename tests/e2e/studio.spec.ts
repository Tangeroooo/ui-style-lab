import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('fresh entry opens Scenes; an old unsectioned link still opens Page Lab', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.lab-shell')).toHaveAttribute('data-section','scenes');
  await page.goto('/?view=lab&language=en');
  await expect(page.locator('.lab-shell')).toHaveAttribute('data-section','page');
});
test('invites, role edits, duplicate handling and scene sharing work', async ({ page }) => {
  await page.goto('/?section=scenes&scene=team&language=en');
  await page.getByRole('textbox',{name:'Email address'}).fill('new@example.com');
  await page.getByRole('button',{name:'Invite member',exact:true}).click();
  await expect(page.locator('.scene-members>li')).toHaveCount(3);
  await page.getByRole('combobox',{name:'new@example.com role'}).selectOption('viewer');
  await expect(page.getByRole('combobox',{name:'new@example.com role'})).toHaveValue('viewer');
  await page.getByRole('textbox',{name:'Email address'}).fill('new@example.com');
  await page.getByRole('button',{name:'Invite member',exact:true}).click();
  await expect(page.locator('.scene-notice')).toContainText('already');
  await page.getByRole('button',{name:'Remove new@example.com'}).click();
  await expect(page.locator('.scene-members>li')).toHaveCount(2);
  await page.getByRole('button',{name:'Personal space',exact:true}).click();
  await expect(page).toHaveURL(/scene=settings/);
  await expect(page.locator('.preview-toolbar a')).toHaveAttribute('href',/scene=settings/);
});
test('upload handles real file metadata, rejects invalid files, and completes sample progress', async ({ page }) => {
  await page.goto('/?section=scenes&scene=upload&language=en');
  await page.locator('input[type=file]').setInputFiles({name:'invalid.exe',mimeType:'application/octet-stream',buffer:Buffer.from('test')});
  await expect(page.getByRole('alert')).toContainText('GPX');
  await page.getByRole('button',{name:'Try a sample file'}).click();
  await expect(page.locator('.scene-files li')).toHaveCount(2);
  await expect(page.getByRole('progressbar')).toHaveCount(0);
});
test('period selection updates the chart and its accessible data table together', async ({ page }) => {
  await page.goto('/?section=scenes&scene=analytics&language=en');
  await expect(page.locator('.analytics-kpis')).toContainText('622');
  await page.getByRole('combobox',{name:'Period',exact:true}).selectOption('week');
  await expect(page.locator('.analytics-kpis')).toContainText('216');
  await page.getByText('View chart data',{exact:true}).click();
  await expect(page.locator('.analytics-data tbody tr')).toHaveCount(7);
  await expect(page.locator('.analytics-chart')).toHaveAttribute('aria-label',/216/);
});
test('booking reflects chosen date and time, and settings support save and discard', async ({ page }) => {
  await page.goto('/?section=scenes&scene=booking&language=en');
  await page.getByRole('button',{name:'November 2026 13',exact:true}).click();
  await page.getByRole('button',{name:'14:00',exact:true}).click();
  await expect(page.locator('.booking-summary')).toContainText('2026.11.13');
  await expect(page.locator('.booking-summary')).toContainText('14:00');
  await page.getByRole('button',{name:'Confirm demo reservation'}).click();
  await expect(page.getByRole('status').filter({hasText:'Demo reservation'})).toBeVisible();
  await page.getByRole('button',{name:'Personal space',exact:true}).click();
  await page.getByRole('switch',{name:'Offline maps'}).click();
  await page.getByRole('button',{name:'Save changes'}).click();
  await expect(page.getByRole('button',{name:'Save changes'})).toBeDisabled();
  await page.getByRole('textbox',{name:'Display name'}).fill('Updated');
  await page.getByRole('button',{name:'Discard',exact:true}).click();
  await expect(page.getByRole('textbox',{name:'Display name'})).toHaveValue('Mina Park');
});
test('dashboard is task-first; route filters, details and planner are connected', async ({ page }) => {
  await page.goto('/?aesthetic=atlassian&layout=dashboard&section=page&language=en');
  await expect(page.locator('.analytics-panel')).toBeVisible();
  await expect(page.locator('.sample-hero')).toHaveCount(0);
  await page.getByRole('searchbox',{name:'Search routes'}).fill('basalt');
  await expect(page.locator('.route-explorer tbody tr')).toHaveCount(1);
  await page.getByRole('button',{name:'Basalt coast',exact:true}).click();
  await expect(page.getByRole('article',{name:'Selected route'})).toContainText('5.2 km');
  await page.locator('.route-planner').getByRole('button',{name:'Continue'}).click();
  await expect(page.getByRole('alert')).toContainText('Choose a region');
  await page.getByRole('radio',{name:'Jeju',exact:true}).check();
  await page.locator('.route-planner').getByRole('button',{name:'Continue'}).click();
  await page.getByRole('radio',{name:'Steady · 3 hours'}).check();
  await page.locator('.route-planner').getByRole('button',{name:'Continue'}).click();
  await expect(page.locator('.route-planner dl')).toContainText('Steady');
  await page.getByRole('button',{name:'Finish plan'}).click();
  await expect(page.locator('.route-planner')).toContainText('No real reservation');
});
test('mobile master-detail keeps a path back to all routes', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/?aesthetic=atlassian&layout=masterDetail&view=reference&language=en');
  await page.getByRole('button',{name:'View route: Eastern ridge',exact:true}).click();
  await expect(page.getByRole('article',{name:'Selected route'})).toBeVisible();
  await page.getByRole('button',{name:'Back to routes',exact:true}).click();
  await expect(page.locator('.route-card')).toHaveCount(6);
  await expect(page.getByRole('button',{name:'View route: Basalt coast',exact:true})).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test('preview widths, comparison and full-screen escape work', async ({ page }) => {
  await page.goto('/?section=scenes&scene=team&language=en');
  await page.getByRole('button',{name:'Mobile',exact:true}).click();
  await expect(page.locator('.preview-frame iframe')).toHaveCSS('width','390px');
  await page.getByRole('button',{name:'Compare',exact:true}).click();
  await expect(page.locator('.preview-frame iframe')).toHaveCount(2);
  await page.getByRole('button',{name:'Expand',exact:true}).click();
  await expect(page.locator('.preview-workspace')).toHaveAttribute('data-expanded','true');
  await page.frameLocator('.preview-frame iframe').first().getByRole('textbox', {name:'Email address'}).focus();
  await page.keyboard.press('Escape');
  await expect(page.locator('.preview-workspace')).toHaveAttribute('data-expanded','false');
});
test('default component switches and value controls actually update', async ({ page }) => {
  await page.goto('/?section=components&component=switch&language=en');
  const control=page.locator('.component-detail [data-preview-state=default]').getByRole('switch');
  await control.click();
  await expect(control).toHaveAttribute('aria-checked','true');
  await control.click();
  await expect(control).toHaveAttribute('aria-checked','false');
  await page.goto('/?section=components&component=number-input&language=en');
  const specimen=page.locator('.component-detail [data-preview-state=default]');
  await specimen.getByRole('button',{name:'Increase by one'}).click();
  await expect(specimen.getByRole('spinbutton')).toHaveValue('5');
});
for (const width of [390,1280]) {
 test(`all scenes are accessible and fit at ${width}px`, async ({ page }) => {
  await page.setViewportSize({width,height:900});
  for (const scene of ['team','upload','analytics','booking','settings']) {
   await page.goto(`/?section=scenes&scene=${scene}&view=reference&language=en&capture=1`);
   await expect(page.locator('.reference-view')).toHaveAttribute('data-agent-ready','true',{timeout:15000});
   expect(await page.evaluate(() => document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
   const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   expect(results.violations.map(v => ({id:v.id,targets:v.nodes.map(n=>n.target)}))).toEqual([]);
  }
 });
}
for (const example of [
  {name:'scene-team-studio', query:'section=scenes&scene=team&language=en&capture=1',width:1440,height:1000},
  {name:'scene-dark-analytics', query:'section=scenes&scene=analytics&aesthetic=shadcnDark&view=reference&language=en&capture=1',width:1200,height:900},
  {name:'scene-booking-mobile', query:'section=scenes&scene=booking&view=reference&language=ko&copyMode=only&capture=1',width:390,height:844},
]) {
  test(`${example.name} visual composition`, async ({ page }) => {
    await page.setViewportSize({width:example.width,height:example.height});
    await page.goto(`/?${example.query}`);
    await expect(page.locator('main')).toHaveAttribute('data-agent-ready','true',{timeout:15000});
    const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(results.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))).toEqual([]);
    await expect(page).toHaveScreenshot(`${example.name}.png`,{animations:'disabled'});
  });
}

test('month changes always select an available date', async ({ page }) => {
  await page.goto('/?section=scenes&scene=booking&view=reference&language=en');
  for (let month = 0; month < 13; month++) {
    await expect(page.locator('.scene-calendar button[aria-pressed=true]')).toBeEnabled();
    await page.getByRole('button', {name: 'Next month', exact: true}).click();
  }
});
test('mixed copy has substantive English companions while Korean only stays Korean', async ({ page }) => {
  for (const section of ['scenes&scene=team', 'page&layout=dashboard&aesthetic=atlassian']) {
    await page.goto(`/?section=${section}&view=reference&language=ko&copyMode=mixed`);
    await expect(page.locator('h3 .studio-companion').first()).toBeVisible();
    await page.goto(`/?section=${section}&view=reference&language=ko&copyMode=only`);
    await expect(page.locator('.studio-companion')).toHaveCount(0);
  }
});
