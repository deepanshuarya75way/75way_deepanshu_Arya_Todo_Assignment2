import mongoose from "mongoose";


export const connectDB = async (uri:string) => {
    return await mongoose.connect(uri)
}