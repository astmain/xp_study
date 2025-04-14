<template>
  <el-dialog v-if="show" title="管理账号" width="1200px" v-model="show" draggable :close-on-click-modal="false" :destroy-on-close="true">


    <!--    搜索栏-->
    <div style="display: flex;flex-direction: row;margin-bottom: 4px">
      <el-button @click="搜索()">搜索</el-button>
      <el-input style="width: 200px;" v-model="keyword" placeholder="请输入:关键词111"/>
    </div>

    <!--    调试cookies栏-->
    <div style="display: flex;flex-direction: row;">
      <el-button @click="test_get_cookies()">test_get_cookies</el-button>
      <el-button @click="test_get_cookies222()">test_get_cookies222</el-button>

      <el-input style="width: 300px;" v-model="test.keyword" placeholder="请输入:关键词111"/>
    </div>
    <div>{{ test.url_1 }}</div>
    <div>{{ test.url_2 }}</div>


    <div>
      <el-button @click="test_douyin_img()">test_douyin_img</el-button>
      <el-button @click="get_loadURL()">get_loadURL</el-button>
      <el-button @click="get_env_data()">get_env_data</el-button>
    </div>


    <!--    卡片-->
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
      <div style="display: flex;flex-direction: row;gap:16px;">
        <el-button @click="控制台()">控制台</el-button>
        <el-input style="width: 100%;" v-model="curr_url" placeholder="请输入回车" spellcheck="false" @keyup.enter.native="导航栏输入框"/>
      </div>


    </div>


  </el-dialog>
</template>
<script>


export default {
  data() {
    return {
      show: false,
      keyword: "",
      list: [],
      curr: {},
      curr_url: "",
      test: {
        keyword: "",
        url_1: "https://douyin.com",
        url_2: "https://creator.douyin.com",
        cookies: [],
        cookies_str: "",
      }
    }
  },

  methods: {
    async open() {
      this.show = true
      this.搜索()
    },//
    async 搜索() {
      let resp = await axios_api({method: 'get', url: "/tb_account/find_list"})
      console.log(`搜索---resp:`, resp)
      this.list = resp.list
    },//
    async 导航栏输入框() {
      if (window["WEBVIEW"]) window["WEBVIEW"].loadURL(this.curr_url)
    },//
    async 控制台() {
      if (window["WEBVIEW"]) await window["WEBVIEW"].openDevTools()
    },//

    async 选择账号(item) {
      console.log(`选择账号---item:`, JSON.parse(JSON.stringify(item)))
      let webview_name = item.webview_name
      let partition = item.partition
      let url = item.url
      let config = {webview_name, partition, url, "container": '.container_webview', "preload": preload.PATH.preload, "style": `width: 100%; height: 500px; z-index: 100`,}
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


    async test_get_cookies() {
      let {webview_name, partition} = this.curr
      console.log(`test_get_cookies---111:`, {webview_name, partition})
      let cookies_1_1 = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: partition, url: this.test.url_1}})
      let cookies_2_1 = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: partition, url: this.test.url_2}})
      let cookies_1 = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: partition, url: this.test.url_1}})
      let cookies_2 = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: partition, url: this.test.url_2}})
      console.log(`111---cookies_1_1:`, cookies_1_1)
      console.log(`111---cookies_2_1:`, cookies_2_1)
      console.log(`111---cookies_1:`, cookies_1)
      console.log(`111---cookies_2:`, cookies_2)
    },//
    async test_get_cookies222() {
      let {webview_name, partition} = this.curr
      console.log(`test_get_cookies222---111:`, {webview_name, partition})
      let cookies = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: partition, url: this.test.keyword}})
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: partition, url: this.test.keyword}})
      console.log(`111---cookies:`, cookies)
      console.log(`111---cookies_str:`, cookies_str)

    },//


    async get_loadURL() {
      await window["WEBVIEW"].loadURL("https://creator.douyin.com")
      await new Promise((resolve) => setTimeout(resolve, 2000))
    },//

    async get_env_data() {
      // let env_data =await window["WEBVIEW"].call_eval(func1.toString())
      window['env_data'] = {}
      window['env_data'] = await document.querySelector("webview").executeJavaScript(`(${func1.toString()})()`)

      function func1() {
        // alert("异常env_data")
        try {
          let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
          let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
          let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
          let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
          return {prvkey, ticket, ts_sign, csr}
        } catch (error) {
          alert("异常env_data")
        }
      }

      // url_1: "https://douyin.com",
      //     url_2: "https://creator.douyin.com",
      let {webview_name, partition} = this.curr
      console.log(`111---partition:`,     partition        )
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: partition, url: "https://douyin.com"}})
      env_data['cookie'] = cookies_str
      console.log(`111---env_data:`, env_data)
    },


    async test_douyin_img() {
      await this.get_loadURL()
      await this.get_env_data()
      let result = await axios_api({method: 'post', url: "douyin/api_img/main", data: {env_data}})
      console.log(`111---result:`, result)
    },

  },

  async mounted() {
 

  },


}
</script>

<style scoped>


</style>



