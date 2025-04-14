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
        <el-input v-model="form.cookie_arr_str" placeholder="请输入:cookie_arr_str"/>
        <el-button @click="IPC_set_cookies()">IPC_set_cookies</el-button>
        <el-button @click="IPC_set_cookies222()">IPC_set_cookies222</el-button>
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
        src: "https://creator.xiaohongshu.com/new/home",
        // https://xiaohongshu.com
        // https://creator.xiaohongshu.com/new/home
        // src: "https://baidu.com",
        partition: 'persist:xhs111',
        cookie_arr_str:`[{"name": "xsecappid", "value": "ugc", "domain": ".xiaohongshu.com", "path": "/", "expires": 1774061952, "size": 12, "httpOnly": false, "secure": false, "session": false, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}, {"name": "websectiga", "value": "10f9a40ba454a07755a08f27ef8194c53637eba4551cf9751c009d9afb564467", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 74, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "galaxy.creator.beaker.session.id", "value": "1742371186799090549765", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 54, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "galaxy_creator_session_id", "value": "7sIxLO4NEttJfL64JymufBBZMVt4Om8TK8ns", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 61, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "access-token-creator.xiaohongshu.com", "value": "customer.creator.AT-68c517483427261691885916ksfdkznip3p3cogp", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 96, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "customer-sso-sid", "value": "68c5174834271972673762884sqf1dhsuzuu7em3", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 56, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "loadts", "value": "1742344383195", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 19, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "acw_tc", "value": "0a0d0f5817425254828943282ec56253c333568b628aa674f26ac08eff404d", "domain": "creator.xiaohongshu.com", "path": "/", "expires": 1742527282.24805, "size": 68, "httpOnly": true, "secure": false, "session": false, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}, {"name": "gid", "value": "yj2YY2ijy2Y0yj2YY2iYWi84ff8Wl8TWxJSqqxfIF1K7Cq28j1W8hA888q2qJq48q88J8842", "domain": ".xiaohongshu.com", "path": "/", "expires": 3213754882.923658, "size": 75, "httpOnly": false, "secure": false, "session": false, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}, {"name": "x-user-id-creator.xiaohongshu.com", "value": "6551e606000000000802eca1", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 57, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "a1", "value": "195885f87dd07o0k7h2c3nrl6ux9l70v8f33q04hd50000353234", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 54, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "x-user-id-pro.xiaohongshu.com", "value": "6551e606000000000802eca1", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 53, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "abRequestId", "value": "dcedb6ba-662d-55bf-9488-3991098afbfe", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 47, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "web_session", "value": "040069b425a54e70bcf794b5e5354b80543eb1", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 49, "httpOnly": true, "secure": true, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}, {"name": "webId", "value": "ce58ac2d95743a469e2f8b6e6917778b", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 37, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "customerClientId", "value": "633796322913620", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 31, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "sec_poison_id", "value": "1701ae16-38de-4f05-b346-1410c5599bdb", "domain": ".xiaohongshu.com", "path": "/", "expires": 1742526389, "size": 49, "httpOnly": false, "secure": false, "session": false, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}]`


      }

    }
  },////
  methods: {
    async openDevTools() {
      let web = document.querySelector('webview')
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

    async IPC_set_cookies() {
      console.log(`IPC_set_cookies=========================:`)
      let cookies = JSON.parse(this.form.cookie_arr_str)
      console.log(`111---cookies:`, cookies)
      let isok = await preload.invoke('IPC_set_cookies', {partition: this.form.partition, url: 'https://creator.xiaohongshu.com', cookies: cookies})
      console.log(`222---isok:`, isok)
    },//
    async IPC_set_cookies222() {
      console.log(`IPC_set_cookies222=========================:`)
      //creator.xiaohongshu.com
      // "name": "acw_tc",  "value": "0a00daeb17424398668124615e2122cbc47713ffc7f0b9157becd26b19dbed",

      // let item = {url: "https://creator.xiaohongshu.com", name: "acw_tc", value: "0a00daeb17424398668124615e2122cbc47713ffc7f0b9157becd26b19dbed"}
      let item = {url: "creator.xiaohongshu.com", name: "acw_tc", value: "0a00daeb17424398668124615e2122cbc47713ffc7f0b9157becd26b19dbed"}

      let aaa = {
        'url': "creator.xiaohongshu.com",
        "name": "acw_tc",
        "value": "0a00daeb17424398668124615e2122cbc47713ffc7f0b9157becd26b19dbed",
        "domain": "www.xiaohongshu.com",
        "hostOnly": true,
        "path": "/",
        "secure": false,
        "httpOnly": true,
        "session": false,
        "expirationDate": 1742441668.287073,
        "sameSite": "unspecified"
      }

      let isok = await preload.invoke('IPC_set_cookies_item', {partition: this.form.partition, url: "https://creator.xiaohongshu.com", item: aaa})


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



