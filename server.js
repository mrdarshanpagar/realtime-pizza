const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3300

// app.use(expressLayout)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/resources/views'))

// Assets
app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.render('home.ejs')
})

app.listen(PORT, ()=>{
    console.log(`Server on port no: ${PORT}`)
})
