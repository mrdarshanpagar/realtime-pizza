require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const path = require('path')
const initRoutes = require('./routes/web')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const MongoDbStore = require('connect-mongo')
// const Emitter = require('events')
const PORT = process.env.PORT || 3300

const mongoose = require('mongoose')
// Database connection

mongoose.connect('mongodb://localhost:27017/pizza')
.then(()=> console.log('connection established...'))
.catch((err)=> console.log(err.message))


app.use(expressLayout)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/resources/views'))
app.use(methodOverride('_method'))

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(cookieParser(process.env.COOKIE_SECRET))

// Session store
let mongoStore = MongoDbStore.create({
    mongoUrl: 'mongodb://localhost:27017/pizza',
    collection: 'sessions'
})

// Event emitter
// const eventEmitter = new Emitter()
// app.set('eventEmitter', eventEmitter)

// Session config
app.use(session({
    secret: "theencryptionkey",
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}
}))

app.use(flash())

// Passport config
const passportInit = require('./app/config/passportConfig')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// Global middleware
app.use((req, res, next)=>{
    res.locals.session = req.session
    res.locals.user = req.user 
    // console.log(req.session)
    // console.log(req.user)
    next()
})

initRoutes(app)

const server = app.listen(PORT, ()=>{
    console.log(`Server on port no: ${PORT}`)
})


// Socket

// const io = require('socket.io')(server)
// io.on('connect', (socket) => {
//       // Join
//       console.log(socket.id)
//       socket.on('join', (orderId) => {
//         console.log(orderId)
//         socket.join(orderId)
//       })
// })

// eventEmitter.on('orderUpdated', (data) => {
//     io.to(`order_${data.id}`).emit('orderUpdated', data)
// })

// eventEmitter.on('orderPlaced', (data) => {
//     io.to('adminRoom').emit('orderPlaced', data)
// })