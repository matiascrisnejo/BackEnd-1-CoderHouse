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

userSchema.post('save', async function name(userCreated){
    try {
        const newCart = await cartsModel.create({products: []})
        await model('users').findByIdAndUpdate(userCreated._id, { //actualiza la prop cart del usuario creado anteiamente
            cart: newCart._id
        })
    } catch (error) {
        console.log(error);
        
    }
})

const userModel = model("users", userSchema)

export default userModel