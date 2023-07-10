const ApiError = require("../error/ApiError")
const sequelize = require('../db')
const { Op } = require('sequelize');
const { Rating, Item } = require("../models/models")

class RatingController {
    async create(req, res, next) {
        try {
            const { rate, userId, itemId } = req.body
            const sameRating = await Rating.findOne({ where: { userId, itemId } })
            const item = await Item.findOne({ where: { id: itemId } });

            let avarage = 0;

            if (!item) {
                return next(ApiError.badRequest('Товар не найден!'));
            }

            if (sameRating) {
                sameRating.rate = rate;
                await sameRating.save();
            } else {
                const rating = await Rating.create({ rate, userId, itemId })
            }

            const result = await Rating.findOne({
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('rate')), 'averageRating']
                ],
                where: {
                    itemId: {
                        [Op.eq]: itemId
                    }
                }
            });

            avarage = Math.round(parseFloat(result.dataValues.averageRating));
            item.rating = avarage;
            await item.save();
            return res.json({ averageRating: avarage, itemId: itemId })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUserRating(req, res, next) {
        try {
            let { userId, itemId } = req.query
            userId = parseInt(userId);
            itemId = parseInt(itemId);
            const rating = await Rating.findOne({ where: { userId, itemId } })
            const allItemRatting = await Rating.findAndCountAll({where: {itemId}})
            if (!rating) {
                return res.json({ rating: 0, count: 0 });
            }
            return res.json({ rating: rating.rate, count: allItemRatting.count});
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

}

module.exports = new RatingController()