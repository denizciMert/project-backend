import mongoose from "mongoose";
import { chatSchema } from "./chatSch.js";

export const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    chats: [chatSchema]
})