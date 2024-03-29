// checking role for adding product

const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" })
            }

            // validate token 
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            if (decode.role !== role) {
                return res.status(403).json({ message: "No access!" })
            }
            req.user = decode
            next() // move to next midlleware
        } catch (e) {
            return res.status(401).json({ message: "Unauthorized" })
        }
    }
}
