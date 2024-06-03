const Router = require('express')
const router = new Router()
const visitController = require('../controller/visit.conntroller')

router.post('/visit-create', visitController.createVisit)
router.get('/visit-full', visitController.getVisit)
router.get('/visit/:id', visitController.getOneVisits)
router.get('/visit-user/:patient_card_number', visitController.userVisit)
router.delete('/visit-delete/:id', visitController.deleteVisit)

module.exports = router
