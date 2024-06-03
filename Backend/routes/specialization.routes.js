const Router = require('express')
const router = new Router()
const specializarionController = require('../controller/specialization.controller')

router.post('/specialization-create', specializarionController.createSpecialization)
router.get('/specialization-full', specializarionController.getSpecialization)
router.put('/specialization-change', specializarionController.updateSpecialization)
router.delete('/specialization/:id', specializarionController.deleteSpecialization)

module.exports = router
