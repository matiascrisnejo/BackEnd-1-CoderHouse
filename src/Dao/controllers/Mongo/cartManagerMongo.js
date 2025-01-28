import { cartsModel } from "../../models/carts.model.js"
import ProductManager from "../Mongo/productManagerMongo.js"

const pm = new ProductManager()

export default class CartManager{
    
    // async getCarts(){
        
    //     try {
    //         return await cartsModel.find().lean()
    //     } catch (error) {
    //         return error
    //     }
    // }

    async findCartById(cid) {
        try {
            // Buscar el carrito y popular los productos
            const cart = await cartsModel.findById(cid).populate("products.product").lean();
    
            if (!cart) {
                console.log(`Carrito con ID ${cid} no encontrado.`);
                return null;
            }
    
            console.log("response", cart);
            return cart;
        } catch (error) {
            console.error("Error al buscar el carrito:", error);
            throw error;
        }
    }

    async createCart(){
        const newCart = {products: []}
        const cart = await cartsModel.create(newCart)
        return cart
    }

    async addProductToCart(cid, pid){
        const cart = await cartsModel.findById(cid)
        const productIndex = cart.products.findIndex(
            (p) => p.product.equals(pid))
        if(productIndex === -1){
            cart.products.push({
                product: pid,
                quantity: 1
            })
        } else{
            cart.products[productIndex].quantity++
        }
        return cart.save()
    }

    async deleteProduct(cid, pid){
        try {
            let cart = await this.getCartbyId(cid)
            const productIndex = cart.products.findIndex(p => p.pid === pid)
            if(productIndex === -1){
                throw new Error(`no se encotro el producto con id ${pid} en el carrito con id ${cid}`)
            }else{
                if (cart.products[productIndex].quantity > 1){
                    cart.products[productIndex].quantity--
                }else{
                    cart.products.splice(productIndex, 1)
                }
            }
            cart = await cartsModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true })
            return cart
        } catch (error) {
            throw error
        }
    }

    async updateCart(cart) {
        try {
            await this.model.findByIdAndUpdate(cart._id, cart);
            return "Se actualizo el carrito correctamente";
        } catch (error) {
            console.error("No se pudo actualizar el carrito", error);
            throw error;
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await this.model.findById(cid);

            if(!cart) {
                throw new Error(`No se encontro el carrito con el id: ${cid}`);
            }

            const productIndex = cart.products.findIndex(product => product.productId.toString() === pid.toString());
            if (productIndex === -1) {
                throw new Error(`No se encontró el producto con id: ${pid} en este carrito`);
            }

            cart.products[productIndex].quantity = quantity;

            await this.updateCart(cart);

            return "Cantidad de producto actualizada";

        } catch (error) {
            console.error("Error al actualizar la cantidad del producto en el carrito", error);
        }
    }

    async deleteAllProducts(cid) {
        try {
            const cart = await this.model.findById(cid);
            if (!cart) {
                throw new Error(`No se encontro el carrito con el id: ${cid}`);
            }
            cart.products = []; 
            await this.updateCart(cart);
    
            return "Todos los productos fueron eliminados exitosamente";
        } catch (error) {
            console.error("Error al eliminar todos los productos del carrito", error);
        }
    }



}