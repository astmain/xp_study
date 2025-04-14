import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem, ElDrawer } from 'element-plus'




const virtual_node = defineComponent({
  props: { data: { default: {}, required: false } },
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false)
    ctx.expose({ open: () => (show = true) }) // 暴露方法-open
    let form = $ref(JSON.parse(JSON.stringify(BUS.user_info)))

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="个人中心" width="400px" draggable>







            <ElForm v-model={form} label-width="80px" label-position="left">
              <ElFormItem label="用户名">
                <ElInput v-model={form.username} />
              </ElFormItem>

              <ElFormItem label="昵称">
                <ElInput v-model={form.nickname} />
              </ElFormItem>

              <div style="width:100%; display: flex; justify-content: flex-end; ">
                <ElButton
                  type="primary"
                  onclick={async () => {
                    let params = form
                    console.log(`params : `, params)
                    let config = { method: 'post', url: `/controller/user_info/edit`, data: params }
                    console.log('config :', config)
                    let res = await axios_api(config)
                    console.log('res.data   :', res.data)
                    if (res.data.code == 200) {
                      show = false
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

export default function dialog_user_info({ data }) {
  dom_open({ ui_id: 'dialog_user_info', virtual_node, data })
}
