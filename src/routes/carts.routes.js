import { Router } from "express";
import fs from 'fs'
import prodRoute from './products.routes.js'

const cartsRoutes = Router();


const getCarts = async () => {
    try {
        const carts = await fs.promises.readFile('src/db/carts.json', 'utf-8');
        const cartsConverted = JSON.parse(carts)
        return cartsConverted
    } catch (error) {
        return []
    }
}

const saveCarts = async (carts) => {
    try {
        const parsedCarts =JSON.parse(carts)
        await fs.promises.writeFile('src/db/carts.json', parsedCarts, 'utf-8')
        return true
    } catch (error) {
        return false        
    }
}

const getSingleCartById = async (cId) => {
    const carts = await getCarts()
    const cart = carts.find(cart => cart.id === cId)
    return cart
}


cartsRoutes.post('/', async (req, res) => {
        const carts = await getCarts()
        const cart = req.query
        cart.id = carts.length + 1
        cart.products = []
        
        carts.push(cart)
        const isOk = await saveCarts(carts)
        if(!isOk){
            return res.send({status: 'error', message: 'cart could not add'})
        }
        res.send({status: 'success', message: 'cart added'
        })
})


cartsRoutes.get('/:cid', async (req, res) => {
    const cId = +req.params.cid
    const cart = await getSingleCartById(cId)
    if(!cart){
        return res.status(404).send({status: 'error', message: 'cart not found'})
    }
    res.send({cart})
})


cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
    const cId = +req.params.cid
    const pId = +req.params.pid
    const isOk = await addProduct(cId,pId)
    if(!isOk){
        return res.status(404).send({status: 'error', message: 'cart not found'})
    }
    res.send({status: 'success', message: 'product add in cart successfully'})
})
   
const addProduct = async (cId,pId) => {
    
        const carts = await getCarts()
        const cart = carts.find(cart => cart.id === cId)
        if(!cart){
            return res.status(404).send({status: 'error', message: 'cart not found'})
        }

        const existingProduct = cart.products.find(product => product.id === pId)
        
        if(!existingProduct){
            const product = await prodRoute.getSingleCartById(pId)
            if(!product){
                return res.status(404).send({status: 'error', message: 'product not found'})
            }
            cart.products.push({
                id: product.id,
                quantity: 1
            })
        } else {
            existingProduct.quantity++
        }
        const isOk = await saveCarts(carts)
        if(!isOk){
            return res.send({status: 'error', message: 'product could not add to cart'})
        }
        res.send({status: 'success', message: 'product added successfully to cart'})

    } 

export default cartsRoutes;