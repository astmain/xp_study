import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  props: { data: { default: {}, required: false }, that: { default: null, required: false } },
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let menu_tree = $ref([{ menu: '111', children: [{ menu: '222' }] }]) // 菜单数据
    let form = $ref({ role: '', checked_menu_list: [] }) // 表单数据
    let ref_ElTree = ref(null) // ref树

    ctx.expose({
      open: async () => {
        find_menu_tree()
        show = true
      },
    }) // 暴露方法-open

    async function find_menu_tree() {
      let config = { method: 'get', url: `/controller_MAIN/menu/find_menu_tree` }
      console.log('config   :', config)
      let res = await axios_api(config)
      console.log('res2  :', res)
      if (res.data.code == 200) {
        menu_tree = res.data.menu_tree
      }
    }

    async function add_role() {
      // 1-得到选中的菜单
      let trees_checked = ref_ElTree.value.getCheckedNodes()
      console.log('trees_checked---', trees_checked)
      if (trees_checked.length == 0) return msg_error({ message: `参数检验错误,菜单详情不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.role.length == 0) return msg_error({ message: `参数检验错误,角色名不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      // 2-构建from表单-checked_menu_list,role
      form.checked_menu_list = trees_checked.map((item) => item.menu)
      console.log('form---', form)

      // 提交表单-添加新角色
      let config = { method: 'post', url: `/controller_MAIN/role/add_role?`, data: form }
      console.log('config :', config)
      let res = await axios_api(config)
      console.log('res   :', res)
      if (res.data.code == 200) {
        show = false // 关闭弹窗
        props.that.find_role_list() //父组件,重新搜索用户
      }
    }

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="新增角色" width="400px" draggable>
            <ElForm v-model={form} label-width="80px" label-position="left">
              <ElFormItem label="角色名称">
                <ElInput v-model={form.role} />
              </ElFormItem>

              <ElFormItem label="菜单详情">
                <ElTree ref={ref_ElTree} style="max-width: 800px" data={menu_tree} show-checkbox node-key="menu" props={{ children: 'children', label: 'menu' }} default-expand-all></ElTree>
              </ElFormItem>
            </ElForm>

            <ElButton
              type="primary"
              onclick={async () => {
                add_role()
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

export default function role_add_dialog({ data, that }) {
  dom_open({ ui_id: 'role_add_dialog', virtual_node, data, that })
}
