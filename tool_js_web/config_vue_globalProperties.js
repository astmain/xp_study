


let  { ElMessage,ElMessageBox }=  require("element-plus")

globalThis.ElMessage = ElMessage
globalThis.ElMessageBox = ElMessageBox


globalThis.config_vue_globalProperties = function ({app}) {
    console.log(`vue_globalProperties---app:`,app)
}

