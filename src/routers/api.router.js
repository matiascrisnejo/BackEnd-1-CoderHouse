import { Router } from "express";
import productsRouter from "./api/products.router";

const apiRouter = Router()

apiRouter.use('/products', productsRouter)

export default apiRouter