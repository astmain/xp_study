<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="met1()">met1</el-button>
</template>

<script>


export default {
  components: {},
  data() {
    return {
      name: "数据1",
      url: "",
      history: [
        {title: "标题", url: "网址"},
      ],
      dialogVisible: false,


    }


  },

  methods: {

    async met1() {
      console.log('111---222:', 333)


      let config = {
        method: 'post', url: "douyin/video_publish",//
        data: {partition: "persist:min111", title: "视频简单", path_video: "C:\\Users\\Administrator\\Desktop\\111.mp4"},//
      }


      let resp = await axios_api(config)
      console.log(`小红书发布---resp:`, resp)

    },//


  },////

  async mounted() {


  },////

}
</script>

<style scoped></style>



