import mongoose from "mongoose";


import dotenv from "dotenv";
dotenv.config();


try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to mongoDB")
}catch(err){
    console.log(err)
}


