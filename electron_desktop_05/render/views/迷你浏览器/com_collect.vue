<template>
  <el-dialog title="收藏" v-model="show_collect" draggable :close-on-click-modal="false" :destroy-on-close="true">
    <!--表单 111-->
    <el-form style="width: 60%" ref="formRef" :model="form_create">
      <el-form-item>
        <el-input v-model="form_create.name" placeholder="网站名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form_create.url" placeholder="网站地址"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form_create.label" placeholder="备注名称"/>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="create">添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show_collect: false,
      tableData: [],
      form_create: {
        name: "",
        url: "",
        label: "",
      },
    }
  },

  methods: {
    async open({name, url, label}) {
      this.show_collect = true
      this.form_create = {name, url, label}
    },//
    async create() {
      let params = this.form_create
      let data = await axios_api({method: 'get', url: "tb_collect/create", params: params})
      console.log(`create---data:`, data)
    },//

  },

  async mounted() {

  },
}
</script>

<style scoped></style>



