const fs = require("fs")
const {v4: uuidv4} = require('uuid')
const chalk = require('chalk')
const green = (text) => chalk.green("\n" + text)


async function test1({form_data, env_data = {}}) {
    try {
        // 常用环境变量 ==========================================================================================================================
        const {prvkey, ticket, ts_sign, csr, cookie} = env_data

        console.log(green("账号登录============================================================"))
        let {nickname, uid} = await require("./api_account")({cookie: cookie})
        console.log(`账号信息`, {nickname, uid})

        console.log(green("授权_auth============================================================"))
        let res_api_get_upload_auth = await require("./api_auth")({cookie: cookie})
        let auth_info = JSON.parse(res_api_get_upload_auth.auth)
        console.log(`auth_info:`, JSON.stringify(auth_info))


        console.log(green("授权_authoration============================================================"))
        let file_size = fs.statSync(form_data['filename']).size
        let {Auth, UploadHost, StoreUri, SessionKey, vid} = await require("./api_authoration")({auth_info, file_size, uid, cookie})
        console.log(`vid:`, vid)

        console.log(green("视频文件上传============================================================"))
        if (file_size <= 5242880) {
            console.log(`小视频===`)
            let chunk = fs.readFileSync(form_data['filename'])
            let crc32 = (require('crc32')(chunk)).toUpperCase()// 需要大写       '8FBAB688'  按位与运算、十六进制转换和大写转
            let put_url = `https://${UploadHost}/upload/v1/${StoreUri}`
            let res_api_upload_file_chunk = await require("./api_img_upload")({is_final: false, put_url, Auth, crc32, uid, chunk, cookie})
            console.log(`4上传文件块---小文件---res_api_upload_file_chunk---成功:`, JSON.stringify(res_api_upload_file_chunk))//       {code: 2000, apiversion: 'v1', message: 'Success', data: { crc32: '404bf858' }}
        }
        else {
            console.log(`大视频===分片`)
            const stats = fs.statSync(form_data['filename'])                       // 获取文件信息
            const fileSize = stats.size
            const chunkSize = 5242880                                              // 每次读取的字节数
            const count = Math.ceil(fileSize / chunkSize)                          // 计算需要读取的次数
            const fd = fs.openSync(form_data['filename'], 'r')                     // 以二进制模式打开文件
            const buffer = Buffer.alloc(chunkSize)                                 // 初始化缓冲区
            const did = uuidv4()
            let crc32_join = ""
            for (let i = 0; i < count; i++) {
                const position = i * chunkSize                                     //上一行代码计算得到的本次读取操作在文件中的起始位置
                const bytesToRead = Math.min(chunkSize, fileSize - position)       //读取量
                const bytesRead = fs.readSync(fd, buffer, 0, bytesToRead, position)// 同步读取文件
                const chunk = buffer.slice(0, bytesRead)                           // 处理读取到的 chunk
                //构造参数
                let index = i + 1
                console.log(`大视频===index`,index)
                let crc32 = (require('crc32')(chunk)).toUpperCase()// 需要大写
                let put_url = `https://${UploadHost}/upload/v1/${StoreUri}?uploadid=${did}&part_number=${index}&phase=transfer&part_offset=${position}`
                await require("./api_video_upload_chunk")({is_final: false, put_url, Auth, crc32, uid, chunk, cookie})
                crc32_join += (index + ':' + crc32 + ',')
                if (count === index) {
                    console.log(`4上传文件块---大文件----最后----分片上传-is_final`,)
                    let put_url = `https://${UploadHost}/upload/v1/${StoreUri}?uploadmode=part&phase=finish&uploadid=${did}`
                    await require("./api_video_upload_chunk")({is_final: true, put_url, Auth, crc32, uid, chunk, cookie, crc32_join})
                }
            }
            //文件去读器关闭
            fs.closeSync(fd)
        }


        console.log(green("视频文件提交============================================================"))
        let Uri = await require("./api_video_upload_commit")({auth_info, SessionKey, uid, cookie})
        console.log(`Uri:`, Uri)

        console.log(green("上传封面url============================================================"))
        let Uri2 = await require("./api_img_upload")({auth_info, uid, cookie, img_path: form_data.img_path})
        console.log(`Uri2:`, Uri2)

        console.log(green("获取封面url============================================================"))
        let coverurl = await require("./api_img_coverurl")({video_uri: Uri2, cookie})
        console.log(`coverurl:`, coverurl)


        console.log(green("视频是否可用============================================================"))
        let video_enable = await require("./api_video_enable")({video_id: vid, cookie})
        console.log(`video_enable:`, video_enable)


        console.log(green("获取crf_token============================================================"))
        let crf_token = await require("./api_csrf_token")(cookie)
        console.log(`crf_token:`, crf_token)


        console.log(green("最后表单提交============================================================"))
        let result = await require("./api_submit_form")({vid, PosterUri: Uri2, form_data, ts_sign, ticket, prvkey, csr, crf_token, cookie, coverurl})
        if (result?.status_code === 0) {
            console.log(`成功:抖音视频发布`, result)
        } else {
            console.log(`失败:抖音视频发布:`, JSON.stringify(result))
        }
    } catch (error) {
        console.log("error---", error)
    }


}


