const router = require('express').Router()
const usersRouter = require('./usersRouter')
const jsondataRouter = require('./jsondataRouter')
const historyRouter = require('./historyRouter')
const authenticator = require('../middlewares/authenticator')

router.use('/user', usersRouter)

// -- authenticate user for the rest activites must logged in --
router.use(authenticator)

router.use('/histories', historyRouter)
router.use('/jsondata', jsondataRouter)

module.exports = router