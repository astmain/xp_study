import app from './Layout/app.js'

////tool_js_web工具 ===========================================
require('tool_js_web')
config_vue_globalProperties({app})
config_axios_api({name: "axios_api", baseURL: 'http://127.0.0.1:5566', debug: false, timeout: 30000})
// config_vue_pinia_BUS({app: app, state: require('./BUS.js').state, persist: require('./BUS.js').persist})

// 图标库 ===========================================
import 'bootstrap-icons/font/bootstrap-icons.css';


