const {app, session} = require("electron")
const router = require('express').Router()
const _ = require('yup')
module.exports = router


router.get('/ipc/get_cookies', async (req, resp) => {
    let {partition, url} = req.query
    console.log(`/ipc/get_cookies---{partition, url}`, {partition, url})
    const cookies = await session.fromPartition(partition).cookies.get({url: url})
    resp.json(cookies)
})


router.get('/ipc/get_cookies_str', async (req, resp) => {
    let {partition, url} = req.query
    console.log(`/ipc/get_cookies---`, {partition, url})
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
    resp.send(cookies_str)
})


router.get('/ipc/app_restart', async (req, resp) => {
    app.relaunch()
    app.exit(0)
})













