let { defineStore, createPinia } = require("pinia")
let piniaPluginPersist = require("pinia-plugin-persist")



let pinia = createPinia()
pinia.use(piniaPluginPersist)



debugger





globalThis.vue_pinia_config= function bbb({ app, state:aaa, persist }) {

debugger
	app.use(pinia)

	const BUS111 = defineStore('state', {
		state() {return {aaa:1111}},
		// persist:persist
	})
	debugger
	globalThis.BUS=BUS111
	app.config.globalProperties.BUS = BUS111 //仔细找找挂载 this._content. config .globalProperties

	// import pinia_BUS from './BUS.js'
	// app.use(pinia_BUS.pinia)
	// const BUS = pinia_BUS.BusUse()
	// window.BUS = BUS
	// app.config.globalProperties.BUS = BUS //仔细找找挂载 this._content. config .globalProperties
}