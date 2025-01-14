<<<<<<< Updated upstream:src/routes/products.routes.js
import { Router } from "express";
import fs from 'fs';

const productsRoutes = Router();

const products = []
=======
import  express from 'express';
import {productManager} from '../app.js';

const router = express.Router()
>>>>>>> Stashed changes:src/routes/products.router.js

const getProducts = async () => {
    try {
        const products = await fs.promises.readFile('src/db/products.json', 'utf-8')
        const productsConverted = JSON.parse(products)
        return productsConverted;
    } catch (error) {
        return [];
    }
}

const saveProducts = async (products) => {
    try {
        const parsedProducts = JSON.parse(products)
        await fs.promises.writeFile('src/db/products.json', parsedProducts,'utf-8')
        return true
    } catch (error) {
        return false        
    }
}

const getSingleProductById = async (pId) => {
    const products = await getProducts();
    const product = products.find(product => product.id === pId);
    return product;
}

productsRoutes.get('/', async(req, res) => {
    const limit = +req.query.limit;
    const products = await getProducts();

    if(isNaN(limit) || !limit){
        return res.send(products);
    }
    
    const productLimited = products.slice(0, limit);
    res.send({products: productLimited})
    
})

productsRoutes.get('/:pid', async(req, res) => {
    const pId = +req.params.pid;
    const product = await getSingleProductById(pId);
    if(!product){
        return res.status(404).send({status: "error", message: 'Product not found'});
    }
    res.send({product})
})

productsRoutes.post('/', async(req, res) => {
    const product =req.body
    product.id = Math.floor(Math.random() * 10000)
    if(!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category){
        return res.status(400).send({status: 'error', message: 'Product incompleted'})
    }
    const products = await getProducts()
    products.push(product)
    const isOk = await saveProducts(products)
    if(!isOk){
        return res.send({status: 'error', message: 'Product could not add'})
    } 
    res.send({status: 'ok', message:"product added"})
});

productsRoutes.delete('/:pid', async (req, res) => {
    const id = +req.params.pid
    const product = await getSingleProductById(id)
    if(!products){
        return res.status(404).send({status: 'error', message: 'Product not found'})
    }
    const products = await getProducts()
    const filteredProducts = products.filter(p => p.id !== id)
    const isOk = await saveProducts(filteredProducts)
    if(!isOk){
        return res.status(404).send({status: 'error', message: 'something went wrong'})
    }
    res.send({status: 'ok', message: 'Product deleted'})
})

productsRoutes.put('/:pid', async (req, res) => {
    const pId = +req.params.pid
    const productToUpdate = req.body
    const products = await getProducts()
    let product = products.find(p => p.id === pId)
    if(!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category){
        return res.status(400).send({status: 'error', message: 'Product incompleted'})
    }
    if(!product){
        return res.status(404).send({status: 'error', message: 'Product not found'})
    }
    const updateProducts = products.map(p => {
        if(p.id === pId){
            return {...p,...productToUpdate}
        }
        return p
    })
    const isOk = await saveProducts(updateProducts)
    if(!isOk){
        return res.status(404).send({status: 'error', message: 'something went wrong'})
    }
    res.send({status: 'ok', message: 'Product updated'})
})



export default productsRoutes;