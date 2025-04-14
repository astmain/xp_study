<template>
  <div>

    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="启动WEBVIEW()">启动WEBVIEW</el-button>
    <el-button @click="选择平台()">选择平台</el-button>


    <div>{{ share111.row.nickname }}</div>
    <div style="display: flex; flex-direction: column;gap: 10px; padding: 10px ; border-radius:10px  ;   background: black   ;    ">
      <nav style="display: flex ;gap: 5px;">
        <el-button @click="控制台()">控制台</el-button>
        <el-button @click="确定登陆()">确定登陆</el-button>
        <el-button @click="注入js()">注入js</el-button>
        <el-button @click="sss()">sss</el-button>
      </nav>
      <div class="webview_container"></div>
    </div>


  </div>

  <com_platform ref="com_platform"></com_platform>
</template>

<script>
import WEBVIEW from "../../WEBVIEW/WEBVIEW"
import WEBVIEW_start from "../../WEBVIEW/WEBVIEW_start"

import tool_sign from "./tool_sign"
import {defineAsyncComponent} from "vue"


config_vue_pinia_share({share_name: "share111", state: require('./share111.js').state, persist: require('./share111.js').persist})

export default {
  components: {
    com_platform: defineAsyncComponent(() => import('./com_platform.vue')),//
  },
  data() {
    return {
      name: "数据1",
      url: "",
      history: [
        {title: "标题", url: "网址"},
      ],
      dialogVisible: false,


    }


  },

  methods: {
    async 启动WEBVIEW({css, partition, webviewId, url}) {
      let WEB = new WEBVIEW()
      this.WEB = WEB
      window.WEB = WEB
      await WEB.create({css, partition, webviewId, path_preload: preload.PATH.preload})
      await WEB.style({css: "width: 100%; height: 500px; z-index: 100"})
      await WEB.goto({url})
      // await WEB.goto({url: "http://127.0.0.1:9999/index?name=小许&age=18"})
    },//


    async 控制台() {
      await WEB_share111.openDevTools()
    },//


    async 选择平台() {
      this.$refs.com_platform.open()
      console.log(`111---share111:`, share111)
    },//


    async 确定登陆() {
      console.log(`确定登陆---share111:`, share111)
      console.log(`确定登陆---222:`, WEB_share111)


      let params = {
        url: WEB_share111.webview.getURL(),
        partition: WEB_share111.webview.partition,
      }
      console.log(`111---222:`, params)


      let cookies = await axios_api({method: 'get', url: "ipc/get_cookies", params})
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params})
      console.log(`111---cookies:`, cookies)
      console.log(`111---cookies_str:`, cookies_str)


      let config = {
        method: 'get',
        url: 'https://edith.xiaohongshu.com/api/sns/web/v2/user/me',
        headers: {
          'custom_Cookie': cookies_str,
          'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
        }
      }


      let {data: user} = await axios_api(config)
      console.log(`111---user:`, user)
      share111.row.nickname = user.nickname
      share111.row.userid = user.user_id
      share111.row.avatar = user.imageb
      share111.row.cookies = cookies
      share111.row.cookies_str = cookies_str
      console.log(`111---share111:`, share111)
      msg_success({message: "todo存储用户信息", duration: 3 * 1000, showClose: true,})
    },//

    async 注入js() {
      WEB_share111.eval_call(function () {
        alert("注入js")
        let eles = document.querySelectorAll('.note-item')
        for (let i = 0; i < eles.length; i++) {
          let ele = eles[i]
          console.log(`111---ele:`, ele)

          let div = ele_warp = document.createElement('div')
          div.className = 'btn1'
          div.innerHTML = `<div>提取图文</div>`
          div.backgroundColor = "red"
          div.onclick = function () {
            alert('按钮被点击了！');
          };
          ele.appendChild(div);


        }


      })

    },//


    async sss() {


      // ipcMain.handle('xhs_sign',
      // uri, params, headers
      console.log(`111---tool_sign:`, tool_sign)

    },//


  },////

  async mounted() {
    let config = {
      css: '.webview_container',
      partition: 'persist:min111',
      webviewId: 'min111',
      url: 'https://baidu.com'
    }
    await WEBVIEW_start(config)

  },////

}
</script>

<style scoped></style>



