const {ipcMain, session} = require("electron")

ipcMain.handle('IPC_get_cookies_str', async (event, {partition, url}) => {
    // console.log("IPC_get_cookies_str---{persist, url}:",  {partition, url})
    let cookies = await session.fromPartition(partition).cookies.get({url: url})
    let cookies_str = ""
    if (Object.prototype.toString.call(cookies) === '[object Array]') {
        for (let i = 0; i < cookies.length; i++) {
            let ele = cookies[i]
            cookies_str += ele.name + "=" + ele.value + "; "
        }
    } else {
        throw new Error('函数cookie_arr_to_str的参数必须是数组对象');
    }

    return cookies_str
})
