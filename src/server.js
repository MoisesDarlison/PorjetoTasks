require('dotenv').config();
require('./database/index')

const express = require('express')
const app = express()
const porta = process.env.PORT_APP
const route = require("./routers/routes")



//console.log(process.env.NAME_DB);
app.use(express.json())
app.use(route)

app.listen(porta,()=> console.log(`Server UP in port ${porta}`))