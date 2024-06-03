const db = require('../db')
class RoleController {
    async getRole(req, res){
        const roles = await  db.query(`SELECT * FROM roles`)
        res.json(roles.rows)
    }

    //Изменение названия роли для определенного пользователя Модифицирующий запрос
    async updateRole(req, res) {
        const {id, role_name} = req.body
        const roles = await db.query(`UPDATE roles set role_name = $1, changed = NOW(), where id = $2 RETURNING *`,
            [role_name, id])
        res.json(roles.rows[0])
    }
    async nameRole(req, res){
        const {id_user} = req.params
        const roles = await db.query(`SELECT role_name FROM roles WHERE user_id = $1`, [id_user])
        res.json(roles.rows)
    }
}
module.exports = new RoleController()