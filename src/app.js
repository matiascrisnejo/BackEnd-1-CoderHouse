import express from 'express';
import handlebars from 'express-handlebars';

import {ProductManager} from './ProductManager.js';
import {CartManager} from "./CartManager.js"

import routerCarts from "./routes/api/carts.router.js"
import routerProducts from "./routes/api/products.router.js"
import routerViews from "./routes/views.router.js"
import routerRealTimesProducts from "./routes/realTimeProducts.router.js"

//import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

const port = 8080;
const app = express();
//const httpServer = new HttpServer(app)

//app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
}))
app.set('view engine','hbs');
app.set('views','src/views');

const pathProducts = "./db/products.json"
const pathCarts = "./db/carts.json"

//middleware
// const socketMidd = (io) => (req,res,next) => {
//     req.io = io
//     next()
// }

// app.use(socketMidd(io))

export const productManager = new ProductManager(pathProducts)
export const cartManager = new CartManager(pathCarts)

//app.use('/', routerViews)
app.use("/" ,routerViews)
app.use("/realTimeProducts" , routerRealTimesProducts)
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);


//httpServer.listen(port, () => console.log("servidor con express"))
const httpServer = app.listen(port, () => console.log("servidor con express"))

//Socket.io

const socketServer = new Server(httpServer) 

socketServer.on("connection" , (socket) => {
    console.log("Nueva Conexion")

    try {
        const products = p.getProducts();
        socketServer.emit("products", products);
    } catch (error) {
        socketServer.emit('response', { status: 'error', message: error.message });
    }

    
    socket.on("new-Product", async (newProduct) => {
        try {
            const objectProductNew = {
                    title: newProduct.title,
                    description: newProduct.description,
                    code: newProduct.code,
                    price: newProduct.price,
                    status: newProduct.status,
                    stock: newProduct.stock,
                    category: newProduct.category,
                    thumbnail: newProduct.thumbnail,
    
            }
            const pushProduct = p.addProduct(objectProductNew);
            const updatedListProd = p.getProducts();
            socketServer.emit("products", updatedListProd);
            socketServer.emit("response", { status: 'success' , message: pushProduct});

        } catch (error) {
            socketServer.emit('response', { status: 'error', message: error.message });
        }
    })

    socket.on("delete-product", async(id) => {
        try {
            const pid = parseInt(id)
            const deleteProduct = p.deleteProduct(pid)
            const updatedListProd = p.getProducts()
            socketServer.emit("products", updatedListProd)
            socketServer.emit('response', { status: 'success' , message: "producto eliminado correctamente"});
        } catch (error) {
            socketServer.emit('response', { status: 'error', message: error.message });
        }
    } )

})