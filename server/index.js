require('dotenv').config({
    path: "../.env"
})
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getCollection} = require('./controller')

app.use(express.json())
app.use(cors())

console.log(process.env.SERVER_PORT)
app.post('/seed', seed)

app.get('/albums', getCollection)

app.listen(SERVER_PORT, () => {console.log("listening on " + SERVER_PORT)})
