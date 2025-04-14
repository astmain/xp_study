<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="openDevTools()">openDevTools</el-button>
  <el-button @click="call_eval()">call_eval</el-button>
  <el-button @click="得到cookies()">得到cookies</el-button>
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
    <el-button @click="控制台()">控制台</el-button>
    <el-button @click="确认登录()">确认登录</el-button>
    <el-button @click="提取图文视频js()">提取图文视频js</el-button>
    <el-input style="width: 100%;" v-model="curr_url" placeholder="请输入回车" spellcheck="false" @keyup.enter.native="导航栏输入框"/>
  </div>


</template>

<script>

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
        {webview_name: "web333", platform: "小红书", remark: '小红书个人', url: 'https://www.xiaohongshu.com/explore', partition: "persist:xhs111", nickname: "", cookies: [], cookies_str: "", log: "", avatar: ""},

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
      this.curr = config

      await webview_start(config)
      window[this.curr.webview_name].didStartNavigation((event) => {
        if (event.isMainFrame && event.url) {
          this.url = decodeURIComponent(event.url)
          console.log(`event.url---:`, event.url)
          this.curr_url = event.url
          this.提取图文视频js()
        }
      })


      await window[this.curr.webview_name].addEventListener_sendToHost(async (args) => {
        let {xsec_token, source_note_id} = args
        console.log(`addEventListener_sendToHost:`, {xsec_token, source_note_id})

        let params = this.curr
        let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params})
        let cookie = cookies_str
        let result = await axios_api({method: 'post', url: "/xhs/api_img_text", data: {source_note_id, xsec_token, cookie}})
        console.log(`888---result:`, result)
      })

    },//
    async 提取图文视频js() {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      window[this.curr.webview_name].call_eval(function () {
        let elements = document.querySelectorAll('.note-item')
        for (let i = 0; i < elements.length; i++) {
          let ele = elements[i]
          let div = document.createElement('div')
          div.className = 'btn1'
          div.innerHTML = `<div>提取图文</div>`
          div.backgroundColor = "red"
          div.onclick = onclick
          ele.appendChild(div);

          function onclick() {
            let element = ele.querySelector('.cover')
            console.log(`111---element:`, element)
            window.url = element.href
            console.log(`222---url:`, url)
            let params111 = url.split('?')[1]
            let params = new URLSearchParams(params111)
            console.log(`333---params:`, params)
            let xsec_token = params.get('xsec_token')
            console.log(`444---xsec_token:`, xsec_token)
            let source_note_id = ""
            //  source_note_id=  "https://www.xiaohongshu.com/explore/67caf377000000000d01584d?xsec_token=ABt01T2dLr6-SOX8L0sU6oROjq98hx39AyahrdrWACFfw=&xsec_source="
            //  source_note_id=  "https://www.xiaohongshu.com/search_result/67caf377000000000d01584d?xsec_token=ABt01T2dLr6-SOX8L0sU6oROjq98hx39AyahrdrWACFfw=&xsec_source="
            if (url.includes("/explore/")) source_note_id = url.replace("https://www.xiaohongshu.com/explore/", "").replace(/\?.*/, "")
            if (url.includes("/search_result/")) source_note_id = url.replace("https://www.xiaohongshu.com/search_result/", "").replace(/\?.*/, "")
            // let source_note_id=url_parse(url)._path_last  //想使用tool_js_web的库到时没有引用带webview中
            console.log(`555---source_note_id:`, source_note_id)
            console.log(`666---preload:`, preload)
            preload.sendToHost({xsec_token, source_note_id})

          }
        }
      });


    },//


    async 导航栏输入框() {
      window[this.curr.webview_name].loadURL(this.curr_url)
    },//


    async 控制台() {
      window[this.curr.webview_name].closeDevTools()
      window[this.curr.webview_name].openDevTools()
    },//


    async 确认登录() {
      let params = this.curr
      let cookies = await axios_api({method: 'get', url: "ipc/get_cookies", params})
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params})
      console.log(`确认登录---cookies:`, cookies)
      console.log(`确认登录---cookies_str:`, cookies_str)

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


  },////

  async mounted() {
  },////

}


</script>
<style scoped></style>



