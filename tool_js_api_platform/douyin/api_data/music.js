const axios = require('axios')

module.exports = async function music({ cookies_str, keyword }) {
    console.log(`参数---:`, { cookies_str, keyword })
    // 请求签名signature
    var config = { method: 'get', url: 'https://creator.douyin.com/web/api/media/aweme/search/post/auth', headers: { Cookie: cookies_str } }

    try {
        var { data: resp } = await axios(config)
    } catch (error) {
        console.log('网络错误---axios:', 111)
    }

    let signature = resp.signature
    console.log('signature---:', signature)
    // 请求音乐
    var config = { method: 'get', url: `https://tsearch.amemv.com/openapi/aweme/v1/music/search/?aid=1128&count=20&search_source=normal_search&keyword=${keyword}&cursor=0`, headers: { 'Accept-Language': 'zh-CN', 'Agw-Auth': signature } }

    try {
        var { data: resp } = await axios(config)
    } catch (error) {
        console.log('网络错误---axios:', 222)
    }

    let list = resp.music
    let music = list.map((o) => ({ id: o.id_str, name: o.title, author: o.author, album: o.album, duration: o.duration, url: o.play_url.uri, cover: o.cover_hd.url_list[0] }))
    // console.log('music---:', music)
    return music
}
