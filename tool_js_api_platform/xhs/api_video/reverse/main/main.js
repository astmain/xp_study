let my_tool = require("../my_tool")
let ajax_封装Tt2 = require("./ajax_封装Tt2")
let ajax_封装yr = require("./ajax_封装yr")
let ajax_封装j111 = require("./ajax_封装j111")
let ajax_封装Er_222 = require("./ajax_封装Er_222")
let ajax_封装Tt_3333 = require("./ajax_封装Tt_3333")
let ajax_封装St_封面 = require("./ajax_封装St_封面")
let ajax_封装St_分片 = require("./ajax_封装St_分片")
let 工具方法_表单_上传格式 = require("./工具方法_表单_上传格式")
let ajax_小红书_发布 = require("./ajax_小红书_发布")
let 工具方法_消息队列 = require("./工具方法_消息队列")


// 全局变量
let my_chunkSize = 5 * 1024 * 1024
let my_video_percent = 10

let callback

function status_listen(cb) {
    callback = cb
}

module.exports = {main, status_listen}



async function main(data) {
    console.log("开始发布", data)
    const {cookies, video_path, video_duration, img_path, title = "", description = "", topic, ats, address} = data

    // @好友---数据重新整理数据字段名
    let asts_new = ats.map(o => {
        return JSON.stringify({user_nickname: o.nickname, user_id: o.user_id, image: o.image})
    })

    // 地点---数据重新整理数据字段名
    let address_json_str_new = JSON.stringify({name: address.name, poiOid: address.poi_id, subname: address.full_address, source: address.poi_type})


    //话题
    let topic_new = topic.map(o => {
        return JSON.stringify(o)
    })


    // cookies
    globalThis.my_cookie_str = cookies

    // 视频数据
    let 视频信息 = await my_tool.get_video_info(video_path)
    let 视频文件 = my_tool.Make_File_obj(video_path)
    // 图片数据
    let 图片信息 = require('image-size')(img_path);
    let 图片文件 = my_tool.FileBlob(img_path)
    S = {
        videoData: {
            cover: 图片文件,//
            width: 图片信息.width,//
            height: 图片信息.height,//
            videoType: "horizontal",//
            duration: video_duration,//
            name: 视频信息.video_name,//
            path: 视频信息.video_path,//
            size: 视频信息.video_size,//
            file: 视频文件,//
        },//

        // 表格格式
        formValues: {
            // 封面
            cover: {"value": {"isCropper": true, "url": "", "blob": 图片文件, "width": 800, "height": 600}, "required": true, "message": "请上传封面"}, //
            // 标题
            title: {"value": title,},//
            //内容描述
            description: {"value": description},//

            // 话题真正格式
            // topic: {value:  ["{\"id\":\"65b0c91100000000020031c6\",\"name\":\"男生发型话题1\",\"link\":\"https://www.xiaohongshu.com/page/topics/65b0c911e08d1c00015415d5?naviHidden=yes&autoPlayMedioBack=yes\"}"], "required": false},
            topic: {value: topic_new, "required": false},

            // @好友
            // friends: {value:["{\"user_nickname\":\"十\",\"user_id\":\"5ca689c90000000010036744\",\"image\":\"https://sns-avatar-qc.xhscdn.com/avatar/5ca68b03a7e4560001154c3a.jpg?imageView2/2/w/80/format/jpg\"}"]  ,   "required": false}, //
            friends: {value: asts_new, "required": false}, //

            // 地点
            // position: {   value:     JSON.stringify(     {name: "泉州师范学院(主校区)", poiOid: "B025303BCI", subname: "泉州市丰泽区东海大街398号", source: 12,}        )            ,          "required": false}, //
            position: {value: address_json_str_new, "required": false}, //

            // 其他字段数组
            "visible": {"value": 0, "required": true, "message": "请选择权限"},//
            "coverAspectRatio": {"value": {"horizontal": "4:3", "vertical": "3:4"}, "required": false}, "isChangeTitle": {"value": false, "required": false},//
            "isChangeDescription": {"value": false, "required": false}, //
            "publishTime": {"required": false},//
            "isChangePublishTime": {"value": false, "required": false},
        },//


    }
    q = wu()//
    Ne = q(S)
    callback("视频解析成功")
    await Ne.uploadFile(S.videoData.file)

}


