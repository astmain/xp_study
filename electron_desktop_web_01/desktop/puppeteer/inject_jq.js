const path = require("path");
const {app} = require("electron");
const fs = require("fs");
// 像页面注入jq
module.exports = async function inject_jq() {
    // 拼接jq路径
    const jq_path = path.join(app.indexDir, 'static/js/jq.js')
    // 判断jq路径是否存在
    const exists = fs.existsSync(jq_path);
    if (exists === false) throw new Error("jq依赖包文件不存在")

    // 读取文件jq的内容
    let jq_text = fs.readFileSync(jq_path, 'utf8')
    //// 使用addScriptTag没办法注入jq
    await this.page.addScriptTag({path: jq_path})
    await this.page.evaluate((jq_text) => {
        //// 使用创建script便签_在知乎没有办法注入js
        // let script = document.createElement("script")
        // script.className = "jq_text"
        // script.innerHTML = jq_text
        // document.querySelector("head").appendChild(script)

        //// 使用eval可以注入jq
        window.jq_text = jq_text
        eval(window.jq_text)
    }, jq_text)
    // await new Promise((resolve) => setTimeout(resolve, 2 * 1000))


}



