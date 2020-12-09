export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'web-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/node_modules/vue-flux', mode: 'client' },
    '~/plugins/prototypes/image'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-i18n'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config) {
      config.module.rules.push({
        resourceQuery: /blockType=query/,
        type: 'javascript/auto',
        loader: require.resolve('./plugins/loader/query-loader.js')
      })
    }
  },

  // Public env config
  publicRuntimeConfig: {
    dataServiceUrl: process.env.DATA_SERVICE_URL,
    imageUrl: process.env.IMAGE_URL
  },

  // Translations
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js'
      },
      {
        code: 'de',
        file: 'de.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en'
  }
}
