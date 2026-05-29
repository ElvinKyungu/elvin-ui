export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxtjs/tailwindcss",
  ],
  runtimeConfig: {
    chariowApiKey: process.env.CHARIOW_API_KEY || '',
    sessionSecret: process.env.SESSION_SECRET || 'dev-only-secret-change-in-production!!',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://elvin-ui.com',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  nitro: {
    preset: "cloudflare-module"
  },
  ssr: false
});
