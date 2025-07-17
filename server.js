import express from "express";
import Dotenv from "dotenv";
import mongoose from "mongoose";
import VendorRoutes from "./routes/vendorRoutes.js"
import FirmRoutes from "./routes/firmRoutes.js"
import ProductRoutes from "./routes/productRoutes.js"
import cors from "cors";

const app=express()

Dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err))



app.use(express.json())

app.use(cors({}))

app.use('/uploads', express.static('uploads'));


app.use("/vendors",VendorRoutes)
app.use("/firms",FirmRoutes)
app.use("/products",ProductRoutes)




app.listen(2000,()=>{
    console.log("server is running at port 2000")
})