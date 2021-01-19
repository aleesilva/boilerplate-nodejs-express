const router = require('express').Router()

router.use('/tasks', require('./task/routes'))
router.use('/users', require('./user/routes'))

module.exports = router