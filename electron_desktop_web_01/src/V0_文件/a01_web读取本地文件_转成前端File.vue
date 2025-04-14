<template>
  <div>
    <el-button @click="转化_fs_Blob_Buffer_File()">转化_fs_Blob_Buffer_File</el-button>

  </div>
</template>

<script>

export default {
  data() {
    return {}
  },////end1

  methods: {
    async 转化_fs_Blob_Buffer_File() {

      // 读取文件
      const data = preload.fs.readFileSync('C:/Users/Administrator/Desktop/111.png')
      console.log(`data---:`, data)
      // Blob
      const blob = new Blob([data], {type: 'application/octet-stream'})
      console.log(`blob---:`, blob)
      // 将 Blob 转换为 ArrayBuffer
      const buffer = Buffer.from(await blob.arrayBuffer());
      console.log(`buffer---:`, buffer)
      // File
      const file = new File([blob], '111.mp4', {type: 'application/octet-stream'})
      console.log(`file---:`, file)


    },//








  },////


}


</script>

<style scoped>

</style>



