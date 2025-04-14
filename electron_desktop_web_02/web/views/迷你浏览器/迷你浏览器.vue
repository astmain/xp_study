<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="启动WEBVIEW()">启动WEBVIEW</el-button>
    <div style="display: flex; flex-direction: column;gap: 10px; padding: 10px ; border-radius:10px  ;   background: black   ;    ">
      <nav style="display: flex ;gap: 5px;">
        <i class="bi bi-arrow-left-circle" style="color: white" @click="后退()"></i>
        <i class="bi bi-arrow-right-circle" style="color: white" @click="前进()"></i>
        <i class="bi bi-arrow-clockwise" style="color: white" @click="刷新()"></i>
        <el-input style="width: 100%;" v-model="url" placeholder="请输入回车" spellcheck="false" @keyup.enter.native="导航栏输入框"/>
        <i class="bi bi-terminal" style="color: white" @click="控制台()"></i>
        <i class="bi bi-star" style="color: white" @click="打开_收藏网页()"></i>
        <i class="bi bi-bookmarks" style="color: white" @click="打开_收藏夹管理()"></i>
        <i class="bi bi-cookie" style="color: white" @click="得到cookies()"></i>
        <i class="bi bi-clock" style="color: white" @click="dialogVisible=true"></i>
        <i class="bi bi-robot" style="color: white" @click="运行本地文件()"></i>


        <el-dialog title="历史记录" v-model="dialogVisible">
          <div>
            <div v-for=" (item,index)  in   history">
              <div style="display:flex ;justify-content: space-between;        white-space: nowrap; overflow: hidden;    text-overflow: ellipsis; ">
                <div style="width: 200px">{{ item.title }}</div>
                <div style="width: 400px" @click="历史记录跳转({url:item.url})">{{ item.url }}</div>
              </div>
            </div>
          </div>
        </el-dialog>

      </nav>
      <div class="webview_wrapper"></div>
      <com_collect ref="com_collect"/>
      <com_bookmarks ref="com_bookmarks"/>


    </div>


  </div>
</template>

<script>
import WEBVIEW from "./WEBVIEW/WEBVIEW"
import {defineAsyncComponent} from "vue"

export default {
  components: {
    com_collect: defineAsyncComponent(() => import('./com_collect.vue')),//
    com_bookmarks: defineAsyncComponent(() => import('./com_bookmarks.vue')),//
  },
  data() {
    return {
      name: "数据1",
      url: "",
      history: [
        {title: "标题", url: "网址"},
      ],
      dialogVisible: false,

    }


  },

  methods: {

    async 启动WEBVIEW() {
      let WEB = new WEBVIEW()
      this.WEB = WEB
      window.WEB = WEB
      await WEB.create({partition: "persist:min111", webviewId: "min111", path_preload: preload.PATH.preload})
      await WEB.style({css: "width: 100%; height: 500px; z-index: 100"})
      await WEB.goto({url: "https://baidu.com"})
      // await WEB.goto({url: "http://127.0.0.1:9999/index?name=小许&age=18"})
      await WEB.override_navigator({
        callback: async (event) => {
          if (event.isMainFrame && event.url) {
            this.url = decodeURIComponent(event.url)
            this.history.push({title: this.WEB.webview.getTitle(), url: decodeURIComponent(event.url)})
            console.log(`event---:`, event)
          }
        }
      })


    },//


    async 导航栏输入框() {
      console.log(`111---222:`, this.WEB.webview)
      this.WEB.webview.loadURL(this.url)
    },//

    async 历史记录跳转({url}) {
      this.WEB.webview.loadURL(url)
      this.dialogVisible = false
    },


    async 控制台() {
      await this.WEB.openDevTools()
    },//

    async 得到cookies() {
      let params = {partition: this.WEB.webview.partition, url: this.WEB.webview.getURL()}
      console.log(`得到cookies---params:`, params)
      let cookies = await axios_api({method: 'get', url: "ipc/get_cookies", params})
      console.log(`得到cookies---cookies:`, cookies)
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params})
      console.log(`得到cookies---cookies_str:`, cookies_str)
    },//

    async 刷新() {
      await this.WEB.reload()
    },//
    async 后退() {
      await this.WEB.goBack()
    },//

    async 前进() {
      await this.WEB.goForward()
    },//


    async 打开_收藏网页() {
      let name = this.WEB.webview.getTitle()
      let url = this.WEB.webview.getURL()
      let label = name
      this.$refs.com_collect.open({name, url, label})
    },

    async 打开_收藏夹管理() {
      this.$refs.com_bookmarks.open()
    },//


  },////

  async mounted() {
    await this.启动WEBVIEW()
  },////

}
</script>

<style scoped></style>



