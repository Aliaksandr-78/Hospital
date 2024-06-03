const Router = require('express')
const router = new Router()
const patientController = require('../controller/patient.controller')

router.post('/patient-create', patientController.createPatient)
router.get('/patient-full', patientController.getPatient)
router.get('/patient/:id', patientController.getOnePatient)
router.get('/patient-user/:id_user', patientController.patientForUser)
router.get('/patient-name/:patient_card_number', patientController.getPatientNameToId)
router.put('/patient', patientController.updatePatient)
router.delete('/patient/:id', patientController.deletePatient)
router.get('/patientVisit', patientController.colVisitPatient)


module.exports = router