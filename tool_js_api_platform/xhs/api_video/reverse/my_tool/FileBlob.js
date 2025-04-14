const fs = require('fs')            //导入模块fs
const mime = require('mime-types') // 地三方获取文件类型   npm i mime-types
function FileBlob(filePath) {
    //调用方式 console.log(`FileBlob      :`,     FileBlob('C:\\Users\\Administrator\\Desktop\\333.png')        )
    const buff = fs.readFileSync(filePath)
    const file_type = mime.lookup(filePath)
    const blob = new Blob([buff], {type: file_type})
    return blob
}


module.exports = FileBlob