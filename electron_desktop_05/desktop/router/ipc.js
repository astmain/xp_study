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


router.post('/ipc/clear_cookies', async (req, resp) => {
    let {partition, url} = req.body
    console.log(`/ipc/clear_cookies---`, {partition, url})
    await session.fromPartition(partition).cookies.clear({url: url})
    resp.send(true)
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

router.post('/ipc/set_cookies', async (req, resp) => {
    const {partition, url, cookies} = req.body
    let result = {code: 200, msg: `成功:set_cookies`, error_info: ""}
    let error_info = []
    for (let i = 0; i < cookies.length; i++) {
        let item = cookies[i]
        let ele = {url, ...item}
        try {
            await session.fromPartition(partition).cookies.set(ele)
        } catch (error) {
            console.error(`异常:set_cookies---ele`, ele)
            error_info.push(ele)
            result = {code: 201, msg: `异常:set_cookies`, partition, url, cookies, error_info}
        }
    }
    resp.send(result)
})


// router.post('/ipc/set_cookies', async (req, resp) => {
//     const {partition, url, cookies} = req.body
//     let result = {code: 200, msg: `成功:set_cookies`, error_info: ""}
//     let error_info = []
//     for (let i = 0; i < cookies.length; i++) {
//         let item = cookies[i]
//         let ele = {url, name: item.name, value: item.value}
//         try {
//             await session.fromPartition(partition).cookies.set(ele)
//         } catch (error) {
//             console.error(`异常:set_cookies---ele`, ele)
//             error_info.push(ele)
//             result = {code: 201, msg: `异常:set_cookies`, partition, url, cookies, error_info}
//         }
//     }
//     resp.send(result)
// })


router.get('/ipc/app_restart', async (req, resp) => {
    app.relaunch()
    app.exit(0)
})













