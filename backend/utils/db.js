import mongoose from "mongoose";
const connectDB  = async() =>{
    try
    {
        await mongoose.connect(`${process.env.DATABASE_URI}/synchronous-chat-app`);
        console.log("MongoDB connected successfully");
    }
    catch(error)
    {
        console.log(error);
    }
}
export default connectDB;