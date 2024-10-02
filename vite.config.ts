import devServer, { defaultOptions } from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { cloudflareDevProxyVitePlugin, vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    ssr: {
        resolve: {
            externalConditions: ['workerd', 'worker'],
        },
    },
    plugins: [
        cloudflareDevProxyVitePlugin(),
        remix(),
        devServer({
            adapter,
            entry: 'server.ts',
            exclude: [...defaultOptions.exclude, '/assets/**', '/app/**'],
            injectClientScript: false,
        }),
        tsconfigPaths(),
    ],
})
