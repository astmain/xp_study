module.exports = async function input_file({desc, css, files = [], timeout = 10 * 1000}) {

    try {
        let element = await this.page.waitForSelector(css, {timeout: timeout})
        if (Object.prototype.toString.call(files) === '[object Array]') {
            await element.uploadFile(...files)
        } else if (Object.prototype.toString.call(files) === '[object String]') {
            await element.uploadFile(files)
        } else {
            throw new Error(`报错:input_file---file---数据异常`)
        }


        console.log(`成功:`, {desc, css, files}, "---input_file")
        return element
    } catch (error) {
        console.error(`报错:${desc}`, `input_file-error:`, error)
        throw new Error(`报错:${desc}`)
    }
}