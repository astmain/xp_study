<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="添加账号()">添加账号</el-button>
    <el-button @click="查看账号()">查看账号</el-button>
    <el-button @click="删除partition全部()">删除partition全部</el-button>


    <!--弹框组件    -->
    <com_add_platform_account ref="com_add_platform_account"/>
    <com_manage_platform_account ref="com_manage_platform_account"/>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue"

export default {
  components: {
    com_add_platform_account: defineAsyncComponent(() => import('./com_account_add.vue')),//
    com_manage_platform_account: defineAsyncComponent(() => import('./com_account_manage.vue')),//
  },
  data() {
    return {
      name: "数据1",
    }


  },

  methods: {
    async 添加账号() {
      this.$refs.com_add_platform_account.open()
    },//

    async 查看账号() {
      this.$refs.com_manage_platform_account.open()
    },//

    async 删除partition全部() {
      console.log(`111---preload:`, preload)
      let fs_pro = preload.fs_pro
      let fs = preload.fs
      let path = preload.path
      console.log(`fs_pro---`,     fs_pro        )

      const folderPath = 'C:\\Users\\Administrator\\AppData\\Roaming\\electron_desktop_04\\desktop\\Partitions\\douyin_1844606013'
      fs_pro.rm(folderPath, {recursive: true, force: true})
          .then(() => {
            console.log('文件夹删除成功');
          })
          .catch((err) => {
            console.error('删除文件夹时出错:', err);
          });








    },//
    async 导航栏输入框() {
      if (window["WEBVIEW"]) window["WEBVIEW"].loadURL(this.curr_url)
    },//


  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>



