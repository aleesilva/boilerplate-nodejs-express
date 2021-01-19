require('dotenv').config()
require('./config/db')

const version = 'v1'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const busboyBodyParser = require('./commons/bodyParse')
const logger = require('morgan')
const cors = require('cors')
const validator = require('express-validator')
const timeout = require('express-timeout-handler')
const app = express()
const server = require('./config/server')

global._base = path.join(__dirname, '/')


app.use(timeout.handler({
  timeout: 10000,
  onTimeout: function (_req, res) {
    res.status(503).json({ error: 'timeout' })
  }
}))

if (app.get('env') === 'development') {
  app.use(logger('dev'))
  app.get('/template', (req, res) => {
    res.render(`${req.query.path}`, JSON.parse(req.query.data))
  })
}
app.use(busboyBodyParser())
app.use(bodyParser.json({ limit: '42mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  exposedHeaders: ['Content-Disposition']
}))
app.use(validator())

app.use((_req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

const routesTodo = require('./modules/todo/' + version + '/routes')
app.use('/api/' + version + '/todo', routesTodo)

server.start(app)

module.exports = app