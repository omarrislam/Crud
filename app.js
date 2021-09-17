const express = require('express')
const app = express()
var cors = require('cors')
const mongoose = require('mongoose')


app.use(cors())
app.use(express.json())
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))

mongoose.connect('mongodb+srv://admin:admin@cluster0.srnvy.mongodb.net/brilliant-DB',
 {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false }).then(()=>{
     console.log('DB===Connect');
 }).catch(()=>{
     console.log('DB ERoR');
 })
app.listen(3000 || process.env.PORT, () =>{
    console.log("Connected")
})




