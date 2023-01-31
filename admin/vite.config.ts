import { fileURLToPath, URL } from "url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import prismjs from "vite-plugin-prismjs"

// Element-plus自动导入
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import ElementPlus from "unplugin-element-plus/vite"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  server: {
    proxy: {
      "/admin": {
        target: "http://localhost:3300",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, "")
      }
    }
  },
  plugins: [
    vue({
      reactivityTransform: true
    }),
    vueJsx(),
    // checker({ typescript: true }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
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
    }),
    ElementPlus({
      useSource: true
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
        additionalData: `@use '@/assets/scss/theme/sass_theme.scss' as *;`
      }
    }
  }
})
