require('dotenv').config()
const mongoose = require('mongoose')

const dburl = process.env.DB_URL
mongoose.connect(dburl)

mongoose.connection.on('connection', () => {
  console.log(`Connected to MongoDb`)
})

mongoose.connection.on('error', (err) => {
  console.log(`Connected to MongoDb`, err)
})

module.exports =mongoose