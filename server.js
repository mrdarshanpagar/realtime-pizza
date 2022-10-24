require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const initRoutes = require('./routes/web')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')
const PORT = process.env.PORT || 3300

const mongoose = require('mongoose')
// Database connection

mongoose.connect('mongodb://localhost:27017/pizza')
.then(()=> console.log('connection established...'))
.catch((err)=> console.log(err.message))


app.use(expressLayout)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/resources/views'))

// Session store
let mongoStore = MongoDbStore.create({
    mongoUrl: 'mongodb://localhost:27017/pizza',
    collection: 'sessions'
})


// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}
}))

app.use(flash())
// Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Global middleware
app.use((req, res, next)=>{
    res.locals.session = req.session
    next()
})

initRoutes(app)

app.listen(PORT, ()=>{
    console.log(`Server on port no: ${PORT}`)
})
