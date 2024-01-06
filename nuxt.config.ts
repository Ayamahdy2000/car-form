// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/scss/main.css", "~/assets/scss/main.scss", "vue-multiselect/dist/vue-multiselect.css",],
  ssr:false,
  app: {
    head: {
      title: "Form",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
        dir:"ltr",
      },
      meta: [
        { name: "description", content: "Car form." },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
