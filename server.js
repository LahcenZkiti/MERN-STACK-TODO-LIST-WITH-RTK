const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

require('dotenv').config()

var corsOption = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOption))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

const db = mongoose.connection 
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log("Connected to Database"))

app.use(express.json())

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to todo-list application." });
});

const todosRoute = require('./routes/todos')
app.use('/todos', todosRoute)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log('Server started'))