<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>


    <webview
        :src="form.src"
        :partition="form.partition"
        :nodeIntegration="true"
        :contextIsolation="false"
        :allowpopups="true"
        :disablewebsecurity="true"
        useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
        style="width: 100%; height: 650px"/>
    <!--     :nodeIntegration="true" , :contextIsolation="false" ,       -->

  </div>
</template>

<script>


export default {
  data() {
    return {
      form: {
        visible: false,
        partition: 'persist:toutiao111',
        src: "https://mp.toutiao.com/profile_v4/xigua/upload-video",
      }
    }


  },

  methods: {
    async met1() {
      console.log('met1      :', 111)

      await preload.invoke('IPC_spider_browserWindow', {desc: "执行脚本-知乎-视频22-测试dispatch", partition: "persist:zhihu111", spider_script: "./sprider_script/zhihu_video222.js"})
    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>



