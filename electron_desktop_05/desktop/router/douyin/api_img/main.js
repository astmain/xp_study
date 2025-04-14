const router = require('express').Router()
const {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()
const _ = require('yup')
module.exports = router


router.post('/douyin/api_img/main', async (req, resp) => {
    const {env_data} = req.body
    console.log(`111---env_data:`, env_data)


    let result = await run_api_img({env_data})
    resp.send(result)
})


// module.exports =
async function run_api_img({acc, data, env, env_data}) {
    // console.log('抖音图文发布', `平台:${data.platform}`, `类型:${data.kind}`, `昵称:${acc.nickName}`)
    // send_publish_status(acc, 5, '发布中...', true)
    try {
        // 环境参数
        // let env_data = await get_env_data({acc, env})
        // console.log(`env_data---:`, env_data)


        //// 校验表单
        let form_data = {
            "content": "111", "title": "111", "imgs_path": ["C:\\Users\\Administrator\\Desktop\\111.png"], "at_friend": [], "activate": [], "topic": [], "address": {}, "collection": {}, "music": {}, "visibility_type": "0", "download": "1", "hot": "", "challenge_tag": {},
        }

        // let form_data = data
        // let form_check = await tool_node.form_yup_validator.check({rule: require("./form_rule"), data: data})
        // console.log(`form_data---:`, form_data)
        // console.log(`form_check---:`, form_check)
        // if (form_check.success === true) {
        //     console.log("成功:校验-表单数据")
        // } else {
        //     throw Error("失败:校验-表单数据" + form_check.error_info.errors_str)
        // }


        console.log("用户信息##############################################################################")
        let {uid, nickname} = await require("./api_account")({cookie: env_data.cookie})
        console.log(`用户信息---{uid,nickname}:`, {uid, nickname})

        console.log("图片:循环上传##############################################################################")
        const img_list = [];
        for (const file_name of form_data.imgs_path) {
            // 得到权限auth_info
            const auth_info = await require("./api_auth_info")({cookie: env_data.cookie})
            console.log(`图片:循环--- auth_info.SessionToken:`, auth_info.SessionToken.slice(0, 20))
            // 得到StoreUri
            const {SessionKey, StoreUri, Auth} = await require("./api_upload_key")({file_name, auth_info: auth_info, user_id: uid, cookie: env_data.cookie})
            console.log(`图片:循环---StoreUri:`, StoreUri)
            // 上传文件
            const res_api_upload_file_chuck = await require("./api_upload_file_chuck")({file_name, StoreUri, Auth, cookie: env_data.cookie})
            console.log(`图片:循环---res_api_upload_file_chuck:`, JSON.stringify(res_api_upload_file_chuck))
            // 得到图片信息,ImageUri, ImageWidth, ImageHeight
            let {ImageUri, ImageWidth, ImageHeight} = await require("./api_upload_img_info")({auth_info, SessionKey, uid, cookie: env_data.cookie})
            console.log(`图片:循环---{ImageUri, ImageWidth, ImageHeight}:`, JSON.stringify({ImageUri, ImageWidth, ImageHeight}))
            let res_api_upload_url = await require("./api_upload_url")({ImageUri, cookie: env_data.cookie})
            console.log(`图片:循环---res_api_upload_url:`, res_api_upload_url)
            img_list.push({'uri': ImageUri, 'width': ImageWidth, 'height': ImageHeight})
        }
        console.log(`图片循环---img_list:`, JSON.stringify(img_list))


        console.log("获取csrf_token##############################################################################")
        let crf_token = await require("./api_csrf_token")({'cookie': env_data.cookie})
        console.log(`获取csrf_token---crf_token:`, crf_token)


        console.log("最后提交表单##############################################################################")
        let PosterUri = img_list[0]['uri']
        let resp = await require("./api_submit_form")({PosterUri, form_data, env_data, crf_token, img_list,})
        if (resp.status_code === 0) {
            console.log("成功")
            return {code: 200, msg: `成功:发布-抖音-图文`}
            // return send_publish_status(acc, 2, '提交成功', true)
        } else {
            // return send_publish_status(acc, 3, `发布失败:` + resp.status_msg, true)
            console.log("失败1")
            return {code: 400, msg: `失败1:发布-抖音-图文`}
        }


    } catch (error) {
        console.error(`报错:抖音图文发布`, `error:------`, error)
        return {code: 400, msg: `失败2:发布-抖音-图文`}

    }

}

//
// // 获取-浏览器参数
// async function get_env_data({acc, env}) {
//     let spider = new Spider()
//     try {
//         await spider.start_wind_partition({desc: "窗口初始化:跳转页面-获取关键参数", url: "https://creator.douyin.com/creator-micro/content/upload", webviewPartition: acc.webviewPartition, show_browser: env.show_browser, acc})
//         let env_params = {}
//         try {
//             // 不同账号情况1
//             env_params = await spider.page.evaluate(() => {
//                 let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
//                 let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
//                 let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
//                 let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
//                 return {prvkey, ticket, ts_sign, csr}
//             })
//             console.log("获取-浏览器参数---get_env_data---不同账号情况1")
//
//         } catch (e) {
//             // 不同账号情况2
//             env_params = await spider.page.evaluate(() => {
//                 let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
//                 let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/token'])['data'])['ticket']
//                 let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/token'])['data'])['ts_sign']
//                 let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
//                 return {prvkey, ticket, ts_sign, csr}
//             })
//             console.log("获取-浏览器参数---get_env_data---不同账号情况2")
//         }
//
//         env_params["cookie"] = tool_node.cookie_arr_to_str(JSON.parse(acc.cookies))
//         return env_params
//     } catch (error) {
//         console.error(`报错:获取-浏览器参数---get_env_data:`, error)
//         throw new Error(`报错:获取-浏览器参数---get_env_data`)
//     } finally {
//         await spider.web_close()
//     }
// }
//
//
//
//
//
//
//






