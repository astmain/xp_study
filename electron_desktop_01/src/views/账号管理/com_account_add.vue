<template>
  <el-dialog title="添加账号" width="1200px" v-if="show" v-model="show" draggable :close-on-click-modal="false" :destroy-on-close="true">
    <!--    卡片-->
    <div style="display: flex;flex-direction: row;gap:16px;">
      <div v-for="item in BUS.config_all_platform">
        <div style="display: flex; flex-direction: column;align-items: center;gap:4px;">
          <img style="width:32px" :src="item.logo" alt="" @click="准备登录(item)">
          <span style="font-size:  12px ;color: #141414">{{ item.platform_name }}</span>
        </div>
      </div>
    </div>
    <!--    浏览器-->
    <div class="container_login">
      <el-button @click="测试()">测试</el-button>
    </div>
  </el-dialog>
</template>
<script>


export default {
  data() {
    return {
      show: false,

    }
  },
  methods: {

    async 测试() {
      let store = await window["web__"].executeJavaScript(`(()=>{   return  JSON.parse(JSON.stringify(window.localStorage))  })()`)
      console.log(`111---store:`, store)
    },//
    async open() {
      this.show = true
    },//
    async 准备登录(item) {
      let user = await item.login_listener({container: '.container_login'})
      console.log(`成功登录---user:`, user)
      window.user = user
      let one = await tb_account.save_one(user)
      console.log(`成功保存---one:`, one)
      msg_success({msg: '成功登录'})
      await this.$parent.$parent.搜索()
      this.show = false
    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>



