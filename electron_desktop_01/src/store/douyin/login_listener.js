export default async function login_listener({container}) {
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
