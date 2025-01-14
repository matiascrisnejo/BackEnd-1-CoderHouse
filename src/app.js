import express from 'express';
<<<<<<< Updated upstream
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
=======

import {ProductManager} from './ProductManager.js';
import {CartManager} from "./CartManager.js"

import routerCarts from "./routes/carts.router.js"
import routerProducts from "./routes/products.router.js"

>>>>>>> Stashed changes


const PORT = 8080;
const app = express();
<<<<<<< Updated upstream
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
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
>>>>>>> Stashed changes
