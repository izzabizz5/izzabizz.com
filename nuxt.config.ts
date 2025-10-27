// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/styles.css'
  },
  vite: {
    plugins: [
      viteTsconfigPaths()
    ]
  },
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: 'https://api.foligo.tech/api/**'
      }
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  experimental: {
    payloadExtraction: false
  }
})
