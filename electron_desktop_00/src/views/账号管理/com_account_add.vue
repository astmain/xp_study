<template>
  <!--  <el-dialog title="账号选择" width="800px" v-model="show_com_add_platform_account" draggable :close-on-click-modal="false" :destroy-on-close="true">-->
  <el-dialog title="账号选择" width="1200px" v-if="show" v-model="show" draggable :close-on-click-modal="false" :destroy-on-close="true">


    <el-button @click="新webview()">新webview</el-button>
    <el-button @click="测试注入()">测试注入</el-button>


    <div style="display: flex;flex-direction: row;margin-bottom: 4px">
      <el-button @click="main()">main</el-button>
      <el-button @click="a1得到用户信息()">a1得到用户信息</el-button>
      <el-button @click="a2得到cookies_和_store()">a2得到cookies_和_store</el-button>
      <el-button @click="a3创建新WEB()">a3创建新WEB</el-button>
      <el-button @click="a4设置cookies和store()">a4设置cookies和store</el-button>
    </div>
    <div>https://www.douyin.com/</div>
    <div>https://creator.douyin.com/</div>
    <div style="display: flex;flex-direction: row;gap:16px;">
      <div v-for="item in list">
        <div style="display: flex; flex-direction: column;align-items: center;gap:4px;">
          <img style="width:32px" :src="item.logo" alt="" @click="选择平台(item)">
          <span style="font-size:  12px ;color: #141414">{{ item.platform_name }}</span>
        </div>
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


async function set_cookies({url, partition, cookies}) {
  const {session} = require('@electron/remote')
  // console.log(`set_cookies---111:`, {url, partition, cookies})
  for (let i = 0; i < cookies.length; i++) {
    let item = cookies[i]
    let ele = {...item, url}
    try {
      session.fromPartition(partition).cookies.set(ele)
      // console.log(`set_cookies---222:`, url, partition, ele)
    } catch (error) {
      console.error(`异常:set_cookies---ele`, ele)
    }
  }
}

async function get_cookies({url, partition}) {
  const {session} = require('@electron/remote')
  const cookies = await session.fromPartition(partition).cookies.get({url})
  return cookies
}

async function get_cookies_str({url, partition}) {
  let {session} = require('@electron/remote')
  let cookies = await session.fromPartition(partition).cookies.get({url})
  let cookies_str = ""
  if (Object.prototype.toString.call(cookies) === '[object Array]') {
    for (let i = 0; i < cookies.length; i++) {
      let ele = cookies[i]
      cookies_str += ele.name + "=" + ele.value + "; "
    }
  } else {
    throw new Error('函数cookie_arr_to_str的参数必须是数组对象');
  }
  return cookies_str
}

async function get_localStorage({webview}) {
  let store = await webview.executeJavaScript(`(${
      function () {
        return window.localStorage
      }
  })()`)
  console.log(`get_localStorage---成功:`, store)
  return store
}


async function set_localStorage({webview, store}) {
  let store_str = JSON.stringify(store)
  let isok = await webview.executeJavaScript(`(${
      function (store) {
        for (const key in store) {
          let val = store[key]
          localStorage.setItem(key, val)
          console.log(`localStorage_set---key:`, {key, val})
        }
        console.log(`set_localStorage---成功`, store)
        return true
      }
  })(${store_str})`)
  if (isok) {
    console.log(`set_localStorage---成功`, store)
  } else {
    alert("失败")
  }
}

async function wait_css({desc, css}) {
  for (let i = 0; i < 1000; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10))
    let element = null
    if (css.includes('xpath')) {
      let xpathExpression = css.replace('xpath', '')
      let {singleNodeValue} = document.evaluate(
          xpathExpression,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
      )
      element = singleNodeValue ? singleNodeValue : null
    } else {
      element = document.querySelector(css)
    }
    if (element) {
      console.log(`成功:${desc}---wait_css---css:${css}`)
      return element
    }
  }
  throw Error(`失败:${desc}---wait_css---css:${css}`)
}


