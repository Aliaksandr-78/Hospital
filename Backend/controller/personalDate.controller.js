const db = require('../db')

class PersonalDateController {
    async createPersonalDate(req, res){
        const {passportSeries, passportNumber, passportExpiration, identificationNumber, id_user} = req.body
        const date = await db.query(
            `INSERT INTO personal_doc(passport_series, passport_number, created, changed, expiration_date, user_id, identification_no) VALUES ($1, $2, NOW(), NOW(), $3, $4, $5) RETURNING *`,
            [passportSeries, passportNumber, passportExpiration, id_user, identificationNumber]
        )
        res.json(date.rows[0])
    }
}
module.exports = new PersonalDateController()