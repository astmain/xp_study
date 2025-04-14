module.exports = main

async function main({data, env_data}) {
    try {
        //// 校验表单
        let form_data = {
            "content": "111", "title": "111", "imgs_path": ["C:\\Users\\Administrator\\Desktop\\111.png"], "at_friend": [], "activate": [], "topic": [], "address": {}, "collection": {}, "music": {}, "visibility_type": "0", "download": "1", "hot": "", "challenge_tag": {},
        }

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

