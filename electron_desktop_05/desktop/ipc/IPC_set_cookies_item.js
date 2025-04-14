const {ipcMain, session} = require("electron")

ipcMain.handle('IPC_set_cookies_item', async (event, {partition, url, item}) => {
	item = {...item, url}
	console.log(`IPC_set_cookies_item---item:`, item)
	
	session.fromPartition(partition).cookies.set(item).then(res => {
		console.log(`成功:IPC_set_cookies---item模式`, JSON.stringify(item))
	}).catch(error => {
		console.error(`失败:IPC_set_cookies---item模式`, item, error)
	})
	
	
	return true
})
