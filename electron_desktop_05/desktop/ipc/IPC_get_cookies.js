const {ipcMain, session} = require("electron")

ipcMain.handle('IPC_get_cookies', async (event, {partition, url}) => {
    console.log("IPC_get_cookies--- {partition, url}:", {partition, url})
    const cookies = await session.fromPartition(partition).cookies.get({url: url})
    // console.log("IPC_get_cookies---cookies:", cookies)
    return cookies
})
