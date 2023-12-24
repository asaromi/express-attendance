const {verify, sign} = require('jsonwebtoken')
const expiresIn = '1d'

exports.generateToken = async (payload) => await sign(payload, process.env.JWT_SECRET, {
  expiresIn,
  algorithm: process.env.JWT_ALGORITHM
})

exports.verifyToken = async (token) => await verify(token, process.env.JWT_SECRET)
