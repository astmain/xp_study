const yup = require('yup');
const fs = require('fs');





// 示例使用
const rule = yup.object({
    imgs_path: yup.array().of(yup.string().label("图片路径").test('path_exists', '文件不存在', (path_file) => fs.existsSync(path_file))),


})


async function main() {
    // let form_data = {imgs_path: ["C:\\Users\\Administrator\\Desktop\\1121.png"]}
    let form_data = {imgs_path: [111]}

    let form_check = await require("./form_yup_validator").check({rule, data:form_data})
    console.log(`form_check---:`, form_check)

}

main()


