export default async function login_api(cookies_str) {
    let config = {
        method: 'get', url: `https://creator.douyin.com/web/api/media/user/info/`,//
        headers_custom: {'Cookie': cookies_str, 'Content-Type': 'application/json',}
    }
    let data = await axios_api(config)
    console.log(`login_api---data:`, data)
    let user = data.user
    let other = {cookies_str, platform: this.platform, platform_name: this.platform_name}
    if (user?.nickname && user?.short_id && user?.avatar_larger?.url_list[0]) {
        return {line: true, ...other, nickname: user.nickname, user_id: user.short_id, avatar: user?.avatar_thumb?.url_list[0]}
    } else {
        return {line: false, ...other, user_id: "", nickname: "", avatar: ""}
    }
}

