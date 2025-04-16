# react官方文档
https://reactrouter.com/start/data/routing
https://message163.github.io/react-docs/tools/swc.html

# babel官网
babeljs.io/docs/babel-parser
@babel/parser
@babel/core
@babel/generator
@babel/compat-data
@babel/code-frame
@babel/runtime
@babel/template
@babel/traverse
@babel/types


# swc
https://message163.github.io/react-docs/tools/swc.html



# MessageChannel

# useState



# react-router
数据模式
声明模式

# createBrowserRouter
使用HTML5的history API (pushState, replaceState, popState)
浏览器URL比较纯净(/search, /about, /user/123)
需要服务器端支持(nginx, apache,等)否则会刷新404

# createHashRouter
使用URL的hash部分(#/search, #/about, #/user/123)
不需要服务器端支持
刷新页面不会丢失

# createMemoryRouter
使用内存中的路由表
刷新页面会丢失状态
切换页面路由不显示URL(非浏览器环境例如React Native, Electron)


# createStaticRouter
专为服务端渲染(SSR)设计
在服务器端匹配请求路径，生成静态 HTML
需与客户端路由器(如 createBrowserRouter)配合使用


# 404问题
https://www.bilibili.com/video/BV1mcpPeMETt?p=32
npm run build




127.0.0.1:5173
http://localhost:5173/



