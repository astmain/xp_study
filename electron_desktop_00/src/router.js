import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
// import LayoutView from './Layout/LayoutView.vue'
import {pinyin} from "pinyin-pro"

const routes = [//
    //重定向****************************
    // {path: '', redirect: "/迷你浏览器"}, //
    // {path: '', redirect: "/平台测试"}, //
    // {path: '', redirect: "/Setting"}, //
    {path: '', redirect: "/account_manage"}, //
    // 其他页面
    {path: '/Home', name: "首页", component: () => import('./Layout/Home.vue'),},//
    {path: '/Setting', name: "设置", component: () => import('./Layout/Setting.vue'),},//
    {path: '/account_manage', name: "账号管理", component: () => import('./views/账号管理/账号管理.vue'),},//
    // {path: '/迷你浏览器', name: "迷你浏览器", component: () => import('./views/迷你浏览器/迷你浏览器.vue'),},//
    // {path: '/一键发布', name: "一键发布", component: () => import('./views/一键发布/一键发布.vue'),},//
    // {path: '/平台测试', name: "平台测试", component: () => import('./views/平台测试/平台测试.vue'),},//
    // {path: '/数据爬虫', name: "数据爬虫", component: () => import('./views/数据爬虫/数据爬虫.vue'),},//
    // {path: '/account_manage', name: "account_manage", component: () => import('./views/account_manage/account_manage.vue'),},//


    // {
    //     path: '/设置', name: '设置', component: LayoutView, children: [//
    //         {path: '/设置/系统设置', name: '系统设置', component: () => import('./views/设置/系统设置.vue')},//
    //     ]
    // }, //


]


let routes_new = globalThis.routes_new = appendSuffixToNames({my_list: routes, my_key: "path", my_children: "children"})


const router = createRouter({
    history: createWebHashHistory(),//
    routes: routes_new,//
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

