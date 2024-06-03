const db = require('../db')
const bcrypt = require("bcrypt");
class DoctorController {
    async createDoctor(req, res){
        const {name, surname, office, userId, specializationId, regionNumber} = req.body

        const newDoctor = await db.query(
            `INSERT INTO doctors(name, surname, office, id_user, id_specialization, created, changed, region_number) VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6) RETURNING *`,
            [name, surname, office, userId, specializationId, regionNumber]
        )
        res.json(newDoctor.rows[0])
    }
    async getDoctor(req, res){
        const doctors = await db.query(`SELECT * FROM doctors`)
        res.json(doctors.rows)
    }
    async getOneDoctor(req, res){
        const id = req.params.id
        const doctors = await db.query(`SELECT * FROM doctors where id = $1`, [id])
        res.json(doctors.rows[0])
    }
    async updateDoctor(req, res){
        const {id, name, surname, office, specializationId, regionNumber} = req.body

        const doctor = await db.query(`UPDATE doctors SET name = $1, surname = $2, office = $3, id_specialization = $4, changed = NOW(), region_number = $5 WHERE id = $6 RETURNING *`,
            [name, surname, office, specializationId, regionNumber, id])
        res.json(doctor.rows[0])
    }
    async deleteDoctor(req, res){
        const id = req.params.id
        const doctor = await db.query(`DELETE FROM doctors where id = $1`, [id])
        res.json(doctor.rows[0])
    }
    async checkDoctor(req, res){
        const id = req.params.id
        const doctor = await db.query(`SELECT EXISTS (SELECT 1 FROM doctors WHERE id_user = $1)`, [id])
        res.json({isDoctor: doctor.rows[0].exists})
    }
    async getDoctorToUser(req, res){
        const id_user = req.params.id_user
        const doctor = await db.query(`SELECT * FROM doctors where id_user = $1`, [id_user])
        res.json(doctor.rows[0])
    }

    async getDoctorNameToId(req, res){
        const id = req.params.id_doctor
        const doctor = await db.query(`SELECT name, surname FROM doctors WHERE id = $1`, [id])
        res.json(doctor.rows[0])
    }
    // Получить список врачей, работающих в регионе с номером 5 Подзапрос
    async regionDoctor(req, res){
        const {number} = req.body
        const doctors = await db.query(`SELECT name, surname FROM doctors WHERE region_number = $1`, [number])
    }
}
module.exports = new DoctorController()