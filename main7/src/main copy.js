import app from './app.js'

// ############################## 常用工具any_tool #################################
require('any_web')

// ############################## axios配置 #################################
window.axios_api = axios_create({ baseURL: 'http://127.0.0.1:22222', debug: true, timeout: 30000 })

// ############################## 引入css #################################
import 'element-plus/dist/index.css'

// ############################## 引入pinia #################################
import pinia_BUS from './BUS.js'
app.use(pinia_BUS.pinia)
const BUS = pinia_BUS.BusUse()
window.BUS = BUS
app.config.globalProperties.BUS = BUS //仔细找找挂载 this._content. config .globalProperties

// ############################## vue实例全局变量 #################################
window.defineAsyncComponent = defineAsyncComponent
window.dom_open = require('./dom_open.js')
window.dom_open_data = require('./dom_open_data.js')

window.vue_app = app
//路由跳转
vue_app.config.globalProperties.vue_router = window.vue_router = (path, menu) => {
  console.log('vue_router---path:', path)
  console.log('vue_router---menu-', menu)
  // 路由跳转
  app.app_router.push(path)
}
