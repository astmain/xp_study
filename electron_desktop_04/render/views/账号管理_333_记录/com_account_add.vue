<template>
  <!--  <el-dialog title="账号选择" width="800px" v-model="show_com_add_platform_account" draggable :close-on-click-modal="false" :destroy-on-close="true">-->
  <el-dialog title="账号选择" width="1200px" v-model="show_com_account_add" draggable :close-on-click-modal="false" :destroy-on-close="true">

    <el-button @click="确定登录()">确定登录</el-button>
    <el-button @click="test_douyin_img()">test_douyin_img</el-button>
    <el-button @click="get_loadURL()">get_loadURL</el-button>
    <el-button @click="get_env_data()">get_env_data</el-button>
    <div style="display: flex;flex-direction: row;gap:16px;">
      <div v-for="item in  list">
        <div @click="登录账号(item)" style="display: flex; flex-direction: column;align-items: center;gap:4px;">
          <img style="width:32px" :src="item.logo" alt="">
          <span style="font-size:  12px ;color: #141414">{{ item.platform_name }}</span>
        </div>
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
      show_com_account_add: false,
      curr_url: "",
      curr: {
        url: "", partition: "persist:temp", cookies: [], cookies_str: "", login: async () => {
          alert('login---curr')
        }
      },//当前选中平台
      list: [
        {
          platform: "xhs",
          platform_name: "小红书",
          url: 'https://www.xiaohongshu.com/explore',
          logo: "public/platform_xhs.png",
          login: async (cookies_str) => {
            let config = {
              method: 'get',
              url: 'https://edith.xiaohongshu.com/api/sns/web/v2/user/me',
              headers_custom: {
                'Cookie': cookies_str,
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
              }
            }
            let {data: user} = await axios_api(config)
            console.log(`确认登录---user:`, user)
            if (user.nickname && user.user_id && user.images) {
              return {nickname: user.nickname, user_id: user.user_id, avatar: user.images,}
            } else {
              let result = {msg: "小红书---登录失败", user}
              console.log(result)
              alert(result.msg)
            }
          }
        },
        {
          platform: "douyin",
          platform_name: "抖音",
          url: 'https://www.douyin.com/discover',
          logo: "public/platform_douyin.png",
          login: async (cookies_str) => {
            let config = {
              url: `https://creator.douyin.com/web/api/media/user/info/`,
              method: 'GET',
              headers_custom: {
                'Content-Type': 'application/json',
                'Cookie': cookies_str
              }
            }
            let data = await axios_api(config)
            console.log(`确认登录---data:`, data)
            let user = data.user
            console.log(`确认登录---user:`, user)
            if (user?.nickname && user?.short_id && user?.avatar_larger?.url_list[0]) {
              return {nickname: user.nickname, user_id: user.short_id, avatar: user?.avatar_larger?.url_list[0]}
            } else {
              let result = {msg: "抖音---登录失败", user}
              console.log(result)
              alert(result.msg)
            }
          }

        },
      ],


    }
  },

  methods: {
    async open() {
      this.show_com_account_add = true
    },//

    async 登录账号(item) {
      let random = Math.floor(Math.random() * 999999)
      let webview_name = 'login' + random
      let partition = "persist:login" + random
      let config = {
        container: '.container_webview',
        style: `width: 100%; height: 500px; z-index: 100`,
        webview_name: webview_name,
        partition: partition,
        preload: preload.PATH.preload,
        url: item.url
      }
      window["WEBVIEW"] = await webview_start(config)
      window["WEBVIEW"].didStartNavigation((event) => {
        if (event.isMainFrame && event.url) {
          this.url = decodeURIComponent(event.url)
          console.log(`event.url---:`, event.url)
          this.curr_url = event.url
        }
      })


      this.curr = {...item, webview_name, partition}
    },//


    async 确定登录() {
      console.error(`111---登录api=========`)
      let url_1 = "https://douyin.com"
      let url_2 = "https://creator.douyin.com"
      let partition_login = this.curr.partition
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: partition_login, url: url_1}})
      let user = await this.curr.login(cookies_str)
      console.log(`111---user:`, user)

      console.error(`222---新webview=========`)
      let webview_name = this.curr.platform + "_" + user.user_id   //douyin_1844606013
      let partition = "persist:" + webview_name
      let config = {webview_name, partition, url: "about:blank", "container": '.container_webview', "preload": preload.PATH.preload, "style": `width: 100%; height: 500px; z-index: 100`,}
      window["WEBVIEW"] = await webview_start(config)
      console.log(`111---config:`, config)
      console.log(`111---WEBVIEW`)
      await new Promise((resolve) => setTimeout(resolve, 4000))

      console.error(`333---得到cookies_1_cookies_2=========`)
      // let cookies_1 = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: partition_login, url: url_1}})
      let cookies_2 = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: partition_login, url: url_2}})

      // await axios_api({method: 'post', url: "ipc/set_cookies", data: {partition, url: url_1, cookies: cookies_1}})
      await axios_api({method: 'post', url: "ipc/set_cookies", data: {partition, url: url_2, cookies: cookies_2}})
      console.error(`444---存储数据库=========`)
      let cookies3_1 = []
      // let cookies3_1 = [...cookies_1,...cookies_2,]
      let data = {cookies_str, cookies: cookies3_1, webview_name, partition, url: url_1, nickname: user.nickname, user_id: user.user_id, avatar: user.avatar, line: true}
      let result_create_one = await axios_api({method: 'post', url: "/tb_account/save_one", data})
      console.log(`确定登录---result_create_one:`, result_create_one)
      await new Promise((resolve) => setTimeout(resolve,4000))
      window["WEBVIEW"].loadURL(url_2)
    },//


    async 导航栏输入框() {
      if (window["WEBVIEW"]) window["WEBVIEW"].loadURL(this.curr_url)
    },//


    async test_douyin_img() {
      await this.get_loadURL()
      await this.get_env_data()
      let result = await axios_api({method: 'post', url: "douyin/api_img/main", data: {env_data}})
      console.log(`111---result:`, result)
    },


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
  },

  async mounted() {


  },
}
</script>

<style scoped>


</style>



