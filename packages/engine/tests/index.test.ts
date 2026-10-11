import { describe, expect, it } from 'vitest';
import { isEngineReady } from '../src/index';

// Placeholder test for step 0.3: checks the test tooling works. Removed at step 1.1.
describe('engine entry point', () => {
  it('reports that the engine is ready', () => {
    expect(isEngineReady()).toBe(true);
  });
});
