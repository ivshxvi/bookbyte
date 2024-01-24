require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT
const geo = require('./country_info.json')
const logger = require('./logger.js')

app.use(cors())
app.use(express.json())
app.use(logger)

app.get("/geo/:country", (req,res) => {
    const country = req.params.country.toLowerCase()
    const geoFiltered = geo.filter((f) => f.name.toLowerCase() == country)

    geoFiltered.length === 0
    ? res.status(404).send("Such country does not exist")
    : res.send(geoFiltered)
})

app.get("/random", (req,res) => {
    let randIdx = Math.floor(Math.random() * geo.length)
    res.send(geo[randIdx]);
})

app.get("/geo", (req, res) => {
    res.send(geo)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})