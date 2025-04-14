const router = require('express').Router()
const {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()
const _ = require('yup')
module.exports = router
router.get('/tb_account/find_list', async (req, resp) => {
    let list = await db.tb_account.findMany()
    let result = {code: 200, msg: `成功:请求接口${req.url}`, params: req.query, list}
    resp.json(result)
})


router.post('/tb_account/create_one', async (req, resp) => {
    let {cookies_str, cookies, partition, url, nickname, user_id, avatar, line} = req.body
    let body = {cookies_str, cookies: JSON.stringify(cookies), partition, url, nickname, user_id, avatar, line}
    let one = {}
    try {
        one = await db.tb_account.upsert({
            where: {partition: partition}, //
            update: body,//
            create: body,//
        })
    } catch (error) {
        one = await db.tb_account.updateMany({
            where: {partition: partition}, data: body
        })
    }


    let result = {code: 200, msg: `成功:存储${req.url}`, body: req.body, one}
    resp.json(result)


})






