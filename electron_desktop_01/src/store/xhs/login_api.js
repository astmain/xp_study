export default async function login_api(cookies_str) {
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
}

