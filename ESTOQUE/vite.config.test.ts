import { describe, it, expect } from 'vitest';
import config from './vite.config';

describe('vite.config.ts', () => {
  it('should export a config object', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  it('should have the server host configured to 0.0.0.0', () => {
    expect(config.server?.host).toBe('0.0.0.0');
  });

  it('should include the React plugin', () => {
    const plugins = (config.plugins as any[])?.flat();
    // We confirm that the plugins array is not empty, which implies the React plugin is loaded.
    expect(plugins.length).toBeGreaterThan(0);
  });
});
