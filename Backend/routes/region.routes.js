const Router = require('express')
const router = new Router()
const regionController = require('../controller/region.controller')

router.post('/region-create', regionController.createRegion)
router.get('/region-full',regionController.getRegions)
router.put('/region',regionController.updateRegion)
router.delete('/region/:id',regionController.deleteRegion)

module.exports = router