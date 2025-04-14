<template>
  <el-button @click="$refs.com_add_platform_account.open()">添加账号</el-button>
  <el-button @click="$refs.com_add_platform_account.open()">添加分组</el-button>
  <el-button @click="搜索()">搜索</el-button>
  <el-button @click="测试()">测试</el-button>
  <div></div>
  <el-button @click="新建分组()">新建分组</el-button>
  <el-input style="width: 200px" v-model="group_title" placeholder="请输入:组名"/>


  <!--  卡片-->
  <div v-for="(ele, i) in account_group" :key="i">
    <div>{{ ele.title }}</div>
    <VueDraggable group="zzz1" :group_title="ele.title" v-model="ele.arr" animation="300" style="display: flex;flex-direction: row;gap:16px;" @end="dragEnded">
      <el-card v-for="(item ,index) in ele.arr" :key="index" :body-style="{ padding: '4px' ,paddingRight:'12px' }">
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
  computed: {
    account_group() {
      let account_group = make_dat(JSON.parse(JSON.stringify(this.accout_list)))
      return account_group

      function make_dat(data) {
        console.log(`111---data:`, data)
        let group_title = _.groupBy(data, n => n["group_title"])
        console.log(`222---group_title:`, group_title)
        let group_arr = _.map(group_title, (o, k) => {
          console.log(`333---o:`, o)
          return {
            "title": k,
            "arr": (o.length > 0 && o[0]?.nickname) ? o : []
          }
        })
        console.log(`444---group_arr:`, group_arr)
        return group_arr
      }
    }
  },
  data() {
    return {
      accout_list: [],
      show: false,

      group_title: "1111",
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

      console.log(`111---222:`, JSON.parse(JSON.stringify(this.group_arr)))


    },//
    async 搜索() {

      this.accout_list = await tb_account.find_all()
      // let list= await tb_account.find_all()
      // await BUS.login_check.run({list})
      // list = await tb_account.find_all()
      //
      // this.group_arr = make_dat({data:list})
      //
      // function make_dat({data}) {
      //   let group_title = _.groupBy(data, n => n["group_title"])
      //   let group_arr = _.map(group_title, (o, k) => ({"title": k, arr: o}))
      //   return group_arr
      // }

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


    async 新建分组() {
      if (!this.group_title) return alert("新建分组-名称不能为空")
      // this.account_group.push({title: this.group_title, arr: []})
      // console.log(`111---新建分组---group_title:`,     this.group_title        )

      let aaa = JSON.parse(JSON.stringify(this.accout_list))

      aaa.push({group_title: this.group_title,})
      this.accout_list = aaa

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
      console.log(`111---dragEnded:`, event)
      console.log(`222---dragEnded:`, event.to)


      window.aaa = event
      window.bbb = event.to.group_title
      // event.data.group_title= event  .to.group_title

      let arr = []
      for (let i = 0; i < this.accout_list.length; i++) {
        let ele = this.accout_list[i]
        if (ele.id === event.data.id) {
          ele.group_title = event.data.group_title
        }
        arr.push(ele)

      }
      this.accout_list = arr


      // this.list = this.list.map((item, index) => {
      //   item.order = index
      //   return item
      // })

      // this.list.find(o=>111)
      console.log(`333---222:`, JSON.parse(JSON.stringify(this.accout_list)))


      // let result = await tb_account.save_list(this.list)
      // console.log(`dragEnded---event:`, event)
      // console.log(`dragEnded---result:`, result)
      // console.log(`dragEnded---list :`, JSON.parse(JSON.stringify(this.list)))
    }

  },////
  async mounted() {
    // await webview_run({partition: 'persist:blank', url: "about:blank", container: '.web_selected'})
    // await this.搜索()
    // if (this.list.length > 0) {
    //   let item = this.list[0]
    //   await this.选中账号(item, 0)
    // }


  },////

}
</script>
<style scoped>
</style>



