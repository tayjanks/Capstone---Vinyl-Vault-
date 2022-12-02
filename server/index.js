require('dotenv').config({
    path: "../.env"
})
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getAllAlbums} = require('./controller')

app.use(express.json())
app.use(cors())


app.post('/seed', seed)

app.get('/albums', getAllAlbums)

app.listen(SERVER_PORT, () => {console.log("listening on " + SERVER_PORT)})
