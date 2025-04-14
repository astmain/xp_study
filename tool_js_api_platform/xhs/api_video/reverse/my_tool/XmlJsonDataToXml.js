

// const jsonData = [{
//     "ETag": "b4ab76bcf16f9dd39c21ff977ad8c3ee", "PartNumber": 1
// }, {
//     "ETag": "158a2a6f7665bfbdaa5acbb8591c2afa", "PartNumber": 2
// }, {
//     "ETag": "f8c12737403c8f50cb3bab34f2f7462f", "PartNumber": 3
// }];
//
//
// console.log(`111      : `, XmlJsonDataToXml("CompleteMultipartUpload", jsonData))

module.exports = XmlJsonDataToXml
function XmlJsonDataToXml(rootName, jsonData,) {
    const xml2js = require('xml2js');
    // 创建 XML 构造对象
    const builder = new xml2js.Builder({
        // rootName: 'CompleteMultipartUpload',
        rootName: 'CompleteMultipartUpload', headless: true, renderOpts: {
            pretty: true
        }
    });

    // 转换 JSON 为 XML
    const xml = builder.buildObject({Part: jsonData});

    // 输出结果
    // console.log(xml);
    return xml

}