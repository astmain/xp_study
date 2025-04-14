<template>
  <div class="common-layout">
    <el-container>
      <el-aside style="background: #2f4156; width: 180px" :style="{ height: height + 'px', minHeight: minHeight + 'px' }">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from './Aside.vue'
import Main from './Main.vue'
import Header from './Header.vue'
import { ref, onMounted } from 'vue'

const height = ref(0)
const minHeight = ref(0)

onMounted(() => {
  getHeight()
  // 监听页面缩放事件
  minHeight.value = document.documentElement.clientHeight
  window.addEventListener('resize', getHeight)
})

// 获取文档高度
function getHeight() {
  height.value = document.documentElement.clientHeight
  console.log(`Layout.vue---getHeight---height.value:`, height.value)
}
</script>

<style scoped></style>
