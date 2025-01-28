import { Schema, model } from "mongoose";

const userCollections = "users";

const userSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
});

export const modelUser = model(userCollections, userSchema)
