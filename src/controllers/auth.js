const { comparePassword, hashPassword} = require('../libs/bcrypt')
const { errorResponse, successResponse } = require('../libs/response')
const { AuthError } = require('../libs/exceptions')
const { generateToken, verifyToken } = require('../libs/jwt')

const User = require('../models/user')

const login = async (req, res) => {
  try {
    const { email, password: unhasedPassword } = req.body

    const {password, ...user} = await User.findOne({ email }).select('+password').lean()
    if (!user) throw new AuthError('User not found')

    const isPasswordCorrect = await comparePassword(unhasedPassword, password)
    if (!isPasswordCorrect) throw new AuthError('Wrong password')

    const token = await generateToken({ id: user._id })

    return successResponse({ res, result: { user, token } })
  } catch (error) {
    return errorResponse({ error, res })
  }
}

const register = async (req, res) => {
  try {
    const { email, password: unhashedPass, name, employee_id, employment_type, phone_number } = req.body

    const password = await hashPassword(unhashedPass)
    const user = await User.create({
      email,
      password,
      name,
      employee_id,
      employment_type,
      phone_number
    })
    const token = await generateToken({ id: user._id })

    return successResponse({ res, result: user })
  } catch (error) {
    return errorResponse({ error, res })
  }
}

// middleware auth
const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) throw new AuthError('Token not found')

    const token = authorization.split(' ')[1]
    const {id} = await verifyToken(token)

    const user = await User.findById(id)
    if (!user) throw new AuthError('User not found')

    req.user = user

    next()
  } catch (error) {
    return errorResponse({ error, res })
  }
}

const getAuthUser = async (req, res) => {
  try {
    const { user } = req

    return successResponse({ res, result: user })
  } catch (error) {
    return errorResponse({ error, res })
  }
}

module.exports = { authenticate, getAuthUser, login, register }
