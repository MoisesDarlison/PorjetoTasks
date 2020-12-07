require('dotenv').config();
require('../config/connections')

const express = require('express')
const app = express()
const porta = process.env.PORT_APP
const route = require("./routers/routes")


app.use(express.json())
app.use(route)

app.listen(porta,()=> console.log(`Server UP in port ${porta}`))