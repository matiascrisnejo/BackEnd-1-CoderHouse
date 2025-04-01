import { cartsModel } from "../../models/carts.model.js"
import ProductManager from "../Mongo/productManagerMongo.js"
import ticketModel from '../../models/tickets.model.js'
import {productsModel} from '../../models/products.model.js'

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

    async addProductToCart(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error(`Carrito con ID ${cid} no encontrado.`);
            }

            const productIndex = cart.products.findIndex((p) => p.product.equals(pid));
            if (productIndex === -1) {
                cart.products.push({
                    product: pid,
                    quantity: quantity
                });
            } else {
                cart.products[productIndex].quantity += quantity;
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error al añadir producto al carrito: ${error.message}`);
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const cart = await this.findCartById(cid); // Cambié a `findCartById` para obtener el carrito correctamente
            if (!cart) {
                throw new Error(`Carrito con ID ${cid} no encontrado.`);
            }

            const productIndex = cart.products.findIndex(p => p.product.equals(pid)); // Asegúrate de comparar correctamente los IDs
            if (productIndex === -1) {
                throw new Error(`Producto con ID ${pid} no encontrado en el carrito con ID ${cid}`);
            } else {
                if (cart.products[productIndex].quantity > 1) {
                    cart.products[productIndex].quantity--;
                } else {
                    cart.products.splice(productIndex, 1);
                }
            }

            await cartsModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
            return cart;
        } catch (error) {
            throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
        }
    }

    async updateCart(cart) {
        try {
            if (!cart || !cart._id) {
                throw new Error("Carrito inválido o sin ID.");
            }

            const updatedCart = await cartsModel.findByIdAndUpdate(cart._id, cart, { new: true });
            if (!updatedCart) {
                throw new Error(`No se pudo actualizar el carrito con ID ${cart._id}`);
            }

            return updatedCart;
        } catch (error) {
            console.error("No se pudo actualizar el carrito", error);
            throw new Error(`Error al actualizar el carrito: ${error.message}`);
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error(`Carrito con ID ${cid} no encontrado.`);
            }

            const productIndex = cart.products.findIndex(product => product.product.equals(pid));
            if (productIndex === -1) {
                throw new Error(`Producto con ID ${pid} no encontrado en el carrito con ID ${cid}`);
            }

            cart.products[productIndex].quantity = quantity;

            await this.updateCart(cart);
            return "Cantidad de producto actualizada";
        } catch (error) {
            console.error("Error al actualizar la cantidad del producto en el carrito", error);
            throw new Error(`Error al actualizar cantidad del producto: ${error.message}`);
        }
    }

    async deleteAllProducts(cid) {
        try {
            const cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error(`Carrito con ID ${cid} no encontrado.`);
            }

            cart.products = [];
            await this.updateCart(cart);
            return "Todos los productos fueron eliminados exitosamente";
        } catch (error) {
            console.error("Error al eliminar todos los productos del carrito", error);
            throw new Error(`Error al eliminar todos los productos del carrito: ${error.message}`);
        }
    }



}

export const checkout = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsModel.findById(cartId).populate('products.product'); // Asegúrate de hacer el populate

        if (!cart) {
            return res.status(404).send({ message: 'Carrito no existe' });
        }

        const prodSinStock = [];
        let totalAmount = 0;

        // Verifico el stock 
        for (const prod of cart.products) {
            const producto = prod.product; 

            //verifico si el stock cambio
            const currentProduct = await productsModel.findById(producto._id);
            
            if (producto.stock - prod.quantity < 0) {
                prodSinStock.push(producto._id); // Producto sin stock suficiente
            } else {
                totalAmount += producto.price * prod.quantity; // Sumar el precio
            }
        }

        console.log("Total Amount:", totalAmount); // Depuración: Verifica el totalAmount

        // Si todos los productos tienen stock suficiente
        if (prodSinStock.length === 0) {
            // Descuento el stock de cada producto
            for (const prod of cart.products) {
                const producto = prod.product;
                producto.stock -= prod.quantity;
                await producto.save(); // Guardar el nuevo stock
            }

            // Crear el ticket de compra
            const newTicket = await ticketModel.create({
                code: crypto.randomUUID(),
                amount: totalAmount,
                purcharser: req.user.email,
                products: cart.products
            });

            // Limpiar el carrito
            await cartsModel.findByIdAndUpdate(cartId, { products: [] });

            return res.status(200).send(newTicket);
        } else {
            // Si hay productos sin stock, eliminar esos productos del carrito
            cart.products = cart.products.filter(prod => !prodSinStock.includes(prod.product.toString()));

            // Actualizar el carrito en la base de datos
            await cartsModel.findByIdAndUpdate(cartId, { products: cart.products });

            return res.status(400).send({
                message: 'Algunos productos no tienen stock suficiente',
                prodSinStock
            });
        }
    } catch (e) {
        console.error('Error al procesar la compra', e);
        return res.status(500).send({ message: e.message });
    }
};
