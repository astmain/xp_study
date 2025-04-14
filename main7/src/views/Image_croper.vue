<script setup>
//页面按需引入cropper
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
const cropper = ref()

const option = reactive({
  //   img: '', // 裁剪图片的地址 url 地址, base64, blob
  img: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', // 裁剪图片的地址 url 地址, base64, blob
  outputSize: 1, // 裁剪生成图片的质量
  outputType: 'png', // 裁剪生成图片的格式 jpeg, png, webp
  info: true, // 裁剪框的大小信息
  canScale: true, // 图片是否允许滚轮缩放
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 230, // 默认生成截图框宽度
  autoCropHeight: 307, // 默认生成截图框高度
  fixedBox: false, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例，这个如果设置为true，截图框会是固定比例缩放的，如果设置为false，则截图框的宽高比例就不固定了
  fixedNumber: [3, 4], // 截图框的宽高比例 [ 宽度 , 高度 ]
  canMove: true, // 上传图片是否可以移动
  canMoveBox: true, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  full: false, // 是否输出原图比例的截图
  enlarge: '1', // 图片根据截图框输出比例倍数
  mode: 'contain', // 图片默认渲染方式 contain , cover, 100px, 100% auto
})

function getCropDataBase64(params) {
  cropper.value.getCropData((data) => {
    const blob = base64ToBlob(data)
    console.log('data---', data)
    console.log('blob---', blob)
  })
}

const base64ToBlob = (base64, mime = 'image/png') => {
  const byteString = atob(base64.split(',')[1]) // 将 base64 部分去掉前缀并解码
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }
  return new Blob([arrayBuffer], { type: mime })
}
</script>

<template>
    <el-button type="primary" size="default" @click="getCropDataBase64()">getCropDataBase64</el-button>
    
  <vueCropper style="width: 100%; height: 500px" ref="cropper" :img="option.img" :outputSize="option.outputSize" :outputType="option.outputType" :info="option.info" :canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :full="option.full" :enlarge="option.enlarge" :mode="option.mode"> </vueCropper>
</template>

<style scoped></style>
