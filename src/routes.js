const { Router } = require('express')
const { getMyAttendances, postAttendance } = require('./controllers/attendance')
const { authenticate, getAuthUser, login, register } = require('./controllers/auth')
const router = new Router()

router.get('/auth', authenticate, getAuthUser)
router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/attendances', authenticate, getMyAttendances)
router.post('/attendances/clock-:type(in|out)', authenticate, postAttendance)

module.exports = router
