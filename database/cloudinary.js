import { v2 as cloudinary } from 'cloudinary';

import dotenv from "dotenv";
dotenv.config();

try{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.SECRET_KEY
    });
    console.log("Connected to cloudinary")
} catch(error){
    console.log(error);
}