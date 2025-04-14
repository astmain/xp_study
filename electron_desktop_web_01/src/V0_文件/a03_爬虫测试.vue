<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>

    <el-button @click="爬虫测试spider01()">爬虫测试spider01</el-button>


    <nav v-if="form.visible" style="border: 4px black solid; width: 98%; height: 690px ;background: black ;padding: 8px; border-radius:10px">
      <div style="margin-bottom: 8px; display: flex; gap: 8px; align-items: center">
        <el-button @click="document.querySelector('webview').isDevToolsOpened() ? console.log('DevTools已经开启'): document.querySelector('webview').openDevTools()  ">控制台</el-button>
        <el-input style="width: 100%;" v-model="form.src" placeholder="请输入:链接"/>
        <el-button v-call="{this:this,click:async function() {
            let cookies = await preload.invoke('IPC_get_cookies', {url: this.form.src, persist: this.form.persist})
            let cookies_str = window.cookie_arr_to_str(cookies)
            console.log(`cookies---:`,     cookies    )
            console.log(`cookies_str---:`, cookies_str)
        }}">cookies
        </el-button>
      </div>
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
      form: {
        visible: false,
        preload_path: "D:/AAA/xp_work/无界微前端_01_代码整理/desktop01_webview_puppeteer/desktop/preload.js",
        partition: 'persist:douyin111',
        src: "https://www.baidu.com/",
      }
    }
  },////
  methods: {
    /** 默认方法*/
    async 爬虫测试spider01() {
      debugger
      let cookies_str = await preload.invoke('IPC_get_cookies_str', {url: this.form.src, partition: this.form.partition})
      console.log(`cookies_str---:`, cookies_str)

    },//


  },////
  async mounted() {
    setTimeout(async () => {
      this.form.visible = true
      await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
      // document.querySelector("webview").openDevTools()
    }, 1000)


  },////

}
</script>

<style scoped></style>



