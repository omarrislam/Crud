const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000 || process.env.PORT
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin@cluster0.srnvy.mongodb.net/brilliant-DB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Server connected successfully');
}).catch((err)=>{
    console.log('error in db ====>>> ' ,err);
})
app.use(cors())
app.use(express.json())
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))

app.listen(port, () => console.log("Connected"))




