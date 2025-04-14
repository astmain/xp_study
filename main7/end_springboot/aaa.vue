<template>
<div>
   <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
      <el-button @click="met1()">met1</el-button>


     <div style="margin: 4px; display: flex; gap: 4px; align-items: center">
        <label style="width:100px">工具栏:</label>
       <el-button @click="webview_preload">webview_preload</el-button>
       <el-button @click="webview_show">webview_show</el-button>
     </div>

</div>
</template>

<script>


export default {
  data() {
    return {
      name: "数据1",
    }


  },

  methods: {
    async met1() {
      console.log('met1      :', 111)
      console.log(`111---:`,     111        )
      let config = {method: 'get', url: 'http://103.119.2.223:3000/index', data: {aaa: 111}}
      let res = await axios(config)

      console.log('res.data---', res.data)


    },//

  },////

  async mounted() {

  },////

}
</script>

<style  scoped></style>



