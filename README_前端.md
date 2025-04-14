http://mui.ucmed.cn/#/zh-CN/search



vue3
省略ref.value写法       https://www.jianshu.com/p/24dd9805b46b

# git

0.中文乱码问题
git config --global core.quotepath false  && git config --global i18n.commit.encoding utf-8 && git config --global i18n.logoutputencoding utf-8 &&  set LESSCHARSET=utf-8

0.克隆项目            git clone     git remote add origin https://e.coding.net/dtron/zidonghuayunhang/xu_peng.git

1.绑定文件            git init && git remote add origin https://e.coding.net/dtron/zidonghuayunhang/xu_peng.git

2.上传代码            echo "上传代码?"  &&    TIMEOUT /T 60  &&   echo "↑↑↑开始上传↑↑↑↑"  &&      git add . &&  git commit -m "许鹏:%date:~0,10% %time:~0,-3%"   &&  git push  -f   origin  master

4.下载代码            echo "下载代码?" && TIMEOUT /T 60  && echo "开始下载"  &&  git fetch --all && git reset --hard origin/master && git pull origin master


# 前端进阶【渡一教育】
https://www.bilibili.com/video/BV1ju4y127xX/?spm_id_from=333.788&vd_source=7c75d2128986ff3eb6425f362d305c25

# Vue 组件间通信六种方式
https://juejin.cn/post/6844903845642911752

# github访问问题
博客              https://zhuanlan.zhihu.com/p/107334179
文件夹路径       C:\Windows\System32\drivers\etc
hosts文件        140.82.114.4 github.com

# gitbase问题乱码问题
git config --global core.quotepath false
git config --global i18n.commit.encoding utf-8
git config --global i18n.logoutputencoding utf-8

# 必装插件_vscode

**Office Viewer(Markdown Editor)    笔记markdm**

prettier.config                                    格式化

**VSCode Great Icons**

Chinese (Simplified)

chat2DB          ai数据库

Cursor             ai代码分析

Debugger for Chrome      浏览器debugger 使用

Auto Rename Tag         标签闭合

Chinese(Simplified)   中文化

Code Runner           运行代码

Live Server           本机服务打开html

Better Comments       代码颜色注释      https://blog.csdn.net/weixin_44586544/article/details/111500151

Vetur   代码格式化

Element UI Snippets     饿了么    代码片段

JavaScript(ES6) code snippets           es6_js代码提示

VSCode Great Icons                  文件图标文件

Bracket Pair Colorizer               括号闭合标签()

Npm Intellisense                   npm 带入标签

Office Viewer(Markdown Editor)      看excel文件  查看markdown

IntelliCode API Usage Examples                         代码例子自动提示

import cost      导入文件大小

打印插件      dot log  aaa.log 打印插件

dot log        打印插件

wrap console log   打印插件   设置键盘 Wrap prefix console log        打印插件  https://www.bilibili.com/video/BV13G411x7Nx

Template String Converter  /  / js$插槽插件     https://www.bilibili.com/video/BV1WG411x7VU/

Color Highlight  超好用插件        "todohighlight.keywords":[ { "text": "关键词",  "color": "red", "backgroundColor": "rgb(30, 30, 30)",}]

# 注释规范

博客 https://blog.csdn.net/u012338130/article/details/114360488

| @function    | @function 简要描述                        | 用于定义当前对象是一个函数，后面可跟描述 | @function 处理表格的行                       |
| ------------ | ----------------------------------------- | ---------------------------------------- | -------------------------------------------- |
| @description | @description 描述信息                     | 用于描述                                 | @description 合并Grid的行                    |
| @param       | @param 参数名 {参数类型} 描述信息         | 描述参数的信息                           | @param name {String} 传入名称                |
| @return      | @return {返回类型} 描述信息               | 描述返回值的信息                         | @return {Boolean} true:可执行;false:不可执行 |
| @author      | @author 作者信息 [附属信息：如邮箱、日期] | 描述此函数作者的信息                     | @author 张三 2015/07/21                      |
| @version     | @version XX.XX.XX                         | 描述此函数的版本号                       | @version 1.0.3                               |
| @example     | @example 示例代码                         | 演示函数的使用                           | @example setTitle(‘测试’)                  |

# jq模糊语法

jq("div[name^='aa']")               开头
jq("div[name$='aa']")               结尾
jq("div[id*='aa']")                 包含
.tab:nth-child(2)                   第2个元素

# dayjs日期

npm install dayjs --save       https://dayjs.fenxianglu.cn/category/

dayjs('2019-02').daysInMonth()                                              一个月多少天

dayjs().format()                                                                                 2020-09-08T13:42:32+08:00

dayjs().format('YYYY-MM-DD')                                                            2020-09-08

dayjs().format('YYYY-MM-DD HH:mm:ss')                                          2020-09-08 13:47:12

dayjs(1318781876406).format('YYYY-MM-DD HH:mm:ss')                 2011-10-17 00:17:56

dayjs(1318781876406).format('YYYY-MM-DD_HH:mm:ss>ms')        2011-10-17_00:17:56>1756

dayjs("2021-09-17").subtract(1, "day").format('YYYY-MM-DD')           //日期减去 1 日   //  minute

console.log(dayjs('2021-10-19').diff('2021-10-18','day'))                     日期相减去

dayjs().unix()                                                                                           秒   时间戳     1667960192

dayjs().valueOf()                                                                                      毫秒  时间戳  1667960192755

比较时间博客

https://blog.csdn.net/qq_34402069/article/details/125525767

# css动画

动画库推荐                  https://blog.csdn.net/ailusummer/article/details/83988946

    http://www.htmleaf.com/css3/css3donghua/201708304712.html

    http://www.htmleaf.com/Demo/201708304713.html

    https://github.com/Martz90/vivify

