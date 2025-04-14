const router = require('express').Router()


router.post('/axios_config', async (req, resp) => {
    let uri = "/api/sns/web/v1/feed"
    let data = {"source_note_id": "67d63cad000000001e008353", "image_formats": ["jpg", "webp", "avif"], "extra": {"need_body_topic": "1"}, "xsec_source": "pc_feed", "xsec_token": "ABvFr_fg-ZtI_yyHAkmPXQ7O24Vy4-pWYQCtbYYJ8QHtc="}
    let cookie = "abRequestId=42dff615-cf44-5188-bbb0-d54a56be1cf0; xsecappid=xhs-pc-web; a1=195e289aa4f09vrznbgonnwjv1es5uectancvgq4050000285322; webId=16b8384d635038ba9cde72c080d5e93d; gid=yj2dJYjSj09Yyj2dJYj000kA4i8jhFuIDklII48IEVhydS28M27dSh888JY2qJJ8DDd0YDj0; web_session=040069b3e6ae4a071656767edd354b843ecaf1; acw_tc=0a00d10f17432720811493572ea989c5e3540317db5ec7d1fa7a18ae1fb2f9; webBuild=4.61.1; websectiga=2845367ec3848418062e761c09db7caf0e8b79d132ccdd1a4f8e64a11d0cac0d; sec_poison_id=90366f36-fbc9-46a6-ad69-4eab410eb8fc; loadts=1743272572785; unread={%22ub%22:%2267dd6eae000000000603a18f%22%2C%22ue%22:%2267e270db0000000006039042%22%2C%22uc%22:27}; "

    response = await f({uri, data, cookie})
    resp.json(response)

})

module.exports = router

async function f({uri, data, cookie}) {
    const axios = require('axios')
    const tool_sign = require("./xhs/tool_sign")
    uri = "/api/sns/web/v1/feed"
    data = {"source_note_id": "67d63cad000000001e008353", "image_formats": ["jpg", "webp", "avif"], "extra": {"need_body_topic": "1"}, "xsec_source": "pc_feed", "xsec_token": "ABvFr_fg-ZtI_yyHAkmPXQ7O24Vy4-pWYQCtbYYJ8QHtc="}
    cookie = "abRequestId=42dff615-cf44-5188-bbb0-d54a56be1cf0; xsecappid=xhs-pc-web; a1=195e289aa4f09vrznbgonnwjv1es5uectancvgq4050000285322; webId=16b8384d635038ba9cde72c080d5e93d; gid=yj2dJYjSj09Yyj2dJYj000kA4i8jhFuIDklII48IEVhydS28M27dSh888JY2qJJ8DDd0YDj0; web_session=040069b3e6ae4a071656767edd354b843ecaf1; acw_tc=0a00d10f17432720811493572ea989c5e3540317db5ec7d1fa7a18ae1fb2f9; webBuild=4.61.1; websectiga=2845367ec3848418062e761c09db7caf0e8b79d132ccdd1a4f8e64a11d0cac0d; sec_poison_id=90366f36-fbc9-46a6-ad69-4eab410eb8fc; loadts=1743272572785; unread={%22ub%22:%2267dd6eae000000000603a18f%22%2C%22ue%22:%2267e270db0000000006039042%22%2C%22uc%22:27}; "

    let obj = tool_sign(uri, data, cookie)
    let config = {
        method: 'post', url: 'https://edith.xiaohongshu.com/api/sns/web/v1/feed',//
        data: JSON.stringify(data), headers: {
            'x-s': obj['x-s'], 'Cookie': cookie, 'Content-Type': 'application/json'
        }, //
    };

    let {data: response} = await axios(config)
    console.log(`111---response:`, response)
    return response
}
