import {defineConfig} from 'vitest/config';

// Pin the time zone and locale so tests never depend on the machine they run on.
process.env.TZ = 'UTC';
process.env.LC_ALL = 'en_US.UTF-8';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
