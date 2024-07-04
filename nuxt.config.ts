// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss'],
    runtimeConfig: {
      public: {
        BASE_URL: 'https://api.openweathermap.org/data/2.5/',

      }
    },
  modules: [
      'nuxt-svgo',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxt/image',
  ],
  svgo: {
    defaultImport: 'component',
  },
  devtools: { enabled: true }
})