<template>
  <div>
    <el-button @click="读取文件转成base64()">读取文件转成base64</el-button>

  </div>
</template>

<script>

export default {
  data() {
    return {}
  },////end1

  methods: {


    async 读取文件转成base64() {
      // 读取文件
      const data = fs.readFileSync('C:/Users/Administrator/Desktop/111.png')
      console.log(`data---:`, data)
      // Blob
      const blob = new Blob([data])

      // File
      const file = new File([blob], '111.png')
      console.log(`file---:`, file)

      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          const base64Data = reader.result;
          console.log(base64Data); // 这里得到的就是Base64编码后的字符串，比如data:image/png;base64,iVBORw0KG...

      let    base64=base64Data.replace("data:application/octet-stream;","data:image/png;")
          console.log(`base64---:`,     base64        )


        };
        reader.readAsDataURL(file);
      }
    },//


  },////


}


</script>

<style scoped>

</style>



