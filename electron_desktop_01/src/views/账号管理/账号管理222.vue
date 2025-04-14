<template>
  <el-button @click="$refs.com_add_platform_account.open()">添加账号</el-button>
  <el-button @click="搜索()">搜索</el-button>

  <VueDraggable ref="el" v-model="list">
    <div v-for="item in list" :key="item.id">
      {{ item.nickname }}
    </div>
  </VueDraggable>

  <el-button @click="测试()">测试</el-button>

  <!--  卡片-->
  <VueDraggable ref="el" v-model="list" style="display: flex;flex-direction: row;gap:16px;" @end="dragEnded" animation="300">
    <el-card v-for="(item ,index) in list" :key="index" :body-style="{ padding: '4px' ,paddingRight:'12px' }">
      <div style="display: flex; flex-direction: row;gap:4px;   font-size:  14px ; " :style="{'fontWeight': index ===  highlight ?'bold':'normal'}     ">
        <nav>
          <img style="width:40px;border-radius: 10px;" :src="item.avatar" @click="选中账号(item,index)">
        </nav>
        <nav>
          <div :style="{color: item.line? '#27C93F' :'#FF5F56'}">{{ item.platform_name }}</div>
          <div style="width:80px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.nickname }}</div>
        </nav>
        <nav style="display: flex;  flex-direction: column; align-items: flex-end; ">
          <div @click="删除(item)" style="font-size: 10px">×</div>
          <div @click="发布图文(item)" style="font-size: 6px">发布图文</div>
          <div @click="发布视频(item)" style="font-size: 6px">发布视频</div>
        </nav>

      </div>
    </el-card>
  </VueDraggable>




  <!--  浏览器-->
  <div class="web_selected">
    <div style="display: flex;flex-direction: row;gap:8px;">
      <el-button @click="控制台()">控制台</el-button>
      <el-input @keyup.enter.native="导航栏" style="width: 100%;" v-model="web_url" placeholder="请输入回车" spellcheck="false"/>
    </div>
  </div>
  <!--  组件-->
  <com_add_platform_account ref="com_add_platform_account"/>
</template>

<script>

import {defineAsyncComponent} from "vue";
import {VueDraggable} from 'vue-draggable-plus'

export default {
  components: {
    com_add_platform_account: defineAsyncComponent(() => import('./com_account_add.vue')),//
    VueDraggable: VueDraggable,//
  },
  data() {
    return {
      show: false,
      list: [],
      highlight: 1,

      web_selected: null,
      web_url: "",
    }
  },
  methods: {
    async open() {
      this.show = true
    },//

    async 测试() {
      console.log(`111---222:`, JSON.parse(JSON.stringify(this.list)))

    },//
    async 搜索() {
      this.list = await tb_account.find_all()
      console.log(`搜索---list:`, JSON.parse(JSON.stringify(this.list)))
      await BUS.login_check.run({list: this.list})
      this.list = await tb_account.find_all()

    },//
    async 删除(item) {
      let one = await tb_account.delete_id({id: item.id})
      console.log(`删除---one:`, one)
      await this.搜索()
    },//
    async 选中账号(item, index) {
      console.log(`选中账号---item:`, item)
      this.highlight = index;
      this.web_selected = window['web_selected'] = await webview_run({partition: item.partition, url: item.url, container: '.web_selected'})
      this.web_selected.navigation((event) => {
        if (event.isMainFrame && event.url) this.web_url = decodeURIComponent(event.url)
      })
      console.log(`选中账号---web_selected:`, this.web_selected)
      BUS.Account = item
    },//


    async 发布图文(item) {
      console.log(`发布图文---item:`, JSON.parse(JSON.stringify(item)))
      // await config_douyin.api_img({partition:item.partition})
      console.log(`发布图文---BUS.config_all_platform:`, BUS.config_all_platform)
      let platform = item.platform
      let clazz = BUS.config_all_platform[platform]
      if (!clazz) return alert("没法发现平台脚本")
      let result = await clazz.api_img({partition: item.partition})
      console.log(`发布图文---result:`, result)

    },//
    async 控制台() {
      if (this.web_selected) await this.web_selected.openDevTools()
    },//
    async 导航栏() {
      if (this.web_selected) this.web_selected.goto(this.web_url)
    },//
    async dragEnded(event) {
      this.list = this.list.map((item, index) => {
        item.order = index
        return item
      })

      let result = await tb_account.save_list(this.list)
      console.log(`dragEnded---event:`, event)
      console.log(`dragEnded---result:`, result)
      console.log(`dragEnded---list :`, JSON.parse(JSON.stringify(this.list)))
    }

  },////
  async mounted() {
    // await webview_run({partition: 'persist:blank', url: "about:blank", container: '.web_selected'})
    await this.搜索()
    if (this.list.length > 0) {
      let item = this.list[0]
      await this.选中账号(item, 0)
    }


  },////

}
</script>
<style scoped>
</style>



