<script setup>
let config = {method: 'get', url: 'http://103.119.2.223:3000/index', data: {aaa: 111}}
let res = await axios(config)




console.log('res.data---', res.data)
</script>

<template>

</template>

<style scoped>

</style>