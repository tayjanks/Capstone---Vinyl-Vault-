require('dotenv').config({
    path: "../.env"
})
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getAllAlbums, submitAlbum, deleteAlbum, homePage, homeJS, stylePage} = require('./controller')

app.use(express.json())
app.use(cors())

app.get('/albums', homePage)
app.get('/main', homeJS)
app.get('/styles', stylePage)

app.post('/seed', seed)

app.get('/albums', getAllAlbums)
app.post('/albums', submitAlbum)
app.delete('/albums/:id', deleteAlbum)

app.listen(SERVER_PORT, () => {console.log("listening on " + SERVER_PORT)})
