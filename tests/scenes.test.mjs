import assert from 'node:assert/strict';
import test from 'node:test';
import { scenes, isSceneId } from '../app/scenes/scene-data.ts';
import { periods, periodSummary, routes } from '../app/canvas/field-data.ts';
import { defaultSelection } from '../app/style-data.ts';
import { createExperienceUrl, parseExperienceLocation } from '../app/url-state.ts';

test('every scene survives a reference URL round-trip', () => {
  for (const scene of scenes) {
    const url = new URL(createExperienceUrl('https://example.com/lab/', { selection: defaultSelection, language:'ko', copyMode:'mixed', view:'lab', section:'scenes', scene:scene.id, component:'button' }, 'reference'));
    const parsed = parseExperienceLocation(url.search, '');
    assert.equal(parsed.scene, scene.id);
    assert.equal(parsed.section, 'scenes');
    assert.equal(parsed.capture, true);
  }
  assert.equal(isSceneId('invalid'), false);
  assert.equal(parseExperienceLocation('?section=scenes&scene=invalid', '').scene, null);
});
test('analytics totals and comparison percentages come from the displayed series', () => {
  for (const period of Object.keys(periods)) {
    const summary = periodSummary(period);
    assert.equal(summary.total, periods[period].values.reduce((a,b) => a+b,0));
    assert.equal(summary.change, ((summary.total / summary.previous - 1)*100).toFixed(1));
  }
  assert.notEqual(periodSummary('week').total, periodSummary('month').total);
  assert.equal(new Set(routes.map(r => r.id)).size, routes.length);
});
