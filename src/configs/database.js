require('dotenv').config()
const mongoose = require('mongoose')

const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const mongodb = mongoose.connection

module.exports = mongodb
