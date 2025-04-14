module.exports = tool_make_form_text_extra

function tool_make_form_text_extra({title = "", discribe = "", topic = [], friends = []}) {

    let arr = []

    let str_topic_and_friends = topic.map(o => `#${o.cha_name}`).join(" ") + " " + friends.map(o => `@${o.nickname}`).join(" ")
    const text = title + " " + discribe + str_topic_and_friends
    const caption = discribe + "" + str_topic_and_friends
    // console.log(`text---:`, text)
    // console.log(`caption---:`, caption)


    //  拼接话题
    for (let i = 0; i < topic.length; i++) {
        let ele = topic[i]
        let ele_flag = "#" + topic[i].cha_name
        let start = text.lastIndexOf(ele_flag)
        let end = text.lastIndexOf(ele_flag) + ele_flag.length
        let caption_start = caption.lastIndexOf(ele_flag)
        let caption_end = caption.lastIndexOf(ele_flag) + ele_flag.length

        let obj = {"hashtag_name": ele.cha_name, "hashtag_id": ele.cid, "user_id": "", start, end, caption_start, caption_end, type: 1}
        arr.push(obj)
    }
    //  拼接好友
    for (let i = 0; i < friends.length; i++) {
        let ele = friends[i]
        let ele_flag = "@" + friends[i].nickname
        let start = text.lastIndexOf(ele_flag)
        let end = text.lastIndexOf(ele_flag) + ele_flag.length
        let caption_start = caption.lastIndexOf(ele_flag)
        let caption_end = caption.lastIndexOf(ele_flag) + ele_flag.length
        let obj = {"hashtag_name": "", "hashtag_id": 0, "user_id": ele.uid, start, end, caption_start, caption_end, type: 0}
        arr.push(obj)
    }


    return {"caption": caption, "text": text, "text_extra": JSON.stringify(arr),}
}

//
// // 测试例子2
// title = "标题333333333333"
// discribe = "描述33333333333333"
// topic = [{"cha_name": "软件开发", "view_count": 2472739801, "cid": 1600877663389704, "group_id": "6539120282265720072", "tag": 0},] //话题-抖音的格式
// friends = [{"nickname": "衣服2", "uid": "1225333418501179",}]
// // friends = []
// result = tool_make_form_text_extra({title, discribe, topic, friends})
// console.log(`result---:`, result)
//
// 原数据
// "[{\"start\":31,\"end\":36,\"type\":1,\"hashtag_name\":\"软件开发\",\"hashtag_id\":1600877663389704,\"user_id\":\"\",\"caption_start\":16,\"caption_end\":21},
// {\"start\":37,\"end\":41,\"type\":0,\"hashtag_name\":\"\",\"hashtag_id\":0,\"user_id\":\"1225333418501179\",\"caption_start\":22,\"caption_end\":26}]"



// [{"start":32,"end":37,"type":1,"hashtag_name":"软件开发","hashtag_id":1600877663389704,"user_id":"","caption_start":17,"caption_end":22},
//  {"start":38,"end":42,"type":0,"hashtag_name":"","hashtag_id":0,"user_id":"1225333418501179","caption_start":23,"caption_end":27}]