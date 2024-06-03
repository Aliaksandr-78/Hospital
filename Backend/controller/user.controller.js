const db = require('../db')
const bcrypt = require('bcrypt')
class UserController {
    async createUser(req, res){
        const {login, user_password, phone_number, email} = req.body
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(user_password, saltRounds)

        const newUser = await db.query(
            `INSERT INTO users(login, user_password, phone_number, email, created, changed) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *`,
            [login, hashedPassword, phone_number, email]
        )

        const userId = newUser.rows[0].id
        await db.query(
            `INSERT INTO roles(role_name, user_id, created, changed) VALUES ($1, $2, NOW(), NOW()) RETURNING *`,
            ['user', userId]
        )

        res.json(newUser.rows[0])
    }
    async getUser(req, res){
        const users = await db.query(`SELECT * FROM users`)
        res.json(users.rows)
    }
    async getOneUser(req, res){
        const id = req.params.id
        const users = await db.query(`SELECT * FROM users where id = $1`, [id])
        res.json(users.rows[0])
    }
    async updateUser(req, res){
        const {id, login, user_password, phone_number, email} = req.body
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(user_password, saltRounds)

        const user = await db.query(`UPDATE users set login = $1, user_password = $2, phone_number = $3, email = $4, changed = NOW(), where id = $5 RETURNING *`,
            [login, hashedPassword, phone_number, email, id])
        res.json(user.rows[0])
    }
    async deleteUser(req, res){
        const id = req.params.id
        const user = await db.query(`DELETE FROM users where id = $1`, [id])
        res.json(user.rows[0])
    }
    async loginUser(req, res) {
        const { email, password } = req.body
        try {
            const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

            if (user.rows.length === 0) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const match = await bcrypt.compare(password, user.rows[0].user_password)

            if (!match) {
                return res.status(400).json({ message: 'Неверный пароль' })
            }

            const isAdmin = await db.query(`SELECT EXISTS (SELECT 1 FROM roles WHERE user_id = $1 AND role_name = 'admin')`, [user.rows[0].id])

            const isDoctor = await db.query(`SELECT EXISTS (SELECT 1 FROM doctors WHERE id_user = $1)`, [user.rows[0].id])

            res.json({ userID: user.rows[0].id, isAdmin: isAdmin.rows[0].exists, isDoctor: isDoctor.rows[0].exists })
        } catch (error) {
            console.error('Ошибка авторизации:', error)
            res.status(500).json({ message: 'Внутренняя ошибка сервера' })
        }
    }


    // Получить список всех пользователей вместе с их ролями Запросы с объединениями
    async roleUser(req, res){
        const users = await db.query(`SELECT u.login, r.role_name FROM users u INNER JOIN roles r ON u.id = r.user_id`)
        res.json(users.rows)
    }
}
module.exports = new UserController()