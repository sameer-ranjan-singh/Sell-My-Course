require('dotenv').config();

const port = process.env.PORT || 3000
const mongoUrl = process.env.MONGO_URL
const mongoose = require("mongoose")
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "courses"
  };

const express = require("express")
const cors = require("cors")

const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/admin",adminRouter)
// app.use("/user",userRouter)

mongoose.connect(mongoUrl, mongoOptions);

app.listen(port, () => console.log(`Server is running on port ${port}`))
