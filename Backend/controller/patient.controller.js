const db = require('../db')
class PatientController {
    async createPatient(req, res) {
        const {name, surname, gender, birthday_data, address, id_user, region_number} = req.body
        const newPatient = await  db.query(
            `INSERT INTO patients(name, surname, gender, birthday_data, address, created, changed, id_user, region_number) VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6, $7) RETURNING *`,
            [name, surname, gender, birthday_data, address, id_user, region_number]
        )
        res.json(newPatient.rows[0])
    }
    async getPatient(req, res) {
        const patients = await db.query(`SELECT * FROM patients`)
        res.json(patients.rows)
    }
    async getOnePatient(req, res) {
        const id = req.params.id
        const patients = await db.queru(`SELECT * FROM patients where id = $1`, [id])
        res.json(patients.rows[0])
    }
    async updatePatient(req, res) {

    }
    async deletePatient(req, res) {
        const id = req.params.id
        const patients = await db.queru(`DELETE FROM patients where id = $1`, [id])
        res.json(patients.rows[0])
    }
    async patientForUser(req, res){
        const id_user = req.params.id_user
        const patient = await db.query(`SELECT * FROM patients WHERE id_user = $1`, [id_user])
        res.json(patient.rows[0])
    }
    async getPatientNameToId(req, res){
        const card_number = req.params.patient_card_number
        const doctor = await db.query(`SELECT name, surname FROM patients WHERE card_number = $1`, [card_number])
        res.json(doctor.rows[0])
    }

    //Получить количество визитов для каждого пациента Запросы с вычислениями и группировкой
    async colVisitPatient(req, res){
        const patients = await db.query(`SELECT* FROM visits GROUP BY patient_card_number`)
        res.json(patients.rows)
    }
}

module.exports = new PatientController()