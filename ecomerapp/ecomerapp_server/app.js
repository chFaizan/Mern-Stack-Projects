require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const db = require('./db')
const adminLoginRoute = require('./routes/Admin/adminlogin')
const adminCategoryRoute = require('./routes/Admin/category')
const adminProductRoute = require('./routes/Admin/product')
const userCatRoute = require('./routes/User/category')
const userProRoute = require('./routes/User/product')
const userRoute = require('./routes/User/user')

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/pros', express.static(path.join(__dirname, 'products')))

app.use(express.json())
app.use('/adminloginapi', adminLoginRoute)
app.use('/admincategory', adminCategoryRoute)
app.use('/adminproduct', adminProductRoute)
app.use('/userproducts', userProRoute)
app.use('/usercategory', userCatRoute)
app.use('/userlogreg', userRoute)

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send("Hello world")
})

app.listen(port, () => {
  console.log(`Server is Running on : http://localhost:${port}`)
})