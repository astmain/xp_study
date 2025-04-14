const axios = require("axios")
const tool_bd_zhang222 = require("./tool_bd_zhang222")
module.exports = async function api_submit_form({PosterUri, form_data, crf_token, env_data, img_list}) {
    console.log(`接口:加密---api_submit_form---tool_bd,get_bd_ticket_guard_ree_public_key`)
    // 接口版本
    let {data: bd_data} = await axios({method: 'get', url: 'http://103.119.2.223:9001/create', params: env_data})
    let {data: bd_key} = await axios({method: 'get', url: 'http://103.119.2.223:9001/get_bd_ticket_guard_ree_public_key', params: env_data})


    ////原版tool_bd
    // let bd_data = tool_bd.create(env_data.ts_sign, env_data.ticket, env_data.prvkey, env_data.csr)
    // let bd_key = tool_bd.getBdTicketGuardReePublicKey(env_data.prvkey)


    ////张总tool_bd
    // let bd_data = tool_bd_zhang222.create(env_data.ts_sign, env_data.ticket, env_data.prvkey, env_data.csr)
    // let bd_key = tool_bd_zhang222.getBdTicketGuardReePublicKey(env_data.prvkey)


    // 构造数据
    data = {
        // 'text': '111。222#话题上热门 @盾牌 #我的开跑装备 #早春潮搭大赏',
        // 'text_extra': '[{"start":0,"end":3,"hashtag_id":0,"hashtag_name":"","type":7},{"start":3,"end":4,"hashtag_id":0,"hashtag_name":"","type":8},{"start":7,"end":13,"type":1,"hashtag_name":"话题上热门","hashtag_id":1658298192018444,"user_id":"","caption_start":0,"caption_end":0},{"start":14,"end":17,"type":0,"hashtag_name":"","hashtag_id":0,"user_id":"109096436365","caption_start":0,"caption_end":0},{"start":18,"end":25,"type":1,"hashtag_name":"我的开跑装备","hashtag_id":7474813028437871000,"user_id":"","caption_start":0,"caption_end":0},{"start":26,"end":33,"type":1,"hashtag_name":"早春潮搭大赏","hashtag_id":7474813272068196000,"user_id":"","caption_start":0,"caption_end":0}]',
        // 'activity': '[7474813028437871000,7474813272068196000]',
        // 'challenges': '[1658298192018444,7474813028437871000,7474813272068196000]',
        // 'hashtag_source': '"recommend/recommend/recommend"',
        // 'mentions': '["109096436365"]',
        // 'ifLongTitle': 'true',
        // 'hot_sentence': '315消费者权益日',
        // 'visibility_type': '0',
        // 'download': '1',
        // 'poster': 'tos-cn-i-jm8ajry58r/c3e49a6da60b4fe0aed50804b9c41ce0',
        // 'mix_id': '7425903093788706828',
        // 'mix_order': '2',
        // 'timing': '-1',
        // 'poi_name': '万达广场(泉州浦西店)',
        // 'poi_id': '6601125430395144196',
        // 'anchor_content': '{"is_commerce_intention":false}',
        // 'interaction_stickers': '[{"type":24,"index":0,"track_info":"[{\\"scale\\":0.8,\\"x\\":0.29,\\"y\\":0.22,\\"r\\":0,\\"s\\":0.8}]","text_info":"养一个哪吒","image_index":0,"flash_mob_info":{"id":"fm7480728775358024994","text":"养一个哪吒"}}]',
        // 'images': '[{"uri":"tos-cn-i-jm8ajry58r/c3e49a6da60b4fe0aed50804b9c41ce0","width":803,"height":798}]',
        // 'creation_id': 'rc62j8om1742021583214',
        // 'music_id': '7071328347866793997',
        // 'music_end_time': '129000'
    }

    data['images'] = JSON.stringify(img_list)
    data['poster'] = PosterUri
    data['timing'] = '-1'
    data['ifLongTitle'] = 'true'
    data['creation_id'] = 'rmysdark1724657681012'
    data['anchor_content'] = '{"is_commerce_intention":false}'
    data['poi_name'] = form_data.address.poi_name
    data['visibility_type'] = form_data.visibility_type
    data['download'] = form_data.download
    data['hot_sentence'] = form_data.hot
    data['mix_id'] = form_data.collection.mix_id
    data['mix_order'] = form_data.collection.mix_order
    data['interaction_stickers'] = JSON.stringify([{
        "flash_mob_info": {"id": form_data.challenge_tag.id, "text": form_data.challenge_tag.name,},
        "text_info": form_data.challenge_tag.name, "type": 24, "index": 0, "image_index": 0,
        "track_info": "[{\"scale\":0.8,\"x\":0.24,\"y\":0.22,\"r\":0,\"s\":0.8}]",
    }])
    // 复杂的构造
    data['activity'] = JSON.stringify(form_data.activate.map(o => o.id))
    data['challenges'] = [...form_data.topic.map(o => o.id), ...form_data.activate.map(o => o.id)]
    data['hashtag_source'] = `${data['challenges'].map(o => "recommend").join("/")}`
    data['mentions'] = JSON.stringify(form_data.at_friend.map(o => o.id))
    const {text, text_extra} = make_text_extra(form_data)//构造复杂数据
    data['text'] = text
    data['text_extra'] = text_extra

    // axios_config
    let config = {
        method: 'post', url: "https://creator.douyin.com/web/api/media/aweme/create/", //
        data: data,
        headers: {
            'Cookie': env_data.cookie,
            'x-secsdk-csrf-token': crf_token,
            'bd-ticket-guard-client-data': bd_data,
            'bd-ticket-guard-ree-public-key': bd_key,
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'bd-ticket-guard-iteration-version': '1',
            'bd-ticket-guard-version': '2',
            'bd-ticket-guard-web-sign-type': '1',
            'bd-ticket-guard-web-version': '2',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'origin': 'https://creator.douyin.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://creator.douyin.com/creator-micro/content/publish-media/image-text?default-tab=3&enter_from=publish_page&media_type=image&type=new',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        },//
        params: {
            msToken: "",
            a_bogus: "",
            // 'msToken': '6d59r3CYheWeyPCgn8f09OGJNGN34XGl_cKHy5IofQPikED3WtCbVZ3YhiDSD6X7Gktu42TCb0WKUcXgcjJ3nxvh7wSbJGdMG5jnof9dQzyJd5iH_lTInow-AEuZXVsjyJ9dVrHFOwMpaiauRouoOI7kM0L5hK_XOSvn34yevxwM',//
            // 'a_bogus': 'mvsVktXJQp/nFpMbmCmey1-ldWfANTSy-eTdRE0n9OwlGXUbfqeRpyCOnFKSlbRHEbpCiqKHMfUzPjnbQUkNh29kqspvSszRotd9V6sLZq76bTi2Ipj8eEtxFi4TWSGPQ/5-E5w1U0Uw1gOfZH9ql2Fy9Aej-8R8TraWpNUlyxgQgavY99/aC-2e',//
            'read_aid': '2906',//
            'cookie_enabled': 'true',//
            'screen_width': '1536',//
            'screen_height': '864',//
            'browser_language': 'zh-CN',//
            'browser_platform': 'Win32',//
            'browser_name': 'Mozilla',//
            'browser_version': '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',//
            'browser_online': 'true',//
            'timezone_name': 'Asia/Shanghai',//
            'aid': '1128',//
        },//
    }


    try {
        let {data: resp} = await axios(config)
        if (resp === "") throw Error(`发布异常:受抖音风控影响,请到创作者中心手动发布一次后解除风控.`)
        return resp
    } catch (error) {
        throw Error("发布异常:账号掉线-提交发布时-请重新登录")
    }


}

