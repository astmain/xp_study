_ = require("lodash")

let data = [//
    {"id": 1, "platform": "douyin", "platform_name": "抖音", "cookies_str": '1111', 'cookies': [], 'local_storage': {}, "partition": "", "nickname": "小许", "url": "", "user_id": "", "avatar": "", "line": true, "order": 0, "group_key": "cypt", "group_title": "常用平台",}, {
        "id": 2, "platform": "douyin", "platform_name": "抖音", "cookies_str": '1111', 'cookies': [], 'local_storage': {}, "partition": "", "nickname": "小许", "url": "", "user_id": "", "avatar": "", "line": true, "order": 0, "group_key": "cypt", "group_title": "喜欢的平台",
    }, {"id": 3, "platform": "douyin", "platform_name": "抖音", "cookies_str": '1111', 'cookies': [], 'local_storage': {}, "partition": "", "nickname": "小许", "url": "", "user_id": "", "avatar": "", "line": true, "order": 0, "group_key": "cypt", "group_title": "常用平台",},]


let group_arr=make_dat({data})
console.log(`111---group_arr:`,     JSON.stringify(    group_arr )                )

function make_dat({data}) {
    let group_title = _.groupBy(data, n => n["group_title"])
    let group_arr = _.map(group_title, (o, k) => ({"title": k, arr: o}))
    return group_arr
}
