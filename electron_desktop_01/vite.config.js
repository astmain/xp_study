import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import requireTransform from "vite-plugin-require-transform";
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [//
        vue(),//
        ////可以使用require
        // requireTransform({
        //     fileRegex: /(.vue|.js?|.jsx?|.tsx?)$/, //
        //     exclude: [/node_modules/, // 排除 node_modules 文件夹
        //         // /\.test\.js$/,  // 排除所有以 .test.js 结尾的文件
        //     ]
        // }),//
    ],


    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'), // 假设你的assets目录在src下
            'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),//
            'views': fileURLToPath(new URL('./src/views', import.meta.url)),//
            'public': fileURLToPath(new URL('./public', import.meta.url)),//
            // 'prisma': fileURLToPath(new URL('./prisma', import.meta.url)),//
        },
    },


    server: {
        host: "0.0.0.0",//
        https: false, // 是否开启 https
        port: 22222, //指定端口号,
        open: false, //打开浏览器
        changeOrigin: true, //改变 请求头Origin头
        //代理             https://www.bilibili.com/video/BV1GN4y1M7P5/?p=34
        // proxy: {
        // 	"/api": {
        // 		target: "http://xxx.xxxxx.xxx/",
        // 		changeOrigin: true,
        // 		rewrite: (path) => path.replace(/^\/api/, ""),
        // 	},
        // },
    },


})
