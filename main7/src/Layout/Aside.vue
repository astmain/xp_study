<template>
  <div>
    <el-button @click="test_look_Aside()">侧边栏查看信息</el-button>
    <el-menu background-color="#304157" text-color="#b1becd" active-text-color="#336cab">
      <template v-for="ele in BUS.menu_list">
        <el-sub-menu class="拥有子菜单" v-if="ele.children && ele.children.length > 1" :index="ele.path">
          <template #title>
            <span>{{ ele.menu }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="item in ele.children" :index="item.path" @click="vue_router(item.path, ele.menu)">
              <span>{{ item.menu }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item class="没有子菜单" v-else :index="ele.path" @click="vue_router(ele.path, ele.menu)">
          <span>{{ ele.menu }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },

  methods: {
    async test_look_Aside() {
      console.log('test_look_Aside---this.BUS.user_info:', JSON.parse(JSON.stringify(this.BUS.user_info)))
      console.log('test_look_Aside---this.BUS.menu_list:', JSON.parse(JSON.stringify(this.BUS.menu_list)))
      console.log('test_look_Aside---this.BUS.tabs_list:', JSON.parse(JSON.stringify(this.BUS.tabs_list)))
      console.log('test_look_Aside---this.BUS.tabs_active:', JSON.parse(JSON.stringify(this.BUS.tabs_active)))
    }, //
  }, ////

  async mounted() {
    // console.log('BUS.menu_list   :', BUS.menu_list)
  }, ////
}
</script>

<style lang="scss" scoped></style>
