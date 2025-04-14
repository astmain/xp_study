function XmlStringParse(xml_text) {
    // (async function f() {
    //     const xmlString = `<InitiateMultipartUploadResult><Bucket></Bucket><Key>spectrum/7hYaDuXH7qB6ZYe1R4KSNgaweR0H8PdC_Wfe6fAWIq2eNPQ</Key><UploadId>71B78186C8B7437FAB7D335D609A600B</UploadId></InitiateMultipartUploadResult>`;
    //     console.log(await XmlStringParse(xmlString))
    // })()
    const xml2js = require('xml2js');
    const parser = new xml2js.Parser({explicitArray: false});
    return new Promise((resolve, reject) => {
        parser.parseString(xml_text, (error, result) => {
            if (error) reject(error)
            resolve(result)
        });

    })
}


module.exports = XmlStringParse