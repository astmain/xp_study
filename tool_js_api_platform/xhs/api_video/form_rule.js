const _ = require('yup')
const fs = require("fs")

// 表单校验规则
let form_rule = _.object({
    'title': _.string().min(0).max(20).required(), //
    'content': _.string().min(0).max(1000).required(), //


    "videos_path": _.array().of(_.string().test('path_exists', '文件不存在', (path_file) => fs.existsSync(path_file)).required()),//
    "covers_path": _.array().of(_.string().test('path_exists', '文件不存在', (path_file) => fs.existsSync(path_file)).required()),//
    "videos_duration": _.array().of(_.number().strict().required()),//

    'topic': _.array().of(_.object({
        name: _.string().min(1), //
        id: _.string().min(1), //
        link: _.string().min(1), //
    })),


    'ats': _.array().of(_.object({
        nickname: _.string().min(1), //
        user_id: _.string().min(1), //
    })),

    'address': _.object({
        name: _.string().min(1), //
        poi_id: _.string().min(1), //
        poi_type: _.number().strict(), //
        subname: _.string().min(1), //
    }),


})
module.exports = form_rule


