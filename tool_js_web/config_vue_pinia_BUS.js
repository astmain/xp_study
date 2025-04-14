let {defineStore, createPinia} = require("pinia")
let piniaPluginPersist = require("pinia-plugin-persist")


globalThis.config_vue_pinia_BUS = function ({app, state, persist}) {
  debugger
    if (!window.wind_app) {
        window.wind_app = app
    }
    
    
    if(!window["pinia_init_isok"]){
      let pinia = createPinia()
      pinia.use(piniaPluginPersist)
      app.use(pinia)
      window["pinia_init_isok"]=true
    }
    
    




    let BusUse = defineStore('state', {
        state() {
            return state
        },

        persist
    })

    globalThis.BUS = BusUse()
    app.config.globalProperties.BUS = BusUse() //仔细找找挂载 this._content. config .globalProperties

}