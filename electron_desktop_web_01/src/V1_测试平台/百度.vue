<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>

    <!--弹框-->
    <el-dialog :visible.sync="form_dialog.visible   " :fullscreen="false" width="90%" top="100px">
      <div>{{ form_dialog.src }}</div>
      <webview v-if="form_dialog.visible" :partition="form_dialog.partition"
               :src="form_dialog.src"
               :nodeIntegration="true"
               :contextIsolation="false"
               :allowpopups="true"
               :disablewebsecurity="true"
               useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
               style="width: 100%; height: 650px"/>
    </el-dialog>

    <!--  浏览器  -->
    <nav v-if="form.visible" style="border: 4px black solid; width: 98%; height: 690px ;background: black ;padding: 8px; border-radius:10px">
      <div style="margin-bottom: 8px; display: flex; gap: 8px; align-items: center">
        <el-button @click="document.querySelector('webview').isDevToolsOpened() ? console.log('DevTools已经开启'): document.querySelector('webview').openDevTools()  ">控制台</el-button>
        <el-input style="width: 100%;" v-model="form.src" placeholder="请输入:链接"/>
        <el-button v-call="{this:this,click:async function() {
            let cookies = await preload.invoke('IPC_get_cookies', {url: this.form.src, partition: this.form.partition})
            let cookies_str = await preload.invoke('IPC_get_cookies_str', {url: this.form.src, partition: this.form.partition})
            console.log(`cookies---:`,     cookies    )
            console.log(`cookies_str---:`, cookies_str)
        }}">cookies
        </el-button>
      </div>
      <!-- https://juejin.cn/post/7202413628808511548 -->
<!--             //   //webview生命周期  did-navigate-in-page     'load-commit'  // 'did-finish-load'  // 'did-fail-load'  // 'did-frame-finish-load' // 'did-start-loading'  // 'did-stop-loading'  // 事件：'did-attach'  // 事件: 'dom-ready'   // 事件： 'page-title-updated' // 事件: 'page-favicon-updated'   // 事件: 'enter-html-full-screen' // 事件: 'leave-html-full-screen' -->
        
      <webview :partition="form.partition"
               :nodeIntegration="true"
               :contextIsolation="false"
               :allowpopups="true"
               :disablewebsecurity="true"
               useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
               :src="form.src" :preload="form.preload_path" style="width: 100%; height: 650px"/>
      <!--     :nodeIntegration="true" , :contextIsolation="false" ,       -->
    </nav>


  </div>
</template>
<script>
export default {
  components: {},////
  data() {
    return {
      form_dialog: {
        visible: false,
        partition: "",
        src: "",
      },


      form: {
        visible: false,
        // preload_path: `C:/Users/Administrator/Desktop/preload_common.js`,
        preload_path: "D:/AAA/xp_work/无界微前端_01_代码整理/desktop01_webview_puppeteer/desktop/preload.js",
        partition: 'persist:douyin111',
        // src: 'https://cp.kuaishou.com/article/publish/video?origin=www.kuaishou.com',
        src: 'https://www.baidu.com',

      }
    }
  },////
  methods: {
    /** 监听新窗口打开*/
    async ON_window_open_new_page() {
      preload.on('ON_window_open_new_page', (event, {url, partition}) => {
        console.log(`ON_window_open_new_page---{url,partition}:`, {url, partition})
        this.form_dialog.src = url
        this.form_dialog.partition = partition
        this.form_dialog.visible = true
      });


    },//

  },////
  async mounted() {
    setTimeout(async () => {
      this.form.visible = true
      await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
      // document.querySelector("webview").openDevTools()
    }, 1000)


    this.ON_window_open_new_page()


  },////

}
</script>

<style scoped></style>



