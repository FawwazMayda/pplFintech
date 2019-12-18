const express = require('express')
const app =express()
const cors = require('cors')
const fintechController = require('./fintechController')

app.use(cors())
app.use('/fintech',fintechController)

module.exports = app