require('dotenv').config();

import express, {Request, Response, NextFunction } from "express"
const app = express()
import cors from "cors"
import mongoose from "mongoose"
const port = process.env.PORT || 3000
const mongoUrl = process.env.MONGO_URL


const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "courses"
  };

app.use(cors({
  credentials : true,
  origin : [ "https://sameer-course.vercel.app",
              "https://sameer-user.vercel.app",
              "http://localhost:5173",
            ]
}))

app.use(function(req:Request,res:Response,next:NextFunction){
  res.header("Content-Type", "application/json;charset=UTF-8")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Allow-Credentials",
     "Origin, X-requested-With, Content-Type, Accept"
  )
  next()
})

import adminRouter from "./routes/admin"
import userRouter from "./routes/user"

app.use(express.json())
app.use("/admin",adminRouter)
app.use("/user",userRouter)

if(typeof mongoUrl === "string"){
  console.error("Mongo URL is of type String");
  mongoose.connect(mongoUrl, mongoOptions);
  // process.exit(1)
}

app.listen(port, () => console.log(`Server is running on port ${port}`))
