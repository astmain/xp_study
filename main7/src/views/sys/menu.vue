<template>
  <!-- 搜索表单 -->
  <el-form :model="form_find" :inline="true" size="default">
    <el-form-item class="left">
      <el-input v-model="form_find.menu" @keyup.enter="menuManage_find()">
        <template #prepend>
          <span style="width: 50px; text-align: left; color: #555; font-weight: 600">菜单名称</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item style="position: absolute; right: 0; margin-right: 0px">
      <el-button-group>
        <el-button type="primary" plain @click="find_menu_list()">搜索</el-button>
        <el-button type="default" plain @click=";(form_find.menu = ''), find_menu_list()">清空</el-button>
        <el-button type="success" plain @click="menu_add_parent_dialog()">添加</el-button>
      </el-button-group>
    </el-form-item>
  </el-form>

  <!-- 树状菜单 -->
  <div class="custom-tree-container">
    <el-tree :data="tree.data" show-checkbox node-key="menu" default-expand-all :expand-on-click-node="false">
      <template #default="{ node, data }">
        <div>
          <div style="width: 900px">
            <span style="width: 300px; display: inline-block">{{ data.menu }}</span>
            <span v-if="!data.parent" style="margin-left: 200px; display: inline-block">
              <nav style="display: flex; align-items: center; justify-content: center">
                <a style="color: #409eff; margin-right: 10px" @click="menu_edit_dialog(data)"> 编辑 </a>
                <el-dropdown size="small" placement="bottom-start">
                  <div style="cursor: pointer; display: flex; align-items: center; justify-content: center; border: none; outline: none">••</div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item size="small" divided @click="menu_add_child_dialog(data)">添加子菜单</el-dropdown-item>
                      <el-dropdown-item size="small" divided @click="delete_menu(data.menu)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </nav>
            </span>
            <span v-else style="margin-left: 182px; display: inline-block">
              <nav style="display: flex; align-items: center; justify-content: center">
                <a style="color: #409eff; margin-right: 10px" @click="menu_edit_dialog(data)"> 编辑 </a>
                <el-dropdown size="small" placement="bottom-start">
                  <div style="cursor: pointer; display: flex; align-items: center; justify-content: center; border: none; outline: none">••</div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item size="small" divided @click="delete_menu(data.menu)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </nav>
            </span>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form_find: { menu: '' },
      tree: {
        data: [{ menu: '1111', children: [{ menu: '222' }] }],
        data_chooseed: [],
      },
    }
  },

  methods: {
    // 添加父菜单
    async menu_add_parent_dialog() {
      require('./menu_add_parent_dialog.jsx')({ data: '空', that: this })
    },

    // 添加子菜单
    async menu_add_child_dialog(data) {
      require('./menu_add_child_dialog.jsx')({ data: data, that: this })
    },

    // 保存菜单
    async menu_edit_dialog(data) {
      console.log('data---', data)
      require('./menu_edit_dialog.jsx')({ data: data, that: this })
    },

    /** 删除菜单*/
    async delete_menu(menu) {
      console.log('🚀 menu   :', menu)
      let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' })
      if (confirm != 'confirm') return
      let config = { method: 'get', url: `/controller_MAIN/menu/delete_menu?` + `menu=${menu}` }
      let res = await axios_api(config)
      console.log('res:', res)
      if (res.data.code == 200) {
        await this.find_menu_list()
      }
    }, //

    /**搜索菜单*/
    async find_menu_list() {
      // 请求数据
      let params = `menu=${this.form_find.menu}`
      let config = { method: 'get', url: `/controller_MAIN/menu/find_menu_list?` + params }
      console.log('config   :', config)
      let res = await axios_api(config)
      console.log('res  :', res)
      this.tree.data = res.data.menu_tree
    }, //
  }, ////

  async mounted() {
    this.find_menu_list()
  }, ////
}
</script>

<style lang="scss" scoped></style>
