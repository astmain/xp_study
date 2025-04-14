const yup = require('yup')

// 创建验证类

const form_yup_validator = class {
    // 验证方法
    static async check({rule, data}) {
        try {
            // const validatedData = await rule.validate(data);
            const validatedData = await rule.validate(data, {abortEarly: false});//abortEarly: false：验证会继续进行，收集所有字段的错误信息

            return {success: true, data: validatedData, error_info: null};
        } catch (error) {
            console.log(`222---:`,     111        )
            if (error instanceof yup.ValidationError) {
                const formattedErrors = this.formatErrors(error);
                return {success: false, data: null, error_info: formattedErrors};
            } else {
                console.log(`111---:`,     111        )
                return {success: false, data: null, error_info: error}
            }
        }
    }

    // 格式化错误信息
    static formatErrors(error) {
        let error_info = error.inner.map(o => {
            let label_key = o.path
            let label = o.params.label ? o.params.label : `${label_key}未填写label()`
            let errors = o.errors
            let errors_str = o.errors.join("   ")
            console.log(`111---:`,     111        )
            return {label, label_key, errors, errors_str}
        })
        // console.log(`form_yup_validator---formatErrors---info:`, info)
        return error_info
    }
}


module.exports = form_yup_validator
//
// //// 测试代码=======================================
// ;(async function test() {
//     let form_rule = yup.object({
//         'title': yup.string().min(1).max(29).label('标题'), //
//         'name': yup.string().min(1).max(1).label('名称'), //
//         'friends': yup.array().of(yup.object({//
//             nickname: yup.string().min(1).label('好友昵称'), //
//             uid: yup.number().min(1).max(29),
//         })).label('好友1'),
//         "topic": yup.array().max(4).of(yup.object({
//             'name': yup.string().min(1), //
//             'id': yup.number().strict().integer().min(1), //
//         })),
//     })
//
//     form_data = {
//         title: "曲面铝板测量难到哭？这个黑科技让我躺赚甲方好评！111111111111111111111112211",//
//         name: "曲面铝板测量难到哭？这个黑科技让我躺赚甲方好评！111111111111111111111112211",//
//         friends: [{nickname: "小许", uid: 111}, {nickname: '小林', uid: 222},],//
//         topic: [{name: "小许", id: 111}, {name: '小林', id: 222}, {name: '小林', id: 333},{name: '小林', id: 444},{name: '小林', id: 555},{name: '小林', id: 666},],//
//     }
//
//     let form_check = await form_yup_validator.check({rule: form_rule, data: form_data})
//     console.log(`form_data---:`, form_data)
//     console.log(`form_check---:`, form_check)
//     console.log(`111---:`, form_data.title.length)
// })()
//
