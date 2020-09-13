const express = require('express')
const configureDB = require('./config/database')
const router = require('./config/routes')
const app = express()

const port = 3075

//setup db
configureDB()
app.use(express.json())
app.use(router)

app.listen(port, () =>  {
    console.log('server is running on port',port)
})