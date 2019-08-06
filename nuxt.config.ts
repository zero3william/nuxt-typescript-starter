import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  mode: 'spa',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_1312284_h385ls8ihj5.css'
      }
    ]
  },
  loading: { color: '#fff' },
  css: ['@/assets/global.scss', 'normalize.css', 'flex.css'],
  plugins: ['@/plugins/websocket', '@/plugins/axios', '@/plugins/dayjs', '@/plugins/notifications'],
  modules: ['@nuxtjs/axios'],
  axios: {},
  build: {
    extend(config, ctx) { }
  },
  router: {
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    mode: "hash"
  },
}

export default config