export default {
  data() {
    return {
      show: false,
      curr_url: "",
      curr_webview: null,
      curr_item: {url_home: "", url_creator: "", partition: "persist:temp", cookies: [], cookies_str: "", login: async () => alert('login---curr_item')},//当前选中平台
      env_data: {partition_old: "", partition_new: "", cookies_1: [], cookies_2: [], store: {}, url_home: "", platform: "", url_creator: "", nickname: "", user_id: "", avatar: ""},
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
              throw Error(JSON.stringify(result))
            }
          }
        },
        {
          platform: "douyin",
          platform_name: "抖音",
          url_home: 'https://www.douyin.com/',
          url_creator: 'https://creator.douyin.com/',
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
      this.show = true
    },//

    async 选择平台(item) {
      console.log(`选择平台================================================`)
      let webview_name = 'login'
      let partition = "persist:" + webview_name
      let url = item.url_home
      let config = {webview_name, partition, url, container: '.container_webview'}
      this.curr_webview = await webview_start(config)
      WEB.didStartNavigation((event) => {
        if (event.isMainFrame && event.url) {
          this.url = decodeURIComponent(event.url)
          console.log(`event.url---:`, event.url)
          this.curr_url = event.url
        }
      })
      this.curr_item = {...item, webview_name, partition, url}


      // 设置环境env_data
      this.env_data.platform = item.platform
      this.env_data.partition_old = partition
      this.env_data.url_home = item.url_home
      this.env_data.url_creator = item.url_creator
      console.log(`111---partition_old:`, this.env_data.partition_old)
      console.log(`222---url_home:`, this.env_data.url_home)
      console.log(`333---url_creator:`, this.env_data.url_creator)
      if (!(this.env_data.platform && this.env_data.partition_old && this.env_data.url_home && this.env_data.url_creator)) throw Error("选择平台---数据异常")
    },//


    async main() {
      await this.a1得到用户信息()
      await this.a2得到cookies_和_store()
      await this.a3创建新WEB()
      await this.a4设置cookies和store()

    },//1


    async a1得到用户信息() {
      console.log(`得到用户信息================================================`)
      let url = this.env_data.url_home
      let partition = this.env_data.partition_old
      let cookies_str = await get_cookies_str({partition, url})
      let {nickname, user_id, avatar} = await this.curr_item.login(cookies_str)
      console.log(`得到用户信息---nickname:`, nickname)
      console.log(`得到用户信息---user_id:`, user_id)
      //数据
      this.env_data.nickname = nickname
      this.env_data.user_id = user_id
      this.env_data.avatar = avatar
      if (!(nickname && user_id && avatar)) throw Error("得到用户信息---数据异常")
    },//


    async a2得到cookies_和_store() {
      console.log(`a2得到cookies_和_store============================`)
      let partition = WEB.partition
      let url_home = this.env_data.url_home
      let url_creator = this.env_data.url_creator
      console.log(`111---partition:`, partition)
      console.log(`222---url_home:`, url_home)
      console.log(`333---url_creator:`, url_creator)
      //数据
      this.env_data.cookies_1 = await get_cookies({partition, url: url_home})
      this.env_data.cookies_2 = await get_cookies({partition, url: url_creator})
      this.env_data.store = await get_localStorage({webview: WEB})
      console.log(`444---cookies_1:`, this.env_data.cookies_1)
      console.log(`555---cookies_2:`, this.env_data.cookies_2)
      console.log(`666---store:`, this.env_data.store)
      if (!(url_home && url_creator && this.env_data.cookies_1 && this.env_data.cookies_2 && this.env_data.store)) throw Error("得到cookies---数据错误")
    },//


    async a3创建新WEB() {
      console.info(`创建新WEB===============================`)
      let webview_name = this.env_data.platform + "_" + this.env_data.user_id
      let partition = "persist:" + webview_name
      let config = {webview_name, partition, container: '.container_webview', url: this.env_data.url_home}
      let new_webview = await webview_start(config)
      await new Promise((resolve) => setTimeout(resolve, 5000))
      console.log(`1`, "等待5秒")
      // 数据
      this.env_data.partition_new = partition

    },//


    async a4设置cookies和store() {
      console.info(`a4设置cookies和store================================`)
      await set_cookies({url: this.env_data.url_home, partition: this.env_data.partition_new, cookies: this.env_data.cookies_1})
      await set_cookies({url: this.env_data.url_creator, partition: this.env_data.partition_new, cookies: this.env_data.cookies_2})
      await set_localStorage({webview: WEB, store: this.env_data.store})
      await WEB.loadURL(this.env_data.url_home)
    },//


    async 导航栏输入框() {
      if (WEB) WEB.loadURL(this.curr_url)
    },//

    async 控制台() {
      if (WEB) await WEB.openDevTools()
    },//


    async 新webview() {
      let config = {webview_name: "douyin_1844606013", partition: "persist:douyin_1844606013", url: "https://www.douyin.com/", container: '.container_webview'}
      let new_webview = await webview_start(config)


    },//

    async 测试注入() {
      let inject = `${function () {
        window['wait_css'] = wait_css_replace
      }}`
      inject = inject.replace('wait_css_replace', wait_css.toString())
      console.log(`111---222:`, inject)
      WEB.call_eval(inject)

      async function wait_css({desc, css}) {
        for (let i = 0; i < 1000; i++) {
          await new Promise((resolve) => setTimeout(resolve, 10))
          let element = null
          if (css.includes('xpath')) {
            let xpathExpression = css.replace('xpath', '')
            let {singleNodeValue} = document.evaluate(
                xpathExpression,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            )
            element = singleNodeValue ? singleNodeValue : null
          } else {
            element = document.querySelector(css)
          }
          if (element) {
            console.log(`成功:${desc}---wait_css---css:${css}`)
            return element
          }
        }
        throw Error(`失败:${desc}---wait_css---css:${css}`)
      }

    },//


  },

  async mounted() {


  },
}
</script>

<style scoped>


</style>