// 初始化函数new类Oe
function wu(R) {
    async function 获取凭证信息(S, scene) {
        const res = await ajax_封装yr({cookies: globalThis.my_cookie_str, params: {biz_name: 'spectrum', scene: scene, file_count: 1, version: 1, source: 'web'}})
        const {data} = res.data || {}
        const uploadTempPermits = data?.uploadTempPermits
        if (!uploadTempPermits) {
            throw {...res, message: '获取凭证信息错误'}
        }
        return uploadTempPermits || []
    }

    async function B(S) {
        const {user} = S
        const {videoData, formValues} = user
        if (!videoData?.file) {
            throw Error('视频缺失')

        }
        if (!formValues?.cover?.value?.blob) {
            throw new Error('读取封面失败，请稍后重试')
        }
        if (!formValues?.cover?.value?.width || !formValues?.cover?.value?.height) {
            throw new Error('读取封面失败，请稍后重试')
        }
        const [d] = await ajax_封装j111(globalThis.my_cookie_str)
        const fileIds_spectrum = d?.fileIds?.[0]
        const token = d?.token;
        S.fileId = fileIds_spectrum

        S.token = token
        if (videoData.file.size > my_chunkSize) {
            await ajax_封装Er_222({uploads: '', prefix: fileIds_spectrum}, token)
            const f = await ajax_封装Tt_3333(`https://ros-upload.xiaohongshu.com/${fileIds_spectrum}?uploads=`, {'X-Cos-Security-Token': token, 'Content-Type': 'video/mp4'})
            if (f.data) {
                let my_tool = require("../my_tool")
                let o = await my_tool.XmlStringParse(f.data)
                S.uploadId = o.InitiateMultipartUploadResult.UploadId
            } else {
                throw {...f, message: '获取uploadId为空'}
            }
        }
    }

    async function N(S, A, b, l) {
        const {fileId: d, uploadId: w, token: v} = b
        const m = {uploadId: w, partNumber: A}

        my_video_percent += 1
        return new Promise((resolve, reject) => {
            // St({route: d, data: S, params: l.length > 1 ? m : void 0, headers: {'X-Cos-Security-Token': v, 'Content-Length': S?.size}})
            let config = {route: d, data: S, params: l.length > 1 ? m : void 0, headers: {'X-Cos-Security-Token': v, 'Content-Length': S?.size}}
            ajax_封装St_分片(config)
                .then((r) => {
                    const {status: s} = r
                    if (s === 200) {
                        callback("正在上传视频")
                        return resolve({params: m, result: r})
                    } else {
                        return reject({...r, message: '分片上传失败'})
                    }

                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    async function M(S) {
        const [A] = await 获取凭证信息(S, 'image')

        const b = A?.fileIds?.[0]
        let {cover: l} = S?.formValues || {}
        let config = {route: b, data: l?.value?.blob, headers: {'X-Cos-Security-Token': A?.token, 'Content-Length': l?.value?.blob?.size, 'Content-Type': ''}}
        await ajax_封装St_封面(config).catch((error) => {
            throw {...error, message: '失败:封面上传中'}
        })

        let result = {coverIds: b, width: l?.value?.width, height: l?.value?.height}
        callback("正在上传封面")
        return result
    }

    async function P(S, A) {
        const {fileId: b, uploadId: l, token: d, user: w} = A
        if (Array.isArray(S) && S.length > 1) {
            const f = S.map((p) => {
                const {result: c, params: h} = p
                return h ? {ETag: JSON.parse(c.headers?.etag || ''), PartNumber: h.partNumber} : c.data
            })
            const 数据_文本_xml = my_tool.XmlJsonDataToXml("CompleteMultipartUpload", f)


            let config111 = {url: `https://ros-upload.xiaohongshu.com/${b}?uploadId=${l}&aaaaaa=111111`, 数据_文本_xml: 数据_文本_xml, headers: {'Content-Type': 'application/xml', 'X-Cos-Security-Token': d}}
            let 没有要求返回值 = await ajax_封装Tt2(config111)
        }

        const v = await M(w)
        A.cover = v
        return await x(w, A)
    }

    async function x(S, A) {
        // console.log('🚀 最终上传小红书接口         :', 111)
        const b = {
            "video": {
                "@type": "Video",
                "StreamOrder": "0",
                "ID": "1",
                "Format": "AVC",
                "Format_Profile": "Main",
                "Format_Level": "3",
                "Format_Settings_CABAC": "Yes",
                "Format_Settings_RefFrames": "1",
                "CodecID": "avc1",
                "Duration": "66.200",
                "BitRate": "884005",
                "Width": "640",
                "Height": "480",
                "Sampled_Width": "640",
                "Sampled_Height": "480",
                "PixelAspectRatio": "1.000",
                "DisplayAspectRatio": "1.333",
                "Rotation": "0.000",
                "FrameRate_Mode": "CFR",
                "FrameRate_Mode_Original": "VFR",
                "FrameRate": "25.000",
                "FrameCount": "1655",
                "ColorSpace": "YUV",
                "ChromaSubsampling": "4:2:0",
                "BitDepth": "8",
                "ScanType": "Progressive",
                "StreamSize": "7315142",
                "Encoded_Date": "UTC 1970-01-01 00:00:00",
                "Tagged_Date": "UTC 1970-01-01 00:00:00",
                "extra": {
                    "CodecConfigurationBox": "avcC"
                }
            }, "audio": {
                "@type": "Audio",
                "StreamOrder": "1",
                "ID": "2",
                "Format": "AAC",
                "Format_AdditionalFeatures": "LC",
                "CodecID": "mp4a-40-2",
                "Duration": "66.198",
                "BitRate_Mode": "VBR",
                "BitRate": "384000",
                "BitRate_Maximum": "449032",
                "Channels": "6",
                "ChannelPositions": "Front: L C R, Side: L R, LFE",
                "ChannelLayout": "C L R Ls Rs LFE",
                "SamplesPerFrame": "1024",
                "SamplingRate": "48000",
                "SamplingCount": "3177504",
                "FrameRate": "46.875",
                "FrameCount": "3103",
                "Compression_Mode": "Lossy",
                "StreamSize": "3176488",
                "StreamSize_Proportion": "0.30165",
                "Default": "Yes",
                "AlternateGroup": "1",
                "Encoded_Date": "UTC 1970-01-01 00:00:00",
                "Tagged_Date": "UTC 1970-01-01 00:00:00"
            }
        }
        let 表单_上传格式 = 工具方法_表单_上传格式(S.formValues, A, b)
        console.log(`S.formValues---:`, S.formValues)

        let 加密参数xs_xt = my_tool.xhr_get_XS_Xt(表单_上传格式)

        const m = {data: 表单_上传格式, headers: {Authorization: '', 'X-S': 加密参数xs_xt['X-s'], 'X-T': String(加密参数xs_xt['X-t'])}}
        const res = await ajax_小红书_发布({...m, cookies: globalThis.my_cookie_str})
        if (res.data && res.data.success === true) {
            callback("发布成功")
            return true
        } else {
            throw {message: '发布失败'}
        }


    }


    const F = (S, A) => {
        console.log(`发布失败      S: `, S)
        console.log(`发布失败      A: `, A)
    }

    function q(S) {
        let config = {chunkSize: my_chunkSize, context: {user: S}, beforeUpload: B, uploadPartFile: N, uploaded: P, updateProcess: () => 1, onError: F}
        let res = new Oe(config)
        return res
    }

    return q
}


// 类Oe视频上传
class Oe {
    constructor(U) {
        this.uploadOptions = U
    }

    async uploadFile(videoData_file) {
        const {context, singleUpload, beforeUpload, uploaded, onError: N, runLimit: M = 3} = this.uploadOptions
        const P = this.getChunkList(videoData_file)

        this.uploadStatus = Array(P.length).fill(!1)
        try {
            if (singleUpload) {
                const _ = await singleUpload(videoData_file, context)
                uploaded && await uploaded(_, context)
            } else {
                beforeUpload && (await beforeUpload(context))
                const _ = 工具方法_消息队列(M)
                const x = P.map((L, F) => _(() => this.uploadChunkWithRetry(L, F, P)))
                const V = await Promise.all(x)
                uploaded && await uploaded(V, context)

                return V
            }
        } catch (error) {
            // console.error('发布失败:', error), N ? N(su(error), O) : console.error('Upload failed:', error)
            throw {message: '发布失败', error}
        }
    }

    getChunkList(vide_File) {
        const {chunkSize} = this.uploadOptions
        const vide_size = vide_File.size
        const j = Math.ceil(vide_size / chunkSize)
        let result = Array.from({length: j}, (N, M) => {
            function 文件getBlobSlice() {
                if (typeof File.prototype.slice != "function") {
                    throw new Error("The Blob slicing method is not supported in this browser.");
                }

                return File.prototype.slice
            }


            const P = chunkSize * M, _ = Math.min(P + chunkSize, vide_size)
            return {body: 文件getBlobSlice().call(vide_File, P, _), part: M + 1}
        })


        // console.log('getChunkList--返回值           result:', result)
        return result
    }

    async uploadChunkWithRetry(U, O, D, j = 0) {
        const {context: B, uploadPartFile: N, retryTimes: M = 3, updateProcess: P} = this.uploadOptions
        try {
            const _ = await N(U.body, U.part, B, D)
            if (((this.uploadStatus[O] = !0), P)) {
                const x = this.uploadStatus.filter((L) => L).length, V = (x / D.length) * 100
                await P(V, x, D.length, B)
            }

            return _
        } catch (error) {
            if (j < M) return this.uploadChunkWithRetry(U, O, D, j + 1)
            throw error
        }
    }
}


