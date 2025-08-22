require('dotenv').config()
const mongoose = require('mongoose')

const dburl = process.env.DB_URL
mongoose.connect(dburl)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDb`)
})
  
mongoose.connection.on('error', (err) => {
  console.log(`MongoDb connection error`, err)
})

module.exports = mongoose