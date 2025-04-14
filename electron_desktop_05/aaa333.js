const yup = require('yup');
const fs = require('fs');

// 自定义 yup 验证规则
const fileExists = yup.string().test('file-exists', '文件不存在', (value) => {
    try {
        return fs.existsSync(value);
    } catch (error) {
        return false;
    }
});

// 示例使用，修改 schema 以验证 imgs_path 数组
const schema = yup.object({
    imgs_path: yup.array().of(fileExists)
});

const validateFilePath = async (data) => {
    try {
        await schema.validate(data);
        console.log('所有文件路径有效');
    } catch (error) {
        console.log(error.message);
    }
};

// 测试数据
let form_data = { imgs_path: ["C:\\Users\\Administrator\\Desktop\\1112.png"] };
validateFilePath(form_data);
