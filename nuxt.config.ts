// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: ".",
  pages: true,
  ssr: false, // Bật server-side rendering
  app: {
    head: {
      title: "Scott's Portfolio",
      meta: [
        {
          name: "description",
          content: "Personal portfolio of Le Hai Tien, Fullstack Developer.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },
  css: ["../assets/styles.css"],
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBase: "/api",
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["model-viewer", "lottie-player"].includes(tag),
    },
  },
  vite: {
    optimizeDeps: {
      include: ["three"],
    },
  },
});
