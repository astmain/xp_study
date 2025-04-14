<template>
  <div>
    <h1>网站设置</h1>
    <h1>{{ $route.path  }}</h1>

    <el-radio-group v-model="radio_group.value">
      <template v-for="item   in  radio_group.arr">
        <el-radio-button :label="item.label" :value="item.value" @click="radio_click(item.path)" />
      </template>>
    </el-radio-group>
  </div>
</template>

<script>


export default {
  data() {
    return {
      radio_group: {
        value: "数值1",
        arr: [
          { label: "名称1", value: "数值1", path: "/数值1" },
          { label: "名称2", value: "数值2", path: "/数值1" },
        ],

      }

    }


  },

  methods: {
    async 初始化数据_测试路由() {
      let routes = this.$router.getRoutes()
      let routes1 = routes.filter(o => {
        return o.path.includes("/test01_antvx6/") || o.path.includes("/test02_editor/")
      })
      console.log("routes1", routes1)

      let routes2 = routes1.map(o => {
        let label = o.path.replace("/test01_antvx6/", "").replace("/test02_editor/", "")
        let value = label
        let path = o.path
        return { path, label, value }
      })

      console.log('🚀 routes1   :', routes1)
      this.radio_group.arr = routes2




    },//

    async radio_click(path) {
      console.log('radio_click---path', path)
      this.$router.push(path)

    },

  },////

  async mounted() {
    this.初始化数据_测试路由()
  },////

}
</script>

<style lang="scss" scoped></style>
