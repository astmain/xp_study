import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'


import ReactivityTransform from "@vue-macros/reactivity-transform/vite"; // npm install @vue-macros/reactivity-transform -D
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import requireTransform from "vite-plugin-require-transform";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unimport from "unimport/unplugin";

// https://vite.dev/config/
export default defineConfig({
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
	resolve: {
		alias: {
			// '@': fileURLToPath(new URL('./src', import.meta.url)),
			'@views': fileURLToPath(new URL('./views', import.meta.url)),
			'public': fileURLToPath(new URL('./public', import.meta.url)),
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
