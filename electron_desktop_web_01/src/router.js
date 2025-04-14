import {createRouter, createWebHistory} from 'vue-router'
import vue_view from './vue_view.vue'
import {pinyin} from "pinyin-pro";

const routes = [//重定向****************************

    // {path: '', redirect: "/V1_测试平台/视频号"}, //
    // {path: '', redirect: "/V6_set_cookies/set_cookie_webview1"}, //
    {path: '', redirect: "V1_测试平台/抖音"}, //


    //home****************************
    {
        path: '/views', name: 'views', component: vue_view, children: [//
            {path: '/views/Home', name: 'Home', component: () => import("./views/Home.vue")},//
            {path: '/V1_测试平台/头条', name: '头条', component: () => import('./V1_测试平台/头条.vue')},//
            {path: '/V1_测试平台/快手', name: '快手', component: () => import('./V1_测试平台/快手.vue')},//
            {path: '/V1_测试平台/抖音', name: '抖音', component: () => import('./V1_测试平台/抖音.vue')},//
            {path: '/V1_测试平台/视频号', name: '视频号', component: () => import('./V1_测试平台/视频号.vue')},//
            {path: '/V1_测试平台/小红书', name: '小红书', component: () => import('./V1_测试平台/小红书.vue')},//
        ]
    }, //
    //
    {
        path: '/V0_文件', name: 'V0_文件', component: vue_view, children: [//
            {path: '/V0_文件/a01_web读取本地文件_转成前端File', name: 'a01_web读取本地文件_转成前端File', component: () => import('./V0_文件/a01_web读取本地文件_转成前端File.vue')},//
            {path: '/V0_文件/a02_读取文件转成base64', name: 'a02_读取文件转成base64', component: () => import('./V0_文件/a02_读取文件转成base64.vue')},//
            {path: '/V0_文件/a03_爬虫测试', name: 'a03_爬虫测试', component: () => import('./V0_文件/a03_爬虫测试.vue')},//
        ]
    }, //
    //
    //
    {
        path: '/V2_浏览器', name: 'V2_浏览器', component: vue_view, children: [//
            {path: '/V2_浏览器/迷你浏览器', name: '迷你浏览器', component: () => import('./V2_浏览器/迷你浏览器.vue')},//


        ]
    }, //
    //

    {
        path: '/V3_控制webview', name: 'V3_控制webview', component: vue_view, children: [//
            {path: '/V3_控制webview/两个webview', name: '两个webview', component: () => import('./V3_控制webview/两个webview.vue')},//


        ]
    }, ///
    {
        path: '/V4_内嵌webcontentsView', name: 'V4_内嵌webcontentsView', component: vue_view, children: [//
            {path: '/V4_内嵌webcontentsView/a01_webContentsView单个', name: 'a01_webContentsView单个', component: () => import('./V4_内嵌webcontentsView/a01_webContentsView单个.vue')},//
            {path: '/V4_内嵌webcontentsView/a02_webcontentsView多个', name: 'a02_webcontentsView多个', component: () => import('./V4_内嵌webcontentsView/a02_webcontentsView多个.vue')},//
            {path: '/V4_内嵌webcontentsView/a03_webContentsView单个_拆解方法', name: 'a03_webContentsView单个_拆解方法', component: () => import('./V4_内嵌webcontentsView/a03_webContentsView单个_拆解方法.vue')},//
            {path: '/V4_内嵌webcontentsView/a04_测试_盖住_webContentsView', name: 'a04_测试_盖住_webContentsView', component: () => import('./V4_内嵌webcontentsView/a04_测试_盖住_webContentsView.vue')},//
            {path: '/V4_内嵌webcontentsView/a05_position_webContentsView', name: 'a05_position_webContentsView', component: () => import('./V4_内嵌webcontentsView/a05_position_webContentsView.vue')},//
        ]
    }, //

    {
        path: '/V5_测试dispatchEvent', name: 'V5_测试dispatchEvent', component: vue_view, children: [//
            {path: '/V5_测试dispatchEvent/测试dispatchEvent', name: '测试dispatchEvent', component: () => import('./V5_测试dispatchEvent/测试dispatchEvent.vue')},//

        ]
    }, //
    
    
        {
        path: '/V6_set_cookies', name: 'V6_set_cookies', component: vue_view, children: [//
            {path: '/V6_set_cookies/set_cookie_webview1', name: 'set_cookie_webview1', component: () => import('./V6_set_cookies/set_cookie_webview1.vue')},//

        ]
    }, //

]


let routes_new = globalThis.routes_new = appendSuffixToNames({my_list: routes, my_key: "path", my_children: "children"})


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes_new,
})

export default router


function appendSuffixToNames({my_list, my_key, my_children}) {
    return my_list.map(item => {
        // 创建新对象并赋值
        let newItem = {...item};


        //重定向处理
        if (newItem.redirect) {
            newItem.redirect = pinyin(newItem.redirect, {toneType: "none", nonZh: 'consecutive', separator: '_',});
        }

        // 转换 name 属性为拼音
        if (newItem[my_key]) {
            // console.log(`item---:`, item)
            newItem[my_key] = pinyin(newItem[my_key], {toneType: "none", nonZh: 'consecutive', separator: '_',});
        }


        // 递归处理 children
        if (Array.isArray(newItem[my_children])) {
            newItem[my_children] = appendSuffixToNames({my_list: newItem[my_children], my_key, my_children,});
        }

        return newItem; // 返回新对象
    });
}

