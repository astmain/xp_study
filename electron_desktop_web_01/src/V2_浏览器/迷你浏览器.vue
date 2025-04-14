<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>


    <el-button @click="启动()">启动</el-button>


    <div style="display: flex; flex-direction: column;gap: 10px; padding: 10px ; border-radius:10px  ;   background: black   ;    ">
      <nav style="display: flex ;gap: 5px;">

        <el-button style="margin: 0" @click="后退()">后退</el-button>
        <el-button style=";margin: 0" @click="前进()">前进</el-button>
        <el-button style="margin: 0" @click="刷新()">刷新</el-button>

        <el-input style="width: 100%;" v-model="url" placeholder="请输入回车" spellcheck="false" @keyup.enter.native="handel_input"/>

        <el-button style="margin: 0" @click="控制台()">控制台</el-button>
        <el-button style="margin: 0" @click="得到cookies()">得到cookies</el-button>
        <el-button style="margin: 0" @click="dialogVisible=true">历史记录</el-button>
        <el-button style="margin: 0" @click="运行本地文件()">运行本地文件</el-button>
        <el-button style="margin: 0" @click="运行webview()">运行webview</el-button>

        <el-dialog title="历史记录" :visible.sync="dialogVisible">
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


    </div>


  </div>
</template>

<script>


import WEBVIEW from "./WEBVIEW.js"

export default {
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
    async 启动() {
      let WEB = new WEBVIEW()
      this.WEB = WEB
      window.WEB = WEB
      await WEB.create({partition: "persist:min111", webviewId: "min111"})
      await WEB.style({css: "width: 100%; height: 500px; z-index: 100"})
      await WEB.override_navigator({
        callback: async (event) => {
          await new Promise((resolve) => setTimeout(resolve, 100)) //todo  webview 获取title和url 生命周期很难用时获取,所以            event.isMainFrame   判断是不是主页
          this.url = decodeURIComponent(event.url)
          this.history.push({title: this.WEB.webview.getTitle(), url: this.url})
        }
      })
      // await WEB.goto({url: "https://www.bing.com/"})
      // await WEB.goto({url: "https://www.douyin.com/video/7355075809490586932?modeFrom=searchResult"})
      // await WEB.goto({url: "https://www.douyin.com/video/7355075809490586932"})
      await WEB.goto({url: "about:blank"})
      await WEB.goto({url: "https://channels.weixin.qq.com/platform"})
    },//


    async handel_input() {
      this.WEB.webview.loadURL(this.url)
    },//

    async 历史记录跳转({url}) {
      this.WEB.webview.loadURL(url)
      this.dialogVisible = false
    },


    async 控制台() {
      await this.WEB.openDevTools()
    },//

    async 得到cookies(){
      let cookies = await preload.invoke('IPC_get_cookies', {partition:"persist:min111", url:"https://channels.weixin.qq.com/platform"})
      console.log(`cookies---:`,     cookies        )
      console.log(`cookies---:`,       JSON.stringify(      cookies      )             )


    },//

    async 刷新() {
      await this.WEB.webview.reload()
    },//
    async 后退() {
      await this.WEB.webview.goBack()
    },//

    async 前进() {
      await this.WEB.webview.goForward()
    },//


    async 运行本地文件() {
      console.log(`运行本地文件---:`, 111)
      let result = await preload.invoke('IPC_spider_run_file', {webviewId: "min111"})
      console.log(`result---:`, result)

    },//

    async 运行webview() {
      console.log(`运行本地文件---:`, 111)
      let result = await preload.invoke('IPC_spider_webview', {webviewId: "min111"})
      console.log(`result---:`, result)

    },//

  },////

  async mounted() {
    await this.启动()


    setTimeout(() => {

      let aaaa = document.querySelector(".webview_wrapper")
      aaaa.addEventListener('click', function (event) {
        event.preventDefault();
      });
      console.log(`111---`, 111)
    }, 3000)

    // for (let index = 0; index < 1000; index++) {
    //   await new Promise((resolve) => setTimeout(resolve, 5 * 1000))
    //   debugger
    // }

  },////

}
</script>

<style scoped></style>



