<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="测试remote()">测试remote</el-button>
  </div>
</template>

<script>


export default {
  data() {
    return {
      name: "数据1",
    }
  },

  methods: {
    async 测试remote() {

      const { BrowserWindow, app ,ipcRenderer,ipcMain} = require('@electron/remote')

      console.log("BrowserWindow", BrowserWindow);
      console.log("app", app)
      console.log("ipcRenderer", ipcRenderer)
      console.log("ipcMain", ipcMain)


    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>
