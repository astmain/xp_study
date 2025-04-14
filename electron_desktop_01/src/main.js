import app from './Layout/app.js'

// 右键菜单  https://github.com/johndatserakis/vue-simple-context-menu
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import VueSimpleContextMenu from 'vue-simple-context-menu'
app.component('VueSimpleContextMenu', VueSimpleContextMenu)


import { VueDraggable } from 'vue-draggable-plus'
app.component('VueDraggable', VueDraggable)



////tool_js_web工具 ===========================================
require('tool_js_web')
require('webview_run')

config_vue_globalProperties({ app })
config_axios_api({ name: 'axios_api', baseURL: 'http://127.0.0.1:5566', debug: false, timeout: 30000 })

// pinia共享数据   ===========================================
import BUS from './store/BUS'
import config_vue_pinia2 from './config_vue_pinia2'

config_vue_pinia2({ app: app, ...BUS })

// 图标库   ===========================================
import 'bootstrap-icons/font/bootstrap-icons.css'

import tool_web from './tool_web'


// 操作数据 ===========================================
setTimeout(() => {
  let electron = require('@electron/remote')
  let { session } = require('@electron/remote')
  window.electron = electron
  window.tb_account = electron.app.tb_account
  window.session = session
  window.api_platform222 = electron.app.api_platform
  window.api_platform = require('tool_js_api_platform')
  console.log(`electron.app:`, electron)
  console.log(`tb_account:`, tb_account)
  console.log(`session:`, session)
})
