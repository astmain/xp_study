const pino = require('pino');
const fs = require('fs');
const path = require('path');
const pretty = require('pino-pretty');




const logStream = fs.createWriteStream('C:\\Users\\Administrator\\Desktop\\log\\log_app.log', { flags: 'a' });


const prettyStream = pretty({
    colorize: true,
    translateTime: 'SYS:standard',
    messageFormat: '{msg}', // 只显示消息内容
    ignore: 'pid,hostname,level' // 忽略这些字段
});





logger = pino({
    level: 'info',
    level: 'info',
    base: null, // 移除默认的 pid 和 hostname
    timestamp: false,// 如果也不想要时间戳，可以设为 false
    formatters: { level: () => ({}) },// 完全移除 level 字段



}, pino.multistream([
    { stream: prettyStream },
    { stream: logStream }
]))







// logger.info('这是第一条消息', '这是第二条消息');// '这是第二条消息'没有打印到日志中






// globalThis.  log_app = function (...args) {
//     const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
//     logger.info(message)
// }

const util = require('util');
globalThis.log_app = function (...args) {
    const message = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
            // 使用 util.inspect 来格式化对象，保持原始格式
            return util.inspect(arg, { colors: false, depth: null });
        } else {
            return String(arg);
        }
    }).join(' ');
    logger.info(message);


}




log_app('这是第一条消息', '这是第二条消息', { aaa: 111 }, pretty)
log_app('这是第一条消息', '这是第二条消息', { aaa: 111 })
// 希望不要level


