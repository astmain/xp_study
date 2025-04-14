test1({form_data: 111, env_data: 111})

async function test1({form_data, env_data}) {
    try {
        //// 校验表单
        form_data = {
            content: '111',
            title: '111',
            imgs_path: ['C:\\Users\\Administrator\\Desktop\\111.png'],
            at_friend: [],
            activate: [],
            topic: [],
            address: {},
            collection: {},
            music: {},
            visibility_type: '0',
            download: '1',
            hot: '',
            challenge_tag: {},
        }

        // form_data = {
        //     content: '111',
        //     title: '111',
        //     imgs_path: ['C:\\Users\\Administrator\\Desktop\\222.png'],
        //     at_friend: [],
        //     activate: [],
        //     topic: [],
        //     address: {},
        //     collection: {},
        //     music: {
        //         name:"蜗牛", //
        //         music_id: "6702218143995004929", //
        //     },
        //     visibility_type: '0',
        //     download: '1',
        //     hot: '',
        //     challenge_tag: {},
        // }

        env_data = {
            "prvkey": "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgy6benGAUueH6n9m+P5Fn3y77oA9ATU6FI+AzF4e5G1GhRANCAASOXP9eVE5zp3/7tV3UfZ6bgN0s3xmz57Pji5wsUKspVO9NgPoEHOlbluHk+Zs/LTyx7MY4/MKn3jE0q/a+wGkr\n-----END PRIVATE KEY-----",
            "ticket": "hash.tzc3zh74T7xIvisOHAxo3XKuKXxDovItuQVJfL1VUqQ=",
            "ts_sign": "ts.2.6f706644a376e7d7fe2b068b2ac3344908b2c8984fe7c34b4640e60862166ebfc4fbe87d2319cf05318624ceda14911ca406dedbebeddb2e30fce8d4fa02575d",
            "csr": "-----BEGIN CERTIFICATE-----\nMIIEfTCCBCKgAwIBAgIUXWdS2tzmSoewCWfKFyiWMrJqs/0wCgYIKoZIzj0EAwIw\nMTELMAkGA1UEBhMCQ04xIjAgBgNVBAMMGXRpY2tldF9ndWFyZF9jYV9lY2RzYV8y\nNTYwIBcNMjIxMTE4MDUyMDA2WhgPMjA2OTEyMzExNjAwMDBaMCQxCzAJBgNVBAYT\nAkNOMRUwEwYDVQQDEwxlY2llcy1zZXJ2ZXIwWTATBgcqhkjOPQIBBggqhkjOPQMB\nBwNCAASE2llDPlfc8Rq+5J5HXhg4edFjPnCF3Ua7JBoiE/foP9m7L5ELIcvxCgEx\naRCHbQ8kCCK/ArZ4FX/qCobZAkToo4IDITCCAx0wDgYDVR0PAQH/BAQDAgWgMDEG\nA1UdJQQqMCgGCCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMGCCsGAQUFBwME\nMCkGA1UdDgQiBCABydxqGrVEHhtkCWTb/vicGpDZPFPDxv82wiuywUlkBDArBgNV\nHSMEJDAigCAypWfqjmRIEo3MTk1Ae3MUm0dtU3qk0YDXeZSXeyJHgzCCAZQGCCsG\nAQUFBwEBBIIBhjCCAYIwRgYIKwYBBQUHMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL29jc3AwRgYIKwYBBQUH\nMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL29jc3AwdwYIKwYBBQUHMAKGa2h0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL2Rvd25sb2FkLzQ4RjlD\nMEU3QjBDNUE3MDVCOTgyQkU1NTE3MDVGNjQ1QzhDODc4QTguY3J0MHcGCCsGAQUF\nBzAChmtodHRwOi8vbmV4dXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UubmV0L2FwaS9j\nZXJ0aWZpY2F0ZS9kb3dubG9hZC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1\nRjY0NUM4Qzg3OEE4LmNydDCB5wYDVR0fBIHfMIHcMGygaqBohmZodHRwOi8vbmV4\ndXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UuY29tL2FwaS9jZXJ0aWZpY2F0ZS9jcmwv\nNDhGOUMwRTdCMEM1QTcwNUI5ODJCRTU1MTcwNUY2NDVDOEM4NzhBOC5jcmwwbKBq\noGiGZmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL2NybC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1RjY0NUM4\nQzg3OEE4LmNybDAKBggqhkjOPQQDAgNJADBGAiEAqMjT5ADMdGMeaImoJK4J9jzE\nLqZ573rNjsT3k14pK50CIQCLpWHVKWi71qqqrMjiSDvUhpyO1DpTPRHlavPRuaNm\nww==\n-----END CERTIFICATE-----",
            "cookie": "gfkadpd=2906,33638; gfkadpd=2906,33638; bd_ticket_guard_client_web_domain=2; passport_csrf_token=82797d86e4d0ae6e7dd7343f793ca343; passport_csrf_token_default=82797d86e4d0ae6e7dd7343f793ca343; passport_mfa_token=CjdGISBPO3nCFzUij5fPedQiLvMkafP2OwrFIAO4plyU6pEw%2FmyzufI8vN8ltiiSmnE2RnA91yhxGkoKPJovNjDEAAM%2BsSf%2FoETCh2WBQXG%2Ba5Aev0Y1LCy%2FBp5M9KcYW3eIUYYbhoK0PhjW0lN3%2FJE0gDU8dHDxSxC0ru4NGPax0WwgAiIBA22WWi0%3D; d_ticket=8f97413acefd887a204ecc840943f72b791a9; passport_assist_user=CkG-b3dt6u73LNwAk7UzM-ojs5XdoAn0ArLmbr6HM26O6mKUw4w5KVFIrU0CKAbwMuDyw9MsFktFgaoo4duhNmwMOBpKCjwdXiJwRNgk1Fjfw60leuqiQhHK4XerwB37RZhdBr2nGxDjbCCiKE0psYXXbMXYt34tG9eb0IpNU8vtIIQQ6a7uDRiJr9ZUIAEiAQP2edI8; n_mh=Xct6vbRSosX3FaRoQGBQX3aVFZgAaih0wusNwVkOQP4; sid_guard=f732a7ec260950651cba638a77c4bcac%7C1744278685%7C5184000%7CMon%2C+09-Jun-2025+09%3A51%3A25+GMT; uid_tt=a11f222bd3dbc00de3436c7dcb8d14b0; uid_tt_ss=a11f222bd3dbc00de3436c7dcb8d14b0; sid_tt=f732a7ec260950651cba638a77c4bcac; sessionid=f732a7ec260950651cba638a77c4bcac; sessionid_ss=f732a7ec260950651cba638a77c4bcac; is_staff_user=false; sid_ucp_v1=1.0.0-KGMyNzZlZTg2MDQzOTFmMTE5N2Q0NTY3YTQ4ZjVkYTNkMDQ0NWY1NzYKIQi7yJDZ8s2WAhCdqd6_BhjaFiAMMOHlyq8GOAdA9AdIBBoCaGwiIGY3MzJhN2VjMjYwOTUwNjUxY2JhNjM4YTc3YzRiY2Fj; ssid_ucp_v1=1.0.0-KGMyNzZlZTg2MDQzOTFmMTE5N2Q0NTY3YTQ4ZjVkYTNkMDQ0NWY1NzYKIQi7yJDZ8s2WAhCdqd6_BhjaFiAMMOHlyq8GOAdA9AdIBBoCaGwiIGY3MzJhN2VjMjYwOTUwNjUxY2JhNjM4YTc3YzRiY2Fj; _tea_utm_cache_2906=undefined; __security_mc_1_s_sdk_crypt_sdk=a02da2ea-4254-9580; _bd_ticket_crypt_doamin=2; __security_mc_1_s_sdk_sign_data_key_web_protect=e68da2c6-4a62-89b0; __security_mc_1_s_sdk_cert_key=8eed5ced-4d66-b47f; __security_server_data_status=1; odin_tt=3afdec0a02f8cff69b554ba6456a0584a39a30478c978b055d1d5c8fe5cece03b07501ab7be68d8f248c13f99d142952498d6a747a281459004f9132e022da9b; csrf_session_id=7f38d011c7b4d346aab1a21ec8efadbe; ttwid=1%7CIQ66h_C2-Z6f92f3CzKhLZO9_Jebj58eLxKFAUaashc%7C1744367545%7Cf6b1c6b97a7191cc95707c6638818375040ee2d4bd6663ed48041d487ba0ecc1; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCSEQxMnZKZWlLYWhBR2Fzc1dGbWxUUStCeWRKbkVpZDdwQXZMd1Mrd2JkU0EwalRxQkRRdVFDdGluYlhzNkd5MldjNGdjNmtQZWFWRWtONUxDNUxkRWM9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; passport_fe_beating_status=false; "
        }

        console.log('用户信息##############################################################################')
        let {uid, nickname} = await require('./api_account')({cookie: env_data.cookie})
        console.log(`用户信息---{uid,nickname}:`, {uid, nickname})

        console.log('图片:循环上传##############################################################################')
        const img_list = []
        for (const file_name of form_data.imgs_path) {
            // 得到权限auth_info
            const auth_info = await require('./api_auth_info')({cookie: env_data.cookie})
            console.log(`图片:循环--- auth_info.SessionToken:`, auth_info.SessionToken.slice(0, 20))
            // 得到StoreUri
            const {SessionKey, StoreUri, Auth} = await require('./api_upload_key')({file_name, auth_info: auth_info, user_id: uid, cookie: env_data.cookie})
            console.log(`图片:循环---StoreUri:`, StoreUri)
            // 上传文件
            const res_api_upload_file_chuck = await require('./api_upload_file_chuck')({file_name, StoreUri, Auth, cookie: env_data.cookie})
            console.log(`图片:循环---res_api_upload_file_chuck:`, JSON.stringify(res_api_upload_file_chuck))
            // 得到图片信息,ImageUri, ImageWidth, ImageHeight
            let {ImageUri, ImageWidth, ImageHeight} = await require('./api_upload_img_info')({auth_info, SessionKey, uid, cookie: env_data.cookie})
            console.log(`图片:循环---{ImageUri, ImageWidth, ImageHeight}:`, JSON.stringify({ImageUri, ImageWidth, ImageHeight}))
            let res_api_upload_url = await require('./api_upload_url')({ImageUri, cookie: env_data.cookie})
            console.log(`图片:循环---res_api_upload_url:`, res_api_upload_url)
            img_list.push({uri: ImageUri, width: ImageWidth, height: ImageHeight})
        }
        console.log(`图片循环---img_list:`, JSON.stringify(img_list))

        console.log('获取csrf_token##############################################################################')
        let crf_token = await require('./api_csrf_token')({cookie: env_data.cookie})
        console.log(`获取csrf_token---crf_token:`, crf_token)

        console.log('最后提交表单##############################################################################')
        let PosterUri = img_list[0]['uri']
        let resp = await require('./api_submit_form')({PosterUri, form_data, env_data, crf_token, img_list})
        if (resp.status_code === 0) {
            console.log('成功')
            return {code: 200, msg: `成功:发布-抖音-图文`}
            // return send_publish_status(acc, 2, '提交成功', true)
        } else {
            // return send_publish_status(acc, 3, `发布失败:` + resp.status_msg, true)
            console.log('失败1')
            return {code: 400, msg: `失败1:发布-抖音-图文`}
        }
    } catch (error) {
        console.error(`报错:抖音图文发布`, `error:------`, error)
        return {code: 400, msg: `失败2:发布-抖音-图文`}
    }
}
