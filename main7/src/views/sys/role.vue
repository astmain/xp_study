<template>
  <!-- 搜索表单 -->
  <el-form :model="form" :inline="true" size="default">
    <el-form-item class="left">
      <el-input v-model="form.role" @keyup.enter="find_role_list()">
        <template #prepend>
          <span style="width: 50px; text-align: left; color: #555; font-weight: 600">角色</span>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item style="position: absolute; right: 0; margin-right: 0px">
      <el-button-group>
        <el-button type="primary" plain @click="find_role_list()">搜索</el-button>
        <el-button type="default" plain @click="reset()">清空</el-button>
        <el-button type="success" plain @click="role_add_dialog()">新增</el-button>
      </el-button-group>
    </el-form-item>
  </el-form>

  <!-- 表格 -->
  <el-table :data="role_list" style="width: 100%" stripe border>
    <el-table-column prop="role" label="账号" width="120" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="info" @click="delete_role(scope.row.role)">删除</el-button>
        <el-button link type="primary" @click="role_edit_dialog(scope.row)">编辑 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      form: { role: '' },
      role_list: [{ id: 1, role: '管理员' }],
    }
  },

  methods: {
    async reset() {
      this.form.role = ''
      this.find_role_list()
    },

    async role_add_dialog() {
      require('./role_add_dialog.jsx')({ data: '空', that: this })
    },
    async role_edit_dialog(row) {
      require('./role_edit_dialog.jsx')({ data: row, that: this })
    },

    async find_role_list() {
      let config = { method: 'get', url: `/controller_MAIN/role/find_role_list?role=${this.form.role}` }
      console.log('config:', config)
      let res = await axios_api(config)
      console.log('res  :', res)
      if (res.data.code == 200) {
        this.role_list = res.data.role_list
      }
    }, //

    async delete_role(role) {
      console.log('role   :', role)
      let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' })
      if (confirm != 'confirm') return
      let config = { method: 'get', url: `/controller_MAIN/delete_role?role=${role}` }
      console.log(`config      : `, config)
      let res = await axios_api(config)
      console.log('res2  :', res)
      if (res.data.code == 200) {
        await this.find_role_list()
      }
    }, //
  }, ////

  async mounted() {
    this.find_role_list()
  }, ////
}
</script>

<style scoped></style>
