const Router = require('express')
const router = new Router()
const personalDateController = require('../controller/personalDate.controller')

router.post('/personalDate-create', personalDateController.createPersonalDate)

module.exports = router