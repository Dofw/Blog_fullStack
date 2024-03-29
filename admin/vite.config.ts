import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"
import UnoCSS from "unocss/vite"

import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import prismjs from "vite-plugin-prismjs"

// Element-plus自动导入
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  server: {
    proxy: {
      "/admin": {
        target: "http://localhost:3300",
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/admin/, "")
      }
    }
  },
  plugins: [
    UnoCSS(),
    vue({
      reactivityTransform: true
    }),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router"],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true,
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"]
        }
      ]
    }),
    prismjs({
      languages: ["json", "md"]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@dofw": fileURLToPath(new URL("./src/pages/examplePage/Dofw", import.meta.url)),
      "@yf": fileURLToPath(new URL("./src/pages/examplePage/Yf", import.meta.url)),
      "@zx": fileURLToPath(new URL("./src/pages/examplePage/ZxDecent", import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/scss/index.scss' as *;`
      }
    }
  }
})
