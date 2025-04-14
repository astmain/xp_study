let api_class = require("./api_class");
let Form_check = require("./Form_check");

// main({form_data: {}, env_data: {}})
module.exports = main

async function main({form_data, env_data = {},}) {
    console.log("form_data", form_data)
    console.log("env_data", env_data)


    form_data = {
        title: "标题;", content: "内容", imgs_path: ['C:\\Users\\Administrator\\Desktop\\111.png'], topic: [], ats: [], address: {},
    }

    env_data = {
        "cookie": "acw_tc=0a0d0ad817444800086087977ebf4eea7e20dfbf704b6f9b3bab01feac4b39; xsecappid=ugc; abRequestId=55628260-af4b-5ac8-a1ce-e221e1d34198; webBuild=4.62.3; loadts=1744479975061; a1=1962b1bf6958sy2hjce5ze80t8gljpxgevhguc5io50000869319; webId=7e7b3b53b10611fe90109002456f1ffa; gid=yjKJDySyDKdfyjKJDyDiKhS2j2YMvJxVSd2ux3ldY89Ykk281VUCk7888YKjqyj808yqDdDy; web_session=0400698e30a4ad561bd269efcf354b97c61cfe; unread={%22ub%22:%2267f07111000000001d025319%22%2C%22ue%22:%2267f8b8d7000000001d01dab6%22%2C%22uc%22:16}; acw_tc=0a0d0e0317444800034766990e52aa2fa8d25f0357bdcca2957b7df94bacda; customer-sso-sid=68c51749248457033008235869mdfocytseyibpy; x-user-id-creator.xiaohongshu.com=5f44e7e50000000001004b84; customerClientId=971835411096978; access-token-creator.xiaohongshu.com=customer.creator.AT-68c517492488362786205965ca5ven7zyh4x8r2c; galaxy_creator_session_id=8nBD51blaGBAVIb6ruCYmQyR0F1sY32ejBJp; galaxy.creator.beaker.session.id=1744480888683033400264; websectiga=8886be45f388a1ee7bf611a69f3e174cae48f1ea02c0f8ec3256031b8be9c7ee; "
    }


    try {
        //前置-校验-表单数据
        // let Form_check =new Form_check()
        let form_check = await Form_check.check({rule: require("./form_rule"), data: form_data})
        console.log(`form_data---:`, form_data)
        console.log(`form_check---:`, form_check)
        if (form_check.success === true) {
            console.log("成功:校验-表单数据")
        } else {
            console.log(`失败---form_data:`, form_data)
            console.log(`失败---form_check:`, form_check)
            throw Error("失败:校验-表单数据")
        }
        // 发布类
        const inst = new api_class({title: form_data.title, desc: form_data.content, imgs: form_data.imgs_path, topic: form_data.topic, ats: form_data.ats, address: form_data.address, cookie: env_data.cookie})

        // 申请权限
        await inst.api_permiss()
        console.log("申请权限");
        // 上传图片
        await inst.api_put_imgs()
        console.log("上传图片");
        // 构建表单
        await inst.api_make_form_data()
        console.log("构建表单");
        // 提交发送
        await inst.api_submit()
        console.log("提交发送");

        console.log("提交成功");
    } catch (error) {
        console.error(`报错:小红书图文发布`, `error:------`, error)
        console.log("发布失败");
        return error
    }
}