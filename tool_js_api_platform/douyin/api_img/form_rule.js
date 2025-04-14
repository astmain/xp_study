const _ = require('yup')
const fs = require("fs");
// 表单校验
const form_rule = _.object(
    {
        // 字符
        "title": _.string().min(1).max(20),//
        "content": _.string().min(1).max(1000),//
        "hot": _.string().min(0).max(100),//
        // 枚举
        "download": _.string().oneOf(["0", "1"]),//
        "visibility_type": _.string().oneOf(["0", "1", "2"]),//

        // 字典
        "music": _.object({
            name: _.string().min(1), //
            music_id: _.string().min(1), //
        }),

        "collection": _.object({
            mix_name: _.string().min(1), //
            mix_id: _.string().min(1), //
            mix_order: _.string().min(1), //
        }),
        "address": _.object({
            poi_name: _.string().min(1), //
            poi_id: _.string().min(1).max(50),//
        }),


        // 数组字典
        // "imgs_path": _.array().of(_.string().min(1).matches(/^(?:[a-zA-Z]:[\\/]|\/)[a-zA-Z0-9\\/._-]+$/, '文件路径错误').required()).required(),//
        "imgs_path": _.array().of( _.string().test('path_exists', '文件不存在', (path_file) => fs.existsSync(path_file))).required(),//


        "topic": _.array().max(5).of(_.object({
            name: _.string().min(1), //
            id: _.number().strict(), //
        })),

        "activate": _.array().of(_.object({
            name: _.string().min(1), //
            id: _.number().strict(), //
        })),

        "at_friend": _.array().of(_.object({
            name: _.string().min(1), //
            id: _.string().min(1), //
        })),


    })

module.exports = form_rule