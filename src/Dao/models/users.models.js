import { model, Schema } from "mongoose";
import { cartsModel } from "./carts.model.js";
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: "Usuario"
    },

    cart:{
        type: Schema.Types.ObjectId,
        ref:'carts'
    }
})

userSchema.post

const userModel = model("users", userSchema)

export default userModel