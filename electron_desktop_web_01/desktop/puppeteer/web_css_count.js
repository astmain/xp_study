module.exports = async function web_css_count({desc, css, element_length, range_num = 20}) {


    for (let i = 0; i < element_length * range_num; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        let get_success_length = await this.page.evaluate((css) => document.querySelectorAll(css)?.length, css)
        console.log(`等待:${desc}`, get_success_length, "/", element_length)
        if (get_success_length === element_length) {
            console.log(`成功:${desc}`, get_success_length, "/", element_length)
            break
        }
        if (i === element_length * range_num - 1) {
            console.log(`报错:${desc}--超时`, get_success_length, "/", element_length)
            throw new Error(`报错:${desc}--超时`)
        }
    }
}



