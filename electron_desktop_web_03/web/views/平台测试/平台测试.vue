<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="openDevTools()">openDevTools</el-button>
  <el-button @click="call_eval()">call_eval</el-button>
  <el-button @click="得到cookies()">得到cookies</el-button>
  <el-button @click="get_env_data()">get_env_data</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="nickname" label="nickname" width="150px" show-overflow-tooltip/>
    <el-table-column prop="remark" label="remark" width="150px" show-overflow-tooltip/>
    <el-table-column prop="url" label="url" width="auto" show-overflow-tooltip/>
    <el-table-column label="操作" width="150px">
      <template #default="scope">
        <el-button size="small" @click="选择确定(scope.row)">确定</el-button>
      </template>
    </el-table-column>
  </el-table>


  <div class="container_webview">
    <el-input style="width: 100%;" v-model="curr_url" placeholder="请输入回车" spellcheck="false" @keyup.enter.native="导航栏输入框"/>

  </div>


</template>

<script>

import webview_start from "./webview_start"

export default {
  components: {},
  data() {
    return {
      name: "数据1",
      url: "",
      tableData: [
        {webview_name: "web111", platform: "抖音", remark: '抖音个人', url: 'https://douyin.com', partition: "persist:douyin111", nickname: "", cookies: [], cookies_str: "", log: "", avatar: ""},
        {webview_name: "web111", platform: "抖音", remark: '抖音创造者', url: 'https://creator.douyin.com/creator-micro/home', partition: "persist:douyin111", nickname: "衣服2", cookies: [], cookies_str: "", log: "", avatar: ""},
        {webview_name: "web222", platform: "抖音", remark: '抖音创造者', url: 'https://creator.douyin.com/creator-micro/home', partition: "persist:douyin222", nickname: "盾牌", cookies: [], cookies_str: "", log: "", avatar: ""},
      ],
      curr_url: "",
      curr: {
        "webview_name": "web111",
        "platform": "抖音",
        "remark": "抖音创造者",
        "url": "https://creator.douyin.com/creator-micro/home",
        "partition": "persist:douyin111",
        "nickname": "",
        "cookies": [],
        "cookies_str": "",
        "log": "",
        "avatar": "",
        "container": ".container_webview",
        "style": "width: 100%; height: 500px; z-index: 100",
        "preload": "C:\\Users\\Administrator\\AppData\\Roaming\\electron_desktop_web_02\\desktop\\preload.js"
      },


    }


  },

  methods: {
    async openDevTools() {
      window[this.curr.webview_name].openDevTools()
    },//

    async call_eval() {
      window[this.curr.webview_name].call_eval(function () {
        alert('call_eval')
        console.log(`111---222:`, this)
      })
    },//

    async 选择确定(row) {
      // let config = {
      //   container: '.container_webview',
      //   style: `width: 100%; height: 500px; z-index: 100`,
      //   webview_name: row.webview_name,
      //   partition: row.partition,
      //   preload: preload.PATH.preload,
      //   url: row.url
      // }
      let config = {...this.curr, ...row}
      this.curr=config

      await webview_start(config)
      window[this.curr.webview_name].didStartNavigation((event) => {
        if (event.isMainFrame && event.url) {
          this.url = decodeURIComponent(event.url)
          console.log(`event.url---:`, event.url)
          this.curr_url = event.url
        }
      })
    },//


    async 导航栏输入框() {
      window[this.curr.webview_name].loadURL(this.curr_url)
    },//


    async 得到cookies() {
      // let params = {partition: this.WEB.webview.partition, url: this.WEB.webview.getURL()}
      let params = this.curr
      console.log(`得到cookies---params:`, params)
      let cookies = await axios_api({method: 'get', url: "ipc/get_cookies", params})
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params})
      console.log(`得到cookies---cookies:`, cookies)
      console.log(`得到cookies---cookies_str:`, cookies_str)
    },//

    async get_env_data() {
      function func() {
        let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
        let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
        let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
        let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
        return {prvkey, ticket, ts_sign, csr}
      }

      let env_data = await window[this.curr.webview_name].call_eval(func)
      console.log(`111env_data---:`, env_data)
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: this.curr})
      env_data["cookie"] = cookies_str
      console.log(`222env_data---:`, env_data)

    },//


  },////

  async mounted() {
  },////

}


</script>

<style scoped></style>



