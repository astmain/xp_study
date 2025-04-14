const axios = require("axios")
const tool_bd = require("./tool_bd")
const tool_make_form_text_extra = require("./tool_make_form_text_extra")
const tool_make_form_interaction_stickers = require("./tool_make_form_interaction_stickers")
module.exports = async function api_submit_form({vid, PosterUri, form_data, ts_sign, ticket, prvkey, csr, crf_token, cookie, coverurl = ""}) {
	const data = {
		"item": {
			"common": {
				"video_id": vid,//
				// 表单参数
				"text": "", //
				"caption": "", //
				"item_title": "", //
				// "interaction_stickers": "[]",//贴纸挑战
				"activity": "[]", //
				"text_extra": "[]",//
				"challenges": "[]", //
				"mentions": "[]", //
				"hashtag_source": "", //
				"hot_sentence": "", //
				"download": 0, //
				"visibility_type": 0, //
				"timing": 0, //
				"creation_id": "rmysdark1724657681012",// todo 未知参数
				// "creation_id": "zpy6uqmk1737362690148",  //旧的好像不可以使用了
				"media_type": 4, //
				"music_source": 0,//
				"music_id": null,//
				"source_info": "{}"//
			}, //
			"cover": {
				"poster": PosterUri,//
				"cover_text_uri": null,//
				"cover_text": null,//
				"poster_delay": 0,
				"cover_tools_extend_info": `{\"recommendServerInfo\":{\"res\":[],\"times\":[]},\"recommendCoverList\":[],\"recommendCoverInfo\":{\"isFromRecommend\":false,\"isDefaultSelect\":false,\"isRecommendClickFrom\":\"\",\"selectInfo\":{},\"editingInfo\":{}},\"recommendCoverTime\":0,\"coverInfo\":{},\"coverUrl\":\"${coverurl}\",\"coverHorizontalInfo\":null,\"coverHorizontalUrl\":\"\",\"pasterInfo\":null,\"stateInfo\":null,\"croppedCoverInfo\":null,\"uploadBackgroundInfo\":null,\"uploadPasterInfo\":null,\"uploadCoverStateInfo\":null,\"xiguaCoverInfo\":{\"posterDelay\":0},\"xiguaPasterInfo\":null,\"xiguaStateInfo\":null,\"xiguaUploadCoverStateInfo\":null,\"xiguaUploadBackgroundInfo\":null,\"xiguaUploadPasterInfo\":null,\"editXigua\":false,\"coverSource\":\"\",\"previewVideoList\":[{\"isCurrent\":true}]}`,
				"cover_tools_info": "{}"
			},//
			"chapter": {
				"chapter": "{\"chapter_abstract\":\"\",\"chapter_details\":[],\"chapter_type\":1,\"chapter_tools_info\":{\"chapter_recommend_detail\":[],\"chapter_recommend_abstract\":\"\",\"chapter_source\":2,\"chapter_recommend_type\":-2,\"create_date\":1737362725,\"is_pc\":\"1\",\"is_pre_generated\":\"0\",\"is_syn\":\"1\"}}"
			}, //
			"anchor": {}, //
			"mix": {},//
			"sync": {
				"should_sync": false, "sync_to_toutiao": 0
			}, //
			"open_platform": {},//
			"assistant": {
				"is_preview": 0, "is_post_assistant": 1
			},//
			"declare": {"user_declare_info": "{}"},
		}
	}
	
	
	let obj = tool_make_form_text_extra({title: form_data["title"], discribe: form_data["discribe"], topic: form_data["topic"], friends: form_data["friends"]})
	// console.log(`obj---:`, obj)
	data['item']['common']['item_title'] = form_data['title']           //原标题
	data['item']['common']['caption'] = obj['caption']                  //原描述+#话题 + 空格 +@好友"      描述111#软件开发 #app #干货都在这 @衣服2
	data['item']['common']['text'] = obj['text']                        //原标题+空格+原描述+#话题 + 空格 +@好友                 标题 描述111#软件开发 #app #干货都在这 @衣服2
	data['item']['common']['text_extra'] = obj['text_extra']            //内容额外文本
	data['item']['common']['hot_sentence'] = form_data['hot_sentence']  //热点
	data['item']['mix'] = form_data['collection']                       //合集
	
	// 地点
	data['item']['anchor'] = {'poi_name': form_data.address.poi_name, 'poi_id': form_data.address.poi_id, 'anchor_content': JSON.stringify({"is_commerce_intentionform": form_data.address.is_commerce_intention})}
	
	//挑战贴纸
	if (form_data?.interaction_stickers?.flash_mob_id) data['item']['common']['interaction_stickers'] = tool_make_form_interaction_stickers({interaction_stickers: form_data["interaction_stickers"]})
	// console.log(`data---:`, data)
	// throw Error("测试报错")
	
	let bd_key = await tool_bd.getBdTicketGuardReePublicKey(prvkey)
	let bd_data = await tool_bd.create(ts_sign, ticket, prvkey, csr)
	// console.log(`bd_key---222:`,bd_key)
	// console.log(`bd_data---222:`,bd_data)
	
	let config = {
		'method': 'post',//
		"url": "https://creator.douyin.com/web/api/media/aweme/create_v2/",//
		"data": data, //
		"headers": {
			"Cookie": cookie, // 'x-secsdk-csrf-token': crf_token,//可以省略
			'bd-ticket-guard-ree-public-key': bd_key,//
			'bd-ticket-guard-client-data': bd_data,//
			'accept': 'application/json, text/plain, */*',//
			'accept-language': 'zh-CN,zh;q=0.9', //
			'bd-ticket-guard-iteration-version': '1', //
			'bd-ticket-guard-version': '2',
			'bd-ticket-guard-web-sign-type': '1',
			'bd-ticket-guard-web-version': '2',
			'cache-control': 'no-cache',
			'content-type': 'application/json',
			'origin': 'https://creator.douyin.com',
			'pragma': 'no-cache',
			'priority': 'u=1, i',
			'referer': 'https://creator.douyin.com/creator-micro/content/post/video?enter_from=publish_page',
			'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
		},//
		"params": {
			"read_aid": '2906',
			"cookie_enabled": 'true',
			"screen_width": '1536',
			"screen_height": '864',
			"browser_language": 'zh-CN',
			"browser_platform": 'Win32',
			"browser_name": 'Mozilla',
			"browser_version": '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
			"browser_online": 'true',
			"timezone_name": 'Asia/Shanghai',
			"aid": '1128'
		},//
		
	}
	
	
	let {data: resp} = await axios(config)
	// console.log(`api_video_upload_publish---res_data:`, resp)
	return resp
	
}
