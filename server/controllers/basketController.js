const { Basket } = require("../models/models")

class BasketController {
    async create(req, res, next) {
        try {
            const { items, userId, totalAmount } = req.body
            const itemsArray = items.arr;
            const order = await Basket.create({ items: itemsArray, userId, totalAmount })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasketUser(req, res, next) {
        try {
            const { userId } = req.query
            const userBasket = await Basket.findOne(
                {
                    where: { userId }
                }
            )
            return res.json(userBasket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()