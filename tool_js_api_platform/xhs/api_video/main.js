const {main, status_listen} = require("./reverse/main/main")


module.exports = async function ({acc, data, env_data, tempPath}) {
    console.log("小红书视频一键发布", data)
    try {
        //前置-校验-表单数据
        let form_check = await Form_check.check({rule: require("./form_rule"), data: data})
        console.log(`form_data---:`, data)
        console.log(`form_check---:`, form_check)
        if (form_check.success === true) {
            console.log("成功:校验-表单数据")
        } else {
            throw Error("失败:校验-表单数据")
        }

        const {videos_path, covers_path, title, content, topic, ats, address, videos_duration} = data

        //调用逆向逻辑
        status_listen((msg) => {
            console.log("调用逆向逻辑", msg)

        })
        await main({
            video_path: videos_path[0],
            video_duration: videos_duration[0],
            img_path: covers_path[0],
            title,
            description: content,
            topic: topic,
            ats: ats,
            address: address,
            cookies: env_data.cookie,
        })


        console.log(`提交成功`)
        return "提交成功"
    } catch (error) {
        console.error(`失败:小红书视频发布`, `error:------`, error)
        return error
    }
}


