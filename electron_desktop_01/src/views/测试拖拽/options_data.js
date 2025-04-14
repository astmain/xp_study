export default function options_data() {
    let data = {
        key: "id", //
        curr: "当前的值曲list第一个",//
        list: [//
            {
                id: "1",//
                name: "抖音",//
                partition: "persist:test111",//
                url: 'https://creator.douyin.com/',//
                url_home: 'https://www.douyin.com/',//
                url_creator: 'https://creator.douyin.com/',//
            },//
            {
                id: "2",//
                name: "小红书",//
                partition: "persist:test111",//
                url: "https://www.xiaohongshu.com/explore",//
                url_home: "https://www.xiaohongshu.com/explore",//
                url_creator: 'https://creator.xiaohongshu.com/new/home',//
            },//
        ]
    }
    data.curr = data.list[1]
    return data
}