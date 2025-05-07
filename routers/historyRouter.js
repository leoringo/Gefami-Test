const router = require('express').Router()
const HistoryController = require('../controllers/HistoryController')

router.get('/', HistoryController.getAllHistories)

module.exports = router