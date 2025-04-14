<template>
  <!--  <el-dialog title="账号选择" width="800px" v-model="show_com_add_platform_account" draggable :close-on-click-modal="false" :destroy-on-close="true">-->
  <el-dialog title="账号选择" width="1200px" v-model="show_com_account_add" draggable :close-on-click-modal="false" :destroy-on-close="true">

    <el-button @click="确定登录()">确定登录</el-button>
    <div style="display: flex;flex-direction: row;gap:16px;">
      <div v-for="item in  list">
        <div @click="登录账号(item)" style="display: flex; flex-direction: column;align-items: center;gap:4px;">
          <img style="width:32px" :src="item.logo" alt="">
          <span style="font-size:  12px ;color: #141414">{{ item.platform_name }}</span>
        </div>
      </div>
    </div>


    <div class="container_webview">


    </div>


  </el-dialog>
</template>
<script>


export default {
  data() {
    return {
      show_com_account_add: false,
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
      await webview_start(config)

      this.curr = {...item, webview_name, partition}
    },//


    async 确定登录() {
      console.error(`111---ajax判断是否真正登录=========`)
      let cookies = await axios_api({method: 'get', url: "ipc/get_cookies", params: this.curr})
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: this.curr})
      let user = await this.curr.login(cookies_str)
      console.log(`确定登录---user:`, user)
      console.log(`111---curr:`, JSON.parse(JSON.stringify(this.curr)))


      console.error(`222---登录信息赋值给curr=========`)
      this.curr.cookies = cookies
      this.curr.cookies_str = cookies_str
      this.curr.nickname = user.nickname
      this.curr.user_id = user.user_id
      this.curr.avatar = user.avatar
      this.curr.partition = "persist:" + this.curr.platform + "_" + user.user_id
      this.curr.webview_name = this.curr.platform + "_" + user.user_id
      console.log(`222---curr:`, JSON.parse(JSON.stringify(this.curr)))


      console.error(`444---set_cookies信息=========`)

      let url_1=""
      let url_2=""
      let cookies1 = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: 111 ,url:url_1}})
      let cookies2 = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: 111 ,url:url_2}})


      let result1 = await axios_api({method: 'post', url: "ipc/set_cookies", data: {partition, url:1111, cookies}})
      let result2 = await axios_api({method: 'post', url: "ipc/set_cookies", data: {partition, url:1111, cookies}})
      console.log(`444---data:`, {partition, url})
      console.log(`确定登录---set_cookies---result1:`, result1)
      console.log(`确定登录---set_cookies---result1:`, result2)



      console.error(`333---重新创建一个webview=========`)
      let webview_name = this.curr.webview_name
      let partition = this.curr.partition
      let url = this.curr.url
      let config = {
        webview_name,
        partition,
        url,
        "container": '.container_webview',
        "preload": preload.PATH.preload,
        "style": `width: 100%; height: 500px; z-index: 100`,
      }
      await webview_start(config)
      console.log(`333---config:`, config)





      console.error(`555---存储数据库=========`)
      let data = {cookies_str, cookies, partition, url, nickname: user.nickname, user_id: user.user_id, avatar: user.avatar, line: true}
      let result_create_one = await axios_api({method: 'post', url: "/tb_account/save_one", data})
      console.log(`确定登录---result_create_one:`, result_create_one)


    },//
  },

  async mounted() {


  },
}
</script>

<style scoped>


</style>



