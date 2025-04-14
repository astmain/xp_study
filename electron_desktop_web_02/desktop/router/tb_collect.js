const router = require('express').Router()
const {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()
const _ = require('yup')
module.exports = router
let tb_name = "tb_collect"

let rule = _.object({
    "name": _.string().min(1).max(999999), //
    "url": _.string().min(1).max(999999),//
    "label": _.string().min(1).max(999999),//
    "keyword": _.string().min(0).max(999999), //
    // "id":_.number().strict().integer().min(1), //
    "id": _.number(), //
})

let rule_table = _.object({
    "id": _.number(), //
    "name": _.string().min(1).max(999999), //
    "url": _.string().min(1).max(999999),//
    "label": _.string().min(1).max(999999),//
})

router.get('/tb_collect/find_all', async (req, resp) => {
    // let list = await db[tb_name].findMany()
    // console.log(`req.query---:`,     req.query        )
    let form_check = await Form_check.check_resp({req, resp, data: req.query, rule: rule})
    if (!form_check.success) return resp.json(form_check)
    let keyword = req.query.keyword
    // console.log(`keyword---:`,     keyword        )
    let list = await db[tb_name].findMany({
        where: {
            // name: {contains: keyword},
            OR: [{name: {contains: keyword}}, {url: {contains: keyword}}, {label: {contains: keyword}}]
        }
    })
    // let list = await db[tb_name].findMany({
    // 	 where: {
    //             name: {
    //                 contains: keyword,
    //             },
    //         },
    // });
    let result = {code: 200, msg: `成功:查询`, url: url_decode(req.url), params: req.query, list}
    console.log(JSON.stringify(result))
    resp.json(result)
})


router.get('/tb_collect/create', async (req, resp) => {
    let form_check = await Form_check.check_resp({req, resp, data: req.query, rule: rule})
    if (!form_check.success) return resp.json(form_check)
    let one = await db[tb_name].create({data: req.query})
    let result = {code: 200, msg: `成功:添加`, url: url_decode(req.url), params: req.query, one}
    console.log(JSON.stringify(result))
    resp.json(result)
})


router.get('/tb_collect/delete_one', async (req, resp) => {
    let form_check = await Form_check.check_resp({req, resp, data: req.query, rule: rule})
    if (!form_check.success) return resp.json(form_check)
    let id = Number(req.query.id)
    console.log(`111---:`, id, typeof id)
    await db[tb_name].delete({where: {id: id}})
    let result = {code: 200, msg: `成功:删除`, url: url_decode(req.url), params: req.query, id}
    console.log(JSON.stringify(result))
    resp.json(result)
})


router.post('/tb_collect/update_one', async (req, resp) => {
    let form_check = await Form_check.check_resp({req, resp, data: req.body, rule: rule_table})
    if (!form_check.success) return resp.json(form_check)
    const one = await db[tb_name].update({where: {id: req.body.id}, data: req.body})
    let result = {code: 200, msg: `成功:更新`, url: url_decode(req.url), params: req.body, one}
    console.log(JSON.stringify(result))
    resp.json(result)
})


// router.get('/tb_history/create', async (req, resp) => {
// 	let one = await db.tb_history.create({data: {name: "111", url: "2222", time1: "111",}})
// 	let result = {code: 200, msg: `成功:请求接口${req.url}`, params: req.query, one}
// 	resp.json(result)
// })







