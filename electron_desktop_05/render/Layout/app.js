import {createApp} from 'vue'
import App from './App.vue'
import router from '../router.js'

let app = createApp(App)

app.app_router = router
app.use(router)
app.mount('#app')
export default app
