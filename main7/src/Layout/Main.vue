<template>
  <el-tabs v-model="BUS.tabs_active" type="card" closable class="demo-tabs" @tab-change="tab_change" @tab-remove="tab_remove">
    <el-tab-pane
        v-for="item in BUS.tabs_list"
        :key="item.path"
        :label="item.menu"
        :name="item.path"
        :closable="!item.isClose"
    >
    </el-tab-pane>
        <RouterView/>
  </el-tabs>
</template>

<script>


export default {
  data() {
    return {}


  },

  methods: {
    async tab_change(path) {
      this.$router.push(path)


    },//
    async tab_remove(path) {
      // 移除的是否是当前激活的tab,激活首页
      if (path == BUS.tabs_active) {
        BUS.tabs_active = "/home"
        this.$router.push("/home")
      }
      const new_list = BUS.tabs_list.filter(item => item.path !== path)
      BUS.tabs_list = new_list


    },//

  },////

  async mounted() {

  },////

}
</script>

<style lang="scss" scoped></style>



