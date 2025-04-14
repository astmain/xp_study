class config_douyin {
    constructor() {
        this.platform = "douyin"
        this.platform_name = "抖音"
        this.url = 'https://creator.douyin.com/'
        this.url_home = 'https://www.douyin.com/'
        this.url_creator = 'https://creator.douyin.com/'
        this.logo = "public/platform_douyin.png"
    }

    async login_api(cookies_str) {
        let config = {
            method: 'get', url: `https://creator.douyin.com/web/api/media/user/info/`,//
            headers_custom: {'Cookie': cookies_str, 'Content-Type': 'application/json',}
        }
        let data = await axios_api(config)
        console.log(`login_api---data:`, data)
        let user = data.user
        if (user?.nickname && user?.short_id && user?.avatar_larger?.url_list[0]) {
            return {line: true, nickname: user.nickname, user_id: user.short_id, avatar: user?.avatar_thumb?.url_list[0], cookies_str, platform: this.platform, platform_name: this.platform_name}
        } else {
            return {line: false, user_id: "", nickname: "", avatar: "", cookies_str, platform: this.platform, platform_name: this.platform_name}
        }
    }


    async login_listener({container}) {
        // let partition_old="persist:login"//测试时候使用
        let partition_old = "persist:login" + "__now__" + Date.now()
        let webview_old = await webview_run({partition: partition_old, url: 'https://creator.douyin.com/', container})
        console.log(`111---partition_old:`, partition_old)
        for (let i = 0; i < 3000 * 1000; i++) {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            let cookies_str = await get_cookies_str({url: 'https://creator.douyin.com/', partition: partition_old})
            let user = await this.login_api(cookies_str)
            console.log(`等待登录---user:`, user.nickname)
            if (user.nickname) {
                // let partition_new = `persist:douyin_${user.user_id}`
                let partition_new = `persist:${this.platform}_${user.user_id}` + "__now__" + Date.now()
                let webview_new = await webview_run({partition: partition_new, url: 'https://creator.douyin.com/', container})
                let cookies = await get_cookies({url: 'https://creator.douyin.com/', partition: partition_old})
                await set_cookies({cookies, partition: partition_new, url: 'https://creator.douyin.com/'})
                await webview_new.goto('https://creator.douyin.com/creator-micro/content/manage')
                // debugger
                // 设置localStorage
                let store111 = await get_localStorage({partition: partition_old})
                let store222 = await set_localStorage({partition: partition_new, store_str: JSON.stringify(store111)})
                // let store = await webview_old.call_eval(() => eval(`JSON.parse(JSON.stringify(window.localStorage))`))
                // let store = await webview_old.executeJavaScript(`(()=>{   return  JSON.parse(JSON.stringify(window.localStorage))  })()`)
                // debugger
                user['partition'] = partition_new
                user['cookies'] = cookies
                user['local_storage'] = store111
                user['url'] = 'https://creator.douyin.com/'
                console.log(`成功登录---配置成功partition---user:`, user)
                return user
            }
        }
    }


    async api_img({partition}) {
        // 获取环境变量
        let container = document.createElement('div')
        let className = "web_temp" + "__now__" + Date.now()
        container.className = className
        document.querySelector("body").append(container)
        let web_temp = await webview_run({partition: partition, url: 'https://creator.douyin.com/', container: "." + className})
        let env_data = await web_temp.call_eval(() => {
            let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
            let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
            let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
            let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
            return {prvkey, ticket, ts_sign, csr}
        })
        env_data['cookie'] = await get_cookies_str({partition, url: 'https://creator.douyin.com/'})
        console.log(`api_img---partition:`, partition)
        console.log(`api_img---env_data:`, env_data)
        debugger
        // 执行脚本
        await api_platform222.douyin.api_img({data: "", env_data})
    }

    async api_video({partition}) {
        // 获取环境变量
        let container = document.createElement('div')
        let className = "web_temp" + "__now__" + Date.now()
        container.className = className
        document.querySelector("body").append(container)
        let web_temp = await webview_run({partition: partition, url: 'https://creator.douyin.com/', container: "." + className})
        let env_data = await web_temp.call_eval(() => {
            let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
            let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
            let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
            let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
            return {prvkey, ticket, ts_sign, csr}
        })
        env_data['cookie'] = await get_cookies_str({partition, url: 'https://creator.douyin.com/'})
        console.log(`api_img---partition:`, partition)
        console.log(`api_img---env_data:`, env_data)
        debugger
        // 执行脚本
        await api_platform222.douyin.api_video({data: "", env_data})
    }

}


globalThis.config_douyin = config_douyin
// module.exports = config_douyin
export default config_douyin


async function get_localStorage({partition}) {
    let webview = await webview_run({partition, url: "https://creator.douyin.com/creator-micro/home",})
    let store = ""
    store = await webview.call_eval(async () => {
        for (let i = 0; i < 10; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            try {
                let prvkey = await eval(`JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']`)
                let ticket = await eval(`JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']`)
                let ts_sign = await eval(` JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']`)
                let csr = await eval(`JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]`)
                let store = await eval("JSON.parse(JSON.stringify(window.localStorage))")
                store["test1"] = "test1"
                console.log(`成功:尝试获取---localStorage:`, i)
                return store
            } catch (error) {

                console.log(`失败:尝试获取---localStorage:`, i)
            }

        }


    })
    if (store) {
        return store
    } else {
        alert(`防御性代码:---"检查登录---抖音---douyin_get_localStorage_and_set_acc`)
        throw Error("检查登录---抖音---douyin_get_localStorage_and_set_acc")
    }


}


async function set_localStorage({partition, store_str}) {
    let webview = await webview_run({partition, url: "https://creator.douyin.com/creator-micro/home"})
    await webview.executeJavaScript(`(${function (store) {
        for (const key in store) {
            let val = store[key]
            localStorage.setItem(key, val)
        }
    }})(${store_str})`)
    return store_str
}


