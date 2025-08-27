const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const bookRoute = require("./routes/book.routes")
const userRoute = require("./routes/user.routes")

dotenv.config()
const PORT = process.env.PORT || 4000
const URL = process.env.MongoDBURL
app.use(cors());
app.use(express.json());

mongoose.connect(URL)
  .then(() => {
    console.log("✅ Connected to MongoDB")
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error)
  })

app.get("/", (req, res) => {
  res.send("Hello")
})
app.use("/book",bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`)
})


