// console.log(Make_File_obj("C:\\Users\\Administrator\\Desktop\\000.mp4"))

function Make_File_obj(filePath) {
    // 引入库
    const fs = require('fs')
    const path = require('path')
    const mime = require('mime-types')

    // 基础数据
    const buff = fs.readFileSync(filePath)
    const file_type = mime.lookup(filePath)
    const blob = new Blob([buff], {type: file_type})
    const name=path.basename(filePath)
    // console.log('🚀 blob         :', blob   )
    const file = new File([blob], name, {type: file_type, lastModified: Date.now(), webkitRelativePath: ""});
    // console.log('🚀 file         :', file   )
    return file

}


module.exports = Make_File_obj