const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')
const { Op } = require('sequelize');

const generateJwt = (id, email, name, role) => {
    return jwt.sign({ id, email, name, role }, process.env.SECRET_KEY, { expiresIn: '24h' }) // 24h - token lifetime
}

class UserController {
    async registration(req, res, next) {
        const { name, phone, email, password, role } = req.body
        if (!email || !password || !phone || !name) {
            return next(ApiError.badRequest('Введены не все данные'))
        }
        const candidate = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { phone: phone }
                ]
            }
        })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email или телефоном уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ name, phone, email, role, password: hashPassword })
        // const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.name, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким email не существует'))
        }

        // decode and compare password from client and data base
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.name, user.role)
        return res.json({ token })
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController()