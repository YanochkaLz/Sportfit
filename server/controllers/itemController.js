const uuid = require('uuid') // generate unique name for photo
const path = require('path') // module in node.js for path
const { Item } = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
    async create(req, res, next) {
        try {
            const { name, price, typeId, itemSizes } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg" // generate uniue id
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // parse getting file to folder

            // parse into data base
            const item = await Item.create({ name, price, typeId, img: fileName, itemSizes: itemSizes.split(',').map(item => parseFloat(item)) })
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { typeId, limit, page, all } = req.query
        let items;
        if (all) {
            if(typeId) {
                items = await Item.findAndCountAll({ where: { typeId } })
            } else {
                items = await Item.findAndCountAll()
            }
        } else {
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            // in depence on id make request to data base, filtration
            if (!typeId) {
                items = await Item.findAndCountAll({ limit, offset })
            } else {
                items = await Item.findAndCountAll({ where: { typeId }, limit, offset })
            }
        }

        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const device = await Item.findOne(
            {
                where: { id }
            }
        )
        return res.json(device)
    }
}

module.exports = new ItemController()