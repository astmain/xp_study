class Spider {
    //变量
    page = null         //当前页面
    browser = null      //浏览器对a象
    wind = null          //窗口


    // 构造函数
    constructor() {

    }


    //窗口启动
    run_chrome = require("./run_chrome")
    run_partition = require("./run_partition")

    // 其他操作
    web_goto = require("./web_goto")
    input_file = require("./input_file")
    input_text = require("./input_text")
    click = require("./click")
    css_wait_try = require("./css_wait_try")


}

module.exports = Spider

