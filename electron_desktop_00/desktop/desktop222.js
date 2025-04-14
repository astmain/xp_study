desktop()

async function desktop() {
    await require("./mainWindow")
    // await require("./listener/listener")
    // run_service()

}


function run_service() {
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const service = express()
    service.use('/static', express.static('static')) //设置静态文件目录
    service.use(cors({origin: '*', methods: '*', allowedHeaders: '*'})) //跨域设置
    service.use(bodyParser.json())
    // 路由 ======================================================
    service.use(require('./router/index'))
    // service.use(require('./router/tb_account'))
    // service.use(require('./router/tb_collect'))
    // service.use(require('./router/tb_history'))
    service.use(require('./router/ipc'))
    service.use(require('./router/axios_config'))
    // service.use(require('./router/douyin/video_publish'))
    // service.use(require('./router/douyin/api_img/main'))
    // service.use(require('./router/xhs/api_img_text'))


    service.listen(5566, () => {
        console.log(`
		本地 ==============================
		http://127.0.0.1:5566/index
		http://127.0.0.1:5566/index?name=小许&age=18
		数据接口
		http://127.0.0.1:5566/tb_collect/list
		http://127.0.0.1:5566/tb_history/list
		http://127.0.0.1:5566/tb_history/create
  `)
    })
}


