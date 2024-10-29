import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'
import react from '@vitejs/plugin-react'
import mustache from 'mustache'
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite'


const htmlPlugin = ({ development }: { development?: boolean }): Plugin => ({
  name: 'html-transform',
  async transformIndexHtml(html) {
    if (development) {
      const decorator = await fetchDecoratorHtml({
        env: 'dev',
        context: 'samarbeidspartner',
        chatbot: false,
        language: 'nb',
        availableLanguages: [
          {
            locale: 'nb',
            handleInApp: true,
          },
          {
            locale: 'nn',
            handleInApp: true,
          },
        ],
      })
      return {
        html: mustache.render(html, decorator),
        tags: [
          {
            tag: 'script',
            children: `window.appSettings = {
              GIT_COMMIT: 'ukjent',
              MILJO: 'labs-gcp',
              USE_MSW: true,
            }`,
          },
        ],
      }
    } else {
      return {
        html,
        tags: [
          {
            tag: 'script',
            children: `window.appSettings = {}`,
          },
          {
            tag: 'script',
            attrs: {
              src: '/hjelpemidler/barnebriller/settings.js',
            },
          },
        ],
      }
    }
  },
})

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  base: env.mode === 'development' ? '/' : '/hjelpemidler/barnebriller/',
  plugins: [htmlPlugin({ development: env.mode === 'development' }), react(), splitVendorChunkPlugin()],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
}))
