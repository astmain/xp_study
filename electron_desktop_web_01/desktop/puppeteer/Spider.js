class Spider {
    //变量
    page = null         //当前页面
    browser = null      //浏览器对a象
    WINDspider = null   //electron子窗口
    FuncBefore = []     //爬虫前置函数函数拦截器,适用场景检查实名认证,异常元素  ==>  todo 其实意思是，调用此类所有函数之前都会先执行一边这些函数 ！！


    // 构造函数
    constructor() {
        // 遍历方法名构造前置函数
        for (let methodName in this) {
            if (typeof this[methodName] === 'function') {
                // 包裹一层函数
                function wrapper(originalMethod) {
                    let Func = async function (...args) {
                        // 调用前置函数
                        for (let i = 0; i < this.FuncBefore.length; i++) await this.FuncBefore[i].apply(this, args)
                        const originResult = originalMethod.apply(this, args)  //调用类方法
                        return originResult
                    }
                    return Func
                }

                this[methodName] = wrapper(this[methodName])
            }
        }
    }

    // 关闭网页
    web_goto = require("./web_goto.js")
    web_close = require("./web_close.js")


    //启动窗口并页面跳转
    // start_wind_cookies = require("./start_wind_cookies.js")
    // start_wind_partition = require("./start_wind_partition.js")


    //点击方法
    web_click = require("./web_click.js")
    web_click_try = require("./web_click_try.js")
    web_click_allways = require("./web_click_allways.js")
    web_click_allways_check_success = require("./web_click_allways_check_success.js")

    //输入方法
    web_input_files = require("./web_input_files.js")
    web_input_text = require("./web_input_text.js")

    //等待元素
    web_wait_css = require("./web_wait_css.js")
    web_css_count = require("./web_css_count.js")
    web_wait_css_try = require("./web_wait_css_try.js")
    web_submit_check_success = require("./web_submit_check_success.js")
    web_wait_css_try_querySelectorAll = require("./web_wait_css_try_querySelectorAll.js")


    // 复制html到剪贴板
    web_clipboard_copy_html = require("./web_clipboard_copy_html.js")
    web_clipboard_paste = require("./web_clipboard_paste.js")

    // 悬浮元素
    web_hover = require("./web_hover.js")

    // 注入jq
    inject_jq = require("./inject_jq.js")


}

module.exports = Spider

