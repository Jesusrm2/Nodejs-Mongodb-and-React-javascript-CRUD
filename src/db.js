import mongoose from "mongoose";



export const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://jesusmald23:9ZxMuBc3dOrRe4eu@cluster0.vdtw82i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log(">>> DB is connected")
    } catch (error) {
        console.log(error)
    }

   
}