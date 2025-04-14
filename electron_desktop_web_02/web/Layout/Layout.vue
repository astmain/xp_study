<template>
  <el-container>
    <el-header style="display:flex;  flex-direction: row; justify-content: space-between;align-items: center;background: #24292E;    color: #fff;height:5vh;">
      <div>111</div>
      <div>222</div>
    </el-header>
    <el-container style="height:95vh !important;;box-sizing: border-box; ">
      <el-aside width="180px" height="100%">
        <div style="background:#24292E;height:100%;">
          <el-menu style="border:0px;width:180px;height:100%;border: 0px;-webkit-user-select: none; -moz-user-select:none; -ms-user-select:none;user-select:none;" router :default-active="$route.path" active-text-color="#ffd04b" background-color="#24292E" text-color="#fff" @open="1" @close="1">
            <template v-for="ele in $router.options.routes.filter(o=>o.name) ">
              <el-sub-menu class="拥有子菜单" v-if="ele.name &&     ele.children && ele.children.length >= 1" :index="ele.path">
                <template #title>
                  <span>{{ ele.name }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="item in ele.children" :index="item.path">
                    <span>{{ item.name }}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item class="没有子菜单" v-else :index="ele.path">
                <span>{{ ele.name }}</span>
              </el-menu-item>
            </template>

          </el-menu>
        </div>

      </el-aside>
      <el-container>

        <el-main style="padding:0;margin: 10px;">
          <div style="height: 100%">
            <router-view/>
          </div>

        </el-main>
<!--        <el-footer style="background: green">Footer</el-footer>-->
        <el-footer style="background: rgba(240, 240, 240)">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import {RouterView} from 'vue-router'
import {defineAsyncComponent} from "vue";

export default {
  components: {
    RouterView,
    Footer: defineAsyncComponent(() => import('./Footer.vue')),//
  },
  data() {
    return {}
  },
  methods: {},
  async mounted() {
  }, ////


}
</script>


<style>
html {
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}

body {
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}


h1,
h2,
h3,
h4,
h5 {
  padding: 0;
  margin: 0;
}
</style>
