/*

教程无界微前端
教程作者        小满zs
教程视频        https://www.bilibili.com/video/BV1tg4y1x75Q/?p=4
教程代码        https://github.com/message163/wujie-demo
其他博客详解    https://blog.csdn.net/michael_ouyang/article/details/138818382
其他博客详解    https://blog.csdn.net/u010707194/article/details/130203887
其他博客详解    https://blog.csdn.net/BradenHan/article/details/136519559


启动代码
pnpm  i --no-lockfile
pnpm -F main           dev
pnpm -F web01_sys      dev


本地pnpm    E:\AAA_node_nvm\nvm\v20.12.2
本地pnpm    E:\.pnpm-store
1

monnorepo   单一代码仓库：一种将多个项目或代码库存储在同一个版本控制系统中的策略，以便于跨项目协作和代码共享。
pnpm官网    https://www.pnpm.cn/cli/import
配置        pnpm-workspace.yaml


创建主应用   npm init vue    项目名称 main
创建子应用   cd web  
             npm init vite   项目名称 project_react
             npm init vite   项目名称 project_vue3

安装依赖     pnpm i
单独运行     pnpm -F project_react  dev


公共模块     cd any_tool 
             pnpm i axios
             导出公共模块



把公共模块添加到其他项目中
            pnpm -F admin add any_tool
            pnpm -F project_react add any_tool




无界微前端官网  https://wujie-micro.github.io/doc/guide/start.html   https://wujie-micro.github.io/doc/pack/




    "@vue-flow/background": "^1.3.0",
    "@vue-flow/controls": "^1.1.2",
    "@vue-flow/core": "^1.38.5",
    "@vue-flow/minimap": "^1.5.0",





安装教程  https://www.bilibili.com/video/BV1L2421K7bK/
npm i n8n -g
n8n
1时间触发每天晚上9点
Schedule Trigger
2触发数据源
Customer Datastore (n8n training)



工作流
camunda
https://www.bilibili.com/video/BV1qe4y1m7D7/
https://www.bilibili.com/video/BV1hN411Y7Qa/

*/


