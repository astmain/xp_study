<template>
  <el-button @click="$refs.com_add_platform_account.open()">添加账号</el-button>
  <el-button @click="$refs.com_add_platform_account.open()">添加分组</el-button>
  <el-button @click="搜索()">搜索</el-button>
  <el-button @click="测试()">测试</el-button>


  <!--  卡片-->
  <div v-for="(item, index) in group_arr">
    <div>{{ item.title }}</div>
    <VueDraggable group="zzz1" v-model="item.arr" animation="150" ghostClass="ghost" style="display: flex; flex-direction: row; gap: 16px">
      <div v-for="(ele, i) in item.arr" :key="i">
        <el-card style="width: 200px">
          <div>{{ ele.nickname }}</div>
        </el-card>
      </div>
    </VueDraggable>


  </div>

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
      group_arr: [],
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
      console.log(`111---list:`, JSON.parse(JSON.stringify(this.list)))
      let list = JSON.parse(JSON.stringify(this.list))


    },//
    async 搜索() {
      this.list = await tb_account.find_all()
      console.log(`搜索---list:`, JSON.parse(JSON.stringify(this.list)))
      await BUS.login_check.run({list: this.list})
      this.list = await tb_account.find_all()

      this.group_arr = make_dat({data: this.list})

      function make_dat({data}) {
        let group_title = _.groupBy(data, n => n["group_title"])
        let group_arr = _.map(group_title, (o, k) => ({"title": k, arr: o}))
        return group_arr
      }

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

    async 发布视频(item) {
      console.log(`发布视频---item:`, JSON.parse(JSON.stringify(item)))
      // await config_douyin.api_img({partition:item.partition})
      console.log(`发布视频---BUS.config_all_platform:`, BUS.config_all_platform)
      let platform = item.platform
      let clazz = BUS.config_all_platform[platform]
      if (!clazz) return alert("没法发现平台脚本")
      let result = await clazz.api_video({partition: item.partition})
      console.log(`发布视频---result:`, result)
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



