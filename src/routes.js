const { Router } = require('express')
const { authenticate, getAuthUser, login, register } = require('./controllers/auth')
const router = new Router()

router.get('/auth', authenticate, getAuthUser)
router.post('/auth/register', register)
router.post('/auth/login', login)

module.exports = router
