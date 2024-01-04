import path from 'node:path';
import { createRequire } from 'node:module';

import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);
const cMapsDir = path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps');
const standardFontsDir = path.join(
  path.dirname(require.resolve('pdfjs-dist/package.json')),
  'standard_fonts',
);

export default defineConfig({
  base: './',
  plugins: [
    topLevelAwait(),
    react(),
    viteStaticCopy({
      targets: [
        { src: cMapsDir, dest: '' },
        { src: standardFontsDir, dest: '' },
      ],
    }),
  ],
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
