import path from "path";
import vue from "@vitejs/plugin-vue";
import {defineConfig} from "vite";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite"; // npm install @vue-macros/reactivity-transform -D
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import requireTransform from "vite-plugin-require-transform";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unimport from "unimport/unplugin";

// https://www.bilibili.com/video/BV1GN4y1M7P5?p=7
export default defineConfig({
    //##基础路基
    base: "./",

    // ##插件语法解析
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ["vue", "vue-router"],
            // resolvers: [ IconsResolver({ prefix: 'Icon', }),ElementPlusResolver(),],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            // resolvers: [ IconsResolver({ enabledCollections: ['ep'], }),ElementPlusResolver(),],
            resolvers: [ElementPlusResolver()],
        }),

        requireTransform({fileRegex: /(.vue|.js?|.jsx?|.tsx?)$/}),
        ReactivityTransform(), //child111_$ref_省略点value

        //官网 https://github.com/unjs/unimport
        Unimport.vite({
            imports: [
                {name: "default", as: "axios", from: "axios"},
            ],
        }),
    ],

    // ## less全局变量
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
                globalVars: {
                    main_color: "red",
                },
            },
        },
    },

    //##路径别名
    resolve: {alias: {"@src": "/src", "@": path.resolve(__dirname, "./src")}},

    // ##端口代理
    server: {
        host: "0.0.0.0",
        https: false, // 是否开启 https
        port: 4000, //指定端口号,
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
});
