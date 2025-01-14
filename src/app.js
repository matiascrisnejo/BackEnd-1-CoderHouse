import express from 'express';

import {ProductManager} from './ProductManager.js';
import {CartManager} from "./CartManager.js"

import routerCarts from "./routes/carts.router.js"
import routerProducts from "./routes/products.router.js"

const app = express();
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pathProducts = "./db/products.json"
const pathCarts = "./db/carts.json"

export const productManager = new ProductManager(pathProducts)
export const cartManager = new CartManager(pathCarts)

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);


app.listen(port, () => console.log("servidor con express"))
