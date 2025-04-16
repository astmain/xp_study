// import { createBrowserRouter, createHashRouter, createMemoryRouter, createStaticRouter } from "react-router";
import { createBrowserRouter } from 'react-router'
import aLayout from './layout/aLayout'
import About from './pages/About'
import Home from './pages/Home'

import min_web from './views/min_web/min_web'
import test_cpp from './views/test_cpp/test_cpp'

const router = createBrowserRouter([
  // const router = createHashRouter([
  // const router = createMemoryRouter([
  {
    path: '/',
    // path: "/index",
    Component: aLayout, //父路由可以省略path
    //子路由不需要加/
    children: [
      {
        path: 'Home',
        index: true,
        Component: Home,
        state: '111',
        meta: { title: '首页' },
      },
      {
        path: 'About',
        Component: About,
        state: '222',
        meta: { title: '关于' },
      },
      {
        path: 'min_web',
        Component: min_web,
        state: 'min_web',
        meta: { title: 'min_web' },
      },

      {
        path: 'test_cpp',
        Component: test_cpp,
        state: 'test_cpp',
        meta: { title: 'test_cpp' },
      },
    ],
  },
  // {
  //     path: "/about",
  //     Component: About,
  // },
])

export default router
