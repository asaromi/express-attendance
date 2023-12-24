require('dotenv').config()
const express = require('express')
const mongodb = require('./configs/database')

const app = express()
const { HOST = 'localhost:', PORT } = process.env
const listenParams = [PORT]
if (HOST) listenParams.push(HOST)

mongodb.on('error', console.error.bind(console, 'connection error:'))
mongodb.once('open', () => {
  console.info('Database connected')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', require('./routes'))
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.listen(...listenParams, () => {
  console.info(`Server listen on ${HOST}:${PORT}`)
})
