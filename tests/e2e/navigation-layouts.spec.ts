import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { axes, aestheticRules, recommendedSelection } from '../../app/style-data';
import { componentCatalog } from '../../app/component-lab/component-data';

for (const width of [390, 1280]) {
  test(`every native page fits at ${width}px`, async ({ page }) => {
    test.setTimeout(180000);
    await page.setViewportSize({ width, height: 900 });
    const failures: unknown[] = [];
    for (const aesthetic of axes.aesthetic) {
      const params = new URLSearchParams({ ...recommendedSelection(aesthetic.id), section:'page', view:'reference', language:'ko', copyMode:'only', capture:'1' });
      await page.goto(`/?${params}`);
      await expect(page.locator('#live-site .sample-main')).toBeVisible();
      const metrics = await page.evaluate(() => {
        const main = document.querySelector('.sample-main')!;
        return {overflow:document.documentElement.scrollWidth-innerWidth, main:main.getBoundingClientRect().width};
      });
      if (metrics.overflow > 1 || metrics.main < (width < 600 ? width * .65 : width * .5)) failures.push({aesthetic:aesthetic.id,...metrics});
    }
    expect(failures).toEqual([]);
  });
}
test('every page layout fits the studio canvas, including side navigation', async ({ page }) => {
  test.setTimeout(180000);
  await page.setViewportSize({width:1280,height:900});
  const failures: unknown[] = [];
  for (const layout of axes.layout) {
    const aesthetic = axes.aesthetic.find(a => aestheticRules[a.id].allowed.layout.includes(layout.id))!;
    const params = new URLSearchParams({...recommendedSelection(aesthetic.id),layout:layout.id,section:'page',language:'ko',copyMode:'mixed',capture:'1'});
    await page.goto(`/?${params}`);
    await expect(page.locator('#live-site .sample-main')).toBeVisible();
    const result=await page.evaluate(() => {
      const main=document.querySelector('.sample-main')!;
      const canvas=document.querySelector('#live-site')!;
      const box=main.getBoundingClientRect();
      return {overflow:document.documentElement.scrollWidth-innerWidth,main:box.width,canvas:canvas.getBoundingClientRect().width,internal:main.scrollWidth-main.clientWidth};
    });
    if(result.overflow>1 || result.internal>2 || result.main<result.canvas*.5) failures.push({layout:layout.id,...result});
  }
  expect(failures).toEqual([]);
});
test('all component details fit the Carbon Dark canvas', async ({page}) => {
  test.setTimeout(180000);
  const failures: unknown[]=[];
  for(const width of [390,1280]) {
    await page.setViewportSize({width,height:900});
    for(const component of componentCatalog) {
      await page.goto(`/?aesthetic=carbonDark&layout=table&section=components&component=${component.id}&language=ko&copyMode=only&capture=1`);
      await expect(page.locator('#component-detail-title')).toContainText(component.ko);
      const result=await page.evaluate(() => ({overflow:document.documentElement.scrollWidth-innerWidth,cards:[...document.querySelectorAll('.component-state-card')].map(e=>({width:e.getBoundingClientRect().width,overflow:e.scrollWidth-e.clientWidth})).filter(e=>e.overflow>2)}));
      if(result.overflow>1 || result.cards.length) failures.push({component:component.id,width,...result});
    }
  }
  expect(failures).toEqual([]);
});

