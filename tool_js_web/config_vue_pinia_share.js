let {defineStore, createPinia} = require("pinia")
let piniaPluginPersist = require("pinia-plugin-persist")


globalThis.config_vue_pinia_share = function ({   app, name="share000",state, persist}) {

    
    if(!window["pinia_init_isok"]){
      let pinia = createPinia()
      pinia.use(piniaPluginPersist)
      app.use(pinia)
      window["pinia_init_isok"]=true
      debugger
      
    }


    let BusUse = defineStore(name, {
        state() {
            return state
        },

        persist
    })

    globalThis[name] = BusUse()
    app.config.globalProperties[name] = BusUse() //仔细找找挂载 this._content. config .globalProperties

}