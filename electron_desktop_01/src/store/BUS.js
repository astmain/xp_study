import login_check from "./login_check";
import config_all_platform from "./config_all_platform";



let name = "BUS"
//    Bmusic.state
//    Bmusic.curr
// let state = () => {
//     return {
//         user_id: "",
//         nickname: "未选择账号",
//         avatar: "",
//         cookies_str: "",
//         platform: "",
//         platform_name: "未选择平台",
//     }
// }
let state = {
    Account: {
        user_id: "",
        nickname: "未选择账号",
        avatar: "",
        cookies_str: "",
        platform: "",
        platform_name: "未选择平台",
    },
    config_all_platform: config_all_platform,
    login_check: new login_check(),


}


let persist = {
    enabled: true,
    strategies: [
        // {storage: localStorage, paths: ['user_id', 'nickname', 'avatar', 'cookies_str', 'platform', 'platform_name']},
        {storage: localStorage, paths: ["Account"]},
    ],
}


// let persist = {
//     //这里存储默认使用的是session
//     enabled: true, //
//     strategies: [//
//         {key: 'curr', paths: ['curr'], storage: window.localStorage}, //sessionStorage
//
//     ],
// }

export default {name, state, persist}
