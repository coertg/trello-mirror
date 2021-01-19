const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const pizzaBoardRouter = require('./routes/pizza-board')
const NotFoundError = require('./services/not-found-error')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/api', pizzaBoardRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const message = err.message
  const error = req.app.get('env') === 'development' ? {stack: err.stack} : {}
  const isNotFound = err instanceof NotFoundError
  let status = err.status || (isNotFound ? 404 : 500)
  res.status(status).send({message, error})
})

module.exports = app
