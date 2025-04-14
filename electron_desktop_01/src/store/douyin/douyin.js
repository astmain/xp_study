import login_api from "./login_api"
import login_listener from "./login_listener"
import api_img from "./api_img"
import api_video from "./api_video"
import get_env_data from "./get_env_data"

let douyin = {
    // 常量==============================
    platform: "douyin",//
    platform_name: "抖音",//
    url: 'https://creator.douyin.com/',//
    url_home: 'https://www.douyin.com/',//
    url_creator: 'https://creator.douyin.com/',//
    logo: "public/platform_douyin.png",//
    // 方法==============================
    login_api,//
    login_listener,//
    api_img,//
    api_video,//
    get_env_data,//


}

export default douyin

