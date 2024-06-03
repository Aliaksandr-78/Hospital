const db = require('../db')
class VisitController{
    async createVisit(req, res){
        const {note, price, patient_card_number, id_doctor} =req.body
        const visit = await db.query(
            `INSERT INTO visits(note, price, patient_card_number, created, changed, id_doctor) VALUES ($1, $2, $3, NOW(), NOW(), $4) RETURNING *`,
            [note, price, patient_card_number, id_doctor]
        )
        res.json(visit.rows[0])
    }
    async getVisit(req, res){
        const visits = await db.query(`SELECT * FROM visits`)
        res.json(visits.rows)
    }
    async getOneVisits(req, res){
        const id = req.params.id
        const visits = await db.query(`SELECT * FROM visits where id = $1`, [id])
        res.json(visits.rows[0])
    }
    async deleteVisit(req, res){
        const id = req.params.id
        await db.query(`DELETE FROM visits where id = $1`, [id])
    }
    async userVisit(req, res){
        const patient_card_number = req.params.patient_card_number
        const visit = await db.query(`SELECT * FROM visits WHERE patient_card_number = $1`, [patient_card_number])
        res.json(visit.rows)
    }
}
module.exports = new VisitController()