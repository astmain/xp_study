export default async function get_env_data({partition}) {
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
    console.log(`partition:`, partition)
    console.log(`env_data:`, env_data)
    return env_data
}