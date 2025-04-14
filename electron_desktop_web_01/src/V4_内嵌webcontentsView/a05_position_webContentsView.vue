<template>
  <div class="view1" style="height: 100%">
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="WebContentsView_初始化222()">WebContentsView_初始化222</el-button>
    <el-button @click="WebContentsView_初始化222_隐藏()">WebContentsView_初始化222_隐藏</el-button>
    <el-button @click="WebContentsView_初始化222_脚本()">WebContentsView_初始化222_脚本</el-button>
    <el-button @click="得到IPC_WebContentsView_manager_info()">得到IPC_WebContentsView_manager_info</el-button>
    <nav style="width:100%  ;display: flex ;  flex-wrap: wrap">
      <div style="width:100%;padding: 4px;margin: 4px;background: darkred;">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <el-button @click="脚本()">脚本</el-button>
            <el-button @click="控制台()">控制台</el-button>
          </div>
          <div>
            <el-button @click="隐藏()">隐藏</el-button>
            <el-button @click="显示()">显示</el-button>
            <el-button @click="set_zoom()">缩放</el-button>
          </div>
        </div>
        <div style="position: relative ;">
          <div class="account1" style=";position: absolute ;z-index: 1; height: 700px ;width: 100% ;background: red; "></div>
          <div style="position: absolute ;z-index: 99; width: 1920px;height:500px ;background: black"></div>
        </div>


      </div>
    </nav>
  </div>
</template>
<script>
// 监听页面大小WebContentsView
function on_WebContentsView_size(key, callback) {
  let height, width, x, y = 0
  const ob = new ResizeObserver(async elements => {
    for (let ele of elements) {
      height = ele.target.clientHeight
      width = ele.target.clientWidth
      x = ele.target.getBoundingClientRect().left
      y = ele.target.getBoundingClientRect().top
      callback({x, y, height, width})
    }
    return {height, width, x, y}
  })

  let elements = document.querySelectorAll(key)
  if (elements.length === 0) {
    alert(`容器key数量等于0,请检查代码key:${key}`)
  }
  if (elements.length >= 2) {
    alert(`容器key数量${elements.length},必须是唯一一个,请检查代码key:${key}`)
  }

  if (elements.length === 1) {
    let ele = document.querySelector(key)
    ob.observe(ele)
  }
}

export default {
  data() {
    return {
      WebContentsView_item: []
    }
  },

  methods: {
    async 脚本() {
      await preload.invoke('IPC_WebContentsView_size_x', {desc: "设置x", key: ".account1", x: -1000})
      await preload.invoke('IPC_WebContentsView_size_y', {desc: "设置y", key: ".account1", y: -1000})
      await preload.invoke('IPC_WebContentsView_spider', {desc: "执行脚本-知乎-视频", key: ".account1", spider_script: "./sprider_script/zhihu_video.js"})
    },
    async 控制台() {
      await preload.invoke('IPC_WebContentsView_open_devtools', {desc: "打开控制台", key: ".account1", show: false})
    },//
    async 隐藏() {
      await preload.invoke('IPC_WebContentsView_show', {desc: "隐藏", key: ".account1", show: false})
    },//
    async 显示() {
      await preload.invoke('IPC_WebContentsView_show', {desc: "显示", key: ".account1", show: true})
    },//
    async set_zoom() {
      debugger

      // await preload.invoke('IPC_WebContentsView_zoom', {key: "account1", value: 1})
      function func() {
        let zoomContainer = document.querySelector('html')
        zoomContainer.style.transform = "scale(0.1)"
      }

      // await preload.invoke('IPC_WebContentsView_executeJavaScript', {key: ".account1", func: func.toString()})

      window.wraper_account1 = document.querySelector('.account1')
      wraper_account1.style.width = wraper_account1.style.width / 0.1
      wraper_account1.style.height = wraper_account1.style.height / 0.1
      window.aaa = {wraper_account1: wraper_account1}
      console.log(`111---:`, wraper_account1.style.width)
      console.log(`111---:`, wraper_account1.style.height)

    },//


    async WebContentsView_初始化() {
      await preload.invoke('IPC_WebContentsView_init', {desc: "初始化WebContentsView", key: ".account1", partition: "persist:acc1"})
      await preload.invoke('IPC_WebContentsView_goto', {desc: "页面跳转", key: ".account1", url: "https://www.zhihu.com/zvideo/upload-video"})
      await preload.invoke('IPC_WebContentsView_size_x', {desc: "设置x", key: ".account1", x: 200})
      await preload.invoke('IPC_WebContentsView_size_y', {desc: "设置y", key: ".account1", y: 200})
      await preload.invoke('IPC_WebContentsView_size_width', {desc: "设置width", key: ".account1", width: 900})
      await preload.invoke('IPC_WebContentsView_size_height', {desc: "设置height", key: ".account1", height: 600})
      let res2 = await preload.invoke('IPC_WebContentsView_manager_info', {desc: "获取WebContentsView_manager详情"})
      console.log(`res2---111:`, res2)
      on_WebContentsView_size(".account1", async ({x, y, width, height}) => {
        preload.invoke('IPC_WebContentsView_size', {desc: "设置size", key: ".account1", x, y, width, height})
        // let size =await preload.invoke('IPC_WebContentsView_size', {desc: "获取WebContentsView_manager详情", key: ".account1", x, y, width, height})
        // console.log(`IPC_WebContentsView_size---:`, size)
      })
    },

    async WebContentsView_初始化222() {
      let div = document.createElement("div")
      div.className = "account2"
      document.querySelector("body").appendChild(div)
      await preload.invoke('IPC_WebContentsView_init', {desc: "初始化WebContentsView", key: ".account2", partition: "persist:acc1"})
      await preload.invoke('IPC_WebContentsView_goto', {desc: "页面跳转", key: ".account2", url: "https://www.baidu.com"})
      await preload.invoke('IPC_WebContentsView_size_x', {desc: "设置x", key: ".account2", x: 218})
      await preload.invoke('IPC_WebContentsView_size_y', {desc: "设置y", key: ".account2", y: 152})
      await preload.invoke('IPC_WebContentsView_size_width', {desc: "设置width", key: ".account2", width: 1115})
      await preload.invoke('IPC_WebContentsView_size_height', {desc: "设置height", key: ".account2", height: 700})
      await preload.invoke('IPC_WebContentsView_manager_info', {desc: "获取WebContentsView_manager详情"})

    },


    async WebContentsView_初始化222_隐藏(){
      await preload.invoke('IPC_WebContentsView_show', {desc: "隐藏", key: ".account2", show: false})
    },//

    async WebContentsView_初始化222_脚本(){
      await preload.invoke('IPC_WebContentsView_spider', {desc: "执行脚本-抖音-翻页", key: ".account2", spider_script: "./sprider_script/douyin_scroll.js"})
    },//


    async 得到IPC_WebContentsView_manager_info(){
   let res=  await preload.invoke('IPC_WebContentsView_manager_info', {desc: "得到IPC_WebContentsView_manager_info"})
      console.log(`res---:`,     res      )

    },//
  },////

  async mounted() {
    this.WebContentsView_初始化()
  }

  ,////

}
</script>

<style scoped></style>
