<template>
  <!--  <el-dialog title="账号选择" width="800px" v-model="show_com_add_platform_account" draggable :close-on-click-modal="false" :destroy-on-close="true">-->
  <el-dialog title="账号选择" width="1200px" v-if="show" v-model="show" draggable :close-on-click-modal="false" :destroy-on-close="true">

    <el-button @click="main确定登录()">main确定登录</el-button>
    <el-button @click="test_douyin_img()">test_douyin_img</el-button>
    <el-button @click="get_loadURL()">get_loadURL</el-button>
    <el-button @click="get_env_data()">get_env_data</el-button>
    <div style="display: flex;flex-direction: row;gap:16px;">
      <div v-for="item in  list">
        <div @click="选择平台准备登录(item)" style="display: flex; flex-direction: column;align-items: center;gap:4px;">
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
      show: false,
      curr_url: "",
      curr_webview: null,
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
          url_home: 'https://www.douyin.com',
          url_create: 'https://creator.douyin.com',
          logo: "public/platform_douyin.png",
          isok_login: async (cookies_str) => {
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
              // let result = {msg: "抖音---登录失败", user}
              // console.log(result)
              return {nickname: "", user_id: "", avatar: ""}
            }
          }

        },
      ],


    }
  },

  methods: {
    async open() {
      this.show = true
    },//

    async 选择平台准备登录(item) {
      let webview_name = 'login'
      let partition = "persist:" + webview_name
      let config = {webview_name, partition, preload: preload.PATH.preload, url: item.url_home, container: '.container_webview'}
      console.log(`选择平台准备登录---config:`, config)
      this.curr_webview = await webview_start(config)
      this.curr_webview.didStartNavigation((event) => {
        if (event.isMainFrame && event.url) {
          this.url = decodeURIComponent(event.url)
          // console.log(`event.url---:`, event.url)
          this.curr_url = event.url
        }
      })
      this.curr = {...item, webview_name, partition}
      await axios_api({method: 'get', url: "ipc/clear_cookies", data: {partition, url: item.url_home}})
    },//



    async met1(partition,url,cookies){
        console.log(`111---222:`,     333        )

    },//




    async main确定登录() {
      let log = console.log
      log(`api判断登录====================================`)
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: this.curr.partition, url: this.curr.url_home}})
      let user = await this.curr.isok_login(cookies_str)
      if (!(user.user_id && user.nickname && user.avatar)) {
        throw Error("失败:登录")
      } else {
        console.log("成功:登录", user)
      }
      log(`创建账号webview====================================`)
      let webview_name = "dinyin_" + user.user_id
      let partition = "persist:" + webview_name
      let config = {webview_name, partition, "url": url, container: '.container_webview', "preload": preload.PATH.preload}
      console.log(`创建账号webview---config:`, config)
      let webview = await webview_start(config)
      console.log(`创建账号webview---webview:`, webview)



      // let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: this.curr.partition, url: this.curr.url}})


    },//


    async 导航栏输入框() {
      if (this.curr_webview) this.curr_webview.loadURL(this.curr_url)
    },//


  },

  async mounted() {


  },
}
</script>

<style scoped>


</style>



