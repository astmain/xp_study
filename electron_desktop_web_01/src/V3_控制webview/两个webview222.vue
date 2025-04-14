<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>
    <el-button @click="met2()">met2</el-button>
    <el-button @click="met3()">met3</el-button>
    <el-button @click="met4()">met4</el-button>
    <br>
    <el-button @click="href1百度()">href1百度</el-button>
    <el-button @click="href1必应()">href1必应</el-button>
    <br>
    <el-button @click="href2百度()">href2百度</el-button>
    <el-button @click="href2必应()">href2必应</el-button>
    <div class="webview_wrapper"></div>





    <nav style="display: flex ; position:relative;   justify-content: space-between">

      <div  style="height: 2000px ;width: 2000px;position:absolute ;  z-index: 999;      background: red ;left: 0px;top: 0px">
        <div>111</div>
      </div>

      <div style="background: black ; padding: 10px  ;position:absolute ;z-index: 888;left: 0px;top: 0px">
        <!--        <webview persist="persist:douyin111" src="https://www.baidu.com" plugins webpreferences="nativeWindowOpen=true" allowpopups style="height: 500px ;width: 800px"/>-->
<!--        <webview-->
<!--            :id="form.webviewId"-->
<!--            class="webview1"-->
<!--                 :src="form.src"-->
<!--                 :partition="form.partition"-->
<!--                 useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"-->
<!--                 webpreferences="nativeWindowOpen=true"-->
<!--                 allowpopups-->
<!--                 plugins-->
<!--                 style="height: 600px ;width: 600px; z-index: 888"/>-->
<!--        &lt;!&ndash;                 style="height: 500px ;width: 800px;position:fixed ;top: -10000px ;left: -1000px"/>&ndash;&gt;-->
<!--      </div>-->

<!--      <div style="background: black ; padding: 10px  ">-->
<!--        <webview-->
<!--            :id="form.webviewId"-->
<!--            :src="form2.src"-->
<!--            :partition="form2.partition"-->
<!--            useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"-->
<!--            allowpopups-->
<!--            style="height: 600px ;width: 600px;"/>-->
<!--        &lt;!&ndash;            style="height: 500px ;width: 500px;position:fixed ;top: -498px ;left:100px;  z-index: 999"/>&ndash;&gt;-->
<!--        &lt;!&ndash;        webpreferences="nativeWindowOpen=true"      plugins         &ndash;&gt;-->

<!--      </div>-->


      <div style="background: black ; padding: 10px  ">
        <webview
            :id="form.webviewId"
            :src="form2.src"


            style="height: 600px ;width: 600px;"/>

      </div>

    </nav>


  </div>
</template>

<script>


debugger
export default {
  data() {
    return {
      form: {
        webviewId: `only_id${new Date().getTime()}_${Math.floor(Math.random() * 999999)}`,
        src: "https://www.zhihu.com/creator",
        // src: "https://www.baidu.com",
        partition: 'persist:douyin111',
      },
      form2: {
        webviewId: `only_id${new Date().getTime()}_${Math.floor(Math.random() * 999999)}`,
        // src: "https://cp.kuaishou.com/article/publish/video?tabType=2",
        src: "https://www.douyin.com/video/7355075809490586932?modeFrom=searchResult",
        partition: 'persist:douyin222',
      }
    }


  },

  methods: {
    async met1() {
      document.querySelector(".webview1").openDevTools()
      let id = this.form.id
      await document.querySelector(".webview1").executeJavaScript(`    localStorage.setItem("webviewId",   "${id}"  )   `)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      let result = await preload.invoke('IPC_spider_webview', {webviewId: id})
      console.log(`result---:`, result)
    },//







  },////

  async mounted() {


    // setInterval(()=>{
    //  let ele=document.querySelector(".webview1")
    //   if (ele){
    //
    //     ele .focus();
    //     console.log(`ele---:`,     ele        )
    //   }
    //   // document.querySelector(".webview2").focus();
    // },5000)

    preload.on('111', (event, arg) => {
      console.error("2222222222222---",arg);
      // 会在控制台打印出 "这是来自主进程的消息"
    });


  },////

}
</script>

<style scoped></style>



