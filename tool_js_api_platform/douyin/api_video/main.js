const fs = require("fs")
const { v4: uuidv4 } = require('uuid')
const chalk = require('chalk')
const green = (text) => chalk.green("\n" + text)
module.exports = main

async function main({ form_data, env_data = {} }) {
	// 表单数据 ==========================================================================================================================
	form_data = {
		title: "标题666", //
		discribe: "描述666", //
		download: 0, //允许他人保存视频---1:允许；0：不允许
		visibility_type: 0, //设置谁可以看---0:公开；2:好友可见;1：仅自己
		friends: [{ "nickname": "衣服2", "uid": "1225333418501179", }], //好友-抖音的格式
		address: { "poi_id": "6601123883175118855", "poi_name": "泉州海洋职业学院", "is_commerce_intention": false }, //地点
		collection: { mix_id: "7403623959977003018", mix_order: 1, mix_name: "合集1" }, //热点
		topic: [{ "cha_name": "软件开发", "view_count": 2472739801, "cid": 1600877663389704, "group_id": "6539120282265720072", "tag": 0 }, ], //话题-抖音的格式
		interaction_stickers: { "flash_mob_id": "fm7474802663448743225", "text": "你已经好久没有更新你的快乐了", }, // 贴纸挑战
		hot_sentence: "2025年全国两会新闻中心启用", // 热点
		filename: "C:\\Users\\Administrator\\Desktop\\111.mp4", //本地视频文件
		img_path: "C:\\Users\\Administrator\\Desktop\\111.png", //图片路径
	}
	//  env_data = {
	//     "prvkey": "-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQglrboTlByPiRghTa3\r\nKXn61/V7ldliAhyw2GHqAbJu2nKhRANCAAQG/pxvFNwcIuA+c+19mKQ0eM0w/HHm\r\njm3KmVtqAJxZaKkP4wGCh+ysgBMJbvqJudBBQirYlqXl/otWIdM3IdSY\r\n-----END PRIVATE KEY-----\r\n",
	//     "ticket": "hash.cz5jB2AofTizYUWRrjccjY//z4kKqw4ntFneEVxn0Ik=",
	//     "ts_sign": "ts.2.e577bb346eb4079677c623ce0960052b89cdc6b76895435215fd878e36d9452bc4fbe87d2319cf05318624ceda14911ca406dedbebeddb2e30fce8d4fa02575d",
	//     "csr": "-----BEGIN CERTIFICATE-----\nMIIEfTCCBCKgAwIBAgIUXWdS2tzmSoewCWfKFyiWMrJqs/0wCgYIKoZIzj0EAwIw\nMTELMAkGA1UEBhMCQ04xIjAgBgNVBAMMGXRpY2tldF9ndWFyZF9jYV9lY2RzYV8y\nNTYwIBcNMjIxMTE4MDUyMDA2WhgPMjA2OTEyMzExNjAwMDBaMCQxCzAJBgNVBAYT\nAkNOMRUwEwYDVQQDEwxlY2llcy1zZXJ2ZXIwWTATBgcqhkjOPQIBBggqhkjOPQMB\nBwNCAASE2llDPlfc8Rq+5J5HXhg4edFjPnCF3Ua7JBoiE/foP9m7L5ELIcvxCgEx\naRCHbQ8kCCK/ArZ4FX/qCobZAkToo4IDITCCAx0wDgYDVR0PAQH/BAQDAgWgMDEG\nA1UdJQQqMCgGCCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMGCCsGAQUFBwME\nMCkGA1UdDgQiBCABydxqGrVEHhtkCWTb/vicGpDZPFPDxv82wiuywUlkBDArBgNV\nHSMEJDAigCAypWfqjmRIEo3MTk1Ae3MUm0dtU3qk0YDXeZSXeyJHgzCCAZQGCCsG\nAQUFBwEBBIIBhjCCAYIwRgYIKwYBBQUHMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL29jc3AwRgYIKwYBBQUH\nMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL29jc3AwdwYIKwYBBQUHMAKGa2h0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL2Rvd25sb2FkLzQ4RjlD\nMEU3QjBDNUE3MDVCOTgyQkU1NTE3MDVGNjQ1QzhDODc4QTguY3J0MHcGCCsGAQUF\nBzAChmtodHRwOi8vbmV4dXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UubmV0L2FwaS9j\nZXJ0aWZpY2F0ZS9kb3dubG9hZC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1\nRjY0NUM4Qzg3OEE4LmNydDCB5wYDVR0fBIHfMIHcMGygaqBohmZodHRwOi8vbmV4\ndXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UuY29tL2FwaS9jZXJ0aWZpY2F0ZS9jcmwv\nNDhGOUMwRTdCMEM1QTcwNUI5ODJCRTU1MTcwNUY2NDVDOEM4NzhBOC5jcmwwbKBq\noGiGZmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL2NybC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1RjY0NUM4\nQzg3OEE4LmNybDAKBggqhkjOPQQDAgNJADBGAiEAqMjT5ADMdGMeaImoJK4J9jzE\nLqZ573rNjsT3k14pK50CIQCLpWHVKWi71qqqrMjiSDvUhpyO1DpTPRHlavPRuaNm\nww==\n-----END CERTIFICATE-----",
	//     "cookie": "UIFID_TEMP=4dcf94af82ac0fef720a2d8219d3b55c620704ce678b8fb5e9b4b9df31cb630a89305be38434f7a388edccb3553a7ca4fefc7a434f7512825f7f67b3ed1a5fb185ab20037925267e55c3811169f9dd56; hevc_supported=true; home_can_add_dy_2_desktop=%220%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Afalse%2C%22volume%22%3A0.5%7D; passport_csrf_token=b056a5ad33db899b738a364b16774105; passport_csrf_token_default=b056a5ad33db899b738a364b16774105; __security_mc_1_s_sdk_crypt_sdk=8aced771-4cea-a97a; bd_ticket_guard_client_web_domain=2; UIFID=4dcf94af82ac0fef720a2d8219d3b55c620704ce678b8fb5e9b4b9df31cb630a89305be38434f7a388edccb3553a7ca4387d4327e2eada81965a88a17df0db60ad95d4a12d8e4fab08190713b79ab4713f1cbd7bd79219fcd0db54a351741e18472bb1d4bbde16eb8b0dd17a5c609ea2112ce223a429e60450cdf34213df2d2f4555d5f8d22f301ccaec28a3a2fe76ef9c296d5ea22bb3dd0de1e4d41595ec19; is_dash_user=1; is_staff_user=false; SelfTabRedDotControl=%5B%5D; __security_mc_1_s_sdk_cert_key=345cd75b-4b68-859d; __security_server_data_status=1; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAAz8lykIJ7932wV6fWcTKJHyQ1AigN1ZhslfyPxfZuKQo%2F1744041600000%2F0%2F0%2F1744013454949%22; strategyABtestKey=%221744105245.035%22; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A1%7D%22; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%2C%22isForcePopClose%22%3A1%7D; download_guide=%222%2F20250408%2F0%22; n_mh=Xct6vbRSosX3FaRoQGBQX3aVFZgAaih0wusNwVkOQP4; login_time=1744105322132; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAA77CtGl5KSzFyij5gNxe-Rlqg8m3Qr3LFIzgWi0vt8rtLE_4e-LKvc7LiFn0qTaXQ%2F1744128000000%2F0%2F0%2F1744109824115%22; IsDouyinActive=true; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A12%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A1.75%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A150%7D%22; publish_badge_show_info=%220%2C0%2C0%2C1744108766952%22; biz_trace_id=7ab24bac; passport_mfa_token=Cjc%2BaMCEYMiNVtCR2EtQVXYL1uhhlg1VM%2B7JMRIGVLoYhqASyfoSw6Q40KPIpR2tU8ODuyrs83xIGkoKPAAAAAAAAAAAAABO2hpRXQR8Y4e2JbnUkaZA99vlthJISxmL%2FODu%2FLqYuT%2FvT%2BWNGpTIaewL%2FjIUZsWKHBCUmO4NGPax0WwgAiIBA8Ae7Sc%3D; d_ticket=ce128df7e93aaacdfb2fbb3753a9c77d1ff5d; odin_tt=d217706994b3a8b029b228dc55cd244163af2981ded101fd5d30b4a08fbc035597486567d9bad01d1abd07f86a58fca75bb83aa8c39e1a7ee708478c85c59751; passport_assist_user=CkFizsiTzHPoVpFRGFQNwSmbaEwAOPlXu-LXm44lSdda8zWGkbBABBh8Rrj0noQ_qnDBb7AknmvV7Nphgd7OOnDRVxpKCjwAAAAAAAAAAAAATtpu-LwwreprnED01j_OdYlm6LJ0s3PY66s0-bctrnkq20et6NrUtUgwfV_Pbqp8E8cQlJjuDRiJr9ZUIAEiAQMq3Q6R; sid_guard=2563160c9d85093c9f945e27a9d0e69f%7C1744108827%7C5184000%7CSat%2C+07-Jun-2025+10%3A40%3A27+GMT; uid_tt=c365f87bcc39f1e38d80354a2817c836; uid_tt_ss=c365f87bcc39f1e38d80354a2817c836; sid_tt=2563160c9d85093c9f945e27a9d0e69f; sessionid=2563160c9d85093c9f945e27a9d0e69f; sessionid_ss=2563160c9d85093c9f945e27a9d0e69f; sid_ucp_v1=1.0.0-KDU3OTc0N2FmYWJkZTg2MWE0Yjk1YzU4MjE5ZWI4YThlM2Y3N2U5ZjgKIQi7yJDZ8s2WAhCb-tO_BhjaFiAMMOHlyq8GOAdA9AdIBBoCbGYiIDI1NjMxNjBjOWQ4NTA5M2M5Zjk0NWUyN2E5ZDBlNjlm; ssid_ucp_v1=1.0.0-KDU3OTc0N2FmYWJkZTg2MWE0Yjk1YzU4MjE5ZWI4YThlM2Y3N2U5ZjgKIQi7yJDZ8s2WAhCb-tO_BhjaFiAMMOHlyq8GOAdA9AdIBBoCbGYiIDI1NjMxNjBjOWQ4NTA5M2M5Zjk0NWUyN2E5ZDBlNjlm; _bd_ticket_crypt_doamin=2; _bd_ticket_crypt_cookie=7c0bb834d41b143dd17f4fbabde17adf; __security_mc_1_s_sdk_sign_data_key_web_protect=b078525b-47fc-97eb; ttwid=1%7C7kaRB4KDSV51usKXumzT2ASXUdNxNS2h1AQu5OhERW4%7C1744159524%7C8c75ac4ff0ec6396a0f4d2f2e5d83cf1f847641ebc6aaea824f002fd48e53e13; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCQWIrbkc4VTNCd2k0RDV6N1gyWXBEUjR6VEQ4Y2VhT2JjcVpXMm9BbkZsb3FRL2pBWUtIN0t5QUV3bHUrb201MEVGQ0t0aVdwZVgraTFZaDB6Y2gxSmc9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; "
	// }




	try {
		// 常用环境变量 ==========================================================================================================================
		const { prvkey, ticket, ts_sign, csr, cookie } = env_data

		console.log(green("账号登录============================================================"))
		let { nickname, uid } = await require("./api_account")({ cookie: cookie })
		console.log(`账号信息`, { nickname, uid })

		console.log(green("授权_auth============================================================"))
		let res_api_get_upload_auth = await require("./api_auth")({ cookie: cookie })
		let auth_info = JSON.parse(res_api_get_upload_auth.auth)
		console.log(`auth_info:`, JSON.stringify(auth_info))


		console.log(green("授权_authoration============================================================"))
		let file_size = fs.statSync(form_data['filename']).size
		let { Auth, UploadHost, StoreUri, SessionKey, vid } = await require("./api_authoration")({ auth_info, file_size, uid, cookie })
		console.log(`vid:`, vid)

		console.log(green("视频文件上传============================================================"))
		if (file_size <= 5242880) {
			console.log(`小视频===`)
			let chunk = fs.readFileSync(form_data['filename'])
			let crc32 = (require('crc32')(chunk)).toUpperCase() // 需要大写       '8FBAB688'  按位与运算、十六进制转换和大写转
			let put_url = `https://${UploadHost}/upload/v1/${StoreUri}`
			let res_api_upload_file_chunk = await require("./api_img_upload")({ is_final: false, put_url, Auth, crc32, uid, chunk, cookie })
			console.log(`4上传文件块---小文件---res_api_upload_file_chunk---成功:`, JSON.stringify(res_api_upload_file_chunk)) //       {code: 2000, apiversion: 'v1', message: 'Success', data: { crc32: '404bf858' }}
		} else {
			console.log(`大视频===分片`)
			const stats = fs.statSync(form_data['filename']) // 获取文件信息
			const fileSize = stats.size
			const chunkSize = 5242880 // 每次读取的字节数
			const count = Math.ceil(fileSize / chunkSize) // 计算需要读取的次数
			const fd = fs.openSync(form_data['filename'], 'r') // 以二进制模式打开文件
			const buffer = Buffer.alloc(chunkSize) // 初始化缓冲区
			const did = uuidv4()
			let crc32_join = ""
			for (let i = 0; i < count; i++) {
				const position = i * chunkSize //上一行代码计算得到的本次读取操作在文件中的起始位置
				const bytesToRead = Math.min(chunkSize, fileSize - position) //读取量
				const bytesRead = fs.readSync(fd, buffer, 0, bytesToRead, position) // 同步读取文件
				const chunk = buffer.slice(0, bytesRead) // 处理读取到的 chunk
				//构造参数
				let index = i + 1
				console.log(`大视频===index`, index)
				let crc32 = (require('crc32')(chunk)).toUpperCase() // 需要大写
				let put_url = `https://${UploadHost}/upload/v1/${StoreUri}?uploadid=${did}&part_number=${index}&phase=transfer&part_offset=${position}`
				await require("./api_video_upload_chunk")({ is_final: false, put_url, Auth, crc32, uid, chunk, cookie })
				crc32_join += (index + ':' + crc32 + ',')
				if (count === index) {
					console.log(`4上传文件块---大文件----最后----分片上传-is_final`, )
					let put_url = `https://${UploadHost}/upload/v1/${StoreUri}?uploadmode=part&phase=finish&uploadid=${did}`
					await require("./api_video_upload_chunk")({ is_final: true, put_url, Auth, crc32, uid, chunk, cookie, crc32_join })
				}
			}
			//文件去读器关闭
			fs.closeSync(fd)
		}


		console.log(green("视频文件提交============================================================"))
		let Uri = await require("./api_video_upload_commit")({ auth_info, SessionKey, uid, cookie })
		console.log(`Uri:`, Uri)

		console.log(green("上传封面url============================================================"))
		let Uri2 = await require("./api_img_upload")({ auth_info, uid, cookie, img_path: form_data.img_path })
		console.log(`Uri2:`, Uri2)

		console.log(green("获取封面url============================================================"))
		let coverurl = await require("./api_img_coverurl")({ video_uri: Uri2, cookie })
		console.log(`coverurl:`, coverurl)


		console.log(green("视频是否可用============================================================"))
		let video_enable = await require("./api_video_enable")({ video_id: vid, cookie })
		console.log(`video_enable:`, video_enable)


		console.log(green("获取crf_token============================================================"))
		let crf_token = await require("./api_csrf_token")(cookie)
		console.log(`crf_token:`, crf_token)


		console.log(green("最后表单提交============================================================"))
		let result = await require("./api_submit_form")({ vid, PosterUri: Uri2, form_data, ts_sign, ticket, prvkey, csr, crf_token, cookie, coverurl })
		if (result?.status_code === 0) {
			console.log(`成功:抖音视频发布`, result)
			return result
		} else {
			console.log(`失败:抖音视频发布:`, JSON.stringify(result))
			return result
		}
	} catch (error) {
		console.log("error---", error)
	}


}