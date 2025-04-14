<template>

  <el-dialog :title="title" v-model="show" @close="OnClose" draggable>
    <slot v-if="show"></slot>
    <template #footer>
      <el-button @click="CloseDialog()">取消</el-button>
      <el-button type="primary" @click="submit()"> 确定</el-button>
    </template>
  </el-dialog>

</template>

<script>
export default {
  props: {
    title: { default: '默认标题', required: true },
    submit: { default: () => { }, required: true },
    close: { default: () => { } },

  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    OpenDialog() {
      this.show = !this.show;
      console.log('🚀 开启弹出框   :', 111)
    },//

    CloseDialog() {
      this.show = false
    },//



    // SumbitClose() {
    //   this.submit()
    // },//


    // 监听dialog关闭
    OnClose() {
      this.close()
      this.show = false
      console.log('🚀 On触发了关闭弹出框   :', 111)

    },//
  },

};  
</script>
