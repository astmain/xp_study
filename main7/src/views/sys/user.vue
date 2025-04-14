<template>
  <!-- 搜索表单 -->
  <el-form :model="form" :inline="true" size="default">
    <el-form-item class="left">
      <el-input style="width: 200px" v-model="form.username" @keyup.enter="find_user_list()">
        <template #prepend><span style="width: 24px; color: #555; font-weight: 600">账号</span> </template>
      </el-input>
    </el-form-item>
    <el-form-item class="left">
      <el-input style="width: 200px" v-model="form.nickname" @keyup.enter="find_user_list()">
        <template #prepend> <span style="width: 24px; color: #555; font-weight: 600">昵称</span></template>
      </el-input>
    </el-form-item>
    <el-form-item style="position: absolute; right: 0; margin-right: 0px">
      <el-button-group>
        <el-button type="primary" @click="find_user_list()">搜索</el-button>
        <el-button type="default" @click=";(form.username = ''), (form.nickname = ''), find_user_list()">清空</el-button>
        <el-button type="success" @click="user_add_dialog">新增</el-button>
      </el-button-group>
    </el-form-item>
  </el-form>

  <!-- 表格 -->
  <el-table :data="userinfo_list" style="width: 100%" stripe border>
    <el-table-column prop="username" label="账号" width="auto" fixed />
    <el-table-column prop="nickname" label="昵称" width="auto" />
    <el-table-column fixed="right" label="操作" width="auto">
      <template #default="scope">
        <el-button link type="" @click="delete_user(scope.row.username)">删除</el-button>
        <el-button link type="primary" @click="user_edit_dialog(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      form: { username: '', nickname: '' },
      userinfo_list: [
        { id: 1, username: 'zs', nickname: '张三' },
        { id: 2, username: 'ls', nickname: '李四' },
      ],
    }
  },

  methods: {
    async user_add_dialog() {
      require('./user_add_dialog.jsx')({ data: '空', that: this })
    },
    async user_edit_dialog(row) {
      require('./user_edit_dialog.jsx')({ data: row, that: this })
    },

    /**删除用户*/
    async delete_user(username) {
      let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' })
      if (confirm != 'confirm') return
      let config = { method: 'get', url: `/controller_MAIN/user/delete_user?username=${username}` }
      console.log('config   :', config)
      let res = await axios_api(config)
      console.log('res2  :', res)
      if (res.data.code == 200) {
        await this.find_user_list()
      }
    }, //

    /**查找用户*/
    async find_user_list() {
      let res = await axios_api({ method: 'get', url: `/controller_MAIN/user/find_user_list?username=${this.form.username}&nickname=${this.form.nickname}` })
      console.log('res2  :', res)
      this.userinfo_list = res.data.userinfo_list
    }, //
  }, ////

  async mounted() {
    this.find_user_list()
  }, ////
}
</script>

<style scoped></style>
