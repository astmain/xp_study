import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  props: { data: { default: {}, required: false }, that: { default: null, required: false } },
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let form = $ref({ menu: '', path: '', parent_menu: props.data.menu, parent_path: props.data.path }) // 表单数据

    ctx.expose({
      open: async () => {
        show = true
      },
    }) // 暴露方法-open

    async function add_menu_parent() {
      if (form.path.length == 0) return msg_error({ message: `菜单名称,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.menu.length == 0) return msg_error({ message: `路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      let config = { method: 'get', url: `/controller_MAIN/menu/add_menu_child?menu=${form.menu}&path=${form.path}&parent=${form.parent_menu}` }
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
          <ElDialog v-model={show} title="新增子菜单" width="400px" draggable>
            <ElForm v-model={form} label-width="120px" label-position="left">
              <ElFormItem label="[父]菜单名称">
                <ElInput v-model={form.parent_menu} disabled />
              </ElFormItem>
              <ElFormItem label="[父]路径">
                <ElInput v-model={form.parent_path} disabled />
              </ElFormItem>

              <ElFormItem label="[子]菜单名称">
                <ElInput v-model={form.menu} />
              </ElFormItem>

              <ElFormItem label="[子]路径">
                <ElInput v-model={form.path} />
              </ElFormItem>
            </ElForm>

            <ElButton
              type="primary"
              onclick={async () => {
                add_menu_parent()
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

export default function menu_add_child_dialog({ data, that }) {
  dom_open({ ui_id: 'menu_add_child_dialog', virtual_node, data, that })
}
