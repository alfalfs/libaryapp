// loading local in development 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./src/routes/index')
const authorRouter = require('./src/routes/authors')
const bookRouter = require('./src/routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())
    //app.use(express.urlencoded({ limit: '10mb', extended: false })); //body parser inbuild in express

const mongoose = require('mongoose')
    // connection string
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

//consoling mongo status
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3006)