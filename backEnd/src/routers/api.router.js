import { Router } from "express";
import authRouter from "./api/auth.router.js";
import productsRouter from "./api/products.router.js";
import usersRouter from "./api/users.router.js";
import mocksRouter from "./api/mocks.router.js";
import cartsRouter from "./api/carts.router.js";

const apiRouter = Router()

//apiRouter.use('/auth', authRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/mocks', mocksRouter)
apiRouter.use('/carts', cartsRouter)
apiRouter.get('/sumar/:n1/:n2', (req, res) => {
    const { n1, n2 } = req.params
    res.status(200).json({result: sumar(n1, n2)})
    })
apiRouter.get('/sumar/pocos', (req, res) => {
    let total = 1
    for (let i = 1; i < 10; i++) {
        total = total + i * i
    }
    res.json({total})
})
apiRouter.get('/sumar/muchos', (req, res) => {
    let total = 1
    for (let i = 1; i < 1000000000; i++) {
        total = total + i * i
    }
    res.json({total})
})

export default apiRouter