test('all 48 catalog cards open the right detail and return to the selected card', async ({page}) => {
  test.setTimeout(180000);
  await page.goto('/?aesthetic=carbonDark&layout=table&section=components&language=en');
  for(const component of componentCatalog) {
    const card=page.locator(`.component-catalog-card[data-component="${component.id}"]`);
    await card.locator('.component-card-action').click();
    await expect(page.locator('#component-detail-title')).toContainText(component.en);
    await expect(page.locator('#component-detail-title')).toBeFocused();
    await expect(page).toHaveURL(new RegExp(`component=${component.id}(?:&|$)`));
    await page.getByRole('button',{name:'Back to components',exact:true}).click();
    await expect(card.locator('.component-card-action')).toBeFocused();
  }
});
test('the whole card is clickable and component selection survives mobile, comparison and sharing', async ({page}) => {
  await page.goto('/?aesthetic=carbonDark&layout=table&section=components&language=en');
  const card=page.locator('.component-catalog-card[data-component="tabs"]');
  await card.click({position:{x:40,y:50}});
  await expect(page.locator('#component-detail-title')).toContainText('Tabs');
  await page.getByRole('button',{name:'Mobile',exact:true}).click();
  const frame=page.frameLocator('.preview-frame iframe').first();
  await frame.getByRole('combobox',{name:'Choose a component'}).selectOption('calendar');
  await expect(page).toHaveURL(/component=calendar/);
  await expect(page.locator('.preview-toolbar a')).toHaveAttribute('href',/component=calendar/);
  await page.getByRole('button',{name:'Compare',exact:true}).click();
  await expect(page.frameLocator('.preview-frame iframe').nth(1).locator('#component-detail-title')).toContainText('Calendar');
  await page.getByRole('button',{name:'Compare',exact:true}).click();
  await page.getByRole('button',{name:'Fit',exact:true}).click();
  await expect(page.locator('#component-detail-title')).toContainText('Calendar');
});
test('tabs, pagination, calendar, drawers and searchable commands respond to clicks', async ({page}) => {
  await page.goto('/?aesthetic=carbonDark&section=components&component=tabs&language=en');
  const specimen=page.locator('.component-detail [data-preview-state=default]');
  await specimen.getByRole('tab',{name:'Notes',exact:true}).click();
  await expect(specimen.getByRole('tabpanel')).toContainText('quiet morning');
  await specimen.getByRole('tab',{name:'Notes',exact:true}).press('ArrowRight');
  await expect(specimen.getByRole('tabpanel')).toContainText('reviewed');
  await page.getByRole('combobox',{name:'Choose a component'}).selectOption('pagination');
  await specimen.getByRole('button',{name:'Next',exact:true}).click();
  await expect(specimen.getByRole('status')).toContainText('3–4');
  await page.getByRole('combobox',{name:'Choose a component'}).selectOption('calendar');
  await specimen.getByRole('button',{name:'Next month'}).click();
  await specimen.getByRole('button',{name:'October 2026 12',exact:true}).click();
  await expect(specimen.getByRole('status')).toContainText('October 2026 · 12');
  await page.getByRole('combobox',{name:'Choose a component'}).selectOption('drawer');
  await specimen.getByRole('button',{name:'Close',exact:true}).click();
  await expect(specimen.getByRole('complementary')).toHaveCount(0);
  await specimen.getByRole('button',{name:'Open filters'}).click();
  await specimen.getByRole('button',{name:'Show results'}).click();
  await expect(specimen.getByRole('status')).toContainText('4 routes');
  await page.getByRole('combobox',{name:'Choose a component'}).selectOption('command-palette');
  await specimen.getByRole('textbox',{name:'Search commands'}).fill('GPX');
  await expect(specimen.getByRole('button')).toHaveCount(1);
  await specimen.getByRole('button',{name:'Import GPX'}).click();
  await expect(specimen.getByRole('status')).toContainText('Selected');
});
test('route detail opens in view and planning keeps the selected route and region', async ({page}) => {
  await page.goto('/?aesthetic=carbonDark&layout=table&section=page&language=en');
  await page.getByRole('button',{name:'Old pine forest',exact:true}).click();
  await expect(page.getByRole('article',{name:'Selected route'})).toBeInViewport();
  await page.getByRole('article',{name:'Selected route'}).getByRole('button',{name:'Plan a walk'}).click();
  await expect(page.locator('.planner-selected-route')).toContainText('Old pine forest');
  await expect(page.getByRole('radio',{name:'Gangwon',exact:true})).toBeChecked();
  await page.getByRole('radio',{name:'Jeju',exact:true}).check();
  await expect(page.locator('.planner-selected-route')).toHaveCount(0);
});

test('interactive component patterns retain accessible names and structure', async ({page}) => {
  test.setTimeout(120000);
  for (const component of ['tabs','pagination','combobox','calendar','tree-view','drawer','context-menu','split-button','command-palette','navigation-menu','table']) {
    await page.goto(`/?aesthetic=carbonDark&section=components&component=${component}&language=en&capture=1`);
    await expect(page.locator('#component-detail-title')).toBeVisible();
    const result=await new AxeBuilder({page}).include('.component-detail').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(result.violations.map(v=>({component,id:v.id,targets:v.nodes.map(n=>n.target)}))).toEqual([]);
  }
});
test('Carbon Dark component detail visual regression', async ({page}) => {
  await page.setViewportSize({width:1280,height:900});
  await page.goto('/?aesthetic=carbonDark&layout=table&section=components&component=tabs&language=ko&copyMode=only&capture=1');
  await expect(page.locator('main')).toHaveAttribute('data-agent-ready','true');
  await page.locator('.component-detail [data-preview-state=default]').getByRole('tab',{name:'기록',exact:true}).click();
  await page.locator('.component-detail').evaluate(element => element.scrollIntoView({behavior:'instant',block:'start'}));
  await expect(page).toHaveScreenshot('carbon-dark-components.png');
});
test('master-detail, supporting pane and dense layouts are distinct on first load', async ({page}) => {
  await page.setViewportSize({width:1280,height:900});
  await page.goto('/?aesthetic=atlassian&layout=masterDetail&section=page&view=reference&language=en');
  await expect(page.getByRole('article',{name:'Selected route'})).toBeVisible();
  await expect(page.locator('.route-results')).toHaveCSS('display','grid');
  await page.goto('/?aesthetic=minimal&layout=supportingPane&section=page&view=reference&language=en');
  await expect(page.getByRole('complementary',{name:'Collection overview'})).toBeVisible();
  await page.getByRole('button',{name:'Explore the first route'}).click();
  await expect(page.getByRole('article',{name:'Selected route'})).toBeVisible();
  await page.goto('/?aesthetic=swiss&layout=dense&section=page&view=reference&language=en');
  await expect(page.locator('.explorer-dense')).toBeVisible();
  await expect(page.locator('.route-card-art').first()).toBeHidden();
});
