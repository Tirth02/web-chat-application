import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}));

app.use("/uploads/profiles", express.static("uploads/profiles"))
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/contacts',contactsRoutes);
const server = app.listen(port,() =>{
    connectDB();
    console.log(`Server ruuning at ${port}`);
});

setupSocket(server);

