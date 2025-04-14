<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="添加账号()">添加账号</el-button>
    <el-button @click="查看账号()">查看账号</el-button>
    <el-button @click="指定partition()">指定partition</el-button>
    <el-button @click="固定partition()">固定partition</el-button>
    <el-button @click="删除partition全部()">删除partition全部</el-button>
    <el-button @click="保存one()">保存one</el-button>


    <!--弹框组件    -->
    <com_add_platform_account ref="com_add_platform_account"/>
    <com_manage_platform_account ref="com_manage_platform_account"/>
    <com_account_partition ref="com_account_partition"/>
    <com_account_add_fixed_partition ref="com_account_add_fixed_partition"/>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue"

export default {
  components: {
    com_add_platform_account: defineAsyncComponent(() => import('./com_account_add.vue')),//
    com_manage_platform_account: defineAsyncComponent(() => import('./com_account_manage.vue')),//
    com_account_partition: defineAsyncComponent(() => import('./com_account_partition.vue')),//
    com_account_add_fixed_partition: defineAsyncComponent(() => import('./com_account_add_fixed_partition.vue')),//
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

    async 指定partition() {
      this.$refs.com_account_partition.open()
    },//
    async 固定partition() {
      this.$refs.com_account_add_fixed_partition.open()
    },//

    async 删除partition全部() {
      console.log(`111---preload:`, preload)
      let fs_pro = preload.fs_pro
      let fs = preload.fs
      let path = preload.path
      console.log(`fs_pro---`, fs_pro)

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


    async 保存one() {
      let data = {cookies_str: "", cookies: [], webview_name: "", partition: "persist:douyin_1844606013", url: "", nickname: "", user_id: "", avatar: "", line: true}
      let result_create_one = await axios_api({method: 'post', url: "/tb_account/save_one", data})
      console.log(`确定登录---result_create_one:`, result_create_one)

    },//


  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>



