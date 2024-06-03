const Router = require('express')
const router = new Router()
const doctorController = require('../controller/doctor.controller')

router.post('/doctor-create', doctorController.createDoctor)
router.get('/doctor-full', doctorController.getDoctor)
router.get('/doctor/:id', doctorController.getOneDoctor)
router.get('/doctor-user/:id_user', doctorController.getDoctorToUser)
router.get('/doctor-check/:id', doctorController.checkDoctor)
router.get('/doctor-name/:id_doctor', doctorController.getDoctorNameToId)
router.put('/doctor-change', doctorController.updateDoctor)
router.delete('/doctor-delete/:id', doctorController.deleteDoctor)
router.get('/region-doctor', doctorController.regionDoctor)


module.exports = router