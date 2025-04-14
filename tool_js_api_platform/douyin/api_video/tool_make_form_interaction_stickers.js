module.exports = tool_make_form_interaction_stickers

function tool_make_form_interaction_stickers({interaction_stickers = {}}) {
    let result = [{
        "type": 24,//不确定
        "index": 0,//不确定
        "image_index": 0,//不确定
        "track_info": "[{\"scale\":0.8,\"x\":0.39,\"y\":0.22,\"r\":0,\"s\":0.8}]",//不确定
        "text_info": interaction_stickers.text, //确定
        "flash_mob_info": {
            "id": interaction_stickers.flash_mob_id, //确定
            "text": interaction_stickers.text,//确定
        }, //
    }]

    // console.log(`result---:`, result)
    return JSON.stringify(result)


    ////发布时 抖音表单的数据格式
    // [
    //     {
    //         "type": 24,
    //         "index": 0,
    //         "track_info": "[{\"scale\":0.8,\"x\":0.39,\"y\":0.22,\"r\":0,\"s\":0.8}]",
    //         "text_info": "你已经好久没有更新你的快乐了",
    //         "image_index": 0,
    //         "flash_mob_info": {
    //             "id": "fm7474802663448743225",
    //             "text": "你已经好久没有更新你的快乐了"
    //         }
    //     }
    // ]
}

// //例子
// interaction_stickers = {
//     "flash_mob_id": "fm7474802663448743225",//
//     "text": "你已经好久没有更新你的快乐了",//
//     "order": 1,//

// }
//
// result = tool_make_form_interaction_stickers({interaction_stickers})
// console.log(`result---:`, result)


