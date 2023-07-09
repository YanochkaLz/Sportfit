const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const ratingController = require('../controllers/ratingController')

router.post('/', checkRole('ADMIN'), ratingController.create)
// router.get('/', )

module.exports = router