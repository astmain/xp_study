const pino = require('pino');
const fs = require('fs');


// 创建logger
const stream = fs.createWriteStream('C:\\Users\\Administrator\\Desktop\\log\\log_app.log', {flags: 'a'});
const logger = pino(stream);
logger.info(111, 222)
logger.info({aaa: 111})


logger.info('这是第一条消息', '这是第二条消息');

// 全局参数log_app
// globalThis.log_app=logger.info
// log_app('这是一条记录到文件的信息日志')