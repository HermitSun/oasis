import { Configuration } from '@nuxt/types';
import { Options } from 'webpack';

type SplitChunksOptions = Options.SplitChunksOptions;

const config: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    noscript: [{ innerHTML: 'Please enable JavaScript to view our site...' }],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico' // favicon的位置
      }
    ]
  },
  router: {
    middleware: ['authenticated']
    // base: '/oasis/'
  },
  serverMiddleware: ['~/server/index.ts'],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#edc22c', height: '3px', continuous: true },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/element-ui',
      ssr: true
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  typescript: {
    typeCheck: {
      eslint: true
    }
  },
  /*
   ** Build configuration
   */
  generate: {
    fallback: true
  },
  build: {
    // analyze: true,
    // 按需引入element-ui
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: '~assets/theme'
          }
        ]
      ],
      comments: true
    },
    // 打包时删除console.log和debugger
    terser: {
      terserOptions: {
        ecma: undefined,
        warnings: false,
        parse: {},
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'] // 移除console
        }
      }
    },
    transpile: [/^element-ui/]
    // extend(config) {
    //   // 外部引入
    //   config.externals = {
    //     'vue-wordcloud': 'WordCloud'
    //   };
    //   // if (isClient) {
    //   //   (config.optimization!
    //   //     .splitChunks! as SplitChunksOptions).maxSize = 244_000;
    //   // }
    // }
  }
};

export default config;
