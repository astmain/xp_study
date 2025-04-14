<template>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
export default {
  components: { RouterView },
  data() {
    return {}
  },
  methods: {},
  async mounted() {}, ////

  watch: {
    $route(to, from) {
      // 不处理的页签
      if (to.path == '/login') return
      if (to.name == 'NotFound') return
      let isexit = BUS.tabs_list.find((o) => o.path === to.path)
      if (isexit) return

      // 添加新的页签
      BUS.tabs_list.push({ path: to.path, menu: to.name })
      //激活页签
      BUS.tabs_active = to.path
    },
  },
}
</script>

<style scoped></style>
