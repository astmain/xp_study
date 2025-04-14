import login_api from "./login_api"
import login_listener from "./login_listener"
import get_env_data from "./get_env_data"
import api_img from "./api_img"


let xhs = {
    // 常量==============================
    platform: "xhs",//
    platform_name: "小红书",//
    url: 'https://www.xiaohongshu.com/explore',//
    url_home: 'https://www.xiaohongshu.com/explore',//
    url_creator: 'https://creator.xiaohongshu.com/',//
    logo: "public/platform_xhs.png",//
    // 方法==============================
    login_api,//
    login_listener,//
    get_env_data,//
    api_img,//


}
// module.exports = config_xhs
export default xhs


