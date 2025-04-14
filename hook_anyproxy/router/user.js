// 1
const express = require('express')
const router = express.Router()

// 2
router.get('/user/list', (req, res) => {
    res.send('list')
})



router.post('/user/add', (req, res) => {
    res.send('add')
})

// 3
module.exports = router