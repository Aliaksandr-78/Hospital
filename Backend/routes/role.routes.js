const Router = require('express')
const router = new Router()
const roleController = require('../controller/role.controller')
router.get('/role-full', roleController.getRole)
router.put('/role', roleController.updateRole)
router.get('/role-name/:user_id', roleController.nameRole)
module.exports = router