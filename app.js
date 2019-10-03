const express = require('express')
const hbs = require('hbs')
const path = require('path')
const Index = require('./routes/index.js')
require('dotenv').config()

let app = express()

const port = 5000

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'hbs')

app.use(express.urlencoded({
  extended: false
}));

app.use(express.static(__dirname + '/public'))

app.use(express.json());

app.use('/', Index)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})
