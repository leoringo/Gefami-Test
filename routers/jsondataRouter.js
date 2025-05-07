const router = require('express').Router()
const JsondataController = require('../controllers/JsondataController')
const authorization = require('../middlewares/authorization')

router.get('/', JsondataController.getJsonData)

// -- authenticator for requirement headers --
router.use(authorization)

router.post('/create', JsondataController.createNewData)
router.post('/delete', JsondataController.destroyData)


module.exports = router