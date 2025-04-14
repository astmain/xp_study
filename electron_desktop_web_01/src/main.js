import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vue_app from './app.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(vue_app)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {size: "small"})

app.mount('#app')
