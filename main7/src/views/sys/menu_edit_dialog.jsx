import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  props: { data: { default: {}, required: false }, that: { default: null, required: false } },
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let form = $ref({ ...props.data }) // 表单数据

    ctx.expose({
      open: async () => {
        show = true
        console.log('111---', props.data)
      },
    }) // 暴露方法-open

    async function save_menu() {
      if (form.edit_menu.length == 0) return msg_error({ message: `菜单名称,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.edit_path.length == 0) return msg_error({ message: `路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单

      let config = { method: 'post', url: `/controller_MAIN/menu/save_menu?`, data: form }
      console.log('config   :', config)
      let res = await axios_api(config)
      console.log('res:', res)
      if (res.data.code == 200) {
        show = false // 关闭弹窗
        props.that.find_menu_list() //父组件,重新搜索
      }
    }

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="编辑菜单" width="400px" draggable>
            <ElForm ref="form" v-model={form} label-position="left" label-width="120px">
              {/* 

                @Column(ignore = true)
                private String real_menu;//真实的菜单
                @Column(ignore = true)
                private String real_path;//真实的路径

                @Column(ignore = true)
                private String edit_menu;//编辑的菜单
                @Column(ignore = true)
                private String edit_path;//编辑的路径

              */}
              <ElFormItem prop="menu" label="菜单名称">
                <ElInput v-model={form.edit_menu} />
              </ElFormItem>
              <ElFormItem prop="path" label="路径">
                <ElInput v-model={form.edit_path} />
              </ElFormItem>
            </ElForm>

            <ElButton
              type="primary"
              onclick={async () => {
                save_menu()
              }}
            >
              确定
            </ElButton>
          </ElDialog>
        </>
      )
    }
  },
})

export default function menu_edit_dialog({ data, that }) {
  dom_open({ ui_id: 'menu_edit_dialog', virtual_node, data, that })
}
