<template>
  <div class="view1" style="height: 100%">
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="控制WebContentsView()">控制WebContentsView</el-button>


    <nav style="display: flex ;  flex-wrap: wrap">
      <div style="padding: 4px;margin: 4px;background: darkred;">
        <el-button @click="脚本()">脚本</el-button>
        <el-button @click="隐藏()">隐藏</el-button>
        <el-button @click="显示()">显示</el-button>
        <div class="account1" style="height: 400px ;width: 400px ;background: red; margin: 4px"></div>
      </div>

      <div style="padding: 4px;margin: 4px;background: darkgreen;">
        <el-button @click="隐藏()">隐藏</el-button>
        <el-button @click="显示()">显示</el-button>
        <div class="account2" style="height: 400px ;width: 400px ;background: green; margin: 4px"></div>
      </div>
      <div style="padding: 4px;margin: 4px;background: darkblue;">
        <el-button @click="隐藏()">隐藏</el-button>
        <el-button @click="显示()">显示</el-button>
        <div class="account3" style="height: 400px ;width: 400px ;background: blue; margin: 4px"></div>
      </div>

      <div style="padding: 4px;margin: 4px;background: darkgray;">
        <el-button @click="隐藏()">隐藏</el-button>
        <el-button @click="显示()">显示</el-button>
        <div class="account4" style="height: 400px ;width: 400px ;background: gray; margin: 4px"></div>
      </div>

    </nav>


  </div>
</template>

<script>

async function make_params({clazz, loadURL}) {
  let view = document.querySelector(clazz)
  let key = clazz.replace(".", "")
  let height = view.clientHeight
  let width = view.clientWidth
  let x = view.getBoundingClientRect().left
  let y = view.getBoundingClientRect().top
  await preload.invoke('IPC_WebContentsView_init', {x, y, height, width, key, loadURL})
  let result = {x, y, height, width, key, clazz, loadURL, view}
  return result
}

// 监听页面大小WebContentsView
async function WebContentsView_on_resize({WebContentsView_accounts}) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  await window.addEventListener('resize', async () => {
    for (let i = 0; i < WebContentsView_accounts.length; i++) {
      let {x, y, height, width, key, clazz, loadURL, view} = WebContentsView_accounts[i]
      height = view.clientHeight
      width = view.clientWidth
      x = view.getBoundingClientRect().left
      y = view.getBoundingClientRect().top
      await preload.invoke('IPC_WebContentsView_size', {x, y, height, width, key: key, loadURL})
    }
  })
}

export default {
  data() {
    return {
      WebContentsView_accounts: []


    }


  },

  methods: {

    async 脚本() {
      await preload.invoke('IPC_WebContentsView_spider', {key: "account1", spider_script: "./sprider_script/zhihu_video.js"})
    },//

    async 隐藏() {
      await preload.invoke('IPC_WebContentsView_show', {key: "account1", show: false})
    },//

    async 显示() {
      await preload.invoke('IPC_WebContentsView_show', {key: "account1", show: true})
    },//


    async WebContentsView_初始化() {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      let WebContentsView_accounts = this.WebContentsView_accounts = [
        {...(await make_params({clazz: ".account1", loadURL: "https://www.zhihu.com/zvideo/upload-video"}))}, //
        {...(await make_params({clazz: ".account2", loadURL: "https://www.baidu.com"}))}, //
        {...(await make_params({clazz: ".account3", loadURL: "https://www.bing.com"}))}, //
      ]

      await WebContentsView_on_resize({WebContentsView_accounts})
    }


  },////

  async mounted() {
    this.WebContentsView_初始化()
  }

  ,////

}
</script>

<style scoped></style>



