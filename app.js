require('dotenv').config()
const PORT = process.env.PORT
const cors = require('cors')

const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(require('./routers'))
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`I Love You ${PORT}`)
})