import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },


  server: {
    host: "0.0.0.0",
    https: false, // 是否开启 https
    port: 22222, //指定端口号,
    open: false, //打开浏览器
    changeOrigin: true, //改变 请求头Origin头
    //代理             https://www.bilibili.com/video/BV1GN4y1M7P5/?p=34
    proxy: {
      "/api": {
        target: "http://xxx.xxxxx.xxx/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
