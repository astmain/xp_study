<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>

    <div>
      <el-select v-model="options.curr" placeholder="请选择" value-key="id">
        <el-option v-for="item in options.list" :key="options.key" :label="item.name" :value="item" @click.native="选择平台(item)">
        </el-option>
      </el-select>
      <p>当前选中的值: {{ options.curr }}</p>
    </div>

    <div style="display: flex;flex-direction: row;margin-bottom: 4px">
      <el-button @click="get_loadURL()">get_loadURL</el-button>
      <el-button @click="get_env_data()">get_env_data</el-button>
    </div>
    <div style="display: flex;flex-direction: row;margin-bottom: 4px">
      <el-button @click="test_douyin_img()">test_douyin_img</el-button>
      <el-button @click="test_douyin_video()">test_douyin_video</el-button>
    </div>
    <div class="container_test111">
      <div style="display: flex;flex-direction: row;gap:16px;">
        <el-button @click="控制台()">控制台</el-button>
        <el-input style="width: 100%;" v-model="curr_url" placeholder="请输入回车" spellcheck="false" @keyup.enter.native="导航栏输入框"/>
      </div>
    </div>

  </div>
</template>
<script>
import options_data from "./options_data"
import config_douyin from "views/账号管理/config_douyin";


export default {
  data() {
    return {
      curr_url: "",
      curr_web: null,
      options: options_data(),
    }


  },

  methods: {
    async 选择平台(item) {
      this.curr_web = await webview_run({partition: item.partition, url: item.url, container: '.container_test111'})
      let cookies_str = await get_cookies_str({url: item.url, partition: item.partition})
      let user = await new config_douyin().login_check(cookies_str)
      if (user.user_id) {
        console.log(`选择平台---user:`, user)
        // Account.user_id = user.user_id
        // Account.nickname = user.nickname
        // Account.avatar = user.avatar
        // Account.cookies_str = user.cookies_str
        // Account.platform = user.platform
        // Account.platform_name = user.platform_name
        BUS.Account = user
      }


      console.log(`选择平台---Account:`, JSON.parse(JSON.stringify(BUS.Account)))
    },//
    async 控制台() {
      if (this.curr_web) await this.curr_web.openDevTools()
    },//
    async 导航栏输入框() {
      if (this.curr_web) this.curr_web.goto(this.curr_url)
    },//

    async get_loadURL() {
      window["WEBVIEW"] = await document.querySelector("webview")
      await window["WEBVIEW"].goto("https://creator.douyin.com")
    },//
    async get_env_data() {
      window['env_data'] = {}
      window['env_data'] = await window["WEBVIEW"].call_eval(
          function func1() {
            try {
              let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
              let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
              let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
              let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
              return {prvkey, ticket, ts_sign, csr}
            } catch (error) {
              alert("异常env_data")
              throw Error("异常env_data")
            }
          }
      )


      let cookies = await get_cookies({partition: window["WEBVIEW"].partition, url: "https://douyin.com"})
      let cookies_str = cookie_arr_to_str(cookies)
      env_data['cookie'] = cookies_str
      window['cookie'] = cookies_str

      console.log(`111---env_data:`, env_data)
    },//
    async test_douyin_img() {
      await this.get_loadURL()
      await this.get_env_data()
      console.log(`test_douyin_img---partition:`, window["WEBVIEW"].partition)
      debugger
      await api_platform222.douyin.api_img({data: "", env_data})
    },//

    async test_douyin_video() {
      await this.get_loadURL()
      await this.get_env_data()
      console.log(`test_douyin_img---partition:`, window["WEBVIEW"].partition)
      debugger
      await api_platform222.douyin.api_video({data: "", env_data})
    },//


  },////

  async mounted() {
    this.选择平台(this.options.curr)


  },////

}
</script>

<style scoped></style>



