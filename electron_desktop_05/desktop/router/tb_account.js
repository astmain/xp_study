const router = require('express').Router()
const {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()
const _ = require('yup')
module.exports = router
// 查询list
router.get('/tb_account/find_list', async (req, resp) => {
    let list = await db.tb_account.findMany()
    let result = {code: 200, msg: `成功:请求接口${req.url}`, params: req.query, list}
    resp.json(result)
})


// 删除id
router.get('/tb_account/delete_id', async (req, resp) => {
    let {id} = req.query
    const one = await db.tb_account.delete({where: {id: Number(id)}})
    let result = {code: 200, msg: `成功:删除`, url: req.url, params: req.query, one}
    resp.json(result)
})

// 保存one
router.post('/tb_account/save_one', async (req, resp) => {
    let {cookies_str, cookies, webview_name, partition, nickname, url, user_id, avatar, line} = req.body
    let body = {cookies_str, cookies: JSON.stringify(cookies), webview_name, partition, nickname, url, user_id, avatar, line}
    let one = {}

    try {
        one = await db.tb_account.upsert({
            where: {partition: partition}, //
            update: body,//
            create: body,//
        })
    } catch (error) {
        console.log(`111---222:`,     error        )
        one = await db.tb_account.create({data: body})
    }


    // try {
    //     one = await db.tb_account.update({
    //         where: {partition: partition}, //
    //         update: body,//
    //         create: body,//
    //     })
    // } catch (error) {
    //     one = await db.tb_account.create({data: body})
    // }
    let result = {code: 200, msg: `成功:存储${req.url}`, body: req.body, one}
    resp.json(result)
})






