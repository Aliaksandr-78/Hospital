const db = require('../db')

class SpecializationController {
    async createSpecialization(req, res) {
        const { name } = req.body
        try {
            const newSpecialization = await db.query(
                `INSERT INTO specializations(name, created, changed) VALUES ($1, NOW(), NOW()) RETURNING *`,
                [name]
            )
            res.json(newSpecialization.rows[0])
        } catch (error) {
            console.error("Ошибка:", error)
            res.status(500).json({ error: "Ошибка при создании специализации" })
        }
    }
    async getSpecialization(req, res) {
        try {
            const specializations = await db.query(`SELECT * FROM specializations order by id asc`)
            res.json(specializations.rows)
        } catch (error) {
            console.error("Ошибка:", error)
            res.status(500).json({ error: "Ошибка при получении специализаций" })
        }
    }

    async updateSpecialization(req, res) {
        const { id, name } = req.body
        try {
            const specialization = await db.query(
                `UPDATE specializations SET name = $1, changed = NOW() WHERE id = $2 RETURNING *`,
                [name, id]
            )
            res.json(specialization.rows[0])
        } catch (error) {
            console.error("Ошибка:", error)
            res.status(500).json({ error: "Ошибка при обновлении специализации" })
        }
    }

    async deleteSpecialization(req, res) {
        const id = req.params.id
        try {
            const specialization = await db.query(`DELETE FROM specializations WHERE id = $1`, [id])
            res.json({ message: "Специализация успешно удалена" })
        } catch (error) {
            console.error("Ошибка:", error)
            res.status(500).json({ error: "Ошибка при удалении специализации" })
        }
    }
}

module.exports = new SpecializationController()
