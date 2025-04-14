import {defineComponent, createVNode, reactive, render} from 'vue'
import {ElButton, ElDialog, ElInput, ElForm, ElFormItem} from 'element-plus'

const virtual_node = defineComponent({
    props: {
        show: {default: true, required: true}, //
        title: {default: "默认标题", required: true}, //
        id: {default: 0, required: true},//
        menu: {default: "默认内容", required: true},//
        path: {default: "默认内容", required: true},//
        parent: {default: "", required: true},//
    },

    setup(props, ctx) {
        let pro = reactive({...props})
        ctx.expose({open, close,})
        console.log(`setup  pro111      : `, JSON.parse(JSON.stringify(pro)))


        function open() {
            console.log(`open      : `, 111)
            pro.show = true
        }

        function close() {
            console.log(`close     : `, 222)
            pro.show = false
        }

        async function menuManage_edit() {
            let params = pro
            let config = {method: 'get', url: `sys/menuManage_edit?`, params: params}
            console.log('config :', config)
            let res = await axios_api(config)
            console.log('res.data   :', res.data)
            // debugger

        }


        // let form = reactive({menu: pro.menu, path: "222"})
        let rules = ref({
            menu: [{required: true, message: '[一级]菜单名称,必须1-20字', trigger: 'blur'}, {min: 1, max: 20, message: '[一级]菜单名称,必须1-20字', trigger: 'blur'}],
            path: [{required: true, message: '[一级]路径,必须1-20字', trigger: 'blur'}, {min: 1, max: 20, message: '[一级]路径,必须1-20字', trigger: 'blur'}, {validator: (rule, value, callback) => value.startsWith('/') ? callback() : callback(new Error('路径/开头')), trigger: 'blur'}],
        })

        return () => {
            return <>
                <ElDialog v-model={pro.show} title={pro.title} draggable>
                    {{
                        default: () => <nav>
                            <ElForm ref="form" v-model={pro}>
                                <ElFormItem prop="menu" label="菜单名称" label-width="120px" label-position="left">
                                    <ElInput v-model={pro.menu} autocomplete="off"/>
                                </ElFormItem>

                                <ElFormItem prop="path" label="路径" label-width="120px" label-position="left">
                                    <ElInput v-model={pro.path} autocomplete="off"/>
                                </ElFormItem>
                            </ElForm>
                        </nav>,//

                        footer: () => <nav>
                            <ElButton onClick={() => close()}>取消</ElButton>
                            <ElButton onClick={() => menuManage_edit()}>确定</ElButton>
                        </nav>,//
                    }}

                </ElDialog>

            </>
        }
    }


})


export default function component_dialog_jsx(props) {
    let class_name = "component_dialog_jsx"
    // 删除旧的vn
    document.querySelector(`.${class_name}`) ? document.querySelector(`.${class_name}`).remove() : 0

    // 创建新的vn
    const el = document.createElement('div')
    el.className = class_name
    let vn = createVNode(virtual_node, props);
    document.body.appendChild((render(vn, el), el))

    // 调用vn暴露的方法
    let {open} = vn.component.exposed;
    open(); // 其他说明组件已经有了只需要显示出来即可

}