const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const SERVER_PORT = process.env.SERVER_PORT
const {seed, getCollection} = require('./controller')

app.use(express.json())
app.use(cors())


app.post('/seed', seed)

app.get('/albums', getCollection)

app.listen(SERVER_PORT, () => {console.log("listening on " + SERVER_PORT)})