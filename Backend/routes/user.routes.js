const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/login', userController.loginUser)
router.post('/user-create', userController.createUser)

router.get('/user-full', userController.getUser)
router.get('/user/:id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user-delete/:id', userController.deleteUser)
router.get('/role-user', userController.roleUser)


module.exports = router