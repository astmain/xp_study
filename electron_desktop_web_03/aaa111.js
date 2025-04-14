const yup = require('yup');
const fs = require('fs');


// 示例使用
const rule = yup.object({
    imgs_path: yup.string().test('file-exists', '文件不存在', (value) => {

            // 自定义 yup 验证规则1
            try {
                return fs.existsSync(value);
            } catch (error) {
                return false;
            }

        }
    )


})


// // 测试
// validateFilePath('nonexistent_file.txt');
// validateFilePath('package.json');

let form_data={imgs_path:[11111111]}

require("./form_yup_validator").check({rule,form_data})

