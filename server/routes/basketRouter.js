const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const basketController = require('../controllers/basketController')

router.post('/', authMiddleware, basketController.create)
router.get('/', authMiddleware, basketController.getBasketUser)

module.exports = router