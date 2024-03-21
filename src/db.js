import mongoose from "mongoose";



export const connectDB = async () =>{
    try {
        await mongoose.connect('Your_bd_mongodb')
        console.log(">>> DB is connected")
    } catch (error) {
        console.log(error)
    }

   
}
