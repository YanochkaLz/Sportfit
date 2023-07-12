const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const ratingController = require('../controllers/ratingController')

router.post('/', ratingController.create)
router.get('/', ratingController.getUserRating)

module.exports = router