const  db = require('../db')

class RegionController{
    async createRegion(req, res){
        const { regionNumberInput, regionInput } = req.body
        const region = await db.query(
            `INSERT INTO regions(number, address_range, created) VALUES ($1, $2, NOW()) RETURNING *`,
            [regionNumberInput, regionInput]
        )
        res.json(region.rows[0])
    }
    async getRegions(req, res){
        const regions = await db.query(`SELECT * FROM regions`)
        res.json(regions.rows)
    }
    async updateRegion(req, res){
        const {id, number, address_range} = req.body
        await db.query(`UPDATE regions set number = $1, address_range = $2, created = NOW(), where id = $3 RETURNING *`)
        [number, address_range, id]
    }
    async deleteRegion(req, res){
        const id = req.params.id
        await db.query(`DELETE FROM regions where id = $1`, [id])
    }
}
module.exports = new RegionController()