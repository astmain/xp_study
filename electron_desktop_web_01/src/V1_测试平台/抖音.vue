<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>


    <nav v-if="form.visible" style="border: 4px black solid; width: 98%; height: 690px ;background: black ;padding: 8px; border-radius:10px">
      <div style="margin-bottom: 8px; display: flex; gap: 8px; align-items: center">
        <el-button @click="openDevTools()">控制台</el-button>
        <el-input style="width: 100%;" v-model="form.src" placeholder="请输入:链接"/>
        <el-button @click="IPC_get_cookies()">IPC_get_cookies
        </el-button>
      </div>

      <div>
        <el-button @click="get_env_data()">get_env_data</el-button>
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
        src: "https://creator.douyin.com/",
        partition: 'persist:douyin111',
      }
    }
  },////
  methods: {
    async openDevTools() {

      let web = document.querySelector('webview')
      console.log(`web---:`, web)
      console.log(`111---:`, 111)
      if (web.isDevToolsOpened() === false) {
        web.openDevTools()
      }
    },

    async IPC_get_cookies() {
      console.log(`preload---:`, preload)
      let cookies = await preload.invoke('IPC_get_cookies', {url: this.form.src, partition: this.form.partition})
      let cookies_str = await preload.invoke('IPC_get_cookies_str', {url: this.form.src, partition: this.form.partition})
      console.log(`cookies---:`, cookies)
      console.log(`cookies_str---:`, cookies_str)
    },//


    /** 默认方法*/
    async get_env_data() {
      function func() {
        let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
        let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
        let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
        let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
        return {prvkey, ticket, ts_sign, csr}
      }

      let env_data = await document.querySelector("webview").executeJavaScript(`(${func})()`)
      let cookie = await preload.invoke('IPC_get_cookies_str', {url: this.form.src, partition: this.form.partition})
      env_data["cookie"] = cookie
      console.log(`env_data---:`, env_data)

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



