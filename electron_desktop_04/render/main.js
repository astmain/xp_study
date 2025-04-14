import app from './Layout/app.js'

// ElementPlus ===========================================
import 'element-plus/dist/index.css'
import ElementPlus from "element-plus"

app.use(ElementPlus, {size: "small"})
// tool_js_web工具 ===========================================

require('tool_js_web')
config_vue_globalProperties({app})
config_vue_pinia_BUS({app: app, state: require('./BUS.js').state, persist: require('./BUS.js').persist})
config_axios_api({name: "axios_api", baseURL: 'http://127.0.0.1:5566', debug: false, timeout: 30000})


// 图标库 ===========================================
import 'bootstrap-icons/font/bootstrap-icons.css';