import { createRouter, createWebHistory } from 'vue-router'
import login from '@src/login.vue'
import NotFound from './views/NotFound.vue' // 确保路径正确
import Layout from '@/Layout/Layout.vue'

// 配置路由规则
const constRouter = [
  // 重定向
  { path: '', redirect: '/login' }, //重定向
  { path: '/login', name: '登陆页', component: login }, //登陆页
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound }, //没有发现页面
  {
    path: '/',
    name: '菜单分组',
    component: Layout,
    // 配置子路由
    children: [
      { path: '/home', name: '首页', component: () => import('@/Layout/Home.vue') }, //
      { path: '/Image_croper', name: '图片裁切', component: () => import('@/views/Image_croper.vue') }, //
      { path: '/webset', name: '网站设置', component: () => import('@/views/webset.vue') }, //
      {
        path: '/sys',
        name: '系统设置',
        children: [
          { path: '/sys/menu', name: '菜单管理', component: () => import('@/views/sys/menu.vue') }, //
          { path: '/sys/role', name: '角色管理', component: () => import('@/views/sys/role.vue') }, //
          { path: '/sys/user', name: '用户管理', component: () => import('@/views/sys/user.vue') }, //
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用路由规则
  // 使用路路由规则常量
  routes: constRouter,
})

// 导出router
export default router