css动画        Vivify       https://github.com/Martz90/vivify  http://vivify.mkcreative.cz/

# 可视化echarts
ecahrts中文官网              https://echarts.apache.org/examples/zh/index.html#chart-type-bar
chartlib资源网                 http://chartlib.datains.cn/echarts
echarts_category社区     https://www.makeapie.cn/echarts_category/series-bar_2.html
isqqw  echart集合           https://www.isqqw.com/?t=bar                  1311192345@qq.com        uuuuuu123456U.
PPChart                           http://ppchart.com/#/              很好看
pink老师教程                   https://www.bilibili.com/video/BV1v7411R7mp/?p=26
黑马教程                       https://www.bilibili.com/video/BV1bh41197p8?p=5
柱状单色不错                    https://www.makeapie.cn/echarts_content/xBkTMbWLYM.html

# excel

数据格式         https://blog.csdn.net/qq_40549954/article/details/121035166

raw:          使用原始值 (true) 或格式化字符串 (false)  （默认值：true）
dateNF: 在字符串输出中使用指定的日期格式（默认值：FMT 14）
defval:    使用指定值代替 null 或 undefined （）
blankrows: 在输出中包含空行**（默认值：** ）
range:

    (number)使用工作表范围，但将起始行设置为值

    (String)使用指定范围（A1 样式的有界范围字符串

    (default)使用工作表范围 ( worksheet[‘!ref’])

header:

    1: 生成数组数组（“二维数组”）

    "A".行对象键是文字列标签

    array of strings: 使用指定的字符串作为行对象中的键

    (default): 将第一行作为键读取并消除歧义1

# Luckysheet+Luckyexcel

luckysheet教程       https://www.hangge.com/blog/cache/detail_3163.html

# vite教程

vite打包视频教程     https://www.bilibili.com/video/BV1GN4y1M7P5/?p=27

vite官网                  https://cn.vitejs.dev/plugins/

插件api_通用钩子    https://cn.vitejs.dev/guide/api-plugin

强缓存

协商缓存

分包策略:固定的文件不编译,常用文件编译

# es新语法

 ES5-ES11语法        https://blog.csdn.net/vh_YUNYANGYUMO/article/details/121293771

# nvm node版本管理工具
教程_全栈码叔         https://www.bilibili.com/video/BV1pN4y1z73n
教程_博客               https://juejin.cn/post/7316447817161572387
中文官网                 https://www.nuxtjs.cn/guide/installation
npm全局镜像          npm config set registry  http://npmmirror.com/                      npm config set registry    http://mirrors.cloud.tencent.com/npm/
npm当前镜像源      npm config get registry
npm清除缓存          npm cache verify   或者      npm cache clean --force
安装问题                 C:\Windows\System32\drivers\etc\hosts           添加代码        185.199.108.133 raw.githubusercontent.com
npm i
nvm ls available         https://nodejs.org/dist/
nvm list
nvm install 18.17.0
nvm install 16.19.1
nvm install 18.19.0
nvm uninstall 18.19.0
nvm use 18.17.0
nvm use 16.19.1

# nuxt3
教程_帝莎编程        https://www.bilibili.com/video/BV1Zt4y187EV?p=3
教程_黑马编程        https://www.bilibili.com/video/BV1b94y1x7Xi/
npx create-nuxt-app nnn
npx create-nuxt-app 222
vue init nuxt-community/stater-template 项目名称
安装失败没办法 只好克隆项目   https://www.dianjilingqu.com/677959.html
git clone -b v3 https://github.com/nuxt/starter.git
git clone -b v3 https://github.com/nuxt/starter.git
# 用hapi.js mysql和nuxt.js(vue ssr)开发仿简书的博客项目
http://www.javashuo.com/article/p-paebbpdl-k.html
# 低代码
https://www.bilibili.com/video/BV1Qc411s7dc/
https://www.bilibili.com/video/BV1Qc411s7dc/?p=2    45分钟
https://www.bilibili.com/video/BV1Qc411s7dc?p=6
https://www.bilibili.com/video/BV1Qc411s7dc/?p=7       0
https://www.bilibili.com/video/BV1Qc411s7dc?p=1   48分钟

# 小鹿线前端开发

前端面试题                     https://www.bilibili.com/video/BV15z4y1a7MN?p=56

CRM管理系统                 https://space.bilibili.com/669742546/channel/collectiondetail?sid=1407804

uniapp商城支付项目       https://www.bilibili.com/video/BV1eT411b72H?p=64

vue3上传支付项目           https://www.bilibili.com/video/BV1Ea4y137CE?p=62

# nodejs路径
let a0 = process
let a1 = process.execPath
let a2 = __filename
let a3 = __dirname
let a4 = process.cwd()
let a5 = path.dirname(__dirname)
let a6 = path.resolve(__filename, '../../../') 

# 模块导出导入      commonjs  导入ES
/*
////      commonjs  导入ES规范nodejs运行时             let aaa = require('./aaa')
module.exports = 1111;//这个比较好用commonjs规范
module.exports = {bbb: 2222};
exports.aaa = '111';
exports.getRemoteDebuggingPort =function (){
  
}




//// __esModule    对应导入     let {aaa} = require('./aaa')      import {aaa} from './aaa';
export default "__esModule";

export function aaa(x, y) {
	return x + y;
}

let aaa = 222;
export default aaa;


# 表单校验schema规范
Ajv                  很好用使用的是schema.json规范校验             (https://ajv.js.org/)
yup                  搭配 formik可以vue,react
validator.js         很原始的校验方式

*/
