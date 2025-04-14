const axios = require("axios");
const tool_xs_xt = require("./tool_xs_xt");
let fs = require("fs")
let mime = require("mime-types")
let imageSize = require("image-size")
let fileToBlob = (filePath) => new Blob([fs.readFileSync(filePath)], {type: mime.lookup(filePath)})


class api_class {
    // 构造函数
    constructor({imgs, title, desc, topic, ats, address, cookie}) {
        // 表单参数************************************************************
        this.title = title       //标题
        this.desc = desc         //视频描述
        this.imgs = imgs         //图片数组
        this.cookie = cookie     //cookie
        this.topic = topic       //话题  数组中是json_str
        this.ats = ats           //@好友     数组json
        this.address = address   //地点  json_str

        //ajax_permiss_img  函数有用的参数*******************************************
        this.fileIds = []
        this.token = ""
        //ap_put_ims     函数有用的参数*******************************************
        this.imgs_info = []
        //api_make_form_data    函数有用的参数*******************************************
        this.XS = ""        //加密参数
        this.XT = 0         //加密参数
        this.form_data = {} // 新构建的表单数据
    }

    // 申请图床
    async api_permiss() {
        console.log(`***ap_put_ims***根据图片数量获取小红书可以保存图片的图床权限      `)
        let params = {file_count: this.imgs?.length, biz_name: 'spectrum', scene: 'image', version: 1, source: 'web'}
        let config = {
            method: 'get', url: 'https://edith.xiaohongshu.com/api/media/v1/upload/web/permit',//
            params: params,//
            headers: {
                Cookie: this.cookie,//
            },
        }
        // console.log('config         :', config)
        let res = await axios(config)
        let {data, success} = res.data
        success ? console.log(`成功:图床预存认证:`) : console.log(`失败:图床预存认证!`)
        console.log(`成功:图床预存认证 success  : `, success)
        var {fileIds: fileIds, token: token} = data.uploadTempPermits[0]
        this.fileIds = fileIds
        this.token = token
        console.log(`成功:图床预存认证 fileIds  : `, fileIds)
        console.log(`成功:图床预存认证 token    : `, token)
        return {fileIds, token}
    }

    // 上传图片
    async api_put_imgs() {
        console.log(`***ap_put_ims***小红书图片上传      `)
        let my_img_info = []
        for (let i = 0; i < this.fileIds.length; i++) {
            let img_path = this.imgs[i]
            let blob = fileToBlob(img_path)
            // let {width, height} = require('image-size')(img_path)
            let {width, height} = imageSize(img_path)

            let config = {
                method: 'put',//
                url: 'https://ros-upload.xiaohongshu.com/' + this.fileIds[i],//
                // url: 'https://ros-upload.xiaohongshu.com/' + "",//
                headers: {
                    'X-Cos-Security-Token': this.token,
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'zh-CN',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Origin': 'https://creator.xiaohongshu.com',
                    'Pragma': 'no-cache',
                    'Referer': 'https://creator.xiaohongshu.com/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'cross-site',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',
                    'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'Content-Type': 'image/png'
                }, data: blob
            };

            // 上传图片接口
            try {
                let res = await axios(config);
                console.log(`成功:小红书图片上传  res.data: `)
                my_img_info.push({
                    width, height, file_id: this.fileIds[i], extra_info_json: `{"mimeType":"${blob.type}"}`, metadata: {source: -1}, stickers: {version: 2, floating: []},
                })
            } catch (error) {
                console.log(`失败:小红书图片上传     error:`, error);
                throw new Error("失败:小红书图片上传");

            }
        }


        this.imgs_info = my_img_info
        return this.imgs_info
    }


