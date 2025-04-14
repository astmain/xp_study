<template>


  <el-button @click="搜索()">搜索</el-button>
  <el-button @click="测试()">测试</el-button>
  <div></div>


  <!--  卡片-->
  <div v-for="(ele, i) in account_group" :key="i">
    <div>{{ ele.group_title }}</div>
    <VueDraggable group="zzz1" :group_title="ele.group_title" v-model="ele.arr" animation="300" style="display: flex;flex-direction: row;gap:16px;" @end="dragEnded">
      <el-card v-for="(item ,index) in ele.arr" :key="index" :body-style="{ padding: '4px' ,paddingRight:'12px' }">
        <div style="display: flex; flex-direction: row;gap:4px;   font-size:  14px ; " :style="{'fontWeight': item.id ===  highlight ?'bold':'normal'}     ">
          <nav>
            <img style="width:40px;border-radius: 10px;" :src="item.avatar" @click="选中账号(item,index)">
          </nav>
          <nav>
            <div :style="{color: item.line? '#27C93F' :'#FF5F56'}">{{ item.platform_name }}</div>
            <div style="width:80px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.nickname }}</div>
          </nav>
          <nav style="display: flex;  flex-direction: column; align-items: flex-end; ">
            <div @click="删除(item)" style="font-size: 10px">×</div>
            <div @click="get_env_data(item)" style="font-size: 6px">get_env_data</div>
            <div @click="发布图文(item)" style="font-size: 6px">发布图文</div>
            <div @click="发布视频(item)" style="font-size: 6px">发布视频</div>
          </nav>
        </div>
      </el-card>

    </VueDraggable>


  </div>

  <!--  浏览器工具-->
  <div style="display: flex;flex-direction: row;gap:8px; justify-content: space-between; ">
    <nav>
      <el-button @click="$refs.com_add_platform_account.open()">添加账号</el-button>
      <el-button @click="新建分组()">新建分组</el-button>
      <el-input style="width: 200px" v-model="group_title" placeholder="请输入:组名"/>
    </nav>

    <nav style="flex:1">
      <el-input @keyup.enter.native="导航栏" style="width: 100%;" v-model="web_url" placeholder="请输入回车" spellcheck="false"/>
    </nav>
    <nav >
      <el-button @click="控制台()">控制台</el-button>
    </nav>
  </div>
  <!--  浏览器-->
  <div class="web_selected"/>

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
      accout_list: [],
      account_group: [],
      group_title: "",
      show: false,

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
      this.accout_list = await tb_account.find_all()                 //数据搜索
      this.account_group = make_dat(this.accout_list)        //构造分组数据
      await BUS.login_check.run({list: this.accout_list})  //登录检测
      this.accout_list = await tb_account.find_all()                 //二次搜索

      function make_dat(data) {
        // console.log(`111---data:`, JSON.parse(JSON.stringify(data)))
        let group_title = _.groupBy(data, n => n["group_title"])
        console.log(`222---group_title:`, JSON.parse(JSON.stringify(group_title)))
        let group_arr = _.map(group_title, (o, k) => {
              // console.log(`333---o:`, o)
              return {"group_title": k, "arr": (o.length > 0 && o[0]?.nickname) ? o : []}
            }
        )
        console.log(`444---group_arr:`, JSON.parse(JSON.stringify(group_arr)))
        return group_arr
      }
    },//
    async 删除(item) {
      let one = await tb_account.delete_id({id: item.id})
      console.log(`删除---one:`, one)
      await this.搜索()
    },//
    async 选中账号(item, index) {
      console.log(`选中账号---item:`, JSON.parse(JSON.stringify(item)))
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
      this.account_group.push({group_title: this.group_title, arr: []})
      console.log(`111---新建分组---account_group:`, JSON.parse(JSON.stringify(this.account_group)))
    },//


    async get_env_data(item) {
      let platform = item.platform
      let platform_curr = BUS.config_all_platform[platform]
      let env_data = await platform_curr.get_env_data({partition: item.partition})
      console.log(`get_env_data---env_data:`, env_data)

    },//

    async 发布图文(item) {
      console.log(`发布图文---item:`, JSON.parse(JSON.stringify(item)))
      let platform = item.platform
      if (!BUS.config_all_platform[platform].api_img) return alert("没法发现平台脚本")
      let result = await BUS.config_all_platform[platform].api_img({partition: item.partition})
      console.log(`发布图文---result:`, result)
    },//

    async 发布视频(item) {
      console.log(`发布视频---item:`, JSON.parse(JSON.stringify(item)))
      let platform = item.platform
      if (!BUS.config_all_platform[platform]?.api_video) return alert("没法发现平台脚本")
      let result = await BUS.config_all_platform[platform]?.api_video.api_video({partition: item.partition})
      console.log(`发布视频---result:`, result)
    },//


    async 控制台() {
      if (this.web_selected) await this.web_selected.openDevTools()
    },//
    async 导航栏() {
      if (this.web_selected) this.web_selected.goto(this.web_url)
    },//
    async dragEnded(event) {
      let list = []
      this.account_group.map((item, index) => {
        // console.log(`dragEnded---item:`,   JSON.parse (    JSON.stringify( item  )      )              )
        let group_title = item.group_title
        for (let i = 0; i < item.arr.length; i++) {
          let ele = item.arr[i]
          ele.group_title = group_title
          ele.order = i
          list.push(JSON.parse(JSON.stringify(ele)))
        }
      })
      // console.log(`dragEnded---list :`, JSON.parse(JSON.stringify(list)))
      this.accout_list = list
      let result = await tb_account.save_list(list)
      // console.log(`dragEnded---result:`, result)
    }

  },////
  async mounted() {
    // await webview_run({partition: 'persist:blank', url: "about:blank", container: '.web_selected'})
    await this.搜索()
    if (this.accout_list.length > 0) {
      let item = this.accout_list[0]
      await this.选中账号(item, 0)
    }


  },////

}
</script>
<style scoped>
:deep(.web_selected webview)
{
  overflow: auto;
  ::-webkit-scrollbar {
    width: 6px;
    /* height: 20px; */
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: -webkit-linear-gradient(
        rgb(100, 100, 250),
        rgb(50, 50, 250)
    );
  }
  ::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #f6f6f6; */
  }
}



</style>



