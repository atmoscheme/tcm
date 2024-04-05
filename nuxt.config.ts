import { resolve } from 'path';
const isDev = process.env.NODE_ENV === 'development';

/**
 * Checks to protect against careless developers
 */
if (isDev) {
  if (!process.env.NUXT_DEV_API_GATEWAY_URL) {
    console.error(
        '%s\x1B[41m\x1B[1m%s\x1B[0m',
        '\n',
        [
          '',
          '  ┌───────────────────────────────────┐',
          '  | Delete .env file and run:         |',
          '  | pnpm run work:prepare             |',
          '  └───────────────────────────────────┘',
          '',
        ].join('\n'),
    );
    process.exit(1);
  }

}

const viteDevProxyConfig = {
  target: process.env.NUXT_DEV_API_GATEWAY_URL,
  headers: { origin: process.env.NUXT_DEV_API_GATEWAY_URL! },
  changeOrigin: true,
  secure: false,
  autoRewrite: true,
};

const commonRouteRules = {
  '/*': {
    swr: false,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
};
console.log(process.env)
export default defineNuxtConfig({
  app: {
    buildAssetsDir: 'dist',
    rootId: 'app',
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  debug: Boolean(process.env.NUXT_DEBUG),
  runtimeConfig: {
    /**
     * BaseURL for api-gateway (use on server only)
     * ENV NUXT_API_GATEWAY_URL
     *
     * STAND_NAME env will set on deploy pipeline
     */
    apiGatewayUrl: process.env.NUXT_DEV_API_GATEWAY_URL,
    /**
     * Enable SSR debug.
     * ENV NUXT_SSR_DEBUG
     */
    ssrDebug: false,

    devUserAgent: '',

    public: {
      /**
       * BaseURL for api-gateway on client only side
       * @see NUXT_PUBLIC_API_GATEWAY_URL
       */
      apiGatewayUrl: process.env.NUXT_DEV_API_GATEWAY_URL,
    },
  },
  telemetry: false,
  typescript: {
    typeCheck: true,
  },
  devtools: { enabled: isDev },
  extends: [
    './ui',
    './layers/users',
  ],

  nitro: {
    dev: isDev,
    timing: isDev,
    output: {
      dir: resolve('build'),
    },
    routeRules: !isDev
        ? commonRouteRules
        : {
          ...commonRouteRules,
          '/api/**': {
            // proxy: `${process.env.NUXT_API_GATEWAY_URL}/api/**`,
            proxy: `${process.env.NUXT_DEV_API_GATEWAY_URL}/api/**`,
          },
          '/api-mock/**': {
            proxy: `${process.env.NUXT_DEV_API_GATEWAY_URL}/api-mock/**`,
          },
        },
  },

  vite: {
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    server: {
      // it's working on client-side
      proxy: {
        '^/api/.*': viteDevProxyConfig,
        '^/api-mock/.*': viteDevProxyConfig,
      },
    },
  },
});
