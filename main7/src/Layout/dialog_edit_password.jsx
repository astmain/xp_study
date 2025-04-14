import { defineComponent, createVNode, reactive, render } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem } from 'element-plus'

const virtual_node = defineComponent({
  props: {
    data: { default: {}, required: false }, //
  },

  setup(props, ctx) {
    let show = $ref(false)
    ctx.expose({ open: () => (show = true) }) // 暴露方法-open
    let form = $ref({
      id: BUS.user_info.id,
      password: '',
      repassword: '',
    })

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="修改密码" width="400px" draggable>
            {{
              default: () => (
                <nav>
                  <ElForm ref="form" v-model={form} label-position="left" label-width="120px">
                    <ElFormItem prop="menu" label="请输入新密码">
                      <ElInput v-model={form.password} autocomplete="off" />
                    </ElFormItem>

                    <ElFormItem prop="path" label="再次输入新密码">
                      <ElInput v-model={form.repassword} autocomplete="off" />
                    </ElFormItem>
                  </ElForm>
                </nav>
              ), //

              footer: () => (
                <ElButton
                  type="primary"
                  onClick={async () => {
                    if (form.password !== form.repassword) return msg_error({ message: '密码前后两次不一致请重新输入' })
                    let config = { method: 'post', url: `/controller/user_info/edit_password`, data: form }
                    console.log('config   :', config)
                    let res = await axios_api(config)
                    console.log('res.data :', res.data)
                    if (res.data.code === 200) {
                      msg_success({ message: res.data.msg })
                      show = false
                      localStorage.clear() //清空本地存储
                      window.location.href = '/login' //路由跳转到登陆页面
                    }
                  }}
                >
                  确定
                </ElButton>
              ), //
            }}
          </ElDialog>
        </>
      )
    }
  },
})

export default function dialog_edit_password({ form }) {
  dom_open({ ui_id: 'dialog_edit_password', virtual_node, form })
}
