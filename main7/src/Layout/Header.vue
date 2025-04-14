<template>
  <div class="header_container" style="display: flex; justify-content: space-between; align-items: center; box-sizing: border-box; height: 100%">
    <!-- 面包屑 -->
    <div class="header_left"></div>
    <!-- 右侧用户名、头像 -->
    <div class="header_right" style="display: flex; justify-content: space-between; align-items: center; box-sizing: border-box">
      <!-- 头像 -->
      <div class="avatar" style="cursor: pointer; margin-right: 12px">
        <el-image :src="BUS.user_info.avatar" class="avatar_img" style="width: 30px; height: 30px" />
      </div>
      <!-- 用户名 -->
      <div>
        <el-dropdown>
          <span style=" cursor: pointer; display: flex; align-items: center; border: none; outline: none">{{ BUS.user_info.nickname }} ∨</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="dialog_user_info()">个人中心</el-dropdown-item>
              <el-dropdown-item @click="dialog_edit_password()">修改密码</el-dropdown-item>
              <el-dropdown-item divided @click="login_out()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: 'https://img2.baidu.com/it/u=1067594889,3904550527&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    }
  },

  methods: {
    // 退出登录
    async login_out() {
      localStorage.clear() //清空本地存储
      window.location.href = '/login' //路由跳转到登陆页面
    },

    async dialog_user_info() {
      require('./dialog_user_info.jsx')({ data: '空11111111' })
    },
    async dialog_edit_password() {
      require('./dialog_edit_password.jsx')({ data: '空1111111111' })
    },
  },

  async mounted() {},
}
</script>

<style scoped></style>
