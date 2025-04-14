<template>
  <div class="view1" style="height: 100%">
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
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
            <el-button @click="缩放()">缩放</el-button>
          </div>
        </div>
        <div class="account1" style="height: 770px ;width: 100% ;background: red; margin: 4px"></div>
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
  // await preload.invoke('IPC_WebContentsView_init', {x, y, height, width, key, loadURL})
  let result = {x, y, height, width, key, clazz, loadURL, view}
  return result
}

// 监听页面大小WebContentsView
async function WebContentsView_on_resize_item({WebContentsView_item}) {
  let {x, y, height, width, key, clazz, loadURL, view} = WebContentsView_item
  const ob = new ResizeObserver(async elements => {
    for (let ele of elements) {
      height = ele.target.clientHeight
      width = ele.target.clientWidth
      x = ele.target.getBoundingClientRect().left
      y = ele.target.getBoundingClientRect().top
      await preload.invoke('IPC_WebContentsView_size', {x, y, height, width, key: key, loadURL})
    }
  })
  console.log(`clazz---:`, clazz)
  ob.observe(document.querySelector(clazz))


}

export default {
  data() {
    return {
      WebContentsView_item: []
    }
  },

  methods: {
    async 脚本() {
      await preload.invoke('IPC_WebContentsView_spider', {key: "account1", spider_script: "./sprider_script/zhihu_video.js"})
    },
    async 控制台() {
      await preload.invoke('IPC_WebContentsView_open_devtools', {key: "account1", show: true})
    },//
    async 隐藏() {
      await preload.invoke('IPC_WebContentsView_show', {key: "account1", show: false})
    },//
    async 显示() {
      await preload.invoke('IPC_WebContentsView_show', {key: "account1", show: true})
    },//
    async 缩放() {
      // await preload.invoke('IPC_WebContentsView_zoom', {key: "account1", value: 1})
      await preload.invoke('IPC_WebContentsView_executeJavaScript', {
        key: "account1", func: `  function ()       {
          let zoomContainer = document.querySelector('html');
          zoomContainer.style.transform = "scale(0.1)";
      }`
      })


    },//


    async WebContentsView_初始化() {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      let WebContentsView_item = this.WebContentsView_accounts = await make_params({clazz: ".account1", loadURL: "https://www.zhihu.com/zvideo/upload-video"})
      let {x, y, height, width, key: key, loadURL} = WebContentsView_item
      await preload.invoke('IPC_WebContentsView_init', {x, y, height, width, key: key, loadURL})
      await WebContentsView_on_resize_item({WebContentsView_item})
    }


  },////

  async mounted() {
    this.WebContentsView_初始化()
  }

  ,////

}
</script>

<style scoped></style>




