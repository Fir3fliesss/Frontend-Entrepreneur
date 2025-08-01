// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  // Vite plugins for Tailwind are managed by @nuxt/ui or a dedicated Tailwind module

  vite:{
    server:{
      allowedHosts: true,
    }
  },

  runtimeConfig: {
    public: {
      BASE_URL_API: process.env.NUXT_PUBLIC_API_BASE || 'https://api-preneur.synchronizeteams.my.id'
    }
  }
})
