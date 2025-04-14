// let { defineStore, createPinia } = require('pinia')
// let piniaPluginPersist = require('pinia-plugin-persist')
import {defineStore} from 'pinia'
import {createPinia} from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

export default function config_vue_pinia2({app, name = 'BUS', state, persist}) {
    if (!window['pinia_init_isok']) {
        let pinia = createPinia()
        pinia.use(piniaPluginPersist)
        app.use(pinia)
        window['pinia_init_isok'] = true
    }

    const useCounterStore = defineStore(name, {
        // state: () => state,

        state: () => (state),


        persist: persist,
        // actions: {
        //     increment() {
        //         this.count++
        //     },
        //     decrement() {
        //         this.count--
        //     }
        // },
    })

    // const counterStore = useCounterStore()
    globalThis[name] = useCounterStore()
    app.config.globalProperties[name] = useCounterStore()
    // debugger
}
