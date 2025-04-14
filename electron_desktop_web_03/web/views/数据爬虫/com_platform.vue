<template>
  <el-dialog title="账号选择" width="800px" v-model="show_com_platform" draggable :close-on-click-modal="false" :destroy-on-close="true">


    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="platform" label="platform" width="150px" show-overflow-tooltip/>
      <el-table-column prop="url" label="url" width="auto" show-overflow-tooltip/>


      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-button size="small" @click="选择确定(scope.row)">确定</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>

import WEBVIEW_start from "../../WEBVIEW/WEBVIEW_start";

export default {
  data() {
    return {
      show_com_platform: false,
      tableData: [
        {platform: "小红书", remark: '小红书个人官网', url: 'https://www.xiaohongshu.com/explore', nickname: "", cookies: [], cookies_str: "" ,log:"",avatar:""},
        {platform: "抖音", remark: '抖音个人官网', url: 'https://www.douyin.com/discover', nickname: "", cookies: [], cookies_str: "" ,log:"",avatar:""},


      ],


    }
  },

  methods: {

    async open() {
      this.show_com_platform = true


    },//

    async 选择确定(row) {
      console.log(`选择确定---row:`, row)
      share111.row = row
      console.log(`share---share111:`, share111)

      let config = {
        css: '.webview_container',
        partition: 'persist:share111',
        webviewId: 'share111',
        url: share111.row.url
      }
      let WEB_name = await WEBVIEW_start(config)
      console.log(`选择确定---WEB_name:`, WEB_name)
      return row
    },//
  },

  async mounted() {


  },
}
</script>

<style scoped>


</style>



