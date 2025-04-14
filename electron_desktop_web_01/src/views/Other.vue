<template>
  <div>
    <webview
        :id="form01.webviewId"
        :src="form01.src"
        style="height: 800px ;width: 1000px;"/>
  </div>
</template>

<script>


debugger
export default {
  data() {
    return {
      form01: {
        webviewId: `only_id${new Date().getTime()}_${Math.floor(Math.random() * 999999)}`,
        // src: "https://www.zhihu.com/creator",
        // src: "https://www.baidu.com",
        src: "https://www.douyin.com/video/7355075809490586932?modeFrom=searchResult",
        partition: 'persist:douyin111',
      },
    }


  },

  methods: {},////

  async mounted() {


  },////

}
</script>

<style scoped></style>



