let config_xhs = {
    platform: "xhs",//
    platform_name: "小红书",//
    url: 'https://www.xiaohongshu.com/explore',//
    url_home: 'https://www.xiaohongshu.com/explore',//
    url_creator: 'https://creator.xiaohongshu.com/',//
    logo: "public/platform_xhs.png",//

    async login_api(cookies_str) {
        let config = {
            method: 'get',//
            url: 'https://edith.xiaohongshu.com/api/sns/web/v2/user/me',//
            headers_custom: {
                'Cookie': cookies_str,//
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
            }
        }
        let data = await axios_api(config)
        console.log(`login_api---data:`, data)
        // debugger
        let user = data.data
        let other = {cookies_str, platform: this.platform, platform_name: this.platform_name}
        if (user?.nickname && user?.user_id && user?.images) {
            return {...other, line: true, nickname: user.nickname, user_id: user.user_id, avatar: user.images,}
        } else {
            return {...other, line: false, user_id: "", nickname: "", avatar: ""}
        }
    },


    async login_listener({container}) {
        let partition_old = "persist:login"//测试时候使用
        // let partition_old = "persist:login" + "__now__" + Date.now()
        let webview_old = await webview_run({partition: partition_old, url: 'https://www.xiaohongshu.com/explore', container})
        console.log(`111---partition_old:`, partition_old)
        for (let i = 0; i < 3000 * 1000; i++) {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            let cookies_str = await get_cookies_str({url: 'https://www.xiaohongshu.com/explore', partition: partition_old})
            // debugger
            let user = await this.login_api(cookies_str)
            console.log(`等待登录---user:`, user?.nickname)
            if (user?.nickname) {
                await webview_old.call_eval(() => document.querySelector(`a[href^="https://creator.xiaohongshu.com/publish/publish?source=official"]`)?.click())
                await new Promise((resolve) => setTimeout(resolve, 5000))
                console.log(`成功登录---user:`, user)
                debugger

                // let partition_new = `persist:douyin_${user.user_id}`
                let partition_new = `persist:${this.platform}_${user.user_id}` + "__now__" + Date.now()
                let webview_new = await webview_run({partition: partition_new, url: 'https://creator.xiaohongshu.com/', container})
                let cookies = await get_cookies({url: 'https://creator.xiaohongshu.com/', partition: partition_old})
                await set_cookies({cookies, partition: partition_new, url: 'https://creator.xiaohongshu.com/'})
                await webview_new.goto('https://creator.xiaohongshu.com/')
                // debugger
                // 设置localStorage
                // let store111 = await get_localStorage({partition: partition_old})
                // let store222 = await set_localStorage({partition: partition_new, store_str: JSON.stringify(store111)})
                // debugger
                user['partition'] = partition_new
                user['cookies'] = cookies
                user['local_storage'] = {}
                user['url'] = 'https://creator.xiaohongshu.com/'
                console.log(`成功登录---配置成功partition---user:`, user)
                return user
            }
        }

    },


}
// module.exports = config_xhs
export default config_xhs


