const ApiError = require("../error/ApiError")
const { Rating, Item } = require("../models/models")

class RatingController {
    async create(req, res, next) {
        try {
            const { rate, userId, itemId } = req.body
            const sameRating = await Rating.findOne({ where: { userId, itemId } })
            if (sameRating) {
                return next(ApiError.badRequest('Пользователь уже ставил рейтинг на этот товар'))
            }
            const item = await Item.findOne({ where: { id:itemId } });
            if (!item) {
                return next(ApiError.badRequest('Товар не найден'));
            }
            const rating = await Rating.create({ rate, userId, itemId })
            item.rating = rate;
            await item.save();
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RatingController()