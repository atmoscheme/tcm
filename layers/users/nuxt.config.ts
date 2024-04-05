export default defineNuxtConfig({
    extends: ['../../ui/'],

    // imports: {
    //     dirs: ['./stores'],
    // },

    components: {
        dirs: [
            {
                path: './components',
                ignore: ['**/*.ts'],
            },
        ],
    },

    typescript: {
        includeWorkspace: true,
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modules: [

        // app modules:
    ],
});