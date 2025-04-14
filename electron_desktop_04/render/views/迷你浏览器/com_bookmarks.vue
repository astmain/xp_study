<template>
  <el-dialog title="收藏夹" width="800px" v-model="show_bookmarks" draggable :close-on-click-modal="false" :destroy-on-close="true">

    <!--表单-->



    <el-form :inline="true" style="width: 100%" ref="formRef" :model="form_find">
      <el-form-item>
        <el-input v-model="form_find.keyword " placeholder="名称|网址|备注" spellcheck="false">
          <template #suffix>
            <i class="bi bi-search bold-icon" style="font-weight: bolder"   @click="find_all()"></i>
          </template>
        </el-input>
      </el-form-item>


    </el-form>


    <!--表格     el-table  可以编辑行数据  当点到其他的位置时  el-input就要失去焦点        -->
    <el-table :data="tableData" style="width: 100%">
      <!--      <el-table-column prop="name" label="名称" width="150px" show-overflow-tooltip/>-->
      <el-table-column prop="label" label="备注" width="150px" show-overflow-tooltip>
        <template #default="scope">
          <template v-if="scope.row.is_edit">
            <el-input class="input_edit" v-model="scope.row.label" @blur="update_one(scope.row)" :ref="'id-'+scope.row.id+'-label'"></el-input>
          </template>
          <template v-else>
            {{ scope.row.label }}
          </template>
        </template>

      </el-table-column>

      <el-table-column prop="url" label="url" width="300px" show-overflow-tooltip>
        <template #default="scope">
          <template v-if="scope.row.is_edit">
            <el-input class="input_edit" v-model="scope.row.url" @blur="update_one(scope.row)" :ref="'id-'+scope.row.id+'-url'"></el-input>
          </template>
          <template v-else>
            {{ scope.row.url }}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="open_handle(scope.row)">打开</el-button>
          <el-button size="small" @click="edit_handle(scope.row)">编辑</el-button>
          <el-button @click="delete_one(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      show_bookmarks: false,
      tableData: [],
      form_find: {keyword: ""}

    }
  },

  methods: {
    async open() {
      this.show_bookmarks = true
      await this.find_all()
    },//

    async find_all() {
      let params = this.form_find
      let data = await axios_api({method: 'get', url: "tb_collect/find_all", params})
      console.log(`find_enter---data:`, data)
      this.tableData = data.list
    },//


    async delete_one(id) {
      console.log(`id---:`, id, typeof id)
      let data = await axios_api({method: 'get', url: "tb_collect/delete_one", params: {id: Number(id)}})
      console.log(`find_enter---data:`, data)
      await this.find_all()
    },//


    async update_one(row) {
      console.log(`update_one---row:`, row)
      row.is_edit = false
      let data = await axios_api({method: 'post', url: "tb_collect/update_one", data: row})
      console.log(`update_one---data:`, data)
    },//


    async edit_handle(row) {
      row.is_edit = !row.is_edit
      await new Promise((resolve) => setTimeout(resolve, 300))
      let input_edit = document.querySelector(".input_edit input")
      if (input_edit) {
        // input_edit.select()
        // input_edit.focus()
      }

      // console.log(`id---:`, row.id)
      // console.log(`$refs---:`, this.$refs)
      // let ref_id = `id_` + row.id
      // for (let key in this.$refs) {
      //   console.log(`key---:`, key)
      //   if (key.includes(ref_id)) {
      //     this.$refs[key].blur()
      //   }
      // }
    },

    async open_handle(row) {
      window.WEB.goto({desc: row.label, url: row.url})
      this.show_bookmarks = false

    },//


  },

  async mounted() {
    // const handleClickOutside = (event) => {
    //   if (this.$refs.inputRef && !this.$refs.inputRef.$el.contains(event.target)) {
    //     console.log(`inputRef---:`, this.$refs.inputRef)
    //     this.$refs.inputRef.blur()
    //     const editingRow = this.tableData.find(row => row.is);
    //   }
    //
    //
    //   // if (inputRef &&!inputRef.$el.contains(event.target)) {
    //   //   inputRef.blur();
    //   //   // 失去焦点时保存数据
    //   //   const editingRow = this.tableData.find(row => row.is_edit);
    //   //   console.log(`editingRow---:`,     editingRow        )
    //   //   // if (editingRow) {
    //   //   //   this.saveRow(editingRow);
    //   //   // }
    //   // }
    // }
    // window.addEventListener('click', handleClickOutside);

  },
}
</script>

<style scoped>


</style>



