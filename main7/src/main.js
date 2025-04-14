import app from './app.js'
import 'element-plus/dist/index.css'  //引入css
// ############################## 常用工具any_tool #################################
require('any_web')
config_vue_globalProperties({app})
config_vue_pinia_BUS({ app: app, state: require('./BUS.js').state, persist: require('./BUS.js').persist })
config_axios_api({name:"axios_api", baseURL: 'http://127.0.0.1:22222', debug: true, timeout: 30000 })







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
