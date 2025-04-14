<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="$refs.com_add_platform_account.open()">添加账号</el-button>
    <el-button @click="$refs.com_account_manage.open()()">查看账号</el-button>
    <el-button @click="删除partition全部()">删除partition全部</el-button>
    <div>33123</div>


    <!--弹框组件    -->
    <com_add_platform_account ref="com_add_platform_account"/>
    <com_account_manage ref="com_account_manage"/>
  </div>
</template>

<script>

import {defineAsyncComponent} from "vue"

export default {
  components: {
    com_add_platform_account: defineAsyncComponent(() => import('./com_account_add.vue')),//
    com_account_manage: defineAsyncComponent(() => import('./com_account_manage.vue')),//
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
      this.$refs.com_account_manage.open()
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



