import { fileURLToPath } from 'url';
import { createResolver } from '@nuxt/kit';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nuxtSvgo from 'nuxt-svgo';

const resolvePath = (path: string) => {
  const { resolve } = createResolver(import.meta.url);
  const currentDir = fileURLToPath(new URL('./', import.meta.url));

  return resolve(currentDir, path);
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    includeWorkspace: true,
  },

  plugins: [resolvePath('plugins/svg-icons-plugin')],

  modules: [nuxtSvgo, '@nuxt/image'],

  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      sm: 1020,
      md: 1440,
      lg: 1660,
    },
  },

  components: {
    dirs: [
      {
        prefix: 'Tcm',
        path: './components',
        ignore: ['**/*.ts'],
        pathPrefix: false,
      },
    ],
  },

  svgo: {
    global: true,
    autoImportPath: resolvePath('assets/icons/svg/'),
    componentPrefix: 'tcm-svg',
  },

  css: [resolvePath('assets/styles/app.scss')],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "${resolvePath('assets/styles/global.scss')}";
          `,
        },
      },
    },

    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolvePath('assets/icons/sprite')],
        // Specify symbolId format
        symbolId: 'tcm-icon-[dir]-[name]',
        svgoOptions: {
          plugins: [
            { name: 'removeDimensions' },
            { name: 'removeStyleElement' },
            { name: 'removeScriptElement' },
            {
              name: 'removeAttrs',
              params: { attrs: '(fill|stroke)' },
            },
          ],
        },
      }),
    ],
  },
});
