import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function inlineCss() {
  return {
    name: 'vite-plugin-inline-css',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html, { bundle }) {
      if (!bundle) return html;
      let cssCode = '';
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (
          fileName.endsWith('.css') &&
          chunk.type === 'asset' &&
          typeof chunk.source === 'string'
        ) {
          cssCode += chunk.source;
        }
      }
      if (cssCode) {
        html = html.replace(/<link rel="stylesheet"[^>]+href="[^"]+\.css"[^>]*>/g, '');
        html = html.replace('</head>', `<style>${cssCode}</style></head>`);
      }
      return html;
    }
  };
}

export default defineConfig({
  plugins: [react(), inlineCss()],
  server: {
    port: 3000,
    open: false
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.js',
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/test/**', 'src/main.jsx']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});
