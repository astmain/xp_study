<template>
  <el-dialog v-if="show_com_account_manage" title="管理账号" width="1200px" v-model="show_com_account_manage" draggable :close-on-click-modal="false" :destroy-on-close="true">


    <el-input style="width: 200px;" v-model="keyword" placeholder="请输入:关键词111"/>
    <el-button @click="搜索()">搜索</el-button>
    <div style="display: flex;flex-direction: row;gap:16px;">
      <div v-for="item in  list">

        <el-card :body-style="{ padding: '4px'  ,paddingRight:'12px'}">
          <div style="display: flex; flex-direction: row;align-items: center;gap:4px;">
            <img style="width:40px;border: 1px #f3f4f6 solid ; border-radius: 10px;" :src="item.avatar" alt="" @click="选择账号(item)">
            <div style="display: flex; flex-direction: column;gap:4px;">
              <div style="display: flex; flex-direction: row;gap:4px; justify-content: space-between;">
                <span style="font-size:  12px ;color: #141414">平台</span>
                <div style="font-size:  12px ;color: #141414" @click="删除(item)">x</div>
              </div>
              <div style="display: flex; flex-direction: row;gap:4px; justify-content: space-between;">
                <span style="font-size:  12px ;color: #141414  ;width:80px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.nickname }}</span>
              </div>


            </div>


          </div>
        </el-card>


      </div>
    </div>


    <div class="container_webview">
      <el-input style="width: 100%;" v-model="curr_url" placeholder="请输入回车" spellcheck="false" @keyup.enter.native="导航栏输入框"/>

    </div>


  </el-dialog>
</template>
<script>


export default {
  data() {
    return {
      show_com_account_manage: false,
      keyword: "",
      list: [],
      curr: {},
      curr_url: ""
    }
  },

  methods: {
    async open() {
      this.show_com_account_manage = true
    },//
    async 搜索() {
      let resp = await axios_api({method: 'get', url: "/tb_account/find_list"})
      console.log(`搜索---resp:`, resp)
      this.list = resp.list

    },//
    async 选择账号(item) {
      console.log(`选择账号---item:`, JSON.parse(JSON.stringify(item)))
      let webview_name = item.webview_name
      let partition = item.partition
      let url = item.url
      let config = {
        webview_name,
        partition,
        url,
        "container": '.container_webview',
        "preload": preload.PATH.preload,
        "style": `width: 100%; height: 500px; z-index: 100`,
      }
      this.curr = item
      window["WEBVIEW"] = await webview_start(config)
      window["WEBVIEW"].didStartNavigation((event) => {
        if (event.isMainFrame && event.url) {
          this.url = decodeURIComponent(event.url)
          console.log(`event.url---:`, event.url)
          this.curr_url = event.url
        }
      })
    },//

    async 删除(item) {
      let one = await axios_api({method: 'get', url: "/tb_account/delete_id", params: {id: item.id}})
      console.log(`one---one:`, one)
      await this.搜索()
    },//
    async 导航栏输入框() {
      if (window["WEBVIEW"]) window["WEBVIEW"].loadURL(this.curr_url)
    },//


  },

  async mounted() {
    this.搜索()

  },

  async created() {
    this.搜索()
  }
}
</script>

<style scoped>


</style>



