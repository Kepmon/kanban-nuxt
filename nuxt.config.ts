// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Kanban | Task Manager'
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true
      }
    ]
  ],
  css: ['./assets/css/index.css']
})
