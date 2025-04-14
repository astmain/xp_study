<template>
  <el-button @click="新建()">新建</el-button>
  <el-input style="width: 200px" v-model="kind" placeholder="请输入:组名" />

  <div v-for="(item, index) in list_acc">
    <div style="display: flex; gap: 20px">
      <!--                    @click.prevent.stop-->
      <div ref="menu_target" @contextmenu.prevent.stop="menu_target_click($event, item, index)">{{ item.title }}</div>
    </div>

    <!-- 拖拽 -->
    <VueDraggable group="zzz1" v-model="item.arr" animation="150" ghostClass="ghost" style="display: flex; flex-direction: row; gap: 16px">
      <div v-for="(ele, i) in item.arr" :key="i">
        <el-card style="width: 200px">
          <div>{{ ele.name }}</div>
        </el-card>
      </div>
    </VueDraggable>
  </div>


  <VueSimpleContextMenu elementId="menu_opt" :options="menu.opt" ref="menu_opt" @option-clicked="menu_opt_click" />
</template>

<script>
// import { VueDraggable } from 'vue-draggable-plus'

export default {
  components: {
    // VueDraggable: defineAsyncComponent(() => import('vue-draggable-plus')),//, //
  },
  data() {
    return {
      menu: {
        opt: [{ name: '查看' }, { name: '编辑' }, { name: '', type: 'divider' }, { name: '删除' }],
      },
      kind: '组1',
      list_acc: [
        {
          title: '抖音',
          kind: 'douyin',
          arr: [
            { name: 'aaa', id: '1' },
            { name: 'bbb', id: '2' },
            
            { name: 'ccc', id: '3' },
          ],
        },
        {
          title: '小红书',
          kind: 'xhs',
          arr: [
            { name: 'AAA', id: '1' },
            { name: 'BBB', id: '2' },
            { name: 'CCC', id: '3' },
          ],
        },
      ],
    }
  },

  methods: {
    async 新建() {
      console.log('kind      :', this.kind)
      let kind_item = { title: 111, kind: 111, arr: [] }
      this.list_acc.push(kind_item)
    }, //

    async menu_target_click(event, item, index) {
      let menu_target = this.$refs.menu_target[index]
      let rect = menu_target.getBoundingClientRect()
      Object.defineProperty(event, 'pageX', { value: rect.right + 4, writable: true })
      Object.defineProperty(event, 'pageY', { value: rect.top + rect.height / 2, writable: true })
      this.$refs.menu_opt.showMenu(event, item)
      console.log(`menu_target_click---item:`, item)
    },

    async menu_opt_click({ item, option }) {
      console.log(`menu_opt_click---item:`, item)
      console.log(`menu_opt_click---option:`, option)
    },
  }, ////

  async mounted() {}, ////
}
</script>

<style scoped></style>
