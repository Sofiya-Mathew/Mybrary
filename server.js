if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}

const express=require('express')
const app= express()

const expressEjsLayouts = require('express-ejs-layouts')

const indexRouter=require('./routes/index')
const authorRouter=require('./routes/authors')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.json({limit:'10mb',extended:false}))

const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('connected to mongoose'))
app.use('/',indexRouter)
app.use('/authors',authorRouter)


app.listen(process.env.PORT || 3000)