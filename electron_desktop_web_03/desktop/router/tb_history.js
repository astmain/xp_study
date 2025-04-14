const router = require('express').Router()
const {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()
const _ = require('yup')
module.exports = router
router.get('/tb_history/list', async (req, resp) => {
	let list = await db.tb_history.findMany()
	let result = {code: 200, msg: `成功:请求接口${req.url}`, params: req.query, list}
	resp.json(result)
})


router.get('/tb_history/create', async (req, resp) => {
	// await form_check.check_resp({req, resp, data: req.query, rule: _.object({"name": _.string().min(1).max(20).required(), "url": _.string().min(1).max(1000).required()}),})
	let one = await db.tb_history.create({data: req.query})
	let result = {code: 200, msg: `成功:请求接口${req.url}`, params: req.query, one}
	resp.json(result)
})


// router.get('/tb_history/create', async (req, resp) => {
// 	let one = await db.tb_history.create({data: {name: "111", url: "2222", time1: "111",}})
// 	let result = {code: 200, msg: `成功:请求接口${req.url}`, params: req.query, one}
// 	resp.json(result)
// })







