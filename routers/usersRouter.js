const router = require('express').Router()
const UsersController = require('../controllers/UsersController')
const authenticator = require('../middlewares/authenticator')
const authorization = require('../middlewares/authorization')

router.post('/register', UsersController.register)
router.post('/login', UsersController.login)

// -- need login and authorize to edit address
router.use(authenticator)
router.use(authorization)

router.post('/edit', UsersController.changeAddress)



module.exports = router