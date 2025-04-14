import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  props: { data: { default: {}, required: false }, that: { default: null, required: false } },
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false)

    // 表单数据
    let form = $ref(JSON.parse(JSON.stringify(props.data)))

    // 暴露方法-open
    ctx.expose({
      open: async (data) => {
        show = true
        console.log('form---', form)
      },
    })

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="编辑用户" width="400px" draggable>
            <ElForm v-model={form} label-width="80px" label-position="left">
              <ElFormItem label="用户名">
                <ElInput v-model={form.username} />
              </ElFormItem>

              <ElFormItem label="昵称">
                <ElInput v-model={form.nickname} />
              </ElFormItem>

              <ElCheckboxGroup v-model={form.checked_role_list}>
                {form.role_list?.map((o) => (
                  <ElCheckbox label={o.role} value={o.role}></ElCheckbox>
                ))}
              </ElCheckboxGroup>

              <div style="width:100%; display: flex; justify-content: flex-end; ">
                <ElButton
                  type="primary"
                  onclick={async () => {
                    console.log('form---', JSON.parse(JSON.stringify(form)))
                    if (form.username.length < 1) return msg_error({ message: 'username,不能为空' })
                    if (form.nickname.length < 1) return msg_error({ message: 'nickname,不能为空' })
                    if (form.checked_role_list.length < 1) return msg_error({ message: 'checked_role_list,不能为空' })

                    let config = { method: 'post', url: `/controller_MAIN/user/save_user`, data: form }
                    console.log('config :', config)
                    let res = await axios_api(config)
                    console.log('res.data   :', res.data)
                    if (res.data.code == 200) {
                      show = false // 关闭弹窗
                      props.that.find_user_list() //父组件,重新搜索用户
                    }
                  }}
                >
                  确定
                </ElButton>
              </div>
            </ElForm>
          </ElDialog>
        </>
      )
    }
  },
})

export default function dialog_user_info({ data, that }) {
  dom_open({ ui_id: 'dialog_user_info', virtual_node, data, that })
}
