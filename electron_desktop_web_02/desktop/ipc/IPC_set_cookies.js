const {ipcMain, session} = require("electron")

ipcMain.handle('IPC_set_cookies', async (event, {partition, url, cookies}) => {
	console.log(`IPC_set_cookies---{partition, url, cookies}:`, {partition, url, cookies})
	for (let i = 0; i < cookies.length; i++) {
		let item = cookies[i]
		item = {url: url, name: item.name, value: item.value}
		console.log(`111---url:`, item.url)
		session.fromPartition(partition).cookies.set(item).then(res => {
			console.log(`成功:IPC_set_cookies---arr模式`,   JSON.stringify(    item    )     )
		}).catch(error => {
			console.error(`失败:IPC_set_cookies---arr模式`,  item, error)
		})
	}
	
	
	return true
})
