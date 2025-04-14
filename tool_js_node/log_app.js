const pino = require('pino');
const fs = require('fs');
const path = require('path');
const pretty = require('pino-pretty');
const util = require('util');
const fs_ex = require('fs-extra');


// 自定义时间戳格式化函数
function formatTimestamp() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');

	// return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; //时间格式 "2024-10-01 08:08:08" 
	return `${hours}:${minutes}:${seconds}`; // 时间格式            "08:08:08" 
}




const path_file = 'C:\\Users\\Administrator\\Desktop\\log\\log_app.log'


if (fs.existsSync(path_file)) {
	console.log("有存在")


} else {
	console.log("不存在")
	// fs.writeFileSync(path_file, '') //判断文件是否存在,如果不存在就创建文件(可能会报错)
	// 确保文件存在，若文件所在目录不存在会自动创建
	fs_ex.ensureFileSync(path_file);

}





const logStream = fs.createWriteStream(path_file, { flags: 'a' });


const prettyStream = pretty({
	colorize: true,
	translateTime: 'yyyy-mm-dd HH:MM:ss', // 使用预定义格式
	messageFormat: '{time} {msg}', // 只显示消息内容
	ignore: 'pid,hostname,level' // 忽略这些字段
});





logger = pino({
	level: 'info',
	level: 'info',
	base: null, // 移除默认的 pid 和 hostname
	timestamp: () => `,"time":"${formatTimestamp()}"`, // 自定义时间戳格式
	// formatters: { level: () => ({}) },// 完全移除 level 字段
}, pino.multistream([
	{ stream: prettyStream },
	{ stream: logStream }
]))










globalThis.log_app = function(...args) {
	let message = args.map(arg => {
		if (typeof arg === 'object' && arg !== null) {
			// 使用 util.inspect 来格式化对象，保持原始格式
			return util.inspect(arg, { colors: false, depth: null });
		} else {
			return String(arg);
		}
	}).join(' ')


	message = message.replace(",", "");
	console.log(message)
	logger.info(message);


}




// log_app('1消息', '2消息', { aaa: 111 }, pretty)
// log_app('1消息', '2消息', { aaa: 111, bbb: "," })