//  构造复杂数据========================================================================================================================================
function make_text_extra(form_data) {
    let arr = []
    let str1 = form_data.title + "。" + form_data.content + [...form_data.topic.map(o => `#${o.name}`), ...form_data.at_friend.map(o => `@${o.name}`), ...form_data.activate.map(o => `#${o.name}`)].join(' ')
    //  拼接标题
    let title_start = str1.lastIndexOf(form_data.title)
    let title_end = str1.lastIndexOf(form_data.title) + form_data.title.length
    arr.push({"start": title_start, "end": title_end, "hashtag_id": 0, "hashtag_name": "", "type": 7})
    //  拼接句号
    arr.push({"start": str1.lastIndexOf("。"), "end": str1.lastIndexOf("。") + 1, "hashtag_id": 0, "hashtag_name": "", "type": 8})
    // 话题
    form_data.topic.map(o => {
        let mark = "#" + o.name
        let start = str1.lastIndexOf(mark)
        let end = str1.lastIndexOf(mark) + mark.length
        let obj = {start, end, type: 1, hashtag_name: o.name, hashtag_id: o.id, user_id: "", caption_start: 0, caption_end: 0,}
        arr.push(obj)
    })
    //  拼接好友
    form_data.at_friend.map(o => {
        let mark = "@" + o.name
        let start = str1.lastIndexOf(mark)
        let end = str1.lastIndexOf(mark) + mark.length
        let obj = {start, end, type: 0, hashtag_name: "", hashtag_id: 0, user_id: o.id, caption_start: 0, caption_end: 0,}
        arr.push(obj)
    })
    //  拼接活动
    form_data.activate.map(o => {
        let mark = "#" + o.name
        let start = str1.lastIndexOf(mark)
        let end = str1.lastIndexOf(mark) + mark.length
        let obj = {start, end, type: 1, hashtag_name: o.name, hashtag_id: o.id, user_id: "", caption_start: 0, caption_end: 0}
        arr.push(obj)
    })


    return {text_extra: JSON.stringify(arr), text: str1}
}