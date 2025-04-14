<template>
  <h3 style="padding: 0; margin: 0">路由:{{ this.$route.name }}</h3>

  <div style="margin: 4px; display: flex; gap: 4px; align-items: center">
    <el-button type="primary" size="default" @click="sql00_参数校验_post()">sql00_参数校验_post</el-button>
    <el-button type="primary" size="default" @click="sql00_参数校验_get()">sql00_参数校验_get</el-button>
  </div>





</template>

<script>


import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";
export default {
  components: {},

  data() {
    return {}
  },

  methods: {
    async sql00_参数校验_post() {
      let config = {
        method: 'post',
        url: '/controller_test/sql00_参数校验_post',
        data: { id: 111, username: '许鹏', password: '123456', email: '13111923451111@qq.com' },
        // headers: { 'Content-Type': 'application/json' }, //java项目中必须这么写
      }
      let res = await axios_api(config)
      console.log('res.data---', res.data)
    }, //

    async sql00_参数校验_get() {
      let config = {
        method: 'get',
        url: '/controller_test/sql00_参数校验_get',
        params: { id: 111, username: '许鹏', password: '123456', email: '13111923451111@qq.com' },
        headers: { 'Content-Type': 'application/json' }, //java项目中必须这么写
      }
      let res = await axios_api(config)
      console.log('res.data---', res.data)
    }, //
  },

  async mounted() {},
}
</script>

<style scoped></style>
