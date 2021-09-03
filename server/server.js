// load modules
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4001; // use either the host env var port (PORT) provided by Heroku or the local port (4001) on your machine
const controller = require('./controller')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/getart',controller.getArt)

app.listen(port, ()=>{
    console.log(`serving on port ${port}`)
})