    // 构建表单数据
    async api_make_form_data() {
        console.log(`***api_make_form_data***数据构建      `)
        // 基础表单结构
        this.form_data = {
            video_info: null, //
            image_info: {images: []},//
            common: {
                type: 'normal',
                title: this.title,
                desc: this.desc,
                ats: [],
                note_id: '',
                hash_tag: [],
                post_loc: {},
                source: '{"type":"web","ids":"","extraInfo":"{\\"subType\\":\\"\\",\\"systemId\\":\\"web\\"}"}',
                business_binds: '{"version":1,"noteId":0,"bizType":0,"noteOrderBind":{},"notePostTiming":{"postTime":""},"noteCollectionBind":{"id":""}}',
                privacy_info: {op_type: 1, type: 0},
            },
        }
        // (适配前端的数据)构建表单的topic,构建表单时,修改desc和hash_tag
        // [{"id": "id222", "name": "你好", "link": "https://www.xiaohongshu.com/page/topics/5be14ea174881c0001745cfe?naviHidden=yes", "type": "topic"}]
        if (this.topic.length >= 1) {
            let topic_str = ''
            for (let i = 0; i < this.topic.length; i++) {
                let obj = this.topic[i]
                // 判断小红的话题是默认的话题,还是活动话题(使用if语句写,方便以后调试)
                let item = {}
                if (obj.topic_infos?.length === 1) {
                    let topic_infos = obj.topic_infos[0]
                    item = {id: topic_infos['id'], name: topic_infos['name'], link: topic_infos['link'], type: 'topic'}
                } else {
                    item = {id: obj['id'], name: obj['name'], link: obj['link'], type: 'topic'}
                }
                topic_str += `\n#${item.name}[话题]#`
                this.form_data.common.hash_tag.push(item)
            }
            this.form_data.common.desc += topic_str
        }

        // (适配前端的数据)构建表单的ats---user_nickname改成nickname
        if (this.ats.length >= 1) {
            let ats_str = ''
            for (let i = 0; i < this.ats.length; i++) {
                let obj = this.ats[i]
                // obj['nickname'] = obj['user_nickname']
                ats_str += `\n@${obj.nickname}`    // this.form_data.common.desc 必须是内容/@小许

                this.form_data.common.ats.push(obj)//form_data.common.ats必须是格式[{nickname:'小许'}]
            }
            this.form_data.common.desc += ats_str
        }

        // (适配前端的数据address,修改post_loc
        if (this.address.poi_id) {
            this.form_data.common.post_loc = {'name': this.address.name, 'poi_id': this.address.poi_id, 'poi_type': this.address.poi_type, subname: this.address['full_address']}
        }

        // 表单中添加图片数据
        this.form_data.image_info.images = this.imgs_info
        console.log(`this.imgs_info      : `, this.imgs_info)
        let key_params = tool_xs_xt(this.form_data)//加密关键函数
        this.XS = key_params["X-s"]
        this.XT = key_params["X-t"]

    }

    // 发布小红书_图文
    async api_submit() {
        let config = {
            method: 'post', url: 'https://edith.xiaohongshu.com/web_api/sns/v2/note', data: JSON.stringify(this.form_data), headers: {
                'Cookie': this.cookie,
                'x-s': this.XS,
                'x-t': this.XT,
                'authority': 'edith.xiaohongshu.com',
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'zh-CN,zh;q=0.9',
                'authorization': '',
                'cache-control': 'no-cache',
                'origin': 'https://creator.xiaohongshu.com',
                'pragma': 'no-cache',
                'referer': 'https://creator.xiaohongshu.com/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36', // 'x-s': 'ZgdJsgF+OYTCZBTCOB9lsg1L0Y1+O2ZvOj1l0g5psBv3',
                'content-type': 'application/json',

            },
        }
        try {
            let res = await axios(config)
            console.log(`成功:发布小红书_图文   res.data: `, res.data)
        } catch (error) {
            console.log(`失败:发布小红书_图文   error   : `, error)
        }
    }


    async run() {
        await this.api_permiss()
        await this.api_put_imgs()
        await this.api_make_form_data()
        await this.api_submit()
    }


}

module.exports = api_class





