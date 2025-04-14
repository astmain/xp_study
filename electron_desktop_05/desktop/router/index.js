const express = require('express')
const router = express.Router()
module.exports = router

router.get('/index', async (req, res, next) => {
	console.log('请求接口---:', '/index')
	console.log('请求参数---:', req.query)
	let result = {code: 200, msg: '成功:请求接口/index', data: {params: req.query}}
	console.log('响应结果---:', JSON.stringify(result))
	res.json(result)
})
