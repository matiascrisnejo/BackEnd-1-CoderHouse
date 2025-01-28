import mongoose from "mongoose"

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity:{
                type: Number
            },
            _id: false
        }
    ]
})

export const cartsModel = mongoose.model(cartCollection,cartSchema)