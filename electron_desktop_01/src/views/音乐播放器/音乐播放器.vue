<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>

    <div style="width:410px;  display: flex;flex-direction: row;margin-bottom: 4px">
      <el-button @click="搜索音乐(keyword)">搜索音乐</el-button>
      <el-input v-model="keyword" placeholder="请输入:关键词111"/>
    </div>


    <!--    卡片-->
    <!--    <div style="display: flex;flex-direction: row;gap:16px;   height: 600px ;width: 200px" class="scrollable">-->
    <div style="display: flex;flex-direction: row;gap:16px; flex-wrap: wrap; width: 440px ">
      <div v-for="item in music">
        <el-card :body-style="{ padding: '4px'  ,paddingRight:'12px' ,width:'180px'}">
          <div style="display: flex; flex-direction: row;align-items: center;gap:4px;">
            <img style="width:40px;border: 1px #f3f4f6 solid ; border-radius: 10px;" :src="item.cover" alt="" @click="选中音乐(item)">
            <div style="display: flex; flex-direction: column;gap:4px;">
              <div style="display: flex; flex-direction: row;gap:4px; justify-content: space-between;">
                <span style="font-size:  12px ;color: #141414  ;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.name }}/{{ item.author }}</span>
              </div>
              <div style="display: flex; flex-direction: row;gap:4px; justify-content: space-between;">
                <span style="font-size:  12px ;color: #141414  ;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.album }}</span>
              </div>
            </div>
          </div>
        </el-card>


      </div>
    </div>

    <!--  播放器-->
    <el-card style="position: fixed;right: 10%;top:200px " :body-style="{ padding: '50px'   }">
      <div style="display: flex;flex-direction: column;gap:8px;">
        <div style="display: flex;flex-direction: column ;justify-content: space-between;align-items: center;gap:8px;">
          <img class="css_cover_rotate" :src="curr.cover" style="width: 300px ;height: 300px ;border: 10px black solid ; border-radius:50%;box-shadow: 0 0 10px rgba(0, 0, 0, 0.8)">
          <div>
            <div>歌名:{{ curr.name }}</div>
            <div>作者:{{ curr.author }}</div>
            <div>专辑:{{ curr.album }}</div>
          </div>
        </div>
        <audio id="myAudio">
          <source :src="curr.url" type="audio/mp3">
        </audio>
        <div style="display: flex;flex-direction: row ;justify-content: space-between;">
          <el-button @click="播放()">播放</el-button>
          <el-button @click="暂停()">暂停</el-button>
        </div>
      </div>
    </el-card>


  </div>

</template>
<script>


export default {
  data() {
    return {
      keyword: "蜗牛",
      music: [],
      curr: {
        name: "歌名",
        author: "作者",
        album: "专辑",
        url: "https://sf5-hl-cdn-tos.douyinstatic.com/obj/tos-cn-ve-2774/e99b49c3f914471fa7d37f7c47f497ae",
        cover: "https://p3.douyinpic.com/aweme/1080x1080/tos-cn-v-2774c002/81e4b606682c481b8f0efca620f3c720.jpeg",
      },
      timer: null,
    }
  },

  methods: {

    async 搜索音乐(keyword) {
      if (!BUS.Account.cookies_str) {
        msg_error({message: `没有发现抖音BUS.Account.cookies_str`})
        return 111
      }
      let music = await api_platform222.douyin.api_data.music({keyword: keyword, cookies_str: BUS.Account.cookies_str})
      console.log(`111---music:`, music)
      this.music = music
    },//


    async 选中音乐(item) {
      this.curr = item
      let audio = document.querySelector("audio")
      if (audio != null) {
        audio.load()

        audio.oncanplay = function () {
          console.log(`duration---222:`, audio.duration)
        }
        await this.播放()
      }
    },//

    async 播放() {
      await document.querySelector("audio").play()
      this.暂停旋转封面()
      this.开启旋转封面()
    },//

    async 暂停() {
      this.暂停旋转封面()
      document.querySelector("audio").pause()
    },//


    async 开启旋转封面() {
      let img = document.querySelector('.css_cover_rotate');
      let rotationAngle = 0;
      this.timer = setInterval(() => {
        rotationAngle += 1;
        img.style.transform = `rotate(${rotationAngle}deg)`;
      }, 20)


    },//

    async 暂停旋转封面() {
      this.timer ? clearInterval(this.timer) : 0

    },//


  },////

  async mounted() {
    this.搜索音乐(this.keyword)

  },////

}
</script>

<style scoped>
.scrollable {
  width: 200px;
  height: 150px;
  border: 1px solid #ccc;
  overflow-y: auto;
  overflow-x: hidden;
}

.scrollable ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.scrollable li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.scrollable li:last-child {
  border-bottom: none;
}


</style>