// 表单数据
let form_data = {
    title: "标题666", //
    discribe: "描述666",//
    download: 0,                                                //允许他人保存视频---1:允许；0：不允许
    visibility_type: 0,                                         //设置谁可以看---0:公开；2:好友可见;1：仅自己
    friends: [{"nickname": "衣服2", "uid": "1225333418501179",}],  //好友-抖音的格式
    address: {"poi_id": "6601123883175118855", "poi_name": "泉州海洋职业学院", "is_commerce_intention": false}, //地点
    collection: {mix_id: "7403623959977003018", mix_order: 1, mix_name: "合集1"}, //热点
    topic: [{"cha_name": "软件开发", "view_count": 2472739801, "cid": 1600877663389704, "group_id": "6539120282265720072", "tag": 0},],       //话题-抖音的格式
    interaction_stickers: {"flash_mob_id": "fm7474802663448743225", "text": "你已经好久没有更新你的快乐了",},          // 贴纸挑战
    hot_sentence: "2025年全国两会新闻中心启用",// 热点
    filename: "C:\\Users\\Administrator\\Desktop\\111.mp4",    //本地视频文件
    img_path: "C:\\Users\\Administrator\\Desktop\\111.png",    //图片路径
}
let env_data = {
    "prvkey": "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgy6benGAUueH6n9m+P5Fn3y77oA9ATU6FI+AzF4e5G1GhRANCAASOXP9eVE5zp3/7tV3UfZ6bgN0s3xmz57Pji5wsUKspVO9NgPoEHOlbluHk+Zs/LTyx7MY4/MKn3jE0q/a+wGkr\n-----END PRIVATE KEY-----",
    "ticket": "hash.tzc3zh74T7xIvisOHAxo3XKuKXxDovItuQVJfL1VUqQ=",
    "ts_sign": "ts.2.6f706644a376e7d7fe2b068b2ac3344908b2c8984fe7c34b4640e60862166ebfc4fbe87d2319cf05318624ceda14911ca406dedbebeddb2e30fce8d4fa02575d",
    "csr": "-----BEGIN CERTIFICATE-----\nMIIEfTCCBCKgAwIBAgIUXWdS2tzmSoewCWfKFyiWMrJqs/0wCgYIKoZIzj0EAwIw\nMTELMAkGA1UEBhMCQ04xIjAgBgNVBAMMGXRpY2tldF9ndWFyZF9jYV9lY2RzYV8y\nNTYwIBcNMjIxMTE4MDUyMDA2WhgPMjA2OTEyMzExNjAwMDBaMCQxCzAJBgNVBAYT\nAkNOMRUwEwYDVQQDEwxlY2llcy1zZXJ2ZXIwWTATBgcqhkjOPQIBBggqhkjOPQMB\nBwNCAASE2llDPlfc8Rq+5J5HXhg4edFjPnCF3Ua7JBoiE/foP9m7L5ELIcvxCgEx\naRCHbQ8kCCK/ArZ4FX/qCobZAkToo4IDITCCAx0wDgYDVR0PAQH/BAQDAgWgMDEG\nA1UdJQQqMCgGCCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMGCCsGAQUFBwME\nMCkGA1UdDgQiBCABydxqGrVEHhtkCWTb/vicGpDZPFPDxv82wiuywUlkBDArBgNV\nHSMEJDAigCAypWfqjmRIEo3MTk1Ae3MUm0dtU3qk0YDXeZSXeyJHgzCCAZQGCCsG\nAQUFBwEBBIIBhjCCAYIwRgYIKwYBBQUHMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL29jc3AwRgYIKwYBBQUH\nMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL29jc3AwdwYIKwYBBQUHMAKGa2h0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL2Rvd25sb2FkLzQ4RjlD\nMEU3QjBDNUE3MDVCOTgyQkU1NTE3MDVGNjQ1QzhDODc4QTguY3J0MHcGCCsGAQUF\nBzAChmtodHRwOi8vbmV4dXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UubmV0L2FwaS9j\nZXJ0aWZpY2F0ZS9kb3dubG9hZC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1\nRjY0NUM4Qzg3OEE4LmNydDCB5wYDVR0fBIHfMIHcMGygaqBohmZodHRwOi8vbmV4\ndXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UuY29tL2FwaS9jZXJ0aWZpY2F0ZS9jcmwv\nNDhGOUMwRTdCMEM1QTcwNUI5ODJCRTU1MTcwNUY2NDVDOEM4NzhBOC5jcmwwbKBq\noGiGZmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL2NybC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1RjY0NUM4\nQzg3OEE4LmNybDAKBggqhkjOPQQDAgNJADBGAiEAqMjT5ADMdGMeaImoJK4J9jzE\nLqZ573rNjsT3k14pK50CIQCLpWHVKWi71qqqrMjiSDvUhpyO1DpTPRHlavPRuaNm\nww==\n-----END CERTIFICATE-----",
    "cookie": "gfkadpd=2906,33638; gfkadpd=2906,33638; bd_ticket_guard_client_web_domain=2; passport_csrf_token=82797d86e4d0ae6e7dd7343f793ca343; passport_csrf_token_default=82797d86e4d0ae6e7dd7343f793ca343; passport_mfa_token=CjdGISBPO3nCFzUij5fPedQiLvMkafP2OwrFIAO4plyU6pEw%2FmyzufI8vN8ltiiSmnE2RnA91yhxGkoKPJovNjDEAAM%2BsSf%2FoETCh2WBQXG%2Ba5Aev0Y1LCy%2FBp5M9KcYW3eIUYYbhoK0PhjW0lN3%2FJE0gDU8dHDxSxC0ru4NGPax0WwgAiIBA22WWi0%3D; d_ticket=8f97413acefd887a204ecc840943f72b791a9; passport_assist_user=CkG-b3dt6u73LNwAk7UzM-ojs5XdoAn0ArLmbr6HM26O6mKUw4w5KVFIrU0CKAbwMuDyw9MsFktFgaoo4duhNmwMOBpKCjwdXiJwRNgk1Fjfw60leuqiQhHK4XerwB37RZhdBr2nGxDjbCCiKE0psYXXbMXYt34tG9eb0IpNU8vtIIQQ6a7uDRiJr9ZUIAEiAQP2edI8; n_mh=Xct6vbRSosX3FaRoQGBQX3aVFZgAaih0wusNwVkOQP4; sid_guard=f732a7ec260950651cba638a77c4bcac%7C1744278685%7C5184000%7CMon%2C+09-Jun-2025+09%3A51%3A25+GMT; uid_tt=a11f222bd3dbc00de3436c7dcb8d14b0; uid_tt_ss=a11f222bd3dbc00de3436c7dcb8d14b0; sid_tt=f732a7ec260950651cba638a77c4bcac; sessionid=f732a7ec260950651cba638a77c4bcac; sessionid_ss=f732a7ec260950651cba638a77c4bcac; is_staff_user=false; sid_ucp_v1=1.0.0-KGMyNzZlZTg2MDQzOTFmMTE5N2Q0NTY3YTQ4ZjVkYTNkMDQ0NWY1NzYKIQi7yJDZ8s2WAhCdqd6_BhjaFiAMMOHlyq8GOAdA9AdIBBoCaGwiIGY3MzJhN2VjMjYwOTUwNjUxY2JhNjM4YTc3YzRiY2Fj; ssid_ucp_v1=1.0.0-KGMyNzZlZTg2MDQzOTFmMTE5N2Q0NTY3YTQ4ZjVkYTNkMDQ0NWY1NzYKIQi7yJDZ8s2WAhCdqd6_BhjaFiAMMOHlyq8GOAdA9AdIBBoCaGwiIGY3MzJhN2VjMjYwOTUwNjUxY2JhNjM4YTc3YzRiY2Fj; _tea_utm_cache_2906=undefined; __security_mc_1_s_sdk_crypt_sdk=a02da2ea-4254-9580; _bd_ticket_crypt_doamin=2; __security_mc_1_s_sdk_sign_data_key_web_protect=e68da2c6-4a62-89b0; __security_mc_1_s_sdk_cert_key=8eed5ced-4d66-b47f; __security_server_data_status=1; odin_tt=3afdec0a02f8cff69b554ba6456a0584a39a30478c978b055d1d5c8fe5cece03b07501ab7be68d8f248c13f99d142952498d6a747a281459004f9132e022da9b; csrf_session_id=7f38d011c7b4d346aab1a21ec8efadbe; ttwid=1%7CIQ66h_C2-Z6f92f3CzKhLZO9_Jebj58eLxKFAUaashc%7C1744367545%7Cf6b1c6b97a7191cc95707c6638818375040ee2d4bd6663ed48041d487ba0ecc1; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCSEQxMnZKZWlLYWhBR2Fzc1dGbWxUUStCeWRKbkVpZDdwQXZMd1Mrd2JkU0EwalRxQkRRdVFDdGluYlhzNkd5MldjNGdjNmtQZWFWRWtONUxDNUxkRWM9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; passport_fe_beating_status=false; "
}
test1({form_data, env_data})
