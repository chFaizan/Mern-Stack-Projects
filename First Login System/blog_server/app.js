require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')

const userRoute = require('./routes/usersapi')
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api/user',userRoute)
const port = process.env.PORT

app.get('/', (req,res)=>{
    res.send("Hello world")
})

app.listen(port, () => {
  console.log(`Server is Running on : http://localhost:${port}`)
})
