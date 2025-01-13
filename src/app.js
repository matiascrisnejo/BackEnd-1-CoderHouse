import express from "express";
import ProductManager from "./ProductManager.js"

import routerProducts from "./routes/products.routes.js"

const app = express();
const port = 8080

//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export const productManager = new ProductManager(pathProducts);

//Routes
app.use('/api/products', routerProducts);



app.listen(8080, () => console.log("servidor con express"));