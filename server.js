const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config()

const PORT = process.env.PORT
const db = require("./src/config/dbConnect")

const answerR = require("./src/route/answer")
const questR = require("./src/route/quest")
const taskR = require("./src/route/task")

//init Express
const app = express()

app.use(express.json(), cors(),
    bodyParser.urlencoded({extended: true}))

//Check connection db
db.authenticate().then(() => {
    console.log("База подключена ...")
}).catch(err => {
    console.log("Error", err)
})

//middleware 
app.use(answerR)
app.use(questR)
app.use(taskR)

app.listen(PORT, () => {
    console.log(`Сервер запустился на ${PORT} порте ...`)
})
