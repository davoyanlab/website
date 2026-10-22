export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  future: { compatibilityVersion: 4 },
  ssr: true,

  // Skip sourcemap generation. We ship a fully static (SSG) site and don't
  // need source maps in production. Also silences the
  // `@tailwindcss/vite:generate:build Sourcemap is likely to be incorrect`
  // build warning emitted by Tailwind v4's Vite plugin.
  sourcemap: {
    server: false,
    client: false,
  },

  nitro: {
    prerender: {
      routes: ["/", "/research", "/team", "/publications", "/virtual-lab-tour", "/contact"],
      crawlLinks: true,
    },
    // Serve page images straight out of /website-content/<page>/images/ at
    // their existing /images/<page>/... URLs, so editors only ever need to
    // touch website-content/ — nothing under public/ has to change when a
    // photo is added or replaced. See website-content/README.md.
    // Paths are relative to this file (website-settings/), so website-content/
    // — a sibling of website-settings/ at the project root — is one level up.
    publicAssets: [
      { dir: "../website-content/homepage/images", baseURL: "/images/homepage" },
      { dir: "../website-content/research/images", baseURL: "/images/research" },
      { dir: "../website-content/team/images", baseURL: "/images/team" },
      { dir: "../website-content/virtual-lab-tour/images", baseURL: "/images/virtual-lab-tour" },
    ],
  },

  routeRules: {
    "/**": { prerender: true },
  },

  ui: {
    theme: {
      colors: ["blue"],
    },
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/icon",
    "nuxt-schema-org",
    "@nuxtjs/sitemap",
  ],

  css: ["~/assets/css/main.css"],

  colorMode: {
    preference: "dark",
    classSuffix: "",
  },

  site: {
    url: "https://dspace.seas.ucla.edu",
    name: "Micro-Nano Devices and metamaterial engineering Lab @ UCLA",
  },

  app: {
    head: {
      // titleTemplate lives in app/app.vue (needs a function for the homepage).
      meta: [
        {
          name: "description",
          content:
            "Micro-Nano Devices and metamaterial engineering Lab at UCLA. Engineering light-driven spacecraft technologies and active materials.",
        },
        { name: "theme-color", content: "#0d0c0b" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  image: {
    quality: 80,
    formats: ["avif", "webp"],
  },

  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
      },
    ],
  },
});
